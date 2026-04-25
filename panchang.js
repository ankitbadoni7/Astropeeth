// ================= MOBILE NAVIGATION =================
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

});

// ================= PANCHANG CALENDAR =================
document.addEventListener("DOMContentLoaded", function() {

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
            btn.classList.toggle('active', i === index);
        });
    }

    updateCalendarUI();

});