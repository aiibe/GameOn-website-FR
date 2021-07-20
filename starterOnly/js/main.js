// MENU
///////////
const menu = document.querySelector(".nav__menu");
const menuToggler = document.querySelector(".nav__menu-toggle");

// Show/hide nav menu on click
menuToggler.addEventListener("click", () => {
  menu.className === "nav__menu"
    ? menu.classList.add("nav__menu--show")
    : menu.classList.remove("nav__menu--show");
});

// MODAL
///////////
const signupButton = document.querySelector(".hero__signup-button");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal__close");

// Open modal form
signupButton.addEventListener("click", () =>
  modal.classList.add("modal--open")
);

// Close modal form on close icon clicked
modalClose.addEventListener("click", () =>
  modal.classList.remove("modal--open")
);

// Close modal form on overlay clicked
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("modal--open");
  }
});

// FORM VALIDATION
/////////////////////
class FormValidation {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
  }

  // Initiate listeners
  run() {
    this.onChange();
  }

  // Add listener on submit
  onSubmit(callback) {
    if (callback) {
      this.form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Validate all fields provided
        let isValid = this.fields.every((name) => {
          let currentField = this.form.elements[name];
          return this.validateField(currentField);
        });

        if (isValid) {
          // Prepare form data
          let formData = new FormData();
          this.fields.forEach((name) => {
            let currentField = this.form.elements[name];
            if (currentField.type === "checkbox") {
              return formData.append(name, currentField.checked);
            }
            formData.append(name, currentField.value);
          });

          // Export form data via callback
          callback(formData);
        }
      });
    }
  }

  // Add listener on input changes
  onChange() {
    this.fields.forEach((name) => {
      const currentField = this.form.elements[name];

      // Runs validation on selective input fields
      const inputs = ["text", "email", "date", "number", "checkbox"];
      const shouldListen = inputs.includes(currentField.type);
      if (shouldListen) {
        currentField.addEventListener("input", () =>
          this.validateField(currentField)
        );
      }
    });
  }

  // Show errors if a message is provided (as second argument)
  // Otherwise, clear error.
  manifest(target, message) {
    message
      ? (target.dataset.error = message)
      : target.removeAttribute("data-error");
  }

  // Validate a field with HTML5 built-in validation
  // Return boolean
  validateField(field) {
    // Catch undefined field type
    if (field.type === undefined) {
      // Check if it contains radio inputs
      // Radio should not be empty
      // At least one option checked
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
      return false;
    }

    // Deconstruct validity methods
    const {
      valid,
      tooShort,
      patternMismatch,
      valueMissing,
      typeMismatch,
      rangeOverflow,
      tooLong,
    } = field.validity;

    // Catch errors for different field types
    // Display error messages accordingly
    if (!valid) {
      // Checkbox
      if (field.type === "checkbox") {
        this.manifest(
          field.parentElement,
          "Vous devez vérifier que vous acceptez les termes et conditions."
        );
      }

      // Date
      if (field.type === "date") {
        if (valueMissing) {
          this.manifest(
            field.parentElement,
            "Vous devez mettre votre date de naissance."
          );
        }
      }

      // Number
      if (field.type === "number") {
        if (valueMissing) {
          this.manifest(field.parentElement, "Vous devez mettre un chiffre.");
        }

        if (rangeOverflow) {
          this.manifest(field.parentElement, "Maximum 500");
        }

        if (rangeUnderflow) {
          this.manifest(field.parentElement, "Minimum 0");
        }
      }

      // Text
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

        if (patternMismatch) {
          this.manifest(field.parentElement, "Format incorrecte.");
        }
      }

      // Email
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

  success(message) {
    // Create confirmed text message with close modal button
    let closeButton = document.createElement("button");
    closeButton.innerText = "Fermer";
    closeButton.className = "reserve__submit-button";
    closeButton.addEventListener("click", () => (modal.className = "modal"));

    let confirmTextWrap = document.createElement("div");
    confirmTextWrap.className = "reserve__text-wrap";

    let confirmText = document.createElement("p");
    confirmText.innerText = message;
    confirmText.className = "reserve__confirmed-text";

    let confirmBox = document.createElement("div");
    confirmBox.className = "reserve__confirmed";

    confirmTextWrap.appendChild(confirmText);
    confirmBox.appendChild(confirmTextWrap);
    confirmBox.appendChild(closeButton);

    this.form.appendChild(confirmBox);
  }
}

// DOM Form and its fields
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

// Create an instance of our form validation
const validation = new FormValidation(signupForm, fields);
validation.run(); // Initiate validation
validation.onSubmit((formData) => {
  if (formData) {
    // Use valid data for API calls here

    // Confirmation
    validation.success("Merci ! Votre réservation a été reçue.");
  }

  // Debug
  console.log(formData, [...formData]);
});
