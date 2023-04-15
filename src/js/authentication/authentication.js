import FirebaseAPI from './firebaseAPI.js';
import { Notify } from 'notiflix';

export default class Authentication {
  constructor() {
    this.firebase = new FirebaseAPI();

    this.refs = {};
    this.action = 'login';

    this.buildRefs();
    this.hangListeners();
  }

  buildRefs() {
    this.refs.form = document.querySelector('.auth-form__form');
    this.refs.submitButton = document.querySelector('#submit');
    this.refs.loginButton = document.querySelector('#login');
    this.refs.registerButton = document.querySelector('#register');
    this.refs.githubButton = document.querySelector('#github-auth');
    this.refs.googleButton = document.querySelector('#google-auth');
    this.refs.inputsWrapper = document.querySelector(
      '.auth-form__inputs-wrapper'
    );
  }

  hangListeners() {
    this.refs.form.addEventListener('submit', this.handleSubmit.bind(this));
    this.refs.loginButton.addEventListener(
      'click',
      this.onLoginButtonClick.bind(this)
    );
    this.refs.registerButton.addEventListener(
      'click',
      this.onRegisterButtonClick.bind(this)
    );
    this.refs.githubButton.addEventListener(
      'click',
      this.handleGithubAuth.bind(this)
    );
    this.refs.googleButton.addEventListener(
      'click',
      this.handleGoogleAuth.bind(this)
    );
  }

  onLoginButtonClick() {
    this.action = 'login';
    this.clickSubmitButton();
  }

  onRegisterButtonClick() {
    this.action = 'register';
    this.clickSubmitButton();
  }

  clickSubmitButton() {
    this.refs.submitButton.click();
  }

  async handleSubmit(e) {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    if (this.action === 'login') {
      await this.processLogin(email, password);
    } else {
      await this.processRegister(email, password);
    }
  }

  async processLogin(email, password) {
    try {
      await this.firebase.login(email, password);
    } catch (error) {
      let errorMessage = '';
      console.log(error.code);

      switch (error.code) {
        case 'auth/wrong-password':
          errorMessage = 'Wrong password';
          break;
        case 'auth/user-not-found':
          errorMessage = 'User not found';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many attempts. Please try again later.';
          break;
        default:
          errorMessage = 'Something went wrong';
      }

      this.shakeInputs();

      Notify.failure(errorMessage, {
        clickToClose: true,
      });
    }

    this.showProfile();
    this.resetForm();
  }

  async processRegister(email, password) {
    try {
      await this.firebase.register(email, password);
    } catch (error) {
      let errorMessage = '';
      console.log(error.code);

      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email already in use';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many attempts. Please try again later.';
          break;
        default:
          errorMessage = 'Something went wrong';
      }

      this.shakeInputs();

      Notify.failure(errorMessage, {
        clickToClose: true,
      });
    }

    this.showProfile();
    this.resetForm();
  }

  async handleGithubAuth(e) {
    e.preventDefault();
  }

  async handleGoogleAuth(e) {
    e.preventDefault();
  }

  showLoginForm() {}

  showProfile() {}

  resetForm() {
    this.refs.form.reset();
  }

  shakeInputs() {
    this.refs.inputsWrapper.classList.add('auth-form__inputs-wrapper--shake');

    setTimeout(() => {
      this.refs.inputsWrapper.classList.remove(
        'auth-form__inputs-wrapper--shake'
      );
    }, 500);
  }
}
