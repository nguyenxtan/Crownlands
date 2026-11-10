# Review chéo vòng 1: Crownlands offline

Ngày 07/11/2026. Người viết: Claude. Đối tượng: [đề xuất của Codex](../proposals/2026-11-07-offline-conquest.md).

**Trạng thái:** ý kiến một phía, Codex chưa phản biện, không phải đồng thuận. Mọi cơ chế và con số dưới đây là ĐỀ XUẤT/THỬ NGHIỆM, không phải luật chủ dự án đã duyệt. Chưa có mô phỏng hay playtest nào. Các phép suy về sức chiến đấu dùng mô hình giản lược.

## A. Kết luận

Giữ luận điểm gốc của Codex: người chơi chọn lấy gì khi đã có ưu thế, và hậu cần làm lựa chọn đó có giá. Bỏ cách trình bày "ba đường chinh phục": chỉ nên có **một đường chuyển quyền** (hết thủ quân, rồi giữ thành đủ thời gian), cùng hai cách làm thủ quân biến mất là đánh hoặc vây, và đầu hàng là một kết cục của tình thế đó. Bỏ "mục tiêu chiến tranh" như một hệ thống riêng và bỏ điểm chiến tranh; mục tiêu chỉ là việc người chơi dừng ở đâu. Đổi lát cắt từ một vương quốc hai thành thành **hai vương quốc nhỏ cộng mục tiêu trung lập**, vì một vương quốc không kiểm chứng được "NPC có mục tiêu riêng". Đổi đánh chặn dọc đường thành chặn tại cổng thành. Lỗ hổng lớn nhất Codex chưa nêu: khi có tua nhanh, **chờ đợi gần như miễn phí**, nên nếu thế giới không tự chuyển động thì vây và tích quân luôn là đáp án đúng. Lỗ hổng thứ hai: mọi thời lượng của hồ sơ cũ (xây cấp 20 mẫu khoảng 26,7 giờ) được tính cho game chạy liên tục, và phải làm lại khi đóng game thì thế giới dừng. Hòa ước, bồi thường, chư hầu, tính cách vương quốc và bảy ý tưởng cũ nên để sau lát cắt đầu.

## B. Vấn đề

