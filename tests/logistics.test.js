import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import * as sim from '../app/src/game.js';
const scenario=JSON.parse(readFileSync(new URL('../project-docs/prototype/scenarios/first-foundation.json',import.meta.url)));
const units=n=>({'sword-i':n,'spear-i':0,'archer-i':0});
function send(g,n=12,site='clay-near'){assert.equal(typeof sim.sendArmy,'function','field expeditions must be implemented');return sim.sendArmy(g,scenario,site,units(n),2);}
const clay=g=>g.logistics.sites.find(s=>s.id==='clay-near');

test('an expedition removes real garrison troops and rations but keeps hometown capacity occupied',()=>{
 const g=sim.createGame(scenario),a=send(g),c=g.cities[0];
 assert.equal(c.troops['sword-i'],8);assert.equal(c.upkeep,40);assert.equal(c.stock.grain,1776*sim.SCALE);
 assert.equal(a.stock.grain,24*sim.SCALE);assert.equal(a.arrives,480);
 assert.deepEqual(sim.armySummary(g,c.id),{used:52,reserved:0,capacity:200,free:148});
 assert.equal(clay(g).owner,'world-custody');assert.equal(clay(g).stock.clay,0);
});
test('arrival starts ownership and extraction; no remote resources appear in the city',()=>{
 const g=sim.createGame(scenario),a=send(g);sim.advanceGame(g,479);
 assert.equal(clay(g).owner,'world-custody');sim.advanceGame(g,1);
 assert.equal(clay(g).owner,'player');assert.equal(a.status,'working');assert.equal(a.stock.grain,80640000);
 sim.advanceGame(g,3600);assert.equal(clay(g).stock.clay,300*sim.SCALE);
 assert.equal(g.cities[0].ledger.clay.received,0);assert.equal(a.stock.grain,37440000);
});
test('mid-edge recall retraces the distance already travelled without teleporting',()=>{
 const g=sim.createGame(scenario),a=send(g);sim.advanceGame(g,150);
 const before=sim.armyPosition(a,g.time);sim.recallArmy(g,a.id);
 assert.deepEqual(sim.armyPosition(a,g.time),before);assert.equal(a.arrives,300);
 sim.advanceGame(g,149);assert.equal(g.logistics.armies.length,1);sim.advanceGame(g,1);
 assert.equal(g.logistics.armies.length,0);assert.equal(g.cities[0].troops['sword-i'],20);
 assert.equal(g.cities[0].upkeep,52);assert.equal(clay(g).owner,'world-custody');
});
test('safe-return reserves the way home, stops extraction and restores the real garrison',()=>{
 const g=sim.createGame(scenario);send(g);sim.advanceGame(g,6719);
 assert.equal(g.logistics.armies[0].status,'working');sim.advanceGame(g,1);
 assert.equal(g.logistics.armies[0].status,'returning');assert.equal(clay(g).owner,'world-custody');
 assert.equal(clay(g).stock.clay,520*sim.SCALE);sim.advanceGame(g,480);
 assert.equal(g.logistics.armies.length,0);assert.equal(g.cities[0].troops['sword-i'],20);
 assert.equal(sim.armySummary(g,g.cities[0].id).used,52);
});
test('a grain mine pays stationed troops from local production before their carried reserve',()=>{
 const g=sim.createGame(scenario),a=send(g,12,'grain-near');sim.advanceGame(g,600);
 const bag=a.stock.grain;sim.advanceGame(g,3600);
 const s=g.logistics.sites.find(s=>s.id==='grain-near');assert.equal(s.stock.grain,288*sim.SCALE);
 assert.equal(a.stock.grain,bag);assert.equal(a.status,'working');
});
test('real wagons travel out empty, load at the mine and deliver only on the return leg',()=>{
 const g=sim.createGame(scenario);send(g);sim.advanceGame(g,2280);
 const s=sim.collectShipment(g,scenario,'clay-near',1);
 assert.equal(sim.availableWagons(g),3);assert.equal(s.stock.clay,0);
 sim.advanceGame(g,479);assert.equal(g.cities[0].ledger.clay.received,0);sim.advanceGame(g,1);
 assert.equal(s.stock.clay,190*sim.SCALE);assert.equal(clay(g).stock.clay,0);
 sim.advanceGame(g,479);assert.equal(g.cities[0].ledger.clay.received,0);sim.advanceGame(g,1);
 assert.equal(g.cities[0].ledger.clay.received,190*sim.SCALE);assert.equal(sim.availableWagons(g),4);
 assert.equal(g.logistics.shipments.length,0);
});
test('a full warehouse keeps cargo on occupied wagons; partial unload and explicit discard conserve it',()=>{
 const g=sim.createGame(scenario);send(g);sim.advanceGame(g,2280);const c=g.cities[0];c.stock.clay=c.cap.clay*sim.SCALE;
 const s=sim.collectShipment(g,scenario,'clay-near',1);sim.advanceGame(g,960);
 assert.equal(s.status,'blocked');assert.equal(s.stock.clay,190*sim.SCALE);assert.equal(sim.availableWagons(g),3);
 c.stock.clay-=50*sim.SCALE;sim.unloadAtHome(g,'shipment',s.id);
 assert.equal(s.stock.clay,140*sim.SCALE);assert.equal(c.stock.clay,4000*sim.SCALE);
 sim.unloadAtHome(g,'shipment',s.id,true);assert.equal(sim.availableWagons(g),4);
 assert.equal(g.logistics.retired.clay.discarded,140*sim.SCALE);
});
test('returned soldiers cannot create a free temporary store when their city granary is full',()=>{
 const g=sim.createGame(scenario),a=send(g);g.cities[0].stock.grain=6000*sim.SCALE;
 sim.recallArmy(g,a.id);assert.equal(a.status,'home');assert.equal(g.logistics.armies.length,1);
 assert.equal(g.cities[0].troops['sword-i'],8);assert.equal(g.cities[0].upkeep,52);
 assert.equal(sim.armySummary(g,g.cities[0].id).used,52);
 sim.unloadAtHome(g,'army',a.id,true);assert.equal(g.logistics.armies.length,0);assert.equal(g.cities[0].troops['sword-i'],20);
});
test('invalid counts, foreign targets, duplicate mine assignment and insufficient rations never alter assets',()=>{
 const g=sim.createGame(scenario);assert.equal(typeof sim.sendArmy,'function');
 for(const [target,troops,hours] of [['clay-near',units(0),2],['clay-near',units(21),2],['clay-near',units(1.5),2],['bandit-near',units(12),2],['city-ash-frontier',units(12),2],['clay-near',units(12),0]]){
  const before=structuredClone(g);assert.throws(()=>sim.sendArmy(g,scenario,target,troops,hours));assert.deepEqual(g,before);
 }
 send(g);let before=structuredClone(g);assert.throws(()=>send(g,1));assert.deepEqual(g,before);
 assert.throws(()=>sim.collectShipment(g,scenario,'grain-near',1));
});
test('long advances, many small advances and speed changes produce identical field assets and events',()=>{
 const a=sim.createGame(scenario),b=sim.createGame(scenario);for(const g of [a,b])send(g);
 sim.advanceGame(a,2280);for(let i=0;i<2280;i++)sim.advanceGame(b,1);
 for(const g of [a,b])sim.collectShipment(g,scenario,'clay-near',1);
 sim.advanceGame(a,4920);for(let i=0;i<4920;i++)sim.advanceGame(b,1);assert.deepEqual(a,b);
});
test('pathfinding never transits other sites and rejects unwalkable destinations',()=>{
 assert.equal(typeof sim.findPath,'function');
 const route=sim.findPath(scenario,[12,32],[29,32]);assert.equal(route.length-1,19);
 assert.ok(!route.slice(1,-1).some(([x,y])=>x===22&&y===32));
 assert.equal(sim.findPath(scenario,[12,32],[25,10]),null);
});
