# Crownlands: final combined delta review and verification (Claude)

Reviewer: Claude (Opus 5.5), Orca task `task_5cea26bf9bdc`. Date: 2026-11-10, 16:37–16:44 +07.
Brief: `2026-11-10-final-combined-brief.md`. Previous report: `2026-11-10-full-code-rereview-claude.md`, which still applies to unchanged code.

Scope: this report only. All work ran in `/tmp/crown-final-claude/` on private port **4395**. App, tests, `dist`, 4173, the service and personal saves were not touched. I started no server outside that copy and stopped none.

## 0. Verdict

| Area | Result |
|---|---|
| Full unit suite | **87/87 pass** |
| Full browser suite on a fresh build | **76/76 pass** (1.1 min) |
| Build hash | **`db029d5233c3bd2e`** (`dist/sw.js` cache `crownlands-db029d5233c3bd2e`) |
| N1 export + confirm fallback | Correct where it applies: permission boundary, exact-byte guard, cancel and salvage all hold. **One gap: F2 (Minor)** |
| N2 wording / N3 timing | **Resolved** |
| Army badges: native mouse/keyboard/touch, drag/pinch from badges, correct army selected | **Pass**. **One defect: F1 (Minor)**, a stale pointer persists after a held badge disappears |
| Canvas-only I3 touch test | Still passes (inside the 76) |
| New Critical / Important | **0 / 0** |
| New Minor | **2** (F1, F2), plus two UX notes |
| Source equality | The shared tree's app/tests/e2e (83 files) is **identical** at start (16:37:36) and end (16:43:29), and identical to the tested copy |

My recommendation:
- **Release is acceptable.** Neither F1 nor F2 can lose data, and neither has a likely trigger.
- **F1 has a fix of about one line.** If you want to fix it first, rebuild and re-run, because the hash will change.

## 1. Tested source and build

- **Copy and port.** I copied the shared tree with `rsync` at 16:37 into `/tmp/crown-final-claude/src`, excluding `dist`, `node_modules` and `test-results`. The only edit was the port in `scripts/local-config.mjs` (4173 → 4395).
- **Manifests.**
  - Start: `start-manifest.txt`, 83 app/tests/e2e files, which hashes to `85e8fe5f…74e0`.
  - End: `end-manifest.txt`, taken from the shared tree at 16:43. It is byte-identical to the start manifest and to the copy.
  - Key files: `storage.js 0213b6274e92`, `main.js 42129a159c01`, `world-map.js 1e26e602568d`, `hall-view.js 51d6a36ba852`.
- **Army-clarity freeze** (`/tmp/crownlands-army-clarity-freeze.json`):
  - `field-presentation.js`, `logistics-view.js`, `world-map.js`, `logistics.css` and the three new test files match it.
  - `main.js` does **not** match. This is expected: the coordinator's N1 controller changes came after that freeze. I reviewed the full diff of `main.js` against my earlier snapshot, and only army selection/focus and N1 recovery changed.
- **Build.** The Playwright webServer ran `npm run build` in the fresh copy. Node and browser tests used the same tree. My own browser checks only served that same `dist`.

## 2. N1: export, then explicit replacement

Files read: the `storage.js` delta (`incidentList(raw)`, the `ARCHIVE_WRITE_FAILED` code, `rawExport` now including the raw `incident` bytes, and `resetSession(game,{exported})`), the `main.js` recovery controller, and the new `index.html` button.

**What holds:**
- **Permission boundary.**
  - `#recovery-exported-new` is visible only when `blocked && archiveRecoveryBlocked && exportedRecovery`.
  - `exportedRecovery` is the parsed exact payload that went into the downloaded Blob.
  - Clicking the button still asks for an explicit confirm; dismissing it changes nothing. The e2e test confirms PRIMARY stays `broken primary`.
  - No other path passes `exported`. Import while blocked still uses the archiving `resetSession`.
