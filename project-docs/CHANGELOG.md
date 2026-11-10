# Nhật ký cập nhật

## 2.3 — 10/11/2026

Chốt phần nghiên cứu, tuyển quân và thu–chi theo U11 sau [Claude review RC01–RC10](reviews/2026-11-10-research-and-economy-claude-review.md). [Resolution 2.3](reviews/2026-11-10-research-and-economy-resolution.md) ghi rõ những làm rõ cuối của Codex, các điểm khác nguồn và phần chưa đủ luật để kích hoạt.

- Thêm D35 và B29–B33; đặc tả trong [nghiên cứu và kinh tế](research-and-economy.md). Biên chế theo Doanh trại; huấn luyện theo cơ sở và công nghệ hoàn tất, giữ công lẻ khi đổi tốc độ hoặc lưu/tải.
- Chọn trả trước cho bản gần nhất. Nguyên liệu đã chi không còn trong kho; giữ biên chế khác giữ nguyên liệu. Không hoàn tiền quá khứ khi công nghệ giảm giá.
- Tách kho địa điểm, hành trang Army và hàng trên Shipment. Kho hợp lệ nơi đóng trả trước, hành trang bù phần thiếu; giao hàng chỉ dỡ phần còn chỗ, hàng kẹt giữ sổ và có lệnh hủy hợp lệ.
- Nợ đói theo từng nhóm quân có cùng trạng thái; không lấy trung bình để xóa nợ khi gộp. Vật tư thủ thành chỉ tiêu một lần trong đợt công thành hợp lệ; đầy đủ luật công phá vẫn là cổng trước triển khai D1.
- Giữ thiết kế vận hành/bảo dưỡng nhưng chưa thu phí gỗ/sắt, bảo trì mọi nhà, hành chính hay hỏng lương. Đây là phân kỳ khác ưu tiên làm sớm trong nguồn, đã thông báo rõ; hậu quả thiếu và đường phục hồi phải được định nghĩa trước khi bật.
- Thêm [preset hiệu chỉnh](prototype/research-economy-preset.json) và 22 expected outcomes RE23 chưa chạy. Cap 200–2.500 và thưởng tốc độ tối đa +60% là số thử của coordinator, chưa cân bằng. Tách cổng luật G23 khỏi việc hiệu chỉnh số CAL.
- Lưu 82 file trước sửa vào [archive v2.2](archive/crownlands-design-v2.2.zip). Giữ S00, static validation 2.2, asset contract 2.0 và các nguồn/review/proposal trước đó. Đợt này cập nhật tài liệu; không triển khai luật mới vào app hoặc bản lưu.

## 2.2 — 10/11/2026

Khép các khoảng hở do [Claude review 2.1](reviews/2026-11-07-supplement-02-claude-review.md) nêu, theo [resolution 2.2](reviews/2026-11-10-supplement-02-resolution.md). Lựa chọn chi tiết là của coordinator Codex theo U09; không thêm B29, hệ thống hoặc asset. Art contract vẫn 2.0.

- B26: kho tính net = sản xuất − chi liên tục theo đoạn rồi clamp [0, cap], ledger tách production/paid upkeep/overflow/unmet, event đói ở tick ceil; core `research_bonus = 0`, ví dụ 160 là fixture.
- B23: ô site không transit; không holder thì bên sớm nhất đủ điều kiện; bên trung lập với holder dừng ngoài; thắng outer holder không tự đánh garrison, assault là lệnh riêng; site trống về custody thế giới.
- B24: đợt nợ khóa (owner, nguồn gốc); job pause trả suất tăng, resume giữ lại suất trước, không trả chi lần hai.
- B25: phân bổ hấp thụ fixed-point theo lượng damage, phần dư largest remainder với stable claim key; không làm tròn số chết giữa profile; quỹ hết hạn sau casualty lượt k.
- B27: đói kéo dài phải hao hụt hữu hạn tới hết quân (lịch CAL10); tài sản không quân/không đích của phe thất bại quân sự thành `dormant`.
- B28/S00 0.2-draft: `ai_budget` thử cho ash-crown, guard kiểm cả lúc đổi đích, metric Manhattan, cầu là đường tắt; BFS hiện hành 19/36/8/10/10, bỏ cầu 90. Hash S00 đổi c8f7d1f8… → 2d513101….
- BUILD: NPC BUILD-02 chưa tấn công; mất gốc/nợ cơ bản ở BUILD-03; ghi rõ ngoài phạm vi.
- Thêm 15 ca RV21 (override RV21-05, RV21-11). Lưu 44 file trước sửa vào `archive/crownlands-design-v2.1.zip`. Chỉ kiểm tĩnh và phép tính tham chiếu; chưa có engine test, mô phỏng hoặc playtest.

