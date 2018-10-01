let canvas = document.getElementById("main-canvas");
let ctx = canvas.getContext("2d");

//this variable is used to generate the pipes only at certain times
let frameCounter = 0;
let pipesCollection = [];

//used to check if game is over
let isOver = false;

let showElements = () => {

    background.showBackgroundImage();

    pipesCollection.map((pipe, index) => {
        pipe.show();
        pipe.update();

        //removing the object if it is beyond the screen
        //and if the object is removed update the score
        if (pipe.x < 0) {
            pipesCollection.splice(index, 1);
            bird.updateScore();
        }
    });

    background.showFloor2();
    background.showFloor();

    bird.show();
    bird.showScore();
}

let updateElements = () => {
    bird.updatePerGravity();
}

let checkBottomTopCollision = () => {
    bird.checkTopCollision();
    bird.checkBottomCollision();
}

let checkForCollisionWithTopPipe = (pipe) => {
    return (bird.x < pipe.x + pipe.width &&
        bird.x + bird.width > pipe.x &&
        bird.y < 0 + pipe.top &&
        bird.height + bird.y > 0);
}

let checkForCollisionWithBottomPipe = (pipe) => {
    return (bird.x < pipe.x + pipe.width &&
        bird.x + bird.width > pipe.x &&
        bird.y < pipe.bottom + (canvas.height - pipe.bottom) &&
        bird.height + bird.y > pipe.bottom);
}

let checkCollision = () => {
    //checks collision with te top and bottom
    checkBottomTopCollision();

    console.log('before');
    //checks collision with the pipes
    pipesCollection.map(pipe => {

        console.log('after');
        if (checkForCollisionWithBottomPipe(pipe) || checkForCollisionWithTopPipe(pipe)) {
            isOver = true;
        }
    });
}

let generatePipe = () => {
    pipesCollection.push(new Pipes());
}

let gameLoop = () => {

    //clears the objects in every window
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isOver) {
        ctx.fillStyle = 'white';
        ctx.fillText("Score:" + bird.score, canvas.width / 2 - 30, canvas.height / 2 - 20);
        ctx.fillText("GAME OVER!!", canvas.width / 2 - 40, canvas.height / 2);
        ctx.fillText("RESTART THE PAGE TO TRY AGAIN", canvas.width / 2 - 80, canvas.height / 2 + 20);

    } else {

        //we update the framecounter every frame
        frameCounter++;

        //renders all the game elements
        showElements();

        //updates the position of all elements
        updateElements();

        //checks the collison with the top/bottom and with the pipes
        checkCollision();

        //we generate a new pipe at certain time
        if (frameCounter % 150 === 0) {
            generatePipe();
        }
    }
}

function SpaceHandler(e) {
    if (e.keyCode == 32) {
        bird.jumpBird();
    }
}

document.addEventListener("keydown", SpaceHandler, false);

let bird = new Bird();
let background = new Background();

//running the loop every 10 milliseconds for 60fps.
setInterval(gameLoop, 10);