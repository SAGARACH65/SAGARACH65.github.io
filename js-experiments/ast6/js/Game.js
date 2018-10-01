var canvas = document.getElementById('main-canvas');
var ctx = canvas.getContext('2d');
var currentScore = 0;

var isRightPressed = false,
    isLeftPressed = false;

var mainCar = new Car(82, 123, 4, 'images/car4.png');

var OPPONENT_CAR_IMAGES = ['images/car2.png', 'images/car3.png', 'images/car1.png', 'images/car5.png'];
var opponentCarsArr = [];

var ROAD_WIDTH = 600;
//width at each side of the road.
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

var PROTAGONIST_SPEED = 4;


var handleCollision = function () {
    //collision is handle by showing the score, stopping the loop and storing if current score is the highest score
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    clearInterval(mainLoop);

    ctx.fillStyle = 'white';
    ctx.fillText("Score:" + currentScore, canvas.width / 2 - 30, canvas.height / 2 - 20);
    ctx.fillText("GAME OVER!!", canvas.width / 2 - 40, canvas.height / 2);

    //this is used to check if the variable has been set. 
    if (localStorage.highScore) {
        var hightScore = getHighScore();
        if (currentScore > hightScore) storeHighScore(currentScore);
    } else {
        storeHighScore(currentScore);
    }
}

var checkAndHandleCollision = function () {
    for (var i = 0; i < opponentCarsArr.length; i++) {

        var opponentCar = opponentCarsArr[i];

        if (mainCar.x < opponentCar.x + opponentCar.width &&
            mainCar.x + mainCar.width > opponentCar.x &&
            mainCar.y < opponentCar.y + opponentCar.height &&
            mainCar.height + mainCar.y > opponentCar.y) {

            handleCollision();
        }
    }
}

var updateOpponentCar = function () {
    for (var i = 0; i < opponentCarsArr.length; i++) {
        opponentCarsArr[i].updateY();
    }
}

var checkIfOpponentHaveExceededWidow = function () {
    //if the opponent exceeeds the window remove them form the array
    for (var i = opponentCarsArr.length - 1; i >= 0; i--) {
        if (opponentCarsArr[i].y > canvas.height) opponentCarsArr.splice(i, 1);
    }
}

var updateMainCar = function () {

    if (isRightPressed) {
        //only update if car wont exceed the track
        if (mainCar.x + PROTAGONIST_SPEED < LANE_X_POS[3] - 23) mainCar.updateX('right');
    }
    if (isLeftPressed) {
        if (mainCar.x - PROTAGONIST_SPEED > LANE_X_POS[0]) mainCar.updateX('left');
    }
}

var updateCarsLocation = function () {
    updateMainCar();
    updateOpponentCar();
}

var drawEnemyCars = function () {

    //if no cars in the screen draw new cars
    if (opponentCarsArr.length === 0) {
        //determines in which lane there will be no obstacle
        var emptyLane = generateRandomNO(-1, 3);

        for (var x = 0; x < LANE_X_POS.length - 1; x++) {
            if (emptyLane !== x) {

                var speed = generateRandomNO(1, 4);
                //we generate a random image for each car
                var img = OPPONENT_CAR_IMAGES[generateRandomNO(-1, OPPONENT_CAR_IMAGES.length)];
                var yPos = generateRandomNO(generateRandomNO(-200, 0), 0);
                //the y position can be between 0 and some random number between 0 and 50
                opponentCarsArr.push(new Car(LANE_X_POS[x] + 20, yPos, speed, img));
            }
        }

    } else {
        for (var i = 0; i < opponentCarsArr.length; i++) {
            opponentCarsArr[i].draw();
        }
    }
}

var drawCars = function () {
    mainCar.draw();
    drawEnemyCars();
}

var drawSideLanes = function () {

    //this version is for moving side lanes
    var currentY = laneTracker;
    for (var i = 0; i < 8; i++) {
        //drawing side-left lane
        drawRect(0, currentY, LANE_X_POS[0] - 2, 20, ' #388E3C');
        drawRect(0, currentY + 20, LANE_X_POS[0] - 2, 20, ' #4CAF50');
        //drawing right side lane
        drawRect(LANE_X_POS[3] + 4, currentY, LANE_X_POS[0] + 2, 20, ' #388E3C');
        drawRect(LANE_X_POS[3] + 4, currentY + 20, LANE_X_POS[0] + 2, 20, ' #4CAF50');

        currentY += 40;
    }

//    // for static side lanes
//     drawRect(0, 0, LANE_X_POS[0] - 2, canvas.height, ' #C6C7CB');
//     drawRect(LANE_X_POS[3] + 4, 0, LANE_X_POS[0], canvas.height, ' #C6C7CB');
}

/**
 * individual lane refers to the single strip of lines running from the start to end
 * @param {number} x :the x coordinate of the individual lane 
 * @param {string} color: the color of the box to make(either yellow or white) 
 */
var drawIndividualLane = function (x, color) {

    var currentY = laneTracker;
    for (var i = 0; i < NO_OF_LANE_DIVIDERS * 2; i++) {
        drawRect(x, currentY + x / 10, LANE_DIVIDER_WIDTH, LANE_DIVIDER_HEIGHT, color);
        currentY += LANE_DIVIDER_HEIGHT + LANE_DIVIDER_SPACING;
    }
    //for resetting the position of the lanes at certain intervals
    if (laneTracker > -20) laneTracker = -canvas.height;
}


var drawLanes = function () {
    //yellow separator between the left sideLane and the road
    drawIndividualLane(LANE_X_POS[0], '#B89E4A');

    //the white separators between lanes making the 3 lanes
    drawIndividualLane(LANE_X_POS[1], 'white');
    drawIndividualLane(LANE_X_POS[2], 'white');

    //yellow separator between the right sideLane and the road
    drawIndividualLane(LANE_X_POS[3], '#B89E4A');
}

var drawRoad = function () {
    drawLanes();
    //things that are present at the side of the road
    drawSideLanes();
    laneTracker += 1.2;
}

var showScore = function () {
    var scoreDiv = document.getElementsByClassName('score')[0];
    scoreDiv.innerHTML = 'SCORE : ' + currentScore;

    var highScoreDiv = document.getElementsByClassName('high-score')[0];
    highScoreDiv.innerHTML = 'HIGH SCORE : ' + getHighScore();

}
var updateScore = function () {
    currentScore += 1;
}

var gameLoop = function () {
    //CLEARING THE SCREEN BEFORE EACH UPDATE
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //setting th background color of the canvass
    ctx.fillStyle = '#333335';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawRoad();

    drawCars();
    updateCarsLocation();
    //if the opponent exceed the window we draw new opponents
    checkIfOpponentHaveExceededWidow();
    checkAndHandleCollision();
    showScore();
    updateScore();
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

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

// window.requestAnimationFrame(gameLoop);

var resetGame = function () {
    clearInterval(mainLoop);
    currentScore = 0;
    opponentCarsArr = [];
    startGame();
}

document.getElementsByClassName('reset')[0].addEventListener('click', resetGame);

var mainLoop;
var startGame = function () {
    //running the animation  for 60fps.

    mainLoop = setInterval(gameLoop, 1000 / 60);
}

startGame();