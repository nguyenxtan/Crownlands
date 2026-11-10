import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createGame,advanceGame,upgradePlot,recruitUnits,SCALE,MAX_TIME} from '../app/src/game.js';
import {economySnapshot,forecastEconomy} from '../app/src/economy.js';
const scenario=JSON.parse(readFileSync(new URL('../project-docs/prototype/scenarios/first-foundation.json',import.meta.url)));
const fresh=()=>createGame(scenario),home=game=>game.cities[0];

test('hall snapshot separates each local resource, gross production, paid upkeep and cumulative investment',()=>{
  const game=fresh(),city=home(game);game.cities[1].stock.grain=0;
  const snapshot=economySnapshot(game,city.id);
  assert.deepEqual(snapshot.resources.grain,{stock:1800*SCALE,capacity:6000*SCALE,production:400,upkeep:52,net:348,ledger:{produced:0,upkeep:0,overflow:0,unmet:0,spent:0,sent:0,received:0,discarded:0}});
  assert.equal(snapshot.resources.wood.net,400);assert.equal(snapshot.resources.wood.upkeep,0);
  recruitUnits(game,city.id,'sword-i',3);upgradePlot(game,city.id,'R04');
  const updated=economySnapshot(game,city.id);
  assert.equal(updated.queuedTroops,3);assert.equal(updated.queuedUpkeep,3);assert.equal(updated.localUpkeep,52);assert.equal(updated.troops,52);
  assert.equal(updated.resources.grain.stock,1750*SCALE);assert.equal(updated.resources.grain.ledger.spent,50*SCALE);
  assert.equal(updated.resources.grain.upkeep,52);
});

test('forecast follows individual completions and simultaneous upgrade boundaries without another payment',()=>{
  const game=fresh(),city=home(game);game.clock.paused=true;game.clock.speed=8;
  recruitUnits(game,city.id,'sword-i',3);upgradePlot(game,city.id,'R04');
  const before=structuredClone(game),at120=forecastEconomy(game,city.id,120),at121=forecastEconomy(game,city.id,121);
  assert.equal(at120.resources.grain.stock,6341640000);assert.equal(at121.resources.grain.stock,6342010000);
  assert.equal(at120.resources.grain.net,370);assert.equal(at120.resources.grain.upkeep,(52*40+53*40+54*40)*1000);
  const independent=structuredClone(game);advanceGame(independent,3600);const hour=forecastEconomy(game,city.id);
  for(const resource of ['wood','clay','iron','grain']){
    assert.equal(hour.resources[resource].stock,home(independent).stock[resource]);
    assert.equal(home(independent).ledger[resource].spent,city.ledger[resource].spent);
  }
  assert.deepEqual(game,before);
});

test('full storage forecast separates net rate, actual stock growth and overflow after upkeep',()=>{
  const game=fresh(),city=home(game);city.stock.grain=6000*SCALE;
  const grain=forecastEconomy(game,city.id).resources.grain;
  assert.equal(grain.stock,6000*SCALE);assert.equal(grain.change,0);assert.equal(grain.net,348);
  assert.equal(grain.produced,400*SCALE);assert.equal(grain.upkeep,52*SCALE);assert.equal(grain.overflow,348*SCALE);
  assert.equal(grain.fullIn,0);
});

test('storage ETA accounts for an upgrade before the warehouse fills',()=>{
  const game=fresh(),city=home(game);upgradePlot(game,city.id,'R01');
  const snapshot=economySnapshot(game,city.id),forecast=forecastEconomy(game,city.id,60),after120=structuredClone(game);
  advanceGame(after120,120);
  const expected=120+Math.ceil((4000*SCALE-home(after120).stock.wood)/(425*1000));
  assert.equal(forecast.resources.wood.fullIn,expected);
  const edge=structuredClone(game);advanceGame(edge,expected-1);assert.ok(home(edge).stock.wood<4000*SCALE);
  advanceGame(edge,1);assert.equal(home(edge).stock.wood,4000*SCALE);
  assert.equal(snapshot.resources.wood.net,400);
});

test('a paid paused order and a different same-time save produce fresh forecasts',()=>{
  const game=fresh(),city=home(game);game.clock.paused=true;
  const initial=forecastEconomy(game,city.id);recruitUnits(game,city.id,'sword-i',2);
  const paid=forecastEconomy(game,city.id);assert.notEqual(paid.resources.iron.stock,initial.resources.iron.stock);
  assert.equal(paid.resources.grain.net,346);assert.equal(game.time,0);
  const replacement=fresh();upgradePlot(replacement,home(replacement).id,'R04');
  const restored=forecastEconomy(replacement,home(replacement).id);assert.equal(restored.resources.grain.net,373);
  assert.notEqual(restored.resources.grain.stock,paid.resources.grain.stock);
});

test('forecasts clamp to the remaining trial and cumulative ledger conserves actual stock',()=>{
  const game=fresh(),city=home(game);recruitUnits(game,city.id,'spear-i',2);upgradePlot(game,city.id,'R04');advanceGame(game,20000);
  const summary=economySnapshot(game,city.id);
  for(const resource of ['wood','clay','iron','grain']){
    const ledger=summary.resources[resource].ledger;
    assert.equal(summary.resources[resource].stock,scenario.settlements[0].stock[resource]*SCALE+ledger.produced-ledger.upkeep-ledger.overflow-ledger.spent);
  }
  advanceGame(game,MAX_TIME-game.time-10);const forecast=forecastEconomy(game,city.id,3600);
  assert.equal(forecast.seconds,10);assert.equal(forecast.ends,MAX_TIME);
  advanceGame(game,10);assert.equal(forecastEconomy(game,city.id).seconds,0);
  assert.throws(()=>forecastEconomy(game,city.id,-1),/dự báo/);assert.throws(()=>economySnapshot(game,'missing'),/thành/);
});
test('a scheduled field return changes the granary full-time forecast at arrival',async()=>{
  const {sendArmy}=await import('../app/src/game.js');const game=fresh();
  sendArmy(game,scenario,'clay-near',{'sword-i':12,'spear-i':0,'archer-i':0},2);
  const before=structuredClone(game),forecast=forecastEconomy(game,home(game).id);
  assert.equal(forecast.resources.grain.fullIn,43449);assert.deepEqual(game,before);
});
