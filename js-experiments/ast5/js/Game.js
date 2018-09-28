var antArr = [];
var antDiv;
var currentScore = 0;

var GAME_WORLD_HEIGHT = 670,
    GAME_WORLD_WIDTH = 670,
    ANT_COUNT = 24,
    MAXIMUM_ANT_WIDTH = 25,
    MINIMUM_ANT_WIDTH = 21,
    MAXIMUM_RATE_OF_CHANGE = 5, //ie maximum dx or dy
    MINIMUM_RATE_OF_CHANGE = 3;

var removeAnt = function (clickedAnt) {

    for (var i = antArr.length - 1; i >= 0; i--) {
        if (antDiv[i] === clickedAnt) {
          
            antArr.splice(i, 1);

            //since ant is removed increase the score
            currentScore++;
        }
    }
}

var handlePlayersCollision = function (currentAntIndex) {

    for (var i = 0; i < antArr.length; i++) {
        var otherAnt = antArr[i];
        var currentAnt = antArr[currentAntIndex];

        if (otherAnt.isAlive) {

            //dont compare the ant with itself
            if (i !== currentAntIndex) {

                if (currentAnt.x < otherAnt.x + otherAnt.dimension &&
                    currentAnt.x + currentAnt.dimension > otherAnt.x &&
                    currentAnt.y < otherAnt.y + otherAnt.dimension &&
                    currentAnt.dimension + currentAnt.y > otherAnt.y) {

                    //reverses dx and dy
                    currentAnt.invertChangeInX();
                    currentAnt.invertChangeInY();

                    otherAnt.invertChangeInX();
                    otherAnt.invertChangeInY();

                    // the ants that are stuck together get out
                    if (currentAnt.y < otherAnt.y || currentAnt.y > otherAnt.y) currentAnt.handleAntsOverLap(otherAnt.y);

                }
            }
        }
    }
}

var handleAntBorderCollision = function (ant) {
    /**
     * set x and y cordinates of the ant to the size of the div element
     * because due to random increase in the dx and dy element 
     * sometimes the ants were running out of the div
     * and beyond the scope of the collision handler function to correct
     * 
     * 4 is used here is used as a refinement factor 
     */
   
    if (ant.x < 0) {
        ant.invertChangeInX();
        //left world exit so 0+4 is used
        ant.handleLeftRightWorldExceed(4);

    } else if (ant.x > GAME_WORLD_WIDTH - 4) {

        ant.invertChangeInX();
        ant.handleLeftRightWorldExceed(GAME_WORLD_WIDTH - 4);

    } else if (ant.y < 0) {

        ant.invertChangeInY();
        ant.handleTopBottomWorldExceed(4);

    } else if (ant.y > GAME_WORLD_HEIGHT - 4) {

        ant.invertChangeInY();
        ant.handleTopBottomWorldExceed(GAME_WORLD_HEIGHT - 4);

    }
}

var handleCollision = function (ant, index) {

    handleAntBorderCollision(ant);
    handlePlayersCollision(index);
}

var changePositionOfAntInDOM = function (ant, leftMargin, topMargin) {
    ant.style.left = leftMargin + 'px';
    ant.style.top = topMargin + 'px';
}

var showScore = function () {
    var scoreDiv = document.getElementsByClassName('score')[0];
    scoreDiv.innerHTML = 'SCORE : ' + currentScore;
}

var gameLoop = function () {

    for (var i = 0; i < antArr.length; i++) {
        var ant = antArr[i]

        //updates the position of the ball with the velocity
        ant.changePosition(antDiv[i]);

        changePositionOfAntInDOM(antDiv[i], ant.x, ant.y);

        if (ant.isAlive) {
            // we send the variable i so that we dont compare the ant with itself 
            handleCollision(antArr[i], i);
        }

        showScore();
    }
}

var generateAndDrawAnt = function (x, y, dimension, dx, dy) {
    var ant = new Ant(x, y, dimension, dx, dy);

    antArr.push(ant);

    //draw the Ant
    ant.draw();
}

var generateAndDrawAnts = function () {
    for (var i = 0; i < ANT_COUNT; i++) {

        //generating random coordinates for the ants
        generateAndDrawAnt(
            generateRandomNO(GAME_WORLD_WIDTH),
            generateRandomNO(GAME_WORLD_HEIGHT),
            generateRandomNO(MAXIMUM_ANT_WIDTH, MINIMUM_ANT_WIDTH),
            generateRandomNO(MAXIMUM_RATE_OF_CHANGE, MINIMUM_RATE_OF_CHANGE),
            generateRandomNO(MAXIMUM_RATE_OF_CHANGE, MINIMUM_RATE_OF_CHANGE)
        );
    }
}

//used so we can clear the previous setinterval after each reset
var gameLoopReference;
var startGame = function () {

    //initially the ant objects are generated and the game loop is run
    generateAndDrawAnts();
    antDiv = document.getElementsByClassName('ant');
    

    //runs the main game loop
    gameLoopReference = setInterval(gameLoop, 20);
}

var resetGame = function () {

    //clear all the previous variables and then start the game again
    antArr = [];
    currentScore = 0;
    for (var i = antDiv.length - 1; i >= 0; i--) {
        document.body.removeChild(antDiv[i]);
    }
    //clear the previous iteration of the loop
    clearInterval(gameLoopReference);

    startGame();
}

document.getElementsByClassName("reset")[0].addEventListener("click", resetGame);

startGame();