# Bản đề xuất ban đầu cho Crownlands offline

Ngày 07/11/2026. Người đề xuất: Codex. Dùng làm đầu vào review chéo với Claude, **chưa phải luật đã duyệt**. Chủ dự án yêu cầu hai bên phản biện để tìm một lối chơi có logic, thay vì cộng dồn mọi ý tưởng.

## 1. Hướng mới và nguồn

Chủ dự án đưa hướng mới: một người chơi xây đế chế trong thế giới tồn tại qua bản lưu, cạnh tranh với vương quốc NPC; ưu tiên làm game đúng sở thích cá nhân, không yêu cầu sản phẩm kinh doanh. Đây là bối cảnh thay thế thiết kế nhiều người thật.

Trong đầu vào, tạm dừng, tăng tốc, đóng game ngừng thế giới, lưu tay/tự lưu/xuất dự phòng là mặc định được đề xuất. Bản này dùng chúng làm giả định thiết kế để phản biện, chưa coi từng chi tiết lưu và điều khiển thời gian là quyết định triển khai đã khóa.

Giữ nền thành tròn/ô cố định, cấp 1–20, năm quân, bố trận/báo cáo, vật chất và vận tải thật, trại, Đại thành, dời đô, có thể mất thành và phục hồi. Các ý tưởng thuế/An dân/dự bị/tự quản vẫn cần kiểm chứng, không trở thành điều kiện để làm bản đầu.

Hồ sơ trong `project-docs` còn nhiều đoạn nhiều người/server/PvP do được lập trước khi đổi hướng. Khi review, ưu tiên bối cảnh offline ở đây; không lấy các đoạn cũ làm lý do bắt buộc có tài khoản, chống tài khoản phụ hoặc dịch vụ cloud. Web là một cách triển khai khả dĩ, chưa chốt runtime/engine.

## 2. Luận điểm thiết kế

Điểm riêng đề xuất: **chọn mục tiêu của chiến tranh, chuẩn bị khả năng thực hiện và quyết định lấy gì khi đã thắng**.

Không phải mọi trận đều cần kết thúc bằng giết hết quân, mọi chiến tranh đều cần xóa một vương quốc, hoặc mọi chiến thắng đều cần nhận thêm thành. Hậu cần khiến quyết định đó có hệ quả: chiếm mỏ cần xe, giữ thành cần lực lượng, kéo dài bao vây làm cả hai bên tiêu hao.

Người chơi phải có ít nhất hai cách hợp lý trong một số hoàn cảnh. Không ép ba cách cùng hiệu quả tại mọi thành hoặc cho ngoại giao là đường thắng miễn phí.

## 3. Ba cách buộc mục tiêu thay đổi quyền

### Công phá

Đánh lực lượng giữ và vượt điều kiện phòng thủ/kiểm soát để chiếm. Lợi thế là tạo kết quả nhanh khi đủ quân; đánh đổi là tổn thất và thời gian chuẩn bị. Nếu có hư hại công trình phải là cơ chế được định nghĩa, không chia cấp thành vô cớ hoặc tự thêm phá hủy mọi nhà.

Thắng trận ngoài thành chưa đổi chủ thành. Cần phân biệt quân bị đánh bại, lực lượng đang rút, kiểm soát địa điểm và quyền sở hữu đã chuyển.

### Bao vây/cô lập

Gây sức ép bằng khả năng tiếp cận và nguồn cung. Không chỉ đặt quân ngoài thành rồi bật nút “cắt toàn bộ lương”: thành có thể có sản xuất và kho, đường khác hoặc viện quân.

Người vây cũng có trại, lương và tuyến dễ bị đánh. Người thủ có lựa chọn giải vây, nhận hàng, đưa quân ra ngoài hoặc thương lượng. Chưa tự thêm máy công thành, đường biển hoặc mô phỏng hàng nghìn đoạn xe.

Rủi ro gốc cần Claude phản biện: luật cắt đường thực tế có quá phức tạp cho prototype, và một thành tự túc có khiến bao vây vô ích hay không?

### Đầu hàng có điều kiện

NPC cân nhắc giữa tiếp tục giữ và chấp nhận một điều kiện, dựa vào tình báo nó có, lực lượng thực, kho/lương, khả năng được cứu và mục tiêu riêng. Giao diện giải thích lý do chính, không yêu cầu người chơi chăm một thanh “uy hiếp” mới.

Ví dụ được đề xuất: giao thành để quân giữ rút an toàn. Chưa có chư hầu mặc định. Cần chống lối luôn đề nghị đầu hàng vì không mất gì, thắng sạch bằng ép vài câu hoặc farm bồi thường lặp.

Đầu hàng là kết quả chiến tranh, không phải nút thay chủ client gửi là được. Thời điểm hiệu lực, đường rút, quân/cấp/kho được giữ và quyền tấn công lại phải rõ trước khi triển khai.

## 4. Kết quả chiến tranh có thể giới hạn

Đề xuất tương lai: nhường mỏ/cứ điểm, bồi thường tài nguyên đang có, rút quân hoặc giao thành với điều kiện. Không cần toàn bộ ở prototype. Mọi hàng bồi thường cần nguồn thật và đi theo luật vật lý được chọn.

Không dùng điểm thắng trận như loại tiền tự mua mọi điều khoản mà bỏ qua địa điểm và quyền giữ. Nếu mục tiêu chiếm mỏ đã đạt, người chơi có thể dừng, còn NPC vẫn tồn tại trong thế giới.

