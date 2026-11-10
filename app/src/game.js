import {UNIT_TYPES,UNIT_RULES,MAX_TRAINING_ORDERS,troopUpkeep} from './units.js';
import {SCALE,RESOURCES,RULESET,MAX_TIME,FIELD_COST,FIELD_SECONDS,FIELD_RATES,emptyLedger} from './economy-rules.js';
import {createLogistics,fieldBoundary,integrateField,resolveField,refreshCityUpkeep} from './logistics.js';
export {SCALE,RESOURCES,RULESET,MAX_TIME,FIELD_COST,FIELD_SECONDS,FIELD_RATES} from './economy-rules.js';
export {sendArmy,marchOffer,recallArmy,collectShipment,shipmentOffer,availableWagons,unloadAtHome,armyPosition,findPath} from './logistics.js';

export function createGame(scenario) {
  return {
    schema:3, ruleset:RULESET, scenario:scenario.id, time:0, sequence:0,trainingSequence:0,training:[],
    clock:{paused:false, speed:1, remainder:0}, jobs:[], events:[],logistics:createLogistics(scenario),
    cities:scenario.settlements.map(s => ({
      id:s.id, owner:s.owner, buildings:{...s.buildings_by_slot},
      plots:s.resource_plot_levels.map((level,i)=>({id:`R${String(i+1).padStart(2,'0')}`, resource:RESOURCES[i%4], level})),
      stock:Object.fromEntries(RESOURCES.map(r=>[r,s.stock[r]*SCALE])),
      cap:{...s.storage_capacity}, upkeep:s.garrison.reduce((n,t)=>n+t.count,0),
      troops:Object.fromEntries(UNIT_TYPES.map(p=>[p,s.garrison.filter(t=>t.profile===p).reduce((n,t)=>n+t.count,0)])),
      capacity:s.army_capacity_points,
      ledger:emptyLedger()
    }))
  };
}

export function rates(city) {
  const result={wood:0, clay:0, iron:0, grain:-city.upkeep};
  for(const p of city.plots) result[p.resource]+=FIELD_RATES[p.level];
  return result;
}

function integrate(game, seconds) {
  for(const c of game.cities) {
    const net=rates(c);
    for(const r of RESOURCES) {
      const expense=r==='grain'?c.upkeep*1000*seconds:0;
      const produced=(net[r]+(r==='grain'?c.upkeep:0))*1000*seconds;
      const balance=c.stock[r]+produced-expense, limit=c.cap[r]*SCALE;
      const overflow=Math.max(0,balance-limit), unmet=Math.max(0,-balance);
      c.stock[r]=Math.max(0,Math.min(limit,balance));
      const l=c.ledger[r]; l.produced+=produced; l.upkeep+=expense-unmet;
      l.overflow+=overflow; l.unmet+=unmet;
    }
  }
}

// Every rate-changing boundary is processed, even in a single large advance.
export function advanceGame(game, seconds) {
  if(!Number.isSafeInteger(seconds)||seconds<0||game.time+seconds>MAX_TIME) throw new Error('Thời gian không hợp lệ.');
  const target=game.time+seconds;
  while(game.time<target||fieldBoundary(game)===game.time) {
    const next=Math.min(target,...game.jobs.map(j=>j.ends),...game.training.map(j=>j.next),fieldBoundary(game));
    integrateField(game,next-game.time); integrate(game,next-game.time); game.time=next;
    const due=game.jobs.filter(j=>j.ends===next).sort((a,b)=>a.id-b.id);
    for(const job of due) {
      const c=game.cities.find(c=>c.id===job.city),p=c.plots.find(p=>p.id===job.plot);
      p.level=2;
      game.events.push({time:next,kind:'plot-complete',city:c.id,plot:p.id});
    }
    game.jobs=game.jobs.filter(j=>j.ends!==next); game.events=game.events.slice(-40);
    for(const job of game.training.filter(j=>j.next===next).sort((a,b)=>a.id-b.id)){
      const c=game.cities.find(c=>c.id===job.city);
      c.troops[job.profile]++;refreshCityUpkeep(game,c);job.remaining--;
      game.events.push({time:next,kind:'recruit-complete',city:c.id,profile:job.profile,count:1});
      if(job.remaining)job.next+=UNIT_RULES[job.profile].seconds;
    }
    game.training=game.training.filter(j=>j.remaining>0);resolveField(game);game.events=game.events.slice(-40);
  }
  return game;
}

export function elapse(game, milliseconds) {
  if(!Number.isSafeInteger(milliseconds)||milliseconds<0) throw new Error('Khoảng thời gian không hợp lệ.');
  if(game.clock.paused) return game;
  const ms=milliseconds*game.clock.speed+game.clock.remainder,left=MAX_TIME-game.time;
  // The trial ends exactly at MAX_TIME at every speed; leftover sub-second time is dropped there.
  if(Math.floor(ms/1000)>=left){advanceGame(game,left);game.clock.remainder=0;return game;}
  advanceGame(game,Math.floor(ms/1000)); game.clock.remainder=ms%1000;
  return game;
}

