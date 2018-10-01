let canvas = document.getElementById('main-canvas');
let ctx = canvas.getContext('2d');

//this variable is used to generate the pipes only at certain times
let frameCounter = 0;
let pipesCollection = [];

//used to check if game is over
let isOver = true;

let showElements = () => {

    background.showBackgroundImage();

    pipesCollection.map((pipe, index) => {
        pipe.show();
        pipe.update();

        //removing the object if it is beyond the screen
        //and if the object is removed update the score
        if (pipe.x + pipe.width < 0) {
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

let checkForCollisionWithTopPipe = pipe => {
    return (bird.x < pipe.x + pipe.width &&
        bird.x + bird.width > pipe.x &&
        bird.y < 0 + pipe.top &&
        bird.height + bird.y > 0);
}

let checkForCollisionWithBottomPipe = pipe => {
    return (bird.x < pipe.x + pipe.width &&
        bird.x + bird.width > pipe.x &&
        bird.y < pipe.bottom + (canvas.height - pipe.bottom) &&
        bird.height + bird.y > pipe.bottom);
}

let checkCollision = () => {
    //checks collision with te top and bottom
    checkBottomTopCollision();

    //checks collision with the pipes
    pipesCollection.map(pipe => {

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

        drawImage('images/message.png ', 0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'white';
        if (bird.score !== 0) {

            ctx.fillText('Score:' + bird.score, canvas.width / 2 - 30, canvas.height / 2 - 30);
        }

        ctx.fillText('PRESS ENTER TO PLAY', canvas.width / 2 - 60, canvas.height / 2 + 15);

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
        if (frameCounter % 100 === 0) {
            generatePipe();
        }
    }
    requestAnimationFrame(gameLoop);
}

let spaceHandler = e => {
    if (e.keyCode == 32) {
        bird.jumpBird();
    }
}
let enterHandler = e => {
    if (e.keyCode == 13) {
        isOver = false;
        bird = new Bird();
        background = new Background();
        frameCounter = 0;
        pipesCollection = [];
    }
}

document.addEventListener('keydown', spaceHandler, false);
document.addEventListener('keydown', enterHandler, false);


let bird = new Bird();
let background = new Background();

//running the loop every 10 milliseconds for 60fps.
gameLoop();