/*
 * This template file is meant to be a template for canvas-based
 * web page code.  Nothing here is set in stone; it is mainly
 * intended to save you some typing.
 */
// Yes, we can use jQuery here, but avoid it just in case you
// really don't want to use it.  We do still keep things away
// from the global namespace.
(function () {
    // Ditto on using jQuery here.
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d");
        circles = {
            x1: 25,               // The x-coordinate.
            y1: 100,              // The y-coordinate.
            x2: 25,               
            y2: 100,           
            radius: 20,           // The arc radius.
            startAngle: 0,        // The starting point on the circle.
            circleStyle:"yellow",
            circleStroke: "blue",
        };
    // Step through two rows.
    for (var i = 0; i < 6; i++) {
        // Step through three versions.
        for (var j = 0; j < 3; j++) {
            renderingContext.fillStyle = circles.circleStyle;
            renderingContext.strokeStyle = circles.circleStroke;
            renderingContext.beginPath();
             var endAngle = Math.PI + (Math.PI * j) / 2; // The end point on the circle.
             var anticlockwise = i % 2 == 0 ? false : true; // The direction of drawing.
            renderingContext.arc(circles.x1 + j * circles.y1, circles.x2 + i * circles.y2, circles.radius, circles.startAngle, endAngle, anticlockwise); // Create the arc path.
            renderingContext.fill();      //Display the work.
            renderingContext.stroke();      //Display the work.
                }
        }
}());
