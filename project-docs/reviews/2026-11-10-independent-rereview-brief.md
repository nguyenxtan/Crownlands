# Independent Claude re-review before release

User requested Claude review all Crownlands code and improve bugs. You are a FRESH independent Claude reviewer, not the implementer. Target ONLY `/Users/tannx/Documents/code/Crownlands` (non-Git). Your Orca workspace starts at its parent `/Users/tannx/Documents/code`; do not touch unrelated projects.

## Background and evidence

1. Initial full review: `project-docs/reviews/2026-11-10-full-code-review-claude.md`. It found I1/I2/I3 and M1/M2/M3/M4.
2. Authorized correction requirements: `project-docs/implementation/2026-11-10-full-review-fixes.md`.
3. Implementer report: `project-docs/reviews/2026-11-10-full-code-fixes-claude.md`. Implementer reports80 unit/67 browser pass on isolated port4391,150 fuzz seeds,7200 forecast comparisons. Its coherent before copy: `/tmp/crown-fix-claude/before`; tested implementation copy: `/tmp/crown-fix-claude/green`. Only the green copy's local-config port differs from repository configuration. Source app/tests/e2e matched green byte-for-byte before the coordinator's additions below.
4. Other logistics root is DONE/idle, so no ongoing migration ownership conflict. The release is schema3/foundation0.3; do not treat logistics as deferred. Dist4173 is deliberately STILL the previous release until this review is finished. Do not review old dist as the new implementation.

Coordinator read changed storage, economy, hall, controller and map code and verified the report's fixes against the code. Then found an extra reproducible recovery defect: incident JSON `{version:1,incidents:[null]}` makes archive deduplication throw TypeError and blocks future recovery. Added a RED regression (`I1 malformed incident entries...`) for6 malformed entry forms, then fixed `incidentList()` to require each entry to contain null/string primary/backup; malformed incident JSON is preserved as a raw archived incident instead of being discarded. Also clarified hall copy: a zero paid-work list refers specifically to upgrades/recruitment; carried food is **transferred from warehouse to army inventory**, not called a spent expense. These coordinator changes affect `storage.js`, `hall-view.js`, and `tests/full-review-fixes.test.js`. Current `npm test`:81/81 passing.

## Your task

Read the final source and independently verify all original findings are truly fixed without regressions. Read every modified module and its cross-module contracts, plus affected index/CSS/README and new tests. Fill the initial review's CSS gap by checking relevant app CSS and actual320/390/1024/1440 layouts. Concentrate on:

- I1 exact raw-byte archival before any overwrite, readable backup repair, future versions, malformed archive shapes, archival quota/write failure, repeat incidents, salvaged healthy slots, export availability before and after recovery. No data destruction if preserving it fails.
- M2 cache invalidation keyed to actual BOTH raw keys, strict validation on changed/forced writes, clone isolation, storage conflicts/failures and update checkpoint semantics. M3 durable commands without rotating out periodic history; pre-load/import safety remains.
- I2 count garrison/held/away separately and charge local upkeep once; queue incremental upkeep vs actual forecast end upkeep, returning cargo and ETA, blocked carts, local vs retired disposal accounting, field-summary navigation/focus, and correct wording about transfers vs expenses. Do not demand field operations be mixed into the paid-investment list if a clear separate section correctly shows them.
- I3 real two-finger map pinch/midpoint stability, one-finger pan, tap suppression, untracked pointer, mouse/pointer capture cancellation, zoom limits and no accidental site selection. City camera behaviour must survive.
- M1 reaching MAX_TIME at8x, late returning arrivals staying bounded/validated/saveable without teleporting or deleting units; forged arrivals remain rejected. M4 configured per-tile interpolation including partial-edge recall.
- Small existing-action usability: no-op unload feedback, focus after disappearing controls/rows, meaningful field food lines. Optional route-line shortening and wasted-trip warning are out of correction scope.

Use the source/snapshots and your own isolated reproductions. You may create an isolated temp copy and run suites, but do not modify shared app/tests/config, current dist, service,4173 or personal saves. Use a private port such as4393 and separate browser contexts/output. If needed build only inside your temporary copy. Do not poll other agents or stop servers you did not create.

Run the full browser suite on the CURRENT source including the coordinator additions, since the implementer's67 pass predates those additions. Run a relevant unit selection or full unit suite as needed to verify your checks. Evidence must identify actual build hash/tested source and comparison to current files. Avoid testing mismatched Node source and browser dist. Report unconfirmed concerns as such, with a smallest repro to establish them.

## Deliverable

Write ONLY `project-docs/reviews/2026-11-10-full-code-rereview-claude.md` (plus isolated temporary tests/artifacts). Report each I/M as resolved or not, any new Critical/Important/Minor findings with exact file:line/repro, counts and remaining verification limits. Do not edit production code in this task. Finish via `worker_done` with the report path, tested version/hash and actual counts. The coordinator will address any material findings, then build/release the verified result at4173.
