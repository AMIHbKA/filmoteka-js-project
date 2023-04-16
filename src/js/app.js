import { Notify } from 'notiflix';
import { pagination, clearMoviesList, paginationOption } from './js/pagination';
import { TmdbApi } from './js/TmdbApi';

const API_KEY = '193148fb3e296bb7bc40d2f930865e2a';
const api = new TmdbApi(API_KEY);

export function pageLoad() {
  try {
    const response = api.fetchTrendingMovies(1);
    const totalPages = response.data.total_pages;
    paginationOption.totalItems = totalPages;
    console.log(paginationOption.totalItems);
    renderMovies(response.data.results);
    // pagination.on('afterMove', eventData => {
    //   api.fetchTrendingMovies().then(response);
    // });
  } catch (error) {
    Notify.failure(error.message);
  }
}
debugger;
pageLoad();
// new Authentication('#authForm');
