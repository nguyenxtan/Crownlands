import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { SCALE, MAX_TIME, FIELD_SECONDS, createGame, advanceGame, elapse, rates, upgradePlot, plotOffer } from '../app/src/game.js';
const scenario = JSON.parse(readFileSync(new URL('../project-docs/prototype/scenarios/first-foundation.json', import.meta.url)));
const fresh = () => createGame(scenario);
const home = g => g.cities[0];

test('S00 starts with sixteen fields, fourteen slots and grain net 348/hour', () => {
  const g = fresh(), c = home(g);
  assert.equal(c.plots.length, 16); assert.equal(Object.keys(c.buildings).length, 14);
  assert.equal(c.stock.grain, 1800 * SCALE); assert.equal(c.stock.iron, 1200 * SCALE);
  assert.deepEqual(rates(c), {wood:400, clay:400, iron:400, grain:348});
});
test('upgrade deducts the full cost once; a repeated click leaves state unchanged', () => {
  const g = fresh(); upgradePlot(g, home(g).id, 'R04');
  assert.equal(home(g).stock.wood, 1120*SCALE); assert.equal(home(g).stock.grain,1780*SCALE);
  const before = structuredClone(g);
  assert.throws(() => upgradePlot(g, home(g).id, 'R04'), /đang/);
  assert.deepEqual(g,before); assert.equal(g.jobs.length,1);
});
test('unaffordable and foreign-city commands cannot alter assets', () => {
  const g = fresh(); home(g).stock.iron=0; const before = structuredClone(g);
  assert.equal(plotOffer(g, home(g).id,'R04').allowed,false);
  assert.throws(() => upgradePlot(g, home(g).id,'R04'), /đủ/); assert.deepEqual(g,before);
  assert.throws(() => upgradePlot(g,g.cities[1].id,'R04'), /quyền/);
});
test('job completes at 120 seconds and the improved rate applies only afterward', () => {
  const g=fresh(); upgradePlot(g,home(g).id,'R04'); advanceGame(g,119);
  assert.equal(home(g).plots[3].level,1); advanceGame(g,1);
  assert.equal(home(g).plots[3].level,2); assert.equal(g.jobs.length,0);
  assert.equal(home(g).stock.grain,1780*SCALE+348*1000*120);
  advanceGame(g,3480);
  assert.equal(home(g).stock.grain,1780*SCALE+348*1000*120+373*1000*3480);
  const before=structuredClone(g); assert.throws(()=>upgradePlot(g,home(g).id,'R04'), /bản thử/);
  assert.deepEqual(g,before);
});
test('net-before-clamp keeps a full granary full, independent of segment size', () => {
  const results=[1,2,4].map(n=>{const g=fresh();home(g).stock.grain=6000*SCALE;
    for(let i=0;i<n;i++)advanceGame(g,3600/n);return g;});
  for(const g of results)assert.equal(home(g).stock.grain,6000*SCALE);
  assert.deepEqual(results[0],results[2]);
});
test('large advances and one-second advances yield identical stock, jobs and event history', () => {
  const a=fresh(), b=fresh();
  for(const g of [a,b]) { upgradePlot(g,home(g).id,'R04');upgradePlot(g,home(g).id,'R01'); }
  advanceGame(a,20000); for(let i=0;i<20000;i++)advanceGame(b,1);
  assert.deepEqual(a,b);
});
test('pause freezes the world and each speed reaches the same logical result', () => {
  const g=fresh();g.clock.paused=true;elapse(g,60000);assert.equal(g.time,0);
  const results=[1,2,4,8].map(speed=>{const a=fresh();a.clock.speed=speed;elapse(a,120000/speed);a.clock.speed=1;return a;});
  results.forEach(a=>assert.deepEqual(a,results[0]));
});
test('millisecond carry survives small frames without creating or losing game seconds',()=>{
  const a=fresh(), b=fresh(); a.clock.speed=b.clock.speed=8;
  for(let i=0;i<1000;i++)elapse(a,17);elapse(b,17000);assert.deepEqual(a,b);
  assert.throws(()=>advanceGame(a,-1)); assert.throws(()=>elapse(a,NaN));
});
test('upgrade offers stop when the trial cannot finish a new job',()=>{
  const g=fresh();
  advanceGame(g,MAX_TIME-FIELD_SECONDS);
  assert.equal(plotOffer(g,home(g).id,'R04').allowed,true);
  upgradePlot(g,home(g).id,'R04');
  advanceGame(g,1);
  const before=structuredClone(g),offer=plotOffer(g,home(g).id,'R01');
  assert.equal(offer.allowed,false);
  assert.match(offer.reason,/thời gian/);
  assert.throws(()=>upgradePlot(g,home(g).id,'R01'),/thời gian/);
  assert.deepEqual(g,before);
  advanceGame(g,FIELD_SECONDS-1);
  assert.equal(home(g).plots[3].level,2);
  assert.equal(g.jobs.length,0);
});
