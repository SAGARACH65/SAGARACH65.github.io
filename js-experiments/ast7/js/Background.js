const IMAGES = ['images/background.png', 'images/background-day.png', 'images/background2.png'];

class Background {
    constructor(canvasHeight, canvasWidth) {
        this.image = IMAGES[generateRandomNO(-1, 3)];
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;
    }

    showBackgroundImage(ctx) {
       // console.log(this.canvasHeight);
        drawImage(this.image, 0, 0, this.canvasWidth, this.canvasHeight, ctx)
    }

    showFloor(ctx) {
        drawImage('images/floor2.png', 0, this.canvasHeight - 16, this.canvasWidth, 8, ctx);
    }

    showFloor2(ctx) {
        drawImage('images/floor.png', 0, this.canvasHeight - 12, this.canvasWidth, 12, ctx);
    }
}