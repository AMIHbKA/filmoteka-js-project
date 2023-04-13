import Pagination from 'tui-pagination';
// import axios from 'axios';
import { fetchDefaultMovies } from './fetchAPI';
import 'tui-pagination/dist/tui-pagination.css';
// import './fetchAPI';
import { renderDefaultMovies } from './renderDefaultMovies';

let currentPage = 1;
const galleryBox = document.querySelector('.movie__list');

startPagination();

function startPagination() {
  createDiv();
  fetchDefaultMovies(currentPage)
    .then(function (response) {
      // обработка успешного запроса
      // console.log(response);
      const totalPages = response.data.total_pages;
      createPaginationContainer(totalPages);
      response.data.results;
      return;
    })
    .catch(function (error) {
      // обработка ошибки
      console.log(error);
    });
}

// function getResponse(apiKey, currentPage) {
//   return axios.get(
//     `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&page=${currentPage}`
//   );
// }

function createPaginationContainer(totalPages) {
  const container = document.getElementById('tui-pagination-container');
  const pagination = new Pagination(container, {
    totalItems: totalPages,
    itemsPerPage: 20,
    visiblePages: 10,
    page: currentPage,
  });

  pagination.on('afterMove', event => {
    currentPage = event.page;
    fetchDefaultMovies(currentPage).then(r => {
      clearList();
      renderDefaultMovies(r.data.results);
    });
  });
}

function createDiv() {
  document
    .querySelector('.hero')
    .insertAdjacentHTML(
      'beforeend',
      `<div id="tui-pagination-container" class="tui-pagination"></div>`
    );
}

function clearList() {
  galleryBox.innerHTML = '';
}
