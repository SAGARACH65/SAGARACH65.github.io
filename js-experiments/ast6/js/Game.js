var LANE_X_POS = [60, 118.33, 176.66, 235];
var ROAD_WIDTH = 600;
//width at each side of the road.
var SIDE_LANE_WIDTH = 100;
var NO_OF_LANE_DIVIDERS = 4;

//between each other
var LANE_DIVIDER_SPACING = 15;
//x position for different lanes
var LANE_DIVIDER_WIDTH = 2;
var PROTAGONIST_SPEED = 4;
var OPPONENT_CAR_IMAGES = ['images/car2.png', 'images/car3.png', 'images/car1.png', 'images/car5.png'];
var LANE_DIVIDER_HEIGHT;

function Game(canvas_id) {
    var that = this;
    this.canvas = document.getElementsByClassName(canvas_id)[0];

    var ctx = this.canvas.getContext('2d');
    var currentScore = 0;

    var isRightPressed = false,
        isLeftPressed = false;

    var mainCar = new Car(82, 123, 4, 'images/car4.png');
    var road = new Background(this.canvas.height, this.canvas.width);

    var opponentCarsArr = [];

    var showGameEndScreen = function () {

        clearInterval(mainLoop);
        ctx.font = ' Comic Sans MS';
        ctx.fillStyle = 'white';
        ctx.fillText('Score:' + currentScore, that.canvas.width / 2 - 30, that.canvas.height / 2 - 20);
        ctx.fillText('GAME OVER!!', that.canvas.width / 2 - 40, that.canvas.height / 2);
    }

    var handleCollision = function () {
        //collision is handle by showing the score, stopping the loop and storing if current score is the highest score
        ctx.clearRect(0, 0, that.canvas.width, that.canvas.height);

        showGameEndScreen();

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
        //if the opponent exceeds the window remove them form the array
        for (var i = opponentCarsArr.length - 1; i >= 0; i--) {
            if (opponentCarsArr[i].y > that.canvas.height) opponentCarsArr.splice(i, 1);
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

                    opponentCarsArr.push(new Car(LANE_X_POS[x] + 20, yPos, speed, img));
                }
            }
        } else {
            for (var i = 0; i < opponentCarsArr.length; i++) {
                opponentCarsArr[i].draw(ctx);
            }
        }
    }

    var drawCars = function () {
        mainCar.draw(ctx);
        drawEnemyCars(ctx);
    }

    var showScore = function () {
        var scoreDiv = document.getElementsByClassName('score')[0];
        scoreDiv.innerHTML = 'SCORE : ' + currentScore;

        var highScoreDiv = document.getElementsByClassName('high-score')[0];
        highScoreDiv.innerHTML = 'HIGH SCORE : ' + getHighScore();

    }
    var updateScore = function () {
        currentScore++;
    }

    var mainLoop;
    var gameLoop = function () {
        //  CLEARING THE SCREEN BEFORE EACH UPDATE
        ctx.clearRect(0, 0, that.canvas.width, that.canvas.height);

        road.draw(ctx);

        drawCars();
        updateCarsLocation();
        //if the opponent exceed the window we draw new opponents
        checkIfOpponentHaveExceededWidow();
        checkAndHandleCollision();
        showScore();
        updateScore();
    }

    //handling user inputs


    this.rightSideKeyDownHandlerKey = function (e) {
        if (e.keyCode == 39) {
            isRightPressed = true;
        } else if (e.keyCode == 37) {
            isLeftPressed = true;
        }
    }

    this.rightSideKeyUpHandlerKey = function (e) {
        if (e.keyCode == 39) {
            isRightPressed = false;
        } else if (e.keyCode == 37) {
            isLeftPressed = false;
        }
    }
    this.leftSideKeyDownHandler = function (e) {
        if (e.keyCode == 68) {
            isRightPressed = true;
        } else if (e.keyCode == 65) {
            isLeftPressed = true;
        }
    }

    this.leftSideKeyUpHandler = function (e) {
        if (e.keyCode == 68) {
            isRightPressed = false;
        } else if (e.keyCode == 65) {
            isLeftPressed = false;
        }
    }


    var resetGame = function () {
        currentScore = 0;
        clearInterval(mainLoop);
        opponentCarsArr = [];
        that.startGame();
    }

    this.startGame = function () {
        LANE_DIVIDER_HEIGHT = (that.canvas.height / NO_OF_LANE_DIVIDERS) - LANE_DIVIDER_SPACING;
        document.getElementsByClassName('reset')[0].addEventListener('click', resetGame);

        //running the animation  for 60fps.
        mainLoop = setInterval(gameLoop, 1000 / 60);
    }
}


var game2 = new Game('second-canvas');
var game1 = new Game('main-canvas');

document.addEventListener('keydown', game2.leftSideKeyDownHandler, false);
document.addEventListener('keyup', game2.leftSideKeyUpHandler, false);

document.addEventListener('keydown', game1.rightSideKeyDownHandlerKey, false);
document.addEventListener('keyup', game1.rightSideKeyUpHandlerKey, false);



game1.startGame();
game2.startGame();