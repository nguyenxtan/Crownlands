# Review: nhánh quân có năng lực và NPC lưu động

Ngày 07/11/2026. Người viết: Claude. Đối tượng: [nguồn người dùng](../sources/2026-11-07-offline-design-addendum.md) (U08) và [đề xuất của Codex](../proposals/2026-11-07-branches-and-mobile-npcs.md), đối chiếu bộ tài liệu 1.2.

**Trạng thái:** ý kiến một phía, Codex chưa phản biện. Mọi cơ chế dưới đây là ĐỀ XUẤT/THỬ NGHIỆM, trừ các hướng được bảng ở mục 2 ghi rõ là người dùng đã chọn. Không có mô phỏng hay playtest. Không có con số cân bằng nào; các số đếm chỉ để ước lượng khối lượng.

## 1. Kết luận

1. **Tôi rút khuyến nghị Paladin thuần quân sự và hoãn phép.** U08 đã chọn nhánh Thánh và đối lập có năng lực riêng. Đó là khuyến nghị cũ của reviewer, không phải giới hạn của dự án. "Năng lực" cũng không buộc phải có mana hay điều khiển phép.
2. **Hiệu ứng nên chỉ tồn tại trong một trận, tự kích hoạt.** Chỉ lưu một mốc hồi ở từng cohort. Cách này chặn phần lớn lỗi reset khi tách, gộp, đổi nhánh và tải, mà không cần hệ thống trạng thái lâu dài.
3. **Năng lực khắc chế không được chết khi đối phương không có thứ để khắc.** Quân chế phải mạnh bằng chỉ số và trang bị, không cần một thanh sợ hãi để có việc làm.
4. **NPC lưu động làm được mà không cần luật đánh chặn:** đoàn là chuỗi hành quân thường có dừng tại địa điểm, chỉ giao chiến tại địa điểm. Giới hạn: hai đoàn cắt nhau trên đường không có gì xảy ra, và "phá tiếp tế dọc đường" chưa có. Phải ghi thẳng điều này.
5. **Lát cắt nên là dọc:** một dòng kỵ đi đủ I–III rồi IV ba nhánh (14 profile toàn bộ), hai năng lực và một năng lực bị động, một đoàn có căn cứ. Khác Codex ở chỗ tôi đặt **lưu vong trước du mục**, vì lưu vong không cần mô hình hạn mức mới.

Chưa có bằng chứng các nhánh này vui, hay hai lớp khắc chế đọc được trong báo cáo.

## 2. Quyền hạn: đã chọn và chưa khóa

| Nội dung | Trạng thái theo U08 | Chưa khóa, không được tự nâng cấp |
|---|---|---|
| Offline, làm để cá nhân chơi | **ĐÃ CHỌN** (§1.1) | Runtime, lưu, tốc độ |
| Quân tiến hóa rõ về trang bị, hình dáng, khả năng | **ĐÃ CHỌN** (§1.1) | I–V, mốc, profile |
| Học viện liên kết quân, hậu cần, chinh phục | **ĐÃ CHỌN** (§1.1) | Sáu nhóm, 1–3 dự án, kiến thức toàn đế chế, mốc 5/10/15/20 |
| Nhánh Thánh và đối lập, có năng lực riêng và cách đối phó | **ĐÃ CHỌN** (§1.1) | Tên Quân chế/Thánh Quang/Hắc Ảnh, ba nhánh ở IV–V, 45 cấu hình, từng năng lực |
| NPC có phân loại, phe, khuynh hướng, quan hệ khác nhau | **ĐÃ CHỌN** (§1.1) | Bảy phe, tên, bảng quan hệ, đầu hàng |
| NPC lưu động, không bắt buộc nằm trong thành hay trại | **ĐÃ CHỌN** (§1.1, §13.1) | Ba loại đoàn, hạn mức di động, đi qua biên, giao thương, định cư |
| Thế giới lâu dài | **ĐÃ CHỌN** từ trước | Mục tiêu dài hạn |
| Cường công, bao vây, cô lập buộc đầu hàng | **Phương án đã thảo luận** (§11) | Không phục hồi ba hệ đổi chủ; đầu hàng chính thức vẫn là ứng viên hoãn |
| Paladin là Thánh kỵ sĩ cưỡi ngựa | Tên tạm trong đề xuất (§6.3), nhưng ý "không phải kiếm mọc ngựa" rõ | Tên cuối, bậc xuất hiện |

Mã D mới cho các hướng này do coordinator cấp. Khi ghi, chỉ ghi hướng, không ghi cả chi tiết.

## 3. Phát hiện

### P0-1. Tài liệu 1.2 vẫn phủ quyết hướng đã chọn

