
// Script general
document.addEventListener('DOMContentLoaded', ()=>{
  const yr = new Date().getFullYear();
  const yEls = ['year','year2','year3','year4'];
  yEls.forEach(id=>{ const el=document.getElementById(id); if(el) el.innerText = yr; });
});
