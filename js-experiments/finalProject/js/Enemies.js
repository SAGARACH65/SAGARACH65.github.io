class Enemies {

    constructor(acceleration, maxSpeed, index, zPos, name) {
        this.speed = 0;
        this.acceleration = acceleration;
        this.maxSpeed = maxSpeed;
        this.x = this.calculateRandomXPos(index);
        this.zPos = zPos;
        this.name = name;
    }

    //randomly generates the starting position of the enemy cars
    calculateRandomXPos(index) {
        let sign = (generateRandomNO(-1, 2) === 0) ? -1 : 1;
        return (sign * (index + 1) * 2);
    }

    updateSpeed() {
        (!(this.speed >= this.maxSpeed)) ? this.speed += this.acceleration : this.speed = this.maxSpeed;
    }

    updateZPos() {
        this.zPos += this.speed;
    }

    updateX(increment) {
        this.x += increment;
        if ((this.x < -1.3 || this.x > 0.8)) this.x -= increment;
    }

    draw(ctx, image, sprite, destX, destY, width, height) {
        let spriteSheet = new Image();
        spriteSheet.src = image;

        ctx.drawImage(
            spriteSheet,
            sprite.x,
            sprite.y,
            sprite.w,
            sprite.h,
            destX,
            destY,
            width,
            height
        );

    }

}