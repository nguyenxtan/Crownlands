# Crownlands — bộ tài liệu chuẩn 2.3

Phiên bản 2.3 · 10/11/2026 · Theo [bản chốt](final-design.md). Art contract vẫn 2.0.

**Chốt 2.3 sau review Claude:** nghiên cứu gắn cơ sở/biên chế, công huấn luyện, trả trước và sổ raw/chuyển, nguồn lương site/hành trang, nợ đói giữ bucket và vật tư thủ thành một lần. Đọc [đặc tả nghiên cứu và kinh tế](research-and-economy.md) và [resolution](reviews/2026-11-10-research-and-economy-resolution.md). B29–B33 là lựa chọn coordinator theo U11; số cap 2.500/+60% là preset cần thử.

**Phạm vi:** vận hành/bảo dưỡng mở rộng chốt cấu trúc nhưng chưa thu phí; thuế/An dân còn hoãn. App nền 0.2 và S00 design 2.2 được giữ, không nâng engine/save trong đợt docs này. Art contract 2.0/manifest/roster/layout không đổi. [Báo cáo 2.3](validation-report.md) phân biệt static/arithmetic với game test; các số 0 ảnh trong lịch sử 2.2 không là trạng thái asset hiện tại.

**Đã chốt thiết kế để chuyển sang giai đoạn 2: sản xuất asset.** Crownlands là webgame chiến thuật một người chơi offline, thế giới tiếp diễn qua save, năm dòng quân và ba đường Quân chế / Thánh Quang / Hắc Ảnh. Không có yêu cầu server nhiều người để chơi.

Bổ sung 02 (U10) đã được đối chiếu ở [prototype readiness](prototype-readiness.md): cấu hình Chơi mới, luật bonus, nợ biên chế, nhiều phe và vòng đời NPC. Bộ asset vẫn dùng contract 2.0/189 export; không mở thêm tính năng hoãn. [S00](prototype/scenarios/first-foundation.json) là đặc tả thử 0.2-draft, chưa chạy đủ kịch bản chinh phục. Bản 2.2 khép luật nối sau [Claude review 2.1](reviews/2026-11-07-supplement-02-claude-review.md), xem [resolution 2.2](reviews/2026-11-10-supplement-02-resolution.md).

**Tiến độ asset · 10/11/2026:** **Đã chọn icon lương v 2 và xuất SVG128 ×128**;15 raster còn lại đang ở mức draft. Đã tạo [16 mẫu proof draft, bản sửa 02](../assets/previews/proof-v02/index.html), có bản ghép world 32 px, nội thành và so nhánh kỵ. Manifest 189 đầu ra hiện có 1 file exported/approved (icon lương),188 chưa hoàn tất; tiến độ draft theo [generation record](../assets/previews/proof-v02/generation-record.json).

**Bản chơi nền 0.1 · 10/11/2026:** đã nối lát cắt kinh tế của S00 vào [web app cục bộ](../README.md): bản đồ, 14/16 ô, nâng khai thác cấp 1→2, đồng hồ và bản lưu. S00 đầy đủ vẫn chưa chạy vì chưa có tuyển quân, di chuyển, chiến đấu và AI. Các bản ảnh runtime tạm trong `app/assets` không đổi trạng thái phê duyệt của manifest sản xuất.

**Bản chơi nền 0.2 · 10/11/2026:** tiếp theo mốc 0.1, Doanh trại đã có tuyển kiếm/giáo/cung I theo hàng đợi, chi tài nguyên, giữ hạn mức và thêm lương đúng lúc hoàn tất từng quân. Có chuyển bản lưu 0.1; xem [kế hoạch](implementation/2026-11-10-barracks-plan.md) và [kiểm chứng](implementation/barracks-validation.md). Hành quân, vận tải, chiến đấu/AI và S00 đầy đủ vẫn chưa được triển khai. Hai vòng review thủ thành đã được [đối chiếu riêng](reviews/2026-11-10-city-defense-resolution.md); chưa đổi baseline hoặc triển khai công thành.

