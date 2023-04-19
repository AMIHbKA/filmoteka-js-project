import { initializeApp } from 'firebase/app';
import Authentication from '../authentication/authentication';
import Profile from './profile';
export default class AuthMenu {
  constructor() {
    this.FIREBASE_CONFIG = {
      apiKey: 'AIzaSyCUzIbYrWt1gRDF2DKq0tM78ENX5LnPctw',
      authDomain: 'filmoteka-js-project-8.firebaseapp.com',
      projectId: 'filmoteka-js-project-8',
      storageBucket: 'filmoteka-js-project-8.appspot.com',
      messagingSenderId: '369220874407',
      appId: '1:369220874407:web:8dd7500aa59f5f3bad2b82',
      measurementId: 'G-B22P5WY8Z9',
    };

    this.app = initializeApp(this.FIREBASE_CONFIG);

    new Authentication(
      this.app,
      this.handleLogin.bind(this),
      this.handleLogout.bind(this)
    );

    this.profile = new Profile(this.app);

    this.refs = {};

    this.buildRefs();
    this.hangListeners();
  }

  buildRefs() {
    this.refs = {
      menu: document.querySelector('.auth-menu'),
      wrapper: document.querySelector('.auth-menu__wrapper'),
      headerNav: document.querySelector('.header__box-nav'),
      headerBottom: document.querySelector('.header__box-bottom'),
      menuOpenButton: document.querySelector('.auth-menu__button--open'),
      menuCloseButton: document.querySelector('.auth-menu__button--close'),
    };
  }

  hangListeners() {
    this.refs.menuOpenButton.addEventListener(
      'click',
      this.openMenu.bind(this)
    );

    this.refs.menuCloseButton.addEventListener(
      'click',
      this.closeMenu.bind(this)
    );
  }

  handleLogin() {
    this.showProfile();
    this.profile.handleLogin();
  }

  handleLogout() {
    this.showLoginForm();
    this.profile.handleLogout();
  }

  openMenu() {
    this.refs.headerNav.classList.add('header__box-nav--hidden');
    this.refs.headerBottom.classList.add('header__box-bottom--hidden');

    setTimeout(() => {
      this.refs.menu.classList.remove('auth-menu--hidden');
    }, 250);
  }

  closeMenu() {
    this.refs.menu.classList.add('auth-menu--hidden');

    setTimeout(() => {
      this.refs.headerNav.classList.remove('header__box-nav--hidden');
      this.refs.headerBottom.classList.remove('header__box-bottom--hidden');
    }, 250);
  }

  showLoginForm() {
    this.refs.wrapper.classList.add('auth-menu__wrapper--flipped');
  }

  showProfile() {
    this.refs.wrapper.classList.remove('auth-menu__wrapper--flipped');
  }
}
