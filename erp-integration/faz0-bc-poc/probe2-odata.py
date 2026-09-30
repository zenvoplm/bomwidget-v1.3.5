# -*- coding: utf-8 -*-
"""Faz 0 ek keşif (SALT-OKUNUR): ODataV4 Page_99000788_Excel hangi sayfa, veri var mı?"""
import json
import sys
import urllib.parse

import requests

from probe import RAW, TIMEOUT, get_token, load_config


def main():
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass
    cfg = load_config()
    token = get_token(cfg)
    sess = requests.Session()
    sess.headers.update({"Authorization": f"Bearer {token}", "Accept": "application/json"})
    root = f"https://api.businesscentral.dynamics.com/v2.0/{cfg['tenant_id']}/{cfg['environment']}"
    comp = urllib.parse.quote(cfg.get("company_name") or "", safe="")
    url = f"{root}/ODataV4/Company('{comp}')/Page_99000788_Excel?$top=2"
    r = sess.get(url, timeout=TIMEOUT)
    RAW.mkdir(exist_ok=True)
    (RAW / "page99000788_sample.json").write_bytes(r.content)
    print("HTTP", r.status_code)
    if r.status_code == 200:
        vals = r.json().get("value", [])
        print(f"{len(vals)} kayıt döndü")
        if vals:
            print("Alanlar:", ", ".join(vals[0].keys()))
            print(json.dumps(vals[0], indent=2, ensure_ascii=False)[:1500])
        else:
            print("(sayfa var ama kayıt yok)")
    else:
        print(r.text[:800])


if __name__ == "__main__":
    main()
