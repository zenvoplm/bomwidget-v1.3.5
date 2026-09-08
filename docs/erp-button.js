/* Zenvo ERP Sync — "Send to ERP" toolbar button.  v1.4.7
 * Bundle hooks: zen-erp-ctx (security context), zen-erp-root (loaded BOM root),
 * zen-erp-config-applied (applied configuration), window.__zenErpApi (call3DSpace).
 * Rules:
 *  - Button is visible only when the selected security context is Leader
 *    (VPLMProjectLeader). The Owner role (VPLMProjectAdministrator) has no
 *    create access for Documents in the "Zenvo Automotive" collaborative space,
 *    so the ERPSYNC control record can only be written from a Leader context.
 *  - With an applied configuration: top code = configuration name (ZA-...).
 *  - Without a configuration: the BOM is sent UNFILTERED and the top code is the
 *    root Manufacturing Assembly's own part number (resolved by the service).
 * Clicking writes an ERPSYNC control record (metadata-only Document) to 3DSpace;
 * the ERP Sync service scans every ~2 min, processes it and writes status back.
 */
(function () {
    "use strict";
    var VERSION = "1.4.7";
    var ALLOWED_ROLE = "VPLMProjectLeader";
    var BTN_ID = "zen-erp-btn";
    // Resolve the icon against this script's own URL so it works regardless of
    // the page's base URL, and add a version query to bypass stale caches.
    var SCRIPT_BASE = (function () {
        var s = document.currentScript;
        return (s && s.src) ? s.src.slice(0, s.src.lastIndexOf("/") + 1) : "";
    })();
    // Try the webp first, then a png with the same name, then plain text.
    var ICON_URLS = [
        SCRIPT_BASE + "static/images/business-central.webp?v=" + VERSION,
        SCRIPT_BASE + "static/images/business-central.png?v=" + VERSION
    ];
    var ctx = window.__zenErpCtx || "";
    var root = window.__zenErpRoot || null;
    var applied = window.__zenErpApplied || null;
    var busy = false;

    console.log("[zen-erp] erp-button v" + VERSION);

    document.addEventListener("zen-erp-ctx", function (e) { ctx = e.detail || ""; refresh(); });
    document.addEventListener("zen-erp-root", function (e) { root = e.detail || null; refresh(); });
    document.addEventListener("zen-erp-config-applied", function (e) { applied = e.detail; refresh(); });

    function isAllowed() { return (ctx || "").indexOf(ALLOWED_ROLE) !== -1; }
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
        btn.setAttribute("aria-label", "Send to ERP");
        btn.style.cssText = "margin-left:6px;display:inline-flex;align-items:center;justify-content:center;";
        var img = document.createElement("img");
        var iconTry = 0;
        img.src = ICON_URLS[iconTry];
        img.alt = "Send to ERP";
        img.style.cssText = "width:18px;height:18px;object-fit:contain;display:block;pointer-events:none;";
        img.addEventListener("error", function () {
            iconTry += 1;
            if (iconTry < ICON_URLS.length) img.src = ICON_URLS[iconTry];
            else btn.textContent = "Send to ERP";   // no icon available
        });
        btn.appendChild(img);
        btn.addEventListener("click", onClick);
        bar.appendChild(btn);
        refresh();
    }

    function refresh() {
        var btn = document.getElementById(BTN_ID);
        if (!btn) return;
        btn.style.display = isAllowed() ? "inline-flex" : "none";
        var t = target();
        var ready = isAllowed() && !!t && !busy;
        btn.disabled = !ready;
        btn.style.opacity = ready ? "1" : "0.45";
        btn.title = "Send to ERP (Business Central) v" + VERSION + " — " +
            (!isAllowed() ? "Leader context only" :
             !t ? "open a BOM first" :
             (applied ? "send this configuration / show sync status"
                      : "send the unfiltered BOM (top code = root part number)"));
    }

    function storageKey(t) { return "zenErpSync." + (t.configurationId || t.rootPhysicalId); }

    function onClick() {
        var t = target();
        if (!t || busy) return;
        var api = window.__zenErpApi;
        if (!api || !api.call3DSpace) { alert("ERP Sync: API bridge not available."); return; }
        var known = localStorage.getItem(storageKey(t));
        if (known) { showStatus(api, t, known); return; }
        if (!t.configurationId &&
            !confirm("No configuration is applied.\nThe BOM will be sent UNFILTERED and the " +
                     "top code will be the root assembly's own part number.\nContinue?")) return;
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
            alert("ERP Sync request accepted.\n" +
                (t.configurationId ? "Configuration: " + (cfg.name || t.configurationId)
                                   : "Unfiltered BOM — top code: root part number") +
                "\nThe service will create it in Business Central within a few minutes." +
                "\nClick the button again to see the status.");
        }).catch(function (e) {
            busy = false; refresh();
            console.error("[zen-erp] could not create request", e);
            alert("Could not create the ERP Sync request: " + (e && e.message ? e.message : e));
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
            try { st = JSON.parse(desc).status; } catch (err) { /* no status yet */ }
            if (st && st.phase && st.phase !== "REQUESTED") {
                alert("ERP Sync status:\nTop code: " + (st.topCode || "-") +
                    "\nPhase: " + st.phase +
                    "\nLast sync: " + (st.lastSyncAt || "-") +
                    "\nResult: " + (st.lastResult || "-") +
                    "\nItem count: " + (st.itemCount != null ? st.itemCount : "-") +
                    (st.conflicts && st.conflicts.length ? "\nConflicts: " + st.conflicts.join("; ") : "") +
                    (st.errors && st.errors.length ? "\nErrors: " + st.errors.join("; ") : ""));
            } else {
                alert("ERP Sync request is registered; the service has not processed it yet (REQUESTED).");
            }
        }).catch(function () {
            localStorage.removeItem(storageKey(t));
            alert("Could not read the request record (it may have been deleted) — " +
                  "click the button again to create a new one.");
        });
    }

    setInterval(ensureButton, 1200);
    if (document.readyState !== "loading") ensureButton();
    else document.addEventListener("DOMContentLoaded", ensureButton);

    /* ---- Continuous Provided Material quantities (cpr-* items) ----
     * MBOM instances of type ProcessInstanceContinuous carry their real usage
     * quantity in ds6wg:DELFmiContQuantity_<Dim>.V_ContQuantity ("value||UNIT||f"),
     * fetched in bulk via cvservlet/fetch/v2. After the tree is built the bundle
     * calls window.__zenContApply(data, treeRef); we fetch, SUM the magnitudes per
     * parent->child edge (unique instances) and write "qty unit" into the Qty cell.
     */
    var CONT_INST = { "ProcessInstanceContinuous": 1, "dsmfg:ProcessInstanceContinuous": 1 };
    var CONT_UNITS = { Mass: "kg", Area: "m2", Length: "m", Volume: "m3", RatioOfDiscreteQuantity: "" };

    window.__zenContApply = function (data, treeRef) {
        try {
            var results = (data && data.results) || [];
            var instIds = [];
            results.forEach(function (r) {
                if (r && r.resourceid && CONT_INST[r["ds6w:type"]]) instIds.push(r.resourceid);
            });
            if (!instIds.length || !window.__zenErpApi) return;
            var qty = {};   // instanceId -> {v, u}
            var chunks = [];
            for (var i = 0; i < instIds.length; i += 200) chunks.push(instIds.slice(i, i + 200));
            var calls = chunks.map(function (ids) {
                return window.__zenErpApi.call3DSpace({
                    url: "/cvservlet/fetch/v2?xrequestedwith=xmlhttprequest",
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    data: {
                        label: "zen-contqty",
                        physicalid: ids,
                        select_predicate: ["physicalid"],
                        select_uom: [
                            "ds6wg:DELFmiContQuantity_Mass.V_ContQuantity",
                            "ds6wg:DELFmiContQuantity_Area.V_ContQuantity",
                            "ds6wg:DELFmiContQuantity_Length.V_ContQuantity",
                            "ds6wg:DELFmiContQuantity_Volume.V_ContQuantity",
                            "ds6wg:DELFmiRatioOfDiscreteQuantity.V_ContQuantity"
                        ],
                        select_unit: {
                            "ro.delfmicontquantity_mass.v_contquantity": "kg",
                            "ro.delfmicontquantity_area.v_contquantity": "m2",
                            "ro.delfmicontquantity_length.v_contquantity": "m",
                            "ro.delfmicontquantity_volume.v_contquantity": "m3",
                            "ro.delfmiratioofdiscretequantity.v_contquantity": ""
                        },
                        locale: "us",
                        lang: "en",
                        with_synthesis_attribute: false
                    },
                    type: "json"
                }).then(function (resp) {
                    ((resp && resp.results) || []).forEach(function (r) {
                        var id = null, v = null, u = "";
                        (r.attributes || []).forEach(function (a) {
                            var nm = a.name || "";
                            if ((nm === "physicalid" || nm === "resourceid") && !id) id = a.value;
                            var m = /(?:ContQuantity_(\w+)|DELFmi(RatioOfDiscreteQuantity))\.V_ContQuantity$/.exec(nm);
                            if (m && a.value != null) {
                                var parts = String(a.value).split("||");
                                var dim = m[1] || m[2];
                                v = parseFloat(parts[0]);
                                u = (CONT_UNITS[dim] != null) ? CONT_UNITS[dim] : (parts[1] || "");
                            }
                        });
                        if (id && v != null && !isNaN(v)) qty[id] = { v: v, u: u };
                    });
                });
            });
            Promise.all(calls).then(function () {
                if (!Object.keys(qty).length) return;
                // Path triples: parent -> child, summing unique instances only
                var acc = {};
                results.forEach(function (r) {
                    var p = r && r.Path;
                    if (!p) return;
                    for (var t = 0; t + 2 < p.length; t += 2) {
                        var q = qty[p[t + 1]];
                        if (!q) continue;
                        var k = p[t] + "||" + p[t + 2];
                        var a = acc[k] || (acc[k] = { v: 0, u: q.u, seen: {} });
                        if (!a.seen[p[t + 1]]) { a.seen[p[t + 1]] = 1; a.v += q.v; }
                    }
                });
                if (!Object.keys(acc).length) return;
                var round = function (x) { return Math.round(x * 1000) / 1000; };
                var walk = function (nodes, parentRes) {
                    (nodes || []).forEach(function (n) {
                        if (!n) return;
                        if (parentRes) {
                            var a = acc[parentRes + "||" + n.resourceid];
                            if (a) { n._contQty = round(a.v); n._contUom = a.u; }
                        }
                        walk(n.children, n.resourceid);
                    });
                };
                walk(treeRef.value, null);
                console.log("[zen-cont] continuous quantities applied to " +
                            Object.keys(acc).length + " BOM edge(s)");
            }).catch(function (e) { console.warn("[zen-cont] quantity fetch failed", e); });
        } catch (err) { console.warn("[zen-cont] error", err); }
    };
})();
