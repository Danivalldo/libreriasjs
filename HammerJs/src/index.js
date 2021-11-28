import "./SCSS/index.scss";
import Hammer from "hammerjs";

let techIndex = 1;

const technologies = [
  "react.svg",
  "angularjs-plain.svg",
  "vuejs.svg",
  "css3-plain.svg",
  "webpack.svg",
  "nodejs.svg",
  "sass.svg",
  "jquery.svg",
  "npm.svg",
];

const lerp = (x, y, a) => x * (1 - a) + y * a;
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x, y, a) => clamp((a - x) / (y - x));
const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));

const activeCard = document.querySelector(".active-card");
const heartIcon = activeCard.querySelector(".heart-icon");
const crossIcon = activeCard.querySelector(".cross-icon");

const pannableCard = new Hammer(activeCard);

pannableCard.on("panstart", () => {
  console.log("panstart");
  activeCard.classList.add("dragging");
});

pannableCard.on("pan", (ev) => {
  const lateralDistance = window.innerWidth / 2;
  const rotation = range(
    -1 * lateralDistance,
    lateralDistance,
    -45,
    45,
    ev.deltaX
  );
  const sizeIconHeart = range(
    -1 * lateralDistance,
    lateralDistance,
    1.6,
    0,
    ev.deltaX
  );
  const sizeIconCross = range(
    -1 * lateralDistance,
    lateralDistance,
    0,
    1.6,
    ev.deltaX
  );
  activeCard.style.transform = `translate3d(${ev.deltaX}px, 0px, 0px) rotate(${rotation}deg)`;
  heartIcon.style.transform = `scale(${sizeIconHeart})`;
  crossIcon.style.transform = `scale(${sizeIconCross})`;
});

const createNewCard = () => {
  if (techIndex > technologies.length - 1) {
    techIndex = 0;
  }
  activeCard
    .querySelector(".logo")
    .setAttribute("src", `imgs/${technologies[techIndex]}`);
  techIndex++;
  activeCard.setAttribute("style", "");
  activeCard.classList.remove("released-out", "accepted", "discarted");
  activeCard.classList.add("recovering");
  window.setTimeout(() => {
    activeCard.classList.remove("recovering");
  }, 150);
};

pannableCard.on("panend", (ev) => {
  const lateralDistance = window.innerWidth / 2;
  activeCard.classList.remove("dragging");

  heartIcon.setAttribute("style", "");
  crossIcon.setAttribute("style", "");

  if (ev.deltaX > lateralDistance * 0.5 || ev.deltaX < lateralDistance * -0.5) {
    activeCard.classList.add("released-out");
    activeCard.classList.add(ev.deltaX > 0 ? "accepted" : "discarted");
    const rotation = range(
      -1 * lateralDistance,
      lateralDistance,
      -45,
      45,
      ev.deltaX
    );
    activeCard.style.transform = `translate3d(${
      ev.deltaX + 100 * (ev.deltaX > 0 ? 1 : -1)
    }px, 0px, 0px) rotate(${rotation + 10 * (ev.deltaX > 0 ? 1 : -1)}deg)`;
    window.setTimeout(() => {
      createNewCard();
    }, 500);
    return;
  }

  activeCard.setAttribute("style", "");
});
