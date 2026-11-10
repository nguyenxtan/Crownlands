# U10 — Bản tổng hợp bổ sung 02

Nhận trong hội thoại ngày 07/11/2026. **Đây là tóm lược biên tập của thông điệp, không phải bản sao nguyên văn hoặc attachment đã đối chiếu byte.** Các nhãn “cần chốt/đề xuất/nghiệm thu” dưới đây phản ánh bản người dùng gửi. Đối chiếu hiện hành ở [prototype readiness](../prototype-readiness.md); không coi mọi câu “chưa chốt” trong nguồn là thao tác hủy baseline v2.0.

## Nội dung đầu vào

- **BS-01:** cần cấu hình Chơi mới: cấp/nhà/quân/kho, vị trí, nhánh, trình độ NPC, mục tiêu đầu, điều kiện NPC đánh. Hướng một thành nhỏ, quân thường, có cơ hội phát triển; đế chế mạnh ở xa, không tăng cấp theo người chơi.
- **BS-02:** mục tiêu dài hạn và sau thống nhất. Được ghi chiến thắng và tiếp tục save, không reset hoặc tự sinh kẻ địch vượt trội để phủ nhận thành quả.
- **BS-03:** bố trí đường/núi/sông/vùng đi được, định cư, tài nguyên, phe/Đại thành/du mục, mật độ, khả năng tiếp cận và thông tin khám phá. Kích thước lớn không thay chất lượng bố trí.
- **BS-04:** quyền đi qua, đánh xe, hòa bình/đình chiến, đầu hàng, ba phe cùng mục tiêu. Nguồn đề xuất bốn quan hệ trung lập/giao thương/đình chiến/chiến tranh; không mặc nhiên đồng minh/gộp quân vì cùng đánh một mục tiêu.
- **BS-05:** thuế không được cộng tài nguyên hai lần; phân luồng sản lượng/dân sinh/huy động, tránh An dân thấp gây nhiều hình phạt chồng thiếu chủ ý. Chưa đưa tỷ lệ/ngưỡng mới.
- **BS-06:** gốc/cap/nâng, mất gốc, giảm năng lực, vượt cap, đổi nơi đóng, hủy/nâng bị đánh. Không xóa quân tức thời, không để vượt cap mãi không có hậu quả.
- **BS-07:** giới hạn hỗ trợ/quỹ/lần dùng/chi phí, hỗ trợ khác nhánh; không cần cấm trộn hoặc tự phạt đội hỗn hợp nhưng không nhận đủ mọi lợi ích miễn phí.
- **BS-08:** thứ tự Hộ trận/Thanh tẩy/Nguyền/Phá ấn/sát thương; xử lý đồng quy vu tận, không phụ thuộc vòng lặp xử lý đơn vị; nên bắt đầu ít năng lực rõ ràng.
- **BS-09:** +40% chỉ là trần thưởng Đại thành, chưa là tổng trần mọi bonus. Ví dụ gốc100 +40% Đại thành +20% nghiên cứu cho160 nếu cộng cùng base,168 nếu nhân; nguồn chưa chọn cách.
- **BS-10:** vòng đời có thành → mất thành → quân còn sống/lưu vong → tái định cư hoặc bị loại; nguồn phe mới, trần đoàn, vật chất của thương đoàn/du mục và cleanup. Không tích lũy đoàn vô hạn hoặc hồi sinh phe không có nguồn.

## Phần mềm và nghiệm thu nguồn yêu cầu

Chơi offline phải có đủ tài sản cục bộ, lưu trạng thái đang diễn ra và migration, điều khiển/giải thích thuận tiện, dữ liệu nội dung, hiệu năng tăng tốc không bỏ sự kiện. Âm thanh làm sau vòng nền ổn định. Cùng đầu vào và cùng lệnh ở cùng mốc cần kết quả tương đương bất kể tốc độ.

Nguồn đề nghị năm mốc: (1) đồng hồ/save/thành/kinh tế; (2) quân/mỏ/vận tải/NPC; (3) Học viện/nâng một dòng; (4) giao chiến/tiếp quản/thành thứ hai; (5) nhánh/đoàn. Đây là đề xuất thứ tự, không tiến độ đã hoàn thành. Chưa cần45 profile,7phe hoặc thế giới khổng lồ.

Nguồn nhấn mạnh chưa có game chạy, kết quả kiểm thử hoặc lựa chọn kỹ thuật cụ thể được xác nhận. Kết luận tập trung khởi đầu rõ ràng, luật tương tác khép kín và vòng chơi có kiểm chứng. Những phần nguồn gọi chưa chốt phải đối chiếu lựa chọn v2.0 trước khi mở lại; bổ sung này không tự duyệt hệ thống lớn mới.
