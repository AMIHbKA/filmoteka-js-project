import Pagination from 'tui-pagination';
import { fetchDefaultMovies } from './fetchAPI';
// import 'tui-pagination/dist/tui-pagination.css';
import { renderDefaultMovies } from './renderDefaultMovies';

let currentPage = 1;
const galleryBox = document.querySelector('.movie__list');

export function startPagination() {
  createDiv();
  fetchDefaultMovies(currentPage)
    .then(function (response) {
      const totalPages = response.data.total_pages;
      createPaginationContainer(totalPages);
      response.data.results;
      return;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function createPaginationContainer(totalPages) {
  const screenWidth = window.innerWidth;
  const paginationOption = {
    totalItems: totalPages,
    itemsPerPage: 20,
    visiblePages: 9,
    page: currentPage,
    centerAlign: true,
  };
  console.log(screenWidth);
  const container = document.getElementById('tui-pagination-container');
  if (screenWidth < 768) {
    paginationOption.visiblePages = 3;
  }
  const pagination = new Pagination(container, paginationOption);

  pagination.on('afterMove', event => {
    currentPage = event.page;
    fetchDefaultMovies(currentPage).then(r => {
      clearList();
      renderDefaultMovies(r.data.results);
    });
  });
}

function createDiv() {
  galleryBox.insertAdjacentHTML(
    'afterend',
    `<div id="tui-pagination-container" class="tui-pagination"></div>`
  );
}

function clearList() {
  galleryBox.innerHTML = '';
}
