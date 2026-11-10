import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import * as sim from '../app/src/game.js';
import {encodeSave,decodeSave,SaveStore} from '../app/src/storage.js';
const scenario=JSON.parse(readFileSync(new URL('../project-docs/prototype/scenarios/first-foundation.json',import.meta.url)));
const legacy=readFileSync(new URL('./fixtures/foundation-v1.json',import.meta.url),'utf8');
class MemoryStorage{data=new Map();getItem(k){return this.data.get(k)??null;}setItem(k,v){this.data.set(k,v);}}
function recruit(g,profile,count){assert.equal(typeof sim.recruitUnits,'function');sim.recruitUnits(g,g.cities[0].id,profile,count);}

test('genuine v1 progress migrates with identical resources, field job, clock and no elapsed wall time',()=>{
 const old=JSON.parse(legacy),g=decodeSave(legacy,scenario);
 assert.equal(g.schema,3);assert.equal(g.ruleset,'foundation-0.3');assert.equal(g.time,47);
 assert.deepEqual(g.clock,old.clock);assert.deepEqual(g.jobs,old.jobs);assert.deepEqual(g.cities[0].stock,old.cities[0].stock);
 assert.deepEqual(g.cities[0].troops,{'sword-i':20,'spear-i':20,'archer-i':12});assert.equal(g.training.length,0);
 sim.advanceGame(g,73);assert.equal(g.cities[0].plots[3].level,2);assert.equal(g.time,120);assert.deepEqual(decodeSave(encodeSave(g),scenario),g);
});
test('legacy sessions and all save slots migrate in memory while original stored bytes stay untouched',()=>{
 const mem=new MemoryStorage(),record={savedAt:42,state:JSON.parse(legacy)};
 const original=JSON.stringify({version:1,session:record,manual:[record,null,null],quick:record,autos:[record]});
 mem.setItem('crownlands.foundation.primary',original);const store=new SaveStore(mem,scenario),result=store.read();
 for(const r of [result.data.session,result.data.manual[0],result.data.quick,result.data.autos[0]])assert.equal(r.state.schema,3);
 assert.equal(mem.getItem('crownlands.foundation.primary'),original);
 store.save(result.data.session.state);assert.equal(mem.getItem('crownlands.foundation.backup'),original);
 assert.equal(store.read().data.session.state.time,47);
});
test('paid mixed queues survive saves between individual completions without paying or spawning twice',()=>{
 const g=sim.createGame(scenario);recruit(g,'sword-i',2);recruit(g,'archer-i',2);sim.advanceGame(g,50);
 let restored=decodeSave(encodeSave(g),scenario);assert.deepEqual(restored,g);
 sim.advanceGame(g,160);sim.advanceGame(restored,160);assert.deepEqual(restored,g);
 assert.equal(g.cities[0].upkeep,56);assert.equal(g.training.length,0);assert.deepEqual(decodeSave(encodeSave(g),scenario),g);
});
test('malformed or unpaid recruitment states are rejected without corrupting current progress',()=>{
 const g=sim.createGame(scenario);recruit(g,'sword-i',2);const before=structuredClone(g);
 for(const corrupt of [s=>s.training[0].remaining=0,s=>s.training[0].next=s.time,s=>s.training.push({...s.training[0]}),s=>s.training[0].count=3,s=>s.cities[0].troops['sword-i']=201,s=>s.cities[0].upkeep=0,s=>s.cities[0].ledger.iron.spent=0]){
  const broken=structuredClone(g);corrupt(broken);assert.throws(()=>decodeSave(JSON.stringify(broken),scenario));
 }
 assert.deepEqual(g,before);
});
test('an explicitly future schema remains an unsupported version even without other metadata',()=>{
 assert.throws(()=>decodeSave('{"schema":99}',scenario),/phiên bản/);
 const mem=new MemoryStorage(),store=new SaveStore(mem,scenario);store.save(sim.createGame(scenario));
 const future=JSON.parse(mem.getItem('crownlands.foundation.primary'));future.session.state={schema:99};
 const bytes=JSON.stringify(future);mem.setItem('crownlands.foundation.primary',bytes);
 assert.throws(()=>store.read(),/phiên bản/);assert.equal(mem.getItem('crownlands.foundation.primary'),bytes);
});
test('imported troops and queues cannot keep refunded resources behind an apparently paid ledger',()=>{
 const g=sim.createGame(scenario),oldStock={...g.cities[0].stock};recruit(g,'sword-i',2);
 g.cities[0].stock=oldStock;assert.throws(()=>decodeSave(encodeSave(g),scenario));
});
