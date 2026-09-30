# 3DEXPERIENCE → Dynamics 365 Business Central BOM Integration — Architecture

> Status: **Implemented and running in the Zenvo_UAT sandbox** · Scope decisions: Emrah Şahin
> Versions: Widget **v1.4.5** · Service **v0.7.0** · BC extension **Zenvo ERP Sync 1.1.0.0**
> Last updated: 2026-08-13 · Rules reference: [SYNC-RULES.md](SYNC-RULES.md) · Open items: [TODO.md](TODO.md)

---

## 1. Overview

Configuration-filtered BOMs are derived from the 150% MBOM held in 3DEXPERIENCE and pushed
into Dynamics 365 Business Central (BC). There are three flows:

1. **Send to ERP (BOM Widget)** — with a BOM open (and optionally a Product Configuration
   applied) the user presses the button; BC receives the top item and the multi-level BOM
   below it.
2. **BOM sync loop (every 30 min)** — for every configuration already sent to ERP the
   filtered BOM is re-read from 3DX and the differences (add / update / delete) are applied
   in BC.
3. **Release Poller** — creates/updates BC item cards for manufacturing items that become
   RELEASED (or are edited after release). Dormant until Zenvo starts releasing mfg items.

```
┌─────────────────────────────┐          ┌──────────────────────────────────────────┐
│  3DEXPERIENCE (cloud)       │          │  Windows server (DFC Manager machine)    │
│  Tenant R1132101868454      │          │                                          │
│                             │  poll    │  ERP Sync Service (Python)               │
│  • 150% MBOM                │◄─────────│  ├─ Command scanner  (~2 min)            │
│  • Product Configurations   │          │  ├─ Release Poller   (~10 min)           │
│  • ERPSYNC control records  │          │  ├─ BOM sync loop    (30 min / config)   │
│    (written by the widget,  │          │  ├─ BC adapter (OAuth2)                  │
│     read + status written   │          │  ├─ SQLite state DB                      │
│     back by the service)    │          │  └─ Dashboard (planned)                  │
│                             │          └──────────────┬───────────────────────────┘
│  BOM Widget (Send to ERP)   │                         │ HTTPS (outbound)
└─────────────────────────────┘                         ▼
                                          ┌──────────────────────────────┐
                                          │  Dynamics 365 BC (Sandbox)   │
                                          │  • Item cards                │
                                          │  • Top item + Production BOM │
                                          └──────────────────────────────┘
```

**Key design decision — no server address is needed.** The widget does not call the service
over HTTP; it passes the command **through 3DX** (see "Command channel"). The service only
makes outbound connections: it polls 3DX and calls the BC API. No firewall rules, no TLS
certificate, no CORS — and the widget users never need to reach the server.

---

## 2. Components

### 2.1 BOM Widget (Send to ERP button)
- No separate ERP widget exists on the platform; the button lives in the standard BOM widget
  (`docs/erp-button.js` plus a small set of hooks in the bundle).
- The button is only visible when the selected security context is **Owner**
  (`VPLMProjectAdministrator.Company Name.Zenvo Automotive`) and becomes enabled once a BOM
  is loaded.
- **First press:** writes an ERPSYNC control record to 3DX and reports "request accepted".
- **Press again:** reads the status the service wrote back (phase, top code, last sync,
  item count, conflicts, errors).

### 2.2 Command channel — the ERPSYNC control record
- The widget already has the user's 3DX session, so the button creates a small metadata-only
  Document in 3DX named `ERPSYNC_<id>` whose description holds a JSON payload
  (`configurationId/Name/Title`, `modelId`, `productId`, `rootPhysicalId`, `itemType`,
  `requestedAt`, `syncNow`, `status`). No data-model change is required.
- The service scans for these records every ~2 minutes; after processing it writes a
  **status block** back into the same record, which is what the widget shows on a second press.
- These records are also the **sync registry**: the 30-minute loop learns "which
  configurations are in ERP" from them, so the list survives a server rebuild.
- Fallback: if this ever proves too slow, a small HTTP endpoint can be added to the service
  (LAN only, 5 users) without changing the rest of the architecture.

### 2.3 ERP Sync Service (Python)
Runs on the same Windows server as DFC Manager (STEP-PDF Converter) and follows the same
pattern; the 3DX authentication is a copy of the DFC Manager flow.

| Module | Responsibility | Interval |
|---|---|---|
| Command scanner | Finds new ERPSYNC records → performs the initial push; handles the `syncNow` flag | ~2 min |
| Release Poller | Finds RELEASED / post-release-modified mfg items → upserts BC item cards | ~10 min |
| BOM sync | For every registered configuration: pull the filtered BOM → apply the diff in BC | 30 min per config |
| BC adapter | OAuth2 (Entra ID client credentials), all BC calls, item cache, retry | — |
| State DB (SQLite) | Sync registry, per-run history, BOM ownership signatures, error log | — |
| Dashboard | Web monitoring panel | planned |

### 2.4 Dashboard (planned)
Same shape as the STEP-PDF Converter panel: configurations (status / last sync / item
count), item flow, run history with the applied differences, and the **CONFLICT**,
**PHANTOM** and **EXCLUDED (no enterprise number)** reports. Actions: sync now, pause a
configuration, resend.

---

## 3. Data flows

### 3.1 Send to ERP (initial push)
1. The user opens a BOM root, optionally applies a configuration and presses **Send to ERP**.
2. The widget writes the ERPSYNC control record.
3. Within ~2 minutes the service picks it up and pulls a **strictly filtered** configured
   expand from 3DX (or an unfiltered expand when no configuration is applied).
