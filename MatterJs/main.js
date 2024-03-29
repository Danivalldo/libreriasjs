import "./style.css";
import {
  Engine,
  Render,
  Runner,
  Composite,
  Mouse,
  MouseConstraint,
} from "matter-js";
import createRagDoll from "./scripts/ragdoll";
import { createBall } from "./scripts/ball";
import { createLimits } from "./scripts/limits";
import { createBox } from "./scripts/box";

const width = 1000;
const height = 1000;

const container = document.querySelector("#app");
const engine = Engine.create();
const render = Render.create({
  element: container,
  engine: engine,
  options: {
    width,
    height,
    wireframes: false,
    showVelocity: false,
    showAngleIndicator: false,
  },
});

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

const limits = createLimits(width, height);
const ball = createBall(width / 2, 100, 1);
const ragdoll = createRagDoll(width / 2, 200, 1);
const box = createBox(width / 2, 100, 1);

Composite.add(engine.world, [mouseConstraint, limits, ball, ragdoll, box]);

Render.run(render);
const runner = Runner.create();
Runner.run(runner, engine);
