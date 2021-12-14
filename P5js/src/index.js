import "./SCSS/index.scss";
import p5 from "p5";

const containerElement = document.querySelector("#p5-container");

const sketch = (p) => {
  let x = 100;
  let y = 100;

  const { setup, createCanvas, draw, background, fill, rect } = p;

  p.setup = function () {
    p.createCanvas(800, 400);
  };

  p.draw = function () {
    p.background(0);
    p.fill(255);
    p.rect(x, y, 50, 50);
  };
};

new p5(sketch, containerElement);
