// Nav Menu
const menu = document.querySelector(".nav__menu");
const menuToggler = document.querySelector(".nav__menu-toggle");

// Show/Hide nav menu on click
menuToggler.addEventListener("click", () => {
  let defaultClass = "nav__menu";
  menu.className =
    menu.className === defaultClass
      ? `${defaultClass} ${defaultClass}--show` // Show menu
      : defaultClass; // Hide menu default
});

// MODAL
const signupButton = document.querySelector(".hero__signup-button");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal__close");

// Open modal form
signupButton.addEventListener(
  "click",
  () => (modal.className = "modal modal--open")
);

// Close modal form
modalClose.addEventListener("click", () => (modal.className = "modal"));

// FORM VALIDATION
const signupForm = document.forms[0];
const fields = [
  "first",
  "last",
  "email",
  "birthdate",
  "quantity",
  "location",
  "checkbox1",
  "checkbox2",
];

class FormValidation {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
  }

  init() {
    this.onSubmit();
    this.onFieldChange();
  }

  onSubmit() {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      let formFields = event.target.elements;
      this.fields.forEach((field) => {
        let currentField = formFields[field];

        // Must pick one location
        if (field === "location") {
          return currentField.value.length === 0
            ? this.manifest(
                currentField[0].parentElement,
                "Vous devez choisir une option."
              )
            : this.manifest(currentField[0].parentElement);
        }

        // Must accept Terms and conditions of use
        if (field === "checkbox1") {
          return !currentField.checked
            ? this.manifest(
                currentField.parentElement,
                "Vous devez vérifier que vous acceptez les termes et conditions."
              )
            : this.manifest(currentField.parentElement);
        }

        this.validateField(currentField);
      });
    });
  }

  onFieldChange() {
    let formFields = this.form.elements;
    this.fields.forEach((field) => {
      let currentField = formFields[field];

      // Attach input event to text, email and number fields
      if (["text", "email", "number"].includes(currentField.type)) {
        currentField.addEventListener("input", () =>
          this.validateField(currentField)
        );
      }

      // Attach change event on date field
      if (currentField.type === "date") {
        currentField.addEventListener("change", () => {
          this.validateField(currentField);
        });
      }
    });
  }

  validateField(field) {
    // Validate text fields
    if (field.type === "text") {
      // Set value to lowercase
      // Remove spaces from both sides
      let value = field.value.toLowerCase().trim();

      // Must have more than 2 characters
      if (value.length <= 2)
        return this.manifest(
          field.parentElement,
          "Veuillez entrer 2 caractères ou plus."
        );

      // Must be alphabetic characters
      const alpha = new RegExp("^[A-zÀ-ú ]+$");
      if (!alpha.test(value))
        return this.manifest(
          field.parentElement,
          "Veuillez entrer que des caractères alphabétiques"
        );

      // Tests passed: Remove any error messages
      this.manifest(field.parentElement);
    }

    // Validate email field
    if (field.type === "email") {
      let value = field.value.toLowerCase().trim();

      // Must have more than 4 characters
      if (value.length === 0)
        return this.manifest(
          field.parentElement,
          "Veuillez entrer votre adresse email"
        );

      // Must match email pattern HTML5 spec
      const emailPattern =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (!emailPattern.test(value))
        return this.manifest(
          field.parentElement,
          "Le format de votre adresse email est invalide"
        );

      // Tests passed: Remove any error messages
      this.manifest(field.parentElement);
    }

    // Validate date field
    if (field.type === "date") {
      // Must not be empty
      if (field.value.trim() === "") {
        return this.manifest(
          field.parentElement,
          "Vous devez entrer votre date de naissance."
        );
      }

      // Matching date pattern YYYY-MM-DD or YYYY-M-D
      const datePattern = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
      if (!datePattern.test(field.value))
        return this.manifest(
          field.parentElement,
          "Le format de date est invalide"
        );

      // Tests passed: Remove any error messages
      this.manifest(field.parentElement);
    }

    // Validate number field
    if (field.type === "number") {
      // Must not be empty
      if (field.value.length === 0) {
        return this.manifest(field.parentElement, "Veuillez entrer un chiffre");
      }

      // Tests passed: Remove any error messages
      this.manifest(field.parentElement);
    }
  }

  // Add error message to targeted node if any message provided
  // Otherwise remove data-error attribute
  manifest(target, message) {
    message
      ? (target.dataset.error = message)
      : target.removeAttribute("data-error");
  }
}

const validation = new FormValidation(signupForm, fields);
validation.init();
