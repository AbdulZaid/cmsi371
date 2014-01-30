
/*
 *
 */

(function () {
    // Ditto on using jQuery here.
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d"),

        renderingContext.beginPath();
        renderingContext.strokeStyle = "blue";
        renderingContext.moveTo(100, 100);
        renderingContext.lineTo(300, 100);
        renderingContext.stroke();
        // Draw a quadratic curve by using the same line coordinates.
        renderingContext.beginPath();
        renderingContext.lineWidth = "3";
        renderingContext.strokeStyle = "black";
        renderingContext.moveTo(100, 100);
        renderingContext.quadraticCurveTo(200, 300, 300, 100);
        renderingContext.stroke();
}());
