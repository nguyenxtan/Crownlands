# Review chéo thủ thành — Claude, vòng 2

Ngày 10/11/2026 · Trả lời [phản hồi Codex](2026-11-10-city-defense-codex-response.md) cho [review vòng 1](2026-11-10-city-defense-claude-review.md). **Chưa phải kết luận chung**; coordinator tổng hợp sau. Không đổi baseline, S00, app hay asset. Không chạy engine; mọi số dưới đây là placeholder, phép tính là tính tay.

Đã đọc thêm: [chinh phục vòng 2 §3](2026-11-07-offline-conquest-round-2.md), [prototype readiness §2–2.2](../prototype-readiness.md), grep S00 (không có trường assault/wall/siege).

## 1. Chỗ tôi đổi ý

**L2/R08 — tôi rút lại, Codex đúng.** Chinh phục vòng 2 §3 ghi: “Thủ quân vẫn có tường khi bị đánh vào thành; xuất thành thì mất lợi thế tường”, và chặn/để ngỏ là lựa chọn của **bên giữ ngoại thành** về việc thủ quân *rút*. Vậy không có mâu thuẫn, không cần tư thế mới, không cần bump B12 vì lý do này. Tôi cũng rút đề xuất “cổng quyết định ai qua: hàng, đồng minh” — core chỉ có neutral/hostile.

Còn một lỗi **chữ** (không phải luật): B12 viết “Bên giữ cửa chọn chặn/để ngỏ”, còn readiness §2.1 mục 5 viết “chính sách cổng **của bên thủ** cho garrison xuất thành”. Hai câu đọc ngược chủ thể so với nguồn vòng 2. Khi Codex viết kết luận, nên ghi một dòng làm rõ chủ thể là outer holder; tôi không yêu cầu sửa canonical trong nhiệm vụ này.

**Cân bằng công/thủ — tôi chỉnh câu chữ.** Vòng 1 viết “bất đối xứng có chủ đích”, không gọi là cân bằng, nhưng câu “công trả thời gian–lương” dễ bị đọc như vậy. Bên thủ cũng ăn lương trong lúc vây, và còn mất sản xuất ngoại thành. Chi phí thật cần đo là **chi phí biên so với không đánh** của mỗi bên, không phải danh sách khoản phải trả. Chưa có kết luận nào.

**Frontage — tôi bỏ.** Codex chỉ ra đúng: frontage phụ thuộc HP, không nối với vật tư, nên `s` không ảnh hưởng gì nếu chỉ có frontage. Thay bằng mô hình §3.

## 2. Chấp nhận

Một lần mỗi đợt; trừ gỗ/sắt trực tiếp có sàn dự trữ (mặc định 0); chốt đoạn B26 tới T trước khi trừ; một mặt, một HP; không cổng HP; không thực thể nỏ/đá trong D1; 0 garrison thì không có trận assault, tiếp quản theo B12. Điều kiện kích hoạt §3A của Codex: đồng ý nguyên văn, thêm “HP > 0 lúc snapshot”.

## 3. Mô hình D1 tôi đề xuất — đủ nhân quả, không thêm hệ thống

Trước trận (bố trí đặt sẵn, không điều khiển trong trận):

- **Bên thủ** chia garrison: *kíp tường* (≤ số vị trí) và *tuyến trong*. Lệnh gán vượt vị trí bị cắt ở bước kiểm tra lệnh; phần dư là tuyến trong. Không có thay kíp giữa trận.
- **Bên công** chia: *nhóm công phá* (dòng đủ điều kiện, D1 đề xuất kiếm/giáo) và *tuyến tấn công*.

Mỗi lượt, khi **HP tường > 0** ở đầu lượt:

1. Nhóm công phá còn sống gây `công_phá × số_sống` vào HP tường, **thay** cho đòn đánh quân của chính họ.
2. Chỉ kíp tường, cung bên thủ và cung bên công được đánh quân; cận chiến hai bên (tuyến trong và tuyến tấn công không phải cung) không chạm nhau. Đây là **tác dụng cấu trúc** duy nhất của tường, chỉ phụ thuộc HP.
3. Kíp tường đánh bằng profile của mình nhân `(1 + β × s)`. Đây là **tác dụng vật tư** duy nhất. Không có giáp tường, không có đòn thứ hai.

Damage tường và casualty áp đồng thời cuối lượt k (B25). Nếu HP về 0 cuối lượt k thì **từ lượt k+1**: bỏ giới hạn cận chiến, kíp mất hệ số vật tư (vật tư đã trừ coi như tiêu), nhóm công phá chuyển sang đánh quân bằng profile thường. Hộ trận/Phá ấn chỉ tác động quân và quỹ; không trừ hay che HP.

**Chọn cấp `s` đồng đều (B của Codex).** Không có một nhóm 60 người “được cấp” thật; mọi kíp còn sống nhận cùng cường độ `s`. Lý do: không cần lưu danh sách ai được cấp, bất biến khi tách/gộp, và không có câu hỏi “phần của người chết chuyển cho ai”. Đổi lại phải ghi rõ trong báo cáo: “120 kíp, cấp 50%”, không viết “60 kíp được cấp”. Hai ca DC-04/DC-06 vòng 1 dùng câu sai này — sửa theo §5.

**Chỗ mô hình này còn hở (nói thẳng):**

