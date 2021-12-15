import "./SCSS/index.scss";
import p5 from "p5";
import ParticleSystem from "./ParticleSystem";

const containerElement = document.querySelector("#p5-container");

const sketch = (s) => {
  let system;
  s.setup = function () {
    s.createCanvas(containerElement.clientWidth, containerElement.clientHeight);
    s.stroke(255);
    s.fill(255);
    s.frameRate(30);
    system = new ParticleSystem(s);
    system.fillSystem(200);
  };

  s.draw = function () {
    s.background(0);
    system.run();
  };
};

new p5(sketch, containerElement);
