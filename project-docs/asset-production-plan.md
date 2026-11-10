# Kế hoạch sản xuất asset Crownlands

Phiên bản 2.0 · 07/11/2026 · Theo [baseline](final-design.md) và [art bible](art-bible.md).

**Tiến độ10/11/2026:** người dùng chọn icon lương v2 và concept Phủ v2. Icon lương đã xuất SVG128×128; Phủ được ghi nhận concept-approved, chờ export chính thức. Manifest hiện1 exported,1 approved chờ export và187 đầu ra khác chưa hoàn tất. Các số bên dưới là phạm vi bộ asset, không số đã sản xuất.

Trong187 đầu ra khác,4 nhà chức năng mốc1 đã có concept draft và được ghép vào app: Kho tài nguyên, Kho lương, Điểm tập kết, Trạm vận tải. [Đợt nhà chức năng01](../assets/previews/city-support-v01/index.html) là bản xem để duyệt hình, chưa phải4 export hoàn tất.

Đã thêm4 concept ô khai thác mốc1: Rừng, Đất sét, Sắt, Ruộng lương. [Đợt ô khai thác01](../assets/previews/city-resources-v01/index.html) được ghép vào16 ô trong app và vẫn ở trạng thái draft. Hai đợt này hiện có8 concept core mới; không tăng tổng189 output và không coi là8 export đã hoàn tất.

## 1. Đầu ra đã chốt

Bộ danh mục có **189 file export dự kiến**. Đây là số đầu ra, không phải số tranh cần vẽ độc lập: 14 icon quân lấy từ card, icon UI dựng vector, mùa dùng biến thể từ nền. Mốc chốt docs ban đầu toàn bộ ở `planned`; trạng thái sản xuất hiện hành cập nhật tại manifest và ghi nhận tiến độ phía trên.

| Đợt | Số export riêng | Phạm vi |
|---|---:|---|
| `proof` | 16 | 16 mẫu tái dùng trong core; duyệt hình và tỷ lệ trước nhân rộng. |
| `core` | 134 | Phần bổ sung để đủ bộ lõi, không tính lại 16 mẫu proof. |
| `expansion` | 39 | Đại thành, Dinh điều hành và các mùa còn lại; làm sau vòng lõi. |

Bộ lõi đầy đủ gồm proof + core = **150 export**. Không sản xuất toàn bộ danh mục một lượt. 45 profile dài hạn không nằm trong số này; core chỉ có 14 profile, mỗi profile một card và một icon dẫn xuất.

## 2. Các file phải dùng khi sản xuất

| File | Công dụng |
|---|---|
| [Manifest](asset-production/asset-manifest.json) | ID, batch, camera contract, kích thước, output path, phụ thuộc, trạng thái và mô tả từng asset |
| [Roster](asset-production/unit-roster.json) | 14 profile đã khóa, tên, dòng/bậc/nhánh, trang bị và silhouette |
| [Layout](asset-production/city-layout.json) | 14 slot nhà, 16 ô khai thác, tường/cổng; tọa độ chuẩn hóa và giai đoạn hình |
| [Brief chung](asset-production/briefs/master-style.md) | Prompt và quy tắc giữ camera, ánh sáng, chất liệu |
| [Đợt proof](asset-production/briefs/first-proof-batch.md) | 16 mẫu đầu, mục tiêu đọc hình và hai composite kiểm tỷ lệ |
| [Sổ hiệu chỉnh](calibration-register.md) | Chỉ số cần đo khi làm game; không nhúng vào tranh |

Đường dẫn output trong JSON tính từ thư mục Crownlands, không từ thư mục chứa manifest. File chưa tồn tại là bình thường ở trạng thái `planned`. `contracts` chứa kích thước/anchor mặc định theo nhóm; không tự đoán lại từ tên ảnh.

## 3. Trình tự giai đoạn 2

1. **Proof:** tạo 16 mẫu cùng style/camera; tạo hai composite dẫn xuất bằng cách đặt sprite đúng tỷ lệ world và city. Mỗi hình gốc độc lập, không yêu cầu AI vẽ một tấm có toàn bộ UI và chữ.
2. **Duyệt mẫu:** xem world ở tile 32 CSS px và 1440×900, thành chi tiết riêng; phân biệt thành, sơn tặc, mỏ và đoàn. Kiểm các card kỵ III/IV ba nhánh cạnh nhau. Sửa camera/shape ở đây, chưa nhân rộng.
3. **Core theo phụ thuộc:** nền/địa điểm → nhà ba mốc → 14 card → icon dẫn xuất → UI/report. Mẫu proof được tái dùng đúng ID, không làm lại thành bản thứ hai.
4. **Expansion:** sau core được ghép và kiểm, hoàn thiện môi trường bốn mùa, Đại thành và Dinh điều hành. Không thêm quân/nhà chưa có trong manifest chỉ để lấp chỗ trống.

