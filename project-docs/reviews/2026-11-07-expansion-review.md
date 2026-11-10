# Phản biện cơ chế mở rộng và thế giới lâu dài

Ngày 07/11/2026. Người viết: Claude, theo yêu cầu của chủ dự án.

Đầu vào: bản tóm lược thiết kế 07/11/2026 và 7 file trong `reference-docs` (mã D, O, T, I và "Tập" dẫn theo hồ sơ gốc).

Mọi công thức và con số mới ở đây là THỬ NGHIỆM, chưa cân bằng. Các phép tính chỉ dùng chỉ số mẫu của bảng tính gốc và công thức sát thương giản lược, chưa phải kết quả mô phỏng. Không mục nào trong review này là quyết định đã duyệt. Thưởng 20/20/40 giữ nguyên.

## 1. Kết luận

Hướng mở rộng có lựa chọn thật khi rủi ro đến từ địa lý, hậu cần và đối thủ. Nó chỉ thành thuế khi đến từ một thanh chỉ số quản trị. Bản đề xuất hiện có 3 lỗ hổng lớn:

1. **Nghịch lý chỉ phạt người đang mở nóng.** Đế chế đã ổn định và không có đối thủ ngang tầm gần như không còn chịu đánh đổi.
2. **Vòng lặp thắng chưa có điểm hãm.** Thưởng theo phần trăm mang lại nhiều hơn cho người đã lớn. Mỏ dùng lính biến quân rảnh thành thu nhập.
3. **Hạn mức quân tính theo đầu người sẽ đẩy mọi người sang voi.** Hạn mức cũng có thể bị lách qua việc đổi chủ thành.

Chưa có gì chứng minh các cơ chế này ngăn được độc bá, kể cả sau khi sửa theo review này.

## 2. Phát hiện

### P0-1. Ba loại chi phí mở rộng đang bị gộp

**Trạng thái:** định hướng có đánh đổi ĐÃ CHỐT; cơ chế ĐỀ XUẤT.

**Mô tả:** mỗi loại có tác dụng khác nhau, và chỉ loại thứ ba tạo xung đột liên tục.

| Loại | Bản chất | Người lớn có chịu không? | Có tạo lựa chọn không? |
|---|---|---|---|
| Chi phí mở mới | Trả một lần, kéo dài vài ngày | Dễ trả | Có, về thời điểm và vị trí |
| Gánh nặng duy trì | Trả đều khi đã ổn định | Trả được rồi thôi | Yếu, dễ thành thuế cố định |
| Nghĩa vụ mặt trận | Phát sinh từ mối đe dọa thật | Có, nếu có đối thủ | Mạnh nhất |

**Ví dụ:** trong ví dụ minh họa, đế chế 30 thành mở nóng duy trì 20k quân chiến dịch, còn 30 thành tốt duy trì 60k. Khoảng cách này chỉ là thời gian. Nếu không ai tấn công trong lúc thành đang ổn định, mở nóng rồi củng cố sẽ thắng hẳn việc dừng ở 10 thành.

**Nên sửa khi viết docs:**
- Viết riêng ba loại chi phí, mỗi loại có câu hỏi "người chơi đánh đổi điều gì".
- Ghi rõ cơ hội phản công là điều kiện để nghịch lý có tác dụng. Mở nóng trong vùng không có ai đe dọa thì gần như không có giá. Phải kiểm tra bằng kịch bản S2 và S3.

### P0-2. Nghĩa vụ phòng thủ không được là một chỉ số tính sẵn

**Trạng thái:** ĐỀ XUẤT.

**Mô tả:** nếu hệ thống tính "quân cần giữ" theo biên giới hoặc điểm nguy cơ rồi phạt khi thiếu, nó sẽ trở thành quota biến đổi và bị lách.

**Ví dụ đường khai thác:**
- Đặt tài khoản phụ làm hàng xóm "vùng đệm" để hạ điểm nguy cơ.
- Xây đế chế dạng hành lang để giảm số đo biên giới.
- Giữ đúng ngưỡng rồi rút quân ngay sau khi hệ thống đo xong.

