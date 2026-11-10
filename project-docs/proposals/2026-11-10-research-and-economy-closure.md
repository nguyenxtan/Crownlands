# Phương án để Claude phản biện và khép tài liệu

Ngày 10/11/2026 · **Đầu vào review, chưa có đồng thuận hoặc cập nhật baseline.** Chỉ đạo mới: “cái nào review được với claude rồi thì chốt thôi”. Codex sẽ quyết định sau review và cập nhật docs, không đòi chủ dự án chốt lại từng chi tiết thường lệ. Số thử không được gọi là cân bằng.

## Nguồn và thẩm quyền

- [Đề xuất khoa học nguyên bản](../sources/2026-11-10-research-system-proposal.md), [Codex review](../reviews/2026-11-10-research-system-review.md).
- [Đề xuất thu–chi mới, tóm lược biên tập](../sources/2026-11-10-city-budget-summary.md).
- [Tuyển quân lần3](2026-11-10-recruitment-scaling.md): phản hồi ít/chậm hơn, cap theo nhà binh, thời gian có nghiên cứu. Các số2.500suất/+60%chưa được user/Claude duyệt; Codex đề nghị làm preset hiệu chỉnh, không luật bất biến.
- [Thủ thành đã review hai vòng](../reviews/2026-11-10-city-defense-resolution.md): không animation, tiêu vật tư một lần mỗi assault hợp lệ theo kíp/cấp vật tư; chưa có engine.
- Baseline2.2: B06/B07/B08/B12/B18/B24/B25/B26/B28; art contract2.0, game nền0.2 chưa có nghiên cứu/di chuyển/trận.

## Những lựa chọn Codex đề nghị để chốt

**RC01 — Nghiên cứu.** Giữ một dự án toàn đế chế, kiến thức đã xong dùng chung/không mất khi mất Học viện. Dự án dở bị hủy khi mất nơi, không trả chi đã tiêu; không sao chép công nghệ khi chiếm nhà. Cấp Học viện mở điều kiện, không tự cấp nghiên cứu.12nhóm là danh mục dài hạn, đợt đầu khoảng6tech có scope rõ. Không cần thuế/An dân/học thuyết mới để triển khai nghiên cứu nền hoặc chiếm thành thứhai.

**RC02 — Tuyển quân.** Cap theo Doanh trại, suất có trọng số vẫn tính gốc. Công huấn luyện theo profile, tốc độ do cơ sở hợp lệ ×(1+tech đã hoàn tất). Đề nghị giữ nhịp lần3: cap200/400/800/1.500/2.500ở cấp1/5/10/15/20; riêng kiếm I chưa tech40/38/36/34/32giây; tech mức cao nhất10/25/40/60%ở mốcHọc viện5/10/15/20, không cộng lại mức trước. Cuối là20giây, không16giây như trần+100%. Đây là **preset để thử**, còn cost/đường giữa mốc là CAL. Đổi tốc độ giữ công đã làm, tác động từ mốc hoàn tất, không hồi tố/cấp quân miễn phí. S00/game hiện có vẫn giữ fixture mở đầu2.2/0.2 tới khi triển khai/migration, không tự sửa cap NPC mà giả vờ đã test.

**RC03 — Sổ tài sản và khoản giữ.** Tách `on_hand`, `reserved` là phần con của on_hand, `available = on_hand − reserved`, `spent` đã ra khỏi kho, và `in_transit` ở ngoài kho. Không cộng reserved hai lần vào tổng tài sản. Suất quân đang giữ khác nguyên liệu đang giữ. Mức dự trữ sàn chỉ ràng policy tự nhận việc mới, không một kho/ví khác.

Đề nghị **giữ trả đủ chi phí tuyển/nâng/nghiên cứu/xây khi nhận lệnh hợp lệ** cho core, khớp runtime tuyển hiện tại; không âm thầm chuyển các đơn đã trả sang “chưa trả”. Nếu mở một loại kế hoạch/hợp đồng chỉ giữ vật tư, phải có reservation riêng, release/commit/capture rõ; khi commit trừ kho một lần đồng thời bỏ khoản giữ. Cam kết không cho auto-upkeep lấy trước mà không hủy/giải phóng hợp lệ. Dự án bắt đầu rồi không được tự hoàn khi công nghệ giảm giá về sau.

**RC04 — Thu–chi theo nguyên nhân và địa điểm.** Kho theo từng nơi, nhập/xuất xe là chuyển tài sản; chỉ production/tạo nguồn hợp lệ mới tạo raw, chi/hỏng/phá là sink raw, cướp là chuyển chủ nếu có khả năng lấy thật. Đầu tư tiêu raw thành tài sản/công việc, không giữ cùng raw trong kho. Quân có một nguồn khẩu phần mỗi mốc: nơi đóng hoặc hành trang khi đi; gốc chỉ quyết cap, không tự nuôi quân ở xa. Casualty/đi/đến đổi chi từ mốc đúng. NPC cùng sổ, không tiền/quân vô hạn.

**RC05 — Kho đầy và hàng tới.** Khả năng chứa tính mọi raw thực trong kho, kể cả đã giữ. Sản xuất tràn theo B26. Đề nghị cargo được dỡ phần còn chỗ theo từng loại, phần dư ở trên xe và xử lý về nguồn một lần theo B12, không xóa/nhân/dịch chuyển. Quyền/cổng kiểm tại lúc đến sau giao chiến. Cần Claude kiểm đề nghị dỡ một phần có xung đột nguồn hay phình phạm vi không; nếu chưa đủ căn cứ thì khóa nguyên tắc không nhân/loss ẩn, giữ rule B12 thay vì thêm partial.

