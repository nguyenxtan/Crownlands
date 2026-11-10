import {RESOURCES,SCALE,MAX_TIME,rates,advanceGame} from './game.js';
import {fieldBoundary} from './logistics.js';
import {UNIT_RULES,troopCount,troopUpkeep} from './units.js';

const cityById=(game,id)=>{
  const city=game.cities.find(city=>city.id===id);
  if(!city)throw new Error('Không tìm thấy thành.');
  return city;
};

const field=(game,cityId)=>({armies:game.logistics?.armies.filter(a=>a.home===cityId)||[],shipments:game.logistics?.shipments.filter(s=>s.home===cityId)||[]});

// Known goods that will reach this city's own warehouse without a new command: wagons already
// carrying cargo home, and the rations a returning army will still hold after eating on the road.
function incomingCargo(game,cityId){
  const {armies,shipments}=field(game,cityId),list=[];
  for(const s of shipments)if(s.status==='to-home')for(const resource of RESOURCES)if(s.stock[resource])list.push({kind:'shipment',id:s.id,resource,amount:s.stock[resource],arrives:s.arrives});
  for(const a of armies)if(a.status==='returning'){
    const amount=a.stock.grain-troopUpkeep(a)*1000*(a.arrives-game.time);
    if(amount>0)list.push({kind:'army',id:a.id,resource:'grain',amount,arrives:a.arrives});
  }
  return list.sort((a,b)=>a.arrives-b.arrives||a.id-b.id);
}

export function economySnapshot(game,cityId){
  const city=cityById(game,cityId),net=rates(city),training=game.training.filter(job=>job.city===cityId),{armies,shipments}=field(game,cityId);
  const held=armies.filter(a=>a.status==='home'),away=armies.filter(a=>a.status!=='home');
  // logistics.retired has no per-city key; in this single-player slice it belongs to the first player city.
  const retired=game.logistics&&game.cities[0].id===cityId?game.logistics.retired:null;
  const fieldDiscarded=Object.fromEntries(RESOURCES.map(resource=>[resource,(retired?.[resource].discarded||0)+[...armies,...shipments].reduce((sum,item)=>sum+item.ledger[resource].discarded,0)]));
  return {cityId,time:game.time,troops:troopCount(city),garrison:troopCount(city),
    heldTroops:held.reduce((sum,a)=>sum+troopCount(a),0),awayTroops:away.reduce((sum,a)=>sum+troopCount(a),0),
    capacity:city.capacity,localUpkeep:city.upkeep,
    upgrades:game.jobs.filter(job=>job.city===cityId).length,trainingOrders:training.length,
    queuedTroops:training.reduce((sum,job)=>sum+job.remaining,0),
    queuedUpkeep:training.reduce((sum,job)=>sum+job.remaining*UNIT_RULES[job.profile].upkeep,0),
    field:{armies:armies.map(a=>({id:a.id,status:a.status,site:a.site,troops:troopCount(a),arrives:['outbound','returning'].includes(a.status)?a.arrives:null,grain:a.stock.grain})),
      shipments:shipments.map(s=>({id:s.id,status:s.status,site:s.site,wagons:s.wagons,arrives:s.status==='blocked'?null:s.arrives,cargo:{...s.stock}}))},
    incoming:incomingCargo(game,cityId),fieldDiscarded,
    resources:Object.fromEntries(RESOURCES.map(resource=>{
      const upkeep=resource==='grain'?city.upkeep:0;
      return [resource,{stock:city.stock[resource],capacity:city.cap[resource]*SCALE,production:net[resource]+upkeep,upkeep,net:net[resource],ledger:{...city.ledger[resource]}}];
    }))};
}

export function forecastEconomy(game,cityId,requestedSeconds=3600){
  if(!Number.isSafeInteger(requestedSeconds)||requestedSeconds<0)throw new Error('Khoảng dự báo không hợp lệ.');
  const current=economySnapshot(game,cityId),seconds=Math.min(requestedSeconds,MAX_TIME-game.time),ends=game.time+seconds;
  const simulation=structuredClone(game),boundaries=new Set([ends]);
  for(const job of game.jobs)if(job.city===cityId)boundaries.add(job.ends);
  for(const job of game.training)if(job.city===cityId){
    for(let count=0;count<job.remaining;count++)boundaries.add(job.next+count*UNIT_RULES[job.profile].seconds);
  }
  const milestones=Object.fromEntries(RESOURCES.map(resource=>[resource,{fullIn:null,emptyIn:null}]));
  function checkMilestones(until){
    const city=cityById(simulation,cityId),net=rates(city),duration=until-simulation.time;
    for(const resource of RESOURCES){
      const milestone=milestones[resource],stock=city.stock[resource],capacity=city.cap[resource]*SCALE,perSecond=net[resource]*(SCALE/3600);
      if(milestone.fullIn===null&&(stock===capacity||perSecond>0)){
        const crossing=stock===capacity?0:Math.ceil((capacity-stock)/perSecond);
        if(crossing<=duration)milestone.fullIn=simulation.time-game.time+crossing;
      }
      if(milestone.emptyIn===null&&perSecond<0){
        const crossing=Math.ceil(stock/-perSecond);
        if(crossing<=duration)milestone.emptyIn=simulation.time-game.time+crossing;
      }
    }
  }
  let projected;
  // Follow the same integer simulation as the live game. Each existing order is
  // already paid; advancing its completion only changes production or upkeep.
  const pending=new Set([...boundaries].filter(time=>time>=game.time&&time<=MAX_TIME));
  while(pending.size||Number.isFinite(fieldBoundary(simulation))){
    const boundary=Math.min(...pending,fieldBoundary(simulation));
    if(boundary>MAX_TIME)break;
    pending.delete(boundary);
    checkMilestones(boundary);advanceGame(simulation,boundary-simulation.time);
    if(boundary===ends)projected=economySnapshot(simulation,cityId);
  }
  // Once all known local jobs finish, rates are constant. Find remaining storage
  // milestones analytically, without integrating years just to show an ETA.
  checkMilestones(MAX_TIME);
  return {requestedSeconds,seconds,ends,upkeepAtEnd:projected.localUpkeep,resources:Object.fromEntries(RESOURCES.map(resource=>{
    const before=current.resources[resource],after=projected.resources[resource];
    return [resource,{stock:after.stock,net:after.net,change:after.stock-before.stock,
      produced:after.ledger.produced-before.ledger.produced,upkeep:after.ledger.upkeep-before.ledger.upkeep,
      overflow:after.ledger.overflow-before.ledger.overflow,unmet:after.ledger.unmet-before.ledger.unmet,
      received:after.ledger.received-before.ledger.received,sent:after.ledger.sent-before.ledger.sent,...milestones[resource]}];
  }))};
}
