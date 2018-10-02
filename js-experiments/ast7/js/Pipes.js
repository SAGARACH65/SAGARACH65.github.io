class Pipes {

    constructor(canvasHeight, canvasWidth) {
        this.spacing = 26;
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;
        this.top = generateRandomNO(25, (canvasHeight / 2) + 30) // ending position of the upper pole
        this.bottom = this.top + this.spacing; //starting position of the bottom tile
        this.speed = 1.8;
        this.isPassed = false; // to update the score if the tile has been passed
        this.x = this.canvasWidth + 35;
        this.width = 35;
    }

    show(ctx) {


        drawImage('images/pipe-top.png', this.x, 0, this.width, this.top, ctx);

        drawImage('images/pipe-bottom.png', this.x, this.bottom, this.width, this.canvasHeight, ctx);

    }

    update() {
        this.x -= this.speed;
    }

}