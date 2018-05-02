import isRequired from './../common/isRequired';

class Cell {
    constructor(
        x = isRequired('x'),
        y = isRequired('y'),
        width = isRequired('width'),
        height = isRequired('height'),
        index) {

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.index = index;
        this.isClicked = false;
        this.isBomb = false;
    }
    checkIsBomb() {
        return this.isBomb;
    }
    setBomb() {
        this.isBomb = true;
    }
    drawFlag(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'green';
        ctx.arc(this.x + this.height / 3 + 7, this.y + this.height / 3 + 7, this.height / 3, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
    draw(ctx, color, text) {
        ctx.fillStyle = color;
        ctx.strokeStyle = 'white';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        if (text) {
            ctx.fillStyle = 'white';
            ctx.fillText(text, this.x + this.width / 4, this.y + this.height / 1.3);
        }
        if (this.isBomb) {
            this.drawBomb(ctx);
        }
    }
    drawBomb(ctx) {
        ctx.strokeStyle = 'red';
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.x + this.height / 3 + 7, this.y + this.height / 3 + 7, this.height / 3, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        return 'isBomb';
    }
    click(ctx, bombCount) {
        if (this.isClicked) { return false; }
        this.draw(ctx, 'gray', bombCount);
        this.isClicked = true;
        return true;
    }
}

export default Cell;
