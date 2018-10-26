class Enemies {

    constructor(acceleration, maxSpeed, xPos, zPos) {
        this.speed = 0;
        this.acceleration = acceleration;
        this.maxSpeed = maxSpeed;
        this.x = xPos;
        this.zPos = zPos;
    }

    updateSpeed() {
        (!(this.speed > this.maxSpeed)) ? this.speed += this.acceleration : this.speed = this.maxSpeed;
    }

    updateZPos() {
        this.zPos += this.speed;
    }

    updateX(increment) {
        this.x += increment;
        if ((this.x < -1.3 || this.x > 0.8)) this.x -= increment;
    }

    draw(ctx, image, sprite, destX, destY) {
        let spriteSheet = new Image();
        spriteSheet.src = image;

        ctx.drawImage(spriteSheet, sprite.x, sprite.y, sprite.w,
            sprite.h, destX, destY, PLAYER_WIDTH * ASPECT_RATIO, PLAYER_HEIGHT * ASPECT_RATIO);

    }

}