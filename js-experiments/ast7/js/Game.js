 //used to check if game is over
 let isOver = true;
 class Game {
     constructor(canvasName) {

         this.canvas = document.getElementById(canvasName);
         this.ctx = this.canvas.getContext('2d');

         //this variable is used to generate the pipes only at certain times
         this.frameCounter = 0;
         this.pipesCollection = [];

         this.bird;
         this.background;

     
         this.setup = this.setup.bind(this);
         this.gameLoop = this.gameLoop.bind(this);
         this.showElements = this.showElements.bind(this);
         this.updateElements = this.updateElements.bind(this);
         this.checkBottomTopCollision = this.checkBottomTopCollision.bind(this);
         this.checkForCollisionWithTopPipe = this.checkForCollisionWithTopPipe.bind(this);
         this.checkForCollisionWithBottomPipe = this.checkForCollisionWithBottomPipe.bind(this);
         this.checkCollision = this.checkCollision.bind(this);
         this.generatePipe = this.generatePipe.bind(this);
         this.spaceHandler = this.spaceHandler.bind(this);
         this.enterHandler = this.enterHandler.bind(this);

     }

     showElements() {

         this.background.showBackgroundImage(this.ctx);

         this.pipesCollection.map((pipe, index) => {
             pipe.show(this.ctx);
             pipe.update();

             //removing the object if it is beyond the screen
             //and if the object is removed update the score
             if (pipe.x + pipe.width < 0) {
                 this.pipesCollection.splice(index, 1);
                 this.bird.updateScore();
             }
         });

         this.background.showFloor2(this.ctx);
         this.background.showFloor(this.ctx);

         this.bird.show(this.ctx);
         this.bird.showScore(this.ctx);
     }

     updateElements() {
         this.bird.updatePerGravity();
     }

     checkBottomTopCollision() {
         this.bird.checkTopCollision();
         this.bird.checkBottomCollision();
     }

     checkForCollisionWithTopPipe(pipe) {
         let bird = this.bird;
         return (bird.x < pipe.x + pipe.width &&
             bird.x + bird.width > pipe.x &&
             bird.y < 0 + pipe.top &&
             bird.height + bird.y > 0);
     }

     checkForCollisionWithBottomPipe(pipe) {
         let bird = this.bird;
         return (bird.x < pipe.x + pipe.width &&
             bird.x + bird.width > pipe.x &&
             bird.y < pipe.bottom + (this.canvas.height - pipe.bottom) &&
             bird.height + bird.y > pipe.bottom);
     }

     checkCollision() {
         //checks collision with te top and bottom
         this.checkBottomTopCollision();

         //checks collision with the pipes
         this.pipesCollection.map(pipe => {

             if (this.checkForCollisionWithBottomPipe(pipe) || this.checkForCollisionWithTopPipe(pipe)) {
                 isOver = true;
             }
         });
     }

     generatePipe() {
         this.pipesCollection.push(new Pipes(this.canvas.height, this.canvas.width));
     }

     gameLoop() {

         //clears the objects in every window
         this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

         if (isOver) {

             drawImage('images/message.png ', 0, 0, this.canvas.width, this.canvas.height, this.ctx);

             this.ctx.fillStyle = 'white';
             if (this.bird.score !== 0) {

                 this.ctx.fillText('Score:' + this.bird.score, this.canvas.width / 2 - 30, this.canvas.height / 2 - 30);
             }

             this.ctx.fillText('PRESS ENTER TO PLAY', this.canvas.width / 2 - 60, this.canvas.height / 2 + 15);

         } else {

             //we update the framecounter every frame
             this.frameCounter++;

             //renders all the game elements
             this.showElements();

             //updates the position of all elements
             this.updateElements();

             //checks the collison with the top/bottom and with the pipes
             this.checkCollision();

             //we generate a new pipe at certain time
             if (this.frameCounter % 100 === 0) {
                 this.generatePipe();
             }
         }
         requestAnimationFrame(this.gameLoop);
     }

     spaceHandler(e) {
         if (e.keyCode == 32) {
             this.bird.jumpBird();
         }
     }
     enterHandler(e) {
         if (e.keyCode == 13) {
             isOver = false;
             this.bird = new Bird(this.canvas.height, this.canvas.width);
             this.background = new Background(this.canvas.height, this.canvas.width);
             this.frameCounter = 0;
             this.pipesCollection = [];
         }
     }

     setup() {
         document.addEventListener('keydown', this.spaceHandler, false);
         document.addEventListener('keydown', this.enterHandler, false);

         this.bird = new Bird(this.canvas.height, this.canvas.width);

         this.background = new Background(this.canvas.height, this.canvas.width);
         console.log(this.background.canvasHeight);
         this.gameLoop();

     }
 }

 let game = new Game('main-canvas');
 game.setup();