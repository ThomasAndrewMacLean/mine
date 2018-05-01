var vendors = ['webkit', 'moz'];
for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
}

var canvas = document.getElementById('canvas'),
    cw = canvas.width,
    ch = canvas.height,
    cx = null,
    fps = 30,
    bX = 30,
    bY = 30,
    mX = 150,
    mY = 300,
    lastTime = (new Date()).getTime(),
    currentTime = 0,
    delta = 0;

function gameLoop() {
    window.requestAnimationFrame(gameLoop);

    currentTime = (new Date()).getTime();
    delta = (currentTime - lastTime) / 1000;
    cx.clearRect(0, 0, cw, cw);

    cx.beginPath();
    cx.fillStyle = 'blue';
    cx.arc(bX, bY, 20, 0, Math.PI * 360);
    cx.fill();
    if (bX >= cw - 14 || bX <= 14) {
        mX *= -1;
    }
    else if (bY >= ch - 14 || bY <= 14) {
        mY *= -1;
    }

    bX += (mX * delta);
    bY += (mY * delta);

    lastTime = currentTime;
}

if (typeof (canvas.getContext) !== undefined) {
    cx = canvas.getContext('2d');
    gameLoop();
}