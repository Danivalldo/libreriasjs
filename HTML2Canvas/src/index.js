import html2canvas from "html2canvas";
import "./SASS/index.sass";

const captureBtn = document.querySelector("#capture-btn");

captureBtn.addEventListener("click", async () => {
  const canvas = await html2canvas(document.body, {
    allowTaint: true,
    // useCORS: true,
  });
  console.log(canvas);
  document.body.appendChild(canvas);
});

console.log("Ready to go!", html2canvas);
