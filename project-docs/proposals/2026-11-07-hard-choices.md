# Bảy ý tưởng về lựa chọn và tổ chức đế chế

Ngày 07/11/2026. Nguồn: phần ý tưởng tham khảo do chủ dự án gửi trong cuộc trao đổi. Tài liệu diễn đạt lại để lưu và đối chiếu, không phải bản chép nguyên văn.

**Trạng thái toàn bộ: ĐỀ XUẤT, chưa duyệt triển khai, chưa thuộc MVP mặc định.** Các nhận xét và bài thử trong tài liệu này là phân tích biên tập; chưa có vòng phản biện riêng của Claude cho bảy ý tưởng này, chưa có mô phỏng hoặc playtest.

Quyết định hiện hành vẫn theo [sổ quyết định](../decisions.md). Không thêm quyết định D hoặc sửa thông số đã chốt từ phần tham khảo này.

## 1. Mục tiêu chung

Tạo những lựa chọn không thể đồng thời tối ưu: có quân nhưng chưa chắc huy động hết; có đất nhưng chưa chắc trực trị hết; thắng trận nhưng chưa chắc đáng giữ mục tiêu.

Không thêm hàng chục thanh chỉ số phải chăm. Mỗi cơ chế cần làm thay đổi một quyết định đáng suy nghĩ, có hậu quả người chơi hiểu được, và giảm thao tác lặp bằng công cụ cho mọi người.

## 2. Quân dự bị và tổng động viên

**Ý tưởng:** quân đã tuyển có thể ở trạng thái thường trực hoặc dự bị. Thường trực sẵn sàng phòng thủ, hành quân và làm nhiệm vụ, đổi lấy chi phí duy trì đầy đủ. Dự bị giảm chi phí nhưng cần thời gian và tài nguyên tái huy động trước khi chiến đấu như quân thường trực.

**Lựa chọn:** giữ bao nhiêu lực lượng sẵn sàng ở biên giới, bao nhiêu tiềm lực dành cho chiến dịch chuẩn bị trước. Huy động quân đi cùng chuẩn bị lương và vận tải, không chỉ đổi một nút trạng thái.

Các điều kiện đi kèm đề xuất:

- Quân dự bị vẫn dùng hạn mức thành gốc và không giải phóng suất để tuyển thêm.
- Chuyển trạng thái không hoàn toàn bộ giá tuyển, không hồi sinh hoặc tự chữa quân, không tức thời.
- Quân đang đi, ở trại hoặc khai thác không được đồng thời hưởng giảm chi phí dự bị nếu vẫn làm nhiệm vụ thường trực.
- Mọi thay đổi chi phí và trạng thái áp dụng từ đúng mốc logic; tính cả lệnh đang xử lý và thời điểm bị tấn công.

**Rủi ro:** giảm chi phí duy trì có thể giúp đế chế lớn ổn định tích sẵn lực lượng quá rẻ, làm yếu đánh đổi của hậu cần. Nếu phải canh giờ huy động từng ngày thì cơ chế trở thành việc vặt. Không thể kết luận dự bị chống được người mạnh càng mạnh.

**Cần quyết:** dự bị ở đâu, mức duy trì, thời gian huy động/giải ngũ về dự bị, hành vi khi địa điểm bị chiếm, khả năng phòng thủ trong thời gian tập hợp và có hạn chế hủy/chuyển liên tục không. Liên quan O04, O10, O17–O19.

**Bài thử:** so đế chế lớn thời bình có/không dự bị; một cuộc tấn công bất ngờ; chuyển trạng thái sát mốc trận; mất thành gốc. Đo mức tăng quân tích trữ và số thao tác mỗi phiên.

## 3. Thành trực trị và thành tự quản

**Ý tưởng:** hai cách tổ chức các thành cùng một chủ. Trực trị phục vụ căn cứ trọng yếu, huy động và điều phối mạnh hơn nhưng cần năng lực quản trị cao hơn. Tự quản giảm nhu cầu quản trị, giữ phần nguồn lực địa phương lớn hơn và hạn chế mức huy động cho chiến dịch.

Thành tự quản không phải chư hầu hay tài sản người khác. Quân và kho vẫn riêng, không tạo bang hội hoặc kho chung. Mọi thành vẫn có công cụ tự động hóa thao tác; đây không phải trả giá để được bớt bấm chuột.

**Lựa chọn:** ưu tiên quyền huy động tại một số thành chiến lược, đổi lấy khả năng giữ hậu phương rộng hơn bằng cơ chế tự quản.

Các điều kiện đi kèm đề xuất:

