import "./SCSS/index.scss";
import Painter from "./scripts/Painter";
import { saveAs } from "file-saver";

window.addEventListener("load", () => {
  const slider = document.querySelector('input[type="range"]');
  const colorPicker = document.querySelector('input[type="color"]');
  const nameField = document.querySelector(".file-name-field");
  const saveBtn = document.querySelector("button");

  const painter = new Painter(document.querySelector(".painter-container"), {
    lineWidth: slider.value,
    color: colorPicker.value,
  });

  slider.addEventListener("change", (e) => {
    painter.updateBrush(null, e.target.value);
  });
  colorPicker.addEventListener("change", (e) => {
    painter.updateBrush(e.target.value);
  });

  saveBtn.addEventListener("click", () => {
    const fileName = nameField.value;
    if (!fileName) {
      alert("Necesitas darle un nombre a la imagen");
      return;
    }
    painter.getCanvas().toBlob((blob) => {
      saveAs(blob, `${fileName}.png`);
      nameField.setAttribute("value", "");
    });
  });
});
