# Claude review — Bổ sung 02, docs 2.1 (B23–B28, BS-01–BS-10, S00)

Ngày review thực: 10/11/2026 (tên file giữ mốc 2026-11-07 theo brief). Reviewer: Claude, độc lập với Codex. Phạm vi: tính nhất quán gameplay/luật và mức sẵn sàng của docs 2.1. **Đây là tư vấn, chưa là luật và chưa có mô phỏng/playtest.** Mọi kết luận "đúng/sai" dưới đây là suy luận từ văn bản và phép tính tĩnh, không phải kết quả engine.

Ghi chú tiến trình: phiên review ngày 07/11 bị ngắt do lỗi kết nối sau khi đã đọc hồ sơ và kiểm hash, **chưa ghi file report nào**. Ngày 10/11 tôi kiểm lại: không có report dở, mọi file đọc vẫn mtime 07/11 13:21 và hash không đổi (mục G), nên nội dung đọc từ phiên trước vẫn còn hợp lệ.

## A. Verdict ngắn

- **Asset proof: đủ.** B23–B28 không đổi camera/shape/ID/roster/layout. Manifest đã có các ID S00 cần (`world-npc-bandit-camp`, `world-resource-grain-field`/`clay-site`, `world-river-*`, `world-road-bridge`, `world-wagon`, `world-army-patrol`, `world-forward-camp`). Không phát hiện nào dưới đây buộc thêm hoặc đổi export.
- **Không có P0** (không có gì chặn asset hoặc làm sai cấu trúc đã khóa).
- **Có blocker trước khi viết/chạy engine (P1)**: ngoài các cổng S00 đã tự khai (combat stats, đói, cost, schema), còn 4 luật nối viết chưa đủ để code tất định, cộng 1 tham số AI thiếu.
- **Top 5 phát hiện:**
  1. **B26 thứ tự kho/lương phụ thuộc cách chia đoạn** (P1). "Sản xuất → áp kho → chi lương là dòng riêng": nếu kho đã đầy 6000, chạy 1 h cho ra 5948, hai đoạn 0,5 h cho 5974, bốn đoạn 0,25 h cho 5987. Như vậy mâu thuẫn trực tiếp với BS-T10 và tính tất định theo tốc độ.
  2. **B23 thiếu ba nhánh giải quyết khi nhiều phe đến** (P1): site không có holder, hai bên đến thù nhau nhưng cùng trung lập với holder, và khi nào bên vừa thắng holder đánh tiếp garrison. Thêm vào đó là câu hỏi ô site có cho đi xuyên hay không: BFS tĩnh 17 bước đi xuyên ô trại cướp, nếu cấm xuyên thì thành 19.
  3. **B25 quy tắc phần dư "đối xứng" không cài được** (P1). Khi còn 1 đơn vị nguyên chia cho 2 claim bằng nhau, phải có tie-break, mà docs không nêu. Thời điểm hết hạn quỹ trong một lượt cũng chưa định.
  4. **B24 chưa nói đồng hồ nợ gắn vào khóa nào**, và khoản giữ của job bị pause có được tính vào `used` hay không (P1, sửa bằng một câu). Công thức surcharge tự nó khép kín.
  5. **S00 bản đồ và AI** (P1/P2). Sông x=36 chỉ phủ y 4–59, nên bỏ cầu vẫn tới thủ đô (90 bước): cầu là lối tắt, không phải chokepoint, và BS-T02 khó cho ra kết quả "không đường". Tiền thành nằm cách đều start và thủ đô (17/17), mà S00 không có ngân sách/hung hăng AI. Vì vậy chưa thể biết vòng mở đầu có khả thi hay không.

## B. Bảng BS-01–BS-10

