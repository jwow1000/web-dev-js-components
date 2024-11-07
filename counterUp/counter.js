<!-- custom count up code, added by jeremy 11/6/24 -->
<script>
// Function to create count-up animation
function steadyCount(elem, start, end, duration) {
  const startTime = performance.now();

  function ease(t, power) {
    // t is 0 - 1
    const invertT = 1 - t;
    const curve = Math.pow( invertT, power );
    const invert = 1 - curve;
    return invert
  }

  function update() {
      const now = performance.now();
      const elapsed = (now - startTime) / duration; // Calculate progress
      const easedProgress = ease(Math.min(elapsed, 1), 6); // Apply easing

      // Calculate the current value
      const currentValue = Math.round(start + (end - start) * easedProgress);

      // Update the element's text content
      elem.innerText = currentValue.toLocaleString();
      // console.log("the value: ", currentValue.toLocaleString());

      // Continue animation if not finished
      if (elapsed < 1) {
          requestAnimationFrame(update);
      }
  }

  // Start the animation
  requestAnimationFrame(update);
}

// define an array of objects with number id and target number to add counter effect
const ids = [
  { id: "#block-4c4528f82b751a1cd7fe", target: 5406 },
  { id: "#block-7a970e36fa7c8ccd3600", target: 158652 },
  { id: "#block-84f26f96c626af5e09fb", target: 2199 },
  { id: "#block-1d9be73e0963665547af", target: 114 },
];

// Add event listener on window load
window.addEventListener("load", function () {
  ids.forEach(item => {
    const numberElement = document.querySelector(`${item.id} .sqsrte-text-color--custom`);
    if (numberElement) {
      
      numberElement.dataset.target = item.target; // Set the target value for reference
      numberElement.innerText = "0"; // Start from zero
      numberElement.style.textAlign = "center";
	  
      // Create an IntersectionObserver to trigger the animation when in view
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Animate the count-up to the target number
            steadyCount(numberElement, 0, item.target, 3000); 
            observer.unobserve(numberElement); // Unobserve after animating
          }
        });
      });

      // Observe each number element
      observer.observe(numberElement);
    }
  });
});
</script>
<!-- end jeremy count up code -->
