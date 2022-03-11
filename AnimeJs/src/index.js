import ExpandableCard from "./ExpandableCard";
import "./SCSS/index.scss";

document.querySelectorAll(".expandable-card").forEach((card) => {
  new ExpandableCard(card);
});
