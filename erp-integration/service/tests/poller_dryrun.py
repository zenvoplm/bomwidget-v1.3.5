# -*- coding: utf-8 -*-
"""Release Poller kuru-çalıştırma (SALT-OKUNUR — BC'ye yazmaz).

1) Gerçek mod: RELEASED Mfg item'lar (bugün 0 beklenir).
2) Gösterim: IN_WORK'ten 5 örnekle ne yapılacağını listeler.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import logging

from erp_sync.auth3dx import Auth3DX
from erp_sync.bc import BC
from erp_sync.config import Config
from erp_sync.db import DB
from erp_sync.dx import DX
from erp_sync.release_poller import ReleasePoller


def show(plan):
    if not plan:
        print("   (no candidates)")
    for p in plan:
        print(f"   [{p['action']:8}] {p['number']:24} rev={p['revision']:3} "
              f"modified={p['modified'][:19]}")


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
    bc = BC(cfg)
    db = DB(cfg.db_path)
    poller = ReleasePoller(cfg, dx, bc, db)

    print("\n== 1) RELEASED (real mode, dry-run):")
    show(poller.poll(dry_run=True, state="RELEASED"))

    print("\n== 2) 5 samples from IN_WORK (illustration only, dry-run):")
    show(poller.poll(dry_run=True, state="IN_WORK", limit=5))

    print("\nDry-run complete - nothing was written to BC.")


if __name__ == "__main__":
    main()
