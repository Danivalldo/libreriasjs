import MiniMasonry from "minimasonry";
import "./SCSS/index.scss";

const container = document.querySelector(".container");
let isLoading = false;

const miniMasonry = new MiniMasonry({
  container,
});

const handleOnLoadImage = () => {
  miniMasonry.layout();
};

const addNewImages = () => {
  console.log("add new images");
  window.setTimeout(() => {
    isLoading = false;
  }, 200);
};

const isScrollNearBottom = () => {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop;
  const clientHeight = document.documentElement.clientHeight;
  return scrollHeight - scrollTop <= clientHeight + 100;
};

window.addEventListener("scroll", () => {
  if (isScrollNearBottom() && !isLoading) {
    isLoading = true;
    addNewImages();
  }
});

container.querySelectorAll("img").forEach((img) => {
  img.addEventListener("load", handleOnLoadImage);
});

console.log("Ready to go!", MiniMasonry);
