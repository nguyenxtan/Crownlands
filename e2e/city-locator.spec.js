import {test,expect} from '@playwright/test';
import {readFile} from 'node:fs/promises';

const openCity=async page=>{await page.goto('/');await page.getByRole('button',{name:'Nội thành',exact:true}).click();};
const openFinder=async page=>{await page.getByRole('button',{name:'Tìm nhanh trong thành',exact:true}).click();return page.getByRole('dialog',{name:'Tìm trong thành',exact:true});};

test('finder lists actual states and locates a building from an unaccented search',async({page})=>{
  await openCity(page);const finder=await openFinder(page);
  await expect(finder.locator('.locator-results button')).toHaveCount(30);
  await finder.getByRole('button',{name:'Công trình',exact:true}).click();
  await expect(finder.locator('.locator-results button')).toHaveCount(14);
  const search=finder.getByRole('searchbox',{name:'Tìm công trình hoặc ô tài nguyên'});
  await search.fill('dinh dieu hanh');await expect(finder.locator('.locator-results')).toContainText('Chưa mở');
  await search.fill('chuong ngua');await expect(finder.locator('.locator-results')).toContainText('Chưa xây');
  await search.fill('doanh trai');await expect(finder.locator('.locator-results')).toContainText('Đã xây');
  await finder.getByRole('button',{name:/Định vị Doanh trại/}).click();await expect(finder).not.toBeVisible();
  const barracks=page.locator('[data-slot="S05"]');await expect(barracks).toHaveAttribute('aria-pressed','true');await expect(barracks).toHaveClass(/\blocated\b/);
  await expect(page.locator('#detail')).toContainText('Doanh trại');expect(Number.parseInt(await page.getByTestId('city-zoom').textContent())).toBeGreaterThanOrEqual(200);
  const viewport=await page.locator('#city-stage').boundingBox(),target=await barracks.boundingBox();
  expect(target.x+target.width/2).toBeGreaterThan(viewport.x);expect(target.x+target.width/2).toBeLessThan(viewport.x+viewport.width);
});

test('resource search supports short slot IDs, live upgrading state and no-result feedback',async({page,context})=>{
  await openCity(page);await page.getByRole('button',{name:'Tạm dừng',exact:true}).click();await page.locator('[data-plot="R04"]').click();
  await page.getByRole('button',{name:'Nâng lên cấp 2',exact:true}).click();
  await page.evaluate(async()=>{await navigator.serviceWorker.ready;if(!navigator.serviceWorker.controller)await new Promise(r=>navigator.serviceWorker.addEventListener('controllerchange',r,{once:true}));});
  await context.setOffline(true);await page.reload();await page.getByRole('button',{name:'Nội thành',exact:true}).click();
  const finder=await openFinder(page);await finder.getByRole('button',{name:'Tài nguyên',exact:true}).click();
  await expect(finder.locator('.locator-results button')).toHaveCount(16);
  const search=finder.getByRole('searchbox',{name:'Tìm công trình hoặc ô tài nguyên'});
  await search.fill('khong co vi tri nay');await expect(finder).toContainText('Không tìm thấy vị trí phù hợp');
  await search.fill('R4');await expect(finder.locator('.locator-results button')).toHaveCount(1);await expect(finder.locator('.locator-results')).toContainText('Đang nâng');
  await finder.getByRole('button',{name:/Định vị Ruộng lương ô 4/}).click();
  await expect(page.locator('[data-plot="R04"]')).toHaveClass(/\blocated\b/);await expect(page.getByTestId('plot-detail')).toContainText('Ô 4');
});

test('simultaneous completions notify once on the world scene and locate the completed plot',async({page})=>{
  await page.clock.install();await openCity(page);await page.getByRole('button',{name:'Tạm dừng',exact:true}).click();
  for(const id of ['R04','R01']){await page.locator(`[data-plot="${id}"]`).click();await page.getByRole('button',{name:'Nâng lên cấp 2',exact:true}).click();}
  await page.getByRole('button',{name:'Thế giới',exact:true}).click();await page.getByRole('button',{name:'Tốc độ 8 lần',exact:true}).click();
  await page.getByRole('button',{name:'Tiếp tục',exact:true}).click();await page.clock.runFor(15100);
  const notice=page.getByRole('log',{name:'Nâng cấp hoàn tất'});await expect(notice).toBeVisible();await expect(notice).toContainText('2 ô');
  await notice.getByRole('button',{name:'Xem ô đầu tiên',exact:true}).click();
  await expect(page.locator('#city-view')).toBeVisible();await expect(page.locator('[data-plot="R04"]')).toHaveAttribute('aria-pressed','true');
  await expect(page.getByTestId('plot-detail')).toContainText('CẤP 2');await expect(notice).not.toBeVisible();
  await page.reload();await expect(notice).not.toBeVisible();
});

test('restoring another save clears pending work without announcing a false completion',async({page})=>{
  page.on('dialog',dialog=>dialog.accept());await openCity(page);await page.getByRole('button',{name:'Tạm dừng',exact:true}).click();
  await page.getByRole('button',{name:'Quản lý bản lưu',exact:true}).click();
  const pending=page.waitForEvent('download');await page.getByRole('button',{name:'↓ Xuất bản lưu',exact:true}).click();
  const downloaded=await pending,buffer=await readFile(await downloaded.path());await page.getByRole('button',{name:'Đóng bản lưu',exact:true}).click();
  await page.locator('[data-plot="R04"]').click();await page.getByRole('button',{name:'Nâng lên cấp 2',exact:true}).click();
  await page.getByRole('button',{name:'Quản lý bản lưu',exact:true}).click();
  await page.locator('#import-file').setInputFiles({name:'before-upgrade.json',mimeType:'application/json',buffer});
  await expect(page.getByRole('button',{name:'Nâng lên cấp 2',exact:true})).toBeVisible();
  await expect(page.getByRole('log',{name:'Nâng cấp hoàn tất'})).not.toBeVisible();
});

test('locating a completed plot reveals the city above a scrolled mobile inspector',async({page})=>{
  await page.setViewportSize({width:390,height:844});await page.clock.install();await openCity(page);
  await page.getByRole('button',{name:'Tạm dừng',exact:true}).click();
  await page.locator('[data-plot="R04"]').click();await page.getByRole('button',{name:'Nâng lên cấp 2',exact:true}).click();
  await page.getByRole('button',{name:'Thế giới',exact:true}).click();await page.getByRole('button',{name:'Tốc độ 8 lần',exact:true}).click();
  await page.getByRole('button',{name:'Tiếp tục',exact:true}).click();await page.clock.runFor(15100);
  await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));
  expect(await page.evaluate(()=>scrollY)).toBeGreaterThan(100);
  await page.getByRole('log',{name:'Nâng cấp hoàn tất'}).getByRole('button',{name:'Xem ô',exact:true}).click();
  const plot=await page.locator('[data-plot="R04"]').boundingBox(),header=await page.locator('.topbar').boundingBox();
  expect(plot.y+plot.height/2).toBeGreaterThanOrEqual(header.y+header.height);
  expect(plot.y+plot.height/2).toBeLessThan(778);
  await expect(page.locator('[data-plot="R04"]')).toHaveAttribute('aria-pressed','true');
});
