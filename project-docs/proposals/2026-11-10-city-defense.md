# Thủ thành và vật tư — phân tích Codex trước review chéo

Ngày 10/11/2026 · **Đề xuất đang review, chưa đổi baseline 2.2, code, bản lưu, S00 hoặc manifest asset.**

Đầu vào: [tóm lược đề xuất và câu sửa mới nhất](../sources/2026-11-10-city-defense-summary.md). Người dùng yêu cầu Claude review chéo, đồng thời nói rõ không cần hiệu ứng; trọng tâm là vật tư tiêu hao theo quân khi công thành. Các mô tả dưới đây là lựa chọn Codex đề nghị để reviewer phản biện, không gán thành quyết định của người dùng.

## 1. Kết luận ban đầu

Nên giữ ba quyết định: **đồn trú bố trí thế nào, chuẩn bị bao nhiêu vật tư, đánh tiếp hay bảo toàn lực lượng/hạ tầng**. Đây là chiều sâu phù hợp vòng hậu cần–chinh phục hiện có.

Rủi ro lớn nhất là cùng lúc mở bốn mặt tường, cổng, đội hình, kíp, đạn riêng từng vũ khí, thời gian điều quân và nhiều đợt đánh. Chỉ bỏ animation chưa làm những luật đó đơn giản. Nên kiểm chứng một đợt công thành có quân/vật tư/hư hại tồn tại qua trận trước khi mở đủ bốn hướng.

## 2. Điểm tựa và xung đột với hiện trạng

| Căn cứ đã đọc | Hệ quả cần giữ |
|---|---|
| Baseline B04: 14 ô nhà, 16 ô khai thác, tường/cổng là lớp riêng; tháp quan sát/xưởng công thành chưa thuộc nhà lõi | Không tự chiếm S14, thêm nhà hoặc bắt vẽ lại bộ asset trong đợt review |
| B09/B25 và combat: trận 3×3, tối đa 12 lượt preset, snapshot/casualty đồng thời | Bốn hướng là lớp phân quân bên ngoài đội hình, không nhân cùng một cohort thành bốn trận |
| B12: chủ/thủ quân/giữ ngoại thành/tiếp quản tách biệt | Phá cổng hoặc thắng một đợt không thay điều kiện chuyển chủ |
| B23: ô site không transit, các trận hai phía theo sequence, không chain assault | Chọn hướng/đánh tường cần lệnh và luật tiếp cận rõ; thắng ngoại thành không tự công luôn vào trong |
| Technical §4–4.1: trận commit nguyên tử ở pha giao chiến; lượt trận không trôi đồng hồ thế giới | Viện quân, xe hàng và điều quân mất thời gian không chen giữa 12 lượt như thể game vẫn chạy ngoài trận |
| B18: công thành phức tạp đang hoãn | Đề xuất này là thay đổi phạm vi cần review, không phải “chỉ thêm một chỉ số” |
| Runtime `app/src/game.js`: hiện có kinh tế/ô nâng; `city-perimeter-live.md`: tường/cổng mới hiển thị | Chưa có engine công/thủ để khẳng định khả thi, cân bằng hoặc tận dụng số đã thử |

## 3. Các lựa chọn triển khai để cân nhắc

**A. Tường thành + đồn trú + một kho vật tư + đợt đánh tại một mặt.** Ít trạng thái nhất, thử được bảo toàn quân/vật tư/hư hại và đọc báo cáo. Chưa chứng minh chọn hướng hay phân tán lực lượng có vui.

**B. Đủ bốn khu + một cổng + nhiều vai trò/công sự ngay.** Gần đề xuất ban đầu, có lựa chọn hướng và bố trí. Phải đóng thêm luật đường vào, chuyển khu, nhiều đạo đến, đối tượng mục tiêu và sửa chữa. Tốn đáng kể trước khi có vòng chiếm thành nền.

Codex nghiêng **A để kiểm luật, rồi B nếu kết quả cho thấy phân khu tạo quyết định thật**. Bốn hướng vẫn là hướng thiết kế cần đánh giá, chưa bị bỏ. Không đề nghị viết code theo A trong yêu cầu review này.

## 4. Phương án vật tư theo quân

### 4.1. Những thứ phải tách

