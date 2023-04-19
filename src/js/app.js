import TmdbApi from './tmdbAPI';
import { Notify } from 'notiflix';
import { renderMovies } from './renderMovies';
import LocalStorageAPI from './localStorageAPI';
import {
  tuiPagination,
  scrollToTop,
  customPaginationButtons,
} from './pagination';

const WATCHED_KEY = 'watched';
const QUEUE_KEY = 'queue';
const galleryBox = document.querySelector('.movie__list');
const API_KEY = '193148fb3e296bb7bc40d2f930865e2a';
const api = new TmdbApi(API_KEY);
const pagination = new tuiPagination();
const localStorage = new LocalStorageAPI();
const screenWidth = window.innerWidth;
let checkedButton = WATCHED_KEY;
let watchedRadioRef = '';
let queueRadioRef = '';

const refs = {
  homeButton: document.querySelector('#nav-link-home'),
  form: document.querySelector('#search-form'),
  query: document.querySelector('.search-form__input'),
  myLibraryButton: document.querySelector('#nav-link-library'),
  placeholder: document.querySelector('.placeholder-library'),
  placeholderImage: document.querySelector('.placeholder-library__image'),
  placeholderImagePopcorn: document.querySelector(
    '.placeholder-library__popcorn-image'
  ),
};

//const formData = new FormData(refs.form);
refs.homeButton.addEventListener('click', onHomeButtonClick);
refs.form.addEventListener('submit', event => {
  event.preventDefault();
  searchButtonClick(refs.query.value);
});

refs.myLibraryButton.addEventListener('click', myLibraryButtonClickHandler);

export async function onHomeButtonClick() {
  refs.homeButton.disabled = true;
  try {
    removePlaceholder();
    await pageLoad();
  } catch (error) {
    console.error(error);
  } finally {
    // Включаем кнопку
    refs.homeButton.disabled = false;
  }
}

export async function pageLoad() {
  await api
    .fetchTrendingMovies()
    .then(response => {
      pagination.totalItems = response.total_results;
      pagination.start();
      customPaginationButtons(response.total_pages);
      pagination.onBeforeMove(trendingHandler);
      clearMoviesList();
      paginationVisibility(response.total_results);
      renderMovies(response.results);
    })
    .catch(error => {
      console.error(error.message);
      Notify.failure(error.message);
    });
  scrollToTop();
}

async function trendingHandler({ page }) {
  await api
    .fetchTrendingMovies(page)
    .then(response => {
      pagination.totalItems = response.total_results;
      scrollToTop();
      customPaginationButtons(response.total_pages);
      clearMoviesList();
      paginationVisibility(response.total_results);
      renderMovies(response.results);
      //      console.log(response.results);
    })
    .catch(error => {
      console.error(error.message);
      Notify.failure(error.message);
    });
}

function clearMoviesList() {
  galleryBox.innerHTML = '';
}

async function searchButtonClick(query) {
  // console.log(query);
  await api
    .searchMovies(query)
    .then(response => {
      // pagination.totalItems = response.total_results;

      pagination.totalItems = response.total_results;
      pagination.start();
      pagination.onBeforeMove(searchingHandler);
      customPaginationButtons(response.total_pages);
      removePlaceholder();
      clearMoviesList();
      paginationVisibility(response.total_results);
      renderMovies(response.results);
      // console.log(response.results);
    })
    .catch(error => {
      console.error(error.message);
      Notify.failure(error.message);
    });
}

async function searchingHandler({ page }, query) {
  query = refs.query.value;
  await api
    .searchMovies(query, page)
    .then(response => {
      scrollToTop();
      customPaginationButtons(response.total_pages);
      clearMoviesList();
      paginationVisibility(response.total_results);
      renderMovies(response.results);
      // console.log(response.results);
    })
    .catch(error => {
      console.error(error.message);
      Notify.failure(error.message);
    });
}

function emptyLibrary() {
  if (refs.placeholder.classList.contains('visibility-hidden')) {
    refs.placeholder.classList.remove('visibility-hidden');
    refs.placeholderImage.classList.add('loaded');
    refs.placeholderImagePopcorn.classList.add('loaded');
    paginationVisibility(0);
  }
}

function removePlaceholder() {
  if (!refs.placeholder.classList.contains('visibility-hidden')) {
    refs.placeholder.classList.add('visibility-hidden');
    refs.placeholderImage.classList.remove('loaded');
    refs.placeholderImagePopcorn.classList.remove('loaded');
  }
}

function myLibraryButtonClickHandler() {
  if (screenWidth < 768) {
    watchedRadioRef = document.querySelector('[for="1"]');
    watchedRadioRef.addEventListener('click', buttonsWatchedQueueClickHandler);

    queueRadioRef = document.querySelector('[for="2"]');
    queueRadioRef.addEventListener('click', buttonsWatchedQueueClickHandler);
  } else {
    watchedRadioRef = document.querySelector('[for="3"]');
    queueRadioRef = document.querySelector('[for="4"]');

    watchedRadioRef.addEventListener('click', buttonsWatchedQueueClickHandler);
    queueRadioRef.addEventListener('click', buttonsWatchedQueueClickHandler);
  }
  if (watchedRadioRef.control.checked) {
    renderLibrary(WATCHED_KEY);
  } else {
    renderLibrary(QUEUE_KEY);
  }
}

function buttonsWatchedQueueClickHandler(event) {
  console.log('click');
  event.target.control.defaultValue;
  renderLibrary(event.target.control.defaultValue);
}

export function renderLibrary(libraryButton) {
  clearMoviesList();
  removePlaceholder();
  pagination.reset();
  let currentKey = '';
  switch (libraryButton) {
    case WATCHED_KEY:
      currentKey = WATCHED_KEY;
      checkedButton = WATCHED_KEY;
      break;
    case QUEUE_KEY:
      currentKey = QUEUE_KEY;
      checkedButton = QUEUE_KEY;
      break;
  }

  const storage = localStorage.getStoredDataByKey(currentKey);
  console.log(storage);
  if (!storage || storage.length === 0) {
    emptyLibrary();

    return;
  }

  renderMovies(storage);
}

function paginationVisibility(totalResults) {
  console.log('poisk', totalResults);
  if (totalResults < 21) {
    // clearMoviesList();
    // renderMovies(response.results);
    pagination.container.innerHTML = '';
    return;
  }
}

function paginationLocalStorageHandler() {}