| BS | Đề nghị | Thiếu luật hay tuning | Lý do ngắn |
|---|---|---|---|
| BS-01 Khởi đầu | Chỉnh | Thiếu dữ liệu: ngân sách/hung hăng AI của ash-crown, trạng thái trại sau khi bị đánh bại | Thiếu hai mục này thì engine không chạy được first_goals; 52 quân, kho, giá là tuning |
| BS-02 Thắng/tiếp tục | Giữ | Không | Objective không terminal, không Khai Quốc giả; khép kín |
| BS-03 Bản đồ | Chỉnh | Dữ liệu + 1 câu luật | Sông hở hai đầu; chưa định nghĩa metric bán kính khám phá/vision; ô site cho xuyên hay không |
| BS-04 Ngoại giao/đa phe | Chỉnh | **Thiếu luật** (3 nhánh, xem F-02) | Hai trạng thái neutral/hostile là đủ, không cần thêm state |
| BS-05 Thuế/An dân | Hoãn (giữ) | Không | B26 khóa `0/not-active`; đúng phạm vi |
| BS-06 Gốc/nâng | Chỉnh nhẹ | Thiếu 2 câu (khóa timer, reservation của job pause) | Ân hạn 6 h và surcharge 1 là tuning |
| BS-07 Trộn nhánh | Giữ, cần đo | Tuning/đo | Mô hình một quỹ cùng chủ/tuyến khép kín; cần đo giá trị umbral khi không có mục tiêu và bait cooldown |
| BS-08 Thứ tự năng lực | Chỉnh | **Thiếu luật** (phần dư, hết hạn trong lượt) | Phần còn lại của chuỗi thứ tự đã khép kín |
| BS-09 Bonus | Chỉnh | **Thiếu luật** (thứ tự kho/lương) | Công thức 160 đúng; lỗi nằm ở bước sau công thức |
| BS-10 Vòng đời NPC | Chỉnh nhẹ | Thiếu điều kiện kết thúc cho tài sản kẹt; đói phải dẫn tới hao hụt | Trần 4 đoàn hợp lệ và là tuning |

Không mục nào đang che một quyết định cấu trúc lớn dưới nhãn calibration. Có một chỗ gần ranh giới: **CAL10 (đói)**. Nếu CAL10 chọn "suy yếu có giới hạn, không chết" thì B24 và B27 không còn điểm kết thúc (xem F-07). Vì vậy câu "đói cuối cùng làm giảm quân" là luật, không phải số.

## C. Findings

Ưu tiên: **P0** chặn asset hoặc phá cấu trúc (không có). **P1** phải sửa văn bản trước khi viết engine phần đó. **P2** sửa trước playtest hoặc ghi vào test.

### F-01 (P1) B26: kho áp trước lương làm kết quả phụ thuộc cách chia đoạn

- Vị trí: `prototype-readiness.md` §5 đoạn cuối ("Sau tính sản xuất mới áp kho/capacity… chi lương/vận tải là các dòng riêng"); `systems-and-balance.md` §6; `final-design.md` B26.
- Tái hiện: kho lương đầy 6000/6000, sản xuất 400/h, lương 52/h. Cách "clip sản xuất rồi trừ lương" cho 1×1 h = 5948; 2×0,5 h = 5974; 4×0,25 h = 5987. Cách "net rồi clamp" cho 6000 ở cả ba trường hợp (đã tính bằng script, mục G).
- Hệ quả: số đoạn thay đổi theo event (xe tới, job xong), nên cùng một lệnh lại ra kết quả khác nhau khi có thêm event. Mâu thuẫn BS-T10 và technical-design §5. Kho lương đầy là trạng thái phổ biến ở đầu game (S00 net +348/h).
- Sửa tối thiểu: trong mỗi đoạn, mỗi tài nguyên tại mỗi kho dùng **`net = production − continuous_expense`**. Tích phân tuyến tính rồi clamp `[0, cap]`. Nếu chạm 0 hoặc chạm cap trong đoạn thì tách đoạn tại thời điểm chạm (mốc này cũng dùng để kích lịch đói). Phần tràn kho mất, phần lẻ fixed-point bị bỏ khi đang ở cap. Chi phí rời rạc (tuyển, chất hàng lên xe) vẫn là dòng riêng tại mốc của nó.
- Đã biết: công thức `rate` và ví dụ 160 đúng. Chưa chứng minh: chưa có engine.

