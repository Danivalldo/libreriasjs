import "./SCSS/index.scss";
import tinyColor from "tinycolor2";

const colorPicker = document.querySelector(".color-picker");
const customColorPicker = document.querySelector(".custom-color-picker");

let color = tinyColor("#bada55");

colorPicker.setAttribute("value", color.toHexString());
customColorPicker.style.backgroundColor = color.toHexString();

customColorPicker.addEventListener("click", () => {
  colorPicker.click();
});
colorPicker.addEventListener("change", (event) => {
  color = tinyColor(event.target.value);
  customColorPicker.style.backgroundColor = color.toHexString();
});
