# -*- coding: utf-8 -*-
"""3DX oturum duman testi (SALT-OKUNUR): Passport girişi + CSRF + basit bir çağrı."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import logging

from erp_sync.auth3dx import Auth3DX
from erp_sync.config import Config


def main():
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass
    logging.basicConfig(level=logging.INFO, format="%(levelname)-7s %(name)s: %(message)s")
    cfg = Config()
    dx = Auth3DX(cfg)
    dx.login()
    print(f"CSRF token acquired: {dx.csrf_token[:12]}...")

    # Basit doğrulama: güvenlik bağlamlarıyla birlikte oturum kullanıcısı
    r = dx.get(f"{dx.space_url}/resources/modeler/pno/person"
               f"?current=true&select=preferredcredentials")
    print(f"person endpoint: HTTP {r.status_code}")
    if r.status_code == 200:
        print(str(r.json())[:400])
    else:
        print(r.text[:400])
    print("\n3DX smoke test complete.")


if __name__ == "__main__":
    main()
