/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
(function () {
    var canvas = document.getElementById("canvas"),

        // Then, we have "easing functions" that determine how
        // intermediate frames are computed.

        // Now, to actually define the animated sprites.  Each sprite
        // has a drawing function and an array of keyframes.
        sprites = [
            {
                draw: spriteLibrary.drawQuadCurves,
                callback: function (ease, startKeyframe, endKeyframe, currentTweenFrame, duration) {
                    var closenessStart = startKeyframe.closeness || 6,
                        closenessDistance = (endKeyframe.closeness || 6) - closenessStart,
                   
                        stringsStart = startKeyframe.numberOfStrings || 2,
                        stringsEnd = (endKeyframe.numberOfStrings || 2) - stringsStart;

                   spriteLibrary.curves.widthOfLine = ease(currentTweenFrame,
                        stringsStart, stringsEnd, duration);
                   
                    spriteLibrary.curves.closeness = ease(currentTweenFrame,
                        closenessStart, closenessDistance, duration);
                },

                keyframes: [
                    {
                        frame: 0,
                        tx: 200,
                        ty: 200,
                        closeness: -50,
                        numberOfStrings: 2,
                        ease: KeyframeTweener.quadEaseInAndOut
                    },

                    {
                        frame: 200,
                        tx: 200,
                        ty: 200,
                        numberOfStrings: -8,
                        closeness: 0,
                        ease: KeyframeTweener.inElasticBig
                    },

                    {
                        frame: 400,
                        tx: 200,
                        ty: 200,
                        numberOfStrings: 5,
                        closeness: -40,
                        ease: KeyframeTweener.outInCubic
                    },
                            
                    {
                        frame: 600,
                        tx: 200,
                        ty: 200,
                        numberOfStrings: -8,
                        closeness: 30,
                    },
                            
                    {
                        frame: 800,
                        tx: 200,
                        ty: 200,
                        numberOfStrings: 0,
                        closeness: -10,
                    },
                ]
            }
        ];
    
    // Finally, we initialize the engine.  Mainly, it needs
    // to know the rendering context to use.  And the animations
    // to display, of course.
    KeyframeTweener.initialize({
        renderingContext: canvas.getContext("2d"),
        width: canvas.width,
        height: canvas.height,
        sprites: sprites,
        background: function (renderingContext) {
            renderingContext.save();
            renderingContext.fillStyle = "white";
            renderingContext.fillRect(0,0, canvas.width, canvas.height);
            renderingContext.restore();
        }
    });
}());
