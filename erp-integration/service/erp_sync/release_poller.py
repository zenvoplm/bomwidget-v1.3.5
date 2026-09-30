# -*- coding: utf-8 -*-
"""Release Poller — RELEASED (veya release sonrası değişen) Mfg item'ları BC'ye upsert eder.

Not (11.08.2026 keşfi): Zenvo'da Mfg item'lar henüz release edilmiyor; poller,
release süreci başladığında kendiliğinden devreye girecek. O zamana kadar kartlar
BOM senkronunun "kart garanti" adımıyla açılıyor.
"""
import logging

from .db import utcnow

log = logging.getLogger("erpsync.release")

BC_NO_MAX = 20


def bc_item_number(part_number, revision):
    """ERP kart no: <PartNumber>-<Rev ilk karakteri> (örn. SB00123-A).

    BC No. limiti (20) aşılırsa hata loglanır ve ilk 20 karakter kullanılır.
    """
    rev = (revision or "").strip()
    no = f"{part_number}-{rev[0]}" if rev else part_number
    if len(no) > BC_NO_MAX:
        log.error("Part number is %d characters (BC limit %d), truncated: %r -> %r",
                  len(no), BC_NO_MAX, no, no[:BC_NO_MAX])
        no = no[:BC_NO_MAX]
    return no


class ReleasePoller:
    def __init__(self, cfg, dx, bc, db):
        self.dx = dx
        self.bc = bc
        self.db = db

    def poll(self, dry_run=False, state="RELEASED", limit=None):
        """Bir tur: cursor'dan beri değişen <state> Mfg item'ları bul, BC'ye upsert et.

        dry_run=True → BC'ye yazmaz, yapılacakları döndürür.
        Dönen: list[dict] — {number, title, revision, id, action}
        """
        cursor = self.db.get_meta(f"release_cursor_{state}")
        q = self.dx.released_mfg_query(modified_since=cursor, state=state)
        hits = self.dx.search_all(q, max_results=limit)
        log.info("poll(%s): %d candidates (cursor=%s)", state, len(hits), cursor)

        plan, max_modified = [], cursor or ""
        for hit in hits:
            a = self.dx.result_attrs(hit)
            pid = a.get("id")
            title = a.get("ds6w:label", "")
            rev = a.get("ds6wg:revision", "")
            modified = a.get("ds6w:when/ds6w:modified", "")
            number = bc_item_number(title, rev)
            entry = {"number": number, "title": title, "revision": rev,
                     "id": pid, "modified": modified, "action": "upsert"}
            if not dry_run:
                try:
                    _, created = self.bc.upsert_item(number, {"description": title})
                    entry["action"] = "created" if created else "updated"
                    self.db.conn.execute(
                        "INSERT INTO released_items(part_number,physical_id,"
                        "last_pushed_at,last_modified) VALUES(?,?,?,?) "
                        "ON CONFLICT(part_number) DO UPDATE SET "
                        "last_pushed_at=excluded.last_pushed_at,"
                        "last_modified=excluded.last_modified",
                        (number, pid, utcnow(), modified))
                    self.db.conn.commit()
                except Exception as e:
                    entry["action"] = f"error: {e}"
                    self.db.log_error("release_poller", f"{number}: {e}")
            if modified and modified > max_modified:
                max_modified = modified
            plan.append(entry)

        if not dry_run and max_modified and max_modified != cursor:
            self.db.set_meta(f"release_cursor_{state}", max_modified)
        return plan
