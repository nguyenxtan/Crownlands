# Crownlands: full code review (Claude)

Reviewer: Claude (Opus 5.5), Orca task `task_3a774e45d9bf`. Date: 2026-11-10, 15:34–15:50 +07.
Scope: read-only review. The only file written in the project is this report. All builds and tests ran in isolated copies under `/tmp/crown-review-claude/`. The browser suite used port **4391**. Port 4173, `dist/`, the service and personal storage were not touched.

## 0. Summary

| Severity | Count | Items |
|---|---|---|
| Critical | 0 | none |
| Important | 3 | I1 recovery reset destroys unreadable or newer-version saves · I2 hall/economy book is not integrated with logistics (troop/upkeep mismatch, field work invisible, discard row dead) · I3 world-map multi-touch jumps the camera and has no pinch |
| Minor | 4 | M1 MAX_TIME edge: late recall makes the state unsaveable, and 8× cannot reach the end · M2 the per-second autosave re-validates the whole store · M3 every command rotates the 5 auto slots · M4 `armyPosition` hard-codes 60 s/tile |
| Fixed by the other session during this review | 2 | stale "vận chuyển chưa được kích hoạt" copy in the economy book · barracks "Quân đồn trú" label |

The core simulation is in good shape. A randomized differential fuzz ran 150 seeds against both the snapshot and the live source. Across 666 armies, 529 shipments, 607 recruit orders and 508 upgrades, a single large advance and random 1–97 s chunked advances always gave **byte-identical** states. Every intermediate state round-tripped through `decodeSave`. The forecast matched the real advance in 7,200 of 7,200 sampled cases, for both end stock and `fullIn` against the first-full second. I found no teleport, double payment, lost cargo, broken conservation or infinite loop.

## 1. Coverage, versions and limits

- **Snapshot A**, taken 15:34:58: a byte copy matching all 81 entries in `2026-11-10-full-code-review-manifest.json` (`playwright.config.js` is not in the manifest but was reviewed). Building it in isolation gives version `f7a73f67d0c71f8f`.
- **Live source changed during the review.** At 15:45:30, 7 files differed from the manifest: `app/src/barracks-view.js`, `game.js`, `hall-view.js`, `logistics-validation.js`, `main.js`, `tests/logistics-storage.test.js` and `e2e/logistics.spec.js`. The deltas are:
  - `game.js`: `advanceGame` now also loops while `fieldBoundary(game)===game.time`.
  - `logistics-validation.js`: a working army must also hold more than one second of net food above the reserve.
  - `hall-view.js`: the scope copy no longer says transport is disabled.
  - `barracks-view.js`: new labels "Biên chế (gồm quân đi xa)" and "Lương tại thành".
  - `main.js`: three `revealRegion` calls added.
- **Snapshot B** (live, 15:45:53): I re-ran the unit suite, fuzz, forecast differential and every repro below against it. All results are the same except the two copy fixes. Every finding below **still reproduces on live source**.
- **Served code:** `http://127.0.0.1:4173/sw.js` reports cache `crownlands-7568a7cb87628170` (dist built 15:39). I did not run tests against 4173. All browser evidence comes from the isolated build of Snapshot A on port 4391.
- Read in full: every `app/src/*.js`, `app/index.html`, `scripts/*`, `package.json`, `playwright.config.js` and the unit and browser tests. CSS was checked for sticky/overflow/touch-action rules only, not line by line. I also checked the scenario `first-foundation.json` (values: 60 s/tile, 300/h at 12 workers, 4 wagons × 500), B31/B32 in `research-and-economy.md`, the logistics plan and progress notes, and the hall-economy integration boundary.
- Not done: no real-device touch test (multi-touch used synthetic PointerEvents), no two-release update run beyond the existing e2e case, no screen-reader pass, and no visual check at 1024 px beyond the passing suite.

## 2. Tests run

| Command / script (isolated) | Result |
|---|---|
| `node --test tests/*.test.js`, snapshot A | 61/61 pass |
| `node --test tests/*.test.js`, snapshot B (live) | 63/63 pass |
| `CI=1 npx playwright test --output=/tmp/...` on snapshot A, port 4391 | **56/56 pass** (53 s) |
| `repro/fuzz.mjs` × 150 seeds (A and B): big vs chunked advance, `decodeSave` after every step, forecast smoke | 0 failures |
| `repro/fcheck2.mjs`: forecast 900/3600/21600 s vs a 1 s-step real advance, 60 seeds | 0 mismatches / 7,200 |
| `uirepro/ui.spec.mjs` (own config, port 4391, own output dir) | 4 scenarios, evidence below |
| `curl --path-as-is` against isolated `serve.mjs` | traversal → 403/404, `/data/scenario.json` → 200 |

