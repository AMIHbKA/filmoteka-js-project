import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { fetchMovieTrailer } from './fetchAPI';
import { Notify } from 'notiflix';

const ERROR_MESSAGE = 'Oops, trailer is not available...';
const YOUTUBE_PATH = 'https://www.youtube.com/embed';

export async function openTrailerModal(selectedMovieId) {
  try {
    function closeModal(event) {
      if (event.code.toLowerCase() !== 'escape') {
        return;
      }
      instance.close();
    }

    const result = await fetchMovieTrailer(selectedMovieId);

    const movieArr = result.data.results; //массив обьектов с ключем(key) на YT-трейлер

    if (!movieArr[0]) {
      throw new Error(ERROR_MESSAGE);
    }

    const movieKey = movieArr[0].key; //ключ из 1го обьекта в массиве

    const instance = basicLightbox.create(
      `            
            <iframe class="modal-movie__youtube-trailer" src="${YOUTUBE_PATH}/${movieKey}" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            `,
      {
        onShow: instance => {
          window.addEventListener('keydown', closeModal);
        },
        onClose: instance => {
          window.removeEventListener('keydown', closeModal);
        },
      }
    );
    instance.show();
  } catch (error) {
    Notify.failure(error.message);
  }
}
