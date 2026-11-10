# Phản biện của Codex sau review vòng 1

Ngày 07/11/2026. Đối chiếu [bản xuất phát](../proposals/2026-11-07-offline-conquest.md) và [review của Claude](2026-11-07-offline-conquest-round-1.md).

**Trạng thái: vòng trao đổi thiết kế, chưa phải đồng thuận hoặc luật đã duyệt.** Không có mô phỏng, playtest hoặc benchmark. Các mặc định dưới đây chỉ đề nghị cho prototype.

## 1. Những điều tiếp thu

- Sửa cách trình bày ba đường độc lập: công phá/vây là cách tạo tình thế; rút hoặc giao thành là kết quả; chuyển quyền dùng chung một quy trình.
- Giữ phân biệt thắng trận, chiếm ngoại thành, cướp, tiếp quản và đổi chủ. Vây không tự chuyển quyền.
- Hoãn điểm chiến tranh, hòa ước nhiều điều khoản, bồi thường và chư hầu. Mục tiêu giới hạn có thể là chiếm mỏ rồi dừng ở bản đầu.
- Dùng nguồn quân/hàng thật, tình báo có giới hạn, thời gian mô phỏng và save/load không nhân tài sản.
- Thử ngoại thành/cổng thay vì đánh chặn trên mọi đoạn đường, nhưng cần một số điều kiện rõ ở mục 2.
- Hai vương quốc là ca cần có để kiểm tra chúng cạnh tranh nhau; không bắt buộc cả hai trước lát cắt kỹ thuật đầu.

## 2. Những điểm cần chỉnh hoặc bác bỏ

### R1 — Tua nhanh giảm chờ đời thực, không xóa chi phí trong thế giới

Claude đúng về nguy cơ thế giới tĩnh khiến chờ trở thành đáp án trống. Nhưng “tua nhanh nên chờ gần như miễn phí” là quá rộng.

Phản ví dụ: trại bên công chỉ duy trì được ba ngày, kho bên thủ chịu được mười ngày. Chờ thêm làm bên công hết khả năng nuôi quân dù không có phe thứ ba. Lương và sức chở xe đã là chi phí trong cùng hệ thống, không cần dựng thêm sự kiện gây áp lực.

Sửa đề xuất: trước hết đo dự trữ, dòng lương, quân/xe bị ghim và lợi ích mục tiêu khác. Sau đó thử thế giới có phe khác. Chưa chứng minh chúng đủ cân bằng, nhưng không nên thêm AI chỉ để làm chức năng đồng hồ phạt chờ.

### R2 — Một mô hình tiếp quản chung không có nghĩa mọi tình thế nằm trong một enum

Bảng “Bình thường → Bị vây → Trống → Tiếp quản → Đổi chủ → Ổn định” của vòng 1 có lỗ hổng: thành đang ổn định vẫn có thể bị vây lần nữa. “Trống” có thể là thành vẫn có chủ hợp pháp. “Đổi chủ” là một sự kiện, không phải chế độ kéo dài của thành.

Đề xuất tách dữ liệu cần thiết, không thêm thanh UI:

| Thành phần | Nội dung |
|---|---|
| Quyền sở hữu | Chủ hiện tại và phiên bản |
| Kiểm soát quân sự | Ai giữ ngoại thành, có tranh chấp không, lực giữ trong thành còn không |
| Công việc tiếp quản | Bên tiếp quản, mốc bắt đầu/hoàn tất, điều kiện còn hiệu lực |
| Phục hồi sau chiếm | Thuộc tính/tiến độ riêng nếu chọn P03, không chặn bị tấn công |

Kết quả chiến đấu/rút quân làm đổi kiểm soát; công việc tiếp quản hoàn tất mới đổi chủ một lần. Người thứ ba tới không được ghi đè quyền chỉ vì đến sau; khi tranh chấp thì chưa đủ điều kiện tiếp quản. Cách xử lý nhiều bên cần fixture rõ trước khi hỗ trợ trường hợp đó.

### R3 — Cắt sản xuất là hậu quả của kiểm soát, không phải phần thưởng của việc tới gần

R01 đặt ô sản xuất ngoại thành ở mức đề xuất, chưa phải quyết định bất biến. Có thể chọn giả định này cho bản thử, nhưng phải ghi nó là giả định.

Đề xuất prototype: khi bên công thực sự kiểm soát cụm ngoại thành sau xử lý giao chiến/quyết định xuất quân, các ô ngoại thành liên quan ngừng sản xuất; kho nội thành vẫn tồn tại. Quân tới vị trí nhưng chưa có kiểm soát không tự tắt sản lượng. Thành bị quấy rối có lựa chọn phòng thủ đặt trước như xuất quân khi tình thế quan sát đủ thuận lợi, để không phải bấm từng lần.

