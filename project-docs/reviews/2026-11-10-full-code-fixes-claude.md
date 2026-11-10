# Crownlands: fixes for the full code review (Claude)

Implementer: Claude (Opus 5.5). Orca task `task_8e0b6cd7ccc5`. Date: 2026-11-10, 15:55–16:10 +07.
Plan: `../implementation/2026-11-10-full-review-fixes.md`. Original findings: `2026-11-10-full-code-review-claude.md` (unchanged).

## 0. Result

| Item | Status |
|---|---|
| Unit suite (`node --test tests/*.test.js`, isolated copy) | **80/80 pass**: 63 existing (one assertion updated) + 17 new |
| Browser suite (`CI=1 npx playwright test`, isolated copy, port 4391) | **67/67 pass**: 56 existing + 11 new (9 cases, I2 runs at 4 widths) |
| Before-snapshot RED, same new tests | Unit 15 fail / 2 guards pass. Browser 9/9 fail for the intended reasons (RED ran when I2 covered 390/1440 only; 320/1024 and the carried-food assertion were added afterwards and run GREEN only) |
| Isolated build version | `e2a8b558e5eabcad` (59 files). Built only inside `/tmp/crown-fix-claude/green` |
| Live `dist` / 4173 / service / personal saves | **Not touched.** 4173 still serves `crownlands-7568a7cb87628170` (dist from 15:39) |
| Randomized differential fuzz (150 seeds, big vs chunked advance, `decodeSave` at every step) | 0 failures on fixed source |
| Forecast vs real advance (7,200 samples) | 0 mismatches |

Before snapshot: `/tmp/crown-fix-claude/before/` plus `before.zip` (taken 15:55:51; equal to the live source the logistics root left). RED copy: `/tmp/crown-fix-claude/red` (port 4392). GREEN copy: `/tmp/crown-fix-claude/green` (port 4391; only `scripts/local-config.mjs` differs, and that file is not part of `dist`). Logs: `red-unit.txt`, `red-unit-detail.txt`, `red-e2e.txt`, `green-e2e.txt` in `/tmp/crown-fix-claude/`.

Housekeeping: a stray `node scripts/serve.mjs` on port 4391 was my own leftover from the review-phase path probe (cwd `/tmp/crown-review-claude/src`, PID 10848). I stopped it. The user's 4173 server (PID 17808) was left alone.

## 1. Files changed

Modified: `app/src/storage.js`, `app/src/economy.js`, `app/src/hall-view.js`, `app/src/main.js`, `app/src/world-map.js`, `app/src/logistics.js`, `app/src/logistics-view.js`, `app/src/logistics-validation.js`, `app/src/game.js`, `app/index.html`, `app/economy.css`, `README.md`, `tests/economy.test.js` (`upkeepAfterQueue` → `queuedUpkeep`/`localUpkeep`), `project-docs/implementation/2026-11-10-full-review-fixes.md` (checklist).
Added: `tests/full-review-fixes.test.js`, `e2e/full-review-fixes.spec.js`, this report.
No schema, ruleset, balance or dependency change. No new storage key except the recovery archive `crownlands.foundation.incident`.

## 2. Corrections by group (RED → GREEN)

### I1: recovery keeps and exports the unreadable originals
- RED, unit: `store.incidents is not a function`; archival-failure test "Missing expected exception"; the healthy manual slot was lost (`Cannot read properties of null`). RED, browser: there was no "Xuất dữ liệu gốc" button, and on archive failure the originals were overwritten.
- `storage.js`:
  - `archive(reason)` stores the **exact** raw primary and backup strings in `crownlands.foundation.incident` as an append-only list. Identical pairs are deduplicated, so a repeated reset or autosave never replaces an earlier incident. A corrupted archive is itself wrapped as an incident instead of being overwritten.
  - If the archive write fails, `resetSession` and `save` throw "Không giữ được bản sao dữ liệu gốc… chưa ghi đè gì" **before** touching primary or backup.
  - `resetSession` archives first, then keeps healthy individual manual, quick and auto records salvaged from the unreadable version-1 primary or backup. Newer-version stores are archived only, never parsed or migrated.
  - Automatic recovery from backup (`recovered:true`) now also archives the unreadable primary before the next save replaces it.
  - `rawExport()` returns `{primary, backup, incidents}`.
