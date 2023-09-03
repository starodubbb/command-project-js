import { fetchBookById } from './service-api'

const closeBtn = document.querySelector('.modal-close-btn');
const modal = document.querySelector('.modal-window');
const backDrop = document.querySelector('.backdrop');
let modalContent = document.querySelector('.modal-content'); 

const bestSellerBooks = document.querySelector('.books-container'); // посилання на секцію з бестселлерами
console.log(bestSellerBooks);

// const categoriesList = document.querySelector('.category-books-list');
// const bookElements = bestSellerBooks.querySelectorAll('.book');
bestSellerBooks.addEventListener('click', onBookClick); // слухач подій на кліку по книжці 

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
    const modalHTML = markupModal(bookData);

    modalContent.innerHTML = modalHTML; // Оновлюємо modalContent, а не оголошуємо його знову
    modal.classList.remove('is-hidden');
    openModal()

    closeBtn.addEventListener('click', closeModal);
    backDrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', onEscapeKey);
  } catch (error) {
    console.error('Помилка завантаження даних книги:', error);
  }
}



function openModal() {
  console.log('Модальне вікно відкрито');
backDrop.classList.remove('is-hidden');
modal.classList.remove('is-hidden');
}



// bookElements.forEach((bookElement) => {
//   bookElement.addEventListener('click', onBookClick);
// });

const addBookBtn = document.querySelector('.modal-btn')
const addBtnClick = document.querySelector('.modal-btn-add');
const removeBtnClick = document.querySelector('.modal-btn-remove');
const addNote = document.querySelector('.modal-note');


closeBtn.addEventListener('click', onBtnCloseClick);
backDrop.addEventListener('click', onBackdropClick);
document.addEventListener('keydown', onEscapeKey);



// addBookBtn.addEventListener('click', onBtnBookClick); // слухач на кнопці додавання/видалення книги в модальному вікні 



function onBtnCloseClick()  {
closeModal();
}

function onBackdropClick(evt) {
  if (evt.target === backDrop) {
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
  backDrop.classList.add('is-hidden')
  document.removeEventListener('keydown', onEscapeKey);
  backDrop.removeEventListener('click', onBackdropClick);
}

function markupModal(bookData) {
  const { book_image, list_name, author, description, buy_links, } = bookData;
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
              href="https://www.amazon.com/"
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
              href="https://www.apple.com/ua/apple-books/"
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
              href=""
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


// export async function fetchBookById(id) {
//   try {
//     const res = await axios.get(`${BASE_URL}/${id}`);
//     console.log('Отримані дані від сервера:', res.data);
//     return res.data;
//   } catch (error) {
//     console.error('Помилка при завантаженні даних книги:', error);
//     throw error;
//   }
// }






