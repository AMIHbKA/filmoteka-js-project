//отримала доступ
const refs = {
  myLibraryBtn: document.querySelector('#nav-link-library'),
  homeBtn: document.querySelector('#nav-link-home'),
  mobileBtnsWrap: document.querySelector('#mobile-sub-menu'),
  tabletBtnsWrap: document.querySelector('#tablet-sub-menu'),
  //watchedBtn: document.querySelector('button[name="watched"]'),
  //queueBtn: document.querySelector('button[name="queue"]'),
};

//подія
refs.myLibraryBtn.addEventListener('click', onLibraryBtnClick);
refs.homeBtn.addEventListener('click', onHomeBtnClick);
/* refs.watchedBtn.addEventListener('click', onWatchedBtnClick);
refs.queueBtn.addEventListener('click', onQueueBtnClick); */

function onLibraryBtnClick() {
  const screenWidth = window.innerWidth;

  refs.myLibraryBtn.classList.add('header-nav__link--current');
  refs.homeBtn.classList.remove('header-nav__link--current');

  if (screenWidth < 768) {
    refs.tabletBtnsWrap.classList.add('visibility-hidden');
    refs.mobileBtnsWrap.classList.remove('visibility-hidden');
  } else {
    refs.mobileBtnsWrap.classList.add('visibility-hidden');
    refs.tabletBtnsWrap.classList.remove('visibility-hidden');
  }
}

function onHomeBtnClick() {
  console.log('click');
  removeWrapsMyLibrary();
  refs.homeBtn.classList.add('header-nav__link--current');
  refs.myLibraryBtn.classList.remove('header-nav__link--current');
}

//коли активна кнопка Home // залишаю для  фукцій+
/* export function isActiveHomeBtn() {
  //removeWrapsMyLibrary();
  RenderDefaultMoviesOnMainPage();
}  */

///кнопка Home  за замовчуванням на початку завантаження, щоб не дубл.
function removeWrapsMyLibrary() {
  refs.tabletBtnsWrap.classList.add('visibility-hidden');
  refs.mobileBtnsWrap.classList.add('visibility-hidden');
}

/* function onWatchedBtnClick() {
  refs.queueBtn.classList.remove('header-btn--current');
  refs.watchedBtn.classList.add('header-btn--current');
}
function onQueueBtnClick() {
  refs.queueBtn.classList.add('header-btn--current');
  refs.watchedBtn.classList.remove('header-btn--current');
} */
