document.querySelector('.switcher-input').addEventListener('click', evt => {
  if (localStorage.getItem('theme') === 'dark') {
    localStorage.removeItem('theme');
  } else {
    localStorage.setItem('theme', 'dark');
  }
  addColorClassThemeHtml();
});

function addColorClassThemeHtml() {
  try {
    if (localStorage.getItem('theme') === 'dark') {
      document.querySelector('html').classList.add('dark');
      document.querySelector('.switcher-input').checked = true;
    } else {
      document.querySelector('html').classList.remove('dark');
      document.querySelector('.switcher-input').checked = false;
    }
  } catch (err) {
    console.log(err);
  }
}

addColorClassThemeHtml();