| Mức | Lập luận của Codex | Phản ví dụ | Cách sửa | Mặt trái của cách sửa |
|---|---|---|---|---|
| **P0-1** | Ba cách buộc đổi quyền: công phá, bao vây, đầu hàng | Vây xong vẫn phải đánh hoặc chờ thủ quân bỏ thành; đầu hàng chỉ là cách thủ quân rời đi. Cả ba cùng kết thúc bằng một sự kiện | Một máy trạng thái (mục C). Vây chỉ gây sức ép, không bao giờ tự đổi chủ | Ít cảm giác "nhiều lối chơi" trên giấy. Nếu một đòn bẩy luôn tốt hơn thì không còn lựa chọn |
| **P0-2** | Bao vây tiêu hao "cả hai bên" (§2) | Chỉ tiêu hao theo thời gian game. Người chơi tua nhanh 20 ngày tốn vài phút, nên luôn chờ đến khi đối thủ đói | Chi phí chờ phải đến từ thế giới: viện quân, đối thủ thứ ba giành mục tiêu, lương trại, quân bị ghim không đi nơi khác | NPC phải thật sự hành động, tăng khối lượng AI. Nếu AI quá chủ động, người chơi lại bị ép chạy đua |
| **P0-3** | Giả định thời gian mô phỏng dùng chung, chưa nói thang đo | Số mẫu cũ: xây cấp 20 khoảng 26,7 giờ, xe 3 giờ/chiều. Thế giới dừng khi đóng game thì một chiến dịch có thể cần chạy máy nhiều ngày | Định nghĩa lại thang thời gian trước khi dùng lại số cũ. Đơn vị logic là "ngày game"; tốc độ chỉ đổi tỉ lệ với giờ thực | Toàn bộ số trong bảng tính phải chuẩn hóa lại, không kế thừa được thời gian cũ |
| **P0-4** | Đầu hàng dựa trên tình báo, lực lượng, kho, cứu viện và mục tiêu riêng | Nhiều biến thì khó giải thích và dễ thành ngưỡng farm. Ngược lại, nếu luôn đồng ý khi đủ quân thì mọi thành rơi không đổ máu | Quy tắc ba câu hỏi (dưới bảng). Không có nút đề nghị lặp; bảng trạng thái luôn đọc được. Thành cuối và đô không giao | Tất định nên có thể dò đúng ngưỡng bằng save-load. Ngoại lệ thủ đô hơi tùy tiện, tôi chưa chắc nó đúng |
| **P0-5** | Đầu hàng là cách thứ ba có giá trị | Theo mô hình giản lược, bên áp đảo gấp nhiều lần mất rất ít khi đánh và còn diệt sạch quân địch, nên có thể không ai chọn đầu hàng. Ở mức ngang sức thì NPC không đồng ý | Giá trị của đầu hàng chỉ nằm ở vùng ưu thế vừa phải, cộng với việc giữ lại quân mình. **Giá phải trả: quân địch còn sống và quay lại** | Vùng này có thể quá hẹp, khiến đầu hàng là luật thừa. Không thêm đốt kho hay phá nhà chỉ để tạo khác biệt. Nếu K1 thất bại thì bỏ đầu hàng |
| **P0-6** | Lát cắt có một vương quốc NPC hai thành | Khi chỉ có người chơi là đối thủ thì NPC chỉ phòng thủ hoặc đánh người chơi, tức "trại đứng chờ" có thêm bước. Không kiểm chứng được "không cùng phe" | Hai vương quốc 2 thành, thêm mỏ và trại trung lập để tranh nhau | To hơn bản Codex và khó gỡ lỗi hơn. Rủi ro: một vương quốc nuốt vương quốc kia trước khi người chơi kịp tham gia |
| **P1-7** | Cắt đường tiếp tế cần luật, chưa rõ | Đánh chặn dọc đường kéo theo đoạn đường, va chạm, vị trí xe và tiếp cận. Không có nó thì bản Codex không còn cách cắt hàng | Bỏ đánh chặn. Khi vây có hiệu lực: hàng tới phải đi qua cổng, có hộ tống thì đánh quân vây, không có thì quay về; hàng chỉ giao được khi thắng | Không tạo được gameplay phục kích, hộ tống dọc đường. Một trại đặt đúng chỗ không tự cắt tuyến; hậu cần ít kịch tính hơn |
| **P1-8** | Thành có sản xuất và kho có thể khiến vây vô ích | Đúng, nếu vây không tác động gì đến sản xuất | Hồ sơ gốc đặt ô tài nguyên ở **ngoại thành** (Tập 01 §7.1, ĐỀ XUẤT). Khi quân địch làm chủ ngoại thành, sản xuất tại đó dừng. Kho nội thành vẫn dùng được, thời gian cạn tính bằng dự báo sẵn có. Kho đầy thì vây chậm là đúng | Một đạo quân có thể cắt 100% sản lượng một thành, nên phải có điều kiện: thủ quân phải có cơ hội xuất thành. Thành không có quân dễ bị quấy rối (K4) |
| **P1-9** | Điều kiện kiểm soát chưa rõ | "Thanh kiểm soát" kiểu cũ dễ thành thanh tiến độ không cho biết gì | Bỏ thanh; dùng thời gian tiếp quản với các điều kiện đọc được, bị ngắt thì đặt lại hoặc giảm | Ít mượt, đánh xong phải chờ. Thời gian quá dài thành thao tác trống, quá ngắn thì viện quân vô dụng |
| **P1-10** | "Điều khoản phải có nguồn thật", mục tiêu giới hạn để tương lai | Chiếm mỏ rồi dừng, nhưng NPC cứ gửi từng đợt tới chết thì "dừng" không có nghĩa | Chưa cần hòa ước. NPC chỉ phản công khi mô phỏng thấy thắng và nuôi được quân, nếu không thì bỏ. Sau này thử đình chiến có thời hạn trước | NPC có thể trông thụ động, không có "cảm giác kết thúc chiến tranh". Không có nơi thể hiện ngoại giao |
| **P1-11** | Cần AI hợp lý, chưa rõ mức tối thiểu | Tự xây logistics đầy đủ cho AI là dự án riêng; thiếu nó thì NPC thành gian lận | Danh sách ưu tiên ngắn (dưới bảng). NPC chỉ đánh trong tầm lương mang theo, chưa lập trại, chưa vây ở bản đầu | Người chơi gần như không bị vây trong bản thử, phần phòng thủ không được kiểm chứng đầy đủ |
| **P1-12** | Giao thành để rút quân | Chưa nói kho, job, gốc quân, hàng đang đi, và đoàn rút có bị đánh không | Bảng giao thành (dưới bảng) | Đoàn rút được bảo vệ là một luật đặc biệt, không hoàn toàn nhất quán với vật lý |
| **P2-13** | Xử lý save-load chung | Tất định cộng save-load biến báo cáo thành phép thử trước | Coi đó là quyền người chơi, không chống. Ghi rõ trong game. Chế độ một bản lưu nếu có thì để sau, tự nguyện | Một số người tự làm mất căng thẳng |
| **P2-14** | Nêu bảy ý tưởng là phần sau | Dự bị, tự quản, cảnh giới, thủ đô dự phòng đều được thiết kế chủ yếu để bẫy tối ưu hóa dài hạn; chưa có nền để thử | Đặt ngoài lát cắt. Giữ "bỏ thành" đơn giản | Có thể bỏ sót chiều sâu giai đoạn sau |

