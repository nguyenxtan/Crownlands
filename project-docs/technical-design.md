# Thiết kế kỹ thuật offline

Phiên bản 2.3 · 10/11/2026. Đặc tả hiện hành theo B01/B02/B10/B12. Có subset kinh tế/tuyển nền 0.2; đặc tả đầy đủ, nghiên cứu/hậu cần/combat 2.3 chưa được triển khai hoặc benchmark. Giữ R03 để tra các bất biến, không kế thừa server nhiều người.

## 1. Kiến trúc tối giản

Một bộ máy mô phỏng cục bộ quyết định trạng thái hợp lệ; UI nhập lệnh và hiển thị. Khóa triển khai web offline desktop. Mô phỏng chạy cục bộ tách UI; lưu cục bộ có transaction và export/import theo B02. Chọn thư viện/framework/schema cụ thể khi vào code, không làm thay camera/asset. Không có yêu cầu đăng nhập, API máy chủ, PostgreSQL, Cloudflare, queue cloud hoặc daemon online.

Tách luật, lệnh/sự kiện, state, controller, UI và lưu. Mọi phe dùng cùng kiểm tra vật chất/thời gian/tầm nhìn; khả năng và nguồn biên chế khác theo loại tổ chức phải được khai báo. Không cấp cap du mục cho người chơi hoặc quân mất căn cứ. Hình vẽ/framerate/giờ hệ điều hành không quyết định kết quả.

Luật phân biệt chủ để mô phỏng đúng, không nhằm chống người sở hữu bản game sửa save. Hosting bản web để tải/cài không đồng nghĩa thế giới chạy khi đóng trình duyệt.

## 2. Đồng hồ và số học

Một đơn vị logic nguyên: giây mô phỏng; phần lẻ tài sản dùng fixed-point. Tốc độ chỉ đổi tỷ lệ tiến của game so với giờ thực. Thời điểm tạo file lưu có thể là thời gian đời thực nhưng không là đồng hồ kinh tế.

Tính sản xuất/tiêu thụ theo đoạn trước/sau thay đổi: mỗi kho/tài nguyên lấy net = sản xuất − chi liên tục rồi clamp [0, cap], tách đoạn khi đổi rate/quyền hoặc chạm 0/cap (B26). Giữ phần lẻ bằng số nguyên có hệ số hoặc kiểu chính xác, giới hạn tràn; ở cap không lưu phần tràn. Mốc chạm nằm giữa hai giây thì event dùng tick nguyên đầu tiên tại hoặc sau mốc (ceil), mọi tốc độ như nhau; không mở đồng hồ thứ hai. Kho nâng/thưởng đổi lúc T không hồi tố cho đoạn trước T.

Đóng game không chạy bù thời gian ngoài đời theo B02. Không diễn giải “thế giới lâu dài” thành tiến trình bắt buộc chạy nền.

## 3. Lệnh và bước nguyên tử

Lệnh gồm actor, thực thể, ý định, mốc/pha và số thứ tự. Kiểm tra chủ/điều kiện trước áp dụng; một lần áp dụng tạo thay đổi quân/hàng/lịch/sổ đồng bộ. Nếu lỗi, giữ trạng thái trước đó thay vì dở dang một nửa.

Không cần mô phỏng khóa SQL/API nhiều người. Vẫn cần đánh dấu hiệu ứng/công việc đã hoàn tất để tải lại không cấp lần hai, và không để UI gửi hai thao tác cho một lần bấm ngoài ý muốn.

Lệnh được nhận ở cửa lệnh/điểm an toàn. Tải không chạy lại lệnh đã commit. Save có schema version, ghi nguyên vẹn, ba manual slot / quicksave / năm autosave và export/import theo B02. Chi tiết serialization/migration được kiểm ở CAL15 khi lập trình.

## 4. Thứ tự cùng mốc đã chọn

Đây là thứ tự **CHỐT TRIỂN KHAI v 2.0** cho O10, thay mẫu R03 §4.3. Là quy ước của ruleset, phải test hệ quả; đổi thứ tự cần bump ruleset và xem migration save.

