document.addEventListener("DOMContentLoaded", () => {

    // ================= KUNDALI DROPDOWN =================
    const kundaliMenu = document.getElementById('kundali-menu');

    if (kundaliMenu) {
        kundaliMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            const menu = this.querySelector('.dropdown-menu');

            if (menu) {
                menu.classList.toggle('show');
                this.classList.toggle('active');
            }
        });

        document.addEventListener('click', function() {
            const menu = document.querySelector('.dropdown-menu');
            if (menu && menu.classList.contains('show')) {
                menu.classList.remove('show');
                kundaliMenu.classList.remove('active');
            }
        });
    }

    // ================= SCROLL REVEAL =================
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length > 0) {
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

        revealElements.forEach((el) => observer.observe(el));
    }

    // ================= TESTIMONIAL SCROLL =================
    const scrollContainer = document.getElementById('testimonialScroll');
    const dots = document.querySelectorAll('.dot');

    if (scrollContainer && dots.length > 0) {
        scrollContainer.addEventListener('scroll', () => {
            const width = scrollContainer.offsetWidth;
            const activeIndex = Math.round(scrollContainer.scrollLeft / width);

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeIndex);
            });
        });
    }

    // ================= BLOG SCROLL =================
    const blogScroll = document.getElementById('blogScroll');
    const blogDots = document.querySelectorAll('.blog-dot');

    if (blogScroll && blogDots.length > 0) {
        let isScrolling;

        blogScroll.addEventListener('scroll', () => {
            clearTimeout(isScrolling);

            isScrolling = setTimeout(() => {
                const width = blogScroll.getBoundingClientRect().width;
                const index = Math.round(blogScroll.scrollLeft / width);

                blogDots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
            }, 50);
        });
    }

    // ================= FAQ =================
    const faqQuestions = document.querySelectorAll('.faq-question');

    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const item = question.parentElement;
                const icon = question.querySelector('img');

                document.querySelectorAll('.faq-item').forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherIcon = otherItem.querySelector('.faq-question img');
                        if (otherIcon) {
                            otherIcon.src = 'Images/down-arrow.svg';
                            otherIcon.className = 'faq-icon';
                        }
                    }
                });

                item.classList.toggle('active');

                if (icon) {
                    if (item.classList.contains('active')) {
                        icon.src = 'Images/up-arrow.svg';
                        icon.className = 'faq-icon-up';
                    } else {
                        icon.src = 'Images/down-arrow.svg';
                        icon.className = 'faq-icon';
                    }
                }
            });
        });
    }

    // ================= SCROLL TO FILTER =================
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

    // ================= TRANSLATION =================
    const originalTexts = {};

    function saveOriginalContent() {
        document.querySelectorAll("[data-key]").forEach(el => {
            const key = el.getAttribute("data-key");
            originalTexts[key] = el.innerHTML;
        });
    }

    async function loadLanguage(lang) {

        if (lang === "en") {
            document.querySelectorAll("[data-key]").forEach(el => {
                const key = el.getAttribute("data-key");
                if (originalTexts[key]) {
                    el.innerHTML = originalTexts[key];
                }
            });

            const currentLang = document.getElementById("current-lang");
            if (currentLang) currentLang.innerText = "English";

            localStorage.setItem("lang", "en");
            return;
        }

        const res = await fetch(`lang/${lang}.json`);
        const data = await res.json();

        document.querySelectorAll("[data-key]").forEach(el => {
            const key = el.getAttribute("data-key");
            if (data[key]) {
                el.innerText = data[key];
            }
        });

        const currentLang = document.getElementById("current-lang");
        if (currentLang) {
            currentLang.innerText = lang === "hi" ? "Hindi" : "Gujarati";
        }

        localStorage.setItem("lang", lang);
    }

    saveOriginalContent();

    const savedLang = localStorage.getItem("lang") || "en";
    loadLanguage(savedLang);

    document.querySelectorAll(".lang-dropdown a").forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const lang = this.getAttribute("data-lang");
            loadLanguage(lang);
        });
    });

    // ================= MOBILE NAV =================
    const hamburger = document.getElementById('hamburger');
    const topStrip = document.querySelector('.top-strip');

    if (hamburger && topStrip) {
        hamburger.addEventListener('click', () => {
            topStrip.classList.toggle('active');
        });

        window.addEventListener('scroll', () => {
            topStrip.classList.remove('active');
        });

        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !topStrip.contains(e.target)) {
                topStrip.classList.remove('active');
            }
        });
    }

    // ================= SIGN IN POPUP =================
    const modal = document.getElementById("authModal");
    const openBtn = document.querySelector(".sign-in");
    const closeBtn = document.getElementById("closeModal");
    const mobileInput = document.getElementById("mobileInput");
    const otpBtn = document.querySelector(".otp-btn");

    if (modal && openBtn) {

        const closeModal = () => {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        };

        openBtn.addEventListener("click", () => {
            modal.style.display = "flex";
            document.body.style.overflow = "hidden";
        });

        if (closeBtn) closeBtn.addEventListener("click", closeModal);

        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") closeModal();
        });

        if (mobileInput) {
            mobileInput.addEventListener("input", () => {
                mobileInput.value = mobileInput.value.replace(/\D/g, "");
                if (mobileInput.value.length > 10) {
                    mobileInput.value = mobileInput.value.slice(0, 10);
                }
            });
        }

        if (otpBtn) {
            otpBtn.addEventListener("click", () => {
                const number = mobileInput.value;

                if (number.length !== 10) {
                    alert("Enter valid 10-digit number");
                    return;
                }

                console.log("Valid:", number);
            });
        }
    }

    // ================= JANAM KUNDALI MINUTE DROPDOWN =================
    const minuteSelect = document.getElementById("tob-mm");

    if (minuteSelect) {
        for (let i = 0; i < 60; i++) {
            let val = i.toString().padStart(2, '0');
            let option = document.createElement("option");

            option.value = val;
            option.textContent = val;

            minuteSelect.appendChild(option);
        }
    }

    // ================= MATCHMAKING TABS =================
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    if (tabButtons.length > 0 && tabContents.length > 0) {

        tabButtons.forEach(button => {
            button.addEventListener("click", () => {

                tabButtons.forEach(btn => {
                    btn.classList.remove("active");
                    btn.setAttribute("aria-selected", "false");
                });

                button.classList.add("active");
                button.setAttribute("aria-selected", "true");

                const target = button.getAttribute("data-tab");

                tabContents.forEach(content => {
                    content.classList.remove("active");
                });

                const activeForm = document.getElementById(`${target}-form`);
                if (activeForm) {
                    activeForm.classList.add("active");
                }

            });
        });

    }

});

// ===============================
// CATEGORY FILTER FUNCTIONALITY
// (Gemstone / Rudra / Idols etc. filtering system)
// ===============================

const filter = document.getElementById("categoryFilter");
const cards = document.querySelectorAll(".gemstone-card");

// Check if filter dropdown exists
if (filter) {
    filter.addEventListener("change", () => {

        // Get selected category value from dropdown
        const selected = filter.value;

        // Loop through all cards and show/hide based on category
        cards.forEach(card => {

            // Get category of each card from data-category attribute
            const category = card.getAttribute("data-category");

            // Show card if matches selected filter OR if "all" is selected
            if (selected === "all" || category === selected) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });
}