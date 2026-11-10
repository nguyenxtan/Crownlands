# Claude review chéo: nghiên cứu, tuyển quân và thu–chi

Ngày 10/11/2026 · Reviewer: Claude · Đối tượng: [phương án RC01–RC10](../proposals/2026-11-10-research-and-economy-closure.md) của Codex.

Đã đọc: [tóm lược thu–chi](../sources/2026-11-10-city-budget-summary.md), [đề xuất nghiên cứu](../sources/2026-11-10-research-system-proposal.md), [review nghiên cứu Codex](2026-11-10-research-system-review.md), [tuyển quân lần3](../proposals/2026-11-10-recruitment-scaling.md), [thủ thành](2026-11-10-city-defense-resolution.md), canonical 2.2 liên quan và runtime `game.js`/`units.js`.

**Mức kiểm chứng:** nguồn, logic và arithmetic hữu tỷ (script tạm ngoài project). Không engine, mô phỏng hay playtest. **Đây là phản biện, chưa phải đồng thuận.**

## 1. Kết luận

Có thể chốt cấu trúc 2.3 sau khi Codex xử lý các chỗ hở **về luật** ở §3 (F1–F6); chúng không phải số hiệu chỉnh nên không được gắn CAL. Phần lớn RC khớp baseline. RC07/RC08 **đi ngược ưu tiên user ghi trong nguồn** (“khẩu phần theo vị trí, vận hành thành, bảo dưỡng quân cấp đơn vị, vật tư thủ thành thật”); tôi vẫn đồng ý hoãn vì lý do kỹ thuật, nhưng phải ghi là quyết định sắp thứ tự và báo thẳng user.

| RC | Phán định | Một dòng lý do |
|---|---|---|
| RC01 Nghiên cứu | **Chốt, chỉnh nhỏ** | Đúng B06. Cần sửa danh sách 6 tech cho khớp B26/roster (F9) |
| RC02 Tuyển quân | **Chốt cấu trúc; số là preset CAL02** | Cần thêm luật nội suy và luật làm tròn công huấn luyện (F7, F8) |
| RC03 Sổ tài sản | **Chỉnh rồi chốt** | Trả trước lệch mô hình trả dần của nguồn; khoản giữ trong core gần như rỗng (F1) |
| RC04 Nguồn lương | **Chỉnh rồi chốt** | Hành trang không phải `in_transit`; luật một nguồn cần thứ tự dự phòng (F2, F3) |
| RC05 Kho đầy/cargo | **Chốt việc dỡ một phần, thêm luật xe kẹt** | Nằm trong nguồn user, không phình phạm vi; nhưng có phản ví dụ kẹt vĩnh viễn (F6) |
| RC06 Thủ thành | **Chốt nguyên tắc; triển khai sau BUILD-03** | Khớp kết luận hai vòng review |
| RC07 Bảo dưỡng | **Chốt cấu trúc dữ liệu, hoãn kích hoạt** | Hậu quả khi thiếu là luật chưa có; có lỗ hổng tránh phí bằng hành quân (F4) |
| RC08 Vận hành thành | **Chốt danh mục mã chi, rate 0, hoãn** | Chưa có hậu quả chức năng; bảng sổ mẫu không áp được ngay |
| RC09 Đói | **Chốt, thêm luật trạng thái đói theo bucket** | Cần chặn việc reset bằng cách gộp nhóm (F5) |
| RC10 Phân kỳ | **Chốt** | Cần phân biệt chốt thiết kế/CAL/luật thiếu/đã triển khai |

## 2. Phán định chi tiết

**RC01 — Chốt.** Giữ một dự án toàn đế chế (B06); mô hình 1–3 dự án cần ngân sách hỗ trợ và trần riêng, hiện chưa có định nghĩa. Cấp Học viện chỉ là cổng, thời gian lấy từ dữ liệu tech. Core **không có tech tăng tốc nghiên cứu**, để tránh vòng tự tăng tốc mà §5.1/§15 của nguồn tự cảnh báo; trần +50% chỉ ở danh mục dài hạn. **Không tech core nào thu phí áp dụng lần hai**; điều kiện địa phương đi qua cấp Lò rèn/Doanh trại có sẵn (RS-03).

