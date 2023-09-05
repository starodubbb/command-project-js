// <!-- <ul class="list categories-list">
//       <li class="category">
//         <h3 class="category-item"></h3>
//         <ul class="card-set list">
//           <li class="card-set-item"></li>
//           <li class="card-set-item"></li>
//           <li class="card-set-item"></li>
//         </ul>
//       </li>
//       <li class="category">
//         <h3 class="category-item"></h3>
//         <ul class="card-set list">
//           <li class="card-set-item"></li>
//           <li class="card-set-item"></li>
//           <li class="card-set-item"></li>
//         </ul>
//       </li>
//     </ul>

import { fetchCategoryList, fetchParticularCategory } from './service-api';

const categoryContainer = document.querySelector('.books-container');

renderBestSellers();

export async function renderBestSellers() {
  const categories = await fetchCategoryList();
  renderMarkupBooks(categories);

  categories.forEach(async category => {
    renderMarkupBooksByCategory(category);
  });
}

async function renderMarkupBooksByCategory() {
  const data = await fetchCategoryList();
  const markupListBook = data
    .map(({ _list, li, title, _ul }) => {
      return `
      <ul class="list categories-list" data-id="${_list}">
        <li class="category">${li}</li>
        <h3 class="category-item">${title}</h3>
        <ul class="card-set list">${_ul}</ul>
       </ul>`;
    })
    .join('');
  categoryContainer.innerHTML = markupListBook;
}

async function renderMarkupBooks(category, cardSetEl) {
  const data = await fetchParticularCategory(category.list_name);
  if (data.length > 0) {
    const bookListElement = document.createElement('ul');
    bookListElement.classList.add('card-set');
    bookListElement.classList.add('list');

    data.slice(0, 5).forEach(book => {
      const bookItemElement = createBookItemElement(book);
      bookListElement.appendChild(bookItemElement);
    });

    categoryElement.appendChild(bookListElement);
    const bookBestItemElements = document.querySelectorAll('.card-set-item');
    bookBestItemElements.forEach(bookBestItem => {
      bookBestItem.addEventListener('click', () => {});
    });

    if (data.length > 5) {
      const seeMoreButtonElement = document.createElement('button');
      seeMoreButtonElement.classList.add('btn');
      seeMoreButtonElement.textContent = 'See More';
      seeMoreButtonElement.classList.add('see-more-button');
      categoryElement.appendChild(seeMoreButtonElement);

      seeMoreButtonElement.addEventListener('click', () => {
        const bookListElement = categoryElement.querySelector('.card-set');

        data.slice(5).forEach(book => {
          const bookItemElement = createBookItemElement(book);
          bookListElement.appendChild(bookItemElement);
        });

        seeMoreButtonElement.remove(); // Видалити кнопку "See More" після додавання нових книг
      });
    }
  } else {
    const noBooksMessageElement = document.createElement('p');
    noBooksMessageElement.textContent =
      'Немає популярних книг для цієї категорії';
    categoryElement.appendChild(noBooksMessageElement);
  }
  categoriesList.appendChild(categoryElement);
  categoryContainer.appendChild(categoriesList);

  const markupBook = data
    .map(({ book_image, title, author, _id }) => {
      return `<li class="card-set-item" data-id="${_id}">
   <button class="card-set-btn" type="button"><div class="wrapper-img"><img class="card-set-img" src="${book_image}" alt=""></div>
    <h3 class="card-set-book-title ellipsis">${title}</h3>
    <p class="card-set-author ellipsis">${author}</p></li></button>`;
    })
    .join('');

  return (cardSetEl.innerHTML = markupBook);
}
// const books = await fetchParticularCategory(category.list_name);

// function createBookItemElement(book) {
//   const bookItemElement = document.createElement('li');
//   bookItemElement.classList.add('card-set-item');
//   bookItemElement.classList.add('book-item');
//   bookItemElement.classList.add('link');
//   bookItemElement.dataset.id = `${book._id}`;

//   const bookImageElement = document.createElement('img');
//   bookImageElement.src = book.book_image;
//   bookImageElement.alt = book.title;
//   bookImageElement.classList.add('book-image');
//   bookItemElement.appendChild(bookImageElement);

//   const bookTitleElement = document.createElement('h4');
//   bookTitleElement.textContent = book.title;
//   bookTitleElement.classList.add('book-title');
//   bookTitleElement.classList.add('ellipsis');
//   bookItemElement.appendChild(bookTitleElement);

//   const bookAuthorElement = document.createElement('p');
//   bookAuthorElement.textContent = book.author;
//   bookAuthorElement.classList.add('book-author');
//   bookAuthorElement.classList.add('ellipsis');
//   bookItemElement.appendChild(bookAuthorElement);

//   return bookItemElement;
// }

// Отримуємо доступ до категорій книг за допомогою API
// console.log(categories);

// const categoriesList = document.createElement('ul');
// categoriesList.classList.add('list');
// categoriesList.classList.add('categories-list');

// categories.forEach(async category => {
//   const categoryElement = document.createElement('li');
//   categoryElement.classList.add('category');

//   const categoryTitleElement = document.createElement('h3');
//   categoryTitleElement.textContent = category.list_name;
//   categoryTitleElement.classList.add('category-item');
//   categoryElement.appendChild(categoryTitleElement);
