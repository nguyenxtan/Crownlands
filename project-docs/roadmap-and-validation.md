# Lộ trình sau chốt thiết kế

Phiên bản 2.3 · 10/11/2026 · Theo [bản chốt](final-design.md).

## 1. Bốn giai đoạn sản phẩm

| Giai đoạn | Kết quả / trạng thái |
|---|---|
| **1 — Thiết kế và review** | **Đã chốt baseline docs 2.0, luật nối 2.1 và bản khép 2.2** theo U09. Claude review B23–B28/S00 (C09) đã có; Codex chọn cách sửa ở 2.2 (C10), chưa được Claude review lại. Chỉ hoàn thành về tài liệu. |
| **2 — Asset** | **Đang thực hiện proof**: đã có 16 mẫu và gallery/composite; icon lương v 2 được chọn và xuất SVG,15 raster đang chuẩn hóa; chưa sản xuất core hàng loạt. |
| **3 — Prototype có thể chơi** | Chưa bắt đầu. Implement lần lượt A1 → A2′ → L → B, dùng bộ core và placeholder cho phần chưa có. |
| **4 — Hiệu chỉnh và hoàn thiện** | Chưa bắt đầu. Đo CAL01–CAL15, playtest, mở sâu Đại thành/tái lập/bốn mùa, tối ưu và sửa theo dữ liệu. |

Giai đoạn 2 ở đây là bộ asset, không phải A2′ của gameplay. A1/A2′/L/B là các lát cắt khi lập trình, xem [khung lối chơi](gameplay-blueprint.md).

## 2. Cổng giai đoạn 2

[Asset plan](asset-production-plan.md) khóa 16 proof →134 core bổ sung →39 expansion. Làm 16 mẫu đầu và hai preview ghép trước khi nhân rộng. Đạt khi scale world 32 px/city riêng rõ, camera/alpha/anchor khớp, 14 profile nhất quán và file đúng manifest. Không gọi đủ “bộ asset” chỉ vì có một concept đẹp.

Duyệt proof là cổng chất lượng hình cần sản phẩm cụ thể. Các chỉ số số học chưa thử không bắt người dùng chốt lại roster trước khi thử hình. Nếu visual yêu cầu đổi footprint/camera thì ghi thay art contract trước nhân rộng.

## 3. Cổng khi lập trình

- **A1:** đi hết vòng xây → tuyển → chiếm mỏ → chở về → phản công → chiếm thành thứ hai → lưu/tải; không trừ hai lần/nhân tài sản.
- **A2′:** đủ 14 profile, một dự án, nâng/chuyển/cooldown, quân trong job vẫn bị đánh. Thử đối sách cùng ngân sách và chênh bậc.
- **L:** patrol đi 3–4 site, không trận đường, truy đuổi tin hợp lệ và nguồn lương/cap thực.
- **B:** phe thứ hai có lợi ích riêng, không tất cả nhắm người chơi; mất một gốc khác mất hết thành, tàn quân không tuyển miễn phí.
- **Mở sâu:** Đại thành 20/20/40, ổn định, đổi đô/tái lập đúng nguồn; mùa không reset hoặc đổi hitbox.

Trước chạy mỗi lát cắt phải có ruleset với số/đơn vị, fixture và expected outcome. T01–T70 gốc không có đầy đủ CSV trong bảy file nguồn; không tuyên bố fixture tồn tại. Tài liệu không thay cho code/tests.

## 4. Danh mục kiểm theo nguồn

Các ca K1–K12 / C1–C15 / M1–M12 / C07:N1–N15 ở [reviews](README.md) chưa chạy; đọc cùng kết luận B01–B33 thay các ý reviewer đã rút. N01–N20 trong [kỹ thuật](technical-design.md) là mã bất biến, khác N1–N15 của review C07.

Giữ T71–T96 từ bản trước để truy nguồn; các dẫn chiếu P/O trong bảng đọc theo [sổ quyết định hiện hành](decisions.md). T73 thử completion/hủy theo loại job hiện hành (nâng theo lô B08, không bắt hoàn từng lính); T79 chưa có chu kỳ trữ lượng, chỉ trần yield core. T94 kiểm ở controller/UI cục bộ, không đòi API cloud. T95 bị bãi bỏ, không tái dùng mã.

