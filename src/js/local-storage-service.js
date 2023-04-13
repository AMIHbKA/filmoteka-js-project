
import { Notify } from "notiflix";

const ERROR_MESSAGE = "Oops, something went wrong. Try again later."


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

const film = {
    genre: "adventure",
    rating: 6,
    name: 'Hello',
}

const film2 = {
    genre: "horror",
    rating: 6,
    name: 'ello',
}

const film3 = {
    genre: "or",
    rating: 6,
    name: 'allo',
}

addFilmToLibrary(film, "watched");
addFilmToLibrary(film2, "watched");
addFilmToLibrary(film3, "queue");