- `main.js` / `index.html`: added "Xuất dữ liệu gốc" to the recovery dialog. The save dialog shows "Xuất dữ liệu gốc đã giữ (N)" once an incident exists. On failure the recovery dialog stays open and shows the error.
- GREEN: unit tests 1–5, plus browser cases for export → new game → archived originals → later export, and archive quota failure → both originals byte-identical with the dialog still open.

### I2: hall and economy book integrated with logistics (no double-counted upkeep)
- RED: snapshot `garrison` was undefined (expected 40), with no field, incoming or `queuedUpkeep`/`upkeepAtEnd`/`fieldDiscarded` data. The browser showed the old `28 quân · 40 lương / giờ` line.
- `economy.js` `economySnapshot` adds:
  - `garrison`, `heldTroops` (home-status armies), `awayTroops`, `localUpkeep` (= `city.upkeep`, which **already** includes held armies; nothing is added on top), `queuedUpkeep` (incremental only);
  - `field.armies/shipments` with status and arrival;
  - `incoming`: wagons heading home with their exact cargo, and returning armies' rations at arrival = carried − upkeep × remaining seconds, checked equal to the actual `received`;
  - `fieldDiscarded`: live army/wagon disposal plus `logistics.retired`, the latter attributed only to the first player city as the caveat requires. It is never subtracted from local stock.
- `forecastEconomy` adds `received`/`sent` per resource and `upkeepAtEnd`, the projected local upkeep at the horizon. These come from the existing `advanceGame` clone, with no recursion and no unconditional addition of returning armies.
- `hall-view.js`:
  - Hall line: "28 quân đồn trú · 12 chờ dỡ ở cổng · 12 đi xa · 40 lương / giờ tại thành". Training line: "+Q lương / giờ khi xong".
  - Upkeep copy: "Lương tại thành … cho N quân đồn trú và H quân chờ dỡ ở cổng. A quân đi xa ăn lương mang theo. Hàng đợi tuyển thêm +Q. Cuối dự báo (…): U / giờ."
  - New section "QUÂN & XE NGOÀI THÀNH" with per-item status, incoming cargo and its game time of arrival, and a "Xem quân & vận tải" button that closes the book, reveals `#field-operations` and focuses the first card.
  - Each projection has a "Nhận từ quân/xe" row. The city ledger row is renamed "Kho thành đã hủy" (local only); a separate line "Đã hủy trên quân/xe, ngoài kho thành: X" appears only when non-zero.
- GREEN: unit tests 6–10. Browser case at **320, 390, 1024 and 1440 px**: exact hall line and upkeep copy, field and incoming lists, focus lands on the field card in the viewport, no horizontal overflow.

### I3: world-map touch
- RED, real CDP touch: moving one finger 1 px with two fingers down jumped the map from `16 : 32` to `17 : 32`.
- `world-map.js` follows the `CityCamera` pattern:
  - a `Map` of pointers by id; moves from untracked ids are ignored;
  - two pointers zoom by the ratio of distances, anchored at the previous midpoint, and pan by the midpoint's movement;
  - one pointer pans;
  - a gesture never ends in a site tap; mouse moves without a button end the drag;
  - capture is released on up, cancel, `lostpointercapture` and window blur.
  - `zoom()` gained an optional no-redraw flag. Caption and help text mention pinch.
- GREEN: browser case with real `Input.dispatchTouchEvent`. The 1 px move leaves the position unchanged. Pinching to 300% around the centre leaves the position unchanged and the selection still on the city. A one-finger pan moves the map. After zooming out, a plain tap on Mỏ đất sét selects it. `visualViewport.scale` stays 1.

### M2/M3: durable sessions, periodic history, no needless writes
- RED, browser: six upgrades produced **5** auto records, and a paused unchanged game wrote primary **5 more times in 5 s**. Unit: 6 writes where 2 were expected.
- `main.js`: commands (march, wagons, recall, unload/discard, upgrade, recruit) now checkpoint only the **session**. `auto` remains for the 5-minute timer and the pre-load and pre-import safety copies.
- `storage.js`:
  - An unchanged session save is skipped only when the stored primary **and** backup bytes still equal what this store last wrote.
  - `force:true`, used by the pre-update-reload checkpoint, always writes, so a storage failure there is still reported. This keeps the existing update/quota e2e behaviour.
  - Reads are cached by the exact primary/backup bytes (errors included). `read()` always returns `structuredClone`, so callers cannot mutate the cache. Save builds new arrays instead of mutating cached data.
  - Validation remains strict on every real write.
