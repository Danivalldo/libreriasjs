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
    color: "#ffa500",
  },
};

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

const changeColor = (color) => {
  monster.setAttribute("style", `background-color: ${color}`);
};

const eyesFolder = lilGui.addFolder("Ojos");
const leftEyeFolder = eyesFolder.addFolder("Ojo izquierdo");
const rightEyeFolder = eyesFolder.addFolder("Ojo derecho");

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

const mouthFolder = lilGui.addFolder("Boca");

mouthFolder
  .add(debuggerObject.mouth, "size")
  .name("tamaño")
  .min(0)
  .max(1.5)
  .step(0.001)
  .onChange((size) => {
    onChangeMouth(size);
  });

const cuerpoFolder = lilGui.addFolder("Cuerpo");

cuerpoFolder
  .addColor(debuggerObject.body, "color")
  .name("color")
  .onChange((color) => {
    changeColor(color);
  });
