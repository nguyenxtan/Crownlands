# Crownlands: independent re-review of the full-review fixes (Claude)

Reviewer: Claude (Opus 5.5), a fresh reviewer and not the implementer. Orca task `task_19537d84454e`. Date: 2026-11-10, 16:12–16:24 +07.
Inputs: original findings `2026-11-10-full-code-review-claude.md`, scope `../implementation/2026-11-10-full-review-fixes.md`, implementer report `2026-11-10-full-code-fixes-claude.md`, and the coordinator's later additions (`storage.js` incident-entry validation, `hall-view.js` copy, `tests/full-review-fixes.test.js` I1 malformed-entry regression).
Write scope: this file only. All builds and tests ran in `/tmp/crown-rereview-claude/` on private port **4393**. Shared app, tests, config, `dist`, 4173, the service and personal saves were not touched. I started no other server and stopped none.

## 0. Verdict

| Item | Status |
|---|---|
| I1 recovery destroys unreadable or newer data | **Resolved** |
| I2 hall and economy not integrated with logistics | **Resolved** (one minor wording gap, N2) |
| I3 world-map multi-touch jump, no pinch | **Resolved** on the tested snapshot. Must be re-checked after the in-flight army-clarity change (§5) |
| M1 MAX_TIME edges | **Resolved** |
| M2 per-second full re-validation | **Resolved** |
| M3 commands rotate the auto history | **Resolved** |
| M4 hard-coded 60 s per tile | **Resolved** |
| Small usability items (unload feedback, focus, field food) | **Resolved** |
| New Critical / Important | **0 / 0** |
| New Minor | **2** (N1, N2), plus 1 test-quality note (N3) |

There is no blocker for release from the fixes themselves. The live source changed during this review because of separate, unfinished work (§5). Release only a build that has been re-verified after that work.

## 1. Tested version and evidence

- **Snapshot:** taken at about 16:13 by `rsync` of `app/ tests/ e2e/ scripts/ project-docs/` (excluding `dist`, `node_modules`, `test-results`) into `/tmp/crown-rereview-claude/src`. Only `scripts/local-config.mjs` was changed, and only its port (4173 → 4393). That file is not part of `dist`.
- At snapshot time the source matched the implementer's green copy `/tmp/crown-fix-claude/green` byte for byte, except for the three coordinator files. I diffed those and reviewed each change:
  - `storage.js`: `incidentList` now requires a `primary`/`backup` pair of null-or-string on every entry.
  - `hall-view.js`: two copy changes, "Chưa có lệnh nâng ô hoặc tuyển quân đang chạy." and "Lương mang theo đã chuyển từ kho thành vào hành trang."
  - `tests/full-review-fixes.test.js`: the new I1 malformed-entry test.
  - No e2e test depends on the old strings.
- **Manifest:** `/tmp/crown-rereview-claude/snapshot-manifest.txt` lists the sha256 of 78 app/tests/e2e files. The manifest itself hashes to `f696723a…bb5f`. Key files: `storage.js fd8c66740e97`, `hall-view.js 0115cdd486c3`, `main.js cc409d65b709`, `world-map.js 71aaa91c192e`, `economy.js 3abf387ab0a2`.
- **Build:** `npm run build` inside the snapshot reports `Built 59 local files · b3c524d7470269b9`, and the snapshot's `dist/sw.js` cache is `crownlands-b3c524d7470269b9`. The Playwright webServer rebuilt from the same source and produced the same hash. The Node tests and the browser tests used the same source tree.

| Run (isolated snapshot) | Result |
|---|---|
| `node --test tests/*.test.js` | **81/81 pass** (implementer's 80 + coordinator's I1 malformed-entry test) |
| `CI=1 npx playwright test` (full suite, port 4393, build `b3c524d7470269b9`) | **67/67 pass** (1.0 min). Log: `/tmp/crown-rereview-claude/e2e.log` |
| Own browser checks `rr/rr.spec.mjs` + `rr/hall.spec.mjs`, separate config and output dir | **12/12 pass** (after fixing two mistakes in my own harness, described in §3) |
| `repro/storage.mjs`: 25 storage assertions | 25/25 pass |
| `repro/horizon.mjs`: 200 seeds × 120 random commands in the last ~33 000 s, random speeds, `decodeSave` after every step, run to the end at 8× | 0 failures, 24 000 steps, 200/200 reached `MAX_TIME`, 1 229 forecasts |
| `repro/late.mjs`: sweep of recall offsets 1–1 500 s before `MAX_TIME`, both mines, outbound and working | 860/860 saveable and run to the end. 310 arrivals were later than `MAX_TIME`; for all 310, a forged `arrives+1` is rejected |
| `repro/econ.mjs`: 150 seeds × 60 steps, forecast vs real advance | 9 000/9 000 match on `upkeepAtEnd`, stock and `received`; 9 000/9 000 troop/upkeep identities hold; 204 incoming items arrived on time |