### F-02 (P1) B23: ba nhánh chưa có luật khi nhiều phe đến cùng mốc

- Vị trí: `prototype-readiness.md` §2 đoạn 4–5.
- Luật hiện chỉ định nghĩa "bên đến hostile với holder thì đánh holder". Còn thiếu:
  - (a) **Site không có holder** (mỏ vô chủ, hoặc vị trí trống sau khi hai bên cùng chết): A và B thù nhau, đến cùng tick. Ai là holder? Đề xuất: bên có sequence sớm nhất thành holder ứng viên, các bên đến sau xử lý như đang đến một site có holder. Báo cáo ghi rõ lý do.
  - (b) **A thù B nhưng cả hai trung lập với holder H**, ví dụ hai phe cùng đứng ở ô tiếp cận của thành một phe thứ ba. Theo B14 không có trận giữa đường, nên đề xuất **không đánh nhau** tại ô tiếp cận: giao chiến chỉ xảy ra với holder/garrison của site đích. Nếu không chốt điều này, câu "dừng ngoài" sẽ lén tạo ra trận ngoài site.
  - (c) **Bên vừa thắng holder có đánh garrison trong cùng nhóm mốc không?** Ví dụ: O giữ thành, có garrison G; X giữ ngoại thành; Y thù cả hai. Y thắng X và thành holder, nhưng G vẫn còn. Đề xuất: nếu mission của Y có đích là thành và O chọn chặn cửa, trận Y–G là trận kế tiếp **trong cùng nhóm mốc** với lực/cooldown đã commit. Nếu không thì để mốc sau. Nên chọn một và ghi lại.
- Thêm: **ô site có cho đi xuyên không?** Đường thẳng y=32 từ start tới tiền thành đi qua `bandit-near` (22,32). Static validation báo 17 bước, tức đã cho xuyên. Nếu cấm xuyên thì thành 19 (mục G). Với ash-crown (trung lập với trại), cho xuyên mâu thuẫn với "neutral không vào site". Với người chơi (hostile), đi xuyên nghĩa là kích trận ngoài ý muốn. Sửa: **ô site chỉ được vào như đích, không dùng để transit**. Ô thường không giới hạn số quân và không chặn xe, để neutral không thể đứng ở ô tiếp cận mà phong tỏa.
- Về né trận/quấy rối/gộp ngầm: thứ tự tuần tự **có lợi cho bên đến sau** (đánh holder đã yếu), chứ không chỉ "lợi thế đến trước" như docs viết. Đây là hệ quả đọc được nếu báo cáo ghi chuỗi trận. Gộp ngầm (NPC đánh trại trước, người chơi dọn phần còn lại) chấp nhận được vì tổn thất không chia sẻ. Không cần trận ba phe đồng thời, chỉ cần sửa câu mô tả lợi thế.
- Mutual elimination: luật "không holder, chủ thành giữ, job về 0, hàng đọc kết quả cuối" khép kín với thành. Với **mỏ vô chủ** thì chưa: khi toàn bộ quân giữ chết, site có quay về `owner: null` không, và kho trong site (tới 2000) thuộc ai? Đề xuất: site về vô chủ, kho ở lại site, thuộc về holder hợp lệ tiếp theo; xe đang tới xử lý như hàng bị từ chối.

### F-03 (P1) B25: phần dư và hết hạn quỹ chưa cài được tất định

- Vị trí: `combat-abilities.md` §3 ("phần dư số nguyên xử lý đối xứng"); `prototype-readiness.md` §4.
- Tái hiện: quỹ còn 1 đơn vị, hai cohort cùng tuyến nhận sát thương bằng nhau. Chia "đối xứng" cho mỗi bên 0,5, không phải số nguyên, nên vẫn phải chọn bên nào.
- Sửa tối thiểu: hấp thụ theo fixed-point cùng hệ số với kinh tế, không làm tròn trong lượt. Đến bước chuyển damage sang số quân chết thì dùng largest-remainder với tie-break theo `cohort_id` ổn định, và ghi quy tắc vào ruleset. "Đối xứng" được hiểu là không phụ thuộc vị trí ô hay thứ tự duyệt, không phải là tuyệt đối không có tie-break.
- Hết hạn: ghi rõ quỹ hết hạn **sau bước áp tổn thất của lượt k** (k do CAL05 đặt) và hấp thụ đủ trong lượt k. Cả hai bên hết hạn cùng lúc.
- Chuyển damage sang số chết và health persistence vẫn là cổng mà S00 đã tự khai. Không coi đó là phát hiện mới.

