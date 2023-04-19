import LocalStorageAPI from '../localStorageAPI';
import FirestoreAPI from '../firebaseApis/firebaseFirestoreAPI';
import delay from '../utils/delay';
import { getAuth } from 'firebase/auth';
import { Notify } from 'notiflix';

export default class Profile {
  constructor(app) {
    this.IS_CONSISTENT_WITH_FIRESTORE_KEY = 'isConsistentWithFirestore';
    this.ERROR_MESSAGE = 'Oops, something went wrong. Try again later.';
    this.KEY_WATCHED = 'watched';
    this.KEY_QUEUE = 'queue';

    this.app = app;
    this.firestore = new FirestoreAPI(
      app,
      this.handleSnapshotUpdate.bind(this)
    );
    this.localStorage = new LocalStorageAPI();

    this.refs = {};

    this.buildRefs();
    this.hangListeners();
  }

  buildRefs() {
    this.refs.profileConsistent = document.querySelector(
      '.profile__consistent'
    );
    this.refs.profileCheckmark = document.querySelector('.profile__checkmark');
    this.refs.profileStatus = document.querySelector('.profile__status');
    this.refs.spinner = document.querySelector('.profile__spinner');
    this.refs.syncsOptionsButtons = document.querySelector(
      '.profile__syncs-options'
    );
    this.refs.syncFromLocalStorageButton = document.querySelector(
      '#from-local-to-cloud'
    );
    this.refs.syncFromFirestoreButton = document.querySelector(
      '#from-cloud-to-local'
    );
  }

  hangListeners() {
    window.addEventListener(
      'localStorageUpdated',
      this.handleLocalStorageUpdated.bind(this)
    );
    this.refs.syncFromLocalStorageButton.addEventListener(
      'click',
      this.syncFromLocalStorage.bind(this)
    );
    this.refs.syncFromFirestoreButton.addEventListener(
      'click',
      this.syncFromFirestore.bind(this)
    );
  }

  async handleLogin() {
    this.checkConsistencyWithFirestore();
  }

  handleLogout() {
    this.revokeDataConsistency();
    this.hideDataConsistentStatus();
  }

  handleSnapshotUpdate(firestoreData) {
    const dataToStore = {
      watched: firestoreData?.watched ?? [],
      queue: firestoreData?.queue ?? [],
    };

    if (this.storeDataFromFirestoreToLocalStorage(dataToStore)) {
      this.updateShowedFilmsList();
    }
  }

  showSpinner() {
    this.refs.spinner.classList.remove('visibility-hidden');
    this.refs.spinner.classList.remove('profile__spinner--hidden');
  }

  async hideSpinner() {
    this.refs.spinner.classList.add('profile__spinner--hidden');
    await delay(250);
    this.refs.spinner.classList.add('visibility-hidden');
  }

  showDataIsConsistent() {
    this.refs.profileStatus.textContent = 'Your data is synced';
    this.refs.profileConsistent.classList.remove('visibility-hidden');
    this.refs.profileConsistent.classList.remove('profile__consistent--hidden');
    this.refs.profileCheckmark.innerHTML = this.getSuccessCheckmarkMarkup();
  }

  async showDataConsistentError() {
    await delay(250);
    await this.hideSpinner();

    this.refs.profileStatus.textContent = 'Data sync error';
    this.refs.profileConsistent.classList.remove('visibility-hidden');
    this.refs.profileConsistent.classList.remove('profile__consistent--hidden');
    this.refs.profileCheckmark.innerHTML = this.getErrorCheckmarkMarkup();
  }

  hideDataConsistentStatus() {
    this.refs.profileConsistent.classList.add('profile__consistent--hidden');
    this.refs.profileConsistent.classList.add('visibility-hidden');
    this.refs.profileStatus.textContent = '';
    this.refs.profileCheckmark.innerHTML = '';
  }

  showSyncsOptionsButtons() {
    this.refs.syncsOptionsButtons.classList.remove('visibility-hidden');
    this.refs.syncsOptionsButtons.classList.remove(
      'profile__syncs-options--hidden'
    );
  }

  async hideSyncsOptionsButtons() {
    this.refs.syncsOptionsButtons.classList.add(
      'profile__syncs-options--hidden'
    );
    await delay(250);
    this.refs.syncsOptionsButtons.classList.add('visibility-hidden');
  }