### Quy tắc đầu hàng đề xuất (P0-4)

Chỉ xét khi thành đang bị vây có hiệu lực. NPC giao thành nếu **cả ba đều đúng**:

1. **Đánh tiếp thua:** chạy cùng bộ máy trận với quân giữ và quân vây đang quan sát được, thủ quân bị diệt. Quân vây đứng trước cổng nên NPC được phép thấy. Không cần thêm chỉ số tâm lý.
2. **Không có cứu viện kịp:** không có lực lượng phe mình đủ thắng theo cùng phép thử và tới được trước khi lương cạn.
3. **Còn đủ lương để đi:** kho có lương cho đoàn rút tới nơi hợp lệ. Hết lương mà chưa giao thì cửa này đóng và áp dụng hậu quả đói.

Giao diện ghi đúng ba dòng lý do, ví dụ: "Thủ quân sẽ thua · Viện binh không kịp · Đủ lương để rút". Trường hợp từ chối cũng nêu dòng nào không đạt. Đề xuất này tránh ngưỡng số, tránh spam và tránh "chết đến người cuối". Chưa kiểm chứng được tần suất xảy ra.

### Bảng giao thành khi rút quân (P1-12)

| Đối tượng | Xử lý đề xuất | Khai thác cần chặn |
|---|---|---|
| Thủ quân | Giữ nguyên chủ cũ; không về tay người chiếm; rời đi theo đường thật, mang lương từ kho | Người chiếm nhận quân |
| Gốc biên chế | Thành mất nên quân vào trạng thái chờ biên chế của chủ cũ (P01, O18) | Hai bên cùng dùng một suất |
| Kho | Trừ lương đoàn rút, còn lại ở thành và theo chủ mới (R02 §10.3) | Đoàn rút chở hết kho; hoặc cấp thêm hàng |
| Khoản giữ, job | Hủy; hàng đã giữ trở về kho thành, không hoàn cho chủ cũ (R02 §3.3) | Hoàn hai lần |
| Hàng đang đi | Thuộc chủ chuyến; đến thành đã đổi chủ thì quay về, không tự giao (T35) | Tặng hàng cho người chiếm |
| Công trình | Giữ nguyên cấp, không chia 1/2 hay 1/3 (D18, T50) | Hiểu nhầm với tái lập |
| Quyền, tuyến | `ownership_version` tăng; tuyến và lệnh cũ mất hiệu lực (I08) | Chủ cũ tiếp tục ra lệnh |
| Hạn mức chủ mới | Tăng dần theo P03; không có ngay | Lấy suất tức thời để tuyển |
| Đoàn rút | Không bị tấn công trong hành trình; hết bảo vệ khi tới nơi. Nơi tới đang bị vây thì không đủ điều kiện | Đuổi giết sau khi nhận thành |

