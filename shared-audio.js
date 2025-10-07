
window.sharedAudio = (function(){
  function startAndRemember(audioEl){
    try { audioEl.currentTime = 0; audioEl.play(); } catch(e){}
    localStorage.setItem('musicPlaying','true');
    localStorage.setItem('userInteracted','true');
  }
  function tryResume(audioEl){
    const want = localStorage.getItem('musicPlaying')==='true';
    const interacted = localStorage.getItem('userInteracted')==='true';
    if(!want || !interacted) return;
    const onInteract = () => {
      audioEl.play().catch(()=>{});
      window.removeEventListener('pointerdown', onInteract);
      window.removeEventListener('keydown', onInteract);
    };
    audioEl.play().catch(()=> {
      window.addEventListener('pointerdown', onInteract, {once:true});
      window.addEventListener('keydown', onInteract, {once:true});
    });
  }
  return { startAndRemember, tryResume };
})();