## 3. Findings

### I1 — Important: the recovery "Chơi mới" / blocked import permanently destroys the unreadable store, including a newer-version store the message says to keep

- Where: `app/src/storage.js:112-117` (`resetSession`: `catch {data=empty();}` then `setItem(PRIMARY,…)`), called from `app/src/main.js:168` and `main.js:175`.
- Trigger: `read()` fails at startup. Either both keys are corrupt, or the primary was written by a newer store version, which throws "Kho lưu dùng phiên bản mới hơn; hãy giữ lại dữ liệu để khôi phục" and never tries the backup. The recovery dialog then offers "Chơi mới trên máy này" or "Nhập bản dự phòng". Either choice calls `resetSession`.
- Expected: unreadable data is preserved, as the message promises, at least until the player confirms deleting it. The player can also export it.
- Actual: the primary is overwritten with a store that holds only the new session. On the next autosave, `save()` copies that new primary into BACKUP. Both original copies are gone. The "Xuất bản lưu" button exports only the live `game` (a fresh world), so the original data can never be exported.
- Reproduction (`repro/reset.mjs`, in-memory Storage):
  ```js
  mem.setItem(PRIMARY, JSON.stringify({version:2,...})); mem.setItem(BACKUP, same);
  store.read()                // throws "...phiên bản mới hơn; hãy giữ lại dữ liệu..."
  store.resetSession(createGame(scenario)); store.save(createGame(scenario));
  // primary still future data? false ; backup still future data? false
  ```
  The corrupt-both case is identical: the original string is no longer in storage.
- Smallest safe fix: in `resetSession`, when `read()` throws, first copy the raw primary and backup strings to a quarantine key (for example `crownlands.foundation.quarantine`, keeping only the last one). Add an "Xuất dữ liệu gốc" button to the recovery dialog that downloads those raw strings. `storage.js` does not conflict with the logistics work. The `main.js` part is a few lines.

### I2 — Important: hall and economy book still describe the foundation-0.2 world; logistics is only partly integrated

The hall-economy plan (`implementation/hall-economy-plan.md`, §parallel integration boundary) explicitly asked to "integrate new sent/received/discarded ledger rows and home-held detachments". That is not done. The live scope copy is now fixed, but the rest remains.

1. **Troop count and upkeep disagree when a detachment is held at home.** `economy.js:13` uses `troopCount(city)` (garrison only), but `city.upkeep` includes armies in `status==='home'` (`logistics.js:19`). Hall (`hall-view.js:35`) and book (`hall-view.js:97`) show it in the browser repro: **"28 quân · 40 lương / giờ"** and "Lương nuôi 28 quân hiện tại: 40 / giờ". The 12 troops held at the gate are paid for but not counted. The case is easy to hit: send any army, recall it while the granary is full, and the B31 ruling keeps troops and rations on the detachment (`repro/homeheld2.mjs`: bag 82.4 grain, city 6000/6000, `armySummary.used 52`, hall troops 40). The detachment stays there indefinitely, because grain production stays above upkeep and nothing auto-unloads.
2. **Field work is invisible in "Công việc đã trả chi phí".** `hall-view.js:95-98` counts only upgrades and training. With an army working and a wagon on the road, the book says **"Chưa có công việc đang chạy."** Yet the forecast already includes that cargo: clay change +900 in 1 h, which is 400 from plots plus 500 from the wagon (`repro/misc.mjs` (4)). The player cannot see why the forecast is above the hourly rate. Rations are also an up-front payment that the "paid work" section omits.
3. **"Khi tuyển xong: X / giờ"** (`economy.js:16`, `upkeepAfterQueue`) ignores armies that are returning or held, whose upkeep moves back to the city. The forecast's net-at-end-of-horizon does account for them, so the two lines can disagree.
4. **The "Đã chủ động hủy" city ledger row is permanently 0.** `unloadAtHome(...,discard)` writes `discarded` on the army or shipment ledger, which retires into `logistics.retired` (`logistics.js:97,100`). The city row in `hall-view.js:39/91` never moves. The browser repro shows `discarded 0`, while e2e `full city storage…` confirms 190 clay ended in `retired.clay.discarded`.
- Smallest safe fix, all display-only in `economy.js` and `hall-view.js` with no simulation change:
  - Have `economySnapshot` return `heldTroops` (home-status armies), `field:{armies:{outbound,working,returning,home}, shipments:{toSite,toHome,blocked}}`, and the inbound cargo per resource.
  - Hall line: "`N` quân tại thành · `H` quân chờ dỡ ở cổng · `U` lương / giờ".
  - Work list: "`a` đạo quân · `w` chuyến xe", with a button that reveals `#field-operations`.
  - `upkeepAfterQueue`: add the upkeep of returning and home armies.
  - Discard row: either show the home-attributed `retired[r].discarded`, or relabel it "Hàng trên xe/quân đã hủy".
  - Add a hall-economy e2e case with logistics active (none exists today).
