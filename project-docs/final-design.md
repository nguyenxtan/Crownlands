# Crownlands — thiết kế chuẩn 2.3

Phiên bản 2.3 · 10/11/2026 · Kế thừa 2.2; chốt nghiên cứu/thu–chi B29–B33 sau [Claude review](reviews/2026-11-10-research-and-economy-claude-review.md) và [resolution](reviews/2026-11-10-research-and-economy-resolution.md). Art contract 2.0 giữ nguyên.

**Ủy quyền U11:** chủ dự án yêu cầu hạn mức theo nhà binh, nhịp ít/chậm hơn, tuyển liên quan nghiên cứu, và “cái nào review được với claude rồi thì chốt thôi”. B29–B33 là lựa chọn của coordinator theo ủy quyền này. Các số là preset CAL, không phải lời user chốt từng con số hoặc kết quả đã cân bằng. App nền 0.2 và S00 design 2.2 chưa được nâng engine trong đợt docs này.

**Nguồn ủy quyền U09:** chủ dự án yêu cầu chốt phương án, viết tài liệu cuối để chuẩn bị giai đoạn 2 — asset. Codex lựa chọn các mặc định dưới đây từ nguồn U08 và các vòng phản biện với Claude. Đây là baseline có hiệu lực cho sản xuất asset, không phải tuyên bố game đã được lập trình, chơi thử hoặc cân bằng.

B01–B28 kế thừa bản 2.2, B29–B33 bổ sung hiện hành dưới đây. Chỉ số giá, sát thương, lương, tốc độ và thời lượng được quản lý trong [sổ hiệu chỉnh](calibration-register.md); không gọi những chỉ số chưa thử là đã cân bằng. Thay dòng quân, nhánh, camera, bố cục hoặc phạm vi sản xuất phải cập nhật baseline, không tự mở rộng trong lúc tạo ảnh.

## 1. Đích sản phẩm

**B01 — Game chiến thuật một người, web offline, 2 D, ưu tiên desktop.** Người chơi xây đế chế trong một thế giới tiếp diễn qua bản lưu và cạnh tranh với vương quốc NPC. Không tài khoản/server nhiều người, thanh toán hoặc dịch vụ AI online làm tiền đề. Đích UI 1440 ×900, tối thiểu 1024 ×768; bản mobile riêng để sau.

Giữ thành tròn/ô cố định, năm dòng quân, bố trận tự tính và báo cáo; không hoạt cảnh giao chiến. Hình chi tiết nội thành và biểu tượng bản đồ là hai bộ có tỷ lệ riêng.

**B02 — Nhịp offline:** pause dừng mọi phe; chọn tốc độ 1 ×/2 ×/4 ×/8 × và tua tới sự kiện đáng chú ý. Đóng game không tính bù giờ đời thực. Có thể đặt lệnh khi pause tại cửa lệnh hợp lệ. Tự dừng khi giao chiến/đổi chủ hoặc cảnh báo lương quan trọng được phép biết.

Lưu tay ba slot, một quicksave, năm autosave luân phiên; autosave mỗi năm phút đời thực khi đang chơi và tại điểm an toàn trước các biến động lớn. Khoảng lưu không làm thế giới trôi khi pause/đóng. Có export/import save. Chỉ lưu giữa bước nguyên tử, giữ bản trước nếu ghi lỗi.

## 2. Thế giới, thành và tài nguyên

**B03 — Bản đồ ô vuông logic**, địa hình hiển thị tự nhiên, lưới có thể bật/tắt. Vùng thử 64 ×64 ô, khuôn thế giới đầu 128 ×128 ô; mở quy mô sau đo hiệu năng. Chưa có hàng hải hoặc giao chiến trên đoạn đường. Không chia nhánh quân thành các lục địa/tài nguyên riêng.

**B04 — Một bố cục thành:** 14 ô nội thành cố định, 16 ô tài nguyên ngoại thành (4 gỗ, 4 đất sét, 4 sắt, 4 lương). Công trình và ô tài nguyên có trần 20. Ô chưa xây là 0, không phải cấp quân. Sức mạnh thực không suy từ một con số cấp thành.

Tên hiển thị “cấp thành” dùng cấp Phủ làm mốc hành chính/ngoại hình, ghi rõ không là tổng quân lực. Hạng mục tiêu NPC 1–20 là đánh giá riêng theo cấu hình/thông tin được biết; công thức rating thuộc hiệu chỉnh, không đổi asset.

