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
                    var closenessStart = startKeyframe.radius || 20,
                        closenessDistance = (endKeyframe.radius || 20) - closenessStart;
                    
                    spriteLibrary.circles.radius = ease(currentTweenFrame,
                        closenessStart, closenessDistance, duration);
                },
                
                keyframes: [
                    {
                        frame: 0,
                        tx: 20,
                        ty: 20,
                        radius: 0,
                        ease: KeyframeTweener.inElasticBig
                    },
                    
                    {
                        frame: 20,
                        tx: 200,
                        ty: 20,
                        radius: 10,
                        ease: KeyframeTweener.quadEaseInOut
                    },
                    
                    // The last keyframe does not need an easing function.
                    {
                        frame: 300,
                        tx: 0,
                        ty: 20,
                        radius: 300,

                    }
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
            renderingContext.fillStyle = "white";
            renderingContext.fillRect(0,0, canvas.width, canvas.height);
            renderingContext.restore();
        }
    });
 }());