| Pha | Tác động |
|---|---|
| 1 | Hoàn tất nghiên cứu, rồi công trình, rồi tuyển/nâng |
| 2 | Quân tới, giao chiến tại địa điểm, cập nhật kiểm soát |
| 3 | Hàng tới, kiểm tra chủ/cổng/quyền nhận |
| 4 | Thiếu lương theo preset, tạo lại lịch cần thiết |
| 5 | Kiểm tra/hoàn tất tiếp quản nếu còn đủ điều kiện |
| 6 | NPC đánh giá và tạo lệnh hợp lệ |
| 7 | Cửa lệnh người chơi, lưu/tải ở điểm an toàn |

Trong pha dùng thứ tự ổn định theo loại/sequence đã lưu; không theo thứ tự vẽ hay số frame. Sự kiện phát sinh tại cùng mốc có quy tắc pha tiếp theo, không lùi lại pha đã commit hoặc sinh vòng vô hạn không tiến thời gian.

Job nâng xong ở pha 1 thì quân đánh bậc mới tại pha 2; tech mở không tự nâng quân. Viện binh thắng tại pha 2 có thể chặn tiếp quản pha 5. Cargo cùng mốc nhận theo kiểm soát sau giao chiến. Các hệ quả này phải hiện trong test và tài liệu preset.

AI có pha riêng không đồng nghĩa ưu tiên pause. Pause không chen lệnh trước nhóm đang thực thi. Giữa hai nhóm có thể dừng tại mốc mới rồi ra lệnh; đó là đầu vào khác, có thể cho kết quả khác.

## 4.1. Trận lồng trong pha giao chiến

Năng lực theo [đặc tả chiến đấu](combat-abilities.md) chạy theo lượt bên trong pha 2; trận commit nguyên tử trước cửa lưu. Hiệu ứng chỉ trong trận ở lát cắt, còn `ability_ready_at`/khóa hồi theo thời gian thế giới được commit cùng trận và lưu.

Hai lượt trận không tự làm thế giới trôi hai ngày. Đoàn tới xét ở pha 2, hàng pha 3, quyết định mission pha 6; nhiều trận cùng mốc theo sequence đã lưu, trận sau đọc mốc hồi đã commit của trận trước. Không gọi ability tick theo framerate.

Hồi tới hạn chỉ cần kiểm tra mốc, không bắt buộc thêm event. Nếu mở hiệu ứng ngoài trận hoặc lưu giữa lượt sau này, phải thêm ActiveEffect/migration rõ, không suy từ mô hình nguyên tử là có thể bỏ trạng thái đó.

## 5. Phạm vi tất định

Cùng bản lưu, ruleset/config, trạng thái ngẫu nhiên nếu có và cùng lệnh ở cùng mốc/pha/thứ tự thì cần cùng kết quả bất kể tốc độ. Không hứa kết quả giống khi người chơi ra lệnh ở mốc khác hoặc sau khi đổi luật/phiên bản.

Dự báo đọc snapshot/tình báo hợp lệ, không sửa trạng thái hoặc tiến PRNG thế giới. Nếu có ngẫu nhiên, lưu nguồn/luồng và thứ tự sử dụng; không gọi random theo framerate. Chưa có benchmark hoặc bằng chứng đồng nhất đa nền tảng.

## 6. Hợp đồng dữ liệu logic

