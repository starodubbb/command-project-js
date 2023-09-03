const btnMenu = document.querySelector('[data-menu-button]');
const headerMobile = document.querySelector('[data-menu]');

btnMenu.onclick = function () {
  headerMobile.classList.toggle('show');

  if (headerMobile.classList.contains('show')) {
    headerMobile.setAttribute('aria-expanded', 'true');
  } else {
    headerMobile.setAttribute('aria-expanded', 'false');
  }
};
