// Regressions for project-docs/reviews/2026-11-10-full-code-review-claude.md (I1, I2, M1, M2, M4).
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createGame,advanceGame,elapse,recruitUnits,sendArmy,recallArmy,collectShipment,unloadAtHome,armyPosition,SCALE,MAX_TIME} from '../app/src/game.js';
import {economySnapshot,forecastEconomy} from '../app/src/economy.js';
import {encodeSave,decodeSave,SaveStore} from '../app/src/storage.js';
const scenario=JSON.parse(readFileSync(new URL('../project-docs/prototype/scenarios/first-foundation.json',import.meta.url)));
const PRIMARY='crownlands.foundation.primary',BACKUP='crownlands.foundation.backup';
const fresh=()=>createGame(scenario);
const swords=n=>({'sword-i':n,'spear-i':0,'archer-i':0});
class MemoryStorage {
  data=new Map();writes=[];failKeys=new Set();
  getItem(k){return this.data.get(k)??null;}
  setItem(k,v){if(this.failKeys.has(k)||this.failKeys.has('*'))throw new Error('quota');this.writes.push(k);this.data.set(k,String(v));}
  removeItem(k){this.data.delete(k);}
}

// ---------- I1: unreadable data is archived before any reset and can be exported ----------
test('I1 recovery reset archives the exact unreadable primary and backup before overwriting them',()=>{
  const mem=new MemoryStorage(),store=new SaveStore(mem,scenario);
  const future=JSON.stringify({version:2,note:'future progress'}),broken='{"version":1,"session":';
  mem.setItem(PRIMARY,future);mem.setItem(BACKUP,broken);
  assert.throws(()=>store.read(),/phiên bản/);
  store.resetSession(fresh());store.save(fresh());store.save(fresh(),'auto');
  const incidents=store.incidents();
  assert.equal(incidents.length,1);assert.equal(incidents[0].primary,future);assert.equal(incidents[0].backup,broken);
  const exported=JSON.parse(store.rawExport());
  assert.equal(exported.incidents[0].primary,future);assert.equal(exported.incidents[0].backup,broken);
});
test('I1 a second distinct unreadable incident is added instead of replacing the first',()=>{
  const mem=new MemoryStorage(),store=new SaveStore(mem,scenario);
  mem.setItem(PRIMARY,'first broken');store.resetSession(fresh());
  mem.setItem(PRIMARY,'second broken');mem.setItem(BACKUP,'second backup broken');store.resetSession(fresh());
  store.resetSession(fresh());
  assert.deepEqual(store.incidents().map(i=>i.primary),['first broken','second broken']);
});
test('I1 malformed incident entries are preserved as raw data without blocking a new recovery',()=>{
  for(const entries of [[null],[1],[false],[[]],[{primary:null}],[{primary:{broken:true},backup:null}]]){
    const mem=new MemoryStorage(),store=new SaveStore(mem,scenario),original=JSON.stringify({version:1,incidents:entries});
    mem.setItem('crownlands.foundation.incident',original);mem.setItem(PRIMARY,'broken primary');mem.setItem(BACKUP,'broken backup');
    store.resetSession(fresh());store.save(fresh());
    assert.equal(store.read().data.session.state.time,0);
    const kept=store.incidents();assert.equal(kept[0].primary,original);assert.equal(kept[1].primary,'broken primary');assert.equal(kept[1].backup,'broken backup');
  }
});
test('I1 archival failure aborts the reset and leaves both originals untouched',()=>{
  const mem=new MemoryStorage(),store=new SaveStore(mem,scenario);
  mem.setItem(PRIMARY,'broken primary');mem.setItem(BACKUP,'broken backup');mem.failKeys.add('crownlands.foundation.incident');
  assert.throws(()=>store.resetSession(fresh()),/dữ liệu gốc/);
  assert.equal(mem.getItem(PRIMARY),'broken primary');assert.equal(mem.getItem(BACKUP),'broken backup');
});
test('I1 recovering from backup archives the unreadable primary before the next save replaces it',()=>{
  const mem=new MemoryStorage(),store=new SaveStore(mem,scenario),g=fresh();
  store.save(g);advanceGame(g,5);store.save(g);mem.setItem(PRIMARY,'damaged bytes');
  assert.equal(store.read().recovered,true);store.save(g);
  assert.equal(store.incidents()[0].primary,'damaged bytes');
});
test('I1 recovery keeps healthy manual slots from an otherwise unreadable store',()=>{
  const mem=new MemoryStorage(),store=new SaveStore(mem,scenario),g=fresh();advanceGame(g,30);
  store.save(g,'manual-1');
  const data=JSON.parse(mem.getItem(PRIMARY));data.autos=[{savedAt:1,state:{schema:3,ruleset:'foundation-0.3',broken:true}}];
  mem.setItem(PRIMARY,JSON.stringify(data));mem.setItem(BACKUP,'also broken');
  assert.throws(()=>store.read());
  store.resetSession(fresh());
  const after=store.read().data;assert.equal(after.manual[1].state.time,30);assert.equal(after.session.state.time,0);
});

