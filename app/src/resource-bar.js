import {RESOURCES,SCALE} from './game.js';
import {resourceIcon,NAMES} from './visuals.js';
const fmt=value=>Math.floor(value).toLocaleString('vi-VN');

export class ResourceBar {
  constructor(host){
    this.host=host;
    host.innerHTML=RESOURCES.map(resource=>`<div class="resource" data-resource="${resource}" role="group" aria-label="${NAMES[resource]}"><div class="resource-heading">${resourceIcon(resource)}<span class="res-name">${NAMES[resource]}</span></div><div class="resource-values"><strong data-testid="stock-${resource}" id="stock-${resource}"></strong><small class="resource-cap"></small></div><small class="resource-rate" id="rate-${resource}"></small><span class="resource-meter" aria-hidden="true"><i></i></span></div>`).join('');
    this.cards=new Map(RESOURCES.map(resource=>[resource,host.querySelector(`[data-resource="${resource}"]`)]));
  }
  render(city,income){
    for(const resource of RESOURCES){
      const card=this.cards.get(resource),amount=city.stock[resource]/SCALE,full=amount>=city.cap[resource],rate=income[resource];
      card.querySelector('strong').textContent=fmt(amount);
      card.querySelector('.resource-cap').textContent=`${full?'Đầy kho':'Kho'} ${fmt(city.cap[resource])}`;
      card.querySelector('.resource-rate').textContent=`${resource==='grain'?'Ròng ':''}${rate>0?'+':''}${rate.toLocaleString('vi-VN')} / giờ`;
      card.querySelector('.resource-meter i').style.width=`${Math.max(0,Math.min(100,amount/city.cap[resource]*100))}%`;
      card.classList.toggle('resource-full',full);card.classList.toggle('resource-loss',rate<0);
      card.title=`${NAMES[resource]} · Trong kho ${fmt(amount)} / ${fmt(city.cap[resource])} · ${rate>0?'+':''}${rate} mỗi giờ${resource==='grain'?' sau khi trừ lương nuôi quân':''}`;
    }
  }
}
