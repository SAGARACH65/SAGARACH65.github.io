const gravity = 0.05;
const birdImages = ['images/bird1_1.png', 'images/bird2.png', 'images/bird3.png', 'images/bird4.png'];
let count = 0;
let currentIndex = 0;
class Bird {
    constructor() {
        this.x = 50;
        this.y = canvas.height / 2 - 30;
        this.score = 0;
        this.velocity = 0;
        this.width = 30;
        this.height = 11;
    }

    show() {
        let birdImg = new Image();
        birdImg.src = birdImages[currentIndex % 4];
        if (count % 10 === 9) currentIndex++;
        ctx.drawImage(birdImg, this.x, this.y, this.width, this.height);
        count++;
    }

    updatePerGravity() {
        this.velocity += gravity;
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
        if (this.y + 11 > canvas.height - 14) {
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

    showScore() {
        ctx.fillText("Score:" + this.score, canvas.width - 50, 10);
    }
}