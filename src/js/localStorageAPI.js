import { Notify } from 'notiflix';

export default class LocalStorageAPI {
  constructor() {
    this.ERROR_MESSAGE = 'Oops, something went wrong. Try again later.';
    this.keyW = 'watched';
    this.keyQ = 'queue';
  }

  getValueByKey(key) {
    return localStorage.getItem(key);
  }

  setValueByKey(key, value) {
    localStorage.setItem(key, value);
  }

  removeValueByKey(key) {
    localStorage.removeItem(key);
  }

  getStoredDataByKey(key) {
    try {
      const storedDataJson = localStorage.getItem(key);

      return storedDataJson && storedDataJson.length
        ? JSON.parse(localStorage.getItem(key))
        : null;
    } catch (error) {
      Notify.failure(this.ERROR_MESSAGE);
      console.log(error.message);

      return false;
    }
  }

  setStoredDataByKey(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));

      return true;
    } catch (error) {
      Notify.failure(this.ERROR_MESSAGE);
      console.log(error.message);

      return false;
    }
  }

  add(newFilm, key) {
    try {
      const dataToStore = this.getStoredDataByKey(key) ?? [];

      dataToStore.push(newFilm);

      localStorage.setItem(key, JSON.stringify(dataToStore));

      window.dispatchEvent(new Event('localStorageUpdated'));
    } catch (error) {
      Notify.failure(this.ERROR_MESSAGE);
      console.log(error.message);
    }
  }

  remove(key, id) {
    try {
      const dataToStore = this.getStoredDataByKey(key) ?? [];

      if (dataToStore.find(movie => movie.id === id)) {
        const filmToRemove = dataToStore.find(movie => movie.id === id);

        dataToStore.splice(dataToStore.indexOf(filmToRemove), 1);
      }

      localStorage.setItem(key, JSON.stringify(dataToStore));

      window.dispatchEvent(new Event('localStorageUpdated'));
    } catch (error) {
      Notify.failure(this.ERROR_MESSAGE);
      console.log(error.message);
    }
  }

  check(key, id) {
    const storedData = this.getStoredDataByKey(key);

    if (storedData && storedData.find(movie => movie.id === id)) {
      return true;
    }

    return false;
  }
}