| Ô | Công năng khóa cho layout |
|---|---|
| S01 | Phủ thành |
| S02 / S03 | Kho tài nguyên / Kho lương |
| S04 / S05 | Điểm tập kết / Doanh trại |
| S06 / S07 | Học viện / Trạm vận tải |
| S08 / S09 / S10 | Lò rèn / Chuồng ngựa / Trại voi |
| S11 | Dinh điều hành, mở sâu sau vòng lõi |
| S12 / S13 | Vị trí kho tài nguyên/lương bổ sung |
| S14 | Ô dự trữ cho công trình tương lai, hiện để trống |

Tường/cổng là lớp bao thành riêng, không chiếm một ô nhà. Trạm vận tải đảm nhiệm xe nội bộ; giao thương NPC tương lai có thể dùng nơi này, không mở chợ phức tạp chỉ để có xe. Trạm cứu thương, Xưởng công thành và Tháp quan sát chưa thuộc bộ nhà lõi.

Giữ bốn tài nguyên, kho cục bộ và vận chuyển thật. Nguồn được bảo vệ/ngoại thành được gắn khu kiểm soát rõ. Mỏ thế giới có trần năng suất và kho; bản đầu không cạn tài nguyên theo chu kỳ. Không thêm vàng/mana/thép như tài nguyên bắt buộc.

## 3. Quân, công nghệ và biên chế

**B05 — Năm dòng, I–V, ba đường chuyên hóa.** Kiếm/giáo/cung/kỵ/voi giữ nhận diện. I–III dùng nền chung; IV–V đi theo **Quân chế (`martial`), Thánh Quang (`radiant`), Hắc Ảnh (`umbral`)**. Quân chế là đường hoàn chỉnh. Thánh/Hắc không mặc định thiện/ác hoặc bạn/địch.

45 profile là đích nội dung dài hạn nếu mọi tổ hợp tồn tại. Bộ đại diện đầu có 14 profile theo [roster khóa](asset-production/unit-roster.json): kỵ I–III và IV ba đường; bốn dòng khác I–II. Kỵ IV Thánh mang tên **Kỵ vệ Thánh Ấn**; **Paladin/Thánh kỵ sĩ** dành cho kỵ V Thánh, chưa nằm trong 14 profile. Kiếm Thánh vẫn là bộ binh.

**B06 — Kiến thức toàn đế chế, cơ sở và thanh toán địa phương.** Một dự án nghiên cứu toàn đế chế tại một thời điểm; cùng công nghệ không chạy hai bản. Học viện mở kiến thức; Lò rèn và nơi tuyển quyết định thành nào sản xuất/nâng được. Không cộng tốc độ bằng nhiều Học viện. Công nghệ xong không tự nâng quân.

Kiến thức hoàn tất giữ khi mất Học viện hoặc tái lập; dự án dở tại thành bị chiếm hủy, phần đã tiêu không hoàn cho chủ cũ, chủ mới không nhận công nghệ. Giữ cấp nhà khi chiếm, không nhận kiến thức của chủ cũ. Công cụ lọc/cảnh báo/giảm thao tác cơ bản có từ đầu, không khóa sau nghiên cứu.

**B07 — Hạn mức theo suất có trọng số**, tách sức chứa nơi đóng và khả năng nuôi. Nguồn cap theo cấp Doanh trại ở B29; không tự đổi fixture S00 cũ. Mỗi phần quân có gốc; đi xa/giữ mỏ/ở trại/đang nâng vẫn tính. Quân đang tuyển giữ chỗ; trọng số theo profile được hiệu chỉnh. Mất gốc không xóa/chuyển chủ quân: vào chờ biên chế, không tuyển/nâng thêm từ nguồn đã mất. Gán lại cần thành cùng chủ đủ suất.

**B08 — Tuyển thẳng hoặc nâng một phần quân cũ tại chỗ.** Công nghệ/cơ sở/kho/suất đủ mới nhận lệnh. Job nâng/chuyển nhánh hoàn tất cả lô còn sống tại một mốc. Trong lúc làm, quân vẫn là thủ quân, đánh bằng profile cũ, chưa được hành quân. Muốn đi phải hủy trước.

