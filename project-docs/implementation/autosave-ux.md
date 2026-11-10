# Autosave clarification · 2026-11-10

Theo phản hồi màn hình làm người chơi tưởng phải bấm “Lưu nhanh”, đưa trạng thái tự lưu lên thanh trên, đổi nút thành “Quản lý bản lưu”, chuyển thao tác tạo mốc lưu nhanh vào trong hộp quản lý. Game vẫn dùng nguyên cơ chế hiện có: giữ phiên mỗi giây, lưu khi thao tác và rời game, năm mốc auto luân phiên. Không đổi định dạng hay dữ liệu bản lưu.

Trạng thái “Đã tự lưu” chỉ hiển thị sau ghi thành công; lỗi ghi hiện “Không lưu được”, trường hợp nhiều cửa sổ hiện tạm dừng. Mốc nhanh/thủ công giúp quay lại một thời điểm, không phải điều kiện để giữ tiến trình. Hộp quản lý giải thích rõ và làm mới ngay danh sách sau khi tạo mốc nhanh.

Kiểm chứng: 19/19 unit, 9/9 browser flows; gồm tự lưu công việc đang chạy mà không bấm lưu, reload giữ tiến trình, lỗi quota không báo lưu thành công và mốc nhanh vừa tạo tải được ngay. Hai ca trạng thái mới thất bại trước khi triển khai; ca danh sách mốc nhanh thất bại trước khi bổ sung refresh. 1440 và 390 px không tràn ngang; đã kiểm ảnh giao diện. Server vẫn dùng http://127.0.0.1:4173, PID dịch vụ không đổi trong lần cập nhật.