4. It creates the top item in BC (No. = configuration name, or the root assembly's own part
   number when there is no configuration).
5. It guarantees an item card for every part in the BOM (see 5.3) and then builds the
   multi-level BOM: every assembly is a card with its own Production BOM, and each line
   carries the quantity of its own level.
6. It writes the status back into the control record and into SQLite.

### 3.2 The 30-minute loop
For each registered configuration: filtered expand → desired-state tree → comparison against
BC (nothing is written when there is no change) → otherwise, per BOM:
- new part → guarantee card + add line
- quantity / unit change → rewrite the BOM lines
- part no longer in the 3DX BOM → **its line is deleted**
- manual BC changes → overwritten by the 3DX state (3DX is the master)

### 3.3 Release Poller
DFC Manager pattern: Federated Search for `state = RELEASED` and `modified > last cursor`,
then a BC card **upsert** for each changed manufacturing item. Both the first release and any
post-release edit are caught by the same query.

### 3.4 Revision change example
`SB00123-B` is released and used in BOMs. Revision C is released:
1. The Release Poller creates the `SB00123-C` card.
2. As soon as the configured BOM resolves to C, the 30-minute sync removes the `-B` line and
   adds the `-C` line. The old `-B` card stays in BC (it is never deleted).

---

## 4. Field mapping

The authoritative mapping lives in [SYNC-RULES.md](SYNC-RULES.md) §1 and §4. Summary:

| BC field | 3DX source |
|---|---|
| Item **No.** | Enterprise Item Number + `-` + revision letter (`Partrevision` on mfg items) |
| **Description** | Title |
| **Base Unit of Measure** | `PCS` for discrete parts; the real unit for continuous materials |
| **Replenishment System** | Make → Prod. Order; Kit / Buy / anything else → Purchase; top item → Prod. Order |
| ZEN Make Buy | raw Make Buy value (informational only) |
| BOM line **Quantity** | quantity at that level; real magnitude for continuous materials |

---

## 5. Sync rules (summary)

### 5.1 Scope and filter
- Root: whatever BOM is open in the widget when Send to ERP is pressed.
- Types: `CreateAssembly` plus every manufacturing item type below it; EBOM
  (`VPMReference`) roots are supported as well.
- Filter: **strict** — nothing outside the configuration is sent (the widget's display-only
  `keepChildren` behaviour is not used for ERP).

### 5.2 Structure
- Multi-level: every assembly with children becomes a BC card with its own Production BOM;
  lines carry the quantity of their own level, with no cumulative maths.
- Top item: No. = Product Configuration name (e.g. `ZA-00000017`), description = its title.
  With no configuration applied, the root assembly's own part number is used.

### 5.3 Parts in the BOM without a BC card
Cards normally arrive from the Release Poller, but a configured BOM can contain a revision
that has not been released yet. In that case the BOM sync creates the card from the data it
has, and the Release Poller updates the same card when the item is released.

### 5.4 Security and secrets
- BC access: Entra ID app registration + OAuth2 client credentials.
- 3DX access: the `zenvo_plm` service account, same authentication pattern as DFC Manager.
- All credentials live only in `service/config.json` on the server; they are never committed
  or shared.

---

## 6. BC integration surface

| Topic | Implementation |
|---|---|
| Authentication | Entra ID app registration → OAuth2 client credentials → authorised in BC under Microsoft Entra Applications |
| Item cards | **"Zenvo ERP Sync" AL extension** → `zenItems` API (standard fields + ZEN Make Buy + Replenishment System + Production BOM No.) — see `bc-extension\` |
| BOM | Custom API pages `zenProductionBOMHeaders` / `zenProductionBOMLines`. The standard BC API exposes no production BOM, so a custom API page was the chosen route |
| Certified BOMs | Automatic update flow: `Under Development` → rewrite lines → `Certified` |
| Rate limits | Still unmeasured; the item cache removes per-item lookups and the first large import (Aurora, ~1770 items) will provide real numbers |

---

## 7. Phases

| Phase | Content | Status |
|---|---|---|
| **0 — BC discovery POC** | Connection, items CRUD, BOM route selection, custom fields | Done (11.08) |
| **1 — Service skeleton** | Python service + 3DX auth + SQLite + scheduler | Done (11.08) |
| **2 — Release Poller** | Federated Search polling, mfg attribute discovery, BC upsert | Done (11.08), dormant until mfg release starts |
| **3 — Widget button** | Send to ERP + ERPSYNC control record, Owner gating | Done (12.08) |
| **4 — BOM sync** | Strict filtered expand → desired state → diff → top item + multi-level BOM | Done (12.08) |
| **5 — Attributes & UoM** | Make Buy → Replenishment System, continuous-material units | Done (13.08) |
| **6 — Test & rollout** | Aurora MBOM volume test, rate limits, dashboard, move to the server | In progress |

---

## 8. Risks

- **Rate limits** are unknown; the Aurora import (~1770 items) is the first real measurement.
- **Part numbers longer than 18 characters** do not fit the BC No. field; they are logged and
  truncated to 20 characters.
- **3DX load:** a 3000–5000 line expand every 30 minutes per configuration; BC writes are
  minimised by comparing against the current BC state.
- **Widget patching:** the ERP hooks live inside a bundle the team also develops. Each patch
  must be re-applied onto the current bundle from the repository, and the diff must be
  additive only (see [TODO.md](TODO.md) item 13).
- **Shared assemblies across configurations:** if two configurations need different content
  for the same assembly, the BOM is left untouched and a CONFLICT warning is raised; the
  process fix is a separate part number in 3DX.
