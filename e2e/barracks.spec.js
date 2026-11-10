import {test,expect} from '@playwright/test';
import {readFile} from 'node:fs/promises';
const boot=async page=>{await page.goto('/');await page.getByRole('button',{name:'Nội thành',exact:true}).click();await page.locator('[data-slot="S05"]').click();};

test('barracks pays for mixed orders, reserves capacity and adds soldiers/upkeep at completion',async({page})=>{
 await page.clock.install();await boot(page);await page.getByRole('button',{name:'Tạm dừng',exact:true}).click();
 const panel=page.getByTestId('barracks-detail');await expect(panel).toBeVisible();
 await panel.getByRole('button',{name:'Giáo binh',exact:true}).click();await page.getByLabel('Số lượng huấn luyện').fill('2');
 await page.locator('#recruit').click();await expect(page.getByTestId('stock-wood')).toHaveText('1.100');
 await expect(page.getByTestId('army-count')).toHaveText('52');await expect(page.getByTestId('reserved-count')).toHaveText('2');
 await panel.getByRole('button',{name:'Cung thủ',exact:true}).click();await page.getByLabel('Số lượng huấn luyện').fill('1');await page.locator('#recruit').click();
 await expect(page.getByTestId('training-queue')).toContainText('Giáo binh');await expect(page.getByTestId('training-queue')).toContainText('Cung thủ');
 await page.getByRole('button',{name:'Tốc độ 8 lần',exact:true}).click();await page.getByRole('button',{name:'Tiếp tục',exact:true}).click();await page.clock.runFor(10000);
 await expect(page.getByTestId('army-count')).toHaveText('54');await expect(page.getByTestId('reserved-count')).toHaveText('1');
 await page.clock.runFor(5000);await expect(page.getByTestId('army-count')).toHaveText('55');await expect(page.getByTestId('troop-upkeep')).toHaveText('55 / giờ');
 await expect(page.getByTestId('training-queue')).toContainText('Chưa có lệnh');
 await page.locator('[data-slot="S03"]').click();await expect(page.locator('#detail')).toContainText('55 / giờ');
});

test('recruitment input keeps focus/value on ticks and rejects a fractional order',async({page})=>{
 await page.clock.install();await boot(page);const input=page.getByLabel('Số lượng huấn luyện');
 await expect(input).toBeVisible();await input.fill('12');await page.clock.runFor(2100);await expect(input).toBeFocused();await expect(input).toHaveValue('12');
 await input.fill('1.5');await expect(page.locator('#recruit')).toBeDisabled();await expect(page.getByTestId('recruit-reason')).toContainText('số nguyên');
 await input.fill('200');await expect(page.locator('#recruit')).toBeDisabled();await expect(page.getByTestId('recruit-reason')).toContainText('hạn mức');
});

test('the selected troop and quantity survive a reload along with the game',async({page})=>{
 await boot(page);await page.getByRole('button',{name:'Cung thủ',exact:true}).click();await page.getByLabel('Số lượng huấn luyện').fill('12');
 await page.reload();await page.getByRole('button',{name:'Nội thành',exact:true}).click();await page.locator('[data-slot="S05"]').click();
 await expect(page.getByRole('button',{name:'Cung thủ',exact:true})).toHaveAttribute('aria-pressed','true');await expect(page.getByLabel('Số lượng huấn luyện')).toHaveValue('12');
});

test('a paid queue is automatically saved, frozen when paused and restored offline',async({page,context})=>{
 await page.clock.install();await boot(page);await page.getByLabel('Số lượng huấn luyện').fill('2');await page.locator('#recruit').click();await page.clock.runFor(7000);
 await page.getByRole('button',{name:'Tạm dừng',exact:true}).click();const time=await page.getByTestId('game-time').textContent();
 await page.evaluate(async()=>{await navigator.serviceWorker.ready;if(!navigator.serviceWorker.controller)await new Promise(r=>navigator.serviceWorker.addEventListener('controllerchange',r,{once:true}));});
 await context.setOffline(true);await page.reload();await page.getByRole('button',{name:'Nội thành',exact:true}).click();await page.locator('[data-slot="S05"]').click();
 await expect(page.getByTestId('game-time')).toHaveText(time);await expect(page.getByTestId('reserved-count')).toHaveText('2');await expect(page.getByTestId('army-count')).toHaveText('52');
 await page.clock.runFor(20000);await expect(page.getByTestId('army-count')).toHaveText('52');
 await page.getByRole('button',{name:'Tiếp tục',exact:true}).click();await page.clock.runFor(75000);await expect(page.getByTestId('army-count')).toHaveText('54');
});

test('an actual legacy session and manual slot retain their running upgrade while enabling recruitment',async({page})=>{
 const legacy=JSON.parse(await readFile(new URL('../tests/fixtures/foundation-v1.json',import.meta.url),'utf8'));
 await page.addInitScript(state=>{const r={savedAt:42,state};localStorage.setItem('crownlands.foundation.primary',JSON.stringify({version:1,session:r,manual:[r,null,null],quick:null,autos:[]}));},legacy);
 await boot(page);await expect(page.getByTestId('army-count')).toHaveText('52');await expect(page.getByTestId('game-time')).toHaveText('Ngày 1 · 00:00:47');
 await page.locator('[data-plot="R04"]').click();await expect(page.getByTestId('plot-detail')).toContainText('Còn 01:13');
 const stored=await page.evaluate(()=>JSON.parse(localStorage.getItem('crownlands.foundation.primary')));
 expect(stored.session.state.schema).toBe(3);expect(stored.manual[0].state.schema).toBe(3);expect(stored.session.state.cities[0].stock).toEqual(legacy.cities[0].stock);
});
