// Function to create count-up animation
function steadyCount(elem, start, end, duration) {
  // Prevent multiple animations on the same element
  if (elem.dataset.animating === 'true') return;
  
  elem.dataset.animating = 'true';
  const startTime = performance.now();
  const updateInterval = 3;
  let frameCounter = 0;
  
  function ease(t, power) {
    return 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), power);
  }
  
  function update() {
    const now = performance.now();
    const elapsed = (now - startTime) / duration;
    const easedProgress = ease(elapsed, 6);
    
    // Ensure we don't exceed the target value
    const currentValue = Math.min(
      Math.round(start + (end - start) * easedProgress),
      end
    );
    
    if (frameCounter % updateInterval === 0) {
      elem.innerText = currentValue.toLocaleString();
    }
    
    frameCounter++;
    
    if (elapsed < 1) {
      requestAnimationFrame(update);
    } else {
      // Ensure final value is exactly the target
      elem.innerText = end.toLocaleString();
      elem.dataset.animating = 'false';
    }
  }
  
  requestAnimationFrame(update);
}

// Initialize animations
// make sure script runs only once
let hasRun = false;
  
window.addEventListener("load", function () {
  if (hasRun) return;
  hasRun = true;
  // select the number elements
  const items = document.querySelectorAll('.homePage-countUp');
  
  items.forEach(item => {
    const time = item.getAttribute('data-time');
    const target = item.getAttribute('data-target');
    console.log("check values", item, time, target);
    // Intersection observer for animation
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && numberElement.dataset.animating !== 'true') {
          steadyCount(numberElement, 0, target, time); // Start the animation
          observer.unobserve(numberElement); // Stop observing once animated
        }
      });
    }, {
      threshold: 0.1
    });

    observer.observe(numberElement);
  });
});