- Chuyển chế độ có thời gian, chi phí và quy tắc cho quân, hàng đợi, chính sách và hợp đồng đang có.
- Không hưởng lợi của tự quản cả ngày rồi chuyển trực trị tức thời trước xuất quân.
- “Phần dân sinh giữ lại” cần định nghĩa bằng tài nguyên có thật, khoản giữ hoặc quy tắc sản xuất rõ ràng; chưa thêm tài nguyên dân sinh hoặc nguồn hàng mới.

**Rủi ro:** hai chế độ có thể chỉ là một bài tối ưu có đáp án cố định: mọi thành xa tự quản, thành tuyển quân trực trị. Cũng có thể trùng chức năng với khu điều hành, dự trữ và ổn định thành mới, làm tăng luật mà không thêm lựa chọn.

**Cần quyết:** mỗi chế độ thay đổi những quyền nào, loại hàng nào bị giới hạn, mức huy động và cách xử lý thiếu nguồn cho nghĩa vụ đã nhận. Liên quan P03/P04, O09, O18, O25.

**Bài thử:** so với hệ thống chỉ có chính sách quản trị hiện hữu. Chỉ giữ chế độ mới nếu tạo được phương án khác nhau theo hoàn cảnh mà không cần người chơi thường xuyên đổi qua lại.

## 4. Khai thác và cảnh giới tại mỏ

**Ý tưởng:** người chơi chọn ưu tiên khai thác, cân bằng hoặc ưu tiên phòng thủ. Quân đang khai thác vẫn hiện diện khi có địch nhưng cần thời gian tập hợp, nên không đồng thời đạt năng suất tối đa và đầy đủ lợi thế sẵn sàng.

**Lựa chọn:** mỏ hậu phương có thể khai thác mạnh, mỏ gần đối thủ dành lực lượng sẵn sàng nhiều hơn. Không cần giao việc cho từng lính.

Các điều kiện đi kèm đề xuất:

- Tổng lực lượng, gốc biên chế, lương và vị trí được bảo toàn qua các chính sách.
- Đổi chính sách có mốc hiệu lực/độ trễ; không nhìn địch sắp tới rồi đổi tức thời để nhận cả hai lợi ích.
- Không coi quân khai thác là mất tích hoặc chết tự động khi bị đánh.
- Dự báo nói rõ sản lượng, lực lượng sẵn sàng và thời gian tập hợp theo tình báo được phép biết.

**Rủi ro:** nếu một chế độ luôn tối ưu thì hai nút còn lại chỉ làm rối. Nếu đổi thủ công theo từng chuyến địch là cách chơi tốt nhất, cơ chế có thể thưởng cho việc canh màn hình và phạt người offline.

**Cần quyết:** ba chế độ phân công quân hay áp hệ số, lúc đang chuyển bị đánh thì tính thế nào, thời gian tập hợp và khi nào có thể hủy lệnh. Liên quan D21, P06, O10, O20.

**Bài thử:** cùng mỏ và quân, thay nguy cơ/đường tiếp cận; so người online thường xuyên với người dùng một chính sách ổn định. Đo cơ hội lựa chọn và số lần phải đổi chế độ, không chỉ sản lượng.

## 5. Vòng đời tài nguyên thế giới

**Ý tưởng:** điểm khai thác ngoài thế giới có trữ lượng hoặc chu kỳ. Rừng/ruộng có thời kỳ phục hồi; sắt/đất sét suy giảm và cần khảo sát hoặc tìm điểm khác theo quy tắc phân bố.

**Phạm vi đề xuất:** chưa áp cạn kiệt lên các ô sản xuất cơ bản trong thành ở bản đầu. Kinh tế nền cần ổn định để người chơi phát triển và phục hồi.

**Lựa chọn:** đầu tư tiếp, giảm lực lượng, giữ nguồn đang suy giảm hoặc mở tuyến tới điểm mới. Chiếm một mỏ tốt không bảo đảm nguồn thu vĩnh viễn.

Các điều kiện đi kèm đề xuất:

- Có thông tin trữ lượng/chu kỳ trước khi đầu tư, theo phạm vi tình báo hợp lệ.
- Cạn trữ lượng không tự xóa điểm, đổi chủ, tiêu hủy hàng trong kho hoặc dịch chuyển quân.
- Quy tắc hồi, khảo sát và sinh điểm mới có giới hạn/ngân sách theo không gian và thời gian.
- Mọi tài nguyên hồi là nguồn tạo mới được ghi nhận, không gọi đó là bảo toàn tuyệt đối.