**RC06 — Thủ thành/vật tư.** Chốt phần đã cùng review: không hiệu ứng hình ảnh, không tự sinh kíp; D1 trừ gỗ/sắt trực tiếp **một lần mỗi assault hợp lệ**, theo quân được phân công/trần vị trí/cường độ cấp, không mỗi round và không thu hai lần nếu có chuẩn bị trước. Không trừ khi đánh ngoài tường/chuẩn bị hủy/0garrison/không có hỗ trợ. Hư hại/chi thực giữ qua trận. Damage tường/4mặt/voi công phá chưa được gọi đã cân bằng; máy chiến đấu đi sau vòng quân–hậu cần. “Chặn/để ngỏ” là outer holder đối với quân chủ động rút, không bắt thủ quân xuất thành khi bị assault.

**RC07 — Bảo dưỡng quân.** Đồng ý hướng dài hạn: dòng quyết khẩu phần, bậc ảnh hưởng đầu tư/bảo dưỡng, không nhân bậc hoặc thức ăn vật cưỡi hai lần. **Chưa bật phí gỗ/sắt mỗi giờ và thanh sẵn sàng trong A1**; baseline B18 đang hoãn bảo dưỡng ngoài lương, quân đầu I không có số bảo dưỡng. BảngbậcIII là fixture nâng sâu, không áp vào52quân ban đầu. Lý do cần khép thêm: quân đang đi lấy gỗ/sắt đâu; có mang vật tư/độ sẵn sàng không; vật nặng chiếm tải; thiếu ảnh hưởng ra sao/tích lũy không lách bằng tách/gộp. Đề nghị xem số và hậu quả trong CAL/module nâng sâu, không tự chi từ thành gốc qua khoảng cách. Claude cần phản biện nếu cắt thế quá xa ý người dùng, và nêu mô hình nhỏ hơn đủ nguồn/đánh đổi nếu muốn làm sớm.

**RC08 — Vận hành thành/hao hụt.** Đồng ý phân nhóm trong sổ nhưng chưa bật đồng thời bảo trì mọi nhà, phí hành chính, cộng đồng/thuế/An dân và lương hỏng. Đề nghị core chưa có phí tồn tại mặc định; mỗi khoản mới cần hành vi/quyền/nguyên nhân/hậu quả và nguồn số. Kho chuẩn không có5%hỏng tự động. Giữ thiết kế mở rộng, không xóa khỏi hồ sơ. Không dùng đế chế có nhiều thành làm cớ nhân tất cả chi.

**RC09 — Đói và dự báo.** Giữ B27: thiếu kéo dài có hao hụt hữu hạn; không vô hạn quân sống nhờ kho về0, không reset cả nợ đói bởi1lương/tách/gộp/load. Lịch số là CAL10. Đừng hứa transit vay lương từ thủ đô. Dự báo cần lịch đã biết, tách ròng hiện tại khỏi một lần chi; được đặt kế hoạch rủi ro nhưng báo hậu quả và đường về, auto-pause ở sự kiện quan trọng được biết. Không lấy bình quân tuyến đủ làm bằng chứng không đói.

**RC10 — Phân kỳ và cập nhật docs.** Chốt cấu trúc và phần đồng thuận sau review, đưa số chưa thử vào CAL. Codex dự định cập nhật baseline và các đặc tả liên quan lên2.3, archive2.2; giữ art2.0/manifest/layout, mọi nguồn/review cũ và S00/game hiện tại. “Đã chốt thiết kế” khác “đã triển khai”. Không bắt hoàn thiện toàn bộ12ngành/chi phí hằng giờ mới tiếp tục vòng chơi hiện tại.

## Những phép tính cần kiểm độc lập

- Bảng1320quân:2180lương/200gỗ/270sắt mỗi giờ; hành quân×1,25 cho2725,4giờđi+2giờđóng+4giờvề tổng26160lương.
- Sổ giờ mẫu: ròng1900/1500/2030/1760; thêm500kỵ làm lương−490; ngừng xuất mới1400→+910; bỏ nghiên cứu/xây/xuất→3610.
- Tuyến10xe1000hữu dụng,6giờchu kỳ,hao5%→1583,3;14xe→2216,7so2180nhu cầu. Lịch chuyến, kho ban đầu và handling vẫn có thể làm đói.
- Thiết kế research +30%sản lượng +giảm20%lương cótỷlệnuôi1,625trong giới hạn riêng lương; cộngGreat40%thành2,125so gốc. Không nhân mọi bonus thành quân thực tối đa khi cap/nguồn khác còn ràng buộc.

## Câu hỏi cho reviewer

Trả lời RC01–RC10: có thể chốt/chỉnh/hoãn, nêu lý do và một phản ví dụ nếu bác. Tập trung logic bảo toàn/nguồn/mốc, sự khớp giữa nghiên cứu–tuyển–lương và ranh giới đã duyệt/còn thử. Đề xuất một mặc định hợp lý cho vấn đề thường lệ; không mở hệ mới chỉ để giải một trường hợp chưa có. Chỉ những vấn đề thật sự đổi mục tiêu mới đưa thành câu hỏi chủ dự án.

Đầu ra phải chỉ rõ phần nào hai bên đủ cơ sở chốt, phần nào chưa có định nghĩa, phần nào chỉ cần đo số; không gọi “đồng thuận” trước khi Codex đọc phản hồi. Chưa mô phỏng/playtest; phép tính tham chiếu không chứng minh cân bằng.
