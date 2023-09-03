export function setActivePage(page) {
  const previousActivePage = document.querySelector('[data-page].current');
  if (previousActivePage) {
    previousActivePage.classList.remove('current');
  }
  const activePage = document.querySelector(`[data-page=${page}]`);
  activePage.classList.add('current');
}