- Benchmark (`/tmp/crown-fix-claude/bench.mjs`, Node 22, 2 armies + 4 wagons, 10 filled slots; two runs each):

| | before | after |
|---|---|---|
| unchanged periodic save | 10.8 ms, 82 writes / 41 calls | **0.10 ms, 0 writes** |
| changed save | 10.3 ms | **1.4 ms** |

- GREEN: unit tests 15–17 (skip, cache isolation and invalidation, forced failure). Browser M3 and M2 cases. The existing storage-failure, update-with-quota-failure, conflict and offline cases also pass.

### M1/M4: horizon and marker interpolation
- RED: `elapse` at 8× threw "Thời gian không hợp lệ."; a recall at MAX_TIME−100 made the save invalid; `armyPosition` with 30 s per tile returned a 0.75 fraction instead of 0.5. Browser: the late-recall save opened the recovery dialog.
- `game.js` `elapse`: when the step would pass the horizon, it advances exactly to `MAX_TIME`, sets `remainder=0` and returns.
- `logistics-validation.js`: only a `returning` army may have `arrives` up to `MAX_TIME + (route length − 1) × secondsPerTile`. Path, `started` and rations are still validated exactly. A guard test confirms a forged later arrival is still rejected. The detachment stays `returning` and owned at the end of the trial; it is never teleported or deleted.
- `logistics.js` `armyPosition(a,time,step)` takes the configured seconds per tile, and `world-map.js` passes `game.logistics.secondsPerTile`. The partial-edge recall position is continuous, and movement after recall is exactly 10/30 tile in 10 s.
- GREEN: unit tests 11–14. Browser: a late-recall save loads, reaches `MAX_TIME` at 8×, the army is still `returning`, and the status shows "Đã tự lưu".

### Small usability fixes tied to existing actions
- Unload or discard now always gives feedback: "Kho thành vẫn đầy · chưa dỡ được gì…", partial "Đã dỡ X; phần còn lại vẫn chờ kho trống.", full, or discard. Recall says "Đạo quân đang rút về theo đường đã đi."
- Focus: if the pressed control is hidden, focus moves to that card's title; if the card is removed, to the `[data-field-summary]`, which is now `tabindex=-1`.
- Mine panel: "Lương đạo quân mang theo" shows the detachment's carried rations plus "tự rút sau m:ss" (new pure `safeReturnAt`, which `fieldBoundary` now reuses), or "ruộng nuôi đủ" at the grain mine. The old row always showed 0 on the clay mine.
- Browser case covers the zero-unload toast, focus after discard (summary) and after recall (title), and the carried-food line.

## 3. Remaining gaps (precise)

- **I1:** the archive lives in the same localStorage quota. If it cannot be written, recovery refuses to overwrite; the user must export first, so this is safe but blocks. Incidents are never pruned automatically. Newer-version stores are preserved and exportable but not readable by this release, by design.
- **I2:** the paid-work section still lists only upgrades and training; field items are in the separate "Quân & xe ngoài thành" section. Retired-ledger attribution assumes the single player city of this slice. The forecast shows delivered cargo only; cargo that stays blocked on a wagon at a full warehouse appears in the incoming list but not in "Nhận từ quân/xe", which is correct per B31.
- **I3:** verified with CDP touch on desktop Chrome in mobile emulation, not on a physical phone. There is still no inertial pan.
- **M1:** at the very end of the trial, a late-recalled army remains `returning` (saveable and owned) because the clock cannot pass `MAX_TIME`.
- **M2:** each changed save still validates the live state (about 1.4 ms) every running second, by design. The read cache trusts byte equality of the two keys; other tabs are still caught by the existing `storage`-event conflict pause.
- **M4:** `armyPosition` keeps a backward-compatible default of 60 s per tile for callers that omit the step. All app callers pass the configured value.
- Not implemented (explicitly optional): drawing only the remaining route, and a warning for a wasted wagon trip.
- Not verified: screen-reader pass; release to 4173 (coordinator step).
- Required next: coordinator inspection and a fresh independent re-review, then release.
