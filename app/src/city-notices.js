import {PLOT_NAMES} from './visuals.js';

const key=job=>`${job.city}:${job.id}:${job.plot}:${job.started}:${job.ends}`;

export class CityNotices {
  constructor(layout,onLocate){
    this.layout=layout;this.onLocate=onLocate;this.pending=new Map();this.completed=[];
    this.host=document.createElement('aside');this.host.className='city-notice';this.host.hidden=true;
    this.host.setAttribute('role','log');this.host.setAttribute('aria-live','polite');this.host.setAttribute('aria-label','Nâng cấp hoàn tất');
    this.host.innerHTML='<span class="notice-check" aria-hidden="true">✓</span><div><h3>NÂNG CẤP HOÀN TẤT</h3><p></p><button type="button" class="notice-locate"></button></div><button type="button" class="notice-close" aria-label="Đóng thông báo nâng cấp">×</button>';
    document.querySelector('#app').append(this.host);
    this.host.querySelector('.notice-close').addEventListener('click',()=>this.close());
    this.host.querySelector('.notice-locate').addEventListener('click',()=>{const item=this.layout.resource_plots.find(item=>item.id===this.completed[0]?.plot);this.close();if(item)this.onLocate(item);});
  }

  close(){clearTimeout(this.timer);this.host.hidden=true;this.completed=[];}

  render(game,city){
    const current=new Map(game.jobs.filter(job=>job.city===city.id&&city.plots.some(plot=>plot.id===job.plot)).map(job=>[key(job),job]));
    if(this.game!==game||game.time<this.time){
      this.close();this.game=game;this.time=game.time;this.pending=current;return;
    }
    const completed=[...this.pending].filter(([id,job])=>!current.has(id)&&game.events.some(event=>event.kind==='plot-complete'&&event.city===city.id&&event.plot===job.plot&&event.time===job.ends)).map(([,job])=>job);
    this.pending=current;this.time=game.time;
    if(!completed.length)return;
    this.completed=[...this.completed,...completed].slice(-16);
    const names=this.completed.map(job=>{const plot=city.plots.find(plot=>plot.id===job.plot);return `${PLOT_NAMES[plot.resource]} ô ${Number(plot.id.slice(1))}`;});
    this.host.querySelector('p').textContent=names.length===1?`${names[0]} đã lên cấp 2.`:`${names.length} ô đã lên cấp 2: ${names.slice(0,3).join(', ')}${names.length>3?` và ${names.length-3} ô khác`:''}.`;
    this.host.querySelector('.notice-locate').textContent=names.length===1?'Xem ô':'Xem ô đầu tiên';
    this.host.hidden=false;clearTimeout(this.timer);this.timer=setTimeout(()=>this.close(),8000);
  }
}
