# Sổ quyết định Crownlands

Phiên bản 2.3 · 10/11/2026 · Theo [bản chốt](final-design.md).

## 1. Thẩm quyền và hiệu lực

**D35 — U11: chủ dự án yêu cầu review với Claude rồi chốt phần đủ rõ,10/11/2026.** B29–B33 là lựa chọn coordinator sau [review](reviews/2026-11-10-research-and-economy-claude-review.md) và [resolution 2.3](reviews/2026-11-10-research-and-economy-resolution.md). Số cấu hình là preset, cổng luật chưa đủ không gọi là CAL. Bảo dưỡng và vận hành mở rộng chốt hướng nhưng chưa thu phí; đây là phân kỳ công khai, khác ưu tiên làm sớm trong nguồn. B01–B28 kế thừa 2.2 trừ làm rõ tại 2.3.

**D34 — Chủ dự án ủy quyền chốt phương án và bộ docs để chuẩn bị giai đoạn asset (U09, 07/11/2026).** B01–B28 là quyết định triển khai do Codex chọn theo yêu cầu này sau review chéo, có hiệu lực ở bản hiện hành; B23–B28 nối luật từ U10 ở v 2.1. Các số chưa thử được chuyển sang CAL01–CAL15, không đổi tên thành “đã cân bằng”. Không cần chờ chốt lại từng đề xuất cũ để sản xuất proof.

Nguồn U08 giữ nhánh có năng lực và NPC lưu động. Bản offline thay yêu cầu nhiều tài khoản/server trong hồ sơ đầu. Bằng chứng review là lập luận, chưa phải kết quả mô phỏng.

## 2. Lịch sử hướng D01–D33

Bảng giữ mã và nội dung để truy nguồn. Đọc cách áp dụng hiện hành ở phần B bên dưới; các khoảng hở trước đây đã được xử lý hoặc đưa sang hiệu chỉnh/hoãn. D10/D11 áp dụng trong bối cảnh một người và NPC, không khôi phục multiplayer.

| Mã | Hướng đã ghi nhận |
|---|---|
| D01 | Webgame chiến thuật xây dựng và điều hành đế chế |
| D02 | Thành có bố cục tròn |
| D03 | Xây trên vị trí cố định, không kéo thả tự do |
| D04 | Một phong cách kiến trúc chung |
| D05 | Hình ảnh đồng nhất, sắc nét |
| D06 | Bốn mùa cảnh quan rõ rệt |
| D07 | Năm quân: kiếm, giáo, cung, kỵ, voi; có tương khắc |
| D08 | Bố trận trước, hệ thống tự giải quyết trận |
| D09 | Kết quả bằng báo cáo, không hoạt cảnh chiến đấu |
| D10 | Mỗi người một đế chế, không bang hội, quân hoặc kho chung |
| D11 | Ngoại giao cá nhân như thư và thỏa thuận |
| D12 | Điều quân ra ngoài và lập trại tiền phương |
| D13 | Trại không có thành, phòng thủ yếu hơn thành |
| D14 | Quân trong trại cần lương và tiếp tế vật lý |
| D15 | Nhiều thành, lãnh thổ có màu trên bản đồ lớn |
| D16 | Có thể chiếm thành khi thỏa điều kiện, không chỉ cướp |
| D17 | Có thể bỏ thành, đi xa và tái lập |
| D18 | Thành tái lập giữ 1/2 hoặc 1/3 cấp phát triển cũ |
| D19 | Thế giới tồn tại lâu dài, không reset đế chế theo mùa bắt buộc; lịch sử tiếp diễn |
| D20 | Công trình, thành, mục tiêu NPC, thành bỏ hoang và Đại thành theo thang 1–20 |
| D21 | Quân chiếm giữ và khai thác điểm tài nguyên ngoài thế giới |
| D22 | Mỗi thành có hạn mức quân; phát triển thêm thành để mở rộng quân đội |
| D23 | Có Đại thành NPC là trung tâm cai trị vùng; không tự sở hữu thành người khác trong vùng |
| D24 | Có thể dời trung tâm đế chế về Đại thành sau khi chiếm |
| D25 | Thưởng Đại thành B: tối đa +20% toàn đế chế, thêm tối đa +20% trong vùng hợp lệ, tổng không quá +40% sản lượng cơ bản tại một nơi |
| D26 | NPC có thể chủ động quấy nhiễu |
| D27 | Mở rộng vượt khả năng giữ, nuôi và cai trị phải có đánh đổi; không phạt theo mốc số thành tùy tiện |
| D28 | Một người chơi offline xây đế chế trong thế giới tiếp diễn qua bản lưu, đối đầu/cạnh tranh với các vương quốc NPC |
| D29 | Quân tiến hóa rõ về trang bị, hình dáng và khả năng chiến đấu |
| D30 | Có Học viện/nghiên cứu liên kết trang bị, huấn luyện, hậu cần và chinh phục |
| D31 | Có nhánh Thánh và nhánh đối lập, năng lực riêng và cách đối phó |
| D32 | NPC có phân loại/phe/khuynh hướng/quan hệ khác nhau, không một khối chung |
| D33 | NPC có lực lượng lưu động, không bắt buộc ở thành/trại cố định |

