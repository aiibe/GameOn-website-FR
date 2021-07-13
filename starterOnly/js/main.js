const menu = document.querySelector(".nav__menu");
const menuToggler = document.querySelector(".nav__menu-toggle");

// Show/Hide Menu on click
menuToggler.addEventListener("click", () => {
  let defaultClass = "nav__menu";
  menu.className =
    menu.className === defaultClass
      ? `${defaultClass} ${defaultClass}--show` // Show menu
      : defaultClass; // Hide menu default
});
