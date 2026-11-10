# Review chéo vòng 2: Crownlands offline

Ngày 07/11/2026. Người viết: Claude. Đối tượng: [phản biện của Codex](2026-11-07-offline-conquest-codex-response.md), đối chiếu [review vòng 1](2026-11-07-offline-conquest-round-1.md).

**Trạng thái:** thiết kế để thử, không phải luật đã duyệt. Không có mô phỏng, playtest hay benchmark. Mọi con số, ngưỡng và tham số dưới đây là THỬ NGHIỆM. "Đồng ý" chỉ là đồng ý giữa hai agent.

**Kết luận ngắn:** Codex đúng ở phần lớn R1–R12, và tôi rút nhiều đề xuất của vòng 1. Phát hiện mới quan trọng nhất là thiết kế sửa của Codex có một lỗ hổng: R7 nói đoàn rút "có thể bị chặn theo luật quân sự đã có", nhưng đánh chặn dọc đường đã hoãn, nên không có luật đó. Tôi đề xuất luật cửa thành ở mục 3, chỉ cần một lựa chọn của bên công, để lấp lỗ hổng này và giữ lại quyết định diệt quân hay tha quân mà không cần đầu hàng chính thức.

## 1. Bảng R1–R12

| Mã | Lập trường | Lý do | Sửa cụ thể |
|---|---|---|---|
| **R1** Chi phí chờ | **Đồng ý có điều kiện** | "Gần như miễn phí" của tôi quá rộng. Phản ví dụ trại 3 ngày, kho 10 ngày là đúng. Nhưng phản ví dụ chỉ phủ trường hợp hậu cần yếu: quân ở nhà cũng ăn lương (Tập 02 §7.3), nên lương không phải chi phí biên nếu tuyến đủ sức. Với một NPC và không có mục tiêu khác, quân bị ghim gần như không mất cơ hội | Không thêm AI chỉ để làm đồng hồ. Đo **chi phí biên so với việc ở nhà**: xe, sản lượng mỏ bỏ lỡ, rủi ro viện binh. Vây thắng nhờ hậu cần tốt là phần thưởng chính đáng, không phải lỗi. Chỉ là lỗi nếu đợi luôn tốt nhất ở mọi tình huống thử (C2) |
| **R2** Tách dữ liệu | **Đồng ý** | Enum của tôi sai: thành đang phục hồi vẫn bị vây được, đổi chủ là sự kiện | Dùng mô hình mục 2. Bỏ thêm trạng thái "tranh chấp" của Codex, vì trận giải quyết tức thì nên không cần |
| **R3** Cắt sản xuất do kiểm soát | **Đồng ý có điều kiện** | Đúng là kiểm soát chứ không phải tới gần. Nhưng phòng thủ đặt trước không cần ở bản A: dù kiểm soát đổi ngay khi quân địch đến, người chơi xuất thành ở cửa lệnh cùng mốc thì sản lượng mất không đáng kể | Thêm **lực lượng tối thiểu** để giành ngoại thành. Bản A dùng tự dừng và lệnh tay; lập trường đặt trước để bản B hoặc khi nhiều thành. Ghi rõ "toàn bộ sản xuất ngoài tường" là giả định bản thử |
| **R4** Dự báo không tiên tri | **Đồng ý** | Tôi rút cách gọi "đánh tiếp thua". Tin cũ có thể sai; "chỉ phản công khi thắng tiêu diệt" có thể làm AI bỏ mục tiêu giới hạn | Hàm dự báo thuần: chỉ đọc tin đã biết, không đổi trạng thái, không tiến PRNG. Biên an toàn theo loại mục tiêu, tin càng cũ càng thận trọng (mục 4) |
| **R5** Bỏ miễn trừ theo tên | **Đồng ý** | Ngoại lệ của tôi không có lý do cơ học | Thành cuối không có nhánh rút vì không có đích. Thủ đô không đặc biệt. Mặt trái: AI có thể bỏ thủ đô quá dễ, kiểm tra ở C7 |
| **R6** Điều kiện lương không tạo tự sát | **Đồng ý, đề xuất của tôi bỏ** | Quy tắc của tôi đúng là khiến càng vây lâu càng đóng lối ra | Bỏ bộ ba đầu hàng. Rút xét sớm, khi còn lương đi đường. Lỡ thời điểm thì quân suy yếu, không tự chết; bên công đánh dễ hơn (mục 3) |
| **R7** Rút dùng hành quân thường | **Đồng ý hướng, bất đồng một điểm** | Bỏ bảo vệ toàn cầu là đúng. Nhưng thiếu luật ra khỏi thành đang bị kiểm soát ngoại thành: nếu luôn phải đánh thì không ai rút và lại chết tới người cuối; nếu luôn đi được thì không thể diệt quân vây | **Cửa thành: chặn hay để ngỏ** (mục 3). Trên đường không có trận, đúng với việc hoãn đánh chặn. Không có cam kết nào, phe khác không bị ràng buộc |
| **R8** Không có hộ tống | **Đồng ý** | Tôi đã mâu thuẫn khi vừa hoãn hộ tống vừa dùng hộ tống ở cổng | Đạo quân riêng phá kiểm soát. Hàng không giao được thì quay về đúng một lần, rồi kẹt và báo (mục 3). Đề nghị sửa thứ tự cùng mốc để giao tranh trước hàng |
| **R9** AI tránh tự khóa | **Đồng ý** | Danh sách ưu tiên cứng của tôi có lỗi đúng như Codex nêu | Ngân sách nền song song, cam kết đang chạy, kiểm tra khả thi (mục 4). Thêm biên hạ dần để tránh thụ động, Codex chưa có điểm này |
| **R10** A rồi B | **Đồng ý có điều kiện** | Tôi rút yêu cầu hai vương quốc ngay. Điều kiện: A phải có mục tiêu trung lập, nếu không NPC vẫn chỉ phản ứng với người chơi. Không được kết luận chủ đề "NPC có mục tiêu riêng" từ A | B là cổng bắt buộc trước khi công bố luận điểm này |
| **R11** Audit thời gian | **Đồng ý** | "Phải làm lại toàn bộ" của tôi quá lời | Một đơn vị logic là giây mô phỏng. Audit bằng **khoảng cách giữa hai quyết định có nghĩa**. Mẫu trải rộng từ 161 giây đến 26,7 giờ, nên tốc độ cố định không phù hợp; "tua tới sự kiện kế" là cần thiết |
| **R12** Pause không chen lệnh | **Đồng ý** | Quy tắc của tôi sai, thật sự mâu thuẫn K11 | Một cửa lệnh duy nhất sau nhóm sự kiện (mục 6). Người chơi hành động sau AI cùng mốc, nhưng lệnh AI vẫn mất thời gian thực thi |

