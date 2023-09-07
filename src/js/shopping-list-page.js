import './header.js';
import './scroll-up.js';
import './support.js';
import './mobile-menu.js';
import './service-api.js';
import './service-pagination-api.js';

import Pagination from 'tui-pagination';
import { setActivePage } from './various-functions.js';

import amazon_mob_1x from '../img/shop-list/amazon-shop_mob@1x.png';
import amazon_mob_2x from '../img/shop-list/amazon-shop_mob@2x.png';
import amazon_tab_1x from '../img/shop-list/amazon-shop_tab@1x.png';
import amazon_tab_2x from '../img/shop-list/amazon-shop_tab@2x.png';
import apple_mob_1x from '../img/shop-list/apple-shop_mob@1x.png';
import apple_mob_2x from '../img/shop-list/apple-shop_mob@2x.png';
import apple_tab_1x from '../img/shop-list/apple-shop_tab@1x.png';
import apple_tab_2x from '../img/shop-list/apple-shop_tab@2x.png';
import bookshelf_mob_1x from '../img/shop-list/bookshelf-shop_mob@1x.png';
import bookshelf_mob_2x from '../img/shop-list/bookshelf-shop_mob@2x.png';
import bookshelf_tab_1x from '../img/shop-list/bookshelf-shop_tab@1x.png';
import bookshelf_tab_2x from '../img/shop-list/bookshelf-shop_tab@2x.png';
import iconsSprite from '../img/icons/symbol-defs.svg';

const PAGE = 'shopping-list';
setActivePage(PAGE);

const refs = {
  emptyBox: document.getElementById('emptyBox'),
  shoppingBox: document.getElementById('shoppingBox'),
  pagination: document.getElementById('pagination'),
};

const LS_KEY = 'shopping-list';

let page;
let currentPage = 1;
let itemsPerPage;
let visiblePages;
let resizeTimeout;

refs.shoppingBox.addEventListener('click', deleteCard);
window.addEventListener('resize', changePagOptionsByScreenWidth);
document.addEventListener('DOMContentLoaded', firstPageLoaded);

createShoppingList();

function createShoppingList() {
  const storageData = JSON.parse(localStorage.getItem(LS_KEY));
  if (!storageData || storageData.length === 0) {
    showEmptyList();
    createEmptyCart();
  } else {
    showShoppingList();
    const totalItems = storageData.length;
    initPagination(totalItems);
    createFullCart(storageData, currentPage);
  }
}

function createEmptyCart() {
  const markup = `
    <p class="empty-shopping-list-desc">This page is empty, add some books and proceed to order.</p>
    <div class="empty-shopping-list-bg-image"></div>
    `;

  refs.emptyBox.innerHTML = markup;
}

function createFullCart(dataUser, page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsOnPage = dataUser.slice(startIndex, endIndex);
  // console.log(itemsOnPage);
  const markup = itemsOnPage.reduce((acc, book) => {
    const descriptionText =
      book.description || 'Description will be added soon ..';
    return (
      acc +
      ` <li class="item-card" data-id="${book._id}">
        <article class="shopping-card" id="shoppingCard">
            <img class="card-book-images" src="${book.book_image}"
                alt="${book.title}" width="100" heigth="142">
            <div class="card-info">
                <h2 class="card-book-title ellipsis">${book.title}</h2>
                <p class="card-book-categories ellipsis">${book.list_name}</p>
                <p class="card-book-desc ellipsis">
                    ${descriptionText}
                </p>
                <div class="card-footer">
                    <h3 class="card-book-author ellipsis">${book.author}</h3>
                    <ul class="list card-book-shops">
                        <li>
                            <a class="shop-link" href="${book.buy_links[0].url}" target="_blank" rel="noopener noreferren">
                                <picture>
                                    <source media="(max-width: 767px)"
                                        srcset="${amazon_mob_1x} 1x, ${amazon_mob_2x} 2x"
                                        type="image/png" />
                                    <source media="(min-width: 768px)"
                                        srcset="${amazon_tab_1x} 1x, ${amazon_tab_2x} 2x"
                                        type="image/png" />
                                    <img class="shop-icon amazon" src="${amazon_tab_1x}" alt="Amazon shop"
                                        loading="lazy" />
                                </picture>
                            </a>
                        </li>
                        <li>
                            <a class="shop-link" href="${book.buy_links[1].url}" target="_blank" rel="noopener noreferren">
                                <picture>
                                    <source media="(max-width: 767px)"
                                        srcset="${apple_mob_1x} 1x, ${apple_mob_2x} 2x"
                                        type="image/png" />
                                    <source media="(min-width: 768px)"
                                        srcset="${apple_tab_1x} 1x, ${apple_tab_2x} 2x"
                                        type="image/png" />
                                    <img class="shop-icon" src="${apple_tab_1x}" alt="Apple shop" loading="lazy" />
                                </picture>
                            </a>
                        </li>
                        <li>
                            <a class="shop-link" href="${book.buy_links[4].url}" target="_blank" rel="noopener noreferren">
                                <picture>
                                    <source media="(max-width: 767px)"
                                        srcset="${bookshelf_mob_1x} 1x, ${bookshelf_mob_2x} 2x"
                                        type="image/png" />
                                    <source media="(min-width: 768px)"
                                        srcset="${bookshelf_tab_1x} 1x, ${bookshelf_tab_2x} 2x"
                                        type="image/png" />
                                    <img class="shop-icon" src="${bookshelf_tab_1x}" alt="Bookshelf shop"
                                        loading="lazy" />
                                </picture>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <button id="removedCard" aria-label="remove card" class="btn remove-card" type="button">
                <svg class="icon-removed" width="18" height="18">
                    <use class="icon-removed-use" href="${iconsSprite}#icon-trash"></use>
                </svg>
            </button>
        </article>
    </li>`
    );
  }, '');
  refs.shoppingBox.innerHTML = markup;
}

