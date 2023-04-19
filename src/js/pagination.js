import Pagination from 'tui-pagination';

const screenWidth = window.innerWidth;

export class tuiPagination {
  constructor() {
    this._container = document.querySelector('#tui-pagination-container');
    this._itemsPerPage = 20;
    this._centerAlign = true;
    this._totalItems = 20;
    this._visiblePages = 9;
    this._pagination = null;
    // this.eventList = new Set();
    this._template = {
      moveButton: '<a href="#" class="tui-page-btn tui-{{type}}">' + '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' + '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span>...</span>' +
        '</a>',
    };
    this._totalPages = Math.floor(this.totalItems / this.itemsPerPage);
    this._visible = true;
  }

  set totalPages(items) {
    this._totalPages = Math.floor(this.totalItems / this.itemsPerPage);
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

  visible() {
    if (!state) {
      this._container.style.display = 'none';
    } else {
      this._container.style.display = 'block';
    }
  }

  start() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      this._visiblePages = 5;
    }

    this._pagination = new Pagination(this._container, {
      itemsPerPage: this._itemsPerPage,
      centerAlign: this._centerAlign,
      totalItems: this._totalItems,
      visiblePages: this._visiblePages,
      template: this._template,
    });
    this._totalPages = Math.floor(this.totalItems / this.itemsPerPage);
  }

  reset(page = 1) {
    this.totalPages = Math.floor(this.totalItems / this.itemsPerPage);
    this._pagination.reset(page);
  }

  onBeforeMove(callback) {
    // if (this.eventList.has(`onBeforeMove-${callback.name}`)) {
    //   console.log(`Уже есть onBeforeMove-${callback.name}`);
    //   // return;
    // }
    this._pagination.on('beforeMove', callback);

    // this.eventList.add(`onBeforeMove-${callback.name}`);
  }

  onAfterMove(callback) {
    // if (this.eventList.has(`onAfterMove-${callback.name}`)) {
    //   console.log(`Уже есть onAfterMove-${callback.name}`);
    //   return;
    // }
    this._pagination.on('afterMove', callback);

    // this.eventList.add(`onAfterMove-${callback.name}`);
  }

  offBeforeMove(callback) {
    this._pagination.off('beforeMove', callback);
    // this.eventList.delete(`onBeforeMove-${callback.name}`);
  }

  offAfterMove(callback) {
    this._pagination.off('afterMove', callback);
    // this.eventList.delete(`onAfterMove-${callback.name}`);
  }
}

export function scrollToTop() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > 0) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  // console.log(scrollTop);
}

export function customPaginationButtons(totalPages) {
  rebuildLastButton(totalPages);
  rebuildFirstButton();
}

function rebuildFirstButton() {
  const firstButton = document.querySelector('.tui-first');
  const firstChildButton = document.querySelector('.tui-first-child');
  firstButton.textContent = 1;
  // console.log('rebuildFirstButton');
  if (Number(firstChildButton.innerText) === 1) {
    firstButton.classList.add('hidden');
    document.querySelector('.tui-prev').style.translate = '0';
    return;
  }

  firstButton.classList.remove('hidden');
  console.log(screenWidth);
  if (screenWidth < 768) {
    document.querySelector('.tui-prev').style.translate = '0';
    return;
  }

  document.querySelector('.tui-prev').style.translate = '-100%';
  return;
}

function rebuildLastButton(totalPages) {
  // console.log('rebuildLastButton');
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
