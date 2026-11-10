# Bổ sung 02 — đối chiếu luật và chuẩn bị prototype

Phiên bản 2.3 · 10/11/2026 · Đối chiếu U10 với [baseline](final-design.md); khép luật nối sau [Claude review 2.1](reviews/2026-11-07-supplement-02-claude-review.md) theo [resolution 2.2](reviews/2026-11-10-supplement-02-resolution.md).

U10 là danh mục kiểm tra hữu ích, **không phải lệnh hủy các lựa chọn của v 2.0**. Những cơ chế đã chốt vẫn là yêu cầu thiết kế; game/asset chưa có kết quả triển khai được xác nhận. Codex chọn các luật nối B23–B28 theo ủy quyền U09, ghi riêng số thử; không gán mọi phương án mới thành ý đã được người dùng/Claude duyệt. Bản 2.2 tiếp thu review C09; các chi tiết sửa là lựa chọn coordinator Codex (C10), không phải reviewer đã đồng ý trước.

## 1. Kết sổ từng mục BS

| Mục nguồn | Đối chiếu hiện hành | Xử lý 2.2 |
|---|---|---|
| BS-01 Khởi đầu | Thiếu scenario cụ thể | S00 `first-foundation` 0.2-draft: một vị trí dựng sẵn, quân thường, tài sản có nguồn, thêm `ai_budget` thử cho ash-crown. Số là preset thử. |
| BS-02 Thắng/tiếp tục | B15 đã cho Khai Quốc/Thống Nhất và tiếp tục | Khóa kiểm theo danh sách mục tiêu scenario, không săn hết tàn quân hoặc bí mật sinh phe. |
| BS-03 Bản đồ | B03 đã chọn ô vuông 64²/128² | Ô site không cho transit; metric khám phá/tầm nhìn Manhattan; sông S00 giữ y 4–59, cầu là đường tắt. Chưa bật du mục. |
| BS-04 Ngoại giao | B13 chỉ trung lập/thù địch | B23 bổ sung quyền đi/đến, holder trống, bên đến trung lập với holder và assault tách lệnh. Không mở giao thương/đình chiến/đầu hàng. |
| BS-05 Thuế/An dân | B18 đã hoãn | Không thêm kho dân sinh, tỷ lệ thuế hoặc hình phạt An dân trong core. Giữ nguyên tắc không tạo hai lần. |
| BS-06 Gốc/nâng | B07/B08 đã xử phần lớn | B24: khóa đợt nợ theo nguồn gốc ban đầu, job pause trả suất tăng và resume có kiểm. |
| BS-07 Trộn nhánh | B08/B10 đã cho trộn, quỹ hữu hạn | B25 hỗ trợ cùng chủ/tuyến bất kể path; giá trị umbral/martial và bait cooldown là đo CAL05. |
| BS-08 Thứ tự năng lực | B09/B10 và combat-abilities đã có | B25 thêm phân bổ phần dư theo lượng damage/hấp thụ và mốc hết hạn quỹ; không làm tròn số chết chung giữa profile. |
| BS-09 Bonus kinh tế | B17 mới khóa riêng Đại thành | B26 cộng cùng base; tích phân kho net-rồi-clamp theo đoạn; `research_bonus = 0` trong core hiện tại. |
| BS-10 Vòng đời NPC | B14 cấm nguồn/cap miễn phí, chưa đủ trạng thái kết thúc | B27 thêm hao hụt đói hữu hạn, trạng thái `dormant` cho tài sản không quân/không đích, site trống về custody thế giới. |

## 2. B23 — Quyền tương tác và nhiều phe

Core giữ **neutral/hostile**. **Ô thường** đi được với mọi phe, kể cả màu lãnh thổ phe khác; không có collision, Army/đoàn trung lập không chặn Army hoặc xe khác, và không có trận trên đường. Màu đất không tự sinh phí hay vùng sát thương.

**Ô site** (thành, trại, mỏ, trại tiền phương) **không dùng để transit**: pathfinding chỉ được vào ô site là điểm xuất phát hoặc đích hợp lệ của hành trình, các ô site khác phải đi vòng. Tới site không có quyền vào thì dừng ở ô tiếp cận hợp lệ; không có ô tiếp cận đi được thì giữ vị trí và báo.

Điểm tài nguyên vô chủ được chiếm giữ bằng quân hợp lệ có lương; quyền thuộc site, không tự chiếm mọi ô xung quanh.