### F-04 (P1) B24: khóa đồng hồ nợ và reservation của job bị pause

- Vị trí: `prototype-readiness.md` §3 đoạn 3–5.
- Văn bản vừa nói "đợt nợ" (theo nguồn), vừa nói "bucket quân giữ mốc nợ" (theo bucket). Hai cách này cho kết quả khác nhau khi gộp hoặc gán lại một phần.
- Phản ví dụ nhỏ: mất thành X lúc T0, 100 quân chuyển sang `pending:X`. Lúc T0+5 h gán 60 quân sang thành B (B còn trống 60). 40 quân còn lại vẫn `pending:X`. Nếu khóa theo bucket mà bucket mới được tạo khi tách, engine có thể vô tình gán mốc mới. Nếu khóa theo nguồn thì 40 quân giữ mốc T0 và surcharge bắt đầu từ T0+6 h. Vì gán gốc chỉ nhận khi đích đủ suất, nợ không bao giờ chuyển sang nguồn mới. Do đó khóa theo nguồn là đủ và đơn giản hơn.
- Sửa tối thiểu: **timer key = (owner, source_id)**, gốc mất giữ nguyên ID dưới dạng `pending:<id>`. Đợt nợ kết thúc khi `used ≤ capacity` của khóa đó. Bucket không lưu mốc nợ riêng.
- Reservation: job bị pause **trả phần suất tăng đang giữ**, chi phí đã tiêu giữ nguyên. Khi resume phải giữ lại suất, nếu không đủ thì tiếp tục pause. `used` trong `r` chỉ đếm quân hiện hữu. Như vậy không có trường hợp đánh thuế phần giữ và không tuyển vượt được.
- Công thức surcharge đã kiểm: used 101 / cap 100 cho r = 1/101, tổng lương 102 (đúng bằng 1 suất vượt × surcharge 1). Pending 40 / cap 0 cho r = 1, lương 80. Phụ phí chia đều cho mọi cohort cùng nguồn, kể cả quân đang ở nhà. Tổng thu đúng bằng phần vượt × base × s khi lương đồng đều, nên không phạt sai tổng. Nếu lương khác nhau theo profile, phần vượt bị tính theo lương trung bình của nguồn. Chấp nhận được, nhưng nên ghi rõ.
- Đánh thuế hai lần: surcharge là chi phí, đói là hệ quả của việc không trả được. Đó là một chuỗi, không phải hai hình phạt. `systems-and-balance.md` §6 đã cấm giảm sản lượng thêm. Không cần bỏ cơ chế: trong core, mất gốc chủ yếu cho r ∈ {0, 1}. Surcharge là cái giá để không phải xóa quân, hợp lý nếu đói có điểm kết thúc (F-07).

### F-05 (P1) S00: thiếu tham số AI, và tiền thành nằm giữa hai bên

- Vị trí: `first-foundation.json` `factions[ash-crown]`, `unresolved_before_engine_run`; `prototype-readiness.md` §7.
- Số đo được: start→tiền thành 17 bước (1020 s), tiền thành→thủ đô 17, thủ đô→start 34 (2040 s). Đòn tấn công sớm nhất của thủ đô vào start sau guard tới lúc 5640 s. Tiền thành có 26 quân, sắt 1000 (đủ 20 kiếm) và thu 400 sắt/h. Thủ đô có 100 quân, sắt 2400, thu 500/h. Ash trống 94 + 140 suất.
- Hệ quả: guard chỉ cấm *phóng chiến dịch*, không cấm tuyển hay tiếp viện. Trong 1 h guard, AI có thể đưa tiền thành lên khoảng 46 quân trở lên và đưa viện binh từ thủ đô tới trong 17 phút. Khi đó mục tiêu "chiếm tiền thành với 52 quân" có thể bất khả thi hoặc quá dễ, tùy một chính sách AI **chưa có trong file**. Câu "vương quốc mạnh ở xa" cũng chỉ đúng một nửa: thủ đô cách 34 phút game.
- Sửa tối thiểu: thêm vào S00 một dòng `ai_budget/aggression` thử cho ash-crown (giới hạn tuyển mỗi giờ hoặc tỷ lệ kho dành cho quân, có tiếp viện tiền thành hay không), và đưa nó vào danh sách `unresolved_before_engine_run` (CAL11). Không cần thêm hệ thống mới.

