async function scrollBtnFunction() {
  const scrollButton = document.getElementById('scrollBtn');

  scrollButton.style.display = 'none';

  function scrollFunction() {
    if (
      document.body.scrollTop > 200 ||
      document.documentElement.scrollTop > 200
    ) {
      scrollButton.style.display = 'flex';
    } else {
      scrollButton.style.display = 'none';
    }
  }

  window.onscroll = function () {
    scrollFunction();
  };

  scrollButton.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

scrollBtnFunction();

