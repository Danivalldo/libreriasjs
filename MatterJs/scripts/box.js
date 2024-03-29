import { Bodies } from "matter-js";

export const createBox = (x, y, scale = 1) => {
  const box = Bodies.rectangle(x, y, 50 * scale, 50 * scale, {});
  return box;
};
