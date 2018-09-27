//assignment1
var currentWidth = 0;

var generateBox = function (left, top) {

    var smallDiv = document.createElement('div');
    smallDiv.style.background = "green";
    smallDiv.style.width = "20px";
    smallDiv.style.height = "20px";
    smallDiv.style.position = "absolute";
    smallDiv.style.left = left + "px";
    smallDiv.style.top = top + "px";

    smallDiv.setAttribute("class", "x");
    document.body.appendChild(smallDiv);
}
let array = [];

let generateObj = function (x, y, dx, dy) {
    array.push({
        x: x,
        y: y,
        dx: dx,
        dy: dy
    })
}

for (var i = 0; i < 10; i++) {
    generateObj(Math.floor(Math.random() * 480),
        Math.floor(Math.random() * 280),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10));
}


setInterval(function () {
    for (var x = 0; x < array.length; x++) {
        generateBox(array[x].x, array[x].y)

        console.log(array[x].x);
      
    }
}, 100);