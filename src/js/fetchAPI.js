import axios from 'axios';

const API_KEY = '193148fb3e296bb7bc40d2f930865e2a';
const baseUrl = 'https://api.themoviedb.org/3/';

// запрос трендовых фильмов дня для рендера на главную страницу
export async function fetchDefaultMovies(pageNumber) {
  try {
    return await axios.get(
      `${baseUrl}trending/movie/day?api_key=${API_KEY}&language=en-US&include_image_language=en,null&page=${pageNumber}`
    );
  } catch (error) {
    console.error(error);
  }
}

// запрос трейлера по ID
export async function fetchMovieTrailer(movieId) {
  try {
    return await axios.get(
      `${baseUrl}movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
    );
    // console.log(result)
  } catch (error) {
    console.error(error);
  }
}
