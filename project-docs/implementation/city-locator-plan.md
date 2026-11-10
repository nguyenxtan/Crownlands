# City locator and completion notices

User approved the proposed list of buildings/resource plots, camera location/highlight, clear built/upgrading/locked states, and short upgrade-complete notices with “làm đi”.

Implementation stays in UI modules: new city-locator.js for a searchable native dialog; a camera.focus(anchor) API and CityView integration; a separate city-notices.js for completion notices; shared new city-locator.css. Read existing game jobs/events only; preserve simulation, storage, original art, military work and layout IDs. Built/empty/locked status derives from actual building levels and layout metadata, not new unlock rules.

- [x] Prove missing locator/notices with failing browser flows.
- [x] Add a “Tìm nhanh” control, accent-insensitive search by name/slot, building/resource filters and current states.
- [x] Locating opens the city if necessary, selects its detail, zooms to at least2× and pans within existing bounds; a highlight marks the target without animation movement.
- [x] Notify newly completed field upgrades, group simultaneous completions, offer “Xem ô”, and dismiss after8 real seconds. Initial load/import/restore must not replay historical events or treat disappearing jobs as new completions.
- [x] Run full unit/browser suites, inspect desktop/mobile layout, verify offline/current build, and perform one fresh read-only review of import/completion/focus boundaries.

Only field completion is notified here; recruitment/combat reporting remains with the other session. Tests use isolated contexts and real player export/import/upgrade flows.

## Delivered behavior

“Tìm nhanh” is a separate button at the city's upper-right. Its dialog lists14 building positions and16 resource plots, with building/resource filters, unaccented search and slot aliases such asR4. It distinguishes active upgrades, operating plots, built buildings, unbuilt slots and explicitly locked/reserved slots from existing state/layout. No-result feedback and Enter for a single match are supported. Selecting a result closes the dialog, reveals the city below the sticky header when necessary, zooms to at least200%, selects its detail and highlights it. The current upgrade list uses the same locate action.

Completion notices compare previously pending jobs against genuine matching plot-complete events. A new game object or time rewind resets their baseline and clears visible notices, preventing import/reload replay. New completions while a notice is visible are combined; text lists up to three names, then the remaining count. “Xem ô” locates the first completed plot even from the world scene; × closes it, otherwise it expires after8 real seconds. Notices use a separate polite log and do not interfere with the existing toast status region.

## Evidence and review

The first feature run failed on the missing locator control and missing completion notice; the initial restore-without-false-notice characterization already passed. All four passed after implementation. The offline test uses the real precache and reloaded save before searching for an active upgrade.

Fresh read-only review found one Important mobile defect: from a scrolled inspector, locating a completion selected the right plot above the viewport. A fifth browser regression failed with plot center−51.3px versus the sticky header's72px bottom. `locate()` now scrolls the city viewport into view before applying camera focus; the regression passes. The reviewer also checked320/390px layout, keyboard search, classification, grouping/expiry and save-reset handling, with no further Important finding.

The first complete suite exposed an integration regression: adding the finder to the lower camera toolbar made it overlap R08's construction timer at1024px. A browser hit-test confirmed the finder received that timer's click. Moving the finder to the upper-right restored the existing construction-marker regression without weakening it.

Final checks: `npm test`36/36; `env -u NO_COLOR npm run test:e2e`40/40. Build45 local files, fingerprint `2e741815a537d5b5`; current served modules/CSS match sources. Inspected finder/location/notice screenshots at1440×1000,1024×768 and390×844; no horizontal overflow. [Finder on mobile](../../assets/previews/city-locator-v01/finder-390.png), [located building](../../assets/previews/city-locator-v01/located-1440.png), [completion notice](../../assets/previews/city-locator-v01/complete-390.png); [location checks](../../assets/previews/city-locator-v01/locator-check.json), [notice checks](../../assets/previews/city-locator-v01/browser-check.json).

No game, storage, main-controller, save schema, military code, original art or slot data changed. Personal saves are untouched. Chrome/macOS remains the tested browser target.
