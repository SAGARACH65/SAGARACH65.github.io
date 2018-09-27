var images = document.getElementsByClassName('slider')[0];

var currentIndex = 0,
    imgWidth = 701,
    imagesMaxCount = 3,
    isSlidingRight = true;


//isSlidingRight is provided as a argument to this fxn to make it pure despite it being global
var calculateNextIndex = function (currentIndex, isSlidingRight) {
    if (currentIndex === 3) return 2;
    if (currentIndex === 0) return 1;
    //if none of the above conditions meet we check the flag to return the next index
    return ((isSlidingRight) ? currentIndex + 1 : currentIndex - 1)
}


var prevClickHandler = function () {
    console.log(currentIndex);
    currentIndex = calculateNextIndex(currentIndex, false);
    console.log(currentIndex);
    clearInterval(mainLoop);
    // runMainInterval();
}

var nextClickHandler = function () {
    console.log(currentIndex);
    currentIndex = calculateNextIndex(currentIndex, true);
    console.log(currentIndex);
    clearInterval(mainLoop);
    // runMainInterval();
}

var addEventListeners = function () {
    var buttonPrev = document.getElementsByClassName('prev')[0];
    var buttonNext = document.getElementsByClassName('next')[0];
    buttonPrev.addEventListener('click', prevClickHandler);
    buttonNext.addEventListener('click', nextClickHandler);

}


var animate = function (currentIndex, nextIndex) {

    
    var startingImagePosition = -currentIndex * imgWidth,
        endingImagePosition = -nextIndex * imgWidth;

       
        // console.log(startingImagePosition,endingImagePosition)
     
       
    //for animation we divide the transition into 5 parts
    var increment = (endingImagePosition - startingImagePosition) / 5;
  
    console.log(increment);
    var animateInterval = setInterval(function () {

        startingImagePosition += increment;

        images.style.left = startingImagePosition + 'px';

        //checking if we have completed the animation and ending if we have done so
        if ((startingImagePosition <= endingImagePosition && isSlidingRight) || (startingImagePosition >= endingImagePosition && !isSlidingRight)) {

            //clear the current interval and start the main interval
            clearInterval(animateInterval);
            runMainInterval();
        }

    }, 100);
}


var animateTransition = function (currentIndex, nextIndex) {
    //for animation we clear the main interval and run the animation interval
    console.log(currentIndex, nextIndex);
    console.log(isSlidingRight);
    clearInterval(mainLoop);
    setInterval(animate(currentIndex, nextIndex), 200);
}



var changeImage = function () {


    animateTransition(currentIndex, calculateNextIndex(currentIndex, isSlidingRight));
  
    if (isSlidingRight) {

        currentIndex++;
        if (currentIndex === imagesMaxCount) isSlidingRight = false;
        

    } else {
       
        if (currentIndex === 0) isSlidingRight = true;
        currentIndex--; 

    }

}


addEventListeners();

var mainLoop;
var runMainInterval = function () {
    mainLoop = setInterval(changeImage, 1000);
}
runMainInterval();