## 2. Findings by original item

### I1 — Resolved
Reviewed `storage.js:94-177` and the recovery and import paths in `main.js`.
- **Exact raw bytes are kept before any overwrite.** `resetSession` calls `archive()` before it writes PRIMARY. Automatic recovery from backup also archives before `save()` replaces the bad primary. I checked this both in Node and in a browser: a corrupt primary with a valid backup is archived as `'{"truncated'`, and the save dialog shows "Xuất dữ liệu gốc đã giữ (1)".
- **Newer-version stores:** `save()` refuses to write over them, and `resetSession` archives both keys without parsing them.
- **Archive failure:** if the archive write fails (quota or a failing key), neither primary nor backup is touched. This holds for the reset path and for the recovered-save path.
- **Primary write fails after the archive succeeds:** the originals stay intact, and a retry does not add a duplicate incident.
- **Repeat incidents:** each distinct pair is appended, never replaced.
- **Malformed or unreadable archives** are wrapped as a raw incident. The coordinator's six entry shapes all pass.
- **Healthy records:** manual, quick and auto records salvaged from an unreadable version-1 store are kept.
- **Import while blocked:** a browser check confirmed it archives `P!`/`B!` and loads the imported state.
- **Export:** raw export works while blocked and later from the save dialog.

### I2 — Resolved
- **Troop counts and upkeep.** `economySnapshot` reports garrison, held and away troops separately. `localUpkeep` is `city.upkeep`, which already includes held armies, and nothing is added on top. The identity `localUpkeep = garrison + held` held in all 9 000 random states.
- **Queue vs end-of-forecast upkeep.** `queuedUpkeep` is only the increment from the training queue. `upkeepAtEnd` comes from the actual simulation clone and matched the real advance 9 000/9 000 times. That covers returning armies, armies held at a full granary and wagons blocked at the gate.
- **Wording.** Rations are described as transferred into the army's inventory ("đã chuyển … vào hành trang"), not as an expense. The city "Kho thành đã hủy" row is separate from "Đã hủy trên quân/xe, ngoài kho thành".
- **Separate field section.** Field operations have their own clear "QUÂN & XE NGOÀI THÀNH" section, with a button that focuses the first field card. That is acceptable; they do not need to be mixed into the paid-investment list.
- **Rendered text at 320, 390, 1024 and 1440 px** (my seeded state also had 3 recruits queued):
  - Hall: "28 quân đồn trú · 12 chờ dỡ ở cổng · 12 đi xa · 40 lương / giờ tại thành" and "3 quân đang tuyển · thêm +3 lương / giờ khi xong".
  - Book: "… Hàng đợi tuyển thêm +3 / giờ khi xong. Cuối dự báo (…): 43 / giờ."
- **Remaining gap:** see N2.

### I3 — Resolved (on the snapshot)
Reviewed `world-map.js:13-48`. Pointers are tracked in a map by id, and moves from untracked ids are ignored. Two pointers zoom by the distance ratio, anchored at the previous midpoint. Any gesture with more than one pointer suppresses the tap until every pointer is up. A mouse move with no button pressed ends the drag. Capture is released on up, cancel, `lostpointercapture` and window blur. Zoom is clamped to 0.45–3.

My own real-CDP-touch checks (`rr/rr.spec.mjs`, 390 px, `hasTouch`):
- A hard pinch-out clamps at **300%** with the camera unchanged.
- Lifting finger 2 and moving finger 1 by 2 px causes **no jump**. Moving it 288 px then pans 3 tiles (16 → 13), which is correct at 96 px per tile.
- A hard pinch-in clamps at **45%**.
- A two-finger tap on Mỏ đất sét does **not** select it, while a following one-finger tap does.
- `visualViewport.scale` stays 1.

Mouse checks:
- After a drag released outside the canvas, plain mouse moves do not pan.
- A drag that ends on a site does not select it.

The city camera is unchanged. Its e2e cases, including pinch, pass in the full suite.

