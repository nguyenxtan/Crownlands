import {test,expect} from '@playwright/test';
import {readFile} from 'node:fs/promises';
import {createServer} from 'node:http';
import path from 'node:path';
const boot=async page=>{await page.goto('/');await expect(page.getByRole('button',{name:'Nội thành',exact:true})).toBeVisible();};
const city=async page=>{await page.getByRole('button',{name:'Nội thành',exact:true}).click();};
test('both city entry paths display the stone wall and main gate, including offline',async({page,context})=>{
  await boot(page);
  for(const enter of [()=>page.getByRole('button',{name:'Vào thành',exact:true}).click(),()=>city(page)]){
    await enter();
    for(const part of ['wall','gate']){
      const art=page.locator(`[data-city-perimeter="${part}"]`).first();
      await expect(art).toBeVisible();
      expect(await art.evaluate(async i=>{await i.decode();return i.naturalWidth>0&&getComputedStyle(i).pointerEvents==='none';})).toBe(true);
    }
    await page.getByRole('button',{name:'Thế giới',exact:true}).click();
  }
  await page.evaluate(async()=>{await navigator.serviceWorker.ready;if(!navigator.serviceWorker.controller)await new Promise(r=>navigator.serviceWorker.addEventListener('controllerchange',r,{once:true}));});
  await context.setOffline(true);await page.reload();await city(page);
  for(const part of ['wall','gate'])expect(await page.locator(`[data-city-perimeter="${part}"]`).first().evaluate(async i=>{await i.decode();return i.naturalWidth>0;})).toBe(true);
});
test('map has local art, pan/zoom and accessible known-site selection',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));await boot(page);
  const map=page.getByLabel('Bản đồ thế giới');await expect(map).toBeVisible();
  const before=await page.getByTestId('map-position').textContent();
  await map.hover();await page.mouse.move(500,400);await page.mouse.down();await page.mouse.move(620,470,{steps:6});await page.mouse.up();
  await expect(page.getByTestId('map-position')).not.toHaveText(before);
  await page.getByRole('button',{name:'Phóng to',exact:true}).click();await expect(page.getByTestId('zoom')).toContainText('%');
  await page.getByRole('button',{name:'Trại sơn tặc',exact:true}).click();await expect(page.getByTestId('site-detail')).toContainText('Chưa có tình báo');
  await expect(page.getByRole('button',{name:'Tiền thành Tro Tàn',exact:true})).toHaveCount(0);expect(errors).toEqual([]);
});
test('city has 14 fixed slots and 16 fields; paid upgrade completes through the clock',async({page})=>{
  await page.clock.install();await boot(page);await city(page);
  await expect(page.locator('[data-slot]')).toHaveCount(14);await expect(page.locator('[data-plot]')).toHaveCount(16);
  await page.locator('[data-plot="R04"]').click();await page.getByRole('button',{name:'Tạm dừng',exact:true}).click();
  const before=await page.getByTestId('stock-wood').textContent();
  await page.getByRole('button',{name:'Nâng lên cấp 2',exact:true}).click();
  await expect(page.getByTestId('stock-wood')).not.toHaveText(before);await expect(page.getByTestId('plot-detail')).toContainText('Đang nâng cấp');
  await page.getByRole('button',{name:'Tốc độ 8 lần',exact:true}).click();await page.getByRole('button',{name:'Tiếp tục',exact:true}).click();
  await page.clock.runFor(16000);
  await expect(page.getByTestId('plot-detail')).toContainText('125');await expect(page.getByRole('button',{name:'Nâng lên cấp 2',exact:true})).toHaveCount(0);
  await expect(page.getByTestId('objective')).toContainText(/Hoàn thành/i);
});
test('pause and automatic saving preserve an in-progress upgrade on reload without a wall-clock catchup',async({page})=>{
  await page.clock.install();await boot(page);await city(page);await page.locator('[data-plot="R04"]').click();
  await page.getByRole('button',{name:'Nâng lên cấp 2',exact:true}).click();await page.clock.runFor(7000);
  await page.getByRole('button',{name:'Tạm dừng',exact:true}).click();const time=await page.getByTestId('game-time').textContent();
  await page.clock.runFor(60000);await expect(page.getByTestId('game-time')).toHaveText(time);
  await page.reload();await city(page);await page.locator('[data-plot="R04"]').click();
  await expect(page.getByTestId('game-time')).toHaveText(time);await expect(page.getByTestId('plot-detail')).toContainText('Đang nâng cấp');
  await expect(page.getByRole('button',{name:'Tiếp tục',exact:true})).toBeVisible();
});
test('invalid imports do not replace the active game; offline reload retains all runtime assets',async({page,context})=>{
  await boot(page);await page.getByRole('button',{name:'Tạm dừng',exact:true}).click();
  const amount=await page.getByTestId('stock-grain').textContent();
  await page.getByRole('button',{name:'Quản lý bản lưu',exact:true}).click();
  await page.locator('#import-file').setInputFiles({name:'future.json',mimeType:'application/json',buffer:Buffer.from('{"schema":99}')});
  await expect(page.getByRole('status')).toContainText('phiên bản');await expect(page.getByTestId('stock-grain')).toHaveText(amount);
  await page.getByRole('button',{name:'Đóng bản lưu',exact:true}).click();
  await page.evaluate(async()=>{await navigator.serviceWorker.ready;if(!navigator.serviceWorker.controller)await new Promise(r=>navigator.serviceWorker.addEventListener('controllerchange',r,{once:true}));});
  await context.setOffline(true);await page.reload();await city(page);await expect(page.locator('[data-plot]')).toHaveCount(16);
  expect(await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src))).toEqual([]);
});
test('manual save, export and valid import restore the chosen world state',async({page})=>{
  page.on('dialog',d=>d.accept());await boot(page);await page.getByRole('button',{name:'Tạm dừng',exact:true}).click();
  await page.getByRole('button',{name:'Quản lý bản lưu',exact:true}).click();await page.locator('[data-save="manual-0"]').click();
  await page.getByRole('button',{name:'Tạo mốc lưu nhanh',exact:true}).click();await expect(page.locator('[data-load="quick"]')).toBeEnabled();
  const downloadEvent=page.waitForEvent('download');await page.getByRole('button',{name:'↓ Xuất bản lưu',exact:true}).click();
  const download=await downloadEvent,bytes=await readFile(await download.path());const exported=JSON.parse(bytes.toString());expect(exported.jobs).toHaveLength(0);
  await page.getByRole('button',{name:'Đóng bản lưu',exact:true}).click();await city(page);await page.locator('[data-plot="R04"]').click();await page.getByRole('button',{name:'Nâng lên cấp 2',exact:true}).click();
  await page.getByRole('button',{name:'Quản lý bản lưu',exact:true}).click();await page.locator('[data-load="manual-0"]').click();
  await expect(page.getByRole('button',{name:'Nâng lên cấp 2',exact:true})).toBeVisible();
  await page.getByRole('button',{name:'Nâng lên cấp 2',exact:true}).click();await page.getByRole('button',{name:'Quản lý bản lưu',exact:true}).click();
  await page.locator('#import-file').setInputFiles({name:'exported.json',mimeType:'application/json',buffer:bytes});
  await expect(page.getByRole('status')).toContainText('Đã nhập');await expect(page.getByRole('button',{name:'Nâng lên cấp 2',exact:true})).toBeVisible();
  await expect(page.getByTestId('stock-grain')).toHaveText('1.800');
});
test('all sixteen field targets and the upgrade action work at 1024 × 768',async({page})=>{
  await page.setViewportSize({width:1024,height:768});await boot(page);await page.getByRole('button',{name:'Tạm dừng',exact:true}).click();await city(page);
  for(let i=1;i<=16;i++){await page.locator(`[data-plot="R${String(i).padStart(2,'0')}"]`).click();await expect(page.getByTestId('plot-detail')).toContainText(`Ô ${i}`);}
  await page.getByRole('button',{name:'Nâng lên cấp 2',exact:true}).click();await expect(page.getByTestId('plot-detail')).toContainText('Đang nâng cấp');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('suspended foreground callbacks do not catch up the world on resume',async({page})=>{
  await page.clock.install();await boot(page);await city(page);await page.locator('[data-plot="R04"]').click();await page.getByRole('button',{name:'Nâng lên cấp 2',exact:true}).click();
  const before=await page.getByTestId('game-time').textContent();await page.clock.fastForward(60000);
  await expect(page.getByTestId('game-time')).toHaveText(before);await expect(page.getByTestId('plot-detail')).toContainText('Còn 02:00');
  await page.clock.runFor(2100);await expect(page.getByTestId('game-time')).not.toHaveText(before);
});
test('visible autosave keeps an active upgrade without pressing any save button',async({page})=>{
  await page.clock.install();await boot(page);await expect(page.getByTestId('autosave-status')).toContainText('Đã tự lưu');
  await city(page);await page.locator('[data-plot="R04"]').click();await page.getByRole('button',{name:'Nâng lên cấp 2',exact:true}).click();await page.clock.runFor(7100);
  const stored=await page.evaluate(()=>JSON.parse(localStorage.getItem('crownlands.foundation.primary')));
  expect(stored.session.state.time).toBeGreaterThanOrEqual(7);expect(stored.session.state.jobs).toHaveLength(1);expect(stored.quick).toBeNull();
  await page.reload();await city(page);await page.locator('[data-plot="R04"]').click();await expect(page.getByTestId('plot-detail')).toContainText('Đang nâng cấp');
  await expect(page.getByTestId('game-time')).not.toHaveText('Ngày 1 · 00:00:00');
});
test('autosave indicator reports a storage failure instead of claiming progress is saved',async({page})=>{
  await page.addInitScript(()=>{const original=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k.startsWith('crownlands.foundation.'))throw new DOMException('Storage is full','QuotaExceededError');return original.call(this,k,v);};});
  await boot(page);await expect(page.getByTestId('autosave-status')).toContainText('Không lưu được');
});
test('pressing city buildings keeps their anchored position and selects the intended slot',async({page})=>{
  await boot(page);await city(page);
  for(let i=1;i<=14;i++){
    const id=`S${String(i).padStart(2,'0')}`,button=page.locator(`[data-slot="${id}"]`),before=await button.boundingBox();
    await page.mouse.move(before.x+before.width/2,before.y+before.height/2);await page.mouse.down();
    const pressed=await button.boundingBox();await page.mouse.up();
    expect(Math.abs(pressed.x-before.x),`${id} moved horizontally when pressed`).toBeLessThan(1);
    expect(Math.abs(pressed.y-before.y),`${id} moved vertically when pressed`).toBeLessThan(1);
    await expect(button).toHaveAttribute('aria-pressed','true');
  }
});
test('four support buildings use their own loaded sprites in both the city and detail panel',async({page})=>{
  await boot(page);await city(page);
  for(const [id,file] of [['S02','city-warehouse.png'],['S03','city-granary.png'],['S04','city-rally-point.png'],['S07','city-transport-depot.png']]){
    const button=page.locator(`[data-slot="${id}"]`),sprite=button.locator('img');
    await expect(sprite).toBeVisible();await expect(sprite).toHaveAttribute('src',`./assets/${file}`);
    expect(await sprite.evaluate(i=>i.complete&&i.naturalWidth===512)).toBe(true);
    await button.click();const detail=page.locator('#detail .detail-hero img');await expect(detail).toHaveAttribute('src',`./assets/${file}`);
    await expect.poll(()=>detail.evaluate(i=>i.complete&&i.naturalWidth===512)).toBe(true);
  }
});
test('Space activates a focused field instead of intercepting its native button action',async({page})=>{
  await boot(page);await city(page);
  const field=page.locator('[data-plot="R04"]');await field.focus();await page.keyboard.press('Space');
  await expect(field).toHaveAttribute('aria-pressed','true');await expect(page.getByTestId('plot-detail')).toContainText('Ruộng lương');
  await expect(page.getByRole('button',{name:'Tạm dừng',exact:true})).toBeVisible();
  await page.locator('#world-map').evaluate(()=>document.activeElement.blur());await page.keyboard.press('Space');
  await expect(page.getByRole('button',{name:'Tiếp tục',exact:true})).toBeVisible();
});
test('returning to the home city selects its details together with the map highlight',async({page})=>{
  await boot(page);await page.getByRole('button',{name:'Trại sơn tặc',exact:true}).click();
  await expect(page.getByTestId('site-detail')).toContainText('Trại sơn tặc');
  await page.getByRole('button',{name:'Về thành khởi đầu',exact:true}).click();
  await expect(page.getByTestId('site-detail')).toContainText('Thành khởi đầu');await expect(page.getByRole('button',{name:'Vào thành',exact:true})).toBeVisible();
});
test('all sixteen resource plots use their proper sprites and select through the visible artwork',async({page})=>{
  await boot(page);await city(page);
  const resources=['wood','clay','iron','grain'];
  for(let n=1;n<=16;n++){
    const resource=resources[(n-1)%4],id=`R${String(n).padStart(2,'0')}`,button=page.locator(`[data-plot="${id}"]`),sprite=button.locator('img');
    await expect(sprite).toBeVisible();await expect(sprite).toHaveAttribute('src',`./assets/city-resource-${resource}.png`);
    await expect.poll(()=>sprite.evaluate(i=>i.complete&&i.naturalWidth===512)).toBe(true);
    const box=await sprite.boundingBox();await sprite.click({position:{x:box.width/2,y:box.height*.55}});
    if(resource==='wood')await sprite.click({position:{x:box.width/2,y:box.height*.28}});
    await expect(button).toHaveAttribute('aria-pressed','true');
    const detail=page.locator('[data-testid="plot-detail"] .detail-hero img');await expect(detail).toHaveAttribute('src',`./assets/city-resource-${resource}.png`);
    await expect.poll(()=>detail.evaluate(i=>i.complete&&i.naturalWidth===512)).toBe(true);
  }
});
test('returning to the world restores the selected site and its city entry action',async({page})=>{
  await boot(page);await city(page);await page.locator('[data-plot="R04"]').click();
  await page.getByRole('button',{name:'Thế giới',exact:true}).click();
  await expect(page.getByLabel('Bản đồ thế giới')).toBeVisible();
  await expect(page.getByTestId('site-detail')).toContainText('Thành khởi đầu');
  await page.getByRole('button',{name:'Vào thành',exact:true}).click();
  await expect(page.locator('#city-view')).toBeVisible();
  await expect(page.getByTestId('plot-detail')).toContainText('Ruộng lương');
  await page.keyboard.press('m');await page.getByRole('button',{name:'Trại sơn tặc',exact:true}).click();
  await city(page);await page.keyboard.press('m');
  await expect(page.getByTestId('site-detail')).toContainText('Trại sơn tặc');
});
test('all city entry routes keep the current scene and sidebar state aligned',async({page})=>{
  await boot(page);
  const world=page.getByRole('button',{name:'Thế giới',exact:true}),interior=page.getByRole('button',{name:'Nội thành',exact:true});
  await expect(world).toHaveAttribute('aria-current','page');await expect(interior).not.toHaveAttribute('aria-current','page');
  for(const enter of [()=>page.getByRole('button',{name:'Vào thành',exact:true}).click(),()=>interior.click(),()=>page.keyboard.press('c'),()=>page.getByRole('button',{name:'Mở nội thành →',exact:true}).click()]){
    await enter();
    await expect(page.locator('#city-view')).toBeVisible();await expect(page.locator('#world-view')).toBeHidden();
    await expect(page.locator('.city-ground')).toHaveAttribute('src','./assets/city-ground-v02.webp');
    await expect.poll(()=>page.locator('.city-ground').evaluate(i=>i.complete&&i.naturalWidth>0)).toBe(true);
    await expect(interior).toHaveClass(/\bactive\b/);await expect(interior).toHaveAttribute('aria-current','page');
    await expect(world).not.toHaveClass(/\bactive\b/);await expect(world).not.toHaveAttribute('aria-current','page');
    await world.click();await expect(world).toHaveAttribute('aria-current','page');
    await expect(interior).not.toHaveAttribute('aria-current','page');
  }
});

