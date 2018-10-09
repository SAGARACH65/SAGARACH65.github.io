
let canvas = document.getElementById("main-canvas");
let ctx = canvas.getContext("2d");

let width = 1024;                    // logical canvas width
let height = 768;
let segments = [];
let roadWidth = 2000;                    // actually half the roads width, easier math if the road spans from -roadWidth to +roadWidth
let segmentLength = 200;                     // length of a single segment
let rumbleLength = 3;                       // number of segments per red/white rumble strip
let trackLength = null;                    // z length of entire track (computed)
let lanes = 3;                       // number of lanes
let fieldOfView = 100;                     // angle (degrees) for field of view
let cameraHeight = 1000;                    // z height of camera
let cameraDepth = 1 / Math.tan((fieldOfView/2) * Math.PI/180)   ;                    // z distance camera is from screen (computed)
let drawDistance = 300;                     // number of segments to draw
let playerX = 0;                       // player x offset from center of road (-1 to 1 to stay independent of roadWidth)
let playerZ = null;                    // player relative z distance from camera (computed)
let position = 0;                       // current camera Z position (add playerZ to get player's absolute Z position)
let speed = 0;                       // current speed
let maxSpeed = segmentLength * 60;      // top speed (ensure we can't move more than 1 segment in a single frame to make collision detection easier)
let accel = maxSpeed / 5;             // acceleration rate - tuned until it 'felt' right
let breaking = -maxSpeed;               // deceleration rate when braking
let decel = -maxSpeed / 5;             // 'natural' deceleration rate when neither accelerating, nor braking
let offRoadDecel = -maxSpeed / 2;             // off road deceleration is somewhere in between
let offRoadLimit = maxSpeed / 4;             // limit when off road deceleration no longer applies (e.g. you can always go at least this speed even when off road)
let i = 0;

var COLORS = {
    SKY: '#72D7EE',
    TREE: '#005108',
    FOG: '#005108',
    LIGHT: { road: '#6B6B6B', grass: '#10AA10', rumble: '#555555', lane: '#CCCCCC' },
    DARK: { road: '#696969', grass: '#009A00', rumble: '#BBBBBB' },
    START: { road: 'white', grass: 'white', rumble: 'white' },
    FINISH: { road: 'black', grass: 'black', rumble: 'black' }
};

var BACKGROUND = {
    HILLS: { x: 5, y: 5, w: 1280, h: 480 },
    SKY: { x: 5, y: 495, w: 1280, h: 480 },
    TREES: { x: 5, y: 985, w: 1280, h: 480 }
};


let isRightPressed = false,
    isLeftPressed = false,
    isUpPressed = false,
    isDownPressed = false;

let drawRoad = () => {
   
    for (let n = 0; n < 500; n++) { // arbitrary road length
        segments.push({
            index: n,
            p1: { world: { z: n * segmentLength }, camera: {}, screen: {} },
            p2: { world: { z: (n + 1) * segmentLength }, camera: {}, screen: {} },
            color: Math.floor(n / rumbleLength) % 2 ? COLORS.DARK : COLORS.LIGHT
        });
    }
   
   
    trackLength = segments.length * segmentLength;
    
    renderCar();
}
function findSegment(z) {
   
    return segments[Math.floor(z / segmentLength) % segments.length];
}

let renderCar = () => {
   
    var baseSegment = findSegment(position);
   
    var maxy = height;
    var n, segment;
    for (n = 0; n < drawDistance; n++) {

        segment = segments[(baseSegment.index + n) % segments.length];

   

        project(segment.p1, (playerX * roadWidth), cameraHeight, position, cameraDepth, width, height, roadWidth);
        project(segment.p2, (playerX * roadWidth), cameraHeight, position, cameraDepth, width, height, roadWidth);

    
        // if(i<=4){
        //     console.log(segment.p1);        
        //         }
        //         i++;
        
        
        
       

        if ((segment.p1.camera.z <= cameraDepth) || // behind us
            (segment.p2.screen.y >= maxy))          // clip by (already rendered) segment
            continue;

            // if(i===2){
            //     console.log(segment.p1);        
            //         }
            //         i++;
            
        renderSegment(ctx, width, lanes,
            segment.p1.screen.x,
            segment.p1.screen.y,
            segment.p1.screen.w,
            segment.p2.screen.x,
            segment.p2.screen.y,
            segment.p2.screen.w,
            segment.color);

        maxy = segment.p2.screen.y;
    }
}

