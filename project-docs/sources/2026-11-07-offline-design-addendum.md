# CROWNLANDS OFFLINE
## Danh mục thông tin cần bổ sung vào hồ sơ thiết kế 👑

Được ông. Phần dưới gom **toàn bộ thay đổi từ lúc ông quyết định làm game offline để tự chơi**, đến hệ thống chinh phục, Học viện, nâng bậc quân, nhánh Thánh/Hắc và NPC lưu động.

Có ba trạng thái cần giữ rõ:

**ĐÃ CHỌN:** hướng ông trực tiếp yêu cầu.  
**ĐỀ XUẤT:** cách triển khai tui đưa ra, chưa tự động trở thành luật cuối.  
**CẦN KHÓA:** thông tin còn thiếu để lập trình và kiểm thử được.

**Đây là danh mục bổ sung và sửa đổi hồ sơ, chưa phải các tệp Word, PDF hoặc bảng cân bằng đã được cập nhật.**

---

# 1. Thay đổi định vị sản phẩm

## 1.1. Những hướng mới đã được ông xác nhận

| Nội dung | Yêu cầu cần ghi vào hồ sơ |
|---|---|
| **Chuyển sang offline** | Crownlands trở thành game chiến thuật một người chơi, không cần người chơi thật khác để thế giới hoạt động. |
| **Mục tiêu cá nhân** | Trước tiên làm để ông chơi, không lấy kinh doanh, doanh thu hoặc tăng trưởng người dùng làm mục tiêu phát triển. |
| **Tiến hóa quân đội** | Quân thay đổi rõ về trang bị, hình dáng và khả năng chiến đấu, không chỉ tăng vài con số. |
| **Học viện** | Cần hệ thống nghiên cứu liên kết với trang bị, huấn luyện, hậu cần và chinh phục. |
| **Nhánh Thánh và nhánh đối lập** | Có những con đường quân sự khác nhau, có năng lực riêng và cách đối phó nhau. |
| **NPC có phân loại và đối lập** | NPC không phải một khối thống nhất; có các phe, khuynh hướng và quan hệ khác nhau. |
| **NPC lưu động** | Có lực lượng hoạt động ngoài bản đồ, không bắt buộc nằm trong thành hoặc trại cố định. |

**Thế giới tồn tại lâu dài** là lựa chọn đã có trước khi chuyển offline và tiếp tục được giữ.

## 1.2. Những yêu cầu trực tuyến không còn thuộc bản đầu

Không cần triển khai đăng nhập trực tuyến, máy chủ nhiều người chơi, đồng bộ giữa các tài khoản, thanh toán, bảng xếp hạng người thật, chống tài khoản phụ hoặc vận hành cộng đồng.

Tuy nhiên, **bỏ chống gian lận cạnh tranh không có nghĩa bỏ kiểm tra dữ liệu**. Game vẫn phải tránh lỗi nhân quân, mất tài nguyên, xử lý một trận hai lần hoặc hỏng bản lưu.

---

# 2. Những nền tảng cũ vẫn được kế thừa

Không làm lại Crownlands từ số không. Những phần dưới vẫn là nền thiết kế, với trạng thái phê duyệt giữ theo trao đổi trước:

| Nhóm | Nội dung kế thừa |
|---|---|
| **Thành trì** | Thành tròn, ô xây cố định; công trình và thành phát triển trong thang cấp đã chọn. |
| **Kinh tế** | Gỗ, đất sét, sắt, lương; kho cục bộ; vận chuyển thật. |
| **Quân sự** | Năm binh chủng chính; bố trận trước trận; nhận báo cáo, không điều khiển từng lính. |
| **Bản đồ** | Thế giới rộng, nhiều vùng, điểm khai thác, thành bỏ hoang và Đại thành. |
| **Chinh phục** | Chiếm đất, giữ mỏ, chiếm thành, dời đô và cai trị vùng. |
| **Giới hạn quân** | Muốn duy trì lực lượng lớn hơn phải phát triển thêm năng lực thành trì. |
| **Thưởng Đại thành B** | Tối đa +20% toàn đế chế và +20% trong vùng hợp lệ, cộng trên sản lượng cơ bản. |
| **Thất bại** | Có rút lui, mất thành, di dân và tái lập; giữ 1/2 hoặc 1/3 cấp phát triển theo điều kiện còn phải khóa. |
| **Nghịch lý mở rộng** | Nhiều thành tăng tiềm lực nhưng cũng tăng nghĩa vụ bảo vệ, tiếp tế và quản trị. |
| **Mỹ thuật** | Tươi sáng, cách điệu, đồng nhất; AI, Blender và chỉnh sửa 2D. Chưa làm thêm hình trong giai đoạn này. |

Năm binh chủng, bố trận và báo cáo chiến đấu đã nằm trong hồ sơ gốc; phần cần thay đổi là ai điều khiển các đối thủ và nơi bộ máy game vận hành. 01_Dinh_huong_va_luat_game_v1.0

**Không tự chuyển các ý tưởng cũ như quân dự bị, thành tự quản, mỏ cạn kiệt hay thủ đô dự phòng thành tính năng bắt buộc.** Chúng vẫn là các phương án mở rộng đã thảo luận.

---

# 3. Đồng hồ game, tạm dừng và lưu tiến trình

