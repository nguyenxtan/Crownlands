# Sổ hiệu chỉnh sau khi khóa thiết kế

Phiên bản 2.3 · 10/11/2026.

Đã khóa cấu trúc ở [baseline](final-design.md). Bảng này chứa dữ liệu cần đo trước/lúc lập trình, **không phải các phương án thiết kế đang chờ chọn để bắt đầu asset**. Giá trị chưa thử không được gắn nhãn cân bằng. Không cần vẽ asset khác khi đổi một mức sát thương hoặc thời gian.

Mã CAL01–CAL15 dành riêng cho hiệu chỉnh; C01–C08 trong danh mục nguồn vẫn chỉ các review lịch sử.

## 1. Dữ liệu cần hiệu chỉnh

| Mã | Nhóm | Đã khóa | Còn đo/cấu hình |
|---|---|---|---|
| CAL01 | Kinh tế | Bốn tài nguyên, kho riêng, 16 ô 4/4/4/4, trần 20 | Giá, sản lượng, sức chứa, thời gian, vốn đầu và tăng trưởng |
| CAL02 | Quân | Năm dòng, tier/path, roster 14 đầu | Stats, lương, sức chở, thời gian và suất có trọng số |
| CAL03 | Tương khắc | Dấu ma trận B11, không đổi bởi path | Độ lớn K và hiệu quả lệch bậc/ngân sách |
| CAL04 | Nâng/chuyển | Tại chỗ, job cả lô sống, cap giữ, một profile | Giá/thời gian, rearm, bộ test ưu thế hai đường |
| CAL05 | Năng lực | Quỹ chung, hồi thế giới, không mana, ba năng lực lõi | Dung lượng, thời hạn lượt, hồi, lượng phá và thông số report |
| CAL06 | NPC rating | Hạng 1–20 riêng, không = cấp lính | Rating theo scenario/tình báo và cách cập nhật |
| CAL07 | Hành quân | Ô vuông, site encounter, lương mang, xe đi/về | Tốc độ, chi phí dựng trại, sức chứa, ETA |
| CAL08 | Mỏ | Năng suất/kho hữu hạn, chưa depletion trong lõi | Điểm bão hòa quân, sản lượng, kho và sức chở |
| CAL09 | Chiếm/giữ | Chủ/control/job riêng, ngắt về 0 | Lực giữ tối thiểu, thời gian tiếp quản, thời gian phục hồi |
| CAL10 | Thiếu lương | Cùng preset người/NPC, game time, không giờ thật | Khoảng cứu, hệ số suy yếu/hao hụt có giới hạn |
| CAL11 | AI/đoàn | Nguồn thật, mission, tin hạn chế, không cap miễn phí | Ngân sách, chu kỳ đánh giá, biên an toàn và trần đối tượng |
| CAL12 | Đại thành | 20/20/40, base nội thành, chủ đổi dừng nguồn cũ | Thời gian ổn định/hiệu lực, scenario Đại thành |
| CAL13 | Tái lập | 1/2 chủ động hợp lệ, 1/3 mất cuối, một claim/nguồn | Thời gian/điều kiện thực hiện, vùng đến và hỗ trợ khởi lập |
| CAL14 | Nhịp chơi/mùa | Pause/tua chung, bốn mùa cosmetic | Khoảng hai quyết định có nghĩa, thời lượng mùa, mức tự dừng |
| CAL15 | Kỹ thuật | Web offline, save nguyên vẹn, không chạy bù | Cơ chế lưu cục bộ cụ thể, schema/migration, hiệu năng máy |

Không import toàn bộ R06 thành cân bằng mới. Cấu hình cũ 18 ô hoặc `field_cap=10` không còn là số sản xuất hiện hành. Nguồn cũ vẫn giữ nguyên để so, không sửa XLSX gốc.

## 2. Điều kiện không được phá khi hiệu chỉnh

- Không thêm dòng thứ sáu, tài nguyên bắt buộc thứ năm hoặc biến kiếm thành kỵ.
- Không để quỹ/nhánh xóa mọi ý nghĩa của cơ cấu quân, không lấy cùng đầu người là so sánh duy nhất.
- Không nhận thêm quân/hàng/cap qua tách/gộp, đổi chủ, chuyển nhánh hoặc tải lại.
- Không phạt theo số thành hoặc tăng quân NPC bí mật để chữa một cấu hình quá dễ.
- Không làm người chơi phải canh giờ ngoài đời; tăng tốc không đổi thứ tự cùng đầu vào logic.
- Không biến khác biệt số thành/vai trò thành nhiệm vụ bấm lặp, không khóa UX cơ bản sau research.

## 3. Bài thử trước khi gọi cân bằng

