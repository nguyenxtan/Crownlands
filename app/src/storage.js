import {createGame,RESOURCES,SCALE,RULESET,MAX_TIME,FIELD_COST} from './game.js';
import {validateCurrentState} from './state-validation.js';
import {validateV2State} from './state-validation-v2.js';
import {createLogistics} from './logistics.js';
const PRIMARY='crownlands.foundation.primary', BACKUP='crownlands.foundation.backup';
const MAX_BYTES=2_000_000;
const bad=()=>{throw new Error('Bản lưu không hợp lệ hoặc không tương thích với bản thử.');};
const integer=(n,min=0,max=Number.MAX_SAFE_INTEGER)=>Number.isSafeInteger(n)&&n>=min&&n<=max;
const keys=(obj,names)=>obj&&typeof obj==='object'&&!Array.isArray(obj)&&Object.keys(obj).length===names.length&&names.every(k=>Object.hasOwn(obj,k));

function validateLegacyState(g,scenario) {
  if(!g||typeof g!=='object'||Array.isArray(g)||!integer(g.schema))bad();
  if(g.schema!==1)throw new Error('Bản lưu dùng phiên bản luật chưa được hỗ trợ.');
  if(typeof g.ruleset!=='string'||!g.ruleset)bad();
  if(g.ruleset!=='foundation-0.1')throw new Error('Bản lưu dùng phiên bản luật chưa được hỗ trợ.');
  const template=createGame(scenario);
  if(g.scenario!==scenario.id||!integer(g.time,0,MAX_TIME)||!integer(g.sequence,0,16))bad();
  if(!keys(g.clock,['paused','speed','remainder'])||typeof g.clock.paused!=='boolean'||![1,2,4,8].includes(g.clock.speed)||!integer(g.clock.remainder,0,999))bad();
  if(!Array.isArray(g.cities)||g.cities.length!==3||!Array.isArray(g.jobs)||g.jobs.length>16||!Array.isArray(g.events)||g.events.length>40)bad();
  g.cities.forEach((c,i)=>{
    const t=template.cities[i];
    if(c.id!==t.id||c.owner!==t.owner||c.upkeep!==t.upkeep||JSON.stringify(c.buildings)!==JSON.stringify(t.buildings)||JSON.stringify(c.cap)!==JSON.stringify(t.cap))bad();
    if(!Array.isArray(c.plots)||c.plots.length!==16)bad();
    c.plots.forEach((p,j)=>{if(p.id!==t.plots[j].id||p.resource!==t.plots[j].resource||![1,2].includes(p.level)||c.owner!=='player'&&p.level!==t.plots[j].level)bad();});
    if(!keys(c.stock,RESOURCES)||!keys(c.ledger,RESOURCES))bad();
    for(const r of RESOURCES){
      if(!integer(c.stock[r],0,c.cap[r]*SCALE)||!keys(c.ledger[r],['produced','upkeep','overflow','unmet','spent'])||Object.values(c.ledger[r]).some(n=>!integer(n,0,4e15)))bad();
      const l=c.ledger[r],maxExpense=r==='grain'?g.time*c.upkeep*1000:0;
      if(l.produced>g.time*500000||l.upkeep+l.unmet>maxExpense||l.overflow>l.produced||l.spent!==(c.owner==='player'?g.sequence*FIELD_COST[r]*SCALE:0))bad();
    }
  });
  const ids=new Set(),plots=new Set();
  for(const j of g.jobs){
    const p=g.cities[0].plots.find(p=>p.id===j.plot);
    if(!keys(j,['id','city','plot','started','ends'])||!integer(j.id,1,g.sequence)||ids.has(j.id)||plots.has(j.plot)||j.city!==g.cities[0].id||!p||p.level!==1||!integer(j.started,0,g.time)||j.ends!==j.started+120||j.ends<=g.time||j.ends>MAX_TIME)bad();
    ids.add(j.id);plots.add(j.plot);
  }
  const completed=g.cities[0].plots.filter(p=>p.level===2).length;
  if(g.sequence!==completed+g.jobs.length)bad();
  let last=-1;
  for(const e of g.events){
    if(!keys(e,['time','kind','city','plot'])||!integer(e.time,last,g.time)||e.kind!=='plot-complete'||e.city!==g.cities[0].id||!g.cities[0].plots.some(p=>p.id===e.plot&&p.level===2))bad();
    last=e.time;
  }
  return g;
}

