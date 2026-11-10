# Execution ledger — plan: project-docs/implementation/2026-11-10-logistics-plan.md

Pre-flight: simulation produces logistics state consumed by validator and UI; use identical inventory/phase signatures from plan. Existing save validator is strict schema2, so retain it for validating migration input rather than weakening it. No Git: snapshot /tmp/crownlands-before-logistics.zip and JSON replaces commit ranges.

Task1: complete. Baseline36/36; new field simulation11/11 RED→GREEN. Fixed food boundary counting only grain output (clay production is not food).

Task2: complete. Genuine v2 fixture preserved before changes; save tests7/7, full unit61/61. v1/v2 migration validates the old schema first. Added a forecast regression (42240 vs43449 seconds) and included future field boundaries.

Task3: browser implementation complete, final independent review in progress. New browser cases5/5 passed including offline reload and390px. Review by /root/logistics_review.


Final review by /root/logistics_review:3,000 randomized legal states and480 recall times passed read-only review; full4-wagon partial/discard/save case passed. One Important finding: a working army exactly at its return reserve could be imported, leaving a current-time boundary and freezing forecast. Fixed with two RED→GREEN tests: reject noncanonical imported state; advanceGame(0) resolves due safe-return. Full unit suite63/63 after fix.

Self QA: selecting a known site retained inspector scroll, hiding the mine heading. Browser toBeInViewport reproduced RED; all site entry paths now reveal the detail panel. Updated economy copy for active transport and barracks labels distinguishing total hometown capacity from local upkeep.

Final Ruling: combat/AI/research/starvation attrition remain outside this approved first logistics slice. Cost if expanded prematurely: unresolved combat/hunger rules could silently consume or create assets. S00 movement60s/tile is retained as a trial value, not a balance claim. Visual/offline checks were covered by the parent browser suite and screenshot QA, not the code reviewer.

Task3: complete. Final npm test63/63 and npm run test:e2e56/56 passed after the review fixes; build59 local files, cache7568a7cb87628170. Source app equals served dist byte-for-byte. Browser QA confirms selected mine heading visible (viewport y163), mobile390px and offline restore.

No deferred code-review issues. One factual scope-copy correction folded into the release docs/UI; no feature expansion. Existing concurrent city/economy work was preserved. No Git integration or service change; fixed URL remains127.0.0.1:4173.
