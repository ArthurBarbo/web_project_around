const form = document.querySelector(".popup__profile");
const title = document.querySelector("h1");
const editname = form.querySelector("#name");
const description = document.querySelector(".profile__description");
const about = form.querySelector("#about");
const editprofile = document.querySelector(".profile__pen");
const popup = document.querySelector(".popup");
const addpic = document.querySelector(".profile__plus");
const photoAdd = document.querySelector("#popup-addpic");
const removephoto = document.querySelectorAll(".elements__remove");
const zoompopup = document.querySelector("#popup");
const zoomImg = document.querySelector("#popupimg");
const zoomCaption = document.querySelector("#popupCaption");
const imageCards = document.querySelectorAll(".elements__image");
const likeBtn = document.querySelectorAll(".elements__like");

/*botao de save*/ form.addEventListener("submit", function (event) {
  event.preventDefault();
  title.textContent = editname.value;
  description.textContent = about.value;
  popup.classList.add("popup-hidden");
});

/* canetinha*/ editprofile.addEventListener("click", function () {
  editname.value = title.textContent;
  about.value = description.textContent;
  popup.classList.remove("popup-hidden");
  popup.classList.add("popup");
});

/*close e reset*/
document
  .querySelectorAll(".popup__close,.popup__close-zoom")
  .forEach((button) => {
    button.addEventListener("click", () => {
      const popup = button.closest(".popup");
      if (popup) {
        popup.classList.add("popup-hidden");

        const form = popup.querySelector("form");
        if (form) {
          form.reset();
          const inputs = form.querySelectorAll("input");
          inputs.forEach((input) => {
            input.classList.remove("popup__input_type_error");
            const errorSpan = form.querySelector(`#${input.id}-error`);
            if (errorSpan) {
              errorSpan.textContent = "";
              errorSpan.classList.remove("popup__error_visible");
            }
          });
        }
      }
    });
  });

// fechar fora do overlay

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", function (event) {
    if (event.target === event.currentTarget) {
      popup.classList.add("popup-hidden");
    }
  });
});

// escape
const popups = document.querySelectorAll(".popup");
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    popups.forEach((popup) => {
      if (!popup.classList.contains("popup-hidden")) {
        popup.classList.add("popup-hidden");
      }
    });
  }
});

/*botao de abrir o adicionar*/

addpic.addEventListener("click", function () {
  photoAdd.classList.remove("popup-hidden");
});

// botões de remover

document.querySelectorAll(".elements__remove").forEach((button) => {
  button.addEventListener("click", function () {
    const card = this.closest(".elements__card");
    if (card) {
      card.remove();
    }
  });
});

// efeitos de zoom

imageCards.forEach((img) => {
  img.addEventListener("click", function () {
    zoomImg.src = img.src;
    zoomImg.alt = img.alt;

    const caption = img
      .closest(".elements__card")
      .querySelector(".elements__text");
    if (caption) {
      zoomCaption.textContent = caption.textContent;
    } else {
      zoomCaption.textContent = "";
    }
    zoompopup.classList.remove("popup-hidden");
  });
});

// botão de like

document.querySelectorAll(".elements__like").forEach((button) => {
  button.addEventListener("click", function () {
    button.classList.toggle("elements__like-on");
  });
});

// criação de card

const newcard = document.getElementById("place");
photoAdd.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const imageSrc = document.getElementById("link").value;
  const titleText = document.getElementById("local-name").value;
  createCard(imageSrc, titleText);
  newcard.reset();
  photoAdd.classList.add("popup-hidden");
});

function createCard(imageSrc, titleText) {
  const template = document.getElementById("cardTemplate");
  const clone = template.content.cloneNode(true);

  const card = clone.querySelector(".elements__card");
  const image = card.querySelector(".elements__image");
  const caption = card.querySelector(".elements__text");
  const like = card.querySelector(".elements__like");
  const remove = card.querySelector(".elements__remove");

  image.src = imageSrc;
  image.alt = titleText;
  caption.textContent = titleText;

  like.addEventListener("click", function () {
    this.classList.toggle("elements__like-on");
  });

  remove.addEventListener("click", function () {
    card.remove();
  });
  image.addEventListener("click", function () {
    zoomImg.src = image.src;
    zoomImg.alt = image.alt;
    zoomCaption.textContent = caption.textContent;
    zoompopup.classList.remove("popup-hidden");
  });

  document.querySelector(".elements").prepend(clone);
}

// Crie a classe Card, que cria um cartão com texto e um link de imagem, de acordo com os seguintes requisitos:
//
// Utiliza os dados do cartão - texto e link para a imagem - e um seletor de elementos de template como parâmetros para o construtor.
// Possui métodos privados para trabalhar com marcação e adicionar ouvintes de eventos.
// Possui métodos privados para cada manipulador de eventos.
// Possui um método público que devolve o elemento do cartão totalmente funcional, preenchido com dados.
// Crie uma instância de classe Card para cada cartão.

class Card {
  constructor(templateSelector, name, linkUrl) {
    this._name = name;
    this._templateSelector = templateSelector;
    this._linkUrl = linkUrl;

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

const initialCards = [
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

initialCards.forEach((card) => {
  createCard(card.link, card.name);
});
