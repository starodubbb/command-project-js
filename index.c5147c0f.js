function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},s=t.parcelRequired7c6;null==s&&((s=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var s={id:e,exports:{}};return n[e]=s,t.call(s.exports,s,s.exports),s.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){o[e]=t},t.parcelRequired7c6=s),s("kyEFX").register(JSON.parse('{"7bk21":"index.c5147c0f.js","gIJxI":"pop-up-shop-1.06fa7713.png","hZaf5":"pop-up-shop-2.57ecc8dc.png","3u4at":"pop-up-shop-3.e5effbae.png","W511b":"index.b1e0ec22.js"}')),s("bUb57");var l,a=s("d1cSn");l=new URL(s("kyEFX").resolve("gIJxI"),import.meta.url).toString();var c;c=new URL(s("kyEFX").resolve("hZaf5"),import.meta.url).toString();var i;i=new URL(s("kyEFX").resolve("3u4at"),import.meta.url).toString();const d=document.querySelector(".modal-close-btn"),r=document.querySelector(".modal-window"),u=document.querySelector(".backdrop");let m,p=document.querySelector(".modal-content");document.querySelector(".books-container").addEventListener("click",(function(t){const n=t.target.closest(".book-item");if(!n)return;const o=n.getAttribute("data-id");o&&(console.log("Клік на книзі з ID:",o),async function(t){try{const n=await(0,a.fetchBookById)(t);m=n;const o=(JSON.parse(localStorage.getItem("shopping-list"))||[]).some((e=>e._id===n._id)),s=function(t){const{book_image:n,list_name:o,author:s,description:a,buy_links:d}=t;return`<div class="modal-content">\n      <img class="modal-book-img"\n              src="${n}"\n              alt="Book cover"\n            />\n            <div class="modal-book-descr">\n              <h2 class="modal-book-title">${o}</h2>\n              <h3 class="modal-book-author">${s}</h3>\n\n          <p class="modal-book-review">${a}</p>\n        <ul class="modal-book-list list">\n          <li class="modal-book-el">\n            <a\n              href="${d[0].url}"\n              class="modal-book-link"\n              target="_blank"\n              rel="noopener no-referrer"\n              >\n              <img\n              src="${e(l)}"\n              alt="Buy on Amazon"\n              width="62"\n              height="19"\n              class="modal-book-seller"\n            /></a>\n          </li>\n          <li class="modal-book-el">\n            <a\n              href="${d[1].url}"\n              class="modal-book-link"\n              target="_blank"\n              rel="noopener no-referrer"\n              ><img\n              src="${e(c)}"\n              alt="Buy on Apple"\n              width="33"\n              height="32"\n              class="modal-book-seller"\n            /></a>\n          </li>\n          <li class="modal-book-el">\n            <a\n              href="${d[4].url}"\n              class="modal-book-link"\n              target="_blank"\n              rel="noopener no-referrer"\n            >\n              <img\n\n              src="${e(i)}"\n              alt="Book shop"\n              width="38"\n              height="36"\n              class="modal-book-seller"\n            /></a>\n          </li>\n        </ul>\n      </div>`}(n);p.innerHTML=s,r.classList.remove("is-hidden"),console.log("Модальне вікно відкрито"),u.classList.remove("is-hidden"),r.classList.remove("is-hidden"),document.body.style.overflow="hidden",document.querySelector(".modal-btn-add").textContent="ADD TO SHOPPING LIST",d.addEventListener("click",y),u.addEventListener("click",y),document.addEventListener("keydown",f);const h=document.querySelector(".modal-btn-add");h.addEventListener("click",g);const b=document.querySelector(".modal-note");o?(h.textContent="REMOVE FROM THE SHOPPING LIST",b.textContent="Congratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”."):(h.textContent="ADD TO SHOPPING LIST",b.textContent="")}catch(e){console.error("Помилка завантаження даних книги:",e),m={}}}(o))})),r.addEventListener("click",(e=>{e.stopPropagation()}));let h=[];function b(){document.body.style.overflow="visible"}function g(){if(m){const e=m,t=JSON.parse(localStorage.getItem("shopping-list"))||[];if(t.some((t=>t._id===e._id))){const n=t.filter((t=>t._id!==e._id));localStorage.setItem("shopping-list",JSON.stringify(n)),document.querySelector(".modal-btn-add").textContent="ADD TO SHOPPING LIST";document.querySelector(".modal-note").textContent=""}else{t.push(e),localStorage.setItem("shopping-list",JSON.stringify(t)),document.querySelector(".modal-btn-add").textContent="REMOVE FROM THE SHOPPING LIST";document.querySelector(".modal-note").textContent="Congratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”."}}else console.error("Дані про книгу відсутні.")}!function(){const e=localStorage.getItem("shopping-list");e&&(h=JSON.parse(e))}();function k(e){e.target===u&&e.target!==r&&y()}function f(e){"Escape"===e.key&&y()}function y(){r.classList.add("is-hidden"),u.classList.add("is-hidden"),b(),document.removeEventListener("keydown",f),u.removeEventListener("click",k)}d.addEventListener("click",(function(){y(),b()})),u.addEventListener("click",k),document.addEventListener("keydown",f),s("74Aiq");a=s("d1cSn");document.querySelector(".side-bar");const S=document.querySelector(".side-bar-list"),L=(document.querySelector(".books-container"),document.querySelector(".card-set")),E=document.querySelector(".best-sellers > h2");function v(e){const t=document.createElement("li");t.classList.add("book-item"),t.classList.add("link"),t.dataset.id=`${e._id}`;const n=document.createElement("img");n.src=e.book_image,n.alt=e.title,n.classList.add("book-image"),t.appendChild(n);const o=document.createElement("h4");o.textContent=e.title,o.classList.add("book-title"),o.classList.add("ellipsis"),t.appendChild(o);const s=document.createElement("p");return s.textContent=e.author,s.classList.add("book-author"),s.classList.add("ellipsis"),t.appendChild(s),t}!async function(){const e=await(0,a.fetchCategoryList)();S.insertAdjacentHTML("afterbegin",'<li><button class="side-bar-btn current-category" type="button">All categories</button></li>'),function(e){const t=e.map((({list_name:e})=>`<li><button type="button" class="side-bar-btn">${e}</button></li>`)).join("");S.insertAdjacentHTML("beforeend",t)}(e)}(),S.addEventListener("click",(function(e){const t=e.target.textContent,n=document.querySelector(".categories-list");E.innerHTML="",n.innerHTML="",async function(e){const t=(await(0,a.fetchParticularCategory)(e)).map((({book_image:e,title:t,author:n,_id:o})=>`<li class="card-set-item" data-id="${o}">\n\t <button class="side-bar-btn" type="button"><div class="wrapper-img"><img class="card-set-img" src="${e}" alt=""></div>\n\t  <p class="card-set-title">${t}</p>\n\t  <p class="card-set-author">${n}</p></li></button>`)).join("");L.innerHTML=t}(t)})),s("dTazW"),document.addEventListener("DOMContentLoaded",(function(){const e=document.querySelector(".books-container");fetch("https://books-backend.p.goit.global/books/category-list").then((e=>e.json())).then((t=>{const n=document.createElement("ul");n.classList.add("list"),n.classList.add("categories-list"),t.forEach((e=>{const t=document.createElement("li");t.classList.add("category");const o=document.createElement("h3");o.textContent=e.list_name,o.classList.add("category-item"),t.appendChild(o),fetch(`https://books-backend.p.goit.global/books/category?category=${e.list_name}`).then((e=>e.json())).then((e=>{const n=e;if(n.length>0){const e=document.createElement("ul");e.classList.add("book-list"),n.slice(0,5).forEach((t=>{const n=v(t);e.appendChild(n)})),t.appendChild(e);if(document.querySelectorAll(".book-item").forEach((e=>{e.addEventListener("click",(()=>{}))})),n.length>5){const e=document.createElement("button");e.textContent="See More",e.classList.add("see-more-button"),t.appendChild(e),e.addEventListener("click",(()=>{const o=t.querySelector(".book-list");n.slice(5).forEach((e=>{const t=v(e);o.appendChild(t)})),e.remove()}))}}else{const e=document.createElement("p");e.textContent="Немає популярних книг для цієї категорії",t.appendChild(e)}})).catch((t=>{console.log(`Сталася помилка при отриманні даних для категорії "${e.list_name}" з API:`,t)})),n.appendChild(t)})),e.appendChild(n)})).catch((e=>{console.log("Сталася помилка при отриманні даних з API:",e)}))})),s("8FnLx"),s("d1cSn");(0,s("l4fgP").setActivePage)("home");
//# sourceMappingURL=index.c5147c0f.js.map