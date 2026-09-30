# -*- coding: utf-8 -*-
"""ERP Sync Service — ana döngü iskeleti (Faz 1).

Üç periyodik iş: komut tarayıcı (ERPSYNC kontrol kayıtları), release poller,
BOM senkron döngüsü. Faz 2-4'te içleri dolduruluyor; iskelet çalışır durumda.
"""
import json
import logging
import logging.handlers
import time

from erp_sync.auth3dx import Auth3DX
from erp_sync.bc import BC
from erp_sync.config import Config
from erp_sync.db import DB
from erp_sync.dx import DX
from erp_sync.release_poller import ReleasePoller


def setup_logging(cfg):
    fmt = logging.Formatter("%(asctime)s %(levelname)-7s %(name)s: %(message)s")
    root = logging.getLogger()
    root.setLevel(logging.INFO)
    fh = logging.handlers.RotatingFileHandler(
        cfg.logs_dir / "erpsync.log", maxBytes=5_000_000, backupCount=5,
        encoding="utf-8")
    fh.setFormatter(fmt)
    sh = logging.StreamHandler()
    sh.setFormatter(fmt)
    root.addHandler(fh)
    root.addHandler(sh)


def scan_commands(dx, bc, db):
    """3DX'teki ERPSYNC kontrol kayıtlarını tara; yenileri/syncNow olanları işle."""
    n = scan_commands.scanner.scan()
    if n:
        logging.getLogger("erpsync.cmd").info("command scan: %d record(s) processed", n)


def poll_releases(dx, bc, db):
    """Faz 2: RELEASED / release sonrası değişen Mfg item'ları BC'ye upsert et."""
    plan = poll_releases.poller.poll(dry_run=False, state="RELEASED")
    if plan:
        logging.getLogger("erpsync.rel").info(
            "release run: %d item(s) processed", len(plan))


def sync_boms(dx, bc, db):
    """Faz 4: kayıtlı her konfigürasyon için filtreli BOM'u çek, BC'ye diff uygula."""
    log = logging.getLogger("erpsync.bom")
    rows = db.conn.execute("SELECT * FROM sync_configs WHERE paused=0").fetchall()
    for row in rows:
        try:
            evolution = json.loads(row["evolution"]) if row["evolution"] else None
            stats = sync_boms.sync.sync_config(
                row["top_code"], row["root_mfg_id"], row["config_id"],
                top_description=row["config_name"] or "",
                item_type=row["item_type"] or "VPMReference",
                evolution=evolution)
            log.info("%s: %d items, boms +%d/~%d/=%d, %d error(s)",
                     row["top_code"], stats["desired_items"], stats["bom_created"],
                     stats["bom_rewritten"], stats["bom_unchanged"],
                     len(stats["errors"]))
        except Exception as e:
            log.exception("%s sync error", row["top_code"])
            db.log_error("bom_sync", f"{row['top_code']}: {e}")


def main():
    import erp_sync
    cfg = Config()
    setup_logging(cfg)
    log = logging.getLogger("erpsync")
    log.info("ERP Sync Service v%s starting", erp_sync.__version__)

    auth = Auth3DX(cfg)
    dx = DX(cfg, auth)
    bc = BC(cfg)
    db = DB(cfg.db_path)

    auth.login()
    bc.company_id()
    poll_releases.poller = ReleasePoller(cfg, dx, bc, db)
    from erp_sync.bom_sync import BomSync
    from erp_sync.commands import CommandScanner
    sync_boms.sync = BomSync(cfg, auth, bc, db)
    scan_commands.scanner = CommandScanner(cfg, auth, dx, bc, db, sync_boms.sync)
    log.info("3DX and BC connections verified")

    jobs = [
        ("command_scan", cfg.cadence.get("command_scan", 120), scan_commands),
        ("release_poller", cfg.cadence.get("release_poller", 600), poll_releases),
        ("bom_sync", cfg.cadence.get("bom_sync", 1800), sync_boms),
    ]
    next_run = {name: 0.0 for name, _, _ in jobs}

    while True:
        now = time.time()
        for name, interval, fn in jobs:
            if now >= next_run[name]:
                try:
                    fn(dx, bc, db)
                except Exception as e:
                    logging.getLogger("erpsync").exception("%s error", name)
                    db.log_error(name, e)
                next_run[name] = now + interval
        time.sleep(5)


if __name__ == "__main__":
    main()