**Ai có thể farm gì:**
- Người chơi có thể để một thành NPC phục hồi rồi cướp lại. Tài nguyên đó do NPC sản xuất thật nên đây là quyền của người chơi, chỉ theo dõi xem có áp đảo không.
- Hàng loạt thành giao liên tiếp khiến quân NPC dồn về thành cuối. Đó là kết cục hợp logic, cần thử sức chứa và lương (K8).
- NPC không được dùng đầu hàng để dịch chuyển quân: đoàn rút đi đường thật.
- Luật đối xứng: người chơi cũng được chọn giao thành khi bị vây, cùng cách xử lý. Hỏi ngược Codex ở mục G.

### Vương quốc NPC tối thiểu (P1-11)

Tài sản thật: kho, quân, sản xuất cùng luật với người chơi, không sinh lực lượng bí mật. Nếu có hỗ trợ độ khó, hỗ trợ đó được cấu hình và ghi sổ.

NPC xét theo chu kỳ thời gian game, lấy việc đầu tiên thực hiện được:

1. **Giữ:** thành bị đe dọa thì cứu nếu phép thử thắng; không thì không gửi quân đi chết.
2. **Nuôi:** đủ lương chưa, nếu chưa thì chuyển hàng trên một tuyến sẵn hoặc ngừng tuyển.
3. **Chiếm:** mục tiêu trung lập gần nhất mà phép thử thắng và lương mang theo đủ.
4. **Đánh:** mục tiêu của đối thủ dựa trên tin đã quan sát (có thể cũ), ưu tiên thứ gần nhất và yếu nhất.
5. **Xây:** theo danh sách đặt sẵn; tuyển đến hạn mức.

Đủ để thấy các vương quốc tranh nhau mà không cần thủ lĩnh hay thanh quan hệ. **Điều kiện nhận diện lỗi:** nếu sau một khoảng dài NPC không làm gì mà vẫn có tài sản, hoặc gửi quân thua lặp lại vào cùng mục tiêu, thì coi đó là lỗi thiết kế. Thành không nuôi nổi quân giữ được phép bỏ.

### Thời gian và bản lưu

- Thế giới chạy bằng hàng đợi sự kiện theo thời gian game; tốc độ chỉ đổi tỉ lệ với giờ thực; **không tính theo khung hình**.
- Thứ tự cùng mốc giữ theo tinh thần O10: hoàn thành công việc → hàng đến → xét đói → quân đến và giao chiến → tiếp quản → NPC quyết định.
- Lệnh đặt khi pause có hiệu lực tại mốc hiện tại, trước lượt NPC cùng mốc.
- Bản lưu gồm trạng thái, hàng đợi sự kiện, ledger, phiên bản luật và trạng thái PRNG nếu có. Chỉ lưu giữa hai sự kiện. Cùng bản lưu cộng cùng lệnh phải cho cùng kết quả.
- **Giữ từ hồ sơ cũ:** ownership, bảo toàn tài nguyên và quân, ledger, sự kiện cũ không ghi đè trạng thái mới, tách đoạn sản xuất.
- **Bỏ vì không còn cần:** tài khoản, đăng nhập, khóa cạnh tranh giữa nhiều người, mã chống gửi lại kiểu API, tài khoản phụ, bất hoạt (O26), bảo vệ người mới (O11), thời gian phản ứng theo giờ đời thực (P08 thay bằng pause và tự dừng theo sự kiện).

