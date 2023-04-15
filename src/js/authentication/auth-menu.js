import Authentication from '../authentication/authentication';
export default class AuthMenu {
  constructor() {
    this.authentication = new Authentication();

    this.refs = {};

    this.buildRefs();
    this.hangListeners();
  }

  buildRefs() {
    this.refs = {
      menu: document.querySelector('.auth-menu'),
      headerNav: document.querySelector('.header__box-nav'),
      headerBottom: document.querySelector('.header__box-bottom'),
      menuOpenButton: document.querySelector('.auth-menu-button--open'),
      menuCloseButton: document.querySelector('.auth-menu-button--close'),
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
}