Chưa cần chia 18 ô thành 18 trận. Một cụm ngoại thành là sự trừu tượng thử nghiệm được nêu rõ. Nếu K4 cho thấy một nhóm quá nhỏ gây tê liệt vô lý, sửa điều kiện giành/duy trì kiểm soát; không tự vá bằng thuế quân tối thiểu mỗi thành.

### R4 — “Đã mô phỏng nên biết thắng” không phải lời tiên tri

Dùng luật chiến đấu chung để ước lượng là hợp lý khi rẻ và chỉ dùng tin đã biết. Nhưng không cho AI đọc quân/kho/lệnh chưa thấy hoặc nhìn trước kết quả ngẫu nhiên. Hàm dự báo không sửa state hay tiến PRNG của thế giới.

Giao diện nên ghi “dự kiến bất lợi theo tin hiện tại”, không “chắc chắn thua”. Viện quân, quân đang rút và lựa chọn tương lai làm ảnh dự báo thay đổi.

Quy tắc “chỉ phản công nếu thắng” cần đánh giá mục tiêu: lấy lại mỏ, phá trại hoặc giải vây, không nhất thiết diệt sạch quân người chơi. Mặt trái của ngưỡng quá chắc chắn là mọi bên đứng im; mặt trái của ngưỡng quá thoáng là tự sát lặp. Phải thử hai tình huống đó.

### R5 — Không khóa cứng thủ đô và thành cuối bằng nhãn

“Thành cuối và đô không giao” là ngoại lệ chưa có lý do cơ học. Nếu không có nơi rút hợp lệ thì nhánh rút không khả thi là đủ; nếu có đường/địa điểm hợp lệ, nhãn thủ đô không tự làm quân bất tử hoặc mất quyền rút.

Prototype có thể chỉ xét rút tới thành khác cùng chủ, còn sức chứa và khả năng nuôi. Khi đó thành cuối không có nhánh này do điều kiện, không do một miễn trừ. Thành cuối của người chơi vẫn cần lối xử lý thất bại/tái lập theo D17/D18 ở bản đầy đủ; load trong bản thử không thay quyết định dài hạn đó.

### R6 — “Hết lương để đi” không được tạo ra nhánh tự sát vô lý

Ba câu hỏi của Claude giúp giải thích, nhưng “thiếu lương rút thì không được giao thành” có thể làm người chơi cố vây thêm để đóng nhánh đầu hàng, dù bên thủ càng tuyệt vọng. Không nên mô tả đây là quy tắc khiến NPC luôn hợp lý.

Tách hai việc: có phương án rút **khả thi** và có lý do chọn nó. Trong prototype chưa có bắt tù binh/giải giáp, nên tình huống không thể rút là giới hạn được công bố, cần ca riêng. Không thêm sinh quân, lương miễn phí hoặc hệ tù binh để vá ngay. Nếu nhánh quá hiếm/không có lợi thì bỏ khỏi lát cắt, giữ rút quân quân sự thông thường.

### R7 — Rút lui nên dùng lại hành quân, tránh bất khả xâm phạm toàn cầu

Không đồng ý mặc định đoàn rút được mọi phe bảo vệ. Phe thứ ba không ký điều kiện, và người chơi có thể dùng đoàn rút làm khiên hoặc đi xuyên đất nguy hiểm.

Đề xuất tối giản trước: AI chọn rút quân bình thường khi có đích/đường và lương phù hợp; không có hiệp ước hoặc bảo vệ đặc biệt. Chủ cũ rời vị trí thì thành có thể bị tiếp quản. Đây đã tạo kết quả “chiếm mà không phải diệt hết thủ quân”. Rút có thể bị chặn theo luật quân sự đã có, AI phải cân nhắc nguy cơ được biết.

Nếu về sau thử giao thành có cam kết an toàn, chỉ các bên cam kết bị ràng buộc, với đoàn/đường/thời hạn cụ thể. Phe thứ ba vẫn là nguy cơ. Cần chứng minh giá trị so với rút thông thường trước khi thêm điều khoản này.

### R8 — Tránh thêm hộ tống chỉ để giao hàng qua cổng

Vòng 1 hoãn hộ tống theo tuyến nhưng lại cho xe có hộ tống đánh quân vây tại cổng. Có thể dùng chung quân chiến đấu, nhưng gắn quân vào xe là một quan hệ mới cần luật.

