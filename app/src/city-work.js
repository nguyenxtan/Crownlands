import {PLOT_NAMES,resourceIcon} from './visuals.js';
import {UNIT_RULES} from './units.js';

const duration=seconds=>`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;

export class CityWork {
  constructor(onSelect){
    if(!document.getElementById('city-work-styles')){
      const stylesheet=document.createElement('link');stylesheet.id='city-work-styles';stylesheet.rel='stylesheet';
      stylesheet.href=new URL('../city-work.css',import.meta.url).href;document.head.append(stylesheet);
    }
    this.host=document.createElement('section');this.host.className='city-work';this.host.hidden=true;
    this.host.setAttribute('aria-label','Công việc trong thành');
    this.host.innerHTML='<header><h3>ĐANG LÀM <span class="work-count"></span></h3><span class="work-state"></span></header><div class="work-categories"></div><div class="city-work-list"></div><p>Thời gian trong game · Bấm để xem vị trí</p>';
    document.querySelector('.empire-label').after(this.host);
    this.list=this.host.querySelector('.city-work-list');this.rows=new Map();this.onSelect=onSelect;
  }

  render(game,city,selection){
    const upgrades=game.jobs.filter(job=>job.city===city.id&&city.plots.some(plot=>plot.id===job.plot)).sort((a,b)=>a.ends-b.ends||a.id-b.id);
    const training=game.training.filter(job=>job.city===city.id);
    const work=[...upgrades.map(job=>{
      const plot=city.plots.find(plot=>plot.id===job.plot),name=PLOT_NAMES[plot.resource],number=Number(plot.id.slice(1));
      return {key:`plot:${city.id}:${job.id}:${job.plot}:${job.started}`,kind:'upgrade',target:{type:'plot',id:job.plot},label:`Xem ${name} ô ${number} đang nâng cấp`,icon:resourceIcon(plot.resource),title:`${name} · Ô ${number} → Cấp ${plot.level+1}`,ends:job.ends,started:job.started,total:job.ends-job.started};
    }),...training.map((job,index)=>{
      const unit=UNIT_RULES[job.profile];
      return {key:`training:${city.id}:${job.id}:${job.profile}:${job.started}:${job.count}`,kind:'training',target:{type:'building',id:'S05'},label:`Xem huấn luyện ${unit.name} tại Doanh trại`,icon:`<span class="work-unit-symbol" aria-hidden="true">${unit.symbol}</span>`,title:`${index===0?'Tuyển':'Chờ tuyển'}: ${unit.name} · Xong ${job.count-job.remaining}/${job.count}`,ends:job.next+(job.remaining-1)*unit.seconds,started:job.started,total:job.count*unit.seconds};
    })];
    this.host.hidden=selection?.type==='site'||work.length===0;
    this.host.querySelector('.work-count').textContent=String(work.length);
    this.host.querySelector('.work-categories').textContent=[upgrades.length?`${upgrades.length} nâng cấp`:'',training.length?`${training.length} lệnh tuyển`:''].filter(Boolean).join(' · ');
    this.host.querySelector('.work-state').textContent=game.clock.paused?'Tạm dừng':'Đang thực hiện';
    const active=new Set(work.map(item=>item.key));
    for(const [id,row] of this.rows)if(!active.has(id)){row.remove();this.rows.delete(id);}
    for(const item of work){
      let row=this.rows.get(item.key);
      if(!row){
        row=document.createElement('button');row.type='button';row.className='city-work-row';row.dataset.kind=item.kind;
        row.setAttribute('aria-label',item.label);
        row.innerHTML=`<span class="work-icon">${item.icon}</span><span class="work-title"></span><time></time><span class="work-progress" role="progressbar" aria-label="${item.kind==='training'?'Tiến độ huấn luyện':'Tiến độ nâng cấp'}"></span>`;
        row.addEventListener('click',()=>this.onSelect(item.target));
        this.rows.set(item.key,row);this.list.append(row);
      }
      row.classList.toggle('selected',selection?.id===item.target.id);
      row.querySelector('.work-title').textContent=item.title;
      const seconds=Math.max(0,item.ends-game.time),total=Math.max(1,item.total),elapsed=Math.min(total,Math.max(0,game.time-item.started));
      const timer=row.querySelector('time');timer.textContent=duration(seconds);timer.dateTime=`PT${seconds}S`;
      const progress=row.querySelector('.work-progress');
      progress.setAttribute('aria-valuemin','0');progress.setAttribute('aria-valuemax',String(total));progress.setAttribute('aria-valuenow',String(elapsed));
      progress.style.setProperty('--work-progress',`${elapsed/total*100}%`);
    }
    // Jobs normally arrive in completion order; only move rows when order actually changes.
    // Keeping nodes in place lets keyboard focus survive the per-second render.
    work.forEach((item,index)=>{const row=this.rows.get(item.key);if(this.list.children[index]!==row)this.list.insertBefore(row,this.list.children[index]||null);});
  }
}
