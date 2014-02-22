/*
 * This template file is meant to be a template for canvas-based
 * web page code.  This will draw arcs to shape circles but not compelete circles, 
 * but it will have the arc to complete the circle in the next line
 *
 */

(function () {

    var circles = {
            xPoints: 25,   // The x-coordinate. I made an object inside of an object
                                // to make it easier to add more x values in the future.
            yPoints: {y: 100},  // The y-coordinate.
            radius: 20, // The arc radius.
            startAngle: 0,  // The starting point on the circle.
            endAngle: Math.PI + Math.PI / 2, // The end point on the circle.
            circleStyle:"red",
            circleStroke: "black",
        },
 
        drawArcs = function (renderingContext) {
        // Step through two rows.
            for (var i = 0; i < 4; i++) {
                // Step through three versions.
                for (var j = 0; j < 2; j++) {
                    renderingContext.fillStyle = circles.circleStyle;
                    renderingContext.strokeStyle = circles.circleStroke;
                    renderingContext.beginPath();
                    var anticlockwise = i % 2;
                    renderingContext.arc(circles.xPoints + j  * circles.yPoints.y + 20, circles.xPoints + i-j * circles.yPoints.y + 20,
                                         circles.radius, circles.startAngle+j, circles.endAngle+j,
                                         anticlockwise); // Create the arc path.
                    renderingContext.fill();      //Display the work.
                    renderingContext.stroke();      //Display the work.
                }
            }
        },
        // a reusable function to draw mini circles.
        drawMiniCircles = function (renderingContext) {
            for(var miniCircles =2; miniCircles <= 20; miniCircles += 5) { //calling the function above more than once to test how cool it is to put everything seperate.
                circles.xPoints = miniCircles;
                drawArcs(renderingContext);
            }
        };
 
    window['spriteLibrary'] = window['spriteLibrary'] || {};
    window['spriteLibrary'].circles = circles;
    window['spriteLibrary'].drawMiniCircles = drawMiniCircles;
 
}());
