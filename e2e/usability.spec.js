import {test,expect} from '@playwright/test';
const openCity=async page=>{await page.goto('/');await page.getByRole('button',{name:'Nội thành',exact:true}).click();};

test('resource cards distinguish name, stored amount, capacity and net income',async({page})=>{
  await page.goto('/');
  for(const [resource,name,cap] of [['wood','Gỗ','4.000'],['clay','Đất sét','4.000'],['iron','Sắt','4.000'],['grain','Lương thực','6.000']]){
    const card=page.locator(`[data-resource="${resource}"]`);
    await expect(card.locator('.res-name')).toHaveText(name);await expect(card.locator('.resource-cap')).toContainText(`Kho ${cap}`);
    await expect(card.locator('.resource-rate')).toContainText('/ giờ');
  }
  await expect(page.getByTestId('stock-grain')).toHaveText('1.800');
  await expect(page.locator('[data-resource="grain"] .resource-rate')).toContainText('Ròng +348');
  await expect(page.getByRole('button',{name:'Tạm dừng',exact:true})).toContainText('Tạm dừng');
  await page.getByRole('button',{name:'Tạm dừng',exact:true}).click();
  await expect(page.getByRole('button',{name:'Tiếp tục',exact:true})).toContainText('Tiếp tục');
});

test('work overview keeps recruitment visible after leaving the barracks and locates it',async({page})=>{
  await page.clock.install();await openCity(page);await page.getByRole('button',{name:'Tạm dừng',exact:true}).click();
  await page.locator('[data-slot="S05"]').click();await page.locator('#recruit-count').fill('3');await page.getByRole('button',{name:'Huấn luyện',exact:true}).click();
  await page.locator('[data-plot="R04"]').click();await page.getByRole('button',{name:'Nâng lên cấp 2',exact:true}).click();
  await page.locator('[data-slot="S01"]').click();const work=page.getByRole('region',{name:'Công việc trong thành'});
  await expect(work).toBeVisible();await expect(work).toContainText('1 nâng cấp');await expect(work).toContainText('1 lệnh tuyển');
  await expect(work.getByRole('button')).toHaveCount(2);
  await work.getByRole('button',{name:'Xem huấn luyện Kiếm binh tại Doanh trại',exact:true}).click();
  await expect(page.getByTestId('barracks-detail')).toBeVisible();await expect(page.getByTestId('reserved-count')).toHaveText('3');
  await page.reload();await page.getByRole('button',{name:'Nội thành',exact:true}).click();await expect(work.getByRole('button')).toHaveCount(2);
});

for(const width of [320,390])test(`mobile management uses the full width and clear navigation at ${width}px`,async({page})=>{
  await page.setViewportSize({width,height:844});await openCity(page);await page.locator('[data-plot="R04"]').click();
  await page.getByRole('button',{name:'Xem thông tin đang chọn',exact:true}).click();
  const detail=await page.locator('#detail').boundingBox(),nav=await page.locator('.sidebar').boundingBox();
  expect(detail.width).toBeGreaterThan(width-50);expect(detail.y).toBeGreaterThanOrEqual(nav.y+nav.height);
  expect(await page.locator('.resource').evaluateAll(cards=>cards.every(card=>card.scrollWidth<=card.clientWidth))).toBe(true);
  for(const name of ['Gỗ','Đất sét','Sắt','Lương thực'])await expect(page.locator('#detail .cost-label',{hasText:name})).toBeVisible();
  await expect(page.locator('#detail')).toContainText('Chi phí trả ngay');
  await expect(page.locator('.known-sites')).toBeHidden();
  await page.getByRole('button',{name:'Thế giới',exact:true}).click();
  await expect(page.getByLabel('Bản đồ thế giới')).toBeVisible();await expect(page.locator('.known-sites')).toBeVisible();
  await expect.poll(async()=>{const area=await page.locator('#play-area').boundingBox(),chrome=await page.locator('.sidebar').boundingBox();return area.y-chrome.y-chrome.height;}).toBeGreaterThanOrEqual(-1);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  for(const entry of ['#enter-city','#goal-city']){
    await page.locator(entry).click();await expect(page.locator('#city-view')).toBeVisible();
    await expect.poll(async()=>{const area=await page.locator('#play-area').boundingBox(),chrome=await page.locator('.sidebar').boundingBox();return area.y-chrome.y-chrome.height;}).toBeGreaterThanOrEqual(-1);
    await page.getByRole('button',{name:'Thế giới',exact:true}).click();
  }
});
