/*! For license information please see 513.bundle.js.LICENSE.txt */
"use strict";
(self.webpackChunkwidget_enablement_examples = self.webpackChunkwidget_enablement_examples || []).push([
    [513], {
        870: (e, n, t) => {
            t.d(n, {
                A: () => u
            });
            var r = t(1601),
                a = t.n(r),
                o = t(6314),
                l = t.n(o),
                i = t(4044),
                c = l()(a());
            c.i(i.A), c.push([e.id, "\nhtml,\nbody {\n  margin: 0;\n  padding: 0;\n  height: 100%;\n  overflow: hidden;\n}\n#app,\n.v-application,\n.v-application__wrap {\n  height: 100%;\n  min-height: 100% !important;\n}\n.v-main {\n  height: 100%;\n}\n.v-main__wrap {\n  height: 100%;\n}\n.v-container {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  padding-top: 5px !important;\n}\n\n/* Banner Header */\n.widget-banner {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 20px;\n  background: linear-gradient(90deg, #000000 0%, #1a2d4a 40%, #006193 100%);\n  border-radius: 8px 8px 0 0;\n  position: relative;\n  transition: all 0.2s ease;\n}\n.widget-banner.drop-target {\n  cursor: pointer;\n}\n.widget-banner.drag-over {\n  opacity: 0.4;\n  transition: opacity 0.2s ease;\n}\n.banner-drop-hint {\n  position: absolute;\n  right: 20px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 24px;\n  background: rgba(255, 255, 255, 1);\n  border-radius: 8px;\n  color: #1976d2;\n  font-size: 18px;\n  font-weight: 700;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n  animation: pulse 1s infinite;\n}\n.banner-drop-hint svg {\n  width: 24px;\n  height: 24px;\n}\n@keyframes pulse {\n0%, 100% { opacity: 1;\n}\n50% { opacity: 0.7;\n}\n}\n.banner-logo {\n  height: 67px;\n  width: auto;\n}\n.banner-title {\n  color: white;\n  font-size: 29px;\n  font-weight: 800;\n  letter-spacing: 0.5px;\n  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);\n}\n.banner-version {\n  font-size: 12px;\n  font-weight: 600;\n  opacity: 0.85;\n  margin-left: 6px;\n  vertical-align: baseline;\n}\n.widget-content {\n  padding: 0;\n  background: white;\n  border: 1px solid #e0e0e0;\n  border-top: none;\n  border-radius: 0 0 8px 8px;\n  overflow: hidden;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n}\n\n/* Error Alert */\n.error-alert {\n  max-height: 60px;\n  overflow: hidden;\n  font-size: 13px;\n}\n.error-alert :deep(.v-alert__content) {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  line-clamp: 2;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n}\n\n/* Warning Toast */\n.warning-toast {\n  position: fixed;\n  bottom: 24px;\n  left: 50%;\n  transform: translateX(-50%);\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 20px;\n  background: #ff9800;\n  color: white;\n  border-radius: 8px;\n  box-shadow: 0 4px 12px rgba(0,0,0,0.15);\n  font-size: 14px;\n  z-index: 1000;\n}\n.warning-toast svg {\n  width: 20px;\n  height: 20px;\n  flex-shrink: 0;\n}\n\n/* Toast animation */\n.toast-enter-active,\n.toast-leave-active {\n  transition: all 0.3s ease;\n}\n.toast-enter-from,\n.toast-leave-to {\n  opacity: 0;\n  transform: translateX(-50%) translateY(20px);\n}\n\n/* Item Selector Dialog */\n.dialog-icon {\n  width: 24px;\n  height: 24px;\n  color: #1976d2;\n}\n.item-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.item-option {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px;\n  border: 1px solid #e0e0e0;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.item-option:hover {\n  border-color: #1976d2;\n  background: #e3f2fd;\n}\n.item-icon {\n  width: 32px;\n  height: 32px;\n  flex-shrink: 0;\n}\n.item-info {\n  flex: 1;\n  min-width: 0;\n}\n.item-name {\n  font-weight: 500;\n  font-size: 14px;\n  color: #212121;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.item-type {\n  font-size: 12px;\n  color: #757575;\n}\n.item-arrow {\n  width: 20px;\n  height: 20px;\n  color: #bdbdbd;\n  flex-shrink: 0;\n}\n.item-option:hover .item-arrow {\n  color: #1976d2;\n}\n\n/* Drop Zone */\n.drop-zone {\n  position: relative;\n  border: 2px solid transparent;\n  transition: all 0.2s ease;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n}\n.drop-zone.drag-over {\n  border-color: #1976d2;\n  border-style: dashed;\n  background: rgba(25, 118, 210, 0.02);\n}\n\n/* Drag Indicator */\n.drag-indicator {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  background: rgba(25, 118, 210, 0.95);\n  border-radius: 6px;\n  z-index: 100;\n  color: white;\n  font-size: 16px;\n  font-weight: 500;\n  gap: 8px;\n}\n.drag-indicator svg {\n  width: 48px;\n  height: 48px;\n}\n\n/* Placeholder Wrapper */\n.placeholder-wrapper {\n  position: relative;\n  overflow: hidden;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n}\n\n/* Loading Overlay */\n.loading-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  background: rgba(255, 255, 255, 0.85);\n  z-index: 20;\n}\n.loading-message {\n  margin-top: 12px;\n  font-size: 13px;\n  color: #555;\n}\n\n/* Drop Hint Overlay */\n.drop-hint-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(255, 255, 255, 0.95);\n  z-index: 10;\n}\n.hint-split-container {\n  display: flex;\n  align-items: stretch;\n  gap: 0;\n  max-width: 700px;\n  width: 90%;\n  min-height: 250px;\n}\n.hint-panel {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 24px;\n}\n.hint-divider {\n  width: 1px;\n  background: #e0e0e0;\n  margin: 20px 0;\n}\n.panel-label {\n  color: #1976d2;\n  font-size: 13px;\n  font-weight: 600;\n  margin-bottom: 16px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n\n/* Recent Panel */\n.recent-panel {\n  background: #fafafa;\n  border-radius: 12px 0 0 12px;\n}\n.recent-panel .panel-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  margin-bottom: 8px;\n}\n.recent-panel .panel-header .panel-label {\n  margin-bottom: 0;\n}\n.clear-recent-link {\n  font-size: 11px;\n  color: #9e9e9e;\n  text-decoration: none;\n  cursor: pointer;\n  transition: color 0.15s;\n}\n.clear-recent-link:hover {\n  color: #f44336;\n  text-decoration: underline;\n}\n.recent-list {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  width: 100%;\n  max-height: 180px;\n  overflow-y: auto;\n}\n.recent-item {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 12px;\n  background: white;\n  border: 1px solid #e0e0e0;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.15s ease;\n  font-size: 13px;\n  color: #424242;\n}\n.recent-item:hover {\n  border-color: #1976d2;\n  background: #e3f2fd;\n  color: #1976d2;\n}\n.recent-icon {\n  width: 20px;\n  height: 20px;\n  object-fit: contain;\n  flex-shrink: 0;\n}\n.recent-name {\n  flex: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.no-recent {\n  text-align: center;\n  padding: 20px;\n}\n.no-recent-text {\n  color: #9e9e9e;\n  font-size: 13px;\n}\n\n/* Drop Panel */\n.drop-panel {\n  background: #f5f9ff;\n  border-radius: 0 12px 12px 0;\n  border: 2px dashed #c5d9f0;\n}\n.drop-icons {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 12px;\n}\n.drop-icon {\n  width: 56px;\n  height: 56px;\n  object-fit: contain;\n  opacity: 0.7;\n}\n.drop-text {\n  color: #1976d2;\n  font-size: 14px;\n  font-weight: 500;\n}\n\n/* Placeholder Table */\n.placeholder-table {\n  opacity: 0.9;\n  pointer-events: none;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n}\n.placeholder-toolbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 6px 8px;\n  background: #f8f9fa;\n  border-bottom: 1px solid #e0e0e0;\n}\n.placeholder-search {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 6px 10px;\n  background: white;\n  border: 1px solid #e0e0e0;\n  border-radius: 6px;\n  width: 140px;\n}\n.placeholder-toolbar-btns {\n  display: flex;\n  gap: 4px;\n}\n.placeholder-bar.toolbar-btn-bar {\n  width: 28px;\n  height: 28px;\n  border-radius: 6px;\n  background: #b0b0b0;\n}\n.placeholder-header {\n  display: flex;\n  background: linear-gradient(135deg, #111f5a 0%, #0c6193 100%);\n  padding: 10px 8px;\n  align-items: center;\n  min-height: 44px;\n}\n.placeholder-header .placeholder-cell {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.placeholder-header .placeholder-cell.title-cell {\n  justify-content: flex-start;\n}\n.placeholder-bar.header-bar {\n  height: 14px;\n  background: rgba(255, 255, 255, 0.5);\n  border-radius: 3px;\n}\n.placeholder-bar.header-bar.short {\n  width: 50px;\n}\n.placeholder-bar.header-bar.medium {\n  width: 70px;\n}\n.placeholder-body {\n  flex: 1;\n  overflow: hidden;\n}\n.placeholder-row {\n  display: flex;\n  padding: 8px;\n  border-bottom: 1px solid #f0f0f0;\n  background: white;\n  align-items: center;\n}\n.placeholder-row.has-children {\n  background: #fafafa;\n}\n.placeholder-cell {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  padding: 0 8px;\n  justify-content: center;\n}\n.placeholder-cell.title-cell {\n  flex: 0 0 280px;\n  justify-content: flex-start;\n  gap: 6px;\n}\n.placeholder-indent {\n  display: inline-block;\n  flex-shrink: 0;\n}\n.placeholder-expand {\n  width: 18px;\n  height: 18px;\n  border-radius: 4px;\n  background: #b0b0b0;\n  flex-shrink: 0;\n}\n.placeholder-expand-spacer {\n  width: 26px;\n  flex-shrink: 0;\n}\n.placeholder-icon {\n  width: 20px;\n  height: 20px;\n  border-radius: 4px;\n  background: #a0a0a0;\n  flex-shrink: 0;\n}\n.placeholder-bar {\n  height: 12px;\n  background: #b0b0b0;\n  border-radius: 4px;\n}\n.placeholder-bar.title-bar {\n  height: 14px;\n}\n.placeholder-bar.short {\n  width: 30px;\n  margin: 0 auto;\n}\n.placeholder-bar.medium {\n  width: 55px;\n  margin: 0 auto;\n}\n.placeholder-chip {\n  width: 36px;\n  height: 20px;\n  border-radius: 10px;\n  background: #a0a0a0;\n  margin: 0 auto;\n}\n.placeholder-chip.status {\n  width: 52px;\n  background: #dcedc8;\n}\n", ""]);
            const u = c
        },
        2545: e => {
            e.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAACRJREFUKFNjPHTo0H8GJGBnZ8eIzGekgwJk+0BsdCtRHEQbBQBbbh0dIGKknQAAAABJRU5ErkJggg=="
        },
        5683: e => {
            e.exports = "data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27%3E%3Cpath fill=%27%23666%27 d=%27M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z%27/%3E%3C/svg%3E"
        },
        6153: (e, n, t) => {
            t.d(n, {
                default: () => kr
            });
            var r, a = t(1782),
                o = t(3751),
                l = t(641),
                i = t(33),
                c = t(953);

            function u(e) {
                return u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, u(e)
            }

            function s(e, n) {
                var t = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    n && (r = r.filter(function(n) {
                        return Object.getOwnPropertyDescriptor(e, n).enumerable
                    })), t.push.apply(t, r)
                }
                return t
            }

            function d(e, n, t) {
                return (n = function(e) {
                    var n = function(e) {
                        if ("object" != u(e) || !e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 !== n) {
                            var t = n.call(e, "string");
                            if ("object" != u(t)) return t;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == u(n) ? n : n + ""
                }(n)) in e ? Object.defineProperty(e, n, {
                    value: t,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[n] = t, e
            }
            if ("undefined" == typeof widget) throw new Error("Widget Global variable not available. This application only works inside 3D Dashboard.");
            if (!widget) throw new Error("Widget Global variable not available, load this module only once widget is declared.");
            var p, f = "__platformTenant",
                v = "",
                b = {},
                g = !1,
                h = {
                    onTenantChange: []
                };
            r = {
                callProxifiedWebService: function(e) {
                    var n = e.method,
                        t = void 0 === n ? "GET" : n,
                        r = e.url,
                        a = e.data,
                        o = e.type,
                        l = void 0 === o ? "json" : o,
                        i = e.headers,
                        c = void 0 === i ? {} : i;
                    return new Promise(function(e, n) {
                        a && "application/json" === c["Content-Type"] && (a = JSON.stringify(a)), requirejs(["DS/WAFData/WAFData"], function(o) {
                            try {
                                o.proxifiedRequest(encodeURI(r), {
                                    method: t,
                                    headers: c,
                                    data: a,
                                    type: l,
                                    onComplete: function(n, t) {
                                        "json" === l ? (n && null !== n || (n = {}), e({
                                            body: n,
                                            headers: t
                                        })) : e(n)
                                    },
                                    onFailure: function(e, t) {
                                        var r = "";
                                        t ? (t.error && t.error.message && (r += " : ".concat(t.error.message)), t.error && t.error.type && (r += " : ".concat(t.error.type)), t.errorMessage && (r += " : ".concat(t.errorMessage)), "string" == typeof t.error && (r += " : ".concat(t.error)), t.internalError && (r += " : ".concat(t.internalError)), t.message && (r += " : ".concat(t.message)), n(r || e)) : n(e)
                                    },
                                    onTimeout: function(e) {
                                        return n(e)
                                    }
                                })
                            } catch (e) {
                                n(e)
                            }
                        })
                    })
                },
                callWebService: function(e) {
                    var n = e.method,
                        t = void 0 === n ? "GET" : n,
                        r = e.url,
                        a = e.data,
                        o = e.type,
                        l = void 0 === o ? "json" : o,
                        i = e.headers,
                        c = void 0 === i ? {} : i;
                    return new Promise(function(e, n) {
                        a && "application/json" === c["Content-Type"] && (a = JSON.stringify(a)), requirejs(["DS/WAFData/WAFData"], function(o) {
                            var u = "json" === l;
                            u && (c.Accept || c.accept || (c.Accept = "application/json,text/javascript,*/*")), o.authenticatedRequest(encodeURI(r), {
                                method: t,
                                headers: c,
                                data: a,
                                type: u ? "text" : l,
                                onComplete: function(s, d) {
                                    if (!u) return e(s);
                                    var p = s;
                                    if ("string" == typeof p)
                                        if ("" === p.trim()) p = {};
                                        else try {
                                            p = JSON.parse(p)
                                        } catch (f) {
                                            try {
                                                p = JSON.parse(p.replace(/[\u0000-\u001F]/g, " ")), console.warn("[3DSpace] Response contained raw control characters; sanitized before parse:", r, f.message)
                                            } catch (v) {
                                                return n(f)
                                            }
                                        }
                                    p && null !== p || (p = {}), e({
                                        body: p,
                                        headers: d
                                    })
                                },
                                onFailure: function(e, t) {
                                    var r = "";
                                    t ? (t.error && t.error.message && (r += " : ".concat(t.error.message)), t.error && t.error.type && (r += " : ".concat(t.error.type)), t.errorMessage && (r += " : ".concat(t.errorMessage)), "string" == typeof t.error && (r += " : ".concat(t.error)), t.internalError && (r += " : ".concat(t.internalError)), t.message && (r += " : ".concat(t.message)), n(r || e)) : n(e)
                                },
                                onTimeout: function(e) {
                                    return n(e)
                                }
                            })
                        })
                    })
                },
                isLoaded: function() {
                    return g
                },
                getCurrentTenant: function() {
                    return v
                },
                setPreferedTenant: function(e) {
                    if (!b[e]) throw new Error("Invalid tenant");
                    v = e, widget.setValue(f, e)
                },
                getUrlForTenantAndService: function(e, n) {
                    if (!b[e]) throw new Error("Invalid tenant");
                    return b[e][n]
                },
                addEventListener: function(e, n) {
                    if (!h[e]) throw new Error("Invalid event name '".concat(e, "'"));
                    h[e].push(n)
                },
                reload3DExpUrls: function() {
                    return g = !1, new Promise(function(e, n) {
                        requirejs(["DS/i3DXCompassServices/i3DXCompassServices"], function(t) {
                            t.getPlatformServices({
                                onComplete: function(t) {
                                    try {
                                        b = t.reduce(function(e, n) {
                                            return e[n.platformId] = function(e) {
                                                for (var n = 1; n < arguments.length; n++) {
                                                    var t = null != arguments[n] ? arguments[n] : {};
                                                    n % 2 ? s(Object(t), !0).forEach(function(n) {
                                                        d(e, n, t[n])
                                                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : s(Object(t)).forEach(function(n) {
                                                        Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n))
                                                    })
                                                }
                                                return e
                                            }({}, n), e
                                        }, {});
                                        var a = widget.getPreference(f);
                                        a.options = t.map(function(e) {
                                            return {
                                                label: e.displayName,
                                                value: e.platformId
                                            }
                                        }), a.type = "list", widget.addPreference(a);
                                        var o = Object.keys(b);
                                        o.includes(v) || r.setPreferedTenant(v = o[0]), g = !0, e()
                                    } catch (e) {
                                        n(e)
                                    }
                                },
                                onFailure: function(e) {
                                    n(new Error("i3DXCompassServices getPlatformServices onFailure", e))
                                }
                            })
                        })
                    })
                }
            }, void 0 === (p = widget.getPreference(f)) && widget.addPreference({
                name: f,
                type: "text",
                label: "3DEXPERIENCE Platform",
                defaultValue: widget.getValue("x3dPlatformId") || ""
            }), void 0 === (v = widget.getValue(f)) && (console.error(f + " not set.  trying again."), setTimeout(function() {
                v = widget.getValue(f)
            }, 1e3)), (p = widget.getPreference(f)).type = "text", p.onchange = "onChangeConnector3DExpTenant", widget.addPreference(p), widget.addEvent("onChangeConnector3DExpTenant", function(e, n) {
                e === f && (v = n, h.onTenantChange.forEach(function(e) {
                    e(v)
                }))
            }), r.reload3DExpUrls().catch(function() {
                var e;
                (e = console).error.apply(e, arguments)
            });
            const m = r;

            function y() {
                var e, n, t = "function" == typeof Symbol ? Symbol : {},
                    r = t.iterator || "@@iterator",
                    a = t.toStringTag || "@@toStringTag";

                function o(t, r, a, o) {
                    var c = r && r.prototype instanceof i ? r : i,
                        u = Object.create(c.prototype);
                    return x(u, "_invoke", function(t, r, a) {
                        var o, i, c, u = 0,
                            s = a || [],
                            d = !1,
                            p = {
                                p: 0,
                                n: 0,
                                v: e,
                                a: f,
                                f: f.bind(e, 4),
                                d: function(n, t) {
                                    return o = n, i = 0, c = e, p.n = t, l
                                }
                            };

                        function f(t, r) {
                            for (i = t, c = r, n = 0; !d && u && !a && n < s.length; n++) {
                                var a, o = s[n],
                                    f = p.p,
                                    v = o[2];
                                t > 3 ? (a = v === r) && (c = o[(i = o[4]) ? 5 : (i = 3, 3)], o[4] = o[5] = e) : o[0] <= f && ((a = t < 2 && f < o[1]) ? (i = 0, p.v = r, p.n = o[1]) : f < v && (a = t < 3 || o[0] > r || r > v) && (o[4] = t, o[5] = r, p.n = v, i = 0))
                            }
                            if (a || t > 1) return l;
                            throw d = !0, r
                        }
                        return function(a, s, v) {
                            if (u > 1) throw TypeError("Generator is already running");
                            for (d && 1 === s && f(s, v), i = s, c = v;
                                (n = i < 2 ? e : c) || !d;) {
                                o || (i ? i < 3 ? (i > 1 && (p.n = -1), f(i, c)) : p.n = c : p.v = c);
                                try {
                                    if (u = 2, o) {
                                        if (i || (a = "next"), n = o[a]) {
                                            if (!(n = n.call(o, c))) throw TypeError("iterator result is not an object");
                                            if (!n.done) return n;
                                            c = n.value, i < 2 && (i = 0)
                                        } else 1 === i && (n = o.return) && n.call(o), i < 2 && (c = TypeError("The iterator does not provide a '" + a + "' method"), i = 1);
                                        o = e
                                    } else if ((n = (d = p.n < 0) ? c : t.call(r, p)) !== l) break
                                } catch (n) {
                                    o = e, i = 1, c = n
                                } finally {
                                    u = 1
                                }
                            }
                            return {
                                value: n,
                                done: d
                            }
                        }
                    }(t, a, o), !0), u
                }
                var l = {};

                function i() {}

                function c() {}

                function u() {}
                n = Object.getPrototypeOf;
                var s = [][r] ? n(n([][r]())) : (x(n = {}, r, function() {
                        return this
                    }), n),
                    d = u.prototype = i.prototype = Object.create(s);

                function p(e) {
                    return Object.setPrototypeOf ? Object.setPrototypeOf(e, u) : (e.__proto__ = u, x(e, a, "GeneratorFunction")), e.prototype = Object.create(d), e
                }
                return c.prototype = u, x(d, "constructor", u), x(u, "constructor", c), c.displayName = "GeneratorFunction", x(u, a, "GeneratorFunction"), x(d), x(d, a, "Generator"), x(d, r, function() {
                    return this
                }), x(d, "toString", function() {
                    return "[object Generator]"
                }), (y = function() {
                    return {
                        w: o,
                        m: p
                    }
                })()
            }

            function x(e, n, t, r) {
                var a = Object.defineProperty;
                try {
                    a({}, "", {})
                } catch (e) {
                    a = 0
                }
                x = function(e, n, t, r) {
                    function o(n, t) {
                        x(e, n, function(e) {
                            return this._invoke(n, t, e)
                        })
                    }
                    n ? a ? a(e, n, {
                        value: t,
                        enumerable: !r,
                        configurable: !r,
                        writable: !r
                    }) : e[n] = t : (o("next", 0), o("throw", 1), o("return", 2))
                }, x(e, n, t, r)
            }

            function k(e, n, t, r, a, o, l) {
                try {
                    var i = e[o](l),
                        c = i.value
                } catch (e) {
                    return void t(e)
                }
                i.done ? n(c) : Promise.resolve(c).then(r, a)
            }
            var w = "__enoCtx",
                C = {
                    onSecurityContextChange: []
                },
                L = "",
                E = "",
                S = {};
            var P = {
                isLoaded: function() {
                    var e = m.getCurrentTenant();
                    return !!P.getSecurityContextForTenant(e)
                },
                getSecurityContextForTenant: function(e) {
                    return S[e]
                },
                loadSecurityContexts: function() {
                    return new Promise(function(e, n) {
                        var t = function() {
                            var t = m.getCurrentTenant(),
                                r = m.getUrlForTenantAndService(t, "3DSpace");
                            if (r && "" !== r) {
                                var a = "/resources/modeler/pno/person?current=true&select=preferredcredentials&select=collabspaces&select=firstname&select=lastname&tenant=".concat(t);
                                requirejs(["DS/WAFData/WAFData"], function(n) {
                                    n.authenticatedRequest(r + a, {
                                        method: "GET",
                                        headers: {
                                            SecurityContext: ""
                                        },
                                        data: {},
                                        type: "json",
                                        onComplete: function(n) {
                                            S[t] = n,
                                                function() {
                                                    var e = m.getCurrentTenant(),
                                                        n = P.getSecurityContextForTenant(e),
                                                        t = widget.getValue(w),
                                                        r = !1,
                                                        a = widget.getPreference(w);
                                                    if (a.type = "list", a.options = n.collabspaces.reduce(function(e, n) {
                                                            return n.couples.forEach(function(a) {
                                                                var o = a.role,
                                                                    l = a.organization;
                                                                e.push({
                                                                    label: "".concat(o.nls || o.name, ".").concat(l.name, ".").concat(n.name),
                                                                    value: "".concat(o.name, ".").concat(l.name, ".").concat(n.name)
                                                                }), t === "".concat(o.name, ".").concat(l.name, ".").concat(n.name) && (r = !0)
                                                            }), e
                                                        }, []), r) a.defaultValue = t;
                                                    else {
                                                        var o = n.preferredcredentials,
                                                            l = o.collabspace,
                                                            i = o.role,
                                                            c = o.organization;
                                                        l && c && i ? a.defaultValue = "".concat(i.name, ".").concat(c.name, ".").concat(l.name) : a.options && a.options.length > 0 && (a.defaultValue = a.options[0].value)
                                                    }
                                                    widget.addPreference(a), widget.setValue(w, a.defaultValue), L = a.defaultValue
                                                }(), e()
                                        },
                                        onFailure: function(n) {
                                            console.warn(n), console.warn("WARNING: Error while calling the Web Service to retrieve the Security Contexts.  Any web service calls requiring Security Context will fail"), e()
                                        }
                                    })
                                }), requirejs(["DS/WAFData/WAFData"], function(t) {
                                    t.authenticatedRequest(r + "/resources/v1/application/CSRF", {
                                        method: "GET",
                                        headers: {
                                            SecurityContext: ""
                                        },
                                        data: {},
                                        type: "json",
                                        onComplete: function(t) {
                                            "false" === t.success ? n(new Error("Error calling the Web Service to retrieve the CSRF token"), t) : E = t.csrf.value, e()
                                        },
                                        onFailure: function(e) {
                                            n(new Error("Error calling the Web Service to retrieve the CSRF token"), e)
                                        }
                                    })
                                })
                            } else n(new Error("Impossible to retrieve 3DSpace url for tenant ".concat(t)))
                        };
                        m.isLoaded() ? t() : m.reload3DExpUrls().then(function() {
                            t()
                        })
                    })
                },
                waitUntilSecurityContextSet: function(e) {
                    var n = new Date;
                    return new Promise(function(t, r) {
                        var a = setInterval(function() {
                            "" !== L ? (clearInterval(a), t()) : new Date - n > e && (clearInterval(a), r(new Error("securitycontext was not set within max time: " + e + "(ms)")))
                        }, 200)
                    })
                },
                refreshCSRFToken: function() {
                    return new Promise(function(e, n) {
                        var t = m.getCurrentTenant(),
                            r = m.getUrlForTenantAndService(t, "3DSpace");
                        r ? requirejs(["DS/WAFData/WAFData"], function(t) {
                            t.authenticatedRequest(r + "/resources/v1/application/CSRF", {
                                method: "GET",
                                headers: {
                                    SecurityContext: L || ""
                                },
                                data: {},
                                type: "json",
                                onComplete: function(t) {
                                    var r;
                                    null !== (r = t.csrf) && void 0 !== r && r.value ? (E = t.csrf.value, console.log("CSRF Token refreshed"), e(E)) : n(new Error("CSRF token not found in response"))
                                },
                                onFailure: function(e) {
                                    console.error("Error refreshing CSRF token:", e), n(e)
                                }
                            })
                        }) : n(new Error("No 3DSpace url found for tenant: ".concat(t)))
                    })
                },
                call3DSpace: function(e) {
                    var n = this,
                        t = e.tenant,
                        r = e.url,
                        a = e.method,
                        o = void 0 === a ? "GET" : a,
                        l = e.headers,
                        i = void 0 === l ? {} : l,
                        c = e.data,
                        u = e.type,
                        s = e.dataType,
                        d = e.includePlatform,
                        p = void 0 !== d && d,
                        f = e.includeCSRF,
                        v = void 0 !== f && f;
                    return new Promise(function(e, a) {
                        var l = function() {
                            var l, d = (l = y().m(function l() {
                                var d, f, b, g, h, x, k;
                                return y().w(function(l) {
                                    for (;;) switch (l.p = l.n) {
                                        case 0:
                                            return l.p = 0, l.n = 1, n.waitUntilSecurityContextSet(1e4);
                                        case 1:
                                            if (console.log("executing call3DSpace"), t = m.getCurrentTenant(), d = m.getUrlForTenantAndService(t, "3DSpace"), i.SecurityContext = L, !v && "POST" !== o && "PATCH" !== o && "PUT" !== o && "DELETE" !== o) {
                                                l.n = 3;
                                                break
                                            }
                                            if (E) {
                                                l.n = 2;
                                                break
                                            }
                                            return console.log("CSRF token missing, refreshing..."), l.n = 2, n.refreshCSRFToken();
                                        case 2:
                                            i.ENO_CSRF_TOKEN = E;
                                        case 3:
                                            if (d) {
                                                l.n = 4;
                                                break
                                            }
                                            return a(new Error("No 3DSpace url found for the tenant: ".concat(t))), l.a(2);
                                        case 4:
                                            return p && (r += "&platform=" + t), l.n = 5, m.callWebService({
                                                method: o,
                                                url: d + r,
                                                headers: i,
                                                data: c,
                                                type: u,
                                                dataType: s
                                            });
                                        case 5:
                                            if (!(f = l.v).body.error) {
                                                l.n = 6;
                                                break
                                            }
                                            throw new Error(f.body.error);
                                        case 6:
                                            e(f.body);
                                        case 7:
                                            l.n = 17;
                                            break;
                                        case 8:
                                            if (l.p = 8, !(null != (x = l.v) && null !== (b = x.message) && void 0 !== b && b.includes("CSRF") || null != x && null !== (g = x.body) && void 0 !== g && null !== (g = g.message) && void 0 !== g && g.includes("CSRF"))) {
                                                l.n = 16;
                                                break
                                            }
                                            return console.log("CSRF error detected, refreshing token and retrying..."), l.p = 9, l.n = 10, n.refreshCSRFToken();
                                        case 10:
                                            return i.ENO_CSRF_TOKEN = E, l.n = 11, m.callWebService({
                                                method: o,
                                                url: m.getUrlForTenantAndService(t, "3DSpace") + r,
                                                headers: i,
                                                data: c,
                                                type: u,
                                                dataType: s
                                            });
                                        case 11:
                                            if (!(h = l.v).body.error) {
                                                l.n = 12;
                                                break
                                            }
                                            throw new Error(h.body.error);
                                        case 12:
                                            e(h.body);
                                        case 13:
                                            l.n = 15;
                                            break;
                                        case 14:
                                            l.p = 14, k = l.v, console.error("Retry after CSRF refresh also failed:", k), a(k);
                                        case 15:
                                            l.n = 17;
                                            break;
                                        case 16:
                                            console.error(x), a(x);
                                        case 17:
                                            return l.a(2)
                                    }
                                }, l, null, [
                                    [9, 14],
                                    [0, 8]
                                ])
                            }), function() {
                                var e = this,
                                    n = arguments;
                                return new Promise(function(t, r) {
                                    var a = l.apply(e, n);

                                    function o(e) {
                                        k(a, t, r, o, i, "next", e)
                                    }

                                    function i(e) {
                                        k(a, t, r, o, i, "throw", e)
                                    }
                                    o(void 0)
                                })
                            });
                            return function() {
                                return d.apply(this, arguments)
                            }
                        }();
                        P.isLoaded() ? l() : P.loadSecurityContexts().then(function() {
                            l()
                        }).catch(function(e) {
                            console.error(e), a(e)
                        })
                    })
                },
                call3DSearch: function(query, opts) {
                    /* Federated Search runs on its own service host. The compass
                     * normally hands it out as "3DSearch"; if it does not, derive
                     * it from the 3DSpace url (...-space... -> ...-fedsearch...). */
                    var t = m.getCurrentTenant(),
                        base = "";
                    try {
                        base = m.getUrlForTenantAndService(t, "3DSearch") || ""
                    } catch (e) {}
                    if (!base) {
                        var sp = "";
                        try {
                            sp = m.getUrlForTenantAndService(t, "3DSpace") || ""
                        } catch (e) {}
                        base = sp ? sp.split("/enovia")[0].replace("-space", "-fedsearch") : ""
                    }
                    if (!base) return Promise.reject(new Error("no search service url for tenant " + t));
                    return m.callWebService({
                        method: "POST",
                        url: base + "/federated/search?xrequestedwith=xmlhttprequest",
                        headers: {
                            "Content-Type": "application/json",
                            SecurityContext: L || ""
                        },
                        data: {
                            label: (opts && opts.label) || "zen-search",
                            query: query,
                            start: "0",
                            nresults: (opts && opts.nresults) || 100,
                            tenant: t,
                            with_indexing_date: !1,
                            select_predicate: (opts && opts.select) || ["physicalid", "ds6w:label", "ds6w:identifier"]
                        },
                        type: "json"
                    }).then(function(r2) {
                        return r2 && r2.body || {}
                    })
                }
            };
            void 0 === widget.getPreference(w) && widget.addPreference({
                name: w,
                type: "text",
                label: "Credentials",
                defaultValue: "",
                onchange: "onChangeSecurityContext"
            }), L = widget.getValue(w), window.__zenErpCtx = L, widget.addEvent("onChangeSecurityContext", function(e, n) {
                e === w && (L = n, window.__zenErpCtx = L, document.dispatchEvent(new CustomEvent("zen-erp-ctx", {
                    detail: L
                })), C.onSecurityContextChange.forEach(function(e) {
                    e(L)
                }))
            }), m.addEventListener("onTenantChange", function() {
                P.loadSecurityContexts().then(function() {
                    widget.dispatchEvent("onEdit")
                }).catch(function() {
                    var e;
                    (e = console).error.apply(e, arguments)
                })
            }), P.loadSecurityContexts().catch(function() {
                var e;
                (e = console).error.apply(e, arguments)
            });
            const _ = P;
            window.__zenErpApi = P;
            /* Download helper for the 3DDashboard widget iframe: keeps the object
             * URL alive for 10 minutes instead of FileSaver's 40 s, so a slow
             * download is not cancelled while Chrome is still scanning it. */
            window.__zenSaveBlob = function(blob, name) {
                try {
                    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                        window.navigator.msSaveOrOpenBlob(blob, name);
                        return
                    }
                    var url = URL.createObjectURL(blob),
                        a2 = document.createElement("a");
                    a2.href = url;
                    a2.download = name || "download";
                    a2.rel = "noopener";
                    a2.style.display = "none";
                    document.body.appendChild(a2);
                    a2.click();
                    setTimeout(function() {
                        try {
                            document.body.removeChild(a2)
                        } catch (e) {}
                        try {
                            URL.revokeObjectURL(url)
                        } catch (e) {}
                    }, 600000)
                } catch (e) {
                    console.error("[zen-save] download failed", e)
                }
            };
            window.__zenErpSetRoot = function(rootId, itemType) {
                try {
                    window.__zenErpRoot = rootId ? {
                        rootPhysicalId: rootId,
                        itemType: itemType || "VPMReference"
                    } : null;
                    document.dispatchEvent(new CustomEvent("zen-erp-root", {
                        detail: window.__zenErpRoot
                    }))
                } catch (e) {
                    console.warn("[zen-erp] setRoot failed", e)
                }
            };
            var M = t(3959),
                T = t(4213);

            function A(e) {
                return A = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, A(e)
            }

            function j() {
                var e, n, t = "function" == typeof Symbol ? Symbol : {},
                    r = t.iterator || "@@iterator",
                    a = t.toStringTag || "@@toStringTag";

                function o(t, r, a, o) {
                    var c = r && r.prototype instanceof i ? r : i,
                        u = Object.create(c.prototype);
                    return O(u, "_invoke", function(t, r, a) {
                        var o, i, c, u = 0,
                            s = a || [],
                            d = !1,
                            p = {
                                p: 0,
                                n: 0,
                                v: e,
                                a: f,
                                f: f.bind(e, 4),
                                d: function(n, t) {
                                    return o = n, i = 0, c = e, p.n = t, l
                                }
                            };

                        function f(t, r) {
                            for (i = t, c = r, n = 0; !d && u && !a && n < s.length; n++) {
                                var a, o = s[n],
                                    f = p.p,
                                    v = o[2];
                                t > 3 ? (a = v === r) && (c = o[(i = o[4]) ? 5 : (i = 3, 3)], o[4] = o[5] = e) : o[0] <= f && ((a = t < 2 && f < o[1]) ? (i = 0, p.v = r, p.n = o[1]) : f < v && (a = t < 3 || o[0] > r || r > v) && (o[4] = t, o[5] = r, p.n = v, i = 0))
                            }
                            if (a || t > 1) return l;
                            throw d = !0, r
                        }
                        return function(a, s, v) {
                            if (u > 1) throw TypeError("Generator is already running");
                            for (d && 1 === s && f(s, v), i = s, c = v;
                                (n = i < 2 ? e : c) || !d;) {
                                o || (i ? i < 3 ? (i > 1 && (p.n = -1), f(i, c)) : p.n = c : p.v = c);
                                try {
                                    if (u = 2, o) {
                                        if (i || (a = "next"), n = o[a]) {
                                            if (!(n = n.call(o, c))) throw TypeError("iterator result is not an object");
                                            if (!n.done) return n;
                                            c = n.value, i < 2 && (i = 0)
                                        } else 1 === i && (n = o.return) && n.call(o), i < 2 && (c = TypeError("The iterator does not provide a '" + a + "' method"), i = 1);
                                        o = e
                                    } else if ((n = (d = p.n < 0) ? c : t.call(r, p)) !== l) break
                                } catch (n) {
                                    o = e, i = 1, c = n
                                } finally {
                                    u = 1
                                }
                            }
                            return {
                                value: n,
                                done: d
                            }
                        }
                    }(t, a, o), !0), u
                }
                var l = {};

                function i() {}

                function c() {}

                function u() {}
                n = Object.getPrototypeOf;
                var s = [][r] ? n(n([][r]())) : (O(n = {}, r, function() {
                        return this
                    }), n),
                    d = u.prototype = i.prototype = Object.create(s);

                function p(e) {
                    return Object.setPrototypeOf ? Object.setPrototypeOf(e, u) : (e.__proto__ = u, O(e, a, "GeneratorFunction")), e.prototype = Object.create(d), e
                }
                return c.prototype = u, O(d, "constructor", u), O(u, "constructor", c), c.displayName = "GeneratorFunction", O(u, a, "GeneratorFunction"), O(d), O(d, a, "Generator"), O(d, r, function() {
                    return this
                }), O(d, "toString", function() {
                    return "[object Generator]"
                }), (j = function() {
                    return {
                        w: o,
                        m: p
                    }
                })()
            }

            function O(e, n, t, r) {
                var a = Object.defineProperty;
                try {
                    a({}, "", {})
                } catch (e) {
                    a = 0
                }
                O = function(e, n, t, r) {
                    function o(n, t) {
                        O(e, n, function(e) {
                            return this._invoke(n, t, e)
                        })
                    }
                    n ? a ? a(e, n, {
                        value: t,
                        enumerable: !r,
                        configurable: !r,
                        writable: !r
                    }) : e[n] = t : (o("next", 0), o("throw", 1), o("return", 2))
                }, O(e, n, t, r)
            }

            function V(e, n) {
                var t = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    n && (r = r.filter(function(n) {
                        return Object.getOwnPropertyDescriptor(e, n).enumerable
                    })), t.push.apply(t, r)
                }
                return t
            }

            function D(e) {
                for (var n = 1; n < arguments.length; n++) {
                    var t = null != arguments[n] ? arguments[n] : {};
                    n % 2 ? V(Object(t), !0).forEach(function(n) {
                        R(e, n, t[n])
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : V(Object(t)).forEach(function(n) {
                        Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n))
                    })
                }
                return e
            }

            function R(e, n, t) {
                return (n = function(e) {
                    var n = function(e) {
                        if ("object" != A(e) || !e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 !== n) {
                            var t = n.call(e, "string");
                            if ("object" != A(t)) return t;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == A(n) ? n : n + ""
                }(n)) in e ? Object.defineProperty(e, n, {
                    value: t,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[n] = t, e
            }

            function H(e, n, t, r, a, o, l) {
                try {
                    var i = e[o](l),
                        c = i.value
                } catch (e) {
                    return void t(e)
                }
                i.done ? n(c) : Promise.resolve(c).then(r, a)
            }
            var F = {
                    tenant: "R1132101868454",
                    attributeType: "VPMReference",
                    endpoints: {
                        bomExpand: "/cvservlet/progressiveexpand/v2",
                        customAttributes: "/resources/ParamWS/datamodel/listofattributesfortype",
                        ecosystem: "/resources/enorelnav/v2/navigate/getEcosystem"
                    }
                },
                I = null,
                B = function() {
                    var e, n = (e = j().m(function e() {
                        var n, r, a, o, l, i = arguments;
                        return j().w(function(e) {
                            for (;;) switch (e.p = e.n) {
                                case 0:
                                    if (n = i.length > 0 && void 0 !== i[0] && i[0], !I || n) {
                                        e.n = 1;
                                        break
                                    }
                                    return console.log("[Config] Using cached config:", I), e.a(2, I);
                                case 1:
                                    return e.p = 1, r = t.p, a = "".concat(r, "config.json?_t=").concat(Date.now()), console.log("[Config] Fetching config from:", a), e.n = 2, fetch(a);
                                case 2:
                                    if (o = e.v, console.log("[Config] Fetch response status:", o.status, o.ok), !o.ok) {
                                        e.n = 4;
                                        break
                                    }
                                    return e.n = 3, o.json();
                                case 3:
                                    I = e.v, console.log("[Config] Runtime config yüklendi:", I), e.n = 5;
                                    break;
                                case 4:
                                    console.warn("[Config] config.json bulunamadı, varsayılan değerler kullanılıyor"), I = D({}, F);
                                case 5:
                                    e.n = 7;
                                    break;
                                case 6:
                                    e.p = 6, l = e.v, console.warn("[Config] config.json okunamadı, varsayılan değerler kullanılıyor:", l.message), I = D({}, F);
                                case 7:
                                    return e.a(2, I)
                            }
                        }, e, null, [
                            [1, 6]
                        ])
                    }), function() {
                        var n = this,
                            t = arguments;
                        return new Promise(function(r, a) {
                            var o = e.apply(n, t);

                            function l(e) {
                                H(o, r, a, l, i, "next", e)
                            }

                            function i(e) {
                                H(o, r, a, l, i, "throw", e)
                            }
                            l(void 0)
                        })
                    });
                    return function() {
                        return n.apply(this, arguments)
                    }
                }(),
                z = function() {
                    return I || console.warn("[Config] getConfig called but runtimeConfig is null! Using defaultConfig."), I || F
                },
                Q = {
                    output_format: "cvjson",
                    xrequestedwith: "xmlhttprequest"
                },
                W = function(e) {
                    var n = z();
                    return function(e) {
                        var n, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                            r = z(),
                            a = (null === (n = r.endpoints) || void 0 === n ? void 0 : n[e]) || F.endpoints[e];
                        if (!a) throw new Error("Unknown endpoint: ".concat(e));
                        var o = new URLSearchParams(D(D({}, Q), {}, {
                            tenant: r.tenant
                        }, t));
                        return "".concat(a, "?").concat(o.toString())
                    }("customAttributes", {
                        type: e || n.attributeType
                    })
                },
                X = function() {
                    var e, n, t = z(),
                        r = null !== (e = null === (n = t.endpoints) || void 0 === n ? void 0 : n.bomExpand) && void 0 !== e ? e : F.endpoints.bomExpand,
                        a = new URLSearchParams(D(D({}, Q), {}, {
                            tenant: t.tenant,
                            output_format: "cvjson"
                        }));
                    return "".concat(r, "?").concat(a.toString())
                },
                K = function(e) {
                    return "/resources/v1/modeler/dsmfg/dsmfg:MfgItem/".concat(e, "/expand?xrequestedwith=xmlhttprequest&$mask=dsmfg:MfgItem.ExpandMask.Details.V1")
                },
                q = function(e) {
                    return "/resources/v1/modeler/dsmfg/dsmfg:MfgItem/".concat(e, "?xrequestedwith=xmlhttprequest&$mask=dsmfg:MfgItemMask.Details")
                },
                N = function() {
                    return "/resources/v1/modeler/dsmfg/dsmfg:MfgItem/bulkfetch?xrequestedwith=xmlhttprequest&$mask=dsmfg:MfgItemMask.Details"
                },
                G = function(e) {
                    return "/resources/v1/modeler/dsmfg/dsmfg:MfgItem/".concat(e, "/dscfg:Configured")
                },
                U = function(e) {
                    return "/resources/v1/modeler/dsmfg/dsmfg:MfgItem/".concat(e, "/expand?xrequestedwith=xmlhttprequest")
                };
            const Z = {
                get tenant() {
                    return z().tenant
                },
                get attributeType() {
                    return z().attributeType
                },
                get endpoints() {
                    return z().endpoints || F.endpoints
                },
                defaultQueryParams: Q
            };
            console.log("[BOMWidget] 513 build v1.4.13 (drawing check for electrical items; 6wtag fallback dropped)");
            var __bomMatUrl = function(kind) {
                    return "/resources/v1/engineeringItem/getApplied" + kind + "?xrequestedwith=xmlhttprequest&tenant=" + encodeURIComponent(Z.tenant)
                },
                __bomUser = "",
                __bomUserGet = function() {
                    if (__bomUser) return Promise.resolve(__bomUser);
                    try {
                        var e = m.getCurrentTenant(),
                            n = P.getSecurityContextForTenant(e) || {},
                            t = n.name || n.user || n.login || n.id;
                        if (t && "string" == typeof t) return __bomUser = t, Promise.resolve(t)
                    } catch (r) {}
                    var a = m.getCurrentTenant();
                    return m.callWebService({
                        method: "GET",
                        url: m.getUrlForTenantAndService(a, "3DSpace") + "/resources/modeler/pno/person?current=true&select=name&tenant=" + a,
                        headers: {
                            Accept: "application/json"
                        },
                        type: "json"
                    }).then(function(e2) {
                        var n2 = e2 && e2.body || {};
                        return __bomUser = n2.name || n2.user || n2.login || n2.id || ""
                    }).catch(function() {
                        return ""
                    })
                },
                __bomThumbCall = function(chunk) {
                    var t = m.getCurrentTenant(),
                        base = m.getUrlForTenantAndService(t, "3DSpace");
                    if (!base) return Promise.reject(new Error("No 3DSpace url for tenant " + t));
                    return __bomUserGet().then(function(user) {
                        var ctx = "ctx::" + L,
                            headers = {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                                SecurityContext: encodeURIComponent(ctx),
                                SecurityToken: encodeURIComponent((user || "") + "|" + ctx + "|preferred")
                            };
                        return m.callWebService({
                            method: "POST",
                            url: base + "/cvservlet/fetch/v2?tenant=" + encodeURIComponent(t) + "&SecurityContext=" + ctx + "&xrequestedwith=xmlhttprequest",
                            headers: headers,
                            data: __bomThumbBody(chunk),
                            type: "json"
                        })
                    }).then(function(r) {
                        if (r && r.body && r.body.error) throw new Error(r.body.error);
                        return r && r.body
                    })
                },
                __bomThumbBody = function(e) {
                    return {
                        select_file: ["icon", "thumbnail_2d"],
                        fcs_url_mode: "REDIRECT",
                        label: "BOMWidget-thumbs-" + Date.now(),
                        physicalid: e,
                        locale: "en",
                        tenant: Z.tenant,
                        select_predicate: ["physicalid", "ds6w:label"]
                    }
                },
                __bomCrcTbl = null,
                __bomCrc32 = function(e) {
                    if (!__bomCrcTbl) {
                        __bomCrcTbl = new Int32Array(256);
                        for (var n = 0; n < 256; n++) {
                            for (var t = n, r = 0; r < 8; r++) t = 1 & t ? t >>> 1 ^ 3988292384 : t >>> 1;
                            __bomCrcTbl[n] = t
                        }
                    }
                    for (var a = -1, o = 0; o < e.length; o++) a = a >>> 8 ^ __bomCrcTbl[255 & (a ^ e[o])];
                    return ~a >>> 0
                },
                __bomXmlEsc = function(e) {
                    return String(null == e ? "" : e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
                },
                __bomColLetter = function(e) {
                    for (var n = ""; e >= 0;) n = String.fromCharCode(65 + e % 26) + n, e = Math.floor(e / 26) - 1;
                    return n
                },
                __bomZip = function(e) {
                    var n = new TextEncoder,
                        t = new Date,
                        r = t.getHours() << 11 | t.getMinutes() << 5 | t.getSeconds() >> 1,
                        a = t.getFullYear() - 1980 << 9 | t.getMonth() + 1 << 5 | t.getDate(),
                        o = [],
                        l = 0;
                    e.forEach(function(e2) {
                        var t2 = n.encode(e2.name),
                            i2 = e2.data,
                            c2 = __bomCrc32(i2),
                            u2 = new Uint8Array(30 + t2.length),
                            s2 = new DataView(u2.buffer);
                        s2.setUint32(0, 67324752, !0), s2.setUint16(4, 20, !0), s2.setUint16(6, 2048, !0), s2.setUint16(8, 0, !0), s2.setUint16(10, r, !0), s2.setUint16(12, a, !0), s2.setUint32(14, c2, !0), s2.setUint32(18, i2.length, !0), s2.setUint32(22, i2.length, !0), s2.setUint16(26, t2.length, !0), s2.setUint16(28, 0, !0), u2.set(t2, 30), o.push({
                            local: u2,
                            data: i2,
                            nameB: t2,
                            crc: c2,
                            offset: l
                        }), l += u2.length + i2.length
                    });
                    var i = [];
                    o.forEach(function(e2) {
                        var n2 = new Uint8Array(46 + e2.nameB.length),
                            t2 = new DataView(n2.buffer);
                        t2.setUint32(0, 33639248, !0), t2.setUint16(4, 20, !0), t2.setUint16(6, 20, !0), t2.setUint16(8, 2048, !0), t2.setUint16(10, 0, !0), t2.setUint16(12, r, !0), t2.setUint16(14, a, !0), t2.setUint32(16, e2.crc, !0), t2.setUint32(20, e2.data.length, !0), t2.setUint32(24, e2.data.length, !0), t2.setUint16(28, e2.nameB.length, !0), t2.setUint32(42, e2.offset, !0), n2.set(e2.nameB, 46), i.push(n2)
                    });
                    var c = i.reduce(function(e2, n2) {
                            return e2 + n2.length
                        }, 0),
                        u = new Uint8Array(22),
                        s = new DataView(u.buffer);
                    s.setUint32(0, 101010256, !0), s.setUint16(8, o.length, !0), s.setUint16(10, o.length, !0), s.setUint32(12, c, !0), s.setUint32(16, l, !0);
                    var d = new Uint8Array(l + c + 22),
                        p = 0;
                    return o.forEach(function(e2) {
                        d.set(e2.local, p), p += e2.local.length, d.set(e2.data, p), p += e2.data.length
                    }), i.forEach(function(e2) {
                        d.set(e2, p), p += e2.length
                    }), d.set(u, p), d
                },
                __bomXlsxWithImages = function(e) {
                    var n = new TextEncoder,
                        t = e.header,
                        r = e.rows,
                        a = e.thumbCol,
                        o = e.images || [],
                        l = [],
                        i = new Map;
                    o.forEach(function(e2) {
                        e2 && !i.has(e2) && (i.set(e2, l.length), l.push(e2))
                    });
                    var c = "<cols>";
                    t.forEach(function(e2, n2) {
                        c += '<col min="' + (n2 + 1) + '" max="' + (n2 + 1) + '" width="' + (0 === n2 ? 8 : 1 === n2 ? 40 : n2 === a ? 20 : 15) + '" customWidth="1"/>'
                    }), c += "</cols>";
                    var u = function(e2, n2, t2, r2) {
                            var a2 = __bomColLetter(t2) + n2;
                            return "number" == typeof e2 && isFinite(e2) ? '<c r="' + a2 + '" s="' + r2 + '"><v>' + e2 + "</v></c>" : '<c r="' + a2 + '" s="' + r2 + '" t="inlineStr"><is><t xml:space="preserve">' + __bomXmlEsc(e2) + "</t></is></c>"
                        },
                        s = '<row r="1" ht="20" customHeight="1">';
                    t.forEach(function(e2, n2) {
                        s += u(e2, 1, n2, 1)
                    }), s += "</row>", r.forEach(function(e2, n2) {
                        var t2 = n2 + 2;
                        s += '<row r="' + t2 + '"' + (o[n2] ? ' ht="57" customHeight="1"' : "") + ">", e2.forEach(function(e3, n3) {
                            s += u(e3, t2, n3, 0)
                        }), s += "</row>"
                    });
                    var d = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' + c + "<sheetData>" + s + "</sheetData>" + (l.length ? '<drawing r:id="rId1"/>' : "") + "</worksheet>",
                        p = "",
                        f = 1;
                    o.forEach(function(e2, n2) {
                        if (e2) {
                            var t2 = i.get(e2),
                                r2 = Math.min(128 / (e2.w || 128), 72 / (e2.h || 72), 1),
                                o2 = Math.max(1, Math.round((e2.w || 128) * r2)),
                                l2 = Math.max(1, Math.round((e2.h || 72) * r2)),
                                c2 = 9525 * o2,
                                u2 = 9525 * l2;
                            p += "<xdr:oneCellAnchor><xdr:from><xdr:col>" + a + "</xdr:col><xdr:colOff>19050</xdr:colOff><xdr:row>" + (n2 + 1) + '</xdr:row><xdr:rowOff>9525</xdr:rowOff></xdr:from><xdr:ext cx="' + c2 + '" cy="' + u2 + '"/><xdr:pic><xdr:nvPicPr><xdr:cNvPr id="' + f + '" name="thumb' + f + '"/><xdr:cNvPicPr><a:picLocks noChangeAspect="1"/></xdr:cNvPicPr></xdr:nvPicPr><xdr:blipFill><a:blip r:embed="rId' + (t2 + 1) + '"/><a:stretch><a:fillRect/></a:stretch></xdr:blipFill><xdr:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="' + c2 + '" cy="' + u2 + '"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></xdr:spPr></xdr:pic><xdr:clientData/></xdr:oneCellAnchor>', f++
                        }
                    });
                    var v = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><xdr:wsDr xmlns:xdr="http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' + p + "</xdr:wsDr>",
                        b = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' + l.map(function(e2, n2) {
                            return '<Relationship Id="rId' + (n2 + 1) + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/image' + (n2 + 1) + "." + (e2.ext || "png") + '"/>'
                        }).join("") + "</Relationships>",
                        g = [{
                            name: "[Content_Types].xml",
                            data: n.encode('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Default Extension="jpeg" ContentType="image/jpeg"/><Default Extension="gif" ContentType="image/gif"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>' + (l.length ? '<Override PartName="/xl/drawings/drawing1.xml" ContentType="application/vnd.openxmlformats-officedocument.drawing+xml"/>' : "") + "</Types>")
                        }, {
                            name: "_rels/.rels",
                            data: n.encode('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>')
                        }, {
                            name: "xl/workbook.xml",
                            data: n.encode('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="BOM" sheetId="1" r:id="rId1"/></sheets></workbook>')
                        }, {
                            name: "xl/_rels/workbook.xml.rels",
                            data: n.encode('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>')
                        }, {
                            name: "xl/styles.xml",
                            data: n.encode('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF111F5A"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>')
                        }, {
                            name: "xl/worksheets/sheet1.xml",
                            data: n.encode(d)
                        }];
                    l.length && (g.push({
                        name: "xl/worksheets/_rels/sheet1.xml.rels",
                        data: n.encode('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing" Target="../drawings/drawing1.xml"/></Relationships>')
                    }), g.push({
                        name: "xl/drawings/drawing1.xml",
                        data: n.encode(v)
                    }), g.push({
                        name: "xl/drawings/_rels/drawing1.xml.rels",
                        data: n.encode(b)
                    }), l.forEach(function(e2, n2) {
                        g.push({
                            name: "xl/media/image" + (n2 + 1) + "." + (e2.ext || "png"),
                            data: e2.bytes
                        })
                    })), window.__zenSaveBlob(new Blob([__bomZip(g)], {
                        type: "application/octet-stream"
                    }), e.fileName)
                };

            function $(e) {
                return $ = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, $(e)
            }

            function J(e) {
                return function(e) {
                    if (Array.isArray(e)) return oe(e)
                }(e) || function(e) {
                    if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
                }(e) || ae(e) || function() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function Y(e, n) {
                var t = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    n && (r = r.filter(function(n) {
                        return Object.getOwnPropertyDescriptor(e, n).enumerable
                    })), t.push.apply(t, r)
                }
                return t
            }

            function ee(e) {
                for (var n = 1; n < arguments.length; n++) {
                    var t = null != arguments[n] ? arguments[n] : {};
                    n % 2 ? Y(Object(t), !0).forEach(function(n) {
                        ne(e, n, t[n])
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : Y(Object(t)).forEach(function(n) {
                        Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n))
                    })
                }
                return e
            }

            function ne(e, n, t) {
                return (n = function(e) {
                    var n = function(e) {
                        if ("object" != $(e) || !e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 !== n) {
                            var t = n.call(e, "string");
                            if ("object" != $(t)) return t;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == $(n) ? n : n + ""
                }(n)) in e ? Object.defineProperty(e, n, {
                    value: t,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[n] = t, e
            }

            function te(e, n) {
                return function(e) {
                    if (Array.isArray(e)) return e
                }(e) || function(e, n) {
                    var t = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                    if (null != t) {
                        var r, a, o, l, i = [],
                            c = !0,
                            u = !1;
                        try {
                            if (o = (t = t.call(e)).next, 0 === n) {
                                if (Object(t) !== t) return;
                                c = !1
                            } else
                                for (; !(c = (r = o.call(t)).done) && (i.push(r.value), i.length !== n); c = !0);
                        } catch (e) {
                            u = !0, a = e
                        } finally {
                            try {
                                if (!c && null != t.return && (l = t.return(), Object(l) !== l)) return
                            } finally {
                                if (u) throw a
                            }
                        }
                        return i
                    }
                }(e, n) || ae(e, n) || function() {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function re(e, n) {
                var t = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                if (!t) {
                    if (Array.isArray(e) || (t = ae(e)) || n && e && "number" == typeof e.length) {
                        t && (e = t);
                        var r = 0,
                            a = function() {};
                        return {
                            s: a,
                            n: function() {
                                return r >= e.length ? {
                                    done: !0
                                } : {
                                    done: !1,
                                    value: e[r++]
                                }
                            },
                            e: function(e) {
                                throw e
                            },
                            f: a
                        }
                    }
                    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }
                var o, l = !0,
                    i = !1;
                return {
                    s: function() {
                        t = t.call(e)
                    },
                    n: function() {
                        var e = t.next();
                        return l = e.done, e
                    },
                    e: function(e) {
                        i = !0, o = e
                    },
                    f: function() {
                        try {
                            l || null == t.return || t.return()
                        } finally {
                            if (i) throw o
                        }
                    }
                }
            }

            function ae(e, n) {
                if (e) {
                    if ("string" == typeof e) return oe(e, n);
                    var t = {}.toString.call(e).slice(8, -1);
                    return "Object" === t && e.constructor && (t = e.constructor.name), "Map" === t || "Set" === t ? Array.from(e) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? oe(e, n) : void 0
                }
            }

            function oe(e, n) {
                (null == n || n > e.length) && (n = e.length);
                for (var t = 0, r = Array(n); t < n; t++) r[t] = e[t];
                return r
            }

            function le() {
                var e, n, t = "function" == typeof Symbol ? Symbol : {},
                    r = t.iterator || "@@iterator",
                    a = t.toStringTag || "@@toStringTag";

                function o(t, r, a, o) {
                    var c = r && r.prototype instanceof i ? r : i,
                        u = Object.create(c.prototype);
                    return ie(u, "_invoke", function(t, r, a) {
                        var o, i, c, u = 0,
                            s = a || [],
                            d = !1,
                            p = {
                                p: 0,
                                n: 0,
                                v: e,
                                a: f,
                                f: f.bind(e, 4),
                                d: function(n, t) {
                                    return o = n, i = 0, c = e, p.n = t, l
                                }
                            };

                        function f(t, r) {
                            for (i = t, c = r, n = 0; !d && u && !a && n < s.length; n++) {
                                var a, o = s[n],
                                    f = p.p,
                                    v = o[2];
                                t > 3 ? (a = v === r) && (c = o[(i = o[4]) ? 5 : (i = 3, 3)], o[4] = o[5] = e) : o[0] <= f && ((a = t < 2 && f < o[1]) ? (i = 0, p.v = r, p.n = o[1]) : f < v && (a = t < 3 || o[0] > r || r > v) && (o[4] = t, o[5] = r, p.n = v, i = 0))
                            }
                            if (a || t > 1) return l;
                            throw d = !0, r
                        }
                        return function(a, s, v) {
                            if (u > 1) throw TypeError("Generator is already running");
                            for (d && 1 === s && f(s, v), i = s, c = v;
                                (n = i < 2 ? e : c) || !d;) {
                                o || (i ? i < 3 ? (i > 1 && (p.n = -1), f(i, c)) : p.n = c : p.v = c);
                                try {
                                    if (u = 2, o) {
                                        if (i || (a = "next"), n = o[a]) {
                                            if (!(n = n.call(o, c))) throw TypeError("iterator result is not an object");
                                            if (!n.done) return n;
                                            c = n.value, i < 2 && (i = 0)
                                        } else 1 === i && (n = o.return) && n.call(o), i < 2 && (c = TypeError("The iterator does not provide a '" + a + "' method"), i = 1);
                                        o = e
                                    } else if ((n = (d = p.n < 0) ? c : t.call(r, p)) !== l) break
                                } catch (n) {
                                    o = e, i = 1, c = n
                                } finally {
                                    u = 1
                                }
                            }
                            return {
                                value: n,
                                done: d
                            }
                        }
                    }(t, a, o), !0), u
                }
                var l = {};

                function i() {}

                function c() {}

                function u() {}
                n = Object.getPrototypeOf;
                var s = [][r] ? n(n([][r]())) : (ie(n = {}, r, function() {
                        return this
                    }), n),
                    d = u.prototype = i.prototype = Object.create(s);

                function p(e) {
                    return Object.setPrototypeOf ? Object.setPrototypeOf(e, u) : (e.__proto__ = u, ie(e, a, "GeneratorFunction")), e.prototype = Object.create(d), e
                }
                return c.prototype = u, ie(d, "constructor", u), ie(u, "constructor", c), c.displayName = "GeneratorFunction", ie(u, a, "GeneratorFunction"), ie(d), ie(d, a, "Generator"), ie(d, r, function() {
                    return this
                }), ie(d, "toString", function() {
                    return "[object Generator]"
                }), (le = function() {
                    return {
                        w: o,
                        m: p
                    }
                })()
            }

            function ie(e, n, t, r) {
                var a = Object.defineProperty;
                try {
                    a({}, "", {})
                } catch (e) {
                    a = 0
                }
                ie = function(e, n, t, r) {
                    function o(n, t) {
                        ie(e, n, function(e) {
                            return this._invoke(n, t, e)
                        })
                    }
                    n ? a ? a(e, n, {
                        value: t,
                        enumerable: !r,
                        configurable: !r,
                        writable: !r
                    }) : e[n] = t : (o("next", 0), o("throw", 1), o("return", 2))
                }, ie(e, n, t, r)
            }

            function ce(e, n, t, r, a, o, l) {
                try {
                    var i = e[o](l),
                        c = i.value
                } catch (e) {
                    return void t(e)
                }
                i.done ? n(c) : Promise.resolve(c).then(r, a)
            }

            function ue(e) {
                return function() {
                    var n = this,
                        t = arguments;
                    return new Promise(function(r, a) {
                        var o = e.apply(n, t);

                        function l(e) {
                            ce(o, r, a, l, i, "next", e)
                        }

                        function i(e) {
                            ce(o, r, a, l, i, "throw", e)
                        }
                        l(void 0)
                    })
                }
            }
            var se = {
                    class: "bom-tree-table"
                },
                de = {
                    class: "tree-toolbar"
                },
                pe = {
                    class: "search-box"
                },
                fe = {
                    key: 0,
                    class: "search-icon",
                    viewBox: "0 0 24 24"
                },
                ve = ["placeholder"],
                be = {
                    key: 2,
                    class: "search-hint"
                },
                ge = {
                    key: 0,
                    class: "active-filters-indicator"
                },
                he = {
                    class: "filter-count"
                },
                me = {
                    class: "toolbar-actions"
                },
                ye = ["data-tooltip", "disabled"],
                xe = {
                    key: 0,
                    viewBox: "0 0 24 24"
                },
                ke = {
                    key: 1,
                    class: "expand-progress-wrapper"
                },
                we = {
                    class: "expand-percent"
                },
                Ce = ["disabled"],
                Le = ["data-tooltip", "disabled"],
                Ee = {
                    key: 0,
                    viewBox: "0 0 24 24"
                },
                Se = {
                    key: 1,
                    class: "expand-progress-wrapper"
                },
                Pe = {
                    class: "expand-percent"
                },
                _e = ["disabled"],
                Me = ["disabled"],
                Te = ["disabled"],
                Ae = ["disabled"],
                je = ["disabled"],
                Oe = {
                    class: "config-bar"
                },
                Ve = {
                    class: "config-section"
                },
                De = ["disabled"],
                Re = ["value"],
                He = {
                    key: 0,
                    class: "config-section"
                },
                Fe = ["disabled"],
                Ie = ["value"],
                Be = {
                    class: "config-section"
                },
                ze = ["disabled"],
                Qe = ["value"],
                We = ["disabled"],
                Xe = {
                    key: 1,
                    viewBox: "0 0 24 24"
                },
                Ke = {
                    class: "tree-scroll-container"
                },
                qe = {
                    class: "tree-table-inner"
                },
                Ne = ["onDragstart", "onDragover", "onDrop"],
                Ge = ["innerHTML"],
                Ue = ["onClick"],
                Ze = ["onMousedown"],
                $e = {
                    class: "filter-header"
                },
                Je = {
                    class: "filter-title"
                },
                Ye = {
                    class: "filter-search"
                },
                en = {
                    class: "filter-values-list"
                },
                nn = ["checked", "onChange"],
                tn = {
                    class: "filter-value-label"
                },
                rn = {
                    class: "filter-value-count"
                },
                an = {
                    class: "tree-body"
                },
                on = ["onDragstart", "onClick"],
                ln = ["onClick"],
                cn = {
                    key: 0,
                    class: "icon-svg",
                    viewBox: "0 0 24 24"
                },
                un = {
                    key: 1,
                    class: "icon-svg",
                    viewBox: "0 0 24 24"
                },
                sn = {
                    key: 1,
                    class: "leaf-spacer"
                },
                dn = ["src", "alt"],
                pn = {
                    class: "node-title"
                },
                fn = {
                    class: "cell-text"
                },
                vn = {
                    class: "chip-wrapper"
                },
                bn = {
                    class: "chip-wrapper"
                },
                gn = {
                    class: "chip-wrapper"
                },
                hn = {
                    class: "chip-wrapper"
                },
                mn = {
                    class: "chip-wrapper"
                },
                yn = {
                    class: "cell-text"
                },
                xn = {
                    key: 1,
                    class: "empty-state"
                };
            const kn = {
                __name: "BomTreeTable",
                props: {
                    data: {
                        type: Object,
                        default: function() {
                            return {}
                        }
                    },
                    selectedColumns: {
                        type: Array,
                        default: function() {
                            return ["ds6w:label", "_qty", "ds6wg:revision", "ds6w:status", "ds6w:responsible"]
                        }
                    },
                    availableColumns: {
                        type: Array,
                        default: function() {
                            return []
                        }
                    },
                    columnWidths: {
                        type: Object,
                        default: function() {
                            return {}
                        }
                    },
                    rootPhysicalId: {
                        type: String,
                        default: ""
                    },
                    itemType: {
                        type: String,
                        default: "VPMReference",
                        validator: function(e) {
                            return ["VPMReference", "CreateAssembly"].includes(e)
                        }
                    }
                },
                emits: ["update:selected-columns", "update:column-widths", "open-columns", "close", "refresh", "apply-configuration"],
                setup: function(e, n) {
                    var r = n.emit,
                        a = e,
                        u = r,
                        s = (0, c.KR)([]),
                        d = (0, c.KR)([]),
                        p = (0, c.KR)(""),
                        f = (0, c.KR)(!1),
                        v = (0, c.KR)([]),
                        b = (0, c.KR)(""),
                        g = (0, c.KR)(!1),
                        h = (0, c.KR)([]),
                        m = (0, c.KR)(""),
                        y = (0, c.KR)(!1),
                        x = (0, c.KR)(!1),
                        k = (0, l.EW)(function() {
                            return v.value.length > 1
                        }),
                        w = (0, l.EW)(function() {
                            return 1 === v.value.length ? v.value[0].id : b.value
                        }),
                        C = function() {
                            var e = ue(le().m(function e() {
                                var n, t, r, o;
                                return le().w(function(e) {
                                    for (;;) switch (e.p = e.n) {
                                        case 0:
                                            if (a.rootPhysicalId) {
                                                e.n = 1;
                                                break
                                            }
                                            return console.warn("No rootPhysicalId provided, cannot load models"), d.value = [], e.a(2);
                                        case 1:
                                            return f.value = !0, e.p = 2, t = "CreateAssembly" === a.itemType ? G(a.rootPhysicalId) : "/resources/v1/modeler/dseng/dseng:EngItem/".concat(a.rootPhysicalId, "/dscfg:Configured"), console.log("[loadModels] itemType: ".concat(a.itemType, ", URL: ").concat(t)), e.n = 3, _.call3DSpace({
                                                url: t,
                                                method: "GET",
                                                headers: {
                                                    "Content-Type": "application/json"
                                                },
                                                type: "json"
                                            });
                                        case 3:
                                            r = e.v, console.log("Models API Response:", r), null != r && null !== (n = r.member) && void 0 !== n && null !== (n = n[0]) && void 0 !== n && null !== (n = n.configurationCtxt) && void 0 !== n && n.member ? (d.value = r.member[0].configurationCtxt.member.map(function(e) {
                                                return {
                                                    id: e.id,
                                                    name: e.title || e.name,
                                                    description: e.description,
                                                    state: e.state,
                                                    revision: e.revision,
                                                    relativePath: e.relativePath,
                                                    raw: e
                                                }
                                            }), console.log("Parsed Models:", d.value)) : (console.warn("No models found in response"), d.value = []), e.n = 5;
                                            break;
                                        case 4:
                                            e.p = 4, o = e.v, console.error("Error loading models:", o), d.value = [];
                                        case 5:
                                            return e.p = 5, f.value = !1, e.f(5);
                                        case 6:
                                            return e.a(2)
                                    }
                                }, e, null, [
                                    [2, 4, 5, 6]
                                ])
                            }));
                            return function() {
                                return e.apply(this, arguments)
                            }
                        }(),
                        L = function() {
                            var e = ue(le().m(function e(n) {
                                var t, r, a, o;
                                return le().w(function(e) {
                                    for (;;) switch (e.p = e.n) {
                                        case 0:
                                            if (n) {
                                                e.n = 1;
                                                break
                                            }
                                            return v.value = [], e.a(2);
                                        case 1:
                                            return g.value = !0, e.p = 2, r = "/resources/v1/modeler/dspfl/dspfl:Model/".concat(n, "?$mask=dsmvpfl:ModelRootVersionMask"), e.n = 3, _.call3DSpace({
                                                url: r,
                                                method: "GET",
                                                headers: {
                                                    "Content-Type": "application/json"
                                                },
                                                type: "json"
                                            });
                                        case 3:
                                            a = e.v, console.log("Products (RootVersions) API Response:", a), null != a && null !== (t = a.member) && void 0 !== t && null !== (t = t[0]) && void 0 !== t && null !== (t = t.rootVersion) && void 0 !== t && t.member ? (v.value = a.member[0].rootVersion.member.map(function(e) {
                                                return {
                                                    id: e.id,
                                                    name: e.title || e.name,
                                                    description: e.description,
                                                    state: e.state,
                                                    revision: e.revision,
                                                    relativePath: e.relativePath,
                                                    raw: e
                                                }
                                            }), console.log("Parsed Products:", v.value), 1 === v.value.length && (console.log("Single product found, auto-loading configurations..."), E(v.value[0].id))) : (console.warn("No products found in response"), v.value = []), e.n = 5;
                                            break;
                                        case 4:
                                            e.p = 4, o = e.v, console.error("Error loading products:", o), v.value = [];
                                        case 5:
                                            return e.p = 5, g.value = !1, e.f(5);
                                        case 6:
                                            return e.a(2)
                                    }
                                }, e, null, [
                                    [2, 4, 5, 6]
                                ])
                            }));
                            return function(n) {
                                return e.apply(this, arguments)
                            }
                        }(),
                        E = function() {
                            var e = ue(le().m(function e(n) {
                                var t, r, a;
                                return le().w(function(e) {
                                    for (;;) switch (e.p = e.n) {
                                        case 0:
                                            if (n) {
                                                e.n = 1;
                                                break
                                            }
                                            return h.value = [], e.a(2);
                                        case 1:
                                            return y.value = !0, e.p = 2, t = "/resources/v1/modeler/dspfl/dspfl:ModelVersion/".concat(n, "/dspfl:ProductConfiguration"), e.n = 3, _.call3DSpace({
                                                url: t,
                                                method: "GET",
                                                headers: {
                                                    "Content-Type": "application/json"
                                                },
                                                type: "json"
                                            });
                                        case 3:
                                            r = e.v, console.log("Product Configurations API Response:", r), null != r && r.member ? (h.value = r.member.map(function(e) {
                                                return {
                                                    id: e.id,
                                                    name: e.title || e.name,
                                                    description: e.description,
                                                    state: e.state,
                                                    revision: e.revision,
                                                    completenessStatus: e.completenessStatus,
                                                    compliancyStatus: e.compliancyStatus,
                                                    relativePath: e.relativePath,
                                                    raw: e
                                                }
                                            }), console.log("Parsed Product Configurations:", h.value)) : (console.warn("No product configurations found in response"), h.value = []), e.n = 5;
                                            break;
                                        case 4:
                                            e.p = 4, a = e.v, console.error("Error loading product configurations:", a), h.value = [];
                                        case 5:
                                            return e.p = 5, y.value = !1, e.f(5);
                                        case 6:
                                            return e.a(2)
                                    }
                                }, e, null, [
                                    [2, 4, 5, 6]
                                ])
                            }));
                            return function(n) {
                                return e.apply(this, arguments)
                            }
                        }();
                    (0, l.wB)(p, function(e) {
                        b.value = "", m.value = "", v.value = [], h.value = [], e && L(e)
                    }), (0, l.wB)(b, function(e) {
                        m.value = "", h.value = [], e && E(e)
                    }), (0, l.wB)(function() {
                        return a.rootPhysicalId
                    }, function(e, n) {
                        e && e !== n ? (p.value = "", b.value = "", m.value = "", d.value = [], v.value = [], h.value = [], C()) : e && !n && C()
                    }, {
                        immediate: !0
                    }), (0, l.wB)(function() {
                        return a.itemType
                    }, function(e, n) {
                        e !== n && a.rootPhysicalId && (console.log("[itemType changed] ".concat(n, " → ").concat(e, ", reloading models...")), p.value = "", b.value = "", m.value = "", d.value = [], v.value = [], h.value = [], C())
                    }), (0, l.wB)(function() {
                        return a.data
                    }, function(e) {
                        e && x.value && (x.value = !1)
                    }, {
                        deep: !1
                    });
                    var S = function() {
                            w.value && m.value && (x.value = !0, window.__zenErpApplied = {
                                modelId: p.value,
                                productId: w.value,
                                configurationId: m.value,
                                configuration: h.value.find(function(e) {
                                    return e.id === m.value
                                }),
                                rootPhysicalId: a.rootPhysicalId,
                                itemType: a.itemType
                            }, document.dispatchEvent(new CustomEvent("zen-erp-config-applied", {
                                detail: window.__zenErpApplied
                            })), u("apply-configuration", {
                                modelId: p.value,
                                productId: w.value,
                                configurationId: m.value,
                                model: d.value.find(function(e) {
                                    return e.id === p.value
                                }),
                                product: v.value.find(function(e) {
                                    return e.id === w.value
                                }),
                                configuration: h.value.find(function(e) {
                                    return e.id === m.value
                                }),
                                itemType: a.itemType
                            }))
                        },
                        P = function() {
                            p.value = "", b.value = "", m.value = "", v.value = [], h.value = [], window.__zenErpApplied = null, document.dispatchEvent(new CustomEvent("zen-erp-config-applied", {
                                detail: null
                            }))
                        },
                        A = (0, c.KR)(""),
                        j = (0, c.KR)(""),
                        O = (0, c.KR)(!1),
                        V = (0, c.KR)(!1),
                        D = (0, c.KR)({}),
                        R = (0, c.KR)({}),
                        H = (0, c.KR)(null),
                        F = (0, c.KR)({
                            top: 0,
                            left: 0
                        }),
                        I = (0, c.KR)(""),
                        B = (0, l.EW)(function() {
                            return {
                                top: "".concat(F.value.top, "px"),
                                left: "".concat(F.value.left, "px")
                            }
                        }),
                        z = function(e) {
                            var n;
                            return (null === (n = D.value[e]) || void 0 === n ? void 0 : n.size) > 0
                        },
                        Q = (0, l.EW)(function() {
                            return Object.values(D.value).reduce(function(e, n) {
                                return e + ((null == n ? void 0 : n.size) || 0)
                            }, 0)
                        }),
                        W = function() {
                            var e = [],
                                n = function(t) {
                                    if (t) {
                                        var r, a = re(t);
                                        try {
                                            for (a.s(); !(r = a.n()).done;) {
                                                var o, l = r.value;
                                                null != l && l.resourceid && (e.push(l), null !== (o = l.children) && void 0 !== o && o.length && n(l.children))
                                            }
                                        } catch (e) {
                                            a.e(e)
                                        } finally {
                                            a.f()
                                        }
                                    }
                                };
                            return n(s.value), e
                        },
                        X = function(e, n) {
                            return "_qty" === n ? (null != e._contQty ? e._contQty + " " + (e._contUom || "") : e.quantity || 1) : "_subqty" === n ? e.subQuantity || 1 : "_totalqty" === n ? e.totalQuantity || 1 : "_parentProduct" === n ? e._parentProduct || "-" : "ds6w:label" === n ? e["ds6w:label"] || e["ds6w:identifier"] || "-" : "ds6w:status" === n ? rt(e["ds6w:status"]) : "ds6w:type" === n ? e.displayType || e["ds6w:type"] || "-" : e[n] || "-"
                        },
                        K = (0, l.EW)(function() {
                            if (!H.value) return [];
                            var e = function(e) {
                                var n, t = W(),
                                    r = new Map,
                                    a = re(t);
                                try {
                                    for (a.s(); !(n = a.n()).done;) {
                                        var o = n.value,
                                            l = X(o, e);
                                        null != l && "" !== l || (l = ""), r.set(l, (r.get(l) || 0) + 1)
                                    }
                                } catch (e) {
                                    a.e(e)
                                } finally {
                                    a.f()
                                }
                                return Array.from(r.keys()).sort(function(e, n) {
                                    return "" === e ? 1 : "" === n ? -1 : String(e).localeCompare(String(n))
                                })
                            }(H.value);
                            if (!I.value) return e;
                            var n = I.value.toLowerCase();
                            return e.filter(function(e) {
                                return String(e).toLowerCase().includes(n)
                            })
                        }),
                        q = function(e, n) {
                            return W().filter(function(t) {
                                var r = X(t, e);
                                return ("" === r ? "" : r) === n
                            }).length
                        },
                        N = function(e, n) {
                            H.value === e ? $() : U(e, n)
                        },
                        U = function(e, n) {
                            var t = n.target.getBoundingClientRect(),
                                r = document.querySelector(".tree-scroll-container"),
                                a = (null == r ? void 0 : r.getBoundingClientRect()) || {
                                    top: 0,
                                    left: 0
                                };
                            F.value = {
                                top: t.bottom - a.top + ((null == r ? void 0 : r.scrollTop) || 0) + 5,
                                left: Math.min(t.left - a.left, window.innerWidth - 280)
                            }, H.value = e, I.value = "", R.value[e] = new Set(D.value[e] || [])
                        },
                        $ = function() {
                            H.value = null, I.value = ""
                        },
                        Y = function(e) {
                            if ("ds6w:label" === e) return "Title";
                            var n = a.availableColumns.find(function(n) {
                                return n.key === e
                            });
                            return (null == n ? void 0 : n.label) || e.split(":").pop()
                        },
                        ae = function(e, n) {
                            var t;
                            return (null === (t = R.value[e]) || void 0 === t ? void 0 : t.has(n)) || !1
                        },
                        oe = function() {
                            if (H.value) {
                                var e = K.value;
                                R.value[H.value] = new Set(e)
                            }
                        },
                        ie = function() {
                            H.value && (R.value[H.value] = new Set)
                        },
                        ce = function() {
                            if (H.value) {
                                var e = H.value,
                                    n = R.value[e];
                                (null == n ? void 0 : n.size) > 0 ? D.value[e] = new Set(n) : delete D.value[e], $()
                            }
                        },
                        kn = function() {
                            D.value = {}, R.value = {}
                        },
                        wn = function(e) {
                            for (var n = 0, t = Object.entries(D.value); n < t.length; n++) {
                                var r = te(t[n], 2),
                                    a = r[0],
                                    o = r[1];
                                if (o && 0 !== o.size) {
                                    var l = X(e, a),
                                        i = "" === l ? "" : l;
                                    if (!o.has(i)) return !1
                                }
                            }
                            return !0
                        },
                        Cn = (0, c.KR)(0),
                        Ln = (0, c.KR)(0),
                        En = (0, c.KR)(!1),
                        Sn = (0, c.KR)(0),
                        Pn = (0, c.KR)(0),
                        _n = (0, l.EW)(function() {
                            return V.value || En.value
                        }),
                        Mn = (0, c.KR)(null),
                        Tn = (0, c.KR)(null),
                        An = (0, c.KR)(null),
                        jn = (0, c.KR)(0),
                        On = (0, c.KR)(0),
                        Vn = function(e, n) {
                            An.value = e, jn.value = n.clientX;
                            var t = a.columnWidths[e];
                            if (t) On.value = t;
                            else {
                                var r = n.target.closest(".tree-cell");
                                On.value = r ? r.offsetWidth : 100
                            }
                            document.addEventListener("mousemove", Dn), document.addEventListener("mouseup", Rn), document.body.style.cursor = "col-resize", document.body.style.userSelect = "none"
                        },
                        Dn = function(e) {
                            if (An.value) {
                                var n = e.clientX - jn.value,
                                    t = Math.max(60, On.value + n),
                                    r = ee(ee({}, a.columnWidths), {}, ne({}, An.value, t));
                                u("update:column-widths", r)
                            }
                        },
                        Rn = function() {
                            An.value = null, document.removeEventListener("mousemove", Dn), document.removeEventListener("mouseup", Rn), document.body.style.cursor = "", document.body.style.userSelect = ""
                        },
                        Hn = (0, l.EW)(function() {
                            return a.selectedColumns.filter(function(e) {
                                return "ds6w:label" !== e
                            }).map(function(e) {
                                var n = a.availableColumns.find(function(n) {
                                    return n.key === e
                                });
                                return n || {
                                    key: e,
                                    label: {
                                        _qty: "Qty",
                                        _subqty: "Sub Qty",
                                        _totalqty: "Total Qty",
                                        _parentProduct: "Parent Product",
                                        _thumbnail: "Thumbnail",
                                        _coreMaterial: "Core Material",
                                        _coveringMaterial: "Covering Material",
                                        _drawingcheck: "Drawing Check",
                                        _weight: "Weight"
                                    } [e] || e.split(":").pop()
                                }
                            })
                        }),
                        Fn = function() {
                            Mn.value = null, Tn.value = null
                        },
                        In = function(e, n) {
                            var t;
                            if (!n) return !0;
                            var r, o = n.toLowerCase(),
                                l = re(a.selectedColumns);
                            try {
                                for (l.s(); !(r = l.n()).done;) {
                                    var i = r.value;
                                    if (String("_qty" === i ? e.quantity || 1 : "_subqty" === i ? e.subQuantity || 1 : "_totalqty" === i ? e.totalQuantity || 1 : "_parentProduct" === i ? e._parentProduct || "-" : e[i] || "").toLowerCase().includes(o)) return !0
                                }
                            } catch (e) {
                                l.e(e)
                            } finally {
                                l.f()
                            }
                            return !(null === (t = e.displayType) || void 0 === t || !t.toLowerCase().includes(o))
                        },
                        Bn = function(e, n) {
                            var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
                            if (!e || !n) return !1;
                            var r, a = !1,
                                o = re(e);
                            try {
                                for (o.s(); !(r = o.n()).done;) {
                                    var l, i, c = r.value,
                                        u = In(c, n),
                                        s = !(null === (l = c.children) || void 0 === l || !l.length) && Bn(c.children, n, [].concat(J(t), [c]));
                                    (u || s) && (a = !0, s && null !== (i = c.children) && void 0 !== i && i.length && (c.expanded = !0))
                                }
                            } catch (e) {
                                o.e(e)
                            } finally {
                                o.f()
                            }
                            return a
                        },
                        zn = null,
                        Qn = function() {
                            var e;
                            zn && clearTimeout(zn);
                            var n = (null === (e = A.value) || void 0 === e ? void 0 : e.trim()) || "";
                            if (n.length < 2) return j.value = "", void(O.value = !1);
                            O.value = !0, zn = setTimeout(ue(le().m(function e() {
                                return le().w(function(e) {
                                    for (;;) switch (e.n) {
                                        case 0:
                                            return Bn(s.value, n), e.n = 1, new Promise(function(e) {
                                                return setTimeout(e, 50)
                                            });
                                        case 1:
                                            j.value = n, O.value = !1;
                                        case 2:
                                            return e.a(2)
                                    }
                                }, e)
                            })), 300)
                        },
                        Wn = function() {
                            zn && clearTimeout(zn), A.value = "", j.value = "", O.value = !1
                        },
                        Xn = (0, l.EW)(function() {
                            var e, n = [],
                                t = null === (e = j.value) || void 0 === e ? void 0 : e.trim(),
                                r = Object.keys(D.value).length > 0,
                                a = function(e) {
                                    var o = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                                    e && Array.isArray(e) && e.forEach(function(e) {
                                        var l, i;
                                        if (e && e.resourceid) {
                                            var c, u = In(e, t),
                                                s = null === (l = e.children) || void 0 === l ? void 0 : l.some(function(e) {
                                                    return In(e, t) || qn(e, t)
                                                }),
                                                d = !r || wn(e),
                                                p = !r || (null === (i = e.children) || void 0 === i ? void 0 : i.some(function(e) {
                                                    return wn(e) || Kn(e)
                                                }));
                                            t && !u && !s && !o || r && !d && !p || (n.push(e), e.expanded && null !== (c = e.children) && void 0 !== c && c.length && a(e.children, u || o, d))
                                        }
                                    })
                                };
                            return a(s.value), n
                        }),
                        Kn = function(e) {
                            var n;
                            if (null === (n = e.children) || void 0 === n || !n.length) return !1;
                            var t, r = re(e.children);
                            try {
                                for (r.s(); !(t = r.n()).done;) {
                                    var a = t.value;
                                    if (wn(a)) return !0;
                                    if (Kn(a)) return !0
                                }
                            } catch (e) {
                                r.e(e)
                            } finally {
                                r.f()
                            }
                            return !1
                        },
                        qn = function(e, n) {
                            var t;
                            if (null === (t = e.children) || void 0 === t || !t.length || !n) return !1;
                            var r, a = re(e.children);
                            try {
                                for (a.s(); !(r = a.n()).done;) {
                                    var o = r.value;
                                    if (In(o, n)) return !0;
                                    if (qn(o, n)) return !0
                                }
                            } catch (e) {
                                a.e(e)
                            } finally {
                                a.f()
                            }
                            return !1
                        },
                        Nn = function(e) {
                            var n = function(t) {
                                if (!t) return !1;
                                var r, a = re(t);
                                try {
                                    for (a.s(); !(r = a.n()).done;) {
                                        var o, l = r.value;
                                        if (l._uid === e._uid) return l.expanded = !l.expanded, !0;
                                        if (null !== (o = l.children) && void 0 !== o && o.length && n(l.children)) return !0
                                    }
                                } catch (e) {
                                    a.e(e)
                                } finally {
                                    a.f()
                                }
                                return !1
                            };
                            n(s.value), __loadDrawingCheck && __loadDrawingCheck(), __loadWeight && __loadWeight()
                        },
                        Gn = function() {
                            var e = ue(le().m(function e() {
                                var n, t, r, a, o, l, i;
                                return le().w(function(e) {
                                    for (;;) switch (e.n) {
                                        case 0:
                                            if (!V.value) {
                                                e.n = 1;
                                                break
                                            }
                                            return e.a(2);
                                        case 1:
                                            V.value = !0, Cn.value = 0, n = [], (t = function(e) {
                                                if (e) {
                                                    var r, a = re(e);
                                                    try {
                                                        for (a.s(); !(r = a.n()).done;) {
                                                            var o, l, i = r.value;
                                                            null !== (o = i.children) && void 0 !== o && o.length && !i.expanded && n.push(i), null !== (l = i.children) && void 0 !== l && l.length && t(i.children)
                                                        }
                                                    } catch (e) {
                                                        a.e(e)
                                                    } finally {
                                                        a.f()
                                                    }
                                                }
                                            })(s.value), Ln.value = n.length, r = 100, a = 0;
                                        case 2:
                                            if (!(a < n.length)) {
                                                e.n = 4;
                                                break
                                            }
                                            o = n.slice(a, a + r), l = re(o);
                                            try {
                                                for (l.s(); !(i = l.n()).done;) i.value.expanded = !0
                                            } catch (e) {
                                                l.e(e)
                                            } finally {
                                                l.f()
                                            }
                                            if (Cn.value = Math.min(a + r, n.length), !(a + r < n.length)) {
                                                e.n = 3;
                                                break
                                            }
                                            return e.n = 3, new Promise(function(e) {
                                                return setTimeout(e, 0)
                                            });
                                        case 3:
                                            a += r, e.n = 2;
                                            break;
                                        case 4:
                                            return Cn.value = Ln.value, e.n = 5, new Promise(function(e) {
                                                return setTimeout(e, 200)
                                            });
                                        case 5:
                                            V.value = !1, Cn.value = 0, Ln.value = 0, __loadDrawingCheck && __loadDrawingCheck(), __loadWeight && __loadWeight();
                                        case 6:
                                            return e.a(2)
                                    }
                                }, e)
                            }));
                            return function() {
                                return e.apply(this, arguments)
                            }
                        }(),
                        Un = function() {
                            var e = function(n) {
                                if (n) {
                                    var t, r = re(n);
                                    try {
                                        for (r.s(); !(t = r.n()).done;) {
                                            var a, o = t.value;
                                            o.expanded = !1, null !== (a = o.children) && void 0 !== a && a.length && e(o.children)
                                        }
                                    } catch (e) {
                                        r.e(e)
                                    } finally {
                                        r.f()
                                    }
                                }
                            };
                            e(s.value)
                        },
                        Zn = function() {
                            var e = ue(le().m(function e() {
                                var n, t, r, a;
                                return le().w(function(e) {
                                    for (;;) switch (e.n) {
                                        case 0:
                                            if (!En.value) {
                                                e.n = 1;
                                                break
                                            }
                                            return e.a(2);
                                        case 1:
                                            if (En.value = !0, Sn.value = 0, n = [], (t = function(e) {
                                                    if (e) {
                                                        var r, a = re(e);
                                                        try {
                                                            for (a.s(); !(r = a.n()).done;) {
                                                                var o, l = r.value;
                                                                null !== (o = l.children) && void 0 !== o && o.length && (l.expanded ? t(l.children) : n.push(l))
                                                            }
                                                        } catch (e) {
                                                            a.e(e)
                                                        } finally {
                                                            a.f()
                                                        }
                                                    }
                                                })(s.value), Pn.value = n.length, 0 !== n.length) {
                                                e.n = 2;
                                                break
                                            }
                                            return En.value = !1, e.a(2);
                                        case 2:
                                            r = 50, a = 0;
                                        case 3:
                                            if (!(a < n.length)) {
                                                e.n = 5;
                                                break
                                            }
                                            if (n.slice(a, a + r).forEach(function(e) {
                                                    e.expanded = !0
                                                }), Sn.value = Math.min(a + r, n.length), !(a + r < n.length)) {
                                                e.n = 4;
                                                break
                                            }
                                            return e.n = 4, new Promise(function(e) {
                                                return setTimeout(e, 0)
                                            });
                                        case 4:
                                            a += r, e.n = 3;
                                            break;
                                        case 5:
                                            return Sn.value = Pn.value, e.n = 6, new Promise(function(e) {
                                                return setTimeout(e, 200)
                                            });
                                        case 6:
                                            En.value = !1, Sn.value = 0, Pn.value = 0;
                                        case 7:
                                            return e.a(2)
                                    }
                                }, e)
                            }));
                            return function() {
                                return e.apply(this, arguments)
                            }
                        }(),
                        $n = function() {
                            var e = -1,
                                n = function(t) {
                                    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                                    if (t) {
                                        var a, o = re(t);
                                        try {
                                            for (o.s(); !(a = o.n()).done;) {
                                                var l, i = a.value;
                                                i.expanded && null !== (l = i.children) && void 0 !== l && l.length && (i.children.some(function(e) {
                                                    var n;
                                                    return e.expanded && (null === (n = e.children) || void 0 === n ? void 0 : n.length)
                                                }) ? n(i.children, r + 1) : e = Math.max(e, r))
                                            }
                                        } catch (e) {
                                            o.e(e)
                                        } finally {
                                            o.f()
                                        }
                                    }
                                };
                            if (n(s.value), !(e < 0)) {
                                var t = function(n) {
                                    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                                    if (n) {
                                        var a, o = re(n);
                                        try {
                                            for (o.s(); !(a = o.n()).done;) {
                                                var l, i = a.value;
                                                i.expanded && null !== (l = i.children) && void 0 !== l && l.length && (r === e ? i.expanded = !1 : t(i.children, r + 1))
                                            }
                                        } catch (e) {
                                            o.e(e)
                                        } finally {
                                            o.f()
                                        }
                                    }
                                };
                                t(s.value)
                            }
                        },
                        Jn = function(e) {
                            var n = t.p;
                            return "".concat(n, "static/images/").concat(e)
                        },
                        Yn = function(e) {
                            if (e.icon) return e.icon;
                            switch (e["ds6w:type"] || e.displayType) {
                                case "CreateAssembly":
                                case "Assembly":
                                    return Jn("CreateAssembly.png");
                                case "ElementaryEndItem":
                                case "Manufactured Part":
                                    return Jn("ElementaryEndItem.png");
                                case "Provide":
                                    return Jn("Provide.png");
                                case "CreateMaterial":
                                case "Material":
                                    return Jn("CreateMaterial.png");
                                case "ProcessContinuousProvide":
                                case "Continuous Provide":
                                case "ProcessInstanceContinuous":
                                case "Continuous":
                                    return Jn("Continuous.png");
                                case "ElectricalGeometry":
                                case "Electrical Geometry":
                                case "ElectricalBranchGeometry":
                                case "Electrical Branch":
                                    return Jn("ElectricalGeometry.png");
                                case "VPMReference":
                                case "Product":
                                default:
                                    return Jn("VPMReference.png");
                                case "Part":
                                    return Jn("Part.png")
                            }
                        },
                        et = function(e) {
                            switch (e) {
                                case "Part":
                                case "Manufactured Part":
                                    return "#4caf50";
                                case "Product":
                                default:
                                    return "#1976d2";
                                case "Assembly":
                                    return "#9c27b0";
                                case "Provide":
                                    return "#ff9800";
                                case "Kit":
                                    return "#00bcd4";
                                case "Material":
                                    return "#795548";
                                case "Continuous Provide":
                                    return "#e91e63"
                            }
                        },
                        nt = function(e) {
                            var n;
                            if (!e) return "grey";
                            switch ((null == e || null === (n = e.split(".")) || void 0 === n ? void 0 : n.pop()) || e) {
                                case "IN_WORK":
                                    return "warning";
                                case "RELEASED":
                                    return "success";
                                case "FROZEN":
                                    return "info";
                                default:
                                    return "grey"
                            }
                        },
                        tt = function(e, n) {
                            var t = e[n];
                            return t && "-" !== t && "" !== t.trim() ? t : e["ds6wg:revision"] || "-"
                        },
                        rt = function(e) {
                            var n;
                            if (!e) return "-";
                            var t = (null == e || null === (n = e.split(".")) || void 0 === n ? void 0 : n.pop()) || e;
                            switch (t) {
                                case "IN_WORK":
                                    return "In Work";
                                case "RELEASED":
                                    return "Released";
                                case "FROZEN":
                                    return "Frozen";
                                default:
                                    return t || "-"
                            }
                        },
                        at = function(e) {
                            if (null == e) return !1;
                            var n = String(e).toLowerCase().trim();
                            return "true" === n || "false" === n
                        },
                        ot = function(e) {
                            return "true" === String(e).toLowerCase().trim() ? "success" : "error"
                        },
                        lt = function(e) {
                            return "true" === String(e).toLowerCase().trim() ? "True" : "False"
                        },
                        it = function(e, n) {
                            if (null == e) return "-";
                            if ("ds6w:created" === n || "ds6w:modified" === n) try {
                                return new Date(e).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })
                            } catch (n) {
                                return e
                            }
                            return e
                        },
                        ct = function(e) {
                            if (!e) return "-";
                            if (e.length <= 10) return e;
                            var n = e.split(" ");
                            if (n.length <= 1) return e;
                            for (var t = "", r = "", a = 0; a < n.length; a++) {
                                var o = t ? "".concat(t, " ").concat(n[a]) : n[a];
                                if (!(o.length <= 10) && t) {
                                    r = n.slice(a).join(" ");
                                    break
                                }
                                t = o
                            }
                            return r ? "".concat(t, "<br>").concat(r) : t
                        };
                    (0, l.wB)(function() {
                        return a.data
                    }, function(e) {
                        null != e && e.results && (s.value = function(e) {
                            if (null == e || !e.results) return [];
                            var n, t, r = e.results,
                                o = e.itemType || a.itemType || "VPMReference",
                                l = {};
                            "CreateAssembly" === o ? (n = ["CreateAssembly", "ElementaryEndItem", "Provide", "CreateKit", "CreateMaterial", "ProcessContinuousProvide", "dsmfg:MfgItem"], t = ["DELFmiFunctionIdentifiedInstance", "ProcessInstanceContinuous", "dsmfg:ProcessInstanceContinuous"]) : (n = ["VPMReference", "3DShape", "ElectricalGeometry", "ElectricalBranchGeometry"], t = ["VPMInstance", "VPMRepInstance"]), r.forEach(function(e) {
                                var t = e["ds6w:type"];
                                e && e.resourceid && t && n.includes(t) && (l[e.resourceid] = ee(ee({}, e), {}, {
                                    children: [],
                                    expanded: !1,
                                    level: 0,
                                    quantity: 1
                                }))
                            });
                            var i = {};
                            r.forEach(function(e) {
                                var n = e["ds6w:type"];
                                e && e.resourceid && n && t.includes(n) && e.from && e.to && (i[e.resourceid] = {
                                    from: e.from,
                                    to: e.to
                                })
                            });
                            var c = r.filter(function(e) {
                                    return e.Path
                                }),
                                u = new Map,
                                s = new Map;
                            c.forEach(function(e) {
                                for (var n = e.Path, t = 0; t < n.length - 2; t += 2) {
                                    var r = n[t],
                                        a = n[t + 1],
                                        o = n[t + 2],
                                        i = l[r],
                                        c = l[o];
                                    if (i && c) {
                                        var d = c["ds6w:type"];
                                        u.has(r) || u.set(r, new Map);
                                        var p = u.get(r);
                                        p.has(o) || p.set(o, new Set), p.get(o).add(a), s.has(r) || s.set(r, new Set), d && s.get(r).add(d)
                                    }
                                }
                            }), Object.values(l).forEach(function(e) {
                                var n = e["ds6w:type"];
                                if ("CreateAssembly" === o) switch (n) {
                                        case "CreateAssembly":
                                            e.displayType = "Assembly";
                                            break;
                                        case "ElementaryEndItem":
                                            e.displayType = "Manufactured Part";
                                            break;
                                        case "Provide":
                                            e.displayType = "Provide";
                                            break;
                                        case "CreateKit":
                                            e.displayType = "Kit";
                                            break;
                                        case "CreateMaterial":
                                            e.displayType = "Material";
                                            break;
                                        case "ProcessContinuousProvide":
                                            e.displayType = "Continuous Provide";
                                            break;
                                        default:
                                            e.displayType = n || "MfgItem"
                                    } else if ("ElectricalGeometry" === n) e.displayType = "Electrical Geometry";
                                    else if ("ElectricalBranchGeometry" === n) e.displayType = "Electrical Branch";
                                else if ("VPMReference" === n) {
                                    var t = s.get(e.resourceid);
                                    t && t.has("VPMReference") ? e.displayType = "Product" : t && t.has("3DShape") || (e.icon || "").includes("3DPart") ? e.displayType = "Part" : e.displayType = "Product"
                                }
                            });
                            var d = {},
                                p = "CreateAssembly" === o ? ["CreateAssembly", "ElementaryEndItem", "Provide", "CreateKit", "CreateMaterial", "ProcessContinuousProvide", "dsmfg:MfgItem"] : ["VPMReference", "ElectricalGeometry", "ElectricalBranchGeometry"];
                            Object.entries(l).forEach(function(e) {
                                var n = te(e, 2),
                                    t = n[0],
                                    r = n[1];
                                r && p.includes(r["ds6w:type"]) && (d[t] = r)
                            });
                            var f = new Map;
                            u.forEach(function(e, n) {
                                if (d[n]) {
                                    var t = new Map;
                                    e.forEach(function(e, n) {
                                        d[n] && t.set(n, e.size)
                                    }), t.size > 0 && f.set(n, t)
                                }
                            });
                            var v = new Set;
                            c.forEach(function(e) {
                                for (var n = e.Path, t = 2; t < n.length; t += 2) {
                                    var r = n[t];
                                    d[r] && v.add(r)
                                }
                            }), console.log("[TreeBuild] parentChildInstances size:", u.size), console.log("[TreeBuild] parentChildCounts size:", f.size), console.log("[TreeBuild] childSet size:", v.size), console.log("[TreeBuild] nodeMap size:", Object.keys(d).length), console.log("[TreeBuild] paths count:", c.length);
                            var b = Object.values(d).filter(function(e) {
                                return !v.has(e.resourceid)
                            });
                            console.log("[TreeBuild] roots count:", b.length);
                            var g = 0,
                                h = function(e, n, t, r) {
                                    var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "",
                                        o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : new Set,
                                        l = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 1,
                                        i = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : null;
                                    if (e.level = n, e._uid = "".concat(a, "_").concat(e.resourceid, "_").concat(g++), e.subQuantity = (e.quantity || 1) * l, e._parentProduct = i && (i["ds6wg:EnterpriseExtension.V_PartNumber"] || i["ds6w:identifier"]) || "-", o.has(e.resourceid)) e.children = [];
                                    else if (o.add(e.resourceid), t.has(e.resourceid)) {
                                        var c = t.get(e.resourceid);
                                        e.children = Array.from(c.entries()).map(function(a) {
                                            var l = te(a, 2),
                                                i = l[0],
                                                c = l[1],
                                                u = r[i];
                                            if (u) {
                                                var s = ee(ee({}, u), {}, {
                                                    quantity: c,
                                                    children: [],
                                                    expanded: !1,
                                                    level: n + 1
                                                });
                                                return h(s, n + 1, t, r, e._uid, new Set(o), e.subQuantity, e), s
                                            }
                                            return null
                                        }).filter(Boolean)
                                    }
                                };
                            b.forEach(function(e, n) {
                                e.quantity = 1, e._uid = "root_".concat(e.resourceid, "_").concat(n), e._parentProduct = "-", h(e, 0, f, d, "root_".concat(n), new Set, 1, null)
                            });
                            var m = new Map,
                                y = function(e) {
                                    var n, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
                                        r = re(e);
                                    try {
                                        for (r.s(); !(n = r.n()).done;) {
                                            var a, o = n.value;
                                            if (o) {
                                                t.push(o);
                                                var l = o.resourceid,
                                                    i = m.get(l) || 0;
                                                m.set(l, i + (o.subQuantity || 1)), null !== (a = o.children) && void 0 !== a && a.length && y(o.children, t)
                                            }
                                        }
                                    } catch (e) {
                                        r.e(e)
                                    } finally {
                                        r.f()
                                    }
                                    return t
                                };
                            return y(b).forEach(function(e) {
                                e.totalQuantity = m.get(e.resourceid) || e.subQuantity || 1
                            }), b.filter(Boolean)
                        }(e), s.value.length > 0 && (s.value[0].expanded = !0), window.__zenContApply && window.__zenContApply(e, s)), x.value = !1
                    }, {
                        immediate: !0
                    });
                    var Th = (0, c.KR)({}),
                        __thumbBusy = !1,
                        __scopeCache = {},
                        __engThumbs = {},
                        __scopeLogged = !1,
                        __collectThumbPids = function() {
                            var e = [],
                                n = {},
                                t = function(r) {
                                    Array.isArray(r) && r.forEach(function(a) {
                                        a && (a.resourceid && !n[a.resourceid] && (n[a.resourceid] = 1, e.push(a.resourceid)), a.children && a.children.length && t(a.children))
                                    })
                                };
                            return t(s.value), e
                        },
                        __thumbPool = function(e, n, t) {
                            var r = 0,
                                o = function() {
                                    if (r >= e.length) return Promise.resolve();
                                    var l2 = e[r++];
                                    return t(l2).then(o)
                                },
                                i2 = [];
                            for (var c2 = 0; c2 < Math.min(n, e.length); c2++) i2.push(o());
                            return Promise.all(i2)
                        },
                        __fetchThumbBatch = function(e) {
                            var n = {};
                            if (!e.length) return Promise.resolve(n);
                            for (var t = [], r = 0; r < e.length; r += 50) t.push(e.slice(r, r + 50));
                            return __thumbPool(t, 2, function(t2) {
                                return __bomThumbCall(t2).then(function(r2) {
                                    (r2 && r2.results || []).forEach(function(e3) {
                                        var n3 = "",
                                            t3 = "";
                                        (e3 && e3.attributes || []).forEach(function(e4) {
                                            e4 && ("physicalid" !== e4.name || n3 ? "preview_url" !== e4.name || t3 || (t3 = e4.value || "") : n3 = e4.value || "")
                                        }), n3 && t3 && /^https?:\/\//.test(t3) && (n[n3] = t3)
                                    })
                                }).catch(function(e3) {
                                    console.warn("[Thumbnails] batch failed:", e3)
                                }).then(function() {
                                    t2.forEach(function(e3) {
                                        e3 in n || (n[e3] = "")
                                    })
                                })
                            }).then(function() {
                                return n
                            })
                        },
                        __resolveScopes = function(e) {
                            var n = e.filter(function(n2) {
                                return !(n2 in __scopeCache)
                            });
                            return __thumbPool(n, 4, function(n2) {
                                return _.call3DSpace({
                                    url: "/resources/v1/modeler/dsmfg/dsmfg:MfgItem/" + n2 + "/dsmfg:ScopeEngItem?xrequestedwith=xmlhttprequest",
                                    method: "GET",
                                    headers: {
                                        Accept: "application/json"
                                    },
                                    type: "json"
                                }).then(function(t2) {
                                    __scopeLogged || (__scopeLogged = !0, console.log("[Thumbnails] scope sample:", JSON.stringify(t2 || {}).slice(0, 600)));
                                    var r2 = t2 && t2.member || [],
                                        a2 = "";
                                    for (var o2 = 0; o2 < r2.length && !a2; o2++) {
                                        var l2 = r2[o2];
                                        if (l2) {
                                                                        var i2 = l2.ScopeEngItem || l2.PartialScopeEngItem || l2.engItem || l2.EngItem || l2.engineeringItem || {},
                                                c2 = [i2.identifier, i2.id, l2.engItemId, l2.identifier, l2.target, l2.targetId];
                                            i2.relativePath && c2.push(String(i2.relativePath).split("/").pop()), l2.relativePath && c2.push(String(l2.relativePath).split("/").pop());
                                            for (var u2 = 0; u2 < c2.length; u2++) {
                                                var s2 = c2[u2];
                                                if (s2 && /^[0-9A-Fa-f]{16,64}$/.test(String(s2)) && String(s2) !== n2) {
                                                    a2 = String(s2);
                                                    break
                                                }
                                            }
                                        }
                                    }
                                    __scopeCache[n2] = a2
                                }).catch(function(t2) {
                                    console.warn("[Thumbnails] scope lookup failed:", n2, t2), __scopeCache[n2] = ""
                                })
                            }).then(function() {
                                var t2 = {};
                                return e.forEach(function(e2) {
                                    t2[e2] = __scopeCache[e2] || ""
                                }), t2
                            })
                        },
                        __loadThumbs = function() {
                            if (a.selectedColumns && -1 !== a.selectedColumns.indexOf("_thumbnail") && !__thumbBusy) {
                                var e = __collectThumbPids().filter(function(n2) {
                                    return !(n2 in Th.value)
                                });
                                if (e.length) {
                                    __thumbBusy = !0;
                                    var n = function() {
                                        __thumbBusy = !1, __loadThumbs()
                                    };
                                    "CreateAssembly" === a.itemType ? __resolveScopes(e).then(function(t2) {
                                        var r2 = [];
                                        return e.forEach(function(e2) {
                                            var n2 = t2[e2];
                                            n2 && !(n2 in __engThumbs) && r2.indexOf(n2) < 0 && r2.push(n2)
                                        }), __fetchThumbBatch(r2).then(function(n2) {
                                            Object.assign(__engThumbs, n2);
                                            var r3 = {};
                                            e.forEach(function(e3) {
                                                r3[e3] = __engThumbs[t2[e3]] || ""
                                            }), Th.value = Object.assign({}, Th.value, r3)
                                        })
                                    }).then(n, n) : __fetchThumbBatch(e).then(function(t2) {
                                        Th.value = Object.assign({}, Th.value, t2)
                                    }).then(n, n)
                                }
                            }
                        },
                        Dc = (0, c.KR)({}),
                        __dcBusy = !1,
                        __dcDrw = {},
                        __dcErrWhy = {},
                        __dcEngOf = {},
                        __dcNotEng = {},
                        __dcPnOf = {},
                        __dcPnDrw = {},
                        __dcDrwByPn = function(pns) {
                            /* Drawing objects are named "<part number>-<title>", so one
                             * OR-batched Federated Search covers a whole page of rows. */
                            var need = pns.filter(function(p2) {
                                return p2 && !(p2 in __dcPnDrw)
                            });
                            if (!need.length) return Promise.resolve();
                            var jobs = [];
                            for (var i2 = 0; i2 < need.length; i2 += 20) jobs.push(need.slice(i2, i2 + 20));
                            return __thumbPool(jobs, 2, function(chunk) {
                                return _.call3DSearch('flattenedtaxonomies:"types/Drawing" AND (' + chunk.map(function(p2) {
                                    return '"' + String(p2).replace(/"/g, "") + '"'
                                }).join(" OR ") + ")", {
                                    label: "zen-drawcheck-drw",
                                    nresults: 200
                                }).then(function(d2) {
                                    var labels = [];
                                    (d2 && d2.results || []).forEach(function(res) {
                                        (res.attributes || []).forEach(function(a3) {
                                            "ds6w:label" === a3.name && a3.value && labels.push(String(a3.value).toUpperCase().replace(/\s+/g, ""))
                                        })
                                    });
                                    chunk.forEach(function(p2) {
                                        var P2 = String(p2).toUpperCase().replace(/\s+/g, "");
                                        __dcPnDrw[p2] = labels.some(function(L2) {
                                            /* exact, or "<pn>" followed by a separator -
                                             * so 1007149 does not match 10071499 */
                                            return L2 === P2 || 0 === L2.indexOf(P2) && !/[0-9A-Z]/.test(L2.charAt(P2.length))
                                        })
                                    })
                                }, function(e2) {
                                    console.warn("[DrawingCheck] drawing search failed:", e2);
                                    chunk.forEach(function(p2) {
                                        __dcPnDrw[p2] = "err", __dcErrWhy[p2] = String(e2 && e2.message || e2)
                                    })
                                })
                            })
                        },
                        __dcCs = {},
                        __dcMb = {},
                        __dcEngAttrs = function(engIds) {
                            var need = engIds.filter(function(e2) {
                                return !(e2 in __dcMb)
                            });
                            if (!need.length) return Promise.resolve();
                            var jobs = [];
                            for (var i2 = 0; i2 < need.length; i2 += 50) jobs.push(need.slice(i2, i2 + 50));
                            return __thumbPool(jobs, 3, function(chunk) {
                                return _.call3DSpace({
                                    url: "/resources/v1/modeler/dseng/dseng:EngItem/bulkfetch?xrequestedwith=xmlhttprequest&$mask=dsmveng:EngItemMask.Details",
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    data: chunk,
                                    type: "json"
                                }).then(function(d2) {
                                    (d2 && d2.member || []).forEach(function(m2) {
                                        var ea = m2["dseno:EnterpriseAttributes"] || {};
                                        __dcMb[m2.id] = String(ea.make_buy || "");
                                        if (ea.Car_System) __dcCs[m2.id] = String(ea.Car_System)
                                    });
                                    /* ids the engineering modeler does not own - e.g.
                                     * ElectricalGeometry harness nodes. They have no
                                     * drw- representation; their drawing is a separate
                                     * Drawing object named after the part number. */
                                    (d2 && d2.nonmembers || []).forEach(function(e3) {
                                        __dcNotEng[e3] = !0
                                    })
                                }).catch(function(e2) {
                                    console.warn("[DrawingCheck] attr batch failed:", e2)
                                }).then(function() {
                                    chunk.forEach(function(e3) {
                                        e3 in __dcMb || (__dcMb[e3] = "")
                                    })
                                })
                            })
                        },
                        __dcHasDrawings = function(engIds) {
                            var need = engIds.filter(function(e2) {
                                return e2 && !(e2 in __dcDrw)
                            });
                            if (!need.length) return Promise.resolve();
                            return __thumbPool(need, 6, function(eng) {
                                return _.call3DSpace({
                                    url: "/resources/v1/modeler/dseng/dseng:EngItem/" + eng + "/dseng:EngRepInstance?xrequestedwith=xmlhttprequest",
                                    method: "GET",
                                    headers: {
                                        Accept: "application/json"
                                    },
                                    type: "json"
                                }).then(function(d2) {
                                    var has = (d2 && d2.member || []).some(function(m2) {
                                        return /^drw-/i.test(String(m2.name || ""))
                                    });
                                    __dcDrw[eng] = has
                                }).catch(function(e2) {
                                    console.warn("[DrawingCheck] rep lookup failed:", eng, e2);
                                    __dcDrw[eng] = null
                                })
                            })
                        },
                        __dcPending = {},
                        __dcFlushT = null,
                        __dcVisible = function() {
                            /* Only rows currently shown: a node plus its descendants
                             * whose ancestors are all expanded (option a). Expanding
                             * more rows re-triggers this via Nn / expand-all. */
                            var out = [],
                                walk = function(list) {
                                    (list || []).forEach(function(nd) {
                                        if (!nd || !nd.resourceid) return;
                                        out.push(nd.resourceid);
                                        __dcPnOf[nd.resourceid] = String(nd["ds6wg:EnterpriseExtension.V_PartNumber"] || "").trim();
                                        if (nd.expanded && nd.children && nd.children.length) walk(nd.children)
                                    })
                                };
                            walk(s.value);
                            return out
                        },
                        __dcStatus = function(eng) {
                            if (!eng) return "na";
                            if ("phantom" === String(__dcMb[eng] || "").toLowerCase()) return "na";
                            var cs = String(__dcCs[eng] || "");
                            if ("100_STANDARD_PARTS" === cs || "000_PRODUCTION_TOOLS" === cs) return "na";
                            var hd = __dcDrw[eng];
                            return "err" === hd ? "err" : null == hd ? "na" : hd ? "yes" : "no"
                        },
                        __dcSet = function(pid, st) {
                            /* incremental: buffer and flush ~5x/sec so cells fill in
                             * progressively instead of all-at-once (no freeze). */
                            if (pid in __dcPending || pid in Dc.value) return;
                            __dcPending[pid] = st;
                            __dcDone++;
                            if (!__dcFlushT) __dcFlushT = setTimeout(function() {
                                Dc.value = Object.assign({}, Dc.value, __dcPending);
                                __dcPending = {}, __dcFlushT = null;
                                DcProg.value = {
                                    d: __dcDone,
                                    t: __dcTotal
                                }
                            }, 200)
                        },
                        __dcMirrorNodes = function() {
                            /* one pass at the end so Excel / print exports carry it */
                            var g = {
                                    yes: "Yes",
                                    no: "No",
                                    na: "-",
                                    err: "?"
                                },
                                walk = function(list) {
                                    (list || []).forEach(function(nd) {
                                        if (nd && nd.resourceid && nd.resourceid in Dc.value) nd._drawingcheck = g[Dc.value[nd.resourceid]] || "";
                                        nd && nd.children && nd.children.length && walk(nd.children)
                                    })
                                };
                            walk(s.value)
                        },
                        __dcDrawOne = function(eng, retry) {
                            /* one EngRepInstance call with a 20 s timeout so a single
                             * stuck request can never block the column. A failed or
                             * timed-out lookup is recorded as "err", NOT as null:
                             * null used to render as the grey "-" of the business rule
                             * (standard part / tooling / phantom), which hid real
                             * errors behind a legitimate-looking value. */
                            if (eng in __dcDrw) return Promise.resolve();
                            var fail = function(why) {
                                    if (retry) return __dcDrw[eng] = "err", void(__dcErrWhy[eng] = why);
                                    return new Promise(function(res) {
                                        setTimeout(res, 1500)
                                    }).then(function() {
                                        return __dcDrawOne(eng, !0)
                                    })
                                },
                                call = _.call3DSpace({
                                    url: "/resources/v1/modeler/dseng/dseng:EngItem/" + eng + "/dseng:EngRepInstance?xrequestedwith=xmlhttprequest",
                                    method: "GET",
                                    headers: {
                                        Accept: "application/json"
                                    },
                                    type: "json"
                                }),
                                timeout = new Promise(function(res) {
                                    setTimeout(function() {
                                        res("__t__")
                                    }, 20000)
                                });
                            return Promise.race([call, timeout]).then(function(d2) {
                                if ("__t__" === d2) return fail("timeout after 20 s");
                                __dcDrw[eng] = (d2 && d2.member || []).some(function(m2) {
                                    return /^drw-/i.test(String(m2.name || ""))
                                })
                            }, function(e2) {
                                return fail(function(e3) {
                                    if (!e3) return "unknown error";
                                    var st = e3.status || e3.statusCode || e3.errorCode || (e3.response && e3.response.status);
                                    return (st ? "HTTP " + st + " " : "") + String(e3.message || e3.statusText || e3)
                                }(e2))
                            })
                        },
                        __loadDrawingCheck = function() {
                            if (!a.selectedColumns || -1 === a.selectedColumns.indexOf("_drawingcheck") || __dcBusy) return;
                            var pids = __dcVisible().filter(function(p2) {
                                return !(p2 in Dc.value)
                            });
                            if (!pids.length) return;
                            __dcBusy = !0, __dcDone = 0, __dcTotal = pids.length, DcProg.value = {
                                d: 0,
                                t: __dcTotal
                            };
                            var done = function() {
                                /* flush whatever the 200 ms timer has not written yet,
                                 * so the last rows and the mirrored node values are set
                                 * before the loading indicator disappears */
                                __dcFlushT && (clearTimeout(__dcFlushT), __dcFlushT = null);
                                Dc.value = Object.assign({}, Dc.value, __dcPending), __dcPending = {};
                                __dcMirrorNodes(), __dcBusy = !1, DcProg.value = {
                                    d: 0,
                                    t: 0
                                };
                                /* one compact summary so a failing column can be
                                 * diagnosed from a console screenshot */
                                var tally = {
                                    yes: 0,
                                    no: 0,
                                    na: 0,
                                    err: 0
                                };
                                pids.forEach(function(p2) {
                                    var v2 = Dc.value[p2];
                                    v2 in tally && tally[v2]++
                                });
                                console.log("[DrawingCheck] " + pids.length + " rows in " + ((Date.now() - t0) / 1000).toFixed(1) + " s -> drawing " + tally.yes + ", no drawing " + tally.no + ", not applicable " + tally.na + ", failed " + tally.err);
                                if (tally.err) {
                                    var seen = {};
                                    Object.keys(__dcErrWhy).forEach(function(k2) {
                                        seen[__dcErrWhy[k2]] = (seen[__dcErrWhy[k2]] || 0) + 1
                                    });
                                    console.warn("[DrawingCheck] failure reasons:", seen)
                                }
                            };
                            /* MBOM node ids are mfg items -> resolve to their scope EngItem;
                             * EBOM node ids are EngItems already. */
                            var t0 = Date.now();
                            var mapEng = "CreateAssembly" === a.itemType ? __resolveScopes(pids) : Promise.resolve((function() {
                                var m2 = {};
                                pids.forEach(function(p2) {
                                    m2[p2] = p2
                                });
                                return m2
                            })());
                            mapEng.then(function(engOf) {
                                var engIds = [];
                                pids.forEach(function(p2) {
                                    var e2 = engOf[p2];
                                    if (e2 && engIds.indexOf(e2) < 0) engIds.push(e2)
                                });
                                return __dcEngAttrs(engIds).then(function() {
                                    /* parts already 'na' (phantom / standard / tooling / no eng)
                                     * need no drawing call — fill them right away. */
                                    var needEng = [],
                                        needPn = [];
                                    pids.forEach(function(p2) {
                                        var eng = engOf[p2];
                                        if (!eng) return __dcSet(p2, "na");
                                        if (__dcNotEng[eng]) {
                                            /* electrical geometry & friends: check by part
                                             * number; nothing to check without one */
                                            var pn = __dcPnOf[p2] || "";
                                            if (!pn) return __dcSet(p2, "na");
                                            return void(needPn.indexOf(pn) < 0 && needPn.push(pn))
                                        }
                                        var mb = String(__dcMb[eng] || "").toLowerCase(),
                                            cs = String(__dcCs[eng] || "");
                                        if ("phantom" === mb || "100_STANDARD_PARTS" === cs || "000_PRODUCTION_TOOLS" === cs) return __dcSet(p2, "na");
                                        if (needEng.indexOf(eng) < 0) needEng.push(eng)
                                    });
                                    var byPn = __dcDrwByPn(needPn).then(function() {
                                        pids.forEach(function(p2) {
                                            if (p2 in Dc.value) return;
                                            var eng = engOf[p2];
                                            if (!eng || !__dcNotEng[eng]) return;
                                            var v2 = __dcPnDrw[__dcPnOf[p2]];
                                            "err" === v2 && (__dcErrWhy[eng] = __dcErrWhy[__dcPnOf[p2]]), __dcSet(p2, "err" === v2 ? "err" : v2 ? "yes" : "no")
                                        })
                                    });
                                    /* the rest: per-eng drawing lookup, applied incrementally */
                                    pids.forEach(function(p2) {
                                        __dcEngOf[p2] = engOf[p2] || ""
                                    });
                                    return Promise.all([byPn, __thumbPool(needEng, 6, function(eng) {
                                        return __dcDrawOne(eng).then(function() {
                                            pids.forEach(function(p2) {
                                                if (engOf[p2] === eng && !(p2 in Dc.value)) __dcSet(p2, __dcStatus(eng))
                                            })
                                        })
                                    })])
                                })
                            }).then(done, function(e2) {
                                console.warn("[DrawingCheck] load failed:", e2), done()
                            })
                        },
                        DcProg = (0, c.KR)({
                            d: 0,
                            t: 0
                        }),
                        __dcDone = 0,
                        __dcTotal = 0,
                        Wt = (0, c.KR)({}),
                        WtProg = (0, c.KR)({
                            d: 0,
                            t: 0
                        }),
                        __wtCache = {},
                        __wtBusy = !1,
                        __wtPending = {},
                        __wtFlushT = null,
                        __wtDone = 0,
                        __wtTotal = 0,
                        __colStatus = function(key) {
                            /* small "loading n/m" line under the column header */
                            var p2 = "_drawingcheck" === key ? DcProg.value : "_weight" === key ? WtProg.value : null;
                            if (!p2 || !p2.t) return "";
                            return '<div style="font-size:10px;font-weight:500;opacity:.85;line-height:1.2">loading ' + p2.d + "/" + p2.t + "</div>"
                        },
                        __wtSet = function(pid, val) {
                            if (pid in __wtPending || pid in Wt.value) return;
                            __wtPending[pid] = val;
                            __wtDone++;
                            if (!__wtFlushT) __wtFlushT = setTimeout(function() {
                                Wt.value = Object.assign({}, Wt.value, __wtPending);
                                __wtPending = {}, __wtFlushT = null;
                                WtProg.value = {
                                    d: __wtDone,
                                    t: __wtTotal
                                }
                            }, 200)
                        },
                        __wtFetch = function(engIds) {
                            /* weight lives on the EngItem: ds6w:declaredWeight (declared)
                             * or ds6w:weight (computed) - only one of the two is ever set */
                            var need = engIds.filter(function(e2) {
                                return e2 && !(e2 in __wtCache)
                            });
                            if (!need.length) return Promise.resolve();
                            var jobs = [];
                            for (var i2 = 0; i2 < need.length; i2 += 200) jobs.push(need.slice(i2, i2 + 200));
                            return __thumbPool(jobs, 2, function(chunk) {
                                return _.call3DSpace({
                                    url: "/cvservlet/fetch/v2?xrequestedwith=xmlhttprequest",
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    data: {
                                        label: "zen-weight",
                                        physicalid: chunk,
                                        select_predicate: ["physicalid", "ds6w:weight", "ds6w:declaredWeight"],
                                        locale: "us",
                                        lang: "en",
                                        with_synthesis_attribute: !1
                                    },
                                    type: "json"
                                }).then(function(d2) {
                                    (d2 && d2.results || []).forEach(function(res) {
                                        var pid = "",
                                            w = "",
                                            dw = "";
                                        (res.attributes || []).forEach(function(a3) {
                                            "physicalid" === a3.name ? pid = a3.value : "ds6w:weight" === a3.name ? w = a3.value : "ds6w:declaredWeight" === a3.name && (dw = a3.value)
                                        });
                                        pid && (__wtCache[pid] = {
                                            w: w,
                                            dw: dw
                                        })
                                    })
                                }, function(e2) {
                                    /* a failed batch must not look like "no weight
                                     * defined" (red) - mark it as an error instead */
                                    console.warn("[Weight] batch failed:", e2);
                                    chunk.forEach(function(e3) {
                                        e3 in __wtCache || (__wtCache[e3] = {
                                            w: "",
                                            dw: "",
                                            e: 1
                                        })
                                    })
                                }).then(function() {
                                    chunk.forEach(function(e3) {
                                        e3 in __wtCache || (__wtCache[e3] = {
                                            w: "",
                                            dw: ""
                                        })
                                    })
                                })
                            })
                        },
                        __wtValue = function(eng) {
                            var c2 = eng ? __wtCache[eng] : null;
                            if (!c2) return {
                                t: "-",
                                k: "missing"
                            };
                            if (c2.e) return {
                                t: "!",
                                k: "error"
                            };
                            var dw = parseFloat(c2.dw),
                                w = parseFloat(c2.w);
                            return isNaN(dw) || 0 === dw ? isNaN(w) || 0 === w ? {
                                t: "-",
                                k: "missing"
                            } : {
                                t: w.toFixed(4),
                                k: "computed"
                            } : {
                                t: dw.toFixed(4),
                                k: "declared"
                            }
                        },
                        __wtMirrorNodes = function() {
                            var walk = function(list) {
                                (list || []).forEach(function(nd) {
                                    nd && nd.resourceid && Wt.value[nd.resourceid] && (nd._weight = Wt.value[nd.resourceid].t), nd && nd.children && nd.children.length && walk(nd.children)
                                })
                            };
                            walk(s.value)
                        },
                        __loadWeight = function() {
                            if (!a.selectedColumns || -1 === a.selectedColumns.indexOf("_weight") || __wtBusy) return;
                            var pids = __dcVisible().filter(function(p2) {
                                return !(p2 in Wt.value)
                            });
                            if (!pids.length) return;
                            __wtBusy = !0, __wtDone = 0, __wtTotal = pids.length, WtProg.value = {
                                d: 0,
                                t: __wtTotal
                            };
                            var done = function() {
                                __wtFlushT && (clearTimeout(__wtFlushT), __wtFlushT = null);
                                Wt.value = Object.assign({}, Wt.value, __wtPending), __wtPending = {};
                                __wtMirrorNodes(), __wtBusy = !1, WtProg.value = {
                                    d: 0,
                                    t: 0
                                }
                            };
                            ("CreateAssembly" === a.itemType ? __resolveScopes(pids) : Promise.resolve(function() {
                                var m2 = {};
                                return pids.forEach(function(p2) {
                                    m2[p2] = p2
                                }), m2
                            }())).then(function(engOf) {
                                var engIds = [];
                                return pids.forEach(function(p2) {
                                    var e2 = engOf[p2];
                                    e2 && engIds.indexOf(e2) < 0 && engIds.push(e2)
                                }), __wtFetch(engIds).then(function() {
                                    pids.forEach(function(p2) {
                                        __wtSet(p2, __wtValue(engOf[p2]))
                                    })
                                })
                            }).then(done, function(e2) {
                                console.warn("[Weight] load failed:", e2), done()
                            })
                        },
                        __matCoreCache = {},
                        __matCovCache = {},
                        __matBusy = !1,
                        __bomMatFetch = function(kind, pids, onBatch) {
                            var out = {};
                            if (!pids.length) return Promise.resolve(out);
                            var queue = [];
                            for (var i2 = 0; i2 < pids.length; i2 += 25) queue.push(pids.slice(i2, i2 + 25));
                            var total = pids.length,
                                done = 0,
                                one = function(chunk) {
                                    return _.call3DSpace({
                                        url: __bomMatUrl(kind),
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                            Accept: "application/json"
                                        },
                                        data: {
                                            references: chunk
                                        },
                                        type: "json"
                                    }).then(function(d2) {
                                        var infos = {},
                                            part = {};
                                        (d2 && d2.references_infos || []).forEach(function(e3) {
                                            e3 && e3.physicalid && (infos[e3.physicalid] = e3.V_Name || e3.V_AlternateName || "")
                                        }), (d2 && d2.references || []).forEach(function(e3) {
                                            if (e3 && e3.physicalid) {
                                                var n3 = e3.corematerial || e3.coveringmaterial || [],
                                                    t3 = n3.length && n3[0] && n3[0].physicalid || "";
                                                part[e3.physicalid] = t3 && infos[t3] || ""
                                            }
                                        }), chunk.forEach(function(e3) {
                                            e3 in part || (part[e3] = "")
                                        }), Object.assign(out, part), done += chunk.length, console.log("[Materials] " + kind + " " + done + "/" + total), onBatch && onBatch(part)
                                    }).catch(function(e3) {
                                        if (chunk.length >= 10) {
                                            var n3 = Math.ceil(chunk.length / 2);
                                            queue.push(chunk.slice(0, n3)), queue.push(chunk.slice(n3)), console.warn("[Materials] " + kind + " batch of " + chunk.length + " failed, retrying in halves:", e3 && e3.message || e3)
                                        } else {
                                            var t3 = {};
                                            chunk.forEach(function(e4) {
                                                e4 in out || (out[e4] = "", t3[e4] = "")
                                            }), done += chunk.length, console.warn("[Materials] " + kind + " giving up on " + chunk.length + " items:", e3 && e3.message || e3), onBatch && onBatch(t3)
                                        }
                                    })
                                },
                                worker = function() {
                                    if (!queue.length) return Promise.resolve();
                                    var e3 = queue.shift();
                                    return one(e3).then(worker)
                                };
                            return Promise.all([worker(), worker(), worker()]).then(function() {
                                return out
                            })
                        },
                        __applyMaterials = function() {
                            var e = "CreateAssembly" === a.itemType,
                                n = -1 !== a.selectedColumns.indexOf("_coreMaterial"),
                                t = -1 !== a.selectedColumns.indexOf("_coveringMaterial"),
                                r = function(o2) {
                                    Array.isArray(o2) && o2.forEach(function(l2) {
                                        if (l2) {
                                            if (l2.resourceid) {
                                                var i2 = e ? __scopeCache[l2.resourceid] || "" : l2.resourceid;
                                                n && (l2._coreMaterial = i2 && i2 in __matCoreCache ? __matCoreCache[i2] || "-" : l2._coreMaterial || "-"), t && (l2._coveringMaterial = i2 && i2 in __matCovCache ? __matCovCache[i2] || "-" : l2._coveringMaterial || "-")
                                            }
                                            l2.children && l2.children.length && r(l2.children)
                                        }
                                    })
                                };
                            r(s.value)
                        },
                        __loadMaterials = function() {
                            var e = a.selectedColumns || [],
                                n = -1 !== e.indexOf("_coreMaterial"),
                                t = -1 !== e.indexOf("_coveringMaterial");
                            if ((n || t) && !__matBusy) {
                                var r = __collectThumbPids();
                                if (r.length) {
                                    __matBusy = !0;
                                    var o2 = function() {
                                            __matBusy = !1
                                        },
                                        l2 = function(e2) {
                                            var r2 = [];
                                            e2.forEach(function(e3) {
                                                e3 && r2.indexOf(e3) < 0 && r2.push(e3)
                                            });
                                            var i2 = n ? r2.filter(function(e3) {
                                                    return !(e3 in __matCoreCache)
                                                }) : [],
                                                c2 = t ? r2.filter(function(e3) {
                                                    return !(e3 in __matCovCache)
                                                }) : [];
                                            if (!i2.length && !c2.length) return __applyMaterials(), void o2();
                                            Promise.all([__bomMatFetch("CoreMaterial", i2, function(e3) {
                                                Object.assign(__matCoreCache, e3), __applyMaterials()
                                            }), __bomMatFetch("CoveringMaterial", c2, function(e3) {
                                                Object.assign(__matCovCache, e3), __applyMaterials()
                                            })]).then(function(e3) {
                                                Object.assign(__matCoreCache, e3[0]), Object.assign(__matCovCache, e3[1]), __applyMaterials(), o2()
                                            }, o2)
                                        };
                                    "CreateAssembly" === a.itemType ? __resolveScopes(r).then(function(e2) {
                                        l2(r.map(function(n2) {
                                            return e2[n2]
                                        }))
                                    }, o2) : l2(r)
                                }
                            }
                        };
                    (0, l.wB)(function() {
                        return [s.value, a.selectedColumns]
                    }, function() {
                        __loadThumbs(), __loadMaterials(), __loadDrawingCheck(), __loadWeight()
                    }, {
                        immediate: !0
                    });
                    var ut = function() {
                            var e, n = [],
                                t = re(Xn.value);
                            try {
                                for (t.s(); !(e = t.n()).done;) {
                                    var r = e.value;
                                    if (r && r.resourceid) {
                                        var a, o = {
                                                level: r.level || 0,
                                                title: r["ds6w:label"] || r["ds6w:identifier"] || "-"
                                            },
                                            l = re(Hn.value);
                                        try {
                                            for (l.s(); !(a = l.n()).done;) {
                                                var i = a.value;
                                                "_thumbnail" === i.key ? o[i.label] = Th.value[r.resourceid] || "" : "_qty" === i.key ? o[i.label] = r.quantity || 1 : "_subqty" === i.key ? o[i.label] = r.subQuantity || 1 : "_totalqty" === i.key ? o[i.label] = r.totalQuantity || 1 : "_parentProduct" === i.key ? o[i.label] = r._parentProduct || "-" : i.key.includes("baykar_revision") ? o[i.label] = tt(r, i.key) : "ds6w:status" === i.key ? o[i.label] = rt(r[i.key]) : "ds6w:type" === i.key ? o[i.label] = r.displayType || r[i.key] || "-" : at(r[i.key]) ? o[i.label] = lt(r[i.key]) : o[i.label] = r[i.key] || "-"
                                            }
                                        } catch (e) {
                                            l.e(e)
                                        } finally {
                                            l.f()
                                        }
                                        n.push(o)
                                    }
                                }
                            } catch (e) {
                                t.e(e)
                            } finally {
                                t.f()
                            }
                            return n
                        },
                        st = function() {
                            if (Hn.value.some(function(e2) {
                                    return "_thumbnail" === e2.key
                                })) return void __bomExportThumbExcel();
                            var e, n = ut(),
                                t = ["Level", "Title"].concat(J(Hn.value.map(function(e) {
                                    return e.label
                                }))),
                                r = n.map(function(e) {
                                    var n, t = [e.level, e.title],
                                        r = re(Hn.value);
                                    try {
                                        for (r.s(); !(n = r.n()).done;) {
                                            var a = n.value;
                                            t.push(e[a.label])
                                        }
                                    } catch (e) {
                                        r.e(e)
                                    } finally {
                                        r.f()
                                    }
                                    return t
                                }),
                                a = M.Wp.aoa_to_sheet([t].concat(J(r)));
                            a["!cols"] = t.map(function(e, n) {
                                return {
                                    wch: 0 === n ? 8 : 1 === n ? 40 : 15
                                }
                            });
                            var o = M.Wp.book_new();
                            M.Wp.book_append_sheet(o, a, "BOM");
                            var l = null === (e = s.value) || void 0 === e ? void 0 : e[0],
                                i = (null == l ? void 0 : l["ds6w:label"]) || "BOM",
                                c = tt(l || {}, "ds6wg:XP_VPMReference_Ext.baykar_revision"),
                                u = (new Date).toLocaleDateString("en-US").replace(/\//g, "-"),
                                d = function(e) {
                                    return e.replace(/[<>:"/\\|?*]/g, "_")
                                },
                                p = "".concat(d(i), "-").concat(d(c), "-").concat(u, ".xlsx"),
                                f = M.M9(o, {
                                    bookType: "xlsx",
                                    type: "array"
                                });
                            window.__zenSaveBlob(new Blob([f], {
                                type: "application/octet-stream"
                            }), p)
                        },
                        dt = function() {
                            var e = ut(),
                                n = ["#", "Title"].concat(J(Hn.value.map(function(e) {
                                    return e.label
                                }))),
                                t = '\n    <html>\n    <head>\n      <title>BOM Report</title>\n      <style>\n        body { font-family: Arial, sans-serif; padding: 20px; }\n        h1 { color: #111f5a; margin-bottom: 5px; }\n        .date { color: #666; margin-bottom: 20px; }\n        table { width: 100%; border-collapse: collapse; font-size: 11px; }\n        th { background: #111f5a; color: white; padding: 8px 6px; text-align: left; }\n        td { padding: 6px; border-bottom: 1px solid #ddd; }\n        tr:nth-child(even) { background: #f9f9f9; }\n        .indent { color: #888; }\n        @media print {\n          body { padding: 0; }\n          button { display: none; }\n        }\n      </style>\n    </head>\n    <body>\n      <h1>BOM Report</h1>\n      <p class="date">Date: '.concat((new Date).toLocaleDateString("en-US"), "</p>\n      <table>\n        <thead>\n          <tr>").concat(n.map(function(e) {
                                    return "<th>".concat(e, "</th>")
                                }).join(""), "</tr>\n        </thead>\n        <tbody>\n  ");
                            e.forEach(function(e, n) {
                                var r = "&nbsp;&nbsp;".repeat(2 * e.level);
                                t += "<tr>", t += "<td>".concat(n + 1, "</td>"), t += '<td><span class="indent">'.concat(r, "</span>").concat(e.title, "</td>");
                                var a, o = re(Hn.value);
                                try {
                                    for (o.s(); !(a = o.n()).done;) {
                                        var l = a.value,
                                            i = e[l.label];
                                        t += "_thumbnail" === l.key && /^https?:\/\//.test(String(i || "")) ? '<td><img src="'.concat(i, '" style="height:48px"/></td>') : "_thumbnail" === l.key ? "<td>-</td>" : "<td>".concat(i, "</td>")
                                    }
                                } catch (e) {
                                    o.e(e)
                                } finally {
                                    o.f()
                                }
                                t += "</tr>"
                            }), t += "\n        </tbody>\n      </table>\n      <script>window.onload = function() { window.print(); }<\/script>\n    </body>\n    </html>\n  ";
                            var r = window.open("", "_blank");
                            r.document.write(t), r.document.close()
                        },
                        __bomExportThumbExcel = function() {
                            var e = Hn.value,
                                n = -1;
                            e.forEach(function(e2, t2) {
                                "_thumbnail" === e2.key && (n = t2)
                            });
                            var t = ["Level", "Title"].concat(J(e.map(function(e2) {
                                    return e2.label
                                }))),
                                r = ut(),
                                a = r.map(function(n2) {
                                    var t2 = [n2.level, n2.title];
                                    return e.forEach(function(e2) {
                                        t2.push(n2[e2.label])
                                    }), t2
                                }),
                                o = r.map(function(t2) {
                                    var r2 = n >= 0 ? t2[e[n].label] : "";
                                    return /^https?:\/\//.test(String(r2 || "")) ? r2 : ""
                                }),
                                i = {};
                            o.forEach(function(e2) {
                                e2 && (i[e2] = null)
                            });
                            var c = Object.keys(i),
                                u = function(e2) {
                                    return window.fetch(e2, {
                                        credentials: "omit",
                                        mode: "cors"
                                    }).then(function(n2) {
                                        if (!n2.ok) throw new Error("HTTP " + n2.status);
                                        return n2.arrayBuffer()
                                    }).catch(function() {
                                        return window.fetch(e2, {
                                            credentials: "include",
                                            mode: "cors"
                                        }).then(function(n2) {
                                            if (!n2.ok) throw new Error("HTTP " + n2.status);
                                            return n2.arrayBuffer()
                                        })
                                    }).then(function(t2) {
                                        var r2 = new Uint8Array(t2),
                                            a2 = r2.length > 2 && 137 === r2[0] ? "png" : r2.length > 2 && 255 === r2[0] && 216 === r2[1] ? "jpeg" : r2.length > 2 && 71 === r2[0] && 73 === r2[1] && 70 === r2[2] ? "gif" : "png",
                                            o2 = {
                                                bytes: r2,
                                                ext: a2,
                                                w: 96,
                                                h: 72
                                            };
                                        return "undefined" != typeof createImageBitmap ? createImageBitmap(new Blob([t2])).then(function(e3) {
                                            var n3 = {
                                                bytes: r2,
                                                ext: a2,
                                                w: e3.width || 96,
                                                h: e3.height || 72
                                            };
                                            return e3.close && e3.close(), n3
                                        }).catch(function() {
                                            return o2
                                        }) : Promise.resolve(o2)
                                    }).catch(function(n2) {
                                        return console.warn("[Thumbnails] image fetch failed for Excel:", e2, n2), null
                                    })
                                },
                                d = function(e2, n2, t2) {
                                    var r2 = 0,
                                        a2 = new Array(e2.length),
                                        o2 = function() {
                                            if (r2 >= e2.length) return Promise.resolve();
                                            var n3 = r2++;
                                            return t2(e2[n3]).then(function(e3) {
                                                a2[n3] = e3
                                            }).then(o2)
                                        },
                                        l2 = [];
                                    for (var i2 = 0; i2 < Math.min(n2, e2.length); i2++) l2.push(o2());
                                    return Promise.all(l2).then(function() {
                                        return a2
                                    })
                                };
                            return d(c, 6, u).then(function(e2) {
                                var t2 = {};
                                c.forEach(function(n2, r2) {
                                    t2[n2] = e2[r2]
                                });
                                var r2 = o.map(function(e3) {
                                    return e3 && t2[e3] || null
                                });
                                n >= 0 && a.forEach(function(e3, t3) {
                                    r2[t3] && (e3[2 + n] = "")
                                });
                                var l2, i2 = null === (l2 = s.value) || void 0 === l2 ? void 0 : l2[0],
                                    c2 = (null == i2 ? void 0 : i2["ds6w:label"]) || "BOM",
                                    u2 = tt(i2 || {}, "ds6wg:XP_VPMReference_Ext.baykar_revision"),
                                    d2 = (new Date).toLocaleDateString("en-US").replace(/\//g, "-"),
                                    p2 = function(e3) {
                                        return e3.replace(/[<>:"/\\|?*]/g, "_")
                                    },
                                    f2 = "".concat(p2(c2), "-").concat(p2(u2), "-").concat(d2, ".xlsx");
                                __bomXlsxWithImages({
                                    header: t,
                                    rows: a,
                                    thumbCol: 2 + n,
                                    images: r2,
                                    fileName: f2
                                })
                            }).catch(function(e2) {
                                console.error("[Thumbnails] Excel export failed:", e2)
                            })
                        };
                    return function(n, t) {
                        var r = (0, l.g2)("v-progress-circular"),
                            c = (0, l.g2)("v-chip");
                        return (0, l.uX)(), (0, l.CE)("div", se, [(0, l.Q3)(" Toolbar "), (0, l.Lk)("div", de, [(0, l.Lk)("div", pe, [O.value ? ((0, l.uX)(), (0, l.Wv)(r, {
                            key: 1,
                            indeterminate: "",
                            size: "16",
                            width: "2",
                            color: "primary",
                            class: "search-spinner"
                        })) : ((0, l.uX)(), (0, l.CE)("svg", fe, J(t[13] || (t[13] = [(0, l.Lk)("path", {
                            d: "M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z",
                            fill: "currentColor"
                        }, null, -1)])))), (0, l.bo)((0, l.Lk)("input", {
                            "onUpdate:modelValue": t[0] || (t[0] = function(e) {
                                return A.value = e
                            }),
                            type: "text",
                            placeholder: 1 === A.value.length ? "At least 2 characters..." : "Search...",
                            class: "search-input",
                            onInput: Qn
                        }, null, 40, ve), [
                            [o.Jo, A.value]
                        ]), 1 === A.value.length ? ((0, l.uX)(), (0, l.CE)("span", be, "+1")) : (0, l.Q3)("v-if", !0), A.value ? ((0, l.uX)(), (0, l.CE)("button", {
                            key: 3,
                            class: "search-clear",
                            onClick: Wn,
                            title: "Clear"
                        }, J(t[14] || (t[14] = [(0, l.Lk)("svg", {
                            viewBox: "0 0 24 24"
                        }, [(0, l.Lk)("path", {
                            d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",
                            fill: "currentColor"
                        })], -1)])))) : (0, l.Q3)("v-if", !0)]), (0, l.Q3)(" Active Filters Indicator "), Q.value > 0 ? ((0, l.uX)(), (0, l.CE)("div", ge, [t[16] || (t[16] = (0, l.Lk)("svg", {
                            class: "filter-icon",
                            viewBox: "0 0 24 24"
                        }, [(0, l.Lk)("path", {
                            d: "M14,12V19.88C14.04,20.18 13.94,20.5 13.71,20.71C13.32,21.1 12.69,21.1 12.3,20.71L10.29,18.7C10.06,18.47 9.96,18.16 10,17.87V12H9.97L4.21,4.62C3.87,4.19 3.95,3.56 4.38,3.22C4.57,3.08 4.78,3 5,3H19C19.22,3 19.43,3.08 19.62,3.22C20.05,3.56 20.13,4.19 19.79,4.62L14.03,12H14Z",
                            fill: "currentColor"
                        })], -1)), (0, l.Lk)("span", he, (0, i.v_)(Q.value) + " active", 1), (0, l.Lk)("button", {
                            class: "clear-filters-btn",
                            onClick: kn,
                            title: "Clear all filters"
                        }, J(t[15] || (t[15] = [(0, l.Lk)("svg", {
                            viewBox: "0 0 24 24"
                        }, [(0, l.Lk)("path", {
                            d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",
                            fill: "currentColor"
                        })], -1)])))])) : (0, l.Q3)("v-if", !0), (0, l.Lk)("div", me, [(0, l.Lk)("button", {
                            class: "toolbar-btn expand-btn",
                            onClick: Gn,
                            "data-tooltip": V.value ? "".concat(Math.round(Cn.value / Ln.value * 100), "%") : "Expand All",
                            disabled: _n.value
                        }, [V.value ? ((0, l.uX)(), (0, l.CE)("div", ke, [(0, l.bF)(r, {
                            indeterminate: "",
                            size: "20",
                            width: "2.5",
                            color: "primary"
                        }), (0, l.Lk)("span", we, (0, i.v_)(Ln.value > 0 ? Math.round(Cn.value / Ln.value * 100) : 0), 1)])) : ((0, l.uX)(), (0, l.CE)("svg", xe, J(t[17] || (t[17] = [(0, l.Lk)("path", {
                            d: "M10,21V19H6.41L10.91,14.5L9.5,13.09L5,17.59V14H3V21H10M14.5,10.91L19,6.41V10H21V3H14V5H17.59L13.09,9.5L14.5,10.91Z",
                            fill: "currentColor"
                        }, null, -1)]))))], 8, ye), (0, l.Lk)("button", {
                            class: "toolbar-btn",
                            onClick: Un,
                            "data-tooltip": "Collapse All",
                            disabled: _n.value
                        }, J(t[18] || (t[18] = [(0, l.Lk)("svg", {
                            viewBox: "0 0 24 24"
                        }, [(0, l.Lk)("path", {
                            d: "M19.5,3.09L15,7.59V4H13V11H20V9H16.41L20.91,4.5L19.5,3.09M4,13V15H7.59L3.09,19.5L4.5,20.91L9,16.41V20H11V13H4Z",
                            fill: "currentColor"
                        })], -1)])), 8, Ce), t[26] || (t[26] = (0, l.Lk)("div", {
                            class: "toolbar-divider"
                        }, null, -1)), (0, l.Lk)("button", {
                            class: "toolbar-btn expand-btn",
                            onClick: Zn,
                            "data-tooltip": En.value ? "".concat(Math.round(Sn.value / Pn.value * 100), "%") : "Expand One Level",
                            disabled: _n.value
                        }, [En.value ? ((0, l.uX)(), (0, l.CE)("div", Se, [(0, l.bF)(r, {
                            indeterminate: "",
                            size: "20",
                            width: "2.5",
                            color: "primary"
                        }), (0, l.Lk)("span", Pe, (0, i.v_)(Pn.value > 0 ? Math.round(Sn.value / Pn.value * 100) : 0), 1)])) : ((0, l.uX)(), (0, l.CE)("svg", Ee, J(t[19] || (t[19] = [(0, l.Lk)("path", {
                            d: "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",
                            fill: "currentColor"
                        }, null, -1)]))))], 8, Le), (0, l.Lk)("button", {
                            class: "toolbar-btn",
                            onClick: $n,
                            "data-tooltip": "Collapse One Level",
                            disabled: _n.value
                        }, J(t[20] || (t[20] = [(0, l.Lk)("svg", {
                            viewBox: "0 0 24 24"
                        }, [(0, l.Lk)("path", {
                            d: "M19,13H5V11H19V13Z",
                            fill: "currentColor"
                        })], -1)])), 8, _e), (0, l.Lk)("button", {
                            class: "toolbar-btn",
                            onClick: t[1] || (t[1] = function(e) {
                                return u("close")
                            }),
                            "data-tooltip": "Close"
                        }, J(t[21] || (t[21] = [(0, l.Lk)("svg", {
                            viewBox: "0 0 24 24"
                        }, [(0, l.Lk)("path", {
                            d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",
                            fill: "currentColor"
                        })], -1)]))), (0, l.Lk)("button", {
                            class: "toolbar-btn",
                            onClick: t[2] || (t[2] = function(e) {
                                return u("refresh")
                            }),
                            "data-tooltip": "Refresh",
                            disabled: _n.value
                        }, J(t[22] || (t[22] = [(0, l.Lk)("svg", {
                            viewBox: "0 0 24 24"
                        }, [(0, l.Lk)("path", {
                            d: "M12,18A6,6 0 0,1 6,12C6,10.21 6.78,8.61 8,7.5V10H10V4H4V6H6.5C4.96,7.61 4,9.78 4,12A8,8 0 0,0 12,20A8,8 0 0,0 19.93,13H17.85A6,6 0 0,1 12,18M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4.07,11H6.15A6,6 0 0,1 12,6A6,6 0 0,1 18,12C18,13.79 17.22,15.39 16,16.5V14H14V20H20V18H17.5C19.04,16.39 20,14.22 20,12Z",
                            fill: "currentColor"
                        })], -1)])), 8, Me), t[27] || (t[27] = (0, l.Lk)("div", {
                            class: "toolbar-divider"
                        }, null, -1)), (0, l.Lk)("button", {
                            class: "toolbar-btn",
                            onClick: t[3] || (t[3] = function(e) {
                                return u("open-columns")
                            }),
                            "data-tooltip": "Columns",
                            disabled: _n.value
                        }, J(t[23] || (t[23] = [(0, l.Lk)("svg", {
                            viewBox: "0 0 24 24"
                        }, [(0, l.Lk)("path", {
                            d: "M3,4H7V8H3V4M9,5V7H21V5H9M3,10H7V14H3V10M9,11V13H21V11H9M3,16H7V20H3V16M9,17V19H21V17H9",
                            fill: "currentColor"
                        })], -1)])), 8, Te), t[28] || (t[28] = (0, l.Lk)("div", {
                            class: "toolbar-divider"
                        }, null, -1)), (0, l.Lk)("button", {
                            class: "toolbar-btn",
                            onClick: st,
                            "data-tooltip": "Excel",
                            disabled: _n.value
                        }, J(t[24] || (t[24] = [(0, l.Lk)("svg", {
                            viewBox: "0 0 24 24"
                        }, [(0, l.Lk)("path", {
                            d: "M21.17 3.25Q21.5 3.25 21.76 3.5 22 3.74 22 4.08V19.92Q22 20.26 21.76 20.5 21.5 20.75 21.17 20.75H7.83Q7.5 20.75 7.24 20.5 7 20.26 7 19.92V17H2.83Q2.5 17 2.24 16.76 2 16.5 2 16.17V7.83Q2 7.5 2.24 7.24 2.5 7 2.83 7H7V4.08Q7 3.74 7.24 3.5 7.5 3.25 7.83 3.25M7 13.06L8.18 15.28H9.97L8 12.06L9.93 8.89H8.22L7.13 10.9L7.09 10.96L7.06 11.03Q6.8 10.5 6.5 9.96 6.25 9.43 5.97 8.89H4.16L6.05 12.08L4 15.28H5.78M13.88 19.5V17H8.25V19.5M13.88 15.75V12.63H12V15.75M13.88 11.38V8.25H12V11.38M13.88 7V4.5H8.25V7M20.75 19.5V17H15.13V19.5M20.75 15.75V12.63H15.13V15.75M20.75 11.38V8.25H15.13V11.38M20.75 7V4.5H15.13V7Z",
                            fill: "currentColor"
                        })], -1)])), 8, Ae), (0, l.Lk)("button", {
                            class: "toolbar-btn",
                            onClick: dt,
                            "data-tooltip": "Print",
                            disabled: _n.value
                        }, J(t[25] || (t[25] = [(0, l.Lk)("svg", {
                            viewBox: "0 0 24 24"
                        }, [(0, l.Lk)("path", {
                            d: "M18,3H6V7H18M19,12A1,1 0 0,1 18,11A1,1 0 0,1 19,10A1,1 0 0,1 20,11A1,1 0 0,1 19,12M16,19H8V14H16M19,8H5A3,3 0 0,0 2,11V17H6V21H18V17H22V11A3,3 0 0,0 19,8Z",
                            fill: "currentColor"
                        })], -1)])), 8, je)])]), (0, l.Q3)(" Configuration Selection Bar "), (0, l.Lk)("div", Oe, [(0, l.Q3)(" Model Selection "), (0, l.Lk)("div", Ve, [t[30] || (t[30] = (0, l.Lk)("label", {
                            class: "config-label"
                        }, "Model", -1)), (0, l.bo)((0, l.Lk)("select", {
                            "onUpdate:modelValue": t[4] || (t[4] = function(e) {
                                return p.value = e
                            }),
                            class: "config-select",
                            disabled: f.value
                        }, [t[29] || (t[29] = (0, l.Lk)("option", {
                            value: ""
                        }, "Select Model", -1)), ((0, l.uX)(!0), (0, l.CE)(l.FK, null, (0, l.pI)(d.value, function(e) {
                            return (0, l.uX)(), (0, l.CE)("option", {
                                key: e.id,
                                value: e.id
                            }, (0, i.v_)(e.name), 9, Re)
                        }), 128))], 8, De), [
                            [o.u1, p.value]
                        ]), f.value ? ((0, l.uX)(), (0, l.Wv)(r, {
                            key: 0,
                            indeterminate: "",
                            size: "16",
                            width: "2",
                            color: "primary",
                            class: "config-spinner"
                        })) : (0, l.Q3)("v-if", !0)]), (0, l.Q3)(" Version Selection (only show if multiple versions) "), k.value ? ((0, l.uX)(), (0, l.CE)("div", He, [t[32] || (t[32] = (0, l.Lk)("label", {
                            class: "config-label"
                        }, "Version", -1)), (0, l.bo)((0, l.Lk)("select", {
                            "onUpdate:modelValue": t[5] || (t[5] = function(e) {
                                return b.value = e
                            }),
                            class: "config-select",
                            disabled: g.value
                        }, [t[31] || (t[31] = (0, l.Lk)("option", {
                            value: ""
                        }, "Select Version", -1)), ((0, l.uX)(!0), (0, l.CE)(l.FK, null, (0, l.pI)(v.value, function(e) {
                            return (0, l.uX)(), (0, l.CE)("option", {
                                key: e.id,
                                value: e.id
                            }, (0, i.v_)(e.name), 9, Ie)
                        }), 128))], 8, Fe), [
                            [o.u1, b.value]
                        ]), g.value ? ((0, l.uX)(), (0, l.Wv)(r, {
                            key: 0,
                            indeterminate: "",
                            size: "16",
                            width: "2",
                            color: "primary",
                            class: "config-spinner"
                        })) : (0, l.Q3)("v-if", !0)])) : (0, l.Q3)("v-if", !0), (0, l.Q3)(" Configuration Selection "), (0, l.Lk)("div", Be, [t[34] || (t[34] = (0, l.Lk)("label", {
                            class: "config-label"
                        }, "Configuration", -1)), (0, l.bo)((0, l.Lk)("select", {
                            "onUpdate:modelValue": t[6] || (t[6] = function(e) {
                                return m.value = e
                            }),
                            class: "config-select",
                            disabled: !w.value || y.value
                        }, [t[33] || (t[33] = (0, l.Lk)("option", {
                            value: ""
                        }, "Select Configuration", -1)), ((0, l.uX)(!0), (0, l.CE)(l.FK, null, (0, l.pI)(h.value, function(e) {
                            return (0, l.uX)(), (0, l.CE)("option", {
                                key: e.id,
                                value: e.id
                            }, (0, i.v_)(e.name), 9, Qe)
                        }), 128))], 8, ze), [
                            [o.u1, m.value]
                        ]), y.value ? ((0, l.uX)(), (0, l.Wv)(r, {
                            key: 0,
                            indeterminate: "",
                            size: "16",
                            width: "2",
                            color: "primary",
                            class: "config-spinner"
                        })) : (0, l.Q3)("v-if", !0)]), (0, l.Lk)("button", {
                            class: "config-apply-btn",
                            disabled: !w.value || !m.value || x.value,
                            onClick: S
                        }, [x.value ? ((0, l.uX)(), (0, l.Wv)(r, {
                            key: 0,
                            indeterminate: "",
                            size: "16",
                            width: "2",
                            color: "white"
                        })) : ((0, l.uX)(), (0, l.CE)("svg", Xe, J(t[35] || (t[35] = [(0, l.Lk)("path", {
                            d: "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z",
                            fill: "currentColor"
                        }, null, -1)])))), t[36] || (t[36] = (0, l.Lk)("span", null, "Apply", -1))], 8, We), p.value || m.value ? ((0, l.uX)(), (0, l.CE)("button", {
                            key: 1,
                            class: "config-clear-btn",
                            onClick: P,
                            title: "Clear selection"
                        }, J(t[37] || (t[37] = [(0, l.Lk)("svg", {
                            viewBox: "0 0 24 24"
                        }, [(0, l.Lk)("path", {
                            d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",
                            fill: "currentColor"
                        })], -1)])))) : (0, l.Q3)("v-if", !0)]), (0, l.Q3)(" Scrollable Table Container "), (0, l.Lk)("div", Ke, [(0, l.Lk)("div", qe, [(0, l.Q3)(" Header with Drag & Drop (Sticky) - Drop zone dışında "), (0, l.Lk)("div", {
                            class: "tree-header",
                            onDragenter: t[9] || (t[9] = (0, o.D$)(function() {}, ["stop"])),
                            onDragleave: t[10] || (t[10] = (0, o.D$)(function() {}, ["stop"]))
                        }, [(0, l.Lk)("div", {
                            class: "tree-cell tree-name-cell",
                            style: (0, i.Tr)({
                                width: e.columnWidths._title ? e.columnWidths._title + "px" : null,
                                flex: e.columnWidths._title ? "none" : null
                            })
                        }, [t[39] || (t[39] = (0, l.Lk)("span", {
                            class: "header-text"
                        }, "Title", -1)), (0, l.Q3)(" Title Filter "), (0, l.Lk)("button", {
                            class: (0, i.C4)(["filter-btn", {
                                active: z("ds6w:label")
                            }]),
                            onClick: t[7] || (t[7] = (0, o.D$)(function(e) {
                                return N("ds6w:label", e)
                            }, ["stop"]))
                        }, J(t[38] || (t[38] = [(0, l.Lk)("svg", {
                            viewBox: "0 0 24 24"
                        }, [(0, l.Lk)("path", {
                            d: "M14,12V19.88C14.04,20.18 13.94,20.5 13.71,20.71C13.32,21.1 12.69,21.1 12.3,20.71L10.29,18.7C10.06,18.47 9.96,18.16 10,17.87V12H9.97L4.21,4.62C3.87,4.19 3.95,3.56 4.38,3.22C4.57,3.08 4.78,3 5,3H19C19.22,3 19.43,3.08 19.62,3.22C20.05,3.56 20.13,4.19 19.79,4.62L14.03,12H14Z",
                            fill: "currentColor"
                        })], -1)])), 2), (0, l.Lk)("div", {
                            class: "resize-handle",
                            onMousedown: t[8] || (t[8] = (0, o.D$)(function(e) {
                                return Vn("_title", e)
                            }, ["prevent", "stop"]))
                        }, null, 32)], 4), ((0, l.uX)(!0), (0, l.CE)(l.FK, null, (0, l.pI)(Hn.value, function(n, r) {
                            return (0, l.uX)(), (0, l.CE)("div", {
                                key: "header-".concat(n.key),
                                class: (0, i.C4)(["tree-cell dynamic-cell header-label", {
                                    dragging: Mn.value === r,
                                    "drag-over": Tn.value === r,
                                    "has-filter": z(n.key)
                                }]),
                                style: (0, i.Tr)({
                                    width: e.columnWidths[n.key] ? e.columnWidths[n.key] + "px" : null,
                                    flex: e.columnWidths[n.key] ? "none" : null
                                }),
                                draggable: "true",
                                onDragstart: function(e) {
                                    return function(e, n) {
                                        n.stopPropagation(), Mn.value = e, n.dataTransfer.effectAllowed = "move", n.dataTransfer.setData("text/plain", "column-reorder")
                                    }(r, e)
                                },
                                onDragend: Fn,
                                onDragover: (0, o.D$)(function(e) {
                                    return function(e) {
                                        null !== Mn.value && Mn.value !== e && (Tn.value = e)
                                    }(r)
                                }, ["prevent", "stop"]),
                                onDrop: (0, o.D$)(function(e) {
                                    return function(e, n) {
                                        if (n.stopPropagation(), n.preventDefault(), null !== Mn.value && Mn.value !== e) {
                                            var t = a.selectedColumns.filter(function(e) {
                                                    return "ds6w:label" !== e
                                                }),
                                                r = te(t.splice(Mn.value, 1), 1)[0];
                                            t.splice(e, 0, r);
                                            var o = ["ds6w:label"].concat(J(t));
                                            u("update:selected-columns", o), Mn.value = null, Tn.value = null
                                        }
                                    }(r, e)
                                }, ["prevent", "stop"])
                            }, [(0, l.Lk)("span", {
                                class: "header-text",
                                innerHTML: ct(n.label) + __colStatus(n.key)
                            }, null, 8, Ge), (0, l.Q3)(" Column Filter "), (0, l.Lk)("button", {
                                class: (0, i.C4)(["filter-btn", {
                                    active: z(n.key)
                                }]),
                                onClick: (0, o.D$)(function(e) {
                                    return N(n.key, e)
                                }, ["stop"])
                            }, J(t[40] || (t[40] = [(0, l.Lk)("svg", {
                                viewBox: "0 0 24 24"
                            }, [(0, l.Lk)("path", {
                                d: "M14,12V19.88C14.04,20.18 13.94,20.5 13.71,20.71C13.32,21.1 12.69,21.1 12.3,20.71L10.29,18.7C10.06,18.47 9.96,18.16 10,17.87V12H9.97L4.21,4.62C3.87,4.19 3.95,3.56 4.38,3.22C4.57,3.08 4.78,3 5,3H19C19.22,3 19.43,3.08 19.62,3.22C20.05,3.56 20.13,4.19 19.79,4.62L14.03,12H14Z",
                                fill: "currentColor"
                            })], -1)])), 10, Ue), (0, l.Lk)("div", {
                                class: "resize-handle",
                                onMousedown: (0, o.D$)(function(e) {
                                    return Vn(n.key, e)
                                }, ["prevent", "stop"])
                            }, null, 40, Ze)], 46, Ne)
                        }), 128))], 32), (0, l.Q3)(" Filter Dropdown "), H.value ? ((0, l.uX)(), (0, l.CE)("div", {
                            key: 0,
                            class: "filter-dropdown",
                            style: (0, i.Tr)(B.value),
                            onClick: t[12] || (t[12] = (0, o.D$)(function() {}, ["stop"]))
                        }, [(0, l.Lk)("div", $e, [(0, l.Lk)("span", Je, "Filter: " + (0, i.v_)(Y(H.value)), 1), (0, l.Lk)("button", {
                            class: "filter-close",
                            onClick: $
                        }, J(t[41] || (t[41] = [(0, l.Lk)("svg", {
                            viewBox: "0 0 24 24"
                        }, [(0, l.Lk)("path", {
                            d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",
                            fill: "currentColor"
                        })], -1)])))]), (0, l.Lk)("div", Ye, [(0, l.bo)((0, l.Lk)("input", {
                            "onUpdate:modelValue": t[11] || (t[11] = function(e) {
                                return I.value = e
                            }),
                            type: "text",
                            placeholder: "Search values...",
                            class: "filter-search-input"
                        }, null, 512), [
                            [o.Jo, I.value]
                        ])]), (0, l.Lk)("div", {
                            class: "filter-actions"
                        }, [(0, l.Lk)("button", {
                            class: "filter-action-btn",
                            onClick: oe
                        }, "Select All"), (0, l.Lk)("button", {
                            class: "filter-action-btn",
                            onClick: ie
                        }, "Clear")]), (0, l.Lk)("div", en, [((0, l.uX)(!0), (0, l.CE)(l.FK, null, (0, l.pI)(K.value, function(e) {
                            return (0, l.uX)(), (0, l.CE)("label", {
                                key: e,
                                class: "filter-value-item"
                            }, [(0, l.Lk)("input", {
                                type: "checkbox",
                                checked: ae(H.value, e),
                                onChange: function(n) {
                                    return function(e, n) {
                                        R.value[e] || (R.value[e] = new Set), R.value[e].has(n) ? R.value[e].delete(n) : R.value[e].add(n)
                                    }(H.value, e)
                                }
                            }, null, 40, nn), (0, l.Lk)("span", tn, (0, i.v_)(e || "(empty)"), 1), (0, l.Lk)("span", rn, (0, i.v_)(q(H.value, e)), 1)])
                        }), 128))]), (0, l.Lk)("div", {
                            class: "filter-footer"
                        }, [(0, l.Lk)("button", {
                            class: "filter-apply-btn",
                            onClick: ce
                        }, "Apply")])], 4)) : (0, l.Q3)("v-if", !0), (0, l.Q3)(" Tree Body "), (0, l.Lk)("div", an, [((0, l.uX)(!0), (0, l.CE)(l.FK, null, (0, l.pI)(Xn.value, function(n, r) {
                            var u, s, d, p;
                            return (0, l.uX)(), (0, l.CE)(l.FK, {
                                key: (null == n ? void 0 : n._uid) || r
                            }, [n && n.resourceid ? ((0, l.uX)(), (0, l.CE)("div", {
                                key: 0,
                                class: (0, i.C4)(["tree-row", {
                                    expanded: n.expanded,
                                    "has-children": null === (u = n.children) || void 0 === u ? void 0 : u.length,
                                    clickable: null === (s = n.children) || void 0 === s ? void 0 : s.length
                                }]),
                                draggable: "true",
                                onDragstart: function(e) {
                                    return function(e, n) {
                                        n.stopPropagation();
                                        var t = e.resourceid,
                                            r = e["ds6w:type"] || "VPMReference",
                                            o = e.displayType || "Physical Product";
                                        "CreateAssembly" === a.itemType && (r = "CreateAssembly", o = e.displayType || "Create Assembly");
                                        var l = {
                                            protocol: "3DXContent",
                                            version: "2.1",
                                            source: "X3DSEAR_AP",
                                            widgetId: "preview-388dc6",
                                            data: {
                                                items: [{
                                                    envId: Z.tenant,
                                                    serviceId: "3DSpace",
                                                    contextId: "",
                                                    objectId: t,
                                                    objectType: r,
                                                    displayName: e["ds6w:label"] || e["ds6w:identifier"] || "",
                                                    i3dx: "",
                                                    displayType: o
                                                }]
                                            }
                                        };
                                        n.dataTransfer.effectAllowed = "copyMove", n.dataTransfer.setData("text/plain", JSON.stringify(l))
                                    }(n, e)
                                },
                                onClick: function(e) {
                                    var t;
                                    return (null === (t = n.children) || void 0 === t ? void 0 : t.length) && Nn(n)
                                }
                            }, [(0, l.Q3)(" Tree Indent + Expand/Collapse + Title "), (0, l.Lk)("div", {
                                class: "tree-cell tree-name-cell",
                                style: (0, i.Tr)({
                                    width: e.columnWidths._title ? e.columnWidths._title + "px" : null,
                                    flex: e.columnWidths._title ? "none" : null
                                })
                            }, [(0, l.Lk)("span", {
                                class: "indent-spacer",
                                style: (0, i.Tr)({
                                    width: (p = n.level, (null == p ? 0 : Math.min(20 * p, 200)) + "px")
                                })
                            }, null, 4), null !== (d = n.children) && void 0 !== d && d.length ? ((0, l.uX)(), (0, l.CE)("button", {
                                key: 0,
                                class: "expand-btn",
                                onClick: (0, o.D$)(function(e) {
                                    return Nn(n)
                                }, ["stop"])
                            }, [n.expanded ? ((0, l.uX)(), (0, l.CE)("svg", cn, J(t[42] || (t[42] = [(0, l.Lk)("path", {
                                d: "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                            }, null, -1)])))) : ((0, l.uX)(), (0, l.CE)("svg", un, J(t[43] || (t[43] = [(0, l.Lk)("path", {
                                d: "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
                            }, null, -1)]))))], 8, ln)) : ((0, l.uX)(), (0, l.CE)("span", sn)), (0, l.Lk)("img", {
                                src: Yn(n),
                                class: "type-img",
                                alt: n.displayType
                            }, null, 8, dn), (0, l.Lk)("span", pn, (0, i.v_)(n["ds6w:label"] || n["ds6w:identifier"] || "-"), 1)], 4), (0, l.Q3)(" Dynamic Columns (including Qty, SubQty) "), ((0, l.uX)(!0), (0, l.CE)(l.FK, null, (0, l.pI)(Hn.value, function(t) {
                                return (0, l.uX)(), (0, l.CE)("div", {
                                    key: "".concat(n._uid, "-").concat(t.key),
                                    class: "tree-cell dynamic-cell",
                                    style: (0, i.Tr)({
                                        width: e.columnWidths[t.key] ? e.columnWidths[t.key] + "px" : null,
                                        flex: e.columnWidths[t.key] ? "none" : null
                                    })
                                }, [(0, l.Q3)(" Qty "), "_thumbnail" === t.key ? ((0, l.uX)(), (0, l.CE)(l.FK, {
                                    key: 10
                                }, [(0, l.Q3)(" Thumbnail "), Th.value[n.resourceid] ? ((0, l.uX)(), (0, l.CE)("img", {
                                    key: 0,
                                    class: "bom-thumb-img",
                                    loading: "lazy",
                                    alt: "",
                                    src: Th.value[n.resourceid],
                                    onError: function(e2) {
                                        e2.target.style.display = "none"
                                    }
                                }, null, 8, ["src", "onError"])) : ((0, l.uX)(), (0, l.CE)("span", {
                                    key: 1
                                }, "-"))], 2112)) : "_qty" === t.key ? ((0, l.uX)(), (0, l.CE)("span", {
                                    key: 0,
                                    class: (0, i.C4)({
                                        "qty-multiple": n.quantity > 1
                                    })
                                }, (0, i.v_)(null != n._contQty ? n._contQty + " " + (n._contUom || "") : n.quantity || 1), 3)) : "_subqty" === t.key ? ((0, l.uX)(), (0, l.CE)(l.FK, {
                                    key: 1
                                }, [(0, l.Q3)(" SubQty "), (0, l.Lk)("span", {
                                    class: (0, i.C4)({
                                        "qty-multiple": n.subQuantity > 1
                                    })
                                }, (0, i.v_)(n.subQuantity || 1), 3)], 2112)) : "_totalqty" === t.key ? ((0, l.uX)(), (0, l.CE)(l.FK, {
                                    key: 2
                                }, [(0, l.Q3)(" Total Qty "), (0, l.Lk)("span", {
                                    class: (0, i.C4)({
                                        "qty-multiple": n.totalQuantity > 1
                                    })
                                }, (0, i.v_)(n.totalQuantity || 1), 3)], 2112)) : "_parentProduct" === t.key ? ((0, l.uX)(), (0, l.CE)(l.FK, {
                                    key: 3
                                }, [(0, l.Q3)(" Parent Product "), (0, l.Lk)("span", fn, (0, i.v_)(n._parentProduct || "-"), 1)], 2112)) : "ds6w:type" === t.key ? ((0, l.uX)(), (0, l.CE)(l.FK, {
                                    key: 4
                                }, [(0, l.Q3)(" Type "), (0, l.Lk)("span", vn, [(0, l.bF)(c, {
                                    size: "x-small",
                                    color: et(n.displayType),
                                    variant: "tonal"
                                }, {
                                    default: (0, l.k6)(function() {
                                        return [(0, l.eW)((0, i.v_)(n.displayType || n["ds6w:type"] || "-"), 1)]
                                    }),
                                    _: 2
                                }, 1032, ["color"])])], 2112)) : "ds6wg:revision" === t.key ? ((0, l.uX)(), (0, l.CE)(l.FK, {
                                    key: 5
                                }, [(0, l.Q3)(" Revision "), (0, l.Lk)("span", bn, [(0, l.bF)(c, {
                                    size: "x-small",
                                    color: "purple",
                                    variant: "tonal"
                                }, {
                                    default: (0, l.k6)(function() {
                                        return [(0, l.eW)((0, i.v_)(n["ds6wg:revision"] || "-"), 1)]
                                    }),
                                    _: 2
                                }, 1024)])], 2112)) : t.key.includes("baykar_revision") ? ((0, l.uX)(), (0, l.CE)(l.FK, {
                                    key: 6
                                }, [(0, l.Q3)(" Baykar Revision (özel kural) "), (0, l.Lk)("span", gn, [(0, l.bF)(c, {
                                    size: "x-small",
                                    color: (r = tt(n, t.key), r && "-" !== r ? r.includes(".") ? "orange" : "success" : "grey"),
                                    variant: "tonal"
                                }, {
                                    default: (0, l.k6)(function() {
                                        return [(0, l.eW)((0, i.v_)(tt(n, t.key)), 1)]
                                    }),
                                    _: 2
                                }, 1032, ["color"])])], 2112)) : "ds6w:status" === t.key ? ((0, l.uX)(), (0, l.CE)(l.FK, {
                                    key: 7
                                }, [(0, l.Q3)(" Status "), (0, l.Lk)("span", hn, [(0, l.bF)(c, {
                                    size: "x-small",
                                    color: nt(n["ds6w:status"]),
                                    variant: "flat"
                                }, {
                                    default: (0, l.k6)(function() {
                                        return [(0, l.eW)((0, i.v_)(rt(n["ds6w:status"])), 1)]
                                    }),
                                    _: 2
                                }, 1032, ["color"])])], 2112)) : at(n[t.key]) ? ((0, l.uX)(), (0, l.CE)(l.FK, {
                                    key: 8
                                }, [(0, l.Q3)(" Boolean (True/False) "), (0, l.Lk)("span", mn, [(0, l.bF)(c, {
                                    size: "x-small",
                                    color: ot(n[t.key]),
                                    variant: "tonal"
                                }, {
                                    default: (0, l.k6)(function() {
                                        return [(0, l.eW)((0, i.v_)(lt(n[t.key])), 1)]
                                    }),
                                    _: 2
                                }, 1032, ["color"])])], 2112)) : "_weight" === t.key ? ((0, l.uX)(), (0, l.CE)(l.FK, {
                                    key: 13
                                }, [(0, l.Q3)(" Weight "), (0, l.Lk)("span", {
                                    style: (0, i.Tr)({
                                        fontWeight: "bold",
                                        color: Wt.value[n.resourceid] ? "declared" === Wt.value[n.resourceid].k ? "#0000FF" : "computed" === Wt.value[n.resourceid].k ? "#007a3e" : "error" === Wt.value[n.resourceid].k ? "#ef6c00" : "#FF0000" : "#9e9e9e"
                                    }),
                                    title: Wt.value[n.resourceid] ? "declared" === Wt.value[n.resourceid].k ? "Declared weight" : "computed" === Wt.value[n.resourceid].k ? "Computed weight" : "error" === Wt.value[n.resourceid].k ? "Lookup failed - not a weight verdict (see console)" : "No weight defined" : "Loading\u2026"
                                }, (0, i.v_)(Wt.value[n.resourceid] ? Wt.value[n.resourceid].t : "\u2026"), 5)], 2112)) : "_drawingcheck" === t.key ? ((0, l.uX)(), (0, l.CE)(l.FK, {
                                    key: 12
                                }, [(0, l.Q3)(" Drawing Check "), (0, l.Lk)("span", {
                                    style: (0, i.Tr)({
                                        fontWeight: "bold",
                                        fontSize: "15px",
                                        color: "yes" === Dc.value[n.resourceid] ? "#2e7d32" : "no" === Dc.value[n.resourceid] ? "#c62828" : "err" === Dc.value[n.resourceid] ? "#ef6c00" : "#9e9e9e"
                                    }),
                                    title: "yes" === Dc.value[n.resourceid] ? "Drawing attached" : "no" === Dc.value[n.resourceid] ? "No drawing" : "err" === Dc.value[n.resourceid] ? "Check failed - not a drawing verdict (" + (__dcErrWhy[__dcEngOf[n.resourceid] || n.resourceid] || "see console") + ")" : "na" === Dc.value[n.resourceid] ? "Not applicable (standard / tooling / phantom)" : "Checking…"
                                }, (0, i.v_)("yes" === Dc.value[n.resourceid] ? "✓" : "no" === Dc.value[n.resourceid] ? "✗" : "err" === Dc.value[n.resourceid] ? "!" : "na" === Dc.value[n.resourceid] ? "–" : "…"), 5)], 2112)) : ((0, l.uX)(), (0, l.CE)(l.FK, {
                                    key: 9
                                }, [(0, l.Q3)(" Other "), (0, l.Lk)("span", yn, (0, i.v_)(it(n[t.key], t.key)), 1)], 2112))], 4);
                                var r
                            }), 128))], 42, on)) : (0, l.Q3)("v-if", !0)], 64)
                        }), 128))]), (0, l.Q3)(" Empty State "), Xn.value.length ? (0, l.Q3)("v-if", !0) : ((0, l.uX)(), (0, l.CE)("div", xn, J(t[44] || (t[44] = [(0, l.Lk)("svg", {
                            class: "empty-icon",
                            viewBox: "0 0 24 24"
                        }, [(0, l.Lk)("path", {
                            d: "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M7,10L12,15L17,10H7Z",
                            fill: "#bdbdbd"
                        })], -1), (0, l.Lk)("p", null, "No BOM data available", -1)]))))])])])
                    }
                }
            };
            var wn = t(5072),
                Cn = t.n(wn),
                Ln = t(7825),
                En = t.n(Ln),
                Sn = t(7659),
                Pn = t.n(Sn),
                _n = t(2675),
                Mn = t.n(_n),
                Tn = t(540),
                An = t.n(Tn),
                jn = t(1113),
                On = t.n(jn),
                Vn = t(9005),
                Dn = {};
            Dn.styleTagTransform = On(), Dn.setAttributes = Mn(), Dn.insert = Pn().bind(null, "head"), Dn.domAPI = En(), Dn.insertStyleElement = An(), Cn()(Vn.A, Dn), Vn.A && Vn.A.locals && Vn.A.locals;
            var Rn = t(6262);
            const Hn = (0, Rn.A)(kn, [
                ["__scopeId", "data-v-6ecbd65a"]
            ]);

            function Fn(e) {
                return function(e) {
                    if (Array.isArray(e)) return Bn(e)
                }(e) || function(e) {
                    if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
                }(e) || In(e) || function() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function In(e, n) {
                if (e) {
                    if ("string" == typeof e) return Bn(e, n);
                    var t = {}.toString.call(e).slice(8, -1);
                    return "Object" === t && e.constructor && (t = e.constructor.name), "Map" === t || "Set" === t ? Array.from(e) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? Bn(e, n) : void 0
                }
            }

            function Bn(e, n) {
                (null == n || n > e.length) && (n = e.length);
                for (var t = 0, r = Array(n); t < n; t++) r[t] = e[t];
                return r
            }
            var zn = {
                    class: "two-column-layout"
                },
                Qn = {
                    class: "selection-panel"
                },
                Wn = {
                    class: "section-header"
                },
                Xn = {
                    class: "columns-grid"
                },
                Kn = ["draggable", "onClick", "onDragstart"],
                qn = {
                    class: "check-icon"
                },
                Nn = {
                    key: 0,
                    viewBox: "0 0 24 24"
                },
                Gn = ["title"],
                Un = {
                    class: "section-header mt-3"
                },
                Zn = {
                    key: 0,
                    class: "columns-grid"
                },
                $n = ["draggable", "onClick", "onDragstart"],
                Jn = {
                    class: "check-icon"
                },
                Yn = {
                    key: 0,
                    viewBox: "0 0 24 24"
                },
                et = ["title"],
                nt = {
                    key: 1,
                    class: "empty-custom"
                },
                tt = {
                    class: "section-header mt-3"
                },
                rt = {
                    key: 2,
                    class: "columns-grid"
                },
                at = ["draggable", "onClick", "onDragstart"],
                ot = {
                    class: "check-icon"
                },
                lt = {
                    key: 0,
                    viewBox: "0 0 24 24"
                },
                it = ["title"],
                ct = {
                    key: 3,
                    class: "empty-custom"
                },
                ut = {
                    class: "quick-actions mt-3"
                },
                st = {
                    class: "order-panel"
                },
                dt = ["onDragstart", "onDragover", "onDrop"],
                pt = {
                    class: "order-label"
                },
                ft = ["onClick"],
                vt = {
                    class: "text-caption text-grey"
                };
            const bt = {
                __name: "ColumnSelector",
                props: {
                    show: {
                        type: Boolean,
                        default: !1
                    },
                    availableColumns: {
                        type: Array,
                        default: function() {
                            return []
                        }
                    },
                    selectedColumns: {
                        type: Array,
                        default: function() {
                            return []
                        }
                    }
                },
                emits: ["update:show", "update:selected-columns"],
                setup: function(e, n) {
                    var t = n.emit,
                        r = e,
                        a = t,
                        u = (0, c.KR)(Fn(r.selectedColumns)),
                        s = (0, c.KR)(null),
                        d = (0, c.KR)(null),
                        p = (0, c.KR)(!1),
                        f = (0, c.KR)(null),
                        v = (0, c.KR)(!1),
                        b = (0, l.EW)({
                            get: function() {
                                return r.show
                            },
                            set: function(e) {
                                return a("update:show", e)
                            }
                        }),
                        g = (0, l.EW)(function() {
                            return r.availableColumns.filter(function(e) {
                                return "ootb" === e.category
                            })
                        }),
                        h = (0, l.EW)(function() {
                            return r.availableColumns.filter(function(e) {
                                return "ebom_custom" === e.category || "shared_custom" === e.category
                            })
                        }),
                        m = (0, l.EW)(function() {
                            return r.availableColumns.filter(function(e) {
                                return "mbom_custom" === e.category || "shared_custom" === e.category
                            })
                        }),
                        y = (0, l.EW)(function() {
                            return h.value.map(function(e) {
                                return e.key
                            })
                        }),
                        x = (0, l.EW)(function() {
                            return m.value.map(function(e) {
                                return e.key
                            })
                        }),
                        k = (0, l.EW)(function() {
                            var e = y.value;
                            return e.length > 0 && e.every(function(e) {
                                return u.value.includes(e)
                            })
                        }),
                        w = (0, l.EW)(function() {
                            var e = y.value;
                            if (0 === e.length) return !1;
                            var n = e.filter(function(e) {
                                return u.value.includes(e)
                            }).length;
                            return n > 0 && n < e.length
                        }),
                        C = (0, l.EW)(function() {
                            var e = x.value;
                            return e.length > 0 && e.every(function(e) {
                                return u.value.includes(e)
                            })
                        }),
                        L = (0, l.EW)(function() {
                            var e = x.value;
                            if (0 === e.length) return !1;
                            var n = e.filter(function(e) {
                                return u.value.includes(e)
                            }).length;
                            return n > 0 && n < e.length
                        }),
                        E = ((0, l.EW)(function() {
                            return r.availableColumns.filter(function(e) {
                                return "ebom_custom" === e.category || "mbom_custom" === e.category || "shared_custom" === e.category || "custom" === e.category
                            })
                        }), (0, l.EW)(function() {
                            return u.value.filter(function(e) {
                                return "ds6w:label" !== e
                            })
                        }));
                    (0, l.wB)(function() {
                        return r.selectedColumns
                    }, function(e) {
                        u.value = Fn(e)
                    }, {
                        immediate: !0
                    }), (0, l.wB)(function() {
                        return r.show
                    }, function(e) {
                        e && (u.value = Fn(r.selectedColumns))
                    });
                    var S = function(e) {
                            return u.value.includes(e)
                        },
                        P = function(e) {
                            var n = r.availableColumns.find(function(n) {
                                return n.key === e
                            });
                            return (null == n ? void 0 : n.label) || e.split(":").pop()
                        },
                        _ = function(e) {
                            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 15;
                            return e ? e.length > n ? e.substring(0, n) + "..." : e : "-"
                        },
                        M = function(e, n) {
                            n ? u.value.includes(e) || u.value.push(e) : u.value = u.value.filter(function(n) {
                                return n !== e
                            })
                        },
                        T = function(e) {
                            var n = y.value;
                            if (0 !== n.length)
                                if (e) {
                                    var t = n.filter(function(e) {
                                        return !u.value.includes(e)
                                    });
                                    u.value = [].concat(Fn(u.value), Fn(t))
                                } else u.value = u.value.filter(function(e) {
                                    return !n.includes(e)
                                })
                        },
                        A = function(e) {
                            var n = x.value;
                            if (0 !== n.length)
                                if (e) {
                                    var t = n.filter(function(e) {
                                        return !u.value.includes(e)
                                    });
                                    u.value = [].concat(Fn(u.value), Fn(t))
                                } else u.value = u.value.filter(function(e) {
                                    return !n.includes(e)
                                })
                        },
                        j = function() {
                            s.value = null, d.value = null
                        },
                        O = function(e, n) {
                            S(e) || (p.value = !0, f.value = e, n.dataTransfer.effectAllowed = "copy", n.dataTransfer.setData("type", "add"), n.dataTransfer.setData("key", e))
                        },
                        V = function() {
                            D()
                        },
                        D = function() {
                            p.value = !1, f.value = null, v.value = !1, d.value = null
                        },
                        R = function(e) {
                            p.value && (v.value = !0, e.dataTransfer.dropEffect = "copy")
                        },
                        H = function() {
                            v.value = !1
                        },
                        F = function() {
                            if (p.value && f.value) {
                                var e = f.value;
                                u.value.includes(e) || u.value.push(e)
                            }
                            D()
                        },
                        I = function() {
                            var e = u.value.filter(function(e) {
                                    return "ds6w:label" !== e
                                }),
                                n = r.availableColumns.map(function(e) {
                                    return e.key
                                }).filter(function(n) {
                                    return "ds6w:label" !== n && !e.includes(n)
                                });
                            u.value = ["ds6w:label"].concat(Fn(e), Fn(n))
                        },
                        B = function() {
                            var e = g.value.map(function(e) {
                                    return e.key
                                }),
                                n = u.value.filter(function(n) {
                                    return e.includes(n) && "ds6w:label" !== n
                                }),
                                t = e.filter(function(e) {
                                    return "ds6w:label" !== e && !n.includes(e)
                                });
                            u.value = ["ds6w:label"].concat(Fn(n), Fn(t))
                        },
                        z = function() {
                            u.value = r.availableColumns.filter(function(e) {
                                return e.required
                            }).map(function(e) {
                                return e.key
                            })
                        },
                        Q = function() {
                            b.value = !1
                        },
                        W = function() {
                            a("update:selected-columns", Fn(u.value)), Q()
                        };
                    return function(e, n) {
                        var t = (0, l.g2)("v-spacer"),
                            r = (0, l.g2)("v-btn"),
                            a = (0, l.g2)("v-card-title"),
                            c = (0, l.g2)("v-divider"),
                            y = (0, l.g2)("v-chip"),
                            x = (0, l.g2)("v-checkbox"),
                            X = (0, l.g2)("v-card-text"),
                            K = (0, l.g2)("v-card-actions"),
                            q = (0, l.g2)("v-card"),
                            N = (0, l.g2)("v-dialog");
                        return (0, l.uX)(), (0, l.Wv)(N, {
                            modelValue: b.value,
                            "onUpdate:modelValue": n[0] || (n[0] = function(e) {
                                return b.value = e
                            }),
                            "max-width": "700",
                            persistent: ""
                        }, {
                            default: (0, l.k6)(function() {
                                return [(0, l.bF)(q, null, {
                                    default: (0, l.k6)(function() {
                                        return [(0, l.bF)(a, {
                                            class: "d-flex align-center"
                                        }, {
                                            default: (0, l.k6)(function() {
                                                return [n[2] || (n[2] = (0, l.Lk)("svg", {
                                                    class: "title-icon mr-2",
                                                    viewBox: "0 0 24 24"
                                                }, [(0, l.Lk)("path", {
                                                    d: "M3,4H7V8H3V4M9,5V7H21V5H9M3,10H7V14H3V10M9,11V13H21V11H9M3,16H7V20H3V16M9,17V19H21V17H9",
                                                    fill: "currentColor"
                                                })], -1)), n[3] || (n[3] = (0, l.Lk)("span", null, "Column Selection and Ordering", -1)), (0, l.bF)(t), (0, l.bF)(r, {
                                                    icon: "",
                                                    size: "small",
                                                    variant: "text",
                                                    onClick: Q
                                                }, {
                                                    default: (0, l.k6)(function() {
                                                        return Fn(n[1] || (n[1] = [(0, l.Lk)("svg", {
                                                            class: "close-icon",
                                                            viewBox: "0 0 24 24"
                                                        }, [(0, l.Lk)("path", {
                                                            d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",
                                                            fill: "currentColor"
                                                        })], -1)]))
                                                    }),
                                                    _: 1
                                                })]
                                            }),
                                            _: 1
                                        }), (0, l.bF)(c), (0, l.bF)(X, {
                                            class: "py-3 dialog-content"
                                        }, {
                                            default: (0, l.k6)(function() {
                                                return [(0, l.Lk)("div", zn, [(0, l.Q3)(" Sol Panel: Sütun Seçimi "), (0, l.Lk)("div", Qn, [n[15] || (n[15] = (0, l.Lk)("div", {
                                                    class: "panel-title"
                                                }, "Available Columns", -1)), (0, l.Q3)(" OOTB Attributes "), (0, l.Lk)("div", Wn, [n[4] || (n[4] = (0, l.Lk)("span", null, "Standard", -1)), (0, l.bF)(y, {
                                                    size: "x-small"
                                                }, {
                                                    default: (0, l.k6)(function() {
                                                        return [(0, l.eW)((0, i.v_)(g.value.length), 1)]
                                                    }),
                                                    _: 1
                                                })]), (0, l.Lk)("div", Xn, [((0, l.uX)(!0), (0, l.CE)(l.FK, null, (0, l.pI)(g.value, function(e) {
                                                    return (0, l.uX)(), (0, l.CE)("div", {
                                                        key: e.key,
                                                        class: (0, i.C4)(["column-item", {
                                                            selected: S(e.key),
                                                            required: e.required,
                                                            disabled: e.required
                                                        }]),
                                                        draggable: !e.required && !S(e.key),
                                                        onClick: function(n) {
                                                            return !e.required && M(e.key, !S(e.key))
                                                        },
                                                        onDragstart: function(n) {
                                                            return O(e.key, n)
                                                        },
                                                        onDragend: V
                                                    }, [(0, l.Lk)("span", qn, [S(e.key) ? ((0, l.uX)(), (0, l.CE)("svg", Nn, Fn(n[5] || (n[5] = [(0, l.Lk)("path", {
                                                        d: "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z",
                                                        fill: "currentColor"
                                                    }, null, -1)])))) : (0, l.Q3)("v-if", !0)]), (0, l.Lk)("span", {
                                                        class: "column-label",
                                                        title: e.label
                                                    }, (0, i.v_)(_(e.label)), 9, Gn)], 42, Kn)
                                                }), 128))]), (0, l.Q3)(" EBOM Custom Attributes "), (0, l.Lk)("div", Un, [n[6] || (n[6] = (0, l.Lk)("span", null, "EBOM Custom", -1)), (0, l.bF)(y, {
                                                    size: "x-small",
                                                    color: "blue"
                                                }, {
                                                    default: (0, l.k6)(function() {
                                                        return [(0, l.eW)((0, i.v_)(h.value.length), 1)]
                                                    }),
                                                    _: 1
                                                }), (0, l.bF)(x, {
                                                    "model-value": k.value,
                                                    indeterminate: w.value,
                                                    density: "compact",
                                                    "hide-details": "",
                                                    color: "blue",
                                                    class: "select-all-checkbox",
                                                    "onUpdate:modelValue": T
                                                }, null, 8, ["model-value", "indeterminate"])]), h.value.length > 0 ? ((0, l.uX)(), (0, l.CE)("div", Zn, [((0, l.uX)(!0), (0, l.CE)(l.FK, null, (0, l.pI)(h.value, function(e) {
                                                    return (0, l.uX)(), (0, l.CE)("div", {
                                                        key: e.key,
                                                        class: (0, i.C4)(["column-item custom ebom", {
                                                            selected: S(e.key)
                                                        }]),
                                                        draggable: !S(e.key),
                                                        onClick: function(n) {
                                                            return M(e.key, !S(e.key))
                                                        },
                                                        onDragstart: function(n) {
                                                            return O(e.key, n)
                                                        },
                                                        onDragend: V
                                                    }, [(0, l.Lk)("span", Jn, [S(e.key) ? ((0, l.uX)(), (0, l.CE)("svg", Yn, Fn(n[7] || (n[7] = [(0, l.Lk)("path", {
                                                        d: "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z",
                                                        fill: "currentColor"
                                                    }, null, -1)])))) : (0, l.Q3)("v-if", !0)]), (0, l.Lk)("span", {
                                                        class: "column-label",
                                                        title: e.label
                                                    }, (0, i.v_)(_(e.label)), 9, et)], 42, $n)
                                                }), 128))])) : ((0, l.uX)(), (0, l.CE)("div", nt, Fn(n[8] || (n[8] = [(0, l.Lk)("span", {
                                                    class: "text-caption text-grey"
                                                }, "No EBOM custom attributes", -1)])))), (0, l.Q3)(" MBOM Custom Attributes "), (0, l.Lk)("div", tt, [n[9] || (n[9] = (0, l.Lk)("span", null, "MBOM Custom", -1)), (0, l.bF)(y, {
                                                    size: "x-small",
                                                    color: "purple"
                                                }, {
                                                    default: (0, l.k6)(function() {
                                                        return [(0, l.eW)((0, i.v_)(m.value.length), 1)]
                                                    }),
                                                    _: 1
                                                }), (0, l.bF)(x, {
                                                    "model-value": C.value,
                                                    indeterminate: L.value,
                                                    density: "compact",
                                                    "hide-details": "",
                                                    color: "purple",
                                                    class: "select-all-checkbox",
                                                    "onUpdate:modelValue": A
                                                }, null, 8, ["model-value", "indeterminate"])]), m.value.length > 0 ? ((0, l.uX)(), (0, l.CE)("div", rt, [((0, l.uX)(!0), (0, l.CE)(l.FK, null, (0, l.pI)(m.value, function(e) {
                                                    return (0, l.uX)(), (0, l.CE)("div", {
                                                        key: e.key,
                                                        class: (0, i.C4)(["column-item custom mbom", {
                                                            selected: S(e.key)
                                                        }]),
                                                        draggable: !S(e.key),
                                                        onClick: function(n) {
                                                            return M(e.key, !S(e.key))
                                                        },
                                                        onDragstart: function(n) {
                                                            return O(e.key, n)
                                                        },
                                                        onDragend: V
                                                    }, [(0, l.Lk)("span", ot, [S(e.key) ? ((0, l.uX)(), (0, l.CE)("svg", lt, Fn(n[10] || (n[10] = [(0, l.Lk)("path", {
                                                        d: "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z",
                                                        fill: "currentColor"
                                                    }, null, -1)])))) : (0, l.Q3)("v-if", !0)]), (0, l.Lk)("span", {
                                                        class: "column-label",
                                                        title: e.label
                                                    }, (0, i.v_)(_(e.label)), 9, it)], 42, at)
                                                }), 128))])) : ((0, l.uX)(), (0, l.CE)("div", ct, Fn(n[11] || (n[11] = [(0, l.Lk)("span", {
                                                    class: "text-caption text-grey"
                                                }, "No MBOM custom attributes", -1)])))), (0, l.Q3)(" Quick Actions "), (0, l.Lk)("div", ut, [(0, l.bF)(r, {
                                                    size: "x-small",
                                                    variant: "text",
                                                    onClick: B
                                                }, {
                                                    default: (0, l.k6)(function() {
                                                        return Fn(n[12] || (n[12] = [(0, l.eW)("OOTB", -1)]))
                                                    }),
                                                    _: 1
                                                }), (0, l.bF)(r, {
                                                    size: "x-small",
                                                    variant: "text",
                                                    onClick: I
                                                }, {
                                                    default: (0, l.k6)(function() {
                                                        return Fn(n[13] || (n[13] = [(0, l.eW)("All", -1)]))
                                                    }),
                                                    _: 1
                                                }), (0, l.bF)(r, {
                                                    size: "x-small",
                                                    variant: "text",
                                                    onClick: z
                                                }, {
                                                    default: (0, l.k6)(function() {
                                                        return Fn(n[14] || (n[14] = [(0, l.eW)("Min", -1)]))
                                                    }),
                                                    _: 1
                                                })])]), (0, l.Q3)(" Sağ Panel: Sıralama "), (0, l.Lk)("div", st, [n[19] || (n[19] = (0, l.Lk)("div", {
                                                    class: "panel-title"
                                                }, "Ordering", -1)), (0, l.Lk)("div", {
                                                    class: (0, i.C4)(["order-list", {
                                                        "drop-zone-active": p.value
                                                    }]),
                                                    onDragover: (0, o.D$)(R, ["prevent"]),
                                                    onDragleave: H,
                                                    onDrop: F
                                                }, [(0, l.Q3)(" Title - Sabit "), n[18] || (n[18] = (0, l.Lk)("div", {
                                                    class: "order-item fixed"
                                                }, [(0, l.Lk)("span", {
                                                    class: "order-handle disabled"
                                                }, [(0, l.Lk)("svg", {
                                                    viewBox: "0 0 24 24"
                                                }, [(0, l.Lk)("path", {
                                                    d: "M9,3H11V5H9V3M13,3H15V5H13V3M9,7H11V9H9V7M13,7H15V9H13V7M9,11H11V13H9V11M13,11H15V13H13V11M9,15H11V17H9V15M13,15H15V17H13V15M9,19H11V21H9V19M13,19H15V21H13V19Z",
                                                    fill: "currentColor"
                                                })])]), (0, l.Lk)("span", {
                                                    class: "order-label"
                                                }, "Title"), (0, l.Lk)("span", {
                                                    class: "fixed-badge"
                                                }, "Fixed")], -1)), (0, l.Q3)(" Sıralanabilir Sütunlar "), ((0, l.uX)(!0), (0, l.CE)(l.FK, null, (0, l.pI)(E.value, function(e, t) {
                                                    return (0, l.uX)(), (0, l.CE)("div", {
                                                        key: e,
                                                        class: (0, i.C4)(["order-item", {
                                                            dragging: s.value === t,
                                                            "drag-over": d.value === t
                                                        }]),
                                                        draggable: "true",
                                                        onDragstart: function(e) {
                                                            return function(e, n) {
                                                                s.value = e, n.dataTransfer.effectAllowed = "move", n.dataTransfer.setData("type", "reorder")
                                                            }(t, e)
                                                        },
                                                        onDragend: j,
                                                        onDragover: (0, o.D$)(function(e) {
                                                            return function(e, n) {
                                                                d.value = e, n.dataTransfer.dropEffect = "move"
                                                            }(t, e)
                                                        }, ["prevent"]),
                                                        onDrop: (0, o.D$)(function(e) {
                                                            return function(e) {
                                                                if (p.value && f.value) {
                                                                    var n = f.value;
                                                                    if (!u.value.includes(n)) {
                                                                        var t = u.value.filter(function(e) {
                                                                            return "ds6w:label" !== e
                                                                        });
                                                                        t.splice(e, 0, n), u.value = ["ds6w:label"].concat(Fn(t))
                                                                    }
                                                                    D()
                                                                } else if (null !== s.value && s.value !== e) {
                                                                    var r = u.value.filter(function(e) {
                                                                            return "ds6w:label" !== e
                                                                        }),
                                                                        a = (o = r.splice(s.value, 1), l = 1, function(e) {
                                                                            if (Array.isArray(e)) return e
                                                                        }(o) || function(e, n) {
                                                                            var t = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                                                                            if (null != t) {
                                                                                var r, a, o, l, i = [],
                                                                                    c = !0,
                                                                                    u = !1;
                                                                                try {
                                                                                    if (o = (t = t.call(e)).next, 0 === n) {
                                                                                        if (Object(t) !== t) return;
                                                                                        c = !1
                                                                                    } else
                                                                                        for (; !(c = (r = o.call(t)).done) && (i.push(r.value), i.length !== n); c = !0);
                                                                                } catch (e) {
                                                                                    u = !0, a = e
                                                                                } finally {
                                                                                    try {
                                                                                        if (!c && null != t.return && (l = t.return(), Object(l) !== l)) return
                                                                                    } finally {
                                                                                        if (u) throw a
                                                                                    }
                                                                                }
                                                                                return i
                                                                            }
                                                                        }(o, l) || In(o, l) || function() {
                                                                            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                                                                        }())[0];
                                                                    r.splice(e, 0, a), u.value = ["ds6w:label"].concat(Fn(r)), s.value = null, d.value = null
                                                                }
                                                                var o, l
                                                            }(t)
                                                        }, ["stop"])
                                                    }, [n[17] || (n[17] = (0, l.Lk)("span", {
                                                        class: "order-handle"
                                                    }, [(0, l.Lk)("svg", {
                                                        viewBox: "0 0 24 24"
                                                    }, [(0, l.Lk)("path", {
                                                        d: "M9,3H11V5H9V3M13,3H15V5H13V3M9,7H11V9H9V7M13,7H15V9H13V7M9,11H11V13H9V11M13,11H15V13H13V11M9,15H11V17H9V15M13,15H15V17H13V15M9,19H11V21H9V19M13,19H15V21H13V21Z",
                                                        fill: "currentColor"
                                                    })])], -1)), (0, l.Lk)("span", pt, (0, i.v_)(P(e)), 1), (0, l.Lk)("button", {
                                                        class: "remove-btn",
                                                        onClick: (0, o.D$)(function(n) {
                                                            return M(e, !1)
                                                        }, ["stop"])
                                                    }, Fn(n[16] || (n[16] = [(0, l.Lk)("svg", {
                                                        viewBox: "0 0 24 24"
                                                    }, [(0, l.Lk)("path", {
                                                        d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",
                                                        fill: "currentColor"
                                                    })], -1)])), 8, ft)], 42, dt)
                                                }), 128)), (0, l.Q3)(" Drop zone placeholder "), 0 === E.value.length || p.value ? ((0, l.uX)(), (0, l.CE)("div", {
                                                    key: 0,
                                                    class: (0, i.C4)(["drop-placeholder", {
                                                        active: v.value
                                                    }])
                                                }, [(0, l.Lk)("span", null, (0, i.v_)(0 === E.value.length ? "Select columns or drag here" : "Drop here"), 1)], 2)) : (0, l.Q3)("v-if", !0)], 34)])])]
                                            }),
                                            _: 1
                                        }), (0, l.bF)(c), (0, l.bF)(K, {
                                            class: "px-4 py-3"
                                        }, {
                                            default: (0, l.k6)(function() {
                                                return [(0, l.Lk)("span", vt, (0, i.v_)(u.value.length) + " columns selected ", 1), (0, l.bF)(t), (0, l.bF)(r, {
                                                    variant: "text",
                                                    onClick: Q
                                                }, {
                                                    default: (0, l.k6)(function() {
                                                        return Fn(n[20] || (n[20] = [(0, l.eW)("Cancel", -1)]))
                                                    }),
                                                    _: 1
                                                }), (0, l.bF)(r, {
                                                    color: "primary",
                                                    variant: "flat",
                                                    onClick: W
                                                }, {
                                                    default: (0, l.k6)(function() {
                                                        return Fn(n[21] || (n[21] = [(0, l.eW)(" Apply ", -1)]))
                                                    }),
                                                    _: 1
                                                })]
                                            }),
                                            _: 1
                                        })]
                                    }),
                                    _: 1
                                })]
                            }),
                            _: 1
                        }, 8, ["modelValue"])
                    }
                }
            };
            var gt = t(9028),
                ht = {};
            ht.styleTagTransform = On(), ht.setAttributes = Mn(), ht.insert = Pn().bind(null, "head"), ht.domAPI = En(), ht.insertStyleElement = An(), Cn()(gt.A, ht), gt.A && gt.A.locals && gt.A.locals;
            const mt = (0, Rn.A)(bt, [
                ["__scopeId", "data-v-3b880ce9"]
            ]);

            function yt(e) {
                return yt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, yt(e)
            }

            function xt(e, n) {
                var t = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    n && (r = r.filter(function(n) {
                        return Object.getOwnPropertyDescriptor(e, n).enumerable
                    })), t.push.apply(t, r)
                }
                return t
            }

            function kt(e) {
                for (var n = 1; n < arguments.length; n++) {
                    var t = null != arguments[n] ? arguments[n] : {};
                    n % 2 ? xt(Object(t), !0).forEach(function(n) {
                        wt(e, n, t[n])
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : xt(Object(t)).forEach(function(n) {
                        Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n))
                    })
                }
                return e
            }

            function wt(e, n, t) {
                return (n = function(e) {
                    var n = function(e) {
                        if ("object" != yt(e) || !e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 !== n) {
                            var t = n.call(e, "string");
                            if ("object" != yt(t)) return t;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == yt(n) ? n : n + ""
                }(n)) in e ? Object.defineProperty(e, n, {
                    value: t,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[n] = t, e
            }

            function Ct(e, n) {
                var t = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                if (!t) {
                    if (Array.isArray(e) || (t = Tt(e)) || n && e && "number" == typeof e.length) {
                        t && (e = t);
                        var r = 0,
                            a = function() {};
                        return {
                            s: a,
                            n: function() {
                                return r >= e.length ? {
                                    done: !0
                                } : {
                                    done: !1,
                                    value: e[r++]
                                }
                            },
                            e: function(e) {
                                throw e
                            },
                            f: a
                        }
                    }
                    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }
                var o, l = !0,
                    i = !1;
                return {
                    s: function() {
                        t = t.call(e)
                    },
                    n: function() {
                        var e = t.next();
                        return l = e.done, e
                    },
                    e: function(e) {
                        i = !0, o = e
                    },
                    f: function() {
                        try {
                            l || null == t.return || t.return()
                        } finally {
                            if (i) throw o
                        }
                    }
                }
            }

            function Lt() {
                var e, n, t = "function" == typeof Symbol ? Symbol : {},
                    r = t.iterator || "@@iterator",
                    a = t.toStringTag || "@@toStringTag";

                function o(t, r, a, o) {
                    var c = r && r.prototype instanceof i ? r : i,
                        u = Object.create(c.prototype);
                    return Et(u, "_invoke", function(t, r, a) {
                        var o, i, c, u = 0,
                            s = a || [],
                            d = !1,
                            p = {
                                p: 0,
                                n: 0,
                                v: e,
                                a: f,
                                f: f.bind(e, 4),
                                d: function(n, t) {
                                    return o = n, i = 0, c = e, p.n = t, l
                                }
                            };

                        function f(t, r) {
                            for (i = t, c = r, n = 0; !d && u && !a && n < s.length; n++) {
                                var a, o = s[n],
                                    f = p.p,
                                    v = o[2];
                                t > 3 ? (a = v === r) && (c = o[(i = o[4]) ? 5 : (i = 3, 3)], o[4] = o[5] = e) : o[0] <= f && ((a = t < 2 && f < o[1]) ? (i = 0, p.v = r, p.n = o[1]) : f < v && (a = t < 3 || o[0] > r || r > v) && (o[4] = t, o[5] = r, p.n = v, i = 0))
                            }
                            if (a || t > 1) return l;
                            throw d = !0, r
                        }
                        return function(a, s, v) {
                            if (u > 1) throw TypeError("Generator is already running");
                            for (d && 1 === s && f(s, v), i = s, c = v;
                                (n = i < 2 ? e : c) || !d;) {
                                o || (i ? i < 3 ? (i > 1 && (p.n = -1), f(i, c)) : p.n = c : p.v = c);
                                try {
                                    if (u = 2, o) {
                                        if (i || (a = "next"), n = o[a]) {
                                            if (!(n = n.call(o, c))) throw TypeError("iterator result is not an object");
                                            if (!n.done) return n;
                                            c = n.value, i < 2 && (i = 0)
                                        } else 1 === i && (n = o.return) && n.call(o), i < 2 && (c = TypeError("The iterator does not provide a '" + a + "' method"), i = 1);
                                        o = e
                                    } else if ((n = (d = p.n < 0) ? c : t.call(r, p)) !== l) break
                                } catch (n) {
                                    o = e, i = 1, c = n
                                } finally {
                                    u = 1
                                }
                            }
                            return {
                                value: n,
                                done: d
                            }
                        }
                    }(t, a, o), !0), u
                }
                var l = {};

                function i() {}

                function c() {}

                function u() {}
                n = Object.getPrototypeOf;
                var s = [][r] ? n(n([][r]())) : (Et(n = {}, r, function() {
                        return this
                    }), n),
                    d = u.prototype = i.prototype = Object.create(s);

                function p(e) {
                    return Object.setPrototypeOf ? Object.setPrototypeOf(e, u) : (e.__proto__ = u, Et(e, a, "GeneratorFunction")), e.prototype = Object.create(d), e
                }
                return c.prototype = u, Et(d, "constructor", u), Et(u, "constructor", c), c.displayName = "GeneratorFunction", Et(u, a, "GeneratorFunction"), Et(d), Et(d, a, "Generator"), Et(d, r, function() {
                    return this
                }), Et(d, "toString", function() {
                    return "[object Generator]"
                }), (Lt = function() {
                    return {
                        w: o,
                        m: p
                    }
                })()
            }

            function Et(e, n, t, r) {
                var a = Object.defineProperty;
                try {
                    a({}, "", {})
                } catch (e) {
                    a = 0
                }
                Et = function(e, n, t, r) {
                    function o(n, t) {
                        Et(e, n, function(e) {
                            return this._invoke(n, t, e)
                        })
                    }
                    n ? a ? a(e, n, {
                        value: t,
                        enumerable: !r,
                        configurable: !r,
                        writable: !r
                    }) : e[n] = t : (o("next", 0), o("throw", 1), o("return", 2))
                }, Et(e, n, t, r)
            }

            function St(e, n) {
                return function(e) {
                    if (Array.isArray(e)) return e
                }(e) || function(e, n) {
                    var t = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                    if (null != t) {
                        var r, a, o, l, i = [],
                            c = !0,
                            u = !1;
                        try {
                            if (o = (t = t.call(e)).next, 0 === n) {
                                if (Object(t) !== t) return;
                                c = !1
                            } else
                                for (; !(c = (r = o.call(t)).done) && (i.push(r.value), i.length !== n); c = !0);
                        } catch (e) {
                            u = !0, a = e
                        } finally {
                            try {
                                if (!c && null != t.return && (l = t.return(), Object(l) !== l)) return
                            } finally {
                                if (u) throw a
                            }
                        }
                        return i
                    }
                }(e, n) || Tt(e, n) || function() {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function Pt(e, n, t, r, a, o, l) {
                try {
                    var i = e[o](l),
                        c = i.value
                } catch (e) {
                    return void t(e)
                }
                i.done ? n(c) : Promise.resolve(c).then(r, a)
            }

            function _t(e) {
                return function() {
                    var n = this,
                        t = arguments;
                    return new Promise(function(r, a) {
                        var o = e.apply(n, t);

                        function l(e) {
                            Pt(o, r, a, l, i, "next", e)
                        }

                        function i(e) {
                            Pt(o, r, a, l, i, "throw", e)
                        }
                        l(void 0)
                    })
                }
            }

            function Mt(e) {
                return function(e) {
                    if (Array.isArray(e)) return At(e)
                }(e) || function(e) {
                    if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
                }(e) || Tt(e) || function() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function Tt(e, n) {
                if (e) {
                    if ("string" == typeof e) return At(e, n);
                    var t = {}.toString.call(e).slice(8, -1);
                    return "Object" === t && e.constructor && (t = e.constructor.name), "Map" === t || "Set" === t ? Array.from(e) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? At(e, n) : void 0
                }
            }

            function At(e, n) {
                (null == n || n > e.length) && (n = e.length);
                for (var t = 0, r = Array(n); t < n; t++) r[t] = e[t];
                return r
            }
            var jt = ["src"],
                Ot = {
                    key: 0,
                    class: "banner-drop-hint"
                },
                Vt = {
                    class: "widget-content"
                },
                Dt = {
                    key: 0,
                    class: "warning-toast"
                },
                Rt = {
                    class: "text-body-2 text-grey mb-3"
                },
                Ht = {
                    class: "item-list"
                },
                Ft = ["onClick"],
                It = ["src"],
                Bt = {
                    class: "item-info"
                },
                zt = {
                    class: "item-name"
                },
                Qt = {
                    class: "item-type"
                },
                Wt = {
                    class: "placeholder-wrapper"
                },
                Xt = {
                    key: 0,
                    class: "loading-overlay"
                },
                Kt = {
                    key: 0,
                    class: "loading-message"
                },
                qt = {
                    class: "drop-hint-overlay"
                },
                Nt = {
                    class: "hint-split-container"
                },
                Gt = {
                    class: "panel-header"
                },
                Ut = {
                    key: 0,
                    class: "recent-list"
                },
                Zt = ["onClick"],
                $t = ["src"],
                Jt = {
                    class: "recent-name"
                },
                Yt = {
                    key: 1,
                    class: "no-recent"
                },
                er = {
                    class: "hint-panel drop-panel"
                },
                nr = {
                    class: "drop-icons"
                },
                tr = ["src"],
                rr = ["src"],
                ar = {
                    class: "placeholder-table"
                },
                or = {
                    class: "placeholder-body"
                },
                lr = {
                    class: "placeholder-cell title-cell"
                },
                ir = {
                    key: 0,
                    class: "placeholder-expand"
                },
                cr = {
                    key: 1,
                    class: "placeholder-expand-spacer"
                },
                ur = {
                    key: 2,
                    class: "drag-indicator"
                },
                sr = "configuredbomwidget_column_settings",
                dr = "configuredbomwidget_column_widths",
                pr = "configuredbomwidget_recent_items";
            const fr = {
                __name: "app",
                setup: function(e) {
                    var n = (0, c.KR)(!1),
                        r = (0, c.KR)(""),
                        a = (0, c.KR)(!1),
                        u = (0, c.KR)(null),
                        s = (0, c.KR)(null),
                        d = (0, c.KR)(!1),
                        p = (0, c.KR)(!1),
                        f = (0, c.KR)(0),
                        v = (0, c.KR)(null),
                        b = (0, c.KR)(null),
                        g = new Map,
                        h = (0, c.KR)(!1),
                        m = (0, c.KR)([]),
                        y = (0, c.KR)("467E9E00D30F0000696C7FC400000003"),
                        x = (0, c.KR)("VPMReference"),
                        k = function(e) {
                            var n = t.p;
                            return "".concat(n, "static/images/").concat(e)
                        },
                        w = function(e) {
                            e.preventDefault(), f.value++, p.value = !0
                        },
                        C = function(e) {
                            e.preventDefault(), e.dataTransfer.dropEffect = "copy"
                        },
                        L = function() {
                            f.value--, 0 === f.value && (p.value = !1)
                        },
                        E = function(e) {
                            b.value && clearTimeout(b.value), v.value = e, b.value = setTimeout(function() {
                                v.value = null
                            }, 4e3)
                        },
                        S = function(e) {
                            p.value = !1, f.value = 0;
                            try {
                                var n, t = e.dataTransfer.getData("text/plain");
                                if (!t) return;
                                if ("column-reorder" === t) return;
                                var r = JSON.parse(t);
                                if ("3DXContent" === r.protocol && (null === (n = r.data) || void 0 === n || null === (n = n.items) || void 0 === n ? void 0 : n.length) > 0) {
                                    var a = r.data.items,
                                        o = ["VPMReference", "CreateAssembly"],
                                        l = a.filter(function(e) {
                                            return o.includes(e.objectType)
                                        });
                                    if (0 === l.length) return void E("Unsupported object type. Please drop a VPMReference or CreateAssembly.");
                                    l.length > 1 ? (m.value = l, h.value = !0) : P(l[0])
                                }
                            } catch (e) {
                                console.error("Drop parse error:", e), s.value = "Invalid data format"
                            }
                        },
                        P = function(e) {
                            null != e && e.objectId && (y.value = e.objectId, h.value = !1, m.value = [], "CreateAssembly" === e.objectType ? (x.value = "CreateAssembly", re()) : (x.value = "VPMReference", te()))
                        },
                        M = function(e) {
                            return [0, 0, 20, 40, 20, 40, 40, 20, 40, 60][e - 1] || 0
                        },
                        T = function(e) {
                            return ["70%", "55%", "45%", "60%", "50%", "40%", "65%", "55%", "35%", "50%"][e - 1] || "50%"
                        },
                        A = [{
                            key: "ds6w:label",
                            label: "Title",
                            required: !0,
                            category: "ootb"
                        }, {
                            key: "_thumbnail",
                            label: "Thumbnail",
                            required: !1,
                            category: "ootb"
                        }, {
                            key: "_coreMaterial",
                            label: "Core Material",
                            required: !1,
                            category: "ootb"
                        }, {
                            key: "_coveringMaterial",
                            label: "Covering Material",
                            required: !1,
                            category: "ootb"
                        }, {
                            key: "_drawingcheck",
                            label: "Drawing Check",
                            required: !1,
                            category: "ootb"
                        }, {
                            key: "_weight",
                            label: "Weight",
                            required: !1,
                            category: "ootb"
                        }, {
                            key: "name",
                            label: "Name",
                            required: !1,
                            category: "ootb"
                        }, {
                            key: "_qty",
                            label: "Qty",
                            required: !1,
                            category: "ootb"
                        }, {
                            key: "_subqty",
                            label: "Sub Qty",
                            required: !1,
                            category: "ootb"
                        }, {
                            key: "_totalqty",
                            label: "Total Qty",
                            required: !1,
                            category: "ootb"
                        }, {
                            key: "_parentProduct",
                            label: "Parent Product",
                            required: !1,
                            category: "ootb"
                        }, {
                            key: "ds6wg:revision",
                            label: "Revision",
                            required: !1,
                            category: "ootb"
                        }, {
                            key: "ds6w:responsible",
                            label: "Responsible",
                            required: !1,
                            category: "ootb"
                        }, {
                            key: "ds6w:status",
                            label: "Status",
                            required: !1,
                            category: "ootb"
                        }, {
                            key: "ds6w:reserved",
                            label: "Reserved",
                            required: !1,
                            category: "ootb"
                        }, {
                            key: "ds6w:cadMaster",
                            label: "CAD Master",
                            required: !1,
                            category: "ootb"
                        }, {
                            key: "ds6w:isLastRevision",
                            label: "Is Last Revision",
                            required: !1,
                            category: "ootb"
                        }, {
                            key: "ds6w:project",
                            label: "Project",
                            required: !1,
                            category: "ootb"
                        }, {
                            key: "ds6w:organizationResponsible",
                            label: "Organization Responsible",
                            required: !1,
                            category: "ootb"
                        }, {
                            key: "ds6wg:EnterpriseExtension.V_PartNumber",
                            label: "Part Number",
                            required: !1,
                            category: "ootb"
                        }],
                        j = (0, c.KR)([]),
                        O = (0, l.EW)(function() {
                            return [].concat(A, Mt(j.value))
                        }),
                        V = (0, c.KR)(D());

                    function D() {
                        try {
                            var e = localStorage.getItem(pr);
                            if (e) return JSON.parse(e)
                        } catch (e) {
                            console.warn("Error loading recent items:", e)
                        }
                        return []
                    }

                    function R(e, n) {
                        var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "VPMReference";
                        try {
                            var r = D();
                            (r = r.filter(function(n) {
                                return n.id !== e
                            })).unshift({
                                id: e,
                                name: n,
                                type: t,
                                date: (new Date).toISOString()
                            }), r = r.slice(0, 10), localStorage.setItem(pr, JSON.stringify(r)), V.value = r
                        } catch (e) {
                            console.warn("Error saving recent item:", e)
                        }
                    }

                    function H() {
                        try {
                            localStorage.removeItem(pr), V.value = []
                        } catch (e) {
                            console.warn("Error clearing recent items:", e)
                        }
                    }

                    function F() {
                        return (F = _t(Lt().m(function e(n) {
                            return Lt().w(function(e) {
                                for (;;) switch (e.n) {
                                    case 0:
                                        if (y.value = n.id, "CreateAssembly" !== n.type) {
                                            e.n = 2;
                                            break
                                        }
                                        return x.value = "CreateAssembly", e.n = 1, re();
                                    case 1:
                                        e.n = 3;
                                        break;
                                    case 2:
                                        return x.value = "VPMReference", e.n = 3, te();
                                    case 3:
                                        return e.a(2)
                                }
                            }, e)
                        }))).apply(this, arguments)
                    }

                    function I() {
                        u.value = null, s.value = null, y.value = "", x.value = "VPMReference"
                    }

                    function z() {
                        return Q.apply(this, arguments)
                    }

                    function Q() {
                        return (Q = _t(Lt().m(function e() {
                            return Lt().w(function(e) {
                                for (;;) switch (e.n) {
                                    case 0:
                                        if (y.value && !n.value) {
                                            e.n = 1;
                                            break
                                        }
                                        return e.a(2);
                                    case 1:
                                        if ("CreateAssembly" !== x.value) {
                                            e.n = 3;
                                            break
                                        }
                                        return e.n = 2, re();
                                    case 2:
                                        e.n = 4;
                                        break;
                                    case 3:
                                        return e.n = 4, te();
                                    case 4:
                                        return e.a(2)
                                }
                            }, e)
                        }))).apply(this, arguments)
                    }
                    var G = ["ds6w:label", "_qty", "_subqty", "_totalqty", "ds6wg:revision", "ds6w:status", "ds6w:responsible", "_drawingcheck"],
                        Z = (0, c.KR)(function() {
                            try {
                                var e = localStorage.getItem(sr);
                                if (e) {
                                    var n = JSON.parse(e);
                                    if (Array.isArray(n) && n.includes("ds6w:label")) return n
                                }
                            } catch (e) {
                                console.warn("Error loading saved columns:", e)
                            }
                            return G
                        }()),
                        $ = (0, c.KR)(function() {
                            try {
                                var e = localStorage.getItem(dr);
                                if (e) return JSON.parse(e)
                            } catch (e) {
                                console.warn("Error loading saved column widths:", e)
                            }
                            return {}
                        }()),
                        J = null,
                        Y = function(e) {
                            $.value = e,
                                function(e) {
                                    try {
                                        localStorage.setItem(dr, JSON.stringify(e))
                                    } catch (e) {
                                        console.warn("Error saving column widths:", e)
                                    }
                                }(e)
                        },
                        ee = function() {
                            var e = _t(Lt().m(function e() {
                                return Lt().w(function(e) {
                                    for (;;) switch (e.n) {
                                        case 0:
                                            if (!J) {
                                                e.n = 1;
                                                break
                                            }
                                            return e.a(2, J);
                                        case 1:
                                            return J = _t(Lt().m(function e() {
                                                var n, t, r, o, l, i, c, u, s, d, p;
                                                return Lt().w(function(e) {
                                                    for (;;) switch (e.p = e.n) {
                                                        case 0:
                                                            return a.value = !0, e.p = 1, n = _.call3DSpace({
                                                                url: W("VPMReference"),
                                                                method: "GET",
                                                                headers: {
                                                                    Accept: "application/json"
                                                                },
                                                                type: "json"
                                                            }), t = _.call3DSpace({
                                                                url: W("DELFmiFunctionPPRReference"),
                                                                method: "GET",
                                                                headers: {
                                                                    Accept: "application/json"
                                                                },
                                                                type: "json"
                                                            }), e.n = 2, Promise.all([n, t]);
                                                        case 2:
                                                            r = e.v, o = St(r, 2), l = o[0], i = o[1], c = [], u = new Set, null != l && l.attributeDescription && ((s = l.attributeDescription.filter(function(e) {
                                                                return e.isDeployed
                                                            }).map(function(e) {
                                                                return {
                                                                    key: e.sixWTag && "" !== String(e.sixWTag).trim() ? e.sixWTag : "ds6wg:".concat(e.m1Name),
                                                                    label: e.nlsName || e.internalName,
                                                                    required: !1,
                                                                    category: "ebom_custom",
                                                                    type: e.type,
                                                                    internalName: e.internalName,
                                                                    m1Name: e.m1Name,
                                                                    sixWTag: e.sixWTag
                                                                }
                                                            })).forEach(function(e) {
                                                                u.add(e.key), c.push(e)
                                                            }), console.log("EBOM Custom Attributes loaded:", s.length)), null != i && i.attributeDescription && ((d = i.attributeDescription.filter(function(e) {
                                                                return e.isDeployed
                                                            }).map(function(e) {
                                                                return {
                                                                    key: e.sixWTag && "" !== String(e.sixWTag).trim() ? e.sixWTag : "dsmfg:".concat(e.m1Name),
                                                                    label: e.nlsName || e.internalName,
                                                                    required: !1,
                                                                    category: "mbom_custom",
                                                                    type: e.type,
                                                                    internalName: e.internalName,
                                                                    m1Name: e.m1Name,
                                                                    sixWTag: e.sixWTag
                                                                }
                                                            })).forEach(function(e) {
                                                                if (u.has(e.key)) {
                                                                    var n = c.find(function(n) {
                                                                        return n.key === e.key
                                                                    });
                                                                    n && (n.category = "shared_custom")
                                                                } else u.add(e.key), c.push(e)
                                                            }), console.log("MBOM Custom Attributes loaded:", d.length)), j.value = c, console.log("Total Custom Attributes loaded:", j.value.length), e.n = 4;
                                                            break;
                                                        case 3:
                                                            e.p = 3, p = e.v, console.error("Error loading custom attributes:", p);
                                                        case 4:
                                                            return e.p = 4, a.value = !1, e.f(4);
                                                        case 5:
                                                            return e.a(2)
                                                    }
                                                }, e, null, [
                                                    [1, 3, 4, 5]
                                                ])
                                            }))(), e.a(2, J)
                                    }
                                }, e)
                            }));
                            return function() {
                                return e.apply(this, arguments)
                            }
                        }();
                    (0, l.sV)(_t(Lt().m(function e() {
                        return Lt().w(function(e) {
                            for (;;) switch (e.n) {
                                case 0:
                                    return e.n = 1, B(!0);
                                case 1:
                                    return e.n = 2, ee();
                                case 2:
                                    return e.a(2)
                            }
                        }, e)
                    })));
                    var ne = (0, l.EW)(function() {
                            var e = Z.value.filter(function(e) {
                                return !e.startsWith("_")
                            });
                            if ("CreateAssembly" === x.value) {
                                var n = j.value.filter(function(e) {
                                    return "ebom_custom" === e.category
                                }).map(function(e) {
                                    return e.key
                                });
                                e = e.filter(function(e) {
                                    return !n.includes(e)
                                })
                            } else {
                                var t = j.value.filter(function(e) {
                                    return "mbom_custom" === e.category
                                }).map(function(e) {
                                    return e.key
                                });
                                e = e.filter(function(e) {
                                    return !t.includes(e)
                                })
                            }
                            return Mt(new Set([].concat(["physicalid", "name", "ds6w:globalType", "ds6w:type", "ds6w:composed", "ds6w:isLastRevision", "ds6wg:revision", "ds6wg:EnterpriseExtension.V_PartNumber"], Mt(e))))
                        }),
                        te = function() {
                            var e = _t(Lt().m(function e() {
                                var t, r, a, o, l, i, c, d, p, f, v, b, g, h, m, x, k;
                                return Lt().w(function(e) {
                                    for (;;) switch (e.p = e.n) {
                                        case 0:
                                            return n.value = !0, window.__zenErpSetRoot(y.value, "VPMReference"), s.value = null, u.value = null, e.n = 1, ee();
                                        case 1:
                                            return t = function(e) {
                                                var n = String(e || "").trim();
                                                return n.startsWith("XP_") && (n = "ds6wg:".concat(n)), n
                                            }, r = function() {
                                                var e, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                                                    r = new Set,
                                                    a = Ct(n);
                                                try {
                                                    for (a.s(); !(e = a.n()).done;) {
                                                        var o, l, i, c, u = e.value,
                                                            s = Ct(String(null !== (o = null !== (l = null !== (i = null == u ? void 0 : u.reason) && void 0 !== i ? i : null == u ? void 0 : u.message) && void 0 !== l ? l : null == u ? void 0 : u.code) && void 0 !== o ? o : "").match(/\[[^\]]+\]/g) || []);
                                                        try {
                                                            for (s.s(); !(c = s.n()).done;) {
                                                                var d, p = Ct(c.value.slice(1, -1).split(",").map(function(e) {
                                                                    return e.trim()
                                                                }).filter(Boolean));
                                                                try {
                                                                    for (p.s(); !(d = p.n()).done;) {
                                                                        var f = d.value.replace(/^"|"$/g, "").trim();
                                                                        f && r.add(t(f))
                                                                    }
                                                                } catch (e) {
                                                                    p.e(e)
                                                                } finally {
                                                                    p.f()
                                                                }
                                                            }
                                                        } catch (e) {
                                                            s.e(e)
                                                        } finally {
                                                            s.f()
                                                        }
                                                    }
                                                } catch (e) {
                                                    a.e(e)
                                                } finally {
                                                    a.f()
                                                }
                                                return Array.from(r)
                                            }, a = function() {
                                                var e = _t(Lt().m(function e() {
                                                    var n, r, a = arguments;
                                                    return Lt().w(function(e) {
                                                        for (;;)
                                                            if (0 === e.n) return n = ((a.length > 0 && void 0 !== a[0] ? a[0] : null) || ne.value).map(t), r = {
                                                                batch: {
                                                                    expands: [{
                                                                        label: "Expand-Level-All-".concat(Date.now()),
                                                                        root: {
                                                                            physical_id: y.value
                                                                        },
                                                                        filter: {
                                                                            or: {
                                                                                filters: [{
                                                                                    and: {
                                                                                        filters: [{
                                                                                            prefix_filter: {
                                                                                                prefix_path: [{
                                                                                                    physical_id_path: [y.value]
                                                                                                }]
                                                                                            }
                                                                                        }]
                                                                                    }
                                                                                }]
                                                                            }
                                                                        },
                                                                        graph: {
                                                                            descending_condition: {
                                                                                uql: "availability:2"
                                                                            },
                                                                            descending_condition_object: {
                                                                                uql: '[ds6w:globaltype]:"ds6w:Part"'
                                                                            },
                                                                            descending_condition_relation: {
                                                                                uql: 'NOT (flattenedtaxonomies:"reltypes/XCADBaseDependency") AND NOT (flattenedtaxonomies:"reltypes/Reference Document")'
                                                                            }
                                                                        }
                                                                    }]
                                                                },
                                                                outputs: {
                                                                    select_object: n,
                                                                    select_relation: ["physicalid", "ds6w:type", "ro.plminstance.v_treeorder"],
                                                                    hits: {
                                                                        with_units: 0
                                                                    },
                                                                    format: "entity_relation_occurrence"
                                                                }
                                                            }, e.a(2, _.call3DSpace({
                                                                url: X(),
                                                                method: "POST",
                                                                headers: {
                                                                    "Content-Type": "application/json"
                                                                },
                                                                data: r,
                                                                type: "json"
                                                            }))
                                                    }, e)
                                                }));
                                                return function() {
                                                    return e.apply(this, arguments)
                                                }
                                            }(), e.p = 2, e.n = 3, B();
                                        case 3:
                                            return e.n = 4, a();
                                        case 4:
                                            if (i = e.v, console.log("BOM Expand Response:", i), !((null === (o = i) || void 0 === o || null === (o = o.errors) || void 0 === o ? void 0 : o.length) > 0)) {
                                                e.n = 8;
                                                break
                                            }
                                            if (d = i.errors.map(function(e) {
                                                    return e.reason || e.message || e.code || JSON.stringify(e)
                                                }).join(", "), !((null === (c = i) || void 0 === c || null === (c = c.results) || void 0 === c ? void 0 : c.length) > 0)) {
                                                e.n = 5;
                                                break
                                            }
                                            E("Some attributes could not be loaded: ".concat(d)), console.warn("BOM Expand API warnings (continuing with available data):", i.errors), e.n = 8;
                                            break;
                                        case 5:
                                            if (!((v = r(i.errors)).length > 0)) {
                                                e.n = 7;
                                                break
                                            }
                                            if (b = ne.value.map(t), (g = b.filter(function(e) {
                                                    return !v.includes(t(e))
                                                })).length === b.length) {
                                                e.n = 7;
                                                break
                                            }
                                            return console.warn("Retrying BOM expand without offending attributes:", v), e.n = 6, a(g);
                                        case 6:
                                            i = e.v, console.log("BOM Expand Response (retry):", i), (null === (h = i) || void 0 === h || null === (h = h.results) || void 0 === h ? void 0 : h.length) > 0 && E("Some attributes could not be loaded and were skipped: ".concat(v.join(", ")));
                                        case 7:
                                            if (!((null === (p = i) || void 0 === p || null === (p = p.errors) || void 0 === p ? void 0 : p.length) > 0) || null !== (f = i) && void 0 !== f && null !== (f = f.results) && void 0 !== f && f.length) {
                                                e.n = 8;
                                                break
                                            }
                                            return s.value = "Error loading product structure: ".concat(d), console.error("BOM Expand API Error:", i.errors), e.a(2);
                                        case 8:
                                            if (null !== (l = i) && void 0 !== l && null !== (l = l.results) && void 0 !== l && l.length) {
                                                e.n = 9;
                                                break
                                            }
                                            return s.value = "Product structure not found or empty.", e.a(2);
                                        case 9:
                                            u.value = i, m = i.results.find(function(e) {
                                                return e.resourceid === y.value
                                            }), x = (null == m ? void 0 : m["ds6w:label"]) || (null == m ? void 0 : m["ds6w:identifier"]) || y.value, R(y.value, x, "VPMReference"), e.n = 11;
                                            break;
                                        case 10:
                                            e.p = 10, k = e.v, s.value = "Error loading product structure: ".concat(k.message || String(k)), console.error("BOM Expand Error:", k);
                                        case 11:
                                            return e.p = 11, n.value = !1, e.f(11);
                                        case 12:
                                            return e.a(2)
                                    }
                                }, e, null, [
                                    [2, 10, 11, 12]
                                ])
                            }));
                            return function() {
                                return e.apply(this, arguments)
                            }
                        }(),
                        re = function() {
                            var e = _t(Lt().m(function e() {
                                var t, a, o, l, i, c, d, p, f, v, b, g, h;
                                return Lt().w(function(e) {
                                    for (;;) switch (e.p = e.n) {
                                        case 0:
                                            return n.value = !0, window.__zenErpSetRoot(y.value, "CreateAssembly"), r.value = "Expanding manufacturing structure...", s.value = null, u.value = null, e.p = 1, e.n = 2, B();
                                        case 2:
                                            return a = {
                                                expandDepth: -1,
                                                withPath: !0,
                                                type_filter_bo: [],
                                                type_filter_rel: [],
                                                filter: {}
                                            }, e.n = 3, _.call3DSpace({
                                                url: K(y.value),
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json"
                                                },
                                                data: a,
                                                type: "json"
                                            });
                                        case 3:
                                            if (o = e.v, console.log("MfgItem BOM Expand Response:", o), !((null == o || null === (t = o.errors) || void 0 === t ? void 0 : t.length) > 0)) {
                                                e.n = 5;
                                                break
                                            }
                                            if (i = o.errors.map(function(e) {
                                                    return e.reason || e.message || e.code || JSON.stringify(e)
                                                }).join(", "), !((null == o || null === (l = o.member) || void 0 === l ? void 0 : l.length) > 0)) {
                                                e.n = 4;
                                                break
                                            }
                                            E("Some attributes could not be loaded: ".concat(i)), console.warn("MfgItem BOM Expand API warnings (continuing with available data):", o.errors), e.n = 5;
                                            break;
                                        case 4:
                                            return s.value = "Error loading manufacturing structure: ".concat(i), console.error("MfgItem BOM Expand API Error:", o.errors), e.a(2);
                                        case 5:
                                            if ((c = (null == o ? void 0 : o.member) || []).length) {
                                                e.n = 6;
                                                break
                                            }
                                            return s.value = "Manufacturing structure not found or empty.", e.a(2);
                                        case 6:
                                            if (d = j.value.filter(function(e) {
                                                    return ("mbom_custom" === e.category || "shared_custom" === e.category || "ebom_custom" === e.category) && Z.value.includes(e.key)
                                                }), p = d.length > 0 || Z.value.includes("ds6wg:EnterpriseExtension.V_PartNumber"), f = new Map, !p) {
                                                e.n = 8;
                                                break
                                            }
                                            return r.value = "Loading item details...", e.n = 7, ae(c, d, function(e, n) {
                                                var t = n > 0 ? Math.round(e / n * 100) : 0;
                                                r.value = "Loading item details... ".concat(t, "%")
                                            });
                                        case 7:
                                            f = e.v;
                                        case 8:
                                            v = ie(c, f, d), u.value = {
                                                results: v,
                                                itemType: "CreateAssembly"
                                            }, b = v.find(function(e) {
                                                return e.resourceid === y.value
                                            }), g = (null == b ? void 0 : b["ds6w:label"]) || (null == b ? void 0 : b["ds6w:identifier"]) || y.value, R(y.value, g, "CreateAssembly"), e.n = 10;
                                            break;
                                        case 9:
                                            e.p = 9, h = e.v, s.value = "Error loading manufacturing structure: ".concat(h.message || String(h)), console.error("MfgItem BOM Expand Error:", h);
                                        case 10:
                                            return e.p = 10, n.value = !1, r.value = "", e.f(10);
                                        case 11:
                                            return e.a(2)
                                    }
                                }, e, null, [
                                    [1, 9, 10, 11]
                                ])
                            }));
                            return function() {
                                return e.apply(this, arguments)
                            }
                        }(),
                        ae = function() {
                            var e = _t(Lt().m(function e(n) {
                                var t, r, a, o, l, i, c, u, s, d, p, f, v, b, h, m, y, x, k, w, C, L, E, S = arguments;
                                return Lt().w(function(e) {
                                    for (;;) switch (e.p = e.n) {
                                        case 0:
                                            if (t = S.length > 2 && void 0 !== S[2] ? S[2] : null, r = new Map, a = new Set(["CreateAssembly", "ElementaryEndItem", "Provide", "CreateKit", "CreateMaterial", "ProcessContinuousProvide"]), o = Mt(new Set(n.filter(function(e) {
                                                    return (null == e ? void 0 : e.id) && (null == e ? void 0 : e.type) && a.has(e.type)
                                                }).map(function(e) {
                                                    return e.id
                                                }))), o.length) {
                                                e.n = 1;
                                                break
                                            }
                                            return e.a(2, r);
                                        case 1:
                                            for (l = o.length, i = 0, c = [], u = 0; u < o.length; u += 50) c.push(o.slice(u, u + 50));
                                            s = 0, d = c;
                                        case 2:
                                            if (!(s < d.length)) {
                                                e.n = 18;
                                                break
                                            }
                                            return p = d[s], f = [], e.p = 3, e.n = 4, _.call3DSpace({
                                                url: N(),
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json"
                                                },
                                                data: p,
                                                type: "json"
                                            });
                                        case 4:
                                            v = e.v, b = Ct((null == v ? void 0 : v.member) || []);
                                            try {
                                                for (b.s(); !(h = b.n()).done;) null != (m = h.value) && m.id && (r.set(m.id, m), g.set(m.id, Promise.resolve(m)))
                                            } catch (e) {
                                                b.e(e)
                                            } finally {
                                                b.f()
                                            }
                                            f = (null == v ? void 0 : v.nonmembers) || [], i += p.length - f.length, null == t || t(i, l), e.n = 6;
                                            break;
                                        case 5:
                                            e.p = 5, C = e.v, console.warn("Bulk fetch failed for chunk, falling back to individual requests:", C), f = p;
                                        case 6:
                                            y = Ct(f), e.p = 7, y.s();
                                        case 8:
                                            if ((x = y.n()).done) {
                                                e.n = 14;
                                                break
                                            }
                                            return k = x.value, e.p = 9, e.n = 10, oe(k);
                                        case 10:
                                            (w = e.v) && r.set(k, w), e.n = 12;
                                            break;
                                        case 11:
                                            e.p = 11, L = e.v, console.warn("Failed to load MfgItem details for ".concat(k, ":"), L);
                                        case 12:
                                            i++, null == t || t(i, l);
                                        case 13:
                                            e.n = 8;
                                            break;
                                        case 14:
                                            e.n = 16;
                                            break;
                                        case 15:
                                            e.p = 15, E = e.v, y.e(E);
                                        case 16:
                                            return e.p = 16, y.f(), e.f(16);
                                        case 17:
                                            s++, e.n = 2;
                                            break;
                                        case 18:
                                            return console.log("MfgItem details loaded for MBOM custom attributes:", r.size, "/", l), e.a(2, r)
                                    }
                                }, e, null, [
                                    [9, 11],
                                    [7, 15, 16, 17],
                                    [3, 5]
                                ])
                            }));
                            return function(n) {
                                return e.apply(this, arguments)
                            }
                        }(),
                        oe = function() {
                            var e = _t(Lt().m(function e(n) {
                                var t;
                                return Lt().w(function(e) {
                                    for (;;) switch (e.n) {
                                        case 0:
                                            if (!g.has(n)) {
                                                e.n = 1;
                                                break
                                            }
                                            return e.a(2, g.get(n));
                                        case 1:
                                            return t = _.call3DSpace({
                                                url: q(n),
                                                method: "GET",
                                                headers: {
                                                    Accept: "application/json"
                                                },
                                                type: "json"
                                            }).then(function(e) {
                                                var n;
                                                return (null == e || null === (n = e.member) || void 0 === n ? void 0 : n[0]) || null
                                            }).catch(function(e) {
                                                throw g.delete(n), e
                                            }), g.set(n, t), e.a(2, t)
                                    }
                                }, e)
                            }));
                            return function(n) {
                                return e.apply(this, arguments)
                            }
                        }(),
                        le = function(e) {
                            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
                                t = {};
                            if (!e || !n.length) return t;
                            var r = e["dsmfg:MfgItemEnterpriseAttributes"] || e["dsmfg:MfgEnterpriseAttributes"] || {},
                                a = function(e2) {
                                    return String(null == e2 ? "" : e2).toLowerCase().replace(/[^a-z0-9]/g, "")
                                },
                                o = {};
                            return Object.keys(r).forEach(function(e2) {
                                var n2 = a(e2);
                                n2 && !(n2 in o) && (o[n2] = e2)
                            }), n.forEach(function(e2) {
                                var n2, l = String(e2.internalName || "").trim(),
                                    i = l ? r[l] : void 0,
                                    c = l ? r[l.toLowerCase()] : void 0,
                                    u = e2.m1Name ? r[e2.m1Name] : void 0,
                                    s = null !== (n2 = null != i ? i : c) && void 0 !== n2 ? n2 : u;
                                if (void 0 === s) {
                                    var d = [l, e2.m1Name, e2.key, e2.sixWTag];
                                    e2.m1Name && d.push(String(e2.m1Name).split(".").pop()), e2.key && d.push(String(e2.key).split(".").pop()), e2.sixWTag && d.push(String(e2.sixWTag).split(":").pop());
                                    for (var p = 0; p < d.length && void 0 === s; p++) {
                                        var f = a(d[p]);
                                        f && f in o && (s = r[o[f]])
                                    }
                                }
                                void 0 !== s && (t[e2.key] = s)
                            }), t
                        },
                        ie = function(e) {
                            var n, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : new Map,
                                r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [],
                                a = [],
                                o = [],
                                l = ["DELFmiFunctionIdentifiedInstance", "ProcessInstanceContinuous"],
                                i = Ct(e);
                            try {
                                for (i.s(); !(n = i.n()).done;) {
                                    var c = n.value;
                                    if (c.path) o.push({
                                        Path: c.path
                                    });
                                    else if (c.id && c.type)
                                        if (l.includes(c.type)) {
                                            var u = {
                                                resourceid: c.id,
                                                "ds6w:type": c.type,
                                                from: c.parent,
                                                to: c.reference,
                                                "ds6w:label": c.name || "",
                                                "ds6w:identifier": c.name || "",
                                                name: c.name || "",
                                                _original: c
                                            };
                                            a.push(u)
                                        } else {
                                            var s, d, p = t.get(c.id),
                                                f = le(p, r),
                                                v = kt(kt({
                                                    resourceid: c.id,
                                                    "ds6w:type": c.type,
                                                    "ds6w:globalType": c.type,
                                                    "ds6w:label": c.title || c.name || "",
                                                    "ds6w:identifier": c.name || "",
                                                    name: c.name || "",
                                                    "ds6w:status": c.state || "",
                                                    "ds6wg:revision": c.revision || "",
                                                    "ds6w:created": c.created || "",
                                                    "ds6w:modified": c.modified || "",
                                                    "ds6w:responsible": c.owner || "",
                                                    "ds6w:organization": c.organization || "",
                                                    "ds6w:project": c.collabspace || "",
                                                    "ds6wg:EnterpriseExtension.V_PartNumber": (null == p || null === (s = p["dsmfg:EnterpriseReference"]) || void 0 === s ? void 0 : s.partNumber) || (null === (d = c["dsmfg:EnterpriseReference"]) || void 0 === d ? void 0 : d.partNumber) || "",
                                                    "dsmfg:manufacturingIntent": c.manufacturingIntent || ""
                                                }, f), {}, {
                                                    _original: c
                                                });
                                            a.push(v)
                                        }
                                }
                            } catch (e) {
                                i.e(e)
                            } finally {
                                i.f()
                            }
                            return a.push.apply(a, o), a
                        },
                        ce = function() {
                            var e = _t(Lt().m(function e(t) {
                                var r, a, o, l, i, c, d, p, f, v, b, g, h, m, k, w, C, L, E, S, P, M;
                                return Lt().w(function(e) {
                                    for (;;) switch (e.p = e.n) {
                                        case 0:
                                            if (console.log("Apply Configuration:", t), null != t && t.configurationId && y.value) {
                                                e.n = 1;
                                                break
                                            }
                                            return console.error("Missing configuration ID or root physical ID"), e.a(2);
                                        case 1:
                                            return s.value = null, e.p = 2, e.n = 3, B();
                                        case 3:
                                            return a = "CreateAssembly" === x.value ? U(y.value) : "/resources/v1/modeler/dseng/dseng:EngItem/".concat(y.value, "/expand?xrequestedwith=xmlhttprequest"), o = {
                                                expandDepth: -1,
                                                withPath: !0,
                                                filter: {
                                                    combinationOfSpecification: "union",
                                                    keepChildren: !0,
                                                    filterSpecifications: [{
                                                        filterCriteria: [{
                                                            criteriaType: "config",
                                                            configurationFilterDefinition: {
                                                                version: "0.2",
                                                                persistentFilter: {
                                                                    identifier: t.configurationId,
                                                                    type: "Product Configuration"
                                                                }
                                                            }
                                                        }]
                                                    }]
                                                }
                                            }, "CreateAssembly" === x.value && (o.type_filter_bo = [], o.type_filter_rel = []), console.log("Configured BOM Expand Request:", a, o), e.n = 4, _.call3DSpace({
                                                url: a,
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json"
                                                },
                                                data: o,
                                                type: "json",
                                                includeCSRF: !0
                                            });
                                        case 4:
                                            if (l = e.v, console.log("Configured BOM Expand Response:", l), !((null == l || null === (r = l.errors) || void 0 === r ? void 0 : r.length) > 0)) {
                                                e.n = 5;
                                                break
                                            }
                                            return i = l.errors.map(function(e) {
                                                return e.reason || e.message || e.code || JSON.stringify(e)
                                            }).join(", "), s.value = "Error loading configured BOM: ".concat(i), console.error("Configured BOM Expand API Error:", l.errors), e.a(2);
                                        case 5:
                                            if ((c = (null == l ? void 0 : l.member) || []).length) {
                                                e.n = 6;
                                                break
                                            }
                                            return s.value = "No items found for this configuration.", e.a(2);
                                        case 6:
                                            if ("CreateAssembly" !== x.value) {
                                                e.n = 9;
                                                break
                                            }
                                            if (p = j.value.filter(function(e) {
                                                    return ("mbom_custom" === e.category || "shared_custom" === e.category || "ebom_custom" === e.category) && Z.value.includes(e.key)
                                                }), f = p.length > 0 || Z.value.includes("ds6wg:EnterpriseExtension.V_PartNumber"), v = new Map, !f) {
                                                e.n = 8;
                                                break
                                            }
                                            return e.n = 7, ae(c, p);
                                        case 7:
                                            v = e.v;
                                        case 8:
                                            d = ie(c, v, p), e.n = 10;
                                            break;
                                        case 9:
                                            d = [], b = [], g = Ct(c);
                                            try {
                                                for (g.s(); !(h = g.n()).done;)(m = h.value).Path ? b.push(m) : m.id && m.type && (k = kt({
                                                    resourceid: m.id,
                                                    "ds6w:type": m.type,
                                                    "ds6w:label": m.title || m.name || "",
                                                    "ds6w:identifier": m.name || "",
                                                    "ds6w:status": m.state || "",
                                                    "ds6wg:revision": m.revision || "",
                                                    "ds6w:created": m.created || "",
                                                    "ds6w:modified": m.modified || "",
                                                    "ds6w:responsible": m.owner || "",
                                                    "ds6w:organization": m.organization || "",
                                                    "ds6w:project": m.collabspace || ""
                                                }, m), d.push(k))
                                            } catch (e) {
                                                g.e(e)
                                            } finally {
                                                g.f()
                                            }
                                            for (w = 0, C = b; w < C.length; w++) L = C[w], d.push(L);
                                        case 10:
                                            console.log("Transformed results:", d), E = d, u.value = {
                                                results: E,
                                                itemType: x.value,
                                                configurationApplied: {
                                                    model: t.model,
                                                    product: t.product,
                                                    configuration: t.configuration
                                                }
                                            }, S = E.find(function(e) {
                                                return e.resourceid === y.value
                                            }), P = (null == S ? void 0 : S["ds6w:label"]) || (null == S ? void 0 : S["ds6w:identifier"]) || y.value, R(y.value, P, x.value), console.log("Configured BOM result set:", u.value), e.n = 12;
                                            break;
                                        case 11:
                                            e.p = 11, M = e.v, s.value = "Error loading configured BOM: ".concat(M.message || String(M)), console.error("Configured BOM Expand Error:", M);
                                        case 12:
                                            return e.p = 12, n.value = !1, e.f(12);
                                        case 13:
                                            return e.a(2)
                                    }
                                }, e, null, [
                                    [2, 11, 12, 13]
                                ])
                            }));
                            return function(n) {
                                return e.apply(this, arguments)
                            }
                        }(),
                        ue = function(e) {
                            var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                                t = new Set(Z.value),
                                r = (new Set(e), e.some(function(e) {
                                    return !t.has(e)
                                }));
                            Z.value = e,
                                function(e) {
                                    try {
                                        localStorage.setItem(sr, JSON.stringify(e))
                                    } catch (e) {
                                        console.warn("Error saving columns:", e)
                                    }
                                }(e), !n && r && u.value && ("CreateAssembly" === x.value ? re() : te())
                        };
                    return function(e, t) {
                        var a = (0, l.g2)("v-alert"),
                            c = (0, l.g2)("v-card-title"),
                            f = (0, l.g2)("v-divider"),
                            b = (0, l.g2)("v-card-text"),
                            g = (0, l.g2)("v-spacer"),
                            E = (0, l.g2)("v-btn"),
                            _ = (0, l.g2)("v-card-actions"),
                            A = (0, l.g2)("v-card"),
                            j = (0, l.g2)("v-dialog"),
                            D = (0, l.g2)("v-progress-circular"),
                            R = (0, l.g2)("v-container"),
                            B = (0, l.g2)("v-main"),
                            Q = (0, l.g2)("v-app");
                        return (0, l.uX)(), (0, l.Wv)(Q, null, {
                            default: (0, l.k6)(function() {
                                return [(0, l.bF)(B, null, {
                                    default: (0, l.k6)(function() {
                                        return [(0, l.bF)(R, {
                                            fluid: "",
                                            class: "pa-0"
                                        }, {
                                            default: (0, l.k6)(function() {
                                                return [(0, l.Q3)(" Banner Header (Drop Zone when data exists) "), (0, l.Lk)("div", {
                                                    class: (0, i.C4)(["widget-banner", {
                                                        "drop-target": u.value,
                                                        "drag-over": p.value && u.value
                                                    }]),
                                                    onDragenter: t[0] || (t[0] = function(e) {
                                                        return u.value && w(e)
                                                    }),
                                                    onDragover: t[1] || (t[1] = (0, o.D$)(function(e) {
                                                        return u.value && C(e)
                                                    }, ["prevent"])),
                                                    onDragleave: t[2] || (t[2] = function(e) {
                                                        return u.value && L()
                                                    }),
                                                    onDrop: t[3] || (t[3] = (0, o.D$)(function(e) {
                                                        return u.value && S(e)
                                                    }, ["prevent"]))
                                                }, [(0, l.Lk)("img", {
                                                    src: k("zenvo_logo.png") + "?v=2",
                                                    alt: "Zenvo",
                                                    class: "banner-logo"
                                                }, null, 8, jt), (0, l.Lk)("span", {
                                                    class: "banner-title"
                                                }, [t[13] || (t[13] = (0, l.eW)("MBOM/EBOM Report ", -1)), (0, l.Lk)("span", {
                                                    class: "banner-version"
                                                }, (0, i.v_)("v1.4.13"))]), p.value && u.value ? ((0, l.uX)(), (0, l.CE)("div", Ot, Mt(t[14] || (t[14] = [(0, l.Lk)("svg", {
                                                    viewBox: "0 0 24 24"
                                                }, [(0, l.Lk)("path", {
                                                    d: "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",
                                                    fill: "currentColor"
                                                })], -1), (0, l.Lk)("span", null, "New Product Structure", -1)])))) : (0, l.Q3)("v-if", !0)], 34), (0, l.Lk)("div", Vt, [s.value ? ((0, l.uX)(), (0, l.Wv)(a, {
                                                    key: 0,
                                                    type: "error",
                                                    class: "mx-4 mt-2 mb-2 error-alert",
                                                    density: "compact",
                                                    closable: "",
                                                    "onClick:close": t[4] || (t[4] = function(e) {
                                                        return s.value = null
                                                    })
                                                }, {
                                                    default: (0, l.k6)(function() {
                                                        return [(0, l.eW)((0, i.v_)(s.value), 1)]
                                                    }),
                                                    _: 1
                                                })) : (0, l.Q3)("v-if", !0), (0, l.Q3)(" Warning Toast "), (0, l.bF)(o.eB, {
                                                    name: "toast"
                                                }, {
                                                    default: (0, l.k6)(function() {
                                                        return [v.value ? ((0, l.uX)(), (0, l.CE)("div", Dt, [t[15] || (t[15] = (0, l.Lk)("svg", {
                                                            viewBox: "0 0 24 24"
                                                        }, [(0, l.Lk)("path", {
                                                            d: "M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",
                                                            fill: "currentColor"
                                                        })], -1)), (0, l.Lk)("span", null, (0, i.v_)(v.value), 1)])) : (0, l.Q3)("v-if", !0)]
                                                    }),
                                                    _: 1
                                                }), (0, l.Q3)(" Column Selector Dialog "), (0, l.bF)(mt, {
                                                    show: d.value,
                                                    "onUpdate:show": t[5] || (t[5] = function(e) {
                                                        return d.value = e
                                                    }),
                                                    "available-columns": O.value,
                                                    "selected-columns": Z.value,
                                                    "onUpdate:selectedColumns": ue
                                                }, null, 8, ["show", "available-columns", "selected-columns"]), (0, l.Q3)(" Item Selector Dialog "), (0, l.bF)(j, {
                                                    modelValue: h.value,
                                                    "onUpdate:modelValue": t[7] || (t[7] = function(e) {
                                                        return h.value = e
                                                    }),
                                                    "max-width": "400",
                                                    persistent: ""
                                                }, {
                                                    default: (0, l.k6)(function() {
                                                        return [(0, l.bF)(A, null, {
                                                            default: (0, l.k6)(function() {
                                                                return [(0, l.bF)(c, {
                                                                    class: "d-flex align-center"
                                                                }, {
                                                                    default: (0, l.k6)(function() {
                                                                        return Mt(t[16] || (t[16] = [(0, l.Lk)("svg", {
                                                                            class: "dialog-icon mr-2",
                                                                            viewBox: "0 0 24 24"
                                                                        }, [(0, l.Lk)("path", {
                                                                            d: "M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z",
                                                                            fill: "currentColor"
                                                                        })], -1), (0, l.Lk)("span", null, "Select Product", -1)]))
                                                                    }),
                                                                    _: 1
                                                                }), (0, l.bF)(f), (0, l.bF)(b, {
                                                                    class: "py-2"
                                                                }, {
                                                                    default: (0, l.k6)(function() {
                                                                        return [(0, l.Lk)("p", Rt, (0, i.v_)(m.value.length) + " products dropped. Which one's structure would you like to view?", 1), (0, l.Lk)("div", Ht, [((0, l.uX)(!0), (0, l.CE)(l.FK, null, (0, l.pI)(m.value, function(e) {
                                                                            return (0, l.uX)(), (0, l.CE)("div", {
                                                                                key: e.objectId,
                                                                                class: "item-option",
                                                                                onClick: function(n) {
                                                                                    return P(e)
                                                                                }
                                                                            }, [(0, l.Lk)("img", {
                                                                                src: k("CreateAssembly" === e.objectType ? "Route.png" : "VPMReference.png"),
                                                                                class: "item-icon"
                                                                            }, null, 8, It), (0, l.Lk)("div", Bt, [(0, l.Lk)("div", zt, (0, i.v_)(e.displayName || e.objectId), 1), (0, l.Lk)("div", Qt, (0, i.v_)(e.displayType || e.objectType), 1)]), t[17] || (t[17] = (0, l.Lk)("svg", {
                                                                                class: "item-arrow",
                                                                                viewBox: "0 0 24 24"
                                                                            }, [(0, l.Lk)("path", {
                                                                                d: "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z",
                                                                                fill: "currentColor"
                                                                            })], -1))], 8, Ft)
                                                                        }), 128))])]
                                                                    }),
                                                                    _: 1
                                                                }), (0, l.bF)(f), (0, l.bF)(_, null, {
                                                                    default: (0, l.k6)(function() {
                                                                        return [(0, l.bF)(g), (0, l.bF)(E, {
                                                                            variant: "text",
                                                                            onClick: t[6] || (t[6] = function(e) {
                                                                                h.value = !1, m.value = []
                                                                            })
                                                                        }, {
                                                                            default: (0, l.k6)(function() {
                                                                                return Mt(t[18] || (t[18] = [(0, l.eW)("Cancel", -1)]))
                                                                            }),
                                                                            _: 1
                                                                        })]
                                                                    }),
                                                                    _: 1
                                                                })]
                                                            }),
                                                            _: 1
                                                        })]
                                                    }),
                                                    _: 1
                                                }, 8, ["modelValue"]), (0, l.Q3)(" Main Content Area "), (0, l.Lk)("div", {
                                                    class: (0, i.C4)(["drop-zone", {
                                                        "drag-over": p.value && !u.value
                                                    }]),
                                                    onDragenter: t[9] || (t[9] = function(e) {
                                                        return !u.value && w(e)
                                                    }),
                                                    onDragover: t[10] || (t[10] = (0, o.D$)(function(e) {
                                                        return !u.value && C(e)
                                                    }, ["prevent"])),
                                                    onDragleave: t[11] || (t[11] = function(e) {
                                                        return !u.value && L()
                                                    }),
                                                    onDrop: t[12] || (t[12] = (0, o.D$)(function(e) {
                                                        return !u.value && S(e)
                                                    }, ["prevent"]))
                                                }, [(0, l.Q3)(" BOM Tree Table (data loaded) "), u.value && !n.value ? ((0, l.uX)(), (0, l.Wv)(Hn, {
                                                    key: 0,
                                                    data: u.value,
                                                    "selected-columns": Z.value,
                                                    "available-columns": O.value,
                                                    "column-widths": $.value,
                                                    "root-physical-id": y.value,
                                                    "item-type": x.value,
                                                    "onUpdate:selectedColumns": ue,
                                                    "onUpdate:columnWidths": Y,
                                                    onOpenColumns: t[8] || (t[8] = function(e) {
                                                        return d.value = !0
                                                    }),
                                                    onClose: I,
                                                    onRefresh: z,
                                                    onApplyConfiguration: ce
                                                }, null, 8, ["data", "selected-columns", "available-columns", "column-widths", "root-physical-id", "item-type"])) : ((0, l.uX)(), (0, l.CE)(l.FK, {
                                                    key: 1
                                                }, [(0, l.Q3)(" Placeholder Table (empty or loading) "), (0, l.Lk)("div", Wt, [(0, l.Q3)(" Loading overlay "), n.value ? ((0, l.uX)(), (0, l.CE)("div", Xt, [(0, l.bF)(D, {
                                                    indeterminate: "",
                                                    color: "primary",
                                                    size: "48"
                                                }), r.value ? ((0, l.uX)(), (0, l.CE)("span", Kt, (0, i.v_)(r.value), 1)) : (0, l.Q3)("v-if", !0)])) : ((0, l.uX)(), (0, l.CE)(l.FK, {
                                                    key: 1
                                                }, [(0, l.Q3)(" Drop hint overlay (not loading) "), (0, l.Lk)("div", qt, [(0, l.Lk)("div", Nt, [(0, l.Q3)(" Sol Panel: Son Açılanlar "), (0, l.Lk)("div", {
                                                    class: (0, i.C4)(["hint-panel recent-panel", {
                                                        "has-items": V.value.length > 0
                                                    }])
                                                }, [(0, l.Lk)("div", Gt, [t[19] || (t[19] = (0, l.Lk)("p", {
                                                    class: "panel-label"
                                                }, "Recent", -1)), V.value.length > 0 ? ((0, l.uX)(), (0, l.CE)("a", {
                                                    key: 0,
                                                    href: "#",
                                                    class: "clear-recent-link",
                                                    onClick: (0, o.D$)(H, ["prevent"])
                                                }, "Clear")) : (0, l.Q3)("v-if", !0)]), V.value.length > 0 ? ((0, l.uX)(), (0, l.CE)("div", Ut, [((0, l.uX)(!0), (0, l.CE)(l.FK, null, (0, l.pI)(V.value, function(e) {
                                                    return (0, l.uX)(), (0, l.CE)("div", {
                                                        key: e.id,
                                                        class: "recent-item",
                                                        onClick: function(n) {
                                                            return function(e) {
                                                                return F.apply(this, arguments)
                                                            }(e)
                                                        }
                                                    }, [(0, l.Lk)("img", {
                                                        src: k("CreateAssembly" === e.type ? "CreateAssembly.png" : "VPMReference.png"),
                                                        class: "recent-icon"
                                                    }, null, 8, $t), (0, l.Lk)("span", Jt, (0, i.v_)(e.name), 1)], 8, Zt)
                                                }), 128))])) : ((0, l.uX)(), (0, l.CE)("div", Yt, Mt(t[20] || (t[20] = [(0, l.Lk)("span", {
                                                    class: "no-recent-text"
                                                }, "No products opened yet", -1)]))))], 2), (0, l.Q3)(" Dikey Ayırıcı "), t[22] || (t[22] = (0, l.Lk)("div", {
                                                    class: "hint-divider"
                                                }, null, -1)), (0, l.Q3)(" Sağ Panel: Drop Zone "), (0, l.Lk)("div", er, [(0, l.Lk)("div", nr, [(0, l.Lk)("img", {
                                                    src: k("VPMReference.png"),
                                                    alt: "Product",
                                                    class: "drop-icon"
                                                }, null, 8, tr), (0, l.Lk)("img", {
                                                    src: k("CreateAssembly.png"),
                                                    alt: "Manufacturing",
                                                    class: "drop-icon"
                                                }, null, 8, rr)]), t[21] || (t[21] = (0, l.Lk)("p", {
                                                    class: "drop-text"
                                                }, "Drop VPMReference or CreateAssembly here", -1))])])])], 2112)), (0, l.Q3)(" Placeholder table "), (0, l.Lk)("div", ar, [(0, l.Q3)(" Placeholder Toolbar "), t[28] || (t[28] = (0, l.Lk)("div", {
                                                    class: "placeholder-toolbar"
                                                }, [(0, l.Lk)("div", {
                                                    class: "placeholder-search"
                                                }, [(0, l.Lk)("span", {
                                                    class: "placeholder-bar",
                                                    style: {
                                                        width: "16px",
                                                        height: "16px",
                                                        "border-radius": "50%"
                                                    }
                                                }), (0, l.Lk)("span", {
                                                    class: "placeholder-bar",
                                                    style: {
                                                        width: "80px"
                                                    }
                                                })]), (0, l.Lk)("div", {
                                                    class: "placeholder-toolbar-btns"
                                                }, [(0, l.Lk)("span", {
                                                    class: "placeholder-bar toolbar-btn-bar"
                                                }), (0, l.Lk)("span", {
                                                    class: "placeholder-bar toolbar-btn-bar"
                                                }), (0, l.Lk)("span", {
                                                    class: "placeholder-bar toolbar-btn-bar"
                                                })])], -1)), (0, l.Q3)(" Placeholder Header "), t[29] || (t[29] = (0, l.Lk)("div", {
                                                    class: "placeholder-header"
                                                }, [(0, l.Lk)("div", {
                                                    class: "placeholder-cell title-cell"
                                                }, [(0, l.Lk)("span", {
                                                    class: "placeholder-bar header-bar",
                                                    style: {
                                                        width: "40px"
                                                    }
                                                })]), (0, l.Lk)("div", {
                                                    class: "placeholder-cell"
                                                }, [(0, l.Lk)("span", {
                                                    class: "placeholder-bar header-bar short"
                                                })]), (0, l.Lk)("div", {
                                                    class: "placeholder-cell"
                                                }, [(0, l.Lk)("span", {
                                                    class: "placeholder-bar header-bar short"
                                                })]), (0, l.Lk)("div", {
                                                    class: "placeholder-cell"
                                                }, [(0, l.Lk)("span", {
                                                    class: "placeholder-bar header-bar medium"
                                                })]), (0, l.Lk)("div", {
                                                    class: "placeholder-cell"
                                                }, [(0, l.Lk)("span", {
                                                    class: "placeholder-bar header-bar short"
                                                })])], -1)), (0, l.Q3)(" Placeholder Body "), (0, l.Lk)("div", or, [((0, l.uX)(), (0, l.CE)(l.FK, null, (0, l.pI)(10, function(e) {
                                                    return (0, l.Lk)("div", {
                                                        key: e,
                                                        class: (0, i.C4)(["placeholder-row", {
                                                            "has-children": 1 === e || 4 === e || 7 === e
                                                        }])
                                                    }, [(0, l.Lk)("div", lr, [(0, l.Lk)("span", {
                                                        class: "placeholder-indent",
                                                        style: (0, i.Tr)({
                                                            width: M(e) + "px"
                                                        })
                                                    }, null, 4), 1 === e || 4 === e || 7 === e ? ((0, l.uX)(), (0, l.CE)("span", ir)) : ((0, l.uX)(), (0, l.CE)("span", cr)), t[23] || (t[23] = (0, l.Lk)("span", {
                                                        class: "placeholder-icon"
                                                    }, null, -1)), (0, l.Lk)("span", {
                                                        class: "placeholder-bar title-bar",
                                                        style: (0, i.Tr)({
                                                            width: T(e)
                                                        })
                                                    }, null, 4)]), t[24] || (t[24] = (0, l.Lk)("div", {
                                                        class: "placeholder-cell"
                                                    }, [(0, l.Lk)("span", {
                                                        class: "placeholder-bar short"
                                                    })], -1)), t[25] || (t[25] = (0, l.Lk)("div", {
                                                        class: "placeholder-cell"
                                                    }, [(0, l.Lk)("span", {
                                                        class: "placeholder-chip"
                                                    })], -1)), t[26] || (t[26] = (0, l.Lk)("div", {
                                                        class: "placeholder-cell"
                                                    }, [(0, l.Lk)("span", {
                                                        class: "placeholder-chip status"
                                                    })], -1)), t[27] || (t[27] = (0, l.Lk)("div", {
                                                        class: "placeholder-cell"
                                                    }, [(0, l.Lk)("span", {
                                                        class: "placeholder-bar medium"
                                                    })], -1))], 2)
                                                }), 64))])])])], 2112)), (0, l.Q3)(" Drag over indicator (only when no data) "), p.value && !u.value ? ((0, l.uX)(), (0, l.CE)("div", ur, Mt(t[30] || (t[30] = [(0, l.Lk)("svg", {
                                                    viewBox: "0 0 24 24"
                                                }, [(0, l.Lk)("path", {
                                                    d: "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",
                                                    fill: "currentColor"
                                                })], -1), (0, l.Lk)("span", null, "Drop here", -1)])))) : (0, l.Q3)("v-if", !0)], 34)])]
                                            }),
                                            _: 1
                                        })]
                                    }),
                                    _: 1
                                })]
                            }),
                            _: 1
                        })
                    }
                }
            };
            var vr = t(870),
                br = {};
            br.styleTagTransform = On(), br.setAttributes = Mn(), br.insert = Pn().bind(null, "head"), br.domAPI = En(), br.insertStyleElement = An(), Cn()(vr.A, br), vr.A && vr.A.locals && vr.A.locals;
            const gr = fr;
            var hr = t(5850),
                mr = t(699),
                yr = t(8890);
            t(805);
            const xr = (0, hr.$N)({
                components: mr,
                directives: yr,
                theme: {
                    defaultTheme: "light"
                }
            });

            function kr() {
                widget.addEvent("onLoad", function() {
                    ! function() {
                        a.N.disableCSS(!0), window.title = "MetaPLM", widget.setTitle(window.title);
                        var e = (0, o.Ef)(gr);
                        e.use(xr), e.mount("app")
                    }()
                }), widget.addEvent("onRefresh", function() {})
            }
        },
        9005: (e, n, t) => {
            t.d(n, {
                A: () => p
            });
            var r = t(1601),
                a = t.n(r),
                o = t(6314),
                l = t.n(o),
                i = t(4417),
                c = t.n(i),
                u = new URL(t(5683), t.b),
                s = l()(a()),
                d = c()(u);
            s.push([e.id, `\n.bom-tree-table[data-v-6ecbd65a] {\n  border: none;\n  overflow: hidden;\n  font-size: 13px;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n}\n.tree-scroll-container[data-v-6ecbd65a] {\n  flex: 1;\n  overflow: auto;\n  min-height: 0;\n}\n.tree-table-inner[data-v-6ecbd65a] {\n  display: inline-block;\n  min-width: 100%;\n}\n.tree-toolbar[data-v-6ecbd65a] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 8px;\n  padding: 6px 8px;\n  background: #f8f9fa;\n  border-bottom: 1px solid #e0e0e0;\n}\n\n/* Configuration Bar */\n.config-bar[data-v-6ecbd65a] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 10px 12px;\n  background: linear-gradient(135deg, #f0f4f8 0%, #e8eef5 100%);\n  border-bottom: 1px solid #d0d7de;\n}\n.config-section[data-v-6ecbd65a] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  position: relative;\n}\n.config-label[data-v-6ecbd65a] {\n  font-size: 12px;\n  font-weight: 600;\n  color: #424242;\n  white-space: nowrap;\n}\n.config-select[data-v-6ecbd65a] {\n  min-width: 200px;\n  padding: 6px 32px 6px 10px;\n  font-size: 12px;\n  border: 1px solid #c0c8d0;\n  border-radius: 6px;\n  background: white;\n  cursor: pointer;\n  outline: none;\n  appearance: none;\n  background-image: url(${d});\n  background-repeat: no-repeat;\n  background-position: right 6px center;\n  background-size: 18px;\n  transition: all 0.15s ease;\n}\n.config-select[data-v-6ecbd65a]:hover:not(:disabled) {\n  border-color: #1976d2;\n}\n.config-select[data-v-6ecbd65a]:focus {\n  border-color: #1976d2;\n  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.15);\n}\n.config-select[data-v-6ecbd65a]:disabled {\n  background-color: #f5f5f5;\n  color: #9e9e9e;\n  cursor: not-allowed;\n}\n.config-spinner[data-v-6ecbd65a] {\n  position: absolute;\n  right: 30px;\n}\n.config-apply-btn[data-v-6ecbd65a] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 16px;\n  font-size: 12px;\n  font-weight: 600;\n  color: white;\n  background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: all 0.15s ease;\n  box-shadow: 0 2px 4px rgba(25, 118, 210, 0.3);\n}\n.config-apply-btn[data-v-6ecbd65a]:hover:not(:disabled) {\n  background: linear-gradient(135deg, #1565c0 0%, #0d47a1 100%);\n  box-shadow: 0 3px 6px rgba(25, 118, 210, 0.4);\n}\n.config-apply-btn[data-v-6ecbd65a]:active:not(:disabled) {\n  transform: translateY(1px);\n  box-shadow: 0 1px 2px rgba(25, 118, 210, 0.3);\n}\n.config-apply-btn[data-v-6ecbd65a]:disabled {\n  background: #bdbdbd;\n  cursor: not-allowed;\n  box-shadow: none;\n}\n.config-apply-btn svg[data-v-6ecbd65a] {\n  width: 16px;\n  height: 16px;\n}\n.config-clear-btn[data-v-6ecbd65a] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  padding: 0;\n  border: 1px solid #d0d7de;\n  border-radius: 6px;\n  background: white;\n  cursor: pointer;\n  color: #757575;\n  transition: all 0.15s ease;\n}\n.config-clear-btn[data-v-6ecbd65a]:hover {\n  border-color: #f44336;\n  background: #ffebee;\n  color: #f44336;\n}\n.config-clear-btn svg[data-v-6ecbd65a] {\n  width: 16px;\n  height: 16px;\n}\n.search-box[data-v-6ecbd65a] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 4px 8px;\n  background: white;\n  border: 1px solid #dadce0;\n  border-radius: 6px;\n  flex: 0 0 200px;\n  max-width: 200px;\n}\n.search-box[data-v-6ecbd65a]:focus-within {\n  border-color: #1976d2;\n  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1);\n}\n.search-icon[data-v-6ecbd65a] {\n  width: 16px;\n  height: 16px;\n  color: #5f6368;\n  flex-shrink: 0;\n}\n.search-input[data-v-6ecbd65a] {\n  flex: 1;\n  border: none;\n  outline: none;\n  font-size: 12px;\n  background: transparent;\n  min-width: 0;\n}\n.search-input[data-v-6ecbd65a]::placeholder {\n  color: #9e9e9e;\n}\n.search-clear[data-v-6ecbd65a] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 18px;\n  height: 18px;\n  padding: 0;\n  border: none;\n  border-radius: 50%;\n  background: #e0e0e0;\n  cursor: pointer;\n  color: #5f6368;\n  flex-shrink: 0;\n}\n.search-clear[data-v-6ecbd65a]:hover {\n  background: #bdbdbd;\n}\n.search-clear svg[data-v-6ecbd65a] {\n  width: 12px;\n  height: 12px;\n}\n.search-spinner[data-v-6ecbd65a] {\n  flex-shrink: 0;\n}\n.search-hint[data-v-6ecbd65a] {\n  font-size: 10px;\n  color: #9e9e9e;\n  padding: 2px 4px;\n  background: #f5f5f5;\n  border-radius: 4px;\n  flex-shrink: 0;\n}\n\n/* Active Filters Indicator */\n.active-filters-indicator[data-v-6ecbd65a] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 4px 10px;\n  background: #e3f2fd;\n  border: 1px solid #90caf9;\n  border-radius: 16px;\n  font-size: 12px;\n  color: #1565c0;\n}\n.active-filters-indicator .filter-icon[data-v-6ecbd65a] {\n  width: 14px;\n  height: 14px;\n}\n.active-filters-indicator .filter-count[data-v-6ecbd65a] {\n  font-weight: 500;\n}\n.clear-filters-btn[data-v-6ecbd65a] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 16px;\n  height: 16px;\n  padding: 0;\n  border: none;\n  border-radius: 50%;\n  background: #1565c0;\n  color: white;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.clear-filters-btn[data-v-6ecbd65a]:hover {\n  background: #0d47a1;\n}\n.clear-filters-btn svg[data-v-6ecbd65a] {\n  width: 10px;\n  height: 10px;\n}\n.toolbar-actions[data-v-6ecbd65a] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.toolbar-divider[data-v-6ecbd65a] {\n  width: 1px;\n  height: 20px;\n  background: #dadce0;\n  margin: 0 4px;\n}\n.toolbar-btn[data-v-6ecbd65a] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  padding: 0;\n  border: none;\n  border-radius: 6px;\n  background: transparent;\n  cursor: pointer;\n  transition: all 0.15s ease;\n  color: #5f6368;\n  position: relative;\n}\n.toolbar-btn[data-v-6ecbd65a]:hover {\n  background: #e8eaed;\n  color: #1976d2;\n}\n\n/* Custom Tooltip */\n.toolbar-btn[data-tooltip][data-v-6ecbd65a]::after {\n  content: attr(data-tooltip);\n  position: absolute;\n  bottom: -30px;\n  left: 50%;\n  transform: translateX(-50%);\n  padding: 4px 8px;\n  background: #333;\n  color: white;\n  font-size: 11px;\n  font-weight: 500;\n  white-space: nowrap;\n  border-radius: 4px;\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity 0.2s, visibility 0.2s;\n  z-index: 100;\n  pointer-events: none;\n}\n.toolbar-btn[data-tooltip][data-v-6ecbd65a]::before {\n  content: '';\n  position: absolute;\n  bottom: -8px;\n  left: 50%;\n  transform: translateX(-50%);\n  border: 4px solid transparent;\n  border-bottom-color: #333;\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity 0.2s, visibility 0.2s;\n  z-index: 100;\n}\n.toolbar-btn[data-tooltip][data-v-6ecbd65a]:hover::after,\n.toolbar-btn[data-tooltip][data-v-6ecbd65a]:hover::before {\n  opacity: 1;\n  visibility: visible;\n}\n.toolbar-btn[data-v-6ecbd65a]:active:not(:disabled) {\n  background: #dadce0;\n}\n.toolbar-btn[data-v-6ecbd65a]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.toolbar-btn svg[data-v-6ecbd65a] {\n  width: 20px;\n  height: 20px;\n}\n.expand-progress-wrapper[data-v-6ecbd65a] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 20px;\n  height: 20px;\n}\n.expand-percent[data-v-6ecbd65a] {\n  position: absolute;\n  font-size: 7px;\n  font-weight: 700;\n  color: #1976d2;\n  line-height: 1;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n.tree-header[data-v-6ecbd65a] {\n  display: flex;\n  background: linear-gradient(135deg, #111f5a 0%, #0c6193 100%);\n  color: white;\n  font-weight: 600;\n  padding: 10px 8px;\n  align-items: stretch;\n  min-height: 44px;\n  position: sticky;\n  top: 0;\n  z-index: 10;\n  min-width: max-content;\n}\n.tree-header .tree-cell[data-v-6ecbd65a] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n}\n.tree-header .tree-name-cell[data-v-6ecbd65a] {\n  justify-content: flex-start;\n  font-size: 15px;\n}\n.header-label[data-v-6ecbd65a] {\n  text-align: center;\n  line-height: 1.3;\n  font-size: 15px;\n  font-weight: 600;\n  cursor: grab;\n  user-select: none;\n  transition: all 0.15s ease;\n  border-radius: 4px;\n  padding: 4px 8px !important;\n}\n.header-label[data-v-6ecbd65a]:hover {\n  background: rgba(255,255,255,0.2);\n}\n.header-label[data-v-6ecbd65a]:active {\n  cursor: grabbing;\n}\n.header-label.dragging[data-v-6ecbd65a] {\n  opacity: 0.5;\n  background: rgba(255,255,255,0.3);\n}\n.header-label.drag-over[data-v-6ecbd65a] {\n  background: rgba(255,255,255,0.4);\n  box-shadow: inset 0 0 0 2px rgba(255,255,255,0.8);\n}\n\n/* Column Resize Handle */\n.resize-handle[data-v-6ecbd65a] {\n  position: absolute;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  width: 6px;\n  cursor: col-resize;\n  background: transparent;\n  z-index: 5;\n  transition: background 0.15s ease;\n}\n.resize-handle[data-v-6ecbd65a]:hover {\n  background: rgba(255, 255, 255, 0.4);\n}\n\n/* Header text and filter button layout */\n.tree-header .tree-cell[data-v-6ecbd65a] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.tree-header .header-text[data-v-6ecbd65a] {\n  flex: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n/* Column Filter Button */\n.filter-btn[data-v-6ecbd65a] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 20px;\n  height: 20px;\n  padding: 0;\n  border: none;\n  border-radius: 4px;\n  background: transparent;\n  color: rgba(255, 255, 255, 0.6);\n  cursor: pointer;\n  transition: all 0.15s;\n  flex-shrink: 0;\n  opacity: 0;\n}\n.tree-header .tree-cell:hover .filter-btn[data-v-6ecbd65a],\n.filter-btn.active[data-v-6ecbd65a] {\n  opacity: 1;\n}\n.filter-btn[data-v-6ecbd65a]:hover {\n  background: rgba(255, 255, 255, 0.2);\n  color: white;\n}\n.filter-btn.active[data-v-6ecbd65a] {\n  background: rgba(255, 255, 255, 0.3);\n  color: white;\n}\n.filter-btn svg[data-v-6ecbd65a] {\n  width: 14px;\n  height: 14px;\n}\n.header-label.has-filter[data-v-6ecbd65a] {\n  background: rgba(255, 255, 255, 0.15);\n}\n\n/* Filter Dropdown */\n.filter-dropdown[data-v-6ecbd65a] {\n  position: absolute;\n  z-index: 1000;\n  width: 260px;\n  max-height: 400px;\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 4px 20px rgba(0,0,0,0.15);\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.filter-header[data-v-6ecbd65a] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px 14px;\n  background: #f8f9fa;\n  border-bottom: 1px solid #e0e0e0;\n}\n.filter-title[data-v-6ecbd65a] {\n  font-size: 13px;\n  font-weight: 600;\n  color: #333;\n}\n.filter-close[data-v-6ecbd65a] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  padding: 0;\n  border: none;\n  border-radius: 4px;\n  background: transparent;\n  color: #666;\n  cursor: pointer;\n}\n.filter-close[data-v-6ecbd65a]:hover {\n  background: #e0e0e0;\n}\n.filter-close svg[data-v-6ecbd65a] {\n  width: 16px;\n  height: 16px;\n}\n.filter-search[data-v-6ecbd65a] {\n  padding: 10px 14px;\n  border-bottom: 1px solid #e0e0e0;\n}\n.filter-search-input[data-v-6ecbd65a] {\n  width: 100%;\n  padding: 8px 12px;\n  border: 1px solid #dadce0;\n  border-radius: 6px;\n  font-size: 13px;\n  outline: none;\n}\n.filter-search-input[data-v-6ecbd65a]:focus {\n  border-color: #1976d2;\n  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1);\n}\n.filter-actions[data-v-6ecbd65a] {\n  display: flex;\n  gap: 8px;\n  padding: 8px 14px;\n  border-bottom: 1px solid #e0e0e0;\n}\n.filter-action-btn[data-v-6ecbd65a] {\n  flex: 1;\n  padding: 6px 10px;\n  border: 1px solid #dadce0;\n  border-radius: 4px;\n  background: white;\n  font-size: 12px;\n  color: #5f6368;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.filter-action-btn[data-v-6ecbd65a]:hover {\n  background: #f5f5f5;\n  border-color: #c0c0c0;\n}\n.filter-values-list[data-v-6ecbd65a] {\n  flex: 1;\n  overflow-y: auto;\n  max-height: 220px;\n  padding: 8px 0;\n}\n.filter-value-item[data-v-6ecbd65a] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 8px 14px;\n  cursor: pointer;\n  transition: background 0.15s;\n}\n.filter-value-item[data-v-6ecbd65a]:hover {\n  background: #f5f5f5;\n}\n.filter-value-item input[type="checkbox"][data-v-6ecbd65a] {\n  width: 16px;\n  height: 16px;\n  cursor: pointer;\n  accent-color: #1976d2;\n}\n.filter-value-label[data-v-6ecbd65a] {\n  flex: 1;\n  font-size: 13px;\n  color: #333;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.filter-value-count[data-v-6ecbd65a] {\n  font-size: 11px;\n  color: #9e9e9e;\n  background: #f0f0f0;\n  padding: 2px 6px;\n  border-radius: 10px;\n}\n.filter-footer[data-v-6ecbd65a] {\n  padding: 10px 14px;\n  border-top: 1px solid #e0e0e0;\n  background: #f8f9fa;\n}\n.filter-apply-btn[data-v-6ecbd65a] {\n  width: 100%;\n  padding: 8px 16px;\n  border: none;\n  border-radius: 6px;\n  background: #1976d2;\n  color: white;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: background 0.15s;\n}\n.filter-apply-btn[data-v-6ecbd65a]:hover {\n  background: #1565c0;\n}\n.resize-handle[data-v-6ecbd65a]:active {\n  background: rgba(255, 255, 255, 0.6);\n}\n.tree-row[data-v-6ecbd65a] {\n  display: flex;\n  align-items: center;\n  padding: 8px;\n  border-bottom: 1px solid #f0f0f0;\n  transition: background-color 0.15s ease;\n  min-width: max-content;\n}\n.tree-row[data-v-6ecbd65a]:hover {\n  background-color: #f5f9ff;\n}\n.tree-row.has-children[data-v-6ecbd65a] {\n  font-weight: 500;\n}\n.tree-row.clickable[data-v-6ecbd65a] {\n  cursor: pointer;\n}\n.tree-cell[data-v-6ecbd65a] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 0 8px;\n}\n\n/* Title sütunu - sabit, geniş */\n.tree-name-cell[data-v-6ecbd65a] {\n  flex: 0 0 280px;\n  min-width: 280px;\n  overflow: hidden;\n}\n\n/* Tüm dinamik sütunlar için ortak stil */\n.dynamic-cell[data-v-6ecbd65a] {\n  flex: 1 1 100px;\n  min-width: 80px;\n  justify-content: center;\n  text-align: center;\n  overflow: hidden;\n}\n.qty-multiple[data-v-6ecbd65a] {\n  font-weight: 600;\n  color: #1976d2;\n}\n.chip-wrapper[data-v-6ecbd65a] {\n  display: inline-flex;\n}\n.cell-text[data-v-6ecbd65a] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  max-width: 100%;\n}\n.expand-btn[data-v-6ecbd65a] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 4px;\n  border-radius: 4px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: background-color 0.15s ease;\n}\n.expand-btn[data-v-6ecbd65a]:hover {\n  background-color: #e3f2fd;\n}\n.icon-svg[data-v-6ecbd65a] {\n  width: 18px;\n  height: 18px;\n  fill: currentColor;\n}\n.leaf-spacer[data-v-6ecbd65a] {\n  width: 26px;\n  flex-shrink: 0;\n}\n.indent-spacer[data-v-6ecbd65a] {\n  display: inline-block;\n  flex-shrink: 0;\n}\n.type-img[data-v-6ecbd65a] {\n  width: 20px;\n  height: 20px;\n  object-fit: contain;\n  flex-shrink: 0;\n}\n.empty-icon[data-v-6ecbd65a] {\n  width: 64px;\n  height: 64px;\n}\n.node-title[data-v-6ecbd65a] {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.empty-state[data-v-6ecbd65a] {\n  padding: 48px;\n  text-align: center;\n  color: #9e9e9e;\n}\n.empty-state p[data-v-6ecbd65a] {\n  margin-top: 12px;\n  font-size: 14px;\n}\n\n/* Scrollbar styling */\n.tree-scroll-container[data-v-6ecbd65a]::-webkit-scrollbar {\n  width: 8px;\n  height: 8px;\n}\n.tree-scroll-container[data-v-6ecbd65a]::-webkit-scrollbar-track {\n  background: #f5f5f5;\n}\n.tree-scroll-container[data-v-6ecbd65a]::-webkit-scrollbar-thumb {\n  background: #bdbdbd;\n  border-radius: 4px;\n}\n.tree-scroll-container[data-v-6ecbd65a]::-webkit-scrollbar-thumb:hover {\n  background: #9e9e9e;\n}\n.bom-thumb-img[data-v-6ecbd65a] {\n  width: 56px;\n  height: 42px;\n  object-fit: contain;\n  display: block;\n  margin: 0 auto;\n  background: #fff;\n  border: 1px solid #eee;\n  border-radius: 4px;\n}\n`, ""]);
            const p = s
        },
        9028: (e, n, t) => {
            t.d(n, {
                A: () => i
            });
            var r = t(1601),
                a = t.n(r),
                o = t(6314),
                l = t.n(o)()(a());
            l.push([e.id, '\n.title-icon[data-v-3b880ce9] {\n  width: 24px;\n  height: 24px;\n}\n.close-icon[data-v-3b880ce9] {\n  width: 20px;\n  height: 20px;\n}\n.dialog-content[data-v-3b880ce9] {\n  max-height: 65vh;\n  overflow-y: auto;\n}\n.two-column-layout[data-v-3b880ce9] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n.selection-panel[data-v-3b880ce9],\n.order-panel[data-v-3b880ce9] {\n  background: #fafafa;\n  border-radius: 6px;\n  padding: 10px;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n.panel-title[data-v-3b880ce9] {\n  font-weight: 600;\n  font-size: 12px;\n  margin-bottom: 6px;\n  color: #1976d2;\n}\n.section-header[data-v-3b880ce9] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-weight: 500;\n  font-size: 11px;\n  margin-bottom: 6px;\n  color: #616161;\n  text-transform: uppercase;\n}\n.select-all-checkbox[data-v-3b880ce9] {\n  margin-left: auto;\n}\n.columns-grid[data-v-3b880ce9] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 4px;\n}\n.column-item[data-v-3b880ce9] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  padding: 4px 8px;\n  border-radius: 4px;\n  border: 1px solid #e0e0e0;\n  background: white;\n  cursor: pointer;\n  transition: all 0.15s ease;\n  font-size: 11px;\n  user-select: none;\n  height: 28px;\n  min-width: 0;\n}\n.column-item[data-v-3b880ce9]:hover {\n  border-color: #1976d2;\n  background-color: #e3f2fd;\n}\n.column-item.selected[data-v-3b880ce9] {\n  border-color: #1976d2;\n  background-color: #bbdefb;\n}\n.column-item.disabled[data-v-3b880ce9] {\n  cursor: not-allowed;\n  opacity: 0.6;\n}\n.column-item.required.selected[data-v-3b880ce9] {\n  background-color: #c8e6c9;\n  border-color: #4caf50;\n}\n.column-item.custom[data-v-3b880ce9] {\n  border-color: #ce93d8;\n}\n.column-item.custom.selected[data-v-3b880ce9] {\n  border-color: #9c27b0;\n  background-color: #e1bee7;\n}\n\n/* EBOM Custom - Blue theme */\n.column-item.custom.ebom[data-v-3b880ce9] {\n  border-color: #90caf9;\n}\n.column-item.custom.ebom.selected[data-v-3b880ce9] {\n  border-color: #1976d2;\n  background-color: #bbdefb;\n}\n.column-item.custom.ebom.selected .check-icon[data-v-3b880ce9] {\n  background: #1976d2;\n  border-color: #1976d2;\n  color: white;\n}\n\n/* MBOM Custom - Purple theme */\n.column-item.custom.mbom[data-v-3b880ce9] {\n  border-color: #ce93d8;\n}\n.column-item.custom.mbom.selected[data-v-3b880ce9] {\n  border-color: #9c27b0;\n  background-color: #e1bee7;\n}\n.column-item.custom.mbom.selected .check-icon[data-v-3b880ce9] {\n  background: #9c27b0;\n  border-color: #9c27b0;\n  color: white;\n}\n.check-icon[data-v-3b880ce9] {\n  width: 14px;\n  height: 14px;\n  min-width: 14px;\n  border-radius: 3px;\n  border: 1.5px solid #bdbdbd;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: white;\n}\n.check-icon svg[data-v-3b880ce9] {\n  width: 10px;\n  height: 10px;\n}\n.column-item.selected .check-icon[data-v-3b880ce9] {\n  background: #1976d2;\n  border-color: #1976d2;\n  color: white;\n}\n.column-item.required.selected .check-icon[data-v-3b880ce9] {\n  background: #4caf50;\n  border-color: #4caf50;\n}\n.column-item.custom.selected .check-icon[data-v-3b880ce9] {\n  background: #9c27b0;\n  border-color: #9c27b0;\n  color: white;\n}\n.column-label[data-v-3b880ce9] {\n  overflow: hidden;\n  white-space: nowrap;\n  flex: 1;\n  font-size: 11px;\n}\n.quick-actions[data-v-3b880ce9] {\n  display: flex;\n  gap: 4px;\n  justify-content: center;\n}\n.empty-custom[data-v-3b880ce9] {\n  padding: 8px;\n  text-align: center;\n  background: white;\n  border-radius: 4px;\n  border: 1px dashed #e0e0e0;\n}\n\n/* Order Panel */\n.order-list[data-v-3b880ce9] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  flex: 1;\n  overflow-y: auto;\n  min-height: 0;\n}\n.order-item[data-v-3b880ce9] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  padding: 3px 6px;\n  background: white;\n  border: 1px solid #e0e0e0;\n  border-radius: 3px;\n  font-size: 11px;\n  cursor: grab;\n  transition: all 0.15s ease;\n}\n.order-item[data-v-3b880ce9]:hover {\n  border-color: #1976d2;\n  background: #f5f9ff;\n}\n.order-item.fixed[data-v-3b880ce9] {\n  cursor: default;\n  background: #e8f5e9;\n  border-color: #4caf50;\n}\n.order-item.dragging[data-v-3b880ce9] {\n  opacity: 0.5;\n  border-color: #1976d2;\n  background: #e3f2fd;\n}\n.order-item.drag-over[data-v-3b880ce9] {\n  border-color: #1976d2;\n  border-style: dashed;\n  background: #bbdefb;\n}\n.order-handle[data-v-3b880ce9] {\n  width: 12px;\n  height: 12px;\n  color: #9e9e9e;\n  cursor: grab;\n}\n.order-handle.disabled[data-v-3b880ce9] {\n  cursor: default;\n  color: #4caf50;\n}\n.order-handle svg[data-v-3b880ce9] {\n  width: 12px;\n  height: 12px;\n}\n.order-label[data-v-3b880ce9] {\n  flex: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-size: 11px;\n}\n.fixed-badge[data-v-3b880ce9] {\n  font-size: 8px;\n  padding: 1px 4px;\n  background: #4caf50;\n  color: white;\n  border-radius: 2px;\n  text-transform: uppercase;\n}\n.remove-btn[data-v-3b880ce9] {\n  width: 14px;\n  height: 14px;\n  padding: 0;\n  border: none;\n  background: none;\n  cursor: pointer;\n  color: #bdbdbd;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 2px;\n  transition: all 0.15s ease;\n}\n.remove-btn[data-v-3b880ce9]:hover {\n  color: #f44336;\n  background: #ffebee;\n}\n.remove-btn svg[data-v-3b880ce9] {\n  width: 12px;\n  height: 12px;\n}\n.empty-order[data-v-3b880ce9] {\n  padding: 16px;\n  text-align: center;\n  background: white;\n  border: 1px dashed #e0e0e0;\n  border-radius: 4px;\n}\n\n/* Drop zone styles */\n.order-list.drop-zone-active[data-v-3b880ce9] {\n  border: 2px dashed #1976d2;\n  background: #e3f2fd;\n  border-radius: 6px;\n}\n.drop-placeholder[data-v-3b880ce9] {\n  padding: 12px;\n  text-align: center;\n  background: #f5f5f5;\n  border: 1px dashed #bdbdbd;\n  border-radius: 4px;\n  font-size: 11px;\n  color: #757575;\n  transition: all 0.15s ease;\n}\n.drop-placeholder.active[data-v-3b880ce9] {\n  background: #bbdefb;\n  border-color: #1976d2;\n  color: #1976d2;\n}\n\n/* Draggable source items */\n.column-item[draggable="true"][data-v-3b880ce9] {\n  cursor: grab;\n}\n.column-item[draggable="true"][data-v-3b880ce9]:active {\n  cursor: grabbing;\n}\n.column-item[draggable="false"][data-v-3b880ce9] {\n  cursor: pointer;\n}\n', ""]);
            const i = l
        }
    }
]);