Quân chết giảm job và giải phóng suất tương ứng ngay. Suất tăng giữ trước; suất giảm chỉ trả khi đổi xong. Hủy giải phóng **phần giữ biên chế** hợp lệ, không hoàn chi raw đã trả theo B30. Core chưa có reservation nguyên liệu hoặc hủy tuyển chủ động; nâng có thể hủy để rút quân, không hoàn chi đã tiêu. Mất cơ sở/chủ địa điểm hủy job. Mất riêng thành gốc làm job tạm dừng, chỉ tiếp tục khi gán nguồn cùng chủ hợp lệ; không lấy suất chủ mới.

Chỉ một profile/nhánh có hiệu lực. Có thể học và trộn nhiều nhánh trong một đạo quân, không bất mãn tự sinh. Chưa có XP từng lính, item hoặc hệ chữa thương riêng. Nâng không tự hồi sinh/hồi máu. So đường tuyển/nâng theo nhiều chi phí, không ép một đường luôn rẻ hơn hoặc nhanh hơn.

## 4. Chiến đấu và năng lực

**B09 — Trận tự giải quyết trên lưới 3 ×3**, tối đa 12 lượt cho preset đầu; phân bổ/đội hình được chọn trước. Không ra lệnh phép giữa trận. Năng lực lõi: **Hộ trận, Phá ấn, Trang bị chuyên dụng**. Nguyền/Thanh tẩy/Kỷ luật làm sau; không thêm sợ hãi chỉ để có kỹ năng chống nó.

**B10 — Hộ trận là một quỹ chung theo tuyến/loại.** Tổng đóng góp tỷ lệ quân nguồn sẵn sàng, không có phần cố định theo số nhóm. Nhiều nhóm cùng rút từ một quỹ; phân bổ hấp thụ cùng lượt theo tỷ lệ sát thương hợp lệ và quy tắc phần dư đối xứng. Quỹ chụp khi kích hoạt, tồn tại kể cả nguồn chết đến khi cạn/hết hạn/hết trận; không tái sinh hoặc nhân lên khi gộp nhóm.

Phá ấn giảm quỹ mục tiêu trước sát thương trong giới hạn profile; không tạo tài nguyên. Trigger, chọn tuyến và trường hợp không có quỹ theo [đặc tả năng lực](combat-abilities.md). Trang bị chuyên dụng củng cố một lợi thế dòng vốn có, không miễn phản chế. Hiệu ứng chỉ tồn tại trong trận lõi; thời hạn tính lượt. Hồi tính thời gian thế giới, lưu theo bucket quân. Tách giữ mốc; gộp không lấy mốc sớm nhất cho tất cả; đổi nhánh dùng `max(old_ready, finish + rearm_new)`, không rửa hồi qua nhánh bị động/load.

**B11 — Hai lớp đọc được:** ma trận tương khắc theo dòng trước, hiệu ứng/quỹ sau; nhánh không sửa K. Dấu lợi/bất lợi khóa như sau, không bảo đảm kết quả trận bất kể ngân sách:

| Công → thủ | Kiếm | Giáo | Cung | Kỵ | Voi |
|---|---|---|---|---|---|
| Kiếm | = | + | + | − | − |
| Giáo | − | = | − | + | + |
| Cung | − | + | = | − | + |
| Kỵ | + | − | + | = | − |
| Voi | + | − | − | + | = |

Hệ số, stats và quỹ là hiệu chỉnh, không kết luận bậc cao luôn thắng hoặc quân thấp luôn còn giá trị mọi lúc. Báo cáo giải thích dòng/bậc/nhánh, quỹ, tổn thất, hàng và kiểm soát. Không hồi sinh, triệu hồi vô hạn hoặc teleport.

## 5. Chinh phục và hậu cần

**B12 — Một quy trình chuyển quyền.** Tách chủ, thủ quân, người giữ ngoại thành, job tiếp quản và phục hồi. Công phá/vây/rút là lựa chọn chiến dịch; đầu hàng nhiều điều khoản chưa thuộc bản lõi.

Tiếp quản chỉ chạy khi giữ ngoại thành, hết thủ quân đối kháng, đủ lực giữ cấu hình và có lương. Hoàn tất đổi chủ một lần; mất điều kiện hủy về 0, thắng toán nhỏ mà vẫn đủ điều kiện không reset. Thành mới chiếm vẫn có thể bị đánh lại. Kho/công trình ở lại, không chia cấp vì nhầm tỷ lệ tái lập; quân cũ giữ chủ.