## 2. Mô hình thành và địa điểm

Tách năm phần, không có thanh chỉ số chung, không có enum trạng thái thành:

| Phần | Dữ liệu | Thay đổi khi |
|---|---|---|
| **Chủ** | `owner`, `owner_version` | Chỉ khi công việc tiếp quản hoàn tất |
| **Thủ quân** | Các đạo quân của chủ đang ở trong thành | Tuyển, đến, rút, chết |
| **Giữ ngoại thành** | `outer_holder`; trống nghĩa là chủ giữ | Trận, hoặc lực lượng tụt dưới mức tối thiểu |
| **Tiếp quản** | Bên tiếp quản, mốc hoàn tất, `owner_version` lúc bắt đầu | Bắt đầu, hoàn tất, hoặc hủy |
| **Phục hồi** | Tỷ lệ đóng góp sản lượng và hạn mức | Tăng theo thời gian; đặt lại khi đổi chủ |

**Không có trạng thái "tranh chấp".** Mỗi lần có một đạo quân tới là một trận theo cặp, giải quyết ngay trong nhóm sự kiện. Kết quả hòa (R02 §6.3) thì bên đang giữ vẫn giữ, bên tới phải rút. Mặt trái: bên giữ có lợi thế, và trận không phân thắng bại có thể phải lặp lại.

**Mỏ dùng cùng mô hình nhưng bỏ phần chủ và tiếp quản.** Mỏ chỉ có bên đang giữ. Quyền đất của mỏ vẫn thuộc O20. Hàng ở kho mỏ thuộc bên giữ theo cách tính chiến lợi phẩm của bản thử.

### Điều kiện chuyển quyền

Tiếp quản **bắt đầu** khi đủ cả ba:
1. Bên X đang giữ ngoại thành.
2. Trong thành không còn thủ quân.
3. Bên X có ít nhất lực lượng tối thiểu và còn lương.

Khi đến mốc, chủ đổi đúng một lần và `owner_version` tăng, nếu phiên bản chưa đổi.

### Mất điều kiện giữa chừng