**RC02 — Chốt cấu trúc.** `T = W_profile × hệ_số_cơ_sở / (1 + B)`, chỉ mức tech cao nhất có hiệu lực, áp cho phần công còn lại. Đã kiểm năm hàng (40; 34,545; 28,8; 24,286; 20; Doanh trại 1 + IV = 25) và các thời lượng thực ở 8× (8′20″, 1h06′40″, 41′40″, 1h44′10″, 2h46′40″): đều đúng. Cap 200–2.500 và +60% **là preset CAL02, không phải lệnh user**. Default: thưởng áp **cả job tuyển và job nâng**, nếu không đường tuyển thẳng được lợi vô tình khi so ở CAL04. Luật còn thiếu ở F7/F8.

**RC03 — Chỉnh.** Định nghĩa `on_hand/reserved/available/spent/in_transit` đúng, khớp I01/I06; cần xử lý xung đột thanh toán F1.

**RC04 — Chỉnh.** Nguyên tắc chuyển/tiêu/cướp/phá khớp B26 và AssetLedger; thiếu F2/F3. Default: Army bị diệt tại site thì hành trang vào **custody thế giới** theo B23, không xóa.

**RC05 — Chốt dỡ một phần.** Câu “chỉ nhận đủ chỗ, còn trên xe… không tạm vượt vô hạn” **nằm trong nguồn user**, nên không phải phình phạm vi. B12 chỉ nói quyền/cổng, không nói sức chứa, nên không mâu thuẫn. Dỡ ở pha 3 sau giao chiến, xe cùng tick theo sequence; mỗi tài nguyên dỡ `min(hàng, chỗ trống)`, chỗ trống tính cả phần giữ. Phần dư theo B12; chặn phản ví dụ F6.

**RC06 — Chốt nguyên tắc.** Trừ một lần mỗi assault hợp lệ **trong commit nguyên tử của trận** ở pha 2, từ kho thật, theo kíp/trần vị trí/cường độ `s`. Vì trừ cùng commit, không có trạng thái “đã trừ mà trận chưa xảy ra”, load không trừ lần hai. Sàn dự trữ mặc định 0, là policy. Giữ lời rút L2: chặn/để ngỏ thuộc outer holder. `1 + β·s` vẫn chỉ là ứng viên thử. D1 vào sau BUILD-03.

**RC07 — Chốt cấu trúc, hoãn kích hoạt.** Lý do mạnh nhất không phải roster mà là **hậu quả thiếu bảo dưỡng chưa có định nghĩa** và cần combat engine chưa tồn tại. Thu phí khi chưa có hậu quả chỉ là một khoản thuế, đúng điều nguồn muốn tránh. Chốt ngay trường `maintenance{wood,iron}` mỗi profile, mặc định 0 cho I–II, chung pipeline B26 và cùng nguồn RC04. Hai luật bắt buộc trước khi bật ở F4.

**RC08 — Chốt danh mục, hoãn rate.** Chốt năm mã nguyên nhân chi cùng nhóm chuyển/hao hụt trong ledger để bật sau không đổi schema; rate mặc định 0. Bảo trì vướng cùng lỗ: “ảnh hưởng đúng chức năng” chưa định nghĩa. Phải nói rõ với user: các dòng bảo trì, hành chính và hỏng lương của sổ mẫu **chưa áp ở 2.3**.

**RC09 — Chốt** B27/CAL10, bổ sung luật F5. Không hứa vay lương xuyên tuyến; dự báo tách ròng hiện tại khỏi khoản rời rạc đã biết.

**RC10 — Chốt.** Lên 2.3, archive 2.2, giữ art 2.0/manifest/layout, S00 và runtime 0.2. Mỗi mục mới mang một nhãn: **thiết kế đã chốt / preset CAL / luật còn thiếu (chặn kích hoạt) / đã triển khai**. Luật còn thiếu không gộp vào CAL.

## 3. Phát hiện chính

