// import Board from './board/board';

// const vendors = ['webkit', 'moz'];
// for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
//     window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
//     window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
// }

// const board = new Board(64, 8, 50, 10);

// const gameLoop = () => {
//     window.requestAnimationFrame(gameLoop);
//     board.setTimer();
// };

// const click = (e) => {
//     board.getCellByClick(e);
// };


// const newGame = () => {

//     board.newGame();

//     gameLoop();
// };

// board.canvas.addEventListener('click', click);
// if (typeof (board.canvas.getContext) !== undefined) {

//     newGame();
// }

// document.getElementById('newGameButton').addEventListener('click', () => {
//     newGame();
// });


// window.addEventListener('load', function () {

//     //LOAD DATA
//     fetch('https://mjbwnqaj06.execute-api.eu-west-1.amazonaws.com/prod/gethighscores')
//         .then(res => res.json()).then(r => {
//             console.log(r);
//         });


//     if ('serviceWorker' in navigator && !document.URL.includes('localhost')) {
//         navigator.serviceWorker.register('service-worker.js');
//     }
// });
import Vue from 'vue';
import router from './router';
import App from './App';

window.app = new Vue({
    el: '#app',
    router,
    render: h => h(App),
});


// if ('serviceWorker' in navigator && !document.URL.includes('localhost')) {
//     navigator.serviceWorker.register('service-worker.js');
// }