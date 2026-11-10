export function walkable(scenario,[x,y]){
 const w=scenario.world;
 return Number.isInteger(x)&&Number.isInteger(y)&&x>=0&&y>=0&&x<w.width&&y<w.height&&
 !w.mountain_rectangles.some(([a,b,c,d])=>x>=a&&x<=c&&y>=b&&y<=d)&&
 (!w.river_cells.some(([a,b])=>a===x&&b===y)||w.bridges.some(([a,b])=>a===x&&b===y));
}
export function findPath(scenario,from,to){
 if(!walkable(scenario,from)||!walkable(scenario,to))return null;
 const key=p=>p.join(','),start=key(from),end=key(to);
 const sites=new Set([...scenario.settlements,...scenario.world.resource_sites,...scenario.local_sites].map(s=>key(s.position)));
 const queue=[from],previous=new Map([[start,null]]);
 for(let i=0;i<queue.length;i++){
  const p=queue[i],id=key(p);
  if(id===end){const path=[];let k=id;while(k!==null){path.push(k.split(',').map(Number));k=previous.get(k);}return path.reverse();}
  for(const [dx,dy] of [[1,0],[0,-1],[0,1],[-1,0]]){
   const next=[p[0]+dx,p[1]+dy],k=key(next);
   if(previous.has(k)||!walkable(scenario,next)||(sites.has(k)&&k!==end))continue;
   previous.set(k,id);queue.push(next);
  }
 }
 return null;
}
