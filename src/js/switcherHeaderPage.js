//отримала доступ
const refs = {
  myLibraryBtn: document.querySelector('#nav-link-library'),
  homeBtn: document.querySelector('#nav-link-home'),
  mobileBtnsWrap: document.querySelector('#mobile-sub-menu'),
  tabletBtnsWrap: document.querySelector('#tablet-sub-menu'),
};

console.log(refs.tabletBtnsWrap);

//подія
refs.myLibraryBtn.addEventListener('click', onLibraryBtnClick);
refs.homeBtn.addEventListener('click', onHomeBtnClick);

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
  refs.tabletBtnsWrap.classList.add('visibility-hidden'); // не реагує на додавання класів
  refs.mobileBtnsWrap.classList.add('visibility-hidden');
}

//стилі замість ховера
//_header.scss 113-117
