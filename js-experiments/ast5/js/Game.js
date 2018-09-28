var antArr = [];

var GAME_WORLD_HEIGHT = 665,
    GAME_WORLD_WIDTH = 665,
    ANT_COUNT = 5,
    MAXIMUM_ANT_WIDTH = 30,
    MINIMUM_ANT_WIDTH = 20,
    MAXIMUM_RATE_OF_CHANGE = 4, //ie maximum dx or dy
    MINIMUM_RATE_OF_CHANGE = 2;

/**
 * 
 * @param {number}min-the minimum number which the function should return(default value is 1)
 * @param {number}max-the maximum number the function should return(default value is 0)
 * 
 * returns{number}
 */
var generateRandomNO = function (max = 1, min = 0) {
    return (Math.floor(Math.random() * max) + min);
}

var handleCollision = function (ant, index) {
    //  console.log(ant);
    ant.handleAntBorderCollision();
    ant.handlePlayersCollision(index, antArr);
}

var gameLoop = function () {
    var antDiv = document.getElementsByClassName('ant');

    for (var i = 0; i < antArr.length; i++) {

        //updates the position of the ball with the velocity
        antArr[i].changePosition(antDiv[i]);

        // we send the variable i so that we dont compare the ant with itself 
        handleCollision(antArr[i], i);

    }
}

var generateAndDrawAnt = function (x, y, dimension, dx, dy) {
    var ant = new Ant(x, y, dimension, dx, dy);
    antArr.push(ant);

    //draw the Ant
    ant.drawAnt();
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

//initially the ant objects are generated and the game loop is run
generateAndDrawAnts()

//runs the main game loop
setInterval(gameLoop, 20);