## 3.1. Đề xuất vận hành offline

| Nội dung | Cách hoạt động đề xuất |
|---|---|
| **Đồng hồ thế giới** | Dùng thời gian trong game cho xây dựng, nghiên cứu, hành quân, tiêu thụ lương và hành vi NPC. |
| **Tạm dừng** | Toàn bộ mô phỏng dừng, không chỉ phần của người chơi. |
| **Tăng tốc** | Tất cả các phe cùng chạy nhanh hơn theo một hệ số. |
| **Đóng game** | Thế giới ngừng chạy. |
| **Mở lại** | Tiếp tục từ trạng thái đã lưu, không tự tính thêm thời gian ngoài đời đã trôi qua. |
| **Lưu thủ công** | Người chơi chủ động tạo bản lưu. |
| **Tự lưu** | Lưu luân phiên để có bản dự phòng, không liên tục ghi đè duy nhất một bản. |
| **Sao lưu** | Có cách xuất và nhập lại bản lưu. |

**Thế giới lâu dài nghĩa là lịch sử và tiến trình được giữ, không phải NPC vẫn đánh ông trong lúc ông tắt máy.**

Đây là thay đổi quan trọng so với hồ sơ cũ vốn sử dụng đồng hồ máy chủ và thời điểm thực. 03_Kien_truc_ky_thuat_va_du_lie…

## 3.2. Thông tin còn phải khóa

Cần xác định các mức tăng tốc; khi tạm dừng có được xếp lệnh hay không; trường hợp nào tự tạm dừng; chu kỳ tự lưu; số bản lưu dự phòng; cách xử lý khi thoát game giữa lúc lưu.

Bản lưu phải chứa cả **việc đang diễn ra**: quân trên đường, hàng trên xe, nghiên cứu đang chạy, cuộc vây thành, trạng thái hiệu ứng và nhiệm vụ NPC. Không chỉ lưu số quân với tài nguyên.

---

# 4. Thay đối thủ người thật bằng các đế chế NPC

## 4.1. Hai tầng NPC

**NPC địa phương** gồm thổ phỉ, quân giữ mỏ, quân chiếm cứ thành bỏ hoang và các đoàn hoạt động nhỏ.

**Đế chế NPC** có thành, quân đội, lãnh thổ, kinh tế, công nghệ, mục tiêu mở rộng và quan hệ với các phe khác.

## 4.2. Những khả năng cần đặc tả

| Hệ thống | Hành vi NPC cần có |
|---|---|
| **Kinh tế** | Sản xuất, tích trữ, tuyển quân, chi cho xây dựng và duy trì lực lượng. |
| **Phát triển** | Nâng công trình, lựa chọn nghiên cứu, tuyển quân phù hợp với khả năng. |
| **Quân sự** | Trinh sát, phòng thủ, xuất quân, tiếp tế, giải vây và rút lui. |
| **Lãnh thổ** | Chiếm điểm tài nguyên, bảo vệ đường đi, tranh thành và Đại thành. |
| **Ngoại giao** | Có mục tiêu và thái độ riêng, không mặc định mọi NPC cùng phe chống người chơi. |
| **Thất bại** | Có thể mất thành, rút quân, lưu vong hoặc bị tiêu diệt theo luật. |

Đề xuất dùng **bộ luật ra quyết định chạy trong game**, không phụ thuộc dịch vụ AI trực tuyến.

**Cần khóa:** mức độ mô phỏng kinh tế của NPC; khả năng nhìn thấy thông tin; mức hỗ trợ theo độ khó; điều kiện tuyên chiến, hòa hoãn, đầu hàng và lựa chọn mục tiêu.

Nếu chế độ khó cho NPC tài nguyên khởi đầu hoặc lợi thế riêng, cần ghi rõ. Không bí mật sinh quân để phủ nhận mọi thành quả của người chơi.

---

# 5. Phân biệt cấp công trình, bậc quân và nhánh quân

Đây là phần bắt buộc sửa rõ để tránh tất cả cùng bị gọi là “cấp”.

| Khái niệm | Ý nghĩa |
|---|---|
| **Cấp công trình** | Năng lực cơ sở vật chất, theo thang 1–20 đã chọn. |
| **Cấp thành hoặc Đại thành** | Mức phát triển của địa điểm; cách tổng hợp từ các công trình còn phải xác định. |
| **Cấp mục tiêu NPC** | Mức đánh giá mục tiêu trong thang 1–20, không phải cấp của từng lính bên trong. |
| **Bậc quân I–V** | Đề xuất về trình độ trang bị và huấn luyện của đơn vị. |
| **Công nghệ** | Kiến thức đã nghiên cứu; không bắt buộc mỗi công nghệ có 20 cấp. |
| **Nhánh chuyên hóa** | Quân chế, Thánh Quang hoặc Hắc Ảnh; không phải ba cấp nối tiếp nhau. |

Ví dụ: **thành cấp 15 có Học viện cấp 12 và quân bậc III** là tình trạng hợp lệ nếu thiết kế cho phép.

**Cần khóa:** cách tính cấp thành, độ khó NPC và điều kiện mở từng bậc quân. Riêng giới hạn cấp ô tài nguyên phải ghi riêng, không tự suy ra mọi đối tượng đều có cùng mức tối đa.