**Rủi ro:** di chuyển điểm nóng có thể chỉ giúp người đã lớn chiếm điểm mới trước. Thế giới lâu dài cũng có thể thành vùng đất chết nếu mọi điểm đều cạn mà không có đường tái tạo hợp lý. Không tự giải quyết cả hai vấn đề bằng sinh điểm vô hạn.

**Cần quyết:** ai khảo sát, chi phí và quyền phát hiện, thông tin công khai, lịch hồi, vị trí mới và xử lý hạ tầng tại mỏ cũ. Liên quan O20, O23, O27.

**Bài thử:** nhiều chu kỳ với đế chế lớn ổn định và người mới đến muộn; theo dõi quyền kiểm soát điểm mới, thu nhập nội thành/ngoài thành và gánh nặng di chuyển.

## 6. Hợp đồng cung ứng dài hạn

**Ý tưởng:** hai chủ sở hữu thỏa thuận giao hàng định kỳ, ví dụ lương đổi sắt. Mỗi bên dùng kho và xe của mình. Hợp đồng có hạn mức, thời hạn và điều kiện dừng; không có kho/quân chung hoặc quyền điều khiển thành bên kia.

**Lựa chọn:** chuyên môn hóa và phụ thuộc đối tác, hay dành thêm nguồn lực để tự cung. Người bán cân nhắc khách hàng lớn với phân tán rủi ro giữa nhiều bên.

Các điều kiện đi kèm đề xuất:

- Mỗi kỳ cần hàng, xe và hành trình thật; kế hoạch sản xuất tương lai chưa phải hàng đã có.
- Ký quỹ hoặc bồi thường chỉ lấy từ tài sản đã được giữ thực tế, không được hệ thống tạo mới khi giao thất bại.
- Nêu rõ cơ chế hai phía: giữ hàng, xuất phát, giao một phần, hàng mất và nghĩa vụ còn lại. Không mặc định cả hai chuyến đều thành công cùng lúc.
- Có quy tắc khi nguồn/đích đổi chủ, người chơi dừng hợp đồng, thiếu xe, kho đầy hoặc không còn đủ sản lượng.
- Dừng hợp đồng không xóa chuyến đã xuất phát hoặc hoàn hàng hai lần.

**Rủi ro:** hợp đồng trở thành công cụ chuyển hàng một chiều từ tài khoản phụ hoặc tạo mạng lưới tài trợ chiến tranh không có đánh đổi. Đồng thời không nên mặc định mọi giao thương lệch đều là gian lận; cần chính sách minh bạch và lịch sử tài sản.

**Cần quyết:** từng kỳ cam kết độc lập hay đảm bảo cả chuỗi; giới hạn thời hạn/ký quỹ; vi phạm, hủy và thông tin đối tác được biết. Liên quan O07, O09, O13 và I05/I06/I09/I12.

**Bài thử:** một bên giao còn bên kia thất bại, thành đổi chủ giữa kỳ, đối tác mất sản lượng, và nhiều hợp đồng cùng giữ một kho. Nên thử sau giao dịch vật lý một lần đã đúng.

## 7. Rút bỏ lãnh thổ có tổ chức

**Ý tưởng:** chủ động thu hẹp một phần đế chế để bảo toàn lực lượng và mạng hậu cần. Quy trình: ngừng đầu tư → sắp xếp biên chế → chở hàng → rút quân → chấm dứt quyền sở hữu theo luật.

**Lựa chọn:** giữ thành xa đang tốn nguồn, hay từ bỏ để giải phóng quân cơ động/xe và tập trung vùng lõi. Thành cũ có thể còn công trình cho người khác tranh đoạt hoặc tái thiết.

Các điều kiện đi kèm đề xuất:

- Không xóa thành tức thời để phủ nhận mục tiêu của đối thủ ngay trước khi bị chiếm.
- Không tự cấp thành mới hoặc quyền tái lập từ mỗi thành bỏ lại.
- Nếu cho tháo dỡ, vật liệu thu hồi trừ từ công trình thật, có tỷ lệ, thời gian và vận tải; không vừa giữ nhà vừa nhận vật liệu.
- Quân không biến mất khi nguồn biên chế bị bỏ. Phải xử lý suất, gốc và quyền sở hữu.
- Mọi bước có thể bị tác động bởi chiến tranh đang diễn ra theo luật được công bố; không dùng quy trình như khiên miễn tấn công.

**Điểm cần khớp với luật hiện hành:** rút bỏ một phần lãnh thổ không tự cấp quyền tái lập. Trường hợp chủ động bỏ **thành cuối cùng** cần làm rõ với D17/D18 và O01; không dùng đề xuất mới để âm thầm cắt đường phục hồi đã chọn, cũng không nhân quyền hỗ trợ.

