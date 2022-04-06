// get variable of slides which is a container of all divs with img tags inside
const slides = document.getElementById('slides');
// get the previous and next buttons 
const nextButton = document.getElementById('next');
const previousButton = document.getElementById('previous');
// every 6 seconds one slide moves to right. 
const timeout = 6000;
// moving-speed of slider [10px in each moves to left]
 const speed = 10;

let allSlides;
let lastSlide; // is a variable that contains last div with img tag
let nextTimeout; // is a variable that contains setTimeout function 
let animating = false; // false = if no animation is running. True = if animation is running.

nextTimeout = setTimeout(nextSlide, timeout);

function nextSlide() {
    // select all divs with class ='slide' 
    allSlides = document.querySelectorAll('.slide');
    // select the last Element child by index[3]
    lastSlide = allSlides[allSlides.length - 1];
    // request a animation with moveRight callBack function
    requestAnimationFrame(moveRight);
    animating = true;
};

function moveRight() {
    const left = parseInt(lastSlide.style.left);
    lastSlide.style.left = (left + speed) + 'px';
    if (left < 800) {
        requestAnimationFrame(moveRight);
    } else {
        // move lastSlide div to firstElement. 
        slides.insertBefore(lastSlide, slides.firstElementChild);
        // reset the value of left to zero again
        lastSlide.style.left = '0'; 
        // set once again time-loop for the next slide
        nextTimeout = setTimeout(nextSlide, timeout);
        // set animating to false.
        animating = false;

    }

};

// add EventListener for nextButton 
nextButton.addEventListener('click', function(){
    if(!animating) {
        // clear a timer in order to prevent multiple timer processing at the same time.
            clearTimeout(nextTimeout);
        // use nextSlide function to move the slide to right.
        nextSlide();
    }
    
});

previousButton.addEventListener('click', function(){
    if(!animating) {
        clearTimeout(nextTimeout);
        previousSlide();
    }
});

function previousSlide() {
    // set div left: 800px in order position it next to the current img 
    slides.firstElementChild.style.left = '800px';
    // move first element child of div to last one in order to be on top of all elements 
    slides.appendChild(slides.firstElementChild);
    // select all <div>es with class ='slide' 
    allSlides = document.querySelectorAll('.slide');
    // select the last Element child by index[3]
    lastSlide = allSlides[allSlides.length - 1];
    // request a animation with moveRight callBack function
    requestAnimationFrame(moveLeft);
    // animation is in process ... 
    animating = true;
}

function moveLeft() {
    // read the value of last element left position and save it into left
    const left = parseInt(lastSlide.style.left);
    // change left value by subtracting current-left-value [800px] by speed[10px] + add px at the end of string.
    lastSlide.style.left = (left - speed) + 'px';
    // if left is bigger than speed [10px] recall animation function until is false
    if(left > speed) {
        requestAnimationFrame(moveLeft);
    } else {
        // set timer using setTimeout function of nextSlide
        nextTimeout = setTimeout(nextSlide, timeout);
        // no animation is in process ... 
        animating = false;
    }

}





