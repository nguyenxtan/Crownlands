# Kết luận review chéo thủ thành

Ngày 10/11/2026 · Đối chiếu [đề xuất Codex](../proposals/2026-11-10-city-defense.md), [Claude vòng 1](2026-11-10-city-defense-claude-review.md), [Codex phản hồi](2026-11-10-city-defense-codex-response.md) và [Claude vòng 2](2026-11-10-city-defense-claude-round-2.md).

**Đã kết thúc hai vòng review. Đây là khuyến nghị thiết kế, chưa cập nhật baseline 2.2, S00 hoặc triển khai thủ thành.** Chỉ đạo mới nhất của chủ dự án là không cần hiệu ứng, vật tư tiêu hao theo quân khi công thành.

## Những điểm hai bên đã thống nhất

- Bố trí trước, tính trận tự động, trả báo cáo. Không cần animation/PixelFX hoặc bấm điều khiển công sự trong trận.
- Kiểm luật bằng một mặt công sự và một độ nguyên vẹn trước; bốn khu, HP cổng riêng và vũ khí riêng mở sau nếu cần. Đây là thứ tự thử, không xóa hướng thiết kế dài hạn.
- Vật tư trừ **một lần mỗi đợt assault hợp lệ**, theo lượng quân được phân công sử dụng công sự, có trần vị trí. Lương vẫn là chi theo thời gian riêng.
- Bản thử trừ trực tiếp gỗ/sắt trong kho thật; chưa tạo thêm thành phẩm đạn/kiện tiếp liệu. Có chính sách giữ lại nguyên liệu, mặc định sàn0.
- Thiếu vật tư thì dùng cường độ cấp `s` đồng đều trên các nhóm được phân công; không giả vờ có một nhóm người cụ thể nhận đầy đủ rồi tự chuyển vật tư của người chết. Không thu theo toàn bộ đồn trú.
- Chỉ cấp khi công sự còn hoạt động, có quân hợp lệ và thật sự xảy ra đợt đánh. Không trừ khi xem dự báo, chuẩn bị bị hủy, đánh ngoài tường, HP đã0 hoặc thành hết garrison. Quân thiếu vật tư vẫn có profile bình thường.
- Người vận hành và người công phá không đồng thời có một đòn đánh người đầy đủ thứ hai. Damage công trình tách damage quân; Hộ trận/Phá ấn không che/phá HP vật lý.
- Chuẩn bị đợt đánh mất thời gian thế giới, khóa theo `(owner công, settlement)` và đóng băng thành phần. Thêm quân phải chuẩn bị lại; kiểm quyền/lực/vị trí ở lúc thực thi. Không tạo vô hạn đợt bằng tách Army/load/cancel.
- Repair pause khi hostile outer holder giành quyền, giữ thời gian active còn lại, không thu hai lần khi tiếp tục; đổi chủ hủy job cũ. Hư hại/kho còn lại giữ qua trận và chuyển chủ một lần.
- Thành hết thủ quân không tạo trận công phá giả trong D1; vẫn qua kiểm soát/tiếp quản B12, không đổi chủ tức thì. Việc tường trống trì hoãn riêng được để ngoài lần thử đầu.

## Những gì đã sửa sau phản biện

Claude rút L2: **bên giữ ngoại thành** chọn chặn/để quân chủ động rút; luật này không bắt quân thủ xuất thành khi bị assault. Giữ ý nghĩa B12, không tự thêm quyền đồng minh hoặc chính sách qua cổng mới. Câu rút gọn trong baseline/readiness còn dễ nhầm chủ thể; lần cập nhật canonical tới phải viết rõ actor.

Claude bỏ frontage độc lập; thừa nhận DC-07/DC-11 có tiền đề không hợp lệ theo B23 và repair. Đổi bằng các ca E06/E07 ở vòng2, không coi bảng DC cũ là expected outcome hiện hành.

Codex rút đề nghị tiêu hao từng lượt và kiện thành phẩm cho bản kiểm luật, vì một lần theo quân đáp ứng yêu cầu mới nhất với ít trạng thái hơn. Vật tư cấp trước trận không hoàn khi quân chết sớm; phải đo nguy cơ đánh mồi.

## Những lựa chọn còn phải kiểm trước khi đưa vào game

Claude đề xuất kíp tường có hệ số `1 + β × s`; nhóm công phá kiếm/giáo đánh HP thay đòn đánh quân; khi HP về0 thì thay khả năng từ lượt kế tiếp. Đây là mô hình cụ thể **do Claude đề xuất ở vòng2, chưa có một lượt review hoặc mô phỏng xác nhận**. Codex giữ nó làm ứng viên thử, không gọi đã khép bộ máy công thành.

Codex đề nghị chưa thêm ngưỡng N chống đánh mồi trước khi đo. D1 chỉ dùng kiếm/giáo/cung nên chưa chốt vai trò voi/kỵ trong công thành bản đầy đủ; không suy thành voi vĩnh viễn không phá được tường. Giới hạn cận chiến khi HP>0 có thể quá mạnh, cần so với mô hình nhẹ hơn bằng thử nghiệm.

Sức hỗ trợ, HP, khả năng công phá, số vị trí, thời gian chuẩn bị và sửa đều chưa hiệu chỉnh. Phải so chi phí biên của công/thủ với phương án khác; cả hai bên đều ăn lương nên không thể lấy riêng lương bên công làm bằng chứng cân bằng.

## Thứ tự làm

Ưu tiên vòng tuyển quân → hành quân/mỏ/vận tải → combat/giữ ngoại thành/tiếp quản nền. Sau đó mới thử D1 thủ thành trên một scenario riêng. Bản tuyển quân hiện được chủ dự án đồng ý làm tiếp; không bị chặn bởi các số thủ thành chưa đo.

**Bằng chứng và giới hạn:** hai bên đã đọc và phản biện các tài liệu trên; Claude chỉ tính tay các ví dụ vật tư. Chưa có engine thủ thành, mô phỏng E01–E08, playtest hoặc kết luận cân bằng. Không có asset hoặc công sự nào được tạo trong nhiệm vụ review.
