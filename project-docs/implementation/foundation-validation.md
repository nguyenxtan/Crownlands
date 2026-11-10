# Foundation 0.1 · Kết quả thực tế

Ngày 10/11/2026. Phạm vi theo [kế hoạch](2026-11-10-foundation-plan.md), được người dùng cho triển khai sau khi chọn lương v2. Đây là bản chơi nền xây dựng và kinh tế, chưa phải vòng chinh phục S00/A1.

## Đã chạy

| Lệnh/kiểm tra | Kết quả |
|---|---|
| `npm test` | 19/19 ca Node, không lỗi |
| `npm run build` | 21 tệp cục bộ; sinh service worker theo content hash |
| `env -u NO_COLOR npm run test:e2e` | 7/7 luồng Chrome, không lỗi |
| Bảy nguồn reference | SHA256 khớp 7/7 manifest |
| Nguồn U08 | SHA256 khớp manifest |
| 10 ảnh runtime | Hash nguồn và đầu ra khớp provenance, tổng 724.349 byte |
| Kiểm ảnh ở trình duyệt | Không có ảnh lỗi; 1024×768 không tràn ngang |

Kiểm logic gồm chi phí trả một lần, chặn lệnh lặp/thiếu hàng/không có quyền, hoàn tất ở giây 120, tính sản lượng mới sau mốc hoàn tất, kho đầy với net-clamp, chia 20.000 đoạn thời gian, pause và bốn tốc độ, phần lẻ thời gian, roundtrip công việc dở, bản lưu tương lai/sai cấu trúc, ba ô thủ công/quick/năm auto, lỗi ghi và phục hồi backup. Ca bổ sung từ review chặn primary thiếu version, bộ đếm lệnh không nhất quán và ledger vượt giới hạn hợp lệ. Cả 16 nâng cấp lần lượt đều lưu/tải được.

Kiểm trình duyệt gồm kéo/zoom/chọn địa điểm đã biết; 14 ô nhà/16 ô khai thác; trả chi phí, tua 8× hoàn tất; pause và reload giữa công việc; bản nhập sai không thay thế tiến trình; offline reload sau khi precache đủ; lưu thủ công, xuất rồi nhập lại; mọi hit target khai thác ở 1024×768; tạm ngưng callback 60 giây không chạy bù. Không dùng API game riêng cho test để bỏ qua luồng người chơi.

## Rà soát cuối

Một reviewer độc lập trong context mới đã đọc mã và tự chạy 15 unit test trước khi sửa, không ghi file. Không thấy Critical; ba Important đã tái hiện bằng test rồi sửa: phục hồi một số dạng primary hỏng, từ chối dữ liệu nhập dẫn tới mất khả năng lưu sau lệnh hợp lệ, và bỏ khoảng thời gian callback bị treo. Có thêm bốn unit test và một browser test; kết quả sau sửa là 19/19 và 7/7. Đây là review Codex, không gán thành một lượt Claude review mới.

Còn một Minor: sau khi có build mới, trình duyệt đã giữ build cũ đôi khi cần tải lại thêm một lần để thấy bản mới. Chưa làm banner cập nhật; không đổi bản lưu vì cập nhật giao diện.

## Giới hạn và quyết định triển khai

Chạy bằng static HTML/CSS/ES modules, không runtime dependency mạng; localStorage giữ bản lưu theo origin và service worker giữ các tệp chơi. Không phải app desktop đóng gói. Bản 0.1 chỉ cho nâng ô cấp 1→2 vì đây là phần có bảng chi phí và thời gian S00 đầy đủ. Ảnh khác ngoài grain v2 vẫn là provisional; một số nhà/mỏ dùng SVG đơn giản để thử tương tác, chưa phải toàn bộ asset cuối.

Khoảng cách callback trên 1 giây thực được coi là trình duyệt tạm ngưng, không cộng vào thời gian game. Đánh đổi: máy bị khựng lâu có thể làm chậm đồng hồ. Chưa kiểm OS sleep thực tế, engine trình duyệt ngoài Chrome, hiệu năng bản đồ lớn hơn, niềm vui/cân bằng, chiến đấu/AI hay S00 đầy đủ. Không có tuyên bố hoàn tất các cổng CAL02/03/05/10/11/15 của toàn bộ game.

Xem [ledger](foundation-progress.md) để tra RED→GREEN và các quyết định. Ảnh giao diện: [thế giới](screenshots/world-1440.png), [thành](screenshots/city-1440.png), [1024×768](screenshots/city-1024.png).
