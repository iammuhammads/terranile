(() => {
  const deck=document.querySelector('[data-panel-deck]');
  if(!deck)return;
  const viewport=deck.querySelector('[data-deck-viewport]');
  const track=deck.querySelector('[data-deck-track]');
  const cards=[...track.querySelectorAll('[data-deck-card]')];
  const tabs=[...deck.querySelectorAll('[data-deck-select]')];
  const pause=deck.querySelector('[data-deck-pause]');
  const status=deck.querySelector('[data-deck-status]');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let index=0,physical=1,timer,resetTimer,remaining=10000,lastStarted=0,manualPaused=reduced.matches,hovered=false,focused=false,inView=true,drag=null,suppressClick=false,wheel=0,wheelTime=0;
  function cloneCard(card){const clone=card.cloneNode(true);clone.removeAttribute('id');clone.setAttribute('aria-hidden','true');clone.setAttribute('data-deck-clone','');clone.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));clone.querySelectorAll('a,button').forEach(el=>el.setAttribute('tabindex','-1'));return clone}
  track.prepend(cloneCard(cards.at(-1)));track.append(cloneCard(cards[0]));
  function syncVideo(paused){[...track.children].forEach((card,i)=>{const video=card.querySelector('[data-deck-video]');if(!video)return;const active=i===physical&&!paused&&!reduced.matches;if(active){if(!video.getAttribute('src')){video.src=video.dataset.videoSrc;video.load()}video.muted=true;video.play().catch(()=>{})}else video.pause()})}
  const step=()=>cards[0].getBoundingClientRect().width+parseFloat(getComputedStyle(track).gap||'40');
  function position(animate=true,offset=0){track.style.transition=animate&&!reduced.matches?'':'none';track.style.transform=`translate3d(${-physical*step()+offset}px,0,0)`}
  function syncPause(){clearTimeout(timer);if(lastStarted){remaining=Math.max(0,remaining-(performance.now()-lastStarted));lastStarted=0}const paused=manualPaused||hovered||focused||!inView||document.hidden||!!drag;deck.classList.toggle('is-paused',paused);pause.setAttribute('aria-pressed',String(manualPaused));pause.textContent=manualPaused?'Play':'Pause';syncVideo(manualPaused||!inView||document.hidden||!!drag);if(!paused){lastStarted=performance.now();timer=setTimeout(()=>select(index+1),remaining)}}
  function update(announce){tabs.forEach((tab,i)=>{tab.classList.toggle('is-active',i===index);tab.setAttribute('aria-pressed',String(i===index));const bar=tab.querySelector('.deck-progress>span');bar.style.animation='none';bar.getBoundingClientRect();bar.style.animation=''});cards.forEach((card,i)=>card.querySelectorAll('a,button').forEach(link=>link.setAttribute('tabindex',i===index?'0':'-1')));if(announce)status.textContent=`${tabs[index].textContent.trim()}, panel ${index+1} of ${cards.length}`}
  function settle(){clearTimeout(resetTimer);if(physical===0){physical=cards.length;position(false)}else if(physical===cards.length+1){physical=1;position(false)}syncVideo(manualPaused||!inView||document.hidden||!!drag)}
  function select(next,announce=false){settle();clearTimeout(timer);remaining=10000;lastStarted=0;if(next<0){index=cards.length-1;physical=0}else if(next>=cards.length){index=0;physical=cards.length+1}else{index=next;physical=index+1}position();update(announce);if(reduced.matches)settle();else resetTimer=setTimeout(settle,730);syncPause()}
  tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>select(i,true));tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(i+1)%tabs.length;if(event.key==='ArrowLeft')next=(i-1+tabs.length)%tabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;if(next!==undefined){event.preventDefault();select(next,true);tabs[next].focus()}})});
  pause.addEventListener('click',()=>{manualPaused=!manualPaused;syncPause()});
  viewport.addEventListener('pointerdown',event=>{if(event.pointerType==='mouse'&&event.button!==0)return;settle();drag={id:event.pointerId,x:event.clientX,y:event.clientY,dx:0,moved:false};syncPause()});
  viewport.addEventListener('pointermove',event=>{if(!drag||event.pointerId!==drag.id)return;const dx=event.clientX-drag.x,dy=event.clientY-drag.y;if(!drag.moved&&Math.abs(dx)<8)return;if(!drag.moved&&Math.abs(dy)>Math.abs(dx)){drag=null;syncPause();return}drag.moved=true;drag.dx=dx;suppressClick=Math.abs(dx)>5;viewport.classList.add('is-dragging');viewport.setPointerCapture(event.pointerId);position(false,dx)});
  function finishDrag(event){if(!drag||event.pointerId!==drag.id)return;const dx=drag.dx,moved=drag.moved;drag=null;viewport.classList.remove('is-dragging');if(moved&&Math.abs(dx)>step()*.2)select(index+(dx<0?1:-1),true);else{position();syncPause()}setTimeout(()=>{suppressClick=false},0)}
  viewport.addEventListener('pointerup',finishDrag);viewport.addEventListener('pointercancel',finishDrag);
  viewport.addEventListener('dragstart',event=>event.preventDefault());
  viewport.addEventListener('click',event=>{if(suppressClick){event.preventDefault();event.stopPropagation()}},true);
  viewport.addEventListener('wheel',event=>{if(Math.abs(event.deltaX)<=Math.abs(event.deltaY))return;event.preventDefault();const now=performance.now();if(now-wheelTime>260)wheel=0;wheelTime=now;wheel+=event.deltaX;if(Math.abs(wheel)>=128){select(index+(wheel>0?1:-1),true);wheel=0}},{passive:false});
  deck.addEventListener('mouseenter',()=>{hovered=true;syncPause()});deck.addEventListener('mouseleave',()=>{hovered=false;syncPause()});
  deck.addEventListener('focusin',event=>{focused=!event.target.closest('[data-deck-pause]');syncPause()});deck.addEventListener('focusout',event=>{if(!deck.contains(event.relatedTarget)){focused=false;syncPause()}});
  document.addEventListener('visibilitychange',syncPause);
  reduced.addEventListener('change',event=>{manualPaused=event.matches;position(false);syncPause()});
  if('IntersectionObserver'in window)new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;syncPause()},{threshold:.2}).observe(viewport);
  window.addEventListener('resize',()=>{settle();position(false)});
  position(false);update(false);syncPause();
})();
