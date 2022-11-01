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
document.body.appendChild(video);
const qrDataContainer = document.querySelector("#qr-data");

let isCamReady = false;
let isCamOpen = false;
let stream = null;

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
    video.pause();
    stream.getTracks().forEach(function (track) {
      track.stop();
    });
    isCamOpen = false;
    camCanvasCtx.clearRect(0, 0, camCanvas.width, camCanvas.height);
    camCanvas.classList.add("d-none");
    qrDataContainer.innerHTML = "";
    qrDataContainer.classList.remove("has-background-success");
    cameraBtn.innerHTML = "Iniciar cámara";
    return;
  }
  isCamOpen = true;
  cameraBtn.innerHTML = "Parar cámara";
  camCanvas.classList.remove("d-none");
  stream = await navigator.mediaDevices.getUserMedia({
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
    if (!isCamReady) {
      const camSize = video.getBoundingClientRect();
      if (camSize.width && camSize.height) {
        camCanvas.width = camSize.width;
        camCanvas.height = camSize.height;
        isCamReady = true;
      }
    }
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
      qrDataContainer.classList.add("has-background-success");
    } else {
    }
  }
  requestAnimationFrame(tick.bind(this));
};