## 2.1 — 07/11/2026

Đối chiếu U10 Bổ sung02 với baseline2.0; giữ các lựa chọn đã có, không trả toàn bộ dự án về trạng thái chưa quyết.

- Thêm prototype-readiness, tóm lược nguồn U10 (ghi rõ không nguyên văn), S00 first-foundation JSON và13 expected outcomes BS-T chưa chạy.
- B23–B28 nối quyền trung lập/site, nhiều phe qua các trận hai bên tuần tự, nợ cap sau ân hạn, hỗ trợ khác nhánh/damage snapshot, pipeline bonus cộng và vòng đời NPC. Số preset là giả thuyết của Codex theo U09.
- Chọn160 cho ví dụ base100/Great40%/research20% hợp lệ; trần40% chỉ phần Đại thành, scope không lan sang mỏ. Thuế/An dân còn hoãn.
- S00 dựng sẵn64²: vị trí/kho/quân/cầu/nguồn/guard khai rõ; còn thiếu fixture combat/đói/tech/schema trước chạy. Không gọi JSON là game có thể chơi.
- BUILD-01–05 giữ vòng thành thứ hai trước research sâu, phân biệt asset giai đoạn2 với các lát cắt gameplay.
- Không bật bốn state ngoại giao, Thanh tẩy/Nguyền hoặc du mục từ checklist; không thêm asset. Manifest/roster/layout giữ nguyên byte.
- Lưu39 file trước sửa vào archive/crownlands-design-v2.0.zip, giữ nguồn/review/proposal cũ. Kiểm lại links, mã, hash và đường đi tĩnh; chưa có test engine/ảnh/gameplay.

## 2.0 — 07/11/2026

Theo U09, chốt baseline B01–B22 để kết thúc giai đoạn thiết kế và chuẩn bị giai đoạn 2 — asset. Không sinh ảnh hoặc viết game trong lần này.

- Chọn web offline desktop, đồng hồ pause/tua/save, thế giới giữ qua bản lưu; không server nhiều người.
- Khóa layout 14 ô nhà + 16 ô tài nguyên (4 mỗi loại), cấp 20, nhà ba mốc hình; thay mẫu18 ô/field_cap10 cũ có ghi rõ.
- Chọn năm dòng, I–V, IV/V ba đường; core 14 profile, kiến thức đế chế/một dự án/cơ sở địa phương và nâng theo lô còn sống.
- Chốt quỹ/Hộ trận/Phá ấn/Quân chế và một quy trình tiếp quản; site-only combat, patrol trước/tàn quân sau, du mục hoãn. Các số vẫn cần hiệu chỉnh.
- Tạo final-design, art-bible, calibration-register, asset-production-plan, manifest 189 output dự kiến (16 proof + 134 core + 39 expansion), roster, layout và hai brief. Mọi asset planned; chưa có mẫu duyệt.
- Kết sổ P01–P20/O01–O38 thành quyết định/hiệu chỉnh/hoãn, giữ D01–D33 và thêm D34 ủy quyền. Các file hiện hành không tiếp tục gọi toàn bộ lựa chọn là đề xuất.
- Lưu 29 file bản 1.3 trước sửa trong `archive/crownlands-design-v1.3.zip`; giữ nguyên reviews/proposals/U08 và bảy reference-docs.
- Phân biệt 4 giai đoạn sản phẩm với A1/A2′/L/B gameplay và proof/core/expansion asset. Không tuyên bố có test game hoặc playtest.

## 1.3 — 07/11/2026

Tiếp nhận [nguồn U08 nguyên bản](sources/2026-11-07-offline-design-addendum.md), lấy review C07 rồi Codex phản biện/tổng hợp tại C08. Giữ nguyên bảy nguồn v1.0 và attachment đã lưu bằng hash.

