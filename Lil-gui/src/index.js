import "./SCSS/index.scss";
import GUI from "lil-gui";

const monster = document.querySelector(".monster");
const lilGui = new GUI();

const debuggerObject = {
  eyes: {
    eyeLeft: {
      size: 60,
      pupilleSize: 50,
    },
    eyeRight: {
      size: 60,
      pupilleSize: 50,
    },
  },
  mouth: {
    size: 1,
  },
  body: {
    sizeX: 1,
    sizeY: 1,
    color: "#ffa500",
  },
};

const eyesFolder = lilGui.addFolder("Ojos");
const leftEyeFolder = eyesFolder.addFolder("Ojo izquierdo");
const rightEyeFolder = eyesFolder.addFolder("Ojo derecho");
const mouthFolder = lilGui.addFolder("Boca");
const bodyFolder = lilGui.addFolder("Cuerpo");

const onChangeEye = (eye, size) => {
  const eyeDom = monster.querySelector(eye);
  eyeDom.setAttribute("style", `width: ${size}px; height: ${size}px`);
};

const onChangePupille = (pupille, size) => {
  const pupilleDom = monster.querySelector(pupille);
  pupilleDom.setAttribute("style", `width: ${size}px; height: ${size}px`);
};

const onChangeMouth = (size) => {
  const mouthDom = monster.querySelector(".mouth");
  mouthDom.setAttribute("style", `transform: scale(${size})`);
};

const onChangeColor = (color) => {
  monster.style.backgroundColor = color;
};

const onChangeBodySize = (dimention, value) => {
  switch (dimention) {
    case "width":
      monster.style.transform = `scaleX(${value}) scaleY(${debuggerObject.body.sizeY})`;
      return;
    case "height":
      monster.style.transform = `scaleX(${debuggerObject.body.sizeX}) scaleY(${value})`;
  }
};

leftEyeFolder
  .add(debuggerObject.eyes.eyeLeft, "size")
  .name("tamaño ojo")
  .min(1)
  .max(100)
  .onChange((size) => {
    onChangeEye(".eye-left", size);
  });
leftEyeFolder
  .add(debuggerObject.eyes.eyeLeft, "pupilleSize")
  .name("tamaño pupila")
  .min(1)
  .max(100)
  .onChange((size) => {
    onChangePupille(".eye-left > .eye-pupille", size);
  });
rightEyeFolder
  .add(debuggerObject.eyes.eyeRight, "size")
  .name("tamaño ojo")
  .min(1)
  .max(100)
  .onChange((size) => {
    onChangeEye(".eye-right", size);
  });
rightEyeFolder
  .add(debuggerObject.eyes.eyeRight, "pupilleSize")
  .name("tamaño pupila")
  .min(1)
  .max(100)
  .onChange((size) => {
    onChangePupille(".eye-right > .eye-pupille", size);
  });

mouthFolder
  .add(debuggerObject.mouth, "size")
  .name("tamaño")
  .min(0)
  .max(1.5)
  .step(0.001)
  .onChange((size) => {
    onChangeMouth(size);
  });

bodyFolder
  .addColor(debuggerObject.body, "color")
  .name("color")
  .onChange((color) => {
    onChangeColor(color);
  });

bodyFolder
  .add(debuggerObject.body, "sizeX")
  .name("ancho")
  .min(0.2)
  .max(1.5)
  .onChange((width) => {
    onChangeBodySize("width", width);
  });

bodyFolder
  .add(debuggerObject.body, "sizeY")
  .name("alto")
  .min(0.2)
  .max(1.5)
  .onChange((height) => {
    onChangeBodySize("height", height);
  });
