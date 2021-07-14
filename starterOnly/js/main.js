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