**Vấn đề:** `gameplay-blueprint.md` §7 và §9, `military-and-research.md` §1 và §8, biên bản §2 và §6 đều ghi khuyến nghị thuần quân sự hoặc hoãn phép.

**Phản ví dụ:** nếu giữ nguyên chỉ thêm một đoạn, lát cắt sẽ tiếp tục đẩy Thánh và đối lập ra sau mọi mốc nên không bao giờ được thử.

**Sửa:** thay bằng hướng có năng lực riêng, thử có phân kỳ. Xem mục 8.

**Mặt trái:** thêm khối lượng ngay ở giai đoạn đầu, tăng rủi ro kéo dài trước khi có vòng lõi. Vì vậy vẫn giữ A1 trước (mục 6).

### P0-2. Hiệu ứng bị reset qua tách, gộp, lặp trận, đổi nhánh

**Phản ví dụ:**
- Hộ trận có dung lượng cố định mỗi nhóm: chia 100 quân thành 10 nhóm được 10 lần dung lượng.
- Hồi theo trận: gửi từng đợt nhỏ để mỗi trận mới hồi đầy.
- Đổi nhánh đi và về để hồi đầy.
- Tải lại bản lưu để hồi: đây là một lỗi nhất quán nếu trạng thái hồi không được lưu.

**Sửa:**
- Dung lượng **tỷ lệ tuyến tính** với số quân nguồn còn sẵn sàng; không có phần cố định theo nhóm.
- Mốc `ability_ready_at` theo **thời gian thế giới**, lưu ở cohort. Tách thì cả hai giữ cùng mốc. Cohort khác mốc không gộp thành một; đạo quân vốn đã chứa được nhiều cohort.
- Đổi nhánh hoặc nâng bậc xong: `ability_ready_at = T_hoàn_tất + hồi`. Không có đường hồi nhanh.
- Không cần sự kiện cho việc hồi, chỉ so sánh khi vào trận.

**Mặt trái:** số cohort có thể tăng dần, giao diện cần gom hiển thị. Gửi nhiều đợt vẫn có giá trị vì đợt sau đánh khi đối phương đang hồi; tôi cho đó là chiến thuật hợp lệ.

**Không phải lỗi:** người chơi tải lại để chọn cách khác. Yêu cầu chỉ là cùng trạng thái và cùng đầu vào thì nhất quán.

### P0-3. Năng lực khắc chế chết khi không có mục tiêu; Quân chế có nguy cơ rỗng

**Phản ví dụ:**
- Phá ấn gặp đội không có Hộ trận thì không làm gì, nên Hắc Ảnh thua Quân chế vì mất phần giá đã trả cho năng lực.
- Kỷ luật chống sợ hãi khi game không có sợ hãi: Quân chế không có năng lực nào hoạt động. Thêm thanh sĩ khí chỉ để có việc là thêm hệ thống để vá.
- Nếu chỉ phép mới phá được phép, người chơi Quân chế buộc phải nghiên cứu đối nghịch. Điều này phá ý "con đường hoàn chỉnh" (§7.1).

**Sửa:**
- Giá năng lực nằm trong profile. Hắc Ảnh có công cao hơn, máu thấp hơn, nên vẫn có giá trị khi không có gì để phá.
- Hiệu ứng luôn hữu hạn, nên **lực thật là cách đối phó phổ quát**: đủ sát thương thì xuyên hết Hộ trận.
- Quân chế có chỉ số nền cao nhất tại cùng giá, đổi nhánh và thay thế rẻ, và **trang bị chuyên dụng** chỉ tăng thế mạnh sẵn có của dòng, không giảm điểm yếu của dòng.
- Kỷ luật hoãn. Khi có Nguyền ấn thì định nghĩa lại là giảm thời hạn hiệu ứng đó, không cần sợ hãi.

**Mặt trái:** Quân chế có thể nhàm so với hai nhánh còn lại, và Hắc Ảnh ở lát cắt có thể chỉ giống đội pháo thủy tinh. Đó là câu hỏi để thử, không để che.

### P0-4. "Lưu động" không tự có luật chạm trán

**Vấn đề:** 1.2 không có trận trên đường. U08 muốn đoàn đi tuần, truy đuổi, phá tiếp tế, thương đoàn gặp nguy hiểm. Codex đề xuất "điểm hoặc waypoint".

**Phản ví dụ:** nếu thêm waypoint vào mọi chuyến, đoàn xe và đoàn rút cũng phải qua điểm. Đó chính là đánh chặn đã hoãn, kéo theo trạng thái dừng, va chạm và hộ tống cho mọi loại di chuyển.

