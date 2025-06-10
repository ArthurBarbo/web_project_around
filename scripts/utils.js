export class Utils {
  constructor({
    form,
    title,
    editname,
    description,
    about,
    popup,
    editprofile,
    addpic,
    photoAdd,
    imageCards,
    zoomImg,
    zoomCaption,
    zoompopup,
  }) {
    this._form = form;
    this._title = title;
    this._editname = editname;
    this._description = description;
    this._about = about;
    this._popup = popup;
    this._editprofile = editprofile;
    this._addpic = addpic;
    this._photoAdd = photoAdd;
    this._imageCards = imageCards;
    this._zoomImg = zoomImg;
    this._zoomCaption = zoomCaption;
    this._zoompopup = zoompopup;

    this.setEventListeners();
  }

  setEventListeners() {
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._title.textContent = this._editname.value;
      this._description.textContent = this._about.value;
      this._popup.classList.add("popup-hidden");
    });

    this._editprofile.addEventListener("click", () => {
      this._editname.value = this._title.textContent;
      this._about.value = this._description.textContent;
      this._popup.classList.remove("popup-hidden");
      this._popup.classList.add("popup");
    });

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

    document.querySelectorAll(".popup").forEach((popup) => {
      popup.addEventListener("click", (event) => {
        if (event.target === event.currentTarget) {
          popup.classList.add("popup-hidden");
        }
      });
    });

    document.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        document.querySelectorAll(".popup").forEach((popup) => {
          if (!popup.classList.contains("popup-hidden")) {
            popup.classList.add("popup-hidden");
          }
        });
      }
    });

    this._addpic.addEventListener("click", () => {
      this._photoAdd.classList.remove("popup-hidden");
    });

    document.querySelectorAll(".elements__remove").forEach((button) => {
      button.addEventListener("click", () => {
        const card = button.closest(".elements__card");
        if (card) card.remove();
      });
    });

    this._imageCards.forEach((img) => {
      img.addEventListener("click", () => {
        this._zoomImg.src = img.src;
        this._zoomImg.alt = img.alt;

        const caption = img
          .closest(".elements__card")
          .querySelector(".elements__text");
        this._zoomCaption.textContent = caption ? caption.textContent : "";
        this._zoompopup.classList.remove("popup-hidden");
      });
    });

    document.querySelectorAll(".elements__like").forEach((button) => {
      button.addEventListener("click", () => {
        button.classList.toggle("elements__like-on");
      });
    });
  }
}
