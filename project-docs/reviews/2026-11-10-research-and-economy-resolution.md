# Resolution 2.3 — nghiên cứu, tuyển quân và thu–chi

Ngày 10/11/2026 · Coordinator:Codex · Đầu vào: [Claude review RC01–RC10](2026-11-10-research-and-economy-claude-review.md), [phương án trước review](../proposals/2026-11-10-research-and-economy-closure.md), [nguồn khoa học](../sources/2026-11-10-research-system-proposal.md), [nguồn thu–chi biên tập](../sources/2026-11-10-city-budget-summary.md).

**Thẩm quyền U11:** chủ dự án yêu cầu cap theo cấp nhà binh, điều chỉnh ít/chậm hơn, gắn thời gian tuyển với nghiên cứu, và “cái nào review được với claude rồi thì chốt thôi”. Codex chốt các lựa chọn dưới đây theo ủy quyền đó. Không gán bảng số của Codex thành câu nói hoặc số đã được user duyệt. Bản 2.2 trước sửa được giữ trong [archive](../archive/crownlands-design-v2.2.zip).

Đã đọc/đối chiếu đầy đủ review. Phép tính trong nguồn và review được kiểm lại bằng số hữu tỷ. **Đây là kết luận thiết kế sau phản biện, không engine test, mô phỏng hoặc playtest.** Các làm rõ cuối của coordinator được ghi dưới đây, không nói Claude đã review lại từng câu sau cùng.

## 1. Phán định RC

| RC | Chốt 2.3 |
|---|---|
|01|Một dự án, kiến thức đế chế, cơ sở địa phương; không phí áp dụng lần 2 hoặc tech tăng tốc nghiên cứu trong đợt đầu |
|02|Cap theo Doanh trại; công huấn luyện/cơ sở/tech; nội suy liên tục giữa mốc và giữ phần công lẻ. Các con số là preset CAL |
|03|Core trả trước, khoản đã trả không còn trong kho; chưa có reservation nguyên liệu ở core. Reservation suất quân vẫn có |
|04|Tách kho Army và Shipment; cấp lương kho hợp lệ trước, hành trang bù phần thiếu; mỗi quantum nhu cầu được trả một lần |
|05|Dỡ theo chỗ trống từng loại, phần dư còn trên xe; về nguồn một lần và có lệnh xử lý hàng kẹt/hủy có sổ |
|06|Vật tư thủ thành một lần trong commit trận hợp lệ; giữ kết luận review hai vòng, chưa bật engine D1 |
|07|Chốt nguồn/danh mục bảo dưỡng, mặc định chưa bật. Phải có nguồn vật tư ở xa và hậu quả thiếu trước kích hoạt |
|08|Danh mục vận hành/bảo trì/hành chính/hao hụt được giữ; không thu phí tồn tại mặc định, không 5% hao hàng vô cớ |
|09|Nợ đói theo bucket, không bình quân/reset khi tách/gộp/load; hậu quả thiếu kéo dài hữu hạn theo B27 |
|10|Baseline 2.3, art 2.0; S00/runtime còn phiên bản cũ có phạm vi rõ. Tách thiết kế/preset/cổng luật/đã triển khai |

## 2. Xử lý F1–F10

**F1 — Tiếp thu trả trước, không chuyển runtime sang trả dần.** Đây là lựa chọn khác mô hình nguồn. Các dòng “chi trong giờ” được hiểu là tổng những lần chi rời rạc thực sự xảy ra trong giờ đó, không rate cố định sau khi đã thanh toán. Core không dựng khoản giữ nguyên liệu giả. Khi hệ thống hủy job, chi đã trả không hoàn; giữ suất giải phóng theo luật. Tuyển hiện chưa có nút hủy chủ động; nâng có thể hủy theo B08, không hoàn chi đã tiêu. Cơ chế hoàn nguyên liệu cho việc chưa chạy là mở rộng, cần luật refund/tràn kho trước khi bật; không tự thêm theo gợi ý “nếu mở” của reviewer.

Sửa câu Hủy ở military§3 và B08 để “phần giữ” rõ là biên chế. Khi đã trả chi, dừng job không làm tiền trở lại kho. Chỉ **không nhận một dự án mới** mới tránh khoản chi đó. Ví dụ 3.610 lương là sổ gốc không phát sinh nghiên cứu/xây/xuất; sau thêm 500 kỵ thì con số tương ứng 1.360, không 3.610.

**F2 — Tiếp thu.** Hành trang là inventory tại Army, không phải Shipment chờ giao. Không tự dỡ khi tới trại. Khi Army bị tiêu diệt, raw còn lại ở cùng site/khu vực thành một container salvage dưới `world-custody`, không cộng kho người thắng; claim/load cần quyền tiếp cận khu vực theo B12/B23 và vận tải thật. Giữ phân biệt trong/ngoài thành, không cho outer holder đọc kho/loot nội thành chưa chiếm.

**F3 — Tiếp thu thứ tự dự phòng, làm rõ đơn vị “một nguồn”.** Nguồn ưu tiên: site cùng chủ có quyền truy cập, rồi hành trang của Army; đang đi/ở nơi không có quyền dùng kho thì chỉ hành trang. Không rút ngầm từ thành gốc. Nếu site chỉ đáp ứng một phần, hành trang trả phần nhu cầu còn lại: **mỗi quantum khẩu phần được tính đúng một lần**, không đòi một nguồn duy nhất cho cả đoạn dài. Cách làm rõ này tránh đói giả khi kho site 0 nhưng đang sản xuất một phần và hành trang còn lương. Phân bổ kho chung theo nhu cầu với số học chính xác/key ổn định; phần đói còn lại ghi đúng bucket, không theo thứ tự duyệt Army.

