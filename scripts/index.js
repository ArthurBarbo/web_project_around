const h1 = document.querySelector("h1");
const editname = document.querySelector("#name");
const h2 = document.querySelector(".profile__description");
const sub = document.querySelector("#For_me");

const editprofile = document.querySelector(".profile__pen");
const editsave = document.querySelector("#save");
const closepopup = document.querySelector("#close");
const popup = document.querySelector(".popup");

editsave.addEventListener("click", function () {
  h1.textContent = editname.value;
  h2.textContent = sub.value;
  popup.classList.add("popup-hidden");
  popup.classList.remove("popup");
});

editprofile.addEventListener("click", function () {
  editname.value = h1.textContent;
  sub.value = h2.textContent;
  popup.classList.remove("popup-hidden");
  popup.classList.add("popup");
});

closepopup.addEventListener("click", function () {
  popup.classList.add("popup-hidden");
  popup.classList.remove("popup");
});
