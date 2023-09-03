import { fetchBookById } from './service-api';

const closeBtn = document.querySelector('.modal-close-btn');
const modal = document.querySelector('.modal-window');
const backdrop = document.querySelector('.backdrop');
let modalContent = document.querySelector('.modal-content');
let currentBookData;

const addBookBtn = document.querySelector('.modal-btn');
const textOnBtn = document.querySelector('.modal-btn-add');
const addNote = document.querySelector('.modal-note');

const bestSellerBooks = document.querySelector('.books-container');

bestSellerBooks.addEventListener('click', onBookClick);

modal.addEventListener('click', (evt) => {
  evt.stopPropagation();
});

let shoppingListData = [];
loadData();

function disableBodyScroll() {
  document.body.style.overflow = 'hidden';
}

function enableBodyScroll() {
  document.body.style.overflow = 'visible';
}

function onBookClick(event) {
  const bookElement = event.target.closest('.book-item');
  if (!bookElement) return;

  const bookId = bookElement.getAttribute('data-id');
  if (bookId) {
    console.log('Клік на книзі з ID:', bookId);
    loadBookDetails(bookId);
  }
}

async function loadBookDetails(bookId) {
  try {
    const bookData = await fetchBookById(bookId);
    currentBookData = bookData;

    const shoppingList = JSON.parse(localStorage.getItem('shopping-list')) || [];

    const isBookInShoppingList = shoppingList.some(item => item._id === bookData._id);

    const modalHTML = markupModal(bookData);

    modalContent.innerHTML = modalHTML;
    modal.classList.remove('is-hidden');
    openModal();

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', onEscapeKey);

    // Оновлюємо текст кнопки відповідно до наявності книги в списку покупок
    const btnAddEl = document.querySelector('.modal-btn-add');
    btnAddEl.addEventListener('click', onClickBtnAdd);

    if (isBookInShoppingList) {
      btnAddEl.textContent = 'REMOVE FROM THE SHOPPING LIST';
    } else {
      btnAddEl.textContent = 'ADD TO SHOPPING LIST';
    }
  } catch (error) {
    console.error('Помилка завантаження даних книги:', error);

    currentBookData = {};
  }
}

function loadData() {
  const data = localStorage.getItem('shopping-list');

  if (data) {
    shoppingListData = JSON.parse(data);
  }
}

function saveData(data) {
  localStorage.setItem('shopping-list', JSON.stringify(data));
}

function onClickBtnAdd() {
  if (currentBookData) {
    const bookDataToStore = currentBookData;
    const arrFromLocalStorage = JSON.parse(localStorage.getItem('shopping-list')) || [];

    const isBookInLocalStorage = arrFromLocalStorage.some(item => item._id === bookDataToStore._id);

    if (!isBookInLocalStorage) {
      arrFromLocalStorage.push(bookDataToStore);
      localStorage.setItem('shopping-list', JSON.stringify(arrFromLocalStorage));

      document.querySelector('.modal-btn-add').textContent = 'Remove from the shopping list';
    } else {
      const filteredArr = arrFromLocalStorage.filter(item => item._id !== bookDataToStore._id);
      localStorage.setItem('shopping-list', JSON.stringify(filteredArr));

      document.querySelector('.modal-btn-add').textContent = 'Add to shopping list';
    }
  } else {
    console.error('Дані про книгу відсутні.');
  }
}

let isBookAddedToShoppingList = false;

function openModal() {
  console.log('Модальне вікно відкрито');
  backdrop.classList.remove('is-hidden');
  modal.classList.remove('is-hidden');
  disableBodyScroll(); // Відключаємо скролл при відкритті модального вікна

  if (isBookAddedToShoppingList) {
    document.querySelector('.modal-btn-add').textContent = 'Remove from the shopping list';
  } else {
    document.querySelector('.modal-btn-add').textContent = 'Add to shopping list';
  }
}

closeBtn.addEventListener('click', onBtnCloseClick);
backdrop.addEventListener('click', onBackdropClick);
document.addEventListener('keydown', onEscapeKey);

function onBtnCloseClick() {
  closeModal();
  enableBodyScroll();
}

function onBackdropClick(evt) {
  if (evt.target === backdrop && evt.target !== modal) {
    closeModal();
  }
}

function onEscapeKey(evt) {
  if (evt.key === 'Escape') {
    closeModal();
  }
}

function closeModal() {
  modal.classList.add('is-hidden');
  backdrop.classList.add('is-hidden');
  enableBodyScroll(); // Включаємо скролл при закритті модального вікна
  document.removeEventListener('keydown', onEscapeKey);
  backdrop.removeEventListener('click', onBackdropClick);
}

function markupModal(bookData) {
  const { book_image, list_name, author, description, buy_links } = bookData;
  return `<div class="modal-content">
      <img class="modal-book-img"
              src="${book_image}"
              alt="Book cover"
            />
            <div class="modal-book-descr">
              <h2 class="modal-book-title">${list_name}</h2>
              <h3 class="modal-book-author">${author}</h3>

          <p class="modal-book-review">${description}</p>
        <ul class="modal-book-list list">
          <li class="modal-book-el">
            <a
              href="${buy_links[0].url}"
              class="modal-book-link"
              target="_blank"
              rel="noopener no-referrer"
              >
              <img
              srcset="
              ./img/pop-up/pop-up-shop-1.png 1x,
              ./img/pop-up/pop-up-shop-1@2x.png 2x 
              "
              src="./img/pop-up/pop-up-shop-1.png"
              alt="Buy on Amazon"
              width="62"
              height="19"
              class="modal-book-seller"
            /></a>
          </li>
          <li class="modal-book-el">
            <a
              href="${buy_links[1].url}"
              class="modal-book-link"
              target="_blank"
              rel="noopener no-referrer"
              ><img
              srcset="
              ./img/pop-up/pop-up-shop-2.png 1x,
              ./img/pop-up/pop-up-shop-2@2x.png 2x 
              "
              src="./img/pop-up/pop-up-shop-2.png"
              alt="Buy on Apple"
              width="33"
              height="32"
              class="modal-book-seller"
            /></a>
          </li>
          <li class="modal-book-el">
            <a
              href="${buy_links[4].url}"
              class="modal-book-link"
              target="_blank"
              rel="noopener no-referrer"
            >
              <img
              srcset="
              ./img/pop-up/pop-up-shop-3.png 1x,
              ./img/pop-up/pop-up-shop-3@2x.png 2x 
              "
              src="./img/pop-up/pop-up-shop-3.png"
              alt="Book shop"
              width="38"
              height="36"
              class="modal-book-seller"
            /></a>
          </li>
        </ul>
      </div>`;
}
