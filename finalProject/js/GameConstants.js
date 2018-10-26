//////////////////////////////////////////////constants used in Game.js////////////////////////////////////////////////////
const trackMap = [
    { type: 'straight', number: 100, curvature: 0 },
    { type: 'curve', number: 300, curvature: -65 },
    { type: 'straight', number: 300, curvature: 0 },
    { type: 'curve', number: 300, curvature: 65 },
    { type: 'curve', number: 300, curvature: -20 },
    { type: 'straight', number: 300, curvature: 0 },
    { type: 'curve', number: 300, curvature: -65 },
    { type: 'straight', number: 300, curvature: 0 },
    { type: 'curve', number: 300, curvature: 65 },
    { type: 'straight', number: 500, curvature: 0 },
];

const TOTAL_LENGTH_OF_ROAD = (() => {
    let total = 0;
    for (let i = 0; i < trackMap.length - 1; i++)
        total += trackMap[i].number;

    //140 is added as we havent added the last sector
    return total + 140;
})();

//position of sprite in the spritesheet
const CAR_CENTRE = {
    x: 0,
    y: 130,
    w: 69,
    h: 38
};

const CAR_LEFT = {
    x: 70,
    y: 130,
    w: 77,
    h: 38
};

const CAR_RIGHT = {
    x: 148,
    y: 130,
    w: 77,
    h: 38
};

const DIFFERENCE_TO_INCREASE_NITRO = 7;

//game Sounds
const CAR_ACCELERATE = createSoundObject('sounds/main-engine.wav');
const CAR_DECELERATE = createSoundObject('sounds/car+geardown.mp3');
const CAR_SKID = createSoundObject('sounds/skid.wav');
const CAR_START = createSoundObject('sounds/carstartgarage.mp3');


//////////////////////////////////////////////constants used in Road.js////////////////////////////////////////////////////
const ROAD_PARAM = {
    WIDTH: 9000,
    SEGMENT_LENGTH: 550,  // length of a single segment
    SIDE_STRIP_LENGTH: 3,  // number of segments per red/white sideStrip strip
    NO_OF_LANES: 4,
    CAMERA_HEIGHT: 4400,       // z height of camera
    CAMERA_DEPTH: 0.2,           // z distance camera is from the screen 
    NO_OF_SEG_TO_DRAW: 150,      //number of seg we draw at a time
    COLORS: [
        { road: '#696969', grass: '#097D04', sideStrip: 'red', lane: 'white' },
        { road: '#696969', grass: '#066102', sideStrip: 'white' },
    ],
    // CANVAS_WIDTH: 1920,
    // CANVAS_HEIGHT: 997
    CANVAS_WIDTH: window.innerWidth || document.body.clientWidth,
    CANVAS_HEIGHT: window.innerHeight || document.body.clientHeight

}

//this game was orginally designed in 1920/997 screen so for other screen resolutions aspect ratio is used to fit them
//Note:    997/1920=0.5192708333
const ASPECT_RATIO_MULTIPLIER = 0.5192708333;
const ASPECT_RATIO = (ROAD_PARAM.CANVAS_WIDTH / ROAD_PARAM.CANVAS_HEIGHT) * ASPECT_RATIO_MULTIPLIER;
// const ASPECT_RATIO = 1;

const TREES = [
    { img: 'images/tree.png', width: 64 * ASPECT_RATIO, height: 154 * ASPECT_RATIO },
    { img: 'images/tree2.png', width: 62 * ASPECT_RATIO, height: 95 * ASPECT_RATIO },
];

const GAME_IMAGES = [
    'images/tree.png',
    'images/tree2.png',
    'images/spedoMeterTrans.png',
    'images/steering_wheel-.png',
    'images/spritesheet.high.png',
    'images/b.png'
];

//////////////////////////////////////////////constants used in Player.js////////////////////////////////////////////////////
const OFF_ROAD_SPEED_DECREASE_FACTOR = 4;
const ACCELERATION_DECREASE_FACTOR = 150;
const BREAKING_DECREASE_FACTOR = 30;
const DECELERATION_DECREASE_FACTOR = 140;

const MAX_SPEED = 950;
const OFF_ROAD_MAX_SPEED = MAX_SPEED / OFF_ROAD_SPEED_DECREASE_FACTOR;
const ACCELERATION = MAX_SPEED / ACCELERATION_DECREASE_FACTOR;
const BREAKING = -MAX_SPEED / BREAKING_DECREASE_FACTOR;
const DECELERATION = -MAX_SPEED / DECELERATION_DECREASE_FACTOR;

const TURNING_SPEED = 0.05;
const CENTRIFUGAL_FORCE = 0.0007;
const PLAYER_WIDTH = 200;
const PLAYER_HEIGHT = 150;
const MAX_NITRO = 400;
const NITRO_INCREMENT = 14;

//////////////////////////////////////////////constants used in Enemy.js////////////////////////////////////////////////////
const NO_OF_ENEMIES = 2;
