# Quy chuẩn mỹ thuật Crownlands

Phiên bản 2.0 · 07/11/2026 · Khóa cho giai đoạn asset theo B19–B22.

## 1. Hướng hình ảnh

2D cách điệu sáng, hình khối rõ và có chất liệu vẽ tay tiết chế. Kiến trúc giả tưởng thống nhất: đá sáng, gỗ nâu ấm, mái ngói xanh xám, cổng/tường thành tròn. Không sao chép riêng ba bộ Trung Hoa/Nhật/châu Âu rồi ghép chung. Hình có công năng đọc được khi thu nhỏ, không theo đuổi chi tiết chỉ thấy khi phóng lớn.

Quân dùng cùng ngôn ngữ trang bị; nhánh đổi huy hiệu, đường nét giáp và điểm nhấn, không thành ba thế giới mỹ thuật khác nhau. Voi có hậu cần và bộ giáp đọc được, không là sinh vật phép khổng lồ phủ bản đồ.

| Vai trò màu | Giá trị định hướng |
|---|---|
| Cỏ/nền tự nhiên | `#718B55`, `#B7C78B` |
| Đất/đường | `#B99665` |
| Đá/tường | `#C6BDA6` |
| Mái/gỗ | `#526873`, `#765339` |
| Nước | `#4E8C9A` |
| Quân chế | Sắt/gỗ, nhấn đỏ nâu `#8D5147` |
| Thánh Quang | Ngà/vàng sáng `#E7CF83`, hình ấn/bảo hộ |
| Hắc Ảnh | Tím than `#66577F`, ấn đứt/đường góc; vẫn rõ trong nền sáng |

Đây là palette gốc để giữ đồng nhất, không yêu cầu mọi pixel đúng hex. Màu chủ quyền/quan hệ do UI phủ, không bake theo nhánh. Không coi Hắc là xác sống hoặc đỏ luôn là phe địch.

## 2. Ba nhóm camera

| Nhóm | Camera khóa | Áp dụng |
|---|---|---|
| `world` | Orthographic từ trên, cao khoảng 75° so mặt đất, không chân trời/phối cảnh tụ | Terrain, thành nhỏ, mỏ, trại, đoàn |
| `city` | Orthographic nhìn từ đông nam, cao 30°, mặt nền hình thoi 2:1 | Thành chi tiết, nhà, ô tài nguyên |
| `unit-card` | Toàn đơn vị nhìn 3/4 hướng sang phải, nền trong suốt, nhất quán trong từng dòng | Chân dung/card 14 profile |

World là bản đồ chiến thuật; city là cảnh chọn công trình. Không lấy nhà city thu nhỏ tùy ý làm world icon: cần bản giản lược có silhouette riêng. Không xoay nhà để ghép slot; renderer thay vị trí, không đổi camera của từng nhà.

Ánh sáng từ trên trái trên ảnh, mềm vừa; màu ban ngày trung tính. Không trộn hoàng hôn, bóng đổ dài và trưa trong cùng bộ. Building/unit export không bake bóng đổ rời dài: bóng nền là lớp/shape riêng lúc ghép, tránh đúp bóng. AO sát chân trong vật thể được phép.

## 3. Tỷ lệ ở kích thước chơi

| Đối tượng | Kích thước xuất | Hiển thị chuẩn dự kiến |
|---|---|---|
| Tile world | 128×128 | Một ô logic 32×32 CSS px ở zoom 1× |
| Icon world thường | 128×128 | Khung 32×32 ở zoom 1× |
| Đại thành world | 192×192 | Khung tối đa 48×48, có khoảng trống bố trí |
| Công trình city | 512×512 | Rộng khoảng 96–128 CSS px, theo nhóm footprint |
| Nền city | 2048×1536 | Co toàn cảnh theo vùng chơi, kéo/zoom khi cần |
| Unit card | 512×512 | Card lớn hoặc thumbnail 64–96 px |
| Unit icon | 128×128 | 32–48 px |
| Resource/report icon | 128×128 hoặc SVG | 24–48 px |

Kích thước là canvas; phần hình không chạm mép. Padding an toàn tối thiểu 8% mỗi chiều cho sprite. Một city icon không được chiếm một phần lớn màn hình; Đại thành chỉ nổi bật vừa phải. Vùng bấm có thể rộng hơn hình nhưng không đổi footprint logic.

Mọi profile cùng dòng giữ pose/tỷ lệ và mốc chân gần như nhau để nhìn thấy thay đổi trang bị, không nhầm vì zoom. Ngựa/voi được fit toàn đơn vị trong card nhưng vẫn có tỷ lệ nội tại nhất quán. Không cắt chân, vũ khí, tai hoặc vòi.

## 4. Thành và layout