**Sửa, khác Codex một chút:** **không thêm waypoint vào mô hình di chuyển chung.** Đoàn lưu động là chuỗi các lệnh hành quân thường tới **địa điểm**, có thời gian dừng. Trận chỉ xảy ra khi hai bên cùng hiện diện tại một địa điểm và có bên thù địch hoặc có lệnh tấn công. Xe và quân khác không bị ảnh hưởng.

**Ghi rõ giới hạn:**
- Hai đoàn cắt nhau trên đường không có trận.
- Thổ phỉ hay Hắc triều chỉ phá tại mỏ, trại, cổng, không chặn xe trên đường.
- Muốn chặn ai thì phải đến địa điểm họ sẽ dừng.

**Mặt trái:** thế giới có cảm giác đi từng trạm, và đoàn đi xuyên qua nhau trên màn hình có thể trông giả. Nếu chủ dự án thấy không chấp nhận được thì phải làm luật đoạn đường thật, một phạm vi lớn, không vá bằng icon.

**Đoàn có ích nhờ:** quan sát và làm mới tin tình báo cho phe mình, tấn công địa điểm yếu theo dự báo, chiếm mỏ theo luật, chở hàng thật. Chiến lợi phẩm là thứ đoàn thực sự mang, không có phần thưởng cố định.

### P0-5. Hạn mức di động có thể phá D22 và luật "cùng luật"

**Phản ví dụ:**
- Mất thành cuối, đạo quân tự thành du mục và được tuyển lại: phá nguồn.
- Một cách hiểu rộng cho người chơi đưa quân ra ngoài để tuyển không giới hạn.
- `technical-design.md` §1 ghi NPC gọi cùng hành động như người chơi; du mục sẽ mâu thuẫn nếu không khai báo.

**Sửa:**

| Loại | Nguồn quân | Suất | Lương và bổ sung | Khi mất nơi dựa |
|---|---|---|---|---|
| **Có căn cứ** | Thành thật | Theo thành gốc, đi xa vẫn tính | Mang theo, kho nguồn, tiếp tế | Lập tức thành tàn quân |
| **Lưu vong** | Chỉ quân thực sự còn sống và rút thoát | Không có suất mới, **không tuyển được** | Mang theo, khai thác, chiến lợi phẩm | Không áp dụng |
| **Du mục** | Ngân sách preset thế giới | `capacity_model = mobile`, gắn xe và hàng, chỉ NPC được cấu hình | Xe, hàng, thời gian, dừng tại địa điểm hợp lệ | Mất xe thì giảm năng lực |

Viết lại "cùng luật" là: **cùng bảo toàn tài sản, thời gian, tầm nhìn; khác biệt tổ chức phải khai báo theo loại phe.** Người chơi luôn cần thành gốc.

**Mặt trái:** có một ngoại lệ thật trong luật. Du mục có thể bị người chơi coi là "không công bằng" nếu không hiển thị nguồn của nó. Công thức hạn mức di động chưa có và tôi chưa muốn viết trước khi thử.

### P1-6. 45 cấu hình

**Kiểm tra:** 5 × [3 + (3 × 2)] = 45, đúng khi mọi tổ hợp đều tồn tại, chưa tính công thành và quân chức năng. Đây là 45 profile của 5 dòng, không phải 45 dòng, không phải cam kết 45 model.

**Khối lượng ẩn:**
- Cặp đấu: 45 × 46 / 2 = 1.035 cặp trước khi tính thành phần đội hình và trạng thái hồi.
- Đường nâng: nếu mỗi lần một bậc và được đổi nhánh cùng bậc ở IV, V thì mỗi dòng 20 cạnh, tổng 100 cạnh có giá và thời gian.

**Kế thừa dữ liệu không giảm việc cân bằng.** `base_line + tier_delta + path_delta + override` giảm số dòng phải nhập, không giảm số cặp cần đọc. Cùng hệ số nhân trên voi và kiếm cho kết quả tuyệt đối khác hẳn, nên phải có override.

**Sửa:** dùng kế thừa để nhập liệu, cân bằng bằng tập tình huống đại diện, không có ma trận 45×45.

**Mặt trái:** có thể bỏ sót tổ hợp phá game, người chơi vẫn tìm ra.

### P1-7. Các trục bị trộn

**Phản ví dụ:** "Giáo đoàn Bình Minh" được gán cứng Thánh rồi coi là bạn. Một phe Hắc đang hòa bình với người chơi bị đánh tự động. Paladin coi như dòng thứ sáu.

**Sửa, các trường độc lập:**

