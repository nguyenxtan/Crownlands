import {RESOURCES,SCALE} from './game.js';
import {economySnapshot,forecastEconomy} from './economy.js';
import {resourceIcon,NAMES,buildingArt} from './visuals.js';

const number=value=>value.toLocaleString('vi-VN',{maximumFractionDigits:2});
const amount=raw=>number(raw/SCALE);
const signed=value=>`${value>0?'+':value<0?'−':''}${number(Math.abs(value))}`;
const signedAmount=raw=>signed(raw/SCALE);
const setText=(root,selector,value)=>{const element=root.querySelector(selector);if(element.textContent!==String(value))element.textContent=String(value);};
function duration(seconds){
  if(seconds===0)return '0 giây';
  const parts=[];
  for(const [size,label] of [[86400,'ngày'],[3600,'giờ'],[60,'phút'],[1,'giây']]){
    const value=Math.floor(seconds/size);if(value){parts.push(`${value} ${label}`);seconds%=size;}
  }
  return parts.join(' ');
}
const gameDate=time=>`Ngày ${Math.floor(time/86400)+1} · ${[Math.floor(time/3600)%24,Math.floor(time/60)%60,time%60].map(value=>String(value).padStart(2,'0')).join(':')}`;

export function hallPanel(){return `<div class="hall-panel" data-testid="hall-detail">
  <header class="hall-heading"><div><p class="eyebrow">ĐIỀU HÀNH THÀNH</p><h2>Phủ thành</h2><span class="detail-level">CẤP 1 · KINH TẾ</span></div>${buildingArt('town-hall')}</header>
  <h3>KHO & THU NHẬP</h3><table class="hall-resources"><caption class="visually-hidden">Tài nguyên hiện có và thu nhập ròng mỗi giờ game</caption><thead><tr><th scope="col">Tài nguyên</th><th scope="col">Trong kho</th><th scope="col">Ròng / giờ</th></tr></thead><tbody>${RESOURCES.map(resource=>`<tr data-hall-resource="${resource}"><th scope="row"><button type="button" data-open-economy="${resource}" aria-label="Xem sổ ${NAMES[resource]}">${resourceIcon(resource)}<span>${NAMES[resource]}</span></button></th><td><strong data-hall-stock></strong><small data-hall-cap></small></td><td class="hall-net"></td></tr>`).join('')}</tbody></table>
  <p class="note">Ròng = sản xuất trừ lương nuôi quân.</p><div class="hall-army"><strong data-hall-troops></strong><span data-hall-training></span></div>
  <button type="button" data-open-economy="all" class="primary">Xem sổ kinh tế</button><p class="note">Xem thu–chi đã phát sinh, dự báo kho và ảnh hưởng của các lệnh đang chạy.</p>
</div>`;}

// City upkeep already includes detachments held at the gate; troops away eat their own rations.
function troopLine(snapshot){
  return [`${snapshot.garrison} quân đồn trú`,snapshot.heldTroops?`${snapshot.heldTroops} chờ dỡ ở cổng`:'',snapshot.awayTroops?`${snapshot.awayTroops} đi xa`:'',`${snapshot.localUpkeep} lương / giờ tại thành`].filter(Boolean).join(' · ');
}
const statusLabels={outbound:'đang tới mỏ',working:'đang khai thác',returning:'đang về',home:'chờ dỡ lương ở cổng','to-site':'đang tới lấy hàng','to-home':'đang chở hàng về',blocked:'chờ dỡ ở cổng'};

export function renderHall(root,game,cityId){
  if(!root)return;
  const snapshot=economySnapshot(game,cityId);
  for(const resource of RESOURCES){
    const row=root.querySelector(`[data-hall-resource="${resource}"]`),entry=snapshot.resources[resource];
    setText(row,'[data-hall-stock]',Math.floor(entry.stock/SCALE).toLocaleString('vi-VN'));
    setText(row,'[data-hall-cap]',`/ ${amount(entry.capacity)}`);setText(row,'.hall-net',signed(entry.net));
  }
  setText(root,'[data-hall-troops]',troopLine(snapshot));
  setText(root,'[data-hall-training]',snapshot.queuedTroops?`${snapshot.queuedTroops} quân đang tuyển · thêm +${snapshot.queuedUpkeep} lương / giờ khi xong`:'Chưa có quân đang tuyển.');
}