[Layout chuẩn](asset-production/city-layout.json) dùng 14 anchor nhà và 16 anchor tài nguyên. Mặt bằng tường tròn sẽ thấy thành ellipse khi chiếu; không ép tường thành vòng tròn màn hình trong khi nhà nhìn chéo.

Nền có đường, sân và địa hình; không bake công trình, cấp, giàn giáo, cờ chủ hoặc 16 mỏ đã xây. Tường/cổng tách lớp; nhà và ô sản xuất là sprite độc lập. Ô trống có placeholder hình nhẹ, không tạo nhà dân có chức năng chưa tồn tại.

Nhà có ba mốc hình: `v01` cấp 1–6, `v02` 7–13, `v03` 14–20. Cấp chính xác hiển thị bằng UI. Cao hơn đổi khối, vật liệu và độ hoàn thiện; không phóng nhà lên lấn slot khác. Dinh điều hành và nhà mở sâu không làm thay layout.

## 5. Bản đồ và nhận diện

Thành có vòng tường; trại tiền phương không tường; trại thổ phỉ có lều/hàng rào nhẹ. Đoàn quân là marker nhỏ, không một nhóm lính khổng lồ. Xe tiếp tế có biểu tượng riêng.

Tài nguyên: gỗ là bãi gỗ/khai thác cây; đất sét là hố đất đỏ và vật liệu đất; sắt là mỏ/quặng xám tối có công cụ; lương là ruộng ngũ cốc. **Không thêm đá thành tài nguyên thứ năm** vì gọi tắt “mỏ đá”. Lương trên world không dùng một bao lúa khổng lồ.

Huy hiệu chủ, phe, quan hệ, nhánh, hạng/cấp và cảnh báo là lớp động. Nhãn tên/số không nằm trong ảnh. Phân biệt bằng hình và chữ, không chỉ màu. Địa hình đọc được nhưng tương phản thấp hơn các địa điểm.

## 6. Năng lực và nhánh

Ba nhánh có huy hiệu SVG dùng trên card/report. Hộ trận có hình ấn/khiên, Phá ấn là ấn đứt, trang bị chuyên dụng là vũ khí/khiên cơ khí. Không vẽ icon không liên quan như lửa địa ngục hoặc phép hồi sinh khi chưa có luật.

Hiệu ứng asset trong bộ đầu là biểu tượng, dấu trạng thái và hình minh họa báo cáo; **không làm sprite sheet giao chiến hoặc hiệu ứng real-time**. Năng lực kích hoạt theo luật tự tính, không làm người chơi nghĩ phải bấm phép phản xạ.

## 7. Mùa

Mùa chỉ đổi cảnh quan. Dùng cùng layout/anchor/footprint/mã tài sản, thay vật liệu/cây/nền và lớp phủ có kiểm soát. Không nhân mọi unit card thành bốn mùa. Nhà base dùng lớp mùa chung khi hợp lý, không vẽ lại tất cả nếu chỉ cần tuyết/độ ẩm.

Đợt proof/core dùng hè để khóa mẫu. Đợt expansion phải có bộ môi trường xuân/hè/thu/đông; đây là phần của đích asset, không bốn lần reset hoặc bốn nền kinh tế.

## 8. File và alpha

Source giữ riêng với export. Raster cần nền trong suốt thật là PNG RGBA; không nền caro giả, viền trắng hoặc bóng bị cắt. Terrain/nền kín có thể WebP. UI glyph đơn giản dùng SVG có viewBox, không nhúng chữ hoặc raster từ ảnh.

Anchor chuẩn: world `(0.5, 0.75)`, city sprite `(0.5, 0.78)`, card/icon `(0.5, 0.5)`; layout dùng tọa độ chuẩn hóa, gốc trên trái, Y xuống. Không tự crop canvas làm đổi anchor. Nếu cần lệch phải ghi metadata và duyệt cùng cảnh.

Đường dẫn/tên file tiếng Anh ASCII, kebab-case; ID giữ qua revision. Không ghi tên phe/cấp bằng chữ trong sprite. Text tiếng Việt do UI render, font system hỗ trợ dấu; font nghệ thuật chưa là dependency của bộ đầu.

## 9. Cổng kiểm mẫu

Proof cần ghép hai preview từ asset rời: world ở kích thước UI thật và một góc city có slot. Kiểm alpha, camera, anchor, độ rõ 32 px, hình tài nguyên và khác biệt ba nhánh. Hai concept đã sinh trước đây chỉ là lịch sử, không được tự coi đã duyệt.

Sau khi người dùng nhìn và duyệt proof mới nhân bộ core. Không sinh hàng loạt dựa trên một prompt chưa kiểm chứng. Chưa có ảnh nào được nghiệm thu trong lần viết tài liệu này.
