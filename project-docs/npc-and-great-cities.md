# NPC, Đại thành và trung tâm đế chế

Phiên bản 2.3 · 10/11/2026 · Theo [bản chốt](final-design.md).

## 1. Loại mục tiêu

| Loại | Vai trò / hình world |
|---|---|
| Trại sơn tặc | Địa điểm địa phương có nguồn lực giới hạn, hình lều/hàng rào |
| Điểm tài nguyên | Quân giữ/khai thác, kho và trần công suất, tài nguyên chở về |
| Thành bỏ hoang | Setup công trình/quân giữ có nguồn scenario, không tài khoản online bất hoạt |
| Vương quốc NPC | Có thành/kinh tế/quân/mục tiêu, cùng kiểm tra vật chất với người chơi |
| Đại thành | Thành lớn và quyền lợi vùng, icon tối đa 48 px, không chiếm màn hình |
| Đoàn lưu động | Army có mission, marker riêng, không phải nhà trên bản đồ |

Tên production: Vương triều Thiết Quan, Hắc triều Tro Tàn; Giáo đoàn Bình Minh để sau. Các tên là lựa chọn nội dung v 2.0, không khẳng định chủ dự án đã nêu nguyên văn. Faction != path != relation. Hạng NPC 1–20 tách quân I–V; trinh sát hiện cơ cấu theo tin được biết.

## 2. Chinh phục

Công phá/vây chỉ tạo điều kiện cho một quy trình chuyển quyền B12. Kho/công trình không nhân hoặc tự chia cấp, quân cũ không tặng cho người chiếm. Mới chiếm cần phục hồi, vẫn có thể bị đánh; lực giữ và thời lượng CAL09. Thủ đô/thành cuối NPC không được miễn chiếm vì tên gọi.

Cửa chặn/để ngỏ quyết định giao chiến tại cổng khi rút; không miễn tấn công toàn cầu, không điều ước đầu hàng. Tàn quân giữ những quân còn sống, không rã tức thì/nhận quân mới.

## 3. Thưởng B đã khóa

`P = base * (1 + empire_bonus + region_bonus)`, với từng bonus thuộc `[0, 0.20]`, tổng tối đa `0.40`. Base chỉ là sản xuất ô tài nguyên trong thành của chính chủ trước chi phí lương. Không áp lên mỏ world, loot, giao thương, hỗ trợ hoặc chính phần bonus đã cộng.

Nhiều Đại thành không cộng lặp. Quyền ổn định của ít nhất một Đại thành đủ điều kiện mở phần đế chế; thành trong vùng đủ điều kiện nhận phần vùng, không nhận hai lần vì vùng chồng. Thành của phe khác không nhận và không đổi chủ vì nằm trong vùng.

Chủ cũ dừng khi đổi chủ, chủ mới chờ mốc ổn định CAL12; không ân hạn cấp trùng. Quấy rối nhỏ không tắt thưởng toàn đế chế, nguồn thật bị chiếm vẫn dừng đúng nơi. Không đòi tuyến kết nối toàn cầu khi chưa có luật mạng đủ rõ.

## 4. Dời trung tâm

Chọn Đại thành đang sở hữu và đã ổn định làm thủ đô qua công việc chuyển trung tâm, không trong lúc đang mất điều kiện kiểm soát. Không vận chuyển cấp công trình/kho/quân bằng việc đổi cờ thủ đô; hàng/quân cần di chuyển thật. Không gộp hai thành hoặc mang phần thưởng Đại thành đã mất về nơi mới.

Mất thủ đô không chuyển quyền tất cả thành khác. Kiến thức đã có giữ lại, hoạt động địa phương tiếp tục. Nhà điều hành mở sâu không là điều kiện để bản lõi chạy. Nhập thành/thủ đô dự phòng đầy đủ hoãn.

Các điều kiện thời gian, chi phí và rating trong [sổ hiệu chỉnh](calibration-register.md), không phải dữ kiện đã cân bằng. [Đoàn NPC](mobile-npcs.md) quy định nguồn, mission và giới hạn site-only.

## 5. Bổ sung 02: công thức kết hợp và thành tựu

Thưởng Đại thành vẫn 20/20/40; B26 chọn cộng research và Great trên cùng base hợp lệ, không lấy sản lượng đã thưởng nhân tiếp. Core hiện tại research_bonus = 0; ví dụ 160 là fixture giả định. Chi tiết scope/control/recovery/rounding tại [prototype readiness](prototype-readiness.md).

Mục tiêu scenario phải công bố trước: Đại thành đầu ổn định cho Khai Quốc, đủ danh sách vùng/Đại thành bắt buộc và thời gian giữ cho Thống Nhất. Không yêu cầu diệt mọi đoàn sống sót, không bí mật sửa điều kiện khi gần thắng. S00 chỉ thử thành thứ hai, không có Đại thành và không gọi là Khai Quốc. Đạt mục tiêu được tiếp tục cùng save.

## Bổ sung 2.3 — NPC có nguồn kiến thức và ngân sách

NPC dùng cùng điều kiện cơ sở/tech/giá/cap và nguồn nuôi, khác lựa chọn/thiết lập được công khai. Một dự án, kiến thức đã xong không lấy miễn phí khi chiếm Học viện; không tự đồng cấp với người chơi. Bảng fixture S00 cũ giữ nguyên, không gọi các quota setup đó là đường cap 2.3 đã chạy.

Không thêm lương/đạn vô hạn cho Đại thành hoặc phí phép; khi module vận hành/bảo dưỡng chưa bật thì cùng rate 0, khi bật phải có nguồn/hậu quả cùng luật. ThưởngGreatB17 và scope B26 không đổi. [Đặc tả 2.3](research-and-economy.md).
