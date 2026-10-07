(() => {
  document.querySelectorAll('[data-ecosystem]').forEach(root => {
    const panels=[...root.querySelectorAll('[data-ecosystem-panel]')];
    const buttons=[...root.querySelectorAll('[data-ecosystem-select]')];
    const canvas=root.querySelector('[data-ecosystem-canvas]');
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    let index=0, hoverTimer, start;
    function select(next){
      next=(next+panels.length)%panels.length;
      if(next===index)return;
      panels[index].hidden=true;
      panels[index].classList.remove('is-active');
      index=next;
      panels[index].hidden=false;
      panels[index].classList.add('is-active');
      if(!reduced.matches)panels[index].animate([{opacity:0,transform:'translateY(7px)'},{opacity:1,transform:'translateY(0)'}],{duration:320,easing:'ease-out'});
      buttons.forEach((button,i)=>{button.classList.toggle('is-active',i===index);button.setAttribute('aria-pressed',String(i===index));});
    }
    buttons.forEach((button,i)=>{
      button.addEventListener('click',()=>{clearTimeout(hoverTimer);select(i);});
      button.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'){clearTimeout(hoverTimer);hoverTimer=setTimeout(()=>select(i),180);}});
      button.addEventListener('pointerleave',()=>clearTimeout(hoverTimer));
      button.addEventListener('keydown',event=>{
        const next=event.key==='ArrowRight'?i+1:event.key==='ArrowLeft'?i-1:event.key==='Home'?0:event.key==='End'?buttons.length-1:null;
        if(next!==null){event.preventDefault();clearTimeout(hoverTimer);select(next);buttons[index].focus();}
      });
    });
    canvas.addEventListener('touchstart',event=>{const t=event.touches[0];start={x:t.clientX,y:t.clientY};},{passive:true});
    canvas.addEventListener('touchend',event=>{if(!start)return;const t=event.changedTouches[0],dx=t.clientX-start.x,dy=t.clientY-start.y;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.5)select(index+(dx<0?1:-1));start=null;},{passive:true});
    canvas.addEventListener('touchcancel',()=>{start=null;},{passive:true});
    // All product information remains readable when scripting is unavailable.
    root.classList.add('ecosystem-ready');
  });
})();