---

# 6. Tiến trình quân đội từ sơ cấp đến tinh nhuệ

## 6.1. Ba bậc nền tảng chung được đề xuất

| Binh chủng | Bậc I | Bậc II | Bậc III |
|---|---|---|---|
| **Kiếm binh** | Kiếm sắt, áo vải, khiên gỗ | Giáp nhẹ, khiên gia cố | Giáp ghép, trang bị đồng bộ |
| **Giáo binh** | Giáo cơ bản | Giáo và giáp nhẹ tốt hơn | Trường thương, huấn luyện giữ tuyến |
| **Cung thủ** | Cung ngắn | Cung cải tiến | Cung thủ chuyên nghiệp |
| **Kỵ binh** | Kỵ binh nhẹ | Kỵ binh có giáp | Kỵ binh chuyên nghiệp |
| **Voi chiến** | Trang bị cơ bản | Gia cố bảo vệ | Voi bọc giáp |

**Bậc I của voi không có nghĩa voi được mở ngay đầu game.** Mỗi dòng quân có điều kiện tiếp cận riêng.

## 6.2. Chuyên hóa ở bậc IV–V

Ví dụ dòng kiếm binh:

| Hướng | Bậc IV | Bậc V |
|---|---|---|
| **Quân chế** | Kiếm binh giáp nặng | Cận vệ hoàng gia |
| **Thánh Quang** | Kiếm vệ Thánh Ấn | Thánh vệ |
| **Hắc Ảnh** | Kiếm vệ Hắc Ấn | Hắc vệ |

Hướng này thay thế cách hiểu cũ rằng mọi kiếm binh đều phải lên Thánh vệ ở bậc cuối.

## 6.3. Hình thái bậc V của năm dòng

Các tên dưới đây vẫn là **tên tạm**:

| Binh chủng | Quân chế | Thánh Quang | Hắc Ảnh |
|---|---|---|---|
| Kiếm | Cận vệ hoàng gia | Thánh vệ | Hắc vệ |
| Giáo | Cận vệ trường thương | Giáo vệ Thánh Ấn | Giáo vệ Nguyền Ấn |
| Cung | Xạ thủ hoàng gia | Xạ thủ Bình Minh | Xạ thủ Hoàng Hôn |
| Kỵ | Trọng kỵ hoàng gia | Thánh kỵ sĩ, Paladin | Hắc kỵ sĩ |
| Voi | Thiết giáp chiến tượng | Chiến tượng Thánh Ấn | Chiến tượng Hắc Ấn |

**Paladin được dùng để chỉ Thánh kỵ sĩ cưỡi ngựa**, không phải kiếm binh tự đổi thành kỵ binh khi lên cấp.

## 6.4. Thông tin cần có cho mỗi cấu hình quân

Mỗi loại cần bảng riêng về điều kiện tuyển, chi phí, thời gian, máu, công, giáp, tốc độ, lương duy trì, sức chở, hạn mức biên chế, mục tiêu ưu tiên, tương khắc và năng lực đặc biệt.

**Quân thấp bậc phải còn lý do sử dụng:** rẻ hơn, dễ tuyển hơn, phù hợp nhiệm vụ ít nguy hiểm hoặc có ưu thế cơ động. Không thiết kế quân bậc V tốt nhất trong mọi tình huống.

---

# 7. Ba con đường quân sự

## 7.1. Bản sắc đề xuất

| Nhánh | Nội dung |
|---|---|
| **Quân chế** | Phát triển bằng kỹ thuật, trang bị, kỷ luật và hậu cần; là con đường hoàn chỉnh, không phải nhánh chưa nâng cấp. |
| **Thánh Quang** | Bảo hộ, thanh tẩy và giữ vững đội hình. |
| **Hắc Ảnh** | Nguyền ấn, phá bảo hộ và tạo thời điểm đột phá. |

Ông đã yêu cầu có nhánh Thánh và nhánh đối lập. **Tên “Thánh Quang”, “Hắc Ảnh” và cách bố trí ba con đường là đề xuất triển khai.**

Không mặc định Thánh luôn thiện, Hắc luôn ác. Quan hệ với người chơi phụ thuộc phe và hành động.

Cũng không dùng các nhánh này để tự chia thế giới thành những lục địa riêng có tài nguyên khác nhau.

## 7.2. Quyền nghiên cứu và chuyển nhánh

Đề xuất cho phép một đế chế nghiên cứu nhiều nhánh, nhưng mỗi đơn vị chỉ thuộc **một nhánh tại một thời điểm**.

Chuyển nhánh cần về cơ sở hợp lệ, trả chi phí và huấn luyện lại. Không nhận đồng thời toàn bộ lợi ích Thánh và Hắc.

**Cần khóa:** có cho trộn nhiều nhánh trong một đạo quân không; năng lực hỗ trợ có tác động qua nhánh không; chi phí chuyển nhánh; điều kiện cơ sở; ảnh hưởng ngoại giao.

Không tự thêm hình phạt “quân Thánh và Hắc đứng chung thì bất mãn” khi chưa có quyết định.

---

# 8. Hệ thống nghiên cứu trong Học viện

## 8.1. Sáu nhóm nghiên cứu đã đề xuất