### Đế chế lớn ổn định vẫn thú vị

**Tình huống (giả thuyết):** người chơi có 30 thành liền nhau, không còn đối thủ gần. Vương quốc Nam vừa nuốt Tây bằng chính luật chung, nên giữ hai Đại thành, nhưng ở xa 9 ngày đường. Không có quân nào được sinh thêm vì người chơi mạnh; Nam mạnh vì thắng trận.

**Quyết định còn lại:**
- Xây thành trung chuyển qua đèo, hay dựng ba trại nối tiếp chịu nghẽn xe?
- Rút bao nhiêu quân khỏi vùng trong mà không để mỏ bị thổ phỉ cướp?
- Đánh Đại thành, hay chỉ lấy mỏ biên giới rồi dừng?

**Nếu người chơi vẫn áp đảo:** không phạt. Cho nhận kết cục "thống nhất", ghi vào lịch sử, và chơi tiếp nếu muốn. Thắng lớn là phần thưởng, không phải lỗi cần sửa.

**Mặt trái:** giai đoạn cuối có thể chỉ là dọn dẹp lặp lại. Nếu K12 cho thấy vậy, cần công cụ chiến dịch hoặc kết thúc sớm hơn, không phải tăng sức địch.

## C. Vòng chơi tối giản

### Trạng thái một thành

| Trạng thái | Vào khi | Ra khi |
|---|---|---|
| **Bình thường** | Mặc định | Quân địch đến và không bị đẩy lui → Bị vây |
| **Bị vây** | Có quân địch đóng ngoài thành, thủ quân chọn không xuất hoặc xuất thua mà còn quân trong thành | Quân vây rút hoặc bị đánh tan → Bình thường. Hết thủ quân → Trống |
| **Trống** | Thủ quân chết hết, đã rút hoặc đã giao | Quân địch đủ lực lượng tối thiểu bắt đầu giữ → Tiếp quản |
| **Tiếp quản** | Bộ đếm chạy, lực lượng còn đủ, còn lương | Hết giờ → Đổi chủ. Bị đánh thua hoặc hết lương → dừng và đặt lại |
| **Đổi chủ** | Một sự kiện duy nhất, `ownership_version` tăng | → Ổn định dần |
| **Ổn định dần** | Đóng góp sản lượng và hạn mức tăng theo thời gian (P03) | → Bình thường |

**Hiệu ứng khi bị vây:** sản xuất ngoại thành dừng; hàng tới phải qua quân vây; kho nội thành dùng được; quân vây ăn từ trại và lương mang theo; thủ quân đánh từ sau tường, nếu xuất thành thì mất lợi thế tường.

**Lựa chọn của bên công khi vây:** đánh ngay; chờ thủ quân suy yếu; nhận giao thành nếu đủ điều kiện; rút.

**Phân biệt các khái niệm:**

| Khái niệm | Là gì | Đổi chủ không? |
|---|---|---|
| Thắng trận | Kết quả một trận | Không |
| Cướp | Lấy hàng rồi đi | Không |
| Giữ vị trí | Quân làm chủ ngoại thành hoặc mỏ | Không với thành; mỏ theo O20 |
| Tiếp quản | Bộ đếm sau khi hết thủ quân | Có, khi hoàn tất |
| Mục tiêu chiến tranh | Việc người chơi muốn và dừng ở đâu, không phải dữ liệu luật | Không |
| Hòa ước | Chưa có ở bản đầu. Sau này chỉ được công nhận thứ có chỗ dựa thực địa | Tùy điều khoản |

### Ví dụ (mọi số chỉ minh họa)

