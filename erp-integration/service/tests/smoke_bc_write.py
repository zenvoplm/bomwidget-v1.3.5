# -*- coding: utf-8 -*-
"""BC write smoke test - full round trip on ZEN-TEST-* records in the Zenvo_UAT sandbox:

create item -> create BOM header -> add line -> set Certified -> link to parent item ->
read back -> clean up (unlink, lower status, delete line/header/item).
Leaves no permanent data; touches only ZEN-TEST-* records.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import logging

from erp_sync.bc import BC, BCError
from erp_sync.config import Config

ITEM_A = "ZEN-TEST-PART-A"
ITEM_B = "ZEN-TEST-ASM-B"
BOM_NO = "ZEN-TEST-BOM01"


def cleanup(bc):
    """Delete ZEN-TEST records left over from a previous run (idempotent)."""
    b = bc.item_by_number(ITEM_B)
    if b and b.get("productionBOMNo"):
        bc.update("zenItems", b["systemId"], {"productionBOMNo": ""})
    h = bc.bom_header_by_number(BOM_NO)
    if h:
        if h.get("status") != "New":
            try:
                bc.set_bom_status(h, "New")
            except BCError as e:
                print(f"  (statü düşürme: {e})")
        for ln in bc.bom_lines(BOM_NO):
            bc.delete("zenProductionBOMLines", ln["systemId"])
        bc.delete("zenProductionBOMHeaders", h["systemId"])
    for no in (ITEM_A, ITEM_B):
        it = bc.item_by_number(no)
        if it:
            bc.delete("zenItems", it["systemId"])


def main():
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass
    logging.basicConfig(level=logging.INFO, format="%(levelname)-7s %(name)s: %(message)s")
    bc = BC(Config())
    print(f"Company id: {bc.company_id()}")

    print("\n0) Cleaning up leftovers from previous runs...")
    cleanup(bc)

    print("1) Creating items...")
    a, created = bc.upsert_item(ITEM_A, {
        "description": "Smoke test part",
        "carSystem": "TEST-SYS", "outsourced": True,
        "serviceability": "Serviceable", "makeBuy": "Buy",
        "replenishmentSystem": "Purchase"})
    print(f"   {ITEM_A}: {'created' if created else 'existed'} — "
          f"carSystem={a.get('carSystem')} repl={a.get('replenishmentSystem')}")
    b, created = bc.upsert_item(ITEM_B, {"description": "Smoke test assembly"})
    print(f"   {ITEM_B}: {'created' if created else 'existed'}")

    print("2) Creating BOM header...")
    h = bc.create("zenProductionBOMHeaders", {
        "number": BOM_NO, "description": "Smoke test BOM",
        "unitOfMeasureCode": "PCS"})
    print(f"   {BOM_NO}: status={h.get('status')}")

    print("3) Adding line...")
    ln = bc.create("zenProductionBOMLines", {
        "productionBOMNo": BOM_NO, "lineNo": 10000, "type": "Item",
        "number": ITEM_A, "quantityPer": 2, "unitOfMeasureCode": "PCS"})
    print(f"   line 10000: {ln.get('number')} x{ln.get('quantityPer')}")

    print("4) Status → Certified...")
    h = bc.set_bom_status(h, "Certified")
    print(f"   status={h.get('status')}")

    print("5) Linking to parent item (productionBOMNo)...")
    b = bc.update("zenItems", b["systemId"], {"productionBOMNo": BOM_NO,
                                              "replenishmentSystem": "Prod. Order"})
    print(f"   {ITEM_B}.productionBOMNo={b.get('productionBOMNo')} "
          f"repl={b.get('replenishmentSystem')}")

    print("6) Read-back verification...")
    lines = bc.bom_lines(BOM_NO)
    assert len(lines) == 1 and lines[0]["number"] == ITEM_A, "line verification failed"
    print(f"   OK - {len(lines)} line(s)")

    print("7) Cleanup...")
    cleanup(bc)
    assert bc.item_by_number(ITEM_A) is None, "cleanup failed (item A still present)"
    assert bc.bom_header_by_number(BOM_NO) is None, "cleanup failed (BOM still present)"
    print("   OK — no traces left in the sandbox")

    print("\nBC write smoke test PASSED - full CRUD + Certify flow works.")


if __name__ == "__main__":
    main()
