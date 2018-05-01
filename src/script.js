import Cell from './cell';


const vendors = ['webkit', 'moz'];
for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
}
const startTime = (new Date()).getTime();
let currentTime = 0;
const canvas = document.getElementById('canvas');

const cw = canvas.width;
const ch = cw;//canvas.height;

const heightHeader = 50;

const cells = [];

const numberOfCells = 100;
const numberOfCellsInRow = 10;
let ctx = null;

function gameLoop() {
    window.requestAnimationFrame(gameLoop);

    currentTime = (new Date()).getTime();

    const numberOfSecondsPassed = ((currentTime - startTime) / 1000);

    ctx.clearRect(0, 0, 300, 50);
    ctx.font = '30px Verdana';
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, cw, 0);
    gradient.addColorStop('0', 'magenta');
    gradient.addColorStop('0.5', 'blue');
    gradient.addColorStop('1.0', 'red');
    // Fill with gradient
    ctx.fillStyle = gradient;
    ctx.fillText(numberOfSecondsPassed.toFixed(1), 10, 40);

}

canvas.addEventListener('click', click);

function click(e) {
    const x = e.offsetX;
    const y = e.offsetY - heightHeader;

    const xCell = Math.floor(x / (cw / numberOfCellsInRow));
    const yCell = Math.floor(y / (ch / (numberOfCells / numberOfCellsInRow)));

    const c = (yCell) * 10 + xCell;

    cells[c].click(ctx);
}

if (typeof (canvas.getContext) !== undefined) {
    ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'lightGrey';

    const widthCell = (cw / numberOfCellsInRow);
    const heightCell = (ch / (numberOfCells / numberOfCellsInRow));
    let counterX = 0;
    let counterY = heightHeader;

    for (let i = 0; i < numberOfCells; i++) {
        const c = new Cell(counterX, counterY, widthCell, heightCell);
        cells.push(c);
        c.draw(ctx);

        counterX += widthCell;

        if (counterX > cw - widthCell) {
            counterY += heightCell;
            counterX = 0;
        }
    }

    gameLoop();
}