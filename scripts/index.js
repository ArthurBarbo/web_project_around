import { Card } from "./Card.js";
import { FormValidator } from "./formValidator.js";
import { PopupManager } from "./utils.js";

const popupManager = new PopupManager({
  form: document.querySelector(".popup__profile"),
  title: document.querySelector("h1"),
  editname: document.querySelector("#name"),
  description: document.querySelector(".profile__description"),
  about: document.querySelector("#about"),
  popup: document.querySelector(".popup"),
  editprofile: document.querySelector(".profile__pen"),
  addpic: document.querySelector(".profile__plus"),
  photoAdd: document.querySelector("#popup-addpic"),
  imageCards: document.querySelectorAll(".elements__image"),
  zoomImg: document.querySelector("#popupimg"),
  zoomCaption: document.querySelector("#popupCaption"),
  zoompopup: document.querySelector("#popup"),
});

// criação de card

const photoAdd = document.querySelector("#popup-addpic");
const zoompopup = document.querySelector("#popup");
const zoomImg = document.querySelector("#popupimg");
const zoomCaption = document.querySelector("#popupCaption");
const imageCards = document.querySelectorAll(".elements__image");
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
