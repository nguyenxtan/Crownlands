# Resolution 2.2 — xử lý Claude review Bổ sung 02

Ngày 10/11/2026 · Mã nguồn C10 · Đầu vào: [Claude review 2.1](2026-11-07-supplement-02-claude-review.md) (C09).

Coordinator Codex đã đọc review, đối chiếu docs và tự kiểm độc lập: phản ví dụ kho 5948/5974/5987 so với 6000 là đúng; BFS với ô site không transit cho tiền thành 19, thủ đô 36; bỏ cầu vẫn tới thủ đô qua 90 bước. **Các quyết định dưới đây là lựa chọn của coordinator theo U09**, không phải quyết định của chủ dự án. Nơi coordinator chọn khác đề nghị của reviewer đều có ghi; Claude chưa đồng ý trước với các chỗ đó và chưa review lại bản 2.2. Bản này do Claude (worker) biên tập theo chỉ đạo của coordinator.

## 1. Bảng xử lý F-01–F-11

| Finding | Xử lý | Nội dung áp dụng | Nơi ghi |
|---|---|---|---|
| F-01 B26 kho trước lương | **Tiếp thu** | Net = sản xuất − chi liên tục theo đoạn rate không đổi, rồi clamp [0, cap]. Tách đoạn khi đổi rate/quyền hoặc chạm 0/cap. Ledger tách production/paid upkeep/overflow/unmet. Ở cap chỉ bỏ phần net dư thật. Chạm 0 giữa hai giây thì event đói ở tick ceil (100 lương, −52/h: tick 6924). | B26, readiness §5.1, technical §2, systems §6 |
| F-02 B23 nhiều phe đến | **Tiếp thu, chỉnh một nhánh** | Ô site không transit; ô thường không collision. Không holder thì bên sequence sớm nhất đủ điều kiện làm ứng viên. Bên đến trung lập với holder dừng ngoài và không đánh nhau ngoài site. Nhánh (c): coordinator chọn **không tự chain** đánh garrison; assault là lệnh riêng ở cửa lệnh kế tiếp, có phase/sequence mới. Reviewer để ngỏ hai lựa chọn, nên đây là lựa chọn của coordinator. Ghi rõ thứ tự có thể lợi cho bên đến sau. | B23, readiness §2.1 |
| F-02 site trống / mutual kill | **Tiếp thu, mở rộng** | Mỏ/trại mất lực giữ cuối về unclaimed. Kho ở lại dưới `world-custody` (ID rõ, theo I04). Claim hợp lệ chuyển quyền kho một lần qua ledger có version; lấy hàng phải load xe thật. Chủ cũ không còn điều kho. | readiness §2.2, S00 |
| F-03 B25 phần dư | **Tiếp thu một phần (chỉnh)** | Reviewer đề nghị largest remainder trên số chết với tie-break `cohort_id`. Coordinator **không dùng** cách chia tổng số chết giữa profile có HP khác nhau. Thay vào đó: fixed-point ở cấp lượng damage/hấp thụ; phần dư quantum chia largest remainder trên damage claim, mỗi claim ≤ damage, tổng ≤ quỹ. Hòa dùng stable claim key trong snapshot (lineage + profile + readiness + ô đội hình, gộp cùng key trước), không dùng cohort_id tạm. Hứa tất định, không hứa đối xứng tuyệt đối. Quỹ k lượt hết hạn sau casualty lượt k. Damage→số chết theo profile vẫn là cổng CAL02/CAL03. | B25, readiness §4, combat §3/§6 |
| F-04 B24 timer/reservation | **Tiếp thu** | Khóa đợt = (owner, original_capacity_source_id); `pending:X` là alias, không phải khóa mới. Mất gốc trong đợt đang có giữ mốc cũ; gán một phần chỉ gỡ phần đủ cap. `used` chỉ đếm quân hiện hữu. Job pause trả suất tăng, giữ progress/thời gian active còn lại/chi đã tiêu, vô hiệu event cũ; resume giữ lại suất trước, không trả chi lần hai, không tính thời gian pause. Phụ phí theo tỷ lệ chung của nguồn, lương có trọng số theo profile vẫn khác nhau. | B24, readiness §3, military §5 |
| F-05 S00 AI | **Tiếp thu, số do coordinator chọn** | `ai_budget` thử: 6 quân đặt tuyển/3600 s neo T0, không dồn quota; `allow_internal_reinforcement = false` trong S00; một chiến dịch active trong trần 4; tối đa 12 quân/sortie; garrison tối thiểu 80/20; đánh giá mỗi 300 s khi đủ tin/khả thi/lương. Preset intro, không là giới hạn chung, không chứng minh 52 quân thắng hay thua. AI scoring/targeting thêm vào `unresolved`. Khoảng cách ghi 19 từ người chơi / 17 từ thủ đô. | B28, readiness §7, S00, CAL11 |
| F-06 sông/metric/trại | **Chỉnh: giữ sông** | Coordinator **giữ sông y 4–59**, cầu là đường tắt, không phải chokepoint bắt buộc; không đổi river cells/positions. BS-T02 và RV21-12 báo đường vòng 90 bước. Metric khám phá/tầm nhìn là Manhattan, chưa có LOS. Trại hết garrison thành site trống, không respawn, dùng overlay/ẩn marker. | readiness §2.2/§7, world, S00 |
| F-07 đói/tài sản kẹt | **Tiếp thu** | Khóa nguyên tắc: đói kéo dài phải hao hụt hữu hạn tới hết quân (lịch/tỷ lệ CAL10 vẫn là cổng). `dormant` cho xe/hàng không quân/không đích của phe đã thất bại quân sự: giữ ledger/ID/số lượng, không movement/production/poll; event/lệnh hợp lệ đánh thức, không nhân bản; planner archive được. Không áp lên Army sống. Army landless tính trong trần 4, gộp giảm số đếm. | B27, readiness §6, mobile-npcs §6, CAL10 |
| F-08 guard | **Tiếp thu** | Kiểm lúc phóng và mọi lần đổi đích/bước mission mới nhắm thành khởi đầu; bước không hợp lệ không commit. Hủy guard chỉ khi commit lệnh attack/occupy hợp lệ, chủ động, nhắm tài sản ash-crown. AI được đánh mỏ ngoài phạm vi guard, UI ghi rõ. | readiness §7, S00 |
| F-09 umbral/martial/bait | **Trì hoãn sang đo** | Chỉ ghi vào CAL05/test (RV21-09/10). Không thêm fallback damage, kỹ năng hoặc đổi hồi khi chưa đo. | readiness §4, combat §6, CAL |
| F-10 research placeholder | **Tiếp thu** | `research_bonus = 0` tới khi ruleset có tech kinh tế; công thức giữ; 160 là fixture giả định; không UI mới. | B26, readiness §5, npc-and-great-cities §5 |
| F-11 BUILD | **Tiếp thu, mở rộng** | BUILD-02: NPC chỉ di chuyển/tập kết/quan sát. BUILD-03: mất gốc/pending/chặn tăng và nợ cơ bản + phụ phí theo clock, để vòng A1 có hậu quả sau mốc 6 giờ. BUILD-04: job pause/trả suất/resume. Giữ thành thứ hai trước research. Ghi ngoài phạm vi: 45 profile, bốn trạng thái ngoại giao, thuế/An dân, Thanh tẩy/Nguyền, du mục, hoàn tất 189 export. | readiness §8, roadmap §7 |

