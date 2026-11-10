# Claude · full Crownlands code review

User request: “review lại xem có bug gì ko ? báo claude review lại code từ đầu tới cuối xem có lỗi gì ko cải thiện đi”. Review the entire implemented Crownlands game, report reproducible bugs and concrete improvements, then the coordinator will arrange fixes and re-review. This is a real Claude review, not a different model claiming to be Claude.

## Target and current state

Project: `/Users/tannx/Documents/code/Crownlands`. Your Orca workspace may start at its parent `/Users/tannx/Documents/code`; work ONLY inside Crownlands. The project has no Git repository. Do not initialize Git, invent commits, or edit unrelated projects. A source manifest is in `project-docs/reviews/2026-11-10-full-code-review-manifest.json`; record changes during review rather than claiming coverage of unseen versions.

Another root session is actively finishing first expedition/extraction/shipment logistics and its schema3 migration. The hall economy UI was previously verified on a coherent foundation0.2 release while logistics was in progress. See `project-docs/implementation/hall-economy-plan.md` (including parallel integration boundary), `2026-11-10-logistics-plan.md` and `logistics-progress.md`. The other root is currently running the full browser suite and reviewing logistics. Dist at http://127.0.0.1:4173 may change independently; report the version actually tested and distinguish current source from served code.

## Phase1 permissions

Read all implementation code: `app/src/*.js`, `app/*.css`, `app/index.html`, `scripts/*`, package/build/Playwright configuration, and all unit/browser tests. Inspect required data fixtures and current canonical design rules. Binary source art and node_modules need no audit. Write ONLY your review report and isolated temporary reproductions. Do NOT modify shared app/test/config files in this phase; do not overwrite dist, rebuild the live app, stop/restart its service, run shared suites that overwrite shared test results, or use personal browser storage.

You may run pure Node reproductions on cloned states. To run broader checks or builds, use a clearly identified isolated temp copy/snapshot, with its own test output and browser origin/context. Never take over4173. The local server config is hardcoded in scripts/local-config.mjs; override a port ONLY inside your temporary copy if needed. This repository uses Playwright with system Chrome at `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`. Record failing commands as evidence; a reproduced bug is a successful review finding, not a failed review task.

## Review priorities

1. Simulation/event boundaries: exact per-unit completion/upkeep, parallel upgrades, paused/speed invariance, large vs small advances, overflow/unmet, integer precision, MAX_TIME, infinite loops and excessive valid-state work.
2. Logistics: actual routes/travel/recall/safe return, real local food sources, no teleport/double payment, mine stock/production, real wagon capacity/roundtrip, full storage/blocked payload/discard, ownership and conserved home capacity. Inspect current code independently; do not assume an old passing report proves new code.
3. Saves/migration: original schema1/2 validation before migration, schema3 consistency, import rejection preserving live state, duplicate/overdue IDs, unpaid assets and forged ledgers, corrupted backup recovery, manual/auto/quick independence, storage failures and same-origin conflicts. Keep user saves untouched.
4. Economic UI integration: gross/upkeep/net vs actual warehouse growth; cumulative investment vs hourly rates; queued jobs prepaid once; forecast purity, full-storage ETA and future arrivals/returns, short horizons nearMAX_TIME, same-time paused commands/imports invalidating display; local city vs other inventories. The hall's known foundation0.2 milestone schedule and ledger/status copy MUST be reviewed against now-enabled logistics. Identify genuine integration defects rather than hiding them as deferred work.
5. UI end-to-end: every city entry and world selection, stable focused inputs, accessible keyboard/Space actions, camera pointer/pinch/capture, locator/job/completion targets, modal pause/focus return, desktop overflow scrolling vs mobile sticky chrome, keyboard/touch reachability at320/390/1024/1440.
6. Build/offline/local service: cache version/asset coverage, actual two-release updates and checkpoint failures, reload offline, server file/path handling, persistent local origin. Identify concrete correctness/security faults; do not invent hypothetical compliance processes.

Canonical sources: `research-and-economy.md` B29–B33, `final-design.md`, `technical-design.md`, `interface-and-art.md`, and `reviews/2026-11-10-research-and-economy-resolution.md`. Preserve implemented subset boundaries. Taxes, maintenance, advanced research, combat/D1/AI not yet enabled are not bugs merely because the full design mentions them. Distinguish missing activated integration from deliberately deferred modules. No broad feature expansion or arbitrary balance changes.

## Deliverable

Write `project-docs/reviews/2026-11-10-full-code-review-claude.md` in Vietnamese or clear English. Include:

- Reviewed file/version coverage, source changes during review and exact verification limits.
- Prioritized Critical/Important/Minor findings with file:line, concrete trigger, expected vs actual outcome, deterministic reproduction or test evidence, and smallest safe correction.
- Useful usability improvements with a concrete benefit, separately from correctness defects.
- Tests run/pass/fail and gaps; do not claim full review or green suites without evidence.
- What can be fixed independently and which files conflict with active logistics work.

If a suspected bug is not reproducible, mark it unconfirmed and give the reasoning; do not pad the report. Do not just stop after running existing tests: read every implemented module and trace cross-module contracts.

Finish via Orca `worker_done`, summarizing counts and most important findings, report path and evidence. The coordinator will review your report, reproduce material findings and send a separate follow-up for fixes; do not edit production code until that follow-up.
