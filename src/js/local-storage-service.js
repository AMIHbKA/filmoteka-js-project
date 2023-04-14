import { Notify } from "notiflix";

const ERROR_MESSAGE = "Oops, something went wrong. Try again later."

export function addFilmToLibrary(newFilm, key) {
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
