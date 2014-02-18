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
                draw: spriteLibrary.drawMiniCircles,
                callback: function (ease, startKeyframe, endKeyframe, currentTweenFrame, duration) {
                    var radiusStart = startKeyframe.radius || 20,
                   radiusDistance = (endKeyframe.radius || 20) - radiusStart;
                   
                    spriteLibrary.circles.radius = ease(currentTweenFrame,
                        radiusStart, radiusDistance, duration);
                },
                
                keyframes: [
                    {
                        frame: 0,
                        tx: 300,
                        ty: 400,
                        radius: 30,
                        ease: KeyframeTweener.inElasticBig
                    },
                            
                    {
                        frame: 100,
                        tx: 850,
                        ty: 400,
                        radius: 50,
                        ease: KeyframeTweener.outElasticBig
                    },
                    
                    {
                        frame: 400,
                        tx: 200,
                        ty: 400,
                        radius: 300,
                        ease: KeyframeTweener.outInCubic
                    },
                    {
                        frame: 600,
                        tx: 300,
                        ty: 0,
                        sx: 3,
                        sy: 0.8,
                    },
                    
                ]
            },
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
            renderingContext.fillStyle = "black";
            renderingContext.fillRect(0,0, canvas.width, canvas.height);
            renderingContext.restore();
        }
    });
 }());
