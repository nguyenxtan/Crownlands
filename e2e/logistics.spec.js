import {test,expect} from '@playwright/test';
import {readFileSync} from 'node:fs';
import {createGame,sendArmy,advanceGame,collectShipment,SCALE} from '../app/src/game.js';
const scenario=JSON.parse(readFileSync(new URL('../project-docs/prototype/scenarios/first-foundation.json',import.meta.url)));
async function boot(page){await page.goto('/');await expect(page.getByRole('button',{name:'Nội thành',exact:true})).toBeVisible();}
async function pause(page){if(await page.getByRole('button',{name:'Tạm dừng',exact:true}).isVisible())await page.getByRole('button',{name:'Tạm dừng',exact:true}).click();}
async function mine(page){await page.getByRole('button',{name:'Thế giới',exact:true}).click();await page.getByRole('button',{name:'Mỏ đất sét',exact:true}).click();}
const read=page=>page.evaluate(()=>JSON.parse(localStorage.getItem('crownlands.foundation.primary')).session.state);
async function seed(page,g){g.clock.paused=true;await page.addInitScript(state=>{if(!sessionStorage.getItem('logistics-seeded')){const r={savedAt:42,state};localStorage.setItem('crownlands.foundation.primary',JSON.stringify({version:1,session:r,manual:[null,null,null],quick:null,autos:[]}));sessionStorage.setItem('logistics-seeded','1');}},g);}

test('mine expedition controls preserve input focus and send real garrison soldiers',async({page})=>{
 await page.clock.install();await boot(page);await pause(page);await mine(page);
 await expect(page.getByRole('heading',{name:'Mỏ đất sét',exact:true})).toBeInViewport();
 const input=page.getByLabel('Kiếm binh xuất quân');await expect(input).toBeVisible();await input.fill('8');await page.clock.runFor(2100);await expect(input).toBeFocused();await expect(input).toHaveValue('8');
 await page.getByRole('button',{name:'Xuất quân tới mỏ',exact:true}).click();await expect(page.locator('[data-field-kind="army"]')).toContainText('Đang tới mỏ');
 const g=await read(page);expect(g.cities[0].troops['sword-i']).toBe(12);expect(g.logistics.armies[0].troops['sword-i']).toBe(8);
 expect(g.cities[0].stock.grain).toBe(1784*SCALE);await expect(page.getByTestId('autosave-status')).toHaveText('Đã tự lưu');
});

test('a real expedition extracts and delivers by wagon, then continues from an offline save',async({page,context})=>{
 await page.clock.install();await boot(page);await pause(page);await mine(page);await page.getByRole('button',{name:'Xuất quân tới mỏ',exact:true}).click();
 await page.getByRole('button',{name:'Tốc độ 8 lần',exact:true}).click();await page.getByRole('button',{name:'Tiếp tục',exact:true}).click();await page.clock.runFor(286000);
 await expect(page.getByTestId('mine-owner')).toHaveText('Bạn đang giữ mỏ');await expect(page.getByTestId('mine-output')).toContainText('300');
 await page.getByRole('button',{name:'Cho xe tới lấy hàng',exact:true}).click();await expect(page.locator('[data-field-kind="shipment"]')).toContainText('Đang tới lấy hàng');
 await page.clock.runFor(121000);await pause(page);
 const saved=await read(page);expect(saved.logistics.deliveredShipments).toBe(1);expect(saved.cities[0].ledger.clay.received).toBeGreaterThan(180*SCALE);expect(saved.logistics.shipments).toHaveLength(0);
 await page.evaluate(async()=>{await navigator.serviceWorker.ready;if(!navigator.serviceWorker.controller)await new Promise(r=>navigator.serviceWorker.addEventListener('controllerchange',r,{once:true}));});
 await context.setOffline(true);await page.reload();await mine(page);await expect(page.getByTestId('mine-owner')).toHaveText('Bạn đang giữ mỏ');
 const restored=await read(page);expect(restored.time).toBe(saved.time);expect(restored.logistics).toEqual(saved.logistics);
});

test('recalling a moving army takes the travelled time back and does not free hometown capacity',async({page})=>{
 const g=createGame(scenario);sendArmy(g,scenario,'clay-near',{'sword-i':12,'spear-i':0,'archer-i':0},2);advanceGame(g,150);await seed(page,g);
 await page.clock.install();await boot(page);await page.getByRole('button',{name:'Rút đạo quân 1 về thành',exact:true}).click();
 let state=await read(page);expect(state.logistics.armies[0].arrives).toBe(300);expect(state.cities[0].troops['sword-i']).toBe(8);
 await page.getByRole('button',{name:'Tốc độ 8 lần',exact:true}).click();await page.getByRole('button',{name:'Tiếp tục',exact:true}).click();await page.clock.runFor(20000);await pause(page);
 state=await read(page);expect(state.logistics.armies).toHaveLength(0);expect(state.cities[0].troops['sword-i']).toBe(20);
});

test('full city storage keeps goods on busy wagons until an explicit discard',async({page})=>{
 const g=createGame(scenario);advanceGame(g,40000);sendArmy(g,scenario,'clay-near',{'sword-i':12,'spear-i':0,'archer-i':0},2);advanceGame(g,2280);collectShipment(g,scenario,'clay-near',1);advanceGame(g,960);await seed(page,g);
 await boot(page);await expect(page.locator('[data-field-kind="shipment"]')).toContainText('Kho đầy');
 page.on('dialog',d=>d.accept());await page.getByRole('button',{name:'Hủy hàng còn trên xe 1',exact:true}).click();
 const state=await read(page);expect(state.logistics.shipments).toHaveLength(0);expect(state.logistics.retired.clay.discarded).toBe(190*SCALE);
});

test('new logistics controls are accessible on a narrow screen without overflowing',async({page})=>{
 await page.setViewportSize({width:390,height:844});await boot(page);await pause(page);await mine(page);
 await page.getByRole('button',{name:'Xem thông tin đang chọn',exact:true}).click();await expect(page.getByLabel('Kiếm binh xuất quân')).toBeVisible();
 await page.getByRole('button',{name:'Xuất quân tới mỏ',exact:true}).click();expect((await read(page)).logistics.armies).toHaveLength(1);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
