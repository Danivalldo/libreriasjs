import { CountUp } from "countup.js";
import "./SCSS/index.scss";

const duration = 6;

const stars = new CountUp("count-up-container-top", 7000, {
  prefix: "+ ",
  suffix: " ⭐️",
  duration,
  separator: ".",
});

const users = new CountUp("count-up-container-bottom", 15300, {
  prefix: "+ ",
  suffix: " 💻",
  duration,
  separator: ".",
});

const endContainer = document.querySelector(".end-container");

if (!stars.error && !users.error) {
  stars.start();
  window.setTimeout(() => {
    users.start(() => {
      window.setTimeout(() => {
        endContainer.classList.add("active");
      }, 1000);
    });
  }, (duration * 1000) / 3);
} else {
  console.error(stars.error, users.error);
}
