import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';


import { checkFilmInLibrary } from './local-storage-service';
import { fetchDefaultMovies } from "./fetchAPI";
import { genresIdsConvertingToGenres } from "./genresIdsConvertingToGenres";
import { addFilmToLibrary, checkFilmInLibrary } from "./local-storage-service"


let pageNumber = 1; // для пагинации
const galleryBox = document.querySelector('.movie__list');

galleryBox.addEventListener('click', onMoviesGalleryBoxClick);

export async function onMoviesGalleryBoxClick(event) {
  event.preventDefault();
  pageNumber = 1;

  if (!event.target.closest('li')) {
    return;
  }

  try {
    function closeModal(event) {
      if (event.code.toLowerCase() !== 'escape') {
        return;
      }
      instance.close();
    }

    const queryResult = await fetchDefaultMovies(pageNumber);
    const defaultMoviesArray = queryResult.data.results; // массив с данными по каждому фильму

    const selectedMovie = event.target.closest('li');
    const selectedMovieId = Number(selectedMovie.getAttribute('id'));

    const {
      poster_path,
      title,
      name,
      vote_average,
      vote_count,
      popularity,
      original_title,
      genre_ids,
      overview,
      first_air_date,
      release_date,
      id,
    } = defaultMoviesArray.find(movie => movie.id === selectedMovieId);

    const instance = basicLightbox.create(
      `
                <div class="modal">
                    <button class="modal-movie__close-btn">
                        <svg class="modal-movie__svg-close-btn" width="14" height="14">
                            <use href="./images/icons.svg#icon-close"></use>
                        </svg>
                    </button>

                    <div>
                        <img class="modal-movie__poster" src="https://image.tmdb.org/t/p/w400/${poster_path}" alt="${
        title || name
      }" />
                        <button type="button" class="modal-movie__trailer-btn">watch trailer</button>
                    </div>

                    <div class="modal-movie__wrapper">
                    
                        <div class="modal-movie__data">
                            <h2 class="modal-movie__title">${title || name}</h2>

                        
                          <ul class="modal-movie__info-block">
                            <li class="modal-movie__info-item">
                              <span class="modal-movie__text">Year</span>
                              <span class="modal-movie__year"
                                >${release_date ?? 'No information'}</span
                              >
                            </li>

                            <li class="modal-movie__info-item">
                              <span class="modal-movie__text">Vote / Votes</span>
                              <div>
                                <span class="modal-movie__vote-average"
                                  >${vote_average.toFixed(1)}</span
                                >
                                <span class="modal-movie__vote"> / ${vote_count}</span>
                              </div>
                            </li>

                            <li class="modal-movie__info-item">
                              <span class="modal-movie__text">Popularity</span>
                              <span class="modal-movie__popularity"
                                >${popularity.toFixed(1)}</span
                              >
                            </li>

                            <li class="modal-movie__info-item">
                              <span class="modal-movie__text">Original Title</span>
                              <span class="modal-movie__original-title"
                                >${original_title || name}</span
                              >
                            </li>

                            <li class="modal-movie__info-item">
                              <span class="modal-movie__text">Genre</span>
                              <span class="modal-movie__genre"
                                >${genresIdsConvertingToGenres(genre_ids)}</span
                              >
                            </li>
                          </ul>
                        
          
                        <div class="modal-movie__about-wrapper">
                            <h3 class="modal-movie__about-title">about</h3>
                            <p class="modal-movie__about-text">${overview}</p>
                        </div>

                        <div class="modal-movie__buttons-wrapper">
                            <button type="button" class="modal-movie__add-watched-btn">add to watched</button>
                            <button type="button" class="modal-movie__add-queue-btn">add to queue</button>
                        </div>
                    </div>
                </div>
                `,

            {
                onShow: (instance) => { 
                    window.addEventListener('keydown', closeModal);
                    
                    instance.element().querySelector(".modal-movie__add-watched-btn").addEventListener('click', () => {
                        addFilmToLibrary(data, "watched");
                      });
                    instance.element().querySelector(".modal-movie__add-queue-btn").addEventListener('click', () => {
                        addFilmToLibrary(data, "queue");
                      });
                    
                },
                onClose: (instance) => { 
                    window.removeEventListener('keydown', closeModal);
                },
            }
        );
        
        instance.show();
        checkFilmInLibrary("watched", id);
        checkFilmInLibrary("queue", id);
        return data = {
            poster_path, 
            title, 
            name,
            first_air_date, 
            original_title, 
            genre_ids, 
            release_date,
            id,
        };
        }
        catch(error) {console.log(error.message); }
};