Không rút finding nào. Không thêm B29, trạng thái ngoại giao, trận đường, trận ba phe, mana hoặc asset.

## 2. Override so với ca RV21 trong report gốc

Report C09 giữ nguyên byte. Bảng hiện hành ở [prototype readiness §9](../prototype-readiness.md) áp các override sau:

- **RV21-05:** report gốc để “theo luật F-02c”. Hiện hành: Y giữ ngoại thành, không tự đánh G trong cùng arrival; assault là lệnh riêng.
- **RV21-11:** report gốc ghi tie-break theo `cohort_id`. Hiện hành: stable claim key trong snapshot, gộp cùng key trước; không làm tròn số chết giữa profile.
- Làm rõ, không đổi nghĩa: RV21-02 thêm tick 6924; RV21-06 khớp BFS 19; RV21-12 khớp quyết định giữ sông; RV21-15 dùng `world-custody`.

Mười ba ca BS-T giữ mã cũ; BS-T02, BS-T03, BS-T04, BS-T06, BS-T09, BS-T10 được chỉnh câu chữ cho khớp luật 2.2. Không mã nào được tái dùng cho nghĩa khác. Mọi ca vẫn **chưa chạy**.

## 3. File đổi và phần giữ nguyên

| Nhóm | Trạng thái |
|---|---|
| Đổi lên 2.2 | README, final-design (B23–B28, §8), decisions, prototype-readiness, systems-and-balance, technical-design, combat-abilities, military-and-research, mobile-npcs, world-and-expansion, npc-and-great-cities, calibration-register, roadmap-and-validation, gameplay-blueprint, CHANGELOG, validation-report |
| S00 | `first-foundation.json` 0.2-draft / design 2.2, vẫn `specification-fixture-not-runnable` / `unmeasured`. SHA256 trước c8f7d1f86563cfee5307e81005301e68d6691af0993021734b7de0fb57809a49, sau 2d5131017768485dbd5c3f4a976585a48fe1d80ffa1569fd39603aeb6e94ce70. Lý do đổi: thêm movement_rules, custody, distance_metric, ai_budget, sửa câu guard, thêm luật kho/nợ/job/đói, mở rộng unresolved |
| Static validation | `static-validation.json` ghi lại kết quả 2.2 |
| Mới | `archive/crownlands-design-v2.1.zip` (44 entry, SHA256 3da7c9cfddf4c121e9e3f34fd338dd6196f4b518a9797a4bed503ff27fb6d016), file resolution này |
| Giữ nguyên byte | 7 reference-docs, U08, sources/proposals/reviews cũ, Claude review 2.1 (3c82c0c76feffb78baf94c7a651c708dce1843da8695bc53fd15ca14a559a143), asset-manifest (80359e5f…eec8d), unit-roster (6cbcc567…a60a48), city-layout (b82c2e81…ce266a); art bible, asset plan, brief |

