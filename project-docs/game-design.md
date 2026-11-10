# Định hướng sản phẩm và trải nghiệm

Phiên bản 2.3 · 10/11/2026 · Theo [bản chốt](final-design.md).

Crownlands là game chiến thuật một người offline về **tạo và giữ một đế chế**, với kinh tế cục bộ, quân có tiến triển nhìn thấy được, hậu cần vật lý và đối thủ NPC có lợi ích riêng. Thế giới giữ qua save và không reset theo mùa.

## Trụ cột đã chốt

- **Chuẩn bị quyết định kết quả:** dòng quân, bậc, nhánh, bố trận, khoảng cách và lương; không điều khiển từng lính trong trận.
- **Mở khóa khác với sở hữu:** nghiên cứu cho kiến thức; từng thành cần cơ sở, vật liệu, thời gian và suất để trang bị quân.
- **Mở rộng có nghĩa vụ:** thêm thành mở tiềm lực nhưng cần giữ, nuôi và ổn định; không trừ sức vì đạt một số thành tùy tiện.
- **Thất bại có đường tiếp tục:** quân còn sống không tự mất vì thành gốc đổi chủ, có rút lui và tái lập, được tải lại.
- **Đọc được:** hình địa điểm nhỏ gọn, báo cáo có lý do, tình báo có tuổi; không che quyết định bằng nhiều thanh chỉ số.

## Phạm vi sản phẩm đầu

Web offline desktop 2 D, 14 profile đại diện, một kiến trúc thành, 14 slot nội thành và 16 ô sản xuất, năm dòng quân và ba nhánh mở muộn. Bốn tài nguyên; không mana/vàng bắt buộc. Phe/nhánh/quan hệ tách biệt. AI chạy bằng luật cục bộ; không cần gọi dịch vụ AI để chơi.

Nguồn cảm hứng được chuyển thành thiết kế riêng về tổ chức thành, hình dáng và tiến trình. Asset phải theo camera/palette chung, không chép một game tham chiếu. Hai concept bản đồ cũ không là bộ asset đã duyệt.

## Điều chưa đưa vào lõi

Thuế/An dân, dự bị, tự quản, chư hầu, hợp đồng dài hạn, nhập thành, quái vật dòng mới, XP/item, hồi sinh và giao chiến trên đường không phải điều kiện hoàn thành vòng lõi. Giữ ý tưởng trong nguồn để xem sau; không làm thêm chỉ để tăng số cơ chế.

[Bản chốt B01–B22](final-design.md) là yêu cầu hiện hành. [Khung lối chơi](gameplay-blueprint.md) chỉ rõ lựa chọn và các lát cắt; [sổ hiệu chỉnh](calibration-register.md) chứa số cần thử. Chưa có bằng chứng playtest rằng các trụ cột đã tạo game vui.

## Bổ sung 2.3 — nghiên cứu gắn với tổ chức

Cap theo cơ sở nhà binh; thời gian tuyển liên quan nghiên cứu đã hoàn tất và công từng profile. Quân vạn là khả năng của nhiều nguồn biên chế/hậu cần, không giữ số cap 200 fixture cho mọi thành. Mốc 2.500/+60% là giả thuyết cần thử.

Chốt nguyên tắc thu–chi theo nguồn và địa điểm, không đánh đồng hàng chuyển với tiêu hao hoặc biến mọi công trình thành phí tồn tại. Vận hành/bảo dưỡng mở sâu chưa bật cho bản đầu, giữ đường phục hồi và ít thao tác lặp. [Đặc tả 2.3](research-and-economy.md) ghi phần kế thừa/hoãn và trạng thái chưa triển khai.