| Mã | Tình huống | Kết quả cần kiểm tra |
|---|---|---|
| T71 | Quân ra trại/mỏ, thành gốc gửi lệnh tuyển tiếp | Không giải phóng suất bằng vị trí, theo B07 |
| T72 | Hai tab tuyển khi gần chạm hạn mức | Chỉ giữ số suất thực sự còn; không vượt do cạnh tranh |
| T73 | Tuyển hoàn thành từng phần rồi hủy/thử lại | Suất giữ chuyển sang hiện hữu đúng một lần |
| T74 | Tách/gộp quân từ nhiều thành | Giữ chủ, số lượng và nguồn gốc; không tạo suất |
| T75 | Hai lệnh chuyển biên chế cùng dùng chỗ trống | Không dùng cùng hạn mức nhận hai lần |
| T76 | Thành gốc đổi chủ khi quân đang đi | Không xóa quân/chuyển quân cho chủ mới; áp preset quá hạn mức |
| T77 | Nhường thành rồi tái lập và tuyển tiếp | Không rửa nguồn hạn mức hoặc cấp hỗ trợ nhiều lần |
| T78 | Nhiều đoàn tới địa điểm sắp đầy | Áp đúng luật O19, không ghi âm hoặc xóa quân tùy tiện |
| T79 | Thêm quân khai thác vượt điểm bão hòa | Không vượt năng suất/trữ lượng của preset |
| T80 | Kho mỏ đầy, hàng không có xe | Hàng không tự về thành; không cấp vượt kho theo luật |
| T81 | Quân rời mỏ đúng mốc sản xuất | Tính theo đoạn; một người không khai thác ở hai nơi |
| T82 | Điểm mỏ đổi quyền khi xe/quân đang tới | Hàng/quân giữ đúng chủ và trạng thái theo O20 |
| T83 | Nhiều Đại thành cùng có hiệu lực tại một nơi | Không cộng lặp; toàn đế chế/vùng/tổng đúng trần |
| T84 | Chuyển chủ Đại thành đúng mốc tính sản xuất | Tính theo đoạn, không thưởng hồi tố hoặc phát hai lần |
| T85 | Dùng 20% và 20% trên cùng cơ sở | Thưởng cộng 40%, không 44%, không tự thưởng lên thưởng |
| T86 | Chủ Đại thành gửi lệnh tới thành khác chủ cùng vùng | Từ chối; quyền vùng không sinh quyền tài sản |
| T87 | Đổi đô liên tiếp hoặc gửi lại cùng lệnh | Không cộng công trình/kho/quân/quyền tái lập |
| T88 | Bật/tắt thưởng lúc bị vây, hồi phục/ân hạn | Không quấy rối nhỏ vô hạn hoặc nhận trùng hai chủ theo preset |
| T89 | NPC phản công và handler chạy lại | Nguồn quân/kho/ngân sách chỉ bị ghi một lần |
| T90 | NPC cạn ngân sách hoặc nguồn hồi | Không tự tạo quân/hàng ngoài nguồn đã cấu hình |
| T91 | Ô rỗng, nhà cấp 1, thành bậc 20, NPC hạng 20 | Không đổi nhầm thang hoặc công thức tái lập |
| T92 | Bốn mùa chuyển trong thế giới đang chạy | Không reset tài sản/chủ quyền hoặc đổi hitbox |
| T93 | Zoom rộng với nhiều thành, mỏ và trại | Nhận ra loại/chủ, nhãn không che; không render nội thành khổng lồ |
| T94 | Chọn NPC chưa trinh sát bằng UI và gọi API trực tiếp | Không lộ quân/kho riêng; tin cũ có thời điểm |
| T95 | KHÔNG CÒN ÁP DỤNG: chuyển tài khoản bất hoạt thành NPC | Bỏ theo D28; không tái dùng mã này cho cơ chế khác |
| T96 | Dừng tiến trình rồi restore cùng lịch/ledger | Đối soát quân, suất, kho, quyền, thưởng và sự kiện |


## 5. Nhóm kiểm bổ sung bắt buộc khi có engine

