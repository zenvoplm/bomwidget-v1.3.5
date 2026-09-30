# -*- coding: utf-8 -*-
"""Konfigürasyonsuz MBOM testi: Zenvo Sample SBOM kökü, filtresiz açılım.

Tepe kod = kök Manufacturing Assembly'nin kendi parça numarası (scope EngItem
Enterprise No + Partrevision). Varsayılan dry-run; '--push' ile BC'ye yazar.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import logging

from erp_sync.auth3dx import Auth3DX
from erp_sync.bc import BC
from erp_sync.bom_sync import BomSync
from erp_sync.config import Config
from erp_sync.db import DB

ROOT_SBOM = "0E18FEBF000056046821E715001830DB"  # Zenvo Sample SBOM (CreateAssembly)


def main():
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass
    push = "--push" in sys.argv
    logging.basicConfig(level=logging.INFO, format="%(levelname)-7s %(name)s: %(message)s")
    cfg = Config()
    auth = Auth3DX(cfg)
    auth.login()
    sync = BomSync(cfg, auth, BC(cfg), DB(cfg.db_path))

    stats = sync.sync_config(None, ROOT_SBOM, "", item_type="CreateAssembly",
                             dry_run=not push)
    print(f"\n== {'PUSH' if push else 'DRY-RUN'} result:")
    print(f"   TOP CODE = {stats['top_code']}")
    for k, v in stats.items():
        if k in ("skipped", "conflicts", "errors"):
            print(f"   {k} ({len(v)}):")
            for s in v[:12]:
                print("     -", s)
            if len(v) > 12:
                print(f"     ... +{len(v)-12} more")
        elif k != "top_code":
            print(f"   {k} = {v}")


if __name__ == "__main__":
    main()
