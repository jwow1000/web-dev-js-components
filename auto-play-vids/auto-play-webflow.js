// *** things i learned
// for mobile the video tag needs playsinline flag
// <video loop="true" playsinline>



function adjustVolume(video, targetVolume, duration = 500, ramping) {
    // Unmute if ramping up the volume
    if (targetVolume > 0) { 
    	video.muted = false;
      ramping = true;
    }
    
    const startVolume = video.volume;
    const volumeDifference = targetVolume - startVolume;
    const stepTime = 50; // Time interval for each step in ms
    const steps = duration / stepTime;
    let currentStep = 0;
    
    const volumeInterval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        video.volume = Math.pow( startVolume + volumeDifference * progress, 2);
        
        if (currentStep >= steps) {
            clearInterval(volumeInterval);
            if (targetVolume === 0) {
            	video.muted = true; // Mute after ramping down
            	ramping = false;
            }
        }
    }, stepTime);
}


Webflow.push( function() {
	const movies = document.querySelectorAll(".video-loop");
	let volRamping = false;
  
  movies.forEach( (item) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          function handleClick( event ) {
            if( !volRamping ) {
            	if( item.muted ) {
                adjustVolume( item, 1, 500, volRamping );
              } else {
                adjustVolume( item, 0, 500, volRamping );
              }
            }
          }
          
          if (entry.isIntersecting) {
          		
              // make sure muted
              item.muted = true;
              item.volume = 0;
              
              // trigger play
              item.play();
              
             
              // add event listener
              if(!item.hasAttribute('data-click-added') ) {
                item.addEventListener("click", handleClick);
                item.setAttribute('data-click-added', true);
              }
              
          } else {
          		// pause playback
              item.pause();
              
              // mute the item
              item.muted = true;
              
              // remove event listener
              if(!item.hasAttribute('data-click-added') ) {
                item.removeEventListener("click", handleClick);
                item.removeAttribute('data-click-added');
              }
              
          }
        });
      }, { threshold: 0 });

      observer.observe(item);
  });
})