## 3. Quyết định triển khai hiện hành

Chi tiết, ngoại lệ và ranh giới đọc trong [baseline](final-design.md). B01–B33 là namespace quyết định baseline hiện hành, khác các đầu việc R05:B01–B26 trong hồ sơ gốc. B01–B22 đã chọn ở 2.0; B23–B28 thêm ở 2.1 theo U09 sau đối chiếu U10 và được khép ở 2.2 sau review C09 (lựa chọn C10 của Codex). Chốt luật không có nghĩa đã kiểm chứng số thử.

| Mã | Phạm vi |
|---|---|
| B01 | Web offline một người, 2 D, desktop |
| B02 | Pause/tua/đóng/lưu theo đồng hồ mô phỏng |
| B03 | Ô vuông 64² thử, 128² khuôn đầu; chưa hải chiến/đường |
| B04 | 14 ô nhà, 16 ô tài nguyên, ba mốc hình, cấp 20 |
| B05 | Năm dòng I–V, IV–V ba đường, core 14 profile |
| B06 | Kiến thức đế chế, một dự án, cơ sở và kho địa phương |
| B07 | Suất có trọng số, gốc/sức chứa/nuôi tách biệt |
| B08 | Nâng lô còn sống, thủ quân bậc cũ, giữ suất tăng |
| B09 | Bố trận 3 ×3, ba năng lực lõi, báo cáo |
| B10 | Quỹ hữu hạn dùng chung, hồi bảo toàn qua tách/gộp/chuyển |
| B11 | Ma trận dấu theo dòng, nhánh không sửa K |
| B12 | Một quy trình tiếp quản, kiểm soát/cổng/kho/xe thật |
| B13 | Phe/nhánh/quan hệ độc lập, tên nội dung và AI có nguồn |
| B14 | Mission tới địa điểm, patrol trước, tàn quân sau, du mục hoãn |
| B15 | Mốc thắng tự nguyện, tiếp tục sandbox, không tăng sức bí mật |
| B16 | Tái lập 1/2 chủ động, 1/3 mất cuối; không nhân tài sản |
| B17 | 20/20/40 cộng trên nguồn sản xuất thành, không lặp |
| B18 | Danh mục hệ thống hoãn khỏi lõi |
| B19 | Mỹ thuật/camera/nhận diện theo art bible |
| B20 | 14 profile / 10 nhà / ba mốc / bốn tài nguyên |
| B21 | 16 proof → core → expansion; không nhân rộng trước duyệt hình |
| B22 | Quản trị thay đổi cấu trúc và hiệu chỉnh số |
| B23 | Trung lập/quyền site, site không transit, tuyên chiến, các trận hai phía tuần tự, assault tách lệnh, site trống về custody |
| B24 | Mất gốc/vượt cap, đợt nợ theo nguồn gốc, job pause/resume, phụ phí lương sau ân hạn |
| B25 | Hộ trận hỗ trợ cùng chủ bất kể nhánh, damage snapshot/casualty đồng thời, phần dư hấp thụ tất định |
| B26 | Bonus cùng base, scope riêng, research 0 trong core, kho net-rồi-clamp theo đoạn |
| B27 | Settled/landless/defeat/dormant/archive, đói hữu hạn, nguồn NPC và trần planner |
| B28 | S00 khởi đầu, bố trí/guard/ai_budget thử/thành tựu và không tech-gate vòng chiếm đầu |
| B29 | Cap theo nhà binh, cơ sở/nghiên cứu/công huấn luyện; nội suy và giữ công lẻ |
| B30 | Sổ raw/giữ/chi/chuyển; trả trước, core chưa giữ nguyên liệu hoặc hoàn chi quá khứ |
| B31 | Hành trang Army, nguồn nuôi dự phòng, cargo dỡ phần còn chỗ, hàng kẹt có sổ |
| B32 | Nợ đói theo bucket, không bình quân/reset/tính hai lần |
| B33 | Vận hành/bảo dưỡng phân kỳ 0, vật tư D1 một lần/assault, cổng trước kích hoạt |