Muốn đánh/chiếm một site thuộc phe trung lập phải xác nhận tuyên chiến trước khi xuất lệnh. Quan hệ hostile theo cặp và hai chiều tại cửa lệnh; không tuyên chiến với toàn bộ NPC. Không tấn công đoàn xe giữa đường; hàng chỉ gặp cổng/quyền nhận tại site. Giao thương/đình chiến/đầu hàng có điều khoản tiếp tục hoãn.

### 2.1. Nhiều bên cùng đến

Các Army tới cùng site cùng mốc được gom vào nhóm giao chiến của pha 2, xét theo **sequence đến** đã lưu, không theo FPS/iteration map. Vai trò luôn tách: **chủ thành**, **garrison** của chủ thành và **bên giữ ngoại thành** (outer holder) với thành; **holder** với mỏ/trại. Mỗi trận chỉ giữa hai chủ.

1. Bên đến hostile với holder/outer holder hiện tại thì đánh bên đó. Thắng và đủ điều kiện lực giữ/nuôi B12 thì thay holder; garrison của chủ thành không bị đụng tới.
2. **Không có holder:** bên đến có sequence sớm nhất và đủ điều kiện lực giữ/nuôi/quyền trở thành holder ứng viên; các bên đến sau xét với ứng viên đó theo bước 1 hoặc 3. Không đủ điều kiện thì bỏ qua bên đó và xét bên kế tiếp.
3. Bên đến trung lập với holder thì dừng ngoài. Hai bên đến thù nhau nhưng đều trung lập với holder **không đánh nhau ngoài site**.
4. Các bên cùng chủ có thể tập kết nếu không đang đi/job; chủ khác không gộp quân dù cùng địch.
5. Thành có garrison mà chưa có outer holder: bên đến có thể giành ngoại thành theo điều kiện lực giữ B12; garrison vẫn tách riêng. Khi garrison chủ động xuất/rút, outer holder chọn chặn/để ngỏ theo B12; bị chặn thì giao chiến ngoài tường. Chính sách này không ép thủ quân xuất thành khi bị assault.
6. **Không tự chain:** thắng outer holder không tự đánh garrison trong cùng arrival. Muốn công thành phải ra **lệnh assault riêng** tại cửa lệnh kế tiếp, sau khi nhóm pha đã commit. Lệnh mới có phase/sequence mới, không tái xử arrival và không chèn ngược vào nhóm đã commit. Còn garrison đối kháng thì tiếp quản không chạy.
7. Quân bị tấn công luôn phòng thủ; được xuất qua cổng nếu hợp lệ.

Sau mỗi trận, trận tiếp theo đọc lực lượng/kiểm soát/cooldown đã commit. Thứ tự tuần tự **có thể lợi cho bên đến sau**, vì bên đó đánh một holder đã yếu, không chỉ lợi người đến trước. Báo cáo phải hiện chuỗi trận và lý do từng bên dừng ngoài; ca kiểm thử đổi sequence. Không gọi đây là trận ba phe đồng thời.

### 2.2. Hai bên cùng chết, site trống, trại địa phương

Cả hai bên chết hết tại thành: không có outer holder, chủ thành vẫn giữ tới khi một job tiếp quản hợp lệ hoàn tất; không có người thắng tưởng tượng; job mất điều kiện về 0. Pha hàng đọc kết quả cuối của toàn nhóm giao chiến cùng mốc.

Mỏ hoặc trại địa phương mất/rút lực giữ cuối thì trở về **unclaimed**. Kho còn ở site, không chuyển thẳng về thành nào và không reset theo số setup. Kho đó được giữ bởi **custody thế giới trung lập** có ID rõ (S00: `world-custody`), không điều khiển, không sản xuất cho ai, để tài sản không thành vô chủ mơ hồ (I04). Chủ cũ không còn quyền điều kho sau khi mất site.

Claim hợp lệ sau đó chuyển quyền kho **đúng một lần** qua ledger/event có version. Muốn lấy phải có xe và load thật. Xe đã rời site giữ nguyên chủ và hàng; xe tới nhưng chưa load phải kiểm quyền theo chủ mới.

Trại địa phương hết garrison thành site trống như trên: không cap, không tuyển, không hồi quân, không respawn. Hiển thị bằng overlay hoặc ẩn marker `world-npc-bandit-camp`; không tạo asset mới.

## 3. B24 — Vượt suất và mất gốc

