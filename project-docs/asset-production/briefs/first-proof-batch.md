# Đợt proof: 16 mẫu đầu

Phiên bản hợp đồng 2.0. Ngày10/11/2026 đã có [bộ proof draft v01](../../../assets/previews/proof-v01/index.html); chưa được duyệt. Danh sách dưới đây giữ nguyên phạm vi16 mẫu. Kết hợp [brief chung](master-style.md) với contract của mỗi ID trong [manifest](../asset-manifest.json).

| # | ID | Mô tả/điểm phải thấy | Export |
|---|---|---|---|
| 01 | `world-terrain-grass-summer` | Seamless bright summer grass material, top-down, no objects, no text. | 128×128, WEBP |
| 02 | `world-city-small` | Compact circular small city icon. Recognizable at 32 CSS pixels, no detailed city scene. | 128×128, PNG |
| 03 | `world-npc-bandit-camp` | Local bandit camp with rough shelters; no monster or ownership flag baked in. | 128×128, PNG |
| 04 | `world-resource-clay-site` | red-brown clay pit with excavation terraces; not a stone quarry; functional small resource site at 32 CSS pixels. | 128×128, PNG |
| 05 | `world-resource-grain-field` | compact cultivated grain field with orderly furrows; not a giant grain sack; functional small resource site at 32 CSS pixels. | 128×128, PNG |
| 06 | `world-army-patrol` | Unscouted mobile army marker: compact paired pennants and travel equipment; visually different from a static camp. | 128×128, PNG |
| 07 | `city-town-hall-v01` | Phủ thành, visual stage 1; fixed footprint and ground anchor, no text/levels/flags. | 512×512, PNG |
| 08 | `city-barracks-v01` | Doanh trại, visual stage 1; fixed footprint and ground anchor, no text/levels/flags. | 512×512, PNG |
| 09 | `city-ground-summer` | Circular city terrain and access roads, clean empty pads matching layout; no buildings or baked resource structures. | 2048×1536, WEBP |
| 10 | `unit-card-sword-i` | Simple iron sword, cloth tunic, round wooden shield. Same line pose and anatomy as other tiers; no text/border. | 512×512, PNG |
| 11 | `unit-card-cavalry-iii` | Whole horse and rider, articulated torso armor, shield and lance, no path insignia. Same line pose and anatomy as other tiers; no text/border. | 512×512, PNG |
| 12 | `unit-card-cavalry-iv-martial` | Whole horse and rider, practical steel armor, disciplined straight lance, iron crest, muted red-brown accents. Same line pose and anatomy as other tiers; no text/border. | 512×512, PNG |
| 13 | `unit-card-cavalry-iv-radiant` | Whole horse and rider, ivory cloth and warm gold trim, open geometric seal on shield, restrained luminous accent. Same line pose and anatomy as other tiers; no text/border. | 512×512, PNG |
| 14 | `unit-card-cavalry-iv-umbral` | Whole horse and rider, dark violet cloth, angular broken-seal emblem, cool metal, readable daylight silhouette. Same line pose and anatomy as other tiers; no text/border. | 512×512, PNG |
| 15 | `ui-resource-grain` | Simple original grain glyph, readable without relying on color. | 128×128, SVG |
| 16 | `effect-radiant-ward` | Finite translucent gold barrier around a short rank, clear boundary; report symbol, not a combat animation. | 128×128, PNG |

## Hai preview bắt buộc trước nhân rộng

**World-scale preview:** canvas 1440×900, map viewport khoảng 1024×768; lặp tile cỏ ở 32×32 CSS px, đặt nhiều thành nhỏ, trại sơn tặc, hai mỏ và marker đoàn đúng scale. Nhãn động lấy từ lớp ghép, không bake vào sprite. Cần thấy đây là một vùng có nhiều địa điểm, không phải một thành chiếm gần hết màn hình. Đánh giá tile/đường nối ở lượt core riêng khi có file thật.

**City-layout preview:** ghép nền và hai nhà đầu tại S01/S05 theo layout, các slot còn lại dùng placeholder trung tính; hiện 16 plot để kiểm khoảng trống. Không cần vẽ lại thành phố đầy đủ chỉ để biết góc camera đúng. Nếu pad/nhà chồng vùng bấm, sửa footprint/anchor và art contract trước khi nhân rộng, giữ số lượng và ID gameplay.

Xem riêng dải kỵ III và ba kỵ IV ở thumbnail 96px; phân biệt nhánh khi tắt màu. Kiểm kiếm I ở 64px, grain UI ở 24px. Hộ trận là icon báo cáo, không vẽ trận đánh realtime.

## Điều kiện qua proof

Nhìn rõ loại địa điểm và vật thể lưu động; thành thường chỉ 32px; clay khác iron, grain không thành bao tải khổng lồ; camera và ánh sáng giữa các mẫu khớp; card nguyên thân/ngựa, nhánh rõ mà không che silhouette. Alpha thật và ghép sạch. Chủ dự án duyệt các preview cụ thể rồi mới sản xuất core hàng loạt. Nếu chưa đạt, lặp 16 mẫu này thay vì tạo cả bộ mới.
