# Nghiên cứu, tuyển quân và sổ thu–chi

Phiên bản 2.3 · 10/11/2026 · **Đặc tả thiết kế hiện hành B29–B33**, theo [baseline](final-design.md) và [resolution sau Claude](reviews/2026-11-10-research-and-economy-resolution.md). Không tuyên bố những chức năng dưới đây đã có trong app.

## 1. Bốn trạng thái cần phân biệt

| Nhãn | Ý nghĩa |
|---|---|
| Thiết kế đã chốt | Quy tắc phần triển khai phải tuân theo; đổi cần version/ghi quyết định |
| Preset CAL | Số cấu hình để thử, chưa cân bằng; thay số không đồng nghĩa đổi cơ chế |
| Cổng luật | Chưa có đủ định nghĩa để bật một module; không giấu thành “chỉ còn chỉnh số” |
| Đã triển khai | Có code và bằng chứng đúng phạm vi trong `implementation`; không suy từ docs |

S00 `0.2-draft/design2.2` và app nền 0.2 là fixture/subset cũ được giữ nguyên. Học viện, quân đội di chuyển/cargo/chiếm, nghiên cứu và D1 chưa tự xuất hiện do docs 2.3. Migration/runtime mới phải có validator và test riêng trước bật.

## 2. Học viện, kiến thức và huấn luyện — B29

Một dự án nghiên cứu toàn đế chế, một Học viện chủ trì trả chi địa phương. Cấp Học viện mở quyền nghiên cứu, không tự hoàn công nghệ. Kiến thức xong dùng chung/giữ khi mất Học viện; dự án dở bị hủy khi mất nơi/quyền, không cấp công nghệ cho chủ mới, không hoàn chi đã tiêu.

Core không tăng tốc bằng nhiều Học viện, không research tăng tốc research hoặc trả phí “áp dụng” lần 2. Cơ sở địa phương phải đủ cấp/kiến thức để tuyển/nâng; nghiên cứu không tự trang bị lại quân đang có. 12 nhóm khoa học là danh mục dài hạn, không 12 cây cần làm trước vòng chơi.

Nguồn biên chế thành lấy từ cấp Doanh trại. Quân đi xa, giữ mỏ, nâng và tuyển giữ chỗ vẫn tính gốc theo B07/B24. Năng lực nơi đóng, lương và sức chở là ràng buộc riêng. Không cộng quota trùng từ Chuồng ngựa/Trại voi; những nhà đó chi phối dòng phù hợp.

`thời gian = công gốc của profile/job × hệ số cơ sở / (1 + thưởng huấn luyện đã hoàn tất)`

Thưởng áp cho job tuyển và huấn luyện/nâng đủ điều kiện, không tự giảm giá/lương hoặc tăng cap. Bậc/profile có công gốc riêng; nâng có công nguồn–đích riêng. Mức cao nhất trong họ công nghệ có hiệu lực, không cộng lại mọi mức tiền nhiệm. Cơ sở/công nghệ đổi chỉ ảnh hưởng phần công từ mốc đó, không hồi tố, cấp trùng quân hoặc trả tiền lại.

**Số thử** ở [preset](prototype/research-economy-preset.json): cap 200→2.500 suất, cơ sở kiếm I 40→32 giây, research tối đa+60% tốc độ cho 20 giây ở mốc cuối. Không phải lệnh user về con số. Nội suy tuyến tính từng đoạn; cap bội 10, hệ số hữu tỷ. Cấp 0 cap 0, quân thiếu gốc xử lý B24. S00 cũ chưa dùng đường cap này; không tự thay quota NPC mà gọi đó là cùng fixture đã kiểm.

Công còn lại dùng fixed-point/hữu tỷ và giữ phần dư qua quân/job đã xếp. Tick hoàn là ceil của mốc lũy kế. 1.000 kiếm tại nhà 5/công nghệ I: ceil(38.000/1,1)=34.546 giây, không 35.000. Công đã làm tới T giữ tốc độ cũ, năng lực mới từ T, độc lập FPS/speed/save.

## 3. Khoản giữ và chi trả — B30

| Khái niệm | Quy tắc |
|---|---|
| `on_hand` | Raw thật ở một inventory; sức chứa áp cả phần đang cam kết |
| `reserved` | Phần con của on_hand chưa được tiêu; không là tài sản cộng thêm |
| `available` | on_hand−reserved, không âm |
| `spent` | Raw đã trả/tiêu cho một tác động có lý do, không còn trong kho |
| `in_transit` | Raw đang thuộc một Shipment, chưa cộng kho nhận |
| `army_inventory` | Raw do Army mang tại vị trí của Army, không là Shipment tự giao |

