import "./SCSS/index.scss";
import Hammer from "hammerjs";

const activeCard = document.querySelector(".active-card");
const cardPos = {
  x: 0,
  y: 0,
};

const pannableCard = new Hammer(activeCard);
pannableCard.on("panstart", () => {
  console.log("panstart");
});
pannableCard.on("pan", (ev) => {
  console.log("panning");
  activeCard.style.transform = `translate3d(${
    cardPos.x + ev.deltaX
  }px, 0px, 0px)`;
});
pannableCard.on("panend", (ev) => {
  console.log("panend");
  cardPos.x = cardPos.x + ev.deltaX;
});