Chuyển nơi đóng **không chuyển gốc**. Gán gốc mới là lệnh riêng, chỉ thành cùng chủ đủ suất nhận; chuyển khoản dùng/giữ một lần, không đặt quân ở hai gốc. Sức chứa nơi đóng chỉ dùng để nhận hành trình, không là hạn mức tuyển mới.

Khi gốc mất hoặc capacity giảm: giữ quân sống/chủ/địa điểm, chặn lệnh tuyển/nâng làm tăng nhu cầu; hủy phần hàng chờ chưa chạy vượt khả năng, giải phóng khoản giữ theo luật hiện hành. Không lấy cap/kho của chủ mới. Hủy phần đã tiêu không tạo hoàn tài nguyên mới.

**Job đang chạy thiếu suất thì pause:** trả phần suất tăng còn giữ; giữ progress, thời gian active còn lại và chi phí đã tiêu. Event hoàn tất cũ bị vô hiệu bằng version. Resume phải kiểm lại chủ/cơ sở/cap và **giữ lại suất trước** khi tạo mốc hoàn tất mới; không trả chi phí lần hai và không tính thời gian pause thành tiến độ. Không đủ suất thì tiếp tục pause.

### 3.1. Đợt nợ biên chế

Có **nợ biên chế** khi suất quân hiện hữu của một nguồn vượt capacity của nguồn đó, hoặc nguồn đã mất. Khóa đồng hồ của đợt nợ là **(owner, original_capacity_source_id)**. `pending:X` là trạng thái/alias của nguồn X cũ, không phải khóa mới để rửa thời gian. Bucket quân tham chiếu tới đợt nợ của nguồn, không tự có `debt_since` riêng.

- Mất gốc trong khi nguồn đó đang có đợt quá cap thì giữ mốc cũ.
- Gán lại một phần chỉ gỡ phần quân thật sự có đủ cap ở nguồn mới; phần còn lại vẫn mốc cũ. Di chuyển/tách/gộp/đổi tên/load không reset.
- Đợt kết thúc khi `used ≤ capacity`; `used` chỉ đếm quân hiện hữu, không đếm reservation.
- Trong ân hạn vẫn phòng thủ, vận tải, rút và gán lại; không tự suy yếu hoặc quân biến mất.

Ví dụ: mất X lúc T0 với 100 quân; T0+5 giờ gán 60 quân sang B đủ suất; 40 quân còn lại vẫn thuộc đợt (owner, X) từ T0, nên phụ phí bắt đầu từ T0+6 giờ. Nếu X đã quá cap từ T0−2 giờ thì mốc là T0−2 giờ.

Sau ân hạn, tỷ lệ `r = max(0, used − capacity) / used` với `used > 0`; nguồn đã mất có capacity 0. Mỗi cohort dùng nguồn đó chịu `upkeep = base_upkeep(profile) × (1 + r × surcharge)`. Tỷ lệ là chung cho nguồn, nên lương có trọng số của từng profile vẫn khác nhau; reservation không tính vào lương. Đây là chi phí của thiếu cơ cấu, không phạt số thành. Người đủ giàu được giữ lực lượng vượt cap với chi phí, nhưng không tuyển/nâng tăng thêm.

Khi không nuôi được thì áp luật đói chung tại nơi đóng (§6), không có cơ chế xóa quân thứ hai. Preset S00 thử ân hạn 6 giờ game, surcharge 1; các số thuộc CAL02/CAL10, chưa chứng minh hợp lý.

## 4. B25 — Nhánh hỗn hợp, snapshot và thứ tự

Được trộn nhánh. Hộ trận áp quân **cùng chủ trong tuyến bảo vệ**, kể cả umbral/martial; không bảo vệ phe khác chỉ vì cùng đánh một địch. Tổng quỹ và số nguồn theo quân sẵn sàng, không tăng vì thêm nhóm. Quỹ hữu hạn tạo giá cơ hội về slot/suất/kho/lương/hồi; không thêm “phí phép”.

Phá ấn chỉ có ngân sách của số nguồn đủ điều kiện, một lần/trận của phần quân sẵn sàng. Martial có giá trị profile/khắc dòng, không phải quân chịu đòn miễn phí. Giá trị umbral khi đối thủ không có quỹ, giá trị Quân chế và việc dùng đoàn mồi để đốt cooldown Hộ trận là **đo CAL05 và test**, không tự thêm fallback damage, kỹ năng mới hoặc đổi hồi khi chưa đo.

