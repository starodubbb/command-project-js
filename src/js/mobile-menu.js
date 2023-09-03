const btnMenu = document.querySelector('.js-call-menu');
const headerMobile = document.querySelector('#header-mobile');

btnMenu.onclick = function () {
  headerMobile.classList.toggle('show');

  if (headerMobile.classList.contains('show')) {
    headerMobile.setAttribute('aria-expanded', 'true');
  } else {
    headerMobile.setAttribute('aria-expanded', 'false');
  }
};
