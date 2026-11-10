# Playable foundation · 2026-11-10

Goal: turn the approved proof direction into a local, offline-capable economic foundation: world selection → city → upgrade a grain plot → save and resume.

Authority: user approval “ok làm đi”; design 2.2, `prototype/scenarios/first-foundation.json` 0.2-draft and asset-production/city-layout.json. This is a subset of S00, not the full conquest acceptance scenario.

Architecture (implementation choice): native HTML/CSS/ES modules, Canvas world and DOM city interaction, pure deterministic simulation, local browser saves, static service worker. Node 22 build/server, node:test, development-only Playwright using installed Chrome. No runtime network dependencies.

Global constraints: preserve original references, historical reviews and source artwork; keep grain v2; provisional art copies do not imply production approval. Same logical elapsed time gives same stock and job result. No wall-clock catch-up. Only calibrated field levels 1–2 are enabled. No combat, recruitment, travel, AI actions or new balance system in this build. English paths, Vietnamese UI. This directory has no Git repository; preserve an execution ledger rather than introduce a VCS or worktree just for this task.

## Task 1 · Simulation

- [x] Write failing node tests for initial four-resource economy, costs, ownership, duplicate jobs, completion boundary, capacity clamp, segmentation and pause/speeds.
- [x] Implement `createGame(scenario)`, `advanceGame(game, seconds)`, `elapse(game, milliseconds)`, `rates(city)`, `upgradePlot(game, cityId, plotId)` and readonly offers. Whole integer seconds; stocks in 3,600,000 quanta per resource unit. Split at job completion; net rate before clamping.
- [x] Run `npm test`; expected all core tests pass. No negative stock, duplicate payment or level beyond calibrated 2.

## Task 2 · Persistence

- [x] Write failing tests for mid-job roundtrip, strict malformed/future version rejection, manual/quick/rotating autosave slots, corrupt primary recovery and failed writes.
- [x] Implement validated save envelopes, atomic localStorage primary with previous backup, three manual slots, quicksave, five autosaves, export/import. Loading never advances time. Invalid import does not replace current state.
- [x] Run complete `npm test`; expected green.

## Task 3 · Art, views and app

- [x] Normalize copies of proof art to app-local runtime files; approved grain SVG unchanged. Record input/output hashes and provisional status.
- [x] Before views, add failing browser tests for map/city navigation, 14 slots/16 plots, paid upgrade, pause/speed, saves, reload and offline reload.
- [x] Implement local shell, pan/zoom map, known-area site selection without hidden NPC stock disclosure, city with selectable slots/plots, upgrade details, clocks, save/import/export and clear limited scope.
- [x] Build local static distribution and service-worker precache. Commands: `npm run build`, `npm run dev`, `npm run test:e2e`. Expected no console/page errors, local assets loaded, offline reload works after first installation.

## Task 4 · Verification and delivery

- [x] Inspect desktop and compact screenshots; run unit and browser suites.
- [x] One fresh-context code review of app, tests and this plan; fix important findings with reproducing tests.
- [x] Update README and implementation report with actual commands/results and remaining scope. Keep local preview running for the user.

Interfaces: scenario/layout copies are build inputs, simulation owns stock/jobs/time, persistence validates simulation state, UI sends intentions and renders model state. Tests never use a game cheat global to bypass player flows.

Review focus: malformed imported JSON, save overwrite on corruption, suspended/background clocks, repeated clicks/payment, fractional production at event boundaries, hidden information in world panels, atomic save failure, stale service worker content, canvas hit targets and small screens. No playtest or full-A1 claim from this foundation.