B04 chủ động thay mẫu 18 ô tài nguyên và `field_cap=10` cũ bằng 16 ô / cấp 20. B16 chọn rõ điều kiện 1/2–1/3. B05/B06/B10/B12 thay các khuyến nghị cũ Paladin thuần quân sự, nghiên cứu từng thành, nhiều đường đổi chủ hoặc kỹ năng chưa có quỹ. Các thay đổi này không sửa file nguồn.

## 4. Kết sổ đề xuất P01–P20

Giữ mã để không làm đứt dẫn chiếu trong review, không còn bảng “tất cả đều đề xuất”.

| Mã lịch sử | Xử lý v 2.0 |
|---|---|
| P01 | Chọn B07 |
| P02 | Chọn B07; trọng số CAL02 |
| P03 | Chọn phục hồi B12/B17, đường đóng góp CAL09; không nhân thanh quản trị |
| P04 | Hoãn B18 |
| P05 | Chọn B12; dự báo từ số ruleset |
| P06 | Chọn trần/kho B04, hoãn cạn/hồi chu kỳ |
| P07 | Chọn B17; bỏ yêu cầu kết nối chưa có luật |
| P08 | Chọn B02 |
| P09 | Lịch sử/báo cáo và mốc B15; không bonus sức mạnh |
| P10 | Vai trò do cơ sở/vị trí, không bonus nghề riêng |
| P11 | Chọn B06 |
| P12 | Chọn B05; 45 dài hạn, 14 core |
| P13 | Chọn B08 |
| P14 | Chọn B02 |
| P15 | Chọn B12 |
| P16 | Chọn B05/B13 |
| P17 | Chọn B09/B10 |
| P18 | B14 chọn căn cứ/tàn quân, hoãn du mục |
| P19 | Chọn B08/B10 |
| P20 | Chọn B13 |

## 5. Kết sổ vấn đề O01–O38

“CAL” bên dưới là [nhóm hiệu chỉnh](calibration-register.md), không là quyết định cấu trúc còn treo. Tính năng hoãn không được lén trở lại scope core.