**Nên sửa khi viết docs:**
- Không có phạt theo nghĩa vụ. Con số "80k giữ" chỉ là lựa chọn của người chơi.
- Nhu cầu giữ thành sinh ra từ việc đối thủ và NPC với tới được bằng quân thật.
- Giao diện có thể cho xem mức phơi bày như một lời khuyên, tính từ dữ liệu người chơi được biết (Tập 03 §10), và không tác động đến chỉ số.
- Mẫu phòng thủ theo khu là bắt buộc nếu giữ nhiều thành, để thao tác không thành hình phạt.

### P0-3. Vòng lặp thắng: giới hạn +40% không chặn được snowball

**Trạng thái:** 20/20/40 ĐÃ CHỐT; điều kiện ĐỀ XUẤT; xét lại quy mô là quyết định của chủ dự án.

**Mô tả:** thưởng theo phần trăm tỷ lệ với quy mô. Theo cách tính đơn giản với các thành ngang nhau, +20% toàn đế chế tương đương 0,6 thành khi có 3 thành, 6 thành khi có 30 và 10 thành khi có 50. Chưa kể tài sản còn tích lũy theo thời gian.

Thưởng đồng thời có điểm yếu ngược chiều: mất Đại thành thì sản lượng toàn đế chế giảm một lần đúng lúc đang bị đánh, dễ thành vòng xoáy sụp đổ.

**Ví dụ:** người đến sớm chiếm Đại thành đầu tiên, dùng thu nhập tăng thêm để giữ nhiều mỏ, nuôi thêm quân rồi chiếm vùng tiếp theo. Người đến sau gặp một đối thủ giàu hơn ngay từ lúc xuất phát.

**Nên sửa khi viết docs (ĐỀ XUẤT, không đổi 20/20/40):**
- Thưởng bật dần theo thời gian giữ ổn định, reset khi `ownership_version` đổi để chống chuyền Đại thành qua lại giữa các tài khoản.
- Tạm ngưng khi Đại thành đang bị bao vây hoặc tranh chấp. Mất Đại thành thì giảm dần trong một khoảng, không rơi một lần.
- Thưởng toàn đế chế chỉ áp dụng cho thành có kết nối đường hợp lệ với trung tâm. Thành cô lập vẫn sản xuất nhưng không nhận thưởng.
- Base chỉ gồm sản lượng ô tài nguyên trong thành. Không áp cho mỏ, cướp, giao dịch hay hỗ trợ, và không áp lên sản lượng ròng đã trừ quân ăn.
- Đại thành có chi phí giữ thật: quân đồn trú, hậu cần, và là mục tiêu hấp dẫn.

**Chủ dự án cân nhắc (chưa đổi):** nếu S8 cho thấy thưởng toàn đế chế là nguồn chênh lệch chính, xét giới hạn số thành nhận thưởng hoặc trần tuyệt đối. Đây sẽ là thay đổi nội dung đã chốt.

### P0-4. Hạn mức quân: đầu người tạo một lựa chọn áp đảo

**Trạng thái:** có hạn mức ĐÃ CHỐT; đơn vị tính CHƯA QUYẾT.

**Mô tả:** khi hạn mức là thứ khan hiếm, người chơi sẽ tối ưu sức mạnh trên mỗi suất. Dùng chỉ số mẫu, sức bền quy đổi theo giáp × công cho thấy một voi mạnh khoảng 15 lần một kiếm. Theo mô hình đánh liên tục, tương đương khoảng 3,9 kiếm.

| Quân | Sức mạnh mỗi con so với kiếm | Trọng số ngang sức | Trọng số theo giá | Trọng số theo lương |
|---|---|---|---|---|
| Kiếm | 1,00 | 1,0 | 1,0 | 1 |
| Giáo | 0,97 | 1,0 | 1,0 | 1 |
| Cung | 0,79 | 0,9 | 1,2 | 1 |
| Kỵ | 4,74 | 2,2 | 2,5 | 3 |
| Voi | 15,25 | 3,9 | 4,3 | 6 |

