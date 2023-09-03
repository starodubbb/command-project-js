const btnMenu = document.querySelector('[data-menu-button]');
const headerMobile = document.querySelector('[data-menu]');
const bodyRef = document.querySelector('body');
const anchorRef = document.querySelectorAll('.mobile-menu-nav-li');

btnMenu.addEventListener('click', doit);
for (let i = 0; i < anchorRef.length; i++) {
  anchorRef[i].addEventListener('click', doit);
}

function doit() {
  const expanded = btnMenu.getAttribute('aria-expanded') === 'true' || false;
  btnMenu.setAttribute('aria-expanded', !expanded);

  btnMenu.classList.toggle('is-open');

  headerMobile.classList.toggle('show');
  bodyRef.classList.toggle('overflow-hidden');
}
