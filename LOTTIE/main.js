import "./style.css";
import lottie from "lottie-web";
import SegmentController from "./segmencontroller";
import FormAnimationController from "./formInteractions";

const animationContainer = document.querySelector("#animation-container");

const animation = lottie.loadAnimation({
  container: animationContainer,
  path: "./interactive_monster.json",
  renderer: "svg",
  autoplay: false, // Changed to false so we can control it manually
  loop: false, // Changed to false, we'll handle looping manually
});

const segmentController = new SegmentController(animation);

const formAnimationController = new FormAnimationController(segmentController);
