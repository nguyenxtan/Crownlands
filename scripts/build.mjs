import {cp,readFile,writeFile,mkdir,rm,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..'),dist=path.join(root,'dist');
await rm(dist,{recursive:true,force:true});await mkdir(dist,{recursive:true});
await cp(path.join(root,'app'),dist,{recursive:true});
await mkdir(path.join(dist,'data'),{recursive:true});
await cp(path.join(root,'project-docs/prototype/scenarios/first-foundation.json'),path.join(dist,'data/scenario.json'));
await cp(path.join(root,'project-docs/asset-production/city-layout.json'),path.join(dist,'data/city-layout.json'));
async function files(dir){const all=[];for(const e of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())all.push(...await files(p));else all.push(p);}return all;}
const list=(await files(dist)).sort(),hash=createHash('sha256');
for(const file of list){
  const name=path.relative(dist,file).split(path.sep).join('/');
  const digest=createHash('sha256').update(await readFile(file)).digest('hex');
  hash.update(JSON.stringify([name,digest]));
}
const version=hash.digest('hex').slice(0,16),urls=list.map(f=>'./'+path.relative(dist,f).split(path.sep).join('/'));
const sw=`const CACHE='crownlands-${version}';const FILES=${JSON.stringify(urls)};
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('crownlands-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(caches.open(CACHE).then(async c=>{const u=new URL(e.request.url);if(e.request.mode==='navigate')return (await c.match('./index.html'))||fetch(e.request);u.search='';return (await c.match(u.href))||fetch(e.request);}));});`;
await writeFile(path.join(dist,'sw.js'),sw);console.log(`Built ${list.length} local files · ${version}`);
