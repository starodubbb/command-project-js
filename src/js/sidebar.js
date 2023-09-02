import { fetchCategoryList, fetchParticularCategory} from './service-api';

const sideBarEl = document.querySelector('.side-bar-list');
const containerEl = document.querySelector('.container');

startRender();

async function startRender() {
  const data = await fetchCategoryList();

  

  renderMarkup(data);
}

function renderMarkup(arrays) {
  const markup = arrays.map(({ list_name }) => {
    return `<li><a class="side-bar-item link" href="#">${list_name}</a></li>`;
  }).join(" ");
  return sideBarEl.insertAdjacentHTML('beforeend', markup);
}
