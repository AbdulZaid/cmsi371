/*
*   Function to draw rectangles.
*/

(function () {
    //seeting up the properties of the rectangles as objects.
    var rectsProperties = {
            widthOfLine: 3,
            color: {green:"green", red:"red", blue:"blue", yellow:"yellow"},
            cords: {x:300, y:400}, // JD: Watch your capitalization!
            recWidth: 150,
            recHeight: 100,
            numOfRects: 300,
            lineJoin: {round: "round", bevel:"bevel", miter: "miter"}
        },

        //wrapping up the drawing methods and properties into one function.
        drawRects = function (renderingContext) {
            renderingContext.beginPath();
            renderingContext.lineWidth = rectsProperties.widthOfLine;
            renderingContext.strokeStyle = rectsProperties.color.blue;
            renderingContext.rect(rectsProperties.cords.x, rectsProperties.cords.y, rectsProperties.recWidth,rectsProperties.recHeight);
            renderingContext.stroke();
        },

        // JD: Same note here about how to structure this code for
        //     reusability with the keyframe animation library.
        drawingRecs = function (renderingContext) {
            //calling the function and chaning its scale and translate.
            for(var x =100; x <= 300; x += rectsProperties.numOfRects) {
                renderingContext.lineJoin = rectsProperties.lineJoin.round;
                rectsProperties.cords.x = x;
                renderingContext.scale(1, 0.9);
                renderingContext.translate(10,10);
                drawRects(renderingContext);

            }
        },
 
        drawingRecsTwo = function (renderingContext) {
            //calling the function above with chaning its properties.
            for(var y=50; y <= 300; y +=rectsProperties.numOfRects) {
                rectsProperties.cords.y = y;
                renderingContext.scale(1, 1.1);
                renderingContext.lineJoin = rectsProperties.lineJoin.miter;
                rectsProperties.color.blue= "brown";
                renderingContext.translate(12,5);
                drawRects(renderingContext);
            }
        };
    window['spriteLibrary'] = window['spriteLibrary'] || {};
 
    window['spriteLibrary'].rectsProperties = rectsProperties;
    window['spriteLibrary'].drawingRecs = drawingRecs;
    window['spriteLibrary'].drawingRecsTwo = drawingRecsTwo;
 
}());
