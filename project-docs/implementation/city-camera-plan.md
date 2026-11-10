# City camera implementation plan

> **For agentic workers:** Use superpowers:executing-plans for inline implementation. Track the steps below; this folder has no Git repository.

**Goal:** Zoom and pan the playable city with mouse/touch, reset to its original full view, and preserve normal building/plot selection.

**Architecture:** A standalone `CityCamera(stage,board)` component transforms only the existing board, with a separate stylesheet and toolbar outside the moving scene. `CityView` creates it once. Camera state stays in memory, outside simulation/saves. No new dependencies.

**Tech stack:** Existing native ES modules, DOM/CSS, Pointer Events, wheel, ResizeObserver; real Chrome/Playwright gestures.

**Spec:** User approved the proposed wheel/pinch zoom, dragging and “Về giữa thành” with “ờm làm đi”. Implementation choices:100–300% zoom,1.25× button steps,6px drag threshold, content-bound pan limits, keyboard arrows/+/−/Home while the stage is focused.

## Constraints and review focus

- Preserve original slots, markers, artwork, military work, simulation and save schema.
- A drag or pinch must never issue a building/plot click; a fresh tap/click afterward must work.
- Zoom around the pointer/pinch midpoint; keep city edges reachable and block endless empty panning.
- Pointer cancel/lost capture, resize, hidden navigation and two→one-finger transitions must leave the camera usable.
- Keep toolbar/labels outside the transformed board; no page overflow or native page pinch inside the city.
- Respect touch page scrolling outside the city, reduced motion and keyboard access.

## Task 1 · Desktop camera

Files: new `app/src/city-camera.js`, new `app/city-camera.css`, constructor hook in `app/src/city-view.js`, new `e2e/city-camera.spec.js`.

- [x] Write/run failing real-browser checks for pointer-anchored wheel zoom/reset, drag from a building without selection, subsequent direct click, limits/keyboard/resize.
- [x] Implement 1–3× scaling, bound translation, toolbar, click suppression after drag, resize handling and keyboard controls.
- [x] Run desktop checks and inspect the assembled city at desktop/compact sizes.

## Task 2 · Touch and delivery

- [x] Write/run failing real Chrome touch pinch/pan/tap checks using CDP Input events and a mobile context.
- [x] Add multi-pointer midpoint/distance zoom, capture/cancel cleanup and safe touch gesture transitions.
- [x] Run full unit/browser suites, inspect390px and desktop screenshots, verify served build and record actual results.
- [x] Fresh read-only review of gesture/capture/resize handling; fix any important concrete finding with a reproduction.

No extra approval gate: the user has explicitly asked to implement the proposed feature now. Keep existing project implementation docs instead of introducing a separate plan tree or VCS.

## Execution record

Four new real-browser tests failed on the missing camera controls before implementation, then passed after the standalone module/CSS and constructor hook were added. No changes to simulation, saves, main controller, military work, artwork or placement data.

Mouse wheel zoom anchors to its pointer; button/keyboard zoom anchors to the viewport center. Translation is clamped to the enlarged board's excess over the padded stage area. At100% the city already fits, so panning stops at the full-view bounds. Camera zoom/offset stay in memory when switching city/world; reload begins at the original full view. The stage supports arrows,+/− and Home when focused, and pointer handlers distinguish taps from drags after6px. Toolbar controls remain outside the transformed scene. Touch-action is disabled only on the city stage; normal page scrolling outside it remains available.

Fresh read-only review reproduced one Important bug: a mouse released outside the stage before capture starts could leave a stale pointer, causing later hover to pan. A fifth real-browser regression failed with98px unintended movement. Window release/cancel listeners plus a mouse-button recovery check fixed it; the regression now passes and ordinary following clicks still select. The reviewer also exercised real two→one touch continuity, touch cancel, lost capture, keyboard selection after drag, navigation cleanup and outside-city scrolling; no additional Important finding.

The first full browser run also caught an integration issue: HTML output created a second implicit status region and made an existing import-toast check ambiguous. Replaced the percentage with a plain text span; the existing import regression went RED→GREEN without changing the test. Removed compositor pre-promotion so Chrome re-rasterizes labels crisply when zooming.

Final verification: `npm test`36/36; `env -u NO_COLOR npm run test:e2e`35/35, including all five camera cases and the concurrent recruitment suite. Build42 files, fingerprint `12dd606ca733abab`; live server modules/CSS match current sources. Desktop/compact/mobile screenshots inspected at100% and195%, no horizontal overflow. [1440px zoom](../../assets/previews/city-camera-v01/zoom-1440.png), [1024px zoom](../../assets/previews/city-camera-v01/zoom-1024.png), [390px zoom](../../assets/previews/city-camera-v01/zoom-390.png), [browser measurements](../../assets/previews/city-camera-v01/browser-check.json). Tests and previews use isolated browser contexts; personal saves are untouched. Chrome/macOS is the verified target.