| Trục | Gắn với | Ví dụ |
|---|---|---|
| `line` | Cohort | Kỵ |
| `tier` | Cohort | IV |
| `path` | Cohort, chỉ từ IV (trống trước đó, không phải "Quân chế yếu") | Thánh |
| `faction` | Chủ | Vương triều X |
| `path_bias` | Cấu hình phe, chỉ ảnh hưởng ưu tiên nghiên cứu và tuyển | Thiên Thánh |
| `relation` | Cặp phe, thay đổi được | Trung lập, thù địch |
| `group_role` | Đoàn: tuần tra, viễn chinh, du mục, lưu vong | Tuần tra |

Không có tên đạo đức trong luật. Bản đầu `relation` chỉ có hai giá trị. **Mặt trái:** chưa có sắc thái ngoại giao.

### P1-8. Hai lớp khắc chế

**Phản ví dụ:** Hộ trận giảm phần trăm sát thương, giáo mất tác dụng với Paladin.

**Sửa, thứ tự cố định:** sát thương tính theo `line` trước (K giữ nguyên, 5×5), rồi mới đến lớp bảo hộ. Hộ trận là **lượng hấp thụ hữu hạn**, không phải phần trăm giảm. Không hiệu ứng nào đổi K. Vì thế đội giáo đông vẫn xuyên hết rồi gây lợi thế K.

**Báo cáo:** một dòng cho mỗi tác động, ví dụ: "Hộ trận hấp thụ 240 sát thương của giáo binh, hết ở lượt 3; giáo tiếp tục gây thêm 30% lên kỵ". **Mặt trái:** báo cáo dài hơn, cần gộp.

### P1-9. Đổi nhánh

Dùng lại `UpgradeJob` của 1.2, thêm:

| Vấn đề | Quy tắc đề xuất |
|---|---|
| Hiệu lực | Một `path` mỗi cohort. Trong lúc làm việc: profile cũ. Lúc hoàn tất: đổi một lần |
| Năng lực | Cũ hết và mới có từ mốc hoàn tất, mới bắt đầu ở trạng thái đang hồi. Không có lúc hưởng đôi |
| Suất | Phần tăng giữ khi bắt đầu; phần giảm chỉ trả sau khi xong; quân chết giải phóng ngay |
| Tổn thất | Như nâng: cùng phân bổ, không hoàn phần đã chết |
| Hủy | Về profile cũ, `ability_ready_at` không đổi, không có hoàn thừa |
| Đổi chủ hoặc mất cơ sở | Hủy; quân giữ chủ và profile cũ |
| Mất gốc | Theo O18/O30 đang mở |
| Điều kiện | Biết nhánh đích, cơ sở tại chỗ, kho tại chỗ |

Đế chế học nhiều nhánh và trộn quân trong một đạo quân là mặc định thử. Không có bất mãn, không ép một phe một nhánh. **Mặt trái:** về sau, người chơi có thể có đủ tất cả và mất bản sắc. Câu 1 ở mục 9 hỏi chủ dự án.

### P1-10. Vòng đời đoàn trong thế giới dài

**Phản ví dụ:** cứ 10 ngày sinh một đoàn nên sau 3 năm game có hàng trăm đoàn và lịch sự kiện đầy. Hoặc xóa đoàn khi hết nhiệm vụ để nhẹ máy thì mất quân thật.

**Sửa:**
- **Nguồn:** từ căn cứ, sự kiện rút thoát, hoặc ngân sách preset tại địa điểm vào có khai báo, ngoài tầm nhìn và không ở trong thành người chơi.
- **Trần:** theo phe và toàn thế giới (cấu hình). Không tính theo sức người chơi.
- **Kết thúc:** có căn cứ thì về và gộp thủ quân. Không còn mục tiêu thì chọn lại, nhiều lần thất bại thì về. Không có nơi về thì thành tàn quân.
- **Giải tán:** chỉ khi hết quân, hoặc là hành động có ghi sổ (rã ngũ là tiêu hao, hàng để lại tại địa điểm, không biến mất).
- **Tải máy:** mỗi đoàn chỉ có một sự kiện kế tiếp. Báo cáo cũ được tóm tắt, không xóa lịch sử quan trọng.

**Mặt trái:** đoàn có thể tụ tập ở điểm tắc, và ngân sách preset cuối cùng cũng cạn nên thế giới già có thể vắng lặng. Chưa rõ nên hồi hay không.

### P1-11. Truy đuổi và tầm nhìn

**Phản ví dụ:** đoàn Thánh luôn biết đoàn Hắc ở đâu vì cùng trong bộ nhớ máy.

