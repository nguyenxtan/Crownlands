import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {HOST,PORT,URL,PROJECT_ROOT} from './local-config.mjs';
const root=path.join(PROJECT_ROOT,'dist');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml'};
const server=http.createServer(async(req,res)=>{try{
  const url=new globalThis.URL(req.url,URL);
  if(url.pathname==='/__crownlands/health'){
    res.writeHead(200,{'Content-Type':'application/json','Cache-Control':'no-store'});
    res.end(JSON.stringify({app:'crownlands',url:URL,pid:process.pid}));return;
  }
  const name=decodeURIComponent(url.pathname),file=path.resolve(root,'.'+(name==='/'?'/index.html':name));
  if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
  if(!(await stat(file)).isFile())throw new Error('not a file');
  res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});res.end(await readFile(file));
}catch{res.writeHead(404);res.end('Not found');}});
server.on('error',e=>{
  console.error(e.code==='EADDRINUSE'?`Port ${PORT} đang được dùng. Crownlands giữ cố định ${URL}; không tự đổi port.`:e.message);
  process.exitCode=1;
});
server.listen(PORT,HOST,()=>console.log(`Crownlands: ${URL}`));
