import "./SCSS/index.scss";
import confetti from "canvas-confetti";

const confettiBtn = document.querySelector(".canvas-confetti-btn");
confettiBtn.addEventListener("click", () => {
  confetti();
});
