import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import * as sim from '../app/src/game.js';
const scenario=JSON.parse(readFileSync(new URL('../project-docs/prototype/scenarios/first-foundation.json',import.meta.url)));
const fresh=()=>sim.createGame(scenario),home=g=>g.cities[0];
function recruit(g,profile,count){assert.equal(typeof sim.recruitUnits,'function','paid recruitment is available');return sim.recruitUnits(g,home(g).id,profile,count);}

test('recruitment pays once and immediately reserves capacity without adding soldiers or upkeep',()=>{
 const g=fresh();recruit(g,'sword-i',2);
 assert.deepEqual(home(g).troops,{'sword-i':20,'spear-i':20,'archer-i':12});
 assert.deepEqual(sim.armySummary(g,home(g).id),{used:52,reserved:2,capacity:200,free:146});
 assert.equal(home(g).stock.wood,1120*sim.SCALE);assert.equal(home(g).stock.iron,1100*sim.SCALE);
 assert.equal(home(g).stock.clay,1160*sim.SCALE);assert.equal(home(g).stock.grain,1780*sim.SCALE);
 assert.equal(home(g).upkeep,52);assert.equal(g.training[0].next,40);
});
test('each completed soldier changes upkeep from that exact boundary, not when queued',()=>{
 const g=fresh();recruit(g,'sword-i',2);sim.advanceGame(g,39);
 assert.equal(home(g).troops['sword-i'],20);assert.equal(home(g).upkeep,52);
 sim.advanceGame(g,1);assert.equal(home(g).troops['sword-i'],21);assert.equal(home(g).upkeep,53);
 assert.equal(sim.rates(home(g)).grain,347);sim.advanceGame(g,40);
 assert.equal(home(g).troops['sword-i'],22);assert.equal(home(g).upkeep,54);assert.equal(g.training.length,0);
 assert.equal(home(g).stock.grain,1780*sim.SCALE+(348*40+347*40)*1000);
 assert.deepEqual(sim.armySummary(g,home(g).id),{used:54,reserved:0,capacity:200,free:146});
});
test('mixed recruitment orders finish in placement order with their individual durations',()=>{
 const g=fresh();recruit(g,'sword-i',2);recruit(g,'spear-i',1);recruit(g,'archer-i',1);
 assert.deepEqual(g.training.map(j=>j.next),[40,115,160]);
 sim.advanceGame(g,114);assert.equal(home(g).troops['sword-i'],22);assert.equal(home(g).troops['spear-i'],20);
 sim.advanceGame(g,1);assert.equal(home(g).troops['spear-i'],21);
 sim.advanceGame(g,45);assert.equal(home(g).troops['archer-i'],13);assert.equal(g.training.length,0);
});
test('training and a plot completing at the same tick are both committed once at every speed',()=>{
 const results=[1,2,4,8].map(speed=>{const g=fresh();recruit(g,'sword-i',3);sim.upgradePlot(g,home(g).id,'R04');g.clock.speed=speed;sim.elapse(g,160000/speed);g.clock.speed=1;return g;});
 for(const g of results){assert.deepEqual(g,results[0]);assert.equal(home(g).troops['sword-i'],23);assert.equal(home(g).plots[3].level,2);assert.equal(sim.rates(home(g)).grain,370);}
 const b=fresh();recruit(b,'sword-i',3);sim.upgradePlot(b,home(b).id,'R04');for(let i=0;i<160;i++)sim.advanceGame(b,1);assert.deepEqual(b,results[0]);
});
test('invalid, foreign, unaffordable and absent-barracks recruitment never changes assets',()=>{
 const g=fresh();assert.equal(typeof sim.recruitOffer,'function');
 for(const [profile,count] of [['sword-i',0],['sword-i',-1],['sword-i',1.5],['sword-i',NaN],['sword-i',Infinity],['missing',1],['sword-i','2']]){
  const before=structuredClone(g);assert.equal(sim.recruitOffer(g,home(g).id,profile,count).allowed,false);assert.throws(()=>sim.recruitUnits(g,home(g).id,profile,count));assert.deepEqual(g,before);
 }
 assert.throws(()=>sim.recruitUnits(g,g.cities[1].id,'sword-i',1),/quyền/);
 home(g).stock.iron=0;let before=structuredClone(g);assert.throws(()=>recruit(g,'sword-i',1),/đủ/);assert.deepEqual(g,before);
 home(g).buildings.S05=0;assert.equal(sim.recruitOffer(g,home(g).id,'sword-i',1).allowed,false);
});
test('pending soldiers consume capacity and a full five-order queue rejects new payments',()=>{
 const g=fresh();home(g).capacity=53;recruit(g,'sword-i',1);
 let before=structuredClone(g);assert.throws(()=>recruit(g,'spear-i',1),/hạn mức/);assert.deepEqual(g,before);
 const q=fresh();for(let i=0;i<5;i++)recruit(q,'sword-i',1);
 before=structuredClone(q);assert.throws(()=>recruit(q,'sword-i',1),/hàng đợi/i);assert.deepEqual(q,before);
 sim.advanceGame(q,40);recruit(q,'spear-i',1);assert.equal(q.training.length,5);
});
test('pause and trial horizon cannot cause early or impossible training completion',()=>{
 const g=fresh();recruit(g,'sword-i',1);g.clock.paused=true;sim.elapse(g,100000);assert.equal(home(g).troops['sword-i'],20);
 const edge=fresh();sim.advanceGame(edge,sim.MAX_TIME-35);assert.equal(sim.recruitOffer(edge,home(edge).id,'spear-i',1).allowed,true);
 assert.equal(sim.recruitOffer(edge,home(edge).id,'sword-i',1).allowed,false);
});