Thứ tự: snapshot ban đầu → Hộ trận của cả hai bên → tổng Phá ấn hợp lệ của cả hai bên → từng lượt tính sát thương từ snapshot quân sống đầu lượt → phân bổ hấp thụ → áp tổn thất đồng thời → xét kết thúc. Chủ động core chỉ kích ở bước đầu. Nguồn đủ điều kiện tại snapshot thực hiện; chết sau đó không hủy ngược quỹ đã tạo. Quân chết từ lượt trước không ra đòn ở lượt sau. Hết lượt 12 chưa dứt thì không tự cấp thành.

**Phân bổ hấp thụ** dùng fixed-point ở cấp **lượng damage/hấp thụ**. Khi quỹ không đủ và còn phần dư quantum, chia theo largest remainder trên các damage claim hợp lệ; mỗi claim nhận không quá damage của nó, tổng không quá quỹ. Hòa thì dùng **stable claim key** lưu trong battle snapshot: nguồn/lineage tuyển + profile + readiness + ô đội hình. Các phần cùng key được gộp trước khi phân bổ, nên tách/gộp cohort tạm không đổi kết quả và không tăng ngân sách. Không dùng cohort_id tạm.

Luật này hứa tất định và không phụ thuộc thứ tự duyệt, có công khai tie-break; **không hứa đối xứng tuyệt đối** khi quantum lẻ. Chuyển damage thành số chết/HP còn lại theo từng profile là cổng CAL02/CAL03; tie-break không bao giờ được dùng để làm tròn số chết chung giữa các profile có HP khác nhau.

Quỹ có thời hạn k lượt hấp thụ trọn lượt k và hết hạn **sau bước áp tổn thất của lượt k**; hai bên cùng quy tắc. Hai bên mất hết trong cùng lượt vẫn được ghi đúng; không bên nào ra đòn lần hai. Thanh tẩy/Nguyền chưa thuộc core.

## 5. B26 — Một pipeline sản lượng

Với mỗi nguồn/tài nguyên/đoạn thời gian:

`available_base = base_rate(level) × control_availability × recovery_factor`

`rate = available_base × max(0, 1 + research_bonus + great_empire_bonus + great_region_bonus)`

Các bonus cộng trên **cùng available_base**, theo scope riêng. `great_empire + great_region ≤ 0.40`, mỗi phần ≤ 0.20; không phải trần của research hay mọi thứ. **Trong core hiện tại `research_bonus = 0`** tới khi ruleset có tech kinh tế thật; công thức vẫn khóa, không dựng UI mới. Ví dụ base 100, availability/recovery bằng 1, Great 40% và research 20% cho **160** (không 168) là **fixture giả định có scope**, không phải tech đang có.

Great chỉ áp nguồn ô sản xuất thành cùng chủ; mỏ world không nhận Great. Một bonus chỉ ghi một lần theo effect/source key. Đoạn trước/sau đổi chủ/tech/ổn định tính riêng; không hồi tố và không lấy bonus đã cộng làm base của bonus sau. Control/recovery là mức hoạt động thực, recovery profile do CAL09 chọn.

### 5.1. Kho, lương và phần lẻ

Tại mỗi kho và mỗi tài nguyên, trong mỗi đoạn có rate không đổi:

`net = gross_production − continuous_expense` (lương, phụ phí B24)

`stock_end = clamp(stock_start + net × dt, 0, cap)`

Tách đoạn khi đổi rate, đổi quyền, chạm 0 hoặc chạm cap. Ledger ghi riêng **production**, **paid upkeep**, **overflow** và **unmet expense**; không ghi trùng, không có stock âm.

- Ở cap với net > 0: sản lượng trả đủ lương cùng đoạn, chỉ phần net dư thật sự thành overflow và bị bỏ.
- Ở 0 với net < 0: paid upkeep bằng phần có được, phần còn lại là unmet expense và kích luật đói.
- Chi phí rời rạc tại mốc (tuyển, load xe) vẫn là dòng riêng tại mốc của nó.
- Phần lẻ fixed-point được giữ trong khoảng [0, cap]; ở cap không lưu phần tràn thành của cải ẩn.

Đồng hồ là giây nguyên. Nếu thời điểm chạm 0 nằm giữa hai tick, event đói dùng **tick nguyên đầu tiên tại hoặc sau thời điểm chạm (ceil)**, cùng quy tắc ở mọi tốc độ; không mở đồng hồ thứ hai, không để kho âm.