Core **trả đủ trước** cho tuyển/nâng/nghiên cứu/xây khi nhận lệnh hợp lệ. Lệnh đã trả không giữ nguyên cùng raw trong kho. Hiện core chưa có reservation nguyên liệu; chỉ có giữ biên chế. Hợp đồng/kế hoạch giữ nguyên liệu là module sau; cần commit/release/quyền khi đổi chủ trước khi dùng.

Nghiên cứu/xây “trong một giờ” là tổng chi rời rạc ở mốc nhận lệnh trong giờ ấy, không phí tự trừ mỗi giờ sau đó. Giá đã trả chụp trong job/ledger; công nghệ giảm giá về sau không hoàn lại quá khứ. Hệ thống hủy job không hoàn chi đã tiêu; trả suất giữ hợp lệ một lần. Hủy chủ động/hoàn raw cho việc chưa chạy không thuộc core 2.3; mở sau cần luật đối soát, sức chứa và chống tích trữ ngoài kho.

Dự trữ sàn là policy hạn chế nhận **việc tự động mới**, không kho khác và không thêm tài sản. Không tự chi khoản cam kết cho mục đích khác mà không giải phóng/hủy đúng luật. Cảnh báo rủi ro không đồng nghĩa cấm mọi kế hoạch làm ròng lương âm.

## 4. Dòng tài sản và nguồn nuôi — B31

Ledger phân biệt đầu tư, vận hành, duy trì quân, chuẩn bị/tiêu hao trận; cùng với production, chuyển, thu giữ/cướp, hỏng/phá và chủ động hủy. Không gộp 4 tài nguyên thành một đồng tiền. Raw đã đầu tư thành quân/nhà/dự án không đồng thời là raw trong kho; mất quân không tự phát sinh một bộ trang bị thay thế.

Kho thuộc địa điểm, gốc của quân chỉ quản lý biên chế. Lương cho quân theo inventory có quyền truy cập:

1. Đang hành quân hoặc ở nơi không có quyền dùng kho: ăn từ hành trang của Army.
2. Đóng ở site cùng chủ có quyền truy cập: kho site trả trước, hành trang bù phần nhu cầu còn lại.
3. Tổng không đủ: ghi unmet đúng bucket và cập nhật thiếu lương B32. Không vay/teleport từ gốc.

Mỗi quantum nhu cầu được trả đúng một lần; không trừ toàn bộ từ cả kho và hành trang. Cần phân bổ kho chung theo nhu cầu/key ổn định trước phần bù từ từng Army, không để Army duyệt đầu giành hết. Không có quyền sử dụng hành trang của Army khác chỉ vì cùng tọa độ. Đổi nguồn khi đi/đến/chết từ đúng mốc, không trôi phí trong lúc đóng game.

Không tự dỡ hành trang vào kho khi quân tới: giữ sức chứa/khoảng cách đúng. Nếu Army chết hết, hàng còn lại thành container tại cùng site/khu vực dưới custody thế giới; claim/load theo quyền tiếp cận B12/B23, không nhân/xóa/cộng thẳng người thắng hoặc cho outer holder lấy loot nội thành chưa chiếm. Payload vượt sức chở không bị xóa tùy tiện; hành trình mới cần đủ tải hợp lệ trước xuất phát, xử lý tải giảm sau thương vong phải có chính sách hạ tải/đứng lại rõ trong engine.

## 5. Giao hàng và kho đầy — B31

Pha 3 sau giao chiến kiểm chủ/cổng/quyền/sức chứa. Xe cùng mốc theo sequence đã lưu. Từng loại dỡ `min(payload, cap−on_hand)`; phần dư vẫn trên xe. Phần giữ nguyên liệu nếu có vẫn nằm trong on_hand nên không tạo chỗ trống giả.

Phần không giao theo B12: về nguồn một lần; nguồn không hợp lệ/không nhận được tìm nơi cùng chủ hợp lệ, không có thì kẹt và báo. Không lặp chuyến miễn phí, mất hàng ngầm, kho tạm vô hạn hoặc tự đổi chủ hàng. Đã dỡ bao nhiêu thì chỉ phần dư quay về, ghi đối ứng đúng mỗi mốc.

Xe kẹt có thể dỡ lại khi đủ chỗ hoặc chủ hợp lệ chọn **hủy hàng kẹt**, nhìn rõ lượng mất rồi xác nhận. Hủy ghi `discarded` là sink, không vừa sinh loot. Tài sản dormant giữ sổ/ID theo B27, cleanup không tự hủy.

