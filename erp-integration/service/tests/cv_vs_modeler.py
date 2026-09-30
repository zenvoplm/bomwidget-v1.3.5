"""Compare the BOM built from the cvservlet expand (v0.9.0) with the one built
from the old dseng/dsmfg expand. Reads 3DX only; writes nothing to BC."""
import sys, logging, time
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from erp_sync.auth3dx import Auth3DX
from erp_sync.bc import BC
from erp_sync.bom_sync import BomSync
from erp_sync.config import Config
from erp_sync.db import DB
logging.basicConfig(level=logging.WARNING)
cfg = Config(); auth = Auth3DX(cfg); auth.login()
s = BomSync(cfg, auth, BC(cfg), DB(cfg.db_path))
CASES = [
    ("MBOM Zenvo Sample + Batman", "1EB7945017F639006A5A2D2D0000BC8F", "E99E6808A2983A0069B0111C00012788", "CreateAssembly"),
    ("EBOM + Amandas", "D51B2DEDBA38120067FE49E600004E39", "E99E680858E0170069B40C0B000299FE", "VPMReference"),
    ("Aurora MBOM unfiltered", "0E18FEBF0000D4046AB29A9F00C7D235", None, "CreateAssembly"),
]
def lines(d):
    return {b: sorted((c, round(q, 6)) for c, q, *_ in ls) for b, ls in d["boms"].items()}
for name, root, cid, it in CASES[int(sys.argv[1]) if len(sys.argv) > 1 else 0:][:1] if len(sys.argv) > 1 else CASES:
    t = time.time(); new = s.configured_expand(root, cid, it); tn = time.time() - t
    t = time.time(); old = s._modeler_expand(root, cid, it); to = time.time() - t
    dn = s.build_desired(new, root, "TOP", item_type=it)
    do = s.build_desired(old, root, "TOP", item_type=it)
    ln, lo = lines(dn), lines(do)
    diff = [b for b in set(ln) | set(lo) if ln.get(b) != lo.get(b)]
    tot = lambda L: sum(q for ls in L.values() for _, q in ls)
    print(f"{name}: cv {tn:.1f}s / modeler {to:.1f}s | items {len(dn['items'])} vs {len(do['items'])} "
          f"| BOMs {len(ln)} vs {len(lo)} | total line qty {tot(ln):g} vs {tot(lo):g} | BOMs differing {len(diff)}")
    for b in diff[:3]:
        a, o = dict(ln.get(b, [])), dict(lo.get(b, []))
        print("   ", b, "only cv:", len(set(a) - set(o)), "only old:", len(set(o) - set(a)),
              "qty differs:", sum(1 for k in set(a) & set(o) if a[k] != o[k]))
