const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));

export class CityCamera {
  constructor(stage,board){
    this.stage=stage;this.board=board;this.scale=1;this.x=0;this.y=0;
    this.points=new Map();this.dragging=false;this.suppressClick=false;
    const stylesheet=document.createElement('link');stylesheet.rel='stylesheet';stylesheet.href=new URL('../city-camera.css',import.meta.url).href;document.head.append(stylesheet);
    stage.tabIndex=0;stage.style.touchAction='none';stage.setAttribute('role','region');
    stage.setAttribute('aria-label','Cảnh nội thành, có thể kéo và phóng to');
    stage.setAttribute('aria-describedby','city-camera-hint');
    const toolbar=document.createElement('div');toolbar.className='city-camera-toolbar';toolbar.setAttribute('role','group');toolbar.setAttribute('aria-label','Điều khiển nội thành');
    toolbar.innerHTML='<button type="button" aria-label="Thu nhỏ nội thành" title="Thu nhỏ">−</button><span class="city-camera-zoom" data-testid="city-zoom" title="Mức phóng đại nội thành">100%</span><button type="button" aria-label="Phóng to nội thành" title="Phóng to">+</button><button type="button" aria-label="Về giữa thành" title="Về giữa thành · 100%">⌖</button>';
    stage.parentElement.append(toolbar);const buttons=toolbar.querySelectorAll('button');
    [this.minus,this.plus,this.home]=buttons;this.output=toolbar.querySelector('.city-camera-zoom');
    this.minus.addEventListener('click',()=>this.zoomBy(1/1.25));this.plus.addEventListener('click',()=>this.zoomBy(1.25));this.home.addEventListener('click',()=>this.reset());
    const hint=stage.parentElement.querySelector('.city-legend');
    hint.id='city-camera-hint';hint.innerHTML='<span class="dot"></span> Chọn công trình · Kéo để di chuyển · Cuộn/chụm để zoom';
    stage.addEventListener('dragstart',event=>event.preventDefault());
    stage.addEventListener('pointerdown',event=>this.pointerDown(event),true);
    stage.addEventListener('pointermove',event=>this.pointerMove(event),{passive:false});
    stage.addEventListener('pointerup',event=>this.pointerEnd(event));stage.addEventListener('pointercancel',event=>this.pointerEnd(event));
    // Before a drag crosses the threshold it has no capture: release may be outside the stage.
    window.addEventListener('pointerup',event=>this.pointerEnd(event));window.addEventListener('pointercancel',event=>this.pointerEnd(event));
    stage.addEventListener('lostpointercapture',event=>{if(event.target===stage&&this.points.has(event.pointerId))this.pointerEnd(event);});
    stage.addEventListener('click',event=>{if(this.suppressClick&&event.detail!==0){event.preventDefault();event.stopImmediatePropagation();}},true);
    stage.addEventListener('wheel',event=>{
      if(!event.deltaY)return;event.preventDefault();
      const multiplier=event.deltaMode===1?16:event.deltaMode===2?stage.clientHeight:1;
      this.zoomBy(Math.exp(-clamp(event.deltaY*multiplier,-1000,1000)*.0015),event.clientX,event.clientY);
    },{passive:false});
    stage.addEventListener('keydown',event=>{
      if(event.target!==stage||event.ctrlKey||event.metaKey||event.altKey)return;
      const moves={ArrowLeft:[40,0],ArrowRight:[-40,0],ArrowUp:[0,40],ArrowDown:[0,-40]};
      if(moves[event.key]){event.preventDefault();this.panBy(...moves[event.key]);}
      else if(['+','=','-','Home'].includes(event.key)){event.preventDefault();if(event.key==='Home')this.reset();else this.zoomBy(event.key==='-'?1/1.25:1.25);}
    });
    window.addEventListener('blur',()=>this.cancel());
    document.addEventListener('visibilitychange',()=>{if(document.hidden)this.cancel();});
    const observer=new ResizeObserver(()=>{if(!stage.clientWidth||!stage.clientHeight)this.cancel();this.draw();});observer.observe(stage);observer.observe(board);
    this.draw();
  }

  frame(){
    const style=getComputedStyle(this.stage),rect=this.stage.getBoundingClientRect();
    const left=parseFloat(style.paddingLeft)||0,top=parseFloat(style.paddingTop)||0;
    const width=this.stage.clientWidth-left-(parseFloat(style.paddingRight)||0),height=this.stage.clientHeight-top-(parseFloat(style.paddingBottom)||0);
    return {width,height,x:rect.left+left+width/2,y:rect.top+top+height/2};
  }