| Nhóm | Dữ liệu/ràng buộc chính |
|---|---|
| Save/World | world id, seed, game time, ruleset/config, sequence và trạng thái ngẫu nhiên |
| Faction/Empire | Chủ người/NPC, khuynh hướng và ngân sách có nguồn; không Account online |
| FactionRelation | Quan hệ theo cặp phe; không suy từ path hoặc tên đạo đức |
| Settlement | owner/version, nguồn tạo, cấp Phủ cho hiển thị hành chính, vị trí, kho/công trình |
| Control/Capture | bên giữ ngoại thành, thủ quân thực, job tiếp quản, mốc và version |
| Recovery | phục hồi riêng theo B12, không che trạng thái bị vây |
| ResourceSource/Site | vị trí bảo vệ/kiểm soát, rate/trần và kho; core không chu kỳ cạn/hồi |
| UnitCohort | owner, line, tier, path, count, gốc, vị trí/job, các bucket sẵn sàng; không gộp mất mốc hồi |
| BattleAbility | ID/version/trigger/target/limit/stack/duration/cooldown; quỹ chung trong trận và khóa hồi được lưu |
| Capacity | suất hiện hữu/giữ theo gốc và sức chứa nơi đóng tách biệt |
| ResearchProject | faction, tech, academy, chi đã trả, yêu cầu chụp, công còn lại, mốc/version; core không giữ raw |
| UpgradeJob | cohort/số còn hợp lệ, bậc nguồn/đích, cơ sở, chi phí, suất tăng giữ, lịch |
| Movement/Shipment | chủ quân/hàng, nguồn/đích, ETA, trạng thái; không tồn tại hai nơi |
| Inventory / ArmyPayload | owner/location kind=site/army/shipment/custody, raw count/cap/access;không đếm một raw hai vị trí |
| HungerBucket | nợ theo phần quân/lineage, nhu cầu/paid/unmet, công hồi, giữ qua tách/gộp/load |
| MobileMission | Thành phần của Army: role/goal/site list/stop/commit/abort/version; không copy quân |
| CapacitySource | home/pending theo B07; mobile hoãn, trữ nguồn/xe/ngân sách; không cap vô hạn |
| Camp/Policy | kho, quân, xe, tuyến, ngân sách và quyền theo phiên bản |
| Intel/Report | quan sát được, timestamp, phạm vi; không gửi bí mật như dữ liệu UI đã che |
| ScheduledEvent/Effect | logical time, phase, sequence, type, entity/version, mã tác động |
| AssetLedger | tạo mới/chuyển/tiêu theo nguồn, lượng, lý do và effect |

Army chứa nhiều cohort khác gốc/bậc/nhánh/hồi. Gộp giữ các bucket, không lấy mốc sớm nhất cho tất cả. MobileGroup là view/component nhiệm vụ của Army, không bản sao lực lượng. Profile tách line/tier/path và version. Đây chưa phải schema/code. Mỗi nguồn sản xuất có khu kiểm soát; mỗi nguồn đoàn có lý do và ngân sách, không chỉ tọa độ ngoài tầm nhìn.

## 7. Bất biến kế thừa

Giữ mã/ý nghĩa I01–I12 của R03, diễn đạt theo mô phỏng offline. Chúng là mục tiêu kiểm thử, chưa có phần mềm chứng minh.

| Mã | Nội dung |
|---|---|
| I01 | Khả dụng không âm; khoản giữ không vượt số dư hợp lệ |
| I02 | Quân chỉ tạo bởi nguồn được định nghĩa/ghi rõ |
| I03 | Quân chết không hồi sinh khi lặp hiệu ứng/tải lại |
| I04 | Tài sản có một chủ tại một phiên bản |
| I05 | Một xe không cùng lúc nhận hai chuyến |
| I06 | Hàng không vừa ở nguồn, đang đi và ở đích |
| I07 | Quyền tái lập dùng một lần |
| I08 | Event cũ không ghi đè phiên bản mới |
| I09 | Biến động có nguồn/lý do đối soát |
| I10 | Actor không điều khiển tài sản khác chủ ngoài luật |
| I11 | Trận dùng đúng phiên bản luật đã ghi |
| I12 | Quan hệ/giao dịch không tự sinh quyền quân/kho chung |

## 8. Ràng buộc hiện hành