| Tình huống | Kết quả |
|---|---|
| Bên X thua trận tại ngoại thành | Hủy, tiến độ về 0 |
| Bên X thắng một đạo quân nhỏ tới phá | Tiếp tục, không reset |
| Lực lượng X tụt dưới mức tối thiểu sau trận | Hủy |
| X hết lương, tới mức khẩn cấp theo preset | Hủy; X vẫn giữ ngoại thành cho đến khi bị đánh hoặc rút |
| Quân của chủ vào lại thành | Phải đi qua ngoại thành, tức có trận trước; thua thì không vào được |
| Bên thứ ba thắng X | Hủy; bên thứ ba giữ ngoại thành và phải tự bắt đầu tiếp quản từ 0 |

Mặt trái: hủy về 0 là nghiêm khắc, gần hết giờ mà thua một trận là mất hết. Tôi vẫn chọn vì không cần lưu tiến độ và hồi tiến độ. Nếu thử thấy quá gắt thì sửa thời gian, không thêm thanh.

### Thành mới chiếm bị đánh lại

Chủ mới dùng quân của mình làm thủ quân, có tường. Phục hồi không chặn việc bị vây, và dừng tăng khi ngoại thành mất. Chủ cũ chiếm lại thì đi đúng quy trình và phục hồi đặt lại từ đầu. Hai lần đổi chủ không tạo thêm tài sản, kho vẫn là kho cũ, không có thưởng tái chiếm. Mặt trái: thành đổi chủ liên tục không ai hưởng lợi, kể cả khi người chơi đang cố gắng giành lại.

## 3. Vây, rút và hàng tới

### Vây tối thiểu

"Vây" không phải trạng thái lưu. Nó là tên gọi khi `outer_holder` là đối thủ còn thành vẫn có thủ quân.

**Giành ngoại thành:** đạo quân tới, đạt lực lượng tối thiểu theo bậc thành (tính bằng suất, THỬ NGHIỆM), và không có đạo quân nào của chủ thắng được nó ở ngoại thành.

**Hậu quả:**
- Ô ngoại thành ngừng sản xuất, tính đoạn tại đúng mốc. Kho vẫn dùng được.
- Hàng tới không giao được.
- Thủ quân vẫn có tường khi bị đánh vào thành; xuất thành thì mất lợi thế tường.

**Lối ra của bên thủ:** xuất thành, viện binh đánh ngoại thành, hoặc rút. Viện binh cùng chủ đánh chung với thủ quân nếu thủ quân xuất.

**Lối ra của bên công:** đánh vào thành, chờ, đổi lựa chọn cửa thành, hoặc rút.

### Vây giá rẻ

| Trường hợp | Kết quả | Mặt trái |
|---|---|---|
| 50 quân, thành có 500 | Không đạt tối thiểu, hoặc bị xuất thành đánh tan | Phụ thuộc người chơi hoặc AI có xuất không |
| 50 quân, thành trống | Không đạt tối thiểu: chỉ cướp được, không cắt sản xuất | Ngưỡng có thể bị dò, đạt tối thiểu cộng 1 là đủ |
| 300 quân vượt tối thiểu, thành trống | Cắt sản xuất, là hậu quả của việc để trống | Hậu phương nhiều thành có thể phải chịu nhiều lần dừng. Nếu thành việc vặt ở quy mô lớn, thêm lập trường đặt trước, không thêm quota |

Đây là ràng buộc lên bên công, không phải quota lính bắt buộc cho mỗi thành của bên thủ.

### Cửa thành: chặn hay để ngỏ

Đây là đề xuất mới của tôi, thay cho đầu hàng chính thức. Bên giữ ngoại thành có **một** lựa chọn công khai:

- **Chặn:** thủ quân muốn rút phải đánh ở ngoại thành, không có tường.
- **Để ngỏ:** thủ quân rút được theo hành quân thường, không có trận tại cổng.

Khi thủ quân rút, bên công có thể bắt đầu tiếp quản mà không tốn quân, nhưng quân địch còn sống. Khi chặn, thủ quân ở lại sau tường và phải đánh hoặc chờ đói. Không có cam kết, không có bảo vệ, phe thứ ba không liên quan. Rút khi chưa bị giữ ngoại thành thì đi tự do.

