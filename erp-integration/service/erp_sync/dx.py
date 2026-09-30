# -*- coding: utf-8 -*-
"""3DEXPERIENCE veri erişimi: Federated Search + dsmfg MfgItem detayları."""
import logging

log = logging.getLogger("erpsync.dx")

MFG_TYPES = ["CreateAssembly", "ElementaryEndItem", "Provide", "CreateKit",
             "CreateMaterial", "ProcessContinuousProvide"]


class DX:
    def __init__(self, cfg, auth):
        self.auth = auth
        self.tenant = cfg.dx["tenant"]
        self.space_url = cfg.dx["space_url"].rstrip("/")
        # search host: <tenant>-eu1-space... → <tenant>-eu1-fedsearch...
        default_search = self.space_url.split("/enovia")[0].replace("-space", "-fedsearch")
        self.search_url = cfg.dx.get("search_url", default_search).rstrip("/")
        self._ensured = set()

    def ensure_service(self, base):
        """Farklı 3DX servisi (ör. search) için CAS el sıkışmasını tetikle."""
        if base in self._ensured:
            return
        r = self.auth.get(base + "/", retry_on_auth=False)
        log.debug("ensure_service %s → %s", base, r.status_code)
        self._ensured.add(base)

    # ---- Federated Search ----
    def search(self, query, nresults=100, next_start=None, select=None):
        self.ensure_service(self.search_url)
        body = {
            "label": "zen-erpsync",
            "query": query,
            "start": "0",
            "nresults": nresults,
            "with_indexing_date": True,
            "tenant": self.tenant,
            "select_predicate": select or [
                "ds6w:label", "ds6w:identifier", "ds6w:type", "ds6wg:revision",
                "current", "ds6w:modified", "ds6w:created",
                "ds6wg:EnterpriseExtension.V_PartNumber",
            ],
        }
        if next_start:
            body["next_start"] = next_start
        url = f"{self.search_url}/federated/search?xrequestedwith=xmlhttprequest"
        r = self.auth.post(url, json=body)
        if r.status_code in (400, 401) and "x3ds_auth_url" in r.text:
            # Servise özel CAS bileti gerekiyor: verilen auth URL'sini takip et, tekrarla
            auth_url = r.json().get("x3ds_auth_url")
            log.info("acquiring service ticket for fedsearch")
            self.auth.session.get(auth_url, timeout=60, allow_redirects=True)
            r = self.auth.post(url, json=body)
        if r.status_code != 200:
            raise RuntimeError(f"federated search HTTP {r.status_code}: {r.text[:400]}")
        return r.json()

    @staticmethod
    def result_attrs(hit):
        """Bir arama sonucunun attribute listesini dict'e çevir."""
        out = {}
        for a in hit.get("attributes", []):
            out[a.get("name")] = a.get("value")
        out["id"] = hit.get("id") or out.get("resourceid")
        return out

    @staticmethod
    def released_mfg_query(modified_since=None, state="RELEASED"):
        types = " OR ".join(f'flattenedtaxonomies:"types/{t}"' for t in MFG_TYPES)
        q = f'({types}) AND current:"{state}"'
        if modified_since:
            q += f' AND modified:>="{modified_since}"'
        return q

    def search_all(self, query, page_size=200, max_results=None, select=None):
        """Sayfalayarak tüm sonuçları getir."""
        out, next_start = [], None
        while True:
            res = self.search(query, nresults=page_size, next_start=next_start,
                              select=select)
            hits = res.get("results", [])
            out.extend(hits)
            infos = res.get("infos", {})
            next_start = infos.get("next_start")
            if not hits or next_start is None or (
                    max_results and len(out) >= max_results):
                break
            if len(out) >= infos.get("nmatches", 0):
                break
        return out[:max_results] if max_results else out

    # ---- dsmfg detay ----
    def mfg_item(self, physical_id):
        r = self.auth.get(
            f"{self.space_url}/resources/v1/modeler/dsmfg/dsmfg:MfgItem/{physical_id}"
            f"?xrequestedwith=xmlhttprequest&$mask=dsmfg:MfgItemMask.Details")
        if r.status_code != 200:
            raise RuntimeError(f"MfgItem {physical_id} HTTP {r.status_code}: {r.text[:300]}")
        members = r.json().get("member", [])
        return members[0] if members else None