// ---------- I2: field economy, local upkeep and separate ledgers ----------
function heldAtFullGranary(){
  const g=fresh();advanceGame(g,13*3600);
  const a=sendArmy(g,scenario,'clay-near',swords(12),8);advanceGame(g,3600);recallArmy(g,a.id);advanceGame(g,3600);
  return {g,a};
}
test('I2 home-held troops are distinguished and their upkeep is counted exactly once',()=>{
  const {g,a}=heldAtFullGranary(),s=economySnapshot(g,g.cities[0].id);
  assert.equal(a.status,'home');
  assert.equal(s.garrison,40);assert.equal(s.heldTroops,12);assert.equal(s.awayTroops,0);
  assert.equal(s.localUpkeep,52);assert.equal(s.resources.grain.upkeep,52);assert.equal(g.cities[0].upkeep,52);
});
test('I2 snapshot lists field armies and wagons with exact known incoming cargo and arrival times',()=>{
  const g=fresh(),c=g.cities[0];sendArmy(g,scenario,'clay-near',swords(12),8);advanceGame(g,7200);
  const ship=collectShipment(g,scenario,'clay-near',1);advanceGame(g,480);
  const s=economySnapshot(g,c.id);
  assert.equal(s.awayTroops,12);assert.equal(s.garrison,40);
  assert.deepEqual(s.field.shipments.map(x=>[x.id,x.status,x.arrives]),[[ship.id,'to-home',960+7200]]);
  assert.deepEqual(s.incoming,[{kind:'shipment',id:ship.id,resource:'clay',amount:500*SCALE,arrives:8160}]);
  const f=forecastEconomy(g,c.id,3600);
  assert.equal(f.resources.clay.received,500*SCALE);
  assert.equal(f.resources.clay.change,f.resources.clay.produced-f.resources.clay.overflow+500*SCALE);
});
test('I2 a returning army reports the rations it will actually bring home',()=>{
  const g=fresh(),a=sendArmy(g,scenario,'clay-near',swords(12),8);advanceGame(g,1200);recallArmy(g,a.id);
  const s=economySnapshot(g,g.cities[0].id),expected=a.stock.grain-12*1000*(a.arrives-g.time);
  assert.deepEqual(s.incoming,[{kind:'army',id:a.id,resource:'grain',amount:expected,arrives:a.arrives}]);
  advanceGame(g,a.arrives-g.time);assert.equal(g.cities[0].ledger.grain.received,expected);
});
test('I2 queued upkeep is incremental and the forecast reports end-of-horizon local upkeep',()=>{
  const g=fresh(),c=g.cities[0];recruitUnits(g,c.id,'sword-i',3);
  const s=economySnapshot(g,c.id);assert.equal(s.queuedUpkeep,3);assert.equal(s.localUpkeep,52);
  assert.equal(forecastEconomy(g,c.id,900).upkeepAtEnd,55);
  const h=heldAtFullGranary();assert.equal(forecastEconomy(h.g,h.g.cities[0].id,900).upkeepAtEnd,52);
});
test('I2 discards on wagons stay out of the local city ledger and are reported separately',()=>{
  const g=fresh();advanceGame(g,40000);sendArmy(g,scenario,'clay-near',swords(12),2);advanceGame(g,2280);
  const ship=collectShipment(g,scenario,'clay-near',1);advanceGame(g,960);
  unloadAtHome(g,'shipment',ship.id,true);
  const s=economySnapshot(g,g.cities[0].id);
  assert.equal(s.resources.clay.ledger.discarded,0);assert.equal(s.fieldDiscarded.clay,190*SCALE);
  decodeSave(encodeSave(g),scenario);
});

