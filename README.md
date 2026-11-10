# Crownlands

Bản chơi nền **0.3** cho Crownlands offline: bản đồ, nội thành, kinh tế, tuyển quân, hành quân tới mỏ, khai thác và vận tải. Đây là lát cắt đầu của BUILD-02, chưa phải toàn bộ kịch bản chinh phục S00.

Thiết kế hiện hành đã lên [2.3](project-docs/README.md), chốt nghiên cứu và thu–chi sau review Claude. Bản chơi dùng số kinh tế/tuyển hiện có và số di chuyển/mỏ/xe từ S00; nghiên cứu và các khoản chi mở rộng 2.3 chưa được kích hoạt. Bản lưu 0.1/0.2 được kiểm rồi chuyển lên schema 3, giữ nguyên kho và công việc dở.

## Mở game

**Link cố định trên máy này: http://127.0.0.1:4173**. Crownlands đã được cấu hình chạy nền, tự mở server khi đăng nhập macOS và tự khởi động lại nếu tiến trình dừng. Có thể đóng Terminal/Orca; khi chơi chỉ cần mở link. Server giữ nguyên port 4173, không chuyển sang port ngẫu nhiên.

Để lấy mã nguồn và chạy nền trên macOS (yêu cầu Node.js 22 trở lên):

```sh
git clone https://github.com/nguyenxtan/Crownlands.git
cd Crownlands
npm run build
npm run service:install
```

Nếu đã có thư mục dự án, chạy hai lệnh `npm` trong thư mục đó; không cần clone lại.

Mở **http://127.0.0.1:4173** trong trình duyệt. Không cần cài dependency để chạy game. Sau lần mở đầu tải đủ, service worker giữ ảnh, mã và dữ liệu cục bộ để tải lại khi không có mạng. Không cần tài khoản hoặc dịch vụ AI.

Lệnh quản lý: `npm start` bảo đảm server đang chạy (gọi lại không mở thêm server); `npm run service:status` xem trạng thái; `npm run service:stop` tắt cả chạy nền lẫn tự khởi động. Khi cập nhật mã, `npm run build` thay bản chơi tại cùng link, không phải khởi động lại server. `npm run preview` chạy thủ công ở cùng port khi chế độ nền đã tắt.

Cấu hình cố định: [local-config.mjs](scripts/local-config.mjs). LaunchAgent: `~/Library/LaunchAgents/local.crownlands.server.plist`; log: `~/Library/Logs/Crownlands/`. Chế độ nền chỉ phục vụ tệp game, không làm đồng hồ thế giới chạy khi đóng game.

Để chơi thử: **Nội thành → chọn Ruộng lương → Nâng lên cấp 2 → 8 ×**. Nâng mất 120 giây game, tương đương khoảng 15 giây thực ở 8 ×. Dùng Space để tạm dừng, M/C đổi cảnh, kéo và cuộn để di chuyển/zoom bản đồ.

**Tuyển quân: Nội thành → Doanh trại → chọn binh chủng và số lượng → Huấn luyện.** Kiếm/giáo/cung I lần lượt mất 40/35/45 giây game mỗi quân. Một hàng đợi tối đa 5 lệnh chạy tuần tự; tài nguyên và hạn mức 200 quân của thành được giữ ngay. Mỗi quân hoàn tất mới vào đồn trú và bắt đầu ăn 1 lương/giờ. Số quân và tiêu thụ ở Kho lương/Điểm tập kết cập nhật theo quân thật. Bản lưu kinh tế cũ được chuyển sang phiên bản mới, giữ nguyên tài nguyên, thời gian và công việc; không cần chơi lại.

