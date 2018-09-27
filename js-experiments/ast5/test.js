var images = document.getElementsByClassName('slider')[0];

var currentIndex = 0,
    imgWidth = 701,
    nextIndex,
    imagesMaxCount = 3;

//isSlidingRight is provided as a argument to this fxn to make it pure despite it being global
var calculateNextIndex = function (currentIndex) {
    var next = (currentIndex + 1) % 4;
    //if none of the above conditions meet we check the flag to return the next index
    return (next);
}

var prevClickHandler = function () {
    console.log(currentIndex);
    currentIndex = calculateNextIndex(currentIndex);
    console.log(currentIndex);
    clearInterval(mainLoop);
    animateTransition();
}

var nextClickHandler = function () {
    console.log(currentIndex);
    currentIndex = calculateNextIndex(currentIndex);
    console.log(currentIndex);
    clearInterval(mainLoop);
    animateTransition();
}

var addEventListeners = function () {
    var buttonPrev = document.getElementsByClassName('prev')[0];
    var buttonNext = document.getElementsByClassName('next')[0];
    buttonPrev.addEventListener('click', prevClickHandler);
    buttonNext.addEventListener('click', nextClickHandler);
}


var animate = function () {

    let frameCount = 15,
        currentCount = 1;

    console.log(nextIndex + "2")
    var startingImagePosition = -currentIndex * imgWidth,
        endingImagePosition = -nextIndex * imgWidth;

    // console.log(typeof (currentIndex))
    // console.log(startingImagePosition, endingImagePosition)


    //for animation we divide the transition into 5 parts
    var increment = (endingImagePosition - startingImagePosition) / frameCount;


    var animateInterval = setInterval(function () {

            startingImagePosition += increment;

            images.style.left = startingImagePosition + 'px';

            if (currentCount === frameCount) {
                //clear the current interval and start the main interval
                clearInterval(animateInterval);
                runMainInterval();
            }
            currentCount++;

        },
        20);
}

var animateTransition = function () {
    //for animation we clear the main interval and run the animation interval
    console.log(nextIndex + 'hi');

    clearInterval(mainLoop);

    setInterval(animate(), 200);
}

var changeImage = function () {
    nextIndex = calculateNextIndex(currentIndex);
    animateTransition();
    currentIndex = nextIndex;
}

addEventListeners();

var mainLoop;
var runMainInterval = function () {
    mainLoop = setInterval(changeImage, 1000);
}
runMainInterval();