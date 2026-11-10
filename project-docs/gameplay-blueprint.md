# Khung lối chơi đã chốt

Phiên bản 2.3 · 10/11/2026 · Theo [bản chốt](final-design.md).

## 1. Quyết định trung tâm

Người chơi chọn mục tiêu, chuẩn bị lực lượng/cơ sở/tiếp tế, rồi quyết định **chiếm để giữ, lấy lợi ích rồi rút, hay ngừng chiến dịch để củng cố**. Công nghệ mở thêm cách dùng quân, không tự thay trang bị hoặc nuôi quân. Có nhiều thành không đồng nghĩa đưa hết quân tới một nơi và giữ được lâu.

Vòng chơi: **xây thành → tạo nguồn lực → nghiên cứu/tuyển/nâng → trinh sát → giữ mỏ/trại → vận tải → công phá hoặc vây → tiếp quản → ổn định → giữ, mở tiếp hoặc rút**. Bản lưu giữ lịch sử, pause/tua phục vụ người chơi.

## 2. Các lựa chọn cần nhìn thấy

| Tình huống | Đánh đổi |
|---|---|
| Đã mở kỵ tinh nhuệ | Tuyển số ít mạnh hơn hay giữ ngân sách cho quân đông/xe/lương? Giáo vẫn là mối đe dọa. |
| Muốn thành thứ hai | Chiếm gần để nối hậu phương hay đánh xa lấy vị trí nhưng phải giữ tuyến? |
| Thấy đối thủ giữ cổng tốt | Đánh ngay để chặn viện hay giữ ngoại thành để cắt nguồn thực sự bên ngoài? |
| Mỏ có nhiều tài nguyên | Quân khai thác, quân bảo vệ, kho, xe và lương cùng giới hạn ích lợi. |
| Có thể thắng nhưng quân thiếu ăn | Rút một phần, tăng tuyến hoặc bỏ chiến dịch; không miễn phí nuôi vì đang mạnh. |
| Đối thủ rút qua cửa để ngỏ | Chấp nhận quân địch sống nhưng lấy được thành, hoặc chặn và chịu trận tại cổng. |

Không quảng cáo “ba hệ chinh phục”: mọi cách tạo ưu thế đều đi vào một quy trình tiếp quản B12. Đầu hàng có hiệp ước chưa thuộc core.

## 3. Nhịp và kết thúc

Pause dừng toàn thế giới, tăng tốc áp mọi phe, đóng game ngừng. Người chơi ra lệnh ở ranh giới an toàn; báo cáo giải thích thay vì đòi phản xạ. Không daily quest hoặc áp lực đăng nhập để cứu tiến trình.

Đại thành đầu tạo mốc Khai Quốc; mục tiêu scenario tạo mốc Thống Nhất. Cho tiếp tục sandbox. Đạt quân/công trình cuối không reset thế giới. Mất thành cuối có tái lập theo B16; tải lại vẫn là lựa chọn hợp lệ của game cá nhân.

## 4. Các lát cắt gameplay khi lập trình

| Lát cắt | Chứng minh |
|---|---|
| A1 | Một người + một vương quốc, có mục tiêu trung lập; xây/tuyển I/chiếm mỏ/chở về/NPC phản công/chiếm thành thứ hai/lưu-tải |
| A2′ | 14 profile đại diện, một dự án nghiên cứu, tuyển/nâng/chuyển, ba năng lực lõi |
| L | Một patrol có căn cứ đi 3–4 địa điểm; giao chiến tại nơi dừng, không giữa đường |
| B | Phe thứ hai, quan hệ khác nhau và tàn quân thật sau mất thành |
| Mở sâu | Đại thành, thưởng B, đổi đô, tái lập; môi trường đủ bốn mùa |

Các lát cắt này thuộc giai đoạn code, khác với đợt proof/core/expansion của asset. Không kết luận AI có ngoại giao đa phe chỉ từ A1.

Chi tiết khóa tại [baseline](final-design.md); giới hạn hiện tại ở [NPC lưu động](mobile-npcs.md). Các lựa chọn vui hay không phải đo khi có prototype, xem [lộ trình](roadmap-and-validation.md).

## 5. Khởi đầu cụ thể và thứ tự code

[S00 first-foundation](prototype/scenarios/first-foundation.json) cung cấp một vị trí mở đầu dựng sẵn và tài sản thử có nguồn. Nhánh bắt đầu common; mở sau research/cơ sở, không chọn khóa từ Chơi mới. Mục tiêu từ ruộng/trinh sát/mỏ/xe tới thành thứ hai trước tech sâu.

[BUILD-01–BUILD-05](prototype-readiness.md) chia A1/A2′/L/B thành đầu việc có điều kiện nghiệm thu. U10 đề nghị research trước chiếm, bản hiện hành giữ chiếm đầu trước research sâu để sớm chứng minh vòng chơi; mất gốc/nợ cơ bản phải có từ BUILD-03 để vòng A1 có hậu quả thật. Số preset và đường đi mới chỉ được kiểm tĩnh, chưa có game hoặc playtest.

## Bổ sung 2.3 — lựa chọn nghiên cứu và dự trữ

Nghiên cứu tạo lựa chọn mở quân/chất lượng, cải thiện huấn luyện hoặc chuẩn bị hậu phương, với một dự án toàn đế chế. Đủ cap không bảo đảm đủ lương; ở xa phải có kho/hành trang/tuyến thật. Nhận lệnh đầu tư trả trước là quyết định đã chi, không còn là tiền có thể tự lấy lại khi thiếu ăn.

Sổ tách raw đang có/chi thật/chuyển hàng, không một đồng tiền giả. Đợt đầu chưa cộng bảo dưỡng ngoài lương/phí mọi nhà/hỏng kho; các nghĩa vụ đó được giữ trong thiết kế nâng sâu với cổng luật. Giữ nhịp quân vừa phải theo preset, không gọi bảng số là bằng chứng vui/cân bằng. [Luật 2.3](research-and-economy.md).
