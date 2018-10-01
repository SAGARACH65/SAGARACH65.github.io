class Pipes {

    constructor() {
        this.spacing = 26;
        this.top = generateRandomNO(25, (canvas.height / 2) + 30) // ending position of the upper pole
        this.bottom = this.top + this.spacing; //starting position of the bottom tile
        this.speed = 1.8;
        this.isPassed = false; // to update the score if the tile has been passed
        this.x = canvas.width + 35;
        this.width = 35;
    }

    show() {
        let pipeImgTop = new Image();
        pipeImgTop.src = 'images/pipe-top.png';
        ctx.drawImage(pipeImgTop, this.x, 0, this.width, this.top);

        let pipeImgBottom = new Image();
        pipeImgBottom.src = 'images/pipe-bottom.png';
        ctx.drawImage(pipeImgBottom, this.x, this.bottom, this.width,canvas.height);

    }

    update() {
        this.x -= this.speed;
    }

}