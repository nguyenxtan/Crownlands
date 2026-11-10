# Barracks recruitment implementation plan

> **For agentic workers:** Use superpowers:executing-plans inline, task by task. User approved the recruitment scope with “ok làm đi”; no further feature approval is needed.

**Goal:** Select the barracks, recruit sword/spear/archer I in a sequential queue, pay and reserve capacity immediately, increase troops/upkeep as each soldier finishes, and retain old and new saves.

**Architecture:** Extend the pure economic simulation with troop counts and a separate recruitment queue. Keep field-job sequence semantics intact. Version states to schema2 / foundation-0.2, validate and migrate legacy schema1/foundation-0.1 before use. Add a focused barracks panel that updates without replacing a focused quantity input.

**Tech Stack:** Existing native HTML/CSS/ES modules, node:test, Playwright/Chrome, localStorage, existing static build and service worker. No new dependencies.

**Spec:** Approved scope in conversation (three tier-I lines, paid training queue, capacity, upkeep, persistence); existing [S00](../prototype/scenarios/first-foundation.json) trial values and [military rules](../military-and-research.md). Implementation choices below are local subset defaults, not a new canonical balance baseline.

## Global constraints

- Keep http://127.0.0.1:4173 and the existing launch service. Never inspect or overwrite the user's personal browser saves.
- English paths and Vietnamese UI. Preserve artwork, asset approvals, sources, S00 and layout.
- S00 costs per sword:40/20/50/10,40s; spear:50/30/30/10,35s; archer:60/30/20/10,45s (wood/clay/iron/grain).
- Initial home troops20/20/12, capacity200, upkeep1 grain/hour each. Queue at most5 paid orders, one active per city; each soldier completes individually. New units consume only from completion onwards. Pending units reserve capacity.
- No cancellation, recruitment discounts, movements, combat, AI, research or new art in this subset. Pause/closed application stops time; speeds cannot change outcomes.
- Existing folder has no Git repository. Keep durable progress and a temporary before-change snapshot; do not create a repository/worktree just for this change. Preserve concurrent city-work UI work.

## Review focus

- A genuine old save with a running plot upgrade must migrate without resetting time, stock, slots or work.
- Repeated orders, invalid counts, insufficient materials/capacity or a full queue must not mutate assets.
- Completing a unit changes upkeep only after that exact boundary, including large advances and simultaneous plot completion.
- Imported queues cannot overbook, duplicate soldiers, schedule backwards or bypass payments.
- The active input and recruit selection must survive UI ticks, navigation, offline reload and update checkpoints.

### Task 1: Simulation

Files: new `app/src/units.js`; modify `app/src/game.js`; new `tests/recruitment.test.js`.
Interfaces: `UNIT_TYPES`, `UNIT_RULES`; `recruitOffer(game,cityId,profile,count)`, `recruitUnits(...)`, `armySummary(game,cityId)`; state `training`, `trainingSequence`, city `troops`, `capacity`.

- [x] Write tests for exact costs/reservations, per-unit boundaries, mixed sequential batches, invalid/foreign/unaffordable/full offers and deterministic clock integration; observe RED.
- [x] Implement and run the complete unit suite GREEN.

### Task 2: Persistence and migration

Files: modify `app/src/storage.js`; new `app/src/state-validation.js`, `tests/recruitment-storage.test.js`, immutable legacy fixture `tests/fixtures/foundation-v1.json`.
Interface: storage normalization returns only current schema; legacy validation remains strict before migration. All session/manual/quick/autos records migrate in memory; read does not write. Failed writes retain the previous valid data.

- [x] Capture a real v1 upgrade at47s before editing simulation. Add tests for migration, active/mixed queues, exact payments and malformed queues; observe RED.
- [x] Implement current validation and migration; run complete unit suite GREEN.

### Task 3: Playable barracks

Files: new `app/src/barracks-view.js`, `e2e/barracks.spec.js`; modify `app/src/main.js`, `app/styles.css`, `app/index.html`.
Interfaces: stable barracks markup plus update function consumes game and persistent draft; delegated events issue pure simulation commands. Existing city-work module remains intact.

- [x] Add real browser flows for paid mixed recruitment, input focus during ticks, live troop/upkeep updates, pause, saved queue/offline reload and real legacy session migration; observe RED.
- [x] Implement controls, roster, capacity and queue; replace static52 figures in relevant inspectors. Build, run all suites, inspect1440/1024/390 layouts.

### Task 4: Review and delivery

- [x] One fresh read-only reviewer checks simulation/persistence/UI against the approved scope; fix Important issues with reproducing tests.
- [x] Record actual checks and limitations, finalize the separate siege-review resolution without changing canonical siege rules.
- [x] Build current files, verify permanent local service and artifact integrity, leave the existing link running.
