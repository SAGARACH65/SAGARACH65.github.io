function Car() {

    this.height = 22;
    //75 is the height of the image used for the car
    this.y = canvas.height - this.height-5;
    this.x = 82;
    this.width = 20;
    this.src = "images/car1.png"

    this.draw = function () {
        drawImage(this.src, this.x, this.y, this.width, this.height);
    }

}