Chỉ nguồn thật sự mất kiểm soát mới ngừng sản xuất. Kho và nguồn được bảo vệ vẫn dùng. **Bên giữ ngoại thành** chọn chặn/để ngỏ đối với quân trong thành chủ động rút/xuất; bị chặn thì giao chiến ngoài tường. Khi bị assault vào thành, thủ quân vẫn dùng công sự hợp lệ, không bị ép xuất thành vì chính sách đó. Đoàn đã rời không bị kéo lại vì đổi lập trường. Không có miễn tấn công toàn cầu.

Hàng kiểm tra quyền/cổng lúc tới. Dỡ phần còn chỗ theo B31; phần không nhận được về nguồn một lần, tìm nơi cùng chủ hợp lệ nếu cần, không có thì kẹt có thông báo. Hàng không mất/nhân hoặc quay vòng vô hạn; hủy hàng kẹt chỉ bằng lệnh hợp lệ có sổ. Trại không sản xuất miễn phí; nguồn nuôi site/hành trang theo B31. Xe có chu kỳ đi/về thật. Tuyến đặt sẵn có dự trữ/ngân sách/số xe, không tự quyết chiến tranh.

## 6. Phe, đoàn và mục tiêu

**B13 — Phe, nhánh, quan hệ tách biệt.** Tên nội dung khóa dùng trong production: Vương triều Thiết Quan, Hắc triều Tro Tàn; Giáo đoàn Bình Minh dành mở rộng. Một phe thiên nhánh không có nghĩa mọi quân đều thuộc nhánh đó. Quan hệ lõi trung lập/thù địch, cấu hình theo scenario và lưu, không tự đánh vì chữ Thánh/Hắc.

A1 dùng Hắc triều làm đối thủ; B thêm Thiết Quan. Setup tài sản/công nghệ ban đầu được ghi nguồn, không giả vờ đã mô phỏng lịch sử hoặc cấp miễn phí giữa game. AI dùng tin quan sát, lương và cam kết, có ngân sách đầu tư; khi chưa thể đánh được phép trinh sát/đầu tư, không tự sát để đạt chỉ tiêu hoạt động.

**B14 — Đoàn là Army có mission**, hành quân/dừng/quan sát/hành động ở địa điểm. L thử một patrol có căn cứ; B thử tàn quân thật sau mất thành. Quân vẫn dùng gốc, tàn quân không có suất/tuyển mới miễn phí. Du mục/cap mobile để sau, không truyền cơ chế đó cho người chơi.

Không có trận giữa đường ở baseline đầu: hai đoàn đi ngang nhau chưa đánh, chưa cướp xe/hộ tống/đuổi bắt bằng va chạm. Truy đuổi theo nơi thấy cuối cùng, không tọa độ ẩn. Dừng chân không tạo đất hoặc thành miễn phí. Nguồn đoàn/ngân sách/trần/giải tán có sổ; cleanup không xóa tài sản sống.

**B15 — Thắng lớn là phần thưởng.** Có mốc Khai Quốc khi giữ Đại thành đầu tiên và mốc Thống Nhất theo mục tiêu scenario; được tiếp tục sandbox, không reset. Không bắt săn mọi tàn quân để tiếp tục. Đế chế lớn chịu đường xa, nhiều mặt trận và phục hồi thật, không phạt theo thành thứ 30 hoặc sinh quân bí mật.

**B16 — Phục hồi dài hạn:** mất thành cuối giữ 1/3 cấp công trình hợp lệ khi tái lập; di dân chủ động hợp lệ từ thành cuối giữ 1/2. Một quyền/nguồn dùng một lần, không quyền mới cho mỗi thành phụ bỏ. Chỉ cấp hoàn thành tại snapshot ngay trước mất quyền/commit di dân thành cuối của nguồn đó, làm tròn lên, ô rỗng vẫn 0; không chọn mốc cao nhất từ cả lịch sử. Không mang đất/quân chết/kho theo tỷ lệ, quân rút cần đi thật. A1 có thể dùng load trước khi module tái lập được xây, nhưng không thay luật bản đầy đủ.

