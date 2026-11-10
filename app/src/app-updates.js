export async function installAppUpdates({button,status,beforeReload,onSaveFailure}){
  if(!('serviceWorker'in navigator))return;
  let controller=navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener('controllerchange',()=>{
    const next=navigator.serviceWorker.controller;
    // The first offline installation serves the app already on screen.
    if(controller&&next&&next!==controller){button.hidden=false;status.textContent='● Có bản cập nhật';}
    controller=next;
  });
  button.addEventListener('click',()=>{
    if(!beforeReload()){onSaveFailure();return;}
    window.location.reload();
  });
  try{
    await navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'});
    await navigator.serviceWorker.ready;
    if(button.hidden)status.textContent='● Sẵn sàng chơi offline';
  }catch{if(button.hidden)status.textContent='Chưa tải đủ để chơi offline';}
}
