import {createGame,elapse,rates,plotOffer,upgradePlot,recruitUnits,SCALE,RESOURCES} from './game.js';
import {UNIT_TYPES,UNIT_RULES,troopCount} from './units.js';
import {barracksPanel,renderBarracks} from './barracks-view.js';
import {minePanel,renderMine,FieldOperations,defaultMarchDraft} from './logistics-view.js';
import {sendArmy,collectShipment,recallArmy,unloadAtHome} from './logistics.js';
import {SaveStore,encodeSave,decodeSave} from './storage.js';
import {resourceIcon,NAMES,PLOT_NAMES,IMAGES,knownSites,fieldArt,buildingArt} from './visuals.js';
import {WorldMap} from './world-map.js';
import {CityView} from './city-view.js';
import {installAppUpdates} from './app-updates.js';
import {ResourceBar} from './resource-bar.js';
import {UiLayout,revealRegion} from './ui-layout.js';
import {hallPanel,renderHall,EconomyBook} from './hall-view.js';

const $=s=>document.querySelector(s);
const duration=s=>`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
const worldTime=t=>`Ngày ${Math.floor(t/86400)+1} · ${String(Math.floor(t/3600)%24).padStart(2,'0')}:${duration(t%3600)}`;
let toastTimer;
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),5500);}

async function start(){
  const [scenario,layout]=await Promise.all(['./data/scenario.json','./data/city-layout.json'].map(async url=>{const r=await fetch(url);if(!r.ok)throw new Error('Không mở được dữ liệu thế giới.');return r.json();}));
  let game=createGame(scenario),blocked=false,storageUnavailable=false,store;
  let exportedRecovery=null,archiveRecoveryBlocked=false;
  try {store=new SaveStore(window.localStorage,scenario);const result=store.read();if(result.data.session)game=result.data.session.state;if(result.recovered)toast('Đã khôi phục bản dự phòng gần nhất.');}
  catch(e){if(/SecurityError/.test(e.name)){storageUnavailable=true;toast('Trình duyệt không cho lưu tại đây. Hãy dùng Xuất bản lưu để giữ tiến trình.');}else{blocked=true;$('#recovery-message').textContent=e.message;}}
  let view='world',selection={type:'site',id:scenario.settlements[0].id},citySelection={type:'building',id:'S01'},lastPanel='',lastObjective='',lastTime=-1,selectedArmyId=null;
  const recruitDraft={profile:'sword-i',count:'1'},marchDraft=defaultMarchDraft();
  try{const d=JSON.parse(localStorage.getItem('crownlands.expedition.draft'));if(d&&UNIT_TYPES.every(p=>typeof d.troops?.[p]==='string'&&/^\d{0,3}$/.test(d.troops[p]))&&['2','4','8'].includes(d.hours)&&/^\d{1,2}$/.test(d.wagons))Object.assign(marchDraft,d);}catch{}
  const keepMarchDraft=()=>{try{localStorage.setItem('crownlands.expedition.draft',JSON.stringify(marchDraft));}catch{}};
  try{
    const saved=JSON.parse(window.localStorage.getItem('crownlands.barracks.draft'));
    if(saved&&UNIT_TYPES.includes(saved.profile)&&typeof saved.count==='string'&&/^\d{0,3}(?:\.\d{0,3})?$/.test(saved.count))Object.assign(recruitDraft,{profile:saved.profile,count:saved.count});
  }catch{ /* Optional form preferences must never block a playable save. */ }
  function keepRecruitDraft(){try{window.localStorage.setItem('crownlands.barracks.draft',JSON.stringify(recruitDraft));}catch{ /* Game save status handles unavailable storage. */ }}
  let baseline=Math.floor(performance.now()),lastCheckpoint=baseline,lastAuto=baseline,foreground=!document.hidden,writing=false,conflict=false;
  const modalOpen=()=>Boolean(document.querySelector('dialog[open]'));
  const sites=knownSites(scenario);
  const cityView=new CityView(layout,s=>{selection=s;render();});
  const map=new WorldMap($('#world-map'),scenario,site=>{selectedArmyId=null;selection={type:'site',id:site.id};render();revealRegion($('#detail'),$('.inspector'));},id=>{const a=game.logistics.armies.find(a=>a.id===id);if(!a)return;selectedArmyId=id;selection={type:'site',id:a.site};map.selected=a.site;render();revealRegion($('#detail'),$('.inspector'));});
  const fieldOperations=new FieldOperations($('#field-operations'));
  const resources=new ResourceBar($('#resources')),ui=new UiLayout(scenario.settlements[0].name);
  const economyBook=new EconomyBook({getGame:()=>game,cityId:game.cities[0].id,cityName:scenario.settlements[0].name,
    onBarracks:()=>cityView.locate(layout.slots.find(slot=>slot.id==='S05')),
    onWork:()=>{revealRegion(cityView.work.host,$('.inspector'));cityView.work.host.querySelector('button')?.focus({preventScroll:true});},
    onField:()=>{const host=$('#field-operations');revealRegion(host,$('.inspector'));(host.querySelector('.field-card [data-focus-mine]')||host.querySelector('[data-field-summary]')).focus({preventScroll:true});}});
  $('#speeds').innerHTML=[1,2,4,8].map(s=>`<button data-speed="${s}" aria-label="Tốc độ ${s} lần">${s}×</button>`).join('');
  $('#known-sites').innerHTML=sites.map(s=>`<button class="site-link" data-site="${s.id}" aria-label="${s.name}"><img src="${IMAGES[s.kind]}" alt=""><span>${s.name}</span><small>${s.position.join(' : ')}</small></button>`).join('');
  $('#known-sites').addEventListener('click',e=>{const b=e.target.closest('[data-site]');if(!b)return;const site=sites.find(s=>s.id===b.dataset.site);setView('world');selectedArmyId=null;selection={type:'site',id:site.id};map.focus(site);render();revealRegion($('#detail'),$('.inspector'));});

  function checkpoint(slot='session',notify=false,force=false){
    if(blocked||storageUnavailable||conflict){saveIndicator(false,blocked?'Cần khôi phục bản lưu':conflict?'Tự lưu tạm dừng':'Không thể tự lưu');return false;}
    try{writing=true;store.save(game,slot,{force});saveIndicator(true,'Đã tự lưu');if(notify)toast('Đã lưu mốc thủ công.');return true;}
    catch(e){saveIndicator(false,'Không lưu được');if(notify)toast(`Không lưu được: ${e.message}. Hãy xuất bản dự phòng.`);return false;}
    finally{writing=false;}
  }
  function saveIndicator(ok,label){
    const indicator=$('#autosave-status');indicator.textContent=label;indicator.classList.toggle('save-error',!ok);
    indicator.title=ok?`Lần lưu gần nhất: ${new Date().toLocaleTimeString('vi-VN')}. Tiến trình tự lưu mỗi giây; không cần bấm lưu.`:'Tiến trình hiện tại chưa được tự lưu. Mở Quản lý bản lưu để xuất bản dự phòng.';
    $('#save-status').textContent=ok?'Đã tự lưu trên máy':label;
  }
  function flush(){
    const now=Math.floor(performance.now()),dt=Math.max(0,now-baseline);baseline=now;
    if(foreground&&!modalOpen()&&!blocked&&!conflict){
      // A missing callback interval is browser suspension, not elapsed game time.
      // Normal active frames are integrated in full; speed only changes simulation time.
      if(dt>1000){toast('Đồng hồ đã dừng trong lúc trình duyệt tạm ngưng.');return;}
      try{elapse(game,dt);}catch(e){game.clock.paused=true;toast(e.message);}
    }
  }
  function setView(next){
    if(view==='city'&&selection.type!=='site')citySelection=selection;
    view=next;selection=next==='city'?citySelection:{type:'site',id:map.selected};
    for(const scene of ['world','city']){
      const current=scene===view,button=$(`#nav-${scene}`);$(`#${scene}-view`).hidden=!current;button.classList.toggle('active',current);
      if(current)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');
    }
    if(next==='world')map.draw();render();ui.revealScene();}

  function panel(){
    const c=game.cities[0];
    if(selection.type==='plot'){
      const p=c.plots.find(p=>p.id===selection.id),offer=plotOffer(game,c.id,p.id),j=offer.job;
      return `<div data-testid="plot-detail"><p class="eyebrow">KHAI THÁC NGOẠI THÀNH</p><h2>${PLOT_NAMES[p.resource]}</h2><span class="detail-level">CẤP ${p.level} · Ô ${Number(p.id.slice(1))}</span><div class="detail-hero">${fieldArt(p.resource)}</div><div class="stat-row"><span>Sản lượng hiện tại</span><strong>${p.level===1?100:125} / giờ</strong></div>${p.level===1?'<div class="stat-row"><span>Sau khi nâng cấp</span><strong>125 / giờ <small>↑ 25</small></strong></div>':''}
      ${j?`<div class="job-progress"><strong>Đang nâng cấp lên cấp 2</strong><div class="progress-track"><i style="width:${(game.time-j.started)/120*100}%"></i></div><span>Còn ${duration(j.ends-game.time)} thời gian game</span></div><p class="note">Sản lượng cũ vẫn hoạt động trong lúc nâng cấp. Chi phí đã thanh toán.</p>`:p.level===1?`<p class="costs-label">Chi phí trả ngay</p><div class="costs">${RESOURCES.map(r=>`<div class="cost-item ${c.stock[r]<offer.cost[r]*SCALE?'lacking':''}" title="${NAMES[r]}">${resourceIcon(r)}<small class="cost-label">${NAMES[r]}</small><strong>${offer.cost[r]}</strong></div>`).join('')}</div><div class="stat-row"><span>Thời gian trong game</span><strong>02:00</strong></div><button id="upgrade" class="primary" ${offer.allowed?'':'disabled'}>Nâng lên cấp 2</button><p class="note">${offer.allowed?'Dùng tài nguyên trong kho thành này. Có thể nâng các ô khác song song.':offer.reason}</p>`:'<p>Đã đạt mốc cấp 2 của bản thử. Ruộng và mỏ tiếp tục sản xuất khi thế giới đang chạy.</p>'}</div>`;
    }
    if(selection.type==='building'){
      const slot=layout.slots.find(s=>s.id===selection.id),level=c.buildings[slot.id];
      if(slot.building_type==='barracks'&&level)return barracksPanel();
      if(slot.building_type==='town-hall'&&level)return hallPanel();
      const descriptions={'town-hall':'Trung tâm điều hành thành. Từ đây, đế chế của bạn sẽ phát triển ra thung lũng.','warehouse':'Kho riêng của thành, chứa gỗ, đất sét và sắt.','granary':'Giữ lương cho quân đồn trú. Lương ròng đã trừ chi phí nuôi quân.','rally-point':`Nơi tổ chức và tập kết lực lượng. Thành hiện có ${troopCount(c)} quân đồn trú.`,'barracks':'Cơ sở huấn luyện bộ binh.','transport-depot':'Bốn xe vận tải chở hàng thật từ mỏ về thành. Xe rời thành rồi mới nhận hàng khi tới mỏ.'};
      const art=buildingArt(slot.building_type);
      return `<p class="eyebrow">NỘI THÀNH</p><h2>${slot.label}</h2><span class="detail-level">${level?'CẤP '+level:'VỊ TRÍ CHƯA XÂY'}</span>${level?`<div class="detail-hero">${art}</div>`:''}<p>${descriptions[slot.building_type]||'Vị trí cố định dành cho giai đoạn phát triển tiếp theo.'}</p>${slot.building_type==='warehouse'?'<div class="stat-row"><span>Sức chứa mỗi loại</span><strong>4.000</strong></div>':slot.building_type==='granary'?`<div class="stat-row"><span>Sức chứa lương</span><strong>6.000</strong></div><div class="stat-row"><span>${troopCount(c)} quân tiêu thụ</span><strong>${c.upkeep} / giờ</strong></div>`:slot.building_type==='rally-point'?UNIT_TYPES.map(p=>`<div class="stat-row"><span>${UNIT_RULES[p].name} I</span><strong>${c.troops[p]}</strong></div>`).join(''):''}${['rally-point','transport-depot'].includes(slot.building_type)?'<button type="button" class="primary" data-open-field>Mở mỏ và hành quân</button>':''}<p class="note">Chọn ô khai thác để nâng cấp hoặc mở Doanh trại để huấn luyện quân.</p>`;
    }
    const site=sites.find(s=>s.id===selection.id)||sites[0],own=site.owner==='player';
    const mine=game.logistics.sites.find(s=>s.id===site.id);if(mine)return minePanel(mine);
    return `<div data-testid="site-detail"><p class="eyebrow">${own?'THÀNH CỦA BẠN':site.kind==='bandits'?'ĐỊA ĐIỂM THÙ ĐỊCH':'ĐIỂM TÀI NGUYÊN'}</p><h2>${site.name}</h2><span class="detail-level">TỌA ĐỘ ${site.position.join(' : ')}</span><div class="detail-hero"><img src="${IMAGES[site.kind]}" alt=""></div>${own?`<div class="stat-row"><span>Ô khai thác đang hoạt động</span><strong>16 / 16</strong></div><div class="stat-row"><span>Quân đồn trú</span><strong>${troopCount(c)}</strong></div><button id="enter-city" class="primary">Vào thành</button><p class="note">Mở nội thành để phát triển kinh tế và huấn luyện quân.</p>`:'<p>Chưa có tình báo hiện thời về lực lượng và kho tại đây.</p><p class="note">Bạn mới biết vị trí địa điểm. Hành quân, trinh sát và chiếm giữ được mở ở bước tiếp theo.</p>'}</div>`;
  }

  function render(){
    const c=game.cities[0],income=rates(c);
    resources.render(c,income);ui.render(game,view);
    $('#game-time').textContent=worldTime(game.time);$('#pause').textContent=game.clock.paused?'▶ Tiếp tục':'Ⅱ Tạm dừng';$('#pause').setAttribute('aria-label',game.clock.paused?'Tiếp tục':'Tạm dừng');$('#pause').classList.toggle('active',game.clock.paused);
    $('#clock-state').textContent=game.clock.paused?'Đã tạm dừng':'Đang chạy';
    document.querySelectorAll('[data-speed]').forEach(b=>{const yes=Number(b.dataset.speed)===game.clock.speed;b.classList.toggle('active',yes);b.setAttribute('aria-pressed',String(yes));});
    const html=panel();if(html!==lastPanel){$('#detail').innerHTML=html;lastPanel=html;}
    if(selectedArmyId&&!game.logistics.armies.some(a=>a.id===selectedArmyId))selectedArmyId=null;
    renderMine($('#detail [data-testid="mine-detail"]'),game,scenario,marchDraft,selectedArmyId);fieldOperations.render(game,sites);map.render(game,selectedArmyId);
    renderBarracks($('#detail [data-testid="barracks-detail"]'),game,recruitDraft);
    renderHall($('#detail [data-testid="hall-detail"]'),game,c.id);
    if(economyBook.dialog.open)economyBook.refresh();
    cityView.render(game,selection);
    const complete=c.plots.some(p=>p.resource==='grain'&&p.level===2);
    const objective=complete?'<h3>✓ HOÀN THÀNH BƯỚC ĐẦU</h3><strong>Ruộng lương đã phát triển</strong><p>Tiến trình của bạn được giữ lại. Thử lưu và mở lại thế giới này.</p><button id="goal-save">Mở bản lưu →</button>':'<h3>BƯỚC ĐẦU TIÊN</h3><strong>Nuôi sống một đế chế</strong><p>Vào thành, chọn một ruộng lương và nâng lên cấp 2.</p><button id="goal-city">Mở nội thành →</button>';
    if(objective!==lastObjective){$('#objective').innerHTML=objective;lastObjective=objective;}
  }
  const focusMine=(id,armyId=null)=>{setView('world');selectedArmyId=armyId;selection={type:'site',id};if(armyId){const a=game.logistics.armies.find(a=>a.id===armyId);if(a)map.focusArmy(a);}else map.focus(sites.find(s=>s.id===id));render();revealRegion($('#detail'),$('.inspector'));};
  $('#detail').addEventListener('click',e=>{const b=e.target.closest('[data-army-recall]');if(!b)return;flush();try{recallArmy(game,Number(b.dataset.armyRecall));checkpoint();render();toast('Đạo quân đang quay về thành.');}catch(error){toast(error.message);render();}});
  $('#detail').addEventListener('input',e=>{const p=e.target.dataset.marchUnit;if(p){marchDraft.troops[p]=e.target.value;keepMarchDraft();render();}if(e.target.id==='wagon-count'){marchDraft.wagons=e.target.value;keepMarchDraft();render();}});
  $('#detail').addEventListener('change',e=>{if(e.target.id==='march-rations'){marchDraft.hours=e.target.value;keepMarchDraft();render();}});
  $('#detail').addEventListener('click',e=>{if(e.target.closest('[data-open-field]'))focusMine('clay-near');});
  $('#detail').addEventListener('submit',e=>{
    if(!['march-form','collect-form'].includes(e.target.id))return;e.preventDefault();flush();
    const id=e.target.closest('[data-mine]').dataset.mine;
    try{if(e.target.id==='march-form'){const a=sendArmy(game,scenario,id,Object.fromEntries(UNIT_TYPES.map(p=>[p,Number(marchDraft.troops[p])])),Number(marchDraft.hours));selectedArmyId=a.id;map.game=game;map.focusArmy(a);toast('Đạo quân đã xuất phát.');}
    else {collectShipment(game,scenario,id,Number(marchDraft.wagons));toast('Xe đã rời thành đi lấy hàng.');}checkpoint();render();}
    catch(error){toast(error.message);render();}
  });
  $('#field-operations').addEventListener('click',e=>{
    const focus=e.target.closest('[data-focus-mine]');if(focus){focusMine(focus.dataset.focusMine,focus.dataset.armyId?Number(focus.dataset.armyId):null);return;}
    const b=e.target.closest('[data-field-return],[data-field-unload],[data-field-discard]');if(!b)return;flush();
    const row=b.closest('.field-card');
    try{if(b.hasAttribute('data-field-return')){recallArmy(game,Number(b.dataset.id));toast('Đạo quân đang rút về theo đường đã đi.');}
    else {const discard=b.hasAttribute('data-field-discard'),kind=b.dataset.kind,id=Number(b.dataset.id),list=kind==='army'?game.logistics.armies:game.logistics.shipments;
      if(discard&&!confirm('Hủy phần hàng còn lại không dỡ được? Tài nguyên này sẽ mất; quân hoặc xe được giải phóng khi dỡ hết.'))return;
      const delivered=unloadAtHome(game,kind,id,discard),left=list.some(item=>item.id===id),moved=(delivered/SCALE).toLocaleString('vi-VN',{maximumFractionDigits:1});
      toast(discard?`${delivered?`Đã dỡ ${moved} vào kho, `:''}phần còn lại đã bị hủy.`:!delivered?'Kho thành vẫn đầy · chưa dỡ được gì. Hàng vẫn ở trên xe/đạo quân.':left?`Đã dỡ ${moved}; phần còn lại vẫn chờ kho trống.`:`Đã dỡ hết ${moved} vào kho.`);}
    checkpoint();render();}catch(error){toast(error.message);render();}
    // Keep keyboard users in place when the pressed control is hidden or its card is removed.
    if(!b.isConnected||b.hidden)(row?.isConnected?row.querySelector('[data-focus-mine]'):$('#field-operations [data-field-summary]')).focus({preventScroll:true});
  });
  $('#nav-world').addEventListener('click',()=>setView('world'));$('#nav-city').addEventListener('click',()=>setView('city'));
  $('#detail').addEventListener('click',e=>{if(e.target.closest('#enter-city'))setView('city');if(e.target.closest('#upgrade')){flush();try{upgradePlot(game,game.cities[0].id,selection.id);checkpoint();render();toast('Đã bắt đầu nâng cấp.');}catch(error){toast(error.message);render();}}});
  $('#detail').addEventListener('click',e=>{const b=e.target.closest('[data-recruit-profile]');if(b){recruitDraft.profile=b.dataset.recruitProfile;keepRecruitDraft();render();}});
  $('#detail').addEventListener('click',e=>{const button=e.target.closest('[data-open-economy]');if(button){flush();render();economyBook.open(button.dataset.openEconomy);}});
  $('#detail').addEventListener('input',e=>{if(e.target.id==='recruit-count'){recruitDraft.count=e.target.value;keepRecruitDraft();render();}});
  $('#detail').addEventListener('submit',e=>{if(e.target.id!=='recruit-form')return;e.preventDefault();flush();try{recruitUnits(game,game.cities[0].id,recruitDraft.profile,Number(recruitDraft.count));checkpoint();render();toast('Đã thêm vào hàng đợi huấn luyện.');}catch(error){toast(error.message);render();}});
  $('#objective').addEventListener('click',e=>{if(e.target.closest('#goal-city')){setView('city');selection={type:'plot',id:'R04'};render();}if(e.target.closest('#goal-save'))openSaves();});
  $('#pause').addEventListener('click',()=>{flush();game.clock.paused=!game.clock.paused;checkpoint();render();});
  $('#speeds').addEventListener('click',e=>{const b=e.target.closest('[data-speed]');if(!b)return;flush();game.clock.speed=Number(b.dataset.speed);checkpoint();render();});
  $('#zoom-in').addEventListener('click',()=>map.zoom(1.2));$('#zoom-out').addEventListener('click',()=>map.zoom(1/1.2));$('#map-home').addEventListener('click',()=>{selection={type:'site',id:sites[0].id};map.focus(sites[0]);render();});
  $('#quicksave').addEventListener('click',()=>{flush();if(checkpoint('quick',true)&&$('#save-dialog').open)slotRows();render();});

  function slotRows(){
    let d;try{d=store?.read().data;}catch(e){toast(e.message);return;}
    if(!d)return;
    const rows=[...d.manual.map((r,i)=>({key:`manual-${i}`,label:`Ô lưu ${i+1}`,record:r,save:true})),{key:'quick',label:'Lưu nhanh',record:d.quick,save:true},...d.autos.map((r,i)=>({key:`auto-${i}`,label:`Tự lưu ${i+1}`,record:r,save:false}))];
    $('#save-slots').innerHTML=rows.map(row=>`<div class="save-row"><div><strong>${row.label}</strong><small>${row.record?`${worldTime(row.record.state.time)} · ${new Date(row.record.savedAt).toLocaleString('vi-VN')}`:'Chưa có bản lưu'}</small></div>${row.save?`<button data-save="${row.key}">Lưu</button>`:''}<button data-load="${row.key}" ${row.record?'':'disabled'}>Tải</button></div>`).join('');
  }
  function openSaves(){flush();render();slotRows();rawExportState();$('#save-dialog').showModal();}
  $('#save-menu').addEventListener('click',openSaves);
  $('#close-saves').addEventListener('click',()=>$('#save-dialog').close());
  $('#save-dialog').addEventListener('close',()=>baseline=Math.floor(performance.now()));
  $('#save-slots').addEventListener('click',e=>{
    const save=e.target.closest('[data-save]'),load=e.target.closest('[data-load]');
    if(save){checkpoint(save.dataset.save,true);slotRows();}
    if(load){try{const d=store.read().data,k=load.dataset.load,r=k==='quick'?d.quick:k.startsWith('manual')?d.manual[Number(k.at(-1))]:d.autos[Number(k.split('-')[1])];if(!r)return;
      if(!confirm('Tải bản lưu này? Tiến trình hiện tại được giữ trong một ô tự lưu.'))return;
      if(!checkpoint('auto'))throw new Error('Chưa giữ được tiến trình hiện tại. Hãy xuất bản lưu trước.');
      game=decodeSave(encodeSave(r.state),scenario);checkpoint();$('#save-dialog').close();lastPanel='';render();toast('Đã tải bản lưu.');
    }catch(err){toast(err.message);}}
  });
  $('#export-save').addEventListener('click',()=>{flush();const blob=new Blob([encodeSave(game)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`crownlands-day-${Math.floor(game.time/86400)+1}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Đã xuất bản lưu.');});
  $('#import-file').addEventListener('change',async e=>{
    const file=e.target.files[0];if(!file)return;
    try{if(file.size>2_000_000)throw new Error('Tệp bản lưu quá lớn.');const next=decodeSave(await file.text(),scenario);
      if(!blocked&&!confirm('Nhập bản lưu này? Tiến trình hiện tại sẽ được giữ trong một ô tự lưu.'))return;
      if(blocked){store?.resetSession(next);blocked=false;exportedRecovery=null;archiveRecoveryBlocked=false;syncRecoveryFallback();$('#recovery-dialog').close();}
      else if(!storageUnavailable&&!checkpoint('auto'))throw new Error('Chưa giữ được tiến trình hiện tại. Hãy xuất trước khi nhập.');
      game=next;checkpoint();lastPanel='';render();$('#save-dialog').close();baseline=Math.floor(performance.now());toast('Đã nhập bản lưu.');
    }catch(err){toast(err.message);showRecoveryError(err);}finally{e.target.value='';}
  });
  function syncRecoveryFallback(){
    $('#recovery-exported-new').hidden=!(blocked&&archiveRecoveryBlocked&&exportedRecovery);
  }
  function showRecoveryError(error){
    if(!blocked)return;$('#recovery-message').textContent=error.message;
    if(error.code!=='RECOVERY_EXPORT_STALE')archiveRecoveryBlocked=['ARCHIVE_WRITE_FAILED','RECOVERY_WRITE_FAILED'].includes(error.code);syncRecoveryFallback();
  }
  function newGame({exported=null}={}){
    if(!confirm(exported?'Bạn đã giữ file dữ liệu gốc vừa xuất? Chơi mới sẽ thay các bản dữ liệu gốc trong trình duyệt. File đã xuất sẽ là bản dự phòng của chúng.':'Bắt đầu thế giới mới? Hãy xuất bản dự phòng trước nếu muốn giữ thế giới hiện tại.'))return;
    const next=createGame(scenario);try{store?.resetSession(next,{exported});game=next;blocked=false;exportedRecovery=null;archiveRecoveryBlocked=false;syncRecoveryFallback();$('#recovery-dialog').close();$('#save-dialog').close();selection={type:'site',id:sites[0].id};citySelection={type:'building',id:'S01'};selectedArmyId=null;map.focus(sites[0]);lastPanel='';setView('world');baseline=Math.floor(performance.now());toast('Một thế giới mới đã bắt đầu.');}catch(e){toast(e.message);showRecoveryError(e);}
  }
  function exportRaw(){
    if(!store){toast('Trình duyệt không cho đọc kho lưu tại đây.');return;}
    try{
      const raw=store.rawExport(),blob=new Blob([raw],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');
      a.href=url;a.download=`crownlands-du-lieu-goc-${new Date().toISOString().replace(/[:.]/g,'-')}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
      if(blocked){exportedRecovery=JSON.parse(raw);syncRecoveryFallback();}toast('Đã xuất dữ liệu gốc của trình duyệt.');
    }catch(error){toast(error.message);showRecoveryError(error);}
  }
  function rawExportState(){let count=0;try{count=store?store.incidents().length:0;}catch{}const b=$('#export-raw');b.hidden=!count;b.textContent=`Xuất dữ liệu gốc đã giữ (${count})`;}
  $('#export-raw').addEventListener('click',exportRaw);$('#recovery-export').addEventListener('click',exportRaw);
  $('#recovery-exported-new').addEventListener('click',()=>{if(blocked&&archiveRecoveryBlocked&&exportedRecovery)newGame({exported:exportedRecovery});});
  $('#new-game').addEventListener('click',newGame);$('#recovery-new').addEventListener('click',newGame);$('#recovery-import').addEventListener('click',()=>$('#import-file').click());
  $('#recovery-dialog').addEventListener('cancel',e=>e.preventDefault());
  $('#help').addEventListener('click',()=>{flush();$('#help-dialog').showModal();});$('#close-help').addEventListener('click',()=>$('#help-dialog').close());$('#help-dialog').addEventListener('close',()=>baseline=Math.floor(performance.now()));
  window.addEventListener('keydown',e=>{if(e.target.matches('input,textarea,select')||modalOpen()||blocked)return;
    if(e.code==='Space'){if(e.target.closest('button,a[href],summary'))return;e.preventDefault();$('#pause').click();}else if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='s'){e.preventDefault();$('#quicksave').click();}else if(!e.ctrlKey&&!e.metaKey&&e.key.toLowerCase()==='c')setView('city');else if(!e.ctrlKey&&!e.metaKey&&e.key.toLowerCase()==='m')setView('world');});
  function suspend(){flush();checkpoint();foreground=false;}
  function resume(){foreground=!document.hidden;baseline=Math.floor(performance.now());}
  document.addEventListener('visibilitychange',()=>document.hidden?suspend():resume());window.addEventListener('pagehide',suspend);window.addEventListener('blur',suspend);window.addEventListener('focus',resume);
  window.addEventListener('storage',e=>{if(e.key==='crownlands.foundation.primary'&&!writing){conflict=true;game.clock.paused=true;render();toast('Bản lưu đã đổi ở cửa sổ khác. Hãy tải lại trang để tiếp tục với bản mới nhất.');saveIndicator(false,'Tự lưu tạm dừng');}});
  function frame(){
    flush();if(game.time!==lastTime){lastTime=game.time;render();}
    const now=Math.floor(performance.now());
    if(foreground&&!blocked&&!conflict&&!modalOpen()){
      if(now-lastCheckpoint>=1000){checkpoint();lastCheckpoint=now;}
      if(!game.clock.paused&&now-lastAuto>=300000){checkpoint('auto');lastAuto=now;}
    }
    requestAnimationFrame(frame);
  }
  $('#loading').hidden=true;$('#app').hidden=false;setView(view);
  if(blocked){saveIndicator(false,'Cần khôi phục bản lưu');$('#recovery-dialog').showModal();}else checkpoint();
  requestAnimationFrame(frame);
  await installAppUpdates({button:$('#update-app'),status:$('#offline-state'),beforeReload:()=>{flush();return checkpoint('session',false,true);},
    onSaveFailure:()=>toast('Chưa cập nhật vì chưa giữ được tiến trình. Mở Quản lý bản lưu để xuất bản dự phòng trước khi tải lại.')});
}
start().catch(e=>{$('#loading').textContent=`Không mở được Crownlands: ${e.message}`;});