1. **Xây.** Nâng ruộng, kho; xây Doanh trại; tuyển 800 quân; xe chở lương hoạt động.
2. **Mỏ.** Trinh sát trại thổ phỉ cạnh mỏ sắt, thắng trận, đóng quân khai thác, gửi xe. Vương quốc Đông xét phản công, thấy mình sẽ thua nên bỏ. Người chơi có thể dừng ở đây.
3. **Nhắm thành.** Thành Hà Tây của Đông có 900 giáo theo tin 2 ngày trước. Người chơi đưa 1.500 quân cung và kiếm, dựng trại, bắt đầu vây. Sản xuất Hà Tây dừng; dự báo cạn lương sau 5 ngày.
4. **Thất bại.** Viện binh Đông tới sau 2 ngày, đánh vào trại không có tường. Người chơi mất 40%, không có gì đổi chủ. Báo cáo: "Thua vì đóng trại ngoài tường và viện binh tới trước khi thủ quân đói".
5. **Rút lui.** Đạo quân còn lại rút về thành, tốn lương đường về, chuyến xe đang tới được gọi quay về. Hà Tây trở lại Bình thường.
6. **Thử lại khi thời cơ khác.** Đông và Nam đang đánh nhau, quân chủ lực Đông ở xa. Người chơi trở lại, vây. Bảng trạng thái: "Thủ quân sẽ thua · Viện binh không kịp · Đủ lương để rút".
7. **Chọn.** Đánh thì mất nhiều quân nhưng diệt 600 lính. Nhận giao thì giữ quân mình nhưng 600 lính kia sống. Người chơi nhận vì đang thiếu lực.
8. **Thành thứ hai.** Thành Trống, 1 ngày tiếp quản, Đổi chủ. Công trình giữ nguyên; kho còn lại theo chủ mới; sản lượng tăng dần.
9. **Hậu quả.** Ba tuần sau, chính 600 lính đó nằm trong đạo quân phản công. Người chơi có lý do nhớ quyết định cũ.

## D. Phạm vi bản thử

**Có:**
- Một vùng, hai vương quốc NPC mỗi bên 2 thành, vài trại thổ phỉ trung lập, một loại mỏ.
- Năm quân, bố trận mẫu, báo cáo; trinh sát dạng lệnh, tin có mốc thời gian.
- Trại, xe, lương vật lý; preset O04 đơn giản: hết lương thì yếu đi, chưa chết hàng loạt.
- Máy trạng thái thành ở mục C với vây (cắt ngoại thành và chặn tại cổng).
- Đầu hàng và giao thành **dạng cờ bật/tắt**, chỉ NPC giao cho bên công, để so sánh có và không.
- Pause, tốc độ, lưu tay, tự lưu, tải lại.

**Hoãn:**

| Hạng mục | Lý do |
|---|---|
| Đánh chặn dọc đường, hộ tống trên tuyến | Cần mô hình đoạn đường; chặn tại cổng đủ để thử trước |
| Hòa ước, nhường mỏ, bồi thường | Dừng bằng thực địa trước. Bồi thường cần nghĩa vụ giao hàng thật, không có trước khi có chứng cứ cần |
| NPC lập trại, NPC vây | Logistics AI lớn; bản đầu NPC đánh trong tầm lương mang theo |
| Đại thành và thưởng D25 | Chỉ thêm sau khi chuyển quyền đúng |
| Tái lập D17/D18 | Vẫn là hướng đã chốt, nhưng bản thử dùng tải lại khi thua; bổ sung trước bản đầy đủ |
| Chư hầu | Chủ dự án chưa chọn. Có thể mở ra cách kết thúc chiến tranh không cần quản thêm đất, nhưng cần luật tuân lệnh, cống nạp vật lý và phản bội, đồng thời dễ dẫn đến quân chung. Không đưa vào; hỏi sau khi có vòng lõi |
| Tính cách vương quốc, thủ lĩnh, ghi nhớ vùng | Chưa cần để có hành vi hợp lý |
| Thuế, An dân, sĩ khí, quản trị, bảy ý tưởng cũ | Không làm trước khi thử không có chúng. Hợp đồng dài hạn, thủ đô dự phòng và tự quản yếu nhất trong bối cảnh này |

