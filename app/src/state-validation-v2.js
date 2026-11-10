import {createGame,SCALE,RESOURCES,RULESET,MAX_TIME,FIELD_COST,FIELD_SECONDS,armySummary} from './game.js';
import {UNIT_TYPES,UNIT_RULES,MAX_TRAINING_ORDERS,troopUpkeep} from './units.js';
const bad=()=>{throw new Error('Bản lưu không hợp lệ hoặc không tương thích với bản thử.');};
const int=(n,min=0,max=Number.MAX_SAFE_INTEGER)=>Number.isSafeInteger(n)&&n>=min&&n<=max;
const keys=(o,names)=>o&&typeof o==='object'&&!Array.isArray(o)&&Object.keys(o).length===names.length&&names.every(k=>Object.hasOwn(o,k));

export function validateV2State(g,scenario){
 const template=createGame(scenario);
 if(g.ruleset!=='foundation-0.2')throw new Error('Bản lưu dùng phiên bản luật chưa được hỗ trợ.');
 if(!keys(g,['schema','ruleset','scenario','time','sequence','trainingSequence','training','clock','jobs','events','cities'])||g.schema!==2||g.scenario!==scenario.id||!int(g.time,0,MAX_TIME)||!int(g.sequence,0,16)||!int(g.trainingSequence,0,200))bad();
 if(!keys(g.clock,['paused','speed','remainder'])||typeof g.clock.paused!=='boolean'||![1,2,4,8].includes(g.clock.speed)||!int(g.clock.remainder,0,999))bad();
 if(!Array.isArray(g.cities)||g.cities.length!==template.cities.length||!Array.isArray(g.jobs)||g.jobs.length>16||!Array.isArray(g.training)||g.training.length>MAX_TRAINING_ORDERS||!Array.isArray(g.events)||g.events.length>40)bad();
 for(let i=0;i<g.cities.length;i++){
  const c=g.cities[i],t=template.cities[i];
  if(!c||c.id!==t.id||c.owner!==t.owner||c.capacity!==t.capacity||JSON.stringify(c.buildings)!==JSON.stringify(t.buildings)||JSON.stringify(c.cap)!==JSON.stringify(t.cap)||!keys(c.troops,UNIT_TYPES))bad();
  for(const p of UNIT_TYPES)if(!int(c.troops[p],t.troops[p],c.capacity)||c.owner!=='player'&&c.troops[p]!==t.troops[p])bad();
  if(c.upkeep!==troopUpkeep(c))bad();
  if(!Array.isArray(c.plots)||c.plots.length!==16)bad();
  c.plots.forEach((p,j)=>{if(!p||p.id!==t.plots[j].id||p.resource!==t.plots[j].resource||![1,2].includes(p.level)||c.owner!=='player'&&p.level!==t.plots[j].level)bad();});
 }
 const home=g.cities[0],base=template.cities[0],pending=Object.fromEntries(UNIT_TYPES.map(p=>[p,0]));
 let prior=null,priorId=0;
 for(const j of g.training){
  if(!keys(j,['id','city','profile','count','remaining','started','next'])||!UNIT_TYPES.includes(j.profile)||j.city!==home.id||!int(j.id,priorId+1,g.trainingSequence)||!int(j.count,1,200)||!int(j.remaining,1,j.count)||!int(j.started,0,MAX_TIME))bad();
  const seconds=UNIT_RULES[j.profile].seconds;
  if(j.next!==j.started+(j.count-j.remaining+1)*seconds||!int(j.next,g.time+1,MAX_TIME)||j.started+j.count*seconds>MAX_TIME)bad();
  if(prior){if(j.started!==prior.next+(prior.remaining-1)*UNIT_RULES[prior.profile].seconds||j.remaining!==j.count)bad();}
  else if(j.started>g.time||j.count-j.remaining>home.troops[j.profile]-base.troops[j.profile])bad();
  pending[j.profile]+=j.remaining;prior=j;priorId=j.id;
 }
 const ordered=UNIT_TYPES.reduce((n,p)=>n+home.troops[p]-base.troops[p]+pending[p],0);
 if(g.trainingSequence>ordered||g.trainingSequence<g.training.length||Boolean(g.trainingSequence)!==Boolean(ordered))bad();
 if(g.training.length&&!home.buildings.S05)bad();
 for(let i=0;i<g.cities.length;i++){
  const c=g.cities[i],initial=template.cities[i];if(armySummary(g,c.id).used+armySummary(g,c.id).reserved>c.capacity)bad();
  if(!keys(c.stock,RESOURCES)||!keys(c.ledger,RESOURCES))bad();
  for(const r of RESOURCES){
   if(!int(c.stock[r],0,c.cap[r]*SCALE)||!keys(c.ledger[r],['produced','upkeep','overflow','unmet','spent'])||Object.values(c.ledger[r]).some(n=>!int(n,0,4e15)))bad();
   const l=c.ledger[r],maxExpense=r==='grain'?g.time*c.upkeep*1000:0;
   const paid=c.owner==='player'?(g.sequence*FIELD_COST[r]+UNIT_TYPES.reduce((n,p)=>n+(c.troops[p]-base.troops[p]+pending[p])*UNIT_RULES[p].cost[r],0))*SCALE:0;
   if(l.produced>g.time*500000||l.upkeep+l.unmet>maxExpense||l.overflow>l.produced||l.spent!==paid)bad();
   if(c.stock[r]!==initial.stock[r]+l.produced-l.upkeep-l.overflow-l.spent)bad();
  }
 }
 const ids=new Set(),plots=new Set();
 for(const j of g.jobs){
  const p=home.plots.find(p=>p.id===j?.plot);
  if(!keys(j,['id','city','plot','started','ends'])||!int(j.id,1,g.sequence)||ids.has(j.id)||plots.has(j.plot)||j.city!==home.id||!p||p.level!==1||!int(j.started,0,g.time)||j.ends!==j.started+FIELD_SECONDS||j.ends<=g.time||j.ends>MAX_TIME)bad();
  ids.add(j.id);plots.add(j.plot);
 }
 if(g.sequence!==home.plots.filter(p=>p.level===2).length+g.jobs.length)bad();
 let last=-1;
 for(const e of g.events){
  if(!e||!int(e.time,last,g.time)||e.city!==home.id)bad();last=e.time;
  if(e.kind==='plot-complete'){
   if(!keys(e,['time','kind','city','plot'])||!home.plots.some(p=>p.id===e.plot&&p.level===2))bad();
  }else if(e.kind==='recruit-complete'){
   if(!keys(e,['time','kind','city','profile','count'])||!UNIT_TYPES.includes(e.profile)||e.count!==1||home.troops[e.profile]<=base.troops[e.profile])bad();
  }else bad();
 }
 return g;
}
