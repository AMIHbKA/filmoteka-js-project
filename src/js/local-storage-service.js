import { Notify } from "notiflix";

const ERROR_MESSAGE = "Oops, something went wrong. Try again later."

export function addFilmToLibrary(newFilm, key) {
    try {
        const savedData = JSON.parse(localStorage.getItem(key));
        let storageData = [];

        if (savedData) {
            storageData = storageData.concat(savedData);
        }
        
        storageData.push(newFilm);
        localStorage.setItem(key, JSON.stringify(storageData));
        disableButton(key);

    } catch (error) {
        Notify.failure(ERROR_MESSAGE);
    }
}

export function checkFilmInLibrary(key, id) {
    try {
        const savedData = JSON.parse(localStorage.getItem(key));
        if (savedData && savedData.find(movie => movie.id === id)) {
            disableButton(key);
        };
        
    } catch (error) {
        Notify.failure(ERROR_MESSAGE);
    }
}

function disableButton(key) {
    if (key === "watched") {
        document.querySelector('.modal-movie__add-watched-btn').textContent = 'Watched';
        document.querySelector('.modal-movie__add-watched-btn').setAttribute("disabled", "true");
    }

    if (key === "queue") {
        document.querySelector('.modal-movie__add-queue-btn').textContent ='In queue';
        document.querySelector('.modal-movie__add-queue-btn').setAttribute("disabled", "true");
    }
}