- **Lương:** chi theo thời gian thế giới cho quân thật tại nơi đóng, theo luật hiện có.
- **Vật tư công/thủ:** chi cho hành động công sự thực sự thực hiện trong đợt đánh; không tự trừ trên toàn bộ quân nằm trong thành.
- **Sửa chữa:** một job riêng, trả tài nguyên/thời gian cho hư hại thực; không thu lại “phí đạn” lần hai khi sửa.

“Theo quân” có thể nghĩa thu phí một lần theo quân tham chiến, hoặc theo lượng quân thực sự dùng công sự qua từng lượt. Đây là hai mô hình khác nhau. Codex đề nghị thử mô hình thứ hai vì không nên tiêu hết vật tư dù chưa có mục tiêu hợp lệ hoặc công sự không có người dùng. Claude cần phản biện xem nó có quá nặng so với yêu cầu mới nhất không.

### 4.2. Công thức tham chiếu, chưa là ruleset

Với mỗi vai trò/công sự trong một lượt:

`lực dùng hợp lệ = min(quân còn sống được phân công, chỗ phục vụ, năng lực thiết bị)`

`nhu cầu vật tư = lực dùng hợp lệ × định mức vai trò/hành động`

Chỉ phát sinh nhu cầu nếu có mục tiêu hợp lệ và chính sách cho phép dùng. Kho không đủ thì giới hạn phần hành động được thực hiện **trước** tính sát thương; phần không được cấp không nhận sát thương công sự miễn phí. Giữ phần lẻ bằng fixed-point ở cấp kho/hành động, tránh làm tròn lên theo từng nhóm. Các vai trò khác nhau không mặc nhiên có cùng định mức.

Ví dụ số học giả định: 100 quân có nhiệm vụ dùng công sự lượt 1, còn 80 quân hợp lệ ở lượt 2, định mức 0,1 đơn vị/người/lượt → nhu cầu 18. Chia 100 thành hai nhóm 50 không thành 20 hoặc 16; quân dự bị không sử dụng ở hai lượt đó không thêm phí. Đây chỉ minh họa bảo toàn, không chứng minh giá/sức mạnh đã cân bằng.

Trong lượt đồng thời, số quân đầu lượt xác định người đủ điều kiện thực hiện và tiêu vật tư. Không tính xong sát thương đầy đủ rồi mới phát hiện kho thiếu. Quân chết cuối lượt không dùng ở lượt sau. Nếu một quỹ cấp cho nhiều công sự, phải chốt cách phân bổ thiếu hàng tất định, không theo vòng lặp của chương trình.

### 4.3. Kho vật tư có thể gọn đến đâu?

Đề nghị reviewer so sánh:

1. Trừ trực tiếp một công thức gỗ/đất/sắt từ kho lúc công sự dùng: ít state nhưng giống chế tạo tức thời trong chiến đấu, không có dự trữ thành phẩm.
2. Một **kiện tiếp liệu công/thủ** chế tạo trước bằng bốn tài nguyên, cất hữu hạn và tự tiêu khi dùng: có chuẩn bị/bao vây thật, ít loại hàng. Đây là abstraction rõ ràng, không được đồng thời tuyên bố đã mô phỏng riêng đá/gỗ/đạn nỏ.
3. Tách đá/gỗ/đạn nỏ thành ba thành phẩm: rõ công dụng nhưng thêm recipe, kho, tải xe và ưu tiên cấp phát.

Codex nghiêng (2) cho kiểm luật. Bốn tài nguyên gốc vẫn giữ; thành phẩm mới vẫn làm tăng dữ liệu kho/recipe/tải và schema, không được gọi là “miễn phí về độ phức tạp”. Nếu chưa hỗ trợ chở thành phẩm, phải ghi tạm chỉ chế tạo tại thành và chở nguyên liệu đến, không giả vờ đã có vận tải vật tư. Chưa quyết định cấm hay bật vận chuyển thành phẩm.

Không bắt buộc thêm đạn thường cho mọi cung thủ chỉ để mở kho tiếp liệu. Cần chọn nhất quán: chi tiêu trang bị đặc biệt ở **cả công và thủ**, hoặc mở tiếp liệu quân thường cho cả hai; không bắt một phía trả riêng từng mũi tên trong khi phía kia vô hạn.

## 5. Mười điểm Claude cần phản biện

