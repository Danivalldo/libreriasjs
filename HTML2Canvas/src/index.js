import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import "./SASS/index.sass";

const captureBtn = document.querySelector("#capture-btn");
const modal = document.querySelector(".modal");
modal.querySelector(".close-modal-btn").addEventListener("click", () => {
  toggleModal();
});
const canvasContainer = modal.querySelector(".placeholder-canvas");
const selectArea = document.querySelector(".select-area");

const toggleModal = () => {
  if (modal.classList.contains("active")) {
    canvasContainer.innerHTML = "";
    return modal.classList.remove("active");
  }
  modal.classList.add("active");
};

const getAreaById = (areaId) => {
  if (areaId === "fullscreen") {
    return document.body;
  }
  return document.querySelector(`#${areaId}`);
};

const saveImage = () => {
  const canvas = canvasContainer.querySelector("canvas");
  if (!canvas) {
    return;
  }
};

captureBtn.addEventListener("click", async () => {
  let area = getAreaById(selectArea.value);
  const canvas = await html2canvas(area, {
    allowTaint: true,
  });
  canvasContainer.appendChild(canvas);
  toggleModal();
});

console.log("Ready to go!", html2canvas);