Chư hầu là lựa chọn lớn còn mở. Không tự biến thỏa thuận đình chiến thành quyền điều khiển quân/kho của vương quốc NPC. Chủ dự án chưa trả lời có muốn hệ thống chư hầu hay không.

## 5. Vương quốc NPC và giới hạn thông tin

Hai tầng: NPC địa phương làm mục tiêu/quấy nhiễu giới hạn; vương quốc NPC có thành, kho, quân và mục tiêu. Các vương quốc không mặc định cùng phe chống người chơi.

Ưu tiên ra quyết định theo luật cục bộ chạy offline. Không cần dịch vụ AI online. Mỗi hành động phải có nguồn lực và thời gian; nếu độ khó có hỗ trợ kinh tế/nguồn quân thì cấu hình minh bạch, không sinh lực lượng bí mật để kéo người chơi xuống.

Các ưu tiên như bảo vệ lãnh thổ, cơ hội mở rộng hoặc thương mại nên biểu hiện qua hành vi, không chỉ tăng hệ số. Chưa cần thủ lĩnh, cây quan hệ hoặc nhiều thanh tâm lý.

Không để AI biết chính xác kho/quân/lệnh của người chơi khi luật quan sát không cho phép. Không hứa AI tối ưu; cần hành vi đủ hợp lý và giải thích được.

## 6. Thời gian, offline và bản lưu

Giả định đề xuất: thời gian mô phỏng áp dụng cho mọi bên; pause dừng sản xuất/di chuyển/quyết định mới, tăng tốc làm cả người chơi và NPC đi qua cùng lượng thời gian game. AI không được nghĩ theo số frame khiến đổi tốc độ đổi luật.

Cho phép xem và chuẩn bị lệnh khi pause; thời điểm các lệnh nhận hiệu lực phải nhất quán. Đóng game không chạy bù một tuần thời gian thật nếu đã chọn mặc định ngừng thế giới.

Save cần giữ trạng thái quân/hàng/kiểm soát, lịch tương lai, phiên bản luật và trạng thái ngẫu nhiên nếu có. Load không tự làm lại phần đã giao hoặc cấp lại chiến lợi phẩm. Người chơi offline được tự lưu/load, không đưa gánh chống gian lận cạnh tranh trở lại.

## 7. Nghịch lý mở rộng trong offline

Giữ chiến lợi phẩm và cảm giác mạnh lên có giá trị. Chi phí phải đến từ đường xa, mặt trận thật, quân bị phân tán và phục hồi có thể nhìn thấy. Không tự tăng phạt theo số thành hoặc sinh thêm quân thù vì người chơi thắng.

Quyền dừng, tăng tốc và lưu giúp tránh nỗi sợ đi ngủ mất thành; chúng không tự giải quyết chuyện kinh tế hoặc một đội quân luôn tối ưu. Bài thử vẫn cần đế chế lớn đã ổn định, nhưng mục tiêu là độ thú vị và thử thách cá nhân, không cân bằng cạnh tranh người đến trước/đến sau.

## 8. Lát cắt nhỏ để phản biện

Đề xuất một vùng thử, một vương quốc NPC đơn giản có hai thành, một số mục tiêu địa phương, một loại mỏ và vận tải.

Chuỗi: xây → tuyển → chiếm mỏ → chở hàng → phản kích NPC → chiếm thành thứ hai → lưu/đóng/mở lại.

Công phá dùng lực lượng và điều kiện kiểm soát rõ. Thêm một trường hợp NPC có thể đề nghị giao thành cho quân rút nếu đơn giản và không phá vòng lõi. Bao vây sâu, nhiều điều khoản hòa ước, chư hầu và nhiều tính cách vương quốc là phần sau, trừ khi review chứng minh một phần trong đó cần thiết để vòng đầu có lựa chọn.

Không làm cùng lúc dự bị, tự quản, thuế, An dân, vòng đời mỏ và thủ đô dự phòng. Bảy ý tưởng cũ nằm ở [tài liệu tham khảo](2026-11-07-hard-choices.md).

## 9. Những điểm Codex chưa chắc và yêu cầu Claude bắt lỗi

1. Ba đường chinh phục có thật sự khác nhau, hay đầu hàng chỉ là đoạn cuối của bao vây?
2. Mục tiêu chiến tranh giới hạn có cần ngay, hay tạo thêm ngoại giao và nghĩa vụ giao hàng trước khi game có thể chơi?
3. Điều kiện đầu hàng vừa dễ hiểu vừa tránh ngưỡng cứng bị khai thác nên là gì?
4. Giao thành và cho quân rút có gây lách gốc biên chế hoặc nhận hai lần tài sản không?
5. AI hai thành với nguồn lực thật có đủ để phản kích hợp lý mà không cần hệ thống kinh tế quá lớn?
6. Nguyên tắc nào trong hồ sơ nhiều người cần giữ vì đúng tài sản, nguyên tắc nào nên bỏ vì chỉ là gánh vận hành?
7. Sau khi người chơi đã thắng lớn, điều gì khiến họ muốn tiếp tục mà không cần cưỡng ép thất bại?

Kết quả review chéo phải ghi điểm đồng ý, điểm bác bỏ, nội dung đã sửa và vấn đề vẫn cần chủ dự án lựa chọn. Đồng thuận giữa hai agent chưa phải playtest hoặc phê duyệt của chủ dự án.
