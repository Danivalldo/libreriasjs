import "./style.sass";
import Reveal from "reveal.js";
import "@lottiefiles/lottie-player";
import Particles from "particlesjs";
import Notes from "reveal.js/plugin/notes/notes.esm";
import "@google/model-viewer";

let particles = undefined;

const deck = new Reveal({
  plugins: [Notes],
  hash: true,
  respondToHashChanges: true,
  history: true,
});

deck.on("slidechanged", (event) => {
  if (event.indexh === 4 && event.indexv === 1) {
    if (!particles) {
      particles = Particles.init({
        selector: ".background-particles",
        connectParticles: true,
        sizeVariations: 5,
        color: "#1c4f3e",
      });
    } else {
      particles.resumeAnimation();
    }
  } else {
    if (particles) {
      particles.pauseAnimation();
    }
  }
});

deck.initialize();
