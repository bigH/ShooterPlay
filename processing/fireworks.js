function fireworks() {
    var first = {
        startingTime: 1000,
        angle: 90,
        speed: 10,
        color: {
            r: 100,
            g: 100,
            b: 100
        },
        timer: 3000,
        onInit: function(factory) {
            first.variable = true;
        },
        onTick: function(factory) {
            console.log("variable: " + first.variable);
            if (first.color.r > 0) {
                first.color.r = first.color.r - 1;
            }
            if (first.color.g > 0) {
                first.color.g = first.color.g - 1;
            }
            if (first.color.b > 0) {
                first.color.b = first.color.b - 1;
            }
        },
        onExplode: function(factory) {
            factory.projectile([
                {
                    angles: 12,
                    speed: 1.0,
                    color: {
                        r: 100,
                        g: 0,
                        b: 0
                    },
                    onTick: function(time) {
                        if (first.color.r > 0) {
                            first.color.r = first.color.r - 1;
                        }
                    }
                }
            ]);
        }
    };

    var all = [
        first
    ];

    return all;
}
