export function stickyChromeHeight(){
  return [...document.querySelectorAll('.topbar,.sidebar')].reduce((height,element)=>height+(getComputedStyle(element).position==='sticky'?element.getBoundingClientRect().height:0),0);
}
export function revealRegion(element,scrollContainer){
  if(scrollContainer&&['auto','scroll'].includes(getComputedStyle(scrollContainer).overflowY)){
    scrollContainer.scrollTo({top:Math.max(0,scrollContainer.scrollTop+element.getBoundingClientRect().top-scrollContainer.getBoundingClientRect().top),behavior:'instant'});return;
  }
  window.scrollTo({top:Math.max(0,window.scrollY+element.getBoundingClientRect().top-stickyChromeHeight()),behavior:'instant'});
}

export class UiLayout {
  constructor(cityName){
    const label=document.querySelector('.empire-label>div');label.innerHTML='<small>QUẢN LÝ THÀNH</small><strong></strong>';label.querySelector('strong').textContent=cityName;
    const detail=document.querySelector('#detail');detail.tabIndex=-1;
    document.querySelector('#nav-detail').addEventListener('click',()=>{revealRegion(detail);detail.focus({preventScroll:true});});
    this.badge=document.createElement('b');this.badge.className='nav-work-count';this.badge.setAttribute('aria-hidden','true');this.badge.hidden=true;
    document.querySelector('#nav-city').append(this.badge);
  }
  revealScene(){if(innerWidth<=700)revealRegion(document.querySelector('#play-area'));}
  render(game,view){
    document.querySelector('.known-sites').hidden=view==='city';
    const city=game.cities[0],count=game.jobs.filter(job=>job.city===city.id).length+(game.training||[]).filter(job=>job.city===city.id).length;
    this.badge.textContent=String(count);this.badge.hidden=count===0;
    document.querySelector('#nav-city').title=count?`${count} công việc trong thành`:'Mở nội thành';
  }
}
