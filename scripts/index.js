import { UserInfo } from "./UserInfo.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { Section } from "./Section.js";
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

const popupWithImage = new PopupWithImage(
  "#popup",
  document.querySelector("#popupimg"),
  document.querySelector("#popupCaption")
);

function handleCardClick(name, link) {
  popupWithImage.open({ name, link });
}

let cardSection;

cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card(data.name, data.link, "#cardTemplate");
      return card.generateCard();
    },
  },
  ".elements"
);

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__description",
});

const profilePopup = new PopupWithForm("#popup-profile", (formData) => {
  userInfo.setUserInfo({
    name: formData.name,
    about: formData.about,
  });
});

profilePopup.setEventListeners();

const addPlacePopup = new PopupWithForm("#popup-addpic", (formData) => {
  const newCard = new Card(
    formData["local-name"],
    formData.link,
    "#cardTemplate",
    handleCardClick
  );
  const cardElement = newCard.generateCard();
  cardSection.addItem(cardElement);
});

addPlacePopup.setEventListeners();
