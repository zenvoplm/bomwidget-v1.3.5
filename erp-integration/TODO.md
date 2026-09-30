# ERP Entegrasyonu — Açık Konular (To-Do)

> Durum tarihi: 2026-09-10 · Widget v1.5.1 · Servis v0.8.2 · Extension 1.2.0.0
> Kurallar: [SYNC-RULES.md](SYNC-RULES.md) · Mimari: [ARCHITECTURE.md](ARCHITECTURE.md)

## Tamamlananlar (widget v1.5.1)

- [ ] **Excel export takılması (resimli export)** — v1.4.7'nin 10 dk blob ömrü ve v1.4.9'un üst seviye sekme denemesi çözmedi (v1.4.10'da geri alındı); takılma widget'ın altında, Chrome'un indirme tarama katmanında. Düz (resimsiz) export çalışıyor. Sıradaki plan: xlsx'i istemci blob'u yerine 3DX Document/FCS linki üzerinden vermek.
- [x] **Excel export takılması (ilk teşhis, geçersiz)** — FileSaver blob'u 40 sn'de iptal ettiği için büyük (resimli) xlsx, Chrome Safe Browsing taraması biterken "x/x MB, 0 B/s"ta kalıyordu. `window.__zenSaveBlob` blob'u 10 dk sonra iptal ediyor; iki export da bunu kullanıyor.
- [x] **Drawing Check kolonu** — yeşil ✓ = parçanın altında `drw-` representation var; kırmızı ✗ = yok; gri – = Car System 100_STANDARD_PARTS/000_PRODUCTION_TOOLS veya Phantom. Veri EngItem'da (EBOM: düğüm id; MBOM: scope eng id). Tembel + havuzlu; kolon seçiliyken yüklenir; değer node'a da yazılır (export'a girer). Aurora ölçeğinde (~1800 düğüm) yavaş — kolon opsiyonel.
- [x] **Weight kolonu** (v1.4.10) — EngItem'daki `ds6w:declaredWeight` (mavi) veya `ds6w:weight` (yeşil); ikisi de yoksa kırmızı `-`. 4 hane, node'a yazılır (export'a girer). Drawing Check ile aynı çözümleme (MBOM → scope EngItem).
- [x] **`ds6w:browsingStructure1` kaldırıldı** (v1.4.13 + servis v0.8.1) — 6wtag attribute'u kullanımdan kalktı. Car System artık yalnız `dseno:EnterpriseAttributes.Car_System`'dan geliyor. Widget'ta bu yedek kaynak boş dönüp doğru değeri eziyordu (Aurora'da 1058 standart parçanın 47'si yanlış ✗ almıştı, v1.4.12'de düzeltildi); serviste ise hiçbir yere yazılmadığı için tamamen çıkarıldı.
- [x] **Car System / Outsourced / Serviceability geri geldi** (10.09, extension 1.2.0.0 + servis v0.8.2) — 13.08'de kaldırılmıştı. Kart alanları ve `zenItems` API alanları 1.0.0.0 kaynağından birebir geri konuldu, dördü de salt-okunur. Kaynak anahtarlar canlı doğrulandı; anahtar bazında mfg→eng düşüşü var. **Deploy gerekiyor:** extension 1.2.0.0 publish + izin satırı kontrolü; sonraki tam senkron mevcut kartları geriye dönük dolduracak.
- [x] **Widget devir notu** (v1.5.1) — `bomwidget-v1.3.5/HANDOFF.md`: Zenvo eklentileri, API bulguları, kolon ekleme adımları, Vue patch-flag tuzağı, açık maddeler ve sürüm geçmişi.
- [x] **Drawing kolonu + 3DPlay linki** (v1.4.14) — parçaya bağlı çizim adıyla link olarak görünüyor; tıklayınca 3DPlay'de (X3DPLAW_AP) yeni sekmede açılıyor. Kaynak: `cvservlet/progressiveexpand/v2` graph expand (`type:Drawing` / `VPMRepInstance` ilişkisi), 200'lük gruplar — 250 kök 0.55 sn.
- [x] **Kolonlar EBOM Custom bölümüne taşındı** (v1.4.14) — Thumbnail, Core Material, Covering Material, Drawing Check, Weight, Drawing. Kategori yalnız kolon seçicideki gruplamayı etkiliyor; custom attribute çekimi sunucudan gelen ayrı listeyi kullanıyor.
- [x] **Drawing Check aynı kaynağa taşındı** (v1.4.14) — parça başına `EngRepInstance` çağrısı ve electrical için ad eşleştirmeli Federated Search kaldırıldı. 100 parçada eski yöntemle 0 uyuşmazlık; eski yöntemin ulaşamadığı (404) parçaya da cevap veriyor. Kurallar değişmedi.
- [x] **Electrical item'lar için drawing kontrolü** (v1.4.13) — `ElectricalGeometry`/`ElectricalBranchGeometry` EngItem değil; drawing'leri parçanın altında değil, `<part number>-<başlık>` adlı ayrı `Drawing` nesnesi olarak duruyor. Bu satırlar 20'lik gruplar hâlinde Federated Search ile aranıyor; part number'ı olmayan satırlar gri `–`. Doğrulandı: 1007149 / 1007470 / 1010861 → ✓, 1013214 / 1013215 → ✗.
- [x] **Kolon yüklenme göstergesi** (v1.4.10) — Drawing Check ve Weight başlıklarında `loading n/m` satırı; kolon dolunca kaybolur.

## Yüksek öncelik

- [ ] **0. Servis v0.9.0 devreye alma** (23.09) — Kod hazır ve 3DX'e karşı doğrulandı (BC'ye yazılmadı). Şifre güncellendi, giriş çalışıyor. v0.9.0: tüm BOM'lar cvservlet ile (10000 sınırı yok), Configuration = `config_filter_id`, Evolution = `config_filter`; EBOM de instance kenarlarından kuruluyor (eski path kodu ara montajların BOM'larını kaybediyordu: Amandas 13 BOM'dan 4'ü). Test: `tests\cv_vs_modeler.py`. Kalan: servisi başlatıp widget'tan uçtan uca BC testi.
- [ ] **0b. 10000 path sınırı — DOĞRULANDI** (23.09) — dsmfg/dseng expand tam 10000 path'te kesiyor, hata vermeden (Aurora MBOM: 11718 kullanımın ~1700'ü, 159 parça eksik). Widget v1.6.0: filtresiz MBOM ve MBOM Evolution cvservlet'e taşındı (native export ile birebir). Widget v1.6.1: Configuration da cvservlet (config_filter_id). Kalan: (b) ERP servisi: v0.9.0'da cvservlet'e taşındı, (c) parça detayı (~66 sn) ve EBOM scope (~90 sn) çağrılarını hızlandırma.
- [ ] **1. İzleme dashboard'u** — STEP-PDF Converter panelindeki kalıp: konfigürasyon listesi (son senkron, sonuç, item sayısı), çalıştırma geçmişi, **CONFLICT / PHANTOM / EXCLUDED** raporları, "şimdi senkronla" ve "duraklat" düğmeleri.
- [ ] **2. Servisin sunucuya taşınması** — Şu an geliştirme PC'sinde oturuma bağlı çalışıyor (kapanınca durur). DFC Manager sunucusuna Windows servisi/scheduled task olarak kurulum; `config.json`'ın elle taşınması; açılışta otomatik başlama.
- [x] **3. Aurora MBOM hacim testi** — TAMAM (14.08, butonla uçtan uca): 1809 item + 95 BOM (tepe 1711 satır); ilk yazım ~7 dk (≈4.3 item/s), değişiksiz tur ~108 s; hız limiti gözlenmedi. 3 hata bulunup düzeltildi (rapor: [TEST-REPORT-AURORA.md](TEST-REPORT-AURORA.md)). ERPSYNC kayıtları "ERP SYNC" bookmark'ına bağlanıyor.
- [ ] **3b. Sürekli montajların BOM başlık birimi** — BOM başlıkları PCS ile açılıyor; sürekli malzemeye ait BOM'larda başlık birimini kartın base birimiyle hizala (kozmetik; ZAA0007-A bulgusu).
- [x] **4. Attribute fazı** — TAMAM (13.08, v0.7.0): Make → Prod. Order; Kit/Buy/diğer → Purchase; tepe → Prod. Order. Yalnız ZEN Make Buy kaldı, diğer üç alan kaldırıldı (extension 1.1.0.0).
- [x] **5. UoM + cpr miktarları** — TAMAM (13.08): cpr satırları gerçek magnitüd + birim (KG/M/M2/M3, eksik kod otomatik açılır); kart Base UoM = birim; tüm kartlarda UoM açıkça gönderiliyor.

