# Biên bản kiểm tra bộ tài liệu 2.3

Ngày 10/11/2026 · Phạm vi: cập nhật tài liệu sau [Claude review nghiên cứu và thu–chi](reviews/2026-11-10-research-and-economy-claude-review.md), theo [resolution của Codex](reviews/2026-11-10-research-and-economy-resolution.md). Các làm rõ cuối của coordinator chưa được Claude review lại.

## Phân biệt kết quả và dự kiến

[Preset 2.3](prototype/research-economy-preset.json) là dữ liệu hiệu chỉnh, chưa phải ruleset chạy trong app. [Báo cáo máy đọc](prototype/research-economy-validation.json) tách kiểm tra tĩnh/phép tính khỏi 22 ca RE23 dự kiến. Các ca RE23 vẫn `not-run`; đợt tài liệu này không chạy engine, AI, chiến đấu, nghiên cứu, migration hay playtest.

Bằng chứng của phần kinh tế/tuyển đã triển khai xem tại [kiểm chứng nền](implementation/foundation-validation.md) và [kiểm chứng Doanh trại](implementation/barracks-validation.md). Không dùng những kết quả đó để tuyên bố các luật mới 2.3 đã được thực thi.

## Kiểm tra bảo toàn và tính nhất quán

Kết quả lệnh kiểm tra sau cùng được ghi ở trường `checks` trong báo cáo máy đọc, gồm:

- SHA256 của bảy tài liệu tham khảo, attachment U08 và đề xuất nghiên cứu U11; đối chiếu byte của các nguồn, đề xuất và review trước đợt sửa.
- [Archive v2.2](archive/crownlands-design-v2.2.zip): 82 entry, kiểm ZIP integrity và hash từng entry so với snapshot trước sửa. Hash archive: `7adf75206efa7672a34675f3a7c2a56bddea3928f36ffabbc58a95acc2a4deb7`.
- S00, static validation 2.2, ba JSON asset, art bible và các brief giữ nguyên byte so với snapshot; không đổi định dạng bản lưu hoặc triển khai luật mới vào app.
- Liên kết Markdown nội bộ ngoài archive, đủ định nghĩa B01–B33 và nguồn thẩm quyền D35/U11/C11/C12; ID RE23 duy nhất, đầy đủ và chưa chạy.
- Bảng cấp Doanh trại 0–20, mốc nội suy, bốn mức công nghệ và điều kiện tiền nhiệm; số học hữu tỷ không làm tròn sau mỗi quân.

**Kết quả đã chạy:** 18 nhóm kiểm tra đạt; 340 đích liên kết nội bộ tồn tại; 55 file nguồn/lịch sử/ghi nhận triển khai và 9 file S00/asset contract khớp snapshot. Archive 82 entry đạt integrity và đối chiếu hash. Cả 52 file app/scripts theo dõi khớp snapshot trước đợt chốt. Không có ca engine RE23 nào đã chạy.

[Static validation 2.2](prototype/static-validation.json) vẫn là chứng cứ lịch sử của S00. Những số như “179 link / 0 ảnh” thuộc snapshot trước sản xuất proof; trạng thái asset hiện hành xem [README](README.md) và manifest, không dùng con số cũ làm tiến độ hiện tại.

## Phép tính tham chiếu

| Phép tính độc lập | Kết quả cần khớp |
|---|---|
| 500 kiếm + 400 giáo + 300 cung + 100 kỵ + 20 voi III, theo bảng ví dụ nguồn | 1.320 quân; 2.180 lương + 200 gỗ + 270 sắt/giờ |
| 8 giờ hành quân với lương ×1,25 và 2 giờ đóng quân | 26.160 lương; nếu bật cùng rate bảo dưỡng trong 10 giờ còn cần 2.000 gỗ + 2.700 sắt |
| Sổ ngân sách nguồn | Ròng +1.900 gỗ / +1.500 đất sét / +2.030 sắt / +1.760 lương |
| Thêm 500 kỵ III | Lương −490/giờ; ngừng nhận kế hoạch xuất mới 1.400 thì +910 |
| Không phát sinh xây/nghiên cứu/xuất trong sổ gốc | +3.610 lương; sau thêm 500 kỵ còn +1.360, không phải hoàn tiền khi hủy việc đã trả |
| 10 hoặc 14 xe, tải hữu dụng 1.000, hai chiều tổng 6 giờ, hao 5% giả định | 1.583,33 hoặc 2.216,67 lương/giờ; 14 xe không đủ nếu phục vụ trên khoảng 6,06 phút |
| Sản lượng +30%, lương −20%; thêm thưởng Đại thành +40% trên base | Tỷ số riêng nguồn lương 1,625 và 2,125; không phải hệ số toàn bộ sức mạnh |
| Kiếm I, Doanh trại 20, chưa có công nghệ / công nghệ IV | 32 / 20 giây game mỗi quân theo preset |
| 1.000 kiếm I, Doanh trại 5 và công nghệ I | `ceil(38.000 / 1,1) = 34.546` giây; không phải 35.000 |

Đây là kiểm số của ví dụ/preset, không gọi code mô phỏng. Bảng 1.320 quân III nằm ngoài roster thử 14 profile; hao xe 5% và bảo dưỡng ví dụ chưa được bật trong core. Năng lực tuyến bình quân không bảo đảm xe tới trước lúc kho cạn.

## Phần còn phải hoàn thiện trước triển khai

[G23-01–G23-05](calibration-register.md) là cổng luật về bảo dưỡng, bảo trì, công sự D1, hành trang sau thương vong và phân bổ thuế/dân sinh. Các cổng này khác việc chọn số CAL. Giá/công nghiên cứu, công nâng, sản lượng cấp cao và lịch đói vẫn cần fixture và kiểm thử đúng phạm vi.

Chốt 2.3 xác định hướng triển khai và phần hoãn; không xác nhận game đã cân bằng hoặc các module mới đã chạy.