**Duyệt concept Phủ · 10/11/2026:** chủ dự án chọn [Phủ v 2](../assets/source/city-town-hall-v01/proof-v02.png), đã ghi nhận nguồn và phạm vi duyệt trong manifest. Hiện có 2 mẫu được chọn: lương v 2 đã exported, Phủ v 2 approved chờ export;14 raster proof khác vẫn draft. Đây là cập nhật sau mốc proof phía trên, không duyệt toàn bộ nhà hoặc bộ asset.

**Đợt nhà chức năng 01 · 10/11/2026:** đã tạo và ghép 4 concept Kho tài nguyên, Kho lương, Điểm tập kết và Trạm vận tải vào bản chơi, xem [bảng mẫu và bản ghép](../assets/previews/city-support-v01/index.html). Bốn asset core này đang `draft`, chưa được chủ dự án duyệt. Xem [ghi nhận triển khai](implementation/city-support-assets.md); không đổi chi phí, slot hoặc định dạng bản lưu trong đợt này.

**Đợt ô khai thác 01 · 10/11/2026:** đã tạo 4 concept Rừng, Đất sét, Sắt và Ruộng lương rồi ghép vào 16 ô quanh thành. [Bảng mẫu, nguồn và prompt](../assets/previews/city-resources-v01/index.html); [kiểm chứng](implementation/city-resource-assets.md). Các mẫu đang `draft`; giữ nguyên chi phí, sản lượng, layout và bản lưu.

**Bản chơi nền 0.3 ·10/11/2026:** đã nối hành quân tới hai mỏ trống, khai thác có kho riêng, xe đi lấy hàng/chở về và rút quân giữ hạn mức thành gốc. Dùng cùng link cố định, chuyển save0.1/0.2 lên schema3; không đổi S00/asset contract. Đây là một phần BUILD-02, chưa có chiến đấu/AI/chiếm thành/Học viện. Xem [phạm vi và kiểm chứng](implementation/logistics-validation.md).

## Đọc theo thứ tự

1. [Bản chốt thiết kế](final-design.md): 33 quyết định triển khai, phạm vi chơi và những hệ thống để sau.
2. [Art bible](art-bible.md): camera, palette, scale, silhouette, alpha và cách ghép.
3. [Kế hoạch bộ asset](asset-production-plan.md): 189 export dự kiến, chia proof 16 / core bổ sung 134 / expansion 39.
4. [Brief 16 mẫu đầu](asset-production/briefs/first-proof-batch.md): đầu việc mở giai đoạn 2.

[Manifest](asset-production/asset-manifest.json), [roster 14 profile](asset-production/unit-roster.json) và [layout 14 nhà / 16 ô tài nguyên](asset-production/city-layout.json) là dữ liệu sản xuất. Cấu trúc 189 đầu ra giữ nguyên; trạng thái hiện hành đọc trong manifest. Icon lương v 2 đã được chọn;15 raster proof vẫn cần chuẩn hóa.

## Tra theo hệ thống

