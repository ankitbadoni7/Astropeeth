document.addEventListener('DOMContentLoaded', () => {

    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode');

    const heading = document.getElementById('report-heading');

    if (!mode) {
        document.body.classList.add('only-report-mode');
        if (heading) heading.innerText = "Get Detailed Report";
    }

    if (mode === 'chat') {
        document.body.classList.add('only-chat-mode');
        if (heading) heading.innerText = "Chat with Astrologer";
    }

    if (mode === 'call') {
        document.body.classList.add('only-call-mode');
        if (heading) heading.innerText = "Talk to Astrologer";
    }

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