  async checkConsistencyWithFirestore() {
    const isConsistentWithFirestore = this.localStorage.getValueByKey(
      this.IS_CONSISTENT_WITH_FIRESTORE_KEY
    );

    if (isConsistentWithFirestore) {
      await delay(250);
      await this.hideSpinner();

      this.showDataIsConsistent();

      return;
    }

    this.performDatabaseConsistency();
  }

  async handleLocalStorageUpdated() {
    const auth = getAuth(this.app);

    if (!auth?.currentUser || !this.isDataConsistent()) {
      return;
    }

    const localData = this.getUserDataFromLocalStorage();

    if (localData === false) {
      Notify.failure(this.ERROR_MESSAGE, {
        clickToClose: true,
      });

      this.showDataConsistentError();

      this.revokeDataConsistency();

      return;
    }

    try {
      await this.firestore.uploadUserDataToFirestore(localData);
    } catch {
      Notify.failure(this.ERROR_MESSAGE, {
        clickToClose: true,
      });

      this.showDataConsistentError();

      this.revokeDataConsistency();
    }
  }

  async performDatabaseConsistency() {
    const localData = this.getUserDataFromLocalStorage();
    const firestoreData = await this.getUserDataFromFirestore();

    if (localData === false || firestoreData === false) {
      Notify.failure(this.ERROR_MESSAGE, {
        clickToClose: true,
      });

      this.showDataConsistentError();

      return;
    }

    const isLocalUserDataEmpty = this.isUserDataEmpty(localData);
    const isFirestoreUserDataEmpty = this.isUserDataEmpty(firestoreData);

    if (
      (isLocalUserDataEmpty && isFirestoreUserDataEmpty) ||
      this.compareUserData(localData, firestoreData)
    ) {
      this.setDataConsistency();

      return;
    }

    if (isLocalUserDataEmpty && !isFirestoreUserDataEmpty) {
      if (this.storeDataFromFirestoreToLocalStorage(firestoreData)) {
        this.updateShowedFilmsList();
      }

      return;
    }

    if (!isLocalUserDataEmpty && isFirestoreUserDataEmpty) {
      try {
        await this.firestore.uploadUserDataToFirestore(localData);
      } catch {
        Notify.failure(this.ERROR_MESSAGE, {
          clickToClose: true,
        });

        this.showDataConsistentError();

        return;
      }

      this.setDataConsistency();

      return;
    }

    await delay(250);
    await this.hideSpinner();

    this.showSyncsOptionsButtons();
  }

  async syncFromLocalStorage() {
    await this.hideSyncsOptionsButtons();

    this.showSpinner();

    const localData = this.getUserDataFromLocalStorage();

    if (localData === false) {
      Notify.failure(this.ERROR_MESSAGE, {
        clickToClose: true,
      });

      await this.hideSpinner();

      this.showSyncsOptionsButtons();

      return;
    }

    try {
      await this.firestore.uploadUserDataToFirestore(localData);
    } catch {
      Notify.failure(this.ERROR_MESSAGE, {
        clickToClose: true,
      });

      await this.hideSpinner();

      this.showSyncsOptionsButtons();

      return;
    }

    this.setDataConsistency();
  }

  async syncFromFirestore() {
    await this.hideSyncsOptionsButtons();

    this.showSpinner();

    const firestoreData = await this.getUserDataFromFirestore();

    if (firestoreData === false) {
      Notify.failure(this.ERROR_MESSAGE, {
        clickToClose: true,
      });

      await this.hideSpinner();

      this.showSyncsOptionsButtons();

      return;
    }

    if (this.storeDataFromFirestoreToLocalStorage(firestoreData)) {
      this.updateShowedFilmsList();
    }
  }

  getUserDataFromLocalStorage() {
    const storedWatched = this.localStorage.getStoredDataByKey(
      this.KEY_WATCHED
    );
    const storedQueue = this.localStorage.getStoredDataByKey(this.KEY_QUEUE);

    if (storedWatched === false || storedQueue === false) {
      return false;
    }

    return {
      watched: storedWatched ?? [],
      queue: storedQueue ?? [],
    };
  }