- D29–D33 ghi mức hướng: quân tiến hóa, Học viện, Thánh/đối lập có năng lực, NPC có phe/quan hệ và lưu động. Không tự duyệt tên, từng skill, I–V/IV–V ba đường hoặc cap mobile.
- Thay khuyến nghị Paladin thuần quân sự/hoãn phép của 1.2; giữ lịch sử review để tra, không dùng làm giới hạn mới.
- Thêm `combat-abilities.md` và `mobile-npcs.md`; cập nhật các tài liệu chính, P16–P20, O34–O38 và N15–N20.
- Quỹ bảo hộ thử dùng chung có sổ trừ/đối xứng; bucket hồi bảo toàn qua tách/gộp/chuyển và không sớm hơn mốc cũ. Cách xử lý nguồn chết là mặc định thử riêng của Codex, có ghi khác reviewer.
- 45 profile là phép đếm có điều kiện, không scope bắt buộc. Ứng viên A2′ có 14 profile; L một đoàn có căn cứ; B nhiều phe và case tàn quân. Chưa tạo asset, code hoặc số cân bằng mới.
- Đoàn dùng mission và hành quân tới địa điểm; không có trận giữa đường ở bản thử, chưa giả vờ đã có cướp xe/hộ tống/truy đuổi theo đoạn.
- Tách mất một gốc với mất hết thành. Du mục cần nguồn riêng khai báo, không cấp suất mới cho người chơi hoặc tàn quân.
- N1–N15 trong C07 là ca chưa chạy, không cùng mã bất biến N01–N20. Sửa tiêu chí dài hạn theo số đối tượng/event sống và tăng lịch sử có lý do, không đòi save byte phẳng.
- Chỉ kiểm tra tính nhất quán tài liệu, link/mã và hash. Chưa mô phỏng, playtest, benchmark; đồng thuận thiết kế không chứng minh game vui/cân bằng.

## 1.2 — 07/11/2026

Biên tập bộ hiện hành theo offline một người sau hai vòng review chinh phục Codex–Claude và một vòng bổ sung quân/nghiên cứu. [Biên bản tổng hợp](reviews/2026-11-07-cross-review-resolution.md) ghi nguồn, điểm đồng thuận, phán định cuối của Codex và giới hạn.

- D28 ghi đổi hướng, giữ lịch sử qua save; không yêu cầu login/server/PvP/bất hoạt hoặc mô hình thu tiền.
- Tạo khung lối chơi và đặc tả quân/nghiên cứu đề xuất; cập nhật luật nền, thế giới, NPC, kỹ thuật, UI và lộ trình, bỏ yêu cầu đồng hồ máy chủ và tiến trình ngoài giờ chơi.
- Tách sở hữu/kiểm soát/thủ quân/job tiếp quản/phục hồi; vây chỉ cắt nguồn thật sự mất kiểm soát. Luật cửa, ngưỡng lực giữ và hủy tiếp quản là preset chưa duyệt.
- Thống nhất đọc công phá/vây là cách tạo tình thế, không ba hệ đổi chủ. Hoãn đầu hàng có điều khoản/chư hầu/bồi thường; rút quân thường vẫn có thể tạo kết quả chiếm không diệt hết thủ quân.
- Lưu U07 và review quân; thêm P11–P15, O28–O33 và N11–N14. I–V, nghiên cứu toàn đế chế và Paladin chưa thành quyết định D.
- Scope đề nghị A1 vòng lõi, A2 tiến hóa I–II (III giới hạn nếu cần), B hai vương quốc. Không bắt làm đủ 25 profile/sáu cây trước vòng chơi.
- Quân đang nâng vẫn bị đánh; kiểm tra casualty/hoàn/hủy/suất. Không chốt đường nâng luôn phải rẻ/nhanh hơn tuyển mới; tránh một đường áp đảo mọi chi phí.
- Kỹ thuật chuyển sang đồng hồ mô phỏng, sự kiện theo pha, command cửa an toàn và save nguyên vẹn. Preset công việc → quân/trận → hàng → đói → tiếp quản → quyết định → cửa lệnh/lưu còn thử nghiệm.
- T95 và bài tài khoản phụ/người thật bất hoạt không còn áp dụng, không tái dùng mã. Giữ test tài sản/save và thêm case review để triển khai sau.
- Tất cả kiểm chứng game/mô phỏng/playtest/benchmark vẫn chưa chạy. Lần này chỉ kiểm tra biên tập, liên kết, mã và hash bảy nguồn giữ nguyên.

## 1.1.1 — 07/11/2026

Lưu bảy ý tưởng tham khảo U04 vào `proposals/2026-11-07-hard-choices.md`; thêm đường dẫn ở README. Không sửa quyết định D, đặc tả đang áp dụng hoặc phạm vi MVP.

