# Phủ thành · sổ kinh tế · 2026-11-10

User requested reviewing the existing economics documentation and implementing the hall economy view. Reviewed canonical `research-and-economy.md` B30–B33, `interface-and-art.md`2.3, the city-budget source and the Claude review/resolution against runtime0.2. Independent read-only review confirmed this scope.

The hall will show local stock/capacity/net rates and open an expanded economy book with gross production, troop consumption, storage forecasts and cumulative actual ledger entries. Four resources remain separate. Forecasts advance a cloned game through known upgrade/per-soldier completion boundaries, respecting clamps and MAX_TIME. They never charge prepaid jobs again, change balance rules or edit live saves. No resource reservation, historic hourly expense reconstruction or deferred fees are invented.

- [x] Add a pure local-city snapshot/forecast model using existing simulation and integer asset units; verify simultaneous completions, full storage, cumulative conservation, purity and horizon limits.
- [x] Replace the S01 placeholder with a compact live overview and a readable expanded book. Preserve focused controls, clearly label game-time horizons/cumulative totals and paused dialog behavior, support resource filtering and recruitment navigation.
- [x] Verify paid upgrade/recruitment, paused changes, import/reload/offline, keyboard/focus, and320/390/1024/1440 layouts. Run all suites and fresh independent review before completion.

Maintenance, taxes, research, transport, debt and D1 remain at their documented activation status; this UI does not claim those modules exist. Existing aggregate `ledger.spent` can show actual investment since game start, but cannot truthfully split historical recruitment/building expenses or reconstruct last-hour spending. Native dialogs suspend simulation, matching existing save/help dialogs.

## Released and verified

Coherent foundation0.2 + hall build `8d4805ef9ed3f8d3` (52 local files), served at http://127.0.0.1:4173. Existing save schema and balance unchanged in this release. Independent reviewer checked8 varied queue states with96 raw-stock/storage-ETA assertions against the existing engine and confirmed live state remains unchanged.

- `npm test`:42/42 passing on the released snapshot.
- `env -u NO_COLOR npm run test:e2e`:51/51 passing (40.1s), covering the complete baseline plus7 new hall cases.
- New hall acceptance failed before implementation. Work navigation regression failed before fixing the desktop inspector scroll container and transferring focus to its first row. Sticky close control remains hit-testable after scrolling the mobile book to the bottom.
- Fresh final read-only review at320/390/1024/1440 found no remaining findings. Screenshots, widths, runtime-error checks and provenance: `assets/previews/hall-economy-v01/`.

## Parallel-session integration boundary

At15:22:19, another root session changed `app/src/game.js` to logistics/schema3 while its matching save validator was still being implemented. The hall release had already been built with coherent schema2. A subsequent workspace-wide test run therefore mixed unfinished schema3 with schema2 validators and failed; that is **not** reported as a passing full-workspace run.

The hall was fully verified in an isolated snapshot of the served schema2 app, baseline+hall tests and fixtures. Building that snapshot reproduced the exact served version above. Paths/provenance are recorded in `release-snapshot.json` and `test-provenance.json`. No logistics work or personal saves were reverted, and the live dist was not rebuilt from the unfinished schema3 tree.

For the logistics implementer before a schema3 release: preserve hall hooks in main/index, `revealRegion(element,scrollContainer)` and new economy/view/CSS files. Integrate new sent/received/discarded ledger rows and home-held detachments, update module-status copy, and extend storage milestones to logistics arrival/safe-return boundaries before claiming those forecasts cover transport. The current milestone schedule deliberately covers the released upgrade/recruitment engine; this release is not acceptance of the in-progress logistics module. Forecast end stocks already delegate to `advanceGame`; avoid replacing that with net×time. Re-run the complete combined schema3 suite after migration/UI are ready.
