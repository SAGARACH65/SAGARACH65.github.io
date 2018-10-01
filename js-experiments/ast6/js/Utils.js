var drawImage = function (src, x, y, width, height) {
    var img = new Image();
    img.src = src;
    ctx.drawImage(img, x, y, width, height);
    ctxSecond.drawImage(img, x, y, width, height);
}

var drawRect = function (xPos, yPos, width, height, color) {
    ctx.beginPath();
    ctx.rect(xPos, yPos, width, height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
    ctxSecond.beginPath();
    ctxSecond.rect(xPos, yPos, width, height);
    ctxSecond.fillStyle = color;
    ctxSecond.fill();
    ctxSecond.closePath();
}

/**
 * 
 * @param {number}min-the minimum number which the function should return(default value is 1)
 * @param {number}max-the maximum number the function should return(default value is 0)
 * 
 * returns{number}
 */
var generateRandomNO = function (max = 1, min = 0) {

    return (Math.floor(Math.random() * (max - min + 1)) + min);
}

var storeHighScore = function (score) {
    localStorage.highScore = score;
}
var getHighScore = function () {
    return (parseInt(localStorage.highScore));
}