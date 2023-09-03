import throttle from 'lodash/throttle';

async function scrollBtnFunction() {
  const scrollButton = document.getElementById('scrollBtn');

  scrollButton.style.display = 'none';

  function scrollFunction() {
    if (
      document.body.scrollTop > 400 ||
      document.documentElement.scrollTop > 400
    ) {
      scrollButton.style.display = 'flex';
    } else {
      scrollButton.style.display = 'none';
    }
  }

  const scrollFunctionThrottled = throttle(scrollFunction, 200);
  window.onscroll = function () {
    scrollFunctionThrottled();
  };

  scrollButton.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

scrollBtnFunction();
