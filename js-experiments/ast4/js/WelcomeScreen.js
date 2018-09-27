var boxArr = [];


var gameWorldHeight = 280,
    gameWorldWidth = 480;

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


//index stops us from comparing the same box with itself
var handlePlayersCollision = function (box, boxIndex) {
    for (var i = 0; i < boxArr.length; i++) {
        var otherBox = boxArr[i];

        //change variable changes the orientation of the ball everytime a player hits it
        let change = generateRandomNO(1);

        //dont compare the box with itself
        if (i !== boxIndex) {
            //as we have a square box width==height
            if (box.x < otherBox.x + otherBox.width &&
                box.x + box.width > otherBox.x &&
                box.y < otherBox.y + otherBox.width &&
                box.width + box.y > otherBox.y) {

                console.log('hit')
                box.dx = -box.dx + change;
                box.dy = -box.dy + change;

                otherBox.dx = -otherBox.dx + change;
                otherBox.dy = -otherBox.dy + change;
            }
        }
    }
}

var handleBoxBorderCollision = function (box) {

    /**
     * i have set the x and y cordinates of the box to the size of the div element
     * because due to random increase in the dx and dy element 
     * sometimes the boxes were running out of the div
     * and beyond the scope of the collision handler function to correct
     * 
     * 4 is used here is used as a refinement factor 
     */
    if (box.x < 0) {
        //just reversing the direction the box hits the wall
        box.dx = -box.dx;
        box.x = 4;
    } else if (box.x > gameWorldWidth - 4) {
        box.dx = -box.dx;
        box.x = gameWorldWidth - 4;
    } else if (box.y < 0) {
        box.dy = -box.dy;
        box.y = 4
    } else if (box.y > gameWorldHeight - 4) {
        box.dy = -box.dy;
        box.y = gameWorldHeight - 4;
    }

}

var handleCollision = function (box, index) {
    handleBoxBorderCollision(box);
    handlePlayersCollision(box, index);
}

var changePosition = function (boxRef, box) {
    box.x += box.dx;
    box.y += box.dy;

    boxRef.style.left = box.x + 'px';
    boxRef.style.top = box.y + 'px';
}


var gameLoop = function () {
    var boxDiv = document.getElementsByClassName('box');

    for (var i = 0; i < boxArr.length; i++) {

        //updates the position of the ball with the velocity
        changePosition(boxDiv[i], boxArr[i]);

        // we send the variable i so that we dont compare the box with itself 
        handleCollision(boxArr[i], i);

    }
}


//function to generate random colors for each box
var getRandomColor = function () {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[generateRandomNO(16)];
    }
    return color;
}

var drawBox = function (box) {

    var smallDiv = document.createElement('div');
    smallDiv.style.background = getRandomColor();
    smallDiv.style.width = box.width + "px";
    smallDiv.style.height = box.width + "px";
    smallDiv.style.position = "absolute";
    smallDiv.style.left = box.x + "px";
    smallDiv.style.top = box.y + "px";

    smallDiv.setAttribute("class", "box");
    document.body.appendChild(smallDiv);
}

/**
 * 
 * @param {number} x the original x coordinate of the box   
 * @param {number} y the original y coordinate of the box
 *@param {number} width as we have a square box it is the same 
 * @param {number} dx the rate of change of x coordinate
 * @param {number} dy the rate of change of y coordinate
 */
var generateBox = function (x, y, width, dx, dy) {

    boxArr.push({
        x: x,
        y: y,
        width: width,
        dx: dx,
        dy: dy
    })
}

var generateBoxes = function () {
    for (var i = 0; i < 20; i++) {

        generateBox(generateRandomNO(gameWorldWidth), generateRandomNO(gameWorldHeight), generateRandomNO(20, 15), generateRandomNO(10, 3), generateRandomNO(10, 3));

        drawBox(boxArr[i]);
    }
}

//initially the box objects are generated and the game loop is run
generateBoxes();
//runs the main game loop
setInterval(gameLoop, 20);