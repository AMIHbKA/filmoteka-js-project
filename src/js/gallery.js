import { fetchDefaultMovies } from './fetchAPI';
import { renderDefaultMovies } from './renderDefaultMovies';
import { fetchTwentyOneMoviesOnBigScreen } from './fetchTwentyOneMoviesOnBigScreen';
import { createPaginationButtons } from './pagination';

let pageNumber = 1; //для пагинации

// рендер дефолтных (трендовых) фильмов на главной странице (еще без пагинации)
// RenderDefaultMoviesOnMainPage();

export async function RenderDefaultMoviesOnMainPage() {
  pageNumber = 1;

  try {
    if (window.innerWidth >= 1280) {
      const queryResult = await fetchTwentyOneMoviesOnBigScreen(pageNumber);
      const defaultMoviesArray = queryResult.moviesArrPerPage;
      const totalItems = queryResult.data.total_results;
      const totalPages = queryResult.data.total_pages;
      renderDefaultMovies(defaultMoviesArray);
      createPaginationButtons(totalItems, totalPages);

      return;
    }

    const queryResult = await fetchDefaultMovies(pageNumber);
    const totalPages = queryResult.data.total_pages; //кол-во страниц - 1000 (20 фильмов на каждой)
    const totalItems = queryResult.data.total_results; //общее кол-во фильмов (20'000)
    const defaultMoviesArray = queryResult.data.results; // массив с данными по каждому фильму
    // console.log(defaultMoviesArray);

    renderDefaultMovies(defaultMoviesArray);
    createPaginationButtons(totalItems, totalPages);
    return;
  } catch (error) {
    console.log(error.message);
  }
}
