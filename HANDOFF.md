# BOM Widget — Handoff (Zenvo additions)

Working notes for continuing the Zenvo build of the BOM Widget.
Current version: **v1.5.1** · written 8 Sep 2026.

The widget itself is the team's product. This repo carries the deployed
build plus a set of Zenvo-specific additions: the **Send to ERP** button and
four columns (**Drawing Check**, **Weight**, **Drawing**, and the earlier
Thumbnail / Core Material / Covering Material work). This document covers
those additions and the platform knowledge they cost.

---

## 1. What is where

| Path | What it is |
|---|---|
| `docs/513.bundle.js` | The patched webpack chunk. All column and ERP logic lives here. Beautified, edited by hand. |
| `docs/erp-button.js` | Companion script for the Send to ERP toolbar button. Plain JS, readable. |
| `docs/index.html` | Widget entry point. The `?v=` query on both scripts is the cache-bust — bump it every release or the dashboard serves the old file. |
| `docs/bundle.js`, `docs/634.bundle.js` | Untouched team code. |
| `../ERP Integration/` | The Python sync service, the BC extension, `SYNC-RULES.md`, `ARCHITECTURE.md`, `TODO.md`. Not in this repo. |

A working copy of the bundle is kept at `../ERP Integration/widget-erp/513.bundle.readable.js`;
edits are made there and copied into `docs/` before committing.

## 2. Standing rules (learned the hard way)

**The diff must be additive.** On 12 Aug 2026 the ERP hooks were applied to an
older copy of the bundle (v1.3.8), which silently reverted the team's v1.3.9
control-character sanitisation for five releases. Since then: take the base
from `git show HEAD:docs/513.bundle.js`, and before every deploy check that
`git diff -U0 docs/513.bundle.js | grep '^-[^-]'` contains **only** lines that
belong to our own hooks. If a removal is not ours, stop.

**Bump the version in four places.** `docs/index.html` (`?v=` on both scripts),
the console build string near the top of `513.bundle.js`, the banner
`(0, i.v_)("v1.5.1")`, and `VERSION` in `erp-button.js`. A user reporting a bug
against the wrong version wastes an afternoon.

**Patch by anchored replacement, not by hand.** The bundle is 6500+ lines of
beautified webpack output. Every change here was made with a small Python
script that asserts each anchor occurs exactly once. Cutting a range by two
anchors is dangerous — one such cut swallowed `__dcEngAttrs` because it sat
between them. `node --check` catches syntax damage but not a deleted function,
so grep for the identifiers you expect to survive.

**Never make a failure look like a verdict.** See §4.4.

## 3. Platform knowledge

### 3.1 Drawings — one graph expand answers for everything

`POST /cvservlet/progressiveexpand/v2?output_format=cvjson` with a `batch.expands`
array. One entry per root:

```json
{ "label": "drw0",
  "root": { "physical_id": "<id>" },
  "filter": { "and": { "filters": [{ "all": 1 }] } },
  "graph": { "descending_condition_relation": {
      "uql": "((type:Drawing)) OR ((type:VPMRepInstance))" } } }
```

with `outputs.select_object = ["physicalid","type","ds6w:label"]` and
`select_relation = ["physicalid","type"]`.

The flat `results` array mixes objects and relations. Relations carry `from`
and `to`; a row is a drawing of `from` when `to` resolves to an object whose
`type` is `Drawing`. **No `tenant` query parameter is needed.**

Measured on this tenant: **250 roots in 0.55 s**. The widget sends 200 per call,
two calls in flight.

This replaced two earlier mechanisms, both worse:

- `dseng:EngItem/{id}/dseng:EngRepInstance` per part, looking for a `drw-` name
  prefix. Correct but ~1800 single calls for Aurora, and it 404s for anything
  the engineering modeler does not own.
- A Federated Search for `types/Drawing` matched against the part number. A
  name heuristic; dropped in v1.4.14.

Verified over 100 parts: **0 disagreements** with the rep-instance method, and
it also answers for the one part that method could not reach.

### 3.2 Electrical harnesses are not EngItems

`ds6w:type` is `ElectricalGeometry` / `ElectricalBranchGeometry`. `dseng` calls
404 on them and `dseng:EngItem/bulkfetch` returns them under **`nonmembers`**
(HTTP 207). Their drawings are ordinary `Drawing` objects named
`<part number>-<title>`, e.g. `1007149-Cabin Wiring Harness`. The graph expand
in §3.1 finds them without special-casing.

### 3.3 Attributes