**B17 — Thưởng Đại thành B giữ 20/20/40.** Base là sản xuất ô tài nguyên trong thành cùng chủ, trước trừ lương; không gồm mỏ/loot/trade/hỗ trợ. Nguồn Đại thành ổn định hợp lệ cho tối đa +20% đế chế, vùng có Đại thành hợp lệ thêm tối đa +20%; cộng không nhân, không lặp. Chủ khác trong vùng không tự nhận và không mất thành.

Thưởng chỉ bật sau mốc ổn định; chủ cũ dừng khi đổi chủ, không fade chồng hai chủ. Quấy rối nhỏ không tự tắt thưởng toàn đế chế; mất nguồn sản xuất thật vẫn ảnh hưởng nơi đó. Không thêm yêu cầu kết nối đường toàn cầu trước khi có luật mạng đủ rõ.

## 7. Phạm vi và sản xuất hình

**B18 — Chưa làm trong lõi:** thuế/An dân, thanh quản trị, dự bị/tự quản, hợp đồng dài hạn, nhập thành, chư hầu, du mục, thương binh/tù binh, item/XP, Thanh tẩy/Nguyền đầy đủ, công thành phức tạp, hàng hải và trận giữa đường. Các ý tưởng còn trong nguồn, không phải điều kiện để sang asset.

**B19 — Mỹ thuật khóa theo [art bible](art-bible.md):** 2 D cách điệu sáng, một kiến trúc giả tưởng; world nhìn từ trên, thành chi tiết nhìn chéo; ánh sáng chung trong từng lớp, mọi marker và chữ động tách khỏi ảnh.

**B20 — Phạm vi asset:** 14 profile đại diện, 10 nhà lõi, ba mốc hình nhà (1–6/7–13/14–20), bốn loại tài nguyên, bộ world/city/UI/hiệu ứng báo cáo. Tường riêng; Dinh điều hành/công thành và đủ 45 profile mở rộng sau. Bốn mùa là cảnh quan, không sửa hình ô/vùng bấm hoặc chỉ số kinh tế.

**B21 — Giai đoạn 2 theo ba đợt:** `proof` 16 mẫu đại diện và composite kiểm tỷ lệ; `core` bộ dùng cho lát cắt; `expansion` mùa/công trình/nội dung mở sâu. Asset chưa tạo đều có trạng thái `planned`, không coi manifest là ảnh đã hoàn tất. Hai concept cũ không là mẫu duyệt.

**B22 — Khóa cấu trúc, hiệu chỉnh số.** Giai đoạn 2 được bắt đầu từ baseline này. Cần duyệt mẫu thật của đợt proof trước nhân rộng. Những thay đổi không ảnh hưởng camera/shape/ID có thể hiệu chỉnh bằng ruleset; thay cấu trúc phải cập nhật version và danh mục tác động. Không tự sản xuất 45 quân hoặc thêm phép chỉ vì có ý tưởng trong file tham khảo.

## 8. Luật nối sau bổ sung 02

Đối chiếu U10 ở [prototype readiness](prototype-readiness.md), gồm bảng BS-01–BS-10 và điều kiện nghiệm thu. Bản 2.2 khép các khoảng hở do [Claude review 2.1](reviews/2026-11-07-supplement-02-claude-review.md) nêu, theo [resolution 2.2](reviews/2026-11-10-supplement-02-resolution.md). B23–B28 là lựa chọn nối luật của Codex theo U09, không tự duyệt bốn trạng thái ngoại giao, thuế/An dân, Nguyền/Thanh tẩy hoặc du mục trong nguồn. Số trong S00 là preset thử, chưa cân bằng. Art contract/roster/layout/manifest vẫn v 2.0, không thêm asset.

**B23 — Quyền đi/đến và nhiều phe:** ô thường không collision, không trận đường; ô site không transit, chỉ vào khi là start/đích. Trung lập qua địa hình không đồng nghĩa vào kho/cổng/khai thác đất có chủ; tấn công cần hostile/tuyên chiến. Nhiều chủ cùng đến xử lý các trận hai phía theo sequence đến; không holder thì bên sớm nhất đủ điều kiện làm ứng viên; bên trung lập với holder dừng ngoài, không đánh nhau ngoài site. Chủ thành/garrison/outer holder tách; thắng outer holder không tự đánh garrison, assault là lệnh riêng. Site mất lực giữ cuối về unclaimed, kho dưới custody thế giới tới claim hợp lệ.

