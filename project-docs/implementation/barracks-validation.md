# Barracks recruitment · 2026-11-10

Authority: user approved the proposed next step, “ok làm đi”: activate barracks recruitment for sword/spear/archer I, with paid training, capacity, upkeep and persistence. Implements [this plan](2026-11-10-barracks-plan.md); progress and rulings are in [the ledger](barracks-progress.md).

## Player-visible behavior

Open **Nội thành → Doanh trại**. Select one of three troop lines, enter quantity, inspect the four-resource cost and press **Huấn luyện**. Roster shows actual troops, capacity200, pending reservations and grain consumption. Five paid orders can queue sequentially. Sword/spear/archer take40/35/45 game seconds each; each individual soldier is delivered at its own completion, then consumes1grain/hour. Costs are the existing S00 trial values, without discounts.

Resources and slots are reserved at placement. Invalid counts, insufficient stock/capacity, missing barracks, foreign-city commands, full queues and jobs beyond the trial horizon cannot spend resources. Pending troops do not count as ready soldiers or consume upkeep yet. No cancellation or refunds are exposed in this slice.

Queue, counts and upkeep render from simulation. Granary, rally point and own-city map details show actual figures instead of hardcoded52. The quantity input retains focus across ticks; selected troop/count persist across navigation and reload through optional local UI preferences. Training progress belongs to the game save, independent of those preferences.

## Simulation and saved progress

State schema2 / ruleset `foundation-0.2` adds city troop counts/capacity and a recruitment queue. `trainingSequence` is separate from the existing paid field-upgrade `sequence`. Every completion is a simulation boundary, so a new upkeep rate never applies retroactively. Large advances,1×/2×/4×/8× and individual seconds give the same logical result. Pause and closed/background behavior remain unchanged.

Supported schema1 / `foundation-0.1` states first pass the previous strict validator, then migrate in memory. Existing time, resources, field jobs, clock carry and slots remain. Session, all manual slots, quicksave and rotating autosaves normalize to the current schema. Reading never writes; the first successful save retains the original valid primary bytes as backup. Corrupt data can recover a supported backup; explicitly unsupported future versions are preserved rather than silently rolled back or reset.

Current validation checks queue ordering, per-profile counts, reservations, timing, actual troop/upkeep agreement and exact spending. Stock also reconciles with initial stock plus production minus paid upkeep/overflow/spending. This checks corruption and consistency; it is not a multiplayer anti-cheat system.

## Evidence

- Initial11 new unit cases failed before implementation; the browser recruitment flow failed because no barracks panel existed. The original23 unit tests remain included.
- **`npm test`:36/36 passed.** Includes exact batch costs/reservations, per-soldier upkeep, mixed queue ordering, pause/horizon/cap/full-queue rejection, simultaneous plot/training completion and speed/segmentation equivalence.
- Genuine immutable [v1 fixture](../../tests/fixtures/foundation-v1.json) captured from the old engine at47seconds preserves its paid running field upgrade and clock carry. All slots migrate, stored bytes stay unchanged on read, and the backup retains original bytes on first save.
- **`npm run test:e2e`:30/30 passed** on macOS Chrome in the final integrated run. Five recruitment flows exercise mixed paid orders, focus/invalid input, persisted form selection, autosaved paused/offline queue, and a real legacy session/manual slot. Existing field, city-work/construction, navigation, update and offline-art flows pass together.
- New current code is served at **http://127.0.0.1:4173**. Recruitment verification first produced39 local files, hash `a1c6df15e55cbe94`. Concurrent construction UI then added one module; the final integrated distribution is40 local files, hash `816fc37bd727a398`, with all38 app files matching `dist`. Ten changed/dependent source files were checked byte-for-byte over HTTP, and the current recruitment simulation was checked again after integration. Health200, original LaunchAgent remains running with PID17808 at verification.
- Inspected actual game captures at1440×1000,1024×768 and390×844: [desktop](../../assets/previews/barracks-v01/barracks-1440.png), [1024](../../assets/previews/barracks-v01/barracks-1024.png), [390](../../assets/previews/barracks-v01/barracks-390.png). [Browser checks](../../assets/previews/barracks-v01/browser-checks.json) record no horizontal overflow or page errors.
- Seven reference documents and U08 match their manifests. Baseline, S00, asset manifest/roster/layout, existing runtime artwork and build/service scripts remain unchanged. Tests and screenshots use isolated contexts; no personal browser saves were accessed.

## Independent review and corrections

A fresh read-only reviewer checked simulation/storage/UI and independently ran35 unit tests plus100 randomized recruitment/save sequences before the final fix pass. No Critical finding. One Important finding: a modified import could restore stock while leaving a paid-looking recruitment ledger. Added a reproducing test (RED), then stock/ledger reconciliation (GREEN). A nonblocking draft-preference persistence gap was also fixed after a failing reload flow.

Whole-suite integration separately caught a future-schema classification regression: `{schema:99}` was treated as generic corruption before checking the version. A failing node regression now proves it remains an unsupported version and preserves primary bytes; the original browser import flow and whole suite pass after the check-order fix. Final totals36unit/30browser above include all fixes and the concurrent construction checks.

Concurrent city-work/construction code and tests were retained. This task did not author those modules or the perimeter/resource artwork.

## Limits and next dependency

This is the recruitment slice of BUILD-02. No army movement, extraction/transport actions, battle, AI or conquest has been implemented here. Full S00/A1 acceptance, hunger attrition and combat balance remain pending. Existing S00 trial values are not newly proven balance. Cross-browser behavior and real OS-sleep behavior are not claimed from Chrome flows.

The separate [siege cross-review resolution](../reviews/2026-11-10-city-defense-resolution.md) ends the design exchange without adding siege rules/code to this release. Next playable dependency is troop deployment and the mine/transport loop.
