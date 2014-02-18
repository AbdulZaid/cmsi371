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
                        closenessDistance = (endKeyframe.closeness || 6) - closenessStart;

                    spriteLibrary.curves.closeness = ease(currentTweenFrame,
                        closenessStart, closenessDistance, duration);
                },

                keyframes: [
                    {
                        frame: 0,
                        tx: 20,
                        ty: 20,
                        closeness: 10,
                        ease: KeyframeTweener.inElasticBig
                    },

                    {
                        frame: 60,
                        tx: 100,
                        ty: 50,
                        closeness: 0,
                        ease: KeyframeTweener.inElasticBig
                    },

                    // The last keyframe does not need an easing function.
                    {
                        frame: 200,
                        tx: 80,
                        ty: 500,
                        closeness: 40
                    }
                ]
            },

            {
                draw: spriteLibrary.drawQuadCurves,
                keyframes: [
                    {
                        frame: 50,
                        tx: 300,
                        ty: 600,
                        sx: 0.5,
                        sy: 0.5,
                        ease: KeyframeTweener.inElasticBig
                    },

                    {
                        frame: 100,
                        tx: 300,
                        ty: 0,
                        sx: 3,
                        sy: 0.25,
                        ease: KeyframeTweener.inElasticBig
                    },

                    {
                        frame: 150,
                        tx: 300,
                        ty: 600,
                        sx: 0.5,
                        sy: 0.5
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
            renderingContext.fillStyle = "white";
            renderingContext.fillRect(0,0, canvas.width, canvas.height);
            renderingContext.restore();
        }
    });
}());
