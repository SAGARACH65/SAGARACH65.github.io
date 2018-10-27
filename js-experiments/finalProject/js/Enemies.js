class Enemies {

    constructor(maxSpeed, index, zPos, name) {
        this.speed = 0;
        this.maxSpeed = maxSpeed;
        this.acceleration = maxSpeed / ENEMY_ACCELERATION_FACTOR;
        this.x = this.calculateRandomXPos(index);
        this.zPos = zPos;
        this.name = name;
        this.isOverFinishLine = false;
        this.spriteLocation = this.findRandomImage();
    }

    findRandomImage() {
        return ENEMY_IMAGES[generateRandomNO(-1, ENEMY_IMAGES.length)];
    }

    checkIfEnemyCrossedFinishLine() {
        if (this.zPos >= TOTAL_LENGTH_OF_ROAD * ROAD_PARAM.SEGMENT_LENGTH) this.isOverFinishLine = true;
    }

    //randomly generates the starting position of the enemy cars
    calculateRandomXPos(index) {
        let sign = (generateRandomNO(-1, 2) === 0) ? -1 : 1;
        return (sign * (index + 1) * 2);
    }

    updateSpeed() {
        //stop the car after they have reached the finish line
        if (!this.isOverFinishLine)
            (!(this.speed >= this.maxSpeed)) ? this.speed += this.acceleration : this.speed = this.maxSpeed;
        else
            (!(this.speed <= 0)) ? this.speed -= this.acceleration : this.speed = 0;
    }

    updateZPos() {
        this.zPos += this.speed;
    }

    updateX(increment) {
        this.x += increment;
        if ((this.x < -1.3 || this.x > 0.8)) this.x -= increment;
    }

    draw(ctx, curvature, destX, destY, width, height) {
        let spriteSheet = new Image();
        spriteSheet.src = 'images/enemies.png';
        let sprite;

        if (curvature < 0) sprite = this.spriteLocation.carLeft;
        else if (curvature > 0) sprite = this.spriteLocation.carRight;
        else sprite = this.spriteLocation.carCentre;

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