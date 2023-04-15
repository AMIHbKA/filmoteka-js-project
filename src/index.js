import { RenderDefaultMoviesOnMainPage } from './js/gallery';
import { startPagination } from './js/pagination';
import AuthMenu from './js/authentication/auth-menu';
import Authentication from './js/authentication/auth-menu';
import TmdbApi from './js/tmdbAPI';
import { Notify } from 'notiflix';

const API_KEY = '193148fb3e296bb7bc40d2f930865e2a';
RenderDefaultMoviesOnMainPage();
startPagination();

new AuthMenu();
// new Authentication('#authForm');
const tmdbApi = new TmdbApi(API_KEY);