### M1 — Resolved
- **8× reaches the end.** `elapse` advances exactly to `MAX_TIME` and drops the sub-second remainder. Across 200/200 fuzz seeds the clock ended at `MAX_TIME` at 8×.
- **Late recalls.** The validator lets only `returning` armies have `arrives` up to `MAX_TIME + (route length − 1) × secondsPerTile`. Path, timing identity and rations are still checked exactly.
- **Sweep result.** In the 860-case sweep, all 310 late arrivals stayed `returning`, owned, saveable and forecastable. None were teleported or deleted.
- **Forged arrivals.** A forged `arrives+1` is always rejected.
- **Not a regression:** if `started` and `arrives` are shifted together by the same amount, the state is still accepted whenever `started ≤ time` (274 of my shifts). That shifted state is internally consistent. The validator has never replayed history, so this does not come from M1 and I do not count it as a defect.

### M2 — Resolved
- **Skipped writes.** An unchanged `session` save is skipped only if **both** stored keys still equal the bytes this store last wrote. Changing a single byte in the backup forces a rewrite.
- **Validation and clone isolation.**
  - Every real write still validates strictly; an invalid changed state is rejected.
  - `read()` returns clones, and so does the record that `save()` returns.
  - The live game object is not aliased; mutating any of these left the stored data unchanged.
- **Forced writes.** `force:true` always writes and reports a storage failure.
- **Partial failure.** If BACKUP was written but PRIMARY failed, the next save is not wrongly skipped and does write.
- **Other tabs.** Another writer's bytes invalidate the cache. The existing `storage`-event conflict pause still guards against two tabs writing in turn.
- **Browser check.** The e2e "paused unchanged game is not rewritten" case passes.

### M3 — Resolved
- **Commands.** Upgrades, recruits, marches, wagons, recall and unload now save only the `session` slot.
- **Auto history.** `auto` records are written only by the 5-minute timer while the game runs, and as the safety copy before a load or import (`main.js` load/import paths). The safety copy is never skipped.
- **Test.** The e2e test with six upgrades leaves 0 auto records.

### M4 — Resolved
`armyPosition(a,time,step)` receives `game.logistics.secondsPerTile` from `world-map.js`. I checked a partial-edge recall algebraically: the returning interpolation at `elapsed=0` equals the outbound position (`path[i] + (path[i+1]-path[i])·rem/step`). The unit test confirms this at 30 s per tile.

### Small usability items — Resolved
- **Zero-unload feedback.** Dỡ hàng with a full warehouse shows "Kho thành vẫn đầy · chưa dỡ được gì…". Partial and full unloads have their own messages.
- **Focus.** When a card is removed, focus moves to `[data-field-summary]` (`tabindex=-1`). When the pressed control is hidden, focus moves to that card's title. Cancelling the confirm leaves focus where it was.
- **Field food.** The mine panel shows the detachment's carried rations, followed by "tự rút sau m:ss" or "ruộng nuôi đủ", instead of the old row that always read 0.
- **Out of scope (optional):** drawing only the remaining route, and a warning for a wasted wagon trip.

### CSS / layout (gap left by the first review)
- **Files checked:** `economy.css`, which gained the `.economy-field` rules, plus the rules that affect the hall, field cards and dialogs.
- **Widths:** 320, 390, 1024 and 1440 px. At each width, no element in an open dialog, `#field-operations` or the hall panel extends past the viewport, and the document has no horizontal scroll.
- **Screenshots** are in `/tmp/crown-rereview-claude/shots/` (`hall-*`, `book-*`, `bookfield-*`, `field-*`, `recovery-320/1440`).
- **Hall table at 320 and 390 px:** it sits exactly inside the panel (table right edge = panel right edge). The "Ròng / giờ" header that looks clipped in the element screenshot is a cropping artefact, not overflow.
- **Recovery dialog at 320 px:** the three buttons wrap readably, and the explanation text is visible.

## 3. New findings

### N1 — Minor: if the archive can never be written, recovery stays blocked with no in-app way forward
- **Where:** `storage.js` (`archive` throws `ARCHIVE_FAILED`; `resetSession` calls it first) and `main.js` (`newGame` and the import path while blocked).
- **Repro:** `repro/storage.mjs` case 4. Use a 7 000-character quota, with PRIMARY and BACKUP each 3 000 characters.
  - `resetSession` correctly refuses to overwrite. The raw export works.
  - But every later attempt fails the same way. The user's only exit is clearing site data in browser settings, which also deletes the salvageable manual slots this fix tries to keep.
  - Incidents are never pruned, and each one holds a JSON-escaped copy of primary + backup. Over many incidents the archive therefore grows toward the quota as well. The implementer's report lists both points as known limits.
