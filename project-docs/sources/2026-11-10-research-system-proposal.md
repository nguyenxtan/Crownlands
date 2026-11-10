**Đúng ông. Hệ thống khoa học nên là thứ làm thay đổi cách vận hành cả đế chế, không chỉ là một bảng “nghiên cứu xong được +5%”.** 🔬

Nó phải khiến người chơi gặp những lựa chọn như:

> **Đã biết chế tạo giáp nặng, nhưng chưa đủ tiền trang bị cho cả quân đội. Tuyển lính nhanh hơn, nhưng lương không theo kịp. Khai thác hiệu quả hơn, nhưng xe chở không hết. Thu thuế tốt hơn, nhưng thuế cao vẫn khiến dân bất mãn. Quản trị tiến bộ hơn, nhưng không thể giữ vô hạn thành trì.**

Tui đề xuất thiết kế Học viện thành **hệ thống phát triển tri thức, kỹ thuật và thể chế của Crownlands**. Dưới đây là bản phân tích sâu: từ cấu trúc nghiên cứu, danh mục ngành, công thức tác động đến những vòng tăng sức mạnh cần kiểm soát.

**Phân biệt nguồn:** những nguyên tắc đã trao đổi được giữ làm nền. Các công thức, danh mục công nghệ và giới hạn mới dưới đây là **đề xuất thiết kế để mô phỏng**, chưa phải thông số đã cân bằng.

# 1. Những nguyên lý đáng học từ các hệ thống có thật

Tui đối chiếu một số tài liệu thiết kế và hướng dẫn chính thức, nhưng không sao chép nguyên cơ chế của trò chơi khác.

