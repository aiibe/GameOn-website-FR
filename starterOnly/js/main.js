// MENU
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
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    if (modal.className === "modal modal--open") {
      modal.className = "modal";
    }
  }
});

// FORM VALIDATION
class FormValidation {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
  }

  // Initiate listeners
  init() {
    this.onSubmit();
    this.onChange();
  }

  // Add listener on submit
  onSubmit() {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();

      // Validate all fields provided
      let isValid = this.isValid();

      if (isValid) {
        // Create confirmed text message with close modal button
        let closeButton = document.createElement("button");
        closeButton.innerText = "Fermer";
        closeButton.className = "reserve__submit-button";
        closeButton.addEventListener(
          "click",
          () => (modal.className = "modal")
        );

        let confirmTextWrap = document.createElement("div");
        confirmTextWrap.className = "reserve__text-wrap";

        let confirmText = document.createElement("p");
        confirmText.innerText = "Merci ! Votre réservation a été reçue.";
        confirmText.className = "reserve__confirmed-text";

        let confirmBox = document.createElement("div");
        confirmBox.className = "reserve__confirmed";

        confirmTextWrap.appendChild(confirmText);
        confirmBox.appendChild(confirmTextWrap);
        confirmBox.appendChild(closeButton);

        this.form.appendChild(confirmBox);
      }
    });
  }

  // Add listener on input changes
  onChange() {
    this.fields.forEach((name) => {
      const currentField = this.form.elements[name];

      // Runs validation on selective input fields
      const shouldListen = ["text", "email", "date", "number"].includes(
        currentField.type
      );
      if (shouldListen) {
        currentField.addEventListener("input", () => {
          this.validateField(currentField);
        });
      }
    });
  }

  // Validate a field with HTML5 built-in validation
  // Return boolean
  validateField(field) {
    if (field.type === undefined) {
      // Custom validation for radio inputs
      if (field[0].type === "radio") {
        let radioCheck = field.value.trim().length > 0;
        !radioCheck
          ? this.manifest(
              field[0].parentElement,
              "Vous devez choisir une option."
            )
          : this.manifest(field[0].parentElement);
        return radioCheck;
      }
    }

    // HTML5 Built-in form validation
    const { valid, tooShort, valueMissing, typeMismatch, tooLong } =
      field.validity;
    if (!valid) {
      if (field.type === "checkbox") {
        this.manifest(
          field.parentElement,
          "Vous devez vérifier que vous acceptez les termes et conditions."
        );
      }

      if (field.type === "date") {
        if (valueMissing) {
          this.manifest(
            field.parentElement,
            "Vous devez mettre votre date de naissance."
          );
        }
      }

      if (field.type === "number") {
        if (valueMissing) {
          this.manifest(field.parentElement, "Vous devez mettre un chiffre.");
        }
      }

      if (field.type === "text") {
        if (tooShort || valueMissing) {
          this.manifest(
            field.parentElement,
            "Veuillez entrer 2 caractères ou plus."
          );
        }

        if (tooLong)
          this.manifest(
            field.parentElement,
            "Veuillez entrer moins de caractères"
          );
      }

      if (field.type === "email") {
        if (valueMissing)
          this.manifest(
            field.parentElement,
            "Vous devez mettre votre adresse email."
          );
        if (typeMismatch)
          this.manifest(field.parentElement, "Format email incorrecte.");
      }
    } else {
      // Clear error
      this.manifest(field.parentElement);
    }

    return valid;
  }

  // Runs validation on all fields
  isValid() {
    let valid = [];

    this.fields.forEach((name) => {
      let currentField = this.form.elements[name];
      valid.push(this.validateField(currentField));
    });

    // All fields are valid or not
    return valid.length === this.fields.length && !valid.includes(false);
  }

  // Show errors if a message is provided (as second argument)
  // Otherwise, clear error.
  manifest(target, message) {
    message
      ? (target.dataset.error = message)
      : target.removeAttribute("data-error");
  }
}

// Target Form and its fields
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

// Create an instance of our form validation class
// Initiate validation
const validation = new FormValidation(signupForm, fields);
validation.init();
