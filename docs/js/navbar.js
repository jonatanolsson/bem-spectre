document.addEventListener("DOMContentLoaded", (event) => {
    const navbarButton = document.querySelector('#navbar-toggler');

    if (navbarButton) {
        navbarButton.addEventListener('click', (event) => {
            navbarButton.parentElement.classList.toggle('navbar--expanded');
            navbarButton.setAttribute('aria-expanded', navbarButton.parentElement.classList.contains('navbar--expanded').toString())
        })
    }
});