- **Impact:** low. It needs a nearly full localStorage or many incidents. Data is never destroyed.
- **Smallest fix:** after a successful raw export in the same session, offer an explicit confirm along the lines of "Đã xuất dữ liệu gốc — ghi đè mà không giữ bản sao trong trình duyệt?". On that choice, call a `resetSession(game,{archived:'exported'})` path that skips the archive write. Optionally, offer "Xóa dữ liệu gốc đã giữ" in the save dialog after an export.

### N2 — Minor (wording): the incoming list promises cargo that the forecast says will not enter the warehouse
- **Where:** `hall-view.js` incoming list (`Chuyến xe N: +X … lúc …`) and `economy.js` `incomingCargo`.
- **Repro:** the I2 e2e state. Screenshot `shots/book-1440.png`.
  - Granary at 5 970 / 6 000, forecast "Đầy sau 5 phút 2 giây".
  - The list says "Chuyến xe 1: +500 Lương thực lúc Ngày 1 · 19:20:00", which is within the 1 h horizon.
  - The grain card's "Nhận từ quân/xe" is **0**, because the wagon will arrive to a full granary and wait at the gate.
  - Each number is correct by B31, but read together they contradict each other.
- **Smallest fix:** if the forecast has the resource full before `arrives`, add "· kho dự báo đầy, hàng sẽ chờ ở cổng" to that line. Alternatively, title the list "Hàng trên đường về (chỉ vào kho nếu còn chỗ)".

### N3 — Test-quality note (not a product defect)
- **Where:** `e2e/full-review-fixes.spec.js:70`.
- **Issue:** the assertion reads the map position immediately after a CDP `touchMove`. CDP acknowledges touch input before the page handles the pointer events, so this "1 px must not jump" check can pass without testing anything. My own harness hit exactly this race, and polling fixed it.
- **Why it is not a gap:** the final-position assertion after reaching 300% (`:74`) would still catch the old jump bug.
- **Optional fix:** use a polling assertion. Also note that releasing one finger through CDP needs `touchEnd` with that finger's point. A `touchMove` that simply leaves the finger out does not release it.

## 4. Checked, no defect

- **Forecast loop** with late-returning armies: a field boundary beyond `MAX_TIME` stops the loop, and `projected` is always set because `ends ≤ MAX_TIME` is always pending.
- **Readable incident archive with a future version** (`version:2`): wrapped as raw, never discarded.
- **Storage events:** only a PRIMARY change pauses the other tab. INCIDENT writes do not.
- **Load and import:** the safety copy before load or import is never skipped. Pre-load safety failure still aborts with "Chưa giữ được tiến trình hiện tại…".

## 5. Remaining limits and re-verification needed before release

- **The live source diverged during this review.** At 16:19–16:22, separate unfinished work ("army-clarity", plan `../implementation/2026-11-10-army-clarity-plan.md`, all checkboxes still open) changed live files:
  - added `app/src/field-presentation.js`, `tests/field-presentation.test.js` and `e2e/army-clarity.spec.js`;
  - modified `app/src/main.js`, `world-map.js`, `logistics-view.js` and `app/logistics.css`.
  - None of my results cover that state.
- **Relevance to I3.** `world-map.js` now places clickable DOM army markers over the canvas. A touch that starts on a marker never reaches the canvas pointer handlers, so I3 pinch and tap suppression need re-checking with markers on screen.
- **Relevance to the usability fixes.** `main.js` and `logistics-view.js` changed field focus and selection.
- **What to re-run:** the full unit and browser suites, plus the I3 touch case, on the final combined tree. Release only a build hash produced from that tree, not `b3c524d7470269b9` and not the implementer's `e2a8b558e5eabcad`.
- **Not done:** a physical-phone touch test (CDP emulation only), a screen-reader pass, a two-release update run beyond the existing e2e case, and real-browser localStorage quota behaviour (quota was simulated in Node and by the existing e2e failing-key injection).

## 6. Artefacts (ephemeral)

All under `/tmp/crown-rereview-claude/`:
- `src/` — snapshot with `dist` `b3c524d7470269b9` and port 4393
- `snapshot-manifest.txt`
- `e2e.log` — full suite, 67 passed
- `repro/storage.mjs`, `repro/horizon.mjs`, `repro/late.mjs`, `repro/econ.mjs`
- `src/rr/rr.spec.mjs`, `src/rr/hall.spec.mjs`, `src/rr/pw.config.mjs`
- `rr-results/` — Playwright output
- `shots/` — screenshots