### F-06 (P2) S00: sông không chặn, metric bán kính, trại sau khi bị đánh bại

- Sông x=36 chỉ y 4–59 trên bản đồ 0–63. Bỏ cầu thì thủ đô vẫn tới được qua đầu sông (90 bước thay vì 34). BS-T02 kỳ vọng validator báo mất đường, điều đó chỉ đúng nếu sông chạy hết mép. Sửa: kéo sông tới y 0–63 nếu muốn cầu là chokepoint, hoặc ghi rằng cầu là lối tắt. Núi cũng hở y 0–6, 24–40, 57–63; khe giữa là chủ ý (tiền thành ở x=29).
- `initial_explored_radius`/`current_vision_radius` chưa nêu metric (Manhattan/Chebyshev/Euclid). Với Manhattan, tiền thành (17) nằm ngoài vùng khám phá 12. Với Chebyshev cũng vậy. Ghi một metric.
- first_goals có "Defeat the local camp" nhưng trại sau khi bị đánh bại thì sao: site còn hay mất, kho 120/120/100/100 có cướp được không (B17 có nhắc loot nhưng core chưa có luật loot)? Đề xuất: trại thành site rỗng không chủ, kho ở lại và lấy được bằng xe theo quyền giữ như mỏ. Marker dùng overlay hoặc ẩn `world-npc-bandit-camp`, không cần asset mới.

### F-07 (P2) B27/CAL10: tài sản kẹt và lưu vong không có điểm kết thúc

- Phe bị thất bại quân sự nhưng còn xe đang chở hàng mà không có đích hợp lệ: theo B12, xe "kẹt có thông báo" vĩnh viễn. Phe vì vậy không bao giờ archive được, và planner vẫn phải giữ một entity sống.
- Quân landless có gốc `pending`, sau 6 h phải trả gấp đôi lương, chỉ còn lương mang theo 2 h. Nếu CAL10 chọn "suy yếu có giới hạn, không chết", đoàn đó tồn tại mãi trong trạng thái vô nghĩa. Muốn giành thành cũng cần có lương (B12), nên gần như không khả thi. Điều này không sai luật, nhưng là ngõ cụt.
- Sửa tối thiểu: (1) luật CAL10 phải có hao hụt dẫn tới 0 khi đói kéo dài (số do CAL10 đặt). (2) Tài sản không quân và không đích của một phe đã thất bại quân sự chuyển sang `dormant`: giữ nguyên ledger, không có event sống. Đây không phải xóa, nên I09/N20 vẫn giữ.
- Trần 4 đoàn/kingdom: là ngân sách planner hợp lệ, không phải đặc quyền tạo tài sản, vì đoàn chỉ là quân có thật rời thành. Cần ghi rõ: gộp hai đoàn giảm số đoàn; quân landless vẫn tính trong trần.

### F-08 (P2) Guard S00: hai kẽ hở retarget và phạm vi

