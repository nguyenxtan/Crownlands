# First expedition and logistics — runtime 0.3

Ngày 10/11/2026. Theo [kế hoạch](2026-11-10-logistics-plan.md), [B31/B33](../research-and-economy.md) và fixture S00. Runtime là lát cắt BUILD-02, không gọi toàn bộ A1/S00 hoàn tất.

## Hành vi được triển khai

- Xuất quân thật tới một trong hai mỏ trống, đường BFS bốn hướng không đi xuyên site khác. Quân rời đồn trú nhưng vẫn tính gốc; lương mang theo là chuyển kho, không chi hai lần.
- Sản xuất bắt đầu sau khi tới mỏ;12 người đạt trần 300/giờ. Kho mỏ tách kho thành. Lương ở điểm đóng trả trước, hành trang bù phần thiếu.
- Rút giữa đường quay lại đúng quãng đã đi. Bản đầu dùng chính sách rút an toàn trước khi tiêu vào phần lương dành cho đường về; không kích hoạt lịch đói/hao hụt CAL10 chưa đủ luật.
- Bốn xe, tải 500 mỗi xe, đi rỗng tới mỏ rồi mới lấy hàng. Chỉ giao khi về thành; kho đầy giữ hàng và xe. Dỡ phần còn chỗ, hủy phần dư phải xác nhận và ghi sink.
- Quân về gặp kho lương đầy giữ nguyên đạo và hành trang tại thành, tiếp tục chiếm biên chế/ăn lương tại thành. Chỉ hợp quân khi dỡ/hủy hết lương; không tạo kho tạm vô hạn.
- Schema 3/ruleset foundation-0.3; kiểm schema 1/2 trước khi chuyển, giữ nguyên giá đã trả, hàng tuyển/việc nâng dở và thời gian. Lưu tuyến đi, hàng, kho mỏ, quyền giữ và ledger retired để đối soát tài sản đã tiêu.
- Bản đồ dùng dấu quân/xe nhỏ và đường đi; điều khiển tại bảng mỏ và danh sách Quân & vận tải. Các input không bị thay khi đồng hồ cập nhật. Phủ thành giữ sổ chuyển ra/nhận về; dự báo tính cả lịch quân/xe đã biết.

## Bằng chứng

**Kết quả cuối sau review:** `npm test`63/63 đạt; `npm run test:e2e`56/56 đạt (gồm 5 ca hành quân/vận tải mới và regression vị trí cuộn); `npm run build`59 file, cache`7568a7cb87628170`. App và dist trùng byte. Giữ nguyên server PID17808 và URL127.0.0.1:4173. S00 và ba JSON asset contract khớp hash trước sửa.

Đã kiểm test-first:11 ca field RED→GREEN;6 ca storage ban đầu RED→GREEN rồi bổ sung kho lương đầy; forecast ngưỡng kho 42240→43449 giây; hai regression sau review về bản lưu đúng mốc dự trữ; browser xác nhận heading mỏ xuất hiện trong viewport sau khi chọn. Ảnh QA desktop/mobile ở/tmp; không thêm asset sản xuất.

**Review độc lập:** `/root/logistics_review` kiểm 3.000 trạng thái hành động hợp lệ và 480 mốc gọi rút trước khi tới mỏ; đối chiếu bước dài với đoạn 17 giây, save/restore và trường hợp cả 4 xe bị kho đầy. Một lỗi quan trọng đã được tái hiện: import có quân “đang khai thác” đúng mốc bắt buộc rút có thể làm vòng dự báo không tiến. Đã từ chối trạng thái nhập không chuẩn và cho `advanceGame(0)` giải quyết sự kiện an toàn ngay mốc hiện tại; hai ca mới thấy lỗi trước sửa rồi đạt, cùng toàn bộ suite sau sửa. Reviewer không chạy trình duyệt; phần đó do coordinator kiểm. Không có lượt re-review hoặc playtest người thật.

[Ledger](logistics-progress.md) ghi các lựa chọn của coordinator và phạm vi được gác lại. Các giới hạn bên dưới là ranh giới của lát cắt, không là ca kiểm đã đạt cho toàn bộ game.

## Giới hạn

Một đạo phụ trách mỗi mỏ, chỉ kiếm/giáo/cungI; chưa đổi số tuyển theo cấp Học viện, chưa trinh sát chủ động, xây trại, tiếp viện/chia quân, giao chiến/AI/chiếm thành hoặc starvation attrition. Chưa kiểm chứng cân bằng/độ vui bằng playtest người thật. Không sửa S00, tài liệu tham khảo, asset sản xuất, port hay dữ liệu của trình duyệt người dùng trong kiểm thử.
