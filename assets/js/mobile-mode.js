document.addEventListener('DOMContentLoaded', () => {
    const headerMenu = document.getElementById('headerMenu');
    const nav = document.querySelector('header nav');

    if (headerMenu && nav) {
        headerMenu.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    }
});