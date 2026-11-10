import {execFileSync} from 'node:child_process';
import {existsSync,mkdirSync,writeFileSync} from 'node:fs';
import {homedir} from 'node:os';
import path from 'node:path';
import {URL,PROJECT_ROOT,SERVICE_LABEL} from './local-config.mjs';

const action=process.argv[2]||'start';
const agent=path.join(homedir(),'Library/LaunchAgents',`${SERVICE_LABEL}.plist`);
const logs=path.join(homedir(),'Library/Logs/Crownlands');
const domain=`gui/${process.getuid?.()}`,target=`${domain}/${SERVICE_LABEL}`;
const run=(...args)=>execFileSync('/bin/launchctl',args,{encoding:'utf8',stdio:['ignore','pipe','pipe']});
const loaded=()=>{try{return run('print',target);}catch{return null;}};
const xml=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');

async function waitForServer(){
  for(let attempt=0;attempt<50;attempt++){
    try{const r=await fetch(`${URL}/__crownlands/health`,{signal:AbortSignal.timeout(500)});const h=await r.json();if(r.ok&&h.app==='crownlands'&&h.url===URL)return h;}catch{}
    await new Promise(resolve=>setTimeout(resolve,200));
  }
  throw new Error(`Server chưa sẵn sàng tại ${URL}. Xem ${logs}/stderr.log; không tự đổi port.`);
}

function install(){
  execFileSync(process.execPath,[path.join(PROJECT_ROOT,'scripts/build.mjs')],{cwd:PROJECT_ROOT,stdio:'inherit'});
  mkdirSync(path.dirname(agent),{recursive:true});mkdirSync(logs,{recursive:true});
  const node=existsSync('/opt/homebrew/opt/node@22/bin/node')?'/opt/homebrew/opt/node@22/bin/node':process.execPath;
  const plist=`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
<key>Label</key><string>${SERVICE_LABEL}</string>
<key>ProgramArguments</key><array><string>${xml(node)}</string><string>${xml(path.join(PROJECT_ROOT,'scripts/serve.mjs'))}</string></array>
<key>WorkingDirectory</key><string>${xml(PROJECT_ROOT)}</string>
<key>RunAtLoad</key><true/>
<key>KeepAlive</key><true/>
<key>ThrottleInterval</key><integer>10</integer>
<key>ProcessType</key><string>Background</string>
<key>StandardOutPath</key><string>${xml(path.join(logs,'stdout.log'))}</string>
<key>StandardErrorPath</key><string>${xml(path.join(logs,'stderr.log'))}</string>
</dict></plist>
`;
  writeFileSync(agent,plist,{mode:0o644});
  execFileSync('/usr/bin/plutil',['-lint',agent],{stdio:'inherit'});
  if(loaded())run('bootout',target);
  run('enable',target);run('bootstrap',domain,agent);
}

try{
  if(process.platform!=='darwin')throw new Error('Chế độ tự chạy nền này dùng macOS. Chạy npm run preview để mở server thủ công trên hệ khác.');
  if(action==='stop'){
    run('disable',target);if(loaded())run('bootout',target);console.log('Đã tắt Crownlands chạy nền và tự khởi động.');
  }else if(action==='status'){
    const state=loaded();console.log(state||'Crownlands chưa chạy nền.');if(state)console.log(JSON.stringify(await waitForServer()));
  }else if(action==='install'||action==='start'){
    if(action==='install'||!existsSync(agent))install();
    else if(!loaded()){run('enable',target);run('bootstrap',domain,agent);}
    const health=await waitForServer();console.log(`Crownlands luôn dùng ${URL} · PID ${health.pid} · tự chạy khi đăng nhập macOS.`);
  }else throw new Error('Dùng start, install, stop hoặc status.');
}catch(e){console.error(e.stderr?.toString().trim()||e.message);process.exitCode=1;}
