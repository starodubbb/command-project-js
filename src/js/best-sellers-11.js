// import { fetchTopBooks } from './service-api';

// const booksContainerRef = document.querySelector('.books-container');

// async function getBestSellers() {
//   try {
//     const bestSellers = await fetchTopBooks();
//     console.log(bestSellers);
//   } catch (error) {
//     console.log(error);
//   }
// }

// function createCategoryTopBooksObj(category) {
//   const categoryElement = document.createElement('li');
//   categoryElement.classList.add('category');

//   const categoryTitleElement = document.createElement('h3');
//   categoryTitleElement.textContent = category.list_name;
//   categoryTitleElement.classList.add('category-item');
//   categoryElement.appendChild(categoryTitleElement);

//   if (category.books.length > 0) {
//     const bookListElement = document.createElement('ul');
//     bookListElement.classList.add('book-list');

//     books.forEach(book => {
//       const bookItemElement = createBookItemElement(book);
//       bookListElement.appendChild(bookItemElement);
//     });

//     categoryElement.appendChild(bookListElement);
//     const bookBestItemElements = document.querySelectorAll('.book-item');
//     bookBestItemElements.forEach(bookBestItem => {
//       // bookBestItem.addEventListener('click', () => {
//       //   //   const bookId = bookBestItem.id;
//       //   //   openModal(bookId);
//       // });
//     });

//     if (books.length > 5) {
//       const seeMoreButtonElement = document.createElement('button');
//       seeMoreButtonElement.textContent = 'See More';
//       seeMoreButtonElement.classList.add('see-more-button');
//       categoryElement.appendChild(seeMoreButtonElement);

//       seeMoreButtonElement.addEventListener('click', () => {
//         const bookListElement = categoryElement.querySelector('.book-list');

//         books.slice(5).forEach(book => {
//           const bookItemElement = createBookItemElement(book);
//           bookListElement.appendChild(bookItemElement);
//         });

//         seeMoreButtonElement.remove(); // Видалити кнопку "See More" після додавання нових книг
//       });
//     }
//   } else {
//   }
// }

// getBestSellers();
// // function showBestSellersBooks() {}
