# Aurora MBOM Import — End-to-End Test Report

> Date: 2026-08-14 · Trigger: **Send to ERP button** in the BOM widget (first real user-driven run)
> Source: `AURORA VP2 MBOM` (`mass-00005862`), no configuration applied → top code **`MASS-00005862-A`**
> Versions at the end of the test: Widget **v1.4.6** · Service **v0.8.0** · Extension **1.1.0.0**

---

## 1. Outcome

**The full chain worked: widget button → ERPSYNC control record in 3DX → service → Business Central.**
Three defects surfaced during the run; all three were fixed and verified the same day. Final state in BC is green.

| Final state (BC, Zenvo_UAT) | Value |
|---|---|
| Aurora items in scope | **1 809** |
| Production BOMs (Aurora) | **95**, all **Certified** |
| Top item | `MASS-00005862-A`, Replenishment = Prod. Order, linked to its BOM (**1 711 lines** — the MBOM is intentionally mostly flat) |
| Largest sub-BOM | `1013232-A` — **1 378 lines**, Certified |
| Replenishment split (all items in BC) | 1 710 × Purchase · 191 × Prod. Order |
| Units in use | PCS (default) · **M ×9 · M3 ×6 · KG ×1** (continuous materials; `M` was auto-created in BC) |
| Conflicts | **0** |
| Phantom warnings | **37** (items created anyway, per rule 3.9 — list in the ERPSYNC record and service log) |
| Excluded (no Enterprise Item Number) | **~146** parts reported per run (sample data; the list shrinks as numbers are filled in 3DX) |

The ERPSYNC control record now shows `phase: ACTIVE` with these statistics — a second press of the button displays them. Aurora is registered in the sync loop and re-syncs every 30 minutes.

## 2. Timeline

| Time | Event |
|---|---|
| 11:27:21 | Service picks up the button's ERPSYNC record (v0.7.1) |
| 11:28:39 | Read phase done (~70 s); 37 phantom warnings logged; item creation starts |
| ~11:35:46 | **~1 800 item cards created in ~7 min (≈ 4.3 items/s)**; BOM writing starts; one line of the 1 378-line BOM fails (defect #2) |
| 11:36:00 | Status write-back into the ERPSYNC record fails (defect #1); the scanner starts re-processing the same request (defect #1b) |
| 11:36–11:38 | Service stopped; fixes deployed (v0.7.2) |
| 11:38:52 → 11:45:40 | Clean re-process (~7 min): all items already exist, giant BOM rewritten, status written back via the admin-context fallback — **request completed** |
| 12:00–12:20 | Defect #2 root-caused and fixed (v0.8.0); data repair on `ZAA0007-A`; verification sync: 94 BOMs unchanged, everything Certified |

Re-sync cost when nothing changed: **~108 s** for the whole Aurora structure. No BC throttling (HTTP 429) was observed at any point.

## 3. Defects found and fixed

**#1 — Status write-back failed across users.** The control record is created by the widget user, and the service account had no modify access on another user's document (3DX: *"No modify access on the specified object"*). My earlier end-to-end test had missed this because there the service itself created the record. **Fix:** the service retries the document update with the admin security context (`VPLMProjectAdministrator...`), which is allowed to modify it.
**#1b — Re-processing loop.** Because the status stayed `REQUESTED`, the scanner re-ran the same request every ~2 minutes. **Fix:** processed requests are now recorded in the service database and are never run twice, even if the status write-back fails.

**#2 — Continuous material on a line without magnitude data.** One BOM line failed with *"Unit of Measure Code (PCS) … cannot be found in Item Unit of Measure"*: the child (`ZAA0007-A`, an adhesive with Base UoM `M3`) appeared on an edge that carried no `V_ContQuantity`, so the line was written with the default `PCS`, which BC rejects. **Fix:** a line for a known continuous material now always uses the card's own base unit (and the case is reported); the `ZAA0007-A` card was repaired (base `M3`, with `PCS` kept as an alternate unit so its PCS-based BOM header links cleanly).

**#3 — Error messages hid the server's reason.** BC errors now carry the response body, which is what made #2 diagnosable in minutes.

Also hardened: transient network drops (two occurred mid-verification) are now retried automatically.

## 4. ERPSYNC records → "ERP SYNC" bookmark

All ERPSYNC control records were attached to the bookmark **ERP SYNC** (`BMR_0155878142`, id `D82E5FADE88327006A7EE2820003F2DC`), and the service now attaches every record it processes automatically — the detailed history is trackable from that folder. (Attaching requires the admin context; the write API is `dsbks:Bookmark/{id}/attach`, reading the folder goes through Federated Search, as your own DocumentWidget documents.)

## 5. Follow-ups

- BOM headers are created with `PCS` as the header unit even for continuous assemblies — cosmetic, but worth aligning with the item's base unit (TODO).
- The 37 phantom-in-MBOM warnings and the ~146 unnumbered parts are data-quality lists for the 3DX side; both are reported on every sync run.
- The service still runs on the development PC; moving it to the DFC Manager server remains the top open item.
