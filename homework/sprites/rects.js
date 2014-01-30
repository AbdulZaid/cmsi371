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
 
        rectsProperties = {
            widthOfLine: { x:3, y:20, z:10},
            color: {green:"green", red:"red", blue:"blue", yellow:"yellow"},
            xCord: {x1:300, x2:400, x3:450},
            yCord: {y1:100, y2:200, y3:340},
            recWidth: {width1: 200, width2: 350, width3:450, width4: 500},
            recHeight: {height1: 200, height2: 350, height3:450, height4: 500},
            lineJoin: {round: "round", bevel:"bevel", miter: "miter"}
        };
        renderingContext.beginPath();
        renderingContext.lineJoin = rectsProperties.lineJoin.round;
        renderingContext.lineWidth = rectsProperties.widthOfLine.x;
        renderingContext.strokeStyle = rectsProperties.color.blue;
        renderingContext.rect(rectsProperties.xCord.x1, rectsProperties.yCord.y3,  rectsProperties.recWidth.width2,rectsProperties.recHeight.height1);
        renderingContext.stroke();
        renderingContext.beginPath();
        renderingContext.lineWidth = rectsProperties.widthOfLine.y;
        renderingContext.strokeStyle = rectsProperties.color.yellow;
        renderingContext.rect(rectsProperties.xCord.x3, rectsProperties.yCord.y1,  rectsProperties.recWidth.width2,rectsProperties.recHeight.height2);  renderingContext.stroke();
        renderingContext.beginPath();
        renderingContext.lineJoin = rectsProperties.lineJoin.miter;
        renderingContext.lineWidth = rectsProperties.widthOfLine.x;
        renderingContext.strokeStyle = rectsProperties.color.green;
        renderingContext.rect(rectsProperties.xCord.x2, rectsProperties.yCord.y2,  rectsProperties.recWidth.width2,rectsProperties.recHeight.height3);       renderingContext.stroke();
}());
