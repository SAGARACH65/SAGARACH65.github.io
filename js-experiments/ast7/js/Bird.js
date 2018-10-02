const GRAVITY = 0.05;
const BIRD_IMAGES = ['images/bird1_1.png', 'images/bird2.png', 'images/bird3.png', 'images/bird4.png'];
let count = 0;
let currentIndex = 0;
class Bird {
    constructor(canvasHeight, canvasWidth) {
        this.x = 50;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.y = canvasHeight / 2 - 30;
        this.score = 0;
        this.velocity = 0;
        this.width = 30;
        this.height = 11;

    }

    show(ctx) {
        drawImage(BIRD_IMAGES[currentIndex % 4], this.x, this.y, this.width, this.height, ctx);
        if (count % 15 === 14) currentIndex++;
        count++;
    }

    updatePerGravity() {
        this.velocity += GRAVITY;
        this.y += this.velocity;
    }

    checkTopCollision() {
        //here 11 is the height of the bird and 30 is the width of the bird
        if (this.y + 11 < 0) {
            this.velocity = 0;
            isOver = true;
        }
    }

    checkBottomCollision() {
        if (this.y + 11 > this.canvasHeight - 14) {
            this.velocity = 0;
            isOver = true;
        }
    }

    jumpBird() {
        //increases the coordinates of the bird when space is pressed
        this.velocity = -0.9;
    }

    updateScore() {
        this.score++;
    }

    showScore(ctx) {
        ctx.fillText('Score:' + this.score, this.canvasWidth - 50, 10);
    }
}