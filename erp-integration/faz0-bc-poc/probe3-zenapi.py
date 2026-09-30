# -*- coding: utf-8 -*-
"""Deploy sonrası doğrulama (SALT-OKUNUR): zenvo/erpsync özel API'leri çalışıyor mu?"""
import json
import sys

import requests

from probe import RAW, TIMEOUT, get_token, load_config

API = "api/zenvo/erpsync/v1.0"


def show(sess, url, name, save_as):
    r = sess.get(url, timeout=TIMEOUT)
    RAW.mkdir(exist_ok=True)
    (RAW / save_as).write_bytes(r.content)
    print(f"\n== {name} → HTTP {r.status_code}")
    if r.status_code != 200:
        print(r.text[:500])
        return
    vals = r.json().get("value", [])
    print(f"   {len(vals)} kayıt")
    if vals:
        print("   Alanlar:", ", ".join(vals[0].keys()))
        for v in vals[:3]:
            print("   -", json.dumps(v, ensure_ascii=False)[:220])


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

    r = sess.get(f"{root}/{API}/companies", timeout=TIMEOUT)
    if r.status_code != 200:
        print(f"[HATA] Özel API rotası yok (HTTP {r.status_code}) — extension yüklü mü, "
              f"'ZEN ERP SYNC' permission set'i Entra uygulamasına eklendi mi?\n{r.text[:400]}")
        sys.exit(1)
    companies = r.json().get("value", [])
    wanted = (cfg.get("company_name") or "").strip().lower()
    company = next(
        (c for c in companies if wanted and wanted in c.get("name", "").lower()),
        companies[0],
    )
    print(f"Şirket: {company.get('name')}")
    cid = company["id"]

    base = f"{root}/{API}/companies({cid})"
    show(sess, f"{base}/zenItems?$top=2", "zenItems", "zen_items.json")
    show(sess, f"{base}/zenProductionBOMHeaders?$top=5", "zenProductionBOMHeaders", "zen_bomheaders.json")
    show(sess, f"{base}/zenProductionBOMLines?$top=5", "zenProductionBOMLines", "zen_bomlines.json")
    print("\nBitti — üçü de 200 döndüyse Faz 1'e (servis iskeleti) geçilebilir.")


if __name__ == "__main__":
    main()