**R01 — Bốn khu và hướng tiếp cận.** Nếu dùng bốn hướng, có thể lấy bước cuối đường hành quân để xác định hướng; muốn đổi hướng phải đi/chuẩn bị thật. Nhưng bên giữ ngoại thành đứng ở site, không còn một tọa độ góc rõ ràng. Cần định nghĩa vị trí vây theo khu hoặc chấp nhận chỉ chọn mặt sau một thời gian chuẩn bị. Không cho bấm đổi mặt miễn phí. Có cần bốn mặt trong lần thử đầu không?

**R02 — Điều quân và hai đồng hồ.** Chuyển khu mất game-time chỉ thực hiện trước/giữa đợt; trong trận dùng snapshot/phản ứng bố trí trước. Nếu cho viện quân hoặc repair chen giữa lượt phải đổi kiến trúc trận nguyên tử, không lén ghép hai đồng hồ. Bốn mặt bị đánh cùng mốc vẫn phải dùng thứ tự đã lưu và đọc quân/tồn kho sau trận trước; chưa có trận đa phía đồng thời.

**R03 — Vai trò và không nhân quân.** Mỗi phần quân tại một mốc thuộc một nhiệm vụ; người vận hành không đồng thời gây đủ damage cận chiến. Quân đứng tường không tự được cộng thêm số quân vận hành. Cần chốt khi kíp bị thương/chết thì thiết bị mất năng lực từ lúc nào và ai chịu damage. Quân đang nâng vẫn đánh profile cũ theo B08, không có hàng đợi để giấu kíp.

**R04 — Tường vắng quân.** Tường không gây damage; có thể trì hoãn nhưng sự trì hoãn phải nằm ở thời gian chuẩn bị/mở lối trên đồng hồ thế giới, không ở 12 lượt nội bộ tức thời. Cần phương án tránh tường vô chủ bất tử khi bên công không có đúng thiết bị. Một thành hết garrison có bỏ qua bước mở lối không? Đây là điểm chưa chốt, không tự đổi B12.

**R05 — Lối hẹp và quân đông.** Bề rộng chiến đấu có thể chặn quân đông nhưng không tự tạo phòng thủ vô hạn. Phải chọn cách thay quân dự bị, tầm bắn và hết 12 lượt. Không thêm đồng thời bề rộng/nỏ/đá/giáp tường rồi kết luận tương khắc còn nguyên. Cần đo theo ngân sách, lương và thời gian.

**R06 — Đánh mồi, lặp lệnh và thời gian.** Mỗi đợt có thể tiêu vật tư rồi dừng. Nếu lập lại cùng timestamp, người chơi có thể đốt kho hoặc phá tường mà thế giới không trôi. Cần job chuẩn bị/khóa hành động có thời gian và nguồn quân thật, không cooldown dễ rửa bằng tách nhóm hay đổi Army ID. Lính mồi vẫn có giá, không nên vô hiệu hoàn toàn chiến thuật tiêu hao hợp lệ.

**R07 — Sửa trong bao vây.** “Không sửa lúc đang bị đánh” chưa đủ, vì trận nguyên tử xong ngay. Đề nghị bản kiểm luật chỉ cho sửa khi chủ thành giữ lại ngoại thành, có job và tài nguyên; thắt hơn đề xuất ban đầu cho sửa khu an toàn, nên cần reviewer so sánh. Chỉ một địch lẻ đứng gần không tự khóa sửa; phải có quyền giữ hợp lệ. Nâng cấp không tự đầy HP hay tăng vật tư; cần khóa lượng hư hại được giữ khi nâng.

**R08 — Cổng vật lý và quyền chặn.** B12 dùng cổng như chính sách chặn/rút tại site. Cổng công sự mới có HP và lối bị phá: cần quyết định chính sách chặn còn nghĩa gì sau mở lối. Đoàn đã rời không bị kéo về. Hàng tới vẫn pha 3 sau giao chiến; giữ ngoại thành không tự dùng kho vật tư nội thành. Không dùng vũ khí tường trong một trận xuất kích ngoài tường trái B12.

