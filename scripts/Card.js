class Card {
  constructor(name, linkUrl, templateSelector) {
    this._name = name;
    this._linkUrl = linkUrl;
    this._templateSelector = templateSelector;

    this._zoomPopup = document.querySelector("#popup");
    this._zoomImg = document.querySelector("#popupimg");
    this._zoomCaption = document.querySelector("#popupCaption");
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector);
    const cardElement = template.content
      .querySelector(".elements__card")
      .cloneNode(true);

    return cardElement;
  }
  _handleLike(evt) {
    evt.target.classList.toggle("elements__like-on");
  }
  _handleDelete() {
    this._element.remove();
    this._element = null;
  }
  _handleZoom() {
    this._zoomImg.src = this._linkUrl;
    this._zoomImg.alt = this._name;
    this._zoomCaption.textContent = this._name;
    this._zoomPopup.classList.remove("popup-hidden");
  }
  _setEventListener() {
    this._likeBTN.addEventListener("click", (evt) => this._handleLike(evt));
    this._deleteButton.addEventListener("click", () => this._handleDelete());
    this._image.addEventListener("click", () => this._handleZoom());
  }
  generateCard() {
    this._element = this._getTemplate();
    this._likeBTN = this._element.querySelector(".elements__like");
    this._deleteButton = this._element.querySelector(".elements__remove");
    this._image = this._element.querySelector(".elements__image");

    const caption = this._element.querySelector(".elements__text");

    this._image.src = this._linkUrl;
    this._image.alt = this._name;
    caption.textContent = this._name;

    this._setEventListener();
    return this._element;
  }
}

export const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

export { Card };
