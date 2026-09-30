# -*- coding: utf-8 -*-
"""Faz 4 testi: Amandas Car konfigürasyonunu BC'ye gönder.

Önce dry-run istatistik gösterir; '--push' argümanıyla gerçekten yazar.
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
from erp_sync.dx import DX

ROOT_EBOM = "D51B2DEDBA38120067FE49E600004E39"   # Zenvo Sample EBOM
CONFIGS = {
    "amandas": ("E99E680858E0170069B40C0B000299FE", '"Amandas Car"'),
    "batman": ("E99E6808A2983A0069B0111C00012788", '"Batman Configuration"'),
}
OLD_WRONG_TOP = "AMANDAS CAR"  # ilk testte yanlışlıkla title ile açılan tepe kod


def config_info(dx, cfg_id, search_term):
    """Product Configuration'ın name (part number) ve title (part name) değerleri."""
    for h in dx.search(search_term, nresults=10).get("results", []):
        a = DX.result_attrs(h)
        if a.get("id") == cfg_id:
            return (a.get("ds6w:identifier") or "").strip(), a.get("ds6w:label", "")
    raise RuntimeError(f"Configuration not found: {cfg_id}")


def remove_top(bc, top_no):
    """Yanlış açılmış tepe kod kaydını BC'den kaldır."""
    it = bc.item_by_number(top_no)
    if it and it.get("productionBOMNo"):
        bc.update("zenItems", it["systemId"], {"productionBOMNo": ""})
    h = bc.bom_header_by_number(top_no)
    if h:
        if h.get("status") != "New":
            bc.set_bom_status(h, "New")
        for ln in bc.bom_lines(top_no):
            bc.delete("zenProductionBOMLines", ln["systemId"])
        bc.delete("zenProductionBOMHeaders", h["systemId"])
    if it:
        bc.delete("zenItems", it["systemId"])
    print(f"   (old top code removed: {top_no})")


def main():
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass
    push = "--push" in sys.argv
    key = next((a for a in sys.argv[1:] if not a.startswith("--")), "amandas")
    cfg_id, term = CONFIGS[key]
    logging.basicConfig(level=logging.INFO, format="%(levelname)-7s %(name)s: %(message)s")
    cfg = Config()
    auth = Auth3DX(cfg)
    auth.login()
    dx = DX(cfg, auth)
    bc = BC(cfg)
    db = DB(cfg.db_path)
    sync = BomSync(cfg, auth, bc, db)

    top_number, top_title = config_info(dx, cfg_id, term)
    print(f"Top code: {top_number}  (Part name: {top_title})")

    if push and top_number.upper() != OLD_WRONG_TOP and bc.item_by_number(OLD_WRONG_TOP):
        remove_top(bc, OLD_WRONG_TOP)

    stats = sync.sync_config(top_number, ROOT_EBOM, cfg_id,
                             top_description=top_title, dry_run=not push)
    mode = "PUSH" if push else "DRY-RUN"
    print(f"\n== {mode} result ({top_number}):")
    for k, v in stats.items():
        if k in ("skipped", "errors", "phantoms", "conflicts"):
            print(f"   {k} ({len(v)}):")
            for s in v[:15]:
                print("     -", s)
            if len(v) > 15:
                print(f"     ... +{len(v)-15} more")
        else:
            print(f"   {k} = {v}")


if __name__ == "__main__":
    main()