**Sửa:** truy đuổi chỉ đi tới **địa điểm được nhìn thấy gần nhất**. Đến nơi không gặp thì trinh sát hoặc bỏ sau số lần giới hạn. Mục tiêu đi không biết được đích, chỉ biết hướng nếu trong tầm nhìn. Forecast tính năng lực đã quan sát theo profile, giả định sẵn sàng vì không biết mốc hồi. **Mặt trái:** truy đuổi hay thất bại, trông kém thông minh. Điều đó chấp nhận được hơn là nhìn trộm.

### P2-12. Thứ tự các loại đoàn, và phạm vi tương tác

**Khác Codex:** Codex đặt du mục và lưu vong cùng sau đoàn có căn cứ. Tôi đề xuất **lưu vong trước du mục**. Bản 1.2 đã có quân tồn tại sau khi hết thành và chiếm nơi trống qua quy trình chung, nên lưu vong chỉ thêm một nhiệm vụ "tìm nơi ở". Du mục cần cả mô hình hạn mức và ngân sách mới. **Mặt trái:** lưu vong hiếm xuất hiện, cần kịch bản dựng sẵn để thử.

Giao thương với đoàn, xin qua biên, định cư, thương đoàn đổi đường: mỗi thứ là một phạm vi riêng, hoãn.

## 4. Mô hình gọn

### Hiệu ứng

**Nguyên tắc:** tự kích hoạt theo bố trận và lượt, không ra lệnh trong trận (D08, D09). Hiệu ứng chỉ tồn tại trong trận; trận là nguyên tử tại pha 2 nên không có hiệu ứng dở trong bản lưu. Không có mana, hồi sinh, triệu hồi, dịch chuyển.

**Hai đồng hồ:** thời hạn đếm bằng **lượt trận**, không mất thời gian thế giới. Hồi đếm bằng **giây mô phỏng**.

**Trong một lượt, theo thứ tự cố định, không theo bên:**
1. Xác định nhóm sống và mục tiêu từ trạng thái đầu lượt (R02 §6.2).
2. Áp hiệu ứng khởi đầu nếu là lượt đầu.
3. Gỡ bỏ (Thanh tẩy), rồi áp phá và suy yếu (Phá ấn, Nguyền ấn), đồng thời hai bên.
4. Tính sát thương theo `line`, gồm hiệu ứng suy yếu.
5. Trừ qua Hộ trận trước, phần dư vào máu.
6. Áp đồng thời, giảm thời hạn, kiểm tra kết thúc.

| Năng lực | Mục tiêu | Kích hoạt | Lượng và giới hạn | Cộng dồn | Hết hiệu lực | Hồi |
|---|---|---|---|---|---|---|
| **Hộ trận** (Thánh, lát cắt) | Các nhóm phe mình cùng tuyến với nguồn | Đầu trận, nếu nguồn sẵn sàng | Một quỹ, tỷ lệ với số quân nguồn sẵn sàng; một lần mỗi trận | Một nhóm chỉ dùng quỹ lớn nhất phủ nó | Hết quỹ, nguồn hết quân, hoặc hết trận | Thời gian thế giới, theo cohort |
| **Phá ấn** (Hắc, lát cắt) | Quỹ đang phủ mục tiêu mà nhóm nguồn đánh | Mỗi lượt nguồn có đánh và mục tiêu có quỹ | Giảm quỹ theo tỷ lệ số quân nguồn; có trần mỗi lượt | Cộng các nguồn, không quá quỹ còn lại | Tức thời | Không cần hồi trong lát cắt: giá nằm ở profile |
| **Trang bị chuyên dụng** (Quân chế, lát cắt) | Một dòng cố định theo profile, trong thế mạnh sẵn có | Bị động | Thêm sát thương nhỏ; không đổi K | Không cộng theo số quân | Không | Không |
| **Nguyền ấn** (Hắc, hoãn) | Một nhóm địch bị đánh | Đầu lượt | Giảm công có giới hạn, để vẫn có ý nghĩa với quân không có năng lực | Chỉ giữ mức mạnh nhất, không làm mới | Vài lượt, hoặc bị Thanh tẩy | Thời gian thế giới |
| **Thanh tẩy** (Thánh, hoãn) | Một nhóm mình đang bị Nguyền | Đầu lượt | Gỡ một hiệu ứng; không đổi hồi, không gỡ K | Không | Tức thời | Thời gian thế giới, nên phải chọn thời điểm |
| **Kỷ luật** (Quân chế, hoãn) | Bản thân | Bị động | Giảm thời hạn Nguyền; chỉ có khi Nguyền tồn tại | Không | Không | Không |

Cách làm tròn tất định và theo thứ tự ổn định. Đổi bên phải cho kết quả đối xứng (T17).