**Trên đường không có trận** với mọi đạo quân, vì đánh chặn dọc đường đã hoãn. Đoàn rút có thể bị đánh ở đích nếu đích bị giữ. Đây là hệ quả của mô hình, không phải bảo vệ riêng cho đoàn rút. Nó cũng là điểm yếu: không thể đuổi theo đạo quân đang rút, và kỵ binh mất một vai trò đáng lẽ có.

**Mặt trái của cửa thành:**
- Về bản chất, đây vẫn là một luật thêm. Nếu C5 cho thấy luôn chặn hoặc luôn để ngỏ, thì bỏ lựa chọn, chọn một mặc định cố định.
- Nếu AI không bao giờ rút dù để ngỏ, lựa chọn vô nghĩa.
- Người chơi có thể đặt sẵn đội quân ở đích để đánh đoàn rút. Tôi chấp nhận vì không có lời hứa nào bị phá.

### Đích rút

AI và người chơi dùng cùng điều kiện khả thi. Đích phải cùng chủ, không bị đối thủ giữ ngoại thành theo tin hiện có, và đoàn phải mang đủ lương đi đường lấy từ kho thật. Không đủ lương thì đi không được. Thành cuối không có đích nên không có nhánh này.

| Lúc tới nơi | Xử lý bản thử |
|---|---|
| Đích đầy | Phần vượt sức chứa ở ngoài thành, ăn lương mang theo, được báo (preset O19) |
| Đích không đủ nuôi | Quân vẫn tới; đích thiếu lương theo dự báo, là hậu quả thật. AI phải tính trước |
| Đích đã mất | Chuyển sang đích hợp lệ gần nhất; không có thì đứng tại chỗ, ăn lương mang theo và báo |
| Không còn thành nào (NPC) | Vương quốc kết thúc. Quân còn lại rã, ghi vào sổ. Đây là luật bản thử cần xem lại, tôi chưa hài lòng |
| Không còn thành nào (người chơi) | Bản thử: thua, tải lại. Bản đầy đủ theo D17/D18 |

### Hàng và quân tới khi cổng đổi quyền

Chỉ kiểm tra **khi tới nơi** (T35):

1. Đích còn thuộc chủ chuyến và ngoại thành không bị đối thủ giữ thì dỡ hàng.
2. Nếu không, hàng và xe quay về nguồn đúng một lần, xe tốn trọn hành trình.
3. Nguồn cũng không hợp lệ thì đi tới địa điểm hợp lệ gần nhất của chủ.
4. Không có nơi nào thì đứng tại chỗ ở trạng thái **kẹt**, báo cho chủ, chờ lệnh. Không tự quay vòng, không mất hàng, không giao cho bên khác.

Bản thử chưa có cướp xe nên hàng không bị mất tại cổng. Mặt trái: vây chỉ làm hàng về không, sức ép yếu hơn cướp thật.

Đạo quân đang tới thành vừa đổi chủ: khi đến nơi không tự tấn công nếu lệnh ban đầu là đóng quân; quay về như hàng và báo. Muốn đánh thì ra lệnh mới.

### Sau khi đổi chủ

| Đối tượng | Xử lý |
|---|---|
| Quân chủ cũ ở ngoài | Giữ chủ, không về chủ mới. Mất gốc thì vào **chờ biên chế**: không xóa, không thêm phạt ở bản thử; chủ cũ không tuyển nếu đang vượt hạn mức (O18) |
| Job xây, tuyển, nghiên cứu | Hủy; khoản đã giữ về kho thành, suất giữ được giải phóng. Không hoàn cho chủ cũ. Phần đã tiêu không hoàn cho ai |
| Kho | Ở lại thành, thuộc chủ mới |
| Công trình | Giữ nguyên cấp, không chia 1/2 hay 1/3 (D18) |
| Hàng đang đi từ thành này | Thuộc chủ chuyến; xử lý theo quy tắc trên |
| Tuyến, chính sách | Mất hiệu lực theo `owner_version` |
| Hạn mức chủ mới | Tăng theo phục hồi, không có ngay |

### Nhiều bên (chỉ bản B)

Mỗi đạo quân tới đánh theo cặp với bên đang giữ theo thứ tự sự kiện ổn định. Không có trận nhiều phía, không gộp quân, không có hai bên cùng tiếp quản. Thủ quân trong thành không tự đánh bên nào. Mặt trái: tới sau có thể đánh bên đã mòn, đó là cơ hội thật của bên thứ ba, nhưng thứ tự cùng mốc cũng có thể làm thay đổi kết quả, nên luật phải công bố.

## 4. AI tối thiểu

