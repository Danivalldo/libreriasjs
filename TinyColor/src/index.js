import "./SCSS/index.scss";
import tinyColor from "tinycolor2";

const colorPicker = document.querySelector(".color-picker");
const customColorPicker = document.querySelector(".custom-color-picker");
const triadContainer = document.querySelector(".triad-container");
const tetradContainer = document.querySelector(".tetrad-container");
const monochromaticContainer = document.querySelector(
  ".monochromatic-container"
);
const analogousContainer = document.querySelector(".analogous-container");
const complementsContainer = document.querySelector(".complements-container");

let color = tinyColor(tinyColor.random());

const applyColorsToContainer = (container, colors, borderColor) => {
  container.innerHTML = "";
  colors.map((color) => {
    const colorElement = document.createElement("div");
    const labelElement = document.createElement("span");
    labelElement.classList.add("color-label");
    labelElement.innerText = color.toHexString();
    colorElement.classList.add("color-block");
    colorElement.style.borderColor = borderColor.toHexString();
    colorElement.style.backgroundColor = color.toHexString();
    const labelColor = color.clone();
    labelElement.style.color = labelColor.isDark()
      ? labelColor.brighten(30).toHexString()
      : labelColor.darken(30).toHexString();
    container.appendChild(colorElement);
    colorElement.appendChild(labelElement);
  });
};

const onChangeMainColor = (_color) => {
  const color = tinyColor(_color);
  const fontColor = color.clone();
  if (fontColor.isDark()) {
    fontColor.brighten(50);
  } else {
    fontColor.darken(50);
  }

  customColorPicker.style.backgroundColor = color.toHexString();
  customColorPicker.style.borderColor = fontColor.toHexString();
  document.body.style.backgroundColor = color.toHexString();
  document.body.style.color = fontColor.toHexString();

  applyColorsToContainer(triadContainer, color.triad(), fontColor);
  applyColorsToContainer(tetradContainer, color.tetrad(), fontColor);
  applyColorsToContainer(
    monochromaticContainer,
    color.monochromatic(),
    fontColor
  );
  applyColorsToContainer(analogousContainer, color.analogous(), fontColor);
  applyColorsToContainer(
    complementsContainer,
    color.splitcomplement(),
    fontColor
  );
};

colorPicker.setAttribute("value", color.toHexString());
onChangeMainColor(color.toHexString());

customColorPicker.addEventListener("click", () => {
  colorPicker.click();
});
colorPicker.addEventListener("change", (event) => {
  onChangeMainColor(event.target.value);
});
