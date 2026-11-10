# Tổng hợp review chéo Codex và Claude

Ngày 07/11/2026. Người biên tập cuối: Codex. Phạm vi: lối chơi offline, chinh phục và tiến hóa quân.

> Biên bản lịch sử của bộ 1.2 trước U08. Hướng Thánh/đối lập và NPC lưu động được bổ sung ở [đối chiếu 1.3](2026-11-07-branches-and-mobile-npcs-resolution.md). Khuyến nghị thuần quân sự/hoãn phép bên dưới không còn là giới hạn hiện hành.

**Đây là kết luận thiết kế để thử, không phải chứng minh cân bằng hoặc quyết định duyệt mọi cơ chế của chủ dự án.** Hướng offline D28 và các quyết định cũ giữ đúng nguồn; mọi mặc định mới được ghi là đề xuất.

## 1. Chuỗi trao đổi

1. [Codex đưa đề xuất chinh phục](../proposals/2026-11-07-offline-conquest.md).
2. [Claude review vòng 1](2026-11-07-offline-conquest-round-1.md).
3. [Codex phản biện mười hai điểm](2026-11-07-offline-conquest-codex-response.md), trả lời đủ tám câu hỏi của Claude.
4. [Claude review vòng 2](2026-11-07-offline-conquest-round-2.md), rút/sửa nhiều đề xuất và ghi điểm còn khác.
5. Chủ dự án đưa [tiến hóa quân và nghiên cứu](../proposals/2026-11-07-military-progression.md).
6. [Claude review phần quân](2026-11-07-military-progression-review.md), đồng thời sửa thêm các điểm vòng 2.
7. Codex đối chiếu và biên tập [khung lối chơi](../gameplay-blueprint.md), [quân và nghiên cứu](../military-and-research.md) cùng bộ tài liệu 1.2.

## 2. Phần hai bên đồng thuận để thử

| Vấn đề | Kết luận thiết kế |
|---|---|
| Ba đường chiếm thành | Một quy trình đổi chủ; công phá/vây tạo tình thế, rút/đầu hàng là kết quả hoặc phần mở rộng |
| Trạng thái thành | Tách chủ, thủ quân, ngoại thành, tiếp quản và phục hồi; thành phục hồi vẫn có thể bị đánh |
| Chờ và tua | Tua giảm thời gian đời thực, không tự xóa chi phí game; đo chi phí biên và cơ hội, không thêm phạt chỉ để chống chờ |
| Vây | Chỉ ngừng nguồn mất kiểm soát; kho/nguồn được bảo vệ vẫn còn; không tắt lương vì đứng gần |
| Rút | Không bảo vệ toàn cầu; bản đầu không có trận trên đường cho bất kỳ đoàn nào |
| Đầu hàng chính thức | Không cần ở lát cắt đầu, chưa có hòa ước/bồi thường/chư hầu |
| NPC | Cùng luật tài sản, tầm nhìn và thời gian; hành động có nguồn, không đọc bí mật, không tự sát để đạt chỉ tiêu hoạt động |
| Thời gian | Mốc/pha/thứ tự xác định; pause/tua không chen trước việc đã xảy ra; không chống quyền save/load |
| Nghiên cứu và quân | Tách kiến thức/cơ sở/quân thật; mở khóa không tự nâng quân đang có |
| Quân đang nâng | Vẫn là thủ quân; không giấu quân; không hoàn thành lại N ban đầu sau tổn thất |
| Phạm vi | A1 lõi, A2 tiến hóa, B NPC độc lập; I–V dài hạn không cần cùng có ngay |
| Công cụ và phép | Không khóa UX thiết yếu sau nghiên cứu; khuyến nghị hoãn phép/bảo dưỡng ngoài lương |

## 3. Mặc định thử và điểm chưa chứng minh

- **Cửa tiếp cận chặn/để ngỏ:** chấp nhận làm ứng viên thử, không gọi là đầu hàng có điều khoản. Đổi lập trường không kéo lại đoàn đã rời. Nếu luôn một lựa chọn tốt nhất thì bỏ nút thừa.
- **Lực lượng kiểm soát tối thiểu:** cấu hình theo địa điểm, thử suất thay đầu người; chưa chứng minh hợp lý cho voi/tinh nhuệ, chưa thành luật chốt.
- **Tiếp quản bị mất điều kiện:** hủy về 0 là mặc định thử; có thể quá gắt và cần đo. Thắng toán quấy rối mà vẫn đủ điều kiện không reset.
- **Thứ tự cùng mốc:** công việc → quân/trận → hàng → đói → tiếp quản → quyết định → cửa lệnh/lưu. Đây là preset O10, không kết luận duy nhất đúng.
- **Một dự án nghiên cứu:** phạm vi A2, không thay đề xuất dài hạn 1–3 bằng luật chính thức.
- **Một lô nâng xong cùng mốc:** đơn giản hóa để thử, chưa chọn toàn bộ chính sách hoàn/hủy.

