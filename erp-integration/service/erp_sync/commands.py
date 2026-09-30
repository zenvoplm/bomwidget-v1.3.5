# -*- coding: utf-8 -*-
"""Komut tarayıcısı: 3DX'teki ERPSYNC kontrol kayıtlarını (Document) işler.

Widget, Send to ERP'de `ERPSYNC_<configId>` adlı, description'ı JSON payload olan
dosyasız bir Document oluşturur. Bu modül ~2 dk'da bir bu kayıtları tarar:
REQUESTED / syncNow olanlar için ilk BOM gönderimini yapar, konfigürasyonu
kalıcı senkron listesine ekler ve sonucu aynı Document'ın description'ına yazar.
"""
import json
import logging

from .db import utcnow

log = logging.getLogger("erpsync.cmd")

DOC_API = "/resources/v1/modeler/documents"


class CommandScanner:
    def __init__(self, cfg, auth, dx, bc, db, bom_sync):
        self.auth = auth
        self.dx = dx
        self.bc = bc
        self.db = db
        self.sync = bom_sync
        self.space_url = cfg.dx["space_url"].rstrip("/")
        # Widget'ın (başka kullanıcının) oluşturduğu dokümanı değiştirmek için
        # gerekebilen yönetici bağlamı (14.08: Leader başkasının dokümanını
        # değiştiremiyor, Admin değiştirebiliyor)
        self.admin_ctx = cfg.dx.get(
            "admin_security_context",
            "VPLMProjectAdministrator.Company Name.Zenvo Automotive")
        # İşlenen ERPSYNC kayıtlarının toplandığı bookmark (ERP SYNC klasörü)
        self.bookmark_id = (cfg.dx.get("bookmark_id") or "").strip()

    # ---- Document yardımcıları ----
    def create_record(self, payload):
        """Widget'ın yaptığı çağrının birebir aynısı (test/simülasyon için)."""
        r = self.auth.post(
            f"{self.space_url}{DOC_API}",
            json={"data": [{"dataelements": {
                "title": f"ERPSYNC_{payload['configurationId']}",
                "description": json.dumps(payload, ensure_ascii=False)}}]},
            headers={"Content-Type": "application/json"})
        if r.status_code not in (200, 201):
            raise RuntimeError(f"Document create HTTP {r.status_code}: {r.text[:300]}")
        d = (r.json().get("data") or [{}])[0]
        return d.get("id") or (d.get("dataelements") or {}).get("id")

    def get_payload(self, doc_id):
        r = self.auth.get(f"{self.space_url}{DOC_API}/{doc_id}")
        if r.status_code != 200:
            return None
        d = (r.json().get("data") or [{}])[0]
        desc = (d.get("dataelements") or {}).get("description") or d.get("description")
        try:
            p = json.loads(desc)
            return p if p.get("kind") == "ERPSYNC" else None
        except (TypeError, ValueError):
            return None

    def put_payload(self, doc_id, payload):
        body = {"data": [{"id": doc_id, "dataelements": {
            "description": json.dumps(payload, ensure_ascii=False)}}]}
        r = self.auth.request(
            "PUT", f"{self.space_url}{DOC_API}/{doc_id}",
            json=body, headers={"Content-Type": "application/json"})
        if r.status_code == 400 and "modify access" in r.text.lower():
            # Kaydı widget kullanıcısı oluşturduysa Leader bağlamı değiştiremez;
            # yönetici bağlamıyla tekrar dene
            log.info("Retrying document update with the admin security context")
            r = self.auth.request(
                "PUT", f"{self.space_url}{DOC_API}/{doc_id}",
                json=body, headers={"Content-Type": "application/json",
                                    "SecurityContext": self.admin_ctx})
        if r.status_code != 200:
            raise RuntimeError(f"Document update HTTP {r.status_code}: {r.text[:300]}")

    def attach_to_bookmark(self, doc_id):
        """ERPSYNC kaydını ERP SYNC bookmark'ına bağla (izleme için).

        Bookmark başka kullanıcıya ait olduğundan admin bağlamı gerekir; kayıt
        zaten bağlıysa 403 döner — ikisi de sessizce tolere edilir."""
        if not self.bookmark_id:
            return
        body = [{"referencedObject": {
            "identifier": doc_id,
            "relativePath": f"/resources/v1/modeler/documents/{doc_id}",
            "type": "Document",
            "source": self.space_url}}]
        r = self.auth.post(
            f"{self.space_url}/resources/v1/modeler/dsbks/dsbks:Bookmark/"
            f"{self.bookmark_id}/attach",
            json=body, headers={"SecurityContext": self.admin_ctx})
        if r.status_code in (200, 201):
            log.info("ERPSYNC record %s attached to the ERP SYNC bookmark", doc_id)
        elif r.status_code == 403:
            log.debug("bookmark attach skipped (already attached / no access): %s",
                      doc_id)
        else:
            log.warning("bookmark attach HTTP %s: %s", r.status_code, r.text[:150])

    # ---- keşif ----
    def find_records(self):
        res = self.dx.search(
            'flattenedtaxonomies:"types/Document" AND "ERPSYNC_"', nresults=200)
        out = []
        for h in res.get("results", []):
            a = self.dx.result_attrs(h)
            if (a.get("ds6w:label") or "").startswith("ERPSYNC_"):
                out.append(a)
        return out

    def resolve_config_names(self, payload):
        """Tepe kod = konfigürasyonun name'i; widget payload'ı yetersizse dspfl'den al."""
        name = (payload.get("configurationName") or "").strip()
        title = (payload.get("configurationTitle") or "").strip()
        cid = payload["configurationId"]
        if not name or not title:
            pid = (payload.get("productId") or "").strip()
            if pid:
                r = self.auth.get(
                    f"{self.space_url}/resources/v1/modeler/dspfl/dspfl:ModelVersion/"
                    f"{pid}/dspfl:ProductConfiguration?xrequestedwith=xmlhttprequest")
                if r.status_code == 200:
                    for m in r.json().get("member", []):
                        if m.get("id") == cid:
                            name = name or (m.get("name") or "").strip()
                            title = title or (m.get("title") or
                                              m.get("description") or "").strip()
                            break
        if not name:
            raise RuntimeError(f"Could not resolve configuration name: {cid}")
        return name, title

    # ---- işleme ----
    def process(self, doc_id, payload):
        cid = (payload.get("configurationId") or "").strip()
        evolution = payload.get("evolution") or None
        if evolution:
            # Evolution (Model Version): same logic as a configuration - the
            # filtered BOM is sent and the top code is the evolution name
            # (e.g. "Aurora VP3"), the way a configuration name is.
            evolution = {"modelId": payload.get("modelId") or evolution.get("modelId"),
                         "modelCode": evolution.get("modelCode") or payload.get("modelCode"),
                         "name": evolution.get("name"),
                         "revision": evolution.get("revision") or ""}
            if not evolution["modelId"] or not evolution["name"]:
                raise RuntimeError(f"Evolution request is missing model or name: {evolution}")
            cid = ""
            name = evolution["name"]
            title = (payload.get("configurationTitle") or "").strip() or (
                "%s %s" % (evolution["name"], evolution["revision"])).strip()
        elif cid:
            name, title = self.resolve_config_names(payload)
        else:
            # Konfigürasyonsuz gönderim: tepe kod, kökteki Manufacturing
            # Assembly'nin kendi parça numarası olur (bom_sync belirler).
            name, title = None, ""
        log.info("Processing ERPSYNC: %s doc=%s", name or "(no configuration)", doc_id)
        stats = self.sync.sync_config(
            name, payload["rootPhysicalId"], cid,
            top_description=title,
            item_type=payload.get("itemType") or "VPMReference",
            evolution=evolution)
        top_code = stats["top_code"]
        name = name or top_code
        self.db.conn.execute(
            "UPDATE sync_configs SET control_doc_id=?, requested_by=? WHERE top_code=?",
            (doc_id, payload.get("requestedBy") or "", top_code))
        self.db.conn.commit()
        payload["configurationName"] = name
        payload["configurationTitle"] = title
        payload["syncNow"] = False
        payload["status"] = {
            "phase": "ERROR" if stats["errors"] else "ACTIVE",
            "topCode": top_code,
            "lastSyncAt": utcnow(),
            "lastResult": "error" if stats["errors"] else "ok",
            "itemCount": stats.get("desired_items"),
            "bomCount": stats.get("desired_boms"),
            "conflicts": stats.get("conflicts", [])[:5],
            "phantoms": stats.get("phantoms", [])[:5],
            "errors": stats.get("errors", [])[:5],
        }
        self.put_payload(doc_id, payload)
        try:
            self.attach_to_bookmark(doc_id)
        except Exception as e:
            log.warning("bookmark attach failed: %s", e)
        return stats

    @staticmethod
    def _req_hash(payload):
        """İsteğin kimliği: durum yazılamasa bile aynı isteği iki kez işleme."""
        import hashlib
        key = {k: payload.get(k) for k in ("configurationId", "evolution", "rootPhysicalId",
                                           "itemType", "requestedAt", "syncNow")}
        return hashlib.sha1(
            json.dumps(key, sort_keys=True).encode()).hexdigest()

    def _already_processed(self, doc_id, req_hash):
        row = self.db.conn.execute(
            "SELECT payload_hash FROM processed_docs WHERE doc_id=?",
            (doc_id,)).fetchone()
        return bool(row) and row["payload_hash"] == req_hash

    def _mark_processed(self, doc_id, req_hash, result):
        self.db.conn.execute(
            "INSERT INTO processed_docs(doc_id,payload_hash,processed_at,result) "
            "VALUES(?,?,?,?) ON CONFLICT(doc_id) DO UPDATE SET "
            "payload_hash=excluded.payload_hash, processed_at=excluded.processed_at, "
            "result=excluded.result",
            (doc_id, req_hash, utcnow(), result))
        self.db.conn.commit()

    def scan(self):
        """Bir tur: yeni/tekrar istenen kayıtları işle. İşlenen sayısını döner."""
        handled = 0
        for rec in self.find_records():
            doc_id = rec.get("id")
            payload = self.get_payload(doc_id)
            if not payload:
                continue
            phase = (payload.get("status") or {}).get("phase", "REQUESTED")
            if phase == "REQUESTED" or payload.get("syncNow"):
                req_hash = self._req_hash(payload)
                if self._already_processed(doc_id, req_hash):
                    # daha önce işlendi ama durum kayda yazılamamış olabilir —
                    # aynı isteği tekrar tekrar koşturma
                    continue
                try:
                    self.process(doc_id, payload)
                    self._mark_processed(doc_id, req_hash, "ok")
                    handled += 1
                except Exception as e:
                    log.exception("ERPSYNC processing failed: %s", doc_id)
                    self.db.log_error("command_scan", f"{doc_id}: {e}")
                    self._mark_processed(doc_id, req_hash, f"error: {str(e)[:200]}")
                    try:
                        payload["status"] = {"phase": "ERROR", "error": str(e)[:400],
                                             "lastSyncAt": utcnow()}
                        payload["syncNow"] = False
                        self.put_payload(doc_id, payload)
                    except Exception:
                        pass
        return handled