- Conflict: `hall-view.js` is being edited by the logistics session. `economy.js` is not.

### I3 — Important (mobile): the world map applies every touch pointer as a drag of the last pointer; no pinch zoom

- Where: `app/src/world-map.js:14-21`. There is a single `pointer` variable, and `pointermove` never checks `e.pointerId`.
- Trigger: on a phone, put two fingers on the map, which is the natural pinch gesture. `#world-map` has `touch-action:none`, so the browser does not zoom either.
- Expected: either a pinch zoom like the city camera, or the second pointer is ignored.
- Actual: moving finger 1 by 2 px pans by the distance between the fingers. Browser repro (`uirepro/ui.spec.mjs`, 390 px, synthetic PointerEvents ids 1/2 at x=100/200): the map position went from **"16 : 32" to "18 : 32"** (−98 px / 48 px per tile ≈ 2 tiles) for a 2 px move. Real pinches make the map lurch, and the only zoom on touch is the ± buttons.
- Smallest safe fix: reuse the `CityCamera` pattern with a `Map` of pointers by id. With one pointer, pan. With two, zoom about the midpoint by the change in distance (`this.zoom(factor,x,y)` already supports a focal point). Ignore moves from untracked ids and treat `pointerup` per id. Add a touch e2e case like `city-camera.spec.js:69`. `world-map.js` also draws armies and wagons, so coordinate with the logistics session, though the input handlers are separate code.

### M1 — Minor: MAX_TIME edges

- (a) `recallArmy` (`logistics.js:59-72`) and the auto-recall in `resolveField` never check MAX_TIME. Recalling with less than one return trip left yields `arrives > MAX_TIME`, which `logistics-validation.js:33` rejects (`int(a.arrives,0,MAX_TIME)`). From then on every autosave fails ("Không lưu được") and the army never arrives. Repro `repro/misc2.mjs` (2): recall at MAX_TIME−100 gives `arrives−MAX_TIME = 380` and "save REJECTED: Bản lưu hành quân hoặc vận tải không hợp lệ."
- (b) `elapse` (`game.js:69-75`) passes `floor(ms/1000)` straight to `advanceGame`, which throws past MAX_TIME. At 8× the clock stops up to 7 s short of the end, with the toast "Thời gian không hợp lệ." (`repro/misc.mjs` (3)).
- Fix: clamp the elapsed seconds in `elapse` to `MAX_TIME-game.time`. For recall, either reject a recall or auto-recall that cannot finish by MAX_TIME, or let the validator accept `returning` arrivals up to MAX_TIME plus the path seconds. Low impact, since the trial horizon is 10 game-years.

### M2 — Minor (performance): every 1 s checkpoint re-parses and re-validates the whole store, even when paused

- Where: `main.js:190` calls `checkpoint()` every second. `storage.js:98-109` (`save`) runs `validateState(game)` and then `read()`, which parses and fully validates every stored record (up to 10). Each logistics validation runs a BFS `findPath` for every army and shipment (`logistics-validation.js:32,57`).
- Evidence (`repro/perf.mjs`, Node 22, 2 armies + 4 wagons, 10 filled slots): `store.save` takes **14.6 ms** per call, one state takes 1.8 ms, and the store is 117 KB written twice per second. On a phone that is roughly one dropped frame every second, and it continues while paused when nothing changed.
- Fix: keep the last string written to PRIMARY in memory. If `getItem(PRIMARY)` still equals it, skip re-parsing. Skip the checkpoint entirely when `encodeSave(game)` equals the last saved session.

### M3 — Minor: command autosaves rotate out the 5-minute history

- Where: every command calls `checkpoint('auto')` (`main.js:122,130,133,137`). Load and import do too (`159,169`). `autos` keeps 5 (`storage.js:103`).
- Effect: five upgrades or recruits in a row erase every periodic 5-minute autosave. The "Tự lưu 1–5" list then holds only the last few seconds, so it fails as a history.
- Fix: keep command checkpoints in the `session` slot only. Write `auto` only for the 5-minute timer and the pre-load/pre-import safety copy, or keep a separate pre-load slot.

### M4 — Minor (latent): `armyPosition` hard-codes 60 s per tile