  draw(){
    const frame=this.frame();
    if(frame.width>0&&frame.height>0){
      const maxX=Math.max(0,(this.board.offsetWidth*this.scale-frame.width)/2),maxY=Math.max(0,(this.board.offsetHeight*this.scale-frame.height)/2);
      this.x=clamp(this.x,-maxX,maxX);this.y=clamp(this.y,-maxY,maxY);
    }
    this.board.style.transform=`translate(${this.x.toFixed(3)}px,${this.y.toFixed(3)}px) scale(${this.scale})`;
    this.output.textContent=`${Math.round(this.scale*100)}%`;this.minus.disabled=this.scale<=1;this.plus.disabled=this.scale>=3;
    this.stage.classList.toggle('city-camera-dragging',this.dragging);
  }

  zoomTo(scale,oldX,oldY,newX=oldX,newY=oldY){
    const next=clamp(scale,1,3),rect=this.board.getBoundingClientRect(),ratio=next/this.scale;
    this.x+=(oldX-rect.left-rect.width/2)*(1-ratio)+newX-oldX;
    this.y+=(oldY-rect.top-rect.height/2)*(1-ratio)+newY-oldY;
    this.scale=next;this.draw();
  }

  zoomBy(factor,x,y){const frame=this.frame();this.zoomTo(this.scale*factor,x??frame.x,y??frame.y);}
  panBy(x,y){this.x+=x;this.y+=y;this.draw();}
  focus(anchor){this.cancel();this.scale=clamp(Math.max(this.scale,2),1,3);this.x=(.5-anchor[0])*this.board.offsetWidth*this.scale;this.y=(.5-anchor[1])*this.board.offsetHeight*this.scale;this.draw();}
  reset(){this.cancel();this.scale=1;this.x=0;this.y=0;this.draw();}
  capture(id){try{this.stage.setPointerCapture(id);}catch{/* A cancelled pointer may already have ended. */}}

  snapshot(){
    const points=[...this.points.values()];
    if(points.length<2)return points[0];
    return {x:(points[0].x+points[1].x)/2,y:(points[0].y+points[1].y)/2,distance:Math.hypot(points[0].x-points[1].x,points[0].y-points[1].y)};
  }

  pointerDown(event){
    if(event.button!==0)return;
    if(!this.points.size){this.suppressClick=false;this.dragging=false;}
    this.points.set(event.pointerId,{x:event.clientX,y:event.clientY,startX:event.clientX,startY:event.clientY});
    if(!event.target.closest('button,a,input,textarea,select'))this.stage.focus({preventScroll:true});
    if(this.points.size>1){this.dragging=true;this.suppressClick=true;for(const id of this.points.keys())this.capture(id);this.draw();}
  }

  pointerMove(event){
    const point=this.points.get(event.pointerId);if(!point)return;
    if(event.pointerType==='mouse'&&(event.buttons&1)===0){this.pointerEnd(event);return;}
    const previous={...this.snapshot()};point.x=event.clientX;point.y=event.clientY;
    if(this.points.size>1){
      const current=this.snapshot();event.preventDefault();
      this.zoomTo(this.scale*current.distance/Math.max(1,previous.distance),previous.x,previous.y,current.x,current.y);
      return;
    }
    if(!this.dragging&&Math.hypot(point.x-point.startX,point.y-point.startY)<=6)return;
    const x=this.dragging?previous.x:point.startX,y=this.dragging?previous.y:point.startY;
    this.dragging=true;this.suppressClick=true;this.capture(event.pointerId);event.preventDefault();this.panBy(point.x-x,point.y-y);
  }

  pointerEnd(event){
    if(!this.points.has(event.pointerId))return;
    this.points.delete(event.pointerId);
    try{if(this.stage.hasPointerCapture(event.pointerId))this.stage.releasePointerCapture(event.pointerId);}catch{}
    if(!this.points.size)this.dragging=false;
    for(const point of this.points.values()){point.startX=point.x;point.startY=point.y;}
    this.draw();
  }

  cancel(){
    const ids=[...this.points.keys()];this.points.clear();this.dragging=false;
    for(const id of ids)try{if(this.stage.hasPointerCapture(id))this.stage.releasePointerCapture(id);}catch{}
    this.stage.classList.remove('city-camera-dragging');
  }
}
