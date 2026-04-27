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

// ================= SIGN IN POPUP + VALIDATION =================
document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("authModal");
    const openBtn = document.querySelector(".sign-in");
    const closeBtn = document.getElementById("closeModal");
    const mobileInput = document.getElementById("mobileInput");
    const otpBtn = document.querySelector(".otp-btn");

    // ===== OPEN MODAL =====
    openBtn.addEventListener("click", () => {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden"; // scroll lock
    });

    // ===== CLOSE MODAL FUNCTION =====
    const closeModal = () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // scroll enable
    };

    // CLOSE (X button)
    closeBtn.addEventListener("click", closeModal);

    // CLOSE (outside click)
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // CLOSE (ESC key)
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeModal();
        }
    });

    // ===== MOBILE INPUT VALIDATION =====
    if (mobileInput) {
        mobileInput.addEventListener("input", () => {
            mobileInput.value = mobileInput.value.replace(/\D/g, ""); // only numbers

            if (mobileInput.value.length > 10) {
                mobileInput.value = mobileInput.value.slice(0, 10);
            }
        });
    }

    // ===== OTP BUTTON VALIDATION =====
    if (otpBtn) {
        otpBtn.addEventListener("click", () => {
            const number = mobileInput.value;

            if (number.length !== 10) {
                alert("Please enter a valid 10-digit mobile number");
                return;
            }

            // future: API call here
            console.log("Valid number:", number);
        });
    }

});