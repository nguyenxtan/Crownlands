# Giao diện và hợp đồng hình

Phiên bản 2.3 · 10/11/2026 · Theo [bản chốt](final-design.md).

## 1. Quy chuẩn

[Art bible](art-bible.md) là nguồn chuẩn camera/palette/export. [Layout](asset-production/city-layout.json), [roster](asset-production/unit-roster.json) và [manifest](asset-production/asset-manifest.json) là hợp đồng sản xuất. Bộ nguồn R04 chỉ dùng cho phần không bị v 2.0 thay.

Đích desktop 1440 ×900, min 1024 ×768. Chữ Việt bằng text thật, khung/bảng/nút bằng HTML/CSS, không một ảnh HUD khổng lồ. World dùng tile 32 px, thành thường icon 32 px; cảnh nội thành riêng mới dùng nhà chi tiết. Zoom rộng gom nhãn, không phóng thành lên để đọc cấp.

## 2. Các màn hình cần cho vòng lõi

| Màn hình / lớp | Thông tin và thao tác |
|---|---|
| World | Chủ/site/đoàn/đường đang đi, zoom, lựa chọn, pause/tốc độ và panel theo quyền biết |
| City | 14 slot nhà / 16 plot, kho/rate, một công trình được chọn, lịch xây/nâng |
| Quân và bố trận | Dòng/bậc/nhánh/count/gốc/suất/lương; formation 3 ×3, phân phần quân, ETA |
| Nghiên cứu/nâng | Kiến thức toàn đế chế, một dự án, điều kiện cơ sở, số quân bận và hoàn/hủy |
| Tiếp tế | Nguồn/đích/xe/tải/ETA/vòng về, mức dự trữ và dự báo thiếu hụt |
| Báo cáo / lịch sử | Lý do thắng/thua, tác động năng lực, tổn thất, thay kiểm soát và lượng hàng |
| Save/settings | Ba slot/quick/auto, import/export, phiên bản save; không login/shop |

Đại thành/vùng/tái lập mở theo module sau, không bắt xây đủ mọi màn hình trước vòng thử.

## 3. NPC nhìn ở đâu

Trại thổ phỉ là địa điểm nhìn thấy với marker camp; đạo quân đi ngoài map dùng marker Army/patrol hoặc dòng đã trinh sát. Phe và quan hệ hiện bằng huy hiệu/shape, nhánh là badge khác; không dùng chỉ màu để đoán bạn/địch. Hạng và tin quân có timestamp, không gửi dữ liệu bí mật rồi che bằng CSS.

Mỏ world là dấu chức năng nhỏ, không ruộng/đống đá chiếm màn hình. Không có đá tài nguyên thứ năm. Quái vật chưa là dòng quân core; không lấp trống map bằng ảnh quái không có luật.

## 4. Tương tác và phản hồi

Hiển thị điều kiện thiếu trước nhận lệnh, khoản giữ/chi, ETA theo game time, kết quả pause/tua. Tự dừng ở sự kiện quan trọng, người chơi đọc và đặt lệnh tại cửa an toàn. Không dùng tiến trình realtime/notification ban đêm để giữ tài sản.

Cho filter/sort, dự báo tuyến và xử lý ngoại lệ từ đầu; không khóa tính dễ dùng sau tech. Có focus/keyboard, hit target rõ, icon kèm text/tooltip. Đội hình và lệnh số lượng nhập được, không bắt kéo chính xác bằng chuột.

Proof ghép world ở scale thật và city theo anchor trước sản xuất hàng loạt. Chưa có màn hình/gameplay được triển khai; tài liệu này quy định những gì asset và UI sau đó cần thể hiện.

## Bổ sung 2.3 — thông tin nghiên cứu và thu–chi

Art contract/camera/layout/manifest vẫn 2.0. UI mới là yêu cầu tương lai, không tuyên bố ảnh/controls đã được dựng: hiển thị lý do thiếu kiến thức/cơ sở/kho, công việc còn lại và tác động research; tách số lệnh/số quân/suất/công suất/lương. Kho có on_hand/khả dụng/cam kết nếu module đó bật; core không vẽ một số reserved nguyên liệu giả.

Tách ròng duy trì hiện tại khỏi khoản đầu tư trả trước và chuyến xuất. Dự báo hàng đợi/đường về, cảnh báo không đồng nghĩa bắt buộc cấm rủi ro. Cargo kẹt cho thấy payload và thao tác có hậu quả rõ; không auto discard. Vật tư thủ thành hiện bằng số/báo cáo, không animation. [Nguồn luật](research-and-economy.md).
