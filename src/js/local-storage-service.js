import LocalStorageAPI from './localStorageAPI';
const localStorageAPI = new LocalStorageAPI();

export function addFilmToLibrary(film, key) {
  if (localStorageAPI.check(key, film.id)) {
    localStorageAPI.remove(key, film.id);
    addButton(key);
    return;
  }

  localStorageAPI.add(film, key);
  doneButton(key);

  if (key === localStorageAPI.keyW) {
    if (localStorageAPI.check(localStorageAPI.keyQ, film.id)) {
      localStorageAPI.remove(localStorageAPI.keyQ, film.id);
      addButton(localStorageAPI.keyQ);
      return;
    }
  }

  if (key === localStorageAPI.keyQ) {
    if (localStorageAPI.check(localStorageAPI.keyW, film.id)) {
      localStorageAPI.remove(localStorageAPI.keyW, film.id);
      addButton(localStorageAPI.keyW);
      return;
    }
  }
}

export function checkFilmInLibrary(key, id) {
  if (localStorageAPI.check(key, id)) {
    doneButton(key);
  }
}

function doneButton(key) {
  if (key === localStorageAPI.keyW) {
    document.querySelector(
      '.modal-movie__add-watched-btn'
    ).textContent = `In ${localStorageAPI.keyW}`;

    document
      .querySelector('.modal-movie__add-watched-btn')
      .classList.add('modal-movie__add-watched-btn--active');

  }

  if (key === localStorageAPI.keyQ) {
    document.querySelector(
      '.modal-movie__add-queue-btn'
    ).textContent = `In ${localStorageAPI.keyQ}`;

    document
      .querySelector('.modal-movie__add-queue-btn')
      .classList.add('modal-movie__add-queue-btn--active');

  }
}

function addButton(key) {
  if (key === localStorageAPI.keyW) {
    document.querySelector(
      '.modal-movie__add-watched-btn'
    ).textContent = `Add to ${localStorageAPI.keyW}`;

    document
      .querySelector('.modal-movie__add-watched-btn')
      .classList.remove('modal-movie__add-watched-btn--active');

  }

  if (key === localStorageAPI.keyQ) {
    document.querySelector(
      '.modal-movie__add-queue-btn'
    ).textContent = `Add to ${localStorageAPI.keyQ}`;

    document
      .querySelector('.modal-movie__add-queue-btn')
      .classList.remove('modal-movie__add-queue-btn--active');

  }
}
