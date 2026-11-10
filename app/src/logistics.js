import {SCALE,RESOURCES,LEDGER_KEYS,MAX_TIME,emptyStock,emptyLedger} from './economy-rules.js';
import {UNIT_TYPES,troopCount,troopUpkeep} from './units.js';
import {findPath} from './world-path.js';
export {findPath} from './world-path.js';
const copy=p=>p.map(c=>[...c]);
const home=(g,id)=>g.cities.find(c=>c.id===id);
const site=(g,id)=>g.logistics.sites.find(s=>s.id===id);
const activeAt=(g,id)=>g.logistics.armies.find(a=>a.site===id&&a.status==='working');
const goods=i=>RESOURCES.reduce((n,r)=>n+i.stock[r],0);
const empty=i=>goods(i)===0;
const count=a=>troopCount(a);
export function createLogistics(s){
 return {armySequence:0,shipmentSequence:0,armies:[],shipments:[],wagons:s.economic_trial_values.initial_player_wagons,
  wagonPayload:s.economic_trial_values.wagon_payload,secondsPerTile:s.simulation.movement_seconds_per_tile.foot,deliveredShipments:0,
  retired:emptyLedger(),sites:s.world.resource_sites.map(t=>({id:t.id,position:[...t.position],owner:'world-custody',resource:t.resource,
   capacity:t.storage_capacity,maxOutput:t.max_output_per_hour,saturation:t.saturation_worker_count,stock:{...emptyStock(),[t.resource]:t.initial_stock*SCALE},ledger:emptyLedger()}))};
}
function note(g,kind,e){g.events.push({time:g.time,kind,city:e.home,entity:e.id,site:e.site});g.events=g.events.slice(-40);}
export function refreshCityUpkeep(g,c){c.upkeep=troopUpkeep(c)+(g.logistics?.armies.filter(a=>a.home===c.id&&a.status==='home').reduce((n,a)=>n+troopUpkeep(a),0)||0);}
function transfer(from,to,r,amount){from.stock[r]-=amount;from.ledger[r].sent+=amount;to.stock[r]+=amount;to.ledger[r].received+=amount;}
function retire(g,item){for(const r of RESOURCES)for(const k of LEDGER_KEYS)g.logistics.retired[r][k]+=item.ledger[r][k];}
function clearOwner(g,s){s.owner=activeAt(g,s.id)?'player':'world-custody';}
function returnReserve(g,a){return (a.path.length-1)*g.logistics.secondsPerTile*troopUpkeep(a)*1000;}
// Game second at which a working detachment must start home (safe-return policy); null if site food sustains it.
export function safeReturnAt(g,a){
 if(a.status!=='working')return null;
 const s=site(g,a.site),net=troopUpkeep(a)*1000-(s.resource==='grain'?fieldIncome(g,s)*1000:0);
 return net>0?g.time+Math.max(0,Math.floor((a.stock.grain+s.stock.grain-returnReserve(g,a))/net)):null;
}
export function fieldIncome(g,s){const a=activeAt(g,s.id);return a?Math.min(count(a),s.saturation)*s.maxOutput/s.saturation:0;}
export function armyPosition(a,time,step=60){
 const p=a.path;if(a.status==='working'||a.status==='home')return [...p.at(-1)];
 const elapsed=Math.max(0,time-a.started),first=a.firstStepSeconds;
 if(p.length===1)return [...p[0]];
 let index,t;
 if(elapsed<first){index=0;t=1-first/step+elapsed/step;}
 else {const rest=elapsed-first;index=Math.min(p.length-2,1+Math.floor(rest/step));t=Math.min(1,(rest-(index-1)*step)/step);}
 return [p[index][0]+(p[index+1][0]-p[index][0])*t,p[index][1]+(p[index+1][1]-p[index][1])*t];
}
export function marchOffer(g,scenario,siteId,troops,rationHours=2){
 const c=g.cities[0],s=site(g,siteId),keys=Object.keys(troops||{});
 const valid=keys.length===UNIT_TYPES.length&&UNIT_TYPES.every(p=>keys.includes(p)&&Number.isSafeInteger(troops[p])&&troops[p]>=0&&troops[p]<=c.troops[p]);
 const n=valid?UNIT_TYPES.reduce((sum,p)=>sum+troops[p],0):0;
 const route=s?findPath(scenario,scenario.settlements[0].position,s.position):null;
 const seconds=route?(route.length-1)*g.logistics.secondsPerTile:0;
 const rations=n*rationHours*SCALE;
 let reason='';
 if(!s)reason='Bản này chỉ mở hành quân tới hai mỏ trống gần thành.';
 else if(!valid||!n)reason='Chọn số quân nguyên hợp lệ từ lực lượng đang đồn trú.';
 else if(![2,4,8].includes(rationHours))reason='Chọn dự trữ lương 2, 4 hoặc 8 giờ.';
 else if(!c.buildings.S04)reason='Thành cần có Điểm tập kết.';
 else if(g.logistics.armies.some(a=>a.site===siteId&&['outbound','working'].includes(a.status)))reason='Đã có một đạo quân phụ trách mỏ này.';
 else if(!route)reason='Không có đường bộ hợp lệ tới mục tiêu.';
 else if(seconds*2>=rationHours*3600)reason='Lương phải đủ cả đi và về trước khi khai thác.';
 else if(g.time+seconds*2>MAX_TIME)reason='Chuyến đi vượt thời gian của bản thử.';
 else if(c.stock.grain<rations)reason='Kho thành chưa đủ lương cho chuyến đi.';
 return {allowed:!reason,reason,path:route,seconds,rations,count:n};
}
export function sendArmy(g,scenario,siteId,troops,rationHours=2){
 const o=marchOffer(g,scenario,siteId,troops,rationHours);if(!o.allowed)throw new Error(o.reason);
 const c=g.cities[0],a={id:++g.logistics.armySequence,home:c.id,site:siteId,troops:{...troops},status:'outbound',path:copy(o.path),firstStepSeconds:g.logistics.secondsPerTile,started:g.time,arrives:g.time+o.seconds,stock:emptyStock(),ledger:emptyLedger()};
 for(const p of UNIT_TYPES)c.troops[p]-=troops[p];transfer(c,a,'grain',o.rations);
 g.logistics.armies.push(a);refreshCityUpkeep(g,c);note(g,'army-depart',a);return a;
}
export function recallArmy(g,id){
 const a=g.logistics.armies.find(a=>a.id===id);if(!a||!['outbound','working'].includes(a.status))throw new Error('Đạo quân không còn ở trạng thái có thể rút về.');
 let path,first=g.logistics.secondsPerTile;
 if(a.status==='working')path=copy(a.path).reverse();
 else {
  const elapsed=g.time-a.started,step=g.logistics.secondsPerTile;
  const index=Math.floor(elapsed/step),rem=elapsed%step;
  path=rem?[a.path[index+1],...a.path.slice(0,index+1).reverse()]:a.path.slice(0,index+1).reverse();
  path=copy(path);if(rem)first=rem;
 }
 a.status='returning';a.path=path;a.firstStepSeconds=first;a.started=g.time;a.arrives=g.time+(path.length>1?first+(path.length-2)*g.logistics.secondsPerTile:0);
 clearOwner(g,site(g,a.site));note(g,'army-return',a);
 if(a.arrives===g.time){a.status='home';refreshCityUpkeep(g,home(g,a.home));unloadAtHome(g,'army',a.id);}
 return a;
}
export function availableWagons(g){return g.logistics.wagons-g.logistics.shipments.reduce((n,s)=>n+s.wagons,0);}
export function shipmentOffer(g,scenario,siteId,wagons){
 const s=site(g,siteId),route=s?findPath(scenario,scenario.settlements[0].position,s.position):null;
 let reason='';
 if(!s||s.owner!=='player')reason='Cần có quân đang giữ mỏ để nhận hàng.';
 else if(!Number.isSafeInteger(wagons)||wagons<1||wagons>availableWagons(g))reason='Không đủ xe nhàn rỗi cho chuyến này.';
 else if(!g.cities[0].buildings.S07)reason='Thành cần có Trạm vận tải.';
 else if(!route)reason='Không có đường vận tải hợp lệ.';
 else if(g.time+(route.length-1)*g.logistics.secondsPerTile*2>MAX_TIME)reason='Chuyến xe vượt thời gian của bản thử.';
 return {allowed:!reason,reason,path:route,seconds:route?(route.length-1)*g.logistics.secondsPerTile:0,payload:Number.isSafeInteger(wagons)?wagons*g.logistics.wagonPayload:0};
}
export function collectShipment(g,scenario,siteId,wagons){
 const o=shipmentOffer(g,scenario,siteId,wagons);if(!o.allowed)throw new Error(o.reason);
 const s={id:++g.logistics.shipmentSequence,home:g.cities[0].id,site:siteId,wagons,status:'to-site',path:copy(o.path),firstStepSeconds:g.logistics.secondsPerTile,started:g.time,arrives:g.time+o.seconds,stock:emptyStock(),ledger:emptyLedger(),delivered:0};
 g.logistics.shipments.push(s);note(g,'wagon-depart',s);return s;
}
export function unloadAtHome(g,kind,id,discard=false){
 const list=kind==='army'?g.logistics.armies:kind==='shipment'?g.logistics.shipments:null;
 const item=list?.find(i=>i.id===id);
 if(!item||!(kind==='army'?item.status==='home':item.status==='blocked'))throw new Error('Hàng chưa về tới thành để dỡ.');
 const c=home(g,item.home);let delivered=0;
 for(const r of RESOURCES){const amount=Math.min(item.stock[r],c.cap[r]*SCALE-c.stock[r]);if(amount>0){transfer(item,c,r,amount);delivered+=amount;}}
 if(kind==='shipment'&&delivered){if(!item.delivered){g.logistics.deliveredShipments++;note(g,'wagon-deliver',item);}item.delivered+=delivered;}
 if(discard)for(const r of RESOURCES){item.ledger[r].discarded+=item.stock[r];item.stock[r]=0;}
 if(empty(item)){
  if(kind==='army'){for(const p of UNIT_TYPES)c.troops[p]+=item.troops[p];note(g,'army-home',item);}
  retire(g,item);list.splice(list.indexOf(item),1);refreshCityUpkeep(g,c);
 }
 return delivered;
}
export function fieldBoundary(g){
 let next=Infinity;
 for(const a of g.logistics.armies){
  if(['outbound','returning'].includes(a.status))next=Math.min(next,a.arrives);
  const safe=safeReturnAt(g,a);if(safe!==null)next=Math.min(next,safe);
 }
 for(const s of g.logistics.shipments)if(s.status!=='blocked')next=Math.min(next,s.arrives);
 return next;
}
export function integrateField(g,seconds){
 for(const a of g.logistics.armies.filter(a=>['outbound','returning'].includes(a.status))){const expense=troopUpkeep(a)*1000*seconds;if(expense>a.stock.grain)throw new Error('Không còn đủ lương hành quân.');a.stock.grain-=expense;a.ledger.grain.upkeep+=expense;}
 for(const s of g.logistics.sites){
  const a=activeAt(g,s.id);if(!a)continue;
  for(const r of RESOURCES){
   const produced=r===s.resource?fieldIncome(g,s)*1000*seconds:0;
   const expense=r==='grain'?troopUpkeep(a)*1000*seconds:0;
   const balance=s.stock[r]+produced-expense,overflow=Math.max(0,balance-s.capacity*SCALE),fromBag=Math.max(0,-balance);
   s.stock[r]=Math.max(0,Math.min(s.capacity*SCALE,balance));s.ledger[r].produced+=produced;s.ledger[r].upkeep+=expense-fromBag;s.ledger[r].overflow+=overflow;
   if(fromBag){if(a.stock.grain<fromBag)throw new Error('Cần rút quân trước khi hết lương.');a.stock.grain-=fromBag;a.ledger.grain.upkeep+=fromBag;}
  }
 }
}
export function resolveField(g){
 for(const a of [...g.logistics.armies].sort((a,b)=>a.id-b.id)){
  if(a.status==='outbound'&&a.arrives===g.time){a.status='working';site(g,a.site).owner='player';note(g,'army-arrive',a);}
  else if(a.status==='returning'&&a.arrives===g.time){a.status='home';refreshCityUpkeep(g,home(g,a.home));unloadAtHome(g,'army',a.id);}
  if(a.status==='working'){
   const s=site(g,a.site),net=troopUpkeep(a)*1000-(s.resource==='grain'?fieldIncome(g,s)*1000:0);
   if(net>0&&a.stock.grain+s.stock.grain-returnReserve(g,a)<net)recallArmy(g,a.id);
  }
 }
 for(const sh of [...g.logistics.shipments].sort((a,b)=>a.id-b.id)){
  if(sh.status==='to-site'&&sh.arrives===g.time){
   const s=site(g,sh.site),r=s.resource;
   if(s.owner==='player')transfer(s,sh,r,Math.min(s.stock[r],sh.wagons*g.logistics.wagonPayload*SCALE));
   sh.status='to-home';sh.path=copy(sh.path).reverse();sh.started=g.time;sh.arrives=g.time+(sh.path.length-1)*g.logistics.secondsPerTile;
   note(g,'wagon-load',sh);
  }else if(sh.status==='to-home'&&sh.arrives===g.time){sh.status='blocked';unloadAtHome(g,'shipment',sh.id);}
 }
}
