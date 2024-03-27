import "./style.css";
import {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  Mouse,
  MouseConstraint,
  Body,
} from "matter-js";
import createRagDoll from "./scripts/ragdoll";
import { limits, updateLimits } from "./scripts/limits";

const container = document.querySelector("#app");
const engine = Engine.create();
const render = Render.create({
  element: container,
  engine: engine,
  options: {
    width: container.clientWidth,
    height: container.clientHeight,
    wireframes: false,
    showVelocity: true,
    showAngleIndicator: true,
    pixelRatio: window.devicePixelRatio,
  },
});

render.bounds.max.x = container.clientWidth;
render.bounds.max.y = container.clientHeight;

const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    // allow bodies on mouse to rotate
    angularStiffness: 0,
    render: {
      visible: true,
    },
  },
});

const circle = Bodies.circle(container.clientWidth / 2, 100, 88, {
  render: {
    sprite: {
      texture: "./sprites/ball.png",
    },
  },
});

let ragdoll = createRagDoll(container.clientWidth / 2, 200, 1);

Composite.add(engine.world, mouseConstraint);
Composite.add(engine.world, [circle, limits, ragdoll]);
updateLimits(container);

Render.run(render);
const runner = Runner.create();
Runner.run(runner, engine);

window.addEventListener("resize", () => {
  updateLimits(container);

  Composite.remove(ragdoll, ragdoll.bodies);
  ragdoll = createRagDoll(container.clientWidth / 2, 100, 1);

  Composite.add(engine.world, ragdoll);

  Body.setPosition(circle, { x: container.clientWidth / 2, y: 50 });

  render.bounds.max.x = container.clientWidth;
  render.bounds.max.y = container.clientHeight;
  render.options.width = container.clientWidth;
  render.options.height = container.clientHeight;
  render.canvas.width = container.clientWidth;
  render.canvas.height = container.clientHeight;
  Render.setPixelRatio(render, window.devicePixelRatio); // added this
});