**B24 — Nợ biên chế:** mất gốc/giảm capacity không xóa quân; chặn tăng, hủy hàng chờ vượt khả năng; job đang chạy pause, trả suất tăng, resume phải giữ lại suất trước, không trả chi lần hai. Đợt nợ khóa theo (owner, nguồn capacity gốc); tách/gộp/load/gán một phần không làm mới ân hạn. Sau ân hạn có phụ phí lương theo tỷ lệ thiếu suất của nguồn, chỉ đếm quân hiện hữu. Không nuôi được áp đói chung, không xóa quân lần hai. Số thử CAL02/CAL10.

**B25 — Nhánh trộn và sát thương đồng thời:** Hộ trận hỗ trợ quân cùng chủ/tuyến bất kể nhánh, dùng một quỹ; chủ khác không hưởng. Hai bên tạo quỹ → phá quỹ → từng lượt damage snapshot → phân bổ hấp thụ fixed-point (phần dư largest remainder, tie-break stable claim key) → áp casualty đồng thời. Quỹ k lượt hết hạn sau casualty lượt k. Không làm tròn số chết chung giữa profile khác HP. Giữ Thanh tẩy/Nguyền ngoài core.

**B26 — Pipeline kinh tế:** mọi bonus sản xuất cộng trên cùng base sau khả dụng/khôi phục; Great riêng trần 20/20/40 và scope thành. Core hiện tại `research_bonus = 0`; fixture base 100+Great 40%+research 20% cho 160. Mỗi kho/tài nguyên tính net = sản xuất − chi liên tục theo đoạn rồi clamp [0, cap], tách đoạn khi đổi rate/quyền hoặc chạm 0/cap; ledger tách production/paid upkeep/overflow/unmet. Event đói ở tick nguyên đầu tiên tại hoặc sau lúc chạm 0. Không thuế/An dân trong core.

**B27 — Vòng đời NPC:** settled/landless khác trạng thái thất bại quân sự và archive dữ liệu. Quân/hàng còn sống giữ chủ và lịch; không hồi sinh/tuyển/cap miễn phí khi lưu vong, không phe mới bắt buộc sau thắng. Đói kéo dài phải có hao hụt hữu hạn tới hết quân (lịch CAL10). Xe/hàng không quân và không đích của phe đã thất bại quân sự thành `dormant`, giữ ledger. Army landless tính trong trần; chặn tạo/tách khi đầy trần, không cleanup bằng xóa quân sống.

**B28 — Scenario đầu và mục tiêu:** S00 `first-foundation` 0.2-draft đặc tả 64² dựng sẵn, một thành người chơi, một vương quốc hai thành, hai mỏ và một trại địa phương. Tài sản/nguồn/guard/`ai_budget` thử đều khai; guard kiểm lúc phóng và mọi lần đổi đích; cầu là đường tắt, khám phá/tầm nhìn theo Manhattan. Nhánh mở qua nghiên cứu, không chọn khóa từ đầu. Hoàn thành vòng thành thứ hai trước tech sâu; không gọi mốc S00 là Khai Quốc khi chưa có Đại thành. Chơi tiếp sau chiến thắng.

## 9. Luật nghiên cứu và thu–chi 2.3

Chi tiết hiện hành: [nghiên cứu và kinh tế](research-and-economy.md). Bốn nhãn bắt buộc: thiết kế đã chốt / preset CAL / cổng luật chưa đủ bật / đã triển khai. Không dùng CAL che một quy tắc chưa được định nghĩa.

**B29 — Biên chế, cơ sở và nghiên cứu.** Cap thành theo cấp Doanh trại, giữ gốc/suất có trọng số B07/B24. Công huấn luyện theo profile/job, xử lý bởi cơ sở hợp lệ và công nghệ hoàn tất; Học viện cao không tự cấp bonus. Một dự án toàn đế chế, không phí áp dụng lần 2 hoặc tăng tốc nghiên cứu trong core. Giữ phần công lẻ/công đã làm, năng lực mới từ mốc thay đổi; không hồi tố. Mốc cap 200–2.500/cơ sở 40→32 giây kiếm I/research+60% cho 20 giây là [preset thử](prototype/research-economy-preset.json), không luật cân bằng. Nội suy tuyến tính từng đoạn, cap làm tròn bội 10, thời gian hữu tỷ. Chưa thay fixture S00 cũ.

