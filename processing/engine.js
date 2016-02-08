var engine = {
    firstTick: 0,
    previousTick: 0,
    currentTick: 0,
    tickLength: 0,
    timeSinceStart: 0,

    xMax: 0,
    yMax: 0,

    mouseX: 0,
    mouseY: 0,
    clicked: false,

    keys: {
        W: false,
        A: false,
        S: false,
        D: false
    },

    objects: [],
}

function boot(game) {
    var sketch = {}

    sketch.factory = {};

    sketch.init = function(processing) {
        processing.ellipseMode(processing.CENTER);

        var now = sketch._now();
        engine.firstTick = now;
        engine.currentTick = now;

        engine.xMax = document.body.clientWidth;
        engine.yMax = document.body.clientHeight;

        _.each(game, function(firework) {
            firework.onInit(firework, sketch.factory)
        });
    };

    sketch.tick = function(processing) {
        var now = sketch._now();

        engine.lastTick = engine.currentTick;
        engine.currentTick = now;
        engine.tickLength = engine.currentTick - engine.lastTick;
        engine.timeSinceStart = engine.currentTick - engine.firstTick;

        processing.background(0);

        _.each(game, function(firework) {
            if (firework.startingTime < engine.timeSinceStart) {
                if (firework.unfired != undefined) {
                    firework.unfired = true;
                }

                if (firework.finished != undefined) {
                    firework.finished = false;
                }

                if (firework.position != undefined) {
                    firework.position = {
                        x: engine.xMax / 2,
                        y: engine.yMax
                    }
                }

                if (firework.velocity != undefined) {
                    firework.velocity = {
                        x: Math.cos(firework.angle) * firework.speed,
                        y: Math.sin(firework.angle) * firework.speed
                    }
                }

                firework.position.x = firework.position.x + firework.velocity.x * (engine.tickLength * 1.0) / 1000.0;
                firework.position.y = firework.position.y + firework.velocity.y * (engine.tickLength * 1.0) / 1000.0;

                firework.onTick(firework, sketch.factory);

                if (firework.unfired && firework.startingTime + firework.timer < engine.currentTime) {
                    firework.unfired = false;
                    firework.onExplode();
                }

                processing.noStroke();

                processing.fill(firework.color.r, firework.color.g, firework.color.b);
                processing.ellipse(firework.position.x, firework.position.y, firework.size, firework.size);
            }
        })
    };

    sketch._now = function(processing) {
        var date = new Date();
        return date.getTime();
    };

    return sketch;
};
