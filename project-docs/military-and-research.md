# Quân đội và nghiên cứu đã chốt

Phiên bản 2.3 · 10/11/2026 · Theo [bản chốt](final-design.md).

## 1. Ba trục tách biệt

Công trình 1–20 là cơ sở; công nghệ là kiến thức; quân I–V là profile trang bị/huấn luyện. Không có “Học viện 20 tự nâng hết quân”. I–III nền chung, IV/V theo Quân chế/Thánh Quang/Hắc Ảnh. Một cohort chỉ một line/tier/path hiệu lực.

Core theo [roster JSON](asset-production/unit-roster.json): kiếm/giáo/cung/voi I–II, kỵ I–III và IV ba đường = 14. Paladin là kỵ V Thánh để sau; kỵ IV Thánh là Kỵ vệ Thánh Ấn. Nhánh Thánh có năng lực; không quay lại đề xuất thuần quân sự cũ. Kiếm Thánh vẫn đánh bộ.

## 2. Học viện và cơ sở

Một dự án nghiên cứu cho toàn đế chế ở một thời điểm. Học viện tại một thành chi trả bằng kho nơi đó; nghiên cứu xong mở kiến thức toàn đế chế. Lò rèn + Doanh trại/Chuồng ngựa/Trại voi địa phương phải đủ điều kiện mới tuyển hoặc nâng profile. Không làm thêm ba nguyên liệu thép/giáp/vũ khí chỉ vì tên công nghệ.

Kiến thức xong giữ khi mất Học viện/tái lập. Dự án dở mất cùng địa điểm nghiên cứu bị chiếm: hủy, không chuyển cho người chiếm, không hoàn khoản đã tiêu. Không nhân tốc bằng 20 Học viện hoặc cùng công nghệ chạy nhiều bản. Khoảng 5–6 tech mở roster là ước lượng nội dung, không trần tổng công nghệ. B29/đặc tả 2.3 tách ba node thử BUILD-04 và phần mở rộng; không dựng 12 cây trước vòng chơi.

## 3. Vòng đời tuyển/nâng/chuyển

Tuyển thẳng profile đủ điều kiện hoặc chọn số quân hiện có để nâng/đổi. Có thể nhảy qua bậc đã mở, không cần bấm từng bậc; chỉ trong cùng dòng. Giá và thời gian tính theo cặp nguồn–đích. Trộn nhánh trong đế chế được phép, không tự gây bất mãn.

| Thời điểm | Xử lý khóa |
|---|---|
| Nhận lệnh | Kiểm chủ/cơ sở/kiến thức/kho; trả đủ chi phí trước theo B30, giữ suất tuyển hoặc phần tăng của nâng |
| Đang nâng | Quân vẫn ở địa điểm, thủ bằng profile cũ, không xuất quân; hủy trước nếu muốn đi |
| Có thương vong | Giảm số còn trong job theo cohort thật; phần chết không được nâng/hoàn/hồi sinh; giải phóng suất tương ứng một lần |
| Hoàn tất | Tuyển: từng quân hoàn tất chuyển suất giữ sang hiện hữu và bắt đầu ăn lương. Nâng: đổi cả lô còn sống một lần, cập nhật suất và khóa hồi; không tăng count hoặc hồi máu |
| Hủy | Giải phóng phần giữ biên chế hợp lệ; không hoàn raw đã trả. Tuyển chưa có hủy chủ động; nâng có thể hủy theo B08. Hủy việc chưa chạy để hoàn nguyên liệu là cơ chế sau, chưa thuộc core 2.3 |
| Mất nơi/cơ sở | Hủy job; garrison và hàng xử lý bằng luật giao chiến/chuyển chủ, không chuyển quân bằng job |
| Mất riêng gốc | Pause job, không mượn suất chủ mới; gán lại cùng chủ đủ suất mới tiếp tục |

## 4. Suất và công năng

Quân away, giữ mỏ, tại trại hoặc đang nâng vẫn tính gốc. Giữ thêm khi tăng trọng số; trả phần giảm khi profile mới có hiệu lực. Phần quân mất gốc vào chờ biên chế; không tuyển/nâng thêm từ nguồn đã mất, không biến thành du mục được cap mới.

Bậc cao thường tốt hơn theo đầu người nhưng không buộc tối ưu mọi ngân sách, lương và tốc độ. Cho phép bậc thấp lỗi thời ở một đế chế đủ giàu, không dùng việc bắt lính I đi mỏ để giả vờ cân bằng. So cả tuyển thẳng và nâng để tránh đường trung gian áp đảo tất cả tài nguyên/thời gian. Các số phải qua CAL02–CAL04; chưa có kết quả.

Không XP từng lính, trang bị rơi, cây tướng hoặc bảo dưỡng vật tư ngoài lương trong core. [Năng lực](combat-abilities.md) và silhouette tạo khác biệt trước.

## 5. Bổ sung 02: nợ biên chế và khoản giữ

B24 ở [prototype readiness](prototype-readiness.md) là luật xử lý nguồn cap mất/giảm: giữ quân/chủ, chặn tăng, hủy hàng chờ chưa chạy vượt khả năng và pause job đang chạy thiếu nguồn. Nơi đóng khác gốc; gán lại phải đủ nguồn cùng chủ, không xài suất chủ mới.

Job đang chạy thiếu suất thì pause: trả suất tăng, giữ progress/thời gian active còn lại/chi đã tiêu, vô hiệu event hoàn cũ; resume giữ lại suất trước khi tạo mốc mới, không trả chi lần hai. Ân hạn nợ tính theo game time, khóa theo (owner, nguồn capacity gốc), bảo toàn qua tách/gộp/di chuyển/load và gán lại một phần; `used` chỉ đếm quân hiện hữu. Hết hạn tăng lương theo tỷ lệ phần hiện hữu không có nguồn; không xóa quân ngay hoặc tự nhân thêm cap. Người đủ lương có thể giữ nhưng không tuyển/nâng tăng thêm. Số thử 6 giờ/surcharge 1 ở S00 thuộc CAL02/CAL10, chưa qua game test.

## 6. B29–B33: huấn luyện, nguồn nuôi và phạm vi

Cap theo Doanh trại; công theo profile/job, năng lực cơ sở ×(1+tech hoàn tất). Một dự án, tech không tự mặc giáp hay làm mất giá thời gian của quân tinh nhuệ. Không thu phí áp dụng lần 2 trong core. Giữ công lẻ và công đã làm; nâng/research tại Tchỉ đổi tốc độ từ T, không tính lại giá đã trả. Xem [đặc tả 2.3](research-and-economy.md) và [preset](prototype/research-economy-preset.json).

Bậc cao không tự nhân khẩu phần theo số bậc. Khẩu phần theo profile/dòng, tính một lần kể cả vật cưỡi. Bảo dưỡng gỗ/sắt chưa bật: cần nguồn trên kho/hành trang ở mọi tư thế và hậu quả thiếu trước. Cấp gốc không tự nuôi quân đang xa; site hợp lệ trước, hành trang bù thiếu theo B31. Nợ đói theo bucket B32, không rửa bằng tách/gộp/load.

Đầu BUILD-04 thử ba node trang bị II/huấn luyện II/tổ chức huấn luyện I; danh mục mở roster 14 và các mức tốc độ tiếp theo được phân kỳ riêng. Các mức tốc độ là những lần nghiên cứu riêng có chi phí, không một nghiên cứu miễn phí mở cả I–IV. Các con số mở đầuS00 không tự thành cấp cao 2.3.