| Mã | Nội dung |
|---|---|
| N01 | Đi xa/tách/gộp không giải phóng hay tạo suất ngầm |
| N02 | Giữ suất chuyển sang hiện hữu đúng một lần |
| N03 | Mất thành không tự chuyển/xóa quân của chủ cũ |
| N04 | Khai thác có nguồn/trần theo cấu hình; hàng vào kho một lần |
| N05 | D25 cộng và không lặp, không vượt 20/20/40 |
| N06 | Quyền vùng không tự trao quyền tài sản khác chủ |
| N07 | Đổi đô không nhân cấp/kho/quân/quyền tái lập |
| N08 | Không gán đổi ngầm cấp công trình/bậc quân/hạng mục tiêu |
| N09 | Tạo mới tài nguyên/quân NPC và hỗ trợ có nguồn |
| N10 | Tình báo có mốc; dự báo không đọc bí mật hoặc làm đổi thế giới |
| N11 | Nâng chỉ đổi bậc quân còn sống/hợp lệ, không tăng count |
| N12 | Tổn thất/hủy/nâng xong cập nhật job/suất/hoàn đồng bộ, không giấu quân |
| N13 | Knowledge/project có chủ; capture academy không copy công nghệ ngầm |
| N14 | Pause/đóng/tải không cấp sản xuất theo giờ thật ngoài preset đã chọn |
| N15 | Một profile/nhánh hiệu lực mỗi phần quân; đổi nhánh không hưởng đôi hoặc tạo quân |
| N16 | Tách/gộp/nâng/đổi nhánh/tải không làm mốc hồi sớm hơn hợp lệ hoặc nhân lượt dùng |
| N17 | Quỹ bảo hộ dùng chung được trừ một lần; cùng bố trận/sẵn sàng không tăng quỹ vì chia nhóm |
| N18 | Đoàn có nguồn quân/hàng/xe/cap; mất gốc không tự cấp mobile capacity |
| N19 | Phe/nhánh/quan hệ tách biệt; controller không đọc bí mật để đuổi mục tiêu |
| N20 | Mission/event cũ vô hiệu không tạo quân/hàng hoặc vòng việc vô hạn; cleanup không xóa tài sản sống |

Ràng buộc có tính năng chưa chọn chỉ áp khi bật tính năng đó. Không dựng test giả dựa trên tên bảng để tuyên bố cân bằng.

## 9. Lưu, khôi phục và migration

Lưu ở ranh giới nguyên tử, không giữa nhóm/trận của preset. Save gồm state/lịch/lệnh, dự án/cohort/path/bucket hồi, khoản giữ/quyền, mission/hành trình/stop/abort, quan hệ/tình báo/ngân sách, ruleset/config/PRNG. Hiệu ứng trận kết thúc trước save ở lát cắt, nhưng cooldown không mất. Không chỉ lưu hình cảnh hoặc tổng số.

Ghi bản mới nguyên vẹn rồi mới thay bản hiện hành; lỗi thì còn bản trước. Giữ tự lưu luân phiên và export/import dự phòng theo B02. Không hứa lưu trình duyệt vĩnh viễn; cần thử restore, phiên bản và migration của runtime web offline khi vào code.

Đổi luật không tự diễn giải save cũ bằng profile mới. Cần migration có phiên bản hoặc từ chối có giải thích, không làm mất save âm thầm. Không cần chống người chơi load để thử chiến thuật.

## 10. Hiệu năng

Không cập nhật mọi thành theo từng frame. Tính theo mốc thay đổi và sự kiện cần thiết; khi tua xa vẫn xử lý đủ các biến động có ý nghĩa, có thể chia khối để UI phản hồi. Tránh chuỗi cùng mốc vô hạn.

Mỗi đoàn có tối đa một bước mission đang hiệu lực cho một phiên bản; lịch đói/khác vẫn cần xử lý đúng mốc. Đo đối tượng/event sống và tăng trưởng lịch sử; không đòi save byte phẳng hoặc xóa quân để dọn.

Mục tiêu API p 95 500 ms, event wall-clock 5 giây và RPO/RTO server của hồ sơ online không còn là cổng bản offline. Thay bằng đo độ phản hồi thao tác, thời gian xử lý khi tua nhiều ngày, kích thước save và restore trên cấu hình máy công bố. Chưa có ngưỡng đo đạt.


## 11. Hợp đồng với asset và phạm vi hạ tầng

Tài sản gameplay tham chiếu ID trong roster/manifest, không dựa tên file Việt hoặc số frame. Layout là 14 slot +16 plot, sprite không quyết định quyền/lương/combat. Màu/nhãn/selection/fog là lớp runtime; kích thước/anchor từ manifest, không đoán lại theo ảnh.

