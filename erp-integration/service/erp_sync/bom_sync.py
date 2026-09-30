# -*- coding: utf-8 -*-
"""BOM senkron motoru: 3DX configured expand → BC çok seviyeli Production BOM.

Akış: katı filtreli expand → Path zincirlerinden ağaç → istenen durum (desired
state) → kart garanti → her montaj için BOM diff (değişiklik varsa full-rewrite
+ yeniden Certify) → tepe kod (= konfigürasyon adı, kökün yerine geçer).
"""
import json
import logging
import re

from . import evolution as evo
from .db import utcnow
from .release_poller import BC_NO_MAX, bc_item_number

log = logging.getLogger("erpsync.bomsync")


class BomSync:
    def __init__(self, cfg, auth, bc, db):
        self.auth = auth
        self.bc = bc
        self.db = db
        self.space_url = cfg.dx["space_url"].rstrip("/")
        self.security_context = cfg.dx.get("security_context", "")
        self.default_uom = cfg.bc.get("item_defaults", {}).get("baseUnitOfMeasure", "PCS")
        # ERP kart numarası kaynağı: "enterprise" (dseng:EnterpriseReference.partNumber),
        # "name" veya "title"
        self.number_source = cfg.dx.get("number_source", "enterprise")
        # Enterprise numarası olmayan parça: False (varsayılan) → ERP'ye GÖNDERİLMEZ,
        # her senkronda raporlanır; True → 3DX name'i numara olarak kullanılır
        self.allow_name_fallback = cfg.dx.get("allow_name_fallback", False)
        # 3DX görüntü birimi → BC UoM kodu (config'ten genişletilebilir)
        self.uom_map = cfg.bc.get("uom_map", {})

    # ---- 3DX: filtreli açılım ----
    def configured_expand(self, root_id, config_id, item_type="VPMReference",
                          evolution=None):
        """Strictly filtered expand through cvservlet. `evolution` (Model
        Version) and `config_id` (Product Configuration) are alternatives; with
        neither the structure is unfiltered.

        v0.9.0: the dseng/dsmfg expand (_modeler_expand) stops at exactly 10000
        paths without an error - Aurora MBOM lost ~1700 of 11718 occurrences.
        cvservlet has no such cap."""
        if evolution:
            element = {"config_filter": evo.volatile_filter(self.auth, self.space_url,
                                                            evolution)}
        elif config_id:
            element = {"config_filter_id": {"physical_id": config_id}}
        else:
            element = None
        return evo.cv_expand(self.auth, self.space_url, self.security_context,
                             root_id, item_type, element)

    def _modeler_expand(self, root_id, config_id, item_type="VPMReference"):
        """Pre-0.9.0 expand, capped at 10000 paths. Kept only for comparison
        tests (tests/cv_vs_modeler.py); not used by the sync."""
        if item_type == "VPMReference":
            url = (f"{self.space_url}/resources/v1/modeler/dseng/dseng:EngItem/"
                   f"{root_id}/expand?xrequestedwith=xmlhttprequest")
        else:
            url = (f"{self.space_url}/resources/v1/modeler/dsmfg/dsmfg:MfgItem/"
                   f"{root_id}/expand?xrequestedwith=xmlhttprequest")
        body = {"expandDepth": -1, "withPath": True}
        if config_id:  # konfigürasyon yoksa filtresiz (tam) açılım
            body["filter"] = {
                "combinationOfSpecification": "union",
                "keepChildren": False,
                "filterSpecifications": [{
                    "filterCriteria": [{
                        "criteriaType": "config",
                        "configurationFilterDefinition": {
                            "version": "0.2",
                            "persistentFilter": {
                                "identifier": config_id,
                                "type": "Product Configuration"}}}]}]}
        r = self.auth.post(url, json=body)
        if r.status_code != 200:
            raise RuntimeError(f"configured expand HTTP {r.status_code}: {r.text[:400]}")
        return r.json()

    def _dseng_details(self, eng_ids):
        """dseng bulkfetch: {engItemId: member} (partNumber + EnterpriseAttributes)."""
        url = (f"{self.space_url}/resources/v1/modeler/dseng/dseng:EngItem/bulkfetch"
               f"?xrequestedwith=xmlhttprequest&$mask=dsmveng:EngItemMask.Details")
        out, ids = {}, list(eng_ids)
        for i in range(0, len(ids), 50):
            r = self.auth.post(url, json=ids[i:i + 50])
            if r.status_code not in (200, 207):  # 207: kısmi sonuç (nonmembers)
                log.warning("bulkfetch HTTP %s: %s", r.status_code, r.text[:200])
                continue
            for m in r.json().get("member", []):
                out[m["id"]] = m
        return out

    @staticmethod
    def _eng_partnumber(member):
        pn = ((member or {}).get("dseng:EnterpriseReference") or {}).get("partNumber")
        return str(pn).strip() if pn and str(pn).strip() else None

    def _cv_partnumbers(self, ids):
        """cvservlet fetch ile {physicalId: Enterprise Item Number} — toplu.

        Mfg item'ların parça numarası indekste doğrudan bulunur; scope link
        turlarına (item başına bir istek) gerek kalmaz."""
        out = {}
        url = f"{self.space_url}/cvservlet/fetch/v2?xrequestedwith=xmlhttprequest"
        ids = list(ids)
        for i in range(0, len(ids), 200):
            body = {"label": "zen-erpsync-pn", "physicalid": ids[i:i + 200],
                    "select_predicate": ["physicalid",
                                         "ds6wg:EnterpriseExtension.V_PartNumber"],
                    "locale": "us", "lang": "en", "with_synthesis_attribute": False}
            r = self.auth.post(url, json=body)
            if r.status_code != 200:
                log.warning("partnumber fetch HTTP %s: %s", r.status_code, r.text[:200])
                continue
            for res in r.json().get("results", []):
                pid = pn = None
                for a in res.get("attributes", []):
                    nm = a.get("name") or ""
                    if nm == "physicalid":
                        pid = a.get("value")
                    elif nm.endswith("EnterpriseExtension.V_PartNumber"):
                        pn = a.get("value")
                if pid and pn and str(pn).strip():
                    out[pid] = str(pn).strip()
        return out

    def _gather_sources(self, ref_ids, item_type):
        """(numaralar, eng_member_by_ref, mfg_member_by_ref).

        Mfg item'larda numara scope link ile bağlı EngItem'dan gelir; attribute'lar
        mfg item'ın kendi MfgItemEnterpriseAttributes bloğundan okunur."""
        ref_ids = list(ref_ids)
        if item_type == "VPMReference":
            if self.number_source != "enterprise":
                return {}, {}, {}
            eng = self._dseng_details(ref_ids)
            ent = {rid: pn for rid, m in eng.items()
                   if (pn := self._eng_partnumber(m))}
            return ent, eng, {}
        mfg = self._mfg_details(ref_ids)
        if self.number_source != "enterprise":
            return {}, {}, mfg
        # 1) hızlı yol: numara indeksten toplu gelir
        ent = self._cv_partnumbers(ref_ids)
        missing = [r for r in ref_ids if r not in ent]
        if not missing:
            return ent, {}, mfg
        # 2) kalanlar için scope link üzerinden çöz (item başına bir istek)
        log.info("resolving %d part number(s) via scope link", len(missing))
        eng_of = {}
        for rid in missing:
            r = self.auth.get(
                f"{self.space_url}/resources/v1/modeler/dsmfg/dsmfg:MfgItem/{rid}"
                f"/dsmfg:ScopeEngItem?xrequestedwith=xmlhttprequest")
            if r.status_code != 200:
                continue
            mem = r.json().get("member") or []
            sc = (mem[0].get("ScopeEngItem") or {}) if mem else {}
            eid = sc.get("identifier")
            if eid:
                eng_of[rid] = eid
        eng = self._dseng_details(set(eng_of.values()))
        eng_by_ref = {}
        for rid, eid in eng_of.items():
            m = eng.get(eid)
            eng_by_ref[rid] = m
            pn = self._eng_partnumber(m)
            if pn:
                ent[rid] = pn
        return ent, eng_by_ref, mfg

    # ---- attribute eşleme (Emrah 13.08 kuralları) ----
    @staticmethod
    def make_buy_of(mfg_m, eng_m):
        """Ham Make Buy değeri (mfg item önce, yoksa mühendislik parçası)."""
        a = (mfg_m or {}).get("dsmfg:MfgItemEnterpriseAttributes")
        if a:
            return str(a.get("Make_Buy") or "").strip()
        a = (eng_m or {}).get("dseno:EnterpriseAttributes")
        if a:
            return str(a.get("make_buy") or "").strip()
        return ""

    @staticmethod
    def _ent_attr(mfg_m, eng_m, mfg_key, eng_key):
        """Attribute değeri: önce mfg item'ın kendi bloğu, yoksa mühendislik parçası.

        make_buy_of'tan farkı, anahtar bazında düşmesi: mfg bloğu dolu olsa bile
        içinde her anahtar bulunmuyor (ör. 96 mfg item'ın yalnız 59'unda
        Car_System var), o durumda EngItem'daki karşılığı okunur."""
        a = (mfg_m or {}).get("dsmfg:MfgItemEnterpriseAttributes") or {}
        if mfg_key in a:
            return a[mfg_key]
        a = (eng_m or {}).get("dseno:EnterpriseAttributes") or {}
        return a.get(eng_key)

    @staticmethod
    def _as_bool(v):
        """3DX bazen gerçek bool, bazen 'TRUE'/'false' metni döner."""
        if isinstance(v, bool):
            return v
        return str(v or "").strip().lower() in ("true", "1", "yes")

    def _as_text(self, v, limit, label):
        """BC metin alanı. Bool ve 'TRUE'/'FALSE' varyantları kart üzerinde
        tutarlı görünsün diye küçük harfe iner; diğer değerler olduğu gibi
        geçer. Sınır aşılırsa hata loglanır ve baştan kesilir."""
        if v is None:
            return ""
        if isinstance(v, bool):
            return "true" if v else "false"
        s = str(v).strip()
        if s.lower() in ("true", "false"):
            s = s.lower()
        if len(s) > limit:
            log.error("%s is %d characters (BC limit %d), truncated: %r",
                      label, len(s), limit, s)
            s = s[:limit]
        return s

    def item_fields(self, mfg_m, eng_m, is_top=False, uom=None):
        """3DX attribute'ları → BC alanları.

        Replenishment System: Make → Prod. Order; Kit/Buy/diğerleri → Purchase;
        tepe kod → Prod. Order. Diğer dört alan yalnız bilgi taşır ve kartta
        3DEXPERIENCE sekmesinde salt-okunur görünür.
        (Phantom değerler build_desired'da elenir, buraya gelmez.)

        Kaynak anahtarlar (10.09 canlı doğrulama):
          carSystem      mfg Car_System        / eng Car_System
          outsourced     mfg Outsourced        / eng Outsourcedafterpurchase
          serviceability mfg Serviceabilitypart/ eng Serviceabilitypart
          makeBuy        mfg Make_Buy          / eng make_buy"""
        mb = self.make_buy_of(mfg_m, eng_m)
        repl = ("Prod. Order" if (is_top or mb.lower() == "make") else "Purchase")
        return {
            "replenishmentSystem": repl,
            "makeBuy": self._as_text(mb, 30, "Make Buy"),
            "carSystem": self._as_text(
                self._ent_attr(mfg_m, eng_m, "Car_System", "Car_System"),
                100, "Car System"),
            "outsourced": self._as_bool(
                self._ent_attr(mfg_m, eng_m, "Outsourced", "Outsourcedafterpurchase")),
            "serviceability": self._as_text(
                self._ent_attr(mfg_m, eng_m, "Serviceabilitypart", "Serviceabilitypart"),
                100, "Serviceability"),
            "baseUnitOfMeasure": uom or self.default_uom,
        }

    # ---- sürekli malzeme miktarları (cpr) ----
    CONT_UNIT_TO_BC = {"kg": ("KG", "Kilo", "KGM"), "m": ("M", "Meter", "MTR"),
                       "m2": ("M2", "Square metre", "MTK"),
                       "m3": ("M3", "Cubic metre", "M3")}

    def uom_code(self, display_unit):
        if display_unit in self.uom_map:
            return self.uom_map[display_unit]
        t = self.CONT_UNIT_TO_BC.get(display_unit)
        return t[0] if t else self.default_uom

    def _cont_quantities(self, inst_ids):
        """{instanceId: (miktar, görüntü birimi)} — cvservlet/fetch/v2.

        Değer formatı 'değer||BİRİM||çarpan'; select_unit ile kg/m/m2/m3'e çevrilir.
        (Kaynak sözleşme: MFN Quantity HAR, 12.08.2026)"""
        out = {}
        url = f"{self.space_url}/cvservlet/fetch/v2?xrequestedwith=xmlhttprequest"
        for i in range(0, len(inst_ids), 200):
            body = {
                "label": "zen-erpsync-contqty",
                "physicalid": inst_ids[i:i + 200],
                "select_predicate": ["physicalid"],
                "select_uom": [
                    "ds6wg:DELFmiContQuantity_Mass.V_ContQuantity",
                    "ds6wg:DELFmiContQuantity_Area.V_ContQuantity",
                    "ds6wg:DELFmiContQuantity_Length.V_ContQuantity",
                    "ds6wg:DELFmiContQuantity_Volume.V_ContQuantity",
                    "ds6wg:DELFmiRatioOfDiscreteQuantity.V_ContQuantity"],
                "select_unit": {
                    "ro.delfmicontquantity_mass.v_contquantity": "kg",
                    "ro.delfmicontquantity_area.v_contquantity": "m2",
                    "ro.delfmicontquantity_length.v_contquantity": "m",
                    "ro.delfmicontquantity_volume.v_contquantity": "m3",
                    "ro.delfmiratioofdiscretequantity.v_contquantity": ""},
                "locale": "us", "lang": "en",
                "with_synthesis_attribute": False,
            }
            r = self.auth.post(url, json=body)
            if r.status_code != 200:
                log.warning("contqty fetch HTTP %s: %s", r.status_code, r.text[:200])
                continue
            for res in r.json().get("results", []):
                iid, val, unit = None, None, ""
                for at in res.get("attributes", []):
                    nm = at.get("name") or ""
                    if nm in ("physicalid", "resourceid") and not iid:
                        iid = at.get("value")
                    mm = re.search(r"ContQuantity_(\w+)\.V_ContQuantity$", nm)
                    ratio = nm.endswith("RatioOfDiscreteQuantity.V_ContQuantity")
                    if (mm or ratio) and at.get("value") is not None:
                        parts = str(at["value"]).split("||")
                        try:
                            val = float(parts[0])
                        except ValueError:
                            continue
                        unit = ({"Mass": "kg", "Area": "m2", "Length": "m",
                                 "Volume": "m3"}.get(mm.group(1), "") if mm else "")
                if iid and val is not None:
                    out[iid] = (val, unit)
        return out

    def _mfg_details(self, ref_ids):
        """dsmfg bulkfetch: {id: detay} — Partrevision ve attribute'lar için."""
        url = (f"{self.space_url}/resources/v1/modeler/dsmfg/dsmfg:MfgItem/bulkfetch"
               f"?xrequestedwith=xmlhttprequest&$mask=dsmfg:MfgItemMask.Details")
        out, ids = {}, list(ref_ids)
        for i in range(0, len(ids), 50):
            r = self.auth.post(url, json=ids[i:i + 50])
            if r.status_code not in (200, 207):  # 207: kısmi sonuç (nonmembers)
                log.warning("dsmfg bulkfetch HTTP %s: %s", r.status_code, r.text[:200])
                continue
            for m in r.json().get("member", []):
                out[m["id"]] = m
        return out

    # ---- istenen durum ----
    def build_desired(self, expand_json, root_id, top_number, top_description="",
                      item_type="VPMReference"):
        """Path zincirlerinden BOM ağacını kur.

        Dönen: {
          "items":   {number: {"description":..., "ref_id":...}},
          "boms":    {bom_no: [(child_number, qty, uom), ...]},  # tepe dahil
          "skipped": [uyarı metinleri]
        }
        """
        members = expand_json.get("member", [])
        # referans = title alanı taşıyan üyeler (instance'larda title yoktur;
        # MBOM instance tipleri VPMInstance olmadığından tipe göre ayıklanamaz)
        refs = {m["id"]: m for m in members
                if "Path" not in m and m.get("title") is not None}
        # Yapı iki biçimde gelebilir:
        #  - cvservlet (v0.9.0, EBOM ve MBOM) ve dsmfg expand: instance üyeleri
        #    doğrudan parent/reference kenarı taşır
        #  - EBOM (dseng expand): Path zincirleri [rootRef, inst, ref, inst, ref, ...]
        children_map = {}   # parent_ref_id -> {child_ref_id: qty}
        inst_rows = [m for m in members if m.get("parent") and m.get("reference")]
        # sürekli malzeme instance'ları: gerçek miktar + birim V_ContQuantity'de
        cont_inst = {m["id"]: (m["parent"], m["reference"]) for m in inst_rows
                     if m.get("type") in ("ProcessInstanceContinuous",
                                          "dsmfg:ProcessInstanceContinuous")}
        cont_edge = {}   # (parent_ref, child_ref) -> {"v": toplam, "u": görüntü birimi}
        if cont_inst:
            qmap = self._cont_quantities(list(cont_inst))
            for iid, (p, c) in cont_inst.items():
                q = qmap.get(iid)
                if not q:
                    continue
                cur = cont_edge.setdefault((p, c), {"v": 0.0, "u": q[1]})
                cur["v"] += q[0]
        if inst_rows:
            for m in inst_rows:
                p, c = m["parent"], m["reference"]
                children_map.setdefault(p, {})
                children_map[p][c] = children_map[p].get(c, 0) + 1
            reachable, stack = {root_id}, [root_id]
            while stack:
                for c in children_map.get(stack.pop(), {}):
                    if c not in reachable:
                        reachable.add(c)
                        stack.append(c)
        else:
            paths = [m["Path"] for m in members if "Path" in m]
            children_of_occ = {}   # occ_key(tuple) -> {child_ref_id: qty}
            occ_of_ref = {root_id: (root_id,)}  # her ref için temsilci occurrence
            for p in paths:
                if len(p) < 3:
                    continue
                occ_key = tuple(p[:-2])
                child = p[-1]
                children_of_occ.setdefault(occ_key, {})
                children_of_occ[occ_key][child] = children_of_occ[occ_key].get(child, 0) + 1
                occ_of_ref.setdefault(child, tuple(p))
            for rid, occ in occ_of_ref.items():
                children_map[rid] = children_of_occ.get(occ, {})
            reachable = set(occ_of_ref)

        skipped = []
        ent, eng_by_ref, mfg = self._gather_sources(refs.keys(), item_type)

        def revision_of(ref_id, m):
            """Mfg item'da revizyon harfi Partrevision attribute'undan gelir (Emrah
            kuralı); EBOM parçasında nesne revizyonu zaten part revizyonudur."""
            if item_type != "VPMReference":
                attrs = (mfg.get(ref_id) or {}).get(
                    "dsmfg:MfgItemEnterpriseAttributes") or {}
                pr = str(attrs.get("Partrevision") or "").strip()
                if pr:
                    return pr
                skipped.append(f"Partrevision empty, used object revision: "
                               f"{m.get('title')!r}")
            return m.get("revision", "")

        def number_of(ref_id):
            m = refs.get(ref_id, {})
            if self.number_source == "title":
                base = m.get("title") or m.get("name", "")
            elif self.number_source == "name":
                base = m.get("name") or m.get("title", "")
            else:  # enterprise
                base = ent.get(ref_id)
                if not base:
                    if self.allow_name_fallback or ref_id == root_id:
                        # kök atlanamaz: name'e düşülür ve raporlanır
                        base = m.get("name") or m.get("title", "")
                        skipped.append(f"no enterprise number, used name: "
                                       f"{m.get('title')!r} -> {base}")
                    else:
                        skipped.append(f"EXCLUDED (no enterprise number): "
                                       f"{m.get('title')!r}")
                        return None, m
            no = bc_item_number(str(base).strip(), revision_of(ref_id, m)).upper()
            return no, m

        items, boms, phantoms = {}, {}, []
        valid = {}
        for rid in reachable:
            if rid == root_id:
                continue
            m = refs.get(rid, {})
            # Phantom (Make Buy) yalnızca UYARI üretir; item normal oluşturulur
            # (Emrah kuralı 13.08). Kontrol sadece MBOM'da: MBOM'da phantom yapı
            # olmamalı, çıkarsa 3DX verisinde düzeltilmesi gereken bir durumdur.
            if (item_type != "VPMReference" and
                    self.make_buy_of(mfg.get(rid),
                                     eng_by_ref.get(rid)).lower() == "phantom"):
                msg = f"PHANTOM in MBOM (created anyway): {m.get('title')!r}"
                phantoms.append(msg)
                log.warning(msg)
            no, m = number_of(rid)  # limit aşımı bc_item_number'da loglanıp kırpılır
            if no is None:
                continue  # EXCLUDED — number_of raporladı
            if not no.strip("-"):
                skipped.append(f"item skipped (empty number): {m.get('title')!r}")
                continue
            valid[rid] = no
            items[no] = {"description": (m.get("title") or "")[:100], "ref_id": rid,
                         "fields": self.item_fields(mfg.get(rid), eng_by_ref.get(rid))}

        uoms_needed, cont_items = set(), {}
        # Sürekli malzemelerin birim kodlarını ÖNCEDEN çıkar: aynı malzeme başka
        # bir kenarda magnitüdsüz geçerse satır PCS ile yazılamaz (BC, item'ın
        # birim listesinde olmayan birimi reddeder) — kartın gerçek birimi kullanılır
        for (p, c), ce in cont_edge.items():
            if ce["u"] and c in valid:
                code = self.uom_code(ce["u"])
                uoms_needed.add(ce["u"])
                cont_items[valid[c]] = code

        def bom_lines_for(parent_ref, parent_label):
            lines = []
            for child, qty in sorted(children_map.get(parent_ref, {}).items()):
                no = valid.get(child)
                if not no:
                    skipped.append(f"line skipped ({parent_label}): invalid child "
                                   f"{refs.get(child, {}).get('title')}")
                    continue
                ce = cont_edge.get((parent_ref, child))
                if ce and ce["u"]:
                    # sürekli malzeme: satır miktarı gerçek magnitüd, birimiyle
                    lines.append((no, round(ce["v"], 5), cont_items[no]))
                elif no in cont_items:
                    # sürekli malzeme ama bu kenarda magnitüd yok: adet ile ama
                    # kartın kendi birimiyle yaz (PCS reddedilir) + raporla
                    skipped.append(f"continuous item without quantity on this "
                                   f"edge ({parent_label} -> {no}): wrote count "
                                   f"with base unit {cont_items[no]}")
                    lines.append((no, qty, cont_items[no]))
                else:
                    lines.append((no, qty, self.default_uom))
            return lines

        # tepe kod: konfigürasyon varsa adı (kökün yerine geçer); konfigürasyon
        # yoksa kökteki Manufacturing Assembly'nin kendi parça numarası
        if top_number:
            top_no = top_number.strip().upper()
            if len(top_no) > BC_NO_MAX:
                log.error("Top code exceeds %d characters, truncated: %r",
                          len(top_no), top_no)
                top_no = top_no[:BC_NO_MAX]
            top_desc = top_description or top_number
        else:
            top_no, root_m = number_of(root_id)
            top_desc = top_description or root_m.get("title") or top_no
        if (item_type != "VPMReference" and
                self.make_buy_of(mfg.get(root_id),
                                 eng_by_ref.get(root_id)).lower() == "phantom"):
            msg = f"PHANTOM in MBOM (created anyway): root {top_no}"
            phantoms.append(msg)
            log.warning(msg)
        boms[top_no] = bom_lines_for(root_id, "TOP")
        items[top_no] = {"description": top_desc[:100], "ref_id": root_id, "top": True,
                         "fields": self.item_fields(mfg.get(root_id),
                                                    eng_by_ref.get(root_id),
                                                    is_top=True)}

        # montajlar: çocuğu olan her ref kendi BOM'unu alır
        for rid, no in valid.items():
            lines = bom_lines_for(rid, no)
            if lines:
                boms[no] = lines

        # sürekli malzemelerin kart Base UoM'u da gerçek birim olur
        for no, code in cont_items.items():
            if no in items:
                items[no]["fields"]["baseUnitOfMeasure"] = code

        return {"items": items, "boms": boms, "skipped": skipped, "top_no": top_no,
                "uoms": sorted(uoms_needed), "phantoms": phantoms}

    # ---- BC diff + uygulama ----
    @staticmethod
    def _norm(s):
        return (s or "").replace("_x002E_", ".").replace("_x0020_", " ").strip().upper()

    def _lines_equal(self, bc_lines, want):
        have = sorted((self._norm(l["number"]), float(l["quantityPer"]),
                       self._norm(l["unitOfMeasureCode"])) for l in bc_lines)
        target = sorted((self._norm(n), float(q), self._norm(u)) for n, q, u in want)
        return have == target

    def _write_bom(self, bom_no, want, stats):
        """BOM'u istenen satırlara getir (değişiklik varsa full-rewrite + Certify)."""
        h = self.bc.bom_header_by_number(bom_no)
        if h is None:
            h = self.bc.create("zenProductionBOMHeaders", {
                "number": bom_no, "unitOfMeasureCode": self.default_uom})
            stats["bom_created"] += 1
        existing = self.bc.bom_lines(bom_no)
        if self._lines_equal(existing, want):
            if self._norm(h.get("status")) != "CERTIFIED":
                self.bc.set_bom_status(h, "Certified")
            stats["bom_unchanged"] += 1
            return
        if self._norm(h.get("status")) == "CERTIFIED":
            h = self.bc.set_bom_status(h, "Under Development")
        for ln in existing:
            self.bc.delete("zenProductionBOMLines", ln["systemId"])
        for i, (no, qty, uom) in enumerate(want, start=1):
            self.bc.create("zenProductionBOMLines", {
                "productionBOMNo": bom_no, "lineNo": i * 10000, "type": "Item",
                "number": no, "quantityPer": qty, "unitOfMeasureCode": uom})
        self.bc.set_bom_status(h, "Certified")
        stats["bom_rewritten"] += 1

    @staticmethod
    def _lines_hash(want):
        return repr(sorted((n, float(q), u) for n, q, u in want))

    def _conflicting_tops(self, bom_no, top_code, lines_hash):
        """Bu BOM'u farklı içerikle isteyen diğer tepe kodlar."""
        self.db.conn.execute(
            "INSERT INTO bom_ownership(bom_no,top_code,lines_hash,updated_at) "
            "VALUES(?,?,?,?) ON CONFLICT(bom_no,top_code) DO UPDATE SET "
            "lines_hash=excluded.lines_hash, updated_at=excluded.updated_at",
            (bom_no, top_code, lines_hash, utcnow()))
        self.db.conn.commit()
        rows = self.db.conn.execute(
            "SELECT top_code FROM bom_ownership WHERE bom_no=? AND top_code<>? "
            "AND lines_hash<>?", (bom_no, top_code, lines_hash)).fetchall()
        return [r["top_code"] for r in rows]

    def push(self, desired, top_code=None, dry_run=False):
        stats = {"items_created": 0, "items_existing": 0, "bom_created": 0,
                 "bom_rewritten": 0, "bom_unchanged": 0, "bom_conflict": 0,
                 "conflicts": [], "errors": []}
        if dry_run:
            stats["would_items"] = len(desired["items"])
            stats["would_boms"] = len(desired["boms"])
            return stats

        # 0) gerekli birim kodlarını garanti et
        for disp in desired.get("uoms", ()):
            try:
                t = self.CONT_UNIT_TO_BC.get(disp)
                self.bc.ensure_uom(self.uom_code(disp),
                                   t[1] if t else None, t[2] if t else None)
            except Exception as e:
                stats["errors"].append(f"uom {disp}: {e}")
                log.error("uom %s: %s", disp, e)

        # 1) kart garanti (önce tüm kartları önbelleğe al: kart başına sorgu yok)
        try:
            self.bc.preload_items()
        except Exception as e:
            log.warning("item preload failed, falling back to per-item lookups: %s", e)
        for no, meta in desired["items"].items():
            try:
                fields = {"description": meta["description"]}
                fields.update(meta.get("fields") or {})
                _, created = self.bc.upsert_item(no, fields)
                stats["items_created" if created else "items_existing"] += 1
            except Exception as e:
                stats["errors"].append(f"item {no}: {e}")
                log.error("item %s: %s", no, e)

        # 2) BOM'lar (montajlar önce, tepe en son)
        top_first = [b for b in desired["boms"] if not desired["items"][b].get("top")]
        order = top_first + [b for b in desired["boms"] if desired["items"][b].get("top")]
        for bom_no in order:
            want = desired["boms"][bom_no]
            try:
                if top_code:
                    others = self._conflicting_tops(bom_no, top_code,
                                                    self._lines_hash(want))
                    if others:
                        stats["bom_conflict"] += 1
                        msg = (f"CONFLICT: {bom_no} - {top_code} and "
                               f"{', '.join(others)} require different content; "
                               f"BOM left untouched")
                        stats["conflicts"].append(msg)
                        log.warning(msg)
                        continue
                self._write_bom(bom_no, want, stats)
            except Exception as e:
                stats["errors"].append(f"bom {bom_no}: {e}")
                log.error("bom %s: %s", bom_no, e)

        # 3) montaj item'larına BOM bağla
        for bom_no in desired["boms"]:
            try:
                it = self.bc.item_by_number(bom_no)
                if it and self._norm(it.get("productionBOMNo")) != self._norm(bom_no):
                    self.bc.update("zenItems", it["systemId"],
                                   {"productionBOMNo": bom_no})
            except Exception as e:
                stats["errors"].append(f"link {bom_no}: {e}")
        return stats

    # ---- uçtan uca tek tur ----
    def sync_config(self, top_number, root_id, config_id, top_description="",
                    item_type="VPMReference", dry_run=False, evolution=None):
        expand = self.configured_expand(root_id, config_id, item_type, evolution)
        desired = self.build_desired(expand, root_id, top_number, top_description,
                                     item_type=item_type)
        top_code = desired["top_no"]
        stats = self.push(desired, top_code=top_code, dry_run=dry_run)
        stats["top_code"] = top_code
        stats["skipped"] = desired["skipped"]
        stats["phantoms"] = desired.get("phantoms", [])
        stats["desired_items"] = len(desired["items"])
        stats["desired_boms"] = len(desired["boms"])
        if not dry_run:
            self.db.conn.execute(
                "INSERT INTO sync_configs(top_code,config_id,config_name,root_mfg_id,"
                "created_at,item_type,evolution) VALUES(?,?,?,?,?,?,?) "
                "ON CONFLICT(top_code) DO NOTHING",
                (top_code, config_id or "", top_description, root_id, utcnow(), item_type,
                 json.dumps(evolution) if evolution else None))
            self.db.conn.execute(
                "UPDATE sync_configs SET last_sync_at=?, last_result=?, item_count=? "
                "WHERE top_code=?",
                (utcnow(), "error" if stats["errors"] else "ok",
                 stats["desired_items"], top_code))
            self.db.conn.execute(
                "INSERT INTO sync_runs(top_code,kind,started_at,finished_at,result,detail)"
                " VALUES(?,?,?,?,?,?)",
                (top_code, "manual", utcnow(), utcnow(),
                 "error" if stats["errors"] else "ok", str(stats)[:1500]))
            self.db.conn.commit()
        return stats
