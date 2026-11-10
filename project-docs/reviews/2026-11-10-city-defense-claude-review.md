# Review chéo thủ thành — Claude, vòng 1

Ngày 10/11/2026 · Reviewer: Claude · Trạng thái: **ý kiến vòng 1, chưa phải đồng thuận**. Codex chưa đọc và trả lời. Tài liệu này không đổi baseline 2.2, code, S00, bản lưu hay manifest asset.

## 0. Kết luận ngắn

1. Đồng ý cấu trúc ba quyết định của Codex: bố trí đồn trú, chuẩn bị vật tư, đánh tiếp hay bảo toàn. Đồng ý thử **một mặt** trước bốn khu.
2. **Không đồng ý tính vật tư theo từng lượt.** Câu sửa mới nhất là “tiêu hao theo quân”. Mặc định tôi đề xuất là **trừ một lần mỗi đợt công phá, theo số quân có vai trò thủ tường tại snapshot đầu trận**, có trần theo số vị trí trên tường. Nhu cầu tuyến tính nên tách hay gộp quân đều cho cùng kết quả. Báo cáo chỉ cần một dòng tiêu hao. Không phải ghi sổ 12 lần trong mỗi trận.
3. **Không đồng ý mở ngay một “kiện tiếp liệu” thành phẩm.** Lát cắt đầu nên **trừ trực tiếp gỗ/sắt trong kho thành**, kèm một mức dự trữ sàn. Cách này không thêm loại hàng, recipe, nơi chế tạo, câu hỏi vận chuyển thành phẩm hay migration tài sản. Khi đổi chủ, vật tư cũng tự đi theo kho theo B12.
4. Lát cắt của Codex còn **thừa** cổng có HP riêng và lựa chọn nỏ/đá, nhưng **thiếu** ba luật: nguồn vật tư của bên công, xung đột với câu “chặn thì xuất thành… không tường” trong B12, và việc chốt đoạn kinh tế trước khi trừ kho trong trận.

## 1. Phạm vi đã đọc và bằng chứng

Đã đọc: tóm lược nguồn, proposal Codex, `final-design.md` (B03/B04/B09/B12/B18/B23/B25; liếc B07/B08/B26), `technical-design.md` §2–4.1/§6–8, `systems-and-balance.md`, `combat-abilities.md`, `calibration-register.md`, `implementation/city-perimeter-live.md`. `app/src/game.js` chỉ grep: không có wall/gate/siege/battle, `garrison` chỉ dùng tính lương; tường/tháp là lớp hình.

SHA256: 107/107 file trong `/tmp/crownlands-defense-20261110-inputs.json` khớp trước và sau khi ghi (gồm hai đầu vào mới, canonical, `asset-production/*.json`, `app/src/game.js`); 7/7 reference-docs khớp manifest; U08 khớp manifest riêng. Không chạy app, test hay mô phỏng.

## 2. Trả lời R01–R10

