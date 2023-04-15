// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

export default class FirebaseAPI {
  constructor(onLoginCallback, onLogoutCallback) {
    this.FIREBASE_CONFIG = {
      apiKey: 'AIzaSyCUzIbYrWt1gRDF2DKq0tM78ENX5LnPctw',
      authDomain: 'filmoteka-js-project-8.firebaseapp.com',
      projectId: 'filmoteka-js-project-8',
      storageBucket: 'filmoteka-js-project-8.appspot.com',
      messagingSenderId: '369220874407',
      appId: '1:369220874407:web:8dd7500aa59f5f3bad2b82',
      measurementId: 'G-B22P5WY8Z9',
    };

    this.onLoginCallback = onLoginCallback;
    this.onLogoutCallback = onLogoutCallback;

    this.app = initializeApp(this.FIREBASE_CONFIG);
    this.auth = getAuth(this.app);

    this.auth.onAuthStateChanged(this.handleAuthStateChanged.bind(this));
  }

  isAuthenticated() {
    return this.auth.currentUser ? true : false;
  }

  login(email, password) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register(email, password) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  handleAuthStateChanged(user) {
    if (user) {
      this.onLoginCallback(user);
    } else {
      this.onLogoutCallback();
    }
  }
}
