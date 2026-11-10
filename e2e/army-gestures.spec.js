import {test,expect} from '@playwright/test';
import {readFileSync} from 'node:fs';
import {createGame,sendArmy} from '../app/src/game.js';
const scenario=JSON.parse(readFileSync(new URL('../project-docs/prototype/scenarios/first-foundation.json',import.meta.url)));
async function boot(page,two=false){
 const g=createGame(scenario);sendArmy(g,scenario,'clay-near',{'sword-i':12,'spear-i':0,'archer-i':0},2);
 if(two)sendArmy(g,scenario,'grain-near',{'sword-i':0,'spear-i':12,'archer-i':0},2);g.clock.paused=true;
 await page.addInitScript(state=>{const r={savedAt:1,state};localStorage.setItem('crownlands.foundation.primary',JSON.stringify({version:1,session:r,manual:[null,null,null],quick:null,autos:[]}));},g);
 await page.goto('/');await expect(page.locator('[data-map-army="1"]')).toBeVisible();
}
const center=async locator=>{const r=await locator.boundingBox();return {x:r.x+r.width/2,y:r.y+r.height/2};};
async function touchSession(page){
 await page.evaluate(()=>{window.armyTouchEvents={down:0,cancel:0};document.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')window.armyTouchEvents.down++;});document.addEventListener('pointercancel',e=>{if(e.pointerType==='touch')window.armyTouchEvents.cancel++;});});
 return page.context().newCDPSession(page);
}
const point=(p,id)=>({...p,id,radiusX:2,radiusY:2,force:1});
async function startTouch(page,cdp,points){await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:points});await expect.poll(()=>page.evaluate(()=>window.armyTouchEvents.down)).toBe(points.length);}

test('wheel and mouse drag beginning on an army badge keep map navigation and suppress drag selection',async({page})=>{
 await boot(page);const marker=page.locator('[data-map-army="1"]'),zoom=page.getByTestId('zoom');const z=await zoom.textContent();
 await marker.hover();await page.mouse.wheel(0,-120);await expect(zoom).not.toHaveText(z);
 const before=await page.getByTestId('map-position').textContent(),p=await center(marker);
 await page.mouse.move(p.x,p.y);await page.mouse.down();await page.mouse.move(p.x+90,p.y+40,{steps:6});await page.mouse.up();
 await expect(page.getByTestId('map-position')).not.toHaveText(before);await expect(marker).toHaveAttribute('aria-pressed','false');
 await marker.click();await expect(marker).toHaveAttribute('aria-pressed','true');
});

test('one finger can pan from an army badge and a cancelled gesture leaves no stale drag',async({page})=>{
 await boot(page);const marker=page.locator('[data-map-army="1"]'),cdp=await touchSession(page),p=await center(marker),before=await page.getByTestId('map-position').textContent();
 await startTouch(page,cdp,[point(p,11)]);await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[point({x:p.x+90,y:p.y+30},11)]});
 await expect(page.getByTestId('map-position')).not.toHaveText(before);
 await cdp.send('Input.dispatchTouchEvent',{type:'touchCancel',touchPoints:[]});await expect.poll(()=>page.evaluate(()=>window.armyTouchEvents.cancel)).toBeGreaterThan(0);
 const camera=await page.getByTestId('map-position').textContent();await page.mouse.move(800,500);await expect(page.getByTestId('map-position')).toHaveText(camera);
 await marker.click();await expect(marker).toHaveAttribute('aria-pressed','true');
});

for(const bothBadges of [false,true])test(`pinch tracks ${bothBadges?'two army badges':'one badge and the map'} without selecting an army`,async({page})=>{
 await boot(page,bothBadges);const first=page.locator('[data-map-army="1"]'),p=await center(first),other=bothBadges?await center(page.locator('[data-map-army="2"]')):{x:p.x+120,y:p.y};
 const cdp=await touchSession(page),before=await page.getByTestId('zoom').textContent();await startTouch(page,cdp,[point(p,11),point(other,22)]);
 await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[point({x:p.x-60,y:p.y-25},11),point({x:other.x+60,y:other.y+25},22)]});
 await expect(page.getByTestId('zoom')).not.toHaveText(before);await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 await expect(first).toHaveAttribute('aria-pressed','false');if(bothBadges)await expect(page.locator('[data-map-army="2"]')).toHaveAttribute('aria-pressed','false');
});
