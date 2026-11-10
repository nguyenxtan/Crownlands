# Recruitment scaling — tư vấn theo cấp nhà binh

Ngày 10/11/2026 · Phương án số lần3 · Trạng thái: **đề xuất điều chỉnh sau phản hồi, chưa sửa game/baseline/S00**.

Chủ dự án từ chối bảng lần1 vì “hơi nhanh, hơi nhiều. làm lại”, sau đó sửa lần2: **“thời gian tuyển quân phải liên quan đến học viện nghiên cứu, xem lại đi”**. Các [bản lần1](2026-11-10-recruitment-scaling-v01.md) và [lần2](2026-11-10-recruitment-scaling-v02.md) giữ lịch sử, không còn là phương án hiện hành. Hạn mức lần2 được giữ để đề xuất; thời gian20giây ở cuối chỉ đạt khi có cả cơ sở và nghiên cứu. Chưa gọi một bảng số nào là đã cân bằng.

## 1. Chỉ đạo và hiện trạng

Chủ dự án: “hạn mức theo cấp nhà binh. như vậy tuyển lâu lắm mới được cả vạn binh mã, tìm hiểu xem cái nào tối ưu.”

Ghi nhận hướng mới: hạn mức thành phải tăng theo cấp nhà binh. Con số200 hiện tại là fixture mở đầu, không phải trần mọi thành trong bản đầy đủ. Các mốc và đường tăng dưới đây là đề xuất Codex, chưa được chủ dự án duyệt hoặc cân bằng.

Runtime hiện chỉ có Doanh trại cấp1,200suất; kiếm/giáo/cung I mất40/35/45giây game. Nhiều quân trong một lệnh vẫn lần lượt hoàn tất, tối đa5lệnh. Có giới hạn cứng200 trong input/offer/validator ngoài cap thành; phải gỡ phụ thuộc con số này khi mở cấp cao.

## 2. Nghiên cứu từ nguồn chính thức

