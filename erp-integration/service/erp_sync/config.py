# -*- coding: utf-8 -*-
"""Servis konfigürasyonu: config.json yükleyici."""
import json
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent


class Config:
    def __init__(self, path=None):
        p = Path(path) if path else PROJECT_ROOT / "config.json"
        if not p.exists():
            raise FileNotFoundError(
                f"{p} not found - copy config.example.json to config.json and fill it in."
            )
        self._raw = json.loads(p.read_text(encoding="utf-8-sig"))
        self.dx = self._raw["dx"]
        self.bc = self._raw["bc"]
        self.cadence = self._raw.get("cadence_seconds", {})
        self.data_dir = PROJECT_ROOT / self._raw.get("data_dir", "data")
        self.logs_dir = PROJECT_ROOT / self._raw.get("logs_dir", "logs")
        self.data_dir.mkdir(exist_ok=True)
        self.logs_dir.mkdir(exist_ok=True)

    @property
    def db_path(self):
        return self.data_dir / "erpsync.db"

    @property
    def cookies_path(self):
        return self.data_dir / "cookies.json"
