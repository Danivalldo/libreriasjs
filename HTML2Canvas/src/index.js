import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import "./SASS/index.sass";

const captureBtn = document.querySelector("#capture-btn");
const modal = document.querySelector(".modal");
const canvasContainer = modal.querySelector(".placeholder-canvas");
const selectArea = document.querySelector(".select-area");

const toggleModal = () => {
  if (modal.classList.contains("active")) {
    canvasContainer.innerHTML = "";
    return modal.classList.remove("active");
  }
  modal.classList.add("active");
};

const saveImage = () => {
  const canvas = canvasContainer.querySelector("canvas");
  if (!canvas) {
    return;
  }
  canvas.toBlob(async (blob) => {
    try {
      await saveAs(blob, `snapshot-${Date.now()}.png`);
    } catch (err) {
      console.log("Error", err);
    }
  });
};

modal.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-modal-btn")) {
    return toggleModal();
  }
  const container = e.target.closest(".card");
  if (!container) {
    return toggleModal();
  }
});

modal.querySelector(".save-snapshot-btn").addEventListener("click", () => {
  saveImage();
});

captureBtn.addEventListener("click", async () => {
  const area =
    selectArea.value === "fullscreen"
      ? document.body
      : document.querySelector(`#${selectArea.value}`);
  const canvas = await html2canvas(area, {
    allowTaint: true,
  });
  canvasContainer.appendChild(canvas);
  toggleModal();
});
