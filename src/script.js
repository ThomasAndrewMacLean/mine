import Cell from './cell';

const canvas = document.getElementById('canvas');

const cw = canvas.width;
const ch = cw;//canvas.height;

const heightHeader = 50;

const cells = [];

const numberOfCells = 100;
const numberOfCellsInRow = 10;
let ctx = null;


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
}