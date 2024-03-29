import { Bodies } from "matter-js";

export const createBall = (x, y, scale = 1) => {
  const ball = Bodies.circle(x, y, scale * 88, {
    render: {
      sprite: {
        texture: "./sprites/ball.png",
        xScale: scale,
        yScale: scale,
      },
    },
  });
  return ball;
};
