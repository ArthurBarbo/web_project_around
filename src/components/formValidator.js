class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }
  enableValidation() {
    this._toggleButtonState();
    this._setEventListeners();
  }
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorClass);
  }
  _toggleButtonState() {
    const isValid = this._inputList.every((input) => input.validity.valid);
    if (isValid) {
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
      this._submitButton.disabled = false;
    } else {
      this._submitButton.classList.add(this._config.inactiveButtonClass);
      this._submitButton.disabled = true;
    }
  }
}

const validation = {
  inputSelector:" .popup__name, .popup__about, .popup__avatar",
  errorClass: "popup__error_visible",
  inputErrorClass: "popup__input_type_error",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__button_disabled",
};

const profileFormValidator = new FormValidator(
  validation,
  document.querySelector(".popup__profile")
);
profileFormValidator.enableValidation();

const placeFormValidator = new FormValidator(
  validation,
  document.querySelector("#place")
);
placeFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(
  validation,
  document.querySelector(".popup__avatar-form")
);
avatarFormValidator.enableValidation();

export { FormValidator, validation };
