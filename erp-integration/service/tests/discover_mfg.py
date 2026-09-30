# -*- coding: utf-8 -*-
"""Faz 2 keşfi (SALT-OKUNUR): released Mfg item'ları ara, alan adlarını gör."""
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
    logging.basicConfig(level=logging.INFO, format="%(levelname)-7s %(name)s: %(message)s")
    cfg = Config()
    auth = Auth3DX(cfg)
    auth.login()
    dx = DX(cfg, auth)

    q = dx.released_mfg_query()
    print("Sorgu:", q)
    res = dx.search(q, nresults=5)
    total = res.get("infos", {}).get("nmatches") or res.get("totalHits") or "?"
    hits = res.get("results", [])
    print(f"\nToplam eşleşme (yaklaşık): {total} | dönen: {len(hits)}")
    if not hits:
        print("Ham yanıt anahtarları:", list(res.keys()))
        print(json.dumps(res, ensure_ascii=False)[:1500])
        return

    print("\n== İlk sonuç (ham):")
    print(json.dumps(hits[0], indent=1, ensure_ascii=False)[:2000])

    attrs = DX.result_attrs(hits[0])
    print("\n== Düzleştirilmiş:")
    for k, v in attrs.items():
        print(f"   {k} = {v}")

    pid = attrs.get("id")
    if pid:
        print(f"\n== dsmfg detay ({pid}):")
        try:
            detail = dx.mfg_item(pid)
            print(json.dumps(detail, indent=1, ensure_ascii=False)[:2500])
        except RuntimeError as e:
            print("detay hatası:", e)


if __name__ == "__main__":
    main()