| Nhóm | Nội dung chính |
|---|---|
| **Vũ khí và giáp** | Luyện kim, vũ khí, khiên, giáp nhẹ, giáp ghép, giáp nặng. |
| **Quân chế và huấn luyện** | Đội hình, chuyên nghiệp hóa, tinh nhuệ và chuyên hóa quân. |
| **Công thành và phòng thủ** | Xe phá cổng, máy bắn đá, gia cố cổng và kỹ thuật phòng thủ. |
| **Hậu cần và vận tải** | Sức chở, dự trữ hành quân, tổ chức đoàn xe và điều phối tiếp tế. |
| **Khai thác và kinh tế** | Năng lực khai thác, kho và tổ chức sản xuất. |
| **Hành chính và cai trị** | Tiếp quản, ổn định, cứu trợ và điều hành nhiều thành. |

Ba nhánh Quân chế, Thánh Quang và Hắc Ảnh là phần chuyên hóa quân sự, không tự tạo thêm ba nền kinh tế riêng.

## 8.2. Phạm vi kiến thức

Đề xuất mới là:

> **Kiến thức dùng chung toàn đế chế; năng lực tuyển và trang bị nằm ở từng thành.**

Một thành đủ điều kiện thực hiện nghiên cứu và trả chi phí tại đó. Khi hoàn thành, đế chế biết công nghệ, nhưng từng thành vẫn cần cơ sở phù hợp để sản xuất quân mới.

Đây là điểm phải sửa rõ trong hồ sơ vì bản cũ chưa phê duyệt nghiên cứu toàn đế chế. 02_Dac_ta_he_thong_va_can_bang\_…

## 8.3. Các mốc từng đưa ra

Học viện khoảng cấp **5, 10, 15, 20** mở dần nghiên cứu cho bậc II, III, IV, V. Giới hạn **1–3 dự án nghiên cứu đồng thời toàn đế chế** cũng từng được đề xuất.

**Đây là thông số thử, không phải luật đã chốt.**

Không cho nhiều Học viện cùng nghiên cứu một việc để mặc nhiên tăng tốc không giới hạn.

## 8.4. Mỗi nghiên cứu cần bổ sung dữ liệu gì?

Cần có mã, tên, nhánh, mô tả, công nghệ tiền đề, cấp Học viện, chi phí, thời gian, nơi thực hiện, phạm vi tác dụng, kết quả mở khóa và giới hạn hiệu lực.

Phải khóa thêm cách xử lý khi hủy, thiếu nguồn lực, mất Học viện, thành nghiên cứu bị chiếm hoặc người chơi di dân.

**Mở khóa một loại quân không đồng nghĩa tự nâng quân đang tồn tại.** Công nghệ quân sự và công nghệ tăng sản lượng cũng cần phân biệt phạm vi tác dụng, tránh cộng thưởng kinh tế ngoài ý muốn.

---

# 9. Vai trò công trình và quy trình nâng quân

## 9.1. Phân công giữa các công trình

| Công trình | Vai trò đề xuất |
|---|---|
| **Học viện** | Mở kiến thức và kỹ thuật. |
| **Lò rèn** | Đáp ứng năng lực chế tạo, cải trang bị. |
| **Doanh trại** | Tuyển, huấn luyện và nâng quân bộ binh. |
| **Chuồng ngựa** | Tuyển và nâng kỵ binh. |
| **Trại voi** | Tuyển và nâng voi chiến. |
| **Xưởng công thành** | Chế tạo phương tiện công thành. |

Chưa mặc định thêm một loạt công trình tôn giáo. Cần quyết định năng lực Thánh/Hắc dùng cơ sở hiện có hay cần công trình chuyên biệt.

## 9.2. Hai cách có quân bậc cao

**Tuyển mới:** tuyển trực tiếp bậc đã mở nếu thành đủ điều kiện.

**Nâng quân cũ:** đưa quân về thành phù hợp, chọn số lượng, trả tài nguyên và chờ cải trang bị, huấn luyện.

Ví dụ 300 kiếm binh I, nâng 100 người thì kết quả là **200 kiếm binh I và 100 kiếm binh II**.

## 9.3. Các quy tắc phải khóa

Quân đang nâng không thể đồng thời xuất quân. Không thể nâng từ xa khi đang giữ mỏ. Hàng đợi không phải nơi cất quân bất tử khi thành bị tấn công.

Cần xác định cách xử lý hủy nâng, thành đổi chủ, tổn thất trong lúc huấn luyện, khả năng nhảy nhiều bậc và hoàn tài nguyên.

Tổng chi phí tuyển thấp rồi nâng lên phải được so với tuyển trực tiếp, tránh xuất hiện một cách luôn rẻ hơn tuyệt đối.

**Chưa thêm kinh nghiệm riêng cho từng lính ở bản đầu.** Hệ thống bậc quân hiện phản ánh trang bị và huấn luyện, không đồng thời là hệ thống kinh nghiệm chiến đấu.

---

# 10. Năng lực đặc biệt và cơ chế khắc chế

## 10.1. Những năng lực đã đề xuất

