import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,copyFile,writeFile,readFile,rename,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

test('offline cache version includes asset paths and stays stable for identical builds',async()=>{
  const root=await mkdtemp(path.join(tmpdir(),'crownlands-build-'));
  try{
    for(const dir of ['scripts','app/assets','project-docs/prototype/scenarios','project-docs/asset-production'])await mkdir(path.join(root,dir),{recursive:true});
    const script=path.join(root,'scripts/build.mjs');
    await copyFile(new URL('../scripts/build.mjs',import.meta.url),script);
    await writeFile(path.join(root,'app/index.html'),'<p>Crownlands</p>');
    await writeFile(path.join(root,'app/assets/old.svg'),'<svg/>');
    await writeFile(path.join(root,'project-docs/prototype/scenarios/first-foundation.json'),'{}');
    await writeFile(path.join(root,'project-docs/asset-production/city-layout.json'),'{}');
    const build=async()=>{
      execFileSync(process.execPath,[script],{stdio:'pipe'});
      return readFile(path.join(root,'dist/sw.js'),'utf8');
    };
    const first=await build();
    assert.equal(await build(),first);
    await rename(path.join(root,'app/assets/old.svg'),path.join(root,'app/assets/new.svg'));
    const renamed=await build();
    const cache=sw=>sw.match(/const CACHE='([^']+)'/)[1];
    assert.notEqual(cache(renamed),cache(first),'renaming a cached file must create a new cache');
    assert.match(renamed,/\.\/assets\/new\.svg/);
    assert.doesNotMatch(renamed,/\.\/assets\/old\.svg/);
  }finally{await rm(root,{recursive:true,force:true});}
});
