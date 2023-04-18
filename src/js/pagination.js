import Pagination from 'tui-pagination';
import { fetchDefaultMovies } from './fetchAPI';
import { renderDefaultMovies } from './renderDefaultMovies';
import { fetchTwentyOneMoviesOnBigScreen } from './fetchTwentyOneMoviesOnBigScreen';

let currentPage = 1;
const galleryBox = document.querySelector('.movie__list');
const screenWidth = window.innerWidth;

// export function startPagination() {
//   createContainer();
//   fetchMoviesOnFullPage(currentPage)
//     .then(function (response) {
//       const totalItems = response.data.total_results;
//       const totalPages = response.data.total_pages;
//       createPaginationButtons(totalItems, totalPages);

//       return;
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }

export function createPaginationButtons(totalItems, totalPages) {
  createContainer();

  const paginationOption = {
    totalItems: totalItems,
    itemsPerPage: 20,
    visiblePages: 9,
    page: currentPage,
    centerAlign: true,
    template: {
      moveButton: '<a href="#" class="tui-page-btn tui-{{type}}">' + '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' + '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span>...</span>' +
        '</a>',
    },
  };

  const container = document.getElementById('tui-pagination-container');
  if (screenWidth < 768) {
    paginationOption.visiblePages = 5;
  }

  const pagination = new Pagination(container, paginationOption);
  customPaginationButtons(totalPages);

  pagination.on('afterMove', event => {
    currentPage = event.page;
    scrollToTop();
    if (window.innerWidth >= 1280) {
      fetchTwentyOneMoviesOnBigScreen(currentPage)
        .then(response => {
          customPaginationButtons(totalPages);
          clearList();
          renderDefaultMovies(response.moviesArrPerPage);
          return;
        })
        .catch(console.log);
      return;
    }
    fetchDefaultMovies(currentPage).then(response => {
      customPaginationButtons(totalPages);
      clearList();
      renderDefaultMovies(response.data.results);
      return;
    });
  });
}

function createContainer() {
  galleryBox.insertAdjacentHTML(
    'afterend',
    `<div id="tui-pagination-container" class="tui-pagination"></div>`
  );
}

function clearList() {
  galleryBox.innerHTML = '';
}

function customPaginationButtons(totalPages) {
  rebuildLastButton(totalPages);
  rebuildFirstButton();
}

function rebuildFirstButton() {
  const firstButton = document.querySelector('.tui-first');
  const firstChildButton = document.querySelector('.tui-first-child');
  firstButton.textContent = 1;

  if (Number(firstChildButton.innerText) === 1) {
    firstButton.classList.add('hidden');
    document.querySelector('.tui-prev').style.translate = '0';
    return;
  }

  firstButton.classList.remove('hidden');
  if (screenWidth < 768) {
    document.querySelector('.tui-prev').style.translate = '0';
    return;
  }

  document.querySelector('.tui-prev').style.translate = '-100%';
  return;
}

function rebuildLastButton(totalPages) {
  const lastButton = document.querySelector('.tui-last');
  const lastChildButton = document.querySelector('.tui-last-child');
  lastButton.textContent = totalPages;

  if (Number(lastChildButton.innerText) === totalPages) {
    lastButton.classList.add('hidden');
    document.querySelector('.tui-next').style.translate = '0';
    return;
  }

  lastButton.classList.remove('hidden');
  if (screenWidth < 768) {
    document.querySelector('.tui-next').style.translate = '0';
    return;
  }
  document.querySelector('.tui-next').style.translate = '100%';
  return;
}

const scrollToTop = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > 0) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
};
