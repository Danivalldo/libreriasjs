import "./style.sass";
import qrcode from "qrcode";
import jsQR from "jsqr";

const input = document.querySelector("input");
const cameraBtn = document.querySelector("#btn-cam");
const qrCanvas = document.querySelector("#qr-canvas");
const camCanvas = document.querySelector("#cam-canvas");
const camCanvasCtx = camCanvas.getContext("2d", { willReadFrequently: true });
camCanvasCtx.willReadFrequently = true;
const video = document.createElement("video");
video.classList.add("video-cam");
const qrDataContainer = document.querySelector("#qr-data");

let isCamOpen = false;

input.addEventListener("input", (e) => {
  const text = e.target.value;
  buildQR(text);
});

const buildQR = (text) => {
  qrcode.toCanvas(qrCanvas, text, (err) => {
    if (err) {
      return console.log(err);
    }
  });
};

buildQR("https://libreriasjs.com");

cameraBtn.addEventListener("click", async () => {
  if (isCamOpen) {
    isCamOpen = false;
    return;
  }
  isCamOpen = true;
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment" },
  });
  console.log(stream);
  video.srcObject = stream;
  video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
  video.play();
  requestAnimationFrame(tick);
});

const drawLine = (begin, end, color) => {
  camCanvasCtx.beginPath();
  camCanvasCtx.moveTo(begin.x, begin.y);
  camCanvasCtx.lineTo(end.x, end.y);
  camCanvasCtx.lineWidth = 4;
  camCanvasCtx.strokeStyle = color;
  camCanvasCtx.stroke();
};

const tick = () => {
  if (!isCamOpen) {
    return;
  }
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    console.log(video.getBoundingClientRect());
    camCanvasCtx.drawImage(video, 0, 0, camCanvas.width, camCanvas.height);
    var imageData = camCanvasCtx.getImageData(
      0,
      0,
      camCanvas.width,
      camCanvas.height
    );
    var code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert",
    });
    if (code) {
      drawLine(
        code.location.topLeftCorner,
        code.location.topRightCorner,
        "#FF3B58"
      );
      drawLine(
        code.location.topRightCorner,
        code.location.bottomRightCorner,
        "#FF3B58"
      );
      drawLine(
        code.location.bottomRightCorner,
        code.location.bottomLeftCorner,
        "#FF3B58"
      );
      drawLine(
        code.location.bottomLeftCorner,
        code.location.topLeftCorner,
        "#FF3B58"
      );
      qrDataContainer.innerHTML = code.data;
    } else {
    }
  }
  requestAnimationFrame(tick.bind(this));
};
