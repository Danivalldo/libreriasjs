import { jsPDF } from "jspdf";
import "./SCSS/index.scss";

const formCharacterProfile = document.querySelector("#form-character-profile");

formCharacterProfile.addEventListener("submit", (e) => {
  e.preventDefault();
  try {
    const characterProperties = Array.from(
      e.target.querySelectorAll("[name]")
    ).map((field) => {
      if (!field.value) {
        throw new Error(`El campo ${field.getAttribute("name")} está vacio!`);
      }
      return {
        attribute: field.getAttribute("name"),
        value: field.value,
      };
    });
    console.log(characterProperties);
  } catch (err) {
    console.log(err);
  }
});
