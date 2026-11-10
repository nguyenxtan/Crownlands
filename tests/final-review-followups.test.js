import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createGame,advanceGame} from '../app/src/game.js';
import {SaveStore} from '../app/src/storage.js';
const scenario=JSON.parse(readFileSync(new URL('../project-docs/prototype/scenarios/first-foundation.json',import.meta.url)));
const PRIMARY='crownlands.foundation.primary',BACKUP='crownlands.foundation.backup',INCIDENT='crownlands.foundation.incident';
class MemoryStorage {
  data=new Map();blocked=new Set();
  getItem(key){return this.data.get(key)??null;}
  setItem(key,value){if(this.blocked.has(key))throw new Error('quota');this.data.set(key,String(value));}
  removeItem(key){this.data.delete(key);}
}

test('N1 an explicitly exported matching recovery can proceed when the incident archive cannot be written',()=>{
  const memory=new MemoryStorage(),store=new SaveStore(memory,scenario),future='{"version":2,"progress":"keep this"}',prior='unreadable older incident';
  memory.setItem(PRIMARY,future);memory.setItem(BACKUP,'broken backup');memory.setItem(INCIDENT,prior);memory.blocked.add(INCIDENT);
  assert.throws(()=>store.resetSession(createGame(scenario)),/dữ liệu gốc/);
  const exported=JSON.parse(store.rawExport());assert.equal(exported.incident,prior);
  store.resetSession(createGame(scenario),{exported});store.save(createGame(scenario));
  assert.equal(store.read().data.session.state.time,0);assert.equal(memory.getItem(INCIDENT),null);
  assert.equal(exported.primary,future);assert.equal(exported.backup,'broken backup');assert.equal(exported.incident,prior);
});

test('N1 a changed original or archive invalidates the exported recovery consent without deleting data',()=>{
  for(const key of [PRIMARY,BACKUP,INCIDENT]){
    const memory=new MemoryStorage(),store=new SaveStore(memory,scenario);
    memory.setItem(PRIMARY,'broken primary');memory.setItem(BACKUP,'broken backup');memory.setItem(INCIDENT,'old incident');
    const exported=JSON.parse(store.rawExport());memory.setItem(key,'new bytes');
    const before=new Map(memory.data);
    assert.throws(()=>store.resetSession(createGame(scenario),{exported}),/đã thay đổi/);
    assert.deepEqual(memory.data,before);
  }
});

test('N1 exported recovery preserves readable manual slots from an otherwise unreadable store',()=>{
  const memory=new MemoryStorage(),store=new SaveStore(memory,scenario),saved=createGame(scenario);advanceGame(saved,30);store.save(saved,'manual-1');
  const broken=JSON.parse(memory.getItem(PRIMARY));broken.session={savedAt:1,state:{schema:3,broken:true}};
  memory.setItem(PRIMARY,JSON.stringify(broken));memory.setItem(BACKUP,'broken backup');memory.blocked.add(INCIDENT);
  const exported=JSON.parse(store.rawExport());store.resetSession(createGame(scenario),{exported});
  const restored=store.read().data;assert.equal(restored.manual[1].state.time,30);assert.equal(restored.session.state.time,0);
});

test('F2 a reset primary-write failure keeps originals and offers the matching exported recovery path',()=>{
  const memory=new MemoryStorage(),store=new SaveStore(memory,scenario);
  memory.setItem(PRIMARY,'broken primary');memory.setItem(BACKUP,'broken backup');memory.blocked.add(PRIMARY);
  assert.throws(()=>store.resetSession(createGame(scenario)),error=>error.code==='RECOVERY_WRITE_FAILED');
  assert.equal(memory.getItem(PRIMARY),'broken primary');assert.equal(memory.getItem(BACKUP),'broken backup');
  assert.equal(store.incidents()[0].primary,'broken primary');
  const exported=JSON.parse(store.rawExport());memory.blocked.delete(PRIMARY);store.resetSession(createGame(scenario),{exported});
  assert.equal(store.read().data.session.state.time,0);
});
