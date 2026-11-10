# Hệ thống và cân bằng — baseline

Phiên bản 2.3 · 10/11/2026 · Theo [bản chốt](final-design.md).

## 1. Kinh tế và tài sản

Bốn tài nguyên: gỗ, đất sét, sắt, lương. Mỗi thành, trại và điểm khai thác có kho riêng; chuyển hàng cần xe/hành trình thật. 16 ô ngoại thành, bốn mỗi loại, cấp 0 khi rỗng và tối đa 20. Không lấy sản lượng 18 ô hoặc `field_cap=10` từ XLSX cũ làm cấu hình v 2.0.

Sản xuất và tiêu thụ tính theo đoạn trên đồng hồ game; thay cấp/quyền/bonus ở mốc nào chỉ ảnh hưởng từ đó. Kho có trần, không cho số dư âm hoặc sinh phần vượt kho thành tài sản ẩn. Lương đi theo nơi đóng/nguồn đang có, không rút ngầm ở thủ đô.

Khai thác world cần quân thực, quyền giữ, trần năng suất và kho/xe/lương. Không cho thêm quân tăng thu nhập vô hạn. Bản lõi không có chu kỳ cạn/hồi; CAL08 hiệu chỉnh ngưỡng bão hòa và công suất. Quân vẫn tồn tại khi đổi công việc, không được tính khai thác ở hai nơi cùng mốc.

## 2. Quân, suất và nâng

[Quân và nghiên cứu](military-and-research.md) khóa dòng/bậc/nhánh. Hạn mức theo suất có trọng số ở thành gốc; sức chứa địa điểm và khả năng nuôi tách riêng. Ra ngoài không trả suất. Job tuyển giữ suất từ đầu; nâng giữ phần tăng, không tạo thêm đầu người.

Quân đang nâng còn là thủ quân, đánh bậc cũ và chịu tổn thất; không giấu quân trong hàng đợi. Mất gốc không đổi chủ hoặc xóa quân, không tự tạo suất mobile. Nghiên cứu mở kiến thức/hiệu suất đúng phạm vi, không tự trang bị lại quân.

## 3. Trại, vận tải và dự báo

Trại không tự sản xuất, phòng thủ yếu hơn thành. Xe có tải và chu kỳ cả đi lẫn về. Tuyến đặt nguồn/đích/dự trữ/xe/ngân sách; báo khả năng đáp ứng theo giờ game, mốc thiếu lương và ETA. Không tự chọn mục tiêu hay mở chiến tranh.

Hàng tới kiểm quyền và cổng theo trạng thái hiện tại. Nếu không giao được: về nguồn một lần; nguồn không còn hợp lệ thì tìm nơi cùng chủ đủ điều kiện, không có thì giữ đoàn kẹt và thông báo. Không quay vòng miễn phí, xóa hàng hoặc dịch chuyển vào kho khác.

## 4. Giao chiến, tiếp quản và phục hồi

Auto battle 3 ×3, tối đa 12 lượt preset đầu, cùng dòng giữ K theo B11. Năng lực hữu hạn không phá đối sách cơ bản. [Đặc tả năng lực](combat-abilities.md) tách hai đồng hồ và dùng quỹ chung.

Giữ ngoại thành chỉ cắt nguồn gắn thật với vùng đó; không xóa kho hoặc cắt nguồn nội thành còn được bảo vệ. Tiếp quản cần hết garrison đối kháng, đủ lực giữ/lương, giữ ngoại thành liên tục. Mất điều kiện hủy job về 0. Hoàn tất đổi chủ đúng một lần, kho/công trình ở lại, quân chủ cũ giữ chủ.

Phục hồi sau chiếm là trạng thái riêng, không miễn tấn công; đóng góp được phục hồi theo lịch CAL09. Không tự thêm thanh An dân trong core. Đại thành thưởng theo B17, không cộng nhiều nguồn vượt trần. Mất/thêm quyền tại cùng mốc dùng thứ tự [kỹ thuật](technical-design.md).

## 5. Hiệu chỉnh sau khi có prototype

Các nhóm CAL01–CAL15 trong [sổ hiệu chỉnh](calibration-register.md) quản lý giá, thời gian, stats, trọng số, đói, rate, AI và nhịp. Không có bảng cân bằng mới đã kiểm chứng. Khi tạo ruleset cần ghi đơn vị và đủ vốn đầu để đi được vòng lõi, không để người chơi mắc kẹt chờ một binh sĩ đầu tiên.

Đo cả chi phí biên so với ở nhà, lựa chọn theo ngân sách/suất/lương, quân thấp ở nền kinh tế trưởng thành, đế chế lớn ổn định và trường hợp mở rộng nóng. Quyền thắng của người chơi không phải lỗi phải sửa bằng spawn bí mật.

## 6. Bổ sung 02: một pipeline kinh tế

Theo B26 trong [prototype readiness](prototype-readiness.md), mọi bonus hợp lệ cộng trên cùng base sau control/recovery: `rate = base × availability × recovery × (1 + research + great_empire + great_region)`. Core hiện tại research = 0 tới khi ruleset có tech kinh tế. Great riêng tối đa 20/20/40 và chỉ cho ô sản xuất thành cùng chủ. Fixture base 100 +Great 40% +research 20% =160, không 168. Mỏ không nhận Great; tech chỉ áp đúng scope.

Kho tính net = sản xuất − lương/phụ phí liên tục theo đoạn rồi clamp [0, cap]; tách đoạn khi chạm 0/cap hoặc đổi rate/quyền. Ở cap chỉ bỏ phần net dư thật; ledger tách production/paid upkeep/overflow/unmet. Kho đầy 6000, +400/−52 cho 6000 dù chia 1/2/4 đoạn (phép tính tham chiếu, không phải engine test).

Kho/lương/vận tải là các bước tài sản riêng, không cộng thuế để tạo lại sản lượng đã cấp. Thuế/An dân chưa bật, không dựng kho dân sinh hoặc chồng debuff trong core. Khi thêm chúng phải version pipeline và kiểm sổ nguồn/chuyển/tiêu. Nợ cap sau ân hạn là expense tại nơi đóng theo B24, không giảm sản lượng đồng thời lần nữa.

## 7. Sổ thu–chi và nguồn nuôi 2.3

B30 chọn trả đủ trước cho đầu tư tại mốc nhận lệnh; khoản “chi trong giờ” là các lần chi thực, không rate trừ mãi. Core không có reservation nguyên liệu; suất đang giữ khác raw đã chi. `reserved`nếu mở sau là phần con của on_hand, không cộng thêm vào tổng. Dự trữ sàn chỉ policy, không kho.

Theo B31, tách on_hand ở site, inventory Army và Shipment. Mỗi quantum khẩu phần chỉ trả một lần: site cùng chủ có quyền truy cập trước, hành trang bù thiếu, không nuôi từ gốc xuyên tuyến. Kho chung phân bổ theo nhu cầu/key ổn định. Hàng pha 3 dỡ theo chỗ trống từng loại; dư ở trên xe, theo B12 hoặc kẹt/hủy có ledger. Không mất raw ngầm hoặc cho outer holder lấy kho nội thành.

Đói theo bucket B32: không reset/bình quân khi gộp. Theo B33, chi bảo dưỡng/bảo trì/hành chính/hỏng lương chưa bật; không áp số 1320 quânIII/hao 5% xe vào core. Khi bật phải có nguồn và hậu quả, không chỉ vài tỷ lệ. Xem [đặc tả khép luật](research-and-economy.md) và [resolution](reviews/2026-11-10-research-and-economy-resolution.md).