| Năng lực | Nhánh | Tác dụng dự kiến |
|---|---|---|
| **Hộ trận** | Thánh Quang | Hấp thụ lượng sát thương giới hạn cho nhóm được bảo vệ. |
| **Thanh tẩy** | Thánh Quang | Gỡ hiệu ứng nguyền ấn hợp lệ. |
| **Nguyền ấn** | Hắc Ảnh | Làm suy yếu một năng lực cụ thể của mục tiêu trong thời gian giới hạn. |
| **Phá ấn** | Hắc Ảnh | Làm suy giảm lớp bảo hộ. |
| **Kỷ luật** | Quân chế | Giảm ảnh hưởng của sợ hãi hoặc rối loạn đội hình. |
| **Trang bị chuyên dụng** | Quân chế | Tạo lợi thế đối phó một nhóm mục tiêu phù hợp. |

Không phải đơn vị nào cũng có toàn bộ năng lực. Đề xuất mỗi biến thể có **một năng lực nhận diện chính** trước.

## 10.2. Hai lớp đối phó

**Lớp binh chủng:** kiếm, giáo, cung, kỵ, voi vẫn giữ vai trò và tương khắc.

**Lớp năng lực:** bảo hộ, thanh tẩy, nguyền ấn và phá ấn tạo thêm lựa chọn.

Paladin vẫn có thể bất lợi trước giáo binh được tổ chức tốt. Không dùng nhánh phép để xóa hoàn toàn tương khắc cơ bản.

## 10.3. Những thông số còn thiếu

Mỗi năng lực cần khóa mục tiêu, điều kiện kích hoạt, thời điểm trong lượt, số lần dùng, hiệu lực, thời hạn, cách cộng dồn, cách kháng hoặc gỡ và thời gian hồi phục.

Báo cáo phải cho biết năng lực đã tác động vào đâu, không chỉ ghi “Thánh Quang mạnh hơn”.

**Chưa đưa vào bản đầu:** hồi sinh tử trận, triệu hồi vô hạn, dịch chuyển quân xuyên bản đồ hoặc tạo năng lượng miễn phí bằng cách tách trận.

---

# 11. Ba phương thức chinh phục

| Phương thức | Cách chơi | Đánh đổi cần thể hiện |
|---|---|---|
| **Cường công** | Đánh quân giữ thành, phá cổng, tiến hành tiếp quản. | Nhanh hơn nhưng có thể tốn quân và gây hư hại lớn. |
| **Bao vây** | Kiểm soát đường và nguồn tiếp tế, làm suy yếu trước khi đánh. | Tốn thời gian, lương và có nguy cơ bị giải vây. |
| **Cô lập, buộc đầu hàng** | Tạo tình thế quân sự khiến NPC chấp nhận điều kiện. | Có thể giảm thương vong nhưng phải nhượng bộ về chiến lợi phẩm hoặc điều khoản. |

Cả ba là **phương án thiết kế đã thảo luận**, chưa có công thức thành công cuối.

## 11.1. Quy trình tiếp quản

**Trinh sát → làm suy yếu hoặc đánh bại phòng thủ → duy trì tiếp quản → chuyển chủ → ổn định thành.**

Thắng trận, có quyền sở hữu và cai trị ổn định là các mốc khác nhau.

Bao vây không tự làm mọi nguồn lương thành bằng 0. Chỉ nguồn thực sự bị cắt mới dừng đóng góp; kho và sản xuất được bảo vệ vẫn có thể hoạt động.

## 11.2. Luật cần bổ sung

Cần xác định lực lượng tối thiểu, điều kiện công thành, thời gian tiếp quản, phạm vi phong tỏa, đường giải vây và xử lý nhiều phe cùng đến.

Với đầu hàng, cần quy định ai đề nghị, điều khoản, thời hạn, hậu quả từ chối và cách thi hành. Quân NPC không tự chuyển thành quân người chơi.

Với Đại thành, cần liên kết chuyển chủ với quyền vùng, thưởng B và dời đô. **Không bắt buộc phải có Paladin mới chiếm được Đại thành phù hợp trình độ.**

---

# 12. Danh mục phe NPC và quan hệ

Các tên dưới đây là đề xuất, chưa phải tên chính thức:

| Phe | Khuynh hướng | Hình thức hoạt động | Mục tiêu đặc trưng |
|---|---|---|---|
| **Vương triều Thiết Quan** | Quân chế | Thành, Đại thành, viễn chinh | Mở rộng đất và bảo vệ lợi ích kinh tế. |
| **Giáo đoàn Bình Minh** | Thánh Quang | Thành và đoàn tuần hành | Giữ địa điểm quan trọng, mở ảnh hưởng, đối đầu lực lượng Hắc. |
| **Hắc triều Tro Tàn** | Hắc Ảnh | Thành, cứ điểm, tập kích | Tranh Đại thành, phá tiếp tế, giành lại lãnh thổ. |
| **Bộ tộc Phong Kỵ** | Chủ yếu Quân chế | Du mục | Tìm nguồn lực, trao đổi, di chuyển tới vùng thuận lợi. |
| **Huynh đoàn Hành Hương** | Thánh Quang | Lưu động | Hộ tống và bảo vệ hành trình. |
| **Đoàn quân Lưu Vong** | Tùy nguồn gốc | Không còn thành | Tồn tại, tìm nơi định cư, phục quốc. |
| **Thương hội Ngàn Dặm** | Không cố định một nhánh | Thương đoàn | Trao đổi hàng hóa và tránh vùng nguy hiểm. |

