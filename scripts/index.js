const form = document.querySelector(".popup__profile");
const title = document.querySelector("h1");
const editname = form.querySelector("#name");
const description = document.querySelector(".profile__description");
const sub = form.querySelector("#For_me");

const editprofile = document.querySelector(".profile__pen");

const closepopup = document.querySelector("#close");
const popup = document.querySelector(".popup");

/*botao de save*/ form.addEventListener("submit", function (event) {
  event.preventDefault();
  title.textContent = editname.value;
  description.textContent = sub.value;
  popup.classList.add("popup-hidden");
  popup.classList.remove("popup");
});

/* canetinha*/ editprofile.addEventListener("click", function () {
  editname.value = title.textContent;
  sub.value = description.textContent;
  popup.classList.remove("popup-hidden");
  popup.classList.add("popup");
});

/*close*/ closepopup.addEventListener("click", function () {
  popup.classList.add("popup-hidden");
  popup.classList.remove("popup");
});
