import { initialCards } from "./Card.js";
import { Card } from "./Card.js";
import { FormValidator } from "./formValidator.js";
import { Utils } from "./utils.js";

const utils = new Utils({
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

const photoAdd = document.querySelector("#popup-addpic");

photoAdd.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const imageSrc = document.getElementById("link").value;
  const titleText = document.getElementById("local-name").value;

  const card = new Card(titleText, imageSrc, "#cardTemplate");
  const cardElement = card.generateCard();
  document.querySelector(".elements").prepend(cardElement);

  photoAdd.classList.add("popup-hidden");

  photoAdd.reset();
});

const cardContainer = document.querySelector(".elements");
function renderInitialCards() {
  initialCards.forEach((data) => {
    const card = new Card(data.name, data.link, "#cardTemplate");
    const cardElement = card.generateCard();
    cardContainer.append(cardElement);
  });
}
renderInitialCards();
