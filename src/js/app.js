import TmdbApi from './tmdbAPI';
import { Notify } from 'notiflix';
// import './js/modalTeam';
import { renderMovies } from './renderMovies';
// import { pageLoad } from './js/app';
import { tuiPagination, clearMoviesList } from './pagination';

const galleryBox = document.querySelector('.movie__list');
const API_KEY = '193148fb3e296bb7bc40d2f930865e2a';
const api = new TmdbApi(API_KEY);
const pagination = new tuiPagination();

const refs = {
  homeButton: document.querySelector('#nav-link-home'),
  form: document.querySelector('#search-form'),
  query: document.querySelector('.search-form__input'),
};
const formData = new FormData(refs.form);
refs.homeButton.addEventListener('click', onHomeButtonClick);

export async function onHomeButtonClick() {
  refs.homeButton.disabled = true;
  try {
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
      // pagination.reset(response.total_results);
      pagination.onBeforeMove(trendingHandler);
      clearMoviesList();
      renderMovies(response.results);

      console.log('pageLoad end');
    })
    .catch(error => Notify.failure(error.message));
}

async function trendingHandler({ page }) {
  await api
    .fetchTrendingMovies(page)
    .then(response => {
      pagination.totalItems = response.total_results;

      clearMoviesList();
      renderMovies(response.results);
      console.log(response.results);
    })
    .catch(error => Notify.failure(error.message));
}

function clearMoviesList() {
  galleryBox.innerHTML = '';
}

refs.form.addEventListener('submit', event => {
  event.preventDefault();
  searchButtonClick(refs.query.value);
});

async function searchButtonClick(query) {
  console.log(query);
  await api
    .searchMovies(query)
    .then(response => {
      // pagination.totalItems = response.total_results;
      pagination.totalItems = response.total_results;
      pagination.start();
      pagination.onBeforeMove(searchingHandler);
      // pagination.reset(response.total_results);

      // pagination.reset(response.total_results);
      console.log(pagination);

      clearMoviesList();
      renderMovies(response.results);
      console.log(response.results);
    })
    .catch(error => {
      Notify.failure(error.message);
    });
}

async function searchingHandler({ page }, query) {
  query = refs.query.value;
  await api
    .searchMovies(query, page)
    .then(response => {
      clearMoviesList();
      renderMovies(response.results);
      console.log(response.results);
    })
    .catch(error => {
      Notify.failure(error.message);
    });
}