Mỗi vương quốc xét định kỳ theo thời gian mô phỏng. **Cùng luật, cùng hành động, cùng tầm nhìn với người chơi:** biết quân và kho của mình; biết đối thủ qua vùng nhìn, trinh sát và báo cáo trận, có mốc thời gian.

**Song song, không thuộc danh sách ưu tiên:** chia thu nhập theo ngân sách nền, ví dụ một phần cho xây, một phần cho quân. Nhờ vậy luôn có đầu tư và không phụ thuộc lúc rảnh.

**Mỗi lượt xét theo thứ tự:**

1. **Giữ sống:** đạo quân nào sắp cạn lương so với đường về thì gửi hàng nếu có tuyến, không thì cho về. Chặn tuyển nếu dự báo lương âm tại nơi tuyển.
2. **Thành bị giữ ngoại thành:** viện binh nếu khả thi (dự báo thuận lợi, đủ lương đi, tới kịp). Không thì thủ quân rút nếu cửa để ngỏ và có đích. Không được thì giữ sau tường.
3. **Cam kết đang chạy:** tiếp tục chiến dịch hiện tại, tối đa một chiến dịch ở bản A, trừ khi mục tiêu không còn, hết khả thi về lương, hoặc dự báo xấu vượt ngưỡng hủy. Ngưỡng hủy khác ngưỡng bắt đầu để tránh đổi ý liên tục.
4. **Chọn mục tiêu mới nếu rảnh:** lấy mục tiêu có giá trị trên quãng đường cao nhất mà khả thi và đạt biên an toàn.

**Biên an toàn theo loại mục tiêu:**
- Lấy lại mỏ hoặc trại trung lập: biên thấp, chỉ cần thắng trận tại đó.
- Đánh trại đối thủ: biên vừa.
- Chiếm thành: biên cao.

Tin cũ làm tăng ước tính lực lượng đối phương theo tuổi tin. Tin quá cũ thì trinh sát trước.

**Mặt trái:** các hằng số này chính là cân bằng ẩn. AI vẫn có thể dò được, người chơi có thể học "đặt 110% là NPC không dám đánh". Với game một người, tôi chấp nhận nguy cơ này ở bản thử.

### Case tránh tự sát

Vương quốc Đông thua ở mỏ sắt, báo cáo ghi người chơi có 800 quân. Lần xét sau, Đông có 700. Với tin 800, chưa tới biên an toàn nên không đánh, chuyển sang trại thổ phỉ hoặc tích quân. Bản ghi chính là tin tình báo, không cần hệ thống ghi nhớ thù hằn. Chỉ quay lại khi lực đạt biên hoặc tin mới cho thấy quân giữ giảm.

### Case không thụ động mãi

Đông đầy hạn mức, kho đầy, tin cũ khiến mọi mục tiêu không đạt biên. Mỗi lượt không có việc, **biên giảm dần tới một mức sàn**, trinh sát được gửi trước. Khi đánh xong thì biên đặt lại. Như vậy lực lượng thừa cuối cùng sẽ dẫn đến hành động, không cần tăng quân bí mật. Mặt trái: người chơi có thể nhận ra chu kỳ và chuẩn bị. Nếu sàn thấp, NPC vẫn có thể tự sát; nếu sàn cao, NPC có thể đứng im. C10 và C11 cùng kiểm tra.

### Hạn chế có nhãn

Bản A: NPC đánh trong tầm lương mang theo, không lập trại, không vây dài. **Không dùng A để kết luận phòng thủ vây đã tốt.** Bản B có một kịch bản NPC dùng trại đặt sẵn và lệnh chung, chưa có AI chọn vị trí trại.

## 5. Phạm vi

**Đầu hàng chính thức bị bỏ khỏi cả A và B.** Còn lại: rút quân thường và lựa chọn cửa thành. Game **không quảng cáo ba con đường chinh phục độc lập**. Chỉ có một quy trình đổi chủ; đánh, chờ và để thủ quân rời đi là ba cách dẫn tới điều kiện đó. Hòa ước, giao thành có cam kết và mọi miễn tấn công đều hoãn.

### Bản A: kiểm tra vòng chiếm và hậu cần

**Có:** một vương quốc NPC hai thành, trại thổ phỉ và một mỏ trung lập mà NPC cũng tranh, năm quân, bố trận mẫu, báo cáo, trinh sát dạng lệnh, trại, xe, lương, preset đói, mô hình mục 2 và 3, pause, tốc độ, lưu và tải.

