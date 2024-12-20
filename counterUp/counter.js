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

// Define number targets, this is some squarespace stuff
const ids = [
  { id: "#block-4c4528f82b751a1cd7fe", target: 5406, time: 3000 },
  { id: "#block-7a970e36fa7c8ccd3600", target: 158652, time: 3000 },
  { id: "#block-84f26f96c626af5e09fb", target: 2199, time: 3000 },
  { id: "#block-1d9be73e0963665547af", target: 114, time: 6000 },
];

// Initialize animations
window.addEventListener("load", function() {
  ids.forEach(item => {
    const numberElement = document.querySelector(`${item.id} .sqsrte-text-color--custom`);
    if (numberElement) {
      numberElement.dataset.target = item.target;
      numberElement.innerText = "0";
      numberElement.style.textAlign = "center";
      
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && numberElement.dataset.animating !== 'true') {
            steadyCount(numberElement, 0, item.target, item.time);
            observer.unobserve(numberElement);
          }
        });
      }, {
        threshold: 0.1
      });
      
      observer.observe(numberElement);
    }
  });
});