function initPagination(totalItems) {
  const pagination = new Pagination(refs.pagination, {
    totalItems: totalItems,
    itemsPerPage: itemsPerPage,
    visiblePages: visiblePages,
    centerAlign: true,
    page: currentPage,
    template: {
      page: '<a href="#" class="btn link pag-page-link pag-btn">{{page}}</a>',
      currentPage:
        '<strong class="btn pag-btn pad-btn-active">{{page}}</strong>',
      moveButton: type => {
        let template = '';
        if (type.type === 'first') {
          template =
            '<a href="#" class="btn pag-btn pag-back-btn">' +
            '<svg class="" width="31" height="24">' +
            '<use class="" href="' +
            iconsSprite +
            '#icon-double-arrow-left"></use>' +
            '</svg>' +
            '</a>';
        }
        if (type.type === 'prev') {
          template =
            '<a href="#" class="btn pag-btn pag-back-btn pag-prev-single-arrow">' +
            '<svg class="" width="24" height="24">' +
            '<use class="" href="' +
            iconsSprite +
            '#icon-single-arrow-left"></use>' +
            '</svg>' +
            '</a>';
        }
        if (type.type === 'next') {
          template =
            '<a href="#" class="btn pag-btn pag-next-btn pag-next-single-arrow">' +
            '<svg class="" width="24" height="24">' +
            '<use class="" href="' +
            iconsSprite +
            '#icon-single-arrow-right "></use>' +
            '</svg>' +
            '</a>';
        }
        if (type.type === 'last') {
          template =
            '<a href="#" class="btn pag-btn pag-next-btn">' +
            '<svg class="" width="31" height="24">' +
            '<use class="" href="' +
            iconsSprite +
            '#icon-double-arrow-right"></use>' +
            '</svg>' +
            '</a>';
        }
        return template;
      },

      disabledMoveButton: type => {
        let template = '';
        if (type.type === 'first') {
          template =
            '<a href="#" class="btn pag-btn pag-back-btn">' +
            '<svg class="" width="31" height="24">' +
            '<use class="" href="' +
            iconsSprite +
            '#icon-double-arrow-left"></use>' +
            '</svg>' +
            '</a>';
        }
        if (type.type === 'prev') {
          template =
            '<a href="#" class="btn pag-btn pag-back-btn pag-prev-single-arrow">' +
            '<svg class="" width="24" height="24">' +
            '<use class="" href="' +
            iconsSprite +
            '#icon-single-arrow-left"></use>' +
            '</svg>' +
            '</a>';
        }
        if (type.type === 'next') {
          template =
            '<a href="#" class="btn pag-btn pag-next-btn pag-next-single-arrow">' +
            '<svg class="" width="24" height="24">' +
            '<use class="" href="' +
            iconsSprite +
            '#icon-single-arrow-right "></use>' +
            '</svg>' +
            '</a>';
        }
        if (type.type === 'last') {
          template =
            '<a href="#" class="btn pag-btn pag-next-btn">' +
            '<svg class="" width="31" height="24">' +
            '<use class="" href="' +
            iconsSprite +
            '#icon-double-arrow-right"></use>' +
            '</svg>' +
            '</a>';
        }
        return template;
      },
      moreButton:
        '<a href="#" class="link btn pag-btn pag-page-link">' +
        '<span class="pag-ellip-sym">...</span>' +
        '</a>',
    },
  });

  pagination.on('afterMove', eventData => {
    currentPage = eventData.page;
    const storageData = JSON.parse(localStorage.getItem(LS_KEY));
    createFullCart(storageData, currentPage);
    return currentPage;
  });
}

function deleteCard(event) {
  if (
    event.target.classList.contains('remove-card') ||
    event.target.classList.contains('icon-removed') ||
    event.target.classList.contains('icon-removed-use')
  ) {
    const card = event.target.closest('.item-card');
    const bookId = card.dataset.id;

    const storageData = JSON.parse(localStorage.getItem(LS_KEY));
    const newStorageData = storageData.filter(object => object._id !== bookId);
    localStorage.setItem(LS_KEY, JSON.stringify(newStorageData));
    if (!newStorageData.length) {
      card.remove();
      createEmptyCart();
    }

    const countPages = Math.ceil(newStorageData.length / itemsPerPage);
    if (countPages >= currentPage) {
      card.remove();
      createShoppingList();
    } else {
      page = countPages;
      currentPage = countPages;
      card.remove();
      createShoppingList();
    }
  }
}

function changePagOptionsByScreenWidth() {
  const screenWidth = window.innerWidth;
  if (screenWidth < 768) {
    visiblePages = 1;
    itemsPerPage = 4;
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(function () {
      createShoppingList();
    }, 200);
  } else if (screenWidth >= 768) {
    itemsPerPage = 3;
    visiblePages = 3;
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(function () {
      createShoppingList();
    }, 200);
  }
}

function firstPageLoaded() {
  const screenWidth = window.innerWidth;

  if (screenWidth < 768) {
    visiblePages = 1;
    itemsPerPage = 4;
    createShoppingList();
  } else if (screenWidth >= 768) {
    itemsPerPage = 3;
    visiblePages = 3;
    createShoppingList();
  }
}

function showEmptyList() {
  refs.emptyBox.classList.remove('hide');
  refs.shoppingBox.classList.add('hide');
  refs.pagination.classList.add('hide');
}
function showShoppingList() {
  refs.emptyBox.classList.add('hide');
  refs.shoppingBox.classList.remove('hide');
  refs.pagination.classList.remove('hide');
}
