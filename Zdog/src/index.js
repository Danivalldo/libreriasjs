import "./SCSS/index.scss";
import Zdog from "zdog";

const container = document.createElement("canvas");
container.width = 500;
container.height = 500;

container.classList.add("zdog-container");
document.body.appendChild(container);

const colors = {
  blue: "#00dbff",
  black: "#000",
};

const distanceFromCenter = 45;
const wStroke = 8;

const cycleCount = 1000;
let ticker = 0;
let rafId = undefined;

const zDogIcon = new Zdog.Illustration({
  element: container,
  zoom: 1,
  dragRotate: true,
  scale: true,
  rotate: {
    x: 1,
    z: Zdog.TAU / 8,
  },
});

new Zdog.Shape({
  addTo: zDogIcon,
  stroke: 40,
  color: colors.blue,
});

const anchorFaceFront = new Zdog.Anchor({
  addTo: zDogIcon,
  translate: { z: distanceFromCenter },
});

const anchorFaceBack = new Zdog.Anchor({
  addTo: zDogIcon,
  translate: { z: -distanceFromCenter },
});

const anchorFaceTop = new Zdog.Anchor({
  addTo: zDogIcon,
  translate: { y: distanceFromCenter },
});

const anchorFaceLeft = new Zdog.Anchor({
  addTo: zDogIcon,
  translate: { x: distanceFromCenter },
});

const anchorFaceRight = new Zdog.Anchor({
  addTo: zDogIcon,
  translate: { x: -distanceFromCenter },
});

const face = {
  addTo: anchorFaceFront,
  width: 90,
  height: 90,
  stroke: wStroke,
  color: colors.black,
};

new Zdog.Rect({ ...face, addTo: anchorFaceFront });
new Zdog.Rect({ ...face, addTo: anchorFaceBack });
new Zdog.Rect({ ...face, addTo: anchorFaceTop, rotate: { x: Zdog.TAU / 4 } });
new Zdog.Rect({ ...face, addTo: anchorFaceLeft, rotate: { y: Zdog.TAU / 4 } });
new Zdog.Rect({ ...face, addTo: anchorFaceRight, rotate: { y: Zdog.TAU / 4 } });

zDogIcon.updateRenderGraph();

const play = () => {
  const progress = ticker / cycleCount;
  const tween = Zdog.easeInOut(progress % 1, 3);
  zDogIcon.rotate.y = tween * Zdog.TAU;
  zDogIcon.updateRenderGraph();
  ticker++;
  rafId = requestAnimationFrame(play);
};

play();
