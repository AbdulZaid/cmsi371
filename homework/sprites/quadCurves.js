
/*
 *
 */

(function () {
    // Ditto on using jQuery here.
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d");
        curves = {
            startPoint: {x: 100, y:100},
            controlPoint1: {x: 300, y:100},
            widthOfLine: 4,
            strokeColor: "black"
        }
        renderingContext.beginPath();
        renderingContext.strokeStyle = "blue";
        renderingContext.moveTo(curves.startPoint.x, curves.startPoint.y);
        renderingContext.lineTo(curves.controlPoint1.x, curves.controlPoint1.y);
        renderingContext.stroke();
        // Draw a quadratic curve by using the same line coordinates.
        renderingContext.beginPath();
        renderingContext.lineWidth = curves.widthOfLine;
        renderingContext.strokeStyle = curves.strokeColor;
        renderingContext.moveTo(curves.startPoint.x, curves.startPoint.y);
        renderingContext.quadraticCurveTo(200, 300, 300, 100);
        renderingContext.stroke();
}());
