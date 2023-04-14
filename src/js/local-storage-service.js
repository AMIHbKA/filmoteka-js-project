import { Notify } from "notiflix";

const ERROR_MESSAGE = "Oops, something went wrong. Try again later."

// У файлі рендеру модалки:
// document.querySelector(".modal-movie__add-watched-btn").addEventListener('click', addFilmToLibrary(data, "watched"));
// document.querySelector(".modal-movie__add-queue-btn").addEventListener('click', addFilmToLibrary(data, "queue"));



function addFilmToLibrary(newFilm, key) {
    try {
        const savedData = JSON.parse(localStorage.getItem(key));
        
        if (!savedData) {
            localStorage.setItem(key, JSON.stringify(newFilm));
            return;
        }
        let storageData = [];
        storageData = storageData.concat(savedData);
        storageData.push(newFilm);
        localStorage.setItem(key, JSON.stringify(storageData));
        
    } catch (error) {
        Notify.failure(ERROR_MESSAGE);
    }
}
