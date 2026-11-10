// Browser regressions for project-docs/reviews/2026-11-10-full-code-review-claude.md.
import {test,expect} from '@playwright/test';
import {readFileSync} from 'node:fs';
import {readFile} from 'node:fs/promises';
import {createGame,advanceGame,sendArmy,recallArmy,collectShipment,MAX_TIME} from '../app/src/game.js';
const scenario=JSON.parse(readFileSync(new URL('../project-docs/prototype/scenarios/first-foundation.json',import.meta.url)));
const PRIMARY='crownlands.foundation.primary',BACKUP='crownlands.foundation.backup',INCIDENT='crownlands.foundation.incident';
const swords=n=>({'sword-i':n,'spear-i':0,'archer-i':0});
const read=page=>page.evaluate(()=>JSON.parse(localStorage.getItem('crownlands.foundation.primary')));
async function seed(page,g,{paused=true}={}){g.clock.paused=paused;await page.addInitScript(state=>{if(!sessionStorage.getItem('fix-seeded')){localStorage.setItem('crownlands.foundation.primary',JSON.stringify({version:1,session:{savedAt:42,state},manual:[null,null,null],quick:null,autos:[]}));sessionStorage.setItem('fix-seeded','1');}},g);}
async function seedRaw(page,primary,backup){await page.addInitScript(([p,b])=>{if(!sessionStorage.getItem('fix-seeded')){localStorage.setItem('crownlands.foundation.primary',p);localStorage.setItem('crownlands.foundation.backup',b);sessionStorage.setItem('fix-seeded','1');}},[primary,backup]);}
const download=async(page,click)=>{const event=page.waitForEvent('download');await click();return JSON.parse((await readFile(await (await event).path())).toString());};

test('I1 recovery exports and archives the unreadable originals before starting a new world',async({page})=>{
  const future=JSON.stringify({version:2,note:'newer progress'}),broken='{"version":1,"session":';
  await seedRaw(page,future,broken);await page.goto('/');
  const dialog=page.getByRole('dialog',{name:'Cần khôi phục bản lưu'});await expect(dialog).toBeVisible();
  const raw=await download(page,()=>dialog.getByRole('button',{name:'Xuất dữ liệu gốc',exact:true}).click());
  expect(raw.primary).toBe(future);expect(raw.backup).toBe(broken);
  page.on('dialog',d=>d.accept());await dialog.getByRole('button',{name:'Chơi mới trên máy này',exact:true}).click();
  await expect(dialog).toBeHidden();await expect(page.getByTestId('autosave-status')).toHaveText('Đã tự lưu');
  const incident=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)),INCIDENT);
  expect(incident.incidents).toHaveLength(1);expect(incident.incidents[0].primary).toBe(future);expect(incident.incidents[0].backup).toBe(broken);
  await page.getByRole('button',{name:'Quản lý bản lưu',exact:true}).click();
  const later=await download(page,()=>page.getByRole('button',{name:'Xuất dữ liệu gốc đã giữ (1)',exact:true}).click());
  expect(later.incidents[0].primary).toBe(future);
});

test('I1 if the originals cannot be archived, recovery overwrites nothing and stays open',async({page})=>{
  await seedRaw(page,'broken primary','broken backup');
  await page.addInitScript(()=>{const original=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k==='crownlands.foundation.incident')throw new DOMException('Storage is full','QuotaExceededError');return original.call(this,k,v);};});
  await page.goto('/');const dialog=page.getByRole('dialog',{name:'Cần khôi phục bản lưu'});
  page.on('dialog',d=>d.accept());await dialog.getByRole('button',{name:'Chơi mới trên máy này',exact:true}).click();
  await expect(dialog).toBeVisible();await expect(dialog).toContainText('dữ liệu gốc');
  expect(await page.evaluate(([p,b])=>[localStorage.getItem(p),localStorage.getItem(b)],[PRIMARY,BACKUP])).toEqual(['broken primary','broken backup']);
});

