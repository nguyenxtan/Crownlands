# Readable city management · 2026-11-10

User requested a UI review and improvements for clarity/readability/management before the proposed hall economy feature. This authorizes implementation of the observed usability fixes; do not add economic forecasts, balance rules or new buildings.

Observed in actual desktop/mobile screenshots: resource cards lack visible names and combine income/capacity into one tiny string; mobile management uses two narrow columns; the sidebar consumes scene width; the pause button is icon-only; costs lack labels; active training is visible only inside barracks while the global work panel lists only field upgrades.

- [x] Give each resource a name, distinct stock/capacity/net-income lines and a storage-fill bar, preserving existing test IDs and amounts.
- [x] Make mobile navigation horizontal and sticky, add a “Chi tiết” jump, and use a full-width single-column inspector. Keep header/nav/clock/notices from covering targets.
- [x] Show upgrade and recruitment work together with explicit counts/timers and location actions. Preserve stable focus/import identity.
- [x] Label immediate costs and game-time durations, show pause/resume words, improve text/control sizes, and keep world-site links on the world view.
- [x] Verify real paid flows, 320/390/1024/1440 layouts, camera/locator sticky-header behavior, offline, save/recruitment preservation, and full suites. Fresh read-only final review; fix Important findings with reproductions.

Implementation: resource-bar.js/CSS, ui-layout.js/CSS, small controller/index/view hooks, and updates to the existing CityWork display. Simulation, storage, military rules, source artwork and city placement remain untouched. Browser work uses isolated contexts.

## Verified result

Built 49 local files, version `425ebeee197372a2`, served by the running Crownlands LaunchAgent at http://127.0.0.1:4173.

- `npm test`: 36/36 passing.
- `env -u NO_COLOR npm run test:e2e`: 44/44 passing (34.3s). Includes paid upgrades/recruitment, stable focus, import/reload, actual app updates, offline assets, camera pinch/pan and all city-entry routes.
- New resource/work/mobile specifications failed on the old UI before implementation. The 320px card containment regression failed before wrapping the grain rate. The mobile entry regression reproduced scene top -307px below a scrolled inspector, failed before the fix, and now passes for both enter-city and objective routes at320/390.
- Scene reveal now runs centrally after `setView()` renders, covering navigation, detail entry, objectives and keyboard shortcuts. Location actions then apply their precise camera focus without a later navigation callback overriding it.
- The pre-existing update test now checks that update/title rectangles do not overlap in either axis; its former horizontal-only assertion assumed the old floating update button below the header.
- Fresh independent read-only review found no Important/Critical issues. Reviewer checked queued recruitment timing/progress and net grain changes, sticky-control hit targets, focus stability and import identity. The one Minor320px grain-card overflow was fixed and rechecked at320/390, including vertical containment.
- Final screenshots and measured card/layout widths: `assets/previews/usability-v01/`. No horizontal overflow or runtime errors at320/390/1024/1440. Mobile detail uses the full viewport width. The final screenshots include both field management and mixed-work overview.