| Tài liệu | Nội dung |
|---|---|
| [Sổ quyết định](decisions.md) | D01–D35, B01–B33, xử lý đề xuất/vấn đề mở và nguồn thẩm quyền |
| [Khung lối chơi](gameplay-blueprint.md) / [định hướng](game-design.md) | Vòng chơi, lựa chọn, mốc chiến dịch và thua/phục hồi |
| [Hệ thống và cân bằng](systems-and-balance.md) | Tài nguyên, khai thác, quân, hậu cần, tiếp quản |
| [Nghiên cứu và kinh tế 2.3](research-and-economy.md) | B29–B33, core trả trước, nguồn lương, phần hoãn/cổng và preset |
| [Quân và nghiên cứu](military-and-research.md) | Bậc/nhánh, kiến thức đế chế, nâng, suất và cơ sở |
| [Năng lực chiến đấu](combat-abilities.md) | Quỹ chung, trigger, cooldown và giải thích báo cáo |
| [Đoàn NPC](mobile-npcs.md) / [NPC và Đại thành](npc-and-great-cities.md) | Phe, mission, nguồn lực, chuyển quyền và thưởng B |
| [Thế giới và mở rộng](world-and-expansion.md) | Quyền đất, đánh đổi khi mở rộng, thu hẹp và tiếp tục thế giới |
| [Thiết kế kỹ thuật](technical-design.md) | Đồng hồ, thứ tự pha, bản lưu và bất biến |
| [Giao diện](interface-and-art.md) | Các màn hình và lớp hiển thị tách khỏi asset |
| [Lộ trình và kiểm chứng](roadmap-and-validation.md) | Giai đoạn docs → asset → code → hiệu chỉnh/playtest |
| [Bổ sung 02 và S00](prototype-readiness.md) | Đối chiếu 10 mục BS, luật nối, dữ liệu mở đầu, 13 ca BS-T và 15 ca RV21 chưa chạy |
| [Sổ hiệu chỉnh](calibration-register.md) | 15 nhóm số/cấu hình cần đo; không mở lại shape/camera/roster |
| [Biên bản kiểm tra](validation-report.md) | Kết quả kiểm nguồn, liên kết, mã, manifest, roster và layout sau khi chốt |

## Hiệu lực và lưu trữ

Thứ tự áp dụng: chỉ đạo mới của chủ dự án → [baseline hiện hành](final-design.md) cùng B01–B33 → các đặc tả hiện hành → số ruleset được chọn cho mỗi lần thử. Các file review/proposal và bộ nguồn là lịch sử lập luận, không ghi đè baseline. “Chốt” là quyết định thiết kế; không có nghĩa game đã chạy, vui hoặc cân bằng.

[D34](decisions.md) ghi ủy quyền U09. Những lựa chọn mới như ô vuông, 14/16 slot, một dự án nghiên cứu, tên nhánh và 14 profile là quyết định triển khai do Codex chốt theo ủy quyền này; không gán ngược thành câu nói của chủ dự án hoặc kết quả đã đo của Claude.

Snapshot trước 2.3 ở [archive v 2.2](archive/crownlands-design-v2.2.zip) gồm 82 entry được kiểm byte. Bản trước được lưu nguyên trong [archive v 1.3](archive/crownlands-design-v1.3.zip), [archive v 2.0](archive/crownlands-design-v2.0.zip) và [archive v 2.1](archive/crownlands-design-v2.1.zip). Reviews/proposals/sources vẫn giữ file gốc để tra. Bảy tài liệu trong `reference-docs` giữ nguyên SHA256; bản U08 giữ nguyên byte. Bản Markdown này là biên tập hiện hành, không phải bản dịch/trích xuất nguyên văn đầy đủ của PDF/DOCX.

## Nguồn

