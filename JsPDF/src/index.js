import { jsPDF } from "jspdf";
import "./SCSS/index.scss";

const formCharacterProfile = document.querySelector("#form-character-profile");
const errorMessageContainer = document.querySelector(
  "#error-message-container"
);
const frame = document.querySelector("#frame");

const handleOnSubmitForm = (e) => {
  e.preventDefault();
  try {
    const characterProperties = Array.from(e.target.querySelectorAll("[name]"));
    const characterData = {};
    errorMessageContainer.classList.add("hidden");
    for (let i = 0, j = characterProperties.length; i < j; i++) {
      const field = characterProperties[i];
      const attribute = field.getAttribute("name");
      const value = field.value;
      if (!field.value) {
        throw new Error(`El campo ${attribute} está vacio!`);
      }
      characterData[attribute] = value;
      if (attribute === "type") {
        const option = field.querySelector(`[value=${value}]`);
        characterData[attribute] = {
          name: option.innerHTML,
          image: option.dataset.imageUrl,
        };
      }
    }
    generatePDF(characterData);
  } catch (err) {
    errorMessageContainer.innerHTML = err.message;
    errorMessageContainer.classList.remove("hidden");
  }
};

const generatePDF = (characterData) => {
  const doc = new jsPDF();
  doc.setFontSize(22);
  doc.text(characterData.name, 20, 20);
  doc.setFontSize(15);
  doc.text(characterData.surname, 20, 26);
  doc.addImage(characterData.type.image, "PNG", 5, 0, 50, 50);
  // doc.save();
  frame.src = doc.output("bloburl");
};

formCharacterProfile.addEventListener("submit", handleOnSubmitForm);