function validateState(g,scenario){
  if(!g||typeof g!=='object'||Array.isArray(g)||!integer(g.schema))bad();
  if(![1,2,3].includes(g.schema))throw new Error('Bản lưu dùng phiên bản luật chưa được hỗ trợ.');
  if(typeof g.ruleset!=='string'||!g.ruleset)bad();
  if(g.schema===1){
    validateLegacyState(g,scenario);
    const next=structuredClone(g),template=createGame(scenario);
    next.schema=2;next.ruleset='foundation-0.2';next.training=[];next.trainingSequence=0;
    next.cities.forEach((c,i)=>{c.troops={...template.cities[i].troops};c.capacity=template.cities[i].capacity;});
    g=next;
  }
  if(g.schema===2){
    validateV2State(g,scenario);
    const next=structuredClone(g);next.schema=3;next.ruleset=RULESET;next.logistics=createLogistics(scenario);
    for(const c of next.cities)for(const r of RESOURCES)Object.assign(c.ledger[r],{sent:0,received:0,discarded:0});
    return validateCurrentState(next,scenario);
  }
  return validateCurrentState(g,scenario);
}

export function encodeSave(game) { return JSON.stringify(game,null,2); }
export function decodeSave(text,scenario) {
  if(typeof text!=='string'||text.length>MAX_BYTES)bad();
  return validateState(JSON.parse(text),scenario);
}

