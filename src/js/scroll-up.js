(function () {
    const scrollButton = document.getElementById("scrollBtn");
  
    window.onscroll = function () {
      scrollFunction();
    };
  
    function scrollFunction() {
      if (
        document.body.scrollTop > 200 ||
        document.documentElement.scrollTop > 200
      ) {
        scrollButton.style.display = "flex";
      } else {
        scrollButton.style.display = "none";
      }
    }
  
    scrollButton.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
  
  })();