const ledgerLabels={produced:'Đã sản xuất',upkeep:'Nuôi quân đã trả',spent:'Đầu tư đã trả',overflow:'Phần vượt kho',unmet:'Lương chưa đáp ứng',sent:'Đã chuyển ra',received:'Đã nhận về',discarded:'Kho thành đã hủy'};
function resourceCard(resource){return `<article class="economy-card" data-economy-resource="${resource}" aria-label="Kinh tế ${NAMES[resource]}">
  <h3>${resourceIcon(resource)}${NAMES[resource]}</h3><div class="economy-stock"><strong data-value="stock"></strong><small data-value="capacity"></small></div><div class="economy-meter" aria-hidden="true"><i></i></div>
  <dl class="economy-flow"><div><dt>Sản xuất</dt><dd data-value="production"></dd></div><div><dt>Nuôi quân</dt><dd data-value="upkeep"></dd></div><div class="economy-net"><dt>Ròng / giờ</dt><dd data-value="net"></dd></div></dl>
  <section class="economy-projection" aria-label="Dự báo ${NAMES[resource]}"><h4 data-value="forecast-label"></h4><strong data-value="forecast-stock"></strong><dl><div><dt>Thay đổi kho</dt><dd data-value="forecast-change"></dd></div><div><dt>Ròng cuối kỳ</dt><dd data-value="forecast-net"></dd></div><div><dt>Phần vượt kho</dt><dd data-value="forecast-overflow"></dd></div><div><dt>Nhận từ quân/xe</dt><dd data-value="forecast-received"></dd></div></dl><p class="economy-milestone" data-value="full-in"></p><p class="economy-warning" data-value="empty-in" hidden></p></section>
  <details class="economy-ledger"><summary>Sổ từ đầu ván</summary><dl>${Object.entries(ledgerLabels).map(([key,label])=>`<div ${key==='unmet'?'data-unmet-row hidden':''}><dt>${label}</dt><dd data-ledger="${key}"></dd></div>`).join('')}</dl><p>Đầu tư gồm nâng ô và tuyển quân, trả ngay khi đặt lệnh. Lương mang theo khi xuất quân ghi ở “Đã chuyển ra”.</p><p data-field-discarded hidden></p></details>
</article>`;}

