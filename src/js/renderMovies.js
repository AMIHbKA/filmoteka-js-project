import { genresIdsConvertingToGenres } from './genresIdsConvertingToGenres';

const galleryBox = document.querySelector('.movie__list');
const MOVIE_POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w400';

export function renderMovies(defaultMoviesArray) {
  const markup = defaultMoviesArray
    .map(
      ({
        poster_path,
        genre_ids,
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
        const poster = `${MOVIE_POSTER_BASE_URL}/${poster_path}`;
        let year;
        if (release_date ?? first_air_date) {
          year = String(release_date ?? first_air_date).slice(0, 4);
        } else {
          year = 'Not available';
        }
        const genres = genresIdsConvertingToGenres(genre_ids);
        return `
                <li class="movie__item" id="${id}">
                    <div class="movie__wrapper">
                        <img class="movie__poster" src="${
                          poster ??
                          './images/placeholders/poster-placeholder.jpg'
                        }" alt="${
          title ?? name ?? 'No poster'
        }" loading="lazy"/>
                    
                        <div class="movie__info">
                            <p class="movie__name">
                                ${name ?? title ?? `Not available`}
                            </p>

                            <p class="movie__genres-year">
                                ${year} | ${genres}
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
