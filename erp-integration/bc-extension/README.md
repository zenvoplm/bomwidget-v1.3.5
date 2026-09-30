# Zenvo ERP Sync — BC Extension

3DX senkron servisinin ihtiyaç duyduğu API yüzeyi:

| Nesne | İçerik |
|---|---|
| `ZEN Item Ext` (tableextension) | Item'a 4 özel alan: Car System, Outsourced, Serviceability, Make Buy (3DX ham değeri, bilgi amaçlı) |
| `ZEN Item Card Ext` (pageextension) | Item Card'a "3DEXPERIENCE" sekmesi — alanlar kullanıcıya görünür |
| `ZEN Items API` | `/api/zenvo/erpsync/v1.0/.../zenItems` — standart + özel alanlar + Replenishment System + Production BOM No. |
| `ZEN Prod BOM Headers API` | `.../zenProductionBOMHeaders` — BOM başlıkları + **Status** (Certify akışı buradan yönetilir) |
| `ZEN Prod BOM Lines API` | `.../zenProductionBOMLines` — BOM satırları (Type: `Item` / `Production BOM` = phantom) |
| `ZEN ERP SYNC` (permissionset) | API sayfalarına execute + üç tabloya RIMD |

## Deploy — Seçenek A: VS Code (önerilen, ~10 dk)

1. VS Code'a **AL Language** extension'ını kurun (Marketplace: "AL Language extension for Microsoft Dynamics 365 Business Central").
2. Bu klasörü (`bc-extension`) VS Code'da açın — `.vscode/launch.json` Zenvo_UAT'a hazır ayarlı.
3. `Ctrl+Shift+P` → **AL: Download Symbols** → Microsoft 365 hesabınızla oturum açın.
4. `Ctrl+F5` (**Publish without debugging**) → extension derlenir ve Zenvo_UAT'a yüklenir.

## Deploy — Seçenek B: .app dosyası yükleme

VS Code kullanmak istemezseniz söyleyin — derleyiciyi (alc + Microsoft sembolleri) burada kurup
`.app` dosyasını üretirim; siz BC'de **Extension Management → Upload Extension** ile yüklersiniz.

## Deploy sonrası (her iki seçenekte)

1. BC'de **Microsoft Entra Applications** → `3DX ERP Sync` kaydını açın → **User Permission Sets**
   tablosuna ikinci satır olarak **`ZEN ERP SYNC`** ekleyin (özel API sayfalarının çalıştırma izni).
2. Doğrulama (salt-okunur):

```bash
python "faz0-bc-poc/probe3-zenapi.py"
```

Bu script `zenItems`, `zenProductionBOMHeaders` ve `zenProductionBOMLines` endpoint'lerini
çağırıp örnek kayıtları ve alan adlarını gösterir (BOM-DEMO01'i görmeliyiz).

## Notlar

- Nesne ID aralığı: 50100–50149.
- `Status` alanı header API'sinde yazılabilir: senkron akışı `Under Development` → satırları
  değiştir → `Certified` sırasıyla çalışacak.
- Özel alan captions İngilizce; BC dil paketine göre çeviri gerekirse sonra eklenir.