- **Make Buy / Car System**: `dseng:EngItem/bulkfetch?$mask=dsmveng:EngItemMask.Details`
  → `dseno:EnterpriseAttributes.make_buy` / `.Car_System`.
- **`ds6w:browsingStructure1` is retired.** It was used as a Car System fallback
  and is not returned for many parts (verified on SN10288, whose bulkfetch says
  `100_STANDARD_PARTS` while the index returns no `browsingStructure1` at all).
  When it ran in parallel with the authoritative source its empty answer
  overwrote a good value, and 47 of ~1058 standard parts in the Aurora export
  were marked with a red ✗ instead of the grey dash. Removed in v1.4.13 — do not
  reintroduce it.
- **Weight**: `ds6w:weight` (computed) and `ds6w:declaredWeight` (declared) via
  `cvservlet/fetch/v2`. Only one of the two is ever set.
- **MBOM → EngItem**: mfg nodes resolve through
  `dsmfg:MfgItem/{id}/dsmfg:ScopeEngItem` (`__resolveScopes`, cached). EBOM node
  ids are EngItems already. Every column that reads engineering data goes
  through this fork on `a.itemType === "CreateAssembly"`.

### 3.4 Opening an object in 3DPlay

App **`X3DPLAW_AP`** on the dashboard (ifwe) origin, object passed as ordinary
3DXContent:

```
https://<tenant>-eu1-ifwe.3dexperience.3ds.com/#app:X3DPLAW_AP/content:X3DContentId=<encoded JSON>
```

```json
{ "protocol": "3DXContent", "version": "", "source": "", "widgetId": "",
  "data": { "items": [{ "envId": "<tenant>", "serviceId": "3DSpace",
                        "objectId": "<id>", "objectType": "Drawing" }] } }
```

The ifwe origin is derived from the 3DSpace url by replacing `-space.` with
`-ifwe.`. The widget navigates `window.top.location.href`, which is what the
platform's own commands do; a new tab is the fallback if a sandboxed frame
refuses. An in-widget overlay (iframe over the BOM) was built in v1.4.15 and
removed in v1.4.16 at the user's request — the ifwe host sends neither
`X-Frame-Options` nor a CSP `frame-ancestors`, so it *can* be framed if that is
ever wanted again.

### 3.5 The drawing file itself cannot be previewed

`documents/DownloadTicket` does return a ticket for a `Drawing`, but the file
behind it is the CATDrawing — there is no PDF or image to drop into an iframe.
3DPlay does that rendering. Do not spend time here again.

## 4. Widget internals

### 4.1 Column plumbing

A column needs five touch points in `513.bundle.js`:

1. an entry in the `availableColumns` array (`key`, `label`, `required`, `category`);
2. the label map (`_drawingcheck: "Drawing Check"`, …) used by the export;
3. a branch in the cell render chain, keyed uniquely (`key: 10, 12, 13, 14` are
   taken);
4. a loader, called from the three trigger sites — the
   `[s.value, a.selectedColumns]` watcher and the two expand hooks;
5. a mirror pass writing the value onto the tree node, so it reaches the Excel
   export.

### 4.2 Category is only the picker grouping

`ootb` → Standard, `ebom_custom` / `shared_custom` → EBOM Custom,
`mbom_custom` → MBOM Custom. Thumbnail, Core Material, Covering Material,
Drawing Check, Weight and Drawing are all `ebom_custom` as of v1.4.14.

This is safe because the custom-attribute fetch filters the **server-loaded**
list (`j.value`), not the static array (`A`); `availableColumns` is
`A.concat(j.value)`. Our keys also start with `_`, which the expand's select
list drops anyway. Changing a category therefore moves a column in the picker
and nothing else — but check both filters before assuming that stays true.

### 4.3 The Vue patch-flag trap (cost a release)

A cell vnode created with **no patch flag** is not collected into the block's
dynamic children and is **never patched**. In v1.4.16 the Drawing cell kept its
first render — the loading ellipsis — until an expand or collapse rebuilt the
row. The neighbouring cells pass `5` (`TEXT | STYLE`) and updated normally.

If you add a cell, give it a real patch flag: `5` when only text and style
change, `17` (`FULL_PROPS | TEXT`) when props such as `href`/`title`/`onClick`
change too, and keep the element type stable across states.

### 4.4 A failed lookup is not a verdict

Drawing Check used to render the grey `–` in four situations: the two real rule
cases (standard part / production tooling, phantom) and two failures (request
error, timeout). A part that genuinely had a drawing therefore appeared as "not
applicable" whenever its lookup failed, with nothing to show why.