**B30 — Sổ tài sản và trả trước.** Tách raw đang có, phần giữ là tập con, khả dụng, đã chi, Shipment và hành trang Army. Core trả đủ trước khi nhận lệnh tuyển/nâng/nghiên cứu/xây; không giữ cùng raw đó trong kho. Core chưa dùng reservation nguyên liệu/hợp đồng; giữ biên chế là loại khác. Công nghệ giảm giá không hoàn tiền đã trả; hủy không hoàn chi đã tiêu. Các dòng “trong giờ” là tổng chi thật tại mốc, không phí liên tục sau khi đã trả. Mức dự trữ sàn là policy, không kho khác.

**B31 — Nguồn nuôi và giao hàng.** Hành trang thuộc Army, không Shipment. Kho cùng chủ/quyền tại nơi đóng trả nhu cầu trước, hành trang bù phần thiếu; đi/ở nơi không có quyền dùng kho chỉ dùng hành trang. Mỗi quantum nhu cầu chỉ trả một lần; gốc quản cap, không tự nuôi từ xa. Casualty/đi/đến đổi chi đúng mốc. Cargo pha 3 dỡ từng loại theo chỗ trống; phần dư trên xe theo B12, kẹt có thông báo và lệnh hủy rõ lượng với ledger`discarded`. Không kho tạm vô hạn/hàng mất ngầm. Army bị diệt giữ raw tại site/khu dưới custody để claim/load hợp lệ, không tự cộng kho bên thắng hoặc lấy loot nội thành qua outer holder.

**B32 — Thiếu lương không reset.** Nợ đói theo bucket quân, tách giữ trạng thái, gộp không bình quân hoặc lấy mốc no nhất. Nợ tăng theo phần unmet và thời gian, đủ khẩu phần mới hồi dần với 0<ρ≤1 (CAL10). Một ít lương không reset nợ; load/đổi gốc không rửa đói. Giữ hậu quả hữu hạn B27 và không trừ/xóa cùng quân lần hai do nợ cap. Dự báo xét lịch thực/đường về, không chỉ bình quân tuyến.

**B33 — Chi vận hành, bảo dưỡng và vật tư.** Chốt phân biệt đầu tư/vận hành/duy trì/tiêu hao/chuyển chủ. Lương và đầu tư dùng trước; chưa thu thêm bảo dưỡng gỗ/sắt, bảo trì mọi nhà, hành chính hoặc hỏng lương. Muốn bật phải có nguồn vật tư thật ở mọi tư thế và hậu quả thiếu/khôi phục đúng chức năng; không né phí bằng hành quân. D1 sau combat nền dùng vật tư một lần trong commit assault hợp lệ theo kíp/trần/vật tư thật, không animation/kíp ảo/phí phép; các luật targeting/công phá còn cổng trước bật. Thuế/An dân và các module hoãn ở B18 không tự trở lại core. Số 1320 quân bậc III/hao 5% xe chỉ là ví dụ ngoài roster/core.

## 10. Bàn giao

- [Art bible](art-bible.md): camera, tỷ lệ, màu, alpha và định dạng.
- [Kế hoạch asset](asset-production-plan.md): thứ tự, nghiệm thu, vai trò từng file.
- [Manifest](asset-production/asset-manifest.json), [roster](asset-production/unit-roster.json), [layout](asset-production/city-layout.json): dữ liệu sản xuất.
- [Bổ sung 02 và S00](prototype-readiness.md): các khoảng hở đã giải quyết, ngoại lệ, thứ tự dựng và ca kiểm chưa chạy.
- [Sổ hiệu chỉnh](calibration-register.md): phần còn phải đo trước/lúc làm game; không chặn phác thảo asset.
- [Lịch sử review](reviews/2026-11-07-branches-and-mobile-npcs-resolution.md): nguồn lập luận, không ghi đè baseline hiện hành.

Đã có asset proof và subset kinh tế/tuyển quân, xem [README](README.md) và `implementation`. Bản chốt 2.3 không nâng runtime, không chứng minh nghiên cứu/hậu cần/AI/combat/thu–chi mở rộng đã chạy; chưa có playtest hoặc cân bằng toàn game.
