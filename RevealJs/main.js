import "./style.sass";
import Reveal from "reveal.js";
import lottie from "lottie-web";
// import Markdown from "reveal.js/plugin/markdown/markdown.esm";
import Notes from "reveal.js/plugin/notes/notes.esm";
import "@google/model-viewer";

const deck = new Reveal({
  plugins: [Notes],
  hash: true,
  respondToHashChanges: true,
  history: true,
  // controlsTutorial: true,
});

lottie.loadAnimation({
  container: document.querySelector(".lottie-container"), // the dom element that will contain the animation
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "lottie-animations/135022-jellyfish.json", // the path to the animation json
});

deck.initialize();
