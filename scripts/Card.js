class Card {
  constructor(name, linkUrl, templateSelector, handleCardClick, onDelete) {
    this._name = name;
    this._linkUrl = linkUrl;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._onDelete = onDelete;
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector);
    return template.content.querySelector(".elements__card").cloneNode(true);
  }

  _handleLike(evt) {
    evt.target.classList.toggle("elements__like-on");
  }

  _handleDelete() {
    this._element.remove();
    this._element = null;
  }

  _setEventListener() {
    this._likeBTN.addEventListener("click", (evt) => this._handleLike(evt));
    this._deleteButton.addEventListener("click", () => {
      if (typeof this._onDelete === "function") {
        this._onDelete()
          .then(() => {
            this._element.remove();
            this._element = null;
          })
          .catch((err) => {
            console.error("erro ao deletar o card", err);
          });
      } else {
        this._element.remove();
        this._element = null;
      }
    });

    this._image.addEventListener("click", () =>
      this._handleCardClick(this._name, this._linkUrl)
    );
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


export { Card };
