# First field expedition implementation plan

> **For agentic workers:** execute inline with superpowers:executing-plans; use meaningful test-first checks for new simulation behavior.

**Goal:** A saved game can send real infantry to either empty nearby mine, extract into the mine's separate stock, carry goods home with the four real wagons, and return soldiers without creating assets or freeing their hometown capacity.

**Architecture:** Extend the pure event-driven simulation with bounded expedition and shipment inventories. Keep deterministic four-neighbor paths and integrate at movement, production, recruitment and food-reserve boundaries. Upgrade saves from schema 1/2 to schema 3 after validating the original data; do not change S00 or design2.3 calibration tables.

**Tech stack:** Existing native JavaScript modules, Node test runner, Canvas map, localStorage and Playwright. No new runtime dependency.

**Spec:** ../final-design.md B07/B12/B23/B29–B33; ../research-and-economy.md; ../prototype/scenarios/first-foundation.json; user approval of the first expedition/extraction/shipment loop.

## Global constraints

- Keep http://127.0.0.1:4173, existing server, local save keys, autosave/manual slots and offline cache.
- Use S00 foot/wagon 60 seconds/tile, mine output300/hour saturated at12 workers, four wagons each500 capacity, default rations2 hours. No combat or AI attack in this slice.
- Ruling: one detachment per mine in this slice; no split/merge/reinforce at a mine. This avoids introducing unimplemented hunger/stack allocation rules. Returning troops preserve hometown capacity until merged.
- Ruling: each expedition explicitly uses safe-return policy. The army returns when site food plus carried grain reaches the return-trip reserve. No unpaid extraction or unresolved starvation attrition is activated.
- Returning with full city stock keeps real troops, grain and capacity attached to the detachment at home; the player can unload later or explicitly discard remaining grain and merge. No unlimited temporary store.
- Work in the existing directory because this project has no Git repository; preserve a byte snapshot in /tmp rather than initialize or fabricate commits/worktrees.

## Review focus

1. Sending troops must not free hometown capacity or charge food in two places.
2. Recall mid-leg must retrace the actual distance, not teleport.
3. A full destination must keep cargo on occupied wagons; restore must not deliver twice.
4. Food/arrival/production boundaries must agree for a long advance and small advances.
5. Genuine older saves with a partly completed paid queue must migrate without changing resources/progress.

## Task 1 — Field simulation

Files: create app/src/economy-rules.js, app/src/world-path.js, app/src/logistics.js; modify game.js; tests/logistics.test.js.

Interfaces: marchOffer/sendArmy(game,scenario,siteId,troops,rationHours=2); recallArmy(game,armyId); shipmentOffer/collectShipment(game,scenario,siteId,wagons); unloadAtHome(game,kind,id,discard=false); fieldBoundary(game), integrateField(game,seconds), resolveField(game).

- [x] Write tests for conserved troops/capacity, exact travel/rations, extraction after arrival, recall, safe-return, actual wagon round trip, partial delivery and retained cargo.
- [x] Run the new tests red; implement the smallest coherent model; run all unit tests green.

## Task 2 — Save validation and migration

Files: preserve original v2 validator in state-validation-v2.js; update state-validation.js/storage.js; add logistics-validation.js and tests/logistics-storage.test.js; preserve genuine foundation-v2 fixture.

- [x] Test migration before implementation and active army/wagon round-trip saves, invalid routes, duplicate wagons, unpaid extra troops, cargo corruption and unknown future versions.
- [x] Validate original v2 data before migration; audit current inventory ledgers and unit totals across home/away. Run full unit suite.

## Task 3 — Playable controls and release

Files: logistics-view.js/logistics.css; main.js/world-map.js/index.html; README and implementation validation; e2e/logistics.spec.js.

- [x] Browser test select mine/send army, focusable forms, visible trip/progress, mine warehouse, wagon loading/delivery, recall, save/reload and offline continuation.
- [x] Integrate forms without replacing focused inputs each tick. Show actual paths and small army/cart markers using existing art. City rally/transport entries lead to the map operations.
- [x] Run complete unit and browser suites, build and serve at the same URL. Request a final independent review, address material findings, document evidence and limits.