- `logistics.js:27` uses `step=60`, while travel uses `g.logistics.secondsPerTile`. The validator currently pins this to the scenario's 60, so nothing is visibly wrong yet. Any change to the scenario's foot or wagon speed would draw markers at the wrong positions. Fix: pass `secondsPerTile` into `armyPosition`.

## 4. Checked and not a defect / unconfirmed

- **Boundary exactness:** large vs chunked advances, per-unit training completion, parallel upgrades, overflow and unmet, and integer-only ledgers all hold. Mine output is 25 per worker per hour, so the field values are integers. The fuzz found no divergence.
- **Logistics:** mid-leg recall retraces the travelled time exactly (`firstStepSeconds=rem`), and the position matches the outbound interpolation. Rations satisfy bag ≥ return reserve. The safe-return boundary and the validator agree. Wagons load only while the site is owned and carry at most 500 × n. Full storage keeps cargo on the wagon, and discard is explicit. Troops away keep their hometown capacity.
- **Live change in `advanceGame`** (`|| fieldBoundary(game)===game.time`): I checked it for infinite loops. Every way `fieldBoundary` can return `game.time` (an arrival due now, or a working army with reserve < net) is resolved by `resolveField` in the same iteration. 150 fuzz seeds on live completed.
- **Forged refund of base troops via save edit:** not reproduced. The `trainingSequence`/`ordered` and `recruit-complete` event checks reject it.
- **Schema 1/2 → 3:** the original validator runs before migration (`storage.js:52-64`). The genuine v2 fixture tests pass.
- **Server path handling:** `/..%2fpackage.json` returns 403. Encoded `..`, `%5c`, a NUL suffix, malformed `%`, and a directory all return 404. Only files under `dist` are served.
- **Multi-tab:** a `storage` event pauses the other tab and stops its autosave until reload. Writes are read-modify-write without a lock, but the conflict pause prevents silent interleaving. Not a defect.
- **Economy forecast purity:** it works on a `structuredClone`. When near MAX_TIME, the horizon shortens and the limit copy shows. The economy book refreshes only while time is frozen.

## 5. Usability improvements (separate from defects)

1. **Warn before a wasted wagon trip.** `shipmentOffer` could compare wagon arrival with the working army's projected auto-recall time, e.g. "Quân sẽ rút trước khi xe tới — xe sẽ về rỗng." This saves a full round trip of wagon time.
2. **Give unload feedback.** "Dỡ hàng" with the granary still full delivers 0 and shows no message (`main.js:129`). A toast such as "Kho vẫn đầy · chưa dỡ được" helps, and the held detachment card could show how much free space is needed.
3. **Keep focus after field actions.** After "Rút về thành" the focused button is hidden, and after unload the row is removed, so keyboard focus falls to `<body>`. Move focus to the card title or the `[data-field-summary]`.
4. **Show food in the field.** The "Lương tại điểm đóng quân" row on the clay mine always reads 0, because the clay site never stores grain. Showing the working army's carried rations and the time left before auto-return would tell the player when it will come back.
5. **Draw only the remaining route.** The map draws each moving army's whole path, so a recalled army's trail looks like it is still heading out.
6. With I2: add an "Hàng đang về" line (resource, amount, ETA) to the economy book. B32 asks forecasts to explain known arrivals and return trips.

## 6. Independent fixes vs files under active logistics work

- **Can be fixed independently (no current logistics edits):** `storage.js` (I1 core, M2 core), `economy.js` (I2 data), `world-map.js` input handlers (I3; coordinate because the same file draws field markers).
- **Conflicts with the active logistics session** (edited during this review): `main.js` (I1 dialog button, M2 throttle, M3 slots, usability 2/3), `hall-view.js` (I2 copy and rows), `logistics.js` / `logistics-validation.js` / `game.js` (M1, M4), `logistics-view.js` (usability 1/3/4), and `e2e/logistics.spec.js` / `tests/logistics-storage.test.js` (new tests).
- Recommended order: I1 (data safety, standalone) → I2 (finishes the declared integration boundary) → I3 → M2/M3 → M1/M4.

## 7. Evidence files (ephemeral, `/tmp/crown-review-claude/`)

`repro/common.mjs`, `fuzz.mjs`, `fcheck2.mjs`, `perf.mjs`, `reset.mjs`, `homeheld2.mjs`, `misc.mjs`, `misc2.mjs` (and `live-*` variants for snapshot B); `uirepro/ui.spec.mjs` + `pw.config.mjs` + screenshots `hall-book.png`, `logistics-320.png`, `logistics-390.png`; full e2e log `e2e.log` (56 passed). Snapshot A: `/tmp/crown-review-claude/src` (port overridden to 4391 in its `scripts/local-config.mjs` only). Snapshot B: `/tmp/crown-review-claude/live2`.
