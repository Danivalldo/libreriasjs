import MiniMasonry from "minimasonry";
import "./SCSS/index.scss";

const container = document.querySelector(".container");

const miniMasonry = new MiniMasonry({
  container,
});

container.querySelectorAll("img").forEach((img) => {
  img.addEventListener("load", () => {
    miniMasonry.layout();
  });
});

console.log("Ready to go!", MiniMasonry);