const empty=()=>({version:1,session:null,manual:[null,null,null],quick:null,autos:[]});
const INCIDENT='crownlands.foundation.incident';
const ARCHIVE_FAILED='Không giữ được bản sao dữ liệu gốc chưa đọc được nên chưa ghi đè gì. Hãy xuất dữ liệu gốc trước, rồi thử lại.';
export class SaveStore {
  constructor(storage,scenario) { this.storage=storage;this.scenario=scenario;this.cache=null;this.last=null; }
  parse(text) {
    if(text.length>20*MAX_BYTES)bad();
    const d=JSON.parse(text);
    if(d&&integer(d.version,2))throw new Error('Kho lưu dùng phiên bản mới hơn; hãy giữ lại dữ liệu để khôi phục.');
    if(!d||d.version!==1)bad();
    if(!keys(d,['version','session','manual','quick','autos'])||!Array.isArray(d.manual)||d.manual.length!==3||!Array.isArray(d.autos)||d.autos.length>5)bad();
    for(const r of [d.session,d.quick,...d.manual,...d.autos])if(r!==null){
      if(!keys(r,['savedAt','state'])||!integer(r.savedAt))bad();r.state=validateState(r.state,this.scenario);
    }
    return d;
  }
  readFresh(primary,backup) {
    if(primary===null&&backup===null)return {data:empty(),recovered:false};
    if(primary!==null){
      try{return {data:this.parse(primary),recovered:false};}
      catch(e){if(/phiên bản/.test(e.message))throw e;}
    }
    if(backup!==null){try{return {data:this.parse(backup),recovered:true};}catch{ /* retain both originals */ }}
    throw new Error('Không thể khôi phục bản lưu. Hãy nhập bản dự phòng hoặc chủ động chọn chơi mới.');
  }
  // Validation result keyed by the exact stored bytes; callers only ever receive copies.
  readShared() {
    const primary=this.storage.getItem(PRIMARY),backup=this.storage.getItem(BACKUP),cache=this.cache;
    if(cache&&cache.primary===primary&&cache.backup===backup){if(cache.error)throw cache.error;return cache.result;}
    try{const result=this.readFresh(primary,backup);this.cache={primary,backup,result};return result;}
    catch(error){this.cache={primary,backup,error};throw error;}
  }
  read() { return structuredClone(this.readShared()); }
  incidentList(raw=this.storage.getItem(INCIDENT)) {
    if(raw===null)return [];
    try{
      const d=JSON.parse(raw),rawPair=item=>item&&typeof item==='object'&&!Array.isArray(item)&&['primary','backup'].every(key=>Object.hasOwn(item,key)&&(item[key]===null||typeof item[key]==='string'));
      if(d&&d.version===1&&Array.isArray(d.incidents)&&d.incidents.every(rawPair))return d.incidents;
    }catch{ /* keep the unreadable archive itself below */ }
    return [{archivedAt:null,reason:'unreadable-incident-archive',primary:raw,backup:null}];
  }
  incidents() { return structuredClone(this.incidentList()); }
  // Keeps the exact unreadable bytes before anything may overwrite them. Never replaces earlier incidents.
  archive(reason) {
    const primary=this.storage.getItem(PRIMARY),backup=this.storage.getItem(BACKUP);
    if(primary===null&&backup===null)return;
    const list=this.incidentList();
    if(list.some(i=>i.primary===primary&&i.backup===backup))return;
    list.push({archivedAt:Date.now(),reason,primary,backup});
    try{this.storage.setItem(INCIDENT,JSON.stringify({version:1,incidents:list}));}catch{throw Object.assign(new Error(ARCHIVE_FAILED),{code:'ARCHIVE_WRITE_FAILED'});}
  }
  rawExport() {
    const primary=this.storage.getItem(PRIMARY),backup=this.storage.getItem(BACKUP),incident=this.storage.getItem(INCIDENT);
    return JSON.stringify({app:'crownlands',exportedAt:Date.now(),primary,backup,incident,incidents:this.incidentList(incident)},null,2);
  }
  // force: an explicit action (for example before an update reload) must prove storage is still writable.
  save(game,slot='session',{force=false}={}) {
    const text=slot==='session'&&!force?JSON.stringify(game):null;
    // A periodic checkpoint of an unchanged game (for example while paused) writes nothing.
    if(text!==null&&this.last&&this.last.text===text&&this.storage.getItem(PRIMARY)===this.last.primary&&this.storage.getItem(BACKUP)===this.last.backup)return structuredClone(this.last.record);
    game=validateState(game,this.scenario);
    const {data:shared,recovered}=this.readShared();
    if(recovered)this.archive('backup-recovery');
    const before=!recovered?this.storage.getItem(PRIMARY)??JSON.stringify(shared):JSON.stringify(shared);
    const record={savedAt:Date.now(),state:structuredClone(game)},data={...shared,manual:[...shared.manual],autos:[...shared.autos]};
    if(slot==='quick')data.quick=record;
    else if(slot==='auto')data.autos=[record,...data.autos].slice(0,5);
    else if(/^manual-[0-2]$/.test(slot))data.manual[Number(slot.at(-1))]=record;
    else if(slot!=='session')throw new Error('Ô lưu không tồn tại.');
    data.session=record;
    const primary=JSON.stringify(data);
    this.storage.setItem(BACKUP,before);
    this.storage.setItem(PRIMARY,primary);
    this.cache={primary,backup:before,result:{data,recovered:false}};
    this.last={text:JSON.stringify(game),primary,backup:before,record};
    return structuredClone(record);
  }
  // Valid individual records from an otherwise unreadable version-1 store.
  salvage(text) {
    const found={manual:[null,null,null],quick:null,autos:[]};
    if(text===null)return found;
    try{
      const d=JSON.parse(text);if(!d||d.version!==1)return found;
      const valid=r=>{try{if(!keys(r,['savedAt','state'])||!integer(r.savedAt))return null;return {savedAt:r.savedAt,state:validateState(r.state,this.scenario)};}catch{return null;}};
      if(Array.isArray(d.manual))found.manual=[0,1,2].map(i=>valid(d.manual[i]));
      found.quick=valid(d.quick);if(Array.isArray(d.autos))found.autos=d.autos.slice(0,5).map(valid).filter(Boolean);
    }catch{ /* nothing salvageable */ }
    return found;
  }
  // Explicit recovery keeps browser copies first, or requires a matching export confirmed by the
  // player before replacing them. Healthy manual, quick and auto records are retained.
  resetSession(game,{exported=null}={}) {
    const state=structuredClone(validateState(game,this.scenario));
    // Only confirmed exports permit replacing browser copies; stale consent must not erase new bytes.
    if(exported!==null){
      const raw={primary:this.storage.getItem(PRIMARY),backup:this.storage.getItem(BACKUP),incident:this.storage.getItem(INCIDENT)};
      if(typeof exported!=='object'||!['primary','backup','incident'].every(key=>Object.hasOwn(exported,key)&&exported[key]===raw[key]))throw Object.assign(new Error('Dữ liệu gốc đã thay đổi. Hãy xuất lại trước khi tiếp tục.'),{code:'RECOVERY_EXPORT_STALE'});
    }
    let data;
    try{const r=this.readShared();if(r.recovered&&exported===null)this.archive('backup-recovery');data=structuredClone(r.data);}
    catch{
      if(exported===null)this.archive('recovery-reset');
      const a=this.salvage(this.storage.getItem(PRIMARY)),b=this.salvage(this.storage.getItem(BACKUP));
      data={...empty(),manual:a.manual.map((r,i)=>r||b.manual[i]),quick:a.quick||b.quick,autos:a.autos.length?a.autos:b.autos};
    }
    data.session={savedAt:Date.now(),state};
    if(exported!==null){this.storage.removeItem(INCIDENT);this.storage.removeItem(BACKUP);}
    try{this.storage.setItem(PRIMARY,JSON.stringify(data));}
    catch(error){throw Object.assign(new Error('Chưa ghi được bản lưu mới. Hãy xuất dữ liệu gốc trước khi tiếp tục.'),{code:'RECOVERY_WRITE_FAILED',cause:error});}
    this.cache=null;this.last=null;
  }
}
