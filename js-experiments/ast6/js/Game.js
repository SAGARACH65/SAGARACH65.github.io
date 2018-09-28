var canvas = document.getElementById("main-canvas");
var ctx = canvas.getContext("2d");
let isUpPressed = false,
    isDownPressed = false;

//road width is the width of the road and side-width is width of the side od the road
//it is 4/5th portion of the canvass
var ROAD_WIDTH = (canvas.width / 5) * 4;
//width at each side of the road
var SIDE_WIDTH = (canvas.width - ROAD_WIDTH) / 2;

var NO_OF_LANE_DIVIDERS = 10;
var LANE_DIVIDER_SPACING = 5;
var LANE_DIVIDER_WIDTH = 4;
var LANE_DIVIDER_HEIGHT = (canvas.height / NO_OF_LANE_DIVIDERS) - LANE_DIVIDER_SPACING;

var checkAndHandleCollision = function () {

}

var updateCarsLocation = function () {

}

var drawCars = function () {

}

var drawSideLanes = function () {

}

var drawRect = function (xPos, yPos, width, height, color) {
    ctx.beginPath();
    ctx.rect(xPos, yPos, width, height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

var drawLanes = function () {
    console.log('hello')
    for (i = 0; i < NO_OF_LANE_DIVIDERS; i++) {
        //draw two yellow rectangles at the end of the roads
        drawRect(60, i * 16 , 4, 8, "yellow");
        drawRect(canvas.width - 60, i * 16, 4, 8, "yellow");
    }
}

var drawRoad = function () {
    drawLanes();
    drawSideLanes();
}

var gameLoop = function () {
    //CLEARING THE SCREEN BEFORE EACH UPDDATE
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    console.log(canvas.height);
    drawRoad();
    drawCars();
    updateCarsLocation();
    checkAndHandleCollision();
}

//handling user inputs
function keyDownHandler(e) {
    if (e.keyCode == 38) {
        isUpPressed = true;
    } else if (e.keyCode == 40) {
        isDownPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 38) {
        isUpPressed = false;
    } else if (e.keyCode == 40) {
        isDownPressed = false;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


// window.requestAnimationFrame(gameLoop);
//running the animation every 10 milliseconds for 60fps.
setInterval(gameLoop, 100);