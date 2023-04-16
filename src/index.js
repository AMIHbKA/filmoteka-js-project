// import { RenderDefaultMoviesOnMainPage } from './js/gallery';
// import { startPagination } from './js/pagination';
// import AuthMenu from './js/authentication/auth-menu';
// import Authentication from './js/authentication/authentication';
import TmdbApi from './js/tmdbAPI';
// import { pagination } from './js/pagination';
import { Notify } from 'notiflix';
import * as navigation from './js/switcherHeaderPage';
import './js/modalTeam';
import { renderMovies } from './js/renderMovies';
// import { pageLoad } from './js/app';
import { pagination, clearMoviesList, paginationOption } from './js/pagination';

const API_KEY = '193148fb3e296bb7bc40d2f930865e2a';
const api = new TmdbApi(API_KEY);

function pageLoad() {
  try {
    // debugger;
    const response = api.fetchTrendingMovies(2).then(response => {
      //   debugger;
      const totalPages = response.total_pages;
      paginationOption.totalItems = totalPages;
      console.log(paginationOption.totalItems);
      console.log(response.results);
      renderMovies(response.results);
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
