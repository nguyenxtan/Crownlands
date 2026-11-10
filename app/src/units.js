// S00 tier-I trial values. No technology, speed or building discounts in this slice.
export const UNIT_TYPES=Object.freeze(['sword-i','spear-i','archer-i']);
export const UNIT_RULES=Object.freeze({
 'sword-i':{name:'Kiếm binh',role:'Bộ binh cận chiến',symbol:'⚔',seconds:40,upkeep:1,capacity:1,cost:{wood:40,clay:20,iron:50,grain:10}},
 'spear-i':{name:'Giáo binh',role:'Giữ tuyến, chống kỵ',symbol:'♜',seconds:35,upkeep:1,capacity:1,cost:{wood:50,clay:30,iron:30,grain:10}},
 'archer-i':{name:'Cung thủ',role:'Hỏa lực từ tuyến sau',symbol:'➶',seconds:45,upkeep:1,capacity:1,cost:{wood:60,clay:30,iron:20,grain:10}}
});
export const MAX_TRAINING_ORDERS=5;
export const troopCount=city=>UNIT_TYPES.reduce((n,p)=>n+city.troops[p],0);
export const troopUpkeep=city=>UNIT_TYPES.reduce((n,p)=>n+city.troops[p]*UNIT_RULES[p].upkeep,0);
