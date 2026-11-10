import {test,expect} from '@playwright/test';
async function bootMine(page){await page.goto('/');await page.getByRole('button',{name:'Tạm dừng',exact:true}).click();await page.getByRole('button',{name:'Mỏ đất sét',exact:true}).click();}

test('the eight tile journey is labelled eight minutes and one real minute at8x',async({page})=>{
 await bootMine(page);await expect(page.locator('[data-march-time]')).toHaveText('8 phút');await expect(page.locator('[data-march-real]')).toContainText('8 phút thực ở 1×');
 await expect(page.locator('[data-march-per-soldier]')).toHaveText('2 lương / lính');await expect(page.locator('[data-march-food]')).toHaveText('24');
 await expect(page.locator('[data-march-food-trip]')).toContainText('1,6 lương');
 await page.getByRole('button',{name:'Tốc độ 8 lần',exact:true}).click();await expect(page.locator('[data-march-real]')).toContainText('1 phút thực ở 8×');
 await page.getByLabel('Dự trữ lương mang theo').selectOption('4');await expect(page.locator('[data-march-per-soldier]')).toHaveText('4 lương / lính');await expect(page.locator('[data-march-food]')).toHaveText('48');
});

test('selectable map army names its mixed troops and current phase with real ration detail',async({page})=>{
 await page.clock.install();await bootMine(page);await page.getByLabel('Kiếm binh xuất quân').fill('8');await page.getByLabel('Giáo binh xuất quân').fill('4');await page.getByRole('button',{name:'Xuất quân tới mỏ',exact:true}).click();
 const marker=page.locator('[data-map-army="1"]');await expect(marker).toBeVisible();await expect(marker).toContainText('8 Kiếm I · 4 Giáo I');await expect(marker).toContainText('Đang đi');
 await marker.click();const detail=page.getByTestId('army-detail');await expect(detail).toContainText('8 Kiếm binh I');await expect(detail).toContainText('4 Giáo binh I');await expect(detail.locator('[data-army-per-soldier]')).toHaveText('2 lương / lính');await expect(detail).toContainText('1 lương / lính / giờ');
 await page.getByRole('button',{name:'Tốc độ 8 lần',exact:true}).click();await page.getByRole('button',{name:'Tiếp tục',exact:true}).click();await page.clock.runFor(61000);
 await expect(marker).toContainText('Khai thác');await expect(detail.locator('[data-army-phase]')).toHaveText('Đang giữ và khai thác');await expect(detail.locator('[aria-current="step"]')).toHaveText('2. Khai thác');
 await page.getByRole('button',{name:'Rút đạo quân đang xem',exact:true}).click();await expect(marker).toContainText('Đang về');await expect(detail.locator('[data-army-phase]')).toHaveText('Đang về thành');
});

test('army identity is keyboard accessible and fits a small screen',async({page})=>{
 await page.setViewportSize({width:390,height:844});await bootMine(page);await page.getByRole('button',{name:'Xuất quân tới mỏ',exact:true}).click();
 const marker=page.locator('[data-map-army="1"]');await marker.focus();await expect(marker).toBeFocused();await page.keyboard.press('Enter');
 await expect(page.getByTestId('army-detail')).toContainText('12 Kiếm binh I');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
