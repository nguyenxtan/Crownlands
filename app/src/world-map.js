import {armyPosition} from './logistics.js';
import {troopCount} from './units.js';
import {armyView,unitEmblem,gameDuration,foodAmount} from './field-presentation.js';
import {IMAGES,knownSites} from './visuals.js';

export class WorldMap {
  constructor(canvas,scenario,onSelect,onArmySelect){
    this.canvas=canvas;this.ctx=canvas.getContext('2d');this.scenario=scenario;this.onSelect=onSelect;
    this.onArmySelect=onArmySelect;this.armyMarkers=new Map();this.armyLayer=document.createElement('div');
    this.armyLayer.className='map-armies';this.armyLayer.setAttribute('role','group');this.armyLayer.setAttribute('aria-label','Đạo quân trên bản đồ');canvas.after(this.armyLayer);
    this.sites=knownSites(scenario);this.camera={x:16,y:32,zoom:1.5};this.selected=scenario.settlements[0].id;this.images={};
    for(const [key,src] of Object.entries({...IMAGES,grass:'./assets/grass.webp'})){
      const im=new Image();im.onload=()=>{this.images[key]=im;this.draw();};im.src=src;
    }
    new ResizeObserver(()=>this.draw()).observe(canvas);
    // Pointers are tracked individually (same pattern as CityCamera): one pans, two pinch around
    // their midpoint, and a gesture never ends in a site tap.
    this.points=new Map();this.gesture=false;
    const local=e=>{const r=canvas.getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top};};
    const surface=canvas.parentElement;
    const capture=(id,owner)=>{try{owner.setPointerCapture(id);}catch{/* already ended */}};
    const pair=()=>{const [a,b]=[...this.points.values()];return {x:(a.x+b.x)/2,y:(a.y+b.y)/2,distance:Math.max(1,Math.hypot(a.x-b.x,a.y-b.y))};};
    const end=e=>{
      const point=this.points.get(e.pointerId);if(!point)return;
      this.points.delete(e.pointerId);try{if(point.capture.hasPointerCapture(e.pointerId))point.capture.releasePointerCapture(e.pointerId);}catch{}
      if(point.marker&&(point.moved||this.gesture))this.suppressArmyClick=true;
      if(e.type==='pointerup'&&!point.marker&&!this.points.size&&!this.gesture&&!point.moved){
        const pt=this.toWorld(point.x,point.y),tol=32/this.scale,s=this.sites.find(s=>Math.hypot(pt.x-s.position[0]-.5,pt.y-s.position[1]-.5)<tol);
        if(s){this.selected=s.id;onSelect(s);this.draw();}
      }
      if(!this.points.size)this.gesture=false;
    };
    this.cancel=()=>{for(const [id,p] of this.points)try{if(p.capture.hasPointerCapture(id))p.capture.releasePointerCapture(id);}catch{}this.points.clear();this.gesture=false;this.suppressArmyClick=false;};
    surface.addEventListener('pointerdown',e=>{
      const marker=e.target.closest('[data-map-army]');
      if(e.button!==0||e.target!==canvas&&!marker)return;
      if(!this.points.size)this.suppressArmyClick=false;
      const owner=marker||canvas;owner.focus({preventScroll:true});const p=local(e);
      this.points.set(e.pointerId,{...p,startX:p.x,startY:p.y,moved:false,marker:Boolean(marker),capture:owner});capture(e.pointerId,owner);
      if(this.points.size>1)this.gesture=true;
    });
    surface.addEventListener('pointermove',e=>{
      const point=this.points.get(e.pointerId);if(!point)return;
      if(e.pointerType==='mouse'&&(e.buttons&1)===0){end(e);return;}
      const p=local(e);
      if(this.points.size>1){
        const before=pair();point.x=p.x;point.y=p.y;const after=pair();e.preventDefault();
        this.zoom(after.distance/before.distance,before.x,before.y,false);
        this.camera.x-=(after.x-before.x)/this.scale;this.camera.y-=(after.y-before.y)/this.scale;this.bound();this.draw();return;
      }
      const dx=p.x-point.x,dy=p.y-point.y;point.x=p.x;point.y=p.y;
      if(Math.hypot(p.x-point.startX,p.y-point.startY)>5)point.moved=true;
      this.camera.x-=dx/this.scale;this.camera.y-=dy/this.scale;this.bound();this.draw();
    });
    surface.addEventListener('pointerup',end);surface.addEventListener('pointercancel',end);
    surface.addEventListener('lostpointercapture',e=>{if(this.points.has(e.pointerId))end({pointerId:e.pointerId,type:'pointercancel'});});
    window.addEventListener('blur',()=>this.cancel());
    surface.addEventListener('wheel',e=>{if(e.target!==canvas&&!this.armyLayer.contains(e.target))return;e.preventDefault();const rect=canvas.getBoundingClientRect();this.zoom(Math.exp(-e.deltaY*.0015),e.clientX-rect.left,e.clientY-rect.top);},{passive:false});
    canvas.addEventListener('keydown',e=>{const moves={ArrowLeft:[-2,0],ArrowRight:[2,0],ArrowUp:[0,-2],ArrowDown:[0,2]};if(moves[e.key]){e.preventDefault();this.camera.x+=moves[e.key][0];this.camera.y+=moves[e.key][1];this.bound();this.draw();}});
  }
  render(game,selectedArmyId=null){this.game=game;this.selectedArmyId=selectedArmyId;this.draw();}
  releaseMarkerPointers(node){
    for(const [id,point] of this.points)if(point.capture===node){
      this.points.delete(id);try{if(node.hasPointerCapture(id))node.releasePointerCapture(id);}catch{}
    }
    if(!this.points.size)this.gesture=false;
  }
  renderArmies(){
    const armies=this.game?.logistics.armies||[],ids=new Set(armies.map(a=>a.id)),placed=[];
    this.armyLayer.style.left=`${this.canvas.offsetLeft}px`;this.armyLayer.style.top=`${this.canvas.offsetTop}px`;this.armyLayer.style.width=`${this.width}px`;this.armyLayer.style.height=`${this.height}px`;
    for(const [id,node] of this.armyMarkers)if(!ids.has(id)){this.releaseMarkerPointers(node);node.remove();this.armyMarkers.delete(id);}
    for(const a of armies){
      let button=this.armyMarkers.get(a.id);
      if(!button){button=document.createElement('button');button.type='button';button.className='field-map-marker';button.dataset.mapArmy=a.id;
        button.addEventListener('click',e=>{if(e.detail!==0&&this.suppressArmyClick){this.suppressArmyClick=false;e.preventDefault();return;}this.selectedArmyId=a.id;if(this.onArmySelect)this.onArmySelect(a.id);else{const s=this.sites.find(s=>s.id===a.site);if(s)this.onSelect(s);}this.draw();});
        this.armyLayer.append(button);this.armyMarkers.set(a.id,button);}
      const v=armyView(a,this.game.time),[x,y]=armyPosition(a,this.game.time,this.game.logistics.secondsPerTile),p=this.point(x+.5,y+.5);
      let offset=a.status==='working'?28:10;
      while(placed.some(t=>Math.abs(t.x-p.x)<170&&Math.abs(t.y-(p.y-offset))<54))offset+=56;
      placed.push({x:p.x,y:p.y-offset});button.style.left=`${p.x}px`;button.style.top=`${p.y-offset}px`;
      button.hidden=p.x<0||p.x>this.width||p.y<0||p.y>this.height;
      if(button.hidden)this.releaseMarkerPointers(button);
      button.dataset.phase=a.status;button.dataset.unitLine=v.dominant;button.classList.toggle('selected',a.id===this.selectedArmyId);button.setAttribute('aria-pressed',String(a.id===this.selectedArmyId));
      const timer=v.secondsLeft!==null?` · ${gameDuration(v.secondsLeft)}`:'';
      const label=`Đạo quân ${a.id}: ${v.composition}; ${v.phase}${timer}; bình quân ${foodAmount(v.grainPerSoldier)} lương mỗi lính`;
      button.setAttribute('aria-label',label);button.title=label;
      const html=`${unitEmblem(v.dominant)}<span class="map-army-copy"><strong>${v.shortComposition}</strong><small>${v.phaseShort}${timer}</small></span><span class="map-army-progress"><i style="width:${v.progress*100}%"></i></span>`;
      if(button.innerHTML!==html)button.innerHTML=html;
    }
  }
  get scale(){return 32*this.camera.zoom;}
  bound(){this.camera.x=Math.max(0,Math.min(64,this.camera.x));this.camera.y=Math.max(0,Math.min(64,this.camera.y));}
  toWorld(x,y){return{x:(x-this.width/2)/this.scale+this.camera.x,y:(y-this.height/2)/this.scale+this.camera.y};}
  point(x,y){return{x:(x-this.camera.x)*this.scale+this.width/2,y:(y-this.camera.y)*this.scale+this.height/2};}
  zoom(factor,x=this.width/2,y=this.height/2,redraw=true){const a=this.toWorld(x,y);this.camera.zoom=Math.max(.45,Math.min(3,this.camera.zoom*factor));const b=this.toWorld(x,y);this.camera.x+=a.x-b.x;this.camera.y+=a.y-b.y;this.bound();if(redraw)this.draw();}
  focusArmy(army){const [x,y]=armyPosition(army,this.game?.time??army.started,this.game?.logistics.secondsPerTile??60);this.selectedArmyId=army.id;this.selected=army.site;this.camera.x=x+.5;this.camera.y=y+.5;this.draw();}
  focus(site){this.selected=site.id;this.camera.x=site.position[0]+.5;this.camera.y=site.position[1]+.5;this.draw();}
  draw(){
    const box=this.canvas.getBoundingClientRect();if(!box.width||!box.height)return;
    this.width=box.width;this.height=box.height;const dpr=Math.min(2,window.devicePixelRatio||1);
    if(this.canvas.width!==Math.round(box.width*dpr)||this.canvas.height!==Math.round(box.height*dpr)){this.canvas.width=Math.round(box.width*dpr);this.canvas.height=Math.round(box.height*dpr);}
    const ctx=this.ctx;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.fillStyle='#304735';ctx.fillRect(0,0,this.width,this.height);
    const tl=this.toWorld(0,0),br=this.toWorld(this.width,this.height),origin=this.scenario.settlements[0].position;
    for(let y=Math.max(0,Math.floor(tl.y));y<Math.min(64,Math.ceil(br.y));y++)for(let x=Math.max(0,Math.floor(tl.x));x<Math.min(64,Math.ceil(br.x));x++){
      const p=this.point(x,y),s=this.scale,distance=Math.abs(x-origin[0])+Math.abs(y-origin[1]),known=distance<=12,vision=distance<=6;
      if(!known){ctx.fillStyle=(x+y)%2?'#314936':'#324b37';ctx.fillRect(p.x,p.y,s+1,s+1);ctx.strokeStyle='#d1dab206';ctx.strokeRect(p.x,p.y,s,s);continue;}
      if(this.images.grass){ctx.drawImage(this.images.grass,(x%4)*64,(y%4)*64,64,64,p.x,p.y,s+1,s+1);}
      else {ctx.fillStyle='#849b59';ctx.fillRect(p.x,p.y,s+1,s+1);}
      ctx.fillStyle=vision?'#93a96b20':'#30482e55';ctx.fillRect(p.x,p.y,s+1,s+1);
      const mountains=this.scenario.world.mountain_rectangles.some(([x1,y1,x2,y2])=>x>=x1&&x<=x2&&y>=y1&&y<=y2);
      if(mountains){ctx.fillStyle='#7b8767';ctx.beginPath();ctx.moveTo(p.x,p.y+s);ctx.lineTo(p.x+s*.48,p.y+s*.08);ctx.lineTo(p.x+s,p.y+s);ctx.fill();ctx.fillStyle='#a5af89';ctx.beginPath();ctx.moveTo(p.x+s*.48,p.y+s*.08);ctx.lineTo(p.x+s*.75,p.y+s*.75);ctx.lineTo(p.x+s*.5,p.y+s*.6);ctx.fill();}
      if(x===36&&y>=4&&y<=59){ctx.fillStyle='#5c8d87';ctx.fillRect(p.x,p.y,s+1,s+1);if(y===32){ctx.fillStyle='#baac7d';ctx.fillRect(p.x,p.y+s*.3,s,s*.4);}}
      // Cosmetic woodland; does not add a site, resource or collision rule.
      if(!mountains&&x!==36&&((x*31+y*17)%29<5)&&!this.sites.some(t=>Math.abs(t.position[0]-x)+Math.abs(t.position[1]-y)<2)){
        ctx.fillStyle=vision?'#5a7943':'#516c40';for(let i=0;i<3;i++){const tx=p.x+s*(.2+i*.22),ty=p.y+s*(.36+(i%2)*.25);ctx.beginPath();ctx.moveTo(tx,ty-s*.2);ctx.lineTo(tx-s*.15,ty+s*.2);ctx.lineTo(tx+s*.15,ty+s*.2);ctx.fill();}
      }
      ctx.strokeStyle='#f2e1a20c';ctx.strokeRect(p.x,p.y,s,s);
    }
    for(const item of [...(this.game?.logistics.armies||[]),...(this.game?.logistics.shipments||[])]){
      if(['working','home','blocked'].includes(item.status))continue;
      ctx.beginPath();ctx.strokeStyle=item.troops?'#e5d69cbb':'#bdc9adbb';ctx.lineWidth=2;ctx.setLineDash([5,5]);
      item.path.forEach(([x,y],i)=>{const p=this.point(x+.5,y+.5);if(i)ctx.lineTo(p.x,p.y);else ctx.moveTo(p.x,p.y);});ctx.stroke();ctx.setLineDash([]);
    }
    // Known territory, never an omniscient political map.
    ctx.strokeStyle='#d7ca8d66';ctx.lineWidth=1.5;ctx.setLineDash([5,5]);ctx.beginPath();
    for(const [i,[dx,dy]] of [[0,-6],[6,0],[0,6],[-6,0]].entries()){const p=this.point(origin[0]+dx+.5,origin[1]+dy+.5);if(i)ctx.lineTo(p.x,p.y);else ctx.moveTo(p.x,p.y);}ctx.closePath();ctx.stroke();ctx.setLineDash([]);
    for(const site of this.sites){const p=this.point(site.position[0]+.5,site.position[1]+.5),active=this.selected===site.id,size=site.kind==='city'?this.scale*1.15:this.scale*.95;
      ctx.fillStyle='#162e2540';ctx.beginPath();ctx.ellipse(p.x,p.y+this.scale*.14,size*.38,size*.15,0,0,Math.PI*2);ctx.fill();
      if(active){ctx.strokeStyle='#f6d58d';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(p.x,p.y+this.scale*.15,size*.48,size*.25,0,0,Math.PI*2);ctx.stroke();}
      if(this.game?.logistics.sites.some(s=>s.id===site.id&&s.owner==='player')){ctx.fillStyle='#e5d59b';ctx.beginPath();ctx.arc(p.x+size*.3,p.y-size*.4,5,0,Math.PI*2);ctx.fill();}
      const im=this.images[site.kind];if(im)ctx.drawImage(im,p.x-size/2,p.y-size*.65,size,size);
      if(this.camera.zoom>=.7){ctx.font=`${active?'600 ':''}${Math.max(10,Math.min(12,this.scale*.24))}px system-ui`;ctx.textAlign='center';const label=site.name,w=ctx.measureText(label).width+18;
        ctx.fillStyle=active?'#2c422eee':'#29402cc9';ctx.fillRect(p.x-w/2,p.y+size*.39,w,22);ctx.fillStyle=active?'#f1dba5':'#d5ddbb';ctx.fillText(label,p.x,p.y+size*.39+15);}
    }
    for(const item of [...(this.game?.logistics.armies||[]),...(this.game?.logistics.shipments||[])]){
      if(item.troops||['home','blocked'].includes(item.status))continue;
      const [x,y]=armyPosition(item,this.game.time,this.game.logistics.secondsPerTile),p=this.point(x+.5,y+.5),size=Math.max(16,Math.min(27,this.scale*.55));
      ctx.save();ctx.translate(p.x,p.y-(item.status==='working'?this.scale*.5:0));
      ctx.fillStyle='#1e392ee6';ctx.beginPath();ctx.arc(0,0,size*.68,0,Math.PI*2);ctx.fill();
      if(item.troops){ctx.strokeStyle='#f5dd9e';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-size*.22,size*.3);ctx.lineTo(-size*.22,-size*.45);ctx.stroke();ctx.fillStyle='#d6ba70';ctx.beginPath();ctx.moveTo(-size*.16,-size*.45);ctx.lineTo(size*.4,-size*.25);ctx.lineTo(-size*.16,-size*.05);ctx.fill();}
      else {ctx.fillStyle='#cfb885';ctx.fillRect(-size*.4,-size*.25,size*.75,size*.45);ctx.fillStyle='#e2d5af';for(const cx of [-.25,.23]){ctx.beginPath();ctx.arc(size*cx,size*.35,size*.1,0,Math.PI*2);ctx.fill();}}
      ctx.font='600 10px system-ui';ctx.textAlign='center';ctx.fillStyle='#f4ead3';ctx.fillText(String(item.troops?troopCount(item):item.wagons),size*.75,4);ctx.restore();
    }
    // Edge vignette keeps map labels readable against the source grass.
    const v=ctx.createRadialGradient(this.width*.5,this.height*.5,this.width*.15,this.width*.5,this.height*.5,Math.max(this.width,this.height)*.7);v.addColorStop(0,'#112b1600');v.addColorStop(1,'#112b1666');ctx.fillStyle=v;ctx.fillRect(0,0,this.width,this.height);
    this.renderArmies();
    document.querySelector('#zoom-label').textContent=`${Math.round(this.camera.zoom*100)}%`;
    document.querySelector('.map-location').textContent=`${Math.round(this.camera.x)} : ${Math.round(this.camera.y)}`;
  }
}
