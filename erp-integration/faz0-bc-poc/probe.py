# -*- coding: utf-8 -*-
"""
Faz 0 — Dynamics 365 Business Central keşif probu (SALT-OKUNUR).

Yaptıkları:
  1. OAuth2 client credentials ile token alır
  2. companies listesini çeker (bağlantı + yetki doğrulaması)
  3. Örnek item'ları çeker (items API doğrulaması)
  4. api/v2.0 $metadata'sını indirip tüm entity set'leri çıkarır, BOM adaylarını işaretler
  5. ODataV4 service document'ını çeker (yayınlanmış sayfa web servisleri var mı?)
  6. kesif-raporu.md + raw klasöründe ham yanıtları üretir

Hiçbir POST/PATCH/DELETE isteği yapmaz.
"""
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

import requests

BASE = Path(__file__).resolve().parent
RAW = BASE / "raw"
TIMEOUT = 60
SCOPE = "https://api.businesscentral.dynamics.com/.default"


def out(msg=""):
    print(msg, flush=True)


def fail(msg):
    out(f"\n[HATA] {msg}")
    sys.exit(1)


def load_config():
    p = BASE / "config.json"
    if not p.exists():
        fail("config.json bulunamadı. config.example.json'u config.json olarak kopyalayıp doldurun.")
    try:
        cfg = json.loads(p.read_text(encoding="utf-8-sig"))
    except json.JSONDecodeError as e:
        fail(f"config.json geçerli JSON değil: {e}")
    for k in ("tenant_id", "environment", "client_id", "client_secret"):
        v = str(cfg.get(k, "")).strip()
        if not v or v.startswith("<"):
            fail(f"config.json içinde '{k}' doldurulmamış.")
        cfg[k] = v
    return cfg


def get_token(cfg):
    url = f"https://login.microsoftonline.com/{cfg['tenant_id']}/oauth2/v2.0/token"
    data = {
        "grant_type": "client_credentials",
        "client_id": cfg["client_id"],
        "client_secret": cfg["client_secret"],
        "scope": SCOPE,
    }
    r = requests.post(url, data=data, timeout=TIMEOUT)
    if r.status_code != 200:
        body = r.text
        hint = ""
        if "AADSTS7000215" in body:
            hint = ("Client secret yanlış veya süresi dolmuş — secret'ın 'Value' alanını "
                    "kopyaladığınızdan emin olun (Secret ID değil).")
        elif "AADSTS700016" in body:
            hint = "Client ID yanlış ya da uygulama bu tenant'ta kayıtlı değil (tenant_id'yi kontrol edin)."
        elif "AADSTS90002" in body:
            hint = "tenant_id bulunamadı — GUID'i veya '<sirket>.onmicrosoft.com' biçimini kullanın."
        fail(f"Token alınamadı (HTTP {r.status_code}). {hint}\nYanıt: {body[:600]}")
    return r.json()["access_token"]


def api_get(sess, url, save_as=None):
    r = sess.get(url, timeout=TIMEOUT)
    if save_as:
        RAW.mkdir(exist_ok=True)
        (RAW / save_as).write_bytes(r.content)
    return r


def write_report(cfg, companies, company, items_note, items, entity_sets, bomish, odata_services):
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    if bomish:
        conclusion = (
            "API v2.0 içinde BOM ile ilişkili entity set(ler) VAR: **"
            + ", ".join(bomish)
            + "** → MIMARI-PLAN.md §6'daki **yol (a)** adayı. Alan kapsamı (satır tipleri, "
            "status, quantity/UoM) birlikte incelenecek."
        )
    else:
        conclusion = (
            "API v2.0 içinde BOM ile ilişkili entity set YOK → **yol (b)** (Production BOM "
            "sayfalarını web servisi olarak yayınlamak) veya **yol (c)** (özel AL API page) "
            "gerekecek (MIMARI-PLAN.md §6). Özel alanlar için zaten AL extension planlandığından "
            "yol (c) ile birleştirilebilir."
        )

    lines = [
        "# BC Keşif Raporu (Faz 0)",
        "",
        f"> Üretim zamanı: {now} · Ortam: `{cfg['environment']}` · probe.py salt-okunur",
        "",
        "## 1. Bağlantı",
        "",
        "- OAuth2 client credentials: **BAŞARILI**",
        f"- Şirketler ({len(companies)}): " + ", ".join(f"`{c.get('name')}`" for c in companies),
        f"- Seçilen şirket: **{company.get('name')}** (`{company.get('id')}`)",
        "",
        "## 2. Items API",
        "",
        f"- {items_note}",
    ]
    for it in items:
        lines.append(
            f"  - `{it.get('number')}` | {it.get('displayName')} | UoM: {it.get('baseUnitOfMeasureCode')}"
        )
    lines += [
        "",
        "## 3. API v2.0 entity set'leri",
        "",
        f"- Toplam: **{len(entity_sets)}**",
        f"- BOM/üretim adayları: **{', '.join(bomish) if bomish else 'YOK'}**",
        "",
        "Tam liste:",
        "",
        ", ".join(f"`{e}`" for e in entity_sets) if entity_sets else "_($metadata alınamadı)_",
        "",
        "## 4. ODataV4 yayınlanmış web servisleri",
        "",
    ]
    if odata_services:
        lines.append(f"- Toplam {len(odata_services)}: " + ", ".join(f"`{s}`" for s in odata_services))
    else:
        lines.append("- Yayınlanmış servis yok (veya service document alınamadı — raw\\ kontrol edin).")
    lines += [
        "",
        "## 5. Sonuç ve önerilen yol",
        "",
        conclusion,
        "",
        "_Ham yanıtlar: `raw\\` klasöründe._",
    ]
    (BASE / "kesif-raporu.md").write_text("\n".join(lines), encoding="utf-8")


