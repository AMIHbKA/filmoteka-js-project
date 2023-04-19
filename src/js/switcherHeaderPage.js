import delay from './utils/delay';

const refs = {
  myLibraryBtn: document.querySelector('#nav-link-library'),
  homeBtn: document.querySelector('#nav-link-home'),
  mobileBtnsWrap: document.querySelector('#mobile-sub-menu'),
  tabletBtnsWrap: document.querySelector('#tablet-sub-menu'),
};

refs.myLibraryBtn.addEventListener('click', onLibraryBtnClick);
refs.homeBtn.addEventListener('click', onHomeBtnClick);

function onLibraryBtnClick() {
  const screenWidth = window.innerWidth;

  refs.myLibraryBtn.classList.add('header-nav__link--current');
  refs.homeBtn.classList.remove('header-nav__link--current');

  if (screenWidth < 768) {
    showMobileLibraryButtons();
    hideTabletLibraryButtons();
  } else {
    showTabletLibraryButtons();
    hideMobileLibraryButtons();
  }
}

function onHomeBtnClick() {
  hideTabletLibraryButtons();
  hideMobileLibraryButtons();

  refs.homeBtn.classList.add('header-nav__link--current');
  refs.myLibraryBtn.classList.remove('header-nav__link--current');
}

function showMobileLibraryButtons() {
  refs.mobileBtnsWrap.classList.remove('visibility-hidden');
  refs.mobileBtnsWrap.classList.remove('header-nav__sub-menu--hidden');
}

function showTabletLibraryButtons() {
  refs.tabletBtnsWrap.classList.remove('visibility-hidden');
  refs.tabletBtnsWrap.classList.remove('header-nav__sub-menu--hidden');
}

async function hideMobileLibraryButtons() {
  refs.mobileBtnsWrap.classList.add('header-nav__sub-menu--hidden');

  await delay(250);

  refs.mobileBtnsWrap.classList.add('visibility-hidden');
}

async function hideTabletLibraryButtons() {
  refs.tabletBtnsWrap.classList.add('header-nav__sub-menu--hidden');

  await delay(250);

  refs.tabletBtnsWrap.classList.add('visibility-hidden');
}