**F4 — Tiếp thu, chưa bật bảo dưỡng ngoài lương.** Khi bật, phải có rate ở mọi trạng thái, vật tư trên hành trang chiếm tải, và hậu quả thiếu/tích lũy/phục hồi chống tách/gộp. Không miễn bảo dưỡng chỉ vì cho quân chạy vòng. Chuyến mẫu 10 giờ có 2.000 gỗ+2.700 sắt duy trì nếu cùng rate;26.160 chỉ là lương, không đủ để gọi trọn gói tiếp tế. Không mặc định tính thêm bộ trang bị mới khi quân chết.

**F5 — Tiếp thu.** Lưu nợ thiếu lương theo bucket; tách chép trạng thái, gộp giữ bucket khác nợ, không trung bình hoặc lấy trạng thái no nhất. Thiếu làm nợ tăng theo phần unmet và game-time; được nuôi đủ mới hồi dần với 0<ρ≤1, số CAL10. Một ít lương chỉ trả một phần thiếu, không xóa lịch sử. Không áp hệ số thiếu lương rồi xóa/trừ quân thêm lần nữa dưới tên nợ cap.

**F6 — Tiếp thu.** Hàng kẹt giữ chủ/lượng; dỡ lại khi đủ chỗ hoặc ra lệnh **hủy hàng kẹt** có thông báo lượng mất và ledger `discarded`. Không tự sinh kho tạm. Chỉ chủ hợp lệ được hủy; không xóa hàng vì cleanup hoặc mất phe. Hủy hàng là sink, không đồng thời tạo loot cho NPC.

**F7 — Tiếp thu nội suy.** Trong preset, mỗi đoạn giữa mốc nội suy tuyến tính; cap làm tròn xuống bội 10, hệ số thời gian giữ hữu tỷ. Cấp 0 cho 0 cap; mất nguồn đi theo B24, không xóa quân. Không để bốn lần nâng liên tiếp nhận cùng cap/công suất vì hàm bậc thang.

**F8 — Tiếp thu.** Công huấn luyện fixed-point/hữu tỷ, giữ phần dư qua người tiếp theo và job đã xếp. Hoàn tất ở tick ceil của mốc lũy kế, không nhân “ceil thời gian một người” với cả lô. Thay tech/cơ sở tại Tchỉ đổi năng lực từ T; phần công tới T dùng tốc độ cũ. Không làm tròn sau mỗi frame hoặc mỗi lần lưu/tải.

**F9 — Chỉnh danh mục, không khóa sáu tên thành yêu cầu prototype.** Giữ ưu tiên mở roster và Tổ chức huấn luyện; kinh tế/xe nghiên cứu sau khi nền liên quan hoạt động. BUILD-04 đầu thử 3 node: trang bị II, huấn luyện II, Tổ chức huấn luyện I. Mở đủ roster 14 ở BUILD-05 có danh mục riêng; khoảng 5–6 tech mở roster không phải trần cho toàn bộ công nghệ, và bốn mức tốc độ là bốn lần nghiên cứu có ID riêng, không tính giả là một lần trả tiền. Những tên Thủy lợi/Kho/Xe còn danh mục mở rộng, không buộc research kinh tế bật khi B26 core còn 0.

**F10 — Tiếp thu.**1.320 quân bậc IIIngoài roster 14; bảng chỉ kiểm sổ, không thaystats/quân đầu/cap/tảiS00. Hao 5% trên xe là luật thử chưa có, core 0 ngoài các mất mát có nguyên nhân đã định nghĩa.14 xe chỉ dư 36,67 lương/h, xử lý phục vụ/lịch thực trước kết luận an toàn.

## 3. Thông báo phạm vi với chủ dự án

Nguồn muốn làm sớm vận hành thành và bảo dưỡng quân. Coordinator cùng reviewer chọn **khóa cấu trúc nhưng hoãn thu phí** vì nguồn vật tư/hậu quả khi thiếu chưa đủ luật và engine nền chưa có. Đợt đầu vẫn lương, đầu tư thật và chuyển hàng; không bật đồng thời phí mọi nhà, thanh sẵn sàng, hỏng lương, thuế và An dân. Đây là quyết định phân kỳ được nêu công khai, không giả vờ toàn bộ nguồn đã được triển khai hoặc giữ trong core.

## 4. Trạng thái cuối

- **Thiết kế đã chốt:** B29–B33 trong [baseline](../final-design.md); chi tiết ở [nghiên cứu và kinh tế](../research-and-economy.md).
- **Preset CAL:** [bảng thử](../prototype/research-economy-preset.json), không số đã được user/Claude chứng minh cân bằng.
- **Cổng luật chưa đủ để bật module:** maintenance/readiness, bảo trì chức năng, thuế/An dân, tác dụng công sự D1; tách khỏi CAL.
- **Đã triển khai:** chỉ subset được ghi trong implementation/runtime. Không thay app, save, S00, service hoặc asset trong đợt docs này. Không chạy game/AI/combat/research test; static/arithmetic không thay engine/playtest.
