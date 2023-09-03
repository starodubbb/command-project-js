import { fetchCategoryList, fetchParticularCategory } from './service-api';

const sideBarEl = document.querySelector('.side-bar');
const sideBarListEl = document.querySelector('.side-bar-list');
const booksContainerEl = document.querySelector('.books-container');
const cardSetEl = document.querySelector('.card-set');
const bestSellersEl = document.querySelector('.best-sellers');


startRender();

async function startRender() {
  const data = await fetchCategoryList();

  const markupTitle = `<li><button class="side-bar-btn current-category" type="button">All categories</button></li>`;
  sideBarListEl.insertAdjacentHTML('afterbegin', markupTitle);

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

sideBarListEl.addEventListener('click', onRenderMarkup);

function onRenderMarkup(e) {
  const currentCategory = e.target.textContent;
  const categoriesListEl = document.querySelector('.categories-list')

bestSellersEl.innerHTML = '';
categoriesListEl.innerHTML = '';

  renderMarkupBook(currentCategory);
  
  
}

async function renderMarkupBook(category) {
  const data = await fetchParticularCategory(category);

  const markupBook = data.map(({ book_image, title, author, _id }) => {

    return `<li class="card-set-item" data-id="${_id}">
	 <div class="wrapper-img"><img class="card-set-img" src="${book_image}" alt=""></div>
	  <p class="card-set-title">${title}</p>
	  <p class="card-set-author">${author}</p></li>`;
  }).join("");

  return cardSetEl.innerHTML = markupBook;
  
}