Since v1.4.11 a failure is its own state — orange `!`, reason in the tooltip,
`?` in the export — and the column logs one summary line when it finishes:

```
[DrawingCheck] 318 rows in 42.1 s -> drawing 210, no drawing 74, not applicable 30, failed 4
```

Keep that property. The same applies to Weight, where a failed batch used to
read as "no weight defined" (red).

### 4.5 Progressive filling

Cells fill from a buffer flushed roughly five times a second (`__dcSet`,
`__wtSet`, `__drwSet`), and each network batch hands its rows over as soon as it
lands. Both matter: v1.4.16 wrote nothing until every batch was back, so the
`loading n/m` counter in the column header sat at `0/n` and the table looked
frozen. The loaders also flush what the timer has not written before they clear
the indicator, or the last rows never reach the export mirror.

Only **visible** rows are loaded; expanding re-triggers the loaders. Drawing and
Drawing Check share one lookup, and whichever asks second waits for the batch
already on the wire (ids are claimed up front, not when their batch starts).

### 4.6 Send to ERP

`erp-button.js` adds the toolbar button, gated on the security context being
**Leader** (`VPLMProjectLeader`) — the Owner context cannot create Documents,
which is what the button does. It writes an ERPSYNC control Document that the
Python service polls; the service attaches those documents to the "ERP SYNC"
bookmark `D82E5FADE88327006A7EE2820003F2DC`. Rules for what the service then
does live in `../ERP Integration/SYNC-RULES.md`.

The bundle exposes the hooks the button needs: `window.__zenErpCtx`,
`__zenErpApi`, `__zenErpSetRoot`, `__zenErpApplied`, `__zenContApply`,
`__zenSaveBlob`.

## 5. Open points

- **Excel export with thumbnails stalls at "x/x MB, 0 B/s".** Below the widget,
  in Chrome's download-finalisation layer. The 10-minute blob lifetime (v1.4.7)
  and a top-level download tab (v1.4.9, reverted) both failed to fix it; plain
  exports are fine. Next idea: deliver the xlsx as a 3DX Document/FCS link
  instead of a client blob. The user has since reported it works on another PC,
  so it may be machine-local.
- **`ElectricalBranchGeometry` rows with a part number** get a real ✓/✗. If
  branch geometry is not expected to carry its own drawing, they should be
  excluded — one line in the Drawing Check loader. Waiting on a decision.
- **Aurora scale.** ~4900 visible rows. Batches are 200 roots, two in flight;
  measurements say there is room to raise both if it still feels slow.

## 6. Version history (Zenvo additions)

| Version | Change |
|---|---|
| v1.4.5 | ERP hooks rebased onto the pristine v1.3.9 bundle after the v1.3.8 regression |
| v1.4.6 | Send to ERP gated on the Leader security context |
| v1.4.7 | Drawing Check column; 10-minute blob lifetime for the export |
| v1.4.8 | Drawing Check loads visible rows incrementally instead of all at once |
| v1.4.9 | Image-export download tab experiment (reverted in v1.4.10) |
| v1.4.10 | Weight column; `loading n/m` indicator in the column headers |
| v1.4.11 | Failed lookups get their own state instead of the grey dash |
| v1.4.12 | Car System fallback no longer overwrites a good value |
| v1.4.13 | `ds6w:browsingStructure1` dropped; drawing check for electrical items |
| v1.4.14 | Drawing column with a 3DPlay link; six columns moved to EBOM Custom |
| v1.4.15 | 3DPlay in an in-widget overlay (removed in v1.4.16) |
| v1.4.16 | 3DPlay opens directly; drawing lookup fills batch by batch |
| v1.4.17 | Drawing cell patches without an expand/collapse; shared lookup deduped |
| **v1.5.1** | Version rename; no functional change |

## 7. Reference files

- `../ERP Integration/SYNC-RULES.md` — the ERP synchronisation rule book.
- `../ERP Integration/ARCHITECTURE.md` — service architecture.
- `../ERP Integration/TODO.md` — open items across the integration.
- `../ERP Integration/TEST-REPORT-AURORA.md` — the Aurora volume test.
- `../ECR/IssueWidget_2_0_0.html` — source of the 3DPlay deep link and the
  `progressiveexpand` drawing query.
- `../weight/Weight API.txt`, `../weight/WeightReport_v1.7.html` — the weight
  attributes and the declared/computed colour convention.