Bảng này bỏ qua tương khắc, vị trí và tốc độ, nên chỉ cho biết hướng.

**Ví dụ:** với cap đầu người, 10.000 voi là tối ưu hiển nhiên cho người giàu, và cả ý nghĩa "muốn mở quân phải thêm thành" cũng yếu đi. Ngược lại, dùng trọng số theo lương (3 và 6) thì kỵ và voi lại thiệt khi cap đã chạm trần.

**Nên sửa khi viết docs:** dùng đơn vị "suất biên chế", trọng số nằm trong cấu hình THỬ NGHIỆM, thử quanh 1/1/1/2–2,5/4. Mọi ví dụ 50k, 150k cần ghi rõ là suất hay đầu người.

### P0-5. Hạn mức theo thành gốc: nhiều đường lách

**Trạng thái:** tách hạn mức và sức chứa là ĐỀ XUẤT; hậu quả CHƯA QUYẾT.

**Câu hỏi gốc cần trả lời:** nếu đổi biên chế tự do, hạn mức từng thành thực chất là một quỹ chung toàn đế chế. Như vậy hạn mức theo thành chỉ còn ý nghĩa ở nơi tuyển. Nếu đó là chủ đích thì nên ghi thẳng.

| Đường khai thác | Ví dụ | Quy tắc đề xuất |
|---|---|---|
| Xếp hàng đợi | Xếp 5.000 quân khi chỉ còn 100 suất | Giữ suất ngay khi vào hàng, giải phóng khi hủy |
| Gửi ra ngoài | Đưa quân ra trại hay mỏ rồi tuyển tiếp | Vẫn tính vào thành gốc ở mọi trạng thái |
| Tách nhóm | Chia đạo quân để né giới hạn | Tính theo suất, không theo nhóm (T16) |
| Đảo quân | Thành A đầy, đổi gốc sang B rồi A tuyển tiếp | Đổi gốc cần B còn suất, chỉ giữ một gốc, tốn thời gian |
| Thành vừa chiếm | Chiếm xong dùng hạn mức ngay | Đóng góp hạn mức tăng dần theo mức ổn định |
| Rửa hạn mức | Tài khoản phụ tuyển đầy, nhường thành cho chính nó rồi tuyển tiếp | Hạn mức bắt đầu lại khi đổi chủ; quá trần thì không tuyển được; đưa vào phát hiện lạm dụng |
| Đổi đô | Đổi đô liên tục để lấy lợi ích | Hạn mức không phụ thuộc đô; có thời gian chờ |
| Vượt biên | Nhiều đạo quân cùng dùng hạn mức một thành | Gốc là thuộc tính của từng suất; sức chứa nơi đóng tính riêng |
| Trại | Trại lớn tạo thêm hạn mức | Trại chỉ có sức chứa, không có hạn mức |

**Khi mất thành gốc (phù hợp Tập 02 §10.3):** không xóa quân, không chuyển quân cho người chiếm. Quân vào trạng thái "chờ biên chế" có thời gian ân hạn. Sau đó, nếu vẫn thiếu suất, toàn đế chế không tuyển được cho đến khi xuống dưới trần.

**Chưa nên tự chốt:** có thêm hậu quả nào nữa không, như tăng lương hay rã ngũ dần. Quân của người vừa mất thành cuối cần được bảo vệ để không phá đường phục hồi.

**Nên sửa khi viết docs:** thêm vào mô hình dữ liệu `home_settlement_id`, phần giữ suất trong `TrainingJob`, trạng thái chờ biên chế và bất biến mới về suất. Tập 03 §6 hiện chưa có các trường này.

### P0-6. Mỏ dùng lính: nguồn tài nguyên vô hạn và xóa chi phí của quân nhàn

