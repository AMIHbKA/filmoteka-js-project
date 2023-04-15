import { RenderDefaultMoviesOnMainPage } from './js/gallery';
import { startPagination } from './js/pagination';
import AuthMenu from './js/authentication/auth-menu';
import Authentication from './js/authentication/auth-menu';

RenderDefaultMoviesOnMainPage();
startPagination();

new AuthMenu();
// new Authentication('#authForm');
