# -*- coding: utf-8 -*-
"""SQLite durum veritabanı (DFC Manager jobs.db kalıbı; zaman damgaları UTC ISO)."""
import sqlite3
from datetime import datetime, timezone

SCHEMA = """
CREATE TABLE IF NOT EXISTS sync_configs (
    top_code      TEXT PRIMARY KEY,
    config_id     TEXT NOT NULL,
    config_name   TEXT,
    root_mfg_id   TEXT NOT NULL,
    control_doc_id TEXT,
    requested_by  TEXT,
    created_at    TEXT,
    paused        INTEGER DEFAULT 0,
    last_sync_at  TEXT,
    last_result   TEXT,
    last_hash     TEXT,
    item_count    INTEGER
);
CREATE TABLE IF NOT EXISTS sync_runs (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    top_code   TEXT,
    kind       TEXT,              -- initial | periodic | manual
    started_at TEXT,
    finished_at TEXT,
    result     TEXT,              -- ok | error | nochange
    detail     TEXT
);
CREATE TABLE IF NOT EXISTS released_items (
    part_number TEXT PRIMARY KEY, -- BC item no (partnumber-rev)
    physical_id TEXT,
    last_pushed_at TEXT,
    last_modified  TEXT
);
CREATE TABLE IF NOT EXISTS bom_ownership (
    bom_no     TEXT,
    top_code   TEXT,
    lines_hash TEXT,
    updated_at TEXT,
    PRIMARY KEY (bom_no, top_code)
);
CREATE TABLE IF NOT EXISTS processed_docs (
    doc_id       TEXT PRIMARY KEY,
    payload_hash TEXT,
    processed_at TEXT,
    result       TEXT
);
CREATE TABLE IF NOT EXISTS meta (
    key TEXT PRIMARY KEY,
    value TEXT
);
CREATE TABLE IF NOT EXISTS errors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    at TEXT, source TEXT, message TEXT
);
"""


def utcnow():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


class DB:
    def __init__(self, path):
        self.conn = sqlite3.connect(str(path), timeout=30)
        self.conn.row_factory = sqlite3.Row
        self.conn.executescript(SCHEMA)
        try:
            self.conn.execute("ALTER TABLE sync_configs ADD COLUMN item_type TEXT")
        except sqlite3.OperationalError:
            pass  # kolon zaten var
        try:
            # Evolution (Model Version) filtresi: JSON {modelId, modelCode, name,
            # revision}; NULL = konfigurasyon ya da filtresiz
            self.conn.execute("ALTER TABLE sync_configs ADD COLUMN evolution TEXT")
        except sqlite3.OperationalError:
            pass  # kolon zaten var
        self.conn.commit()

    def get_meta(self, key, default=None):
        row = self.conn.execute("SELECT value FROM meta WHERE key=?", (key,)).fetchone()
        return row["value"] if row else default

    def set_meta(self, key, value):
        self.conn.execute(
            "INSERT INTO meta(key,value) VALUES(?,?) "
            "ON CONFLICT(key) DO UPDATE SET value=excluded.value", (key, value))
        self.conn.commit()

    def log_error(self, source, message):
        self.conn.execute("INSERT INTO errors(at,source,message) VALUES(?,?,?)",
                          (utcnow(), source, str(message)[:2000]))
        self.conn.commit()