export function plotOffer(game, cityId, plotId) {
  const city=game.cities.find(c=>c.id===cityId), plot=city?.plots.find(p=>p.id===plotId);
  const job=game.jobs.find(j=>j.city===cityId&&j.plot===plotId);
  let reason='';
  if(!plot)reason='Không tìm thấy ô tài nguyên.';
  else if(city.owner!=='player')reason='Bạn không có quyền điều hành thành này.';
  else if(job)reason='Ô này đang nâng cấp.';
  else if(plot.level>=2)reason='Đã đạt mốc cấp 2 của bản thử.';
  else if(game.time+FIELD_SECONDS>MAX_TIME)reason='Đã hết thời gian của bản thử.';
  else if(RESOURCES.some(r=>city.stock[r]<FIELD_COST[r]*SCALE))reason='Kho chưa đủ tài nguyên.';
  return {allowed:!reason,reason,cost:FIELD_COST,seconds:FIELD_SECONDS,job,plot};
}

export function upgradePlot(game, cityId, plotId) {
  const offer=plotOffer(game,cityId,plotId);
  if(!offer.allowed)throw new Error(offer.reason);
  const c=game.cities.find(c=>c.id===cityId);
  for(const r of RESOURCES) { c.stock[r]-=FIELD_COST[r]*SCALE; c.ledger[r].spent+=FIELD_COST[r]*SCALE; }
  game.jobs.push({id:++game.sequence,city:cityId,plot:plotId,started:game.time,ends:game.time+FIELD_SECONDS});
  return game.jobs.at(-1);
}

export function armySummary(game,cityId){
  const c=game.cities.find(c=>c.id===cityId);
  if(!c)throw new Error('Không tìm thấy thành.');
  const used=UNIT_TYPES.reduce((n,p)=>n+c.troops[p]*UNIT_RULES[p].capacity,0)+(game.logistics?.armies.filter(a=>a.home===cityId).reduce((n,a)=>n+UNIT_TYPES.reduce((m,p)=>m+a.troops[p]*UNIT_RULES[p].capacity,0),0)||0);
  const reserved=game.training.filter(j=>j.city===cityId).reduce((n,j)=>n+j.remaining*UNIT_RULES[j.profile].capacity,0);
  return {used,reserved,capacity:c.capacity,free:Math.max(0,c.capacity-used-reserved)};
}

export function recruitOffer(game,cityId,profile,count){
  const c=game.cities.find(c=>c.id===cityId),unit=UNIT_RULES[profile];
  const valid=Boolean(unit)&&Number.isSafeInteger(count)&&count>0&&count<=200;
  const cost=Object.fromEntries(RESOURCES.map(r=>[r,valid?unit.cost[r]*count:0]));
  const queue=game.training.filter(j=>j.city===cityId),last=queue.at(-1);
  const starts=last?last.next+(last.remaining-1)*UNIT_RULES[last.profile].seconds:game.time;
  const finishes=valid?starts+unit.seconds*count:game.time;
  let reason='';
  if(!c)reason='Không tìm thấy thành.';
  else if(c.owner!=='player')reason='Bạn không có quyền tuyển quân tại thành này.';
  else if(!unit)reason='Binh chủng chưa được mở.';
  else if(!valid)reason='Số lượng phải là số nguyên từ 1 đến 200.';
  else if(!c.buildings.S05)reason='Thành cần có Doanh trại để tuyển quân.';
  else if(queue.length>=MAX_TRAINING_ORDERS)reason='Hàng đợi đã đủ 5 lệnh huấn luyện.';
  else if(count*unit.capacity>armySummary(game,cityId).free)reason='Không còn đủ hạn mức quân; quân đang tuyển đã giữ chỗ.';
  else if(finishes>MAX_TIME)reason='Đã hết thời gian huấn luyện của bản thử.';
  else if(RESOURCES.some(r=>c.stock[r]<cost[r]*SCALE))reason='Kho thành chưa đủ tài nguyên để huấn luyện.';
  return {allowed:!reason,reason,cost,seconds:valid?unit.seconds*count:0,starts,finishes};
}

export function recruitUnits(game,cityId,profile,count){
  const offer=recruitOffer(game,cityId,profile,count);
  if(!offer.allowed)throw new Error(offer.reason);
  const c=game.cities.find(c=>c.id===cityId);
  for(const r of RESOURCES){c.stock[r]-=offer.cost[r]*SCALE;c.ledger[r].spent+=offer.cost[r]*SCALE;}
  const job={id:++game.trainingSequence,city:cityId,profile,count,remaining:count,started:offer.starts,next:offer.starts+UNIT_RULES[profile].seconds};
  game.training.push(job);return job;
}