| Mã | Lập trường | Lý do / chỉnh |
|---|---|---|
| R01 Bốn khu | **Đồng ý thử một mặt**, chỉnh | Không cắt quá tay: bốn khu chỉ có nghĩa khi có nhiều đạo nhiều hướng và chuyển khu, đều chưa có engine. Không lưu sẵn metadata hướng “để dành”. Khi mở: hướng cố định theo cạnh đến, đổi hướng là job thời gian thế giới. |
| R02 Hai đồng hồ | **Đồng ý** | Thêm: vật tư trừ là khoản chi rời rạc commit **cùng** trận pha 2, sau khi chốt đoạn B26 tới T (L3). |
| R03 Vai trò | **Đồng ý**, chỉnh | “Thủ tường” là nhãn nhiệm vụ trên cohort trong 3×3, không phải hàng/binh chủng mới; một vai trò mỗi mốc. Kíp chết lượt k đánh hết lượt k, từ k+1 mất thưởng. Quân đang nâng (B08) làm kíp bằng profile cũ. |
| R04 Tường vắng quân | **Không đồng ý mở job “mở lối”** | Mặc định: **0 thủ quân thì không có trận công phá**; tiếp quản B12 chạy như hiện hành, HP và kho chuyển nguyên. Đúng nguồn (“không tự tạo quân hoặc sát thương khi không có người giữ”), không thêm job. Muốn tường trống trì hoãn là lựa chọn riêng, phải đổi B12. |
| R05 Lối hẹp | **Chỉnh** | Chỉ **một** hiệu ứng: HP tường > 0 thì giới hạn quân cận chiến bên công mỗi lượt (frontage), dự bị thay quân chết theo luật đội hình; HP 0 bỏ giới hạn. Không chồng giáp tường/nỏ/đá. Hết 12 lượt theo combat §2, giữ HP/tổn thất. |
| R06 Đánh mồi/lặp | **Đồng ý**, chỉnh | Khóa theo **(owner công, settlement)**, không theo Army ID; mỗi đợt cần job chuẩn bị bằng thời gian thế giới và quân có mặt. Hao mỗi đợt có trần = vị trí × định mức: đánh mồi có giá nhưng hữu hạn. |
| R07 Sửa trong vây | **Đồng ý phương án chặt của Codex** | Chỉ sửa khi không có hostile outer holder; địch lẻ chưa giữ site không chặn. Repair xong pha 1 thì trận pha 2 cùng mốc thấy HP đã sửa. Đổi chủ khi đang sửa: hủy job, không hoàn (như B08). |
| R08 Cổng | **Không đồng ý cho cổng có HP trong lát cắt** | Cổng HP trùng nghĩa với “chặn”. Tách: (a) chính sách cổng B12 chỉ quyết định ai **qua** (hàng, đồng minh); (b) **tư thế** khi bị công: “xuất thành” (ngoài tường, như B12) hoặc “thủ tường”. Một HP cho cả mặt là đủ. Phải sửa câu B12 “chặn thì xuất thành… không tường”, bump baseline (L2). |
| R09 Đổi chủ | **Đồng ý** | Trừ thẳng nguyên liệu làm phần này gần như miễn phí: vật tư là gỗ/sắt trong kho đã chuyển theo B12. HP tường thuộc settlement, chuyển một lần. Phá ấn không trừ HP. Không thêm tháp quan sát. |
| R10 AI/phạm vi | **Đồng ý** | NPC cùng định mức/kho thật; kho địch chỉ biết qua tin hợp lệ. Thủ thành đi **sau** vòng chiếm nền. |

**Codex cắt quá tay hay quá kỹ?** Phần một mặt thì cắt hợp lý. Phần vật tư thì Codex làm **quá kỹ**: tiêu hao mỗi lượt cộng một thành phẩm riêng là hai lớp trạng thái mà câu sửa của người dùng không đòi. Phần “chọn một trong nỏ hoặc vật tư thả” vẫn thừa: dưới mô hình theo quân, lát cắt không cần thực thể vũ khí. Nỏ/đá/súc gỗ chỉ là chữ trong báo cáo cho “thưởng công sự”, cho tới khi có lý do để tách.

## 3. Mô hình tiêu hao đề xuất (mặc định Claude)

Đặt các ký hiệu, mọi số là placeholder chưa hiệu chỉnh:

- `kíp = min(Σ quân sống có vai trò thủ tường tại snapshot đầu trận, vị_trí_tường)`
- `nhu cầu_r = kíp × định_mức_r` với r ∈ {gỗ, sắt}, fixed-point ở cấp kho
- `khả_dụng_r = max(0, kho_r − dự_trữ_sàn_r)`
- `s = min(1, min_r(khả_dụng_r / nhu cầu_r))`
- Trừ `nhu cầu_r × s` cho mỗi r, một lần, commit cùng trận
- Mỗi lượt: phần thưởng công sự chỉ áp cho `s × kíp_còn_sống_đầu_lượt`. Phần còn lại vẫn đánh bằng profile thường, **không** về 0 và không được thưởng miễn phí.

Lựa chọn thật vẫn còn: bao nhiêu quân lên tường thay vì đi chinh phạt, đặt dự trữ sàn bao nhiêu, xây nhà hay giữ gỗ/sắt cho thủ thành, xuất thành hay thủ tường. Mất ô ngoại thành cho người vây làm giảm thu gỗ/sắt, nên bao vây kéo dài thì kho cạn thật. Nguồn được bảo vệ (B12) vẫn sản xuất, nên vây không thắng tuyệt đối.

**So với mỗi lượt:** mỗi lượt tiết kiệm khi kíp chết sớm, nhưng phải ghi sổ từng lượt, thêm luật thiếu hàng giữa trận, báo cáo khó đọc. Một lần mỗi đợt là “phát cấp trước trận”; kíp chết thì phần đã phát mất — cái giá dễ hiểu. Cân bằng giữa hai cách là việc CAL.

**Bên công:** trong lát cắt, bên công **không** cần vật tư. Bên công trả bằng thời gian chuẩn bị, lương tại site trong suốt cuộc vây và tổn thất khi bị frontage giới hạn. Mức HP tường mất mỗi lượt theo số quân công tham chiến là con số cần hiệu chỉnh. Đây là bất đối xứng **có chủ đích** (thủ trả vật liệu, công trả thời gian–lương) và Codex cần chấp nhận hoặc bác. Phương án đối xứng (Army mang gỗ/sắt) phải mở kho hành quân ngoài lương, nên để sau.

