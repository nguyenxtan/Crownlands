# Năng lực trong trận — mô hình chốt

Phiên bản 2.3 · 10/11/2026 · Theo [bản chốt](final-design.md).

## 1. Phạm vi

Năng lực tự kích hoạt trong trận tự tính, không bấm phép phản xạ, chưa mana. Core có Hộ trận / Phá ấn / Trang bị chuyên dụng. Card và icon là hình báo cáo; không yêu cầu animation giao chiến. Profile khác nhánh có stats và chi phí riêng, không chỉ tháo mất skill để tạo Quân chế.

Ma trận dấu B11 theo **dòng**; nhánh không đổi hệ số K. Không hứa “K không đổi” là đã chứng minh đối sách còn hiệu quả: phải mô phỏng cả tổ hợp bậc/quỹ/ngân sách sau.

## 2. Kích hoạt và pha trong trận

Preset core khóa trình tự: snapshot quân/formation/sẵn sàng → tạo Hộ trận → Phá ấn → sát thương theo lượt → tổn thất → kiểm kết thúc. Những pha này lồng trong pha giao chiến của đồng hồ thế giới. Chỉ một lần kích hoạt mỗi năng lực chủ động của phần quân sẵn sàng trong một trận; số lượt giữ/quỹ/hồi do CAL05 đặt, không tự kích lại mỗi round.

| Năng lực / nhánh | Quy tắc |
|---|---|
| Hộ trận / radiant | Cohort sẵn sàng đóng quỹ vào tuyến mình đang đứng; tất cả quân cùng chủ trong tuyến dùng chung một quỹ. Không sao chép quỹ cho từng mục tiêu. |
| Phá ấn / umbral | Phá lượng quỹ hữu hạn ở tuyến địch gần nhất còn quỹ, rồi mới tính sát thương; cùng cự ly dùng thứ tự tuyến ổn định. Nếu không có quỹ, không tiêu hồi; đơn vị vẫn đánh bằng profile thực của mình. Không nhận damage miễn phí hoặc đổi K vì thiếu mục tiêu. |
| Trang bị chuyên dụng / martial | Bị động củng cố nhiệm vụ chống dòng vốn có lợi thế, bằng hệ số profile riêng sau K; không miễn nhiễm khi bị khắc. Không có phép bị động giả rồi đặt cùng hồi cho cả nhánh. |

Target/quỹ dựa trên thông tin battle snapshot; không sửa troop count. Các tỷ lệ/tổng lực phải kiểm CAL03/CAL05 trước kết luận ba đường có giá trị tương đương.

Hết 12 lượt mà hai bên còn lực lượng là kết quả chưa đánh bật được đối phương, không tự xóa quân hoặc cấp quyền chiếm. Thủ quân còn sống vẫn chặn điều kiện tiếp quản B12; bên công còn sống xử lý rút/tập kết theo địa điểm và cổng hợp lệ. Báo cáo phải phân biệt thắng trận, giữ được vị trí và đã chuyển quyền thành.

## 3. Quỹ chung và nguồn chết

Quỹ ban đầu là tổng đóng góp tuyến tính của số quân nguồn đủ điều kiện, không có phần cố định mỗi nhóm. Cùng lượt, hấp thụ phân bổ theo tỷ lệ sát thương hợp lệ bằng fixed-point ở cấp lượng damage/hấp thụ; phần dư quantum chia largest remainder, mỗi claim không quá damage, tổng không quá quỹ, hòa dùng stable claim key trong battle snapshot (lineage tuyển + profile + readiness + ô đội hình, gộp cùng key trước). Tất định, không lệ thuộc thứ tự duyệt; không hứa đối xứng tuyệt đối khi quantum lẻ. Tách nhóm giữ formation/sẵn sàng không làm tăng tổng quỹ.

Đã kích hoạt thì quỹ chụp tồn tại đến cạn/hết hạn/kết thúc trận **kể cả nguồn chết**; nguồn chết không bổ sung, tái tạo hoặc kích lại quỹ. Đây là lựa chọn baseline sau review, chưa có bằng chứng cân bằng. Phá ấn chỉ trừ quỹ một lần theo ngân sách của nguồn đang kích hoạt, không tạo damage/resource vô hạn.

