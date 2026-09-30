# 3DX → Business Central Synchronisation Rule Book

> Versions: Widget **v1.4.7** · Service **v0.8.0** · Extension **Zenvo ERP Sync 1.1.0.0**
> Environment: 3DX `R1132101868454` → BC `Zenvo_UAT` / company "Zenvo UAT v01"
> Last updated: 2026-08-13 · Decisions by: Emrah Şahin

---

## 1. Numbering rules

| # | Rule |
|---|---|
| 1.1 | **ERP item number** = `<Enterprise Item Number>` + `-` + `<revision letter>` (e.g. `1006412-A`, `SB00123-B`). |
| 1.2 | The **Enterprise Item Number** comes from the engineering item's `dseng:EnterpriseReference.partNumber`. For manufacturing items the number is taken from the engineering item linked through the **scope link** (mfg items carry no number of their own). |
| 1.3 | The **revision letter** comes from the **`Partrevision` attribute** on manufacturing items (never from the mfg object's own revision); on engineering items it is the first character of the object revision (`A.1` → `A`). If `Partrevision` is empty the object revision is used and the case is reported. |
| 1.4 | **A part without an Enterprise Item Number is not sent to ERP.** The part and the BOM lines using it are skipped and reported as `EXCLUDED (no enterprise number)` on every sync run. (Exception: the root of the push cannot be skipped — it falls back to the 3DX name and is reported.) |
| 1.5 | **20-character limit** (BC No. field): a longer number is logged as an error and **truncated to its first 20 characters**. |
| 1.6 | All numbers are written to BC in **upper case**. |

## 2. Top item rules

| # | Rule |
|---|---|
| 2.1 | **With a configuration applied:** top item No. = the Product Configuration's **name** (e.g. `ZA-00000017`), description (part name) = its **title** (e.g. "Amandas Car"). The top item replaces the root; its BOM is the root's configuration-filtered children. |
| 2.2 | **Without a configuration:** the BOM is sent **unfiltered** and the top item is the **root Manufacturing Assembly's own part number** (rules 1.1–1.3). The widget asks for confirmation before such a push. |
| 2.3 | The top item is created as a normal BC item card and its Replenishment System is **Prod. Order**. |

## 3. BOM rules

| # | Rule |
|---|---|
| 3.1 | **Scope**: the root Manufacturing Assembly and every manufacturing item type below it (CreateAssembly, ElementaryEndItem, Provide, CreateKit, CreateMaterial, ProcessContinuousProvide). EBOM roots are supported too. |
| 3.2 | **The filter is strict**: nothing outside the configuration is sent (`keepChildren` is not used). |
| 3.3 | **Multi-level structure**: every assembly with children becomes a BC card with its own Production BOM; the BOM number equals the card number and the card is linked to it through `productionBOMNo`. |
| 3.4 | **Quantity**: the quantity at that level (occurrence count). No cumulative or rolled-up maths. |
| 3.5 | **Update**: each run compares the desired state with BC; if nothing differs nothing is written. When something differs the BOM is set to `Under Development`, its lines are **rewritten in full** and it is set back to `Certified`. |
| 3.6 | **3DX is the master**: a part that leaves the 3DX BOM has its line deleted in BC, and manual BC BOM edits are overwritten on the next run. |
| 3.7 | **Conflict policy** ("detect and warn"): if two configurations require different content for the same assembly, the BOM is **left untouched** (first writer wins) and a `CONFLICT:` warning is reported on both sides. The permanent fix belongs to the process: an assembly whose content varies per configuration must get its own part number in 3DX. |
| 3.8 | **Card guarantee**: a part that appears in the BOM without a BC card is created automatically (defaults: `PCS`, `RETAIL`, `RESALE`); the Release Poller updates the same card when the item is released. |
| 3.9 | **Phantom** (Make Buy = `Phantom`): **warning only — the item is still created and its BOM is built normally.** The check runs **only on MBOM**: an MBOM should never contain phantom structures, so a hit means the 3DX data needs fixing; the warning is the safety net, and refusing to create would have side effects elsewhere. EBOM is not checked at all (phantoms are legitimate there — Chassis, Interior, Exterior in the sample data). |

## 4. Attribute rules

| BC field | 3DX source and rule |
|---|---|
| Item No. | Enterprise Item Number + `-` + Partrevision (rule 1) |
| Description | Title |
| **Replenishment System** | **Make → `Prod. Order`; Kit, Buy and every other value → `Purchase`; the top item → `Prod. Order`.** |
| ZEN Make Buy (informational) | Raw Make Buy value (mfg: `Make_Buy`, eng: `make_buy`) |
| ZEN Car System / Outsourced / Serviceability (informational) | Rule 4.3 |
| Base Unit of Measure | `PCS` for discrete parts; the real unit for continuous materials (rule 4.1) |

**4.1 Continuous materials (cpr / ProcessContinuousProvide):** the usage quantity is read
from `DELFmiContQuantity_<Dimension>.V_ContQuantity` on the instances; the BOM line is
written with the **summed real magnitude and its unit** (kg→`KG`, m→`M`, m²→`M2`, m³→`M3`).
Missing unit codes are created in BC automatically and the mapping can be extended through
`config.json → bc.uom_map`. The card's Base Unit of Measure is the same unit. In the widget
the same value is shown inside the Qty cell as "quantity unit"; there is no separate UoM column.
If a continuous material appears on an edge **without** magnitude data, the line is written
with the occurrence count in the **card's own base unit** (BC rejects a unit the item does
not have) and the case is reported (Aurora finding, 14.08).