**Trạng thái:** khai thác bằng quân ĐÃ CHỐT; công thức CHƯA QUYẾT.

**Mô tả:** nếu năng suất tuyến tính theo số lính, quân rảnh tự trả lương cho chính nó. Đối với đế chế lớn thời bình, đó là cách biến 150k quân thành thu nhập, trong khi chính quân rảnh mới là thứ cần có giá.

**Ví dụ đường khai thác:**
- Tuyển kiếm rẻ nhất, đưa toàn bộ đi mỏ, dùng thu nhập tuyển tiếp.
- Tài khoản phụ giữ mỏ an toàn rồi chuyển hàng một chiều.
- Bám mốc hồi sinh của NPC để thu lợi, tạo lợi thế cho người online nhiều.

**Nên sửa khi viết docs:**
- Tính tách bốn đại lượng: sức khai thác (có trần theo điểm), quân giữ (không tạo sản lượng), lương (ăn tại nơi đóng), vận tải (không có xe thì hàng nằm tại kho hữu hạn của mỏ).
- Mỗi điểm có trữ lượng và kho hữu hạn, có giới hạn năng suất. Lính khai thác tính theo suất biên chế để tránh lợi dụng quân rẻ.
- Quân đang khai thác không thể đồng thời đi chiến dịch. Rút quân cần thời gian thật.
- Giữ mỏ là kiểm soát quân sự, không phải sở hữu dân sự (Tập 01 §6.2), và không mở rộng đất.
- NPC: tài nguyên thuộc quỹ vùng hữu hạn, chiến lợi phẩm không vượt lượng NPC thật sự có.
- Telemetry bắt buộc theo nguồn: sản xuất, mỏ, NPC tạo mới, cướp (chuyển giao); sink: xây, tuyển, nuôi, phục hồi. Theo dõi tỷ lệ thu nhập từ mỏ so với nội thành.
- Chưa thêm loại dân, quân thứ sáu hay tài nguyên mới.

### P1-7. Năng lực quản trị dễ thành thanh thuế và bị né bằng tài khoản phụ

**Trạng thái:** ĐỀ XUẤT.

**Mô tả:** nếu tải tăng theo số thành, người chơi chỉ cần giữ dưới 100%, đây là bài toán đã giải, không phải lựa chọn. Càng phạt nặng theo số thành, động lực chia đế chế cho tài khoản phụ càng lớn.

**Ví dụ:** 1 đế chế 30 thành bị quá tải, 3 tài khoản 10 thành không bị. Đây chính là lỗ hổng kịch bản S6.

**Nên sửa khi viết docs:**
- Tải chủ yếu đến từ bất ổn, chia cắt và khó tiếp cận; phần theo số thành nhỏ.
- Vùng liền mạch ổn định thì tải thấp, đúng với ý "30 thành liền dễ giữ hơn 15 rải rác".
- Quá tải chỉ làm chậm ổn định và phối hợp, không có ngưỡng rơi đột ngột.
- Có phép thử: nếu tối ưu của mọi người là cùng một mức thì cơ chế không tạo lựa chọn, nên bỏ.

### P1-8. Cấp 1–20 dùng chung dễ hiểu nhầm là cùng sức mạnh

**Trạng thái:** thang 1–20 ĐÃ CHỐT; cách tính CHƯA QUYẾT.

**Mô tả và ví dụ:** tính cấp thành bằng phép gộp đơn giản đều có đường khai thác:
- **Max:** dồn một công trình lên 20.
- **Min:** bị kéo về thấp bởi một ô yếu nhất.
- **Trung bình bỏ qua ô rỗng:** xây nhà mới cấp 1 làm giảm cấp thành.
- **Trung bình tính cả ô rỗng:** xây tràn lan cấp 1 lại có lợi.

NPC cấp 20 cũng không có nghĩa là ngang đế chế có công trình cấp 20.

