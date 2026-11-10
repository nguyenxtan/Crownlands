# Execution ledger — plan: 2026-11-10-barracks-plan.md

Pre-flight: simulation → storage share schema2 with explicit v1 migration; simulation → barracks view uses offers/summary, view never owns assets; existing build copies new modules offline. No dependency additions. User approved implementation; execute inline without repeated permission requests.

Ruling: queue maximum5 orders, per-soldier completion, all payments/reservations at placement — makes mixed batches observable and bounded; these are subset defaults, not claims of balance. No cancellation in this approved step.

Ruling: recruitment gets its own `trainingSequence`; existing field `sequence` remains the number of paid field upgrades — preserves the already-tested upgrade invariants and makes legacy migration small. A later combined command/event engine will need a new ruleset.

Ruling: no Git exists here; use implementation ledger, tests and temporary source snapshot instead of Git-only workflow. Concurrent city-work changes are outside this feature and must be retained.

Baseline: npm test23/23. Existing browser files now also include in-progress city-work tests/module from separate work; preserve and integrate them.

Task1 complete: new recruitment tests observed RED, then exact payments/reservations, per-unit timing and mixed field/training behavior passed. Existing field semantics unchanged. A case-sensitive error-message assertion was corrected without changing behavior.

Task2 complete: genuine v1 fixture captured before edits; schema2 validation and all-slot in-memory migration passed. Combined unit suite34/34 at that point. Reads leave stored bytes alone; successful first save backs up original bytes.

Task3 complete: browser flow first failed at missing barracks panel, then all four initial new flows passed. Added local `barracks.css` rather than editing the large shared stylesheet — keeps concurrent city-work and existing art styles isolated. Input and selection survive ticks/navigation; local preference persistence added after a failing reload test.

Task4 complete: one fresh read-only reviewer, no Critical and one Important stock/ledger consistency finding. Reproducing regression failed before reconciliation; passed after. Whole-suite future-schema regression fixed through its own RED→GREEN test. Final npm test36/36; full Playwright28/28;39-file build `a1c6df15e55cbe94`. HTTP/source/dist match, health200 at fixed port, no overflow/page errors at1440/1024/390. Source/art/contracts preserved; no personal saves accessed. See barracks-validation.md.

Ruling: validate stock conservation in schema2 (also after legacy migration) — prevents inconsistent imported assets from surviving legal recruitment; valid old engine saves retain exact balances.

Ruling: UI troop/count preference is local presentation data outside the deterministic game save — reload/update retains it, export/import carries actual queues/troops rather than an unsubmitted form draft.

Ruling: no second reviewer loop; reproduce and fix the Important finding, verify the whole suite, then deliver. No combat/balance/playtest claim.

Final integration: concurrent city-construction UI arrived after the39-file recruitment build. Rechecked all38 app files against the40-file distribution (`816fc37bd727a398`) and reran complete suites:36/36unit,30/30browser. The two extra construction flows and their module are separate work, retained and passing. No additional recruitment code changes after these checks.