Phép tính tham chiếu (arithmetic, **không phải engine test**): kho lương 6000/6000, sản xuất 400/h, lương 52/h, chia 1/2/4 đoạn đều cho 6000, overflow 348/h. Cách cũ “clip sản xuất rồi trừ lương” cho 5948/5974/5987 nên bị bỏ. Kho 100 lương với net −52/h chạm 0 tại `90000/13 ≈ 6923,08` giây, event đói ở tick 6924.

Không có thuế/An dân/policy tăng sản lượng trong core (`0/not-active`), không cộng tài nguyên từ kho dân sinh chưa tồn tại. Khi thêm về sau phải thay pipeline có version và sổ bảo toàn.

## 6. B27 — NPC mất thành, kết thúc và trần

`settled`: có ít nhất một thành sở hữu. `landless`: không còn thành nhưng còn Army/tài sản sống. Quân giữ gốc cũ thành pending, không cap mobile/tuyển/hồi sinh miễn phí; tiếp tục tiêu lương và có thể giành một thành bằng quân còn sống theo cùng điều kiện tiếp quản. Không tự dựng thành mới nếu chưa có luật định cư/nguồn.

**Đói kéo dài sau ân hạn phải có hao hụt hữu hạn dẫn tới hết quân** nếu không được tiếp tế/phục hồi. Đây là nguyên tắc đã khóa; lịch và tỷ lệ cụ thể là CAL10, vẫn là cổng trước engine. Không được chọn 0% kéo dài vô hạn, và không làm tròn theo nhóm theo cách để tách nhóm né hao hụt.

Phe được ghi **thất bại về quân sự** khi không còn thành hoạt động, quân chiến đấu hoặc quyền tái lập được scenario cấp hợp lệ. Không dùng điều kiện này để xóa hàng/xe/ledger/event vẫn còn chủ.

Với phe đã thất bại quân sự, xe/hàng **không có quân và không có đích hợp lệ** chuyển sang **`dormant`**: giữ ledger/ID/số lượng, không production, không movement, không event poll. Chỉ một domain event hoặc lệnh hợp lệ mới đánh thức lại, và việc đánh thức không nhân bản tài sản. Planner AI của phe đó có thể archive; tài sản và bản ghi thế giới vẫn giữ. **Không áp dormant** lên Army còn sống hoặc lên phe còn hoạt động chỉ đang bị kẹt. Giữ faction ID và lịch sử, không tái dùng ID. Cleanup chỉ bỏ event version cũ hoặc đối tượng không còn tài sản.

Không tự hồi sinh phe hoặc sinh vương quốc mới trong S00. Khám phá một phe dựng sẵn không phải tạo mới. Không cần bù số địch khi người chơi thắng. Thương đoàn/du mục chưa có ở core.

Preset kingdom tối đa 4 Army chiến dịch ngoài thành, patrol và Army landless tính trong 4; local defender không tự tạo đoàn. Gộp hợp lệ giảm số đếm. Chạm trần thì chặn tạo/tách mới, không xóa quân hiện có để dọn và không dịch chuyển chúng; thủ quân tại thành không tính. B hai kingdom thử tối đa 8 đoàn. Trần/budget là CAL11.

## 7. B28 — Khởi đầu, bản đồ và thành tựu thử

[S00 first-foundation](prototype/scenarios/first-foundation.json) 0.2-draft là **đặc tả dữ liệu thử, chưa phải save chạy được**. Bản đồ 64² dựng sẵn, một thành người chơi, một vương quốc hai thành, một trại địa phương và hai điểm khai thác. Vị trí/công trình/kho/quân đều khai trong file, không spawn để làm vừa kết quả.

Người chơi bắt đầu Phủ 1, 52 quân thường (20 kiếm/20 giáo/12 cung), 16 plot cấp 1, bốn xe; kho 1200 gỗ/đất/sắt và 1800 lương. Đây là preset của Codex để thử vòng khởi đầu, **không phải mức kinh tế đã cân bằng**. Nhánh mở sau nghiên cứu/cơ sở, không khóa phe từ Chơi mới.

Theo luật ô site không transit, tiền thành cách start **19 bước** và cách thủ đô **17 bước**; thủ đô cách start 36. Vương quốc mạnh hơn ở phía sau tiền thành, không phải “rất xa”; không tăng cấp theo tiến trình người chơi.

**`ai_budget` thử cho ash-crown** (preset intro dễ quan sát, không phải giới hạn chung của mọi AI):