**Ba lựa chọn thực sự:**
1. **Mỏ hay thành:** dừng ở mỏ và tuyến để nuôi quân, hay dồn lực sang chiếm thành.
2. **Đánh ngay hay chờ:** đánh vào tường tốn quân, hay vây tốn xe và thời gian, với rủi ro viện binh.
3. **Chặn hay để ngỏ:** diệt quân nhưng tốn và chậm, hay lấy thành nhanh để quân địch quay lại sau.

**Rủi ro:** lựa chọn 3 chưa chắc tồn tại thật; có thể chỉ còn hai lựa chọn.

### Bản B: kiểm tra NPC có mục tiêu riêng

**Thêm:** vương quốc thứ hai cùng bộ điều khiển, mục tiêu trung lập, một kịch bản NPC dùng trại đặt sẵn để vây người chơi, lập trường phòng thủ đặt trước nếu A cho thấy cần.

**Ba lựa chọn thực sự:**
1. **Can thiệp hay đứng ngoài:** đánh bên đang thắng hay để hai bên tự mòn.
2. **Tranh trung lập hay đánh vào khoảng trống:** lấy mỏ trước đối thủ, hay đánh thành khi quân chủ lực của nó ở xa.
3. **Tập trung hay chia quân:** khi có hai hướng đe dọa và tuyến chỉ nuôi được một mặt trận.

**Rủi ro:** một bên nuốt bên kia quá sớm, hoặc hai bên kìm nhau mãi không thay đổi gì.

### Hoãn

| Hạng mục | Lý do |
|---|---|
| Đánh chặn dọc đường, cướp xe, hộ tống | Cần mô hình đoạn đường |
| Đầu hàng, giao thành có cam kết, hòa ước, bồi thường | Chưa chứng minh hơn rút thường. Đình chiến có thời hạn là ứng viên đầu tiên |
| Chư hầu | Chủ dự án chưa chọn |
| Đại thành, thưởng D25, đổi đô | Sau khi chuyển quyền đúng |
| Tái lập D17/D18 | Hướng đã chốt; bổ sung sau bản thử, không thay bằng tải lại |
| AI tự chọn vị trí trại | Thử trại đặt sẵn trước |
| Thuế, An dân, quản trị, bảy ý tưởng cũ | Không làm trước khi thử không có chúng |

## 6. Thời gian, pause, lưu và tải

- **Đồng hồ:** giây mô phỏng nguyên. Sản xuất và tiêu thụ tính theo đoạn, không theo khung hình. Tốc độ chỉ đổi tỉ lệ với giờ thực; có "tua tới sự kiện kế". Đóng game thì thế giới dừng, không chạy bù.
- **Nhóm sự kiện tại mốc T, theo thứ tự đề xuất:**
  1. Công việc hoàn tất.
  2. Quân tới và giao chiến, cập nhật giữ ngoại thành.
  3. Hàng tới.
  4. Xét đói.
  5. Tiếp quản đến hạn.
  6. AI quyết định.
- **Cửa lệnh:** sau khi cả nhóm xử lý xong, người chơi có thể ra lệnh, kèm lưu và tải. Lệnh mới nhận mốc T, pha cửa lệnh, số thứ tự nhập.

**Thay đổi so với mẫu cũ:** giao chiến đứng trước hàng tới, vì kết quả nhận hàng phụ thuộc kiểm soát. Tiếp quản đứng sau giao chiến nên viện binh tới cùng mốc thắng thế. Mặt trái: hàng tới cùng mốc không kịp nuôi quân cho trận đó. Đây là thay đổi với thứ tự R03 §4.3, cần ghi vào O10.

**Giữa hai mốc:** pause dừng tại một T nằm giữa hai nhóm sự kiện, lệnh có hiệu lực ngay từ T đó. T phụ thuộc lúc người chơi bấm và tốc độ đang chọn. Đây không phải lỗi: lệnh khác mốc là đầu vào khác.

**Lời hứa tính tất định, có giới hạn:** cùng bản lưu, cùng phiên bản luật, cùng danh sách lệnh với cùng (mốc, pha, thứ tự) thì cho cùng kết quả ở mọi tốc độ. **Không hứa:** kết quả giống nhau khi lệnh được ra ở mốc khác; tương thích qua phiên bản luật; giống nhau giữa các máy nếu còn dùng số thực (dùng số nguyên trong luật để giảm nguy cơ).

