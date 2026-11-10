# Recruitment scaling — tư vấn theo cấp nhà binh

Ngày 10/11/2026 · Phương án số lần2 · Trạng thái: **đề xuất điều chỉnh sau phản hồi, chưa sửa game/baseline/S00**.

Chủ dự án từ chối bảng lần1 vì “hơi nhanh, hơi nhiều. làm lại”. Bảng10.000suất/2giây đã được thay trong tài liệu hiện hành này; [bản lần1](2026-11-10-recruitment-scaling-v01.md) chỉ giữ lịch sử nghiên cứu, không còn là khuyến nghị. Các nguồn chính thức vẫn là tham khảo về cơ chế, không chứng minh bảng số lần2 đã cân bằng.

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

### Cap và công suất cùng tăng theo cấp

Một Doanh trại cho biên chế chung của thành; quân xa nhà và quân chờ vẫn dùng gốc. Chuồng ngựa/Trại voi tương lai quyết định điều kiện và công suất dòng tương ứng, không mặc định cộng thêm cùng một quota lần nữa. Vai trò chính xác của những cơ sở đó cần ghi khi mở dòng mới.

Mốc tham chiếu lần2 để thiết kế20cấp (kiếm I làm chuẩn). Tốc độ cuối chỉ gấp2cấp1; biên chế cuối2.500suất, bằng1/4phương án cũ:

| Cấp Doanh trại | Biên chế thành, suất | Kiếm I/giờ game | Giây/kiếm I |
|---|---:|---:|---:|
|1|200|90|40|
|5|400|≈102,9|35|
|10|800|120|30|
|15|1.500|144|25|
|20|2.500|180|20|

Chưa có đường nội suy, giá/thời gian nâng nhà hoặc số hỗ trợ đã khóa. Quân thường1suất làm ví dụ; cap2.500suất không phải2.500voi hoặc mọi quân tinh nhuệ. Công huấn luyện, suất và lương của từng profile vẫn riêng. Các mức đầu giữ quân vài trăm; vài nghìn quân một thành là quy mô cuối.

Theo bảng thử mới, khi cơ sở và nguồn lực đã sẵn sàng, không pause,8×:

- 100 kiếm tại cấp1: **8phút20giây thực**.
- 1.000 kiếm tại cấp20: **41phút40giây thực**.
- 10.000 kiếm cần nguồn biên chế của ít nhất4thành cấp20, nếu toàn bộ2.500suất mỗi thành đều trống. Chia đều huấn luyện song song mất13giờ53phút20giây game = **1giờ44phút10giây thực**.

Các mốc trên chỉ là thời gian huấn luyện; chưa gồm phát triển/nâng nhà, tạo tài nguyên hoặc tập kết. Không suy rằng người mới có quân vạn sau1giờ44phút chơi. Đồn trú có sẵn, quân giữ mỏ và quân dùng nhiều suất làm nhu cầu phát triển lớn hơn; không cộng hạn mức theo chỗ đang đứng hoặc cho ra khỏi thành để tuyển vượt.

### Giữ hàng đợi gọn, không biến lô lớn thành thời gian cố định

Một lệnh có thể chứa100/500/1.000quân nếu đủ kho/cap và cấp cơ sở cho phép. Tăng số lính trong lệnh không làm1000quân bằng thời gian1quân. Quân hoàn tất dần để có thể dùng phần đã huấn luyện, cùng công suất nhân quy mô đúng.

Đề nghị chỉ một queue bộ binh mỗi thành; nhiều thành tuyển song song. Chưa thêm nhiều Doanh trại, dây chuyền hoặc nút tăng tốc trả phí. Theo dõi công huấn luyện còn lại thay vì tạo một bộ đếm cho từng người; lưu số quân gộp theo profile/gốc, không tạo10.000đối tượng mô phỏng riêng.

Khi nâng nhà, công suất mới chỉ tính từ mốc nâng; giữ phần công đã làm, không hoàn cả lô hoặc mất tiến độ. Khác Travian, đây là lựa chọn đề nghị cho offline để người đã xếp lệnh dài không phải hủy/xếp lại. Cần test mốc cùng thời gian và save/load.

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
2. Dữ liệu nhà:20mức cap/công suất/giá/thời gian và điều kiện; chưa có số đầy đủ để lập trình cả20cấp như đã cân bằng.
3. Runtime: gỡ count/sequence/validator max200; cập nhật lịch khi công suất đổi, không thu lại tiền; migration từ quân và queue đang có.
4. UI: tách “5lệnh”, “số quân trong lệnh”, “suất thành”, “công suất/giờ”, “lương ròng” và ETA. Không hiển thị5như giới hạn lính.
5. Kiểm ít nhất: đổi cấp giữa lệnh, nhiều thành song song, đủ cap thiếu kho/thiếu lương, bậc nặng, mất nguồn, tách/gộp,1×/8× và tải bản cũ. Thử quân vạn theo dữ liệu gộp trước benchmark.

**Chưa sửa code hoặc luật hiện hành trong lần nghiên cứu này.** Đây là cơ sở để chốt nhịp rồi chỉnh bản chơi; số và hiệu quả vẫn cần chạy thử.
