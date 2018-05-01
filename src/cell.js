class Cell {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.isClicked = false;
    }

    draw(ctx) {
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fill();
        ctx.stroke();
    }

    click(ctx) {
        console.log('klik');

        ctx.fillStyle = this.isClicked ? 'lightGrey' : 'gray';
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        this.isClicked = !this.isClicked;
    }

}

export default Cell;