## E. Kịch bản kiểm chứng

Tất cả **chưa chạy**. Ngưỡng cụ thể cần chọn trước khi thử.

| Mã | Kịch bản | Đạt | Thất bại |
|---|---|---|---|
| K1 | **Phản chứng công phá:** cùng thành, ưu thế 1,2/2/5 lần, có và không có tường | Có ít nhất một ưu thế mà đánh ngay không phải lựa chọn tốt nhất | Đánh ngay tốt nhất mọi mức, hoặc không bao giờ đáng đánh |
| K2 | **Phản chứng vây:** thành kho đầy, có quân đủ, viện binh gần | Dự báo cho thấy vây không đáng; người thử chọn khác | Vẫn chờ và thắng miễn phí |
| K3 | **Chi phí chờ:** cùng vây, có đối thủ thứ ba tranh mục tiêu lân cận, dùng tua nhanh | Chờ lâu có thể mất mục tiêu hoặc bị viện binh | Tua nhanh luôn là tối ưu |
| K4 | **Vây giá rẻ:** 50 quân ngoài thành có 500 quân; và 50 quân ngoài thành không có quân | Trường hợp đầu bị đẩy lui; trường hợp sau cắt sản xuất nhưng có cách xử lý rõ | Lực lượng tí hon liên tục làm tê liệt thành |
| K5 | **Phản chứng đầu hàng:** có viện binh kịp; hoặc đủ quân thắng; hoặc hết lương đi; hoặc thành cuối | NPC từ chối, nêu đúng dòng lý do | Luôn đồng ý, hoặc kết quả không giải thích được |
| K6 | **Dừng sau mỏ:** chiếm mỏ rồi ngừng đánh | NPC phản công khi có lợi, bỏ khi không; "dừng" là lựa chọn được | NPC gửi quân chết lặp lại, hoặc không làm gì suốt |
| K7 | **Giao thành, kế toán:** kho, khoản giữ, job, hàng đang đi, suất, tải lại ngay sau đó | Mọi tài sản có đúng một chủ; không nhân; không mất oan | Bất kỳ sai lệch sổ nào |
| K8 | **Cuốn chiếu:** giao liên tiếp nhiều thành | Quân dồn về thành cuối tạo trận khó thật, sức chứa và lương có tác dụng | Cả vương quốc rơi không một trận |
| K9 | **Thế giới không có người chơi:** người chơi đứng yên 30 ngày game | NPC tranh mục tiêu, kho và quân khớp sổ, không sinh tài nguyên ngoài nguồn | NPC đứng yên, hoặc tăng quân không có nguồn |
| K10 | **Không thể thắng:** NPC không có đường hoặc thiếu lương; mục tiêu xa | Bỏ mục tiêu, không chết lặp | Tự sát lặp lại, hoặc kẹt hành vi |
| K11 | **Thời gian:** cùng bản lưu và lệnh ở tốc độ 1, 8, có pause, lưu giữa hành quân rồi tải | Kết quả trùng khớp; không nhận lại chiến lợi phẩm | Tốc độ đổi kết quả, hoặc nhân tài sản |
| K12 | **Đế chế lớn:** 30 thành so với 10 thành trong thế giới cùng hạt khởi đầu | Vương quốc NPC không khác vì số thành người chơi trước lần tiếp xúc đầu; người thử nêu được ít nhất hai mục tiêu đáng làm hoặc chọn kết thúc thỏa mãn; số lệnh mỗi chiến dịch chấp nhận được | Có tăng sức bí mật, chỉ còn việc lặp, hoặc buộc phải chơi tiếp |