// Serve two real precached app releases on an isolated origin, without changing dist.
async function updateServer(){
  const root=path.resolve(import.meta.dirname,'../dist'),worker=await readFile(path.join(root,'sw.js'),'utf8');
  let current=false;
  const server=createServer(async(req,res)=>{
    try{
      const name=new URL(req.url,'http://localhost').pathname,filename=path.resolve(root,'.'+(name==='/'?'/index.html':name));
      if(!filename.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
      const type={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png'}[path.extname(filename)]||'application/octet-stream';
      let bytes=await readFile(filename);
      if(name==='/sw.js')bytes=current?worker:worker.replace(/const CACHE='([^']+)'/,"const CACHE='$1-previous'");
      if(filename===path.join(root,'index.html'))bytes=bytes.toString().replace('<body>',`<body data-app-release="${current?'current':'previous'}">`).replace('./assets/city-ground-v02.webp',current?'./assets/city-ground-v02.webp':'./assets/city-ground.webp');
      res.writeHead(200,{'Content-Type':type,'Cache-Control':'no-store'});res.end(bytes);
    }catch{res.writeHead(404);res.end();}
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  return{url:`http://127.0.0.1:${server.address().port}`,publish:()=>{current=true;},close:()=>new Promise(resolve=>{server.closeAllConnections();server.close(resolve);})};
}
test('a completed app update refreshes the city art while preserving an active upgrade',async({page})=>{
  const release=await updateServer();
  try{
    await page.clock.install({time:new Date('2026-11-10T00:00:00Z')});await page.clock.pauseAt(new Date('2026-11-10T00:00:01Z'));
    await page.goto(release.url);await city(page);await page.getByRole('button',{name:'Tạm dừng',exact:true}).click();
    await page.locator('[data-plot="R04"]').click();await page.getByRole('button',{name:'Nâng lên cấp 2',exact:true}).click();
    await page.evaluate(async()=>{await navigator.serviceWorker.ready;if(!navigator.serviceWorker.controller)await new Promise(resolve=>navigator.serviceWorker.addEventListener('controllerchange',resolve,{once:true}));});
    expect(await page.evaluate(async()=>(await caches.keys()).some(key=>key.endsWith('-previous')))).toBe(true);
    await expect(page.getByRole('button',{name:'Cập nhật game',exact:true})).toBeHidden();
    release.publish();await page.reload();await city(page);await page.locator('[data-plot="R04"]').click();
    await page.evaluate(async()=>{await(await navigator.serviceWorker.getRegistration()).update();});
    await expect.poll(()=>page.evaluate(async()=>(await caches.keys()).some(key=>key.endsWith('-previous')))).toBe(false);
    const update=page.getByRole('button',{name:'Cập nhật game',exact:true});await expect(update).toBeVisible();
    await expect(page.locator('body')).toHaveAttribute('data-app-release','previous');
    await expect(page.locator('.city-ground')).toHaveAttribute('src','./assets/city-ground.webp');
    await page.getByRole('button',{name:'Tốc độ 8 lần',exact:true}).click();await page.getByRole('button',{name:'Tiếp tục',exact:true}).click();await page.clock.runFor(512);
    await expect(page.getByTestId('game-time')).toHaveText('Ngày 1 · 00:00:04');
    expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('crownlands.foundation.primary')).session.state.time)).toBe(0);
    await Promise.all([page.waitForNavigation(),update.click()]);await city(page);await page.locator('[data-plot="R04"]').click();
    await expect(page.locator('body')).toHaveAttribute('data-app-release','current');
    await expect(page.locator('.city-ground')).toHaveAttribute('src','./assets/city-ground-v02.webp');
    await expect(page.getByRole('button',{name:'Nội thành',exact:true})).toHaveAttribute('aria-current','page');
    await expect(page.getByTestId('plot-detail')).toContainText('Đang nâng cấp');
    await expect(page.getByTestId('game-time')).toHaveText('Ngày 1 · 00:00:04');
    await expect(page.getByRole('button',{name:'Tạm dừng',exact:true})).toBeVisible();
    const restored=await page.evaluate(()=>JSON.parse(localStorage.getItem('crownlands.foundation.primary')).session.state);
    expect(restored.time).toBe(4);expect(restored.jobs).toHaveLength(1);expect(restored.clock.speed).toBe(8);
    await expect(update).toBeHidden();
  }finally{await release.close();}
});
test('an app update keeps the current game available for export when its checkpoint fails',async({page})=>{
  const release=await updateServer();
  try{
    await page.goto(release.url);await page.getByRole('button',{name:'Tạm dừng',exact:true}).click();
    await page.evaluate(async()=>{await navigator.serviceWorker.ready;if(!navigator.serviceWorker.controller)await new Promise(resolve=>navigator.serviceWorker.addEventListener('controllerchange',resolve,{once:true}));});
    release.publish();await page.reload();
    await page.evaluate(async()=>{await(await navigator.serviceWorker.getRegistration()).update();});
    const update=page.getByRole('button',{name:'Cập nhật game',exact:true});await expect(update).toBeVisible();
    await page.evaluate(()=>{const original=Storage.prototype.setItem;Storage.prototype.setItem=function(key,value){if(key.startsWith('crownlands.foundation.'))throw new DOMException('Storage is full','QuotaExceededError');return original.call(this,key,value);};});
    await update.click();
    await expect(page.locator('body')).toHaveAttribute('data-app-release','previous');
    await expect(page.getByTestId('autosave-status')).toContainText('Không lưu được');
    await expect(page.getByRole('status')).toContainText('xuất bản');await expect(update).toBeVisible();
    await page.getByRole('button',{name:'Quản lý bản lưu',exact:true}).click();
    const downloadEvent=page.waitForEvent('download');await page.getByRole('button',{name:'↓ Xuất bản lưu',exact:true}).click();
    const download=await downloadEvent,exported=JSON.parse((await readFile(await download.path())).toString());expect(exported.clock.paused).toBe(true);
  }finally{await release.close();}
});
test('an available update fits a small viewport while keeping save and help controls accessible',async({page})=>{
  const release=await updateServer();
  try{
    await page.setViewportSize({width:390,height:844});await page.goto(release.url);
    await page.getByRole('button',{name:'Tạm dừng',exact:true}).click();
    await page.evaluate(async()=>{await navigator.serviceWorker.ready;if(!navigator.serviceWorker.controller)await new Promise(resolve=>navigator.serviceWorker.addEventListener('controllerchange',resolve,{once:true}));});
    release.publish();await page.reload();await page.evaluate(async()=>{await(await navigator.serviceWorker.getRegistration()).update();});
    const update=page.getByRole('button',{name:'Cập nhật game',exact:true});await expect(update).toBeVisible();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    for(const name of ['Cập nhật game','Quản lý bản lưu','Hướng dẫn']){
      const button=page.getByRole('button',{name,exact:true}),box=await button.boundingBox();
      expect(box.x,`${name} extends beyond the left edge`).toBeGreaterThanOrEqual(0);
      expect(box.x+box.width,`${name} extends beyond the right edge`).toBeLessThanOrEqual(390);
    }
    const title=await page.locator('#world-view h1').evaluate(h=>{const range=document.createRange();range.selectNodeContents(h);return range.getBoundingClientRect().toJSON();});
    const updateBox=await update.boundingBox();
    expect(updateBox.x>=title.right||updateBox.x+updateBox.width<=title.x||updateBox.y+updateBox.height<=title.y||updateBox.y>=title.bottom,'update button must not cover the scene title').toBe(true);
    await page.getByRole('button',{name:'Hướng dẫn',exact:true}).click();await expect(page.locator('#help-dialog')).toBeVisible();
    await page.getByRole('button',{name:'Đóng hướng dẫn',exact:true}).click();
    await page.getByRole('button',{name:'Quản lý bản lưu',exact:true}).click();await expect(page.locator('#save-dialog')).toBeVisible();
    await page.getByRole('button',{name:'Đóng bản lưu',exact:true}).click();
    await Promise.all([page.waitForNavigation(),update.click()]);await expect(page.locator('body')).toHaveAttribute('data-app-release','current');
  }finally{await release.close();}
});
