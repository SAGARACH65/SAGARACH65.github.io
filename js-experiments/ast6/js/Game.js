var canvas = document.getElementById("main-canvas");
var ctx = canvas.getContext("2d");

var isRightPressed = false,
    isLeftPressed = false;

var mainCar = new Car();

var ROAD_WIDTH = 600;

//width at each side of the road
var SIDE_LANE_WIDTH = 100;
var NO_OF_LANE_DIVIDERS = 4;

//checks the y position of the lane  
var laneTracker = -canvas.height;

//between each other
var LANE_DIVIDER_SPACING = 15;
//x position for different lanes
var LANE_X_POS = [60, 118.33, 176.66, 235];
var LANE_DIVIDER_WIDTH = 2;
var LANE_DIVIDER_HEIGHT = (canvas.height / NO_OF_LANE_DIVIDERS) - LANE_DIVIDER_SPACING;


var checkAndHandleCollision = function () {

}

var updateCarsLocation = function () {
    if (isRightPressed) {
        mainCar.x += 2;
    }
    if (isLeftPressed) {
        mainCar.x -= 2;
    }
}

var drawCars = function () {
    mainCar.draw();
}


var drawSideLanes = function () {
    var currentY = laneTracker;
    // for (let i = 0; i < 8; i++) {
    //     //drawing side-left lane
    //     drawRect(0, currentY, LANE_X_POS[0] - 2, 20, " #388E3C");
    //     drawRect(0, currentY + 20, LANE_X_POS[0] - 2, 20, " #4CAF50");
    //     //drawing right side lane
    //     drawRect(LANE_X_POS[3] + 4, currentY, LANE_X_POS[0] + 2, 20, " #388E3C");
    //     drawRect(LANE_X_POS[3] + 4, currentY + 20, LANE_X_POS[0] + 2, 20, " #4CAF50");

    //     currentY += 40;
    // }
    
    drawRect(0, 0, LANE_X_POS[0] - 2, canvas.height, " #C6C7CB");
    drawRect(LANE_X_POS[3]+4 , 0, LANE_X_POS[0] , canvas.height, " #C6C7CB");

    
}

/**
 * individual lane refers to the single strip of lines running from the start to end
 * @param {number} x :the x coordinate of the individual lane 
 * @param {string} color: the color of the box to make(either yellow or white) 
 */
var drawIndividualLane = function (x, color) {

    var currentY = laneTracker;
    for (let i = 0; i < NO_OF_LANE_DIVIDERS * 2; i++) {
        drawRect(x, currentY + x / 10, LANE_DIVIDER_WIDTH, LANE_DIVIDER_HEIGHT, color);
        currentY += LANE_DIVIDER_HEIGHT + LANE_DIVIDER_SPACING;
    }
    //for resetting the position of the lanes at certain intervals
    if (laneTracker > -20) laneTracker = -canvas.height;

}


var drawLanes = function () {
    //yellow separator between the left sideLane and the road
    drawIndividualLane(LANE_X_POS[0], '#B89E4A')

    //the white separators between lanes making the 3 lanes
    drawIndividualLane(LANE_X_POS[1], 'white')
    drawIndividualLane(LANE_X_POS[2], 'white')

    //yellow separator between the right sideLane and the road
    drawIndividualLane(LANE_X_POS[3], '#B89E4A')

}

var drawRoad = function () {
    drawLanes();
    //things that are present at the side of the road
    drawSideLanes();
    laneTracker += 1.2;

}

var gameLoop = function () {
    //CLEARING THE SCREEN BEFORE EACH UPDATE
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //setting th background color of the canvass
    ctx.fillStyle = "#333335";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawRoad();
    drawCars();
    updateCarsLocation();
    checkAndHandleCollision();
}

//handling user inputs
function keyDownHandler(e) {
    if (e.keyCode == 39) {
        isRightPressed = true;
    } else if (e.keyCode == 37) {
        isLeftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        isRightPressed = false;
    } else if (e.keyCode == 37) {
        isLeftPressed = false;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


// window.requestAnimationFrame(gameLoop);

//running the animation  for 60fps.
setInterval(gameLoop, 1000 / 60);