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
}

export function checkFilmInLibrary(key, id) {
  if (localStorageAPI.check(key, id)) {
    doneButton(key);
  }
}

function doneButton(key) {
  if (key === 'watched') {
    document.querySelector('.modal-movie__add-watched-btn').textContent =
      'Watched';
  }

  if (key === 'queue') {
    document.querySelector('.modal-movie__add-queue-btn').textContent =
      'In queue';
  }
}

function addButton(key) {
  if (key === 'watched') {
    document.querySelector('.modal-movie__add-watched-btn').textContent =
      'Add to watched';
  }

  if (key === 'queue') {
    document.querySelector('.modal-movie__add-queue-btn').textContent =
      'Add to queue';
  }
}