**Nên sửa khi viết docs:**
- Tách ba thang: "cấp công trình" (0 = ô rỗng, 1–20 = đã xây), "bậc thành" và "hạng mối đe dọa NPC". Nhãn giao diện luôn kèm tên thang.
- Đề xuất bậc thành được tính bằng điều kiện rõ ràng (Phủ và số công trình đạt mốc). Phải viết rõ bậc thành dùng để làm gì trước khi khóa.
- Hạng NPC gắn với lực lượng thật, người chơi vẫn cần trinh sát.
- Công thức tái lập vẫn tính theo từng công trình như D18 và Tập 02 §11.1, không theo bậc thành.
- Xử lý xung đột: bảng tính có `field_cap` mẫu = 10, trong khi thang mới nói 1–20 cho công trình. Cần ghi rõ ô tài nguyên có thuộc thang này hay không.

### P1-9. "Cai trị vùng" chưa có định nghĩa quyền

**Trạng thái:** không sở hữu thành người khác ĐÃ CHỐT; quyền cụ thể CHƯA QUYẾT.

| Câu hỏi | Đề xuất |
|---|---|
| Ai nhận thưởng vùng? | Chỉ thành của người cai trị trong vùng đó |
| Thành người khác trong vùng? | Không mất, không nộp thuế, không bị kiểm soát |
| Nơi nhận thưởng? | Chỉ cơ sở sản xuất trong thành; trại và mỏ không nhận |
| Hiển thị bản đồ? | Lớp vùng tách khỏi màu sở hữu (Tập 01 §6.2) |
| Trại di chuyển sang vùng khác? | Không ảnh hưởng thưởng |
| Thành nằm ở biên? | Mỗi địa điểm chỉ thuộc một vùng tại một phiên bản bản đồ |
| Đổi chủ Đại thành? | Thưởng tính theo đoạn thời gian tại đúng mốc logic (Tập 03 §4.4) |

**Nhập thành và đổi đô:** rủi ro nhân bản tài sản cao nhất.

**Ví dụ đường khai thác:** dùng quyền tái lập để áp 1/2 cấp công trình cũ lên Đại thành vừa chiếm trong khi vẫn giữ thành cũ. Hoặc chuyển kho tức thời khi "dời trung tâm".

**Nên sửa khi viết docs:**
- Đổi đô chỉ là đổi con trỏ trung tâm: không cộng cấp, không tạo `RelocationClaim`, hàng phải vận chuyển thật, quân phải hành quân thật.
- Có thời gian chờ. Nếu về sau có "nhập thành" thì phải có đặc tả riêng và kiểm thử bảo toàn.

**Kỹ thuật:** bật/tắt thưởng đổi tốc độ sản xuất nhiều thành cùng lúc. Cần sự kiện có phiên bản và xử lý theo lô, không dùng giao dịch dài (Tập 02 §12.2).

### P1-10. Thành bỏ hoang và tài khoản bất hoạt là nguồn tài sản mới

**Trạng thái:** bất hoạt chuyển NPC là ĐỀ XUẤT; luật CHƯA QUYẾT.

**Mô tả:** chiếm thành bỏ hoang có công trình cao rẻ hơn tự xây, đó là một nguồn tạo cấp không qua sink.

**Ví dụ đường khai thác:**
- Tài khoản phụ xây thành, bỏ hoang rồi tài khoản chính chiếm lại.
- Bỏ thành cũ để lấy quyền tái lập rồi chiếm lại chính thành đó (Tập 02 §11.5).
- Người chơi nghỉ một tháng trở lại đã mất hết.

**Nên sửa khi viết docs:**
- Chuyển dần qua nhiều mức, có thông báo. Chỉ áp dụng sau khoảng vắng dài.
- Kho của thành bất hoạt không đầy lên vô hạn, tránh thành mỏ cho người khác cướp.
- Công trình xuống cấp theo luật riêng chỉ với thành bất hoạt. Quy tắc không chia cấp của thành bị chiếm (T50) giữ nguyên.
- Người trở lại có đường vào, không xóa lịch sử.
- Ghi vào phát hiện lạm dụng theo lịch sử tài sản. Chung IP không phải bằng chứng.

