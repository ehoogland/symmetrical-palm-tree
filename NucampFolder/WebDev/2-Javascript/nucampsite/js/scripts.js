console.log('javascript connected!'); // testing
/** 
 * Instantiate a new Bootstrap carousel object with ID matching that in the
 * HTML files, with properties of interval and pause. 
 * The interval cycle property is in milliseconds. 
 * Carousel cycles automatically on load because pause property is set to false
 */   
const carousel = new bootstrap.Carousel('#homeCarousel', {
    // may want to change to 2000 when testing
    interval: 5000,
    pause: false
})
// when the play button is clicked, begin cycling through the images
const carouselPlay = document.getElementById('carouselButton');
const faIcon = document.getElementById('faButton');

carouselButton.addEventListener('click', function () {
    if (faIcon.classList.contains('fa-pause')) {
        faIcon.classList.remove('fa-pause');
        faIcon.classList.add('fa-play');
        carousel.pause();
    } else {
        faIcon.classList.remove('fa-play');
        faIcon.classList.add('fa-pause');
        carousel.cycle();
    }
})   