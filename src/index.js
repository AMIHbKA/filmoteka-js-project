// import { RenderDefaultMoviesOnMainPage } from './js/gallery';
// import { startPagination } from './js/pagination';
// import AuthMenu from './js/authentication/auth-menu';
// import Authentication from './js/authentication/authentication';
import TmdbApi from './js/tmdbAPI';

import { Notify } from 'notiflix';
import * as navigation from './js/switcherHeaderPage';
import './js/modalTeam';
import { renderMovies } from './js/renderMovies';
// import { pageLoad } from './js/app';
import { tuiPagination } from './js/pagination';

const API_KEY = '193148fb3e296bb7bc40d2f930865e2a';
const api = new TmdbApi(API_KEY);
const pagination = new tuiPagination();
console.log(api);
console.log(pagination);

async function pageLoad() {
  try {
    const response = await api.fetchTrendingMovies(4).then(response => {
      const totalPages = response.total_pages;

      pagination.totalItems = totalPages;
      pagination.start();
      renderMovies(response.results);
      pagination.on('afterMove', ({ page }) => {});
    });

    // pagination.on('afterMove', eventData => {
    //   api.fetchTrendingMovies().then(response);
    // });
  } catch (error) {
    Notify.failure(error.message);
  }
}

pageLoad();
// new Authentication('#authForm');
