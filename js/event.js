function event(game) {

    var down = false;

    var gameContainer = $('.game-container')[0];

    on(window, 'keydown', function (e) {
        if (down) return;
        down = true;
        var num = e.keyCode - 37;
        if (num >= 0 && num <= 3) {
            game.move(num);
        }
    });

    on(window, 'keyup', function () {
        down = false;
    });

    touchMoveDir(gameContainer, 15, function (dir) {
        game.move(dir);
    });

    on($('.restart-btn')[0], 'click', function (e) {
        e.preventDefault();
        over = false;
        this.initCell();
        this.view.restart();
        for (var i = 0; i < 2; i++) {
            this.randomAddItem();
        }
        //this.start();
        data.score = 0;
        this.save();
        setTimeout(function () {
            _this.view.setup();
        });
        //game.restart();
    });

    on(window, 'resize', function () {
        game.view.resize();
    });

    var autoTest = false;

    if (autoTest) {
        (function () {
            var timer = setInterval(function () {
                var moveInfo = game.move(random(0, 3));
                if (!moveInfo) {
                    clearInterval(timer);
                }
            }, 20);
        })();
    }
}