- Tối đa 6 quân mới được **đặt tuyển** trong mỗi cửa sổ 3600 giây game neo tại T0; quota không dồn sang cửa sổ sau; vẫn kiểm kho/cap/thời gian tuyển thật, không có quân miễn phí.
- Không chuyển viện binh giữa các thành trong toàn S00 (`allow_internal_reinforcement = false`).
- Một chiến dịch active trong trần 4 Army; tối đa 12 quân mỗi sortie; garrison tối thiểu thủ đô 80, tiền thành 20.
- Đánh giá mỗi 300 giây, chỉ phóng khi có tin hợp lệ, mục tiêu khả thi và đủ lương.

Các tham số này không chứng minh 52 quân thắng hay thua. Scoring/targeting/tactical rules của AI và khả năng combat vẫn là cổng CAL11/CAL02/CAL03 trước chạy; chưa có AI triển khai.

**Guard mở đầu:** trong 3600 giây game đầu, ash-crown không được commit chiến dịch nhắm thành khởi đầu. Guard được kiểm **lúc phóng và ở mọi lần đổi đích/bước mission mới** nhắm thành đó; lệnh không hợp lệ trước khi hết hạn không được commit. Thủ quân/site địch vẫn chiến đấu, không có khiên miễn nhiễm. AI được đánh mỏ của người chơi ngoài phạm vi guard theo luật thường, UI phải ghi rõ.

Guard bị hủy khi người chơi **commit một lệnh attack/occupy hợp lệ, chủ động, nhắm tài sản của ash-crown**. Xem trước, lệnh không hợp lệ, phòng thủ khi bị đánh và trinh sát bằng tầm nhìn không hủy guard. Đánh trại địa phương không hủy guard với ash-crown. Tăng tốc áp timer như mọi việc, pause dừng timer. Hết guard không ép AI tấn công.

**Bản đồ:** sông/núi chặn đường, cầu nối ô cho cả quân/xe; S00 đi bốn hướng, không cắt chéo. Sông giữ y 4–59 nên **cầu là đường tắt, không phải chokepoint bắt buộc**: bỏ cầu thì thủ đô vẫn tới được qua đường vòng 90 bước, validator phải báo được đường vòng đó. Phải có đường hợp lệ từ start tới mọi mục tiêu bắt buộc, có nguồn bốn tài nguyên trong thành, và BFS tôn trọng luật ô site không transit (start/đích được vào).

**Thông tin:** bán kính khám phá và tầm nhìn dùng **khoảng cách Manhattan**; chưa có LOS nâng cao. Terrain đã khám phá được nhớ; quân/kho hiện tại chỉ biết qua quan sát hợp lệ có timestamp, không lộ toàn bộ state khi vừa biết tên site.

Mục tiêu đầu là nâng một ruộng, trinh sát bằng quân hiện có, chiếm mỏ và nhận hàng thật, giao chiến, chiếm/vận hành thành thứ hai và restore save. **Không bắt có Học viện hoặc quân cao mới được hoàn thành chiến dịch đầu.** S00 chưa có Đại thành; mốc hoàn thành không gọi là Khai Quốc.

Bản thế giới đầy đủ khai danh sách Đại thành/vùng mục tiêu và thời gian giữ hợp lệ trong scenario. Khai Quốc khi giữ Đại thành đầu ổn định; Thống Nhất khi đủ mục tiêu khai báo. Sở hữu toàn bản đồ thì ghi chiến thắng và tiếp tục cùng save. Điều kiện từng scenario phải công bố trước.

## 8. Thứ tự dựng bản chơi và điều kiện nghiệm thu

Giữ giai đoạn 2 là asset proof; code có thể dùng placeholder sau đó, không bắt hoàn tất 189 export trước thử luật. Thứ tự năm mốc của U10 được chỉnh để **chiếm thành thứ hai trước nghiên cứu sâu**.

