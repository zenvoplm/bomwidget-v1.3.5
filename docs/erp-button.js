/* Zenvo ERP Sync — "Send to ERP" butonu.  v1.4.1
 * Bundle kancaları: zen-erp-ctx (security context), zen-erp-root (açık BOM kökü),
 * zen-erp-config-applied (uygulanan konfigürasyon), window.__zenErpApi (call3DSpace).
 * Kurallar:
 *  - Buton yalnızca seçili context Owner (VPLMProjectAdministrator) iken görünür.
 *  - Konfigürasyon Apply edilmişse tepe kod = konfigürasyon adı (ZA-...).
 *  - Konfigürasyon YOKSA BOM filtresiz gider ve tepe kod, kökteki Manufacturing
 *    Assembly'nin kendi parça numarası olur (servis belirler).
 * Basılınca 3DX'e ERPSYNC kontrol kaydı (metadata-only Document) yazılır; ERP Sync
 * servisi ~2 dk'da bir tarar, işler ve durumu aynı kayda geri yazar.
 */
(function () {
    "use strict";
    var VERSION = "1.4.1";
    var OWNER_ROLE = "VPLMProjectAdministrator";
    var BTN_ID = "zen-erp-btn";
    var ctx = window.__zenErpCtx || "";
    var root = window.__zenErpRoot || null;
    var applied = window.__zenErpApplied || null;
    var busy = false;

    console.log("[zen-erp] erp-button v" + VERSION);

    document.addEventListener("zen-erp-ctx", function (e) { ctx = e.detail || ""; refresh(); });
    document.addEventListener("zen-erp-root", function (e) { root = e.detail || null; refresh(); });
    document.addEventListener("zen-erp-config-applied", function (e) { applied = e.detail; refresh(); });

    function isOwner() { return (ctx || "").indexOf(OWNER_ROLE) !== -1; }
    function target() {
        if (applied) return applied;
        if (root) return { configurationId: "", configuration: null,
                           modelId: "", productId: "",
                           rootPhysicalId: root.rootPhysicalId, itemType: root.itemType };
        return null;
    }

    function ensureButton() {
        if (document.getElementById(BTN_ID)) { refresh(); return; }
        var anyBtn = document.querySelector(".toolbar-btn");
        var bar = document.querySelector(".toolbar-actions") || (anyBtn && anyBtn.parentElement);
        if (!bar) return;
        var btn = document.createElement("button");
        btn.id = BTN_ID;
        btn.className = "toolbar-btn";
        btn.type = "button";
        btn.textContent = "Send to ERP";
        btn.style.cssText = "margin-left:6px;font-weight:600;";
        btn.addEventListener("click", onClick);
        bar.appendChild(btn);
        refresh();
    }

    function refresh() {
        var btn = document.getElementById(BTN_ID);
        if (!btn) return;
        btn.style.display = isOwner() ? "" : "none";
        var t = target();
        var ready = isOwner() && !!t && !busy;
        btn.disabled = !ready;
        btn.style.opacity = ready ? "1" : "0.45";
        btn.title = "ERP Sync v" + VERSION + " — " + (!isOwner() ? "yalnızca Owner context" :
            !t ? "önce bir BOM açın" :
            (applied ? "konfigürasyonu ERP'ye gönder / durumu göster"
                     : "filtresiz BOM'u gönder (tepe kod = kök parça numarası)"));
    }

    function storageKey(t) { return "zenErpSync." + (t.configurationId || t.rootPhysicalId); }

    function onClick() {
        var t = target();
        if (!t || busy) return;
        var api = window.__zenErpApi;
        if (!api || !api.call3DSpace) { alert("ERP Sync: API köprüsü bulunamadı."); return; }
        var known = localStorage.getItem(storageKey(t));
        if (known) { showStatus(api, t, known); return; }
        if (!t.configurationId &&
            !confirm("Konfigürasyon uygulanmadı.\nBOM FİLTRESİZ gönderilecek ve tepe kod, " +
                     "kök montajın kendi parça numarası olacak.\nDevam edilsin mi?")) return;
        createRecord(api, t);
    }

    function createRecord(api, t) {
        busy = true; refresh();
        var cfg = t.configuration || {};
        var payload = {
            kind: "ERPSYNC",
            version: 1,
            widgetVersion: VERSION,
            configurationId: t.configurationId || "",
            configurationName: cfg.name || "",
            configurationTitle: cfg.title || cfg.description || "",
            modelId: t.modelId || "",
            productId: t.productId || "",
            rootPhysicalId: t.rootPhysicalId,
            itemType: t.itemType,
            requestedAt: new Date().toISOString(),
            syncNow: true,
            status: { phase: "REQUESTED" }
        };
        api.call3DSpace({
            url: "/resources/v1/modeler/documents",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: {
                data: [{
                    dataelements: {
                        title: "ERPSYNC_" + (t.configurationId || t.rootPhysicalId),
                        description: JSON.stringify(payload)
                    }
                }]
            },
            type: "json"
        }).then(function (r) {
            busy = false; refresh();
            var d = r && r.data && r.data[0];
            var id = d && (d.id || (d.dataelements && d.dataelements.id));
            if (id) localStorage.setItem(storageKey(t), id);
            alert("ERP Sync isteği alındı.\n" +
                (t.configurationId ? "Konfigürasyon: " + (cfg.name || t.configurationId)
                                   : "Filtresiz BOM — tepe kod: kök parça numarası") +
                "\nServis birkaç dakika içinde Business Central'da oluşturacak." +
                "\nDurum için butona tekrar basın.");
        }).catch(function (e) {
            busy = false; refresh();
            console.error("[zen-erp] kayıt oluşturulamadı", e);
            alert("ERP Sync isteği oluşturulamadı: " + (e && e.message ? e.message : e));
        });
    }

    function showStatus(api, t, docId) {
        api.call3DSpace({
            url: "/resources/v1/modeler/documents/" + docId,
            method: "GET"
        }).then(function (r) {
            var d = r && r.data && r.data[0];
            var desc = d && ((d.dataelements && d.dataelements.description) || d.description);
            var st = null;
            try { st = JSON.parse(desc).status; } catch (err) { /* durum yok */ }
            if (st && st.phase && st.phase !== "REQUESTED") {
                alert("ERP Sync durumu:\nTepe kod: " + (st.topCode || "-") +
                    "\nFaz: " + st.phase +
                    "\nSon senkron: " + (st.lastSyncAt || "-") +
                    "\nSonuç: " + (st.lastResult || "-") +
                    "\nItem sayısı: " + (st.itemCount != null ? st.itemCount : "-") +
                    (st.conflicts && st.conflicts.length ? "\nÇakışmalar: " + st.conflicts.join("; ") : "") +
                    (st.errors && st.errors.length ? "\nHatalar: " + st.errors.join("; ") : ""));
            } else {
                alert("ERP Sync isteği kayıtlı, servis henüz işlemedi (REQUESTED).");
            }
        }).catch(function () {
            localStorage.removeItem(storageKey(t));
            alert("Kayıt okunamadı (silinmiş olabilir) — butona tekrar basarsanız yeni istek oluşturulur.");
        });
    }

    setInterval(ensureButton, 1200);
    if (document.readyState !== "loading") ensureButton();
    else document.addEventListener("DOMContentLoaded", ensureButton);
})();