- Guard chỉ cấm chiến dịch **nhắm** `city-player-start`. AI có thể phóng chiến dịch vào mỏ người chơi đang giữ (hợp lệ, nên ghi rõ trong UI), rồi lúc 3600 s chuyển đích sang start bằng một bước mission mới. Hiện không vi phạm câu chữ, nhưng nên ghi rằng guard kiểm cả ở lúc phóng lẫn ở mỗi bước mission đổi đích sang start.
- "Hostile action" cần định nghĩa: lệnh tấn công/chiếm vào tài sản của ash-crown. Phòng thủ khi bị đánh tại mỏ không hủy guard. Trinh sát bằng tầm nhìn không hủy guard.
- NewGame có một vị trí cố định nên không có lỗ hổng chọn vị trí. Timer theo game time và pause dừng timer là đúng; không có khiên miễn nhiễm.

### F-09 (P2) B25: giá trị Quân chế/Phá ấn và bait cooldown cần đo

- Phá ấn không có mục tiêu thì không tiêu hồi và không có giá trị. Umbral trước martial chỉ còn profile thuần. Không phải lỗi luật, nhưng ma trận giá trị thực tế có thể thành radiant > martial > umbral > radiant tùy CAL05. **K không đổi không chứng minh điều gì.** Phải đo cùng ngân sách (RV21-09).
- Hộ trận luôn kích ở đầu trận. Một đoàn mồi nhỏ có thể buộc quỹ của đối phương vào cooldown trước trận chính, vì B23 cho trận sau đọc cooldown đã commit. Đây là counterplay đọc được, nhưng có thể quá mạnh nếu cooldown dài hơn nhịp trận. Đo trước khi thêm luật; nếu cần, sửa bằng số (cooldown ngắn hoặc tỷ lệ với lượng đã hấp thụ), không thêm hệ thống.

### F-10 (P2) B26: research bonus là placeholder trong core

- Core có khoảng 5–6 tech mở roster (`military-and-research.md` §2), không liệt kê tech kinh tế. Như vậy `research_bonus` trong core có thể bằng 0 và ví dụ 160 là giả định. Đề nghị: giữ công thức, ghi "research_bonus = 0 tới khi có tech kinh tế trong ruleset", không dựng UI cho nó. Không có double count với Great: scope thành/mỏ tách bạch, và base Great sau availability/recovery không mâu thuẫn B17 ("sản xuất ô tài nguyên… trước trừ lương"). Trần 40% chỉ áp phần Great là đúng như văn bản.

### F-11 (P2) BUILD: hai phụ thuộc lệch nhẹ

- BUILD-02 có "phản ứng NPC nhỏ", nhưng auto battle ở BUILD-03. Vì mọi tiếp xúc hostile tại site đều là trận, NPC ở BUILD-02 chỉ nên di chuyển hoặc tập kết, không có lệnh tấn công. Cần ghi rõ.
- Chiếm tiền thành (BUILD-03) làm quân ash có gốc tiền thành thành `pending`. Phần **pending + chặn tuyển** của B24 phải có ở BUILD-03; surcharge có thể để BUILD-04.
- Thứ tự "thành thứ hai trước research sâu" là đúng và giữ được vòng A1. Phạm vi đã được chặn bởi B18 và roster 14. Đề xuất thêm một dòng "không thuộc BUILD-01..05: 45 profile, 4 state ngoại giao, thuế/An dân, Nguyền/Thanh tẩy, du mục, hoàn tất 189 export" ngay dưới bảng BUILD. Chỉ là một câu, không phải hệ thống mới.

## D. Phương án sửa cuối đề nghị

| Loại | Nội dung |
|---|---|
| Chấp nhận có điều kiện | B23 (thêm a/b/c và luật ô site không transit), B24 (khóa timer, reservation khi pause), B25 (tie-break fixed-point, mốc hết hạn), B26 (net rồi clamp, research = 0 trong core), B27 (đói dẫn tới 0, `dormant` cho tài sản kẹt), B28 (AI budget, sông, metric, trạng thái trại, kẽ hở retarget của guard) |
| Chấp nhận nguyên | BS-02, BS-05 (hoãn), mô hình quỹ một chủ/tuyến, công thức `rate` và trần 20/20/40, trần 4 đoàn, thứ tự BUILD |
| Sửa câu chữ | "lợi thế thứ tự đến" thành "kết quả phụ thuộc thứ tự, bên đến sau có thể đánh holder đã yếu" |
| Rút | Không có |
| Không bổ sung | Không thêm state ngoại giao, đánh giữa đường, trận ba phe đồng thời, mana, hay asset mới |

