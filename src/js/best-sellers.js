import { fetchCategoryList, fetchParticularCategory } from './service-api';
import Notiflix from 'notiflix';

const booksContainerEl = document.querySelector('.books-container');
const bestSellersTitleEl = document.querySelector('.best-sellers > h2');

renderBestSellers();

export async function renderBestSellers() {
  try {
    const categoriesResp = await fetchCategoryList();

    bestSellersTitleEl.innerHTML = createMarkupTitle();
    booksContainerEl.innerHTML = '';

    //Create categories list element
    const categoriesListEl = document.createElement('ul');
    categoriesListEl.classList.add('categories-list');
    categoriesListEl.classList.add('list');

    //Render all categories and all top books
    categoriesResp.forEach(categoryResp => {
      renderFullCategory(categoryResp.list_name, categoriesListEl);
    });
    booksContainerEl.append(categoriesListEl);
  } catch (err) {
    Notiflix.Notify.failure('Something went wrong! Try reload the page!');
  }
}

async function renderFullCategory(categoryName, categoriesListEl) {
  //Create category element
  const categoryElement = document.createElement('li');
  categoryElement.classList.add('category');
  categoryElement.classList.add('show-top');

  renderCategoryTitleElement(categoryName, categoryElement);

  // Get popular books for each category
  try {
    const booksByCategory = await fetchParticularCategory(categoryName);
    if (booksByCategory.length > 0) {
      const cardSetEl = document.createElement('ul');
      cardSetEl.classList.add('card-set');
      cardSetEl.classList.add('list');

      //Render top books
      const topBooksByCategory = booksByCategory.slice(0, 5);
      topBooksByCategory.forEach(book => {
        renderBookItemElement(book, cardSetEl);
      });
      categoryElement.appendChild(cardSetEl);

      if (booksByCategory.length > 5) {
        const seeMoreButtonElement = renderSeeMoreBtn(categoryElement);
        const otherBooks = booksByCategory.slice(5);
        seeMoreButtonElement.addEventListener(
          'click',
          onShowMoreBooks.bind(null, otherBooks, cardSetEl)
        );
      }
    } else {
      throw new Error();
    }
  } catch (err) {
    renderNoBooksError(categoryElement);
  }

  categoriesListEl.appendChild(categoryElement);
}

function onShowMoreBooks(books, bookSetEl, event) {
  const curCategoryEl = event.target.closest('.category');
  curCategoryEl.classList.remove('show-top');

  books.forEach(book => {
    renderBookItemElement(book, bookSetEl);
  });
  event.currentTarget.remove();
}

function renderSeeMoreBtn(categoryContainer) {
  const seeMoreButtonElement = document.createElement('button');
  seeMoreButtonElement.classList.add('btn');
  seeMoreButtonElement.classList.add('see-more-button');
  seeMoreButtonElement.textContent = 'See More';
  categoryContainer.appendChild(seeMoreButtonElement);
  return seeMoreButtonElement;
}

function renderCategoryTitleElement(categoryName, categoryContainer) {
  const categoryTitleElement = document.createElement('h3');
  categoryTitleElement.textContent = categoryName;
  categoryTitleElement.classList.add('category-title');
  categoryContainer.appendChild(categoryTitleElement);
}

function renderBookItemElement({ book_image, title, author, _id }, bookSetEl) {
  const markupBook = `
  <li class="card-set-item" data-id="${_id}">
	  <button class="card-set-btn" type="button">
      <span class="wrapper-img">
        <img class="card-set-img" src="${book_image}" alt="book" loading="lazy">
      </span>
      <h4 class="card-set-book-title ellipsis">${title}</h4>
      <p class="card-set-author ellipsis">${author}</p>
    </button>
  </li>`;
  bookSetEl.insertAdjacentHTML('beforeend', markupBook);
}

function createMarkupTitle() {
  return 'Best Sellers <span class="title-accent">Books</span>';
}

function renderNoBooksError(container) {
  const noBooksMessageElement = document.createElement('p');
  noBooksMessageElement.classList.add('error-notification');
  noBooksMessageElement.textContent = 'No books found';
  container.appendChild(noBooksMessageElement);
}
