import {SCALE} from './economy-rules.js';
import {UNIT_TYPES,UNIT_RULES,troopCount,troopUpkeep} from './units.js';

export function gameDuration(seconds){
 if(!Number.isFinite(seconds))return '—';
 let rest=Math.max(0,Math.ceil(seconds));if(!rest)return '0 giây';
 const parts=[];
 for(const [size,label] of [[86400,'ngày'],[3600,'giờ'],[60,'phút'],[1,'giây']]){const n=Math.floor(rest/size);if(n)parts.push(`${n} ${label}`);rest%=size;}
 return parts.join(' ');
}
export const foodAmount=n=>n.toLocaleString('vi-VN',{maximumFractionDigits:2});
const shortNames={'sword-i':'Kiếm I','spear-i':'Giáo I','archer-i':'Cung I'};
export function armyView(army,time){
 const cohorts=UNIT_TYPES.filter(p=>army.troops[p]>0).map(profile=>({profile,count:army.troops[profile],name:`${UNIT_RULES[profile].name} I`}));
 const count=troopCount(army),grain=army.stock.grain/SCALE,upkeep=troopUpkeep(army),moving=['outbound','returning'].includes(army.status);
 const duration=army.arrives-army.started;
 return {count,cohorts,grain,upkeep,grainPerSoldier:count?grain/count:0,upkeepPerSoldier:count?upkeep/count:0,
  composition:cohorts.map(c=>`${c.count} ${c.name}`).join(' · '),shortComposition:cohorts.map(c=>`${c.count} ${shortNames[c.profile]}`).join(' · '),
  dominant:cohorts.toSorted((a,b)=>b.count-a.count)[0]?.profile||'sword-i',
  phase:{outbound:'Đang tới mỏ',working:'Đang giữ và khai thác',returning:'Đang về thành',home:'Đã về thành · Chờ dỡ lương'}[army.status],
  phaseShort:{outbound:'Đang đi',working:'Khai thác',returning:'Đang về',home:'Chờ dỡ lương'}[army.status],
  phaseIndex:{outbound:0,working:1,returning:2,home:2}[army.status],
  secondsLeft:moving?Math.max(0,army.arrives-time):null,
  progress:moving&&duration>0?Math.max(0,Math.min(1,(time-army.started)/duration)):1};
}
// Simple silhouettes remain legible on small map badges; text always names the troop line too.
export function unitEmblem(profile){
 const shape=profile==='spear-i'?'<path d="M12 2L8 10l4 3 4-3zM12 13v17M8 26h8"/>':profile==='archer-i'?'<path d="M7 3q21 13 0 26L12 16zM4 16h24m-5-4 5 4-5 4"/>':'<path d="M20 2L8 19l4 4L25 7zM5 18l10 9M9 23l-5 6M2 27l4 4"/>';
 return `<svg viewBox="0 0 32 34" aria-hidden="true" class="unit-emblem"><g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${shape}</g></svg>`;
}
