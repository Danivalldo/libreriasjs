import * as nsfwjs from "nsfwjs";
import Dropzone from "dropzone";
import "./style.css";

const init = async () => {
  const loading = document.querySelector(".loading");
  const mainContainer = document.querySelector(".main");
  const output = document.getElementById("output");
  const previewImage = document.querySelector(".preview-image");

  const model = await nsfwjs.load("./model/quant_mid/", { type: "graph" });

  loading.classList.add("hidden");
  mainContainer.classList.remove("hidden");

  const myDropzone = new Dropzone("#my-form", {
    autoProcessQueue: false,
    autoQueue: false,
    acceptedFiles: "image/*",
    maxFiles: 1,
    disablePreviews: true,
    init: function () {
      this.on("maxfilesexceeded", function (file) {
        this.removeAllFiles();
        this.addFile(file);
      });
    },
  });
  myDropzone.on("addedfile", (file) => {
    previewImage.src = URL.createObjectURL(file);
  });

  previewImage.addEventListener("load", async () => {
    const predictions = await model.classify(previewImage);
    console.log(predictions);
    output.classList.remove("hidden");
    output.innerHTML = `
      <ul>
        ${predictions
          .map((prediction) => {
            return `<li><b>${
              prediction.className
            }</b>: ${prediction.probability.toFixed(5)}</li>`;
          })
          .join("")}
      <ul>
    `;
  });
};

init();
