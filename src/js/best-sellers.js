import { fetchCategoryList, fetchParticularCategory } from './service-api';

document.addEventListener('DOMContentLoaded', renderBestSellers);
export function renderBestSellers() {
  const categoryContainer = document.querySelector('.books-container');

  // Отримуємо доступ до категорій книг за допомогою API
  fetch('https://books-backend.p.goit.global/books/category-list')
    .then(response => response.json())
    .then(categories => {
      const categoriesList = document.createElement('ul');
      categoriesList.classList.add('list');
      categoriesList.classList.add('categories-list');

      categories.forEach(category => {
        const categoryElement = document.createElement('li');
        categoryElement.classList.add('category');

        const categoryTitleElement = document.createElement('h3');
        categoryTitleElement.textContent = category.list_name;
        categoryTitleElement.classList.add('category-item');
        categoryElement.appendChild(categoryTitleElement);

        // Отримуємо популярні книги для кожної категорії
        fetch(
          `https://books-backend.p.goit.global/books/category?category=${category.list_name}`
        )
          .then(response => response.json())
          .then(data => {
            const books = data;

            if (books.length > 0) {
              const bookListElement = document.createElement('ul');
              bookListElement.classList.add('card-set');
              bookListElement.classList.add('book-list');

              books.slice(0, 5).forEach(book => {
                const bookItemElement = createBookItemElement(book);
                bookListElement.appendChild(bookItemElement);
              });

              categoryElement.appendChild(bookListElement);
              const bookBestItemElements =
                document.querySelectorAll('.card-set-item');
              bookBestItemElements.forEach(bookBestItem => {
                bookBestItem.addEventListener('click', () => {
                  //   const bookId = bookBestItem.id;
                  //   openModal(bookId);
                });
              });

              if (books.length > 5) {
                const seeMoreButtonElement = document.createElement('button');
                seeMoreButtonElement.classList.add('btn');
                seeMoreButtonElement.textContent = 'See More';
                seeMoreButtonElement.classList.add('see-more-button');
                categoryElement.appendChild(seeMoreButtonElement);

                seeMoreButtonElement.addEventListener('click', () => {
                  const bookListElement =
                    categoryElement.querySelector('.card-set');

                  books.slice(5).forEach(book => {
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
          })
          .catch(error => {
            console.log(
              `Сталася помилка при отриманні даних для категорії "${category.list_name}" з API:`,
              error
            );
          });

        categoriesList.appendChild(categoryElement);
      });
      categoryContainer.appendChild(categoriesList);
    })
    .catch(error => {
      console.log('Сталася помилка при отриманні даних з API:', error);
    });
}
function createBookItemElement(book) {
  const bookItemElement = document.createElement('li');
  bookItemElement.classList.add('card-set-item');
  bookItemElement.classList.add('book-item');
  bookItemElement.classList.add('link');
  bookItemElement.dataset.id = `${book._id}`;

  const bookImageElement = document.createElement('img');
  bookImageElement.src = book.book_image;
  bookImageElement.alt = book.title;
  bookImageElement.classList.add('book-image');
  bookItemElement.appendChild(bookImageElement);

  const bookTitleElement = document.createElement('h4');
  bookTitleElement.textContent = book.title;
  bookTitleElement.classList.add('book-title');
  bookTitleElement.classList.add('ellipsis');
  bookItemElement.appendChild(bookTitleElement);

  const bookAuthorElement = document.createElement('p');
  bookAuthorElement.textContent = book.author;
  bookAuthorElement.classList.add('book-author');
  bookAuthorElement.classList.add('ellipsis');
  bookItemElement.appendChild(bookAuthorElement);

  return bookItemElement;
}
