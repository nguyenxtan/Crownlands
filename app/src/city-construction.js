// Construction is a live UI layer, independent of the underlying building art.
export const CONSTRUCTION_MARKUP=`<span class="construction-frame" aria-hidden="true"><svg viewBox="0 0 100 82" fill="none"><path d="M14 19v52m71-55v51M13 34l73-4M13 59l73-5M15 58l27-26m17 24l25-26" stroke="#51452e" stroke-width="6" stroke-linecap="round"/><path d="M14 19v52m71-55v51M13 34l73-4M13 59l73-5M15 58l27-26m17 24l25-26" stroke="#c29559" stroke-width="3" stroke-linecap="round"/><path d="M11 35h7m63-4h8M11 59h7m63-4h8" stroke="#e4c38d" stroke-width="2"/></svg></span><span class="site-work-marker" aria-hidden="true"><span class="site-work-caption"><svg class="site-work-hammer" viewBox="0 0 20 20" fill="none"><path d="m4 16 8-8M9 4l3-2 6 6-3 3-6-7Z" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg><svg class="site-work-pause" viewBox="0 0 20 20" fill="currentColor"><path d="M4 3h4v14H4zm8 0h4v14h-4z"/></svg><span class="site-work-action"></span><time class="site-work-clock"></time></span><span class="site-work-meter"><i></i></span></span>`;

export function updateConstruction(button,job,time,paused){
  const marker=button.querySelector('.site-work-marker'),remaining=Math.max(0,job.ends-time);
  const total=Math.max(1,job.ends-job.started),progress=Math.min(100,Math.max(0,(time-job.started)/total*100));
  const label=`${String(Math.floor(remaining/60)).padStart(2,'0')}:${String(remaining%60).padStart(2,'0')}`;
  marker.querySelector('time').textContent=label;marker.querySelector('time').dateTime=`PT${remaining}S`;
  marker.querySelector('.site-work-action').textContent=paused?'TẠM DỪNG':'ĐANG NÂNG';
  marker.style.setProperty('--site-work-progress',`${progress}%`);
  button.title=`${paused?'Tạm dừng nâng cấp':'Đang nâng cấp'} · Còn ${label} thời gian game`;
}
