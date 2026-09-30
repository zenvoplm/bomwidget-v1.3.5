import sys, logging, json
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from erp_sync.auth3dx import Auth3DX
from erp_sync.bc import BC
from erp_sync.bom_sync import BomSync
from erp_sync.config import Config
from erp_sync.db import DB
logging.basicConfig(level=logging.INFO, format="%(levelname)-7s %(name)s: %(message)s")
cfg = Config(); auth = Auth3DX(cfg); auth.login()
s = BomSync(cfg, auth, BC(cfg), DB(cfg.db_path))
MODEL = "7C9D747EE6190400689AF039000053FE"
roots = {"EBOM": ("0E18FEBF0000D4046AB2790C0029CB96", "VPMReference"),
         "MBOM": ("0E18FEBF0000D4046AB29A9F00C7D235", "CreateAssembly")}
for kind, (root, it) in roots.items():
    full = s.configured_expand(root, None, it)
    for vp in sys.argv[1:]:
        ev = {"modelId": MODEL, "name": vp, "revision": ""}
        f = s.configured_expand(root, None, it, ev)
        print(kind, vp, "members", len(f.get("member") or []), "of", len(full.get("member") or []))