| Mốc code | Nội dung | Nghiệm thu khi có engine |
|---|---|---|
| BUILD-01 | Clock/command/state, thành, kho/sản xuất net-clamp, local save/export/import/cache | Cùng state/lệnh cùng mốc+pha cho kết quả tương đương ở 1/2/4/8 ×; đóng không chạy bù; khôi phục job dở; ngắt mạng vẫn mở đủ bộ cục bộ. |
| BUILD-02 | Tuyển I, mỏ, xe, trại, trinh sát; NPC chỉ di chuyển/tập kết/quan sát | Quân/hàng một vị trí, không cap do ra ngoài, xe đi/về, đầy kho/hàng kẹt có lý do; NPC chưa tấn công vì battle ở BUILD-03; không teleport. |
| BUILD-03 | Auto battle, cổng/ngoại thành/assault/tiếp quản, mất gốc/pending/chặn tăng, nợ cơ bản và phụ phí lương theo clock — kết A1 | Đi hết vòng S00, sở hữu/kho/cấp chuyển một lần; ba phía không tự gộp; hậu quả nợ sau mốc 6 giờ không bị vô hiệu; chưa cần tech để thắng mục tiêu phù hợp. |
| BUILD-04 | Một dự án, cơ sở, nâng một dòng; job pause/trả suất/resume — phần đầu A2′ | Mất Học viện/gốc/job bị đánh/hủy/load không nhân quân/hoàn chi; quân bậc cũ chịu trận; resume giữ suất trước, không trả chi lần hai. |
| BUILD-05 | Đủ 14 profile, ba năng lực, L patrol rồi B nhiều phe/tàn quân | Quỹ dùng chung/cooldown/snapshot/phân bổ phần dư đúng; đoàn có nguồn và mục tiêu, không đường combat; NPC không cùng phe mặc định. |

**Ngoài phạm vi BUILD-01–05:** 45 profile, bốn trạng thái ngoại giao, thuế/An dân, Thanh tẩy/Nguyền, du mục, và hoàn tất 189 export.

Âm thanh làm sau vòng nền, không thêm asset âm thanh. Phải xác nhận dữ liệu combat/health/đói/cost/schema/AI policy trước khi chạy S00; file scenario chỉ rõ các phần thiếu. Ngưỡng hiệu năng đo trên máy ở CAL15.

## 9. Ca nghiệm thu — chưa chạy

| Mã | Tình huống | Kết quả yêu cầu |
|---|---|---|
| BS-T01 | Chơi mới cùng scenario/seed | Cùng vị trí/kho/quân/nguồn; không spawn theo FPS. |
| BS-T02 | Cầu bị bỏ trong cấu hình | Validator báo đường vòng (S00: thủ đô 90 bước) hoặc báo mất đường nếu không có đường thay thế; không sinh teleport. |
| BS-T03 | Tua/pause trong guard rồi đánh kingdom | Timer game đúng, kết guard đúng phe và chỉ khi lệnh attack/occupy hợp lệ được commit; không miễn garrison. |
| BS-T04 | Trung lập đi qua màu đất nhưng muốn vào site | Qua ô thường được; không transit ô site; vào kho/chiếm/tấn công cần quyền/tuyên chiến, không gộp quân. |
| BS-T05 | Ba chủ hostile đến cùng mốc | Trận theo sequence lưu, mỗi trận hai chủ; hàng đọc sau nhóm trận; không liên minh tự sinh. |
| BS-T06 | Cap giảm, gốc mất, pause/load/tách/gộp/gán vòng | Quân sống giữ chủ, đợt nợ giữ khóa (owner, nguồn gốc); không tuyển/nâng tăng; phí lương đúng nơi/số. |
| BS-T07 | Hộ trận hỗ trợ nhánh khác | Cùng chủ/tuyến chia cùng quỹ; thêm nhóm không thêm quỹ; chủ khác không được hưởng. |
| BS-T08 | Đồng quy vu tận và nguồn ward chết | Damage snapshot đồng thời; quỹ đã tạo không hồi lại, chủ thành không đổi bởi người thắng rỗng. |
| BS-T09 | Fixture base 100/Great 40%/research 20% và scope mine | City hợp lệ 160; mine không nhận Great; không 168. Fixture giả định vì core có research_bonus = 0. |
| BS-T10 | Cùng đoạn kinh tế bị chia nhiều frame/đoạn | Net-clamp và phần lẻ cho cùng tổng, không tạo/mất thêm do chia đoạn. |
| BS-T11 | Phe mất hết thành nhưng còn quân/xe/hàng | Landless/ledger tồn tại, không cap/tuyển mới; không cleanup tài sản sống. |
| BS-T12 | Đạt trần đoàn hoặc thắng toàn bản đồ | Chặn tạo mới hợp lệ, không xóa đoàn; ghi thắng và tiếp tục, không phe mới bắt buộc. |
| BS-T13 | Tải offline sau cài đủ, file local thiếu hoặc save phiên bản khác | Cache manifest được kiểm; thiếu/hỏng/version không hỗ trợ có giải thích, không mất save âm thầm. |

