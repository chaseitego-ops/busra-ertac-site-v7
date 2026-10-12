// Alt sayfalar: menü harf animasyonu, görünürken beliren öğeler, başvuru konusunu ana sayfadaki forma taşıma
(function(){
  document.querySelectorAll('.roll').forEach(function(el){var t=el.textContent;el.textContent='';el.setAttribute('aria-label',t);t.split('').forEach(function(ch,i){var s=document.createElement('span');s.className='lt';s.textContent=ch;s.setAttribute('data-c',ch);s.setAttribute('aria-hidden','true');s.style.setProperty('--n',i);el.appendChild(s)})});
  var els=document.querySelectorAll('.rv');
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('on')})}
  else{var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('on');io.unobserve(x.target)}})},{rootMargin:'0px 0px -8% 0px'});els.forEach(function(e){io.observe(e)})}
  document.querySelectorAll('[data-topic]').forEach(function(a){a.addEventListener('click',function(){try{sessionStorage.setItem('konu',a.getAttribute('data-topic'))}catch(e){}})});
  // iletişim sayfasındaki harita (yaklaşınca yüklenir)
  var map=document.getElementById('map');
  if(map&&'IntersectionObserver' in window){ var mo=new IntersectionObserver(function(en){ if(!en[0].isIntersecting) return; mo.disconnect();
    var css=document.createElement('link'); css.rel='stylesheet'; css.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'; document.head.appendChild(css);
    var sc=document.createElement('script'); sc.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'; sc.onload=function(){ var pos=[40.9576214,29.0962183];
      var m=L.map(map,{center:pos,zoom:16,scrollWheelZoom:false,dragging:!L.Browser.mobile,tap:false}); L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap'}).addTo(m);
      L.marker(pos,{icon:L.divIcon({className:'',html:'<div class="mpin"></div>',iconSize:[18,18],iconAnchor:[9,9]}),title:'Bostancı ofisi'}).addTo(m); }; document.body.appendChild(sc);
  },{rootMargin:'400px 0px'}); mo.observe(map); }

  // kapanış kavisi: düz başlar, yükselir, yeniden düzleşir (ana sayfadakiyle aynı)
  var end=document.querySelector('.end'), curve=end&&end.querySelector('.curve');
  if(curve&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    var cur=0, tgt=0, run=false, ease=function(t){return .5-.5*Math.cos(Math.PI*t)};
    var calc=function(){ var p=(innerHeight-end.getBoundingClientRect().top)/Math.min(innerHeight*.88,end.offsetHeight-2); p=Math.max(0,Math.min(1,p)); tgt=p<.5?ease(p*2):ease((1-p)*2); if(!run){run=true;requestAnimationFrame(step)} };
    var step=function(){ cur+=(tgt-cur)*.14; if(Math.abs(tgt-cur)<.002) cur=tgt; curve.style.transform='scaleY('+cur.toFixed(4)+')'; if(cur!==tgt) requestAnimationFrame(step); else run=false; };
    curve.style.transform='scaleY(0)'; addEventListener('scroll',calc,{passive:true}); addEventListener('resize',calc); calc();
  }
})();