test('N1 recovery can continue only after exporting originals and explicitly confirming replacement',async({page})=>{
  await seedRaw(page,'broken primary','broken backup');
  await page.addInitScript(()=>{const original=Storage.prototype.setItem;Storage.prototype.setItem=function(key,value){if(key==='crownlands.foundation.incident')throw new DOMException('Storage is full','QuotaExceededError');return original.call(this,key,value);};});
  await page.goto('/');const dialog=page.getByRole('dialog',{name:'Cần khôi phục bản lưu'}),proceed=dialog.getByRole('button',{name:'Tôi đã giữ file xuất · chơi mới',exact:true});
  await expect(proceed).toBeHidden();page.once('dialog',prompt=>prompt.accept());await dialog.getByRole('button',{name:'Chơi mới trên máy này',exact:true}).click();
  await expect(proceed).toBeHidden();
  const raw=await download(page,()=>dialog.getByRole('button',{name:'Xuất dữ liệu gốc',exact:true}).click());expect(raw.primary).toBe('broken primary');expect(raw.backup).toBe('broken backup');
  await expect(proceed).toBeVisible();page.once('dialog',prompt=>prompt.dismiss());await proceed.click();
  expect(await page.evaluate(k=>localStorage.getItem(k),PRIMARY)).toBe('broken primary');
  page.once('dialog',prompt=>{expect(prompt.message()).toContain('Bạn đã giữ file');return prompt.accept();});await proceed.click();
  await expect(dialog).toBeHidden();await expect(page.getByTestId('autosave-status')).toHaveText('Đã tự lưu');
  await page.reload();await expect(dialog).toBeHidden();await expect(page.getByTestId('autosave-status')).toHaveText('Đã tự lưu');
});

test('N1 recovery refuses an exported replacement if the original bytes have since changed',async({page})=>{
  await seedRaw(page,'broken primary','broken backup');
  await page.addInitScript(()=>{const original=Storage.prototype.setItem;Storage.prototype.setItem=function(key,value){if(key==='crownlands.foundation.incident')throw new DOMException('Storage is full','QuotaExceededError');return original.call(this,key,value);};});
  await page.goto('/');const dialog=page.getByRole('dialog',{name:'Cần khôi phục bản lưu'});
  page.once('dialog',prompt=>prompt.accept());await dialog.getByRole('button',{name:'Chơi mới trên máy này',exact:true}).click();
  await download(page,()=>dialog.getByRole('button',{name:'Xuất dữ liệu gốc',exact:true}).click());
  await page.evaluate(k=>localStorage.setItem(k,'changed after export'),PRIMARY);
  page.once('dialog',prompt=>prompt.accept());await dialog.getByRole('button',{name:'Tôi đã giữ file xuất · chơi mới',exact:true}).click();
  await expect(dialog).toContainText('Dữ liệu gốc đã thay đổi');expect(await page.evaluate(k=>localStorage.getItem(k),PRIMARY)).toBe('changed after export');
});

