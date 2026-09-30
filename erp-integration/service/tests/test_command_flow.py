# -*- coding: utf-8 -*-
"""End-to-end command flow test: create ERPSYNC record -> let the scanner process
it -> read the status back.

Issues exactly the same Document call the widget button makes (so the button's API
contract is verified too). Retries a few rounds to absorb fedsearch indexing delay.
"""
import json
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import logging

from erp_sync.auth3dx import Auth3DX
from erp_sync.bc import BC
from erp_sync.bom_sync import BomSync
from erp_sync.commands import CommandScanner
from erp_sync.config import Config
from erp_sync.db import DB
from erp_sync.dx import DX

ROOT_EBOM = "D51B2DEDBA38120067FE49E600004E39"
CFG_AMANDAS = "E99E680858E0170069B40C0B000299FE"


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
    scanner = CommandScanner(cfg, auth, dx, bc, db, BomSync(cfg, auth, bc, db))

    print("0) Cleaning up previous test records...")
    for rec in scanner.find_records():
        if rec.get("ds6w:label") == f"ERPSYNC_{CFG_AMANDAS}":
            r = auth.request("DELETE",
                             f"{scanner.space_url}/resources/v1/modeler/documents/{rec['id']}")
            print(f"   old record deleted ({rec['id']}): HTTP {r.status_code}")

    print("1) Creating ERPSYNC record (identical to the widget call)...")
    payload = {
        "kind": "ERPSYNC", "version": 1,
        "configurationId": CFG_AMANDAS,
        "configurationName": "", "configurationTitle": "",   # left empty on purpose: exercises dspfl lookup
        "modelId": "", "productId": "9E83F475DE56280067E50BDF0001F274",
        "rootPhysicalId": ROOT_EBOM,
        "itemType": "VPMReference",
        "requestedBy": "test-emrah",
        "requestedAt": utc(),
        "syncNow": True,
        "status": {"phase": "REQUESTED"},
    }
    doc_id = scanner.create_record(payload)
    print(f"   doc_id = {doc_id}")

    print("2) Scanner rounds (waiting for fedsearch indexing)...")
    for attempt in range(10):
        n = scanner.scan()
        print(f"   round {attempt+1}: {n} record(s) processed")
        if n:
            break
        time.sleep(20)
    else:
        print("   [WARNING] fedsearch did not see the record - indexing delay may be long")

    print("3) Status stored in the record:")
    final = scanner.get_payload(doc_id)
    print(json.dumps(final, indent=2, ensure_ascii=False)[:1200])


def utc():
    from erp_sync.db import utcnow
    return utcnow()


if __name__ == "__main__":
    main()
