import { jsPDF } from "jspdf";
import "./SCSS/index.scss";

const formCharacterProfile = document.querySelector("#form-character-profile");
const previewBtn = formCharacterProfile.querySelector(".preview-pdf-btn");
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
    generatePDF(characterData, e.isPreview);
  } catch (err) {
    errorMessageContainer.innerHTML = err.message;
    errorMessageContainer.classList.remove("hidden");
  }
};

const generatePDF = (characterData, preview) => {
  const doc = new jsPDF();
  doc.setFontSize(40);
  doc.setFont("helvetica", "bold");
  doc.text(characterData.name, 60, 30);
  doc.setFont("helvetica", "normal");
  doc.text(characterData.surname, 60, 42);
  doc.addImage(characterData.type.image, "PNG", 5, 0, 50, 50);
  doc.setFontSize(20);
  const docWidth = doc.internal.pageSize.getWidth();
  const docHeight = doc.internal.pageSize.getHeight();
  doc.line(0, 60, docWidth, 60);
  doc.setFont("helvetica", "italic");
  const splitDescription = doc.splitTextToSize(
    characterData.description,
    docWidth - 20
  );
  doc.text(splitDescription, 10, 80);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(characterData.type.name, docWidth - 20, 45, { align: "right" });
  doc.line(0, docHeight - 60, docWidth, docHeight - 60);
  doc.text(`Fuerza: `, 10, docHeight - 40);
  doc.text(`Magia: `, 10, docHeight - 30);
  doc.text(`Velocidad: `, 10, docHeight - 20);
  doc.setFont("helvetica", "normal");
  doc.text(`${characterData.strength}`, 50, docHeight - 40);
  doc.text(`${characterData.magic}`, 50, docHeight - 30);
  doc.text(`${characterData.velocity}`, 50, docHeight - 20);

  if (preview) {
    frame.src = doc.output("bloburl");
    return;
  }
  doc.save(`${characterData.name}-${characterData.surname}`);
};

previewBtn.addEventListener("click", () => {
  const event = new Event("submit");
  event.isPreview = true;
  formCharacterProfile.dispatchEvent(event);
});

formCharacterProfile.addEventListener("submit", handleOnSubmitForm);
