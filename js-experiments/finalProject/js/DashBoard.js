class DashBoard {
    constructor() {
    }

    drawSteering(ctx, isRightPressed, isLeftPressed) {
        let degrees;

        if (isLeftPressed) degrees = +50;
        else if (isRightPressed) degrees = -50;
        else degrees = 0;

        ctx.save();
        ctx.translate(ROAD_PARAM.CANVAS_WIDTH - 300 * ASPECT_RATIO, ROAD_PARAM.CANVAS_HEIGHT - 200 * ASPECT_RATIO);
        // // rotate the canvas to the specified degrees
        ctx.rotate(degrees * Math.PI / 180);
        drawImage(ctx, 'images/steering_wheel-.png', -100 * ASPECT_RATIO, -100 * ASPECT_RATIO, 200 * ASPECT_RATIO, 200 * ASPECT_RATIO);

        ctx.restore();
    }

    drawSpeed(ctx, currentSpeed, maxSpeed) {
        let speed = Math.ceil(currentSpeed / maxSpeed * 160);
        let fontSize = 45 * ASPECT_RATIO;
        writeText(ctx, 360 * ASPECT_RATIO, ROAD_PARAM.CANVAS_HEIGHT - 257 * ASPECT_RATIO,
            speed, `700 ${fontSize}px  NeuroPol`, 'white');
    }

    drawSpeedNeedle(ctx, currentSpeed, maxSpeed) {
        let colorGradient = makeGradient(ctx, '#41dcf4', '#00b8fe');
        let shadowColor = '#00c6ff';
        drawSpeedoMeterArc(ctx, colorGradient, 360 * ASPECT_RATIO, ROAD_PARAM.CANVAS_HEIGHT - 230 * ASPECT_RATIO,
            186 * ASPECT_RATIO, 0.6 * Math.PI,
            calculateSpeedAngle(currentSpeed / maxSpeed, 83, 35) * Math.PI, false, shadowColor);
    }

    drawRPMNeedle(ctx, currentSpeed, maxSpeed) {
        let colorGradient = makeGradient(ctx, '#f7b733', '#fc4a1a');
        let shadowColor = '#f7b733';
        let rpm = currentSpeed / maxSpeed * 7;
        drawSpeedoMeterArc(ctx, colorGradient, 360 * ASPECT_RATIO, ROAD_PARAM.CANVAS_HEIGHT - 230 * ASPECT_RATIO, 186 * ASPECT_RATIO,
            .4 * Math.PI, calculateRPMAngle(rpm, 0, 22) * Math.PI, true, shadowColor);
    }

    drawSpeedometer(ctx, currentSpeed, maxSpeed) {

        drawImage(ctx, 'images/spedoMeterTrans.png', 150 * ASPECT_RATIO,
            ROAD_PARAM.CANVAS_HEIGHT - 440 * ASPECT_RATIO, 420 * ASPECT_RATIO, 420 * ASPECT_RATIO);
        this.drawSpeed(ctx, currentSpeed, maxSpeed);
        this.drawSpeedNeedle(ctx, currentSpeed, maxSpeed);
        this.drawRPMNeedle(ctx, currentSpeed, maxSpeed);
    }

    drawProgressBar(ctx, baseSegment, totalSegments) {

        //drawing the background of the progressBar;
        drawRect(ctx, 700 * ASPECT_RATIO, ROAD_PARAM.CANVAS_HEIGHT - 150 * ASPECT_RATIO,
            600 * ASPECT_RATIO, 50 * ASPECT_RATIO, 'rgba(0, 0, 0, 0.3)');

        // let colorIncrement = baseSegment / totalSegments * 200;
        // //gives different color depending on the progress
        // drawRect(ctx, 700, ROAD_PARAM.CANVAS_HEIGHT - 150, baseSegment / totalSegments * 600, 50,
        //     `rgb(${255 - colorIncrement},${51 + colorIncrement},${0 + colorIncrement})`);

        let progressGradient = makeGradient(ctx, '#43e97b', '#38f9d7');

        //this is added just to stop the progress bar from moving beyond the background
        let width = (baseSegment <= totalSegments) ? baseSegment / totalSegments * 600 : 600;

        drawRect(ctx, 700 * ASPECT_RATIO, ROAD_PARAM.CANVAS_HEIGHT - 150 * ASPECT_RATIO,
            width * ASPECT_RATIO, 50 * ASPECT_RATIO, progressGradient);

    }


    drawNitroMeter(ctx, fullNitro, remainingNitro) {

        //background of the progress bar
        drawRect(ctx, ROAD_PARAM.CANVAS_WIDTH - 100 * ASPECT_RATIO, 750 * ASPECT_RATIO,
            50 * ASPECT_RATIO, -550 * ASPECT_RATIO, 'rgba(0, 0, 0, 0.3)');

        let percentageCompleted = remainingNitro / fullNitro;
        let speedGradient, rpmGradient;

        //if nitro reaches 60% changes color to yellow gradient
        (percentageCompleted < 0.6) ? speedGradient = makeGradient(ctx, '#00b8fe', '#42dcf4') :
            rpmGradient = makeGradient(ctx, '#fc4a1a', '#f7b733');

        //draws shadow if nitro is full
        (remainingNitro >= fullNitro) ?
            drawRect(ctx, ROAD_PARAM.CANVAS_WIDTH - 100 * ASPECT_RATIO, 750 * ASPECT_RATIO,
                50 * ASPECT_RATIO, -(percentageCompleted * 550) * ASPECT_RATIO, speedGradient || rpmGradient, '#f7b733') :
            drawRect(ctx, ROAD_PARAM.CANVAS_WIDTH - 100 * ASPECT_RATIO, 750 * ASPECT_RATIO,
                50 * ASPECT_RATIO, -(percentageCompleted * 550) * ASPECT_RATIO, speedGradient || rpmGradient)

    }
}