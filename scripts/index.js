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

/*close*/ document
  .querySelectorAll(".popup__close,.popup__close-zoom")
  .forEach((button) => {
    button.addEventListener("click", () => {
      const popup = button.closest(".popup");
      if (popup) {
        popup.classList.add("popup-hidden");
      }
    });
  });

/*botao de abrir o adicionar*/ addpic.addEventListener("click", function () {
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

  document.querySelector(".elements").appendChild(clone);
}