Giai đoạn code cần cache bộ ứng dụng và asset đã chọn để chơi sau khi cài/tải; nếu thiếu asset báo rõ, không giả vờ offline hoàn chỉnh. Save cục bộ có thể bị người dùng/trình duyệt xóa nên chức năng export là đầu ra thật phải thử, không hứa bền vĩnh viễn. Không cần tài khoản cloud hoặc DB server. Có thể host bản tải web tĩnh sau; đó không là mô phỏng thế giới 24/7.

Các mục I01–I12 và N01–N20 là tiêu chí cần triển khai/kiểm, chưa được chạy. CAL15 quản lý serialization, storage transaction, schema migration và hiệu năng; không chặn chốt art contract. Không xây backend/hạ tầng online như tiền đề cho asset.

## 12. Bổ sung 02: gói offline và dữ liệu thử

Bộ cài/cache cần manifest phiên bản và đủ JS/CSS/ảnh/chữ/dữ liệu scenario/ruleset bắt buộc cục bộ. Được tải lần đầu để cài, nhưng session chơi phải khởi động bằng bộ cục bộ đã kiểm khi ngắt mạng; không lấy font/CDN/LLM/API ngoài làm dependency ngầm. Cập nhật staged: kiểm đủ gói mới rồi chuyển version, lỗi giữ gói/save trước; không trộn ruleset/schema/asset version ngẫu nhiên. Khi chưa đủ file, báo chưa cài xong hoặc dùng placeholder đã đóng gói, không giả vờ offline đầy đủ.

[S00 specification](prototype/scenarios/first-foundation.json) chưa là save hoặc schema runtime; chuyển sang dữ liệu game phải có validator, unit/rate/cap/owner/site references và kiểm đường đi. Combat/đói/tech đầy đủ vẫn là cổng trước chạy. Không lấy việc JSON parse hoặc có bridge là bằng chứng AI/chiến đấu chạy được.

Các trận cùng timestamp dùng sequence đến đã lưu và luật B23, không iteration collection; assault sau thắng outer holder là lệnh mới với phase/sequence mới, không chèn vào nhóm đã commit. Pathfinding không transit ô site trừ start/đích. Sát thương trong round theo snapshot B25, phần dư hấp thụ theo stable claim key; tiền lương do nợ cap B24 cùng ledger, khóa đợt (owner, nguồn gốc), không double-charge khi load. B26 ledger tách production/paid upkeep/overflow/unmet. Tài sản `dormant` B27 không có event poll. Expected outcomes BS-T01–BS-T13 và RV21-01–RV21-15 ở [prototype readiness](prototype-readiness.md) chưa có test engine.

## 13. Hợp đồng 2.3 trước engine mở rộng

B29 lưu công huấn luyện bằng số nguyên có hệ số/hữu tỷ. Giữ phần dư lũy kế qua người/job đã xếp; tick ceil của mốc lũy kế, không làm tròn mỗi người hoặc frame. Integrate tới Ttheo rate cũ trước khi commit research/công trình tại T; rate mới từ T. Phân bổ tài nguyên/site stock theo stable claim, không iteration Army.

B30 chi trước atomically vào ledger/job/cap. Hủy không tự credit raw đã tiêu; chưa có reservation nguyên liệu trong core. Inventory Army không phải Shipment; site/hành trang cùng trả phần nhu cầu theo B31 mà không double-charge. Đi/đến/chết thay nguồn ở đúng mốc; giữ bucket nợ theo B32, không bình quân. Cargo dỡ một phần rồi giữ phần dư, claim/discard cần actor/quyền/version và bút toán đối ứng.

B33 chưa bật maintenance/readiness và hao hụt mặc định. Thêm cổng luật trước bật theo [sổ hiệu chỉnh](calibration-register.md); không bắt runtime cũ thêm state 0 và không hứa khỏi migration về sau. D1 vật tư một lần cùng commit trận, không lưu trạng thái “đã trừ, chưa đánh”.

S00 design 2.2 và save schema 2/foundation-0.2 còn là phiên bản riêng. Đợt docs này không migrate save cá nhân, không thay app và không gọi tests subset là bằng chứng research/AI/cargo. Khi triển khai cần giữ bản cũ/validator và test các caRE23 ở [validation 2.3](prototype/research-economy-validation.json).
