import { genresIdsConvertingToGenres } from './genresIdsConvertingToGenres';
import placeholder from '../images/placeholders/poster-placeholder.jpg';

const galleryBox = document.querySelector('.movie__list');
const MOVIE_POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w400';

export function renderMovies(defaultMoviesArray) {
  console.log(defaultMoviesArray);
  const markup = defaultMoviesArray
    .map(
      ({
        poster_path,
        genre_ids,
        genres,
        id,
        original_title,
        name,
        overview,
        popularity,
        release_date,
        first_air_date,
        title,
        vote_average,
        vote_count,
      }) => {
        let poster = poster_path;

        if (poster) {
          poster = `${MOVIE_POSTER_BASE_URL}/${poster_path}`;
        } else {
          poster = placeholder;
        }

        let year = release_date ?? first_air_date;
        if (!year) {
          year = 'Not available';
        } else {
          year = String(year).slice(0, 4);
        }
        console.log(genre_ids, genres);
        const genresArr = genresIdsConvertingToGenres(genre_ids ?? genres);
        return `
                <li class="movie__item" id="${id}">
                    <div class="movie__wrapper">
                        <img class="movie__poster" src="${poster}" alt="${
          title ?? name ?? 'No poster'
        }" loading="lazy"/>
                    
                        <div class="movie__info">
                            <p class="movie__name">
                                ${name ?? title ?? `Not available`}
                            </p>

                            <p class="movie__genres-year">
                                ${year} | ${genresArr}
                            </p>
                        </div>
                    </div>
                </li>
            `;
      }
    )
    .join('');
  galleryBox.insertAdjacentHTML('beforeend', markup);
}
