function Ant(x, y, dimension, dx, dy) {
    this.x = x;
    this.y = y;
    //here since we have a square ant dimension gives both height and width
    this.dimension = dimension;
    this.dx = dx;
    this.dy = dy;

    //function to generate random colors for each ant
    var getRandomColor = function () {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[generateRandomNO(16)];
        }
        return color;
    }

    this.draw = function () {
        var antDiv = document.createElement('div');
        antDiv.style.background = getRandomColor();
        antDiv.style.width = this.dimension + 'px';
        antDiv.style.height = this.dimension + 'px';
        antDiv.style.position = 'absolute';
        antDiv.style.left = this.x + 'px';
        antDiv.style.top = this.y + 'px';

        antDiv.addEventListener('click', function () {

            removeAnt(antDiv);
            document.body.removeChild(antDiv);
        });

        antDiv.setAttribute('class', 'ant');
        document.body.appendChild(antDiv);
    }

    this.changePosition = function () {
        this.x += this.dx;
        this.y += this.dy;
    }

    this.invertChangeInX = function () {
        this.dx = -this.dx;
    }

    this.invertChangeInY = function () {
        this.dy = -this.dy;
    }

    this.handleLeftRightWorldExceed = function (value) {
        this.x = value;
    }

    this.handleTopBottomWorldExceed = function (value) {
        this.y = value;
    }

    this.handleAntsOverLap = function (otherAntYPos) {
        this.y -= (otherAntYPos - this.y);
    }
}