**Xem kinh tế: Nội thành → Phủ thành → Xem sổ kinh tế.** Bảng tách kho/sản xuất/nuôi quân/ròng của bốn tài nguyên; dự báo 15 phút,1 giờ hoặc 6 giờ game theo các lệnh nâng cấp, tuyển quân, đạo quân và chuyến xe đã đặt (hàng chỉ cộng vào kho khi thật sự về tới, dòng "Nhận từ quân/xe" tách riêng). Phủ thành tách quân đồn trú, quân chờ dỡ ở cổng và quân đi xa; lương tại thành đã gồm quân chờ dỡ. Mục "Quân & xe ngoài thành" liệt kê hàng đang về kèm giờ tới và mở thẳng khu Quân & vận tải. Có mốc đầy kho và sổ sản xuất, lương đã trả, đầu tư trả trước, phần vượt kho từ đầu ván. Lọc riêng từng tài nguyên hoặc xem tất cả. Đồng hồ dừng khi mở sổ. [Phạm vi và bằng chứng](project-docs/implementation/hall-economy-plan.md).

Game tự giữ phiên đang chơi mỗi giây khi có thay đổi (không ghi lại khi đang tạm dừng mà không có gì đổi) và ngay sau mỗi thao tác; trên thanh trên có trạng thái **Đã tự lưu**. Không cần bấm lưu khi chơi bình thường. **Quản lý bản lưu** chứa ba ô thủ công, mốc lưu nhanh, năm ô tự lưu luân phiên (mỗi 5 phút thực khi đang chơi, và một bản an toàn ngay trước khi tải hoặc nhập bản lưu khác; thao tác thường như nâng cấp, tuyển quân, hành quân không đẩy lịch sử này đi) cùng xuất/nhập JSON. Lưu nhanh ghi đè một mốc thủ công riêng; tự lưu vẫn hoạt động dù không dùng nút đó. Dùng cùng trình duyệt và địa chỉ trên để tiếp tục; xuất JSON để chuyển bản chơi sang nơi khác. Đồng hồ dừng khi đóng hoặc rời cửa sổ game, không cộng thời gian thực lúc tải lại. Nếu dữ liệu trên trình duyệt không đọc được (hỏng hoặc do bản game mới hơn ghi), hộp khôi phục cho **Xuất dữ liệu gốc**; trước khi chơi mới hoặc nhập, game giữ nguyên bản sao gốc đó trong trình duyệt (nếu không giữ được thì không ghi đè gì) và vẫn xuất lại được trong Quản lý bản lưu. Các ô thủ công còn hợp lệ được giữ lại.

## Chơi vòng khai thác và chở hàng

1. Ở **Thế giới**, chọn **Mỏ đất sét** hoặc **Ruộng lương hoang** trong danh sách địa điểm đã biết.
2. Chọn số kiếm/giáo/cung và dự trữ lương 2/4/8 giờ, rồi **Xuất quân tới mỏ**. Mặc định 12 kiếm; lương mang theo rời kho ngay và quân vẫn tính vào hạn mức thành gốc.
3. Quân đi theo đường bộ 60 giây game/ô, tới mỏ mới khai thác.12 quân đạt 300 tài nguyên/giờ; nhiều hơn không vượt trần mỏ. Mỏ giữ tài nguyên riêng, chưa cộng về thành.
4. Cho 1–4 xe tới lấy hàng. Mỗi xe chở tối đa 500; xe đi từ thành, nhận lượng hàng thực có lúc tới, rồi đi về. Mỏ đất sét cách 8 ô: mỗi chiều 8 phút game, khoảng 1 phút thực ở 8 ×.
5. Xem **Quân & vận tải** để rút quân, theo dõi hàng hoặc dỡ lại khi kho đầy. Có thể rút ngay giữa đường; thời gian quay về theo quãng đã đi. Nếu kho không nhận hết, hàng vẫn trên xe và xe chưa được giải phóng. Hủy hàng dư cần xác nhận rõ.