### P1-11. Thế giới không reset: thiếu mục tiêu và đường vào

**Trạng thái:** không reset bắt buộc ĐÃ CHỐT; cơ chế chống độc bá CHƯA QUYẾT.

**Mô tả:** cấp 20 và Đại thành đều có điểm kết thúc. Sau khi một đế chế đã giữ đủ, nó còn lý do gì, và người mới vào để làm gì khi các vùng đã có chủ?

**Nên sửa khi viết docs:**
- **Người cũ:** mục tiêu tự nguyện theo lịch sử, thành tựu hậu cần, giữ vùng lâu dài, không cộng sức mạnh. Không có nhiệm vụ ngày.
- **Người mới:** mở vùng mới theo mật độ, có Đại thành NPC chưa bị chiếm. Khoảng cách thật khiến đế chế xa phải trả giá để với tới. Bảo vệ có điều kiện và chống dùng tài khoản phụ làm khiên.
- **Người thua:** tái lập ở vùng có đường phát triển thật, xem trước rõ trạng thái (Tập 04 §9.3).
- **Chưa đặt trần số thành:** đề xuất 5–12 thành ở tư vấn trước chưa được duyệt, không đưa vào docs như luật.
- Không hứa hẹn ngăn được độc bá. Theo dõi mức tập trung lãnh thổ (Tập 05 §8).

### P1-12. Nghỉ ngơi và phục hồi: nguyên tắc có thời gian phản ứng

**Trạng thái:** CHƯA QUYẾT. Giờ nghỉ bất khả xâm phạm và PvE-only không được duyệt, không ghi vào docs như luật.

**Mô tả:** cần phân biệt thiệt hại khắc phục được với thiệt hại khó đảo ngược. Hồ sơ chỉ đặt vấn đề ở Tập 05 §10 và O04, O11.

**Nguyên tắc đề xuất:**
- Không có thiệt hại khó đảo ngược (mất thành, mất phần lớn quân do đói) nào được hoàn tất nhanh hơn thời gian phản ứng được công bố. Con số phải thử.
- Cướp phá và đánh trại vẫn có thể xảy ra khi offline, đây là rủi ro của chiến tranh.
- Người chơi được đặt phòng thủ trước và thấy thời gian tới của quân địch ở mức tình báo cho phép.

**Ví dụ đường khai thác cần chặn:**
- Nếu có khiên chủ động: đánh xong bật khiên để né phản công.
- Nếu thời gian phản ứng tính riêng từng thành: đánh đồng thời 10 thành trong một đêm, người chơi không kịp cứu. Cần kịch bản đa mặt trận.

### P2-13. Ví dụ quân số lệch hoàn toàn với số mẫu

**Trạng thái:** ví dụ chỉ minh họa; bảng tính THỬ NGHIỆM.

**Mô tả:** 6 ô lúa cấp 10 cho 666 lương/giờ mỗi thành. 30 thành sản xuất 19.980 lương/giờ, kể cả +40% cũng chỉ khoảng 28.000, chưa kể chi phí khác. Trong khi đó 150k kiếm ăn 150.000 lương/giờ, gấp 5,4–7,5 lần.

Nuôi 60k quân chiến dịch cần khoảng 36 tuyến mẫu (10 xe, mỗi chiều 3 giờ).

**Nên sửa khi viết docs:** ghi rõ các ví dụ không dùng được làm mục tiêu cấu hình. Đo khối lượng thao tác ở quy mô thực sau khi chốt thang kinh tế.

### P2-14. Thuế và An dân dễ thành thanh trượt có đáp án

**Trạng thái:** ĐỀ XUẤT, hoãn.

**Ví dụ:** nếu ngưỡng phản loạn biết trước, mọi người để thuế sát ngưỡng và lặp lại ở từng thành. Không tạo lựa chọn, chỉ thêm thao tác. Sĩ khí cũng có nguy cơ trùng với thiếu lương.

