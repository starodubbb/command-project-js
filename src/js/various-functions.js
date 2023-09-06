export function setActivePage(page) {
  const previousActivePageArr = document.querySelectorAll(
    '[data-page].current'
  );
  previousActivePageArr.forEach(page => page.classList.remove('current'));
  const activePageArr = document.querySelectorAll(`[data-page=${page}]`);
  activePageArr.forEach(page => page.classList.add('current'));
}