**Phe, nhánh quân và trạng thái ngoại giao phải tách riêng.** Một phe Thánh có thể dùng nhiều quân thường; một phe Hắc chưa chắc đang giao chiến với người chơi.

Cần bổ sung bảng quan hệ ban đầu, mục tiêu ưu tiên, phạm vi hoạt động, thái độ khi bị tấn công, giao thương, mất thành và ký thỏa thuận.

Chưa mặc định Hắc Ảnh là xác sống. Vong binh là nội dung có thể xét sau.

---

# 13. Hệ thống NPC lưu động và du mục

## 13.1. Ba loại khác nhau

| Loại | Đặc điểm |
|---|---|
| **Đoàn có căn cứ** | Xuất phát từ thành hoặc trại để tuần tra, tiếp tế, viễn chinh; thường có nơi trở về. |
| **Đoàn du mục** | Không cần thành hoặc trại cố định; mang hậu cần theo đoàn xe, di chuyển và dừng chân. |
| **Đoàn lưu vong** | Hình thành sau thất bại; tìm nguồn lực, nơi định cư hoặc đường phục quốc. |

**NPC lưu động là yêu cầu ông đã chọn.** Ba cách tổ chức trên là đề xuất cụ thể hóa.

## 13.2. Dữ liệu bắt buộc của một đoàn

Cần lưu chủ thể hoặc phe, loại đoàn, quân số, bậc và nhánh quân, vị trí, đường đi, đích đến, lương, hàng hóa, xe, sức chở, hạn mức lực lượng, nhiệm vụ và thông tin đã quan sát.

Một đoàn không được chỉ là biểu tượng chạy qua bản đồ với phần thưởng cố định.

## 13.3. Chu trình hành vi

**Chọn mục tiêu → chuẩn bị → di chuyển → quan sát → giao thương, khai thác hoặc giao chiến → nghỉ, rút hoặc chọn hành trình mới.**

Đoàn phải có khả năng đổi kế hoạch khi đường nguy hiểm, nguồn hàng hết, đích đổi chủ hoặc mất căn cứ.

Dừng chân không tự tạo lãnh thổ. Muốn định cư hoặc chiếm thành phải theo điều kiện riêng.

## 13.4. Quân và lương từ đâu?

Đoàn dùng hàng mang theo, giao thương, khai thác hợp lệ hoặc chiến lợi phẩm. Bổ sung quân cần nguồn lực, thời gian và giới hạn được khai báo.

Hạn mức lực lượng có thể gắn với hậu cần di động thay vì thành. Đây là mô hình NPC riêng, **không cho quân người chơi lách giới hạn bằng cách ra ngoài thành**.

Cần khóa cách phục hồi xe, bổ sung quân, thiếu lương, mất hành lý, chia đoàn, hợp đoàn và xử lý khi không còn nơi đến.

---

# 14. Những tương tác và tình huống thế giới cần hỗ trợ

| Tình huống | Nội dung cần mô tả |
|---|---|
| **Quân lạ đi qua biên giới** | Có thể quan sát, giao thương, từ chối tiếp tế hoặc giao chiến tùy quyền và quan hệ; không mặc định là địch. |
| **Thánh truy đuổi Hắc** | Hai đoàn có mục tiêu riêng và tiếp tục hoạt động dù người chơi không can thiệp. |
| **Tàn quân rút khỏi Đại thành** | Quân và hàng rút thoát được bảo toàn đúng thực tế, có thể hình thành đoàn lưu vong. |
| **Thương đoàn gặp tuyến nguy hiểm** | Đổi đường, trì hoãn hoặc tìm bảo vệ; không xuyên qua mọi nguy hiểm như không có gì. |
| **Du mục tìm nơi khai thác** | Có quyền tiếp cận, thời gian dừng, năng lực khai thác và khả năng bị tranh chấp. |
| **Định cư trở lại** | Đoàn đủ điều kiện có thể tìm thành bỏ hoang hoặc mục tiêu khác; không tự tạo thành miễn phí. |

**Cần khóa thêm:** quyền đi qua lãnh thổ, phạm vi phát hiện, thông tin công khai, loại đoàn được quyền chiếm thành và luật xuất hiện đoàn mới.

Không tạo NPC nguy hiểm ngay giữa thành người chơi mà không có nguồn hình thành hoặc cơ hội phản ứng.

---

# 15. Liên kết với kinh tế, hạn mức quân và cai trị

Các hệ thống mới phải tuân thủ những giới hạn đã có:

**Tài nguyên:** chưa thêm thép, linh hồn, thánh thạch thành tài nguyên bắt buộc. “Thép” có thể là tên công nghệ; chi phí vẫn bằng bốn tài nguyên.

**Hạn mức quân:** quân hành quân, khai thác, nâng bậc hoặc ở trại vẫn được tính. Phần đang tuyển phải giữ chỗ; đổi sang cấu hình tốn nhiều điểm biên chế hơn cần đủ hạn mức.

**Hậu cần:** Thánh và Hắc không được miễn lương hoặc dịch chuyển hàng. Chi phí nghi thức và hồi phục năng lực, nếu có, phải được ghi rõ.

