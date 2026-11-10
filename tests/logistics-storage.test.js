import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import * as sim from '../app/src/game.js';
import {encodeSave,decodeSave,SaveStore} from '../app/src/storage.js';
const scenario=JSON.parse(readFileSync(new URL('../project-docs/prototype/scenarios/first-foundation.json',import.meta.url)));
const v2=readFileSync(new URL('./fixtures/foundation-v2.json',import.meta.url),'utf8');
const send=g=>sim.sendArmy(g,scenario,'clay-near',{'sword-i':12,'spear-i':0,'archer-i':0},2);

test('a genuine partly completed v2 queue migrates without changing paid stock or progress',()=>{
 const old=JSON.parse(v2),g=decodeSave(v2,scenario);
 assert.equal(g.schema,3);assert.equal(g.ruleset,'foundation-0.3');assert.deepEqual(g.cities[0].stock,old.cities[0].stock);
 assert.deepEqual(g.training,old.training);assert.deepEqual(g.jobs,old.jobs);assert.equal(g.time,47);
 assert.deepEqual(g.logistics.armies,[]);assert.equal(g.logistics.wagons,4);
 sim.advanceGame(g,73);assert.equal(g.cities[0].troops['sword-i'],22);assert.equal(g.cities[0].plots[3].level,2);
 assert.deepEqual(decodeSave(encodeSave(g),scenario),g);
});
test('army, mine and loaded wagon restore between boundaries and deliver exactly once',()=>{
 const g=sim.createGame(scenario);send(g);sim.advanceGame(g,2280);sim.collectShipment(g,scenario,'clay-near',1);sim.advanceGame(g,500);
 const b=decodeSave(encodeSave(g),scenario);assert.deepEqual(b,g);
 sim.advanceGame(g,5000);sim.advanceGame(b,5000);assert.deepEqual(b,g);
 assert.equal(g.logistics.deliveredShipments,1);assert.deepEqual(decodeSave(encodeSave(g),scenario),g);
});
test('recall from a fractional tile and safe-return boundary remain saveable',()=>{
 const g=sim.createGame(scenario),a=send(g);sim.advanceGame(g,150);sim.recallArmy(g,a.id);
 const b=decodeSave(encodeSave(g),scenario);sim.advanceGame(g,150);sim.advanceGame(b,150);assert.deepEqual(b,g);
 send(g);sim.advanceGame(g,6720);assert.equal(g.logistics.armies[0].status,'returning');assert.deepEqual(decodeSave(encodeSave(g),scenario),g);
});
test('illegal routes, unpaid troops, forged goods, duplicate wagons and expired arrivals are refused',()=>{
 const g=sim.createGame(scenario);send(g);sim.advanceGame(g,480);sim.collectShipment(g,scenario,'clay-near',1);
 for(const change of [s=>s.logistics.armies[0].troops['sword-i']++,s=>s.logistics.armies[0].stock.grain++,s=>s.logistics.armies[0].path[1]=[60,60],s=>s.logistics.shipments[0].wagons=5,s=>s.logistics.shipments.push(structuredClone(s.logistics.shipments[0])),s=>s.logistics.shipments[0].arrives=s.time,s=>s.logistics.sites[0].stock.clay=100000,s=>s.cities[0].stock.grain+=12*sim.SCALE]){
  const broken=structuredClone(g);change(broken);assert.throws(()=>decodeSave(encodeSave(broken),scenario));
 }
 assert.deepEqual(decodeSave(encodeSave(g),scenario),g);
});
test('hometown capacity and payment include units away when new recruits are saved',()=>{
 const g=sim.createGame(scenario);send(g);sim.recruitUnits(g,g.cities[0].id,'sword-i',2);sim.advanceGame(g,50);
 assert.deepEqual(decodeSave(encodeSave(g),scenario),g);assert.equal(sim.armySummary(g,g.cities[0].id).used,53);
});
test('failed schema3 autosave keeps the prior valid expedition available',()=>{
 const data=new Map();let fail=false;const memory={getItem:k=>data.get(k)??null,setItem:(k,v)=>{if(fail)throw new Error('quota');data.set(k,v);}};
 const store=new SaveStore(memory,scenario),g=sim.createGame(scenario);send(g);sim.advanceGame(g,150);store.save(g);
 sim.advanceGame(g,100);fail=true;assert.throws(()=>store.save(g),/quota/);fail=false;
 const restored=store.read().data.session.state;assert.equal(restored.time,150);assert.equal(restored.logistics.armies.length,1);
});
test('a legitimate return into a full granary preserves its detached inventory on save',()=>{
 const g=sim.createGame(scenario);const a=sim.sendArmy(g,scenario,'grain-near',{'sword-i':12,'spear-i':0,'archer-i':0},2);
 sim.advanceGame(g,50000);sim.recallArmy(g,a.id);sim.advanceGame(g,600);
 assert.equal(a.status,'home');assert.equal(g.cities[0].stock.grain,6000*sim.SCALE);
 assert.deepEqual(decodeSave(encodeSave(g),scenario),g);sim.unloadAtHome(g,'army',a.id,true);
 assert.deepEqual(decodeSave(encodeSave(g),scenario),g);
});
function dueAtReserve(){
 const g=sim.createGame(scenario);send(g);sim.advanceGame(g,6720);const a=g.logistics.armies[0];
 a.status='working';a.path.reverse();a.started=0;a.arrives=480;g.logistics.sites[0].owner='player';return g;
}
test('a noncanonical working army due to return now cannot enter a paused imported game',()=>{
 assert.throws(()=>decodeSave(encodeSave(dueAtReserve()),scenario),/hành quân/);
});
test('zero-time simulation resolves a due safe-return boundary instead of leaving forecast stuck',()=>{
 const g=dueAtReserve();sim.advanceGame(g,0);assert.equal(g.time,6720);assert.equal(g.logistics.armies[0].status,'returning');
 assert.deepEqual(decodeSave(encodeSave(g),scenario),g);
});
