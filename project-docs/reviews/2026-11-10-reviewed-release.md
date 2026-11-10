# Crownlands · reviewed release

Date:2026-11-10. User requested Claude review the entire codebase, identify bugs and improve them. This completes that request for the implemented runtime and the final combined source below; it is not a claim of zero possible bugs or full design2.3 feature completion.

## Released result

- URL: http://127.0.0.1:4173
- Build/cache: **541c3aaf3833dd2d**,60 local files.
- Same persistent server, PID17808; no service restart, origin change, save-schema change or personal browser storage access.
- **88/88 unit tests** on the final source.
- **78/78 browser tests** (1.2min), including two-release updates, offline, save migration/recovery/export, real CDP touch, army badge navigation, city camera, recruitment/field logistics and320/390/1024/1440 management layouts.
- All shared `app/`, `tests/` and `e2e/` files match the isolated tested copy byte-for-byte. Its build hash equals the release. The temporary copy uses4397 only in its own server config; shared source retains4173.
- Live390/1440 book-open, offline reload and no-overflow smoke passed with zero page errors. Screenshots and smoke JSON: `assets/previews/full-review-v01/`.

## Review and corrections

1. [Original full Claude review](2026-11-10-full-code-review-claude.md): every implemented module, scripts and tests;0 Critical,3 Important,4 Minor. Confirmed by coordinator reproductions.
2. [Claude implementation](2026-11-10-full-code-fixes-claude.md): repaired I1 unreadable-original preservation/export, I2 local economy/field integration, I3 two-finger map handling, M1 horizon/late recall saveability, M2 save cache/unchanged writes, M3 rotating-history preservation, and M4 configured marker interpolation. Meaningful RED→GREEN evidence is recorded in the report.
3. Coordinator independently reproduced malformed incident entries blocking a later recovery. Added a six-shape RED→GREEN regression, preserved malformed archive bytes and clarified transfer/expense wording.
4. [Fresh independent Claude re-review](2026-11-10-full-code-rereview-claude.md): all original findings resolved, no new Critical/Important. This also covered CSS/layout gaps and added storage, horizon, late-recall and forecast differential checks. N1/N2 and the N3 timing note were addressed next.
5. [Final combined Claude check](2026-11-10-final-combined-claude.md): included the other session's army-clarity and common-surface badge gestures. It independently passed87 unit/76 browser and found0 Critical/Important, with two further Minor cases F1/F2.
6. Coordinator repaired F1/F2 before release, with isolated before/after reproductions and a focused independent read-only check by `city_camera_review`. The current complete suite is88 unit/78 browser. The exact released hash differs from Claude's earlier `db029d5233c3bd2e` because of those final corrections; earlier hashes are not claimed as this final release.

## Additional final cases

- **N1:** if browser copies cannot be retained due to quota, recovery stays nondestructive by default. Only after exporting raw primary/backup/incident bytes, clicking “Tôi đã giữ file xuất · chơi mới” and explicitly confirming the file was kept can browser copies be replaced. Exact-byte checks reject stale exports before deleting anything. Healthy manual/quick/auto slots are salvaged. Both cancel and reload are covered.
- **N2:** incoming quantities describe what army/wagons bring to the gate, with visible capacity conditions. An incoming500 can correctly coexist with received0 when the warehouse is full.
- **N3:** touch regression waits for the actual touch pointer event before checking the camera.
- **F1:** before deleting or hiding an army badge, release its capture-owned tracked pointers. The RED regression produced150%→300% on the next plain drag after an army retired under a held finger and the finger lifted over the header. GREEN retains zoom and pans normally.
- **F2:** if archival succeeds but writing the reset PRIMARY fails, the error also offers the existing explicit-export recovery path. Its RED browser test found no fallback button; GREEN exported exact originals, confirmed replacement and saved normally. A typed stale-export error retains eligibility so exporting again can continue without another failed reset attempt.

The final three production files changed after the combined Claude report are `world-map.js` (pointer-owner cleanup), `storage.js` (reset-write and stale-export error classification), and `main.js` (classify recovery errors while retaining stale-export eligibility). Core simulation, balances and saved state shape are unchanged by those final cases.

## Verification limits

Touch was tested through real CDP input in desktop Chrome with mobile/touch contexts, not on physical phones. No screen-reader pass or human balance/fun playtest was performed. Broader combat/research/AI/design2.3 modules remain at their documented activation status. Optional remaining-route drawing and speculative empty-wagon-trip warnings were not added.

A rare recovered-valid-backup + exhausted archive quota can still leave automatic saves failing until space is available; current progress can be exported from the normal save dialog, and original bytes are never automatically overwritten. This remains a nonblocking storage-recovery UX limitation noted in Claude's report, not a data-loss failure claimed fixed. The browser cannot independently prove a downloaded file was kept; the explicit player assertion is the destructive-recovery consent boundary.

No unrelated projects were changed. Parallel Crownlands coordination used the [Orca orchestration skill](/Users/tannx/.agents/skills/orchestration/SKILL.md); both owners froze source for the final combined run, and the army-clarity owner independently acknowledged the served release hash.