Ca RV21 lấy từ [Claude review 2.1](reviews/2026-11-07-supplement-02-claude-review.md) mục E. Kết quả dưới đây là bản hiện hành sau resolution 2.2; RV21-05 và RV21-11 có override so với report gốc.

| Mã | Tình huống | Kết quả yêu cầu hiện hành |
|---|---|---|
| RV21-01 | Kho lương 6000/6000, +400/h, −52/h, chia 1/2/4 đoạn | Cả ba cho 6000; overflow 348/h; không phụ thuộc số event |
| RV21-02 | Kho 100 lương, net −52/h | Chạm 0 tại 90000/13 giây, event đói ở tick 6924; kho không âm |
| RV21-03 | Mỏ vô chủ, A và B thù nhau cùng tick | Bên sequence sớm và đủ điều kiện thành holder ứng viên, bên kia đánh nó; đảo sequence có báo cáo |
| RV21-04 | A thù B, cả hai trung lập với holder H | Không có trận ngoài site; cả hai dừng ngoài và báo |
| RV21-05 | Y thắng outer holder X, garrison G của O còn | **Override:** Y giữ ngoại thành, không tự đánh G cùng arrival; assault là lệnh riêng ở cửa lệnh sau; job của X về 0; không tiếp quản khi G còn |
| RV21-06 | Đi từ start tới tiền thành | Không transit ô `bandit-near`; đường 19 bước; không kích trận với trại |
| RV21-07 | Mất X với 100 quân, gán 60 sang B lúc 5 giờ | 40 quân giữ mốc T0, phụ phí từ 6 giờ; 60 quân hết nợ; tách/gộp không đổi mốc |
| RV21-08 | Job nâng đang chạy thì gốc mất, rồi resume | Pause trả suất tăng, resume giữ lại trước; không trừ chi lần hai; `used` không gồm reservation |
| RV21-09 | Umbral vs martial và umbral vs radiant cùng ngân sách | Ghi tỷ lệ thắng (CAL05); không kết luận cân bằng từ K |
| RV21-10 | Đoàn mồi rồi trận chính cùng mốc vào radiant | Trận 2 đọc cooldown đã commit; báo cáo nêu quỹ đã dùng ở trận trước |
| RV21-11 | Quỹ còn 1 quantum, hai claim bằng nhau | **Override:** tie-break theo stable claim key trong snapshot (không cohort_id tạm); đảo thứ tự duyệt hoặc tách/gộp cùng key không đổi kết quả; không làm tròn số chết giữa profile |
| RV21-12 | Bỏ cầu (36,32) | Validator báo đường vòng 90 bước, không “không đường” |
| RV21-13 | Ash phóng đánh mỏ lúc 3000 s, đổi đích sang start lúc 3500 s | Đổi đích bị từ chối tới 3600 s; trận ở mỏ không hủy guard |
| RV21-14 | Phe mất hết thành và quân, còn xe chở hàng không đích | Thất bại quân sự; xe/hàng `dormant`, ledger còn, không event poll; planner archive được |
| RV21-15 | Đánh bại trại rồi gửi xe | Site trống dưới `world-custody`; claim chuyển kho một lần, lấy bằng xe thật; không cap/respawn |

Đây là expected outcomes, chưa có implementation test hoặc playtest. Kiểm JSON/đường đi/phép tính tĩnh chỉ chứng minh cấu hình nhất quán, không chứng minh đã thắng được trận, AI thú vị hoặc chơi offline thành công.

## 10. Khép nghiên cứu và thu–chi 2.3

B29–B33/[đặc tả](research-and-economy.md) hiện hành cho engine mở rộng. S00`0.2-draft/design2.2`và static-validation 2.2 giữ nguyên byte, không tự bật đường cap/tech/maintenance mới hoặc đổi quota NPC. Game nền có kinh tế/tuyển subset; chưa fullS00 hoặc 2.3.

BUILD-04 ưu tiên mở quân bằng trang bị II/huấn luyện IIvà một mức tổ chức huấn luyện, không bắt hoàn thiện 12 ngành/thuế/An dân trước A1. B30 trả trước rõ; B31 site/hành trang/cargo có nguồn; B32 giữ nợ bucket. D1 và chi vận hành nâng sâu qua các cổngG23 trước bật. Các ca RE23 trong [JSON2.3](prototype/research-economy-validation.json) là expected outcomes, chưa chạy engine.
