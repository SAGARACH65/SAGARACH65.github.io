function Car(x, y, speed, src) {

    this.height = 24;
    this.y = y;
    this.x = x;
    this.width = 29;
    this.src = src;
    this.speed = speed;

    this.draw = function () {
        drawImage(this.src, this.x, this.y, this.width, this.height);
    }

    //used only by the enemy car 
    this.updateY = function () {
        this.y += this.speed;
    }

    //used only by the protaganists car
    this.updateX = function (direction) {
        if (direction === 'right') this.x += this.speed;
        else this.x -= this.speed;
    }
}