var images = ['images/background.png', 'images/background-day.png'];

class Background {
    constructor() {
        this.image = images[generateRandomNO(-1, 2)];
    }

    showBackgroundImage() {
        drawImage(this.image,0,0,canvas.width, canvas.height)
    }

    showFloor() {
         drawImage('images/floor2.png',0, canvas.height - 16, canvas.width, 8);
   
    }

    showFloor2() {
        drawImage('images/floor.png', 0, canvas.height - 12, canvas.width, 12);
        
    }
}