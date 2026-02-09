// =============================================
// Red Bull Website - Main JavaScript
// =============================================

// Navbar hide/show on scroll + dynamic background
let lastScrollY = window.scrollY;
const navBar = document.querySelector('.nav-bar');

// Get hero section height (for dynamic background)
const heroSection = document.querySelector('.hero-container') || document.querySelector('.page-hero');
const heroHeight = heroSection ? heroSection.offsetHeight : 0;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Hide/show navbar
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px
        navBar.classList.add('nav-hidden');
    } else {
        // Scrolling up
        navBar.classList.remove('nav-hidden');
    }

    // Dynamic background: solid when past hero, transparent in hero
    if (currentScrollY > heroHeight - 100) {
        navBar.classList.add('nav-solid');
    } else {
        navBar.classList.remove('nav-solid');
    }

    lastScrollY = currentScrollY;
});

// =============================================
// Hero Carousel (Only runs if carousel exists)
// =============================================
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.slider-dots .dot');

if (slides.length > 0 && dots.length > 0) {
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            dots[i].classList.remove('active');
        });
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Auto-advance slides
    let autoSlide = setInterval(nextSlide, slideInterval);

    // Click on dots to navigate
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            // Reset timer on manual click
            clearInterval(autoSlide);
            autoSlide = setInterval(nextSlide, slideInterval);
        });
    });
}
