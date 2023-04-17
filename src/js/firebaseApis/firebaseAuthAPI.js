// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
} from 'firebase/auth';

export default class FirebaseAuthAPI {
  constructor(config, onLoginCallback, onLogoutCallback) {
    this.onLoginCallback = onLoginCallback;
    this.onLogoutCallback = onLogoutCallback;

    this.app = initializeApp(config);
    this.auth = getAuth(this.app);

    this.auth.onAuthStateChanged(this.handleAuthStateChanged.bind(this));
  }

  isAuthenticated() {
    return this.auth.currentUser ? true : false;
  }

  getAuth() {
    return this.auth;
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

  githubAuth() {
    return signInWithPopup(this.auth, new GithubAuthProvider());
  }

  googleAuth() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  handleAuthStateChanged(user) {
    if (user) {
      this.onLoginCallback(user);
    } else {
      this.onLogoutCallback();
    }
  }
}