export class EconomyBook {
  constructor({getGame,cityId,cityName,onBarracks,onWork,onField}){
    this.getGame=getGame;this.cityId=cityId;this.horizon=3600;
    this.dialog=document.createElement('dialog');this.dialog.id='economy-book';this.dialog.className='economy-book';this.dialog.setAttribute('aria-labelledby','economy-title');
    this.dialog.innerHTML=`<header class="dialog-head"><div><p class="eyebrow" data-economy-city></p><h2 id="economy-title">Sổ kinh tế</h2></div><button type="button" aria-label="Đóng sổ kinh tế" autofocus>×</button></header><p class="economy-clock"><span data-economy-time></span> · Đồng hồ dừng khi mở sổ</p>
      <div class="economy-filters" role="group" aria-label="Lọc tài nguyên"><button type="button" data-resource-filter="all" aria-pressed="true">Tất cả</button>${RESOURCES.map(resource=>`<button type="button" data-resource-filter="${resource}" aria-pressed="false">${NAMES[resource]}</button>`).join('')}</div>
      <div class="economy-horizon"><span>Dự báo sau</span><div role="group" aria-label="Khoảng dự báo">${[[900,'15 phút'],[3600,'1 giờ'],[21600,'6 giờ']].map(([seconds,label])=>`<button type="button" data-horizon="${seconds}" aria-pressed="${seconds===3600}">${label}</button>`).join('')}</div></div>
      <p class="economy-assumption">Sản xuất, nuôi quân và ròng đều tính mỗi giờ game tại kho thành này. Dự báo theo các lệnh đã đặt, hàng đang về và sức chứa kho; hàng chỉ vào kho khi xe hoặc quân thật sự về tới. Giá trị hiển thị làm tròn đến hai số lẻ.</p><p class="economy-limit" hidden></p>
      <div class="economy-grid">${RESOURCES.map(resourceCard).join('')}</div>
      <section class="economy-orders" aria-label="Công việc đã thanh toán"><h3>CÔNG VIỆC ĐÃ TRẢ CHI PHÍ</h3><p data-economy-work></p><p data-economy-upkeep></p><div><button type="button" data-economy-go-work>Xem công việc</button><button type="button" data-economy-barracks>Đến Doanh trại</button></div></section>
      <section class="economy-field" aria-label="Quân và xe ngoài thành"><h3>QUÂN & XE NGOÀI THÀNH</h3><p data-economy-field></p><p data-economy-incoming-note hidden>Hàng đang về chỉ nhập kho khi còn chỗ; phần dư chờ ở cổng.</p><ul data-economy-incoming></ul><div><button type="button" data-economy-go-field>Xem quân & vận tải</button></div></section>
      <p class="economy-scope">Bảng này dùng kho của thành đang xem; hàng trên đường chỉ cộng khi giao nhận. Thuế, bảo trì và nghiên cứu chưa được kích hoạt.</p>`;
    this.dialog.querySelector('[data-economy-city]').textContent=cityName;document.body.append(this.dialog);
    this.dialog.querySelector('[aria-label="Đóng sổ kinh tế"]').addEventListener('click',()=>this.dialog.close());
    this.dialog.addEventListener('close',()=>{if(this.restoreFocus&&this.trigger?.isConnected)this.trigger.focus({preventScroll:true});});
    this.dialog.querySelector('.economy-filters').addEventListener('click',event=>{const button=event.target.closest('[data-resource-filter]');if(button)this.filter(button.dataset.resourceFilter);});
    this.dialog.querySelector('.economy-horizon').addEventListener('click',event=>{
      const button=event.target.closest('[data-horizon]');if(!button)return;this.horizon=Number(button.dataset.horizon);this.refresh();
    });
    for(const [selector,navigate] of [['[data-economy-barracks]',onBarracks],['[data-economy-go-work]',onWork],['[data-economy-go-field]',onField]])this.dialog.querySelector(selector).addEventListener('click',()=>{this.restoreFocus=false;this.dialog.close();navigate();});
  }
  filter(resource){
    this.dialog.querySelectorAll('[data-resource-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.resourceFilter===resource)));
    this.dialog.querySelectorAll('[data-economy-resource]').forEach(card=>card.hidden=resource!=='all'&&card.dataset.economyResource!==resource);
    this.dialog.querySelector('.economy-grid').classList.toggle('single-resource',resource!=='all');
  }
  open(resource='all'){
    this.trigger=document.activeElement;this.restoreFocus=true;this.filter(resource);this.refresh();this.dialog.showModal();this.dialog.scrollTop=0;
  }
  refresh(){
    const game=this.getGame(),snapshot=economySnapshot(game,this.cityId),forecast=forecastEconomy(game,this.cityId,this.horizon),root=this.dialog;
    setText(root,'[data-economy-time]',gameDate(game.time));
    root.querySelectorAll('[data-horizon]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.horizon)===this.horizon)));
    const limit=root.querySelector('.economy-limit');limit.hidden=forecast.seconds===this.horizon;limit.textContent=`Còn ${duration(forecast.seconds)} trong bản thử; dự báo dừng tại ${gameDate(forecast.ends)}.`;
    for(const resource of RESOURCES){
      const card=root.querySelector(`[data-economy-resource="${resource}"]`),entry=snapshot.resources[resource],future=forecast.resources[resource];
      const values={stock:amount(entry.stock),capacity:`/ ${amount(entry.capacity)}`,production:signed(entry.production),upkeep:entry.upkeep?`−${number(entry.upkeep)}`:'0',net:signed(entry.net),
        'forecast-label':`Sau ${duration(forecast.seconds)} game`,'forecast-stock':amount(future.stock),'forecast-change':signedAmount(future.change),
        'forecast-net':`${signed(future.net)} / giờ`,'forecast-overflow':amount(future.overflow),'forecast-received':signedAmount(future.received),
        'full-in':future.fullIn===0?'Kho đang đầy':future.fullIn===null?'Chưa có mốc đầy kho':`Đầy sau ${duration(future.fullIn)} game`,
        'empty-in':future.emptyIn===null?'':`Kho cạn sau ${duration(future.emptyIn)} game`};
      for(const [key,value] of Object.entries(values))setText(card,`[data-value="${key}"]`,value);
      card.querySelector('[data-value="empty-in"]').hidden=future.emptyIn===null;
      card.querySelector('.economy-meter i').style.width=`${Math.min(100,entry.stock/entry.capacity*100)}%`;
      card.classList.toggle('economy-full',entry.stock>=entry.capacity);
      for(const key of Object.keys(ledgerLabels))setText(card,`[data-ledger="${key}"]`,['produced','received'].includes(key)?signedAmount(entry.ledger[key]):entry.ledger[key]?`−${amount(entry.ledger[key])}`:'0');
      // Unmet need is informational, never another deduction from stock.
      setText(card,'[data-ledger="unmet"]',amount(entry.ledger.unmet));card.querySelector('[data-unmet-row]').hidden=entry.ledger.unmet===0;
      // Disposal from army/wagon inventories never came out of this warehouse; report it separately.
      const fieldLoss=card.querySelector('[data-field-discarded]');fieldLoss.hidden=!snapshot.fieldDiscarded[resource];
      setText(card,'[data-field-discarded]',`Đã hủy trên quân/xe, ngoài kho thành: ${amount(snapshot.fieldDiscarded[resource])}`);
    }
    const work=[snapshot.upgrades?`${snapshot.upgrades} nâng ô`:'',snapshot.trainingOrders?`${snapshot.trainingOrders} lệnh tuyển · ${snapshot.queuedTroops} quân còn chờ`:''].filter(Boolean).join(' · ');
    setText(root,'[data-economy-work]',work?`${work}. Chi phí đã trả khi đặt lệnh.`:'Chưa có lệnh nâng ô hoặc tuyển quân đang chạy.');
    setText(root,'[data-economy-upkeep]',[`Lương tại thành: ${snapshot.localUpkeep} / giờ cho ${snapshot.garrison} quân đồn trú${snapshot.heldTroops?` và ${snapshot.heldTroops} quân chờ dỡ ở cổng`:''}.`,
      snapshot.awayTroops?`${snapshot.awayTroops} quân đi xa ăn lương mang theo.`:'',snapshot.queuedUpkeep?`Hàng đợi tuyển thêm +${snapshot.queuedUpkeep} / giờ khi xong.`:'',
      `Cuối dự báo (${gameDate(forecast.ends)}): ${forecast.upkeepAtEnd} / giờ.`].filter(Boolean).join(' '));
    const {armies,shipments}=snapshot.field;
    setText(root,'[data-economy-field]',armies.length+shipments.length?[armies.length?`${armies.length} đạo quân (${armies.map(a=>`${a.id}: ${statusLabels[a.status]}`).join(', ')})`:'',shipments.length?`${shipments.length} chuyến xe (${shipments.map(s=>`${s.id}: ${statusLabels[s.status]}`).join(', ')})`:''].filter(Boolean).join(' · ')+'. Lương mang theo đã chuyển từ kho thành vào hành trang.':'Không có quân hay xe ngoài thành.');
    const incoming=snapshot.incoming.map(item=>`${item.kind==='army'?'Đạo quân':'Chuyến xe'} ${item.id}: ${amount(item.amount)} ${NAMES[item.resource]} mang về · tới cổng lúc ${gameDate(item.arrives)}`);
    const list=root.querySelector('[data-economy-incoming]'),html=incoming.map(text=>`<li>${text}</li>`).join('');if(list.innerHTML!==html)list.innerHTML=html;list.hidden=!incoming.length;
    root.querySelector('[data-economy-incoming-note]').hidden=!incoming.length;
    root.querySelector('[data-economy-go-field]').hidden=armies.length+shipments.length===0;
    root.querySelector('[data-economy-go-work]').hidden=snapshot.upgrades+snapshot.trainingOrders===0;
  }
}
