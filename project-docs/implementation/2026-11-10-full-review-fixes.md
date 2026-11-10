# Fixes after Claude's full review

User authorized the full review and improvements. Findings: `../reviews/2026-11-10-full-code-review-claude.md`. The logistics root has completed its release and is idle; shared-code fixes can now proceed without conflicting with that implementation. No Git repository; preserve a coherent before snapshot and exact evidence instead of inventing commits.

Coordinator verified current `storage.js` overwrites both original future-version strings after recovery reset+save. An actual recalled12-person detachment held at a full granary gives snapshot troops40 but upkeep52. A grain-mine recall100s before MAX_TIME produces an arrival500s beyond the horizon and becomes unsaveable; 8× elapsed time stops3s before the horizon. World-map code uses a single pointer with no id check, confirming the multi-touch mechanism.

## Authorized correction scope

1. **I1 recovery:** preserve the exact raw primary/backup before any reset of unreadable/newer data; export original raw data from recovery and after recovering. If archival storage fails, abort before overwriting originals. Repeated resets/autosaves must not silently replace the preserved incident. Preserve healthy manual slots and migration semantics.
2. **I2 economy integration:** distinguish garrison/home-held/away troops and local upkeep; show field armies, wagons, returning cargo and actual arrival times, with navigation to field operations. Keep local-city ledger separate from disposal on army/wagon inventories. Explain growth from incoming cargo separately from hourly production. Do not add held upkeep twice: city.upkeep ALREADY includes held-home armies. Replace ambiguous upkeepAfterQueue copy with explicit queued incremental upkeep and projected end-of-horizon upkeep, or compute exact queue-finish state without recursion. Never add every returning army to an unconditional current/queue-only total. Keep counts/local scope and labels consistent.
3. **I3 world touch:** track pointers individually, support midpoint-anchored two-finger pinch, preserve one-finger pan, prevent gesture taps/untracked moves/stale capture. Reuse the existing city-camera interaction pattern. Verify with real CDP touch events in addition to any synthetic regression.
4. **M2/M3 autosave:** keep command durability in the session; reserve rotating auto history for the periodic checkpoint and pre-load/import safety snapshot. Skip unchanged session writes, especially while paused. Any validated-store cache must be invalidated by actual primary/backup byte changes and must not expose mutable cached state to the live game or callers. Retain strict validation and failure/conflict reporting. Use measured regression/benchmark evidence for any caching change.
5. **M1/M4 edges:** clamp elapsed time to MAX_TIME and keep terminal state saveable. Permit physically valid returning arrivals beyond the elapsed horizon only within their existing bounded route/duration, or an equally safe atomic solution; never teleport, delete a detachment or let valid commands create an unsaveable state. Use configured secondsPerTile for route-marker interpolation, including partial-edge recalls.
6. **Small usability fixes tied to existing actions:** clear feedback when unload transfers0, and preserve meaningful keyboard focus after recall/unload/discard removes/hides controls. Show carried food/known incoming cargo where it explains current mechanics. Larger route drawing and speculative wasted-trip warnings remain suggestions unless needed for correctness; no feature/balance expansion.

## Workflow and acceptance

- [x] Claude reproduces and adds meaningful failing regressions before each correction group; records RED evidence.
- [x] Implements corrections within existing app/tests/CSS/controllers and updates applicable UI copy/help/readme. No schema/balance changes without a demonstrated need, no new dependencies, no personal storage or fixed-origin changes.
- [x] Runs complete unit and browser suites in an isolated snapshot/origin and validates320/390/1024/1440 plus offline/two-release updates, recovery failures/exports, field economy, two-finger touch, saves/conflicts, periodic history and horizon cases.
- [x] Coordinator reviews final changes/evidence; fresh independent Claude re-review checks fixes and remaining original findings.
- [x] After confirmed green, build/release to the existing server and document exact version and remaining limits. User approval of ordinary bug fixes/reversible local release is already supplied; no additional permission step.

Reviewer implementation caveats: do not treat the original report's suggested home-upkeep addition as correct (it double counts home-held upkeep). `logistics.retired` is a separate ledger and is only attributable to the first player city in the current single-player slice; never subtract its discard total again from local stock or label it local-city spending. Recovery is an explicit user action, but the data-preservation promise still requires keeping/exporting the unreadable originals.


Implementation status (Claude, 2026-11-10 16:10 +07): see `../reviews/2026-11-10-full-code-fixes-claude.md` for RED/GREEN evidence, isolated build `e2a8b558e5eabcad`, exact pass counts and remaining gaps. Live `dist`/4173 not rebuilt.

Final coordinator release: combined army-clarity + all audit corrections is live as `541c3aaf3833dd2d`,60 files.88/88 unit and78/78 browser tests passed on the byte-identical frozen tree; fresh390/1440 live/offline smoke passed. See [final validation](../reviews/2026-11-10-reviewed-release.md) for review stages, additional N/F fixes and precise limits. Earlier unreleased-version statements above remain historical evidence.