Đạt proof về hình mới mở đợt core hàng loạt. Nếu chưa đạt, cập nhật đúng asset đang thử; tránh thay palette/camera cả bộ giữa chừng. Việc duyệt proof là kiểm sản phẩm cụ thể, không mở lại toàn bộ thiết kế gameplay.

## 4. Quy tắc hình và ghép

World dùng icon thành thường 32×32 CSS px; Đại thành tối đa 48×48. Đơn vị lưu động có marker riêng, không nằm cố định trong hình thành. Trại sơn tặc là địa điểm; đoàn sơn tặc là marker Army + nhãn/mission lúc chạy. Màu phe, chủ quyền, hạng và nhãn là lớp động.

Không tạo asset “quái vật” riêng trong core: chưa chốt dòng quái vật chiến đấu thứ sáu. Nếu mở nội dung đó sau, phải có roster/luật và review scope riêng. Hắc Ảnh hiện là nhánh quân, không là quái vật mặc định.

Thành chi tiết dùng 10 nhà core × 3 mốc, tái dùng kho bổ sung. S11 chờ Dinh điều hành, S14 để trống. Vòng ngoài 16 ô gồm bốn mỗi loại; không đổi thành 18 ô từ hồ sơ cũ. Nền không bake nhà; sprite dựng theo layer và anchor. Tường/cổng dùng canvas chung để giữ khớp.

UI khung, bảng và chữ dựng bằng HTML/CSS. Chỉ glyph/badge/report cần asset; không bake màn hình hoàn chỉnh thành một ảnh. Không cần sprite đánh nhau, animation phép, từng lính hành quân hoặc trang bị rơi ở giai đoạn này.

## 5. Nghiệm thu và bàn giao

- **Mỗi file:** đúng ID/đường dẫn, dimensions/alpha, safe padding, anchor, camera/light. Không chữ lỗi, watermark, checkerboard giả hoặc cắt vũ khí/chân/ngà.
- **Nhóm:** đồng nhất pose giữa các bậc cùng dòng; bậc II rõ tiến triển từ I; ba kỵ IV khác silhouette/huy hiệu nhưng cùng thế giới. Tương khắc không được suy từ số trang trí.
- **Ghép:** tile cạnh nối được; đường/sông có endpoint ở giữa cạnh, cùng bề rộng; nhà không che vùng bấm; icon world không nuốt màn hình. Thử cả nền sáng/tối và xem đơn sắc với badge.
- **Trạng thái:** `planned → draft → in-review → approved → exported`. `approved` chỉ bật sau duyệt hình; export chỉ xong sau kiểm file thật. Ghi actual dimensions, source, công cụ và thay đổi vào manifest khi có.
- **Bàn giao:** file nguồn chỉnh sửa ở `assets/source`, export tối ưu ở `assets/export`, preview và ghi nhận QA ở `assets/previews`. Giữ mẫu tham chiếu được quyền dùng ở `assets/reference`, không lấy concept cũ làm mẫu duyệt.

Hai composite là preview dẫn xuất, không phải asset game mới, không cộng vào manifest. Chưa có số hiệu năng/độ nặng tải cuối; đo sau khi có file thật. Chỉ gọi bộ asset hoàn tất khi các file bắt buộc đã được kiểm và có thể ghép vào prototype.

## 6. Thống kê theo loại

| Loại | Export dự kiến |
|---|---:|
| `city-building` | 33 |
| `city-ground` | 1 |
| `city-overlay` | 2 |
| `city-perimeter` | 6 |
| `city-resource` | 12 |
| `report-effect` | 3 |
| `season-city` | 3 |
| `season-decoration` | 6 |
| `season-terrain` | 24 |
| `terrain` | 8 |
| `ui-action` | 15 |
| `ui-badge` | 13 |
| `ui-resource` | 4 |
| `unit-card` | 14 |
| `unit-icon` | 14 |
| `world-army` | 7 |
| `world-decoration` | 3 |
| `world-network` | 8 |
| `world-resource` | 4 |
| `world-site` | 9 |

Số liệu được tính từ manifest v2.0; sửa manifest phải tính lại bảng. Cần đo gameplay sau khi lập trình theo [lộ trình](roadmap-and-validation.md); duyệt hình không chứng minh luật đã cân bằng.


## 7. Giao với bổ sung 02

Docs luật hiện hành2.1 ở [prototype readiness](prototype-readiness.md) không thay contract asset2.0: vẫn 189 output/14 profile/14 slot/16 plot và16 proof đầu. Không thêm UI thuế/An dân/đình chiến, quái vật, phép Thanh tẩy/Nguyền, thương đoàn hay du mục chỉ vì xuất hiện trong checklist U10. S00 dùng các asset/placeholder đã có trong danh mục; code không phải chờ toàn bộ 189 export.
