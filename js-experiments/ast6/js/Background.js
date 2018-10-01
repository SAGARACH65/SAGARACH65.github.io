function Background() {
    var that=this;
    //checks the y position of the lane 
    this.laneTracker = -canvas.height;


    var drawSideLanes = function () {

        //this version is for moving side lanes
        var currentY = that.laneTracker;
        for (var i = 0; i < 8; i++) {
            //drawing side-left lane
            drawRect(0, currentY, LANE_X_POS[0] - 2, 20, ' #388E3C');
            drawRect(0, currentY + 20, LANE_X_POS[0] - 2, 20, ' #4CAF50');
            //drawing right side lane
            drawRect(LANE_X_POS[3] + 4, currentY, LANE_X_POS[0] + 2, 20, ' #388E3C');
            drawRect(LANE_X_POS[3] + 4, currentY + 20, LANE_X_POS[0] + 2, 20, ' #4CAF50');
          
            currentY += 40;
        }

        //    // for static side lanes
        //     drawRect(0, 0, LANE_X_POS[0] - 2, canvas.height, ' #C6C7CB');
        //     drawRect(LANE_X_POS[3] + 4, 0, LANE_X_POS[0], canvas.height, ' #C6C7CB');
    }

    /**
     * individual lane refers to the single strip of lines running from the start to end
     * @param {number} x :the x coordinate of the individual lane 
     * @param {string} color: the color of the box to make(either yellow or white) 
     */
    var  drawIndividualLane = function (x, color) {
       
        
        var currentY = that.laneTracker;
        for (var i = 0; i < NO_OF_LANE_DIVIDERS * 2; i++) {
            
            drawRect(x, currentY + x / 10, LANE_DIVIDER_WIDTH, LANE_DIVIDER_HEIGHT, color);
            currentY += LANE_DIVIDER_HEIGHT + LANE_DIVIDER_SPACING;
        }
        //for resetting the position of the lanes at certain intervals
        if (that.laneTracker > -20) that.laneTracker = -canvas.height;
  
    }

    var drawLanes = function () {
        
        //yellow separator between the left sideLane and the road
        drawIndividualLane(LANE_X_POS[0], '#B89E4A');

        //the white separators between lanes making the 3 lanes
        drawIndividualLane(LANE_X_POS[1], 'white');
        drawIndividualLane(LANE_X_POS[2], 'white');

        //yellow separator between the right sideLane and the road
        drawIndividualLane(LANE_X_POS[3], '#B89E4A');
    }

    this.draw = function () {
        
        drawLanes();
        //things that are present at the side of the road
        drawSideLanes();
        this.laneTracker += 1.2;
    }
};