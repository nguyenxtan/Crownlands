# Đối chiếu cuối về nhánh quân và NPC lưu động

Ngày 07/11/2026. Codex đối chiếu [nguồn U08](../sources/2026-11-07-offline-design-addendum.md), [đề xuất xuất phát](../proposals/2026-11-07-branches-and-mobile-npcs.md) và [review của Claude](2026-11-07-branches-and-mobile-npcs-review.md).

**Đây là biên tập thiết kế, không phải mô phỏng/playtest.** Phần sửa cuối của Codex được ghi rõ, không nhận là đã được Claude review lại. Mã D chỉ ghi hướng được nguồn người dùng nêu là đã chọn; chi tiết giữ ở đề xuất/cần khóa.

## 1. Tiếp thu

- Thay khuyến nghị cũ Paladin thuần quân sự/hoãn phép bằng hướng có nhánh Thánh và đối lập. Không tự bắt có mana, phép bấm tay hoặc quân thứ sáu.
- Tách dòng, bậc, nhánh, phe, khuynh hướng và quan hệ. Quân chế là đường hoàn chỉnh; không tự cho quân Thánh/Hắc đứng chung bị bất mãn.
- Hiệu ứng tự kích hoạt trong trận nguyên tử là lát cắt nhỏ; hồi theo đồng hồ thế giới và phải lưu, không theo mỗi lần mở trận.
- Không thêm waypoint vào mọi di chuyển. Đoàn có nhiệm vụ tới địa điểm, bản thử không có trận giữa đường; ghi thẳng giới hạn cho người chơi.
- Đoàn có căn cứ trước; thử tàn quân/lưu vong từ phần còn sống trước mô hình du mục có nguồn hạn mức mới.
- 45 profile là phép đếm có điều kiện, chưa phải số quân/asset cần làm. Giữ phương án 14 profile của Claude làm ứng viên đại diện, không chốt mặc định mọi con số.

## 2. Codex chỉnh thêm sau review

| Điểm | Vấn đề | Biên tập hiện hành |
|---|---|---|
| Quỹ Hộ trận lớn nhất theo mỗi nhóm | Chưa đủ nói quỹ chia sẻ hay sao chép, phân bổ đa mục tiêu dễ phụ thuộc thứ tự | Một quỹ chung theo loại/tuyến trong preset nhỏ, tổng đóng góp và sổ trừ; phân bổ đồng thời có quy tắc |
| Quỹ khi nguồn chết | Gộp nhiều nguồn rồi xóa theo người chết cần kế toán phức tạp | Thử chụp đóng góp khi kích hoạt và quỹ chỉ giảm/hết hạn; khác reviewer, phải có ca kiểm chứng trước khóa |
| Hoàn đổi nhánh đặt `finish + cooldown` | Có thể sớm hơn mốc hồi cũ khi chuyển sang nhánh hồi ngắn | Không sớm hơn `max(old_ready, finish + rearm_new)`; giữ khóa qua nhánh bị động |
| K không đổi nên giáo còn khắc kỵ | Chưa đủ: bảo hộ lớn vẫn có thể hấp thụ toàn lợi thế | K cố định là ràng buộc; hiệu quả khắc chế phải thử theo ngân sách/bậc/quỹ |
| Kỹ năng khắc chế phải luôn có mục tiêu | Có thể dẫn tới buff miễn phí mọi tình huống | Cân toàn profile và giá; chấp nhận chuyên biệt, nhưng cần một hoàn cảnh hữu ích và đường thường không bị ép học phép |
| Mất gốc lập tức thành tàn quân | Phe có thể còn nhiều thành để tái bố trí | Mất gốc khác mất toàn bộ thành; theo O18 trước, không tự tạo exile/nomad hoặc nguồn suất |
| Mỗi đoàn một event | Lịch đói có thể trước ETA | Một bước mission đang hiệu lực; event kinh tế khác vẫn được xử lý, không bỏ mốc đói |
| Spawn ngoài tầm nhìn | Có thể chỉ che việc sinh quân vô cớ | Cần nguồn/ngân sách/vị trí hợp lệ; ngoài tầm nhìn không là bằng chứng hợp lệ |
| Kích thước save ổn định qua ba năm | Lịch sử hợp lệ có thể tăng | Chặn đối tượng/event sống vô hạn; đo/tổng hợp lịch sử có bảo toàn đối soát, không đòi byte phẳng |

Các sửa này là mặc định thử hoặc vấn đề mở, không phải kết quả phần mềm đã đạt. Tách nhóm trong cùng bố trận khác việc chủ động đổi vị trí/đội hình; không hứa hai chiến thuật khác nhau phải cùng kết quả.

## 3. Phạm vi đề nghị

A1 vòng lõi giữ nguyên. A2′ thử kỵ I–III và IV ba nhánh cùng I–II của bốn dòng khác, tổng 14; bộ nhỏ gồm Hộ trận, Phá ấn và trang bị chuyên dụng. Tên, hệ số và chính xác tầng công nghệ chưa khóa.

L thử một đoàn có căn cứ, có tài sản và mission thật. B thêm phe thứ hai, quan hệ trung lập/thù địch và một tình huống tàn quân. A2′ và L có thể thử riêng sau A1; không đợi đủ 45 profile mới thấy hướng mới.

Thanh tẩy/Nguyền, đầy đủ V, du mục/cap di động, giao thương đoàn/qua biên/định cư và combat trên đường là phạm vi sau. Chưa tạo hình hoặc cập nhật số trong XLSX gốc.

## 4. Quyết định và câu hỏi còn lại

Nguồn U08 được ghi vào D29–D33 ở mức hướng. O34–O38 giữ chi tiết nhánh/hiệu ứng/đoàn/quan hệ. Tối đa ba lựa chọn lớn trước mở sâu: đế chế có được học/trộn mọi nhánh; trải nghiệm Thánh đầu tiên muốn nhấn vào đâu; giới hạn không có trận trên đường có chấp nhận cho bản thử không. Mọi mặc định của agent vẫn là đề xuất.

Chuỗi chinh phục 1.2 không bị đổi thành ba hệ chuyển quyền. Những điều khoản đầu hàng, bồi thường và chư hầu vẫn chưa chốt.

## 5. Bằng chứng và giới hạn

Review Claude đề xuất N1–N15; chúng chưa chạy và không cùng không gian mã với bất biến N01–N20 của đặc tả kỹ thuật. Các ca bổ sung về quỹ dùng chung, khóa hồi qua đổi nhánh, mất riêng gốc và scheduler cũng chưa triển khai.

Danh mục nguồn được giữ bằng hash; nguồn U08 lưu nguyên byte. Cập nhật Markdown chỉ chứng minh hồ sơ đã được biên tập và đối chiếu, không chứng minh game vui, hiệu ứng cân bằng hoặc NPC hoạt động đúng.