- **Exact-byte guard.** Before anything is removed, primary, backup and incident must all equal the exported strings. The unit test changes each key in turn and shows that a mismatch rejects with every byte kept. The browser test does the same after a real download.
- **What gets deleted.** Only INCIDENT and BACKUP are removed, and only after the guard passes, so their exact bytes are in the confirmed file. PRIMARY is then replaced by healthy salvaged slots plus the new session. Its old bytes are also in the file.
  - I traced every reachable branch: `readShared` failing leads to salvage; `readShared` succeeding with `recovered` keeps the backup's data. Neither can lose bytes that are not in the export.
  - Frees before writing, so the fallback works even when the new primary is larger than the freed space (`repro/n1b.mjs`). If that final write still fails, only the already-exported copies are gone.
- **No silent bypass.** The normal "Chơi mới", import, and recovered-save paths still archive first.

### F2 — Minor: a quota failure on the primary write (after the archive succeeded) never offers the fallback

- **Where:** `storage.js` `resetSession` (`this.storage.setItem(PRIMARY,…)` raises the browser's raw quota error with no `code`) and `main.js` `showRecoveryError` (`archiveRecoveryBlocked=error.code==='ARCHIVE_WRITE_FAILED'`).
- **Repro:** `/tmp/crown-final-claude/repro/n1b.mjs` case D. It uses a char-count quota of 92 000, with INCIDENT holding 88 000 characters of unreadable data, PRIMARY `bad` and BACKUP `bad2`.
  - The normal reset writes the archive successfully (88 200 characters).
  - The new primary (6 530 characters) then fails with `QuotaExceeded` and **no code**.
  - Retries skip the archive (the incident already exists) and fail the same way.
  - The fallback button never appears, so the player is stuck exactly as in the old N1 report, and the archive now uses even more quota.
  - Calling the fallback directly at that point succeeds, which shows the safe path exists but the UI does not reach it.
- **Impact:** low. It needs a nearly full localStorage. No data is lost.
- **Smallest fix:** treat any write failure inside a blocked `resetSession` as eligible. For example, wrap `setItem(PRIMARY)` in `catch(e){throw Object.assign(new Error(e.message),{code:'ARCHIVE_WRITE_FAILED'})}`, or use a shared `STORAGE_FULL` code that `showRecoveryError` accepts.

### Notes (UX, not defects)

- **Stale export.** After a stale-export rejection, `showRecoveryError` clears `archiveRecoveryBlocked`. A fresh export alone therefore does not bring the button back; the player must press "Chơi mới trên máy này" once more to hit the archive failure again. The message "Hãy xuất lại trước khi tiếp tục" implies export is enough. Keeping `archiveRecoveryBlocked` for the stale error would fix this.
- **Recovered-from-backup start with a failing archive.** This is the same class as F2 but never sets `blocked`. Autosave fails every second, and "Bắt đầu thế giới mới" fails the same way with no fallback. The save dialog also hides the raw-export button because no incident exists yet. This is unchanged from before; it only happens when the primary is corrupt and the quota is exhausted at the same time.

## 3. N2 / N3 — Resolved

- **N2.**
  - The incoming line now reads "Chuyến xe 1: 500 Lương thực mang về · tới cổng lúc …" without a "+".
  - The note "Hàng đang về chỉ nhập kho khi còn chỗ; phần dư chờ ở cổng." shows whenever the list is non-empty.
  - The e2e fixture asserts incoming 500 together with forecast-received `0`. The wording matches capacity behaviour (B31).
- **N3.** `full-review-fixes.spec.js` waits for a capture-phase touch `pointermove` counter on `#world-view` before asserting the camera is unchanged. The race I described is gone.

## 4. Army clarity: badge gestures

Read: the `world-map.js` delta. Pointer and wheel handlers are on the shared parent `surface`. `pointerdown` accepts only the canvas or a `[data-map-army]` badge. Each pointer records its capture owner (badge or canvas), and that owner is released on end. Click suppression after a drag from a badge applies to pointer clicks only (`e.detail!==0`), so keyboard activation is never suppressed. `suppressArmyClick` is reset on the next fresh pointerdown. I also read the `main.js` selection, focus and `focusArmy` changes.

**Existing coverage (in the 76):**
- `army-gestures.spec.js` (5 cases): wheel and mouse drag from a badge; one-finger pan from a badge plus cancel; pinch with one badge plus the map, and with two badges.
- `army-clarity.spec.js` (3 cases).
- The canvas-only I3 test in `full-review-fixes.spec.js`.

**My extra checks** (`src/rr/badges.spec.mjs`, real CDP touch, 800×900 `hasTouch`):
- Tapping badge 2 selects **army 2** and not 1.
- A one-finger drag that starts on badge 1 pans the map and does not select it. A following tap on badge 1 selects it, so no suppression lingers.
- `Enter` on badge 2 and `Space` on badge 1 select the right army.
- Lifting the finger **on the map** after the held badge is removed leaves no stale state (variant V2 passes).

### F1 — Minor: if the badge under a finger disappears and the finger lifts off the map, a ghost pointer remains

- **Where:** `world-map.js` `renderArmies()` (`node.remove()` for an army that no longer exists) together with the `lostpointercapture`/`pointerup` listeners on `surface`.
- **Mechanism.** When the capturing badge is removed from the DOM, the browser stops delivering that pointer's events to it. The `lostpointercapture` event is then fired at the document, not at `surface`. If the finger then lifts outside the map, `surface` never sees `pointerup`. The entry stays in `this.points`, and only window blur (`this.cancel()`) clears it.
- **Repro:** `rr/badges.spec.mjs`, the "badge removed…" case, which **fails** on build `db029d5233c3bd2e`.
  1. Start with an army recalled 30 s after departure, the clock running at 8×, and some grain spent so the granary has room.
  2. Touch-and-hold its badge.
  3. Wait until the army arrives home, unloads, retires and its badge is removed.
  4. Move the finger to (20,10), which is over the header, and lift it.
  5. Make a plain one-finger drag on the map: the zoom jumps **150% → 300%**, because the drag is handled as a pinch against the ghost.
- **Persistence (V3).** Each later one-finger drag zooms again (300 → 177 → 104 → 61%). Site taps are suppressed as well, because `points.size` is never 0. A window blur restores normal behaviour.
- **Trigger:** rare (a held badge whose army retires at that moment, then a lift outside the map). Effect: touch navigation stays broken until the app is switched away or reloaded. No game data is affected.
- **Smallest fix:** in `renderArmies`, before `node.remove()`, end every tracked pointer whose `capture===node`. For example: `for(const [id,p] of this.points)if(p.capture===node){this.points.delete(id);}` and then, if `!this.points.size`, set `this.gesture=false`. Alternatively, move capture to `canvas` first, or listen for `lostpointercapture` on `document`. A regression test is my case above.

## 5. Remaining limits

- I did not do a full re-audit. Code outside the listed deltas relies on my earlier report.
- `field-presentation.js` and the clarity copy were checked only through their own unit and e2e cases plus my selection checks. I did not review the presentation helpers line by line.
- Quota behaviour was modelled with a char-count `Storage` in Node. The browser runs use injected `setItem` failures, not a real 5 MB quota.
- I did not test on a physical phone or with a screen reader.

## 6. Artefacts (`/tmp/crown-final-claude/`)

- `src/` — tested copy, with `dist` `db029d5233c3bd2e`
- `start-manifest.txt`, `end-manifest.txt`
- `e2e.log` — 76 passed
- `repro/n1.mjs`, `repro/n1b.mjs`
- `src/rr/pw.config.mjs` and `src/rr/badges.spec.mjs` — 3 pass, 1 intentional fail that reproduces F1
- `rr-results/`
