import { RenderDefaultMoviesOnMainPage } from './js/gallery';
import { startPagination } from './js/pagination';
import AuthMenu from './js/authentication/auth-menu';

RenderDefaultMoviesOnMainPage();
startPagination();

new AuthMenu();
