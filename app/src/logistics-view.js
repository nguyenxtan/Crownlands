import {SCALE} from './economy-rules.js';
import {UNIT_TYPES,UNIT_RULES,troopCount,troopUpkeep} from './units.js';
import {marchOffer,shipmentOffer,availableWagons,fieldIncome,safeReturnAt} from './logistics.js';
import {IMAGES,NAMES,resourceIcon} from './visuals.js';
import {gameDuration,armyView,foodAmount,unitEmblem} from './field-presentation.js';
const time=gameDuration;
const amount=n=>(n/SCALE).toLocaleString('vi-VN',{maximumFractionDigits:1});
const text=(root,sel,v)=>{const e=root.querySelector(sel);if(e.textContent!==String(v))e.textContent=String(v);};
export const defaultMarchDraft=()=>({troops:Object.fromEntries(UNIT_TYPES.map(p=>[p,p==='sword-i'?'12':'0'])),hours:'2',wagons:'1'});
function armyDetailPanel(){return `<section class="army-detail" data-testid="army-detail" hidden>
 <div class="army-detail-heading"><span data-army-emblem></span><div><h3 data-army-title></h3><strong data-army-phase></strong></div></div>
 <p class="army-composition" data-army-composition></p><ol class="expedition-stages" aria-label="Tiến trình đạo quân"><li data-stage="0">1. Tới mỏ</li><li data-stage="1">2. Khai thác</li><li data-stage="2">3. Về thành</li></ol>
 <p class="army-arrival" data-army-arrival></p><div class="stat-row"><span>Lương còn mang theo</span><strong data-army-grain></strong></div>
 <div class="stat-row"><span>Bình quân còn mỗi lính</span><strong data-army-per-soldier></strong></div><p class="note" data-army-upkeep></p>
 <p class="note">Lương nằm trong hành trang chung của đạo quân; số mỗi lính là bình quân.</p>
 <button type="button" class="army-recall" data-army-recall aria-label="Rút đạo quân đang xem">Rút đạo này về thành</button>
 </section>`;}
export function minePanel(s){return `<section class="mine-panel" data-testid="mine-detail" data-mine="${s.id}">
 <p class="eyebrow">KHAI THÁC THẾ GIỚI</p><h2>${s.resource==='grain'?'Ruộng lương hoang':'Mỏ đất sét'}</h2><span class="detail-level">TỌA ĐỘ ${s.position.join(' : ')}</span>
 <div class="mine-hero"><img src="${IMAGES[s.resource]}" alt=""><strong data-testid="mine-owner"></strong></div>
 <div class="stat-row"><span>Sản lượng khai thác</span><strong data-testid="mine-output"></strong></div>
 <div class="stat-row"><span>${NAMES[s.resource]} tại mỏ</span><strong data-testid="mine-stock"></strong></div>
 <div class="stat-row" data-local-food><span>Lương đạo quân mang theo</span><strong data-mine-food></strong></div>
 <p class="note">12 quân khai thác đạt năng suất tối đa 300 / giờ. Tài nguyên ở kho mỏ cho tới khi xe thực sự chở về.</p>
 ${armyDetailPanel()}
 <form id="march-form"><h3>LẬP ĐẠO KHAI THÁC</h3><div class="march-grid">${UNIT_TYPES.map(p=>`<label>${UNIT_RULES[p].name}<input type="number" min="0" max="200" step="1" value="${p==='sword-i'?12:0}" data-march-unit="${p}" aria-label="${UNIT_RULES[p].name} xuất quân" inputmode="numeric"></label>`).join('')}</div>
 <label class="rations-label" for="march-rations">Dự trữ lương mang theo<select id="march-rations"><option value="2">2 giờ</option><option value="4">4 giờ</option><option value="8">8 giờ</option></select></label>
 <div class="stat-row"><span>Thời gian trong thế giới</span><strong data-march-time></strong></div><p class="travel-real" data-march-real></p>
 <div class="stat-row"><span>Lương lấy từ kho thành</span><strong data-march-food></strong></div><div class="stat-row"><span>Mang theo mỗi lính</span><strong data-march-per-soldier></strong></div>
 <p class="note" data-march-food-trip></p>
 <button type="submit" class="primary" id="send-army">Xuất quân tới mỏ</button><p class="note" data-march-reason role="status"></p>
 <p class="note">Đạo quân tự rút khi lương chỉ còn đủ đường về. Quân đi xa vẫn chiếm hạn mức thành gốc.</p></form>
 <form id="collect-form"><h3>CHỞ TÀI NGUYÊN VỀ</h3><label class="wagon-label" for="wagon-count">Số xe đi lấy hàng<input id="wagon-count" type="number" min="1" max="4" step="1" value="1" inputmode="numeric"></label>
 <div class="stat-row"><span>Xe nhàn rỗi</span><strong data-free-wagons></strong></div><div class="stat-row"><span>Tổng sức chở chuyến này</span><strong data-wagon-payload></strong></div>
 <button type="submit" class="primary" id="collect-shipment">Cho xe tới lấy hàng</button><p class="note" data-shipment-reason role="status"></p></form>
 </section>`;}