**Mặt trái:** không có hiệu ứng kéo dài ngoài trận nên Hắc Ảnh mất cảm giác "nguyền rủa cả đoàn quân". Có thể bổ sung sau với `ActiveEffect` lưu trong bản lưu; không làm ở lát cắt.

### Đoàn

Đoàn là **một đạo quân có `mission`**, không phải thực thể tách riêng:

```text
MobileGroup: faction, role, cohorts, cargo, wagons, food,
             position_or_movement, stop_until,
             mission: goal, site_list, commit_time, abort_rule,
             capacity_model: home | none | mobile (NPC only)
```

Tách và gộp bảo toàn cohort, hàng, xe, suất và mốc hồi. **Hành vi:** chọn mục tiêu → chuẩn bị → đi → dừng và quan sát → giao chiến nếu có thù địch và dự báo khả thi → khai thác hoặc nghỉ → về hoặc chọn lại. Dùng cùng cơ chế cam kết của controller. Dừng chân không tạo đất.

### Bản lưu và đồng hồ

**Cần lưu thêm:** `path`, `ability_ready_at` theo cohort; dự án và việc đang làm; cam kết và mission NPC (không tính lại khi tải); site_list, thời gian dừng, hàng, xe; tin tình báo có mốc; ngân sách đã dùng của từng phe; profile theo phiên bản. Không cần đổi engine hay thêm cloud.

**Thứ tự cùng mốc:** giữ preset 1.2. Trận với các lượt là bên trong pha 2. Đoàn tới ở pha 2, hàng tiếp tế ở pha 3, quyết định đoàn ở pha 6. Hồi không có sự kiện riêng: mốc `ability_ready_at ≤ T` nghĩa là sẵn sàng cho trận tại T.

## 5. Chiến dịch minh họa (không đảm bảo thắng)

Mọi con số và kết quả chỉ minh họa, chưa có mô phỏng.

1. **Chuẩn bị.** Người chơi có kỵ III, Học viện đủ mở một nhánh. Tin trinh sát: thành đối phương có giáo, và một đoàn tuần tra từ đó đi qua mỏ sắt mỗi vài ngày, gồm kỵ Hắc Ấn. Người chơi chọn Thánh vì muốn Hộ trận giúp giữ mỏ.
2. **Đổi trang bị.** 100 kỵ III đổi lên IV Thánh Ấn tại Chuồng ngựa và Lò rèn; phần còn lại giữ III để đi nhanh. Trong lúc này 100 kỵ vẫn bị đánh được bằng III.
3. **Trận mỏ.** Đoàn tuần tra đến mỏ khi người chơi đang giữ. Báo cáo: "Hộ trận hấp thụ 300; Phá ấn giảm 120; hết quỹ ở lượt 2. Kỵ Hắc gây thêm sát thương nhờ công cao". Người chơi thắng nhưng tốn hơn dự tính.
4. **Thất bại.** Thấy thắng, người chơi đưa đội đó đánh thành đầy giáo ngay. Mốc hồi chưa tới, Hộ trận chưa sẵn sàng. Giáo xuyên kỵ. Thua, rút; không có gì đổi chủ. Báo cáo chỉ rõ cả hai lý do.
5. **Đổi kế hoạch.** Người chơi trở lại với kiếm và cung, dùng Thánh kỵ hộ tuyến ở lần hồi sau, vây ngoại thành và đánh khi thủ quân đói. Có thể thắng, hoặc đối phương kịp viện binh. Chiếm thì theo một quy trình tiếp quản chung.
6. **Hậu quả.** Đối phương mất thành gốc của đoàn tuần tra. Đoàn còn lại về thành khác; nếu không còn thành thì thành tàn quân tìm nơi ở, không được tuyển mới.

## 6. Phạm vi thử

Giữ A1 như cũ trước, để vòng chiếm và lưu chạy ở bậc I. Thay A2 và thêm một bước:

| Bước | Thêm | Chơi được gì | Chưa chứng minh gì |
|---|---|---|---|
| **A2′ nhánh dọc** | Kỵ I, II, III và IV ba nhánh (6 profile); bốn dòng khác I, II (8 profile); **14 profile**. Hộ trận, Phá ấn, trang bị chuyên dụng. Ba công nghệ nhánh dùng Học viện và Lò rèn sẵn có. Một vương quốc có quân Hắc Ấn cấu hình sẵn. Đổi nhánh giữa các IV | Chọn nhánh theo đối thủ; đổi trang bị; đọc hai lớp khắc chế trong báo cáo | Năm dòng đều có nhánh; Thanh tẩy và Nguyền; V; trận phối hợp phức tạp |
| **M1 đoàn có căn cứ** | Một đoàn tuần tra từ thành NPC qua 3–4 địa điểm, có hàng, biết rút và đổi kế hoạch | Quan sát đoàn, phục ở mỏ, phá đoàn để giảm sức ép | Đoàn không căn cứ; truy đuổi giữa hai phe |
| **B** | Vương quốc thứ hai thiên Thánh; ca truy đuổi tới địa điểm; lưu vong dạng kịch bản | Hai phe khác khuynh hướng tranh nhau không cần người chơi | Du mục; toàn bộ danh sách phe |
| **Sau đó** | Du mục, Thanh tẩy và Nguyền, thêm dòng có nhánh, V, giao thương đoàn, đi qua biên, xe phá cổng, cơ sở chuyên biệt | | |

**Vì sao chọn kỵ:** gắn với Paladin, có đánh đổi tốc độ và có điểm yếu giáo rõ để thử hai lớp khắc chế. **Mặt trái:** Chuồng ngựa đến muộn, và Hộ trận trên đơn vị cơ động không đại diện cho "giữ vững đội hình". Nếu chủ dự án muốn thấy Paladin ngay, thêm kỵ V Thánh là một profile, cùng năng lực, không có luật mới.

**Tôi chấp nhận rủi ro của Codex nêu:** một dòng chưa đủ để kết luận về cả lớp năng lực. Bản thử chỉ trả lời: chọn nhánh có thay đổi quyết định không, báo cáo có đọc được không, và lỗi reset có bị chặn không.

## 7. Ca kiểm chứng

**Tất cả chưa chạy.** Ngưỡng phải ghi trước khi thử.

| Mã | Ca | Đạt | Thất bại |
|---|---|---|---|
| N1 | Cùng tổng quân: một nhóm so với mười nhóm Thánh | Tổng hấp thụ không tăng khi tách | Tách làm tăng bảo vệ |
| N2 | Đánh nhiều đợt trong thời gian hồi; đổi nhánh đi về; tải lại | Không có đường hồi nhanh; tải cùng trạng thái cho cùng kết quả | Hồi miễn phí, hoặc khác kết quả |
| N3 | Phản chứng Paladin: kỵ IV Thánh gặp giáo đông, cùng ngân sách | Giáo vẫn có ích rõ, K giữ nguyên | Hộ trận xóa lợi thế giáo |
| N4 | Phản chứng Hắc: Hắc gặp Quân chế không có gì để phá | Vẫn có lúc đáng dùng | Chết hoàn toàn vì thiếu mục tiêu |
| N5 | Quân chế không học phép, gặp Thánh và Hắc ở các tình huống | Thắng ở ít nhất một tình huống hợp lý về giá | Bắt buộc phải học nhánh đối nghịch, hoặc miễn nhiễm |
| N6 | Đổi nhánh gặp trận, tổn thất, hủy, đổi chủ, tải | Một nhánh hiệu lực, số quân và suất đúng, không hưởng đôi | Sai sổ, hưởng hai nhánh |
| N7 | Báo cáo: người đọc giải thích trận có Hộ trận và giáo | Nêu đúng nguyên nhân chính | Chỉ nói "Thánh mạnh hơn" |
| N8 | Đoàn có căn cứ: mất thành gốc khi đang đi | Không có suất mới, không tuyển; về nơi khác hoặc thành tàn quân | Được cấp hạn mức hay quân mới |
| N9 | Đoàn gặp địa điểm yếu, địa điểm mạnh, đích đổi chủ, hết lương | Đánh, tránh, đổi kế hoạch, về đúng lý do | Chỉ đi vòng, hoặc tự sát |
| N10 | Hai đoàn cắt nhau giữa đường; hai đoàn ở cùng địa điểm, trung lập và thù địch | Không có trận trên đường; ở địa điểm đúng theo quan hệ | Trận phụ thuộc khung hình |
| N11 | Truy đuổi với đối tượng ngoài tầm nhìn | Đi theo tin cũ, có thể lỡ, có giới hạn; đổi vị trí ẩn không đổi quyết định | Biết vị trí bí mật |
| N12 | Phe Hắc trung lập với người chơi; phe Thánh thù địch | Hành vi theo `relation`, không theo tên | Đánh theo nhãn đạo đức |
| N13 | Sinh đoàn khi người chơi giàu và nghèo; 3 năm game | Số đoàn trong trần, không phụ thuộc người chơi; số sự kiện và kích thước bản lưu ổn định; không sinh trong thành | Tăng vô hạn, tăng theo người chơi, xóa quân để dọn |
| N14 | Tách và gộp đoàn có hàng, xe, cohort khác gốc, lưu giữa hành trình | Bảo toàn tất cả | Nhân hoặc mất tài sản |
| N15 | Người thử: chọn nhánh theo đối thủ; thấy đoàn có ý nghĩa | Lý do cụ thể, đoàn thay đổi quyết định | Luôn cùng một nhánh; đoàn chỉ là icon |

