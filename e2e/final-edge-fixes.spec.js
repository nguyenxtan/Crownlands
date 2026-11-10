import {test,expect} from '@playwright/test';
import {readFileSync} from 'node:fs';
import {readFile} from 'node:fs/promises';
import {createGame,advanceGame,sendArmy,recallArmy,recruitUnits} from '../app/src/game.js';
const scenario=JSON.parse(readFileSync(new URL('../project-docs/prototype/scenarios/first-foundation.json',import.meta.url)));
const PRIMARY='crownlands.foundation.primary',BACKUP='crownlands.foundation.backup',INCIDENT='crownlands.foundation.incident';

test('F2 export fallback is available after archive succeeds but the reset primary write hits quota',async({page})=>{
  await page.addInitScript(([primary,backup,incident])=>{
    localStorage.setItem(primary,'broken primary');localStorage.setItem(backup,'broken backup');
    const original=Storage.prototype.setItem;Storage.prototype.setItem=function(key,value){if(key===primary&&localStorage.getItem(incident))throw new DOMException('Storage is full','QuotaExceededError');return original.call(this,key,value);};
  },[PRIMARY,BACKUP,INCIDENT]);
  await page.goto('/');const dialog=page.getByRole('dialog',{name:'Cần khôi phục bản lưu'});
  page.once('dialog',prompt=>prompt.accept());await dialog.getByRole('button',{name:'Chơi mới trên máy này',exact:true}).click();
  const event=page.waitForEvent('download');await dialog.getByRole('button',{name:'Xuất dữ liệu gốc',exact:true}).click();const file=await event;
  const raw=JSON.parse(await readFile(await file.path(),'utf8'));expect(raw.primary).toBe('broken primary');expect(raw.backup).toBe('broken backup');expect(raw.incident).toBeTruthy();
  const proceed=dialog.getByRole('button',{name:'Tôi đã giữ file xuất · chơi mới',exact:true});await expect(proceed).toBeVisible();
  page.once('dialog',prompt=>prompt.accept());await proceed.click();await expect(dialog).toBeHidden();await expect(page.getByTestId('autosave-status')).toHaveText('Đã tự lưu');
});

test('F1 an army badge retiring during a held touch cannot leave ghost pinch pointers',async({page})=>{
  await page.setViewportSize({width:800,height:900});await page.clock.install();
  const game=createGame(scenario),army=sendArmy(game,scenario,'clay-near',{'sword-i':12,'spear-i':0,'archer-i':0},2);
  advanceGame(game,30);recallArmy(game,army.id);recruitUnits(game,game.cities[0].id,'sword-i',20);game.clock.paused=true;game.clock.speed=8;
  await page.addInitScript(state=>localStorage.setItem('crownlands.foundation.primary',JSON.stringify({version:1,session:{savedAt:1,state},manual:[null,null,null],quick:null,autos:[]})),game);
  await page.goto('/');const marker=page.locator('[data-map-army="1"]');await expect(marker).toBeVisible();
  const box=await marker.boundingBox(),client=await page.context().newCDPSession(page),point=(id,x,y)=>({id,x,y,radiusX:2,radiusY:2,force:1});
  await page.evaluate(()=>{window.__edgeTouches=0;document.addEventListener('pointerdown',event=>{if(event.pointerType==='touch')window.__edgeTouches++;},true);});
  await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[point(1,box.x+box.width/2,box.y+box.height/2)]});
  await expect.poll(()=>page.evaluate(()=>window.__edgeTouches)).toBe(1);
  await page.evaluate(()=>document.querySelector('#pause').click());await page.clock.runFor(4000);await expect(marker).toHaveCount(0);
  await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[point(1,20,10)]});await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  await page.evaluate(()=>document.querySelector('#pause').click());
  const canvas=await page.locator('#world-map').boundingBox(),zoom=page.getByTestId('zoom'),where=page.getByTestId('map-position'),previousZoom=await zoom.textContent(),previousPosition=await where.textContent();
  const x=canvas.x+canvas.width/2,y=canvas.y+canvas.height/2;
  await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[point(2,x,y)]});await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[point(2,x+150,y)]});
  await expect(where).not.toHaveText(previousPosition);await expect(zoom).toHaveText(previousZoom);
  await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
});
