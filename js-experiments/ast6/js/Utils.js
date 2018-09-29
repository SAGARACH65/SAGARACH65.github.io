var drawImage = function (src, x, y, width, height) {
    var img = new Image();
    img.src = src;
    ctx.drawImage(img, x, y, width, height);
}

var drawRect = function (xPos, yPos, width, height, color) {
    ctx.beginPath();
    ctx.rect(xPos, yPos, width, height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

