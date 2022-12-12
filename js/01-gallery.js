import { galleryItems } from "./gallery-items.js";
// Change code below this line

//Crate && render gallery
const cardContainer = document.querySelector(".gallery");
cardContainer.insertAdjacentHTML("afterbegin", createCardsMarkup(galleryItems));
function createCardsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `  
        <div class="gallery__item">
            <a class="gallery__link" href="#">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </div>`;
    })
    .join("");
}

// //modalWidow
cardContainer.addEventListener("click", modalWindow);
function modalWindow(e) {
  e.preventDefault();
  const instance = basicLightbox.create(`
  <div class="modal">
  <img src="${e.target.dataset.source}" width="800" height="600">
  </div>`);
  instance.show();

  const modalPicture = document.querySelector(".modal");
  modalPicture.addEventListener("click", closeModalWindow);
  function closeModalWindow(evt) {
    evt.preventDefault();
    instance.close();
    window.removeEventListener("keydown", usingEscape);
    window.removeEventListener("click", closeModalWindow);
  }
  window.addEventListener("keydown", usingEscape);
  function usingEscape(e) {
    if (!basicLightbox.visible()) {
      return;
    }
    if (e.key === "Escape" || e.key === "Esc") {
      e.preventDefault();
      instance.close();
      window.removeEventListener("keydown", usingEscape);
      window.removeEventListener("click", closeModalWindow);
    }
  }
}