  async getUserDataFromFirestore() {
    let firestoreData;

    try {
      firestoreData = await this.firestore.getUserDataFromFirestore();
    } catch {
      return false;
    }

    return {
      watched: firestoreData?.watched ?? [],
      queue: firestoreData?.queue ?? [],
    };
  }

  storeDataFromFirestoreToLocalStorage(firestoreData) {
    const watchedStored = this.localStorage.setStoredDataByKey(
      this.KEY_WATCHED,
      firestoreData.watched
    );
    const queueStored = this.localStorage.setStoredDataByKey(
      this.KEY_QUEUE,
      firestoreData.queue
    );

    if (watchedStored === false || queueStored === false) {
      this.showDataConsistentError();

      return false;
    }

    this.setDataConsistency();

    return true;
  }

  async setDataConsistency() {
    this.localStorage.setValueByKey(
      this.IS_CONSISTENT_WITH_FIRESTORE_KEY,
      true
    );

    await delay(250);
    await this.hideSpinner();

    this.showDataIsConsistent();
  }

  isDataConsistent() {
    return this.localStorage.getValueByKey(
      this.IS_CONSISTENT_WITH_FIRESTORE_KEY
    )
      ? true
      : false;
  }

  revokeDataConsistency() {
    this.localStorage.removeValueByKey(this.IS_CONSISTENT_WITH_FIRESTORE_KEY);
  }

  isUserDataEmpty(userDate) {
    return userDate.watched.length === 0 && userDate.queue.length === 0
      ? true
      : false;
  }

  compareUserData(localData, firestoreData) {
    const localWatched = localData?.watched ?? [];
    const localQueue = localData?.queue ?? [];
    const firestoreWatched = firestoreData?.watched ?? [];
    const firestoreQueue = firestoreData?.queue ?? [];

    if (localWatched.length !== firestoreWatched.length) {
      return false;
    }

    if (localQueue.length !== firestoreQueue.length) {
      return false;
    }

    const jsonedLocalWatched = JSON.stringify(
      this.sortObjectKeys(localWatched)
    );
    const jsonedLocalQueue = JSON.stringify(this.sortObjectKeys(localQueue));
    const jsonedFirestoreWatched = JSON.stringify(
      this.sortObjectKeys(firestoreWatched)
    );
    const jsonedFirestoreQueue = JSON.stringify(
      this.sortObjectKeys(firestoreQueue)
    );

    if (jsonedLocalWatched !== jsonedFirestoreWatched) {
      return false;
    }

    if (jsonedLocalQueue !== jsonedFirestoreQueue) {
      return false;
    }

    return true;
  }

  sortObjectKeys(obj) {
    if (Array.isArray(obj)) {
      return obj.map(item => this.sortObjectKeys(item));
    } else if (typeof obj === 'object' && obj !== null) {
      return Object.keys(obj)
        .sort()
        .reduce((sortedObj, key) => {
          sortedObj[key] = this.sortObjectKeys(obj[key]);

          return sortedObj;
        }, {});
    }

    return obj;
  }

  updateShowedFilmsList() {
    const homeButton = document.querySelector('#nav-link-home');

    if (homeButton.classList.contains('header-nav__link--current')) {
      return;
    }

    const screenWidth = window.innerWidth;

    let watchedRadioButton;
    let queueRadioButton;

    if (screenWidth < 768) {
      watchedRadioButton = document.querySelector('[for="1"]');
      queueRadioButton = document.querySelector('[for="2"]');
    } else {
      watchedRadioButton = document.querySelector('[for="3"]');
      queueRadioButton = document.querySelector('[for="4"]');
    }

    if (watchedRadioButton.control.checked) {
      watchedRadioButton.click();
    } else {
      queueRadioButton.click();
    }
  }

  getSuccessCheckmarkMarkup() {
    return `
      <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
        <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
        <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
      </svg>
    `;
  }

  getErrorCheckmarkMarkup() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" class="checkmark">
        <circle cx="26" cy="26" r="25" fill="none" class="checkmark__circle checkmark__cross"></circle> 
        <path fill="none" d="M 12,12 L 40,40 M 40,12 L 12,40" class="checkmark__check"></path>
      </svg>
    `;
  }
}
