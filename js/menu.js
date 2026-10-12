// Ortak menü: telefonda "Menü" düğmesi tam ekran listeyi açar/kapatır; bulunulan sayfa işaretlenir
(function(){
  var root=document.documentElement, btn=document.querySelector('.menu-btn'), mm=document.getElementById('mmenu');
  if(!btn||!mm) return;
  var label=btn.querySelector('span');
  function set(open){
    root.classList.toggle('menu-open',open); btn.setAttribute('aria-expanded',open?'true':'false'); mm.setAttribute('aria-hidden',open?'false':'true');
    if(label) label.textContent=open?'Kapat':'Menü';
    if(window.__lenis){ open?window.__lenis.stop():window.__lenis.start(); }
  }
  btn.addEventListener('click',function(){ set(!root.classList.contains('menu-open')); });
  mm.addEventListener('click',function(e){ if(e.target.closest('a')) set(false); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') set(false); });
  var here=(location.pathname.split('/').pop()||'index.html');
  mm.querySelectorAll('a').forEach(function(a){ if(a.getAttribute('href')===here) a.setAttribute('aria-current','page'); });
})();
