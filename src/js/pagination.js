import Pagination from 'tui-pagination';
import { fetchDefaultMovies } from './fetchAPI';
// import 'tui-pagination/dist/tui-pagination.css';
import { renderMovies } from './renderMovies';

let currentPage = 1;
const galleryBox = document.querySelector('.movie__list');
// export let paginationOption = {
//   totalItems: 20,
//   itemsPerPage: 20,
//   visiblePages: 5,
//   // page: currentPage,
//   centerAlign: true,
// };

// export const pagination = new Pagination(container, paginationOption);

export class tuiPagination {
  constructor() {
    this._container = document.querySelector('#tui-pagination-container');
    this._itemsPerPage = 20;
    this._centerAlign = true;
    this._totalItems = 1;
    this._visiblePages = 5;
    this._pagination = null;
    this.eventList = new Set();
  }

  set totalItems(items) {
    this._totalItems = items;
  }

  get totalItems() {
    return this._totalItems;
  }

  set container(containerRef) {
    this._container = containerRef;
  }

  get container() {
    return this._container;
  }

  set itemsPerPage(items) {
    this._itemsPerPage = items;
  }

  get itemsPerPage() {
    return this._itemsPerPage;
  }

  set visiblePages(pages) {
    this._visiblePages = pages;
  }

  get visiblePages() {
    return this._visiblePages;
  }

  start() {
    this._pagination = new Pagination(this._container, {
      itemsPerPage: this._itemsPerPage,
      centerAlign: this._centerAlign,
      totalItems: this._totalItems,
      visiblePages: this._visiblePages,
    });
  }

  onBeforeMove(callback) {
    if (this.eventList.has(`onBeforeMove-${callback.name}`)) {
      console.log(`Уже есть onBeforeMove-${callback.name}`);
      // return;
    }

    this._pagination.on('beforeMove', callback);
    this.eventList.add(`onBeforeMove-${callback.name}`);
  }

  onAfterMove(callback) {
    if (this.eventList.has(`onAfterMove-${callback.name}`)) {
      console.log(`Уже есть onAfterMove-${callback.name}`);
      return;
    }
    this._pagination.on('afterMove', callback);
    this.eventList.add(`onAfterMove-${callback.name}`);
  }

  offBeforeMove(callback) {
    this._pagination.off('beforeMove', callback);
    this.eventList.delete(`onBeforeMove-${callback.name}`);
  }

  offAfterMove(callback) {
    this._pagination.off('afterMove', callback);
    this.eventList.delete(`onAfterMove-${callback.name}`);
  }
}
// export function startPagination() {
//   // createDiv();
//   fetchDefaultMovies(currentPage)
//     .then(function (response) {
//       const totalPages = response.data.total_pages;
//       createPaginationContainer(totalPages);
//       response.data.results;
//       return;
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }

// function createPaginationContainer(totalPages) {
//   const screenWidth = window.innerWidth;
//   const paginationOption = {
//     totalItems: totalPages,
//     itemsPerPage: 20,
//     visiblePages: 9,
//     page: currentPage,
//     centerAlign: true,
//   };
//   console.log(screenWidth);
//   const container = document.getElementById('tui-pagination-container');
//   if (screenWidth < 768) {
//     paginationOption.visiblePages = 3;
//   }
//   const pagination = new Pagination(container, paginationOption);

//   pagination.on('afterMove', event => {
//     currentPage = event.page;
//     fetchDefaultMovies(currentPage).then(r => {
//       clearList();
//       renderMovies(r.data.results);
//     });
//   });
// }

// function createDiv() {
//   galleryBox.insertAdjacentHTML(
//     'afterend',
//     `<div id="tui-pagination-container" class="tui-pagination"></div>`
//   );
// }

export function clearMoviesList() {
  galleryBox.innerHTML = '';
}
