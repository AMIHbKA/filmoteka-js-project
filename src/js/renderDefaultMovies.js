import { genresIdsConvertingToGenres } from "./genresIdsConvertingToGenres";

const galleryBox = document.querySelector(".movie__list");
const MOVIE_POSTER_BASE_URL = "https://image.tmdb.org/t/p/w400";

export function renderDefaultMovies(defaultMoviesArray) {
    const markup = defaultMoviesArray
        .map(({ poster_path, genre_ids, id, original_title, name, overview, popularity, release_date, first_air_date, title, vote_average, vote_count }) => {
            return `
                <li class="movie__item" id="${id}">
                    <div class="movie__wrapper">
                        <img class="movie__poster" src="${MOVIE_POSTER_BASE_URL}/${poster_path}" alt="${title || name}" loading="lazy"/>
                    
                        <div class="movie__info">
                            <p class="movie__name">
                                ${name || title}
                            </p>

                            <p class="movie__genres-year">
                                ${genresIdsConvertingToGenres(genre_ids)} | ${String(release_date || first_air_date).slice(0, 4)}
                            </p>
                        </div>
                    </div>
                </li>
            `
        })
        .join("");
    galleryBox.insertAdjacentHTML("beforeend", markup);
}