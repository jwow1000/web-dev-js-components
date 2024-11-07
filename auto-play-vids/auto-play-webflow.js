
Webflow.push( function() {
	const movies = document.querySelectorAll(".video-loop");

  movies.forEach( (item) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          function handleClick( event ) {
            item.muted = !item.muted;
          }
          
          if (entry.isIntersecting) {
          		console.log('entry?: ', entry);
              // make sure muted
              item.muted = true;
              
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

