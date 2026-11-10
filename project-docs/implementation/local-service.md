# Fixed local service · 2026-11-10

Theo yêu cầu giữ một port và một link cố định, Crownlands dùng **http://127.0.0.1:4173**. Giữ nguyên origin của bản chơi nền để bản lưu trong trình duyệt không đổi nơi lưu.

`scripts/local-config.mjs` là cấu hình dùng chung cho server và browser tests. Server chỉ bind loopback, không tự chọn port khác khi bị chiếm. `scripts/local-service.mjs` cài LaunchAgent người dùng macOS `local.crownlands.server`: RunAtLoad, KeepAlive, WorkingDirectory trỏ vào project, Node 22 qua đường dẫn Homebrew ổn định, log trong `~/Library/Logs/Crownlands/`. Plist được lưu tại `~/Library/LaunchAgents/local.crownlands.server.plist`.

Đã cài và bật trên máy này. Tiến trình chạy dưới launchd, không phụ thuộc phiên Terminal/Orca. `npm start` dùng lại dịch vụ hiện có; `npm run service:stop` tắt và vô hiệu hóa tự khởi động; `npm run service:install` cài lại; `npm run service:status` kiểm tra. Khi thay mã, build lại tệp game; dịch vụ vẫn ở cùng link. Chế độ này chỉ phục vụ tệp tĩnh, không chạy mô phỏng khi đóng game.

Kiểm thực tế:

- `plutil -lint`: plist hợp lệ; `launchctl print`: running, keepalive và runatload.
- HTTP trang game và health endpoint: thành công tại port 4173.
- `npm start` lần nữa giữ nguyên PID, không tạo server thứ hai.
- Dừng PID đã xác minh là dịch vụ Crownlands: launchd tạo PID mới và khôi phục trang trên cùng URL.
- Thử mở server thủ công thứ hai: dừng rõ ràng với lỗi trùng port; dịch vụ chính không đổi PID, không nhảy port.
- Regression: 19/19 unit test và 7/7 browser flow đạt.

Không đăng xuất/khởi động lại toàn bộ máy để thử; hành vi tự mở lúc đăng nhập được cấu hình trong LaunchAgent. Tự phục hồi tiến trình đã được kiểm trực tiếp.
