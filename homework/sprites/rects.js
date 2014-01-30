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

        renderingContext.beginPath();
        renderingContext.lineWidth = "3";
        renderingContext.strokeStyle = "blue";
        renderingContext.rect(5, 5, 300, 250);
        renderingContext.stroke();
        renderingContext.beginPath();
        renderingContext.lineWidth = "5";
        renderingContext.strokeStyle = "red";
        renderingContext.rect(150, 200, 300, 150);
        renderingContext.stroke();
        renderingContext.beginPath();
        renderingContext.lineJoin = "round";
        renderingContext.lineWidth = "10";
        renderingContext.strokeStyle = "green";
        renderingContext.rect(250, 50, 150, 250);
        renderingContext.stroke();
}());
