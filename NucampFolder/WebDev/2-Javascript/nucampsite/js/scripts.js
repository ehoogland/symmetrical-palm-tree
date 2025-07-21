console.log('javascript connected!'); // testing
/** 
 * Instantiate a new Bootstrap carousel object with ID matching that in the
 * HTML files, with properties of interval and pause. 
 * The interval cycle property is in milliseconds. 
 * Carousel cycles automatically on load because pause property is set to false
 */   
const carousel = new bootstrap.Carousel('#homeCarousel', {
    interval: 2000,
    pause: false
})
// when the play button is clicked, begin cycling through the images
const carouselPlay = document.getElementById('carouselPlay');
carouselPlay.addEventListener('click', function() {
    console.log('cycle the carousel');
    carousel.cycle();
})

// when the pause button is clicked, pause the carousel
const carouselPause = document.getElementById('carouselPause');
carouselPause.addEventListener('click', function() {
    console.log('pausing the carousel');
    carousel.pause();
})