**Thưởng Đại thành:** công nghệ hoặc năng lực mới không được vô tình nhân chồng thưởng B. Cần phân biệt trần thưởng Đại thành với các loại cải tiến khác và xác định tổng giới hạn kinh tế.

**Cai trị:** tiếp quản và An dân tác động đến giữ thành, phục hồi và quyền lợi vùng; không biến thành phép cộng sát thương không giải thích được.

**Di dân:** phải quyết định giữ lại kiến thức, bậc quân, nhánh quân và trạng thái nghiên cứu thế nào. Tỷ lệ giữ cấp công trình không tự áp dụng cho mọi tài sản.

**Nghịch lý mở rộng:** quân tinh nhuệ và nhiều thành tăng tiềm lực, nhưng phải có nguồn lực để duy trì. Cần thử cả đế chế lớn quản trị tốt, không chỉ đế chế đang hỗn loạn.

---

# 16. Những thông tin giao diện và kỹ thuật cần bổ sung

Đây là các mục cần thiết để chuyển ý tưởng thành đặc tả, **không phải yêu cầu tạo hình ảnh ngay**.

## 16.1. Màn hình và thông tin mới

| Khu vực | Nội dung cần hiển thị |
|---|---|
| **Điều khiển thế giới** | Tạm dừng, tốc độ, thời gian game, lưu và tải. |
| **Học viện** | Cây công nghệ, tiền đề, tác dụng, chi phí, hàng đợi và nơi nghiên cứu. |
| **Tuyển và nâng quân** | Bậc hiện tại, bậc đích, nhánh, phần tăng giảm, chi phí duy trì và hạn mức. |
| **Chuẩn bị chiến dịch** | Mục tiêu cướp, công phá, bao vây hoặc tiếp quản; lương, đường đi, điểm về. |
| **Phe NPC** | Quan hệ, thông tin đã biết, vùng ảnh hưởng và thỏa thuận. |
| **Đoàn lưu động** | Loại đoàn, thái độ, thông tin quan sát được, hành động hợp lệ. |
| **Báo cáo trận** | Bậc quân, tương khắc, hiệu ứng, tổn thất, chiến lợi phẩm và trạng thái tiếp quản. |

Không hiển thị toàn bộ bí mật NPC chỉ vì mọi dữ liệu chạy trên máy người chơi. Mức thông tin được xem vẫn phải theo luật trinh sát.

## 16.2. Dữ liệu phải thêm hoặc sửa

| Nhóm dữ liệu | Phần cần lưu |
|---|---|
| **Thế giới offline** | Thời gian mô phỏng, hàng đợi sự kiện, phiên bản luật. |
| **Công nghệ** | Kiến thức của đế chế, dự án đang chạy, nơi thực hiện, chi phí và tiến độ. |
| **Quân** | Binh chủng, bậc, nhánh, số lượng, thành gốc, trạng thái nâng cấp. |
| **Năng lực** | Hiệu ứng còn lại, nguồn gây ra, thời hạn, lượt dùng và hồi phục. |
| **NPC** | Phe, mục tiêu, kinh tế, quan hệ, thông tin quan sát và quyết định đang thực hiện. |
| **Đoàn lưu động** | Hành trình, quân, xe, hàng, nguồn lực và nhiệm vụ. |
| **Chinh phục** | Bao vây, tiếp quản, đầu hàng, chuyển chủ và ổn định. |
| **Bản lưu** | Toàn bộ trạng thái cần để tiếp tục đúng, không chỉ các tổng số. |

Cần chọn nền tảng chạy và công nghệ lưu dữ liệu sau. **Chưa có lựa chọn bộ máy game hoặc kiến trúc triển khai offline cuối cùng được chốt.**

---

# 17. Những bài kiểm thử mới cần thêm

| Nhóm | Điều phải chứng minh |
|---|---|
| **Tạm dừng, tăng tốc** | Mọi phe cùng tuân thủ đồng hồ; tăng tốc không bỏ qua trận hoặc chuyến hàng. |
| **Lưu và tải** | Không nhân quân, lặp thưởng, hoàn nghiên cứu hai lần hoặc làm mất đoàn đang đi. |
| **Mất dữ liệu** | Có bản dự phòng; lỗi ghi không phá toàn bộ tiến trình. |
| **Nghiên cứu** | Mở kiến thức đúng phạm vi, không tự nâng quân hoặc bỏ qua cơ sở địa phương. |
| **Nâng quân** | Bảo toàn số lượng, trừ đúng chi phí, giữ đúng hạn mức và không giấu quân khỏi chiến đấu. |
| **Chuyển nhánh** | Không hưởng đồng thời Thánh và Hắc hoặc nhận hoàn tài nguyên lặp. |
| **Tương khắc** | Quân phép không xóa vai trò giáo, cung, kỵ, voi; quân thường vẫn có cách đối phó. |
| **Hiệu ứng** | Không cộng dồn vô hạn, hồi đầy nhờ tách trận hoặc tạo quân từ hiệu ứng. |
| **Bao vây** | Chỉ cắt nguồn thực sự bị kiểm soát; kho và sản xuất còn hợp lệ vẫn hoạt động. |
| **Đầu hàng** | Điều khoản thực thi đúng, không vừa cướp toàn bộ vừa nhận lại cùng tài sản lần nữa. |
| **NPC lưu động** | Có nguồn lực, đường đi và giới hạn; không dịch chuyển hoặc nhìn thấy mọi thứ. |
| **Lưu vong** | Quân rút thoát không đồng thời còn tồn tại trong thành đã mất. |
| **Thế giới lâu dài** | Không tích tụ vô hạn đoàn NPC, quân, phần thưởng hoặc công việc chưa kết thúc. |
| **Đế chế lớn** | Có lợi ích thật khi tổ chức tốt, nhưng mở rộng vượt khả năng tạo rủi ro có thể giải quyết. |