| Tham chiếu | Điều đáng rút ra cho Crownlands |
|---|---|
| **Factorio:** nghiên cứu dùng phòng thí nghiệm và tiêu thụ vật tư khoa học. | Nghiên cứu nên cần nền kinh tế hỗ trợ, không chỉ chờ một bộ đếm miễn phí. [Official Factorio Wiki](https://wiki.factorio.com/Research) |
| **Factorio:** thời gian nghiên cứu phụ thuộc năng lực phòng thí nghiệm; chi phí nghiên cứu được mô tả riêng. | Phải tách **làm nhanh hơn** khỏi **làm ít tốn tài nguyên hơn**. [Official Factorio Wiki](https://wiki.factorio.com/Research) |
| **Nhật ký phát triển Factorio:** một số công nghệ có thể được mở bằng hành động trong thế giới thay vì chỉ tiêu vật tư. | Có thể kết nối nghiên cứu với khám phá và kinh nghiệm thực tế, nhưng Crownlands không nên buộc người chơi mắc kẹt vì thiếu một mục tiêu duy nhất. [Factorio](https://factorio.com/blog/post/fff-376) |
| **The Battle for Wesnoth:** quân phát triển cao hơn thường có chi phí duy trì cao hơn, với các ngoại lệ được quy định. | Quân tinh nhuệ cần có gánh nặng duy trì, không chỉ đắt lúc tuyển rồi mạnh miễn phí mãi mãi. [wiki.wesnoth.org](https://wiki.wesnoth.org/GettingStarted) |
| **Machinations:** phân biệt nơi tạo, lưu trữ, tiêu hao và trao đổi tài nguyên. | Công nghệ sản xuất, thuế, vận tải và giao thương phải tác động lên những bước khác nhau, tránh cộng cùng lượng hàng nhiều lần. [Machinations](https://machinations.io/docs/framework-basics) |

**Các tham chiếu này giúp đặt câu hỏi đúng, không chứng minh những con số dưới đây đã phù hợp Crownlands.**

---

# 2. Tách năm thứ thường bị gọi chung là “nâng cấp”

Đây là nền móng của toàn bộ hệ thống.

| Thành phần | Ý nghĩa | Ví dụ |
|---|---|---|
| **Cấp công trình** | Năng lực cơ sở vật chất của một thành. | Học viện 15, Doanh trại 12, Lò rèn 10. |
| **Tri thức đã nghiên cứu** | Đế chế biết một phương pháp hoặc kỹ thuật. | Biết chế tạo giáp nặng. |
| **Mức áp dụng tại địa phương** | Thành đã đầu tư để sử dụng kiến thức đó chưa. | Thành Bắc Sơn đã cải tạo xưởng để sản xuất giáp nặng. |
| **Bậc trang bị và huấn luyện của quân** | Chất lượng thực tế của lực lượng đang tồn tại. | 200 kiếm binh III, 100 kiếm binh IV. |
| **Chính sách hoặc học thuyết đang dùng** | Cách lựa chọn vận hành trong số các phương án đã mở. | Ưu tiên tuyển nhanh, quân tinh nhuệ hoặc dự trữ hậu cần. |

**Nghiên cứu không thay thế bốn phần còn lại.**

Ông có thể biết giáp nặng nhưng chưa có thành sản xuất được. Thành sản xuất được nhưng chưa đủ sắt. Đủ sắt nhưng quân đang ở xa chưa thể về nâng cấp.

Tui gọi đây là chuỗi:

**Biết cách → có cơ sở → đầu tư áp dụng → tổ chức sử dụng → trả chi phí duy trì.**

Đó là cách khoa học tạo chiều sâu mà không biến thành phép cộng sức mạnh toàn đế chế.

# 3. Một công nghệ nên đem lại loại lợi ích nào?

Không nên để mọi nghiên cứu đều tăng chỉ số. Tui chia thành bốn loại.

### Công nghệ mở khả năng mới

Ví dụ mở quân giáp nặng, nỏ công sự, hợp đồng cung ứng hoặc khả năng phân khu điều hành.

Giá trị là **làm được việc trước đây chưa làm được**.

### Công nghệ tăng hiệu suất

Ví dụ tăng tốc huấn luyện, giảm hao phí thu gom thuế, tăng năng suất khai thác.

Giá trị là **làm một việc hiệu quả hơn**, nhưng có giới hạn.

### Công nghệ mở lựa chọn có đánh đổi

Ví dụ cùng một thành có thể chọn tổ chức sản xuất dân sự hoặc tăng cường phục vụ chiến tranh.

Không phải mở xong là cùng lúc hưởng hết hai hướng.

### Công nghệ cải thiện thông tin và điều hành

Ví dụ dự báo lương, cảnh báo quá tải, tự bổ sung đạn trong ngân sách, so sánh năng lực tuyến vận tải.

**Những công cụ đọc thông tin và thao tác cơ bản phải có sẵn.** Không bắt người chơi nghiên cứu mới được xem mình còn bao nhiêu lương. Công nghệ chỉ mở khả năng điều hành nâng cao.

---

# 4. Học viện hoạt động thế nào?

## 4.1. Kiến thức dùng chung, chi phí và ứng dụng có địa điểm

Tui tiếp tục đề xuất **tri thức được lưu ở cấp đế chế**.

Một công nghệ hoàn tất thì các thành không phải nghiên cứu lại cùng một kiến thức. Tuy nhiên, từng thành phải đáp ứng điều kiện cơ sở và đầu tư áp dụng khi công nghệ yêu cầu.

Ví dụ:

**“Thủy lợi cải tiến” được nghiên cứu một lần.** Thành có ruộng muốn nhận lợi ích phải thực hiện cải tạo tại chỗ. Không tự tăng năng suất cho tất cả ruộng ngay khi Học viện hoàn thành.

Ngược lại, **“Quy chuẩn sổ sách”** có thể áp dụng qua tổ chức hành chính, không cần xây một nhà mới cho từng thành.

Không phải công nghệ nào cũng cần thêm một vòng đầu tư. Cần ghi rõ từng loại, tránh tạo hai lần trả tiền vô nghĩa.

## 4.2. Không biến điểm nghiên cứu thành tài nguyên thứ năm phải đi chở

Có thể dùng **đơn vị công nghiên cứu** để đo tiến độ, nhưng đó là số đo công việc, không phải hàng hóa tồn kho.

Một dự án có:

**Khối lượng công việc + chi phí bốn tài nguyên + điều kiện Học viện + công nghệ tiền đề.**

Học viện tạo tiến độ theo thời gian game. Nguồn lực đã dành cho dự án được tiêu theo quy tắc rõ ràng; dừng dự án không hoàn lại phần đã thực sự tiêu.

Tăng tốc nghiên cứu làm dự án dùng nguồn lực nhanh hơn trong thời gian ngắn hơn, **không mặc nhiên giảm tổng giá**.

## 4.3. Nhiều Học viện không được tạo tiến độ vô hạn

Tui đề xuất thử **1–3 dự án lớn đồng thời cho toàn đế chế**, mở dần bằng phát triển học thuật.

Mỗi dự án có một Học viện chủ trì. Cơ chế hỗ trợ từ Học viện khác có thể bổ sung sau, với giới hạn đóng góp và chi phí riêng.

Không để sở hữu 50 thành tự động nghiên cứu nhanh gấp 50 lần. Nhưng cũng không vô hiệu hóa hoàn toàn đầu tư: nhiều Học viện giúp nghiên cứu song song, có nơi dự phòng và phát triển các chuyên ngành.

## 4.4. Năm tầng tri thức, không phải năm lần xóa thế giới

| Tầng | Mốc Học viện thử nghiệm | Trọng tâm |
|---|---|---|
| **I. Khai lập** | 1–4 | Sản xuất, tuyển quân, ghi chép và vận tải cơ bản. |
| **II. Tổ chức** | 5–9 | Chuẩn hóa công cụ, huấn luyện, kho và dân sinh. |
| **III. Chuyên nghiệp** | 10–14 | Quân chủ lực, khai thác quy mô lớn, điều hành nhiều thành. |
| **IV. Chuyên hóa** | 15–19 | Quân chế tinh nhuệ, Thánh/Hắc, công sự và hậu cần cao cấp. |
| **V. Hoàn thiện** | 20 | Tối ưu có giới hạn, công nghệ chuyên sâu và tổ chức đế chế. |

Các tầng không bắt toàn bộ thế giới chuyển thời đại cùng lúc. Một phe có thể giỏi hậu cần nhưng yếu công thành; một phe có quân mạnh nhưng tổ chức kinh tế kém.

---

# 5. Danh mục các ngành khoa học của Crownlands

Tui đề xuất **12 nhóm nghiên cứu**. Đây là khung nội dung để phát triển, không có nghĩa phải sản xuất hết trong bản chơi đầu tiên.

## 5.1. Học thuật và quản lý tri thức

**Các hướng nghiên cứu:** Ghi chép chuẩn; Phương pháp thực nghiệm; Thư viện lưu trữ; Phối hợp học viện.

Chúng mở khả năng tổ chức dự án, bảo toàn tiến độ, nghiên cứu song song và một mức tăng tốc hữu hạn.

**Đánh đổi:** đầu tư học thuật sử dụng tài nguyên đáng lẽ có thể dùng cho quân đội hoặc kinh tế.

**Rủi ro:** nghiên cứu nhanh hơn giúp mở nghiên cứu tăng tốc tiếp theo, tạo vòng tăng trưởng không giới hạn. Vì vậy, không mở một nhánh vô tận “tăng tốc nghiên cứu”.

## 5.2. Luyện kim, vật liệu và trang bị

**Các hướng nghiên cứu:** Chuẩn hóa công cụ; Vũ khí cải tiến; Giáp ghép; Giáp nặng; Cơ khí chính xác.

Chúng mở mẫu trang bị và khả năng sản xuất, không tự mặc giáp mới cho quân hiện có.

**Đánh đổi:** trang bị tốt có thể cần nhiều sắt, thời gian chế tạo hoặc vật tư bảo dưỡng.

**Rủi ro:** cùng một tiến bộ được tính hai lần, vừa nằm trong chỉ số quân bậc IV, vừa cộng thêm một thưởng “giáp nặng” toàn đế chế. Mỗi hiệu ứng phải có một nguồn tính rõ.

## 5.3. Quân chế và huấn luyện

**Các hướng nghiên cứu:** Giáo trình huấn luyện; Chuẩn hóa trang bị tân binh; Tổ chức huấn luyện theo đơn vị; Quân chế tinh nhuệ.

Chúng tác động tới tốc độ tuyển, khả năng nâng quân cũ, đội hình và điều kiện tuyển quân cao cấp.

**Đánh đổi:** tuyển nhanh hơn làm nhu cầu tài nguyên và lương tăng nhanh hơn.

**Rủi ro:** công nghệ này đồng thời tăng tốc, giảm giá, tăng sức mạnh và tăng biên chế sẽ trở thành lựa chọn vượt trội mọi nhánh khác.

## 5.4. Nông nghiệp và lương thực

**Các hướng nghiên cứu:** Chọn giống; Thủy lợi; Luân canh; Tổ chức thu hoạch.

Chúng tăng năng suất ruộng hoặc mở cách khai thác hiệu quả hơn, tùy điều kiện áp dụng.

**Đánh đổi:** cần đầu tư địa phương; lợi ích của thành nhiều ruộng khác thành chuyên quân sự.

**Rủi ro:** tăng lương quá nhiều làm hậu cần và giới hạn duy trì quân mất ý nghĩa. Không tự bổ sung mất mùa, sâu bệnh hoặc khí hậu phức tạp chỉ để tạo việc cho nhánh này.

## 5.5. Khai thác và công cụ lao động

**Các hướng nghiên cứu:** Dụng cụ khai thác; Khảo sát tài nguyên; Tổ chức ca khai thác; Gia cố điểm khai thác.

Chúng có thể tăng sản lượng trên mỗi lực lượng khai thác hoặc tăng năng lực của điểm mỏ sau đầu tư.

**Đánh đổi:** khai thác mạnh cần bảo vệ và vận chuyển tương ứng.

**Rủi ro:** nhiều quân cộng công nghệ cộng nâng mỏ làm sản lượng tăng vô hạn. Phải có giới hạn tại từng điểm và phân biệt quân khai thác với quân canh giữ.

## 5.6. Xây dựng, công thành và công sự

**Các hướng nghiên cứu:** Quy chuẩn xây dựng; Tổ chức thi công; Kiến trúc công sự; Cơ khí công thành; Sửa chữa có tổ chức.

Chúng mở tường và công sự cao cấp, tăng hiệu suất xây hoặc sửa chữa, cho phép chế tạo thiết bị công thành.

**Đánh đổi:** xây nhanh không đồng nghĩa xây rẻ; công sự mạnh vẫn cần người, vật tư và tiếp tế.

**Rủi ro:** vừa giảm giá vừa tăng tốc vừa tăng độ bền quá lớn, hoặc sửa tường nhanh hơn mọi sát thương đối phương gây ra.

## 5.7. Hậu cần và vận tải

**Các hướng nghiên cứu:** Chuẩn hóa xe hàng; Tổ chức đoàn vận tải; Bốc dỡ; Dự trữ hành quân; Điều phối tuyến.

Chúng tăng sức chở, giảm thời gian phục vụ, cải thiện sử dụng xe hoặc giảm một phần hao phí hậu cần.

**Đánh đổi:** xe phải được cải tạo; đường xa và nguy hiểm vẫn là vấn đề.

**Rủi ro:** nhiều cải tiến nhỏ nhân với nhau khiến khả năng nuôi quân tăng mạnh hơn dự kiến. Phần này cần thử theo năng lực tuyến thực tế, không chỉ đọc từng tỷ lệ riêng lẻ.

## 5.8. Dân sinh, y tế và vệ sinh đô thị

**Các hướng nghiên cứu:** Nước sạch; Kho cứu trợ; Tổ chức dịch vụ dân sinh; Phục hồi sau chiến tranh.

Trong thiết kế game, chúng giúp sử dụng hiệu quả ngân sách dân sinh và cải thiện khả năng phục hồi ổn định.

**Đánh đổi:** phải có đầu tư và nguồn lực duy trì; không nghiên cứu xong là dân luôn hạnh phúc.

**Rủi ro:** tự thêm mô phỏng bệnh tật, tuổi thọ, từng hộ dân hoặc thương binh dù chưa cần. Bản đầu có thể chỉ tác động lên hệ thống An dân đã có.

## 5.9. Hành chính, pháp chế và thuế

**Các hướng nghiên cứu:** Sổ địa phương; Quy chuẩn thu gom; Sổ thu chi; Điều hành khu vực; Thủ tục tiếp quản.

Chúng giảm hao phí, mở chính sách và tăng năng lực điều hành một cách có giới hạn.

**Đánh đổi:** một đế chế lớn vẫn phải chi cho bộ máy quản trị, bảo vệ và ổn định vùng mới.

**Rủi ro:** khoa học hành chính tự triệt tiêu hoàn toàn nghịch lý sở hữu quá nhiều thành.

## 5.10. Thương mại và ngoại giao

**Các hướng nghiên cứu:** Đo lường thống nhất; Kho giao nhận; Hợp đồng cung ứng; Quy tắc thương lượng.

Chúng mở giao dịch thuận tiện hơn, hợp đồng dài hạn và cách xử lý nghĩa vụ rõ ràng.

**Đánh đổi:** hàng vẫn phải tồn tại và được vận chuyển. Hợp đồng có thể không hoàn thành nếu nguồn cung hoặc tuyến bị gián đoạn.

**Rủi ro:** công nghệ tạo lợi nhuận bảo đảm từ vòng mua bán với NPC, hoặc bồi thường bằng hàng được sinh miễn phí.

## 5.11. Bản đồ, trinh sát và thông tin

**Các hướng nghiên cứu:** Đo đạc; Ghi nhận hành trình; Nhận diện quân; Quan sát liên hoàn.

Chúng tăng chất lượng dự báo, độ tin cậy thông tin và khả năng phát hiện mục tiêu.

**Đánh đổi:** thông tin tốt hơn vẫn cần vị trí quan sát hoặc hoạt động trinh sát.

**Rủi ro:** nghiên cứu xong tự thấy toàn bộ kho, quân và ý định của mọi NPC; khi đó khám phá, nghi binh và tháp quan sát trở nên vô nghĩa.

## 5.12. Học thuyết Quân chế, Thánh Quang và Hắc Ảnh

**Các hướng nghiên cứu:** Kỷ luật tinh nhuệ; Trang bị chuyên dụng; Thánh Ấn; Thanh tẩy; Hắc Ấn; Phá ấn.

Chúng mở các cách chuyên hóa ngang hàng, không phải một cầu thang mà cuối cùng mọi quân đều phải thành Thánh.

**Đánh đổi:** cần quân phù hợp, huấn luyện, điều kiện áp dụng và giới hạn năng lực.

**Rủi ro:** trộn mọi nhánh để nhận toàn bộ lợi ích mà không mất gì. Tài liệu hiện tại đã chỉ ra đúng khoảng trống này. Pasted text

---

# 6. Khoa học tăng bậc quân: cần nhiều ngành phối hợp

Tui không muốn cây quân sự chỉ là:

**Rèn I → Rèn II → Rèn III → Paladin.**

Một đơn vị cao cấp nên yêu cầu **trang bị, huấn luyện và cơ sở phù hợp**.

| Đơn vị muốn mở | Những nền tảng cần có |
|---|---|
| **Kiếm binh giáp nhẹ** | Trang bị cơ bản cải tiến và giáo trình tân binh. |
| **Kiếm binh giáp ghép** | Kỹ thuật giáp ghép và huấn luyện chuyên nghiệp. |
| **Bộ binh giáp nặng** | Giáp nặng, tổ chức đơn vị và cơ sở tuyển đủ năng lực. |
| **Cận vệ hoàng gia** | Quân chế tinh nhuệ và trang bị tương ứng. |
| **Thánh kỵ sĩ** | Kỹ thuật kỵ binh, giáp phù hợp, huấn luyện tinh nhuệ và học thuyết Thánh. |
| **Hắc kỵ sĩ** | Nền kỵ binh tương tự, nhưng chuyên hóa Hắc thay vì Thánh. |

### Không nhồi quá nhiều điều kiện

Mỗi nghiên cứu nên có ít tiền đề trực tiếp, thường khoảng hai hoặc ba điều kiện có ý nghĩa. Không bắt người chơi mở tám công nghệ không liên quan chỉ để có quân mình muốn.

Cũng không tạo vòng khóa: muốn chiếm Đại thành phải có Paladin, nhưng muốn nghiên cứu Paladin lại phải chiếm Đại thành đầu tiên.

### Quân đã có không tự biến đổi

Khi công nghệ hoàn tất, người chơi được phép tuyển hoặc nâng theo mẫu mới. Quân đang giữ mỏ hoặc hành quân vẫn giữ trang bị hiện tại.

Lợi ích nào đã nằm trong cấu hình quân bậc cao thì không cộng lại một lần nữa dưới dạng thưởng toàn quân.

**Kết quả mong muốn:** ông có thể tập trung trang bị một đội tinh nhuệ cho mặt trận quan trọng, còn hậu phương vẫn sử dụng lực lượng vừa đủ và ít tốn kém hơn.

# 7. Giảm thời gian tuyển quân: dùng tốc độ, không cộng phần trăm giảm vô hạn

Đây là một lỗi thiết kế cần tránh ngay từ đầu.

Nếu ba công nghệ đều ghi “giảm 40% thời gian”, cộng lại thành giảm 120% sẽ vô nghĩa. Nhân liên tục cũng có thể khiến thời gian tiến quá gần 0.

Tui đề xuất lưu **khối lượng huấn luyện**, còn công nghệ tăng **tốc độ xử lý công việc**.

\[
T=\frac{W}{V_{\text{cơ sở}}\times(1+B_{\text{huấn luyện}})}
\]

Trong đó \(W\) là công việc cần hoàn thành; \(V_{\text{cơ sở}}\) đến từ cơ sở tuyển; \(B\) là tổng thưởng tốc độ được phép áp dụng, có trần.

### Ví dụ tính toán

Một quân cần 120 giây trong điều kiện cơ sở:

| Thưởng tốc độ | Thời gian một quân |
|---|---:|
| Không thưởng | 120 giây |
| +50% tốc độ | 80 giây |
| +100% tốc độ | 60 giây |

**Tăng tốc 50% chỉ giảm thời gian khoảng 33,3%, không phải giảm 50%.**

Với 300 quân tuyển tuần tự, tổng thời gian minh họa giảm từ 10 giờ game xuống 6 giờ 40 phút khi có +50% tốc độ.

### Những giới hạn đi kèm

Công nghệ tăng tốc không tự giảm chi phí tuyển, tăng hạn mức quân hay giảm lương duy trì.

Quân bậc V cũng có khối lượng huấn luyện cơ bản khác quân bậc I. Một thành huấn luyện tốt có thể tuyển quân tinh nhuệ nhanh hơn trước, nhưng không bắt buộc nhanh hơn lính sơ cấp.

Khi tốc độ thay đổi giữa hàng đợi, chỉ tính nhanh hơn **phần công việc còn lại**. Không tính lại quá khứ rồi làm nhiều đơn vị hoàn thành miễn phí.

**Rủi ro chiến lược:** tuyển nhanh làm ông có thể tự đẩy quân đội vào thiếu lương nhanh hơn. Giao diện phải dự báo nhu cầu duy trì sau khi hàng đợi hoàn tất.

---

# 8. Tăng năng suất: cần biết tăng ở khâu nào

“Tăng khai thác 20%” phải trả lời được: tăng sản lượng trong thành, tăng năng suất quân ở mỏ, tăng sức chứa hay tăng hàng chở về?

Chúng là bốn tác dụng khác nhau.

## 8.1. Sản xuất trong thành

Tui đề xuất mô hình cộng các nguồn thưởng sản lượng trên cùng một nền:

\[
P=P_0\times(1+B_{\text{khoa học}}+B_{\text{đế chế}}+B_{\text{vùng}})\times E
\]

\(P_0\) là sản lượng cơ sở từ công trình; \(E\) là mức hoạt động thực tế khi cơ sở còn hợp lệ, không bị ngừng hoặc hư hại theo luật.

**Cấu hình thử:** khoa học tăng tối đa 30%; Đại thành vẫn tối đa 20% toàn đế chế và 20% vùng. Khi đủ mọi điều kiện, 100 sản lượng cơ sở thành tối đa 170 trước các bước phân bổ khác.

**30% là đề xuất thử mới. Trần thưởng Đại thành 40% đã chọn không bị thay thành 70%.** Hai nhóm được ghi và kiểm soát riêng.

Tài liệu hiện tại đã lưu ý cần thống nhất cách cộng thưởng, thay vì để mỗi hệ thống tự nhân riêng. Pasted text

## 8.2. Khai thác ngoài thế giới

Với quân giữ và khai thác mỏ, có thể dùng:

\[
P_{\text{mỏ}}=\min(\text{năng lực điểm mỏ},\ \text{quân thực sự khai thác}\times\text{năng suất mỗi quân})
\]

Công nghệ công cụ tăng năng suất mỗi quân. Đầu tư mở rộng điểm mỏ tăng năng lực địa điểm. Hai lợi ích phải được theo dõi riêng.

Quân được phân công canh giữ không đồng thời được tính toàn bộ vào khai thác.

**Thưởng Đại thành chưa nên tự áp dụng cho mỏ thế giới**, chiến lợi phẩm, hàng nhập hoặc thuế. Muốn mở rộng phạm vi phải có quyết định và thử kinh tế riêng.

## 8.3. Sản xuất được không đồng nghĩa sử dụng được

Tăng sản lượng mỏ từ 1.000 lên 1.300 mỗi giờ, nhưng xe chỉ chở được 900 thì phần hữu dụng vẫn bị giới hạn bởi vận tải và kho.

Đó không phải lỗi của khoa học. Đó là lý do người chơi cần nghiên cứu theo nhu cầu thực tế thay vì luôn bấm công nghệ có phần trăm cao nhất.

# 9. Thuế: nghiên cứu giúp thu tốt hơn, không sinh thêm hàng

Phần này cần chốt mô hình trước khi đặt tên hàng chục công nghệ tài chính.

Tài liệu đã chỉ ra rằng thuế phải phân bổ nguồn lực có thật, không cộng thêm lần nữa sau sản xuất. Pasted text

## 9.1. Một mô hình thuế hiện vật để thử

Xét từng tài nguyên, tại từng thành, trong một kỳ:

**G:** lượng sản xuất.  
**D:** phần dân sinh thiết yếu đã sử dụng.  
**S = G − D:** phần dư có thể phân bổ.  
**τ:** tỷ lệ huy động phần dư.  
**ℓ:** tỷ lệ hao phí thu gom trong phần huy động.

Khi đủ đáp ứng dân sinh cơ bản:

\[
\text{Vào kho người chơi}=S\times\tau\times(1-\ell)
\]

\[
\text{Hao phí thu gom}=S\times\tau\times\ell
\]

\[
\text{Phần cộng đồng giữ lại}=S\times(1-\tau)
\]

Như vậy, tổng hàng luôn được phân bổ đủ, không tự tăng.

Nếu sản lượng không đủ dân sinh thiết yếu, phải ghi thiếu hụt và xử lý cứu trợ; không dùng phép trừ để tạo kho âm.

**Đây là mô hình mới đề xuất cho game, không phải mô phỏng thuế ngoài đời.** Các tỷ lệ 0%, 5%, 10%, 20% từng bàn trước chưa có cùng cơ sở tính, nên không bê nguyên sang.

## 9.2. Ví dụ

Giả sử sản xuất 1.000, sử dụng dân sinh thiết yếu 200, còn 800 để phân bổ.

| Trường hợp minh họa | Kho người chơi | Hao phí thu gom | Cộng đồng giữ lại |
|---|---:|---:|---:|
| Huy động 60%, hao phí 10% | 432 | 48 | 320 |
| Huy động 60%, hao phí giảm còn 4% | 460,8 | 19,2 | 320 |
| Huy động 75%, hao phí 4% | 576 | 24 | 200 |

Ở hàng thứ hai, nghiên cứu cải thiện thu gom giúp thu thêm **28,8**, nhưng không làm dân mất thêm phần giữ lại.

Ở hàng thứ ba, tăng thuế làm kho người chơi lớn hơn chủ yếu bằng cách giảm nguồn lực cộng đồng. **Đánh đổi An dân vẫn tồn tại.**

## 9.3. Các công nghệ thuế nên làm gì?

**Sổ thu chi** giúp kiểm soát phân bổ và giải thích thất thoát.

**Quy chuẩn thu gom** giảm một phần hao phí, không giảm về 0 vô điều kiện.

**Phân bổ nghĩa vụ** giúp tránh một mức thuế áp cứng cho mọi thành.

**Cứu trợ có kiểm soát** mở chính sách dùng tài nguyên thật để hỗ trợ địa phương khi thiếu.

Hàng vận chuyển từ thành khác đến đã là tài sản của đế chế, **không bị đánh thuế sản xuất lại**. Cứu trợ cũng không được đi một vòng rồi biến thành khoản thuế mới.

Phần cộng đồng giữ lại cần có cách sử dụng và sức chứa xác định; không được trở thành một kho vô hình có thể rút vô hạn khi cần.

---

# 10. An dân: khoa học thay đổi điều kiện ổn định, không tự bơm điểm mãi

Tui không đề xuất kiểu:

> “Nghiên cứu Nước sạch: mỗi phút tăng 1 An dân vĩnh viễn.”

Vì sau đó mọi thành sẽ về 100 dù bị đánh thuế nặng, thiếu lương và vừa bị chinh phục.

## 10.1. Tách mức ổn định có thể đạt và tốc độ phục hồi

Mỗi thành có **An dân hiện tại** và **mức ổn định mục tiêu** do điều kiện đang có tạo ra.

Mức mục tiêu xét dân sinh, thuế, chiến tranh, chiếm đóng và năng lực quản trị. Công nghệ giúp cải thiện những điều kiện này, không xóa chúng.

Ví dụ giả định:

Một thành đủ dân sinh, thuế vừa phải có thể hướng tới mức 80. Cũng thành đó khi bị vây và trưng thu nặng chỉ có thể hướng tới mức 40.

Nghiên cứu dân sinh có thể nâng mức mục tiêu hoặc làm phục hồi nhanh hơn **khi thực sự được đầu tư và cung cấp nguồn lực**.

## 10.2. Công thức phục hồi có giới hạn

Có thể thử:

\[
A(t+\Delta t)=A^*+(A(t)-A^*)e^{-\Delta t/k}
\]

\(A^*\) là mức ổn định mục tiêu; \(k\) điều khiển tốc độ tiến tới mục tiêu.

Hiểu đơn giản: thành dần ổn định về mức điều kiện hiện tại cho phép. Không tăng vô hạn. Khi thuế, lương hoặc chiến tranh thay đổi, tính lại mục tiêu từ thời điểm đó.

## 10.3. Khoa học tác động vào đâu?

**Dịch vụ dân sinh hiệu quả:** cùng ngân sách đạt mức đáp ứng tốt hơn.

**Phục hồi sau chiến tranh:** giảm thời gian ổn định khi có cứu trợ và an toàn.

**Thủ tục tiếp quản:** giảm một phần khó khăn do chuyển chủ, không xóa sạch ngay lập tức.

**Quản trị địa phương:** giảm quá tải khi có cơ sở và nhân lực tổ chức phù hợp.

Tui ưu tiên ở bản đầu để An dân tác động rõ nhất tới **mức hưởng quyền lợi vùng và tốc độ ổn định sau chinh phục**, chưa cùng lúc trừ toàn bộ sản xuất, quân sự và xây dựng.

Bạo loạn hoặc gián đoạn là trạng thái nặng kéo dài, có cảnh báo riêng, không phải thêm một hình phạt tức thì từ cùng một điểm An dân thấp.

# 11. Hậu cần: một nhánh có thể mạnh hơn vẻ ngoài của nó

Một tuyến vận tải có năng lực dài hạn xấp xỉ:

\[
\text{Hàng/giờ}=
\frac{\text{số xe}\times\text{sức chở}}
{\text{thời gian đi}+\text{thời gian về}+\text{thời gian phục vụ}}
\]

Xét ví dụ chưa tính bốc dỡ: 10 xe, mỗi xe 1.000, mỗi chiều 3 giờ, năng lực khoảng **1.667 hàng/giờ**.

Nếu nghiên cứu làm sức chở tăng 20% và tốc độ tăng 20%, mỗi chiều còn 2,5 giờ, năng lực trở thành **2.400 hàng/giờ**.

**Hai cải tiến 20% đã tạo mức tăng năng lực tuyến 44%, không phải 40%.**

Nếu lại giảm mức tiêu thụ quân, số quân có thể nuôi bền vững còn tăng thêm. Vì vậy không thể đánh giá từng công nghệ tách rời.

Tui đề xuất chia rõ: cải tạo xe tăng sức chở; tổ chức bốc dỡ giảm thời gian phục vụ; điều phối tránh xe chạy thừa; dự trữ hành quân mở cách chuẩn bị chiến dịch.

**Không có nghiên cứu nào làm hàng dịch chuyển tức thì.** Thành không có xe hoặc đường không thông vẫn không được nhận tiếp tế.

---

# 12. Khoa học hành chính và nghịch lý đế chế

Nếu nghiên cứu hành chính cuối cùng cho phép quản lý vô hạn thành mà không đánh đổi, mình đã xóa cơ chế ông muốn giữ.

Tui đề xuất so sánh:

**Khối lượng cần quản trị** với **năng lực quản trị thực có**.

Khối lượng không chỉ đếm số thành. Nó còn xét thành đang ổn định hay mới chiếm, mức chia cắt, khoảng cách tiếp cận và số hoạt động phải điều phối.

Công nghệ hành chính có thể mở khu điều hành, cải thiện một phần năng lực và giảm thao tác lặp. Nhưng trung tâm khu vực vẫn cần đầu tư và vận hành.

### Điều cần tránh

Không cho mỗi thành tự tạo đúng bằng hoặc lớn hơn năng lực cần để quản lý chính nó, khiến quá tải không bao giờ xảy ra.

Cũng không tăng chi phí nghiên cứu chỉ vì người chơi vừa chiếm một thành, làm họ cảm giác bị phạt tùy tiện vì thắng.

**Tui nghiêng về để chi phí mở rộng nằm ở việc áp dụng, ổn định và duy trì lãnh thổ**, thay vì làm cùng một kiến thức tự nhiên khó nghiên cứu hơn khi đế chế lớn.

Công nghệ giúp một người quản trị tốt giữ được nhiều thành hơn. Nó không bảo đảm họ giữ được mọi thành trên bản đồ mà không cần lựa chọn.

# 13. Thánh/Hắc: nghiên cứu năng lực và nghiên cứu tổ chức phải khác nhau

Nhánh này dễ phình to nhất, nên cần giới hạn cấu trúc.

**Thánh Ấn** mở khả năng trang bị hoặc huấn luyện quân dùng sức mạnh thánh. **Thanh tẩy chuyên sâu** cải thiện một giới hạn cụ thể như mục tiêu hợp lệ hoặc số lần chuẩn bị, không vừa tăng mọi thứ.

Tương tự, **Hắc Ấn** mở quân chuyên hóa. **Phá ấn** tạo công cụ đối phó bảo hộ, không mặc nhiên tăng sát thương lên tường vật lý.

Quân chế có nhánh tinh nhuệ tương đương về chiều sâu, không bị bỏ lại thành “quân không phép nên yếu hơn”.

### Phải chọn một số học thuyết đang sử dụng

Người chơi có thể biết nhiều phương pháp nhưng một đạo quân không nhất thiết áp dụng tất cả cùng lúc.

Ví dụ chọn học thuyết giữ tuyến, đột phá hoặc cơ động. Mỗi học thuyết thay cách phân công hoặc ưu tiên, có lợi và bất lợi rõ.

Không cần khóa người chơi vĩnh viễn vào một nhánh. Đổi hướng phải trả thời gian huấn luyện hoặc tái tổ chức hợp lý, tránh đổi ngay trước mỗi phép tính để hưởng lợi mọi phía.

**Biết nhiều không đồng nghĩa được kích hoạt tất cả.**

---

# 14. Khoa học phải gắn với thế giới, nhưng không khóa tiến trình bằng may rủi

Tui đề xuất một số hoạt động đem lại **tư liệu nghiên cứu** hoặc giảm một phần khối lượng của dự án tương ứng.

Ví dụ khảo sát một công sự giúp nghiên cứu phòng thủ; hoàn thành một tuyến tiếp tế khó giúp nghiên cứu hậu cần; thu được tài liệu trong thành NPC giúp hiểu một công nghệ liên quan.

Đây là hướng lấy cảm hứng từ việc liên kết tiến bộ kỹ thuật với hành động trong thế giới, không phải sao chép cách mở công nghệ của Factorio. [Factorio](https://factorio.com/blog/post/fff-376)

Các giới hạn nên có:

**Tư liệu chỉ có giá trị một lần theo nguồn và công nghệ**, không đánh đi đánh lại cùng trại để nhận nghiên cứu vô hạn.

**Không bỏ qua toàn bộ tiền đề.** Có bản vẽ quân tinh nhuệ nhưng thiếu nền luyện kim và huấn luyện vẫn chưa sản xuất được.

**Luôn có đường nghiên cứu thông thường cho nội dung cốt lõi.** Tư liệu có thể giúp nhanh hơn, không khiến game bế tắc nếu một NPC đã bị phe khác tiêu diệt.

**Không cần tạo một đồng tiền “tri thức” để đi chở.** Có thể lưu đây là trạng thái dự án và lịch sử khám phá.

# 15. Các vòng tăng sức mạnh nguy hiểm nhất

Đây là lý do cần mô phỏng hệ thống, không chỉ viết danh sách tên công nghệ.

| Vòng tác động | Điều có thể xảy ra | Cách đề xuất kiểm soát |
|---|---|---|
| **Sản lượng → nghiên cứu → sản lượng** | Đầu tư kinh tế sớm trở thành đường đi luôn tốt nhất. | Chi phí, thời gian hoàn vốn và trần hiệu quả; có cơ hội quân sự bị bỏ lỡ. |
| **Tốc độ nghiên cứu → nghiên cứu nhanh hơn** | Tự tăng tốc không giới hạn. | Nhánh học thuật hữu hạn, thưởng tốc độ có trần. |
| **Tuyển nhanh + quân rẻ + giảm lương** | Năng lực quân sự tăng nhiều lần dù từng thưởng nhìn nhỏ. | Thử theo tổng quân có thể tuyển và duy trì, không chỉ chỉ số riêng. |
| **Thuế cao + an dân mạnh** | Thuế tối đa trở thành lựa chọn không có hậu quả. | Khoa học giảm khó khăn, không xóa đánh đổi phân bổ dân sinh. |
| **Giữ nhiều thành → thêm Học viện → vượt công nghệ** | Người lớn càng lớn, đối thủ không còn cửa. | Giới hạn nghiên cứu song song và chi phí áp dụng địa phương. |
| **Chiếm Học viện → nhận toàn bộ công nghệ** | Một trận thắng xóa sạch khoảng cách nghiên cứu. | Tư liệu có giới hạn, không tự nhận toàn bộ kiến thức đối phương. |
| **Quân cấp cao + cải tiến vũ khí toàn quân** | Cùng tiến bộ bị cộng sức mạnh hai lần. | Ghi nguồn hiệu ứng và tách cấu hình trang bị khỏi công nghệ mở khóa. |
| **Giảm giá + tháo dỡ hoàn tài nguyên** | Xây hoặc nâng rồi hoàn để tạo lợi nhuận. | Hoàn theo khoản thực chi và luật đã lưu, không theo giá niêm yết mới. |

Theo cách mô hình hóa dòng tài nguyên của Machinations, có thể kiểm tra riêng nơi tạo, nơi giữ, nơi tiêu và nơi trao đổi trước khi đánh giá các vòng liên kết. Đó là cách phù hợp để kiểm tra các nguy cơ trên, chưa phải bằng chứng chúng đã được giải quyết trong Crownlands. [Machinations](https://machinations.io/docs/framework-basics)

## Bộ giới hạn thử ban đầu

| Nhóm hiệu quả | Mức thử để mô phỏng |
|---|---|
| Tốc độ nghiên cứu từ công nghệ | Tối đa +50%. |
| Tốc độ huấn luyện từ công nghệ | Tối đa +100%, tức thời gian còn một nửa ở cùng cơ sở. |
| Sản lượng từ công nghệ | Tối đa +30% trên nền sản lượng phù hợp. |
| Thưởng Đại thành | Giữ +20% đế chế và +20% vùng như đã chọn. |
| Giảm tiêu thụ lương nhờ tối ưu | Thử trần 20%, không giảm về 0. |
| Năng lực quản trị từ cải tiến trực tiếp | Thử mức hữu hạn, chẳng hạn +25%; không thay đầu tư địa phương. |

**Đây là cấu hình đối chứng để chạy thử, không phải các mức “an toàn” đã được chứng minh.** Bậc quân, cơ sở và phạm vi áp dụng vẫn có thể khiến tổng sức mạnh tăng nhiều hơn các con số trên.

---

# 16. Những tình huống thời gian và dữ liệu phải xử lý

Một hệ thống nghiên cứu sâu sẽ tạo nhiều lỗi nếu chỉ lưu tên công nghệ đã mở.

### Công nghệ hoàn tất giữa một quá trình

Sản lượng mới chỉ áp dụng từ lúc hoàn tất hoặc lúc địa phương triển khai xong. Không hồi tố cả khoảng thời gian trước đó.

Tốc độ huấn luyện mới tác động lên phần công việc còn lại. Giá tài nguyên đã thanh toán không bị tính lại tùy tiện.

### Mất thành có Học viện

Kiến thức đã hoàn tất thuộc đế chế và được giữ theo đề xuất. Dự án đang chạy dừng nếu mất nơi thực hiện; tiến độ, tài nguyên chưa tiêu và quyền chuyển dự án phải có luật riêng.

Chủ mới không tự lấy toàn bộ công nghệ của chủ cũ. Công trình có thể được giữ, nhưng khả năng vận hành còn phụ thuộc kiến thức và quyền sở hữu mới.

### Đổi chính sách hoặc chuyển nhánh quân

Kiến thức không bị xóa. Cơ sở hoặc quân phải thực hiện quá trình chuyển phù hợp, không được tức thời đổi qua lại để nhận nhiều lần lợi ích.

### Tạm dừng, tăng tốc, lưu và tải

Tất cả theo cùng đồng hồ game. Tải lại không hoàn tất nghiên cứu hai lần, không trả lại vật tư đã tiêu và không làm mất tiến độ một dự án đã lưu hợp lệ.

**Cần lưu cả phiên bản luật**, để khi chỉnh cân bằng biết bản lưu cũ đang dùng điều kiện và chi phí nào.

# 17. NPC nghiên cứu như thế nào?

Tui đề xuất các đế chế NPC dùng **cùng hệ thống công nghệ**, nhưng ưu tiên khác nhau.

Một phe quân sự chọn huấn luyện và công thành. Phe thương mại ưu tiên vận tải, kho và hợp đồng. Phe Thánh/Hắc vẫn phải đầu tư kinh tế và tổ chức, không chỉ nghiên cứu năng lực phép.

NPC chọn dự án dựa trên mục tiêu và khó khăn hiện tại: thiếu lương, thua vì thiếu công thành, không đủ sức chở hoặc khó giữ vùng mới.

**Không cần gọi AI trực tuyến.** Đây là luật lựa chọn và đánh giá trong mô phỏng offline.

Đoàn du mục có thể kế thừa kiến thức của phe và phát triển những cải tiến phù hợp hậu cần di động. Không mặc định một đoàn không có cơ sở nghiên cứu lại tự mở toàn bộ cây công nghệ như một Đại thành.

Cũng không tự tăng mọi NPC lên cùng công nghệ với người chơi. Đối thủ mạnh phải có nguồn gốc phát triển hoặc lợi thế độ khó được công bố.

# 18. Khi đã nghiên cứu hết thì sao?

Thế giới lâu dài không bắt buộc công nghệ phải vô hạn.

Tui đề xuất **cây công nghệ cốt lõi có điểm kết thúc**. Khi đã hiểu toàn bộ, người chơi vẫn còn việc áp dụng, tái trang bị, tổ chức lực lượng và lựa chọn chiến lược.

Các nhánh về sau nên thiên về **lựa chọn chuyên hóa ngang hàng**, không phải tăng công kích đến mức quân cũ không thể gây sát thương.

Cũng không cần ép người chơi chưa nghiên cứu hết chỉ để kéo dài thời gian. Hoàn thiện tri thức của đế chế có thể là một thành tựu thực sự.

Sau đó, câu hỏi không còn là “biết gì nữa?” mà là:

**“Với những gì đã biết, tui đầu tư vào đâu để giải quyết tình thế đang có?”**

---

# 19. Một công nghệ hoàn chỉnh cần được ghi như thế nào?

Ví dụ dưới đây là **mẫu đề xuất**, không phải chỉ số đã duyệt.

### HU-02 — Chuẩn hóa giáo trình huấn luyện

| Trường | Nội dung mẫu |
|---|---|
| **Mục tiêu** | Tăng năng lực tuyển bộ binh mà không tăng sức mạnh từng lính. |
| **Điều kiện nghiên cứu** | Học viện đủ cấp và công nghệ tổ chức huấn luyện trước đó. |
| **Phạm vi tri thức** | Toàn đế chế. |
| **Điều kiện áp dụng** | Doanh trại tại thành đủ năng lực và hoàn thành cải tổ cần thiết. |
| **Hiệu quả thử** | +15% tốc độ tuyển bộ binh đủ điều kiện. |
| **Không tác động** | Không giảm giá, không tăng biên chế, không giảm lương, không tự nâng quân. |
| **Cộng dồn** | Nằm trong nhóm thưởng tốc độ huấn luyện, chịu trần chung. |
| **Đang tuyển khi áp dụng** | Chỉ thay tốc độ xử lý phần công việc còn lại. |
| **Thông tin giao diện** | Thời gian trước/sau, nhu cầu lương sau hàng đợi và lý do thành chưa hưởng lợi. |
| **Kiểm thử** | Không sinh trùng quân; tốc độ đúng; công nghệ không mở ở thành thiếu điều kiện. |

Mọi công nghệ khác cũng cần cấu trúc tương tự, thêm chi phí, thời gian, mã tiền đề, phạm vi và điều kiện vô hiệu.

**Một tên đẹp chưa phải một công nghệ được thiết kế xong.**

# 20. Cách kiểm chứng và thứ tự làm

Tui đề xuất thử ba lối phát triển trên cùng điều kiện khởi đầu:

| Lối chơi | Ưu tiên | Điều cần kiểm chứng |
|---|---|---|
| **Quân sự sớm** | Huấn luyện, trang bị và công thành. | Có lợi thế chiến dịch nhưng phải trả giá về kinh tế và khả năng duy trì. |
| **Kinh tế, hậu cần** | Sản xuất, vận tải và kho. | Phát triển tốt nhưng không tự an toàn trước tấn công. |
| **Cai trị bền vững** | Thuế, dân sinh, hành chính và phục hồi. | Giữ nhiều thành hiệu quả hơn nhưng không tự thắng mọi trận. |

Đo theo số tài nguyên thực dùng được, khả năng duy trì quân, thời điểm chiếm mục tiêu, gánh nặng quản trị và số quyết định có ý nghĩa.

Không chỉ so tổng “gỗ + sắt + lương” như thể chúng có giá trị giống nhau. Công nghệ có thể làm dư gỗ nhưng không giải quyết được thiếu sắt hoặc thiếu xe.

**Bản thử nên lấy một chuỗi liên kết:** nghiên cứu huấn luyện → tuyển nhanh hơn → phát sinh thiếu lương → nghiên cứu nông nghiệp hoặc vận tải → mở rộng quân → chiếm thành → gặp bài toán thuế và ổn định.

Đó là phép thử tốt hơn việc mở 50 công nghệ bằng lệnh rồi kiểm tra từng phần trăm riêng lẻ.

---

## Kết luận thiết kế

Tui đề xuất khoa học Crownlands có ba lớp giá trị:

**Mở ra khả năng mới:** quân, công sự, phương thức quản trị và chiến dịch.

**Nâng hiệu suất có giới hạn:** tuyển nhanh hơn, khai thác tốt hơn, giảm hao phí và phục hồi ổn định hiệu quả hơn.

**Buộc lựa chọn cách áp dụng:** thành nào cải tạo trước, quân nào nâng bậc, nguồn lực nào dành cho dân sinh, mặt trận nào đủ khả năng duy trì.

**Học viện không nên khiến đế chế thoát khỏi mọi giới hạn. Nó giúp người chơi giải quyết một giới hạn, rồi nhìn thấy giới hạn tiếp theo.** Nghiên cứu giỏi không chỉ là mở được Paladin; đó còn là biết vì sao 500 Paladin có tiếp tế và hậu phương ổn định đáng giá hơn 2.000 người đang chờ hết lương.