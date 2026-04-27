document.querySelectorAll('.report-dropdown-trigger').forEach(trigger => {

    trigger.addEventListener('click', function (e) {
        e.stopPropagation();

        const menu = this.querySelector('.report-dropdown-menu');

        document.querySelectorAll('.report-dropdown-menu').forEach(m => {
            if (m !== menu) m.classList.remove('show');
        });

        if (menu) menu.classList.toggle('show');
    });
});

document.querySelectorAll('.report-dropdown-menu a').forEach(item => {
    item.addEventListener('click', function (e) {
        e.preventDefault();

        const text = this.innerText;
        const trigger = this.closest('.report-dropdown-trigger');

        if (trigger) {
            const span = trigger.querySelector('span');
            if (span) span.innerText = text;
        }
    });
});

window.addEventListener('click', () => {
    document.querySelectorAll('.report-dropdown-menu').forEach(menu => {
        menu.classList.remove('show');
    });
});

const clearBtn = document.querySelector('.report-clear-btn');

if (clearBtn) {
    clearBtn.addEventListener('click', () => {

        const searchInput = document.querySelector('.report-search-box input');
        if (searchInput) searchInput.value = '';

        const sortSpan = document.querySelector('#report-sort-filter span');
        if (sortSpan) sortSpan.innerText = 'Sort filters';

        const memberSpan = document.querySelector('#report-member-filter span');
        if (memberSpan) memberSpan.innerText = 'Select team member';
    });
}