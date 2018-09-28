function Ant(x, y, dimension, dx, dy) {

    this.x = x;
    this.y = y;
    //here since we have a square ant dimension gives both height and width
    this.dimension = dimension;
    this.dx = dx;
    this.dy = dy;
    //all the ants will be alive when created
    this.isAlive = true;


    //function to generate random colors for each ant
    var getRandomColor = function () {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[generateRandomNO(16)];
        }
        return color;
    }

    this.drawAnt = function () {
        var antDiv = document.createElement('div');
        antDiv.style.background = getRandomColor();
        antDiv.style.width = this.dimension + 'px';
        antDiv.style.height = this.dimension + 'px';
       
        antDiv.style.position = 'absolute';
        antDiv.style.left = this.x + 'px';
        antDiv.style.top = this.y + 'px';

        antDiv.setAttribute('class', 'ant');
        document.body.appendChild(antDiv);
    }

    this.changePosition = function (antDiv) {
        this.x += this.dx;
        this.y += this.dy;

        antDiv.style.left = this.x + 'px';
        antDiv.style.top = this.y + 'px';
    }

    this.handleAntBorderCollision = function () {
        /**
         * i have set the x and y cordinates of the ant to the size of the div element
         * because due to random increase in the dx and dy element 
         * sometimes the ants were running out of the div
         * and beyond the scope of the collision handler function to correct
         * 
         * 4 is used here is used as a refinement factor 
         */
        if (this.x < 0) {
            //just reversing the direction the ant hits the wall
            this.dx = -this.dx;
            this.x = 4;
        } else if (this.x > GAME_WORLD_WIDTH - 4) {
            this.dx = -this.dx;
            this.x = GAME_WORLD_WIDTH - 4;
        } else if (this.y < 0) {
            this.dy = -this.dy;
            this.y = 4
        } else if (this.y > GAME_WORLD_HEIGHT - 4) {
            this.dy = -this.dy;
            this.y = GAME_WORLD_HEIGHT - 4;
        }
    }

    this.handlePlayersCollision = function (antIndex, antObjArray) {
        for (var i = 0; i < antObjArray.length; i++) {

            var otherAnt = antObjArray[i];

            // //change variable changes the orientation of the ball everytime a player hits it
            // let change = generateRandomNO(2);

            if (otherAnt.isAlive) {

                //dont compare the ant with itself
                if (i !== antIndex) {

                    if (this.x < otherAnt.x + otherAnt.dimension &&
                        this.x + this.dimension > otherAnt.x &&
                        this.y < otherAnt.y + otherAnt.dimension &&
                        this.dimension + this.y > otherAnt.y) {

                        // this.dx = -this.dx + change;
                        // this.dy = -this.dy + change;

                        this.dx = -this.dx;
                        this.dy = -this.dy;

                        // the ants that are stuck together get out
                        if (this.y < otherAnt.y) this.y -= (otherAnt.y - this.y)
                        else if (this.y > otherAnt.y) this.y -= (otherAnt.y - this.y)

                    }
                }
            }
        }
    }

    //this function check the location of the mouseclick against
    //the location of the ants
    this.handleMouseClick = function (pressX, pressY, antRef) {

        if (pressX >= this.x && (pressX <= this.x + this.dimension) &&
            (pressY >= this.y) && (pressY <= this.x + this.dimension)) {

            this.dx = 0;
            this.dy = 0;
            this.isAlive = false;
            antRef.style.background = 'white';
        }
    }

}