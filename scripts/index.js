import { UserInfo } from "./UserInfo.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { Section } from "./Section.js";
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
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__description",
});

const token = "79b24936-a205-4985-b1d0-6eeb1d8f406b";
const apiConfig = {
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
};

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

const cardSection = new Section(
  {
    items: [],
    renderer: (data) => {
      const card = new Card(
        data.name,
        data.link,
        "#cardTemplate",
        handleCardClick
      );
      return card.generateCard();
    },
  },
  ".elements"
);
fetch(`${apiConfig.baseUrl}/users/me`, {
  headers: apiConfig.headers,
})
  .then((res) => res.json())
  .then((userData) => {
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
    });
  })
  .catch((err) => {
    console.log("Erro ao buscar dados do usuário:", err);
  });

fetch(`${apiConfig.baseUrl}/cards`, {
  headers: apiConfig.headers,
})
  .then((res) => res.json())
  .then((cardServer) => {
    cardSection._items = cardServer;
    cardSection.renderItems();
  })
  .catch((err) => {
    console.log("Erro ao buscar cartões:", err);
  });

const profilePopup = new PopupWithForm("#popup-profile", (formData) => {
  fetch(`${apiConfig.baseUrl}/users/me`, {
    method: "PATCH",
    headers: {authorization: token,
      "Content-Type":"application/json",
  },
    body: JSON.stringify({
      name: formData.name,
      about: formData.about,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log("Erro ao atualizar perfil. Código de status:", res.status);
      }
    })
    .then((updatedUser) => {
      if (updatedUser) {
        userInfo.setUserInfo({
          name: updatedUser.name,
          about: updatedUser.about,
        });
      }
    })
    .catch((err) => {
      console.log("Erro na requisição:", err);
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