Hiệu ứng không ra ngoài trận core. Trận commit nguyên tử, không lưu quỹ đang dở; vẫn lưu cooldown của quân sống. Nếu sau này cho lưu giữa lượt hoặc aura ngoài trận phải đổi schema rõ ràng.

## 4. Hai đồng hồ và bảo toàn hồi

Thời hạn hiệu ứng tính **lượt trận**; hồi `ability_ready_at` tính **thời gian thế giới**. Hai trận cùng mốc không tự hồi qua round; trận sau đọc hồi đã commit. Pause/đóng game không trôi hồi theo giờ thật.

Mỗi bucket quân giữ mốc sẵn sàng: tách giữ mốc; gộp không gán mốc sớm nhất cho toàn bộ. Nâng/chuyển dùng `max(old_ready_at, finish_at + rearm_new)`. Đi qua nhánh bị động vẫn giữ khóa còn hạn để không rửa hồi. Nâng không tạo quân hoặc hồi máu. Số quân chưa sẵn sàng không đóng phần quỹ mới.

## 5. Báo cáo và nghiệm chứng

Báo cáo ghi input ruleset/dòng/bậc/nhánh, quân tham gia, K, năng lực kích/không kích, quỹ đầu/đã hấp thụ/đã phá/hết hạn và tổn thất. UI giải thích “không có mục tiêu quỹ” thay vì giấu lý do Phá ấn không chạy.

Các ca C07:N1–N15 và sổ CAL03/CAL05 chưa chạy. Cần thử nguồn chết, nhiều mục tiêu cùng rút, tách/gộp/chuyển/load, mục tiêu không ward và Quân chế theo cùng ngân sách. Nếu kết quả biến Hộ trận thành cộng máu luôn thắng hoặc umbral chỉ hữu ích trước radiant, sửa số/profile/trigger có ghi version trước thêm kỹ năng mới. Thanh tẩy/Nguyền/Kỷ luật hoãn, không thêm thanh sợ hãi để tạo mục tiêu giả.

## 6. Bổ sung 02: phạm vi hỗ trợ và snapshot

B25 trong [prototype readiness](prototype-readiness.md) khóa: Hộ trận hỗ trợ **cùng chủ, cùng tuyến**, không giới hạn nhánh; không hưởng cho chủ khác cùng đánh một địch. Cùng nguồn quân/ngân sách/sẵn sàng, chia thêm nhóm không tăng quỹ/lượt dùng. Chi phí nằm trong tuyển/suất/lương/profile và cooldown, không tự thêm mana/phí dùng.

Cả hai bên tạo quỹ trước, tổng phá quỹ sau; từng round chụp quân sống đầu lượt để tính damage, phân bổ hấp thụ rồi áp tổn thất đồng thời. Nguồn chết ở lượt trước không đánh lượt sau; đã kích hợp lệ không bị hủy ngược vì nguồn chết về sau. Mutual elimination không có người thắng tưởng tượng. Phần dư theo §3: fixed-point trên lượng damage/hấp thụ, tie-break stable claim key, không theo vòng lặp. Chuyển damage thành số chết/HP còn lại theo từng profile là cổng CAL02/CAL03; không làm tròn số chết chung giữa profile khác HP. Quỹ k lượt hấp thụ trọn lượt k và hết hạn sau bước áp tổn thất của lượt k, cả hai bên cùng quy tắc.

Giá trị umbral khi đối thủ không có quỹ, giá trị Quân chế và đoàn mồi đốt cooldown Hộ trận là đo CAL05 (RV21-09/10); không tự thêm fallback damage, kỹ năng hoặc đổi hồi khi chưa đo.

Thanh tẩy/Nguyền trong U10 vẫn hoãn theo B18; không mở bốn skill chỉ để hoàn thành danh sách. BS-T07/08 và RV21-09–11 là ca chưa chạy.

## Bổ sung 2.3 — chi vật tư không là phí năng lực

B33 chốt chi vật tư D1 một lần trong commit assault hợp lệ sau khi module công sự đủ luật; không thêm raw để hồi Hộ trận/Phá ấn hoặc xóa cooldown khi trả phí. Hộ trận/quỹ/damage snapshot B25 giữ nguyên. B32 nợ đói giữ bucket; công thức ảnh hưởng combat và lịch hao hụt theo ruleset phải có trước engine, không cộng phạt cùng nguyên nhân hai lần. [Nguồn thu–chi](research-and-economy.md).