**4.2 Source priority:** on manufacturing items the attributes are read from the mfg item's
own `MfgItemEnterpriseAttributes` block, on engineering items from `dseno:EnterpriseAttributes`.
For the informational fields of rule 4.3 the fallback is **per key**, not per block: a mfg item
can carry the block and still be missing a single attribute (only 59 of 96 sampled mfg items
define `Car_System`), and the engineering value is then used. Make Buy keeps its original
per-block behaviour, because the Replenishment System rule depends on it.

**4.3 Informational fields (restored 10.09):** four values are carried to the **3DEXPERIENCE**
section of the item card. They are written by the service on every run and are **read-only** in
BC — an edit there would be overwritten by the next sync.

| BC field | mfg item key | engineering item key | Type |
|---|---|---|---|
| Car System | `Car_System` | `Car_System` | Text[100] |
| Outsourced | `Outsourced` | `Outsourcedafterpurchase` | Boolean |
| Serviceability | `Serviceabilitypart` | `Serviceabilitypart` | Text[100] |
| Make Buy (3DX) | `Make_Buy` | `make_buy` | Text[30] |

3DX returns these inconsistently — Outsourced is a real boolean on mfg items, Serviceability is
a `'TRUE'` / `'false'` **string** on mfg items and a boolean on engineering items. Booleans and
those string variants are normalised to lower-case `true` / `false` in the text fields; any
other value is passed through unchanged. These fields carry information only: no process logic
reads them.

*History: the three fields were removed on 13.08 and restored on 10.09 at the user's request.
Extension **1.2.0.0** carries them again.*

## 5. Flow and timing

| # | Rule |
|---|---|
| 5.1 | The **Send to ERP button** is only visible when the selected security context is **Leader** (`VPLMProjectLeader.Company Name.Zenvo Automotive`); it becomes enabled once a BOM is open. There is a single widget on the platform — no separate ERP widget. **Why Leader and not Owner:** the Owner role (`VPLMProjectAdministrator`) has no *create* access for Documents in the "Zenvo Automotive" collaborative space, so the ERPSYNC control record cannot be written from an Owner context (HTTP 400, verified 14.08). Owner *can* update an existing document — if create access is granted later, the gate can move back to Owner. |
| 5.2 | Pressing the button writes an **ERPSYNC control record** to 3DX (metadata-only Document, `ERPSYNC_<id>`, JSON payload). Pressing it again for the same BOM does not create a second request — it **shows the status**. |
| 5.3 | The **command scanner** processes new records every ~**2 minutes**: it performs the initial push, adds the configuration to the permanent sync registry and writes the result back into the record (`ACTIVE` / `ERROR`, top code, item count, conflict/phantom/error lists). Because the record belongs to the widget user, the status update falls back to the **admin security context** when needed; each processed request is also registered in the service database so the same request is **never run twice**, even if the status write-back fails. |
| 5.3a | Every processed ERPSYNC record is **attached to the "ERP SYNC" bookmark** (`BMR_0155878142`) so the history can be tracked from one folder (write API: `dsbks:Bookmark/{id}/attach` with the admin context; the folder content is read via Federated Search). |
| 5.4 | The **BOM sync loop** re-synchronises **every** registered configuration every **30 minutes** (5 configurations → all 5). |
| 5.5 | The **Release Poller** looks for RELEASED (or post-release modified) **manufacturing items** every ~**10 minutes** and upserts their cards. Note: Zenvo does not release mfg items yet, so the poller stays idle until that process starts. |
| 5.6 | All user-facing messages and logs are in **English**. |

## 6. Operational rules

| # | Rule |
|---|---|
| 6.1 | **Versioning**: every meaningful change bumps a visible version — widget banner, button tooltip and browser console; the service prints its version at start-up. |
| 6.2 | **BC service-account permission sets** (complete list): `D365 BUS FULL ACCESS`, `D365 BUS PREMIUM` (required for the production tables), `MFL BASIC` / `MFL CONNECTOR` / `MFL PAYMENTS` (needed because the Medius extension subscribes to item saves; no data is written to Medius) and `ZEN ERP SYNC`. |
| 6.3 | **Extension trap**: every time the "Zenvo ERP Sync" extension is republished the `ZEN ERP SYNC` permission-set line disappears from the Entra application and must be added again. If a permission change does not take effect, toggle **State: Disabled → Enabled** on the Entra Applications card to refresh the session. |
| 6.4 | **Widget deployment**: GitHub `zenvoplm/bomwidget-v1.3.5` main → GitHub Pages (~10 min cache). Scripts are loaded with a `?v=` cache buster; a version bump touches three places (banner text, `erp-button.js` VERSION, `index.html ?v=`). |
| 6.5 | **Credentials** live only in `service/config.json` on the server; they are never written into chat, code or the repository. |
| 6.6 | The service currently runs on the development PC; the permanent installation on the DFC Manager server is still open (see [TODO.md](TODO.md)). |

---

*This is a living document: whenever a new rule is agreed it is recorded here and the version line is updated.*