Core không tự áp 5% hao vận tải/hỏng lương. Những mất mát có thể xảy ra phải có nguyên nhân/luật được bật; đánh chặn dọc đường vẫn hoãn. Chuyển hàng không phải tiêu hao toàn đế chế; cướp là chuyển nếu thực sự nhận/mang được, phá là mất thật.

## 6. Thiếu lương — B32

Nợ thiếu lương giữ theo bucket quân; không lấy trung bình/no nhất khi gộp, tách chép cùng trạng thái. Nợ tăng theo phần khẩu phần unmet và game-time; được nuôi đủ thì hồi dần theo 0<ρ≤1 (cấu hình CAL10). Nhận 1 lương chỉ làm giảm đúng phần thiếu đó, không xóa nợ/ân hạn. Giữ trạng thái qua movement, gán gốc, load và tách/gộp.

Thiếu kéo dài dẫn tới hao hụt hữu hạn tới hết quân như B27; tỷ lệ/lịch/ân hạn là CAL10 trước engine. Không vừa áp mất quân do đói vừa xóa thêm cùng phần quân vì nợ biên chế. Dự báo cần ròng hiện tại, lịch đã biết, hàng tới, hàng đợi tăng quân và đường về. Bình quân tuyến đủ không chứng minh xe tới kịp.

## 7. Chi phí mở rộng và thủ thành — B33

**Dùng trước:** lương của quân thật, đầu tư trả trước, chuyển hàng có vị trí, sửa chữa có job khi module hợp lệ. **Thủ thành D1 sau combat nền:** vật tư gỗ/sắt trừ một lần trong commit nguyên tử của assault hợp lệ, theo kíp thật/trần vị trí/cường độ cấp và kho thật; không có trạng thái đã trừ mà trận chưa xảy ra. Không animation/đạn từng mũi/kíp vô hình/phí phép. Chuẩn bị hủy, trận ngoài tường,0 garrison hoặc không có hỗ trợ thì không thu vật tư giả. Hư hại và stock giữ qua trận/đổi chủ, repair không tự đầy.

Tác dụng hỗ trợ, đối tượng công phá, HP/các mặt/cổng và đầy đủ targeting D1 còn là cổng luật trước bật; `1+βs`chỉ là ứng viên review, không gọi đã kiểm cân bằng. Chặn/để quân rút là quyết định của outer holder; không biến nó thành lệnh ép quân thủ rời tường khi bị assault.

**Chốt hướng nhưng chưa kích hoạt:** bảo dưỡng quân ngoài lương, bảo trì nhà/công sự, chi hành chính, hỏng lương. Danh mục/rate có thể có mặc định 0 trong ruleset, nhưng không bắt app hiện tại thêm state 0 hoặc hứa bật sau không cần migration.

Trước bật bảo dưỡng: phải tính mọi tư thế để không né bằng hành quân, có vật tư hợp lệ trong kho/hành trang chiếm tải và hậu quả thiếu/tích lũy/phục hồi giữ bucket. Không chi vật tư xa từ gốc. Trước bật bảo trì: mỗi loại chức năng có hậu quả thiếu/khôi phục rõ; không đồng thời thu lại toàn bộ chiến damage thành cả sửa và bảo trì.

Thuế/An dân/dân sinh và kho cộng đồng, hợp đồng/reservation, học thuyết, research song song, tư liệu nghiên cứu, giảm lương 20% và research bonus kinh tế còn module sau. Giữ nguồn để phát triển, không dùng chúng làm cổng hoàn tất A1. B17 đại thành 20/20/40, B25 quỹ chung và B26 bonus/net-clamp không đổi.

## 8. Thứ tự công nghệ và nghiệm thu

Vòng S00/thành thứ hai không bị khóa sau nghiên cứu sâu. BUILD-04 đầu thử trang bị II/huấn luyện II/mức I tổ chức; cơ sở/chi phí/profile tương ứng phải có fixture. BUILD-05 mở roster 14, tốc độ mức II nếu ruleset chọn. Mức III/IV và công nghệ kinh tế/xe mở sau nền liên quan; không khóa tên 6 tech sơ bộ thành tổng số bắt buộc cho game.

[Preset 2.3](prototype/research-economy-preset.json) cung cấp mốc cap/tốc độ để hiệu chỉnh; giá/time nghiên cứu, công nâng, sản lượng cấp cao và lịch đói chưa đủ chạy. [Các ca RE23](prototype/research-economy-validation.json) là expected outcomes thiết kế, không test engine. Muốn bật module có cổng luật thì hoàn thiện cổng trước, không thay bằng vài số CAL.