## 4. Lỗ hổng chính, mỗi lỗ hổng một phản ví dụ

Phân loại: **[L]** lỗi logic bắt buộc sửa · **[D]** lựa chọn thiết kế · **[N]** số cần hiệu chỉnh.

- **L1 [L] Nguồn vật tư bên công chưa định nghĩa.** Proposal yêu cầu “quy tắc công/thủ nhất quán” nhưng không nói bên công lấy vật tư ở đâu, mà B12 cấm outer holder dùng kho nội thành. Phản ví dụ: đạo quân A vây thành B, không có trại gần. Nếu bên công cũng cần kiện thì A không bao giờ phá được tường. Nếu không cần thì luật đã bất đối xứng mà không ai ghi lại. Cách sửa: chọn tường minh như §3.
- **L2 [L] B12 “chặn thì xuất thành… không tường” mâu thuẫn với thủ tường.** Phản ví dụ: chủ thành đặt cổng “chặn”. Theo B12 thì trận diễn ra ngoài tường, nên toàn bộ công sự và vật tư vô dụng. Theo proposal thì tường lại có tác dụng. Cách sửa: tách tư thế khỏi quyền qua cổng (R08), có bump version.
- **L3 [L] Chưa chốt đoạn kinh tế trước khi trừ kho.** Kho gỗ 100 lúc T−1h, +50/h; trận lúc T đọc cache thấy 100 thay vì 150, `s` và kết quả lệch giữa 1× và 8×. Sửa: chi trong trận tách đoạn B26 tại T, ledger `siege_supply`.
- **L4 [L] Khóa lặp theo Army.** Tách 5 Army, 5 đợt cùng mốc: kho trừ 5 lần, tường phá 5 lần, thế giới không trôi. Sửa: khóa (owner, settlement) và job chuẩn bị (R06).
- **L5 [L] Ai được công phá.** A giữ ngoại thành; C (thù chủ thành, trung lập với A) ra lệnh công phá. B23 bắt C dừng ngoài site, proposal chưa cấm. Sửa: chỉ outer holder (hoặc cùng chủ) được công phá.
- **L6 [L] “Không bắn miễn phí” có thể bị đọc thành kíp đánh 0.** Kho 0, 120 kíp thành bia đỡ. Sửa: kíp thiếu vật tư đánh profile thường, chỉ mất thưởng.
- **L7 [L] Repair và đổi chủ cùng mốc.** Repair xong pha 1 tại T, tiếp quản xong pha 5 tại T: không ghi rõ dễ thành hoàn tiền cho chủ cũ. Sửa: repair commit trước, HP chuyển như tài sản, không hoàn.
- **D1 [D] Tường trống (R04).** Chọn “0 thủ quân thì không có trận”. Phản ví dụ phương án Codex: mở lối đòi thiết bị mà bên công không có, tường trống bất tử. Phản ví dụ phương án tôi: tường không quân không giữ được giờ nào — chủ ý, người dùng có thể muốn khác.
- **D2 [D] Quân nhiều mặt.** Khi có bốn khu, một cohort một khu, đổi khu tốn thời gian. Phản ví dụ: 200 quân đỡ bốn đợt cùng mốc, mỗi mặt đủ 200.
- **D3 [D] Cargo cùng mốc.** Xe 200 gỗ tới T (pha 3) không phục vụ đợt công tại T (pha 2). Hệ quả hợp lệ, cần hiện trong báo cáo.
- **N1 [N]** Định mức gỗ/sắt mỗi kíp, số vị trí tường, HP tường, hệ số thưởng công sự, frontage, thời gian chuẩn bị đợt, khóa lặp, giá/thời gian sửa. Đề nghị gom vào một nhóm CAL mới hoặc mở rộng CAL09. Không có số nào ở đây đã được kiểm.

## 5. Lát cắt đề xuất và thứ tự ghép

Điều kiện tiên quyết: vòng tuyển–hành quân–giữ ngoại thành–tiếp quản nền chạy được, với combat 3×3 có tổn thất bền.