Ảnh hưởng asset: không có. 189 export vẫn `planned`, repo có 0 file ảnh.

## 4. Kiểm đã chạy và chưa chạy

**Đã chạy** (script tạm ngoài project, `python3 -I`):

- Archive v2.1: `testzip` không lỗi, 44 entry khớp byte với file trước khi sửa.
- Hash nguồn: 7/7 reference, U08 đúng, 22 file lịch sử/asset không đổi. Hash S00 trước/sau như trên.
- BFS bốn hướng, ô site chỉ vào khi là start/đích: tiền thành 19, thủ đô 36, mỏ đất 8, mỏ lương 10, trại 10; thủ đô→tiền thành 17; bỏ cầu thì thủ đô 90.
- Phép tính tham chiếu: kho 6000 đầy, +400/−52 cho 6000 ở 1/2/4 đoạn (overflow 348/h), cách cũ 5948/5974/5987; 100 lương, −52/h chạm 0 tại 90000/13 s, tick 6924.
- Toy phân bổ: 1 quantum cho 2 claim bằng nhau → key thấp nhận 1; đảo thứ tự và tách cùng key cho cùng kết quả; 7 quantum cho 3 claim bằng nhau → 3/2/2; tổng ≤ quỹ, mỗi claim ≤ damage. Không có làm tròn số chết.
- S00: tham chiếu owner/profile/home/capacity/custody hợp lệ, kho ≤ cap, 52 quân, floor AI ≤ garrison (headroom 20/6), quota không dồn, status/balance đúng.
- ID: B01–B28 (không B29), BS, BS-T01–13, RV21-01–15, BUILD, CAL, D, I, N, P, O có mặt; link Markdown tương đối không gãy (xem validation-report).

**Chưa chạy:** engine, mô phỏng, AI, combat, đói, save/cache, playtest, benchmark và các ca BS-T/RV21. Các phép tính trên là arithmetic reference, không phải engine test. Static check không chứng minh AI thắng/thua hay vòng S00 vui.

Câu hỏi cho chủ dự án: không cần. Lần review tiếp theo nên để Claude đọc lại F-02c (không chain) và F-03 (phân bổ theo damage) vì đó là hai chỗ coordinator chọn khác đề nghị của reviewer.
