import { passwordStrength } from "check-password-strength";

const stengthContainer = document.querySelector(".password-strength_container");
const containsList = document.querySelectorAll("[data-contains]");

document
  .querySelector('input[name="password"]')
  .addEventListener("keyup", (e) => {
    stengthContainer.classList.remove("level-1", "level-2", "level-3");
    const strength = passwordStrength(e.target.value);
    console.log(strength);
    containsList.forEach((listElement) => {
      listElement.classList.remove("crossed-out");
      switch (listElement.dataset.contains) {
        case "8-chars":
          if (strength.length >= 8) {
            listElement.classList.add("crossed-out");
          }
          break;
        case "special-chars":
          if (strength.contains.includes("symbol")) {
            listElement.classList.add("crossed-out");
          }
          break;
        case "upper-lower-and-num":
          if (
            strength.contains.includes("lowercase") &&
            strength.contains.includes("uppercase") &&
            strength.contains.includes("number")
          ) {
            listElement.classList.add("crossed-out");
          }
          break;
      }
    });
    if (strength.id === 0) {
      return;
    }
    stengthContainer.classList.add(`level-${strength.id}`);
  });
