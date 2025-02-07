<script>
  	
	document.addEventListener('DOMContentLoaded', function () {
    // Get elements
    const wrapper = document.querySelector('.custom-gallery-epp');
    const leftSide = document.querySelector('.epp-button-wrapper-left');
    const rightSide = document.querySelector('.epp-button-wrapper-right');
    const leftButton = document.querySelector('#epp-left');
    const rightButton = document.querySelector('#epp-right');
    const container = document.querySelector('.gallery-epp-scroll-container');
    const guideButtons = document.querySelector('.epp-guide-buttons-container');
    const selGB = document.querySelectorAll('.epp-guide-buttons');
    const g1 = document.querySelector('#epp-GB-1');
    const g2 = document.querySelector('#epp-GB-2');
    const g3 = document.querySelector('#epp-GB-3');
    const maxScroll = 3;
      
    function slide( newPos ) {
      position = newPos;
      if (position > maxScroll - 1) position = 0; // Prevent scrolling past end
      if (position < 0) position = maxScroll - 1; // Prevent scrolling past start
      
      container.style.transform = `translateX(${-position * (100 / maxScroll)}%)`;
      selGB.forEach((item) => {
      	item.style.opacity = 0.5;
      });
      if( position === 0 ) {
      	g1.style.opacity = 0.9; 
      } else if (position === 1) {
      	g2.style.opacity = 0.9;
      } else {
      	g3.style.opacity = 0.9;
      }
        
    }
    
    let position = 0;
    slide( position );
    
      
    guideButtons.addEventListener('click', (event) => {
        if( event.target.className === 'epp-guide-buttons') {
          position = parseInt( event.target.getAttribute('data-num'));
          slide( position-1 );
          console.log("check it ouutt", position, event.target);
        }  
    });
    // swiper detect for mobile
    let startX = 0;
    let startY = 0;
    let distX = 0;
    let distY = 0;

    wrapper.addEventListener('touchstart', (e) => {
        const touch = e.touches[0]; // Get the first touch
        startX = touch.clientX;     // Record the starting X position
        startY = touch.clientY;     // Record the starting Y position
    });

    wrapper.addEventListener('touchmove', (e) => {
        e.preventDefault(); // Prevent scrolling during the swipe
    }, { passive: false });

    wrapper.addEventListener('touchend', (e) => {
        const touch = e.changedTouches[0]; // Get the ending touch
        distX = touch.clientX - startX;    // Calculate the X distance
        distY = touch.clientY - startY;    // Calculate the Y distance

        // Determine the swipe direction
        if (Math.abs(distX) > Math.abs(distY) && Math.abs(distX) > 50) { // Horizontal swipe
            if (distX > 0) {
                
                position -= 1; // Move left
                slide( position );
            } else {
                
                position += 1; // Move right
                slide( position );
               
            }
        }
    });
    
    // add event listeners on the arrow buttons and the sides(20%) of the entire slider
    rightSide.addEventListener('click', () => {
        position += 1; // Move right
        slide( position );
    });

    leftSide.addEventListener('click', () => {
        position -= 1; // Move left
        slide( position );
    });
      
    rightButton.addEventListener('click', () => {
        position += 1; // Move right
        slide( position );
    });

    leftButton.addEventListener('click', () => {
        position -= 1; // Move left
        slide( position );
    });
});
</script>
