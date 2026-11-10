export const NAMES={wood:'Gỗ',clay:'Đất sét',iron:'Sắt',grain:'Lương thực'};
export const PLOT_NAMES={wood:'Rừng khai thác',clay:'Mỏ đất sét',iron:'Mỏ sắt',grain:'Ruộng lương'};
export const IMAGES={city:'./assets/world-city.png',bandits:'./assets/world-bandits.png',clay:'./assets/world-clay.png',grain:'./assets/world-grain.png'};
export function resourceIcon(type){
  if(type==='grain')return '<img src="./assets/grain.svg" alt="">';
  const shapes={wood:'<path fill="#8b653f" stroke="#624832" stroke-width="2" d="M12 47l34-17 9 13-34 18zM10 30L44 13l9 13-34 18z"/><ellipse cx="17" cy="36" rx="10" ry="8" fill="#d6b27b"/><ellipse cx="19" cy="53" rx="10" ry="8" fill="#cda46c"/><path d="M12 35l9 2m-6 13l9 3" stroke="#997044" stroke-width="2"/><path d="M31 17l6-8 7 5" fill="#6f8c49"/>',clay:'<path fill="#bd7549" stroke="#8e5136" stroke-width="2" d="M8 34l23-12 25 12-24 14zM8 34v15l24 13V48m0 14l24-14V34"/><path d="M18 27L42 40M32 48v14" stroke="#e4a46d" stroke-width="2"/>',iron:'<path fill="#637579" stroke="#3e5055" stroke-width="2" d="M7 43l12-22 18-7 20 20-6 22-26 6z"/><path fill="#9aafb0" d="M19 21l10 13 8-20 7 20 13 0-20 10-12 18-4-21L7 43z"/><path fill="#cfdddd" d="M29 34l8-20 7 20-10 5z"/>'};
  return `<svg viewBox="0 0 64 70" aria-hidden="true">${shapes[type]}</svg>`;
}
export function fieldArt(type){
  const sprite={wood:'city-resource-wood',clay:'city-resource-clay',iron:'city-resource-iron',grain:'city-resource-grain'}[type];
  return sprite?`<img src="./assets/${sprite}.png" alt="">`:'';
}
export function buildingArt(type){
  const sprite={
    'town-hall':'city-hall',barracks:'city-barracks',warehouse:'city-warehouse',
    granary:'city-granary','rally-point':'city-rally-point','transport-depot':'city-transport-depot'
  }[type];
  if(sprite)return `<img src="./assets/${sprite}.png" alt="">`;
  const colors=type==='granary'?['#b79862','#8f713f']:type==='transport-depot'?['#8e7951','#586a5c']:['#b7ae86','#61736c'];
  return `<svg viewBox="0 0 120 110" aria-hidden="true"><ellipse cx="60" cy="88" rx="47" ry="15" fill="#4c624b33"/><path d="M22 50l36-18 38 19v33L60 103 22 83z" fill="${colors[0]}"/><path d="M60 65l36-14v33l-36 19z" fill="#8a805c"/><path d="M15 52L55 16l49 37-43 20z" fill="${colors[1]}" stroke="#b5b395" stroke-width="3"/><path d="M33 61v25m17-17v25m21-27v27m15-34v26" stroke="#6d674c" stroke-width="4"/><path d="M35 73l12 5v14l-12-5z" fill="#3e4b38"/><path d="M68 75l13-6v20l-13 7z" fill="#454d3b"/></svg>`;
}

export function knownSites(scenario){
  const origin=scenario.settlements[0].position;
  return [
    ...scenario.settlements.map(s=>({id:s.id,name:s.name,position:s.position,kind:'city',owner:s.owner})),
    ...scenario.world.resource_sites.map(s=>({id:s.id,name:s.resource==='grain'?'Ruộng lương hoang':'Mỏ đất sét',position:s.position,kind:s.resource,owner:null})),
    ...scenario.local_sites.map(s=>({id:s.id,name:'Trại sơn tặc',position:s.position,kind:'bandits',owner:s.owner}))
  ].filter(s=>Math.abs(s.position[0]-origin[0])+Math.abs(s.position[1]-origin[1])<=scenario.world.initial_explored_radius);
}