// ---------- M1: MAX_TIME edges ----------
test('M1 elapsed time clamps to the trial horizon at any speed',()=>{
  const g=fresh();advanceGame(g,MAX_TIME-5);g.clock.speed=8;elapse(g,1000);
  assert.equal(g.time,MAX_TIME);assert.equal(g.clock.remainder,0);elapse(g,1000);assert.equal(g.time,MAX_TIME);
});
test('M1 a recall near the horizon stays saveable without teleporting or deleting the detachment',()=>{
  const g=fresh();advanceGame(g,MAX_TIME-2000);
  const a=sendArmy(g,scenario,'clay-near',swords(12),2);advanceGame(g,1900);recallArmy(g,a.id);
  assert.ok(a.arrives>MAX_TIME);
  const saved=decodeSave(encodeSave(g),scenario);
  advanceGame(saved,MAX_TIME-saved.time);
  const end=decodeSave(encodeSave(saved),scenario);
  assert.equal(end.logistics.armies[0].status,'returning');assert.equal(end.logistics.armies[0].troops['sword-i'],12);
});
test('M1 returning arrivals are still bounded by their route',()=>{
  const g=fresh();advanceGame(g,MAX_TIME-2000);
  const a=sendArmy(g,scenario,'clay-near',swords(12),2);advanceGame(g,1900);recallArmy(g,a.id);
  const forged=structuredClone(g);forged.logistics.armies[0].started+=600;forged.logistics.armies[0].arrives+=600;
  assert.throws(()=>decodeSave(encodeSave(forged),scenario));
});

// ---------- M4: marker interpolation uses the configured speed ----------
test('M4 route markers interpolate with the configured seconds per tile, including partial-edge recalls',()=>{
  const fast=structuredClone(scenario);fast.simulation.movement_seconds_per_tile.foot=30;
  const g=createGame(fast),a=sendArmy(g,fast,'clay-near',swords(12),2);
  advanceGame(g,15);const p=armyPosition(a,g.time,g.logistics.secondsPerTile);
  assert.deepEqual(p,[a.path[0][0]+(a.path[1][0]-a.path[0][0])*.5,a.path[0][1]+(a.path[1][1]-a.path[0][1])*.5]);
  advanceGame(g,30);const before=armyPosition(a,g.time,g.logistics.secondsPerTile);recallArmy(g,a.id);
  assert.deepEqual(armyPosition(a,g.time,g.logistics.secondsPerTile),before);
  advanceGame(g,10);const mid=armyPosition(a,g.time,g.logistics.secondsPerTile);
  assert.ok(Math.abs(Math.hypot(mid[0]-before[0],mid[1]-before[1])-10/30)<1e-9);
});

// ---------- M2: unchanged sessions are not rewritten; cached reads are safe ----------
test('M2 an unchanged session is not rewritten, but a changed game is',()=>{
  const mem=new MemoryStorage(),store=new SaveStore(mem,scenario),g=fresh();
  store.save(g);const writes=mem.writes.length;store.save(g);store.save(g);
  assert.equal(mem.writes.length,writes);
  advanceGame(g,1);store.save(g);assert.equal(mem.writes.length,writes+2);
  store.save(g,'manual-0');assert.equal(mem.writes.length,writes+4);
});
test('M2 read results are isolated copies and external byte changes invalidate the cache',()=>{
  const mem=new MemoryStorage(),store=new SaveStore(mem,scenario),g=fresh();
  store.save(g);advanceGame(g,9);store.save(g);
  const first=store.read().data;first.session.state.time=999;first.manual[0]={hacked:true};
  const second=store.read().data;assert.equal(second.session.state.time,9);assert.equal(second.manual[0],null);
  mem.data.set(PRIMARY,'changed outside');
  const recovered=store.read();assert.equal(recovered.recovered,true);assert.equal(recovered.data.session.state.time,0);
  mem.data.set(PRIMARY,'changed again');mem.data.set(BACKUP,'and backup');assert.throws(()=>store.read());
  // A skipped write must notice that storage changed underneath it.
  const m2=new MemoryStorage(),s2=new SaveStore(m2,scenario),h=fresh();s2.save(h);m2.data.set(PRIMARY,'tampered');
  s2.save(h);assert.equal(s2.read().recovered,false);assert.equal(s2.read().data.session.state.time,0);
});
test('M2 an explicit forced save still proves storage is writable and reports failure',()=>{
  const mem=new MemoryStorage(),store=new SaveStore(mem,scenario),g=fresh();store.save(g);
  mem.failKeys.add('*');assert.doesNotThrow(()=>store.save(g));assert.throws(()=>store.save(g,'session',{force:true}),/quota/);
});
