const btnMenu = document.querySelector('[data-menu-button]');
const headerMobile = document.querySelector('[data-menu]');
const bodyRef = document.querySelector('body');
const anchorRef = document.querySelectorAll('.mobile-menu-nav-li');

btnMenu.addEventListener('click', doit);

for (let i = 0; i < anchorRef.length; i++) {
  anchorRef[i].addEventListener('click', doit);
}

window
  .matchMedia('(min-width: 768px)')
  .addEventListener('change', onMatchMedia);

function onMatchMedia(e) {
  if (!e.matches) return;
  btnMenu.setAttribute('aria-expanded', false);
  btnMenu.classList.remove('is-open');
  headerMobile.classList.remove('show');
  bodyRef.classList.remove('overflow-hidden');
}

function doit() {
  const expanded = btnMenu.getAttribute('aria-expanded') === 'true' || false;
  btnMenu.setAttribute('aria-expanded', !expanded);

  btnMenu.classList.toggle('is-open');

  headerMobile.classList.toggle('show');
  bodyRef.classList.toggle('overflow-hidden');
}
