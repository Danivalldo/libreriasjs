import { Composite, Common, Body, Bodies } from "matter-js";

const ground = Bodies.rectangle(400, 610, 810, 60, {
  isStatic: true,
  render: { fillStyle: "red" },
});
const ceil = Bodies.rectangle(400, 0, 810, 60, { isStatic: true });
const leftWall = Bodies.rectangle(0, 400, 60, 810, { isStatic: true });
const rightWall = Bodies.rectangle(800, 400, 60, 810, { isStatic: true });

export const limits = Composite.create({
  bodies: [ground, ceil, leftWall, rightWall],
});

export const updateLimits = (container) => {
  const { clientWidth, clientHeight } = container;
  Body.setPosition(ground, { x: clientWidth / 2, y: clientHeight });
  Body.setVertices(ground, [
    { x: 0, y: 0 },
    { x: clientWidth, y: 0 },
    { x: clientWidth, y: 60 },
    { x: 0, y: 60 },
  ]);

  Body.setPosition(ceil, { x: clientWidth / 2, y: 0 });
  Body.setVertices(ceil, [
    { x: 0, y: 0 },
    { x: clientWidth, y: 0 },
    { x: clientWidth, y: 60 },
    { x: 0, y: 60 },
  ]);

  Body.setPosition(leftWall, { x: 0, y: clientHeight / 2 });
  Body.setVertices(leftWall, [
    { x: 0, y: 0 },
    { x: 60, y: 0 },
    { x: 60, y: clientHeight },
    { x: 0, y: clientHeight },
  ]);

  Body.setPosition(rightWall, { x: clientWidth, y: clientHeight / 2 });
  Body.setVertices(rightWall, [
    { x: 0, y: 0 },
    { x: 60, y: 0 },
    { x: 60, y: clientHeight },
    { x: 0, y: clientHeight },
  ]);
};
