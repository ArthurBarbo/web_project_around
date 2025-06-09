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


