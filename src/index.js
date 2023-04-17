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
pagination.start();

async function pageLoad() {
  try {
    await api.fetchTrendingMovies().then(response => {
      const totalPages = response.total_pages;
      console.log('await');
      pagination.totalItems = totalPages;
      pagination.start();
      pagination.onBeforeMove(event => {
        console.log('asdfasdf', event);
      });

      renderMovies(response.results);
    });

    // pagination.on('afterMove', eventData => {
    //   api.fetchTrendingMovies().then(response);
    // });
  } catch (error) {
    Notify.failure(error.message);
  }
}

// // new Authentication('#authForm');

pageLoad();
// pagination.start();