**F1 — Thanh toán: trả trước hay trả dần (quan trọng).** Nguồn của user mô tả **trả dần**: nghiên cứu §4.2 (“tăng tốc làm dự án dùng nguồn lực nhanh hơn”), sổ mẫu có dòng “nghiên cứu/xây dựng trong giờ” và câu “dự án không được bảo đảm nguồn thì chờ/dừng”. RC03, military §3 và runtime (`game.js` trừ `stock`, ghi `ledger.spent` lúc đặt lệnh, chưa có hủy) theo **trả trước**.

Đề xuất **giữ trả trước cho core**: khớp runtime, không cần trạng thái dự án đói vật tư, đối soát đơn giản. Đây là lựa chọn thường lệ. 2.3 phải ghi rõ ba hệ quả:
- (a) Các dòng “trong giờ” của sổ mẫu biến thành chi rời rạc tại mốc nhận lệnh.
- (b) Đòn bẩy “bỏ nghiên cứu/xây để được +3.610 lương” trong nguồn không còn. Dừng một dự án đã trả không hoàn lại gì; chỉ có thể *không bắt đầu* dự án mới.
- (c) Khi mọi thứ trả trước, **core không có khoản giữ tài nguyên nào**; chỉ có giữ suất quân. `reserved` vẫn là định nghĩa đúng, nhưng không cần dựng engine reservation cho đến khi có hợp đồng.

Dòng “Hủy: việc chưa chạy trả phần giữ chưa tiêu” ở military §3 không khớp runtime. Đề nghị: “core chưa có hủy; nếu mở, job chưa chạy hoàn đúng `spent` đã ghi của job đó, job đã chạy không hoàn”, tức hoàn theo sổ, đúng luật chống lợi nhuận từ giảm giá (§15 nguồn).

**F2 — Hành trang không phải `in_transit`.** `in_transit` là hàng của một Shipment có đích giao. Lương quân mang theo là **kho của Army**: có vị trí, bị tiêu dần, không “tới nơi”. Nếu gộp hai loại, phép kiểm I06 (không vừa ở nguồn, đang đi và ở đích) sẽ hỏng khi quân dừng ở trại. Đề nghị thêm loại vị trí `army` vào ledger. Sức chứa hành trang lấy theo “sức chở” CAL02.

**F3 — “Một nguồn mỗi mốc” cần thứ tự dự phòng.** Phản ví dụ: Army mang 3.000 lương đóng ở trại cùng chủ có kho 0. Nếu nguồn duy nhất là kho trại, quân **đói trong khi hành trang còn đầy**. Default đề nghị:
- Di chuyển hoặc ở site không thuộc mình: ăn hành trang.
- Đóng tại site cùng chủ có kho: ăn kho site trước, chạm 0 thì chuyển sang hành trang; mỗi đoạn B26 vẫn một nguồn, đổi tại tick chạm 0.
- Không tự dỡ hành trang vào kho, để không vượt cap qua đường quân.

**F4 — Bảo dưỡng khi quân ở xa.** Nếu chỉ tính khi đồn trú, có lỗ hổng: cho 1.320 quân chạy vòng giữa hai thành mình tốn thêm 545 lương/giờ nhưng né 200 gỗ + 270 sắt/giờ, đáng làm khi sắt khan. Nếu tính cả lúc hành quân, gỗ/sắt phải nằm trong hành trang và chiếm tải; nguồn chỉ tính 26.160 lương mà bỏ qua 2.000 gỗ + 2.700 sắt cho chuyến 10 giờ. Hai luật **bắt buộc có trước khi bật** RC07:
- (i) Bảo dưỡng chạy liên tục ở mọi trạng thái và trả từ cùng nguồn đang nuôi quân theo F3.
- (ii) Hậu quả khi thiếu, và cách tích lũy/phục hồi theo bucket.

Đây là luật, không phải số CAL.

**F5 — Đói không reset bằng cách gộp nhóm.** Đề nghị lưu trạng thái đói `h` theo từng cohort bucket, tăng theo tỷ lệ unmet × dt. `h` chỉ giảm khi được nuôi đủ, với tốc độ ρ ≤ 1 (CAL10); vì vậy nhận 1 đơn vị lương trong một tick không xóa được `h`. Gộp Army giữ nguyên bucket, đúng technical §6 (“gộp giữ các bucket”). **Cấm lấy bình quân `h` khi gộp.** Phản ví dụ nếu cho bình quân: gộp 10 quân đói nặng vào 1.000 quân no thì `h` gần bằng 0, và nợ đói bị xóa. Phần unmet của cùng một nguồn chia theo tỷ lệ nhu cầu từng bucket.

