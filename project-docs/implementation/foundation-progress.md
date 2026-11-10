# Execution ledger — plan: 2026-11-10-foundation-plan.md

Pre-flight: simulation → storage share a versioned state schema; storage → UI returns a validated state without elapsed wall time; scenario → views uses original location and slot IDs. No conflicting interfaces found.

Adaptation: this folder is not a Git repository. Work stays in the authorized project, with this durable ledger and test output instead of Git-specific task scripts or commits.

Scope: only field 1→2 has complete economic trial values. Other buildings remain selectable information, and all S00 combat/AI acceptance gates remain pending.

Task 1: complete — 8 tests first failed with missing simulation, then 8/8 passed. Covers net-before-clamp, 20,000 one-second segments vs one advance, exact upgrade cost and boundary, pause and four speeds.

Task 2 RED: 7 persistence tests added; real roundtrip/slots/write/recovery tests failed against stubs before implementation.

Task 2: complete — 15/15 unit tests passed including all 7 persistence cases. Invalid/future imports, failed writes and backup recovery covered.

Task 3 RED: browser city-flow test failed at missing “Nội thành” control against the empty shell. Added map, paid upgrade, save/reload and offline flows before implementing views. Ten authorized local image copies prepared; grain v2 unchanged, other copies provisional.

Task 3: complete — 15/15 unit and 6/6 browser tests passed. Browser tests exercise real paid upgrade, pause/speed, in-progress reload, manual slot restore, valid export/import, invalid import, offline reload and all 16 field hit targets at 1024×768. Initial UI failure was a flex column shrinking the detail below its content, causing the known-sites section to cover the upgrade button; set inspector children non-shrinking and retested successfully. A case-sensitive completion-text assertion was corrected to case-insensitive without changing behavior.

Task 4: in progress — fresh-context read-only final review dispatched; desktop visual inspected. Reference hashes 7/7 and 10 runtime asset provenance entries match. Runtime image copies total 724,349 bytes; no original art or production approval changed.

Final review: fresh reviewer found no Critical, three Important and one Minor. One fix pass, no second review:
- Fixed missing-version primary bypassing backup — new regression failed on `{}`, then passed after classifying malformed envelopes as corruption rather than future versions.
- Fixed inconsistent imported sequence leading to an unsaveable next paid command — new regression failed before strict sequence/completed-plot/job and expenditure consistency. Added ledger bound regression (failed before fix), plus all-sixteen-upgrades roundtrip check.
- Fixed suspended foreground catch-up — browser regression first advanced sixty seconds unexpectedly; now passes after a frame discontinuity policy. Full suite: 19/19 unit, 7/7 browser; build 21 files, content hash 06831419862292ff.

Final: Ruling: a foreground callback gap greater than 1,000 real milliseconds is treated as suspension and discarded — avoids unexpected offline catch-up; cost if wrong: a long active rendering stall slows game time rather than advancing it. Ordinary frames integrate fully and still process each simulation event boundary at every speed.

Final: minor (deferred): a newly installed service-worker build may require a second reload to appear; no update banner/controllerchange refresh in 0.1. Existing saves remain local.

Final: Ruling: actual OS sleep behavior was not tested — deterministic callback-suspension and visibility policies are verified; cost: platform-specific lifecycle behavior could still differ.
Final: Ruling: cross-browser compatibility is not claimed — Chrome on macOS is the tested target; cost: other engines may need fixes.
Final: Ruling: no full playtest/balance conclusion — automated tests establish this economic subset only; cost: enjoyment, pacing and wider balance remain unknown.
Final: Ruling: final art approval is not implied — nine provisional copies and the approved grain v2 are runtime inputs; cost: final art work remains.
Final: Ruling: full S00/A1 acceptance stays pending — combat, movement, recruitment and AI are out of this approved foundation; cost: it cannot yet demonstrate conquest.

Task 4: complete — final Important fixes verified RED→GREEN, full suites green, screenshots inspected at 1440×1000 and 1024×768; source preservation verified. Work is retained in the project (no Git integration applies).

## Parallel maintenance · 2026-11-10

User requested focus on Crownlands and parallel tasks. Three independent agents handled simulation, storage and UI; the coordinator handled offline build versioning and integration. This pass improves the existing browser game; it adds no server backend or gameplay system.

- Simulation: upgrade offers now disable a job whose completion would exceed the trial time limit, matching command validation. Boundary regression failed before the fix, then passed.
- Storage: missing/corrupt state version metadata now permits recovery from a valid backup. Explicit unsupported schema/ruleset still blocks rollback and preserves the primary. Recovery regression failed before the fix; unsupported-version preservation is also covered.
- UI: Space activates the focused button rather than the global pause shortcut; Space on the map/body still pauses. Returning to the starting city also selects its inspector details. Both browser regressions failed before the fixes.
- Build: the offline cache fingerprint includes relative file paths and their content hashes. Renaming an asset changes the cache version; identical builds remain stable. Regression ran against an isolated temporary build, failed before the fix, then passed.

Final integration: `npm test` 23/23; `npm run test:e2e` 13/13 on Chrome; build 25 local files, hash `52e3bafb1f4f6bc8`. Built game/storage/main modules match current sources. Local service remains available at http://127.0.0.1:4173. Tests use isolated browser contexts and do not alter personal saves. Seven reference hashes, U08 and all 14 runtime-art source/output pairs still match their manifests. No asset approval, balance, save schema or full S00 acceptance changed. The previously noted service-worker update/reload limitation remains.
