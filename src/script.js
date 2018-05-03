import Board from './board/board';
import register from './sw';

const vendors = ['webkit', 'moz'];
for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
}

const board = new Board(64, 8, 50, 10);

const gameLoop = () => {
    window.requestAnimationFrame(gameLoop);
    board.setTimer();
};

const click = (e) => {
    board.getCellByClick(e);
};


const newGame = () => {

    board.newGame();

    gameLoop();
};

board.canvas.addEventListener('click', click);
if (typeof (board.canvas.getContext) !== undefined) {

    newGame();
}

document.getElementById('newGameButton').addEventListener('click', () => {
    newGame();
});

window.addEventListener('load', function () {
    register();
});