function polygon(ctx, x1, y1, x2, y2, x3, y3, x4, y4, color) {

//     if (i <10)
//     console.log( x1,y1,x2,y2,x3,y3,x4,y4,color);
// i++;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.closePath();
    ctx.fill();
}

//---------------------------------------------------------------------------
function rumbleWidth(projectedRoadWidth, lanes) { return projectedRoadWidth / Math.max(6, 2 * lanes); }
function laneMarkerWidth(projectedRoadWidth, lanes) { return projectedRoadWidth / Math.max(32, 8 * lanes); }


function renderSegment(ctx, width, lanes, x1, y1, w1, x2, y2, w2, color) {
   
    var r1 = rumbleWidth(w1, lanes),
        r2 = rumbleWidth(w2, lanes),
        l1 = laneMarkerWidth(w1, lanes),
        l2 = laneMarkerWidth(w2, lanes),
        lanew1, lanew2, lanex1, lanex2, lane;
       
        // console.log('drawing');
    ctx.fillStyle = 'green';
    ctx.fillRect(0, y2, width, y1 - y2);

    polygon(ctx, x1 - w1 - r1, y1, x1 - w1, y1, x2 - w2, y2, x2 - w2 - r2, y2, color.rumble);
    polygon(ctx, x1 + w1 + r1, y1, x1 + w1, y1, x2 + w2, y2, x2 + w2 + r2, y2, color.rumble);
    polygon(ctx, x1 - w1, y1, x1 + w1, y1, x2 + w2, y2, x2 - w2, y2, color.road);

    if (color.lane) { 
        lanew1 = w1 * 2 / lanes;
        lanew2 = w2 * 2 / lanes;
        lanex1 = x1 - w1 + lanew1;
        lanex2 = x2 - w2 + lanew2;
        for (lane = 1; lane < lanes; lanex1 += lanew1, lanex2 += lanew2, lane++)
           polygon(ctx, lanex1 - l1 / 2, y1, lanex1 + l1 / 2, y1, lanex2 + l2 / 2, y2, lanex2 - l2 / 2, y2, color.lane);
    }

}

    function project(p, cameraX, cameraY, cameraZ, cameraDepth, width, height, roadWidth) {

        if(i===0){
            console.log(segments[0].p1);        
                }
                i++;

        p.camera.x = (p.world.x || 0) - cameraX;
        p.camera.y = (p.world.y || 0) - cameraY;
        p.camera.z = (p.world.z || 0) - cameraZ;
       console.log(((p.world.y || 0) - cameraY));
        if(i===1){
            console.log(segments[0].p1);        
                }
                i++;
        p.screen.scale = cameraDepth / p.camera.z;
        p.screen.x = Math.round((width / 2) + (p.screen.scale * p.camera.x * width / 2));
        p.screen.y = Math.round((height / 2) - (p.screen.scale * p.camera.y * height / 2));
        p.screen.w = Math.round((p.screen.scale * roadWidth * width / 2));

    }

    let gameLoop = () => {
        //  CLEARING THE SCREEN BEFORE EACH UPDATE
        // ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawRoad();

        requestAnimationFrame(gameLoop);
    }


    let keyDownHandler = e => {
        if (e.keyCode == 39) {
            isRightPressed = true;
        }
        else if (e.keyCode == 37) {
            isLeftPressed = true;
        }
        else if (e.keyCode == 38) {
            isUpPressed = true;
        }
        else if (e.keyCode == 40) {
            isDownPressed = true;
        }
    }

    let keyUpHandler = e => {
        if (e.keyCode == 39) {
            isRightPressed = false;
        }
        else if (e.keyCode == 37) {
            isLeftPressed = false;
        }
        else if (e.keyCode == 38) {
            leftPressed = true;
        }
        else if (e.keyCode == 40) {
            isDownPressed = true;
        }
    }

    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);

    requestAnimationFrame(gameLoop);