**F6 — Xe kẹt vĩnh viễn.** Phản ví dụ: kho đích đầy, phần dư quay về nguồn một lần, kho nguồn cũng đầy, không có nơi cùng chủ nào khác còn chỗ. Xe kẹt, không nhận chuyến mới (I05), và có thể nằm đó mãi. Default đề nghị: xe kẹt giữ hàng, có thông báo. Người chơi có thể (a) ra lệnh dỡ khi đã có chỗ, hoặc (b) chủ động **bỏ hàng**, ghi ledger là sink với lý do `discarded`. Không có hao hụt ngầm. Không cần thêm “kho tạm”.

**F7 — Mức giữa các mốc cap/thời gian.** Nếu dùng hàm bậc thang theo mốc 1/5/10/15/20, bốn cấp nâng liên tiếp sẽ không cho gì; đây là lựa chọn thiết kế, không phải số đo. Default: nội suy tuyến tính theo từng đoạn, cap làm tròn xuống bội 10, hệ số cơ sở lấy theo đoạn. Giá trị cụ thể vẫn là CAL02.

**F8 — Làm tròn công huấn luyện.** Không được làm tròn thời gian từng lính. Ví dụ: 1.000 kiếm ở Doanh trại 5 + tech I chính xác là 34.545,45 giây; nếu làm tròn mỗi lính lên 35 giây sẽ thành 35.000, lệch 455 giây. Đề nghị lưu công còn lại bằng số nguyên (fixed-point) và tốc độ dạng hữu tỷ. Mốc xong của từng lính tính từ công lũy kế, lấy tick nguyên đầu tiên tại hoặc sau mốc (ceil, cùng quy ước B26). Runtime cần migrate từ `seconds × count` và gỡ trần cứng 200 trong input/validator.

**F9 — Danh sách 6 tech đợt đầu.** Danh sách RS (Thủy lợi, Tổ chức kho, Tiêu chuẩn xe…) cần `research_bonus > 0` và xe, trong khi B26 core để research = 0, còn military §2 dành 5–6 tech để **mở roster**; Tổ chức huấn luyện I–IV đã chiếm bốn suất. Đề nghị 2.3 chỉ khóa thứ tự: mở roster, rồi Tổ chức huấn luyện I(–II); tech kinh tế/xe sau khi BUILD-02 có xe. Tên/giá ở CAL04.

**F10 — Ví dụ 1.320 quân nằm ngoài core:** kiếm/giáo/cung/voi III không thuộc roster 14; chỉ dùng kiểm sổ.

## 4. Phép tính độc lập (chỉ arithmetic)

Tính bằng `Fraction` trong Python, script tạm `/tmp/cl-arith/check.py`. Không chạy engine.

| Mục | Kết quả | Ghi chú |
|---|---|---|
| 1.320 quân đồn trú | 2.180 lương / 200 gỗ / 270 sắt mỗi giờ | **Đúng** |
| Hành quân ×1,25 | 2.725/h; 8 giờ đi về × 2.725 + 2 giờ đóng × 2.180 = 26.160 | **Đúng**. Giả định 2 giờ đóng ăn hành trang; chưa có 2.000 gỗ/2.700 sắt (F4) |
| Sổ ròng | 1.900 / 1.500 / 2.030 / 1.760 | **Đúng** |
| +500 kỵ III | lương −490; gỗ 1.800; sắt 1.780; ngừng xuất 1.400 → +910 | **Đúng** |
| Bỏ nghiên cứu/xây/xuất | 3.610 tính từ sổ gốc; **1.360 nếu đã thêm 500 kỵ** | Câu trong nguồn mơ hồ; dưới trả trước thì đòn bẩy này không còn (F1) |
| 10 xe, hao 5% | 1.583,33/h, thiếu 596,67 | **Đúng** |
| 14 xe | 2.216,67/h, dư 36,67 (1,7%) | Đúng, nhưng chỉ cần thời gian phục vụ > **6,06 phút** mỗi vòng là thiếu; 15 xe chịu được tới 32,2 phút |
| Lịch 14 xe | xuất đều: tiêu 934,3 giữa hai chuyến < 950 mỗi chuyến; xuất cùng lúc: cần đệm khoảng 13.080 | Kho ban đầu tối thiểu 3 giờ × 2.180 = 6.540 trước chuyến đầu |
| Tỷ lệ nuôi | 1,3/0,8 = 1,625; 1,7/0,8 = 2,125 | **Đúng**, chỉ xét ràng buộc lương |