- [Travian: Legends](https://support.travian.com/en/articles/221-quick-summary-buildings-and-construction): Doanh trại cấp cao tuyển nhanh hơn; thời lượng đơn đã đặt không đổi khi đổi cấp. Đây là một lựa chọn triển khai, không bắt Crownlands offline phải giữ nguyên cách đó.
- [Grepolis](https://support.innogames.com/kb/Grepolis/en_DK/3287/Barracks): nâng Doanh trại làm tuyển nhanh hơn; thời gian được ghi theo world speed1. Không lấy thời gian của game online làm nhịp bắt buộc cho game cá nhân.
- [Travian Kingdoms](https://support.kingdoms.com/en/articles/93-great-barracks): Great Barracks mở thêm hàng tuyển song song, tăng tổng tốc độ nhưng quân ở đó đắt gấp3. Bài học là công suất thêm có đánh đổi, không phải đề xuất chép công trình vào14slot Crownlands.
- [Gods and Glory, DECA](https://godsandglory.decagames.com/hc/en-us/articles/11018383348381-Barracks): nhiều Doanh trại có queue riêng; nâng cấp tăng lượng được tuyển một lúc và giảm thời gian. Crownlands có bố cục cố định, vì vậy song song giữa nhiều thành phù hợp hơn việc thêm nhiều nhà giống nhau.

Các nguồn xác nhận những cơ chế đang dùng, không chứng minh một bảng số nào tối ưu cho Crownlands.

## 3. Kiểm số với fixture hiện tại

Tính cho10.000kiếm I từ0, một cơ sở, đủ vật liệu, tốc độ8× và không pause:

- 40 giây ×10.000 =111giờ6phút40giây game = **13giờ53phút20giây thực**. Đây chưa gồm nâng nhà, kiếm tài nguyên hoặc hành quân. Fixture cap200 còn không cho thực hiện quy mô này.
- Chi phí:400.000gỗ,200.000đất sét,500.000sắt,100.000lương.
- Một thành đầu tạo400sắt/giờ game, tương đương đủ sắt tuyển **8kiếm/giờ**, trong khi cơ sở huấn luyện được90kiếm/giờ. Chỉ tăng công suất tuyển sẽ làm khoảng chênh tài nguyên lớn hơn.
- 10.000 kiếm cần10.000lương/giờ game; bốn ruộng cấp1 hiện chỉ tạo400. Cap là quyền duy trì quân, không phải bảo đảm nuôi nổi quân.

Đây là arithmetic tham chiếu từ S00 và code, không phải kết quả chạy chiến dịch hoặc kết luận cân bằng.

## 4. Phương án khuyến nghị

### Tách biên chế, cơ sở và kiến thức

Theo [B06/B08 hiện hành](../final-design.md) và [quân/nghiên cứu](../military-and-research.md): kiến thức toàn đế chế, còn điều kiện sản xuất và thanh toán thuộc từng thành. Phương án cũ gán toàn bộ rút thời gian cho Doanh trại là thiếu trục nghiên cứu mà chủ dự án yêu cầu.

| Thành phần | Công dụng |
|---|---|
| Doanh trại | Biên chế thành, điều kiện cơ sở và cải thiện năng lực tổ chức tại chỗ ở mức vừa phải |
| Cấp Học viện | Điều kiện được phép thực hiện dự án; tự nâng cấp nhà không cấp giảm thời gian |
| Công nghệ hoàn tất | Mở profile/bậc/nhánh hoặc cải tiến hiệu quả huấn luyện theo đúng phạm vi của từng công nghệ |
| Profile quân | Thời gian/công huấn luyện gốc, chi phí và suất riêng; không lấy40giây kiếm I cho mọi bậc/dòng |

Một Doanh trại cho biên chế chung của thành; quân xa nhà và quân chờ vẫn dùng gốc. Chuồng ngựa/Trại voi tương lai quyết định điều kiện và năng lực dòng tương ứng, không cộng thêm cùng một quota lần nữa và không nhân hiệu quả các nhà không tham gia job.

### Công thức đề nghị

`thời_gian = thời_gian_gốc_profile × hệ_số_cơ_sở / (1 + thưởng_tốc_độ_huấn_luyện_đã_nghiên_cứu)`

Thưởng này tăng **tốc độ**, không trừ thẳng cùng tỷ lệ khỏi thời gian. Ví dụ+60%tốc độ là chia1,6; không phải giảm60%thời gian. Đây là `training_speed_bonus`, tách khỏi `research_bonus` sản lượng B26. Chỉ cộng các nguồn được công khai và cho phép; không tạo chuỗi nhân vô hạn.

Tên thử **Tổ chức huấn luyện**, một công nghệ nâng dần bốn mức, nằm trong hướng quân chế/huấn luyện đã có. Cơ chế này là đề xuất, không tự mở thêm một cây nghiên cứu lớn:

| Mức công nghệ hoàn tất | Học viện tối thiểu đề nghị | Tổng thưởng tốc độ |
|---|---:|---:|
| Chưa nghiên cứu | — |0%|
| I |5|+10%|
| II |10|+25%|
| III |15|+40%|
| IV |20|+60%|

Chỉ mức cao nhất có hiệu lực: IV là tổng+60%, không cộng lại I+II+III+IV, không nhân các mức với nhau. Phải hoàn tất mức trước mới nghiên cứu mức sau. Giá/thời gian dự án và prerequisite chi tiết chưa có số thử. Cấp Học viện chỉ mở điều kiện; nghiên cứu chưa xong thì chưa hưởng.

### Bảng kết hợp cơ sở và nghiên cứu

Giữ hướng biên chế vừa phải của lần2. Kiếm I gốc40giây; cơ sở cuối chỉ giảm20%thời gian gốc, còn nghiên cứu đóng phần cải thiện còn lại. Các hàng ghép dưới đây chỉ là so sánh; không bắt cấp Doanh trại và Học viện phải luôn bằng nhau.

| Doanh trại | Biên chế, suất | Chưa có tech, giây/kiếm I | Tech minh họa đã xong | Thời gian sau tech |
|---|---:|---:|---|---:|
|1|200|40|Chưa nghiên cứu|40giây|
|5|400|38|I:+10%|≈34,5giây|
|10|800|36|II:+25%|28,8giây|
|15|1.500|34|III:+40%|≈24,3giây|
|20|2.500|32|IV:+60%|20giây|

Cùng một Doanh trại20: chưa nghiên cứu là32giây; Học viện20 nhưng chưa hoàn tất công nghệ vẫn32giây; đã hoàn tất IV mới là20giây. Đế chế đã biết IV nhưng một thành chỉ có Doanh trại1 thì kiếm I là25giây, biên chế vẫn200. Nghiên cứu không thay cơ sở đủ điều kiện để tuyển quân bậc cao.

Chưa có đường nội suy, giá/thời gian nâng nhà hoặc số hỗ trợ đã khóa. Quân thường1suất làm ví dụ; cap2.500suất không phải2.500voi hoặc mọi quân tinh nhuệ. Công huấn luyện, suất và lương của từng profile vẫn riêng. Các mức đầu giữ quân vài trăm; vài nghìn quân một thành là quy mô cuối.

Theo bảng thử mới, khi cơ sở/nghiên cứu/nguồn lực đã sẵn sàng, không pause,8×:

- 100 kiếm tại cấp1: **8phút20giây thực**.
- 1.000 kiếm tại Doanh trại20: chưa có tech **1giờ6phút40giây thực**; có IV **41phút40giây thực**.
- 10.000 kiếm cần nguồn biên chế của ít nhất4thành cấp20, nếu toàn bộ2.500suất mỗi thành đều trống. Chia đều huấn luyện song song, tất cả đã hưởng IV: **1giờ44phút10giây thực**. Chưa có tech: **2giờ46phút40giây thực**.

Các mốc trên chỉ là thời gian huấn luyện; chưa gồm phát triển/nâng nhà, tạo tài nguyên hoặc tập kết. Không suy rằng người mới có quân vạn sau1giờ44phút chơi. Đồn trú có sẵn, quân giữ mỏ và quân dùng nhiều suất làm nhu cầu phát triển lớn hơn; không cộng hạn mức theo chỗ đang đứng hoặc cho ra khỏi thành để tuyển vượt.

### Giữ hàng đợi gọn, không biến lô lớn thành thời gian cố định

Một lệnh có thể chứa100/500/1.000quân nếu đủ kho/cap và cấp cơ sở cho phép. Tăng số lính trong lệnh không làm1000quân bằng thời gian1quân. Quân hoàn tất dần để có thể dùng phần đã huấn luyện, cùng công suất nhân quy mô đúng.

Đề nghị chỉ một queue bộ binh mỗi thành; nhiều thành tuyển song song. Chưa thêm nhiều Doanh trại, dây chuyền hoặc nút tăng tốc trả phí. Theo dõi công huấn luyện còn lại thay vì tạo một bộ đếm cho từng người; lưu số quân gộp theo profile/gốc, không tạo10.000đối tượng mô phỏng riêng.

Khi nâng nhà hoặc hoàn tất nghiên cứu, tốc độ mới chỉ tính từ mốc đó; giữ phần công đã làm, không hoàn cả lô hoặc mất tiến độ. Các đơn đang chờ dùng năng lực hợp lệ lúc được xử lý, không cần hủy/xếp lại để hưởng kiến thức mới. Mô phỏng cần tính công huấn luyện còn lại bằng số học chính xác, không làm tròn/lặp event theo framerate; UI có thể làm tròn ETA hiển thị. Khác Travian, đây là lựa chọn đề nghị cho offline, cần test trước triển khai.

### Nghiên cứu phải tạo lựa chọn

Giữ một dự án toàn đế chế cùng lúc. Người chơi chọn mở bậc/nhánh quân mới, cải thiện hậu cần hoặc tăng hiệu quả huấn luyện; không nhận tất cả ngay khi nâng Học viện. Nghiên cứu giáp nặng chỉ mở điều kiện/trang bị được nêu, không mặc định làm mọi quân tuyển nhanh hơn. Quân tinh nhuệ có công huấn luyện gốc lớn hơn theo profile, nên cùng thưởng tốc độ không làm nó mất giá thời gian.

Công nghệ hoàn tất dùng chung đế chế; nhiều Học viện không cộng nhiều bản thưởng. Mất Học viện không xóa kiến thức đã xong, dự án dở bị xử lý theo B06. Nghiên cứu tốc độ áp cho đúng job huấn luyện được khai báo; khi nối nâng/cải huấn phải kiểm cả hai đường tuyển mới/nâng, không tự tăng tốc nghiên cứu, xây nhà, sản xuất hoặc hành quân.

### Kinh tế và nhịp chơi phải được chỉnh cùng

Mục tiêu thử đề nghị: đội vài trăm quân phải xuất hiện sớm trong phiên đầu; quân hàng nghìn và quân vạn gắn với nền kinh tế, công nghệ, nhiều thành và chiến dịch về sau. Chưa chọn số buổi để đạt cấp20; vì vậy không khẳng định bảng trên đã giải quyết toàn bộ thời gian chơi.

Cần chỉnh đồng bộ giá quân I, rate/cap của ruộng–mỏ–kho, giá/thời gian nâng nhà binh, lương và vận tải. Với fixture mở đầu hiện tại, phải giảm độ nghẽn sắt so với công suất huấn luyện, chứ không chỉ hạ40giây. Thành chuyên quân sự có thể cần tiếp tế từ hậu phương; không bắt mỗi thành tự nuôi đầy cap.

## 5. Những hướng không chọn làm lời giải chính

- Chỉ tăng cap: có chỗ nhưng vẫn tuyển và gom đầu vào quá chậm.
- Đặt thời gian cố định cho mọi lô: lệnh rất lớn vượt công suất, gây bước nhảy vô lý.
- Tăng tốc toàn thế giới thật cao để chữa một queue: mọi sự kiện/NPC cũng nhanh theo, chưa sửa được cấu trúc kinh tế.
- Thêm nhiều ô Doanh trại vào một thành ngay: phá layout và tăng số thao tác trước khi chứng minh cần.

## 6. Tác động nếu thực hiện

1. B07/CAL02: cap tính từ cấp cơ sở, giữ luật gốc/reservation/nợ khi nguồn giảm; không xóa quân vì nhà bị hỏng.
2. Dữ liệu nhà/công nghệ:20mức cap/cơ sở/giá/thời gian; prerequisite và chi phí dự án; cơ sở phải hợp lệ sau khi đã biết công nghệ. Chưa có số đầy đủ để lập trình cả20cấp như đã cân bằng.
3. Runtime: gỡ count/sequence/validator max200; lưu kiến thức/dự án và công huấn luyện còn lại; cập nhật lịch khi cơ sở/tech đổi, không thu lại tiền, không hoàn tất hồi tố. Migration giữ quân/queue cũ, không cấp công nghệ miễn phí.
4. UI: tách “5lệnh”, “số quân trong lệnh”, “suất thành”, “thời gian gốc”, “cải thiện cơ sở”, “nghiên cứu đã xong”, “thời gian thực tế” và “lương ròng”. Cấp Học viện chưa nghiên cứu không được hiển thị như đã hưởng bonus.
5. Kiểm: nhà cao thiếu nghiên cứu; biết tech nhưng thiếu cơ sở; nghiên cứu mới xong giữa một quân đang tuyển; nhiều Học viện không nhân thưởng; không cộng I–IV; mất dự án/mất Học viện; pause/load và thứ tự pha; nhiều thành song song; bậc nặng, thiếu kho/lương và nợ suất. Thử quân vạn theo dữ liệu gộp trước benchmark.

**Chưa sửa code hoặc luật hiện hành trong lần nghiên cứu này.** Đây là cơ sở để chốt nhịp rồi chỉnh bản chơi; số và hiệu quả vẫn cần chạy thử.
