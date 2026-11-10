# City upgrade list · 2026-11-10

User redirected this session away from recruitment/movement/combat because another session owns that work. This task adds a read-only list of existing field upgrades without changing simulation, storage, balance or main-controller code.

The city inspector now shows “Đang nâng cấp” when field jobs exist. Rows show resource/plot, target level, remaining game time and progress, sorted by completion time. Clicking a row selects its plot through the existing CityView callback. Pause/speed use the existing simulation clock. Completed rows disappear; the whole panel hides on the world scene or with no field jobs. Recruitment/other jobs without a matching city plot are excluded.

Files: new `app/src/city-work.js`, new `app/city-work.css`, three hooks in `app/src/city-view.js`, and separate `e2e/city-work.spec.js`. The component loads its own CSS link; build/service-worker precache automatically includes both new files. No edits to game.js, storage.js, main.js, index.html, shared styles.css or the other session's tests.

The panel appears under the city label, stays visible while the desktop inspector scrolls, and takes its own full-width row on compact screens. Its internal list scrolls for many jobs. Stable row nodes preserve keyboard focus on timer updates. Row identity includes city/job/plot/start, so importing a different world with reused job numbers replaces the correct icon, accessible name and click target. A real export/import regression first failed on stale row identity, then passed after this fix.

Verification: the first two tests failed before the feature existed, then all three passed. Full browser suite:23/23, including the three new cases and existing offline/cache-update, click-target and save flows. Screenshots inspected at1440×1000,1024×768 and390×844, with three simultaneous jobs and no horizontal overflow: [1440](../../assets/previews/city-work-v01/city-1440.png), [1024](../../assets/previews/city-work-v01/city-1024.png), [390](../../assets/previews/city-work-v01/city-390.png). Build:35 local files, hash `b155496d8a7cc202`.

Concurrent-work caveat: during final `npm test`, the other session added `tests/recruitment.test.js` and `tests/recruitment-storage.test.js`. The aggregate run was23 passing/11 failing; the failing cases were in these new recruitment suites, including expected schema2 migration versus current schema1. This task does not claim the aggregate unit suite is green and leaves those in-progress tests/code untouched. The implemented city-list browser coverage is green against the served build. Browser checks use isolated contexts and do not touch personal saves.

Later verification during [on-site construction indicators](city-construction.md): the other session's recruitment implementation had landed; full unit suite36/36 and browser suite30/30 passed together. The in-progress failures above are historical results from the earlier run.
