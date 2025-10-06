window.sharedAudio = (function(){
  function userClickUnmute(audio){
    const handler = ()=>{
      try{
        audio.muted = false;
        if (audio.paused) audio.play().catch(()=>{});
      }catch(e){}
      window.removeEventListener('click', handler, {once:true});
      window.removeEventListener('keydown', handler, {once:true});
    };
    window.addEventListener('click', handler, {once:true});
    window.addEventListener('keydown', handler, {once:true});
  }

  function tryResume(audio){
    if (!audio) return;
    const played = localStorage.getItem('musicPlaying') === 'true';
    if (played){
      audio.muted = false;
      audio.play().catch(()=>{
        audio.muted = true;
        audio.play().catch(()=>{});
        userClickUnmute(audio);
      });
    } else {
      audio.muted = true;
      try { audio.play().catch(()=>{}); } catch(e){}
      userClickUnmute(audio);
    }
  }

  function startAndRemember(audio){
    if (!audio) return;
    audio.muted = false;
    audio.play().then(()=>{
      localStorage.setItem('musicPlaying','true');
      localStorage.setItem('userInteracted','true');
    }).catch(()=>{
      audio.muted = true;
      audio.play().catch(()=>{});
      userClickUnmute(audio);
      localStorage.setItem('musicPlaying','true');
      localStorage.setItem('userInteracted','true');
    });
  }

  return { tryResume, startAndRemember };
})();