## E. Ca kiểm chứng mới (chưa chạy)

| Mã | Tình huống | Expected outcome |
|---|---|---|
| RV21-01 | Kho lương 6000/6000, prod 400, lương 52, chia 1/2/4 đoạn | Cả ba cho 6000; không phụ thuộc số event |
| RV21-02 | Kho lương 100, net −52/h, đoạn 3 h | Chạm 0 tại t ≈ 1,92 h, lịch đói bắt đầu đúng mốc đó, kho không âm |
| RV21-03 | Mỏ vô chủ, A và B thù nhau cùng tick | Bên có sequence sớm thành holder ứng viên, đánh bên kia; đảo sequence cho kết quả có báo cáo |
| RV21-04 | A thù B, cả hai trung lập với holder H, cùng ô tiếp cận | Không có trận; cả hai dừng ngoài và báo |
| RV21-05 | Y thắng X (holder ngoại thành), garrison G của O chặn cửa | Theo luật đã chọn ở F-02c; job tiếp quản của X về 0; Y không chiếm khi G còn |
| RV21-06 | Đi từ start tới tiền thành qua y=32 | Không transit ô `bandit-near`; đường 19 bước; không kích trận với trại |
| RV21-07 | Mất X với 100 quân, gán 60 sang B lúc 5 h, 40 còn lại | 40 quân giữ mốc T0, surcharge bắt đầu lúc 6 h; 60 quân không nợ; tách/gộp không đổi mốc |
| RV21-08 | Job nâng đang chạy thì gốc mất, rồi resume | Suất tăng được trả khi pause, giữ lại khi resume; không trừ chi phí lần hai; `used` không gồm reservation |
| RV21-09 | Umbral vs martial và umbral vs radiant, cùng ngân sách/suất/lương | Ghi tỷ lệ thắng; không kết luận cân bằng từ K |
| RV21-10 | Đoàn mồi 5 quân rồi trận chính 100 quân cùng mốc vào radiant | Trận 2 đọc cooldown đã commit; báo cáo nêu "quỹ đã dùng ở trận trước" |
| RV21-11 | Quỹ còn 1, hai claim bằng nhau | Tie-break theo cohort_id ổn định; đảo thứ tự duyệt không đổi kết quả |
| RV21-12 | Bỏ cầu (36,32) trong S00 hiện tại | Validator báo đường vòng 90 bước (không phải "không đường"); nếu sông kéo hết mép thì báo mất đường |
| RV21-13 | Ash phóng chiến dịch vào mỏ người chơi lúc 3000 s, đổi đích sang start lúc 3500 s | Bị chặn đổi đích tới 3600 s; trận ở mỏ không hủy guard |
| RV21-14 | Phe mất hết thành và quân, còn 1 xe chở hàng không có đích | Thất bại quân sự; xe/hàng thành `dormant`, ledger còn, không event sống, AI archive được |
| RV21-15 | Đánh bại trại cướp rồi gửi xe | Site rỗng vô chủ; hàng trong kho trại lấy được một lần theo quyền giữ; không tạo cap |

## F. File cần sửa và phần giữ nguyên

