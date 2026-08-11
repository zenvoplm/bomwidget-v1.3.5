/* Zenvo ERP Sync — "Send to ERP" butonu.
 * Tek widget stratejisi: bundle'daki iki kanca (zen-erp-ctx, zen-erp-config-applied)
 * ve window.__zenErpApi köprüsü ile çalışır. Buton yalnızca seçili security context
 * Owner (VPLMProjectAdministrator) iken görünür; bir Product Configuration Apply
 * edilmeden pasiftir. Basılınca 3DX'e ERPSYNC kontrol kaydı (metadata-only Document)
 * yazar; ERP Sync servisi bu kayıtları tarayıp Business Central'da oluşturur.
 */
(function () {
    "use strict";
    var OWNER_ROLE = "VPLMProjectAdministrator";
    var BTN_ID = "zen-erp-btn";
    var ctx = window.__zenErpCtx || "";
    var applied = window.__zenErpApplied || null;
    var busy = false;

    document.addEventListener("zen-erp-ctx", function (e) { ctx = e.detail || ""; refresh(); });
    document.addEventListener("zen-erp-config-applied", function (e) { applied = e.detail; refresh(); });

    function isOwner() { return (ctx || "").indexOf(OWNER_ROLE) !== -1; }

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
        var ready = isOwner() && !!applied && !busy;
        btn.disabled = !ready;
        btn.style.opacity = ready ? "1" : "0.45";
        btn.title = !isOwner() ? "Yalnızca Owner context" :
            (applied ? "Konfigürasyonu ERP'ye gönder / durumu göster"
                     : "Önce bir Product Configuration uygulayın (Apply)");
    }

    function storageKey(cfgId) { return "zenErpSync." + cfgId; }

    function onClick() {
        if (!applied || busy) return;
        var api = window.__zenErpApi;
        if (!api || !api.call3DSpace) { alert("ERP Sync: API köprüsü bulunamadı."); return; }
        var known = localStorage.getItem(storageKey(applied.configurationId));
        if (known) { showStatus(api, known); return; }
        createRecord(api);
    }

    function createRecord(api) {
        busy = true; refresh();
        var cfg = applied.configuration || {};
        var payload = {
            kind: "ERPSYNC",
            version: 1,
            configurationId: applied.configurationId,
            configurationName: cfg.name || "",
            configurationTitle: cfg.title || cfg.description || "",
            modelId: applied.modelId,
            productId: applied.productId,
            rootPhysicalId: applied.rootPhysicalId,
            itemType: applied.itemType,
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
                        title: "ERPSYNC_" + applied.configurationId,
                        description: JSON.stringify(payload)
                    }
                }]
            },
            type: "json"
        }).then(function (r) {
            busy = false; refresh();
            var d = r && r.data && r.data[0];
            var id = d && (d.id || (d.dataelements && d.dataelements.id));
            if (id) localStorage.setItem(storageKey(applied.configurationId), id);
            alert("ERP Sync isteği alındı.\nKonfigürasyon: " + (cfg.name || applied.configurationId) +
                "\nServis birkaç dakika içinde Business Central'da oluşturacak." +
                "\nDurum için butona tekrar basın.");
        }).catch(function (e) {
            busy = false; refresh();
            console.error("[zen-erp] kayıt oluşturulamadı", e);
            alert("ERP Sync isteği oluşturulamadı: " + (e && e.message ? e.message : e));
        });
    }

    function showStatus(api, docId) {
        api.call3DSpace({
            url: "/resources/v1/modeler/documents/" + docId,
            method: "GET"
        }).then(function (r) {
            var d = r && r.data && r.data[0];
            var desc = d && ((d.dataelements && d.dataelements.description) || d.description);
            var st = null;
            try { st = JSON.parse(desc).status; } catch (err) { /* durum yok */ }
            if (st && st.phase && st.phase !== "REQUESTED") {
                alert("ERP Sync durumu:\nFaz: " + st.phase +
                    "\nSon senkron: " + (st.lastSyncAt || "-") +
                    "\nSonuç: " + (st.lastResult || "-") +
                    "\nSatır sayısı: " + (st.itemCount != null ? st.itemCount : "-") +
                    (st.errors && st.errors.length ? "\nHatalar: " + st.errors.join("; ") : ""));
            } else {
                alert("ERP Sync isteği kayıtlı, servis henüz işlemedi (REQUESTED).");
            }
        }).catch(function () {
            localStorage.removeItem(storageKey(applied.configurationId));
            alert("Kayıt okunamadı (silinmiş olabilir) — butona tekrar basarsanız yeni istek oluşturulur.");
        });
    }

    setInterval(ensureButton, 1200);
    if (document.readyState !== "loading") ensureButton();
    else document.addEventListener("DOMContentLoaded", ensureButton);
})();
