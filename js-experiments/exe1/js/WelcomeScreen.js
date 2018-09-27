//assignment1
var currentWidth = 0;

var smallDiv = document.createElement('div');
smallDiv.style.background = "red";
smallDiv.style.width = "100px";
smallDiv.style.height = "100px";
smallDiv.style.position = "absolute";
smallDiv.style.left = "250px";
smallDiv.style.top = "0px";
document.body.appendChild(smallDiv);

var mainDiv = document.getElementsByClassName('main-div');
var containerHeight = mainDiv[0].clientHeight;

let isFalling = true;
setInterval(function () {
    if (isFalling) {
        currentWidth += 5;
        if (containerHeight < (currentWidth + 105)) isFalling = false;

    } else {
        currentWidth -= 5;
        if (currentWidth <= 5) isFalling = true;

    }
    smallDiv.style.top = currentWidth + "px";
    document.body.appendChild(smallDiv);
}, 100)
