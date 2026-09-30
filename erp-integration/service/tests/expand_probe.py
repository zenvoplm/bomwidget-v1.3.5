# -*- coding: utf-8 -*-
"""Faz 4 keşfi (SALT-OKUNUR): configured expand yanıt yapısını incele."""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import logging

from erp_sync.auth3dx import Auth3DX
from erp_sync.config import Config
from erp_sync.dx import DX

ROOT_EBOM = "D51B2DEDBA38120067FE49E600004E39"   # Zenvo Sample EBOM (VPMReference)
CFG_AMANDAS = "E99E680858E0170069B40C0B000299FE"  # Amandas Car
CFG_BATMAN = "E99E6808A2983A0069B0111C00012788"   # Batman Configuration


def main():
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass
    logging.basicConfig(level=logging.WARNING)
    cfg = Config()
    auth = Auth3DX(cfg)
    auth.login()
    dx = DX(cfg, auth)

    body = {
        "expandDepth": -1,
        "withPath": True,
        "filter": {
            "combinationOfSpecification": "union",
            "keepChildren": False,
            "filterSpecifications": [{
                "filterCriteria": [{
                    "criteriaType": "config",
                    "configurationFilterDefinition": {
                        "version": "0.2",
                        "persistentFilter": {
                            "identifier": CFG_AMANDAS,
                            "type": "Product Configuration"}}}]}]},
    }
    r = auth.post(
        f"{dx.space_url}/resources/v1/modeler/dseng/dseng:EngItem/{ROOT_EBOM}/expand"
        "?xrequestedwith=xmlhttprequest", json=body)
    print("HTTP", r.status_code)
    if r.status_code != 200:
        print(r.text[:800])
        return
    j = r.json()
    out = Path(__file__).parent.parent / "data" / "expand_amandas_raw.json"
    out.write_text(json.dumps(j, indent=1, ensure_ascii=False), encoding="utf-8")
    print("Üst anahtarlar:", list(j.keys()))
    members = j.get("member", [])
    print("member sayısı:", len(members))
    if members:
        print("\n== member[0]:")
        print(json.dumps(members[0], indent=1, ensure_ascii=False)[:1800])
        if len(members) > 1:
            print("\n== member[1]:")
            print(json.dumps(members[1], indent=1, ensure_ascii=False)[:1800])
    print(f"\nHam yanıt kaydedildi: {out}")


if __name__ == "__main__":
    main()