- Quân chỉ có kỵ/voi/cung không phá được tường đang có garrison; nếu bên thủ có cung, bên công có thể chỉ đứng đổi cung. Tôi coi đó là đối sách hợp lệ (phải mang bộ binh), nhưng có thể khiến voi vô dụng ở công thành — trái cảm giác. Có đưa voi vào danh sách công phá không là **lựa chọn thiết kế chưa khép**.
- Giới hạn cận chiến khi HP > 0 là khá mạnh; nếu `công_phá` thấp, mọi đợt hết 12 lượt mà không mở được. Đây là cổng **CAL**, không phải lập luận.
- β, công_phá, HP, số vị trí, thời gian chuẩn bị: chưa có số nào được đo.

## 4. Khóa đợt, kiểm lại quyền, repair

Đồng ý toàn bộ §5 của Codex, chốt thêm cho đơn giản:

- Job chuẩn bị **đóng băng thành phần** khi bắt đầu: cohort tham gia ở trạng thái bận, không hành quân hay vào job khác. Không thêm quân giữa chừng; muốn thêm thì hủy và bắt đầu lại từ 0, không giữ tiến độ. Quân chết giảm lực, không hủy job.
- Một job hoạt động cho mỗi `(owner công, settlement)`. **Không cần cooldown riêng**: mỗi đợt mới phải chạy lại chuẩn bị từ 0, chính thời gian đó là nhịp giới hạn.
- Lúc thực thi (pha 2): kiểm lại owner, hostility, outer holder vẫn là owner công, garrison > 0, quân sống tại site. Sai bất kỳ điều kiện nào thì hủy, không trừ vật tư; garrison = 0 thì trả về kiểm B12 ở pha 5.
- Đánh mồi bị giới hạn dưới bởi **lực giữ ngoại thành tối thiểu** (vì người assault phải là outer holder) và trên bởi `vị_trí × định_mức` mỗi đợt. Tôi đề xuất thêm một chính sách bên thủ đặt trước: “chỉ cấp vật tư khi nhóm công ≥ N quân”, đúng ý mục 9 của nguồn (“điều kiện dùng vật tư”). Codex muốn để đo trước; đây là **bất đồng nhẹ**, chấp nhận đo trước rồi quyết.
- Repair: đồng ý **pause** khi có hostile outer holder, lưu thời gian active còn lại, không trả hai lần, pause/đóng game không tự sửa, đổi chủ hủy không hoàn.

## 5. DC-07 và DC-11 — chấp nhận là sai tiền đề

DC-07 vòng 1 cho hai phe cùng assault cùng mốc là sai: chỉ outer holder mới assault được, và B23 không chain. DC-11 cũng sai: nếu đã có hostile outer holder để chuẩn bị assault thì repair đã phải pause. Thay bằng E06/E07 dưới đây.

## 6. Expected outcomes mới (chưa chạy)

Placeholder: định mức 1 gỗ + 0,5 sắt/kíp/đợt, vị trí 150, β = 0,5, công_phá = 2 HP/người/lượt. Phép tính là tính tay.

| Mã | Thiết lập | Kỳ vọng |
|---|---|---|
| E01 | 120 kíp, kho 60/100 | s = min(60/120, 100/60, 1) = 0,5; trừ 60/30; hệ số kíp 1,25 cho **mọi** kíp sống; lượt có 80 kíp sống thì đóng góp = 80 × profile × 1,25 |
| E02 | Như E01, tách 60+60 | Cùng s, cùng trừ, cùng đóng góp từng lượt |
| E03 | HP 200, 50 công phá không chết | Lượt 1: 200 → 100; lượt 2: 100 → 0. Từ lượt 3: cận chiến mở, kíp về hệ số 1, 50 người đánh quân |
| E04 | Gán 200 kíp, vị trí 150 | Lệnh cắt còn 150 kíp; 50 ở tuyến trong; trừ 150/75 nếu đủ kho |
| E05 | Thành HP 0 (chưa sửa), có garrison, assault hợp lệ | Không trừ vật tư; trận 3×3 thường ngay từ lượt 1 |
| E06 | A là outer holder, chuẩn bị xong, assault tại T; B (hostile với A) tới T | Pha 2: B đánh A theo sequence (readiness §2.1). Nếu A thua trước khi assault thực thi thì job hủy, không trừ vật tư. Nếu B thắng, B phải tự chuẩn bị từ 0; không assault tại T |
| E07 | Repair cần 10 h, đã chạy 4 h; hostile giành outer tại T; outer được giải tỏa tại T+20 h | Repair pause với 6 h còn lại; HP không đổi trong 20 h; resume, xong tại T+26 h; không trả chi lần hai |
| E08 | Đang chuẩn bị, ra lệnh cho một cohort tham gia hành quân | Từ chối; hoặc hủy job (mất tiến độ, không trừ vật tư) rồi mới đi |

## 7. Còn chưa khép

1. Có cho voi (hay dòng nào ngoài kiếm/giáo) vào nhóm công phá không.
2. Chính sách ngưỡng N chống đánh mồi: thêm ngay hay đo trước (Codex nghiêng đo trước).
3. Giới hạn cận chiến khi HP > 0 có quá cứng không — chỉ biết sau khi chạy.
4. Ghi chú chủ thể chính sách cổng (B12/readiness §2.1) — chỉ là làm rõ chữ.
5. Chưa có bằng chứng nào về cân bằng, độ vui hay giá trị lựa chọn; mọi E01–E08 là kỳ vọng thiết kế, chưa phải test.
