const hamburger = document.getElementById('hamburger');
const topStrip = document.querySelector('.top-strip');

// Menu toggle logic
hamburger.addEventListener('click', () => {
    topStrip.classList.toggle('active');
});

// Scroll hone par menu hide karne ki logic
window.addEventListener('scroll', () => {
    if (topStrip.classList.contains('active')) {
        topStrip.classList.remove('active');
    }
});

// Bahar click karne par menu hide karne ki logic
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !topStrip.contains(e.target)) {
        topStrip.classList.remove('active');
    }
});