Thứ tự cùng mốc nghiên cứu/công trình/nâng → giao chiến → hàng → đói → tiếp quản → AI → cửa lệnh/save. Thử hủy/capture/lost-home/casualty/complete/load trùng mốc; nguồn chết/quỹ cùng lượt; tách/gộp/chuyển hồi; same-save/same-rules/same-command time+phase ở các tốc độ; dự báo không sửa PRNG; event cũ vô hiệu; lượng event sống trong trần. Quân không mất vì cleanup hoặc quá sức chứa.

Save phải restore đủ job, reservation, cohort/path/cooldown, quyền/bonus, mission/hàng và lịch. Ghi mới lỗi còn bản trước; export/import trên runtime thật. Không hứa đồng nhất nếu ruleset hoặc thời điểm lệnh khác.

## 6. Playtest và giới hạn chứng cứ

Thử với cả người ít chơi game: họ có chọn được hai phương án hợp lý, hiểu vì sao thua/đói và tự muốn thử lại không? Đo thời gian giữa các quyết định, số lần cần gợi ý, thao tác lặp, chi phí ở nhà so với đi vây. Không lấy đăng nhập vì sợ mất đồ làm chứng cứ game vui.

Cần thử cả đế chế lớn ổn định, không chỉ mở rộng nóng. Được thắng và kết thúc tự nguyện; không thêm phạt bí mật để ngăn thống nhất. Nếu gửi tối đa quân/chờ/nâng bậc cuối luôn tốt nhất, sửa số hoặc luận điểm trước thêm tính năng.

**Có bằng chứng kiểm thử subset kinh tế/tuyển trong implementation; chưa có fullS00/nghiên cứu/AI/combat, playtest hoặc benchmark toàn game.** Kiểm tài liệu/JSON/hash chỉ chứng minh bộ bàn giao nhất quán. Mục tiêu server p 95/RPO/RTO cũ không là cổng bản offline.


## 7. Bổ sung 02 và thứ tự BUILD

[Prototype readiness](prototype-readiness.md) đối chiếu BS-01–BS-10 và định nghĩa BUILD-01–05: nền/save → quân/hậu cần (NPC chưa tấn công) → thành thứ hai/mất gốc/nợ cơ bản/kết A1 → research/nâng/job pause-resume → nhánh/L/B. Ngoài phạm vi: 45 profile, bốn trạng thái ngoại giao, thuế/An dân, Thanh tẩy/Nguyền, du mục, hoàn tất 189 export. Đây là phân rã giai đoạn code, không thay giai đoạn 2 asset và không bắt hoàn tất 189 export trước dùng placeholder thử luật.

[Scenario S00](prototype/scenarios/first-foundation.json) là fixture đặc tả có số thử, chưa chạy. Cần đủ stats/damage/đói/tech/schema trước kiểm gameplay. BS-T01–BS-T13 và RV21-01–RV21-15 ghi expected outcomes và đều chưa chạy. Các checks parse/reference/BFS chỉ nghiệm thu dữ liệu tĩnh; test mất mạng thật, tăng tốc/save, nhiều phe/nguồn NPC, đói/trận/capture vẫn phải thực hiện khi có engine.

## 8. Phạm vi 2.3 sau review Claude

B29–B33 khóa nghiên cứu/biên chế/thu–chi/nguồn nuôi, không đẩy thuế/An dân/bảo dưỡng vào A1. BUILD-04 bắt đầu bằng ba node thử và công huấn luyện chuẩn; BUILD-05 mở rộng roster/nhánh. Tech kinh tế/xe sau khi nền liên quan hoạt động. D1 vật tư một lần sau combat nền, qua G23-03. Các module vận hành/readiness cần G23-01/02, không thu phí trước khi có hậu quả đúng chức năng.

[RE23](prototype/research-economy-validation.json) bổ sung expected outcomes thanh toán/chuyển/nguồn/dỡ/nợ/tech/công lẻ. Đây là ca thiết kế chưa chạy. Giữ T/K/C/M/RV cũ theo đúng phạm vi; dữ liệu static 2.2 không là report 2.3. Xem [báo cáo hiện hành](validation-report.md).
