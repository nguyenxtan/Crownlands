import {armySummary,recruitOffer,RESOURCES,SCALE} from './game.js';
import {UNIT_TYPES,UNIT_RULES} from './units.js';
import {resourceIcon,NAMES} from './visuals.js';
const duration=s=>`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

export function barracksPanel(){return `<div class="barracks-panel" data-testid="barracks-detail">
 <header class="barracks-heading"><div><p class="eyebrow">HUẤN LUYỆN & ĐỒN TRÚ</p><h2>Doanh trại</h2><span class="detail-level">CẤP 1 · QUÂN BẬC I</span></div><img src="./assets/city-barracks.png" alt=""></header>
 <div class="army-summary"><div><span>Biên chế (gồm quân đi xa)</span><strong><b data-testid="army-count"></b> / <b data-army-capacity></b></strong></div><div><span>Đang tuyển</span><strong><b data-testid="reserved-count"></b> quân</strong></div><div><span>Lương tại thành</span><strong data-testid="troop-upkeep"></strong></div></div>
 <div class="unit-roster" role="group" aria-label="Chọn binh chủng">${UNIT_TYPES.map(p=>`<button type="button" data-recruit-profile="${p}" aria-label="${UNIT_RULES[p].name}"><span class="unit-symbol" aria-hidden="true">${UNIT_RULES[p].symbol}</span><span>${UNIT_RULES[p].name}<small>BẬC I</small></span><strong data-unit-count="${p}"></strong></button>`).join('')}</div>
 <form id="recruit-form"><h3 id="recruit-unit-name"></h3><p class="note" id="recruit-unit-description"></p>
 <label class="recruit-quantity" for="recruit-count">Số lượng huấn luyện<input id="recruit-count" name="count" type="number" inputmode="numeric" min="1" max="200" step="1" value="1" required></label>
 <p class="costs-label">Chi phí trả ngay</p><div class="costs">${RESOURCES.map(r=>`<div class="cost-item" data-recruit-cost="${r}" title="${NAMES[r]}">${resourceIcon(r)}<small class="cost-label">${NAMES[r]}</small><span></span></div>`).join('')}</div>
 <div class="stat-row"><span>Hoàn tất lệnh (giờ game)</span><strong id="recruit-duration"></strong></div><div class="stat-row"><span>Lương khi tuyển đủ</span><strong id="recruit-extra-upkeep"></strong></div>
 <button id="recruit" type="submit" class="primary">Huấn luyện</button><p class="note" data-testid="recruit-reason" id="recruit-reason" role="status"></p>
 </form>
 <section class="training-section" aria-label="Hàng đợi huấn luyện"><div class="training-heading"><h3>HÀNG ĐỢI <span id="training-orders"></span></h3><span id="training-state"></span></div><ol id="training-queue" data-testid="training-queue"></ol><p class="note">Mỗi quân hoàn tất được đưa vào đồn trú ngay. Chi phí trả lúc đặt tuyển; quân đang tuyển đã chiếm hạn mức.</p></section>
 </div>`;}

export function renderBarracks(root,game,draft){
 if(!root)return;
 const city=game.cities[0],summary=armySummary(game,city.id),unit=UNIT_RULES[draft.profile];
 const input=root.querySelector('#recruit-count');if(document.activeElement!==input)input.value=draft.count;
 const offer=recruitOffer(game,city.id,draft.profile,Number(draft.count));
 const text=(s,v)=>{const el=root.querySelector(s);if(el.textContent!==String(v))el.textContent=String(v);};
 text('[data-testid="army-count"]',summary.used);text('[data-army-capacity]',summary.capacity);text('[data-testid="reserved-count"]',summary.reserved);text('[data-testid="troop-upkeep"]',`${city.upkeep} / giờ`);
 for(const p of UNIT_TYPES){
  const b=root.querySelector(`[data-recruit-profile="${p}"]`),selected=p===draft.profile;
  b.classList.toggle('chosen',selected);b.setAttribute('aria-pressed',String(selected));text(`[data-unit-count="${p}"]`,city.troops[p]);
 }
 text('#recruit-unit-name',`${unit.name} · Bậc I`);text('#recruit-unit-description',`${unit.role}. ${unit.seconds} giây / quân · ${unit.upkeep} lương / giờ.`);
 for(const r of RESOURCES){const el=root.querySelector(`[data-recruit-cost="${r}"]`);el.querySelector('span').textContent=offer.cost[r]||'—';el.classList.toggle('lacking',city.stock[r]<offer.cost[r]*SCALE);}
 text('#recruit-duration',offer.seconds?duration(offer.finishes-game.time):'—');
 text('#recruit-extra-upkeep',offer.seconds?`+${Number(draft.count)*unit.upkeep} / giờ`:'—');
 text('#recruit-reason',offer.reason||'Trả tài nguyên từ kho thành. Thời gian chờ tính theo đồng hồ game.');
 root.querySelector('#recruit-reason').classList.toggle('recruit-error',!offer.allowed);
 root.querySelector('#recruit').disabled=!offer.allowed;
 const queue=game.training.filter(j=>j.city===city.id);
 text('#training-orders',`${queue.length} / 5`);text('#training-state',game.clock.paused?'Tạm dừng':'Tuần tự');
 const html=queue.length?queue.map((j,i)=>{
  const u=UNIT_RULES[j.profile],finish=j.next+(j.remaining-1)*u.seconds,total=j.count*u.seconds,elapsed=Math.max(0,game.time-j.started);
  return `<li><div><strong>${u.name} <span>× ${j.count}</span></strong><small>${i===0?'Đang huấn luyện':'Chờ lượt'} · Đã xong ${j.count-j.remaining}/${j.count}</small></div><time>Còn ${duration(finish-game.time)}</time><div class="progress-track"><i style="width:${Math.min(100,elapsed/total*100)}%"></i></div></li>`;
 }).join(''):'<li class="training-empty">Chưa có lệnh huấn luyện.</li>';
 const list=root.querySelector('#training-queue');if(list.innerHTML!==html)list.innerHTML=html;
}
