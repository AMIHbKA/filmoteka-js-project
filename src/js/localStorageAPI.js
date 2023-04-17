import { Notify } from 'notiflix';

export default class LocalStorageAPI {
  constructor() {
    this.storageData = [];
    this.ERROR_MESSAGE = 'Oops, something went wrong. Try again later.';
  }
  add(newFilm, key) {
    try {
      const savedData = JSON.parse(localStorage.getItem(key));

      if (savedData) {
        this.storageData = this.storageData.concat(savedData);
      }

      this.storageData.push(newFilm);
      localStorage.setItem(key, JSON.stringify(this.storageData));
    } catch (error) {
      Notify.failure(this.ERROR_MESSAGE);
      console.log(error.message);
    }
  }

  save(data, key) {
    try {
      this.storageData = data;
      localStorage.setItem(key, JSON.stringify(this.storageData));
    } catch (error) {
      Notify.failure(this.ERROR_MESSAGE);
      console.log(error.message);
    }
  }

  getByKey(key) {
    try {
      // код отримання масиву з localStorage, якщо він є
    } catch (error) {
      Notify.failure(this.ERROR_MESSAGE);
      console.log(error.message);
    }
  }

  remove(key, id) {
    try {
      const savedData = JSON.parse(localStorage.getItem(key));
      if (savedData && savedData.find(movie => movie.id === id)) {
        const filmToRemove = savedData.find(movie => movie.id === id);
        savedData.splice(savedData.indexOf(filmToRemove), 1);
        this.save(savedData, key);
      }
    } catch (error) {
      Notify.failure(this.ERROR_MESSAGE);
      console.log(error.message);
    }
  }

  check(key, id) {
    try {
      const savedData = JSON.parse(localStorage.getItem(key));
      if (savedData && savedData.find(movie => movie.id === id)) {
        return true;
      }
      return false;
    } catch (error) {
      Notify.failure(this.ERROR_MESSAGE);
      console.log(error.message);
    }
  }
}
