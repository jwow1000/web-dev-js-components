document.addEventListener("DOMContentLoaded", function () {
  // select the svg
  const mySvg = d3.select("#svg-zoom-circles");
  // console.log("check out the svg: ", mySvg);
  
  // select all the circles
  const theCircles = d3.selectAll('circle');
  // console.log("the Circles: ", theCircles);
  
  // original viewbox for zooming out
  const originalViewBox = "0 0 489.46762 324"; // Store the original viewBox
  
  // Zoom function
  function zoomToCircle(event, d) {
    event.stopPropagation(); // Prevent the SVG's zoom out from firing
    const [cx, cy] = [d3.select(this).attr("cx"), d3.select(this).attr("cy")];
    const radius = d3.select(this).attr("r");

    // Calculate new viewBox values
    const zoomFactor = 4; // Adjust this for more or less zoom
    const newWidth = 500 / zoomFactor;
    const newHeight = 500 / zoomFactor;
    const newX = cx - newWidth / 2;
    const newY = cy - newHeight / 2;

    // Transition to the new viewBox
    mySvg.transition()
      .duration(750)
      .attr("viewBox", `${newX} ${newY} ${newWidth} ${newHeight}`);
  }
  // zoom out function
  function zoomOut() {
    mySvg.transition()
      .duration(750)
      .attr("viewBox", originalViewBox);
  }
  
  // add the zoom function to the circles
  theCircles.on("click", zoomToCircle);
  
  // add the zoom out function to the svg
  mySvg.on("click", zoomOut);
  
});