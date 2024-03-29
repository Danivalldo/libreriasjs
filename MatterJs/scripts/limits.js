import { Composite, Bodies } from "matter-js";

export const createLimits = (width, height) => {
  const ground = Bodies.rectangle(width / 2, height, width, 60, {
    isStatic: true,
  });
  const ceil = Bodies.rectangle(width / 2, 0, width, 60, { isStatic: true });
  const leftWall = Bodies.rectangle(0, height / 2, 60, height, {
    isStatic: true,
  });
  const rightWall = Bodies.rectangle(width, height / 2, 60, height, {
    isStatic: true,
  });

  const limits = Composite.create({
    bodies: [ground, ceil, leftWall, rightWall],
  });

  return limits;
};
