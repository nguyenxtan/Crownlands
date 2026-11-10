# Thế giới và nghịch lý mở rộng

Phiên bản 2.3 · 10/11/2026 · Theo [bản chốt](final-design.md).

Thế giới lâu dài nghĩa là lịch sử/lãnh thổ tiếp diễn trong save, không chạy khi đóng game. Ô vuông logic, vùng thử 64 ×64, khuôn đầu 128 ×128; camera và lưới hiển thị tách logic. Bốn mùa đổi cảnh quan, không reset hoặc tạo bốn hệ kinh tế.

## Quyền và kiểm soát

Thành/site có một chủ. Ngoại thành có bên giữ; garrison, job tiếp quản và phục hồi là dữ liệu khác. Quân đi qua hoặc dừng chân không tự chiếm cả vùng. Đường biên vẽ từ quyền hợp lệ; không dùng convex hull để biến đất người khác thành của mình.

Quyền vùng Đại thành không cho sở hữu/thu kho/điều quân thành khác chủ. Màu vùng hành chính và màu chủ quyền là hai chế độ map riêng. Chưa có cơ chế cửa ải khóa đường, hàng hải hay chiếm mọi ô đất bằng việc vẽ đường nối.

## Nghịch lý mở rộng

Đế chế không yếu vì có nhiều thành; yếu khi đường tiếp tế, quân giữ, kho/xe và nhịp ổn định không theo kịp. Thành liền nhau có thể dễ giữ hơn ít thành rải rác. Đế chế lớn ổn định được quyền mạnh và thắng; không sinh quân bí mật hay phạt số thành để kéo xuống.

Core dùng chi phí có thật: giữ mỏ/trại, hành quân, lương, tập trung quân, phục hồi thành mới. Thanh tải quản trị, thuế/An dân, dự bị và tự quản hoãn. Không coi việc bấm 100 thành là hình phạt cân bằng; tuyến/cảnh báo giảm thao tác có từ đầu.

## Rút và phục hồi

Rút quân và chở hàng bằng Movement thật; không nút xóa thành để né tiếp quản. Bỏ một thành phụ không tự cấp quyền tái lập mới. Dời thủ đô đổi nơi điều hành; không cộng hai cấp nhà/kho thành một.

Tái lập từ thành cuối áp B16: chủ động hợp lệ 1/2, bị mất 1/3 cấp hoàn thành, làm tròn lên, ô rỗng vẫn 0. Không nhân lại quân/tài nguyên/đất; quyền một lần theo nguồn. Mốc chụp là **ngay trước sự kiện mất quyền thành cuối hoặc commit di dân cuối**, chỉ từ thành nguồn đó, không chọn cấp cao nhất của toàn lịch sử. Không nhận nhiều quyền bằng lặp bỏ/nhận cùng nguồn.

## Đường dài

Mốc tự nguyện Khai Quốc/Thống Nhất và biên niên sử ghi câu chuyện, không bonus sức mạnh vô hạn. Có thể tiếp tục sau thắng, không bắt giết hết quân lưu vong. Bộ môi trường bốn mùa hoàn thiện ở expansion asset; việc mô phỏng thế giới lớn cần đo riêng.

Sổ [CAL01–CAL15](calibration-register.md) và [lộ trình](roadmap-and-validation.md) đặt câu hỏi về nguồn tạo/tiêu/chuyển, đế chế lớn ổn định, thắng/quay lại sau thua; chưa có kết quả.

## Bổ sung 02: topology và khả năng đi tới

B28 thêm [S00](prototype/scenarios/first-foundation.json)64² dựng sẵn, có núi/sông/cầu/mỏ và khoảng cách hữu hạn. Bước di chuyển bốn hướng, nước/núi không đi được, cầu cho quân/xe; không sinh đường teleport. Sông S00 giữ y 4–59 nên cầu là đường tắt, không chokepoint bắt buộc (bỏ cầu: thủ đô 90 bước). Ô site không transit; BFS hiện hành: mỏ đất 8, mỏ lương 10, trại 10, tiền thành 19, thủ đô 36. Thế giới 128² và procedural generation để sau dữ liệu thử; không bỏ lựa chọn kích thước đã có chỉ vì U10 nói chưa xác nhận trong phần của nó.

B23 cho đi qua đất màu trung lập trên ô địa hình thông thường (không collision, không trận đường) nhưng không quyền vào kho/cổng/site có chủ. Điểm tài nguyên vô chủ chiếm giữ bằng quân đủ điều kiện và nguồn nuôi; không cần tuyên chiến với owner rỗng. Site mất lực giữ cuối về unclaimed, kho ở lại dưới custody thế giới tới khi claim hợp lệ chuyển quyền một lần. Mỏ có chủ phải theo quan hệ/quyền. Khám phá/tầm nhìn dùng khoảng cách Manhattan, chưa LOS; terrain nhớ khác quan sát quân/kho hiện tại; tình báo có timestamp.


## Hướng thế giới mở — trao đổi 10/11/2026

Chủ dự án muốn thế giới mở hoặc rất rộng và đồng ý trước mắt với hướng bản đồ rộng hữu hạn, tự chọn khám phá/mở rộng, lịch sử giữ qua save. 512 ×512 là mục tiêu quy mô được đề xuất;1024 ×1024 chỉ xem sau đo hiệu năng, không là khả năng đã chứng minh. S00 vẫn 64 ×64 và khuôn đầu 128 ×128; chưa tạo world lớn trong đợt asset proof. Bộ tile/icon tái dùng phục vụ hướng này, không cần vẽ một ảnh bản đồ khổng lồ. Chia vùng tải/vẽ không mặc nhiên được đóng băng phe ở xa hoặc bỏ sự kiện hợp lệ.

## Bổ sung 2.3 — nguồn nuôi và nghĩa vụ nhìn thấy

Gốc quân quản suất, không tự nuôi nơi xa; site có quyền và hành trang trả phần nhu cầu theo B31. Chuyển/cướp/phá/hủy có sổ riêng, không tự tạo hàng. Nợ đói đi theo bucket, không rửa qua đổi gốc/gộp Army. Nghĩa vụ mở rộng không nhân mọi chi theo số thành; vận hành/bảo dưỡng còn các cổngG23, không bật các dòng sổ minh họa như phí thật.

B17 vẫn 20/20/40; thuế/An dân chưa tự đổi điều kiện thưởng. [Nghiên cứu và kinh tế 2.3](research-and-economy.md).
