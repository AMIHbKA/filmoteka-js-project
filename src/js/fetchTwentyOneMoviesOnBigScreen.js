import { fetchDefaultMovies } from './fetchAPI';

export const fetchTwentyOneMoviesOnBigScreen = async currentPage => {
  const page = currentPage;
  const fetchPages = [page, page + 1];
  const arrayOfPromises = fetchPages.map(pageNumber => {
    const response = fetchDefaultMovies(pageNumber).catch(er => {
      return [];
    });
    return response;
  });
  const movies = await Promise.all(arrayOfPromises);
  let moviesArrPerPage = [];
  const data = movies[0].data;
  const currentPageMovies = await movies[0].data.results;

  if (movies[1].status === undefined) {
    moviesArrPerPage = currentPageMovies;

    return { data, moviesArrPerPage };
  }

  const nextPageMovie = await movies[1].data.results[getRandomInt(1, 19)];
  moviesArrPerPage = await [...currentPageMovies, ...[nextPageMovie]];

  return { data, moviesArrPerPage };
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
  //Максимум не включается, минимум включается
}
