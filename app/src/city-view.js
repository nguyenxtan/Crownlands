import {fieldArt,buildingArt,PLOT_NAMES} from './visuals.js';
import {CityWork} from './city-work.js';
import {CONSTRUCTION_MARKUP,updateConstruction} from './city-construction.js';
import {CityCamera} from './city-camera.js';
import {CityLocator} from './city-locator.js';
import {CityNotices} from './city-notices.js';
import {revealRegion} from './ui-layout.js';
export class CityView {
  constructor(layout,onSelect){
    this.layout=layout;this.host=document.querySelector('#city-items');this.buttons=new Map();this.onSelect=onSelect;
    this.work=new CityWork(s=>this.locate([...layout.slots,...layout.resource_plots].find(item=>item.id===s.id)));
    for(const item of [...layout.slots,...layout.resource_plots]){
      const b=document.createElement('button'),field=Object.hasOwn(item,'resource');
      b.className='city-item'+(field?' field':'')+(item.id==='S01'?' main-hall':'');b.style.left=`${item.anchor[0]*100}%`;b.style.top=`${item.anchor[1]*100}%`;
      b.style.zIndex=String(Math.round(item.anchor[1]*100)+5);b.dataset[field?'plot':'slot']=item.id;
      b.addEventListener('click',()=>onSelect({type:field?'plot':'building',id:item.id}));
      this.host.append(b);this.buttons.set(item.id,b);
    }
    this.camera=new CityCamera(document.querySelector('#city-stage'),document.querySelector('#city-board'));
    this.locator=new CityLocator(layout,item=>this.locate(item));
    this.notices=new CityNotices(layout,item=>this.locate(item));
  }
  locate(item){
    if(!item)return;
    if(document.querySelector('#city-view').hidden)document.querySelector('#nav-city').click();
    revealRegion(document.querySelector('#city-stage'));
    this.locatedId=item.id;this.camera.focus(item.anchor);
    this.onSelect({type:Object.hasOwn(item,'resource')?'plot':'building',id:item.id});
    this.buttons.get(item.id).focus({preventScroll:true});
  }
  render(game,selection){
    const c=game.cities[0];
    if(this.locatedId&&selection?.id!==this.locatedId)this.locatedId=null;
    this.work.render(game,c,selection);
    this.locator.render(game,selection);this.notices.render(game,c);
    for(const item of [...this.layout.slots,...this.layout.resource_plots]){
      const b=this.buttons.get(item.id),field=Object.hasOwn(item,'resource');
      const level=field?c.plots.find(p=>p.id===item.id).level:c.buildings[item.id],name=field?PLOT_NAMES[item.resource]:item.label;
      const job=game.jobs.find(j=>j.city===c.id&&j.plot===item.id),busy=Boolean(job);
      const signature=`${level}-${busy}`;
      b.classList.toggle('selected',selection?.id===item.id);b.classList.toggle('busy',busy);b.classList.toggle('empty',!field&&!level);
      b.classList.toggle('located',this.locatedId===item.id);
      b.classList.toggle('work-paused',busy&&game.clock.paused);
      b.style.zIndex=String(Math.round(item.anchor[1]*100)+5+(busy?100:0));
      b.setAttribute('aria-label',`${name} ${item.id.replace(/\D/g,'')}, ${level?'cấp '+level:'ô trống'}${busy?', đang nâng cấp':''}`);b.setAttribute('aria-pressed',String(selection?.id===item.id));
      if(b.dataset.signature!==signature){
        b.dataset.signature=signature;
        let art='';if(field)art=fieldArt(item.resource);
        else if(level)art=buildingArt(item.building_type);
        b.innerHTML=`<i class="pad"></i>${art}<span class="item-label">${item.id==='S01'?'♛ ':''}${name}</span>${level?`<span class="level-badge">${level}</span>`:''}${busy?CONSTRUCTION_MARKUP:''}`;
      }
      if(job)updateConstruction(b,job,game.time,game.clock.paused);else b.removeAttribute('title');
    }
  }
}
