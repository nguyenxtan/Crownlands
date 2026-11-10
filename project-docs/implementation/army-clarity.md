# Army identity and travel clarity

Ngày 10/11/2026 · Phần hiển thị của runtime 0.3. Theo [kế hoạch](2026-11-10-army-clarity-plan.md) và phản hồi screenshot của chủ dự án. Không đổi tốc độ, rations, sức chiến đấu, schema hoặc asset contract.

## Thông tin người chơi thấy

- `8:00 · giờ game` được sửa thành **8 phút** cho 480 giây mô phỏng, thêm thời gian thực theo tốc độ hiện tại:1 × là 8 phút,8 × là 1 phút; tạm dừng được ghi rõ.
- Trước xuất phát: tổng lương, bình quân mỗi lính, suất ăn và lương dùng cho từng chiều.12 lính mang 24 lương cho 2 giờ là 2 lương/lính; chuyến 8 phút ăn 1,6 lương cả đạo, hai chiều 3,2.
- Nhãn trên bản đồ ghi từng dòng/bậc/quân số (kể cả quân hỗn hợp), biểu tượng vũ khí và giai đoạn đi/khai thác/về. Nhãn là nút bấm và dùng được bằng bàn phím.
- Bấm nhãn mở đúng đạo đang xem, gồm thành phần, giai đoạn 1–3, thời gian còn lại trong thế giới/thực, tổng lương còn và bình quân/lính. Số đó tính từ hành trang hiện tại, không giữ nguyên số lúc xuất phát hoặc bịa kho riêng cho từng lính.
- Xuất quân và chọn đạo trong danh sách đưa bản đồ tới vị trí thực của đạo, giúp màn hình nhỏ thấy quân ngay. Đạo về và đạo mới cùng mỏ vẫn có thể chọn đúng bằngID.
- Mọi số hiển thị lấy từ trạng thái thật; ví dụ sau 240 giây,12 kiếm còn 23,2 lương, bình quân 1,93 lương/lính, còn 4 phút đường đi hoặc 30 giây thực ở 8 ×.

## Kiểm chứng và review

Ba unit mới đã thấy RED trước khi thêm helper rồi đạt. Ba browser mới đạt về đơn vị thời gian, ration, hỗn hợp/phase, click và bàn phím/mobile. Snapshot trước sửa ở/tmp/crownlands-before-army-clarity.zip; điểm dừng mã riêng ghi tại/tmp/crownlands-army-clarity-freeze.json.

84 unit và 70 browser đạt trước bản sửa gesture cuối. Review độc lập `/root/army_clarity_review` phát hiện nhãn DOM chặn sự kiện zoom/pan/pinch của canvas; ca wheel trên nhãn đã tái hiện RED. Đã cho hai bề mặt dùng chung bộ xử lý, giữ pointer capture theo nơi bắt đầu, chặn chọn quân sau drag/pinch, giữ click/Enter bình thường. Cả 7 browser chuyên biệt sau sửa đạt:3 clarity và 4 gesture (chuột/wheel, một ngón/cancel, nhãn+canvas, hai nhãn).

Global button:active từng làm nhãn nhảy khỏi con trỏ; đã giữ transform neo cố định khi nhấn. Kiểm screenshot desktop/mobile bằng browser context riêng, không đọc/sửa bản lưu cá nhân. Số suite tổng/bản build ghép cuối do coordinator UI/kinh tế kiểm sau điểm dừng, ghi bổ sung khi có kết quả.

## Phạm vi giữ nguyên

Kho lương là hành trang chung; chỉ hiển thị bình quân theo người, chưa mô phỏng túi riêng hoặc chốt sức cõng tối đa mới. Thời lượng di chuyển vẫn 60 giây/ô của S00, chỉ hiệu chỉnh cách đọc. Chưa đổi sang online, chưa nghiên cứu cân bằng nhịp chơi dài hạn hoặc tạo sprite quân mới. Không biến nhãn/thanh giai đoạn thành hiệu ứng chiến đấu.

## Bản ghép đã phát hành

Đã phát hành tại http://127.0.0.1:4173, cùng server PID17808; build60file, cache`541c3aaf3833dd2d` đã đối chiếu trực tiếp từ service worker đang phục vụ. Coordinator UI/kinh tế xác nhận cây app/tests/e2e trùng byte với bản kiểm riêng4397:88/88unit và78/78browser đạt. Bản ghép gồm sửa cleanup pointer khi nhãn quân bị xóa/ẩn giữa gesture và error classification khi khôi phục quota; có RED→GREEN và review độc lập không còn Important/Critical. Kiểm offline tại390/1440cũng đạt.

Không chạy lại toàn bộ suite sau xác nhận này; chỉ đối chiếu cache live. Lượt riêng của tác giả đã kiểm3unit trình bày và7browser nhận diện/gesture, QA hình desktop/mobile; nguồn bằng chứng ghép cuối được coordinator giữ trong reviews.
