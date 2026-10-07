(() => {
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const states=new Map();
  function sync(state){const playing=state.visible&&!state.paused&&!document.hidden;if(playing){if(!state.video.getAttribute('src')){state.video.src=state.video.dataset.src;state.video.load()}state.video.muted=true;state.video.play().catch(()=>{state.paused=true;state.button.textContent='Play video';state.button.setAttribute('aria-pressed','true')})}else state.video.pause();state.button.textContent=state.paused?'Play video':'Pause video';state.button.setAttribute('aria-pressed',String(state.paused))}
  document.querySelectorAll('[data-city-film]').forEach(figure=>{const video=figure.querySelector('video'),button=figure.querySelector('[data-city-film-toggle]');const state={video,button,visible:false,paused:reduced.matches};states.set(video,state);sync(state);button.addEventListener('click',()=>{state.paused=!state.paused;sync(state)})});
  if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{const state=states.get(entry.target);state.visible=entry.isIntersecting;sync(state)}),{threshold:.15});states.forEach(state=>observer.observe(state.video))}else states.forEach(state=>{state.visible=true;sync(state)});
  document.addEventListener('visibilitychange',()=>states.forEach(sync));
  reduced.addEventListener('change',event=>{if(event.matches)states.forEach(state=>{state.paused=true;sync(state)})});
})();
