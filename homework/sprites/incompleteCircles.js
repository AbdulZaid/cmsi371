/*
 * This template file is meant to be a template for canvas-based
 * web page code.  This will draw arcs to shape circles but not compelete circles, 
 * but it will have the arc to complete the circle in the next line
 *
 */

(function () {

    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d"),

    // JD: Watch out---circles and drawArcs are global variables here.  Not good practice
    //     if intentional, and if unintentional, note that this is caused by the lack of
    //     "var" keyword.
        circles = {
            xPoints: {x: 25},   // The x-coordinate. I made an object inside of an object
                                // to make it easier to add more x values in the future.
            yPoints: {y: 100},  // The y-coordinate.
            radius: 20, // The arc radius.
            startAngle: 0,  // The starting point on the circle.
            endAngle: Math.PI + Math.PI / 2, // The end point on the circle.
            circleStyle:"yellow",
            circleStroke: "blue",
        },
 
        drawArcs = function() {
        // Step through two rows.
            for (var i = 0; i < 6; i++) {
                // Step through three versions.
                for (var j = 0; j < 3; j++) {
                    renderingContext.fillStyle = circles.circleStyle;
                    renderingContext.strokeStyle = circles.circleStroke;
                    renderingContext.beginPath();
                    var anticlockwise = i % 2 === 1 ? true : false; // The direction of drawing.
                    // JD: ^^^^^Some concerning things about this variable declaration.
                    //     First: in JavaScript, use === and not == (if you look in the
                    //     web, you will find explanations for this).
                    //
                    //     Second, and of creater concern, is how you are assigning the
                    //     conditional expression to false or true.  THINK ABOUT THAT.
                    //     This is one of the biggest no-nos in programming, not because
                    //     it leads to incorrect results (the computation remains correct
                    //     here), but because it shows that you are not clear on exactly
                    //     what the expression "i % 2 === 0" means.  Take a second look at
                    //     this, and if you remain unsure about the issue, please ask me
                    //     about this sometime.
                    renderingContext.arc(circles.xPoints.x + j * circles.yPoints.y, circles.xPoints.x + i * circles.yPoints.y,
                                         circles.radius, circles.startAngle+j, circles.endAngle+j,
                                         anticlockwise); // Create the arc path.
                    renderingContext.fill();      //Display the work.
                    renderingContext.stroke();      //Display the work.
                }
            }
        };

    // JD: As you saw in class, this works for standalone drawing, but for
    //     reusability, you have to restructure this a little bit.  Follow what
    //     was done with quadCurves.
    for(var miniCircles =26; miniCircles <= 100; miniCircles += 5) { //calling the function above more than once to test how cool it is to put everything seperate. 
        circles.xPoints.x = miniCircles;
        drawArcs();
    }
 
}());