## Orta öncelik

- [x] **6. Phantom davranışı** — TAMAM (13.08, v0.7.1): yalnızca **MBOM'da** kontrol, yalnızca **uyarı** (item normal oluşturulur). EBOM'da hiç kontrol yok (orada phantom normal: Chassis/Interior/Exterior).
- [ ] **7. Release Poller'ın devreye girmesi** — Mfg release süreci başlayınca; öncesinde poller'ın numara kuralı BOM motoruyla eşitlenmeli (şu an title bazlı; scope EngItem + Partrevision'a geçecek). Alternatif tetik: `Partmaturity = RELEASED`.
- [ ] **8. Çakışma süreci** — `1006724-A` örneği (Amandas ≠ Batman içerik). Teknik koruma çalışıyor (ilk yazan kalır + uyarı); kalıcı çözüm 3DX'te ayrı part number.
- [ ] **9. ERPSYNC kayıt hijyeni** — Mükerrer kayıt koruması tarayıcıdaki `localStorage`'a dayanıyor (başka tarayıcı ikinci kayıt açabilir) → sunucu taraflı tekilleştirme; işlenmiş kayıtların arşivlenmesi.
- [ ] **10. Widget kancalarının sadeleştirilmesi** — BOM açılış fonksiyonlarındaki iki kanca kaldırılıp kök bilgisi ağaçtan türetilebilir; VPMReference koduna hiç dokunulmamış olur. (Öneri hazır, değerlendirilecek.)

## Düşük öncelik / beklemede

- [ ] **11. Hata bildirimi** — Dashboard'a ek olarak e-posta/Teams uyarısı (CA Teams Notifier webhook kalıbı kullanılabilir).
- [ ] **12. Karakter/alan kısıt testleri** — ø, æ, å ve uzun başlıkların BC Description'a yazımı.
- [ ] **13. Widget durum sorgusunun tarayıcıdan bağımsızlaşması** — İkinci basışta durum, docId'yi localStorage yerine 3DX aramasıyla bulsun.
- [ ] **14. Kimlik bilgisi rotasyonu** — Kurulum sürecinde `zenvo_plm` şifresi ve BC client secret dosyalara değdi; canlıya geçmeden ikisini de yenilemek temiz olur.
- [ ] **15. Widget yamalarının ana repo ile hizalanması** — 12.08'de ERP kancaları eski (v1.3.8) kopya üstüne uygulandığı için ekibin v1.3.9 düzeltmesi v1.4.0–v1.4.4 boyunca kayboldu (v1.4.5'te giderildi). Ara kural: her yamada taban `git show HEAD:docs/513.bundle.js` ile alınır, deploy öncesi `git diff` yalnızca ekleme içermelidir. Kalıcı çözüm madde 10 ile birlikte.

---

*Bir madde tamamlanınca işaretlenir ve kalıcılaşan davranış [SYNC-RULES.md](SYNC-RULES.md)'ye kural olarak işlenir.*