**Lưu và tải:**
- Chỉ lưu ở cửa lệnh, không lưu giữa nhóm. Tự lưu cũng vậy.
- Bản lưu gồm trạng thái, hàng đợi sự kiện, sổ nguồn, phiên bản luật và cấu hình, trạng thái PRNG nếu có, tách luồng AI và luồng trận.
- Ghi bản lưu phải nguyên vẹn hoặc không ghi. Lỗi giữa chừng thì dùng bản lưu trước đó.
- Tải lại để chọn cách khác là quyền người chơi. Không chống, không phạt.
- Không kế thừa server clock hay idempotency HTTP. Giữ bất biến: mỗi tài sản một chủ, không nhân, sự kiện cũ không ghi đè trạng thái mới.

**Mặt trái:** một cửa lệnh sau mỗi nhóm cho người chơi lợi thế thông tin nhỏ so với AI. Chấp nhận trong game một người.

## 7. Ca kiểm chứng

**Tất cả chưa chạy.** Ngưỡng đạt phải chọn và ghi trước khi thử.

| Mã | Ca | Đạt | Thất bại |
|---|---|---|---|
| C1 | Đánh vào thành với ưu thế 1,2/2/5 lần, có và không có tường | Có mức ưu thế đánh ngay không phải lựa chọn tốt nhất | Đánh ngay tốt nhất ở mọi mức |
| C2 | Phản chứng chờ: tuyến đủ sức, không viện binh; so với trại 3 ngày, kho 10 ngày | Trường hợp yếu thất bại vì hết lương; trường hợp mạnh có giá trị nhưng tốn đo được | Chờ tốt nhất ở mọi tập tình huống, chi phí biên xấp xỉ 0 |
| C3 | Quân tí hon: 50/500; 50/trống; 300/trống | 50 không cắt được sản xuất; 300 cắt được và có cách xử lý | Lực lượng nhỏ làm tê liệt thành |
| C4 | Phản chứng tiếp quản: quân đến cùng mốc tiếp quản; quân nhỏ quấy rối | Trận được giải trước; thắng thì tiếp tục, thua thì hủy về 0 | Đổi chủ nhờ thứ tự, hoặc quấy rối nhỏ reset |
| C5 | Phản chứng cửa thành: cùng tình huống, chặn và để ngỏ | Mỗi lựa chọn tốt hơn ở ít nhất một tình huống | Một lựa chọn luôn tốt hơn: bỏ luật |
| C6 | Thành mới chiếm bị đánh lại, đổi chủ nhiều lần | Không tài sản mới; phục hồi đặt lại; job và suất đúng | Tăng kho, cấp hoặc hạn mức |
| C7 | Rút: đích đầy, thiếu lương, đích mất giữa đường, thành cuối, thủ đô | Mỗi nhánh đúng mục 3; quân không biến mất. AI không bỏ cả vương quốc mà không có trận (nếu có, ghi lại) | Quân biến mất, dịch chuyển, hoặc cuốn chiếu toàn bộ không giao tranh |
| C8 | Xe tới khi cổng đổi quyền, hai đích đều không hợp lệ, cùng mốc với viện binh | Quay về một lần, rồi kẹt và báo; viện binh thắng cùng mốc thì giao được | Quay vòng vô hạn, mất hàng không ghi, giao nhầm |
| C9 | Ba phe tại một thành (B) | Trận theo cặp; không gộp; một bên tiếp quản; không có hai chủ | Có hai chủ, gộp quân, hoặc kết quả đổi theo tốc độ |
| C10 | AI tránh tự sát: thua rồi xét lại với lực yếu hơn | Không đánh lặp cùng mục tiêu khi tin không đổi | Tấn công thua lặp lại |
| C11 | AI không thụ động: quân đầy, kho đầy, tin cũ | Trinh sát rồi hành động sau khoảng định trước | Đứng yên vô hạn |
| C12 | AI hậu cần và cam kết: cứu viện xa, nhiều mục tiêu đổi giá trị | Không tự làm đói quân vì cứu; không đổi mục tiêu mỗi lượt; có đầu tư xây | Đói vì cứu, đổi mục tiêu liên tục, không bao giờ xây |
| C13 | Dự báo thuần: chạy dự báo, đổi lực lượng ngoài tầm nhìn | Trạng thái và PRNG không đổi; quyết định AI không đổi theo quân nó không thấy | AI phản ứng theo thông tin không được biết |
| C14 | Tốc độ và pause: cùng lệnh, mốc, pha ở tốc độ 1, 8, tua, có pause; và lệnh khác mốc | Trùng khớp ở trường hợp đầu; trường hợp sau được phép khác | Tốc độ đổi kết quả, hoặc pause chen trước sự kiện đã đến hạn |
| C15 | Lưu và đế chế lớn: lưu giữa hành quân rồi tải; 30 thành so với 10 thành cùng hạt khởi đầu | Không nhận lại tài sản; NPC giống nhau trước lần tiếp xúc đầu; có ít nhất hai mục tiêu hoặc kết thúc thỏa mãn | Nhân tài sản, tăng sức bí mật, chỉ còn việc lặp |

