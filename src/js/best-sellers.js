const seeMoreButtons = document.querySelectorAll(`.btn`);
const booklist = document.querySelectorAll(`.div-content`)

seeMoreButtons.forEach(button => { button.addEventListener(`click`,
() => {
const category = button.dataset.category;
const booklist = document.querySelector(`.books.${category}`);
  fetchBooks(category).then(books => {
    if (books.length > 0) {
        books.forEach(book => {
            const liElements = document.querySelector('.li');
            liElement.textContent = book.title;
            bookList.appendChild(liElement);
          });
          hideMessage();
        } else {
          showMessage(`No books found in the ${category} category.`);
        }
    })
    .catch(error => console.log(error));
});
});

const apiURL = 'https://books-backend.p.goit.global/api-docs/';
function fetchBooks(category) {
    return fetch(apiURL)
      .then(response => response.json())
      .then(data => data.books);
  }

function showMessage(text) {
    const message = document.querySelector('.message');
    message.textContent = text;
    message.style.display = 'block';
  }
  
  function hideMessage() {
    const message = document.querySelector('.message');
    message.style.display = 'none';
  }