for(const width of [320,390,1024,1440])test(`I2 hall and economy book separate garrison, held and away troops and show incoming cargo at ${width}px`,async({page})=>{
  await page.setViewportSize({width,height:width<700?844:1000});
  const g=createGame(scenario);advanceGame(g,13*3600);
  const a=sendArmy(g,scenario,'clay-near',swords(12),8);advanceGame(g,3600);recallArmy(g,a.id);advanceGame(g,3600);
  sendArmy(g,scenario,'grain-near',{'sword-i':0,'spear-i':12,'archer-i':0},8);advanceGame(g,4*3600);
  const ship=collectShipment(g,scenario,'grain-near',1);advanceGame(g,ship.arrives-g.time);
  await seed(page,g);await page.goto('/');
  await page.getByRole('button',{name:'Nội thành',exact:true}).click();await page.locator('[data-slot="S01"]').click();
  const hall=page.getByTestId('hall-detail');
  await expect(hall.locator('[data-hall-troops]')).toHaveText('28 quân đồn trú · 12 chờ dỡ ở cổng · 12 đi xa · 40 lương / giờ tại thành');
  await hall.getByRole('button',{name:'Xem sổ kinh tế',exact:true}).click();
  const book=page.getByRole('dialog',{name:'Sổ kinh tế'});
  await expect(book.locator('[data-economy-upkeep]')).toContainText('Lương tại thành: 40 / giờ cho 28 quân đồn trú và 12 quân chờ dỡ ở cổng.');
  await expect(book.locator('[data-economy-field]')).toContainText('2 đạo quân');await expect(book.locator('[data-economy-field]')).toContainText('1 chuyến xe');
  await expect(book.locator('[data-economy-incoming]')).toContainText('Chuyến xe 1: 500 Lương thực mang về · tới cổng lúc');
  await expect(book.locator('[data-economy-incoming-note]')).toHaveText('Hàng đang về chỉ nhập kho khi còn chỗ; phần dư chờ ở cổng.');
  await expect(book.locator('[data-economy-resource="grain"] [data-value="forecast-received"]')).toHaveText('0');
  await expect(book.locator('[data-economy-resource="grain"] [data-value="forecast-received"]')).toBeVisible();
  await book.getByRole('button',{name:'Xem quân & vận tải',exact:true}).click();await expect(book).toBeHidden();
  await expect(page.locator('#field-operations .field-card [data-focus-mine]').first()).toBeFocused();
  await expect(page.locator('#field-operations .field-card').first()).toBeInViewport();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test.describe('I3 touch world map',()=>{
  test.use({viewport:{width:390,height:844},hasTouch:true,isMobile:true});
  test('real two-finger pinch zooms around the fingers, one finger pans and a pinch never selects a site',async({page})=>{
    await page.goto('/');await page.getByRole('button',{name:'Tạm dừng',exact:true}).tap();
    const canvas=page.locator('#world-map');await canvas.scrollIntoViewIfNeeded();const box=await canvas.boundingBox();
    const client=await page.context().newCDPSession(page),touch=(id,x,y)=>({id,x,y,radiusX:3,radiusY:3,force:1});
    const cx=box.x+box.width/2,cy=box.y+box.height/2,zoom=page.getByTestId('zoom'),where=page.getByTestId('map-position');
    const before=await where.textContent();
    await page.evaluate(()=>{window.__worldTouchMoves=0;document.querySelector('#world-view').addEventListener('pointermove',event=>{if(event.pointerType==='touch')window.__worldTouchMoves++;},{capture:true});});
    await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[touch(1,cx-30,cy),touch(2,cx+30,cy)]});
    await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[touch(1,cx-31,cy),touch(2,cx+30,cy)]});
    await expect.poll(()=>page.evaluate(()=>window.__worldTouchMoves)).toBeGreaterThan(0);
    await expect(where).toHaveText(before);// check only after the actual pointer event was handled
    await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[touch(1,cx-60,cy),touch(2,cx+60,cy)]});
    await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[touch(1,cx-75,cy),touch(2,cx+75,cy)]});
    await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
    await expect(zoom).toHaveText('300%');expect(await where.textContent()).toBe(before);
    await expect(page.getByTestId('site-detail')).toContainText('Thành khởi đầu');
    await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[touch(3,cx,cy)]});
    await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[touch(3,cx-96*2,cy)]});
    await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
    await expect(where).not.toHaveText(before);
    // A plain tap on a known site still selects it.
    await page.getByRole('button',{name:'Về thành khởi đầu',exact:true}).tap();
    for(let i=0;i<10;i++)await page.getByRole('button',{name:'Thu nhỏ',exact:true}).tap();
    await canvas.scrollIntoViewIfNeeded();
    const pos=await page.evaluate(()=>{const c=document.querySelector('#world-map'),b=c.getBoundingClientRect(),z=parseFloat(document.querySelector('#zoom-label').textContent)/100;return {x:b.left+b.width/2+(18.5-12.5)*32*z,y:b.top+b.height/2+(30.5-32.5)*32*z};});
    await page.touchscreen.tap(pos.x,pos.y);await expect(page.getByTestId('mine-detail')).toContainText('Mỏ đất sét');
    expect(await page.evaluate(()=>visualViewport.scale)).toBeCloseTo(1);
  });
});

