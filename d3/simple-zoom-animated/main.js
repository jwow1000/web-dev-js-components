 // start entire process when DOM is loaded
 document.addEventListener("DOMContentLoaded", function () {
  // select the svg
  const mySvg = d3.select("#svg-zoom-circles");
  // console.log("check out the svg: ", mySvg);
  
  // select all the circles which are groups
  const theCircles = d3.selectAll('.data-circle');
  console.log("the Circles: ", theCircles);
  
  // original viewbox for zooming out
  const originalViewBox = "0 0 489.47 324"; // Store the original viewBox
  // set transition time in ms
  const animationTime = 1000;
  // set automation time in ms
  const autoTime = 5000;
  // set zoom out delay in ms
  const zoomOutTime = 8000;
  let currentIndex = 0;
  let automationInterval;
  
  // Zoom function
  function zoomToCircle( circleParent ) {
    const circle = circleParent.select("circle");
    const [cx, cy] = [circle.attr("cx"), circle.attr("cy")];
    const radius = circle.attr("r");

    // Calculate new viewBox values
    const zoomFactor = 6.5; // Adjust this for more or less zoom
    const newWidth = 500 / zoomFactor;
    const newHeight = 500 / zoomFactor;
    const newX = cx - newWidth / 2;
    const newY = cy - newHeight / 2;

    // Transition to the new viewBox
    mySvg.transition()
      .duration( animationTime ) 
      .attr("viewBox", `${newX} ${newY} ${newWidth} ${newHeight}`);
    
    // Fade out other circles
    theCircles
      .filter(function () {
        return this !== circleParent.node(); // Select all circles except the clicked one
      })
      .transition()
      .duration( animationTime )
      .style("opacity", 0);
    // Ensure the clicked circle stays visible
    circle
      .transition()
      .duration( animationTime)
      .style("opacity", 1);
    
  }
  // end zoom function
  
  // zoom out function
  function zoomOut() {
    // zoom out to original viewbox
    mySvg.transition()
      .duration( animationTime )
      .attr("viewBox", originalViewBox);
    
    // Reset opacity of all circles
    theCircles.transition()
      .duration( animationTime )
      .style("opacity", 1);
  }
  
  // Automated zoom logic
  function startAutomation() {
    automationInterval = setInterval(() => {
      const currentCircle = d3.select(theCircles.nodes()[currentIndex]);

      // Zoom to the current circle
      zoomToCircle(currentCircle);

      // Wait for zoom-in animation to finish, then zoom out
      setTimeout(() => {
        zoomOut();
      }, zoomOutTime); // Adjust timing to match the animation duration

      // Move to the next circle
      currentIndex = (currentIndex + 1) % theCircles.size();
    }, autoTime+zoomOutTime); // Adjust timing for interval between animations
  }
  
  // Stop the automation
  function stopAutomation() {
    clearInterval(automationInterval);
  }
  
  // add the zoom function to the circles
  theCircles.on("click", zoomToCircle);
  
  // add the zoom out function to the svg
  mySvg.on("click", zoomOut);
  
  // View detection using Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      const svgEntry = entries[0];
      if (svgEntry.isIntersecting) {
        // start animation immediatley when in view
        zoomToCircle( d3.select(theCircles.nodes()[currentIndex]) );
        currentIndex++;
        // Wait for zoom-in animation to finish, then zoom out
        setTimeout(() => {
          zoomOut();
        }, zoomOutTime); // Adjust timing to match the animation duration

        startAutomation(); // Start animation when SVG is in view
      } else {
        stopAutomation(); // Pause animation when SVG is out of view
      }
    },
    { threshold: 0.5 } // Start when 50% of the SVG is in view
  );

  // Observe the SVG element (html select)
  observer.observe(document.querySelector("#svg-zoom-circles"));
  
});
// end entire process when DOM is loaded