def main():
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

    cfg = load_config()
    root = f"https://api.businesscentral.dynamics.com/v2.0/{cfg['tenant_id']}/{cfg['environment']}"
    out(f"Ortam: {cfg['environment']}")

    out("1/5 Token alınıyor...")
    token = get_token(cfg)
    out("    OK")

    sess = requests.Session()
    sess.headers.update({"Authorization": f"Bearer {token}", "Accept": "application/json"})

    out("2/5 Şirketler çekiliyor...")
    r = api_get(sess, f"{root}/api/v2.0/companies", "companies.json")
    if r.status_code == 404:
        fail("companies 404 döndü — environment adı büyük olasılıkla yanlış (config.json → environment).")
    if r.status_code in (401, 403):
        fail(
            f"Yetki hatası (HTTP {r.status_code}) — BC'de 'Microsoft Entra Applications' kaydı Enabled mı, "
            "permission set atandı mı, Azure'da admin consent verildi mi kontrol edin.\n" + r.text[:600]
        )
    if r.status_code != 200:
        fail(f"companies beklenmedik yanıt: HTTP {r.status_code}\n{r.text[:600]}")
    companies = r.json().get("value", [])
    if not companies:
        fail("Şirket listesi boş döndü — BC'deki uygulama kaydının permission set'ini kontrol edin.")
    for c in companies:
        out(f"    - {c.get('name')}")
    wanted = (cfg.get("company_name") or "").strip().lower()
    company = next(
        (c for c in companies if wanted and wanted in c.get("name", "").lower()),
        companies[0],
    )
    out(f"    Seçilen şirket: {company.get('name')}")
    cid = company["id"]

    out("3/5 Örnek item'lar çekiliyor...")
    r = api_get(sess, f"{root}/api/v2.0/companies({cid})/items?$top=3", "items_sample.json")
    items = []
    if r.status_code == 200:
        items = r.json().get("value", [])
        items_note = (
            f"`items` endpoint'i çalışıyor; {len(items)} örnek kayıt alındı."
            if items
            else "`items` endpoint'i çalışıyor ama kayıt yok (boş sandbox)."
        )
        for it in items:
            out(f"    - {it.get('number')} | {it.get('displayName')} | UoM={it.get('baseUnitOfMeasureCode')}")
        if not items:
            out("    (kayıt yok — endpoint çalışıyor)")
    else:
        items_note = f"`items` HTTP {r.status_code} döndü — raw\\items_sample.json'a bakın."
        out(f"    [UYARI] items HTTP {r.status_code}")

    out("4/5 API v2.0 $metadata indiriliyor...")
    r = api_get(sess, f"{root}/api/v2.0/$metadata", "metadata.xml")
    entity_sets, bomish = [], []
    if r.status_code == 200:
        entity_sets = sorted(set(re.findall(r'<EntitySet Name="([^"]+)"', r.text)))
        bomish = [e for e in entity_sets if re.search(r"bom|billof|assembl|routing|production", e, re.I)]
        out(f"    {len(entity_sets)} entity set; BOM adayları: {', '.join(bomish) if bomish else 'YOK'}")
    else:
        out(f"    [UYARI] $metadata HTTP {r.status_code}")

    out("5/5 ODataV4 yayınlanmış web servisleri kontrol ediliyor...")
    r = api_get(sess, f"{root}/ODataV4/", "odatav4_servicedoc.json")
    odata_services = []
    if r.status_code == 200:
        try:
            odata_services = [s.get("name") or s.get("url") for s in r.json().get("value", [])]
        except Exception:
            pass
        out(f"    {len(odata_services)} yayınlanmış servis")
    else:
        out(f"    (service document HTTP {r.status_code} — rapor yine de üretilecek)")

    write_report(cfg, companies, company, items_note, items, entity_sets, bomish, odata_services)
    out(f"\nBitti. Rapor: {BASE / 'kesif-raporu.md'}")


if __name__ == "__main__":
    main()
