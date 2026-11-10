import {PLOT_NAMES,resourceIcon,buildingArt} from './visuals.js';

const normalize=text=>text.toLowerCase().normalize('NFD').replace(/\p{M}/gu,'').replaceAll('đ','d').replace(/\s+/g,' ').trim();

export class CityLocator {
  constructor(layout,onLocate){
    this.layout=layout;this.onLocate=onLocate;this.kind='all';this.signature='';
    const stylesheet=document.createElement('link');stylesheet.rel='stylesheet';stylesheet.href=new URL('../city-locator.css',import.meta.url).href;document.head.append(stylesheet);
    const trigger=document.createElement('button');trigger.type='button';trigger.className='city-find-trigger';trigger.textContent='☷ Tìm nhanh';
    trigger.setAttribute('aria-label','Tìm nhanh trong thành');trigger.setAttribute('aria-haspopup','dialog');trigger.setAttribute('aria-controls','city-locator');
    document.querySelector('#city-view').append(trigger);
    this.dialog=document.createElement('dialog');this.dialog.id='city-locator';this.dialog.className='city-locator';this.dialog.setAttribute('aria-labelledby','city-locator-title');
    this.dialog.innerHTML='<div class="locator-heading"><div><p class="eyebrow">NỘI THÀNH</p><h2 id="city-locator-title">Tìm trong thành</h2></div><button type="button" class="locator-close" aria-label="Đóng tìm nhanh">×</button></div><input type="search" aria-label="Tìm công trình hoặc ô tài nguyên" placeholder="Tên công trình, tài nguyên hoặc mã ô…"><div class="locator-filters" role="group" aria-label="Loại vị trí"><button type="button" data-kind="all" aria-pressed="true">Tất cả</button><button type="button" data-kind="building" aria-pressed="false">Công trình</button><button type="button" data-kind="plot" aria-pressed="false">Tài nguyên</button></div><p class="locator-count" aria-live="polite"></p><ul class="locator-results"></ul><p class="locator-empty" hidden>Không tìm thấy vị trí phù hợp.</p>';
    document.body.append(this.dialog);this.search=this.dialog.querySelector('input');this.results=this.dialog.querySelector('.locator-results');
    trigger.addEventListener('click',()=>{
      if(!this.game||this.dialog.open)return;this.renderList();this.dialog.showModal();this.search.focus({preventScroll:true});this.search.select();
    });
    this.dialog.querySelector('.locator-close').addEventListener('click',()=>this.dialog.close());
    this.search.addEventListener('input',()=>this.renderList());
    this.search.addEventListener('keydown',event=>{if(event.key==='Enter'&&this.results.children.length===1){event.preventDefault();this.results.querySelector('button').click();}});
    this.dialog.querySelector('.locator-filters').addEventListener('click',event=>{
      const button=event.target.closest('[data-kind]');if(!button)return;this.kind=button.dataset.kind;
      this.dialog.querySelectorAll('[data-kind]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));this.renderList();
    });
  }

  render(game,selection){this.game=game;this.selection=selection;if(this.dialog.open)this.renderList();}

  renderList(){
    const city=this.game.cities[0],query=normalize(this.search.value);
    const entries=[...this.layout.slots,...this.layout.resource_plots].map(item=>{
      const field=Object.hasOwn(item,'resource'),number=Number(item.id.slice(1));
      const level=field?city.plots.find(plot=>plot.id===item.id).level:city.buildings[item.id];
      const busy=this.game.jobs.some(job=>job.city===city.id&&job.plot===item.id);
      const state=busy?'Đang nâng':level?(field?'Đang khai thác':'Đã xây'):item.empty_until_unlocked?'Chưa mở':'Chưa xây';
      const name=field?`${PLOT_NAMES[item.resource]} ô ${number}`:item.label;
      const searchable=normalize(`${name} ${item.id} ${item.id[0]}${number} ${state}`);
      return {item,field,number,level,busy,state,name,searchable};
    }).filter(entry=>(this.kind==='all'||this.kind===(entry.field?'plot':'building'))&&entry.searchable.includes(query));
    const signature=JSON.stringify([this.kind,query,this.selection?.id,entries.map(e=>[e.item.id,e.level,e.state])]);
    if(signature===this.signature)return;this.signature=signature;
    this.dialog.querySelector('.locator-count').textContent=`${entries.length} vị trí · Bấm để đưa cảnh tới đúng chỗ`;
    this.dialog.querySelector('.locator-empty').hidden=entries.length>0;this.results.replaceChildren();
    for(const entry of entries){
      const li=document.createElement('li'),button=document.createElement('button');button.type='button';button.className='locator-row';
      button.classList.toggle('current',this.selection?.id===entry.item.id);
      button.setAttribute('aria-label',`Định vị ${entry.name}, ${entry.level?'cấp '+entry.level:entry.state}, ${entry.state}`);
      const icon=entry.field?resourceIcon(entry.item.resource):entry.level?buildingArt(entry.item.building_type):'<span aria-hidden="true">＋</span>';
      button.innerHTML=`<span class="locator-icon" aria-hidden="true">${icon}</span><span class="locator-label"><strong></strong><small></small></span><span class="locator-state"></span>`;
      button.querySelector('strong').textContent=entry.field?`${PLOT_NAMES[entry.item.resource]} · Ô ${entry.number}`:entry.item.label;
      button.querySelector('small').textContent=`${entry.item.id}${entry.level?' · Cấp '+entry.level:''}`;
      const state=button.querySelector('.locator-state');state.textContent=entry.state;state.classList.add(entry.busy?'busy':entry.level?'ready':'empty');
      button.addEventListener('click',()=>{this.dialog.close();this.onLocate(entry.item);});li.append(button);this.results.append(li);
    }
  }
}
