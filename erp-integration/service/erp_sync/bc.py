# -*- coding: utf-8 -*-
"""Business Central adapter — api/zenvo/erpsync/v1.0 üzerinden item ve BOM CRUD."""
import logging
import time

import requests

log = logging.getLogger("erpsync.bc")

TOKEN_URL = "https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token"
SCOPE = "https://api.businesscentral.dynamics.com/.default"
API = "api/zenvo/erpsync/v1.0"


class BCError(Exception):
    def __init__(self, msg, status=None, body=None):
        if body:
            msg = f"{msg} | {str(body)[:200]}"
        super().__init__(msg)
        self.status = status
        self.body = body


class BC:
    def __init__(self, cfg):
        c = cfg.bc
        self.tenant_id = c["tenant_id"]
        self.environment = c["environment"]
        self.client_id = c["client_id"]
        self.client_secret = c["client_secret"]
        self.company_name = c.get("company_name", "")
        self.item_defaults = c.get("item_defaults", {})
        self.root = (f"https://api.businesscentral.dynamics.com/v2.0/"
                     f"{self.tenant_id}/{self.environment}")
        self.timeout = 60
        self._token = None
        self._token_exp = 0
        self._company_id = None
        self.session = requests.Session()

    # ---- auth ----
    def token(self):
        if self._token and time.time() < self._token_exp - 300:
            return self._token
        r = self.session.post(
            TOKEN_URL.format(tenant=self.tenant_id),
            data={"grant_type": "client_credentials", "client_id": self.client_id,
                  "client_secret": self.client_secret, "scope": SCOPE},
            timeout=self.timeout)
        if r.status_code != 200:
            raise BCError(f"Could not obtain BC token: HTTP {r.status_code}", r.status_code, r.text)
        j = r.json()
        self._token = j["access_token"]
        self._token_exp = time.time() + int(j.get("expires_in", 3600))
        return self._token

    def _headers(self, extra=None):
        h = {"Authorization": f"Bearer {self.token()}", "Accept": "application/json"}
        if extra:
            h.update(extra)
        return h

    def company_id(self):
        if self._company_id:
            return self._company_id
        r = self.session.get(f"{self.root}/{API}/companies",
                             headers=self._headers(), timeout=self.timeout)
        if r.status_code != 200:
            raise BCError(f"Could not fetch companies: HTTP {r.status_code}", r.status_code, r.text)
        comps = r.json().get("value", [])
        wanted = self.company_name.strip().lower()
        comp = next((c for c in comps if wanted and wanted in c.get("name", "").lower()),
                    comps[0] if comps else None)
        if not comp:
            raise BCError("BC company not found")
        self._company_id = comp["id"]
        return self._company_id

    def _base(self):
        return f"{self.root}/{API}/companies({self.company_id()})"

    # ---- genel CRUD ----
    def _req(self, method, url, **kw):
        kw.setdefault("timeout", self.timeout)
        extra = kw.pop("headers", None)
        try:
            r = self.session.request(method, url, headers=self._headers(extra), **kw)
        except requests.exceptions.ConnectionError as e:
            # anlık ağ kopması: kısa bekle, bir kez daha dene
            log.warning("connection error, retrying once: %s", str(e)[:120])
            time.sleep(3)
            r = self.session.request(method, url, headers=self._headers(extra), **kw)
        if r.status_code == 401:  # token süresi — bir kez tazele
            self._token = None
            r = self.session.request(method, url, headers=self._headers(extra), **kw)
        return r

    def list(self, entity, flt=None, top=None):
        params = {}
        if flt:
            params["$filter"] = flt
        if top:
            params["$top"] = str(top)
        r = self._req("GET", f"{self._base()}/{entity}", params=params)
        if r.status_code != 200:
            raise BCError(f"Could not list {entity}: HTTP {r.status_code}", r.status_code, r.text)
        return r.json().get("value", [])

    def create(self, entity, payload):
        r = self._req("POST", f"{self._base()}/{entity}", json=payload,
                      headers={"Content-Type": "application/json"})
        if r.status_code not in (200, 201):
            raise BCError(f"Could not create {entity}: HTTP {r.status_code}", r.status_code, r.text)
        return r.json()

    def update(self, entity, system_id, payload):
        r = self._req("PATCH", f"{self._base()}/{entity}({system_id})", json=payload,
                      headers={"Content-Type": "application/json", "If-Match": "*"})
        if r.status_code != 200:
            raise BCError(f"Could not update {entity}: HTTP {r.status_code}", r.status_code, r.text)
        return r.json()

    def delete(self, entity, system_id):
        r = self._req("DELETE", f"{self._base()}/{entity}({system_id})",
                      headers={"If-Match": "*"})
        if r.status_code not in (200, 204):
            raise BCError(f"Could not delete {entity}: HTTP {r.status_code}", r.status_code, r.text)

    # ---- standart API (api/v2.0) yardımcıları ----
    def _std_base(self):
        return f"{self.root}/api/v2.0/companies({self.company_id()})"

    def ensure_uom(self, code, display_name=None, isc=None):
        """Birim kodu BC'de yoksa oluştur (Units of Measure)."""
        if not hasattr(self, "_uom_cache"):
            self._uom_cache = set()
            r = self._req("GET", f"{self._std_base()}/unitsOfMeasure")
            if r.status_code == 200:
                self._uom_cache = {u.get("code") for u in r.json().get("value", [])}
        if not code or code in self._uom_cache:
            return
        r = self._req("POST", f"{self._std_base()}/unitsOfMeasure",
                      json={"code": code, "displayName": display_name or code,
                            "internationalStandardCode": isc or ""},
                      headers={"Content-Type": "application/json"})
        if r.status_code in (200, 201):
            log.info("Created BC unit of measure: %s", code)
            self._uom_cache.add(code)
        else:
            raise BCError(f"Could not create unit of measure {code}: "
                          f"HTTP {r.status_code}", r.status_code, r.text)

    @staticmethod
    def norm_val(v):
        """OData enum kodlamasını çöz (Prod_x002E__x0020_Order → 'Prod. Order')."""
        if isinstance(v, str):
            return v.replace("_x002E_", ".").replace("_x0020_", " ").strip()
        return v

    # ---- item yardımcıları ----
    def preload_items(self):
        """Tüm item kartlarını tek istekte önbelleğe al (büyük BOM'larda şart:
        aksi halde kart başına bir sorgu gider)."""
        rows = self.list("zenItems")
        self._items = {r["number"].upper(): r for r in rows}
        log.info("Preloaded %d BC item(s)", len(self._items))
        return self._items

    def item_by_number(self, number):
        cache = getattr(self, "_items", None)
        if cache is not None:
            return cache.get(number.upper())
        rows = self.list("zenItems", flt=f"number eq '{number}'", top=1)
        return rows[0] if rows else None

    def _cache_put(self, item):
        cache = getattr(self, "_items", None)
        if cache is not None and item and item.get("number"):
            cache[item["number"].upper()] = item

    def upsert_item(self, number, fields):
        """Kart garanti modülü: yoksa varsayılanlarla aç, varsa alanları güncelle."""
        existing = self.item_by_number(number)
        if existing is None:
            payload = {"number": number}
            payload.update(self.item_defaults)
            payload.update(fields)
            log.info("Creating BC item: %s", number)
            created = self.create("zenItems", payload)
            self._cache_put(created)
            return created, True
        changed = {k: v for k, v in fields.items()
                   if self.norm_val(existing.get(k)) != self.norm_val(v)}
        if changed:
            log.info("Updating BC item: %s (%s)", number, ", ".join(changed))
            updated = self.update("zenItems", existing["systemId"], changed)
            self._cache_put(updated)
            return updated, False
        return existing, False

    # ---- BOM yardımcıları ----
    def bom_header_by_number(self, number):
        rows = self.list("zenProductionBOMHeaders", flt=f"number eq '{number}'", top=1)
        return rows[0] if rows else None

    def bom_lines(self, bom_no):
        return self.list("zenProductionBOMLines",
                         flt=f"productionBOMNo eq '{bom_no}' and versionCode eq ''")

    def set_bom_status(self, header, status):
        return self.update("zenProductionBOMHeaders", header["systemId"],
                           {"status": status})