Đo thêm: người thử có tự nói được vì sao thua; có chọn khác nhau trong cùng tình huống không; có muốn thử lại không. Số giờ chơi không tự chứng minh game vui.

## F. Chủ dự án cần chọn

1. **Có kết thúc không?** (a) Có mốc thống nhất tự nguyện, chơi tiếp được; (b) Sandbox vô tận. Mặc định đề xuất: (a).
2. **Nhịp một chiến dịch ở tốc độ thường?** Mặc định đề xuất để thử: một chiến dịch nhỏ khoảng 20–40 phút thực, có pause và tua. Con số là giả thuyết, nhưng cần hướng để làm lại thời lượng.
3. **Thua thành cuối trong bản đầy đủ:** (a) Tái lập theo D17/D18, vẫn được tải lại; (b) Chỉ tải lại. Mặc định đề xuất: (a). Bản thử tạm dùng tải lại.

**Mặc định có nhãn, không chặn công việc:** NPC cùng luật với người chơi; độ khó nếu có thì minh bạch; chưa có chư hầu; pause và tua áp dụng cả thế giới; save-load tự do; không có điểm chiến tranh.

## G. Bất đồng, chưa chắc và câu hỏi cho Codex

**Tôi bất đồng với Codex:**
- Ba đường chinh phục là ba cơ chế riêng.
- "Mục tiêu chiến tranh" cần được biểu diễn trong luật ở bản đầu.
- Một vương quốc đủ cho lát cắt.
- Bao vây có thể để sau: tôi cho rằng thiếu nó thì đầu hàng mất cơ sở và công phá dễ thành "gửi nhiều nhất". Bản vây tôi đề xuất chỉ cần trạng thái, không cần mô phỏng đường.

**Tôi đồng ý với Codex:**
- Không dùng điểm thắng trận làm tiền mua điều khoản.
- Không sinh quân bí mật.
- AI không biết kho và lệnh bí mật.
- Pause và tua áp dụng toàn thế giới.

**Tôi chưa chắc:**
- Vùng có giá trị của đầu hàng có đủ rộng không (P0-5). Có thể K1 sẽ loại bỏ nó.
- Phép thử bằng bộ máy trận cho AI có quá chính xác đến mức dễ dò, hay quá tốn khi có nhiều thành.
- Cắt toàn bộ sản xuất ngoại thành có quá nặng không. Dừng một phần lại thêm một tham số.
- Bảo vệ đoàn rút có phá logic vật lý hơn mức cần.
- Hai vương quốc có đủ, hay một bên sẽ thắng quá sớm.
- Nhận định về quân áp đảo dựa trên mô hình giản lược, chưa có mô phỏng.

**Câu hỏi cho Codex ở vòng 2:**

1. Bạn có phản ví dụ nào mà ba đường là khác nhau thật, tức không quy được về máy trạng thái ở mục C?
2. Nếu bỏ hẳn đầu hàng, thiết kế mất gì cụ thể mà công phá và vây chưa cho?
3. Khi tua nhanh gần như miễn phí, cơ chế nào ngoài NPC tranh mục tiêu khiến việc chờ có giá? Có phương án rẻ hơn không?
4. Dừng ngoại thành khi bị vây có xung đột với hình dung của bạn về sản xuất và kho không? Nếu có, bạn đề xuất tác động cụ thể nào thay thế?
5. NPC chỉ đánh trong tầm lương mang theo có quá yếu không? Nếu cho NPC lập trại ngay, phần nào của luật hậu cần có thể dùng chung mà không làm thành dự án AI?
6. Người chơi có nên được NPC đề nghị giao thành, hay người chơi tự giữ quyền đó? Luật đối xứng có đáng khi người chơi có thể tải lại?
7. Thang thời gian bạn hình dung là gì, và những giá trị nào trong bảng tính bạn cho rằng vẫn dùng được?
8. Khi nào bạn coi lát cắt này thất bại đến mức cần đổi luận điểm chính, chứ không chỉ chỉnh số?