**Nên sửa khi viết docs:** chỉ ghi là ý tưởng lưu, phải chứng minh cần thiết sau khi mô phỏng chưa có nó. Phản loạn phải có cảnh báo, không phải tai họa ngẫu nhiên.

## 3. Bảng giữ, chỉnh, hoãn

| Hạng mục | Quyết định đề xuất | Lý do |
|---|---|---|
| Hậu cần, quân rảnh, nhiều mặt trận | Giữ | Đây là lựa chọn thật nhất |
| Không phạt theo ngưỡng cứng; 30 thành liền dễ giữ hơn 15 rải rác | Giữ | Đúng logic địa lý |
| NPC dùng lực lượng thật, không tự mạnh theo người chơi | Giữ | Tránh thuế ẩn |
| Hạn mức quân | Chỉnh | Dùng suất biên chế và chống rửa hạn mức |
| Thưởng Đại thành | Chỉnh điều kiện | Giữ 20/20/40, thêm điều kiện bật/tắt |
| Mỏ dùng lính | Chỉnh | Có trần, có trữ lượng, tách bốn đại lượng |
| Năng lực quản trị | Chỉnh mạnh | Giảm phần theo số thành, tránh thành thanh thuế |
| Cấp 1–20 | Chỉnh | Tách thang và nhãn |
| Đổi đô | Chỉnh | Chỉ đổi trung tâm, không chuyển tài sản |
| Tấn công mỏ, trại, kho để cắt hậu cần | Mô phỏng trước | Tạo phản công mà không cần theo dõi tuyến |
| Đánh chặn dọc đường, hộ tống | Hoãn | Cần luật theo đoạn đường (Tập 03 §4.3) |
| NPC phục quốc, ghi nhớ vùng | Hoãn; thử một kịch bản phản công cố định trên giấy | Khó kiểm soát nguồn lực |
| Thuế, An dân, phản loạn, sĩ khí | Hoãn | Có nguy cơ thêm thao tác |
| Nhập thành | Hoãn | Rủi ro nhân bản, chưa có đặc tả |
| Thương binh, tù binh, phí đường, nghi binh | Hoãn | Ngoài vòng lõi |

**Chuyển sang prototype được ngay (giấy hoặc mô phỏng, chưa phải MVP):** chiến dịch 10–30 thành, suất biên chế, một loại mỏ, tải quản trị đơn giản, điều kiện thưởng Đại thành. **Đo thao tác** bằng số lệnh mỗi phiên, không để việc lặp thay cho độ khó.

## 4. Kịch bản mô phỏng tối thiểu

| Mã | Kịch bản | Câu hỏi |
|---|---|---|
| S1 | 10 thành ổn định | Mốc so sánh |
| S2 | **30 thành ổn định, quản trị tốt, không có đối thủ ngang tầm** | Bài khó nhất: còn đánh đổi gì? Thu nhập biên của thành thứ 30? |
| S3 | 30 thành mở nóng, có và không có kẻ phản công | Sau bao lâu vượt S1? Có cơ hội phản công không? |
| S4 | 30 thành liền so với 15 rải rác | Tỷ lệ quân giữ, số lệnh mỗi phiên |
| S5 | S2 đối đầu 3 đế chế nhỏ tự phối hợp, không chung quân | Có tạo được áp lực mà không thành bang hội trá hình? |
| S6 | 1 đế chế 30 thành so với 3 tài khoản 10 thành | Chia nhỏ có lợi không? |
| S7 | Toàn bộ quân rảnh đi mỏ trong 30 ngày | Tỷ trọng mỏ so với nội thành; lạm phát |
| S8 | Chiếm Đại thành sớm, muộn và bị mất | Thời gian tăng gấp đôi kinh tế; có sụp đổ dây chuyền không? |
| S9 | Nhường thành giữa tài khoản để rửa hạn mức, tái lập lặp | Bảo toàn tài sản; dấu vết phát hiện |
| S10 | Mất thành gốc khi quân ở xa; mất thành cuối | Có mất quân oan, có đường phục hồi không? |
| S11 | Cap theo đầu người so với theo suất | Cơ cấu quân có hội tụ về một loại không? |
| S12 | Người mới ngày 60 cạnh đế chế cũ; tài khoản bất hoạt lâu | Có đường chơi không? Có bị hút cạn không? |
| S13 | Đánh đồng thời nhiều thành trong khoảng offline | Thời gian phản ứng có tác dụng không? |

