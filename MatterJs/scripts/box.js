import { Bodies, Common } from "matter-js";

export const createBox = (x, y, scale = 1) => {
  const sprite = Common.choose([
    "elementGlass012.png",
    "elementMetal011.png",
    "elementMetal027.png",
    "elementStone011.png",
    "elementWood010.png",
    "elementWood026.png",
  ]);

  const box = Bodies.rectangle(x, y, scale * 65, scale * 65, {
    render: {
      sprite: {
        texture: `./sprites/box/${sprite}`,
        xScale: scale,
        yScale: scale,
      },
    },
  });
  return box;
};