Nếu bổ sung yếu tố ngẫu nhiên, cần xác định cách lưu trạng thái ngẫu nhiên để việc tiếp tục bản lưu nhất quán. Mục tiêu ở đây là **game chạy đúng**, không phải cấm ông tải lại để chơi cách khác.

---

# 18. Cập nhật bộ hồ sơ hiện có như thế nào?

| Tài liệu | Nội dung phải sửa hoặc bổ sung |
|---|---|
| **Tập 01: Định hướng và luật game** | Chuyển định vị sang offline; phạm vi cá nhân; giữ thế giới lâu dài; thêm nghiên cứu, bậc quân, nhánh và NPC lưu động. |
| **Tập 02: Hệ thống và cân bằng** | Cây công nghệ, tuyển và nâng quân, năng lực, tương khắc, chinh phục, kinh tế NPC, hậu cần di động. |
| **Tập 03: Kiến trúc và dữ liệu** | Thay đồng hồ máy chủ bằng mô phỏng cục bộ; thêm lưu/tải, AI quyết định, nghiên cứu cấp đế chế và trạng thái đoàn. |
| **Tập 04: Giao diện và mỹ thuật** | Bổ sung yêu cầu thông tin cho Học viện, quân, phe, đoàn lưu động, chiến dịch và bản lưu; chưa cần sản xuất hình. |
| **Tập 05: Lộ trình và kiểm thử** | Bỏ các mốc mở chiến tranh người thật; thêm kiểm thử offline, NPC, hiệu ứng, lưu/tải và thế giới lâu dài. |
| **Bảng cân bằng** | Bổ sung bảng quân theo bậc/nhánh, công nghệ, nâng cấp, năng lực, phe, đoàn và mục tiêu chinh phục. |

**Cần tránh giữ nguyên kiến trúc trực tuyến rồi chỉ thay chữ “người chơi khác” bằng “NPC”.** Đồng hồ, lưu tiến trình, phạm vi nghiên cứu và cách thế giới ra quyết định đều đã thay đổi.

## Những quyết định còn phải khóa trước khi triển khai sâu

| Nhóm quyết định | Phần còn thiếu |
|---|---|
| **Nhịp chơi** | Tốc độ mô phỏng, tự dừng, xử lý khi đóng game và chính sách lưu. |
| **Quân đội** | Năm bậc có phải cấu trúc cuối không; mốc mở; biên chế; giá và thời gian. |
| **Học viện** | Kiến thức toàn đế chế; số dự án; tiền đề; mất nơi nghiên cứu. |
| **Thánh/Hắc** | Năng lực cụ thể, giới hạn, chuyển nhánh, trộn quân và cơ sở sản xuất. |
| **Chinh phục** | Công thành, phong tỏa, đầu hàng, tiếp quản và ổn định. |
| **Phe NPC** | Danh sách chính thức, quan hệ, mục tiêu, kinh tế và độ khó. |
| **NPC lưu động** | Nguồn xuất hiện, hậu cần, bổ sung quân, định cư, quyền đi qua đất và giới hạn tổng số đoàn. |
| **Khối lượng nội dung** | Những dòng quân và nhánh nào có trong bản thử, tránh làm toàn bộ cùng lúc. |

Một lưu ý về khối lượng: nếu cả năm binh chủng đều có **ba bậc chung và ba nhánh cho hai bậc cuối**, sẽ có:

**5 × [3 + (3 × 2)] = 45 cấu hình quân.**

Đó là phép đếm theo phương án hiện tại, **không phải cam kết làm ngay 45 loại**, cũng chưa tính công thành và quân chức năng.

---

## Thứ tự bổ sung hợp lý

Tui đề xuất khóa **nền offline và lưu/tải trước**, sau đó đặc tả **bậc quân, Học viện và nâng cấp**, tiếp đến **Thánh/Hắc và bộ máy chiến đấu**, rồi mới hoàn chỉnh **phe NPC, đoàn lưu động và chiến dịch chinh phục**.

Bản chơi thử đầu có thể chỉ cần một nhánh quân được nâng cấp đầy đủ, một đế chế đối thủ, một đoàn lưu động và một mục tiêu chiếm thành. Khi các cơ chế ăn khớp mới mở rộng nội dung.

**Tóm lại, phần bổ sung lần này không chỉ là “thêm Paladin và quân đi lang thang”. Crownlands đã chuyển thành game chiến thuật một người chơi với tiến trình công nghệ, quân đội chuyên hóa và các phe NPC có đời sống riêng. Hồ sơ cần mô tả đủ cách chúng sinh ra, phát triển, giao chiến, thất bại và tiếp tục tồn tại trong cùng một thế giới.**