**R09 — Đổi chủ, quan sát và năng lực.** HP, thiết bị và tồn kho còn lại chuyển như tài sản thật một lần, không đầy lại và không chuyển quân chủ cũ. Hộ trận chỉ che quân đúng tuyến/chủ; Phá ấn không trừ HP tường hoặc xóa vật tư. Tháp quan sát tương lai phải phù hợp metric Manhattan hiện hành, không tự phát minh LOS hay cấp tin ẩn. Sáu tháp trong ảnh hiện tại không có nghĩa sáu công trình chiến đấu đã tồn tại.

**R10 — AI và phạm vi làm.** NPC phải trả quân/stock/job thật; biết thiếu vật tư ở mức tin hợp lệ, không nhìn kho kín. S00 chưa có engine giao chiến, nên đợt thủ thành nên đi sau vòng tuyển–hành quân–chiếm thành nền. Nhánh Thánh/Hắc, tháp quan sát và bốn khu không cần cùng trở thành tiền đề cho vòng chiếm thành thứ hai.

## 6. Bản thử đề nghị

Sau khi có vòng quân/hậu cần nền: một thành có một mặt công sự hoạt động và cổng, đồn trú kiếm/giáo/cung, một vai trò dùng công sự, một kho tiếp liệu, bên công có phương án mở lối hữu hạn, hư hại tồn tại, sửa có job, báo cáo tài sản. Chọn **một** trong nỏ hoặc vật tư thả để kiểm trước; chưa giả vờ đã thử cả năm trang bị.

Lần sau mới thêm bốn khu, chọn đường công, chuyển quân giữa khu, nhiều trang bị và quan sát. Đây là khuyến nghị phạm vi Codex, khác lát cắt lớn người dùng đưa để review. Cần ghi rõ mặt trái: chưa kiểm được giá trị phân khu và tác dụng của chiến tranh đa hướng.

## 7. Ca kiểm chứng cần có — chưa chạy

| Mã | Câu cần kiểm |
|---|---|
| DF-01 | 0 thủ quân: tường không tự giết người, nhưng có quy tắc mở lối/thời gian hữu hạn |
| DF-02 | Cùng quân/role/mục tiêu, tách–gộp không đổi tiêu hao, damage, kíp hoặc vật tư |
| DF-03 | Không có mục tiêu: không trừ stock chỉ vì có quân trong thành |
| DF-04 | Kho thiếu: phần công sự được dùng bị giới hạn trước damage; không âm, không bắn miễn phí |
| DF-05 | Kíp chết: cùng snapshot lượt hiện tại, giảm khả năng từ lượt sau; không dùng quân chết |
| DF-06 | Cổng mở nhưng còn garrison: không tự chuyển chủ hoặc bắt quân cũ |
| DF-07 | Một cohort ở một khu/role, nhiều đợt cùng mốc đọc state đã commit, không sao chép dự bị |
| DF-08 | Lặp assault/đổi ID/tách quân không cho vô hạn lượt công phá tại một thời điểm |
| DF-09 | Rời đợt đánh giữ HP/stock; repair/nâng/load không tự hồi đầy |
| DF-10 | Cargo/hoàn tất chế tạo cùng mốc theo pha rõ; không nạp giữa lượt nguyên tử |
| DF-11 | Đổi chủ đúng một lần: giữ hư hại/thiết bị/stock thực, hủy quyền lệnh chủ cũ |
| DF-12 | 1×/8×, pause, đóng/mở, save/load cùng lệnh/mốc cho cùng kết quả |
| DF-13 | NPC cùng vật chất/giới hạn; không cấp đạn hoặc quân vô hạn để giữ Đại thành |
| DF-14 | So cường công/vây/rút theo cùng ngân sách và chi phí thời gian; không có một lựa chọn luôn đúng |

Các ca này là kế hoạch kiểm chứng, **không phải test đã chạy**. Không cần chạy suite app chỉ để chứng minh một bản đề xuất Markdown.

## 8. Yêu cầu đầu ra review chéo

Claude cần đọc nguồn mới nhất và các căn cứ hiện hành; trả lời R01–R10, phản biện cả đề xuất ban đầu lẫn sự cắt gọn của Codex, chỉ ra điều mình không đồng ý và đề xuất một mặc định có lý do. Không viết “đã đồng thuận” trước khi Codex trả lời. Phân biệt lỗi logic, quyết định thiết kế và con số cần đo. Sau phản hồi, Codex sẽ viết phần đối chiếu chung riêng; chỉ nội dung cuối đã được đọc lại mới được gọi là đã review chéo.
