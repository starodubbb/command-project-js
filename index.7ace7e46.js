function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},s=t.parcelRequired7c6;null==s&&((s=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var s={id:e,exports:{}};return n[e]=s,t.call(s.exports,s,s.exports),s.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){o[e]=t},t.parcelRequired7c6=s),s("kyEFX").register(JSON.parse('{"7bk21":"index.7ace7e46.js","gIJxI":"pop-up-shop-1.06fa7713.png","hZaf5":"pop-up-shop-2.57ecc8dc.png","3u4at":"pop-up-shop-3.e5effbae.png","W511b":"index.9e294144.js"}')),s("bUb57");var a,l=s("d1cSn");a=new URL(s("kyEFX").resolve("gIJxI"),import.meta.url).toString();var c;c=new URL(s("kyEFX").resolve("hZaf5"),import.meta.url).toString();var i;i=new URL(s("kyEFX").resolve("3u4at"),import.meta.url).toString();const r=document.querySelector(".modal-close-btn"),d=document.querySelector(".modal-window"),u=document.querySelector(".backdrop");let m,p=document.querySelector(".modal-content");document.querySelector(".books-container").addEventListener("click",(function(t){const n=t.target.closest(".card-set-item");if(!n)return;const o=n.getAttribute("data-id");o&&async function(t){try{const n=await(0,l.fetchBookById)(t);m=n;const o=(JSON.parse(localStorage.getItem("shopping-list"))||[]).some((e=>e._id===n._id)),s=function(t){const{book_image:n,list_name:o,author:s,description:l,buy_links:r}=t;return`<div class="modal-content">\n      <img class="modal-book-img"\n              src="${n}"\n              alt="Book cover"\n            />\n            <div class="modal-book-descr">\n              <h2 class="modal-book-title">${o}</h2>\n              <h3 class="modal-book-author">${s}</h3>\n\n          <p class="modal-book-review">${l||"Description will be added soon .."}</p>\n        <ul class="modal-book-list list">\n          <li class="modal-book-el">\n            <a\n              href="${r[0].url}"\n              class="modal-book-link"\n              target="_blank"\n              rel="noopener no-referrer"\n              >\n              <img\n              src="${e(a)}"\n              alt="Buy on Amazon"\n              width="62"\n              height="19"\n              class="modal-book-seller amazon"\n            /></a>\n          </li>\n          <li class="modal-book-el">\n            <a\n              href="${r[1].url}"\n              class="modal-book-link"\n              target="_blank"\n              rel="noopener no-referrer"\n              ><img\n              src="${e(c)}"\n              alt="Buy on Apple"\n              width="33"\n              height="32"\n              class="modal-book-seller"\n            /></a>\n          </li>\n          <li class="modal-book-el">\n            <a\n              href="${r[4].url}"\n              class="modal-book-link"\n              target="_blank"\n              rel="noopener no-referrer"\n            >\n              <img\n\n              src="${e(i)}"\n              alt="Book shop"\n              width="38"\n              height="36"\n              class="modal-book-seller"\n            /></a>\n          </li>\n        </ul>\n      </div>`}(n);p.innerHTML=s,d.classList.remove("is-hidden"),u.classList.remove("is-hidden"),d.classList.remove("is-hidden"),document.body.style.overflow="hidden",document.querySelector(".modal-btn-add").textContent="ADD TO SHOPPING LIST",r.addEventListener("click",k),u.addEventListener("click",k),document.addEventListener("keydown",y);const h=document.querySelector(".modal-btn-add");h.addEventListener("click",b);const g=document.querySelector(".modal-note");o?(h.textContent="REMOVE FROM THE SHOPPING LIST",g.textContent="Congratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”."):(h.textContent="ADD TO SHOPPING LIST",g.textContent="")}catch(e){m={}}}(o)})),d.addEventListener("click",(e=>{e.stopPropagation()}));let h=[];function g(){document.body.style.overflow="visible"}function b(){if(m){const e=m,t=JSON.parse(localStorage.getItem("shopping-list"))||[];if(t.some((t=>t._id===e._id))){const n=t.filter((t=>t._id!==e._id));localStorage.setItem("shopping-list",JSON.stringify(n)),document.querySelector(".modal-btn-add").textContent="ADD TO SHOPPING LIST";document.querySelector(".modal-note").textContent=""}else{t.push(e),localStorage.setItem("shopping-list",JSON.stringify(t)),document.querySelector(".modal-btn-add").textContent="REMOVE FROM THE SHOPPING LIST";document.querySelector(".modal-note").textContent="Congratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”."}}else{document.querySelector(".error-message").textContent="Помилка: дані про книгу відсутні."}}!function(){const e=localStorage.getItem("shopping-list");e&&(h=JSON.parse(e))}();function f(e){e.target===u&&e.target!==d&&k()}function y(e){"Escape"===e.key&&k()}function k(){d.classList.add("is-hidden"),u.classList.add("is-hidden"),g(),document.removeEventListener("keydown",y),u.removeEventListener("click",f)}r.addEventListener("click",(function(){k(),g()})),u.addEventListener("click",f),document.addEventListener("keydown",y),s("74Aiq");l=s("d1cSn"),l=s("d1cSn");async function L(){const e=document.querySelector(".books-container"),t=await(0,l.fetchCategoryList)();console.log(t);const n=document.createElement("ul");n.classList.add("list"),n.classList.add("categories-list"),t.forEach((async e=>{const t=document.createElement("li");t.classList.add("category");const o=document.createElement("h3");o.textContent=e.list_name,o.classList.add("category-item"),t.appendChild(o);const s=await(0,l.fetchParticularCategory)(e.list_name);if(s.length>0){const e=document.createElement("ul");e.classList.add("card-set"),e.classList.add("book-list"),s.slice(0,5).forEach((t=>{const n=S(t);e.appendChild(n)})),t.appendChild(e);if(document.querySelectorAll(".card-set-item").forEach((e=>{e.addEventListener("click",(()=>{}))})),s.length>5){const e=document.createElement("button");e.classList.add("btn"),e.textContent="See More",e.classList.add("see-more-button"),t.appendChild(e),e.addEventListener("click",(()=>{const n=t.querySelector(".card-set");s.slice(5).forEach((e=>{const t=S(e);n.appendChild(t)})),e.remove()}))}}else{const e=document.createElement("p");e.textContent="Немає популярних книг для цієї категорії",t.appendChild(e)}n.appendChild(t)})),e.appendChild(n)}function S(e){const t=document.createElement("li");t.classList.add("card-set-item"),t.classList.add("book-item"),t.classList.add("link"),t.dataset.id=`${e._id}`;const n=document.createElement("img");n.src=e.book_image,n.alt=e.title,n.classList.add("book-image"),t.appendChild(n);const o=document.createElement("h4");o.textContent=e.title,o.classList.add("book-title"),o.classList.add("ellipsis"),t.appendChild(o);const s=document.createElement("p");return s.textContent=e.author,s.classList.add("book-author"),s.classList.add("ellipsis"),t.appendChild(s),t}L();document.querySelector(".side-bar");const E=document.querySelector(".side-bar-list"),v=document.querySelector(".books-container"),C=document.querySelector(".best-sellers > h2");!async function(){const e=await(0,l.fetchCategoryList)();E.insertAdjacentHTML("afterbegin",'<li><button class="side-bar-btn current-category" type="button" data-all-categories>All categories</button></li>');document.querySelector("[data-all-categories]").addEventListener("click",L),function(e){const t=e.map((({list_name:e})=>`<li><button type="button" class="side-bar-btn">${e}</button></li>`)).join("");E.insertAdjacentHTML("beforeend",t)}(e)}(),E.addEventListener("click",(function(e){const t=e.target.textContent,n=document.querySelector(".current-category"),o=document.querySelector(".card-set-title"),s=document.createElement("ul");if(s.classList.add("card-set"),s.classList.add("list"),e.currentTarget===e.target)return;C.innerHTML="",v.innerHTML="";const a=t;o.innerHTML=a,async function(e,t){const n=(await(0,l.fetchParticularCategory)(e)).map((({book_image:e,title:t,author:n,_id:o})=>`<li class="card-set-item" data-id="${o}">\n\t <button class="card-set-btn" type="button"><div class="wrapper-img"><img class="card-set-img" src="${e}" alt=""></div>\n\t  <h4 class="card-set-book-title ellipsis">${t}</h4>\n\t  <p class="card-set-author ellipsis">${n}</p></li></button>`)).join("");t.innerHTML=n}(t,s),v.append(s),n&&n.classList.remove("current-category");e.target.classList.add("current-category")})),s("dTazW"),s("8FnLx"),s("d1cSn");(0,s("l4fgP").setActivePage)("home");
//# sourceMappingURL=index.7ace7e46.js.map
