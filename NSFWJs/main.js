import "./style.css";
import * as nsfwjs from "nsfwjs";

const init = async () => {
  const model = await nsfwjs.load();
  const img = document.getElementById("img");
  img.crossOrigin = "anonymous";
  img.src = "https://source.unsplash.com/random";
  img.onload = async () => {
    const predictions = await model.classify(img);
    console.log(predictions);
    document.getElementById("output").innerText = predictions[0].className;
  };
};

init();