## 4. Những điểm Codex không tiếp thu nguyên xi

| Ý kiến review | Biên tập cuối và lý do |
|---|---|
| Đường tuyển thấp rồi nâng không được rẻ hơn hoặc nhanh hơn tuyển thẳng | Tránh **áp đảo trên mọi chi phí**, không cấm một đường rẻ nhưng chậm. So cùng trạng thái đầu và tính chi phí chìm đúng |
| Nâng luôn phải rẻ hơn tuyển mới | Đây là giả thuyết giá, không định luật. Còn suất, quân đang có và thời gian; cần thử hai đường đều có hoàn cảnh hữu ích |
| Nâng nhảy nhiều bậc không rẻ hơn từng bước | Không khóa vội: giảm thao tác hoặc chi phí trung gian có thể hợp lý; phải so đường tổng thể và tránh exploit, không ép bấm |
| Tinh nhuệ bắt buộc hiệu quả hơn theo suất | Chưa chọn. Đây là một phương án; quan trọng là các ràng buộc tạo đánh đổi, không tự đặt mục tiêu bằng một tỷ số |
| Bậc thấp được phép lỗi thời | Giữ như một lựa chọn cần chủ dự án cân nhắc; không tự ghi thành luật. Không hứa mọi bậc hữu ích ở mọi giai đoạn |
| NPC hết thành và hết lương thì áp hao hụt riêng | Bỏ khác biệt riêng cho NPC. Quân còn chủ, theo cùng preset đói đã chọn; không tự xóa quân vì mất thành cuối, không ép dọn tàn quân để tiếp tục chơi |
| Hạng NPC tính theo suất | Suất chỉ là một đầu vào có thể thử. Bậc/cơ cấu/tường/hậu cần cũng có thể quan trọng; không khóa công thức hạng |
| Giải phóng suất quân nâng đã chết tại lúc job xong | Giải phóng phần tương ứng ngay khi ghi tổn thất, tránh quân chết vẫn giữ suất. Test tách/gộp/làm tròn vẫn cần |
| Mất thành gốc thì job cứ xong | Còn mở ở O18/O30: phải có preset rõ về chờ biên chế và nguồn suất, không lấy suất của chủ mới hoặc âm thầm bỏ kiểm tra |

Các dòng trên là phán định của Codex sau khi đọc review, không ghi giả là Claude đã kiểm tra lại những sửa cuối này. Chúng được giữ có nhãn để thử thay vì tiếp tục kéo dài review giấy.

## 5. Bản thử được đề nghị

A1 chứng minh xây → quân → mỏ → xe → phản kích → thành thứ hai → lưu/chơi tiếp với một vương quốc và mục tiêu trung lập. A2 thêm tiến hóa I–II, III giới hạn khi cần, cơ sở và một dự án nghiên cứu. B thêm vương quốc thứ hai và một ca trại NPC có nhãn.

Không kết luận từ A1 rằng NPC có đời sống độc lập, từ 12 profile rằng đã cân bằng đủ 25, hoặc từ hai agent đồng ý rằng game đã vui. Các phép thử C/M và các kịch bản bổ sung vẫn chưa chạy.

## 6. Lựa chọn của chủ dự án còn quan trọng

Không cần quyết tất cả để thử A1. Trước mở rộng, cần ưu tiên:

1. Mức giả tưởng và Paladin: hai bên khuyến nghị thuần quân sự trước, chủ dự án chưa chọn cuối.
2. Mức sâu của tiến hóa: I–V là đề xuất dài hạn; chấp nhận phạm vi thử nhỏ trước và mức hữu dụng bậc thấp cuối game chưa chốt.
3. Đích chiến dịch: mốc chiến thắng tự nguyện/tiếp tục sandbox và chư hầu tương lai. Không có reset bắt buộc; tái lập D17/D18 vẫn được giữ, chưa bị thay bằng chỉ load.

Chi tiết job, đồng hồ, hoàn/hủy và cap là vấn đề cần đặc tả/kiểm thử, không nên bắt chủ dự án chọn từng hằng số trong lượt tư vấn.
