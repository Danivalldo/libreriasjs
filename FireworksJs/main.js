import "./style.css";
import { Fireworks } from "fireworks-js";

const fireworks = new Fireworks(
  document.querySelector(".fireworks-container"),
  {
    hue: {
      min: 300,
      max: 360,
    },
    rocketsPoint: {
      min: 20,
      max: 80,
    },
    lineWidth: {
      explosion: {
        min: 1,
        max: 3,
      },
      trace: {
        min: 1,
        max: 1,
      },
    },
    intensity: 100,
    explosion: 10,
    traceLength: 1,
  }
);

fireworks.start();
