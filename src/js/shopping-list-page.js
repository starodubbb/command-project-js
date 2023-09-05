import './header.js';
import './scroll-up.js';
import './support.js';
import './mobile-menu.js';
import './service-api.js';
import './service-pagination-api.js';

import Pagination from 'tui-pagination';
import { setActivePage } from './various-functions.js';

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
    createEmptyCart();
  } else {
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
    return (
      acc +
      ` <li class="item-card" id="${book._id}">
        <article class="shopping-card" id="shoppingCard">
            <img class="card-book-images" src="${book.book_image}"
                alt="${book.title}" width="100" heigth="142">
            <div class="card-info">
                <h2 class="card-book-title">${book.title}</h2>
                <p class="card-book-categories">${book.list_name}</p>
                <p class="card-book-desc">
                    ${book.description}
                </p>
                <div class="card-footer">
                    <h3 class="card-book-author">${book.author}</h3>
                    <ul class="list card-book-shops">
                        <li>
                            <a href="${book.buy_links[0].url}" target="_blank" rel="noopener noreferren">
                                <picture>
                                    <source media="(max-width: 767px)"
                                        srcset="./img/shop-list/amazon-shop_mob@1x.png 1x, ./img/shop-list/amazon-shop_mob@2x.png 2x"
                                        type="image/png" />
                                    <source media="(min-width: 768px)"
                                        srcset="./img/shop-list/amazon-shop_tab@1x.png 1x, ./img/shop-list/amazon-shop_tab@2x.png 2x"
                                        type="image/png" />
                                    <img src="./img/shop-list/amazon-shop_mob@1x.png" alt="Amazon shop"
                                        loading="lazy" />
                                </picture>
                            </a>
                        </li>
                        <li>
                            <a href="${book.buy_links[1].url}" target="_blank" rel="noopener noreferren">
                                <picture>
                                    <source media="(min-width: 320px)"
                                        srcset="./img/shop-list/apple-shop_mob@1x.png 1x, ./img/shop-list/apple-shop_mob@2x.png 2x"
                                        type="image/png" />
                                    <source media="(min-width: 768px)"
                                        srcset="./img/shop-list/apple-shop_tab@1x.png 1x, ./img/shop-list/apple-shop_tab@2x.png 2x"
                                        type="image/png" />
                                    <img src="./img/shop-list/apple-shop_mob@1x.png" alt="Apple shop" loading="lazy" />
                                </picture>
                            </a>
                        </li>
                        <li>
                            <a href="${book.buy_links[4].url}" target="_blank" rel="noopener noreferren">
                                <picture>
                                    <source media="(min-width: 320px)"
                                        srcset="./img/shop-list/bookshelf-shop_mob@1x.png 1x, ./img/shop-list/bookshelf-shop_mob@2x.png 2x"
                                        type="image/png" />
                                    <source media="(min-width: 768px)"
                                        srcset="./img/shop-list/bookshelf-shop_tab@1x.png 1x, ./img/shop-list/bookshelf-shop_tab@2x.png 2x"
                                        type="image/png" />
                                    <img src="./img/shop-list/bookshelf-shop_mob@1x.png" alt="Bookshelf shop"
                                        loading="lazy" />
                                </picture>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <button id="removedCard" aria-label="remove card" class="remove-card" type="button">
                <svg class="icon-removed" width="22" height="22">
                    <use href="./img/icons/removed-card.svg#icon-remove-card"></use>
                </svg>
            </button>
        </article>
    </li>`
    );
  }, '');
}

function initPagination(totalItems) {
  const pagination = new Pagination(refs.pagination, {
    totalItems: totalItems,
    itemsPerPage: itemsPerPage,
    visiblePages: visiblePages,
    centerAlign: true,
    page: currentPage,
  });

  pagination.on('afterMove', eventData => {
    currentPage = eventData.page;
    const storageData = JSON.parse(localStorage.getItem(LS_KEY));
    createFullCart(storageData, currentPage);
    return currentPage;
  });
}

function deleteCard(event) {
  if (event.target.classList.contains('remove-card')) {
    const card = event.target.closest('.item-card');
    const bookId = card.dataset.bookId;
    const storageData = JSON.parse(localStorage.getItem(LS_KEY));
    const newStorageData = storageData.filter(object => object.id !== bookId);

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
