import { Bodies, Common } from "matter-js";

export const createBall = (x, y, scale = 1) => {
  const sprite = Common.choose([
    "elementGlass002.png",
    "elementMetal001.png",
    "elementStone001.png",
    "elementStone004.png",
    "elementWood000.png",
    "elementWood003.png",
  ]);

  const ball = Bodies.circle(x, y, 35 * scale, {
    render: {
      sprite: {
        texture: `./sprites/ball/${sprite}`,
        xScale: scale,
        yScale: scale,
      },
    },
  });
  return ball;
};