So theo giá, lương, suất, thời gian thay thế, tốc độ và mục tiêu; đổi bên/đội hình/tin; thử mới chiếm/bị vây lại, mất gốc, nâng bị đánh, quỹ bị nhiều nhóm rút, cooldown qua đổi nhánh, hàng đổi đích và save giữa hành quân.

Thử đế chế lớn đã ổn định, không chỉ mở nóng. Người chơi được phép thắng lớn. Đo active objects/events khi chạy dài; không đòi save giữ kích thước byte phẳng khi lịch sử tăng hợp lệ.

Hiện chưa có game test/mô phỏng/playtest/benchmark. Giai đoạn 2 nghiệm thu hình và hợp đồng asset, không thay các bằng chứng này.

## 4. Ràng buộc bổ sung 02

S00 có số mở đầu và giá/rate/mốc thử trong [scenario specification](prototype/scenarios/first-foundation.json); đây không phải ruleset hoàn chỉnh. Giữ mọi số với đơn vị và version, không viết đè R06. Cần hoàn thiện combat stats/damage/targeting/health persistence (CAL02/CAL03), đói (CAL10), tech/cost (CAL01/CAL04) và schema/cache/save (CAL15) trước nghiệm thu engine.

CAL02/CAL10 thêm ân hạn/phụ phí nợ biên chế; CAL11 thêm trần 4 đoàn/kingdom và vòng đời không tự hồi sinh; CAL14 thêm guard mở đầu và khoảng cách giữa quyết định. Luật cộng bonus/scope B26 đã chọn, không còn câu hỏi 160 hay 168; core hiện tại research_bonus = 0.

Bổ sung 2.2, phân biệt luật đã khóa với số chưa thử:

- **CAL05:** giá trị umbral khi đối thủ không có quỹ, giá trị Quân chế và đoàn mồi đốt cooldown chỉ đo/test; không thêm fallback damage hoặc kỹ năng khi chưa đo.
- **CAL10:** đã khóa nguyên tắc đói kéo dài phải có hao hụt hữu hạn tới hết quân; lịch/tỷ lệ cụ thể còn là cổng trước engine, không được 0% kéo dài hoặc làm tròn theo nhóm để lách.
- **CAL11:** S00 có `ai_budget` thử cho ash-crown (6 quân đặt tuyển/3600 s, không dồn quota, không viện binh nội bộ, một chiến dịch, 12 quân/sortie, garrison tối thiểu 80/20, đánh giá 300 s). Scoring/targeting/tactical rules AI vẫn là cổng trước chạy; chưa có AI triển khai. Thuế/An dân/đình chiến/Thanh tẩy/Nguyền/du mục vẫn hoãn, không là số phải hiệu chỉnh cho core.

## 5. Preset 2.3 và cổng luật riêng

[Preset nghiên cứu/kinh tế](prototype/research-economy-preset.json) là fixture hiệu chỉnh, chưa runtime. CAL02 thêm đường cap theo Doanh trại, nội suy bội 10 và hệ số cơ sở; CAL04 thêm công/giá/prerequisite nghiên cứu và công nâng, một dự án, thưởng cao nhất; CAL07 tính tải/bình quân/lịch tuyến, không mặc định hao 5%; CAL10 thêm nợ đói theo bucket và 0<ρ≤1 hồi khi đủ ăn. Giá trị cơ sở 40→32 giây và tech+60% cho 20 giây chỉ là preset; không đổi fixture S00 cũ.

Những mục sau là **cổng luật**, không phải chỉ số CAL và không gọi đã đủ bật:

| Cổng | Phải định nghĩa trước |
|---|---|
| G23-01 Bảo dưỡng quân | Nguồn vật tư có tải mọi tư thế, thiếu/tích lũy/phục hồi và chống tách/gộp; rate ngoài lương chưa bật |
| G23-02 Vận hành thành | Hậu quả/khôi phục đúng từng chức năng, hành chính theo khối lượng; không thu phí mọi nhà mặc định |
| G23-03 D1 công sự | Targeting, công phá, tiếp cận/tác dụng hỗ trợ và thời điểm hết tác dụng; β vẫn ứng viên |
| G23-04 Tải sau casualty | Xử lý overload/đứng lại/hạ tải và quyền claim salvage theo khu, không xóa/nhân hàng hoặc kho tạm vô hạn |
| G23-05 Thuế/An dân | Phân bổ dân sinh, kho cộng đồng, chi/sink, điều kiện ổn định và quyền lợi; module còn hoãn |

Chốt danh mục chi/nguồn không đồng nghĩa có state readiness hoặc cổng đã xong. Xem [resolution](reviews/2026-11-10-research-and-economy-resolution.md) về các lựa chọn cuối của coordinator sau Claude.
