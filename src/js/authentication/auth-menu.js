import Authentication from '../authentication/authentication';
export default class AuthMenu {
  constructor() {
    this.authentication = new Authentication(
      this.showProfile.bind(this),
      this.showLoginForm.bind(this)
    );

    this.refs = {};

    this.buildRefs();
    this.hangListeners();
    this.initMenu();
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

  initMenu() {
    if (this.authentication.isAuthenticated()) {
      this.showProfile();
    } else {
      this.showLoginForm();
    }
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