| Mã lịch sử | Xử lý / nơi còn phải đo |
|---|---|
| O01 | B16; thời gian/nguồn khởi lập CAL13 |
| O02 | B15; không reset |
| O03 | B03/B12; quyền site, chưa terrain chokepoint |
| O04 | CAL10; không chặn asset |
| O05 | B12 trinh sát/xe, công thành mới hoãn B18 |
| O06 | B12; ngưỡng/thời lượng CAL09 |
| O07 | Chợ/hợp đồng hoãn B18 |
| O08 | B04/B08; giá/rate CAL01 |
| O09 | B12; số chính sách từ ruleset |
| O10 | Thứ tự khóa tại technical-design §4 |
| O11 | Offline pause/B16; nội dung hướng dẫn CAL14 |
| O12 | B06/B16 giữ kiến thức, không tự hoàn thành nhà chưa xây |
| O13 | B12/B13/B23; chỉ neutral/hostile, đầu hàng/hiệp ước hoãn |
| O14 | Chỉ cảnh quan; thời lượng CAL14 |
| O15 | B01/B02; ghi local/import/export, chi tiết engine CAL15 |
| O16 | Ngoài phạm vi game cá nhân |
| O17 | B04/B07; trọng số CAL02 |
| O18 | B07/B08/B24; gán nguồn không tạo cap, nợ có hậu quả |
| O19 | CAL07; tách sức chứa, không xóa quân vượt trần |
| O20 | B04/B12; không cạn/hồi ở core, CAL08 |
| O21 | B17; thời điểm CAL12 |
| O22 | Đổi trung tâm hành chính, không nhập cấp/kho; nhập thành hoãn |
| O23 | B13/B14; ngân sách CAL11 |
| O24 | B04; hạng NPC CAL06 |
| O25 | Thanh quản trị hoãn B18 |
| O26 | Abandoned site có nguồn scenario; di dân B16, không xóa để né vây |
| O27 | B03/B28; S00 vị trí dựng sẵn, thế giới lớn CAL11 |
| O28 | B05/B11; 14 roster, stats CAL02/CAL03 |
| O29 | B06; các tech/điều kiện số CAL04 |
| O30 | B08; chi phí CAL04 |
| O31 | B12; gate/nguồn hàng, CAL09 |
| O32 | B02 và technical-design §4; migration CAL15 |
| O33 | B15/B16; chư hầu hoãn |
| O34 | B05/B06/B08 |
| O35 | B09/B10/B25 và combat-abilities; quỹ/hồi CAL05 |
| O36 | B14/B27; nguồn/vòng đời rõ, du mục hoãn |
| O37 | B03/B14; chỉ tại site, không trận giữa đường |
| O38 | B13/B14; quan hệ trung lập/thù địch, CAL11 |

## 6. Quy tắc thay đổi sau khi chốt

Thay line/path/tier/slot/camera/resource hoặc thêm cơ chế tác động asset: ghi quyết định thay B, bump version và danh sách file/ảnh bị ảnh hưởng. Điều chỉnh giá/rate/weight/cooldown: version ruleset và ghi kết quả ở sổ hiệu chỉnh. Không thay ngầm 20/20/40, không thêm dòng quái vật thứ sáu, không dựng UI cho tính năng hoãn.

Các số minh họa 50.000/150.000 quân, trần 5–12 thành, giới hạn mặt trận, giờ nghỉ, server p 95 và Cloudflare+Postgres không là luật v 2.0. Hai concept cũ chưa duyệt; proof sẽ là lần duyệt hình cụ thể đầu tiên.


## 7. Phạm vi bổ sung U10

[Đối chiếu BS-01–BS-10](prototype-readiness.md) phân biệt điều đã có từ 2.0, luật nối 2.1, số thử và phần hoãn. U10 không trực tiếp duyệt mọi đề xuất trong bản tổng hợp, không hủy B01–B22. Giao thương/đình chiến/thuế/An dân/Thanh tẩy/Nguyền/du mục còn hoãn. Chỉ số trong S00 là giả thuyết thử của Codex, không số được người dùng/Claude xác nhận.

Bản 2.2 (10/11/2026) tiếp thu [Claude review 2.1](reviews/2026-11-07-supplement-02-claude-review.md) theo [resolution](reviews/2026-11-10-supplement-02-resolution.md): không thêm B29, hệ thống hoặc asset. Phân bổ phần dư B25 theo lượng damage/hấp thụ và assault tách lệnh B23 là lựa chọn của coordinator, khác một phần đề nghị của reviewer.

## 8. Kết sổ U11 /2.3

[Nghiên cứu và kinh tế](research-and-economy.md) là đặc tả hiện hành B29–B33. Phương án RC01–RC10 trước review và các bản tuyển lần 1–3 giữ lịch sử; không ghi đè bản chốt. Core chọn trả trước dù nguồn mô tả trả dần; không hoàn raw đã chi. Một dự án nghiên cứu, scope địa phương không phí áp dụng lần 2; trần+60%/cap 2.500 là preset của coordinator. Bảo dưỡng gỗ/sắt, phí mọi nhà, hao hụt vô điều kiện, thuế/An dân còn hoãn. S00/runtime không được thay trong lần chốt docs này.
