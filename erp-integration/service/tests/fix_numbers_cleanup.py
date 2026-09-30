# -*- coding: utf-8 -*-
"""One-off: delete test records created with the wrong (name-based) numbers from BC.

Scope: PRD-* / SPRD-* / ZA-* items and BOMs (BOM-DEMO* records are left alone),
plus a reset of the bom_ownership signature table.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import logging

from erp_sync.bc import BC
from erp_sync.config import Config
from erp_sync.db import DB

PREFIXES = ("PRD-", "SPRD-", "ZA-")


def main():
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass
    logging.basicConfig(level=logging.WARNING)
    cfg = Config()
    bc = BC(cfg)
    db = DB(cfg.db_path)

    items = []
    for p in PREFIXES:
        items += bc.list("zenItems", flt=f"startswith(number,'{p}')")
    headers = [h for h in bc.list("zenProductionBOMHeaders")
               if h["number"].startswith(PREFIXES)]
    print(f"To delete: {len(items)} item, {len(headers)} BOM")

    for it in items:
        if it.get("productionBOMNo"):
            bc.update("zenItems", it["systemId"], {"productionBOMNo": ""})
    for h in headers:
        if h.get("status") != "New":
            bc.set_bom_status(h, "New")
        for ln in bc.bom_lines(h["number"]):
            bc.delete("zenProductionBOMLines", ln["systemId"])
        bc.delete("zenProductionBOMHeaders", h["systemId"])
        print(f"   BOM deleted: {h['number']}")
    for it in items:
        bc.delete("zenItems", it["systemId"])
    print(f"   {len(items)} item(s) deleted")

    db.conn.execute("DELETE FROM bom_ownership")
    db.conn.commit()
    print("   bom_ownership reset")
    print("Cleanup complete.")


if __name__ == "__main__":
    main()
