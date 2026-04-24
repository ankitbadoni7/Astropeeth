//chat mode
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'chat') {
        document.body.classList.add('only-chat-mode');
    }
});

//call mode
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode');

    if (mode === 'chat') {
        document.body.classList.add('only-chat-mode');
    } else if (mode === 'call') {
        document.body.classList.add('only-call-mode');
    }
});