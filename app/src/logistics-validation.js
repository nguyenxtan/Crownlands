import {SCALE,RESOURCES,LEDGER_KEYS,MAX_TIME,emptyLedger} from './economy-rules.js';
import {UNIT_TYPES,UNIT_RULES,troopUpkeep} from './units.js';
import {createLogistics} from './logistics.js';
import {findPath,walkable} from './world-path.js';
const bad=()=>{throw new Error('Bản lưu hành quân hoặc vận tải không hợp lệ.');};
const int=(n,min=0,max=4e15)=>Number.isSafeInteger(n)&&n>=min&&n<=max;
const keys=(o,n)=>o&&typeof o==='object'&&!Array.isArray(o)&&Object.keys(o).length===n.length&&n.every(k=>Object.hasOwn(o,k));
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
export const ownedTroops=(g,home,p)=>g.cities.find(c=>c.id===home).troops[p]+g.logistics.armies.filter(a=>a.home===home).reduce((n,a)=>n+a.troops[p],0);
export const homeFieldUpkeep=(g,id)=>g.logistics?.armies?.filter(a=>a.home===id&&a.status==='home').reduce((n,a)=>n+troopUpkeep(a),0)||0;
function inventory(i,initial,limit){
 if(!keys(i.stock,RESOURCES)||!keys(i.ledger,RESOURCES))bad();
 for(const r of RESOURCES){
  const l=i.ledger[r];if(!int(i.stock[r],0,limit)||!keys(l,LEDGER_KEYS)||Object.values(l).some(v=>!int(v)))bad();
  if(i.stock[r]!==initial[r]+l.produced+l.received-l.sent-l.spent-l.upkeep-l.overflow-l.discarded)bad();
 }
}
export function validateLogistics(g,scenario){
 const l=g.logistics,t=createLogistics(scenario),h=g.cities[0],initialHome=scenario.settlements[0];
 if(!keys(l,Object.keys(t))||!int(l.armySequence,0,100000)||!int(l.shipmentSequence,0,100000)||!int(l.deliveredShipments,0,l.shipmentSequence))bad();
 for(const k of ['wagons','wagonPayload','secondsPerTile'])if(l[k]!==t[k])bad();
 if(!Array.isArray(l.armies)||l.armies.length>h.capacity||!Array.isArray(l.shipments)||l.shipments.length>l.wagons||!Array.isArray(l.sites)||l.sites.length!==t.sites.length||!keys(l.retired,RESOURCES))bad();
 const totals=emptyLedger(),zero=Object.fromEntries(RESOURCES.map(r=>[r,0]));
 const addLedger=ledger=>{for(const r of RESOURCES)for(const k of LEDGER_KEYS){if(!keys(ledger[r],LEDGER_KEYS)||!int(ledger[r][k]))bad();totals[r][k]+=ledger[r][k];}};
 addLedger(l.retired);
 for(const r of RESOURCES){const v=l.retired[r];if(v.produced||v.spent||v.overflow||v.unmet||v.received!==v.sent+v.upkeep+v.discarded)bad();}
 const assigned=new Set(),armyIds=new Set();
 for(const a of l.armies){
  if(!keys(a,['id','home','site','troops','status','path','firstStepSeconds','started','arrives','stock','ledger'])||!int(a.id,1,l.armySequence)||armyIds.has(a.id)||a.home!==h.id||!keys(a.troops,UNIT_TYPES)||!['outbound','working','returning','home'].includes(a.status))bad();armyIds.add(a.id);
  if(UNIT_TYPES.some(p=>!int(a.troops[p],0,h.capacity))||UNIT_TYPES.reduce((n,p)=>n+a.troops[p],0)<1)bad();
  const s=t.sites.find(s=>s.id===a.site);if(!s)bad();
  const original=findPath(scenario,initialHome.position,s.position);
  if(!Array.isArray(a.path)||a.path.length<1||a.path.length>original.length||!int(a.firstStepSeconds,1,l.secondsPerTile)||!int(a.started,0,g.time)||!int(a.arrives,0,MAX_TIME+(a.status==='returning'?(original.length-1)*l.secondsPerTile:0)))bad();
  const out=['outbound','working'].includes(a.status),expected=out?original:original.slice(0,a.path.length).reverse();
  if(!same(a.path,expected)||out&&a.firstStepSeconds!==l.secondsPerTile)bad();
  if(a.arrives!==a.started+(a.path.length>1?a.firstStepSeconds+(a.path.length-2)*l.secondsPerTile:0))bad();
  if(['outbound','returning'].includes(a.status)&&a.arrives<=g.time||['working','home'].includes(a.status)&&a.arrives>g.time)bad();
  const n=UNIT_TYPES.reduce((n,p)=>n+a.troops[p],0);inventory(a,zero,n*20*SCALE);
  for(const r of RESOURCES){const v=a.ledger[r];if(v.produced||v.spent||v.overflow||v.unmet||r!=='grain'&&(a.stock[r]||Object.values(v).some(Boolean)))bad();}
  const required=['outbound','returning'].includes(a.status)?(a.arrives-g.time+(out?(original.length-1)*l.secondsPerTile:0))*troopUpkeep(a)*1000:0;
  if(a.stock.grain<required)bad();
  if(out){if(assigned.has(a.site))bad();assigned.add(a.site);}
  addLedger(a.ledger);
 }
 for(let i=0;i<l.sites.length;i++){
  const s=l.sites[i],b=t.sites[i];if(!keys(s,Object.keys(b)))bad();
  for(const k of ['id','position','resource','capacity','maxOutput','saturation'])if(!same(s[k],b[k]))bad();
  const a=l.armies.find(a=>a.site===s.id&&a.status==='working');if(s.owner!==(a?'player':'world-custody'))bad();
  inventory(s,b.stock,s.capacity*SCALE);
  for(const r of RESOURCES){const v=s.ledger[r];if(v.produced>g.time*s.maxOutput*1000||r!==s.resource&&v.produced||v.spent||v.discarded||v.unmet)bad();}
  if(a){
   const reserve=(a.path.length-1)*l.secondsPerTile*troopUpkeep(a)*1000;
   const net=troopUpkeep(a)*1000-(s.resource==='grain'?Math.min(UNIT_TYPES.reduce((n,p)=>n+a.troops[p],0),s.saturation)*s.maxOutput/s.saturation*1000:0);
   if(a.stock.grain+s.stock.grain<reserve||net>0&&a.stock.grain+s.stock.grain-reserve<net)bad();
  }
  addLedger(s.ledger);
 }
 const shipmentIds=new Set();let busy=0;
 for(const s of l.shipments){
  if(!keys(s,['id','home','site','wagons','status','path','firstStepSeconds','started','arrives','stock','ledger','delivered'])||!int(s.id,1,l.shipmentSequence)||shipmentIds.has(s.id)||s.home!==h.id||!int(s.wagons,1,l.wagons)||!['to-site','to-home','blocked'].includes(s.status))bad();shipmentIds.add(s.id);busy+=s.wagons;
  const mine=t.sites.find(t=>t.id===s.site);if(!mine)bad();const path=findPath(scenario,initialHome.position,mine.position);if(s.status!=='to-site')path.reverse();
  if(!same(s.path,path)||s.firstStepSeconds!==l.secondsPerTile||!int(s.started,0,g.time)||s.arrives!==s.started+(path.length-1)*l.secondsPerTile||!int(s.arrives,0,MAX_TIME)||s.status==='blocked'&&s.arrives>g.time||s.status!=='blocked'&&s.arrives<=g.time)bad();
  inventory(s,zero,s.wagons*l.wagonPayload*SCALE);
  if(!int(s.delivered,0,s.wagons*l.wagonPayload*SCALE)||s.delivered!==RESOURCES.reduce((n,r)=>n+s.ledger[r].sent,0))bad();
  if(RESOURCES.reduce((n,r)=>n+s.stock[r],0)>s.wagons*l.wagonPayload*SCALE)bad();
  for(const r of RESOURCES){const v=s.ledger[r];if(v.produced||v.upkeep||v.spent||v.overflow||v.unmet||r!==mine.resource&&(s.stock[r]||Object.values(v).some(Boolean))||s.status==='to-site'&&Object.values(v).some(Boolean))bad();}
  addLedger(s.ledger);
 }
 if(busy>l.wagons)bad();
 for(const c of g.cities)addLedger(c.ledger);
 for(const r of RESOURCES){
  const v=totals[r],initial=scenario.settlements.reduce((n,c)=>n+c.stock[r]*SCALE,0)+t.sites.reduce((n,s)=>n+s.stock[r],0);
  const actual=[...g.cities,...l.sites,...l.armies,...l.shipments].reduce((n,i)=>n+i.stock[r],0);
  if(v.sent!==v.received||initial+v.produced-v.upkeep-v.overflow-v.spent-v.discarded!==actual)bad();
 }
}
