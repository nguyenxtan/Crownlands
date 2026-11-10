# Brief chung cho sản xuất

Phiên bản 2.0. Dùng cùng [art bible](../../art-bible.md), [manifest](../asset-manifest.json) và [roster](../unit-roster.json). Đây là brief chuẩn bị, chưa có lệnh tạo ảnh.

## Prompt nền tiếng Anh

> Crownlands: bright stylized hand-painted 2D strategy game art. Cohesive invented stone-and-timber architecture, blue-gray slate roofs, warm natural materials, clean readable silhouettes, restrained detail designed for small display sizes. Neutral daylight, light from upper screen-left. Consistent proportions and material treatment across the set. One isolated game asset, no text, numbers, labels, watermark, UI frame, owner flag, faction color overlay or baked selection marker. Preserve safe padding and the supplied ground-contact anchor.

Thêm mô tả đúng ID từ manifest và chỉ một camera dưới đây:

| Contract | Chỉ dẫn thêm |
|---|---|
| World terrain | Orthographic top-down about 75 degrees above the ground. Seamless square material tile. No horizon, no distant scenery, no buildings. |
| World site/army | Same world camera. Compact symbolic silhouette for a 32 CSS pixel icon; isolated on real transparent background. No huge diorama or city interior. |
| City building/resource | Orthographic from southeast, 30 degrees above ground, 2:1 ground plane. Isolated sprite, no detached cast shadow, real transparent background. Anchor (0.5, 0.78), complete geometry. |
| City ground | Same city camera, layout canvas 2048×1536. Empty anchored pads and ground only; do not paint buildings or resource structures into background. |
| Unit card | Full unit in a three-quarter view facing right, including the whole horse/elephant when mounted. Neutral daylight, no cinematic background; transparent cutout. No detached shadow, no cut-off weapons. |
| UI/report | Simple original glyph or compact report illustration, one meaning per icon; no baked letters or combat scene. |

Không dựa vào prompt để coi alpha/size đã đúng. Kiểm file sau xuất. SVG dựng vector theo nét/hình đơn giản; không nhúng một PNG vào SVG rồi gọi là vector. Card là nguồn cho unit icon, không yêu cầu sinh icon độc lập bị đổi giáp.

## Khi có mẫu proof đã duyệt

Giữ mẫu đó làm tham chiếu trực tiếp về camera/palette/tỷ lệ trong cùng nhóm. Tạo từng asset hoặc nhóm nhỏ, ghi source/tool/version và không tự thay outfit giữa card và icon. Nhánh Quân chế dùng trang bị thực dụng; Thánh dùng ấn bảo hộ tiết chế; Hắc dùng ấn đứt/tím than, vẫn là quân sống trong nền sáng. Không thêm cánh, hào quang kín thân hoặc xác sống.

Bóng dưới vật thể và cờ/màu/chữ do lớp ghép xử lý. Đường/sông có quy tắc nối cạnh, có thể xoay hình học phẳng; không xoay sprite nhà có ánh sáng để lấp góc khác.
