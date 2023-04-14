import { Notify } from "notiflix";

const ERROR_MESSAGE = "Oops, something went wrong. Try again later."

function addFilmToLibrary(newFilm, key) {
    try {
        const savedData = JSON.parse(localStorage.getItem(key));
        let storageData = [];

        if (savedData) {
            storageData = storageData.concat(savedData);
        }
        
        storageData.push(newFilm);
        localStorage.setItem(key, JSON.stringify(storageData));

    } catch (error) {
        Notify.failure(ERROR_MESSAGE);
    }
}

export function checkFilmInLibrary(data, key, event) {
    try {
        const savedData = JSON.parse(localStorage.getItem(key));

        if (savedData && savedData.find(movie => movie.id === data.id)) {
            
            Notify.failure(`This film is already in your ${key}`);
            event.target.setAttribute("disabled", "true");
            return;
        };

        addFilmToLibrary(data, key);
    
        event.target.setAttribute("disabled", "true");
        
    } catch (error) {
        Notify.failure(ERROR_MESSAGE);
    }
}
