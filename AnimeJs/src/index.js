import ExpandableCard, { toggleAnimation } from "./ExpandableCard";
import "./SCSS/index.scss";

document
  .querySelector(".animation-switch")
  .addEventListener("change", toggleAnimation);

document.querySelectorAll(".expandable-card").forEach((card) => {
  new ExpandableCard(card);
});
