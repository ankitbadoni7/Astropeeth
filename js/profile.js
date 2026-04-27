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