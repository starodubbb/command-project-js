import { fetchCategoryList, fetchParticularCategory } from './service-api';
import { renderBestSellers } from './best-sellers';
import Notiflix from 'notiflix';

const sideBarListEl = document.querySelector('.side-bar-list');
const booksContainerEl = document.querySelector('.books-container');
const bestSellersTitleEl = document.querySelector('.best-sellers > h2');

let currentCategory = 'All categories';

startRender();
sideBarListEl.addEventListener('click', onRenderMarkup);

async function startRender() {
  try {
    const data = await fetchCategoryList();

    const markupTitle = `<li><button class="side-bar-btn current-category" type="button" data-all_categories>All categories</button></li>`;
    sideBarListEl.insertAdjacentHTML('afterbegin', markupTitle);

    renderMarkupList(data);
  } catch (err) {
    Notiflix.Notify.failure('Something went wrong! Try reload the page!');
  }
}

function renderMarkupList(arrays) {
  const markup = arrays
    .map(({ list_name }) => {
      return `<li><button type="button" class="side-bar-btn">${list_name}</button></li>`;
    })
    .join('');
  return sideBarListEl.insertAdjacentHTML('beforeend', markup);
}

function onRenderMarkup(e) {
  if (e.currentTarget === e.target) {
    return;
  }
  if (e.target.textContent === currentCategory) {
    return;
  }

  currentCategory = e.target.textContent;
  const prevCurrentEl = document.querySelector('.current-category');

  if (prevCurrentEl) {
    prevCurrentEl.classList.remove('current-category');
  }
  e.target.classList.add('current-category');

  if (e.target.dataset.all_categories === '') {
    renderBestSellers();
    return;
  }

  const titleEl = document.querySelector('.card-set-title');
  const cardSetEl = document.createElement('ul');
  cardSetEl.classList.add('card-set');
  cardSetEl.classList.add('list');

  currentCategory = e.target.textContent;

  bestSellersTitleEl.innerHTML = '';
  booksContainerEl.innerHTML = '';

  const markupTitle = createMarkupTitle(currentCategory);
  titleEl.innerHTML = markupTitle;

  renderMarkupBook(currentCategory, cardSetEl);
  booksContainerEl.append(cardSetEl);
}

async function renderMarkupBook(category, cardSetEl) {
  try {
    const data = await fetchParticularCategory(category);

    const markupBook = data
      .map(({ book_image, title, author, _id }) => {
        return `<li class="card-set-item" data-id="${_id}">
	 <button class="card-set-btn" type="button"><span class="wrapper-img"><img class="card-set-img" src="${book_image}" alt="${title}" loading="lazy"></span>
	  <h4 class="card-set-book-title ellipsis">${title}</h4>
	  <p class="card-set-author ellipsis">${author}</p></button></li>`;
      })
      .join('');

    cardSetEl.innerHTML = markupBook;
  } catch (err) {
    renderNoBooksError(cardSetEl);
  }
}

function createMarkupTitle(category) {
  const arrayWords = category.split(' ');
  const numberWord = arrayWords.length - 1;
  const notCompleteArr = arrayWords.slice(0, numberWord).join(' ');

  return `${notCompleteArr} <span class="title-accent">${arrayWords[numberWord]}</span>`;
}

function renderNoBooksError(container) {
  const noBooksMessageElement = document.createElement('p');
  noBooksMessageElement.classList.add('error-notification');
  noBooksMessageElement.textContent = 'No books found';
  container.appendChild(noBooksMessageElement);
}