Đề xuất prototype: đoàn hàng không vũ trang không giao được tại cổng do đối thủ kiểm soát; phản hồi/điểm chờ/quay về phải rõ trong preset. Một đạo quân độc lập phá kiểm soát trước, rồi chuyến hàng được nhận theo mốc logic. Chưa cần một loại convoy chiến đấu mới. Tránh hàng quay đi quay lại vô hạn giữa hai đích không hợp lệ.

### R9 — Danh sách ưu tiên AI cần tránh tự khóa và không nên bỏ khả năng làm được của mô hình chung

Ưu tiên “cứu trước, nuôi sau” có thể gửi quân cứu rồi đói; “chiếm trước, xây sau” có thể liên tục có mục tiêu mới nên không đầu tư bao giờ. Mỗi hành động phải qua điều kiện khả thi/lương, và AI cần biết những cam kết đang chạy để không đổi việc mỗi lượt.

Đề xuất nhỏ: xử lý nguy cơ sống còn (đói/đang giao chiến), bảo đảm hành trình về và dự trữ tối thiểu, rồi chọn một mục tiêu có lợi theo tin hiện tại; xây/tuyển có ngân sách nền. Không cần AI tối ưu hoặc planner lớn.

Cho phép NPC thao tác trại theo đúng luật như người chơi về lâu dài. Để lát cắt đầu NPC chỉ đánh trong tầm lương là được **nếu nhãn hạn chế rõ**, không coi đó là đối thủ đầy đủ để kết luận phần phòng thủ vây đã tốt. Thử một kịch bản NPC dùng trại đặt sẵn sau đó, trước khi viết tự chọn vị trí trại.

### R10 — Số vương quốc là hai bước kiểm chứng, không một lần mở scope

Lát cắt A: một NPC hai thành để gỡ lỗi mỏ, phản kích, tiếp quản và save. Lát cắt B: thêm vương quốc thứ hai dùng cùng controller và mục tiêu trung lập để kiểm tra không cùng phe, tranh mục tiêu và không nuốt sạch nhau quá sớm.

Không kết luận AI có đời sống độc lập từ A; cũng không trì hoãn vòng có thể bấm chơi chỉ vì chưa hoàn thành B. Đây là cách tiếp thu yêu cầu hai vương quốc của Claude mà giữ quy mô thử đầu nhỏ.

### R11 — Không nhất thiết phải vứt mọi số thời gian cũ

Đồng ý cần audit nhịp chơi offline. Tuy nhiên 26,7 giờ game không tất yếu bắt chạy máy 26,7 giờ thực khi đã có tốc độ cấu hình. Chi phí chờ và nhịp quyết định phải đo ở thời gian game lẫn thời gian chơi thực.

Giữ đơn vị logic nhất quán, có thể là giây mô phỏng; “ngày game” là đơn vị hiển thị. Cost curve, tỷ lệ tương khắc, khoảng cách và thời gian cũ chỉ là ứng viên, không tự mất hết giá trị. Tài nguyên/giờ, lương/giờ, sản lượng, hành quân và quyết định AI phải cùng hệ đơn vị. Không chỉ rút thời gian xây mà để phần còn lại lệch.

Con số chiến dịch 20–40 phút là giả thuyết để đo, không đề nghị khóa lúc này. Cần phân biệt thời gian hoạt động, thời gian pause và thời gian tua; tối ưu chơi không nên là để game chạy không có gì phải quyết định.

### R12 — Pause không nên tạo ưu tiên mới trước sự kiện đã đến hạn

Không tiếp thu quy tắc “lệnh khi pause luôn trước NPC cùng mốc”. Nó tạo việc pause/unpause có thể đổi kết quả dù nội dung lệnh và thời điểm logic giống nhau, mâu thuẫn K11.

Đề xuất lưu và nhận lệnh ở ranh giới bước xử lý nguyên tử: giải quyết nhóm sự kiện đã đến hạn theo thứ tự công bố, dừng ở điểm an toàn, nhận lệnh cho pha hợp lệ tiếp theo. Tốc độ không thay thứ tự. Người chơi có quyền suy nghĩ khi pause; quyền đó không cho hoàn tác một trận đã xảy ra hoặc chen lệnh vào trước sự kiện đã cam kết.

K11 cần nói rõ “cùng lệnh ở cùng mốc và cùng pha logic”, không cùng số giây ngoài đời. Nếu dùng ngẫu nhiên, trạng thái PRNG được lưu. Đồng nhất tốc độ không yêu cầu hành động thực sự khác nhau cho cùng kết quả.

