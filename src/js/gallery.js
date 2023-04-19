import { fetchDefaultMovies } from './fetchAPI';
import { renderMovies } from './renderMovies';
import { modal } from './basicLightBoxModal';

let pageNumber = 1; //для пагинации

// рендер дефолтных (трендовых) фильмов на главной странице (еще без пагинации)
// RenderDefaultMoviesOnMainPage();

export async function RenderDefaultMoviesOnMainPage() {
  pageNumber = 1;

  try {
    const queryResult = await fetchDefaultMovies(pageNumber);

    const totalPages = queryResult.data.total_pages; //кол-во страниц - 1000 (20 фильмов на каждой)
    const totalResults = queryResult.data.total_results; //общее кол-во фильмов (20'000)

    const defaultMoviesArray = queryResult.data.results; // массив с данными по каждому фильму
    // console.log(defaultMoviesArray);

    renderMovies(defaultMoviesArray);
  } catch (error) {
    // console.log(error.message);
  }
}