**Theo dõi:** nguồn và sink, chiến dịch duy trì tính theo suất, thu nhập biên của thành thứ n, số lệnh mỗi phiên, thời gian phục hồi, mức tập trung lãnh thổ. Tiêu chí đạt phải viết trước khi chạy. Kết quả chỉ áp dụng cho tập đầu vào đã ghi và không chứng minh được game vui.

## 5. Quyết định mở quan trọng

1. **Đơn vị hạn mức:** đầu người hay suất biên chế, và cách đặt trọng số? Khuyến nghị: suất biên chế. (P0-4)
2. **Bản chất hạn mức:** quỹ chung toàn đế chế hay ràng buộc cục bộ, và hậu quả khi vượt trần? Khuyến nghị: thừa nhận quỹ gần chung, không xóa quân. (P0-5)
3. **Điều kiện thưởng Đại thành:** tốc độ bật, điều kiện kết nối, khi tranh chấp, base áp dụng. Khuyến nghị: bật dần, cần kết nối, chỉ tính ô tài nguyên. (P0-3)
4. **Mô hình mỏ:** trần theo điểm, trữ lượng, kho, cách hồi. Khuyến nghị: trữ lượng hữu hạn có hồi chậm theo quỹ vùng. (P0-6)
5. **Bậc thành:** định nghĩa và công dụng. Khuyến nghị: tính bằng điều kiện rõ ràng, không dùng min/max/trung bình. (P1-8)
6. **Quyền cai trị vùng và đổi đô:** danh sách quyền, thời gian chờ. Khuyến nghị: chỉ thưởng cho thành của mình, đổi đô không chuyển tài sản. (P1-9)
7. **Thời gian phản ứng:** thiệt hại nào không được hoàn tất trong khoảng nào. Khuyến nghị: chốt nguyên tắc trước, số liệu sau khi thử. (P1-12)
8. **Tài khoản bất hoạt:** bao lâu, chuyển thế nào, trở lại ra sao. Khuyến nghị: nhiều mức, có thông báo. (P1-10)

## 6. Điểm cần đối chiếu khi cập nhật hồ sơ

- `reference-docs` không có các khái niệm: bậc thành, hạn mức quân, thành gốc, mỏ, Đại thành, vùng, NPC chủ động, tải quản trị. Cần bổ sung vào luật, dữ liệu và kiểm thử; hồ sơ gốc giữ nguyên.
- Trong Tập 05, M2 chỉ có "đối thủ hệ thống" và kiểm thử chưa bao phủ các nội dung này; lộ trình B và T cần mở rộng.
- O02 có định hướng mới nhưng chỉ phần không reset. Các tham số chống độc bá vẫn mở.
- Trạng thái Cloudflare + PostgreSQL, MVP PvE, 20–50 người, 5–12 thành, giới hạn mặt trận, giờ nghỉ: vẫn CHƯA được duyệt.

## 7. Giới hạn của review

- Không chạy mô phỏng và không playtest. Mọi phép tính đều giản lược, chỉ dựa trên chỉ số mẫu chưa cân bằng.
- Không dùng dữ kiện thị trường hay so sánh game cụ thể.
- Đánh giá dựa trên bản tóm lược, chưa có lời xác nhận riêng của chủ dự án cho từng mục "đã chốt" ngoài nội dung tóm lược.