test('M3 commands keep the session durable without rotating out the periodic autosave history',async({page})=>{
  await page.clock.install();await page.goto('/');await page.getByRole('button',{name:'Tạm dừng',exact:true}).click();
  await page.getByRole('button',{name:'Nội thành',exact:true}).click();
  for(const plot of ['R01','R02','R03','R04','R05','R06']){await page.locator(`[data-plot="${plot}"]`).click();await page.getByRole('button',{name:'Nâng lên cấp 2',exact:true}).click();}
  const saved=await read(page);expect(saved.autos).toHaveLength(0);expect(saved.session.state.jobs).toHaveLength(6);
});

test('M2 a paused unchanged game is not rewritten every second',async({page})=>{
  await page.addInitScript(()=>{window.__writes=0;const original=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k==='crownlands.foundation.primary')window.__writes++;return original.call(this,k,v);};});
  await page.clock.install();await page.goto('/');await page.getByRole('button',{name:'Tạm dừng',exact:true}).click();
  await page.clock.runFor(1500);const writes=await page.evaluate(()=>window.__writes);
  await page.clock.runFor(5000);expect(await page.evaluate(()=>window.__writes)).toBe(writes);
  await page.getByRole('button',{name:'Tiếp tục',exact:true}).click();await page.clock.runFor(3000);
  expect(await page.evaluate(()=>window.__writes)).toBeGreaterThan(writes);
});

test('unloading into a full warehouse explains that nothing moved, and focus stays meaningful after discard and recall',async({page})=>{
  const g=createGame(scenario);advanceGame(g,40000);sendArmy(g,scenario,'clay-near',swords(12),2);advanceGame(g,2280);collectShipment(g,scenario,'clay-near',1);advanceGame(g,960);
  sendArmy(g,scenario,'grain-near',{'sword-i':0,'spear-i':8,'archer-i':0},2);advanceGame(g,60);
  await seed(page,g);await page.goto('/');
  // The clay mine stores no food: the panel shows the detachment's own rations and its safe-return time.
  await page.getByRole('button',{name:'Mỏ đất sét',exact:true}).click();
  await expect(page.locator('[data-mine-food]')).toContainText('tự rút sau');
  await page.getByRole('button',{name:'Dỡ hàng xe 1',exact:true}).click();
  await expect(page.getByRole('status').filter({hasText:'chưa dỡ được'})).toBeVisible();
  page.on('dialog',d=>d.accept());await page.getByRole('button',{name:'Hủy hàng còn trên xe 1',exact:true}).click();
  await expect(page.locator('#field-operations [data-field-summary]')).toBeFocused();
  const recall=page.getByRole('button',{name:/Rút đạo quân \d+ về thành/}).last();await recall.click();
  await expect(page.locator('#field-operations [data-focus-mine]').last()).toBeFocused();
});

test('M1 the clock reaches the trial horizon at 8× and a late recall keeps autosaving',async({page})=>{
  const g=createGame(scenario);advanceGame(g,MAX_TIME-2000);const a=sendArmy(g,scenario,'clay-near',swords(12),2);advanceGame(g,1900);recallArmy(g,a.id);
  g.clock.speed=8;await page.clock.install();await seed(page,g,{paused:false});await page.goto('/');
  await expect(page.getByRole('dialog',{name:'Cần khôi phục bản lưu'})).toBeHidden();
  await page.clock.runFor(16000);await page.getByRole('button',{name:'Tạm dừng',exact:true}).click();
  const saved=await read(page);expect(saved.session.state.time).toBe(MAX_TIME);
  expect(saved.session.state.logistics.armies[0].status).toBe('returning');
  await expect(page.getByTestId('autosave-status')).toHaveText('Đã tự lưu');
});