**Rủi ro:** đốt sạch thành ngay trước thất thủ, rửa vật liệu/biên chế qua tài khoản phụ hoặc dùng thành bỏ lại làm nguồn farm. Cũng cần tránh quy trình nhiều bước đến mức người thua không thực hiện nổi.

**Cần quyết:** thời gian chấm dứt, điều kiện bắt đầu/hủy, bên tấn công có thể can thiệp thế nào, chủ tạm thời và nơi hàng/quân đến nếu lệnh không hoàn tất. Liên quan O01, O03, O06, O18, O26.

**Bài thử:** bỏ một thành đang yên so với đang bị vây; mất thành nguồn trong lúc rút; tháo dỡ bị ngắt; bỏ thành cuối; người khác chiếm giữa quy trình.

## 8. Thủ đô dự phòng và chuyển giao

**Ý tưởng:** đầu tư một thành dự phòng có chức năng điều hành. Khi thủ đô thất thủ, các thành còn lại vẫn có chủ, kho và hoạt động cơ bản; chỉ chức năng thực sự gắn với trung tâm có thể gián đoạn trước khi chuyển giao hoàn tất.

**Lựa chọn:** dồn toàn bộ vào một kinh đô mạnh hay dành nguồn chuẩn bị phục hồi. Không tạo “công tắc” mất một thành rồi toàn đế chế ngừng sản xuất.

Các điều kiện đi kèm đề xuất:

- Mất Đại thành và chuyển thủ đô là hai sự kiện riêng. Trung tâm mới không tự kế thừa thưởng của Đại thành đã mất.
- Quân và hàng vẫn di chuyển thật; không nhân cấp nhà hoặc kho khi chuyển giao.
- Chuẩn bị thành dự phòng có đầu tư thật; chưa mặc định chỉ đánh dấu là đủ.
- Hạn chế đổi trung tâm liên tục để né bao vây hoặc lách điều kiện thưởng.

**Rủi ro:** nếu chưa có chức năng nào thực sự cần thủ đô, hệ thống dự phòng chỉ là khoản phí mới. Ngược lại, gắn quá nhiều hành động thiết yếu vào thủ đô sẽ làm một lần thất thủ gây sụp đổ không thể cứu.

**Cần quyết:** chức năng nào gắn với trung tâm, cái gì được duy trì tại chỗ, thời gian chuyển, yêu cầu đầu tư, xử lý đồng thời mất trung tâm và hết lương. Liên quan D24/D25, O21/O22/O25 và N07.

**Bài thử:** mất thủ đô khi còn nhiều thành, có/không chuẩn bị dự phòng; đổi trung tâm nhưng mất Đại thành; gửi lại lệnh chuyển giao; dự phòng bị chiếm đúng lúc chuyển.

## 9. Thứ tự tham khảo

Đây là thứ tự **thiết kế đề xuất trong đầu vào**, chưa phải thay đổi lộ trình đã duyệt:

| Nhóm | Ý tưởng | Tiền đề cần có |
|---|---|---|
| Trước | Khai thác/cảnh giới; rút bỏ có tổ chức | Mỏ và chiến đấu; quyền thành/biên chế và vận tải |
| Tiếp theo | Hợp đồng dài hạn; dự bị/tổng động viên | Giao dịch một lần đúng; hạn mức và kinh tế duy trì đã thử |
| Thử sau | Trực trị/tự quản; vòng đời mỏ; thủ đô dự phòng | Có số đo quản trị, khai thác dài hạn và vai trò trung tâm rõ |

“Trước” là ưu tiên phân tích, không yêu cầu làm trước nền lệnh, tài sản, hành quân và hậu cần. Có thể thử trên giấy/mô phỏng trước khi thêm vào game.

## 10. Bộ lọc trước khi chọn triển khai

1. Người chơi có thể nêu ít nhất hai lựa chọn hợp lý tùy tình huống, thay vì một cấu hình luôn đúng không?
2. Lựa chọn có thể đặt trước, có thời gian phản ứng và không buộc canh giờ chuyển chế độ không?
3. Có làm đế chế lớn ổn định mạnh thêm quá rẻ hoặc khuyến khích chia tài khoản không?
4. Cơ chế có trùng hậu cần, dự trữ, khu điều hành hoặc ổn định thành mới không?
5. Đổi trạng thái, đổi chủ, offline và thử lại sự kiện có bảo toàn quân/hàng/quyền không?

Chỉ chọn sau khi có một bài thử và tiêu chí cho từng ý tưởng. Chưa thêm công thức, trọng số, thời lượng hoặc thanh chỉ số mới vào luật hiện hành từ tài liệu này.
