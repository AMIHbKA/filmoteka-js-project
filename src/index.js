// import { RenderDefaultMoviesOnMainPage } from './js/gallery';
// import { startPagination } from './js/pagination';
// import AuthMenu from './js/authentication/auth-menu';
// import Authentication from './js/authentication/authentication';
import TmdbApi from './js/tmdbAPI';
import { Notify } from 'notiflix';

import { Notify } from 'notiflix';
import * as navigation from './js/switcherHeaderPage';
import './js/modalTeam';
import { renderMovies } from './js/renderMovies';
// import { pageLoad } from './js/app';
import { tuiPagination, clearMoviesList } from './js/pagination';

const API_KEY = '193148fb3e296bb7bc40d2f930865e2a';
const api = new TmdbApi(API_KEY);
const pagination = new tuiPagination();

async function pageLoad() {
  const response = await api.fetchTrendingMovies();
  console.log(response.total_pages);
  pagination.totalItems = response.total_pages;
  pagination.start();
  pagination.onBeforeMove(handleAfterMove);
  renderMovies(response.results);
}

// // new Authentication('#authForm');

pageLoad();
async function handleAfterMove({ page }) {
  const response = await api.fetchTrendingMovies(page);
  console.log(response.total_pages);
  pagination.totalItems = response.total_pages;
  pagination.start();
  pagination.onBeforeMove(handleAfterMove);
  renderMovies(response.results);
}
