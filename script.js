//Kundali Dropdown Menu Toggle Functionality
document.getElementById('kundali-menu').addEventListener('click', function(e) {
    e.stopPropagation();
    const menu = this.querySelector('.dropdown-menu');
    menu.classList.toggle('show');
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

document.addEventListener("DOMContentLoaded", function() {

    // Mobile Navigation Toggle
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