1. **Lát D1 (thủ thành tối giản):** một HP tường mỗi thành, cấu hình cố định, chưa có cấp 1–20. Có vai trò thủ tường, tư thế xuất thành/thủ tường, tiêu hao gỗ/sắt theo §3 kèm dự trữ sàn, frontage khi HP > 0, job chuẩn bị đợt và khóa theo owner, repair job ngoài vây, báo cáo một dòng tiêu hao kèm HP trước/sau.
2. **Lát D2 (chỉ khi D1 cho thấy lựa chọn có nghĩa):** bốn khu, hướng đến, chuyển khu có thời gian.
3. **Sau nữa:** kiện thành phẩm và vận chuyển, vũ khí riêng (nỏ/đá/súc gỗ), cấp tường, tháp quan sát, vật tư bên công. Không mở trong vòng này: nhà mới, S14, kỹ năng, nghiên cứu hay asset.

Mặt trái của D1: chưa kiểm được giá trị chiến tranh đa hướng, và chưa có “cảm giác” vũ khí riêng. Tôi chấp nhận như Codex.

## 6. Ca kiểm chứng

Định mức placeholder: 1 gỗ + 0,5 sắt mỗi kíp mỗi đợt, vị trí tường 150, dự trữ sàn 0 trừ khi ghi khác. **Tôi chỉ tự tính tay phần số học vật tư của các ca dưới đây. Chưa có engine, chưa chạy test nào.** Phần kết quả trận chỉ là kỳ vọng định tính.

| Mã | Thiết lập | Kết quả kỳ vọng |
|---|---|---|
| DC-01 | 120 kíp, kho gỗ 200/sắt 100 | s = 1; trừ 120/60; còn 80/40 |
| DC-02 | Như DC-01 nhưng tách 60+60 | Trừ đúng 120/60; s, thưởng, tổn thất không đổi |
| DC-03 | 200 kíp, vị trí 150 | Kíp hiệu lực 150; trừ 150/75; 50 quân dư đánh thường, không trừ |
| DC-04 | 120 kíp, kho 60/100 | s = min(60/120, 100/60) = 0,5; trừ 60/30; còn 0/70; thưởng chỉ cho 60 kíp; 60 kíp kia vẫn đánh profile thường |
| DC-05 | Dự trữ sàn gỗ 100, kho 150/100, 120 kíp | Khả dụng 50; s = 5/12; trừ 50/25 (60 × 5/12 = 25 chẵn); kho còn 100/75 |
| DC-06 | 120 kíp, 40 chết lượt 1 | Lượt 1 đánh đủ 120; từ lượt 2 thưởng cho 80 × s; tiêu hao không đổi (đã trừ đầu trận) |
| DC-07 | Hai phe A rồi B công cùng mốc, kho 150/75, 120 kíp, không có kíp chết | Trận A trừ 120/60, còn 30/15; trận B: s = 0,25, trừ 30/15 |
| DC-08 | Chỉ có trận outer holder (không có lệnh công phá) | Trừ 0; HP tường không đổi |
| DC-09 | 0 thủ quân, outer holder đủ điều kiện | Không có trận công phá; tiếp quản B12 chạy; HP và kho chuyển nguyên |
| DC-10 | Một owner tách 5 Army, lệnh 5 đợt cùng mốc | Chỉ đợt đầu hợp lệ; 4 lệnh còn lại bị từ chối do khóa (owner, settlement) |
| DC-11 | Repair xong pha 1 tại T, đợt công pha 2 tại T; xe gỗ tới pha 3 tại T | Trận thấy HP đã sửa; xe gỗ không vào s của trận tại T |
| DC-12 | Kho gỗ 100 lúc T−1h, +50/h, trận tại T ở 1× và 8×, có save/load giữa | Cả hai đọc 150 trước khi trừ; cùng kết quả, cùng ledger |

## 7. Bất đồng còn mở và việc chưa kiểm

**Bất đồng chờ Codex trả lời:**

1. Một lần mỗi đợt (Claude) hay mỗi lượt (Codex).
2. Trừ thẳng gỗ/sắt (Claude) hay một kiện thành phẩm (Codex).
3. Tường trống không chặn tiếp quản (Claude) hay job mở lối (Codex).
4. Bỏ HP cổng và tách tư thế khỏi chính sách cổng, kèm bump B12.
5. Bên công trả bằng thời gian và lương thay vì vật tư.
6. Bỏ hẳn thực thể nỏ/đá trong D1.

**Chưa kiểm:**

- Chưa có cân bằng, độ vui hay tỷ lệ công/thủ. Chưa chứng minh “thủ tường” không luôn hơn “xuất thành”.
- Chưa có mô phỏng 12 lượt với frontage. Chưa đọc kỹ `prototype-readiness.md`, S00 JSON hay các review lịch sử.
- Chưa kiểm hiệu năng hay migration save. Số học ở §6 là tính tay trên placeholder, không phải engine test.
