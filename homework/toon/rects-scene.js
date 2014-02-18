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
                draw: spriteLibrary.drawingRecs,
                callback: function (ease, startKeyframe, endKeyframe, currentTweenFrame, duration) {
                    var rectHeightStart = startKeyframe.recHeight || 100,
                        rectHeightEnd = (endKeyframe.recHeight || 100) - rectHeightStart,
                   
                        rectWidthStart = startKeyframe.recWidth || 150,
                        rectWidthEnd = (endKeyframe.recWidth || 150) - rectWidthStart;
                   
                   spriteLibrary.rectsProperties.recWidth = ease(currentTweenFrame,
                        rectWidthStart, rectWidthEnd, duration);
                   
                    spriteLibrary.rectsProperties.recHeight = ease(currentTweenFrame,
                        rectHeightStart, rectHeightEnd, duration);
                },
                    
                keyframes: [
                    {
                        frame: 0,
                        tx: 10,
                        ty: 10,
                        recHeight: 100,
                        ease: KeyframeTweener.outInCubic
                    },
                        
                    {
                        frame: 100,
                        tx: 200,
                        ty: -100,
                        recHeight: 200,
                        ease: KeyframeTweener.outElasticBig
                    },
                        
                    {
                        frame: 300,
                        tx: 500,
                        ty: 100,
                        recHeight: -300,
                        ease: KeyframeTweener.outElasticBig
                    },
                            
                    {
                        frame: 800,
                        tx: 300,
                        ty: 0,
                        recWidth: 280,
                        ease: KeyframeTweener.quadEaseInAndOut
                    },
                            
                    {
                        frame: 1000,
                        tx: 3000,
                        ty: 200,
                    }
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
            renderingContext.fillStyle = "yellow";
            renderingContext.fillRect(0,0, canvas.width, canvas.height);
            renderingContext.restore();
        }
    });
 }());
