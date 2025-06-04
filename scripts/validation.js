const validation = {
  inputSelector: ".popup__name, .popup__about",
  errorClass: "popup__error_visible",
  inputErrorClass: "popup__input_type_error",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__button_disabled",
};

// mostrar erro
function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}
// hide
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
}
// verificando a validação
function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
}
//  input para todos
function enableValidation(formElement, config) {
  const inputs = formElement.querySelectorAll(config.inputSelector);
  const submitButton = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputs, submitButton, config);

  inputs.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputs, submitButton, config);
    });
  });
}

const formElement = document.querySelector(".popup__profile");
enableValidation(formElement, validation);

const addpicForm = document.querySelector("#place");
enableValidation(addpicForm, validation);

function toggleButtonState(inputs, buttonElement, config) {
  const isValid = Array.from(inputs).every((input) => input.validity.valid);
  if (isValid) {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  } else {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  }
}
