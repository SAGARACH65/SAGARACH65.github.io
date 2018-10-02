function Background(height,width) {
    var that = this;
    //checks the y position of the lane 
    this.laneTracker = -height;
    this.height=height;
    this.width=width;

    var drawSideLanes = function (ctx) {

        // //this version is for moving side lanes
        // var currentY = that.laneTracker;
        // for (var i = 0; i < 8; i++) {
        //     //drawing side-left lane
        //     drawRect(0, currentY, LANE_X_POS[0] - 2, 20, ' #388E3C');
        //     drawRect(0, currentY + 20, LANE_X_POS[0] - 2, 20, ' #4CAF50');
        //     //drawing right side lane
        //     drawRect(LANE_X_POS[3] + 4, currentY, LANE_X_POS[0] + 2, 20, ' #388E3C');
        //     drawRect(LANE_X_POS[3] + 4, currentY + 20, LANE_X_POS[0] + 2, 20, ' #4CAF50');

        //     currentY += 40;
        // }

        // for static side lanes
        drawRect(0, 0, LANE_X_POS[0] - 2, height, ' #C6C7CB',ctx);
        drawRect(LANE_X_POS[3] + 4, 0, LANE_X_POS[0], height, ' #C6C7CB',ctx);
    }

    /**
     * individual lane refers to the single strip of lines running from the start to end
     * @param {number} x :the x coordinate of the individual lane 
     * @param {string} color: the color of the box to make(either yellow or white) 
     */
    var drawIndividualLane = function (x, color,ctx) {


        var currentY = that.laneTracker;
        for (var i = 0; i < NO_OF_LANE_DIVIDERS * 2; i++) {

            drawRect(x, currentY + x / 10, LANE_DIVIDER_WIDTH, LANE_DIVIDER_HEIGHT, color,ctx);
            currentY += LANE_DIVIDER_HEIGHT + LANE_DIVIDER_SPACING;
        }
        //for resetting the position of the lanes at certain intervals
        if (that.laneTracker > 0) that.laneTracker = - height;

    }

    var drawLanes = function (ctx) {

        //yellow separator between the left sideLane and the road
        drawIndividualLane(LANE_X_POS[0], '#B89E4A',ctx);

        //the white separators between lanes making the 3 lanes
        drawIndividualLane(LANE_X_POS[1], 'white',ctx);
        drawIndividualLane(LANE_X_POS[2], 'white',ctx);

        //yellow separator between the right sideLane and the road
        drawIndividualLane(LANE_X_POS[3], '#B89E4A',ctx);
    }

    var drawBackground = function (ctx) {
        //setting th background color of the canvass
        ctx.fillStyle = '#333335';
        ctx.fillRect(0, 0, width, height);

    }
    this.draw = function (ctx) {

        drawBackground(ctx);
        drawLanes(ctx);
        //things that are present at the side of the road
        drawSideLanes(ctx);
        this.laneTracker += 1.5;
    }
};