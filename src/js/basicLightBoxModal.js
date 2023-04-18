import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import '../sass/components/_customBackdrop.scss';
import Icons from '../images/icons.svg';
import { checkFilmInLibrary } from './local-storage-service';
import { fetchDefaultMovies } from './fetchAPI';
import { genresIdsConvertingToGenres } from './genresIdsConvertingToGenres';
import { addFilmToLibrary, checkFilmInLibrary } from './local-storage-service';
import { openTrailerModal } from './openTrailerModal';
import { Notify } from 'notiflix';
import TmdbApi from './tmdbAPI';

const API_KEY = '193148fb3e296bb7bc40d2f930865e2a';
const api = new TmdbApi(API_KEY);
let response;
let pageNumber = 1; // для пагинации
const galleryBox = document.querySelector('.movie__list');
const backdropURL = 'https://image.tmdb.org/t/p/'; //w300 w780 w1280 original

galleryBox.addEventListener('click', onMovieCardClickHandler);

async function onMovieCardClickHandler(event) {
  event.preventDefault();

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

    const selectedMovieId = event.target.closest('li').getAttribute('id');
    console.log(selectedMovieId);

    try {
      response = await api.getMovieById(selectedMovieId);
    } catch (error) {
      Notify.failure(error.message);
      return;
    }

    const {
      poster_path,
      title,
      name,
      vote_average,
      vote_count,
      popularity,
      original_title,
      genres,
      overview,
      first_air_date,
      release_date,
      id,
      backdrop_path,
    } = response;
    console.log(response);

    const instance = basicLightbox.create(
      `
                <div class="modal">
                    <button class="modal-movie__close-btn">
                        <svg class="modal-movie__svg-close-btn" width="14" height="14">
                            <use href="${Icons}#icon-close-black"></use>
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
                                >${String(release_date || first_air_date).slice(
                                  0,
                                  4
                                )}</span
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
                                >${genresIdsConvertingToGenres(genres)}</span
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
        onShow: instance => {
          window.addEventListener('keydown', closeModal);
          instance
            .element()
            .querySelector('.modal-movie__close-btn')
            .addEventListener('click', () => {
              instance.close();
            });

          instance
            .element()
            .querySelector('.modal-movie__add-watched-btn')
            .addEventListener('click', () => {
              addFilmToLibrary(response, 'watched');
            });
          instance
            .element()
            .querySelector('.modal-movie__add-queue-btn')
            .addEventListener('click', () => {
              addFilmToLibrary(response, 'queue');
            });

          //клик на кнопку WATCH TRAILER в модалке фильма
          instance
            .element()
            .querySelector('.modal-movie__trailer-btn')
            .addEventListener('click', () => {
              openTrailerModal(selectedMovieId);
            });
        },
        onClose: instance => {
          window.removeEventListener('keydown', closeModal);

          // remove custom backdrop
          // document.body.removeChild(backdrop);
        },
      }
    );

    (async () => {
      await instance.show();
      const lightboxContainer = document.querySelector('.basicLightbox');
      //lightboxContainer.style.backgroundImage = `url('${backdropURL}${backdrop_path}')`;
      const windowWidth = window.innerWidth;
      let backdrop = '';
      if (windowWidth < 768) {
        backdrop = `'${backdropURL}w300${backdrop_path}'`;
      } else if (windowWidth < 1280) {
        backdrop = `'${backdropURL}w780${backdrop_path}'`;
      } else if (windowWidth >= 1280) {
        backdrop = `'${backdropURL}w1280${backdrop_path}'`;
      }

      lightboxContainer.style.backgroundImage = `linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.8) 100%
    ), url('${backdropURL}w1280${backdrop_path}')`;
    })();

    // instance.show();
    checkFilmInLibrary('watched', id);
    checkFilmInLibrary('queue', id);
    return (response = {
      poster_path,
      title,
      name,
      first_air_date,
      original_title,
      // genre_ids,
      genres,
      release_date,
      id,
    });
  } catch (error) {
    console.log(error.message);
  }
}