Đo thêm khi có người thử: có tự giải thích được lý do thua không, có chọn khác nhau không, có muốn thử lại không.

## 8. Bất đồng, lựa chọn và kết luận

### Điểm còn bất đồng hoặc chưa được Codex xem xét

Không điểm nào chặn việc viết bản thiết kế chung. Tôi đề xuất dùng mặc định, ghi kèm phương án thay thế:

| Điểm | Lập trường của tôi | Lập trường Codex hoặc phương án khác | Mặc định đề xuất cho bản thử |
|---|---|---|---|
| Rút khi ngoại thành đang bị giữ | Lựa chọn chặn hay để ngỏ | Codex: "bị chặn theo luật đã có", nhưng chưa có luật | Cửa thành. Bỏ nếu C5 thất bại, khi đó dùng cố định **Chặn** |
| Giành ngoại thành | Lực lượng tối thiểu của bên công, không cần phòng thủ đặt trước ở A | Codex: có phòng thủ đặt trước, sửa điều kiện nếu K4 thất bại | Lực lượng tối thiểu; lập trường đặt trước để B |
| Tiếp quản bị ngắt | Hủy về 0 | Codex chưa chốt | Hủy về 0 |
| Thứ tự cùng mốc | Giao chiến trước hàng | Mẫu cũ R03: hàng trước quân | Giao chiến trước, ghi vào O10 |
| Chi phí chờ ở A | Có thể gần 0 khi hậu cần tốt, và chấp nhận điều đó | Codex: lương và quân bị ghim đã là chi phí | Đo C2; cả hai đồng ý không thêm hệ thống trước khi đo |

**Điểm tôi tự nghi ngờ nhiều nhất:** cửa thành có thể là đầu hàng đổi tên; hủy về 0 có thể quá gắt; không có trận trên đường làm rút gần như an toàn, có thể giảm giá trị kỵ binh; quy tắc NPC rã quân khi hết thành là chỗ yếu.

### Tối đa ba lựa chọn của chủ dự án (không chặn bản A)

1. **Có kết thúc không?** Mốc thống nhất tự nguyện, chơi tiếp được, hay sandbox vô tận. **Mặc định ĐỀ XUẤT: có mốc tự nguyện.**
2. **Thua thành cuối trong bản đầy đủ?** Tái lập theo D17/D18 và vẫn có thể tải lại, hay chỉ tải lại. **Mặc định ĐỀ XUẤT: tái lập, vẫn có thể tải lại.**
3. **Chư hầu về lâu dài?** Có thể mở cách kết thúc chiến tranh không cần giữ thêm đất, nhưng cần luật tuân lệnh, cống nạp vật lý, phản bội, và có nguy cơ thành quân chung. **Mặc định ĐỀ XUẤT: không làm trong A và B; hỏi lại sau khi có vòng lõi.**

### Kết luận

**Có lý về mặt lập luận:** một quy trình đổi chủ, kiểm soát tách khỏi sở hữu, vây là hệ quả của kiểm soát, rút dùng hành quân thường, AI dùng cùng luật. Thiết kế này ít cơ chế và có nhân quả rõ hơn bản đầu của cả hai bên.

**Không có bằng chứng:** game vui, cân bằng, lựa chọn đánh hay chờ tồn tại thật, AI đủ hợp lý, đế chế lớn đủ hấp dẫn. Tất cả đều chưa chạy. Sự đồng ý giữa hai agent không thay thế playtest hay phê duyệt của chủ dự án.

**Dấu hiệu nên đổi luận điểm, không chỉ chỉnh số:** công phá luôn tối ưu; mọi lựa chọn hậu cần hội tụ về một đáp án; AI đứng im hoặc tự sát dù đã thử các biên khác nhau; người chơi không giải thích được vì sao thua.
