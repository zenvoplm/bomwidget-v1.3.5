# -*- coding: utf-8 -*-
"""One-off: remove name-fallback (PRD-*/SPRD-*) items and their BOM usage from BC.

Steps: find fallback items -> delete BOM lines referencing them (lowering the
owning BOM's status first) -> delete fallback-owned BOM headers -> delete items.
Afterwards run the config syncs so affected BOMs are rewritten and re-certified.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import logging

from erp_sync.bc import BC
from erp_sync.config import Config

PREFIXES = ("PRD-", "SPRD-")


def main():
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass
    logging.basicConfig(level=logging.WARNING)
    bc = BC(Config())

    items = []
    for p in PREFIXES:
        items += bc.list("zenItems", flt=f"startswith(number,'{p}')")
    numbers = {it["number"] for it in items}
    print(f"Fallback items found: {len(items)}")

    # 1) delete BOM lines that reference these items
    lowered = {}
    for no in sorted(numbers):
        for ln in bc.list("zenProductionBOMLines", flt=f"number eq '{no}'"):
            bom_no = ln["productionBOMNo"]
            if bom_no not in lowered:
                h = bc.bom_header_by_number(bom_no)
                if h and h.get("status") == "Certified":
                    bc.set_bom_status(h, "Under Development")
                lowered[bom_no] = h
            bc.delete("zenProductionBOMLines", ln["systemId"])
            print(f"   line removed: {bom_no} -> {no}")

    # 2) delete BOM headers owned by fallback assemblies
    for h in bc.list("zenProductionBOMHeaders"):
        if h["number"].startswith(PREFIXES):
            if h.get("status") != "New":
                bc.set_bom_status(h, "New")
            for ln in bc.bom_lines(h["number"]):
                bc.delete("zenProductionBOMLines", ln["systemId"])
            bc.delete("zenProductionBOMHeaders", h["systemId"])
            print(f"   BOM deleted: {h['number']}")

    # 3) delete the items themselves
    for it in items:
        if it.get("productionBOMNo"):
            bc.update("zenItems", it["systemId"], {"productionBOMNo": ""})
        bc.delete("zenItems", it["systemId"])
    print(f"   {len(items)} item(s) deleted")
    print("Done - now re-run the config syncs to rewrite and re-certify affected BOMs.")


if __name__ == "__main__":
    main()