## 8. Sửa tài liệu

| File | Cần sửa thực chất |
|---|---|
| `decisions.md` | Mã D mới cho các hướng đã chọn ở mục 2 (mức hướng); P12 đổi sang base + nhánh ở IV–V dạng đề xuất; bỏ câu "phép... không suy" theo nội dung mới; thêm O cho năng lực, đoàn, phe; ghi Paladin thuần quân sự là khuyến nghị cũ đã bị thay |
| `gameplay-blueprint.md` | §1 thêm nhánh và phe; §7 bỏ khuyến nghị thuần quân sự; §8 thêm phe, quan hệ, đoàn; §9 thay bảng lát cắt; bỏ "phép, IV/V" khỏi danh sách hoãn tuyệt đối |
| `military-and-research.md` | §1 trục `path`; thêm mục năng lực; §6 thêm đổi nhánh; §8 thay phạm vi; 45 cấu hình và kế thừa; Kỷ luật không có sợ hãi |
| `npc-and-great-cities.md` | §0 thêm phe, `path_bias`, `relation`; mục mới về đoàn; viết lại câu "chưa cần hệ lưu vong" |
| `technical-design.md` | §1 sửa "cùng hành động" thành có khai báo; §6 thêm `path`, `ability_ready_at`, MobileGroup, relation; §4 ghi trận lồng trong pha 2 và hai đồng hồ; §9 danh sách lưu |
| `systems-and-balance.md`, `world-and-expansion.md` | Hạn mức di động chỉ NPC; dòng "hoạt động ngoài bản đồ"; ghi giới hạn địa điểm |
| `roadmap-and-validation.md` | A2′, M1, B; thêm N1–N15, nói rõ chưa chạy |
| `interface-and-art.md` | Thông tin nhánh, phe, đoàn ở mức đặc tả; chưa làm hình |
| Biên bản, README, CHANGELOG | Ghi nguồn U08 và việc khuyến nghị cũ bị thay; giữ lịch sử |

Không sửa DOCX, XLSX, PDF. Không viết lại "thay chữ": U08 §18 yêu cầu đúng điều này.

## 9. Quyết định của chủ dự án

Không chặn tổng hợp, đều có mặc định ĐỀ XUẤT:

1. **Một đế chế có học được mọi nhánh không?** Mặc định: có, mỗi cohort một nhánh; trộn quân được. Phương án khác là khóa để tăng bản sắc nhưng giảm tự do.
2. **Bản thử đầu muốn thấy gì của Thánh?** Mặc định: kỵ IV ba nhánh, thêm kỵ V Thánh (Paladin) nếu bạn muốn nhìn thấy ngay. Mức hiển thị: nghi thức và ấn trong báo cáo, không có mana.
3. **Đoàn đi qua nhau trên đường không có trận, có chấp nhận cho bản thử không?** Mặc định: có, ghi rõ giới hạn. Nếu không chấp nhận, phải làm luật đoạn đường, khối lượng lớn hơn nhiều.

## 10. Chỗ khác Codex và chưa chắc

**Khác Codex:**
- Không thêm waypoint vào di chuyển chung, chỉ dừng tại địa điểm.
- Lưu vong trước du mục.
- Chọn cụ thể dòng kỵ và 14 profile, thay bản nêu chung.
- Hiệu ứng chỉ trong trận ở lát cắt.

**Chưa chắc:**
- Hộ trận có đáng so với chỉ cộng máu không. Nếu kết quả giống hệt thêm máu, năng lực chỉ là tên gọi.
- Trang bị chuyên dụng có đủ cho bản sắc Quân chế không.
- Nhóm hiệu ứng theo tuyến có đọc được trong lưới 3×3 không.
- Đoàn đơn điệu đi từng trạm có còn hấp dẫn không.
- Ngân sách đoàn nên hữu hạn hay có hồi trong thế giới dài.

## 11. Giới hạn

Không chạy gì; mọi nhận định chỉ từ lập luận. Không dùng dữ kiện hay game bên ngoài. Tôi đọc nguồn U08, đề xuất của Codex và các file 1.2 được giao, không đọc lại `interface-and-art.md`, `systems-and-balance.md` và `world-and-expansion.md` bản 1.2, nên dòng sửa cho các file đó chỉ ở mức chỉ dẫn.
