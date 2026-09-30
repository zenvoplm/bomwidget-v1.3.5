# -*- coding: utf-8 -*-
"""3DEXPERIENCE Passport/CAS kimlik doğrulaması (DFC Manager kalıbı).

Akış: 3DPassport'tan login ticket → CAS ile kullanıcı adı/şifre doğrulaması →
3DSpace'ten CSRF token. Cookie'ler data/cookies.json'da saklanır; oturum düşünce
otomatik yeniden giriş yapılır.
"""
import json
import logging
from http.cookiejar import Cookie

import requests

log = logging.getLogger("erpsync.auth3dx")


class AuthError(Exception):
    pass


class Auth3DX:
    def __init__(self, cfg):
        self.space_url = cfg.dx["space_url"].rstrip("/")
        self.passport_url = cfg.dx["passport_url"].rstrip("/")
        self.tenant = cfg.dx.get("tenant", "")
        self.username = cfg.dx["username"]
        self.password = cfg.dx["password"]
        self.security_context = cfg.dx.get("security_context", "")
        self.verify_ssl = cfg.dx.get("verify_ssl", True)
        self.cookies_path = cfg.cookies_path
        self.timeout = 60
        self.csrf_token = None
        self.session = requests.Session()
        self.session.verify = self.verify_ssl
        self.session.headers.update({
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                          "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
        })
        self._load_cookies()

    # ---- cookie kalıcılığı ----
    def _load_cookies(self):
        if not self.cookies_path.exists():
            return
        try:
            data = json.loads(self.cookies_path.read_text(encoding="utf-8"))
            for c in data:
                self.session.cookies.set_cookie(Cookie(
                    version=0, name=c["name"], value=c["value"], port=None,
                    port_specified=False, domain=c["domain"], domain_specified=True,
                    domain_initial_dot=c["domain"].startswith("."),
                    path=c.get("path", "/"), path_specified=True,
                    secure=c.get("secure", True), expires=c.get("expires"),
                    discard=False, comment=None, comment_url=None, rest={}))
        except Exception as e:
            log.warning("cookies.json unreadable, performing full login: %s", e)

    def _save_cookies(self):
        data = [
            {"name": c.name, "value": c.value, "domain": c.domain,
             "path": c.path, "secure": c.secure, "expires": c.expires}
            for c in self.session.cookies
        ]
        self.cookies_path.write_text(json.dumps(data, indent=1), encoding="utf-8")

    # ---- giriş ----
    def _fetch_csrf(self):
        r = self.session.get(
            f"{self.space_url}/resources/v1/application/CSRF",
            params={"tenant": self.tenant} if self.tenant else None,
            headers={"Accept": "application/json"}, timeout=self.timeout)
        if r.status_code == 200:
            try:
                j = r.json()
                tok = j.get("csrf", {})
                if tok.get("value"):
                    self.csrf_token = tok["value"]
                    return True
            except ValueError:
                pass
        return False

    def _cas_login(self):
        """3DPassport girişi: login ticket al → kimlik bilgileriyle POST (service'siz).

        Passport oturumu (TGT cookie) kurulduktan sonra 3DSpace'e yapılan ilk istek,
        CAS yönlendirme zinciriyle otomatik olarak space oturumunu da kurar.
        CAS host'u config'teki passport_url değil, space'in yönlendirdiği tenant'a
        özel IAM host'u olabilir — önce yönlendirmeden keşfedilir.
        """
        cas_base = self._discover_cas_base()
        r = self.session.get(
            f"{cas_base}/login",
            params={"action": "get_auth_params"},
            headers={"Accept": "application/json"}, timeout=self.timeout)
        if r.status_code != 200:
            raise AuthError(f"3DPassport unreachable (HTTP {r.status_code})")
        lt = r.json().get("lt")
        if not lt:
            raise AuthError("Could not obtain login ticket (lt)")
        r2 = self.session.post(
            f"{cas_base}/login",
            data={"lt": lt, "username": self.username, "password": self.password},
            timeout=self.timeout, allow_redirects=True)
        if r2.status_code != 200:
            raise AuthError(f"CAS login rejected (HTTP {r2.status_code}, {r2.url}) - "
                            "check username/password")
        log.info("3DPassport login successful (%s)", cas_base)

    def _discover_cas_base(self):
        """3DSpace'in yönlendirdiği gerçek CAS/IAM host'unu bul."""
        r = self.session.get(
            f"{self.space_url}/resources/v1/application/CSRF",
            allow_redirects=False, timeout=self.timeout)
        loc = r.headers.get("Location", "")
        if "/login" in loc:
            base = loc.split("/login")[0]
            log.info("CAS host discovered: %s", base)
            return base
        return self.passport_url

    def login(self, force=False):
        if not force and self._fetch_csrf():
            log.info("Existing session is valid (from cookies)")
            return
        self.session.cookies.clear()
        self.csrf_token = None
        self._cas_login()
        if not self._fetch_csrf():
            raise AuthError("No CSRF token after login - session not established")
        self._save_cookies()
        log.info("3DX session ready")

    # ---- istekler ----
    def headers(self, extra=None):
        h = {"Accept": "application/json"}
        if self.csrf_token:
            h["ENO_CSRF_TOKEN"] = self.csrf_token
        if self.security_context:
            h["SecurityContext"] = self.security_context
        if extra:
            h.update(extra)
        return h

    def request(self, method, url, retry_on_auth=True, **kw):
        if self.csrf_token is None:
            self.login()
        kw.setdefault("timeout", self.timeout)
        headers = self.headers(kw.pop("headers", None))
        r = self.session.request(method, url, headers=headers, **kw)
        expired = r.status_code in (401, 403) or (
            r.status_code == 200 and "text/html" in r.headers.get("Content-Type", "")
            and "login" in r.text[:2000].lower())
        if expired and retry_on_auth:
            log.info("Session appears expired, logging in again")
            self.login(force=True)
            headers = self.headers()
            r = self.session.request(method, url, headers=headers, **kw)
        return r

    def get(self, url, **kw):
        return self.request("GET", url, **kw)

    def post(self, url, **kw):
        return self.request("POST", url, **kw)
