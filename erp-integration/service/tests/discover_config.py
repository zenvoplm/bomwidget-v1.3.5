# -*- coding: utf-8 -*-
"""Faz 4 keşfi (SALT-OKUNUR): Zenvo Sample kökü + Amandas Car / Batman konfigürasyonları."""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import logging

from erp_sync.auth3dx import Auth3DX
from erp_sync.config import Config
from erp_sync.dx import DX


def main():
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass
    logging.basicConfig(level=logging.WARNING)
    cfg = Config()
    auth = Auth3DX(cfg)
    auth.login()
    dx = DX(cfg, auth)
    space = dx.space_url

    print("== 1) Arama: aday kökler ve konfigürasyonlar")
    for term in ('"Zenvo Sample"', '"Amandas"', '"Batman"'):
        res = dx.search(term, nresults=8)
        hits = res.get("results", [])
        print(f"\n   {term} → {res.get('infos', {}).get('nmatches')} eşleşme")
        for h in hits:
            a = DX.result_attrs(h)
            print(f"     - [{a.get('ds6w:what/ds6w:type'):24}] {a.get('ds6w:label')} "
                  f"(rev {a.get('ds6wg:revision')}, {a.get('current')}) id={a.get('id')}")

    # VPMReference kök adayını bul
    res = dx.search('"Zenvo Sample" AND flattenedtaxonomies:"types/VPMReference"', nresults=5)
    hits = res.get("results", [])
    if not hits:
        print("\nVPMReference kökü bulunamadı — yukarıdaki listeden manuel seçeceğiz.")
        return
    root = DX.result_attrs(hits[0])
    rid = root["id"]
    print(f"\n== 2) Kök: {root.get('ds6w:label')} ({rid})")

    r = auth.get(f"{space}/resources/v1/modeler/dseng/dseng:EngItem/{rid}/dscfg:Configured"
                 "?xrequestedwith=xmlhttprequest")
    print(f"   dscfg:Configured → HTTP {r.status_code}")
    if r.status_code != 200:
        print(r.text[:400])
        return
    models = r.json().get("member", [])
    print(f"   {len(models)} model")
    for m in models:
        print("   model:", json.dumps(m, ensure_ascii=False)[:300])

    for m in models:
        mid = m.get("id")
        r = auth.get(f"{space}/resources/v1/modeler/dspfl/dspfl:Model/{mid}"
                     "?$mask=dsmvpfl:ModelRootVersionMask&xrequestedwith=xmlhttprequest")
        if r.status_code != 200:
            print(f"   Model {mid} → HTTP {r.status_code}")
            continue
        versions = r.json().get("member", [])
        for v in versions:
            vid = v.get("id") if isinstance(v, dict) else None
            print(f"   modelVersion: {json.dumps(v, ensure_ascii=False)[:250]}")
            if not vid:
                continue
            r2 = auth.get(f"{space}/resources/v1/modeler/dspfl/dspfl:ModelVersion/{vid}"
                          "/dspfl:ProductConfiguration?xrequestedwith=xmlhttprequest")
            print(f"   → configs HTTP {r2.status_code}")
            if r2.status_code == 200:
                for c in r2.json().get("member", []):
                    print(f"      CONFIG: name={c.get('name')!r} title={c.get('title')!r} "
                          f"id={c.get('id')} state={c.get('state')}")


if __name__ == "__main__":
    main()
