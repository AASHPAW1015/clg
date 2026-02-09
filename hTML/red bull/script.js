/**
 * ============================================================================
 * RED BULL INDIA - MAIN JAVASCRIPT
 * ============================================================================
 * 
 * Features:
 * 1. Navbar scroll behavior (hide on scroll down, show on scroll up)
 * 2. Dynamic navbar background (transparent over hero, solid after)
 * 3. Hero carousel with auto-advance and dot navigation
 * 
 * ============================================================================
 */


/**
 * ----------------------------------------------------------------------------
 * NAVBAR SCROLL BEHAVIOR
 * ----------------------------------------------------------------------------
 * Implements two features:
 * - Hide/show: Navbar hides when scrolling down, reappears when scrolling up
 * - Dynamic background: Navbar is transparent over hero, becomes solid after
 */

let lastScrollY = window.scrollY;
const navBar = document.querySelector('.nav-bar');

const heroSection = document.querySelector('.hero-container') || document.querySelector('.page-hero');
const heroHeight = heroSection ? heroSection.offsetHeight : 0;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Hide navbar when scrolling down past 100px, show when scrolling up
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navBar.classList.add('nav-hidden');
    } else {
        navBar.classList.remove('nav-hidden');
    }

    // Switch to solid background once user scrolls past the hero section
    if (currentScrollY > heroHeight - 100) {
        navBar.classList.add('nav-solid');
    } else {
        navBar.classList.remove('nav-solid');
    }

    lastScrollY = currentScrollY;
});


/**
 * ----------------------------------------------------------------------------
 * HERO CAROUSEL
 * ----------------------------------------------------------------------------
 * Auto-advancing slideshow for the homepage hero section.
 * Features:
 * - 5-second auto-advance interval
 * - Dot navigation for manual slide selection
 * - Timer resets when user manually clicks a dot
 * 
 * Only initializes if carousel elements exist on the page.
 */

const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.slider-dots .dot');

if (slides.length > 0 && dots.length > 0) {
    let currentSlide = 0;
    const slideInterval = 5000;

    /**
     * Shows the slide at the given index and updates dot indicators
     * @param {number} index - Index of the slide to display
     */
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            dots[i].classList.remove('active');
        });
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    /**
     * Advances to the next slide, looping back to first after the last
     */
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Start auto-advance timer
    let autoSlide = setInterval(nextSlide, slideInterval);

    // Add click handlers to each dot for manual navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);

            // Reset timer when user manually navigates
            clearInterval(autoSlide);
            autoSlide = setInterval(nextSlide, slideInterval);
        });
    });
}