## 3. Trả lời trực tiếp tám câu hỏi của Claude

| Câu | Trả lời Codex |
|---|---|
| G1 | Không cần ba hệ thống đổi chủ. Nhận sửa cách gọi; yêu cầu dữ liệu quyền/kiểm soát/tiếp quản không bị gộp sai (R2). |
| G2 | Bỏ đầu hàng chỉ mất một kết quả có điều kiện và cơ hội câu chuyện giữ quân địch sống; không mất lõi game. Dùng rút thường trước; chỉ thêm giao thành an toàn nếu chứng minh được lựa chọn riêng (R6/R7). |
| G3 | Lương, xe/quân bị ghim, khoảng cách và cơ hội ở mục tiêu khác đã có chi phí. Nếu toàn bộ vẫn dư thừa thì bài thử có thể chỉ ra cơ chế yếu; chưa mặc định thêm phe mới là cách chữa duy nhất (R1). |
| G4 | Có thể chấp nhận ngoại thành ngừng khi kiểm soát bị mất, với giả định bố trí rõ và quyền xuất quân xử lý trước. Không dừng chỉ do quân địch đến gần (R3). |
| G5 | Đủ cho A trong tầm lương; không đủ kiểm chứng NPC vây. Dùng trại đặt sẵn và lệnh trại chung cho B/thử riêng, chưa xây AI chọn vị trí (R9/R10). |
| G6 | Cả hai bên có cùng quyền rút quân; người chơi tự ra lệnh, AI tự cân nhắc. Chưa có miễn tấn công hoặc cam kết tự động chỉ để tạo đối xứng. Save/load không phải lý do làm sai luật tài sản (R7). |
| G7 | Dùng một đồng hồ mô phỏng và quy đổi hiển thị; audit mọi lượng theo thời gian. Thời lượng tuyệt đối là dữ liệu thử, không mặc định tái sử dụng hoặc xóa tất cả (R11). |
| G8 | Cần đổi luận điểm nếu công phá luôn tối ưu, giữ mỏ chỉ là đợi tài nguyên, không có lựa chọn hậu cần đáng làm, AI đứng im/tự sát lặp, hoặc người chơi không hiểu vì sao thua dù đã thử các biến thể hợp lý. Không vá bằng thanh chỉ số mới. |

## 4. Thiết kế sửa để Claude kiểm tra vòng 2

1. Thế giới dùng thời gian mô phỏng; đóng game không chạy bù thời gian đời thực theo mặc định đề xuất. Pause/tua/save không đổi luật.
2. Một địa điểm có chủ, kiểm soát thực tế và công việc tiếp quản. Phục hồi sau chiếm là phần riêng nếu có.
3. Công phá và vây tạo thay đổi lực lượng/quyền tiếp cận. Chỉ tiếp quản đủ điều kiện mới đổi chủ.
4. Bản đầu có thể để NPC rút thường, không cần hệ đầu hàng có miễn tấn công. Cần nhánh này có ích, nhưng không hy sinh tính nhất quán để giữ nó bằng mọi giá.
5. Không có điểm chiến tranh, ngoại giao nhiều điều khoản, chư hầu hoặc bồi thường trong lát cắt đầu.
6. Lát cắt A kiểm tra một đối thủ; B thêm đối thủ độc lập và một kịch bản trại NPC dùng cùng luật.
7. Quân, nguồn biên chế, kho, khoản giữ, hàng đi và job được xử lý một lần qua chuyển chủ/lưu tải.
8. Có thể thắng lớn và chọn tiếp tục/chấm một mốc thành tựu. Kết thúc “thống nhất” là tùy chọn đề xuất, không reset bản lưu.

## 5. Đề nghị Claude phản biện lần cuối

- Bác bỏ chỗ nào trong R1–R12 nếu có phản ví dụ; không đồng ý chỉ vì đây là vòng cuối.
- Chọn một phiên bản prototype cụ thể, ghi rõ giả định còn mở; tránh cả hệ thống quan hệ lớn lẫn “AI chỉ đứng chờ”.
- Tối thiểu phải giải quyết siege giá rẻ, thành mới chiếm bị vây lại, rút quân, xe tới khi cổng đổi quyền, và pause ở cùng mốc giao chiến.
- Bổ sung ca thử cho nhận xét mới. Các số/tiêu chí chưa đo phải để nhãn thử nghiệm.
- Ghi rõ điểm đồng thuận về thiết kế, điểm vẫn bất đồng và tối đa ba quyết định cần chủ dự án. Chưa gọi kết quả là thiết kế đã chứng minh vui hoặc đã duyệt.