export function renderMine(root,g,scenario,draft,selectedArmyId=null){
 if(!root)return;const s=g.logistics.sites.find(s=>s.id===root.dataset.mine),mineArmy=g.logistics.armies.find(a=>a.site===s.id&&['outbound','working'].includes(a.status));
 text(root,'[data-testid="mine-owner"]',s.owner==='player'?'Bạn đang giữ mỏ':'Chưa có quân giữ');
 text(root,'[data-testid="mine-output"]',`${fieldIncome(g,s)} / giờ`);text(root,'[data-testid="mine-stock"]',`${amount(s.stock[s.resource])} / ${s.capacity.toLocaleString('vi-VN')}`);
 // The clay mine stores no food: a detachment there eats only the rations it carried.
 const back=mineArmy?safeReturnAt(g,mineArmy):null;root.querySelector('[data-local-food]').hidden=!mineArmy;
 if(mineArmy)text(root,'[data-mine-food]',`${amount(mineArmy.stock.grain)}${back!==null?` · tự rút sau ${time(back-g.time)}`:s.resource==='grain'?' · ruộng nuôi đủ':''}`);
 for(const p of UNIT_TYPES){const input=root.querySelector(`[data-march-unit="${p}"]`);if(document.activeElement!==input)input.value=draft.troops[p];input.max=String(g.cities[0].troops[p]);}
 root.querySelector('#march-rations').value=draft.hours;
 const troops=Object.fromEntries(UNIT_TYPES.map(p=>[p,Number(draft.troops[p])])),offer=marchOffer(g,scenario,s.id,troops,Number(draft.hours));
 root.querySelector('#march-form').hidden=Boolean(mineArmy);
 text(root,'[data-march-time]',offer.path?time(offer.seconds):'—');
 text(root,'[data-march-real]',offer.path?`Khoảng ${time(offer.seconds/g.clock.speed)} thực ở ${g.clock.speed}×${g.clock.paused?' · Đang tạm dừng':''}`:'Chưa có đường đi.');
 text(root,'[data-march-food]',Number.isFinite(offer.rations)?amount(offer.rations):'—');
 const n=offer.count,plannedUpkeep=n?troopUpkeep({troops}):0;
 text(root,'[data-march-per-soldier]',n?`${foodAmount(offer.rations/SCALE/n)} lương / lính`:'—');
 text(root,'[data-march-food-trip]',n?`Ăn ${foodAmount(plannedUpkeep/n)} lương / lính / giờ. Một chiều đi dùng ${foodAmount(plannedUpkeep*offer.seconds/3600)} lương cho cả đạo; đi và về dùng ${foodAmount(plannedUpkeep*offer.seconds/1800)} lương.`:'Chọn quân để xem khẩu phần và chi phí đường đi.');
 const selected=g.logistics.armies.find(a=>a.id===selectedArmyId&&a.site===s.id)||mineArmy||g.logistics.armies.find(a=>a.site===s.id);
 renderArmyDetail(root.querySelector('[data-testid="army-detail"]'),g,selected);
 text(root,'[data-march-reason]',offer.reason||'Mang lương thật; khai thác bắt đầu khi quân tới mỏ.');root.querySelector('#send-army').disabled=!offer.allowed;
 const input=root.querySelector('#wagon-count');if(document.activeElement!==input)input.value=draft.wagons;
 const wagonOffer=shipmentOffer(g,scenario,s.id,Number(draft.wagons));
 text(root,'[data-free-wagons]',`${availableWagons(g)} / ${g.logistics.wagons}`);text(root,'[data-wagon-payload]',`${wagonOffer.payload||0}`);
 text(root,'[data-shipment-reason]',wagonOffer.reason||'Xe đi từ thành, lấy hàng có sẵn lúc tới mỏ, rồi chở về. Không giữ trước lượng hàng chưa khai thác.');root.querySelector('#collect-shipment').disabled=!wagonOffer.allowed;
}
function renderArmyDetail(root,g,a){
 root.hidden=!a;if(!a)return;const v=armyView(a,g.time),safe=safeReturnAt(g,a);
 text(root,'[data-army-title]',`Đạo quân ${a.id} · ${v.count} lính`);text(root,'[data-army-phase]',v.phase);text(root,'[data-army-composition]',v.composition);
 const icon=unitEmblem(v.dominant);if(root.querySelector('[data-army-emblem]').innerHTML!==icon)root.querySelector('[data-army-emblem]').innerHTML=icon;
 for(const li of root.querySelectorAll('[data-stage]')){const i=Number(li.dataset.stage);li.classList.toggle('done',i<v.phaseIndex);if(i===v.phaseIndex)li.setAttribute('aria-current','step');else li.removeAttribute('aria-current');}
 text(root,'[data-army-arrival]',v.secondsLeft!==null?`Còn ${time(v.secondsLeft)} trong thế giới · khoảng ${time(v.secondsLeft/g.clock.speed)} thực ở ${g.clock.speed}×${g.clock.paused?' khi tiếp tục':''}`:safe!==null?`Tự rút về sau ${time(safe-g.time)}; vẫn để dành lương đường về.`:a.status==='working'?'Nguồn lương tại ruộng đang đáp ứng đủ khẩu phần.':'Quân đã về thành; dỡ lương còn lại để hợp quân.');
 text(root,'[data-army-grain]',`${foodAmount(v.grain)} lương`);text(root,'[data-army-per-soldier]',`${foodAmount(v.grainPerSoldier)} lương / lính`);
 text(root,'[data-army-upkeep]',`Ăn ${foodAmount(v.upkeepPerSoldier)} lương / lính / giờ · cả đạo ${foodAmount(v.upkeep)} lương / giờ.`);
 const b=root.querySelector('[data-army-recall]');b.dataset.armyRecall=a.id;b.hidden=!['outbound','working'].includes(a.status);
}
export class FieldOperations{
 constructor(root){this.root=root;this.rows=new Map();root.innerHTML='<h3>QUÂN & VẬN TẢI</h3><p data-field-summary tabindex="-1"></p><div data-field-list></div>';this.list=root.querySelector('[data-field-list]');}
 render(g,sites){
  text(this.root,'[data-field-summary]',`${g.logistics.armies.length} đạo quân · ${availableWagons(g)}/${g.logistics.wagons} xe nhàn rỗi`);
  const all=[...g.logistics.armies.map(item=>({kind:'army',item})),...g.logistics.shipments.map(item=>({kind:'shipment',item}))],ids=new Set(all.map(({kind,item})=>`${kind}:${item.id}`));
  for(const [key,row] of this.rows)if(!ids.has(key)){row.remove();this.rows.delete(key);}
  for(const {kind,item} of all){
   const key=`${kind}:${item.id}`;let row=this.rows.get(key);
   if(!row){row=document.createElement('article');row.className='field-card';row.dataset.fieldKind=kind;row.dataset.fieldId=item.id;
    row.innerHTML='<button type="button" class="field-title" data-focus-mine></button><p class="field-composition" data-field-composition></p><p data-field-state></p><p data-field-load></p><div class="field-actions"><button type="button" data-field-return>Rút về thành</button><button type="button" data-field-unload>Dỡ hàng</button><button type="button" data-field-discard>Hủy phần còn lại</button></div>';this.rows.set(key,row);this.list.append(row);}
   const name=sites.find(s=>s.id===item.site)?.name||item.site,isArmy=kind==='army',blocked=isArmy?item.status==='home':item.status==='blocked';
   const title=row.querySelector('[data-focus-mine]');title.dataset.focusMine=item.site;if(isArmy)title.dataset.armyId=item.id;title.textContent=`${isArmy?'⚑ Đạo quân':'▰ Chuyến xe'} ${item.id} · ${name}`;
   if(isArmy)text(row,'[data-field-composition]',armyView(item,g.time).composition);else text(row,'[data-field-composition]',`${item.wagons} xe vận tải · Tải tối đa ${item.wagons*g.logistics.wagonPayload}`);
   const state=isArmy?{outbound:'Đang tới mỏ',working:'Đang giữ và khai thác',returning:'Đang về thành',home:'Đã về · Kho lương đầy'}:{'to-site':'Đang tới lấy hàng','to-home':'Đang chở hàng về',blocked:'Kho đầy · Hàng còn trên xe'};
   text(row,'[data-field-state]',`${state[item.status]}${['outbound','returning','to-site','to-home'].includes(item.status)?` · Còn ${time(item.arrives-g.time)}`:''}`);
   text(row,'[data-field-load]',isArmy?`${troopCount(item)} quân · Mang ${amount(item.stock.grain)} lương · Bình quân ${foodAmount(armyView(item,g.time).grainPerSoldier)} lương / lính`:`${item.wagons} xe · ${amount(item.stock[sites.find(s=>s.id===item.site)?.kind]||0)} ${NAMES[sites.find(s=>s.id===item.site)?.kind]||'hàng'}`);
   for(const action of ['return','unload','discard']){const b=row.querySelector(`[data-field-${action}]`);b.dataset.id=item.id;b.dataset.kind=kind;b.hidden=action==='return'?!isArmy||!['outbound','working'].includes(item.status):!blocked;
    b.setAttribute('aria-label',action==='return'?`Rút đạo quân ${item.id} về thành`:action==='unload'?`Dỡ ${isArmy?'lương đạo quân':'hàng xe'} ${item.id}`:`Hủy ${isArmy?'lương dư đạo quân':'hàng còn trên xe'} ${item.id}`);}
  }
 }
}