| Mã nguồn | Nội dung |
|---|---|
| R01 | [Tập 01 v 1.0](../reference-docs/01_Dinh_huong_va_luat_game_v1.0.docx): định hướng và D01–D18 |
| R02 | [Tập 02 v 1.0](../reference-docs/02_Dac_ta_he_thong_va_can_bang_v1.0.docx): đặc tả và công thức thử |
| R03 | [Tập 03 v 1.0](../reference-docs/03_Kien_truc_ky_thuat_va_du_lieu_v1.0.docx): dữ liệu, lệnh và I01–I12 |
| R04 | [Tập 04 v 1.0](../reference-docs/04_Giao_dien_va_quy_chuan_my_thuat_v1.0.docx): UX01–UX10 và mỹ thuật |
| R05 | [Tập 05 v 1.0](../reference-docs/05_Lo_trinh_kiem_thu_va_quan_tri_v1.0.docx): B, T01–T70 và O01–O16 |
| R06 | [Bảng cân bằng v 1.0](../reference-docs/Tam_Gioi_Bang_can_bang_v1.0.xlsx): số và công thức mẫu |
| R07 | [Hồ sơ tổng hợp v 1.0](../reference-docs/Tam_Gioi_Khai_Quoc_Ho_so_tong_hop_v1.0.pdf): bản PDF tham khảo |
| U01 | Trao đổi chủ dự án ngày 06–07/11/2026: tên Crownlands, làm web app trước, tách hai thư mục |
| U02 | Tổng hợp thiết kế mới ngày 07/11/2026: thế giới lâu dài, cấp 20, khai thác, hạn mức quân, Đại thành, NPC chủ động và nghịch lý mở rộng |
| U03 | Phản hồi bản đồ ngày 07/11/2026: thành trong ảnh mẫu quá lớn, NPC chưa được thể hiện rõ |
| U04 | Bảy ý tưởng tham khảo ngày 07/11/2026, lưu và phân tích trong `proposals`; toàn bộ còn là đề xuất |
| U05 | Chuyển trọng tâm sang offline một người với vương quốc NPC; D28 ghi nhận hướng, các mặc định thời gian/lưu còn là đề xuất |
| U06 | Yêu cầu review chéo Codex–Claude để tìm lối chơi logic; chưa đồng nghĩa phê duyệt mọi phương án sau review |
| U07 | Đề xuất tiến hóa quân, công nghệ toàn đế chế/cơ sở địa phương và năm bậc; chưa có lựa chọn cuối về Paladin/phép thuật |
| U08 | [Danh mục đính kèm nguyên bản](sources/2026-11-07-offline-design-addendum.md): ghi hướng chọn mới về nhánh, phe và NPC lưu động; cách triển khai chi tiết ở nguồn là đề xuất; baseline 2.0 đã chọn phạm vi hiện hành |
| C01 | Review mở rộng của Claude trước khi đổi offline |
| C02 | Claude review chinh phục vòng 1 |
| C03 | Codex phản biện mười hai điểm sau vòng 1 |
| C04 | Claude review chinh phục vòng 2 |
| C05 | Claude review tiến hóa quân và sửa thêm một số điểm vòng 2 |
| C06 | Codex tổng hợp 1.2 trước U08, tách đồng thuận và sửa cuối |
| C07 | Claude phản biện nguồn U08, nhánh/hiệu ứng và NPC lưu động |
| C08 | Codex đối chiếu sau C07; sửa cuối có nhãn, chưa được review lại hoặc chạy thử |
| U09 | Chủ dự án ngày 07/11/2026 ủy quyền chốt phương án và viết docs cuối để sang giai đoạn 2 — bộ asset; baseline 2.0 ghi lựa chọn triển khai của Codex |
| U10 | [Tóm lược biên tập Bổ sung 02](sources/2026-11-07-supplement-02-summary.md) từ tin nhắn, không bản sao nguyên văn; nêu BS-01–BS-10 và mốc nghiệm thu, được đối chiếu ở 2.1 |
| C09 | [Claude review Bổ sung 02](reviews/2026-11-07-supplement-02-claude-review.md) (thực hiện 10/11/2026): F-01–F-11, ca RV21; tư vấn, không là luật |
| C10 | [Codex resolution 2.2](reviews/2026-11-10-supplement-02-resolution.md): lựa chọn coordinator theo U09 sau C09; chưa được Claude review lại |
| U11 | Chỉ đạo 10/11/2026: cap theo nhà binh, ít/chậm hơn, tuyển gắn nghiên cứu, [nguồn khoa học](sources/2026-11-10-research-system-proposal.md), [thu–chi biên tập](sources/2026-11-10-city-budget-summary.md), ủy quyền review Claude rồi chốt phần đủ rõ |
| C11 | [Claude review nghiên cứu/thu–chi](reviews/2026-11-10-research-and-economy-claude-review.md), RC01–RC10/F1–F10; không engine/playtest |
| C12 | [Resolution 2.3 của Codex](reviews/2026-11-10-research-and-economy-resolution.md): xử lý phản biện và các làm rõ cuối; phân kỳ công khai |

[Manifest nguồn gốc](sources/reference-manifest.json) và [manifest U08](sources/offline-design-addendum-manifest.json) dùng để kiểm tra bảo toàn. Các câu “còn đề xuất” trong review/archive phản ánh lúc viết chúng, không là trạng thái hiện hành sau U09.