Hao hụt 5% trên xe là **luật mới** cần nguyên nhân/sink. Default core: 0, chỉ mất khi bị cướp/phá có ghi sổ; không đưa 5% vào CAL như thể luật đã có.

## 5. Bộ đề nghị chốt cho baseline 2.3

**Nguyên tắc (thiết kế đã chốt):**
1. Kiến thức toàn đế chế, một dự án. Cấp Học viện là cổng. Không tech core nào thu phí áp dụng lần hai. Không có tech tăng tốc nghiên cứu.
2. Cap theo cấp Doanh trại, tính suất ở gốc. Công huấn luyện tính theo cơ sở × (1 + thưởng cao nhất); thay đổi áp phần công còn lại; dùng số học fixed-point (F8).
3. Trả trước khi nhận lệnh. Ledger có `on_hand/reserved/available/spent/in_transit` và loại vị trí `army` (F1, F2).
4. Mỗi đoạn có một nguồn nuôi, theo thứ tự dự phòng F3. Đi/đến/chết đổi chi từ đúng mốc.
5. Năm mã chi theo nguyên nhân; chuyển, cướp, phá và bỏ là các bút toán khác nhau.
6. Kho đầy: dỡ một phần, phần dư xử lý theo B12, xe kẹt theo F6.
7. Đói hữu hạn, trạng thái theo bucket, không reset (F5). B24/B27 giữ nguyên.
8. Vật tư thủ thành trừ một lần trong commit nguyên tử của trận.

**Preset CAL (chưa cân bằng):** cap/thời gian/thưởng và nội suy RC02 (CAL02); giá/thời gian tech (CAL04); hành quân 1,25 (CAL07); lịch đói, ρ, ân hạn (CAL10); kíp/vị trí/HP thủ thành (CAL09 hoặc mã mới).

**Luật còn thiếu, chặn kích hoạt:** hậu quả thiếu bảo dưỡng (F4); hậu quả thiếu bảo trì theo từng chức năng; nguyên nhân hao hụt trên xe; hành chính theo khối lượng.

**Hoãn, giữ trong hồ sơ:** 1–3 dự án song song và hỗ trợ giữa Học viện; thuế/An dân (B18); học thuyết; tech giảm lương 20%; research_bonus kinh tế; tư liệu nghiên cứu; hợp đồng và reservation; dân sinh/cứu trợ; đánh chặn đường (B03). B17 20/20/40, B25 (quỹ chung, không phí phép) và B26 giữ nguyên.

## 6. Câu hỏi cho user

**Không có câu hỏi bắt buộc.** F1 và F7 là lựa chọn thường lệ, Codex tự chốt. Chỉ cần **thông báo**: bảo dưỡng quân và vận hành thành được chốt cấu trúc nhưng chưa thu phí tới khi có hậu quả. Nếu user muốn thu ngay thì đó mới là đổi mục tiêu, cần mô hình readiness tối thiểu.

## 7. Điều kiện cần mô phỏng trước khi gọi là cân bằng

Cap 2.500 so với lương ruộng cấp 20 (chưa có số); tuyển thẳng và nâng khi thưởng áp cả hai (CAL04); tuyến xe có thời gian phục vụ và lịch xuất phát; test bất biến cho F4/F5 trước engine; đánh mồi đốt vật tư thủ thành.

Codex cần trả lời trước khi chốt: chấp nhận hay bác F1–F6 (luật), F7–F9 (default) và cách gắn bốn nhãn ở RC10. **Review này không có mô phỏng, engine test hay playtest.**
