# Phe và đoàn NPC lưu động

Phiên bản 2.2 · 10/11/2026 · Theo [bản chốt](final-design.md).

## 1. Tách ba khái niệm

**Phe** là chủ và tổ chức (Thiết Quan, Tro Tàn; Bình Minh mở rộng). **Nhánh** là profile công nghệ/quân (martial/radiant/umbral). **Quan hệ** là trạng thái theo cặp phe. Không suy chữ Thánh thành đồng minh hoặc Hắc thành địch; không coi mọi NPC cùng phe.

Core có trung lập/thù địch, hành vi theo scenario/tin đã thấy. Không có hệ chư hầu hoặc điều ước cưỡng chế trong A1/A2′/L/B.

## 2. Đoàn là một Army có mission

Cohort quân, hàng/lương, gốc/cap và vị trí chỉ có một bản. Mission gồm vai trò/mục tiêu, chuỗi **địa điểm**, điểm dừng, cam kết/hủy và version. Dùng Movement bình thường giữa điểm; không thêm một bản quân “mobile” để vẽ.

| Loại | Quyết định |
|---|---|
| Có căn cứ | L thử một patrol 3–4 điểm; tuyển/nuôi/đổi quân qua nguồn thực của căn cứ |
| Tàn quân | B dùng quân còn sống khi mất thành; mất gốc không tạo cap/tuyển miễn phí, hết lương áp preset đói |
| Du mục | Hoãn. Muốn mở cần nguồn cap/ngân sách/bổ sung riêng có khai báo; không cho người chơi dùng đường đó |

AI có thể quan sát, chọn mục tiêu khả thi, đầu tư và cam kết một chiến dịch; ngân sách kinh tế nền vẫn chạy. Ngưỡng hủy khác bắt đầu để tránh đổi ý liên tục, biên an toàn không xuống dưới điều kiện nuôi/đường/lực tối thiểu. Không buộc tấn công nếu mọi mục tiêu vô lý.

## 3. Giới hạn chạm trán đã chốt

**Chỉ có giao chiến ở địa điểm:** mỏ, trại, thành/cổng, cứ điểm. Hai đoàn cắt nhau trên đường không phát sinh trận. Không quảng cáo phục kích/cướp xe/hộ tống đang di chuyển. Cắt tiếp tế hiện là chiếm/chặn tại nơi nhận hoặc nguồn có kiểm soát, không chặn dọc đường.

Truy đuổi chọn nơi thấy cuối cùng/tin cũ, không vị trí hiện tại ẩn. Dừng chân không sinh chủ quyền/thành. Khi đến đích áp quyền/cổng/trận của nơi đó, không xuyên thủ quân vì đang “patrol”.

## 4. Nguồn và vòng đời

Setup scenario ghi tài sản/công nghệ ban đầu; tăng/giảm tiếp theo có lý do và ngân sách. Spawn ngoài tầm nhìn không tự trở thành hợp lệ. Có trần đoàn/event đang sống, lịch giải tán hợp lý; cleanup không xóa quân/hàng sống hoặc hoàn lương đã tiêu.

Một mission có tối đa một bước kế tiếp đang hiệu lực theo version; **không phải** mỗi Army chỉ có một event cho mọi việc. Lịch đói/hàng/nhiệm vụ vẫn giữ đúng mốc. Tàn quân không rã ngay vì mất thành cuối; còn di chuyển và tiêu hao theo nguồn có thật.

## 5. Thể hiện trên bản đồ

Trại sơn tặc dùng `world-npc-bandit-camp`; đạo quân chưa biết dùng `world-army-patrol`; đã nhận dạng có thể dùng marker dòng quân chủ đạo. Xe là `world-wagon`. Phe/chủ/quan hệ/hạng/số quân là overlay có quyền biết, không bake vào hình. Không cần asset “mỗi đạo một tranh”.

Không tạo bộ quái vật thứ sáu ở core. Nhánh Hắc là quân có trang bị/ấn riêng, không mặc định sinh vật. Một loài quái vật tương lai cần roster và luật mới, không chỉ thay ảnh của voi rồi giữ tên sai.

[Manifest](asset-production/asset-manifest.json) khóa ID. Chưa có test AI/mission hay kết quả mô phỏng dài; các giới hạn trên phải kiểm khi code.

## 6. Bổ sung 02: vòng đời và giới hạn tạo

B27 trong [prototype readiness](prototype-readiness.md) tách settled/landless, thất bại quân sự và archive AI/dữ liệu. Phe không còn thành nhưng có Army/hàng vẫn giữ chủ, lịch và upkeep; không nhận quân/cap/tái định cư mới từ hư không. Có thể chiếm một thành bằng quân còn sống nếu đủ điều kiện, không đồng nghĩa có quyền dựng thành miễn phí.

Preset planner giới hạn4 đoàn ngoài thành mỗi kingdom, patrol và Army landless tính chung; gộp hợp lệ giảm số đếm; B hai kingdom tối đa 8. Chạm trần chặn tạo/tách, không xóa hoặc teleport quân hiện có. Không hồi sinh phe mới bắt buộc sau thắng; khám phá phe có sẵn khác spawn mới.

Đói kéo dài phải có hao hụt hữu hạn tới hết quân nếu không tiếp tế (lịch CAL10). Phe đã thất bại quân sự có xe/hàng không quân, không đích hợp lệ thì tài sản đó `dormant`: giữ ledger/ID/số lượng, không di chuyển/sản xuất/event poll; chỉ event hoặc lệnh hợp lệ mới đánh thức; planner có thể archive. Không áp dormant lên Army sống. Trại địa phương hết garrison thành site trống dưới custody thế giới, không respawn.

S00 thử `ai_budget` cho ash-crown: tối đa 6 quân đặt tuyển mỗi 3600 giây game (không dồn quota), không viện binh nội bộ, một chiến dịch active, tối đa 12 quân mỗi sortie, garrison tối thiểu 80/20, đánh giá mỗi 300 giây. Đây là preset intro, không giới hạn chung của AI và không chứng minh kết quả trận. Dữ liệu nguồn/giới hạn nằm trong S00 và CAL11; BS-T11/12, RV21-13/14/15 chưa chạy.
