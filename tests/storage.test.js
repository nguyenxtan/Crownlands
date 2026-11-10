import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createGame,upgradePlot,advanceGame} from '../app/src/game.js';
import {encodeSave,decodeSave,SaveStore} from '../app/src/storage.js';
const scenario=JSON.parse(readFileSync(new URL('../project-docs/prototype/scenarios/first-foundation.json',import.meta.url)));
const fresh=()=>createGame(scenario);
class MemoryStorage {
  data=new Map(); fail=false;
  getItem(k){return this.data.get(k)??null;}
  setItem(k,v){if(this.fail)throw new Error('quota');this.data.set(k,v);}
}

test('mid-job export/import preserves exact stock, clock carry and one completion',()=>{
  const g=fresh();upgradePlot(g,g.cities[0].id,'R04');advanceGame(g,47);g.clock.remainder=333;
  const restored=decodeSave(encodeSave(g),scenario);assert.deepEqual(restored,g);
  advanceGame(g,100);advanceGame(restored,100);assert.deepEqual(restored,g);assert.equal(restored.events.length,1);
});
test('malformed and future saves are refused without changing the original',()=>{
  const g=fresh(),before=structuredClone(g);
  for(const mutate of [s=>s.schema=9,s=>s.cities[0].stock.wood=-1,s=>s.cities[0].plots[0].level=20,s=>s.clock.speed=99,s=>s.cities[0].upkeep=0,s=>s.cities[0].plots[1].id='R01',s=>s.time=1e100]){
    const b=structuredClone(g);mutate(b);assert.throws(()=>decodeSave(JSON.stringify(b),scenario));
  }
  assert.throws(()=>decodeSave('{',scenario));assert.deepEqual(g,before);
});
test('duplicate and overdue jobs cannot be imported',()=>{
  const g=fresh();upgradePlot(g,g.cities[0].id,'R04');g.jobs.push({...g.jobs[0],id:2});g.sequence=2;
  assert.throws(()=>decodeSave(JSON.stringify(g),scenario));g.jobs.pop();g.time=121;
  assert.throws(()=>decodeSave(JSON.stringify(g),scenario));
});
test('three manual slots, quicksave and five rotating autosaves remain independent',()=>{
  const store=new SaveStore(new MemoryStorage(),scenario),g=fresh();
  for(let i=0;i<3;i++){advanceGame(g,1);store.save(g,`manual-${i}`);}
  store.save(g,'quick');
  for(let i=0;i<7;i++){advanceGame(g,1);store.save(g,'auto');}
  const data=store.read().data;
  assert.deepEqual(data.manual.map(r=>r.state.time),[1,2,3]);assert.equal(data.quick.state.time,3);
  assert.deepEqual(data.autos.map(r=>r.state.time),[10,9,8,7,6]);assert.equal(data.session.state.time,10);
});
test('failed writes preserve the previous save and never report success',()=>{
  const mem=new MemoryStorage(),store=new SaveStore(mem,scenario),g=fresh();store.save(g,'session');
  mem.fail=true;advanceGame(g,50);assert.throws(()=>store.save(g,'session'),/quota/);
  mem.fail=false;assert.equal(store.read().data.session.state.time,0);
});
test('corrupt primary recovers a validated backup and the next save keeps that backup valid',()=>{
  const mem=new MemoryStorage(),store=new SaveStore(mem,scenario),g=fresh();
  store.save(g,'session');advanceGame(g,10);store.save(g,'session');
  mem.setItem('crownlands.foundation.primary','broken');
  assert.equal(store.read().recovered,true);assert.equal(store.read().data.session.state.time,0);
  store.save(g,'session');mem.setItem('crownlands.foundation.primary','broken again');
  assert.equal(store.read().data.session.state.time,0);
});
test('unrecoverable data and unsupported future envelopes are never silently reset',()=>{
  const mem=new MemoryStorage(),store=new SaveStore(mem,scenario);
  mem.setItem('crownlands.foundation.primary','broken');assert.throws(()=>store.read(),/khôi phục/);
  mem.setItem('crownlands.foundation.primary',JSON.stringify({version:99}));assert.throws(()=>store.read(),/phiên bản/);
});
test('a primary missing its envelope version is corruption and recovers the valid backup',()=>{
  const mem=new MemoryStorage(),store=new SaveStore(mem,scenario),g=fresh();
  store.save(g);advanceGame(g,10);store.save(g);mem.setItem('crownlands.foundation.primary','{}');
  assert.equal(store.read().recovered,true);assert.equal(store.read().data.session.state.time,0);
});
test('damaged state version metadata recovers a valid backup instead of blocking recovery',()=>{
  for(const damage of [()=>null,()=>({}),g=>{delete g.schema;return g;},g=>{delete g.ruleset;return g;}]){
    const mem=new MemoryStorage(),store=new SaveStore(mem,scenario),g=fresh();
    store.save(g);advanceGame(g,10);store.save(g);
    const primary=JSON.parse(mem.getItem('crownlands.foundation.primary'));
    primary.session.state=damage(primary.session.state);
    mem.setItem('crownlands.foundation.primary',JSON.stringify(primary));
    const restored=store.read();
    assert.equal(restored.recovered,true);assert.equal(restored.data.session.state.time,0);
  }
});
test('explicitly unsupported state versions preserve the primary instead of rolling back to backup',()=>{
  for(const change of [g=>g.schema=99,g=>g.ruleset='foundation-future']){
    const mem=new MemoryStorage(),store=new SaveStore(mem,scenario),g=fresh();
    store.save(g);advanceGame(g,10);store.save(g);
    const primary=JSON.parse(mem.getItem('crownlands.foundation.primary'));
    change(primary.session.state);
    const bytes=JSON.stringify(primary);mem.setItem('crownlands.foundation.primary',bytes);
    assert.throws(()=>store.read(),/phiên bản/);
    assert.equal(mem.getItem('crownlands.foundation.primary'),bytes);
  }
});
test('an inconsistent imported sequence is rejected before any paid upgrade can make it unsavable',()=>{
  const g=fresh();g.sequence=16;assert.throws(()=>decodeSave(JSON.stringify(g),scenario));
});
test('every accepted legitimate upgrade state remains saveable through all sixteen completions',()=>{
  let g=fresh();advanceGame(g,40000);
  for(let i=1;i<=16;i++){
    upgradePlot(g,g.cities[0].id,`R${String(i).padStart(2,'0')}`);
    g=decodeSave(encodeSave(g),scenario);advanceGame(g,120);g=decodeSave(encodeSave(g),scenario);
  }
  assert.equal(g.sequence,16);assert.equal(g.jobs.length,0);assert.equal(g.cities[0].plots.filter(p=>p.level===2).length,16);
});
test('impossible imported ledger totals cannot overflow the validation range on the next tick',()=>{
  const g=fresh();g.cities[0].ledger.wood.produced=4e15;
  assert.throws(()=>decodeSave(JSON.stringify(g),scenario));
});