- Ghi đủ dự bị/tổng động viên, trực trị/tự quản, khai thác/cảnh giới, vòng đời mỏ, cung ứng dài hạn, rút bỏ có tổ chức và thủ đô dự phòng.
- Phân biệt nội dung đầu vào với nhận xét biên tập, ghi rủi ro, quyết định còn thiếu và bài thử cho từng ý tưởng.
- Làm rõ rút bỏ một phần đất không tự cấp quyền tái lập; trường hợp bỏ thành cuối cần khớp D17/D18/O01.
- Giữ toàn bộ ở mức đề xuất. Chưa có phản biện riêng của Claude, mô phỏng hoặc triển khai cho bảy ý tưởng này.

## 1.1 — 07/11/2026

Lập bộ Markdown trong `project-docs` sau khi tham khảo phản biện của Claude. Giữ bảy file trong `reference-docs` làm nguồn; không chỉnh Word, bảng tính hoặc PDF gốc.

### Ghi nhận lựa chọn mới

- Thế giới tồn tại lâu dài, không reset tiến trình theo mùa bắt buộc; D19 làm rõ phần định hướng của O02.
- Thang 1–20 cho các nhóm đã nêu, còn mở ý nghĩa từng thang và ô tài nguyên.
- Quân chiếm giữ/khai thác ngoài thế giới; hạn mức quân theo thành.
- Đại thành NPC, quyền vùng khác sở hữu thành, khả năng dời trung tâm.
- Thưởng Đại thành B giữ nguyên tối đa 20% toàn đế chế + 20% vùng, tổng 40% cơ bản, cộng và không lặp.
- NPC có hướng chủ động và mở rộng vượt khả năng thực tế phải có đánh đổi.

### Tiếp thu và làm rõ

- Tách chi phí mở mới, duy trì và mặt trận; bổ sung ca đế chế lớn đã ổn định, không chỉ mở nóng.
- Phân biệt quân số, suất, hạn mức gốc, sức chứa và khả năng nuôi. Chuyển gốc theo cohort được đề xuất để không mất nguồn khi gộp quân.
- Tách sức khai thác, lực giữ, lương và vận tải; phân biệt nguồn tạo mới với chuyển tài sản.
- Giữ các điều kiện thưởng, mô hình quản trị, trọng số quân, hồi mỏ và chuyển biên chế ở trạng thái đề xuất/chưa quyết.
- Ghi rủi ro của chính giải pháp reviewer: quấy rối nhỏ gây ngưng thưởng và ân hạn tạo thưởng trùng hai chủ.
- Làm rõ hàng đợi CHỜ không có thời lượng hoàn tất cố định trước lúc bắt đầu chạy.
- Bổ sung O17–O27, ràng buộc N01–N10, công việc A01–A08, kiểm thử T71–T96 và kịch bản S14–S15. Giữ mã cũ để truy nguồn.
- Ghi các lệch với bảng tính/đầu vào: `field_cap` mẫu 10, quân số minh họa không khớp kinh tế mẫu, thiếu CSV fixture đi kèm.

### Cập nhật bản đồ theo phản hồi

- Thành trên bản đồ thế giới dùng icon nhỏ; cảnh thành chi tiết mở riêng.
- NPC cần có loại, huy hiệu, hạng và tình báo theo quyền; không chỉ là một thành giống người chơi.
- Giữ ba mức zoom, tách lớp vùng hành chính và chủ quyền.
- Hai ảnh sinh thử chưa được duyệt thành chuẩn mỹ thuật, dữ liệu thế giới hoặc asset sản xuất.

### Chưa thay đổi trạng thái thành đã duyệt

Cloudflare + PostgreSQL, MVP chỉ PvE, số người thử, trần số thành, giới hạn mặt trận, giờ nghỉ, thuế/An dân, NPC phục quốc, nhập thành và chuyển tài khoản bất hoạt thành NPC.

### Phạm vi kiểm tra lần này

Kiểm tra bộ file, liên kết nội bộ, trạng thái quyết định và hash nguồn sau khi biên tập. Đây là kiểm tra tài liệu, không phải kiểm thử logic game, tái tính bảng cân bằng, mô phỏng hoặc benchmark hạ tầng.

## 1.0 — 06/11/2026

Hồ sơ nguồn gồm năm DOCX, bảng cân bằng XLSX và PDF tổng hợp mang tên Tam Giới Khai Quốc. Được giữ nguyên trong `reference-docs`; tra [danh mục nguồn](README.md) để mở từng file.