Đạo khai thác tự rút khi lương chỉ còn đủ đường về. Khi quân cuối rời mỏ, mỏ trở về quyền giữ của thế giới, lượng hàng còn tại đó được giữ nguyên. Bản đầu chỉ phân một đạo phụ trách mỗi mỏ; chưa có hợp/tách/tiếp viện tại mỏ, đánh sơn tặc hoặc NPC phản kích. Tạm dừng/đóng game dừng cả quân và xe; tự lưu giữ cả đường đi, hàng và lịch tới.

Chi tiết phạm vi và kiểm chứng: [kế hoạch](project-docs/implementation/2026-11-10-logistics-plan.md), [báo cáo](project-docs/implementation/logistics-validation.md).

**Đọc đạo quân:** nhãn trên bản đồ ghi rõ loại/bậc, số lính và đang đi, khai thác hay về. Bấm nhãn để xem thành phần, giai đoạn và lương còn bình quân mỗi lính. Thời gian ghi rõ phút/giờ của thế giới cùng ước tính thời gian thực theo1×–8×; chuyến tới mỏ đất sét là8phút thế giới, khoảng1phút thực ở8×. [Chi tiết](project-docs/implementation/army-clarity.md).

## Phạm vi hiện có

- Bản đồ 64 × 64, vùng đã biết theo S00, chọn thành/mỏ/trại sơn tặc. Thông tin quân và kho chưa quan sát không được hiển thị.
- Thành có 14 vị trí công trình và 16 ô tài nguyên, mỗi loại bốn ô.
- Bốn tài nguyên, sản lượng trừ lương nuôi quân trước khi áp trần kho. Nâng cấp ô từ 1 lên 2: 80 gỗ / 60 đất sét / 40 sắt / 20 lương; sản lượng 100 → 125 mỗi giờ.
- Pause, 1 ×/2 ×/4 ×/8 ×, lưu công việc đang chạy và hoàn tất đúng một lần.
- Tuyển kiếm/giáo/cung I, trả chi phí đầy đủ, giữ suất khi chờ, thêm quân từng người và tính lương từ đúng mốc hoàn tất. Không hủy lệnh tuyển trong lát cắt này.
- Icon lương v 2 đã chọn. Các ảnh khác là bản chuẩn hóa tạm từ proof; một số nhà và ô khai thác dùng hình SVG đơn giản để thử tương tác.

Giao chiến, nghiên cứu, AI, chiếm thành và xây trại tiền phương chưa nối vào bản này. Chi phí/cấp từ 3–20 chưa có bảng thử đầy đủ nên chưa mở. Đây không phải bằng chứng cân bằng hoặc playtest. Xem [ghi nhận tuyển quân](project-docs/implementation/barracks-validation.md).

Nếu trình duyệt không còn chỗ giữ dữ liệu gốc, game dừng khôi phục để tránh ghi đè. Sau khi **Xuất dữ liệu gốc**, người chơi có thể chọn **Tôi đã giữ file xuất · chơi mới** và xác nhận đã giữ file; lúc đó các bản gốc trên trình duyệt được thay bằng thế giới mới, các ô thủ công còn hợp lệ vẫn được giữ. Nếu dữ liệu gốc thay đổi sau khi xuất, cần xuất lại trước khi tiếp tục.

## Kiểm tra và cấu trúc

```sh
npm test
npm install
npm run test:e2e
npm run build
```

Unit test dùng Node có sẵn. Browser test dùng Playwright (dev dependency) và Google Chrome tại đường dẫn macOS trong `playwright.config.js`; đổi `executablePath` nếu máy khác. Bản build nằm trong `dist/`, không có dependency mạng lúc chơi.

`app/src/game.js` là mô phỏng thuần; `storage.js` kiểm tra và lưu trạng thái; các view chỉ gửi lệnh và hiển thị kết quả. `app/assets/provenance.json` ghi nguồn/hash/trạng thái ảnh. Build chép fixture và layout từ `project-docs`, không sửa nguồn gốc. Xem [kế hoạch triển khai](project-docs/implementation/2026-11-10-foundation-plan.md) và [hồ sơ thiết kế](project-docs/README.md).
