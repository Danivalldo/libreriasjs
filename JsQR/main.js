import "./style.sass";
import QRGenerator from "./services/QRGenerator";
import QRReader from "./services/QRReader";

const input = document.querySelector("input");
const cameraBtn = document.querySelector("#btn-cam");
const qrCanvas = document.querySelector("#qr-canvas");
const camCanvas = document.querySelector("#cam-canvas");
const qrDataContainer = document.querySelector("#qr-data");

const qrGenerator = new QRGenerator(qrCanvas);
const qrReader = new QRReader(camCanvas, qrDataContainer);

input.addEventListener("input", (e) => {
  const text = e.target.value;
  qrGenerator.buildQR(text);
});

qrGenerator.buildQR(input.getAttribute("value"));

cameraBtn.addEventListener("click", async () => {
  qrReader.toggleCamera();
  if (qrReader.getIsCamOpen()) {
    cameraBtn.innerHTML = "Parar cámara";
    return;
  }
  cameraBtn.innerHTML = "Iniciar cámara";
});
