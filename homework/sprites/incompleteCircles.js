/*
 * This template file is meant to be a template for canvas-based
 * web page code.  This will draw arcs to shape circles but not compelete circles, 
 * but it will have the arc to complete the circle in the next line
 *
 */

(function () {

    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d");
        circles = {
            xPoints: {x: 25},   // The x-coordinate. I made an object inside of an object
                                // to make it easier to add more x values in the future.
            yPoints: {y: 100},  // The y-coordinate.
            radius: 20, // The arc radius.
            startAngle: 0,  // The starting point on the circle.
            endAngle: Math.PI + Math.PI / 2, // The end point on the circle.
            circleStyle:"yellow",
            circleStroke: "blue",
        };
 
    drawArcs = function(){
    // Step through two rows.
        for (var i = 0; i < 6; i++) {
            // Step through three versions.
            for (var j = 0; j < 3; j++) {
                renderingContext.fillStyle = circles.circleStyle;
                renderingContext.strokeStyle = circles.circleStroke;
                renderingContext.beginPath();
                var anticlockwise = i % 2 == 0 ? false : true; // The direction of drawing.
                renderingContext.arc(circles.xPoints.x + j * circles.yPoints.y, circles.xPoints.x + i * circles.yPoints.y,
                                     circles.radius, circles.startAngle+j, circles.endAngle+j,
                                     anticlockwise); // Create the arc path.
                renderingContext.fill();      //Display the work.
                renderingContext.stroke();      //Display the work.
            }
        }
    };
 
    for(var miniCircles =26; miniCircles <= 100; miniCircles += 5) { //calling the function above more than once to test how cool it is to put everything seperate. 
        circles.xPoints.x = miniCircles;
        drawArcs();
    }
}());
