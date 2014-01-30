
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
            controlPoint2: {cp1x:200, cp1y:300, x:300, y:100},
            widthOfLine: 4,
            colors: {black:"black", blue:"blue", red:"red"}
        }
        renderingContext.beginPath();
        renderingContext.strokeStyle = curves.colors.blue;
        renderingContext.moveTo(curves.startPoint.x, curves.startPoint.y);
        renderingContext.lineTo(curves.controlPoint1.x, curves.controlPoint1.y);
        renderingContext.stroke();
        // Draw a quadratic curve by using the same line coordinates.
        renderingContext.beginPath();
        renderingContext.lineWidth = curves.widthOfLine;
        renderingContext.strokeStyle = curves.colors.black;
        renderingContext.moveTo(curves.startPoint.x, curves.startPoint.y);
        renderingContext.quadraticCurveTo(curves.controlPoint2.cp1x, curves.controlPoint2.cp1y,
                                          curves.controlPoint2.x, curves.controlPoint2.y);
        renderingContext.stroke();
}());
