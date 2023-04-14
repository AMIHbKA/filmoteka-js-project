const preloader = document.querySelector('.preloader');

export function loadingSpinner() {
    window.addEventListener('load', () => {
        preloader.classList.add('hide');
        setTimeout(() => {
            preloader.remove();
        }, 3000);
    });
}

