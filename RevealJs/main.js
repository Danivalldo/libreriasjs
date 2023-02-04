import "./style.sass";
import Reveal from "reveal.js";
import "@lottiefiles/lottie-player";
import Particles from "particlesjs";
import "@google/model-viewer";

const deck = new Reveal({
  hash: true,
  respondToHashChanges: true,
  history: true,
});

let particles = undefined;

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
