import { fetchCategoryList, fetchParticularCategory } from './service-api';
import { renderBestSellers } from './best-sellers';

const sideBarEl = document.querySelector('.side-bar');
const sideBarListEl = document.querySelector('.side-bar-list');
const booksContainerEl = document.querySelector('.books-container');
// const cardSetEl = document.querySelector('.card-set');
const bestSellersTitleEl = document.querySelector('.best-sellers > h2');

startRender();
sideBarListEl.addEventListener('click', onRenderMarkup);

async function startRender() {
  const data = await fetchCategoryList();

  const markupTitle = `<li><button class="side-bar-btn current-category" type="button" data-all-categories>All categories</button></li>`;
  sideBarListEl.insertAdjacentHTML('afterbegin', markupTitle);

  const allCategoriesBtn = document.querySelector('[data-all-categories]');
  allCategoriesBtn.addEventListener('click', renderBestSellers);

  renderMarkupList(data);
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
  const currentCategory = e.target.textContent;
  // const categoriesListEl = document.querySelector('.categories-list');
  const currentEl = document.querySelector('.current-category');
  const titleEl = document.querySelector('.card-set-title');

  const cardSetEl = document.createElement('ul');
  cardSetEl.classList.add('card-set');
  cardSetEl.classList.add('list');

  if (e.currentTarget === e.target) {
    return;
  }

  bestSellersTitleEl.innerHTML = '';
  // categoriesListEl.innerHTML = '';
  booksContainerEl.innerHTML = '';

  const markupTitle = renderMarkupTitle(currentCategory);
  titleEl.innerHTML = markupTitle;

  renderMarkupBook(currentCategory, cardSetEl);
  booksContainerEl.append(cardSetEl);

  if (currentEl) {
    currentEl.classList.remove('current-category');
  }
  e.target.classList.add('current-category');
}

async function renderMarkupBook(category, cardSetEl) {
  const data = await fetchParticularCategory(category);

  const markupBook = data
    .map(({ book_image, title, author, _id }) => {
      return `<li class="card-set-item" data-id="${_id}">
	 <button class="card-set-btn" type="button"><div class="wrapper-img"><img class="card-set-img" src="${book_image}" alt=""></div>
	  <h4 class="card-set-book-title ellipsis">${title}</h4>
	  <p class="card-set-author ellipsis">${author}</p></li></button>`;
    })
    .join('');

  return (cardSetEl.innerHTML = markupBook);
}

function renderMarkupTitle(category) {
  return category;
}
