import Cell from './../cell/cell';
import isRequired from './../common/isRequired';

class Board {
    constructor(numberOfCells = isRequired('numberOfCells'),
        numberOfCellsInRow = isRequired('numberOfCellsInRow'),
        heightHeader = isRequired('heightHeader'),
        numberOfBombs = isRequired('numberOfBombs')) {
        this.numberOfCells = numberOfCells;
        this.numberOfCellsInRow = numberOfCellsInRow;
        this.heightHeader = heightHeader;
        this.numberOfBombs = numberOfBombs;
        this.canvas = document.getElementById('canvas');
        this.cw = this.canvas && this.canvas.width;
        this.ch = this.canvas && this.canvas.width;
        this.cells = [];
    }
    addCell(cell) {
        return this.cells.push(cell);
    }
    setBombs() {

        if (this.numberOfCells < this.numberOfBombs) {
            throw new Error('too many bombs...');
        }
        let counter = this.numberOfBombs;

        while (counter > 0) {
            const random = Math.floor(Math.random() * this.numberOfCells);
            const cell = this.cells[random];
            if (!cell.checkIsBomb()) {
                cell.setBomb(this.ctx);
                counter--;
            }
        }
    }
    getSurroundingCells(cellIndex) {
        const result = [];

        const notFirstrow = cellIndex >= this.numberOfCellsInRow;
        const notLastrow = cellIndex < this.numberOfCells - this.numberOfCellsInRow;
        const notLeftCol = cellIndex % this.numberOfCellsInRow !== 0;
        const notRightCol = cellIndex % this.numberOfCellsInRow !== this.numberOfCellsInRow - 1;


        if (notLeftCol) result.push(this.cells[cellIndex - 1]);
        if (notRightCol) result.push(this.cells[cellIndex + 1]);
        if (notLastrow) result.push(this.cells[cellIndex + this.numberOfCellsInRow]);
        if (notFirstrow) result.push(this.cells[cellIndex - this.numberOfCellsInRow]);
        if (notLastrow && notLeftCol) result.push(this.cells[cellIndex + this.numberOfCellsInRow - 1]);
        if (notLastrow && notRightCol) result.push(this.cells[cellIndex + this.numberOfCellsInRow + 1]);
        if (notFirstrow && notLeftCol) result.push(this.cells[cellIndex - this.numberOfCellsInRow - 1]);
        if (notFirstrow && notRightCol) result.push(this.cells[cellIndex - this.numberOfCellsInRow + 1]);

        return result;
    }
    getCellByClick(e) {

        const x = e.offsetX;
        const y = e.offsetY - this.heightHeader;
        if (y < 0) {
            return;
        }
        if (this.gameIsOver) {
            return;
        }

        const xCell = Math.floor(x / (this.cw / this.numberOfCellsInRow));
        const yCell = Math.floor(y / (this.ch / (this.numberOfCells / this.numberOfCellsInRow)));
        const c = (yCell) * this.numberOfCellsInRow + xCell;
        this.reveal(c, true);

        if (this.cells.filter(c => c.isClicked).length === this.numberOfCells - this.numberOfBombs) {
            this.gameIsOver = true;
            this.cells.filter(c => c.isBomb).map(c => c.drawFlag(this.ctx));
            this.saveScore();
        }

    }
    reveal(c, isManualClick) {
        const res = this.getSurroundingCells(c);
        // res.forEach(r => this.cells[r.index].draw(this.ctx, 'green', 'x'));
        const bombCount = res.filter(c => c.isBomb).length;
        if (this.cells[c].isBomb) {
            this.cells[c].click(this.ctx, bombCount);
            this.cells.filter(c => c.isBomb).map(c => c.drawBomb(this.ctx));
            this.gameIsOver = true;
            return;
        }

        if (this.cells[c].click(this.ctx, bombCount)) {
            if (isManualClick) {
                this.numberOfClicks++;
                this.setNumberOfClicks();
            }

            if (bombCount === 0) {
                res.forEach(c => this.reveal(c.index));
            }
        }
    }
    saveScore() {
        const defaultName = localStorage.getItem('name') || '';
        const score = (1000 - ((this.currentTime - this.startTime) / 10)) - this.numberOfClicks;
        const name = prompt('Your score was ' + score + '. Please Enter Your Name:', defaultName);

        if (!name){return;}
        localStorage.setItem('name', name);

        fetch('https://mjbwnqaj06.execute-api.eu-west-1.amazonaws.com/prod/sethighscore', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            method: 'POST',
            body: JSON.stringify({
                name,
                score
            })
        }).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
    setNumberOfClicks() {
        this.ctx.clearRect(10, 0, 100, 50);
        this.ctx.font = '30px Verdana';
        this.ctx.fillStyle = 'goldenrod';
        this.ctx.fillText(this.numberOfClicks, 10, 40);
    }
    setTimer() {
        if (this.gameIsOver) {
            return;
        }
        this.currentTime = (new Date()).getTime();
        const numberOfSecondsPassed = Math.floor((this.currentTime - this.startTime) / 1000);
        this.ctx.clearRect(this.cw - 100, 0, 300, 50);
        this.ctx.font = '30px Verdana';
        this.ctx.fillStyle = 'goldenrod';
        this.ctx.fillText(numberOfSecondsPassed, this.cw - 100, 40);
    }
    newGame() {
        this.gameIsOver = false;
        this.cells = [];
        this.numberOfClicks = 0;
        this.startTime = (new Date()).getTime();
        this.currentTime = 0;

        this.ctx = this.canvas.getContext('2d');
        this.ctx.strokeStyle = 'white';

        this.setNumberOfClicks();

        const widthCell = (this.cw / this.numberOfCellsInRow);
        const heightCell = (this.ch / (this.numberOfCells / this.numberOfCellsInRow));
        let counterX = 0;
        let counterY = 50;

        for (let i = 0; i < this.numberOfCells; i++) {
            const c = new Cell(counterX, counterY, widthCell, heightCell, i);
            this.addCell(c);
            c.draw(this.ctx, 'lightGrey');

            counterX += widthCell;

            if (counterX > this.cw - widthCell) {
                counterY += heightCell;
                counterX = 0;
            }
        }

        this.setBombs();
    }
}

export default Board;