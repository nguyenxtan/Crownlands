import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createGame,sendArmy,advanceGame,SCALE} from '../app/src/game.js';
// Import dynamically: the first RED run fails for the missing feature, not a module-loader error.
const s=JSON.parse(readFileSync(new URL('../project-docs/prototype/scenarios/first-foundation.json',import.meta.url)));
const load=async()=>{let module;try{module=await import('../app/src/field-presentation.js');}catch{}assert.ok(module,'shared field presentation must exist');return module;};

test('durations name minutes and hours explicitly and retain remaining seconds',async()=>{
 const {gameDuration}=await load();
 for(const [seconds,want] of [[0,'0 giây'],[59,'59 giây'],[60,'1 phút'],[480,'8 phút'],[3661,'1 giờ 1 phút 1 giây'],[86400,'1 ngày']])assert.equal(gameDuration(seconds),want);
});
test('mixed troop labels retain each line, tier and count instead of a generic army flag',async()=>{
 const {armyView}=await load(),g=createGame(s),a=sendArmy(g,s,'clay-near',{'sword-i':8,'spear-i':4,'archer-i':0},2),before=structuredClone(g);
 const v=armyView(a,g.time);assert.equal(v.composition,'8 Kiếm binh I · 4 Giáo binh I');assert.equal(v.count,12);assert.equal(v.phase,'Đang tới mỏ');
 assert.equal(v.grain,24);assert.equal(v.grainPerSoldier,2);assert.equal(v.upkeepPerSoldier,1);assert.equal(v.secondsLeft,480);assert.equal(v.progress,0);assert.deepEqual(g,before);
});
test('ration detail follows consumed grain and actual expedition phase',async()=>{
 const {armyView}=await load(),g=createGame(s),a=sendArmy(g,s,'clay-near',{'sword-i':12,'spear-i':0,'archer-i':0},2);
 advanceGame(g,240);let v=armyView(a,g.time);assert.equal(v.grainPerSoldier,23.2/12);assert.equal(v.progress,.5);assert.equal(v.secondsLeft,240);
 advanceGame(g,240);v=armyView(a,g.time);assert.equal(v.phase,'Đang giữ và khai thác');assert.equal(v.phaseIndex,1);assert.equal(v.grain,22.4);assert.equal(a.stock.grain,22.4*SCALE);
});
