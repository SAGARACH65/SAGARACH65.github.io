var canvas = document.getElementById("main-canvas");
var ctx = canvas.getContext("2d");


var checkCollision = function () {

}

var updateCarsLocation = function () {

}

var drawCars = function () {

}


var gameLoop = () => {
    drawCars();
    updateCarsLocation();
    checkCollision();
}



window.requestAnimationFrame(gameLoop);
//running the animation every 10 milliseconds for 60fps.
// setInterval(gameLoop, 10);