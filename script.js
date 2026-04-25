//Kundali Dropdown Menu Toggle Functionality
document.getElementById('kundali-menu').addEventListener('click', function(e) {
    e.stopPropagation();
    const menu = this.querySelector('.dropdown-menu');

    menu.classList.toggle('show');
    this.classList.toggle('active'); // 🔥 ye add karo
});
document.addEventListener('click', function() {
    const menu = document.querySelector('.dropdown-menu');
    if (menu && menu.classList.contains('show')) {
        menu.classList.remove('show');
    }
});


/* Intersection Observer for Smooth Scroll Reveal */
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            const rect = entry.boundingClientRect;
            if (rect.top > window.innerHeight || rect.bottom < 0) {
                entry.target.classList.remove('active');
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -10px 0px"
});

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));


//Side Scroll - Testimonals
const scrollContainer = document.getElementById('testimonialScroll');
const dots = document.querySelectorAll('.dot');

scrollContainer.addEventListener('scroll', () => {
    const width = scrollContainer.offsetWidth;
    const activeIndex = Math.round(scrollContainer.scrollLeft / width);

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
    });
});

////Side Scroll - Blog
const blogScroll = document.getElementById('blogScroll');
const blogDots = document.querySelectorAll('.blog-dot');

let isScrolling;

blogScroll.addEventListener('scroll', () => {
    window.clearTimeout(isScrolling);

    isScrolling = setTimeout(() => {
        const width = blogScroll.getBoundingClientRect().width;
        const index = Math.round(blogScroll.scrollLeft / width);

        blogDots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }, 50);
});

//Faq Section
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const icon = question.querySelector('img');
        
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
                const otherIcon = otherItem.querySelector('.faq-question img');
                otherIcon.src = 'Images/down-arrow.svg';
                otherIcon.className = 'faq-icon';
            }
        });

        item.classList.toggle('active');
        
        if (item.classList.contains('active')) {
            icon.src = 'Images/up-arrow.svg';
            icon.className = 'faq-icon-up';
        } else {
            icon.src = 'Images/down-arrow.svg';
            icon.className = 'faq-icon';
        }
    });
});

//talk to astro 
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('scroll') === 'true') {
        const targetSection = document.getElementById('filter-section');
        
        if (targetSection) {
            setTimeout(() => {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 300);
        }
    }
});

// translation

const originalTexts = {};

// Save original English content
function saveOriginalContent() {
    document.querySelectorAll("[data-key]").forEach(el => {
        const key = el.getAttribute("data-key");
        originalTexts[key] = el.innerHTML;
    });
}

// Load language
async function loadLanguage(lang) {

    // Agar English select hua → original restore
    if (lang === "en") {
        document.querySelectorAll("[data-key]").forEach(el => {
            const key = el.getAttribute("data-key");
            if (originalTexts[key]) {
                el.innerHTML = originalTexts[key];
            }
        });

        document.getElementById("current-lang").innerText = "English";
        localStorage.setItem("lang", "en");
        return;
    }

    // JSON load
    const res = await fetch(`lang/${lang}.json`);
    const data = await res.json();

    document.querySelectorAll("[data-key]").forEach(el => {
        const key = el.getAttribute("data-key");
        if (data[key]) {
            el.innerText = data[key];
        }
    });

    document.getElementById("current-lang").innerText =
        lang === "hi" ? "Hindi" : "Gujarati";

    localStorage.setItem("lang", lang);
}

document.addEventListener("DOMContentLoaded", () => {

    saveOriginalContent(); // 🔥 important

    const savedLang = localStorage.getItem("lang") || "en";
    loadLanguage(savedLang);

    document.querySelectorAll(".lang-dropdown a").forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const lang = this.getAttribute("data-lang");
            loadLanguage(lang);
        });
    });

});

// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", function() {

    
    const hamburger = document.getElementById('hamburger');
    const topStrip = document.querySelector('.top-strip');

    if (hamburger && topStrip) {
        hamburger.addEventListener('click', () => {
            topStrip.classList.toggle('active');
        });

        window.addEventListener('scroll', () => {
            if (topStrip.classList.contains('active')) {
                topStrip.classList.remove('active');
            }
        });

        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !topStrip.contains(e.target)) {
                topStrip.classList.remove('active');
            }
        });
    }

    // Panchang Calendar Logic
    let currentYear = 2026;
    let currentMonth = 2; 
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const monthLabel = document.querySelector('.cal-month-name');
    const compactCalendar = document.getElementById('compact-calendar');
    const tabBtns = document.querySelectorAll('.tab-btn');

    function updateCalendarUI() {
        if (monthLabel) {
            monthLabel.innerText = `${monthNames[currentMonth]} ${currentYear}`;
        }
    }

    window.nextMonth = function() {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        updateCalendarUI();
    };

    window.prevMonth = function() {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        updateCalendarUI();
    };

    window.showCalendarTab = function() {
        if (compactCalendar) compactCalendar.style.display = 'block';
        updateTabs(2);
    };

    window.showToday = function() {
        if (compactCalendar) compactCalendar.style.display = 'none';
        updateTabs(0);
    };

    window.showTomorrow = function() {
        if (compactCalendar) compactCalendar.style.display = 'none';
        updateTabs(1);
    };

    function updateTabs(index) {
        tabBtns.forEach((btn, i) => {
            if (i === index) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    updateCalendarUI();
});