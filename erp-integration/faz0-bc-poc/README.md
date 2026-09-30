# Faz 0 — Business Central Keşif POC

Amaç: Sandbox'a servis hesabıyla bağlanmak, `items` API'sini doğrulamak ve BOM erişim
yolunu (MIMARI-PLAN.md §6'daki a/b/c seçenekleri) tespit etmek.

`probe.py` **salt-okunurdur** — BC'ye hiçbir şey yazmaz, değiştirmez, silmez.

---

## 1. Entra ID App Registration (bir defalık, ~10 dk)

1. https://portal.azure.com → **Microsoft Entra ID** → **App registrations** → **New registration**
   - Name: `3DX-ERP-Sync`
   - Supported account types: **Accounts in this organizational directory only** (single tenant)
   - Redirect URI: boş bırakın → **Register**
2. Açılan **Overview** sayfasından iki değeri not alın:
   - **Application (client) ID**
   - **Directory (tenant) ID**
3. **Certificates & secrets** → **New client secret** → açıklama `erp-sync`, süre 24 ay → **Add**
   - Tablodaki **Value** sütununu hemen kopyalayın (sayfadan ayrılınca bir daha gösterilmez;
     **Secret ID değil, Value**).
4. **API permissions** → **Add a permission** → **Dynamics 365 Business Central** →
   **Application permissions** → `API.ReadWrite.All` işaretleyin → **Add permissions**
5. Aynı sayfada **Grant admin consent for <şirketiniz>** düğmesine basın (Global Admin
   yetkisi ister). Status sütununda yeşil **Granted** görünmeli.

## 2. BC tarafında uygulamayı yetkilendirme

1. Business Central'ı (Sandbox) açın → büyüteç ile arayın: **Microsoft Entra Applications**
   (eski sürümlerde adı "Azure Active Directory Applications")
2. **New** → **Client ID**: 1. bölümdeki Application (client) ID → Description: `3DX ERP Sync`
3. **State**: **Enabled**
4. **User Permission Sets** bölümüne POC için **`D365 BUS FULL ACCESS`** ekleyin
   (canlıya geçerken daraltılmış bir permission set tanımlayacağız).

## 3. Environment adı

BC'yi tarayıcıda açınca URL şu biçimdedir:
`https://businesscentral.dynamics.com/<tenantId>/<environmentAdı>/...`
Sandbox ortamının adı çoğunlukla `Sandbox`tır. Emin değilseniz admin center'dan bakın:
`https://businesscentral.dynamics.com/<tenantId>/admin`

## 4. config.json

`config.example.json` dosyasını **`config.json`** adıyla kopyalayıp değerleri doldurun.

> Bu dosyayı kimseyle paylaşmayın, chat'e yapıştırmayın, e-posta ile göndermeyin.
> Servis canlıya taşınırken aynı dosya sunucuya elle taşınacak.

## 5. Çalıştırma

```bash
pip install -r "faz0-bc-poc/requirements.txt"
```

```bash
python "faz0-bc-poc/probe.py"
```

Çıktılar:
- **`kesif-raporu.md`** — özet rapor (şirketler, örnek item'lar, API'deki tüm entity set'ler,
  BOM adayları, yayınlanmış web servisleri, önerilen yol)
- **`raw\`** — ham API yanıtları (JSON/XML)

Raporu birlikte yorumlayıp "BC entegrasyon sözleşmesi"ni (hangi BOM yolu, hangi alanlar)
netleştireceğiz.

---

## Sık karşılaşılan hatalar

| Belirti | Sebep / çözüm |
|---|---|
| `AADSTS7000215` | Client secret yanlış — **Value** yerine Secret ID kopyalanmış olabilir; yeni secret oluşturun |
| `AADSTS700016` | Client ID yanlış ya da uygulama bu tenant'ta değil — tenant_id'yi kontrol edin |
| `AADSTS90002` | tenant_id bulunamadı — GUID veya `<şirket>.onmicrosoft.com` biçimini kullanın |
| `companies` 401/403 | BC'de Entra Application kaydı **Enabled** değil, permission set atanmamış veya admin consent verilmemiş |
| `companies` 404 | Environment adı yanlış (config.json → `environment`) |
