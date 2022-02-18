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

const getRandomValueInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const addNewImages = () => {
  for (let i = 0; i < 20; i++) {
    const div = document.createElement("div");
    const img = document.createElement("img");
    img.src = `https://picsum.photos/${getRandomValueInRange(
      200,
      500
    )}/${getRandomValueInRange(200, 500)}`;
    img.onload = handleOnLoadImage;
    div.appendChild(img);
    container.appendChild(div);
  }
  window.setTimeout(() => {
    isLoading = false;
  }, 1000);
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
