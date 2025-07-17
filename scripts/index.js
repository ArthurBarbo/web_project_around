import { UserInfo } from "./UserInfo.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { Section } from "./Section.js";
import { Card } from "./Card.js";
import { Api } from "./Api.js";
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

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "79b24936-a205-4985-b1d0-6eeb1d8f406b",
    "Content-type": "application/json",
  },
});

let cardSection;

api
  .getCards()
  .then((res) => res.json())
  .then((data) => {
    cardSection = new Section(
      {
        items: data,
        renderer: (item) => {
          const card = new Card(
            item.name,
            item.link,
            "#cardTemplate",
            handleCardClick,
            () => api.deleteCard(item._id)
          );
          return card.generateCard();
        },
      },
      ".elements"
    );
    cardSection.renderItems();
  })
  .catch((err) => console.error("erro ao buscar Cards:", err));

const popupWithImage = new PopupWithImage(
  "#popup",
  document.querySelector("#popupimg"),
  document.querySelector("#popupCaption")
);
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  console.log("handleCardClick chamada com:", name, link);
  popupWithImage.open({ name, link });
}

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
  api
    .createCard({
      name: formData["local-name"],
      link: formData.link,
      isLiked: false,
    })
    .then((newCard) => {
      const card = new Card(
        newCard.name,
        newCard.link,
        "#cardTemplate",
        handleCardClick,
        () => {
          return api.deleteCard(newCard._id);
        }
      );
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
      addPlacePopup.close();
    })

    .catch((err) => console.error("erro ao criar card", err));
});

addPlacePopup.setEventListeners();