| File | Sửa | Giữ nguyên |
|---|---|---|
| `prototype-readiness.md` | §2 (a/b/c, ô site không transit, câu lợi thế); §3 (timer key, reservation); §4 (hết hạn quỹ); §5 (net rồi clamp, research = 0); §6 (dormant, đói); §7 (guard retarget, metric); §8 (dòng ngoài phạm vi, B24 pending ở BUILD-03); §9 thêm hoặc trỏ tới RV21 | Bảng BS, công thức `rate`, ví dụ 160, BUILD order |
| `final-design.md` B26 | Thay "sau tính sản xuất mới áp kho" bằng "net theo đoạn rồi clamp" | B23–B28 còn lại, B01–B22 |
| `combat-abilities.md` §3/§6 | Tie-break fixed-point | Mô hình quỹ, hai đồng hồ |
| `technical-design.md` §2/§12 | Một câu về tách đoạn khi chạm 0/cap | Thứ tự pha §4 |
| `calibration-register.md` | CAL10 bắt buộc hao hụt dẫn tới 0; CAL11 thêm AI budget S00 | Các nhóm khác |
| `prototype/scenarios/first-foundation.json` | `ai_budget`, sông (nếu muốn chokepoint), metric vision, trạng thái trại sau khi bị đánh bại, cờ site không transit; bump `version` | Vị trí, 52 quân, kho, giá (tuning) |
| `prototype/static-validation.json` | Chạy lại BFS với ô site không transit (19) và ca không cầu | — |
| Asset contract (`asset-manifest.json`, `unit-roster.json`, `city-layout.json`) | **Không sửa** | Toàn bộ v2.0, 189 export |

Ảnh hưởng asset theo cấu trúc: **không có**. Kéo dài sông chỉ dùng thêm ô `world-river-straight`. Trại bị đánh bại dùng overlay hoặc ẩn marker. Đây là đánh giá cấu trúc, không phải dự đoán hình sẽ đẹp.

## G. Giới hạn, bằng chứng, câu hỏi

**Đã đọc:** README, final-design, prototype-readiness, first-foundation.json, static-validation.json, decisions, military-and-research, combat-abilities, mobile-npcs, systems-and-balance, technical-design, roadmap-and-validation, calibration-register, sources/2026-11-07-supplement-02-summary.md. Đã tra bằng grep: asset-manifest.json (danh sách ID world), npc-and-great-cities.md (base B17), world-and-expansion.md. Không đọc lại PDF/DOCX hay review cũ.

**Kiểm đã chạy** (script `rv21_check.py` nằm trong thư mục scratch ngoài project, đọc file bằng `python3 -I`):
- Hash trước khi ghi (07/11 và lặp lại 10/11) và sau khi ghi: 7/7 reference-docs khớp `reference-manifest.json`; U08 khớp SHA và số byte.
  - `asset-manifest.json` 80359e5f676b146a1b0393ad31de27180273ff3f53ac27828ea6a93d84eeec8d
  - `unit-roster.json` 6cbcc567d926551f058db5f002623d6513d8edf959bbcf2e65b73c60c2a60a48
  - `city-layout.json` b82c2e81805e6ca48f0c166d031062bf694fb73a0c83d4a6e387303a14ce266a
  - `first-foundation.json` c8f7d1f86563cfee5307e81005301e68d6691af0993021734b7de0fb57809a49
- BFS bốn hướng, tái tạo đúng static-validation: tiền thành 17, thủ đô 34, clay 8, grain 10, trại 10. Không cầu: thủ đô 90. Ô site không transit: tiền thành 19, thủ đô 36.
- Phản ví dụ kho (F-01): 5948 / 5974 / 5987 so với 6000.
- Surcharge (F-04): 101/100 cho r = 0,0099, lương 102; 40/0 cho r = 1, lương 80.
- Kinh tế mở đầu: lương 400/h, lương quân 52, net 348 (khớp static-validation); 24 kiếm từ sắt ban đầu. Thời gian tối thiểu cho objective: 1020 + 300 + 600 = 1920 s, dưới mức lương mang theo 7200 s.
- Link mới trong report: report này chỉ dùng đường dẫn dạng code, không có link Markdown tương đối mới, nên không có link cần kiểm.

**Giới hạn:** không chạy game, mô phỏng, AI, combat, save hay playtest. BFS tĩnh không thay pathfinding/AI/combat test. Mọi expected outcome ở mục E chưa chạy. Các mặc định B23–B28 là lựa chọn của Codex theo U09, không phải chủ dự án duyệt; review này cũng là tư vấn.

**Câu hỏi cho chủ dự án:** không cần. Mọi điểm trên đều có mặc định gọn để coordinator chọn theo U09. Riêng F-06 (sông là chokepoint hay lối tắt) là lựa chọn thiết kế bản đồ, coordinator tự chốt được.
