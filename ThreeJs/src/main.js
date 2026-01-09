import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 1;
camera.position.y = 0.2;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.8;
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;
controls.rotateSpeed = 0.5;

let currentBaseColor = "#5B48D9";
let currentLogoImg;
const canvas = document.getElementById("texture-combinator");
const ctx = canvas.getContext("2d");

const logoTexture = new THREE.CanvasTexture(canvas);
logoTexture.flipY = false;
logoTexture.encoding = THREE.sRGBEncoding;

const textureBaseImage = new Image();
textureBaseImage.src = "model/t-shirt/textures/material_0_baseColor.png";
textureBaseImage.onload = () => {
  updateTexture();
};

const loader = new GLTFLoader().setPath("model/t-shirt/");
loader.load("scene.gltf", async (glb) => {
  glb.scene.rotation.y = -Math.PI / 2 + Math.PI / 8;
  glb.scene.traverse((child) => {
    if (child.isMesh) {
      child.material.map = logoTexture;
      child.material.needsUpdate = true;
    }
  });
  scene.add(glb.scene);
});

RectAreaLightUniformsLib.init();

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 10, 0);
directionalLight.lookAt(0, 0, 0);

directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 50;
directionalLight.shadow.camera.left = -10;
directionalLight.shadow.camera.right = 10;
directionalLight.shadow.camera.top = 10;
directionalLight.shadow.camera.bottom = -10;

scene.add(directionalLight);

const environmentLight = new THREE.AmbientLight(0xffffff);
environmentLight.intensity = 0.2;
scene.add(environmentLight);

const rectLight1 = new THREE.RectAreaLight(0xffffff, 5, 4, 10);
rectLight1.position.set(-5, 5, 5);
rectLight1.lookAt(0, 0, 0);
rectLight1.intensity = 0.8;
scene.add(rectLight1);

const rectLight2 = new THREE.RectAreaLight(0xffffff, 5, 4, 10);
rectLight2.position.set(5, -5, -5);
rectLight2.lookAt(0, 0, 0);
rectLight2.intensity = 0.3;
scene.add(rectLight2);

const colorPicker = document.querySelector(".color-picker-input");
const imageLogoInput = document.querySelector(".image-logo-input");

colorPicker.addEventListener("input", (event) => {
  currentBaseColor = event.target.value;
  updateTexture();
  logoTexture.needsUpdate = true;
});

imageLogoInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    currentLogoImg = new Image();
    currentLogoImg.onload = function () {
      updateTexture();
      logoTexture.needsUpdate = true;
    };
    currentLogoImg.src = e.target.result;
  };
  reader.readAsDataURL(file);
});

const toggleBtn = document.querySelector(".toggle-finishings-btn");
const finishingsContainer = document.querySelector(".finishings");

toggleBtn.addEventListener("click", () => {
  finishingsContainer.classList.toggle("collapsed");
});

const toggleTextureBtn = document.querySelector(".toggle-texture-result-btn");
const textureCanvas = document.querySelector("#texture-combinator");

toggleTextureBtn.addEventListener("click", () => {
  textureCanvas.classList.toggle("hidden");
  const isHidden = textureCanvas.classList.contains("hidden");
  toggleTextureBtn.textContent = isHidden
    ? "Muestra la textura combinada"
    : "Oculta la textura combinada";
});

function animate() {
  controls.update();
  const time = Date.now() * 0.0005;
  const radius = 8;
  directionalLight.position.x = Math.cos(time) * radius;
  directionalLight.position.z = Math.sin(time) * radius;
  directionalLight.position.y = 10;
  directionalLight.lookAt(0, 0, 0);
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function updateTexture() {
  ctx.drawImage(textureBaseImage, 0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "multiply";
  ctx.fillStyle = currentBaseColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "source-over";

  if (currentLogoImg) {
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(1, -1);

    const maxWidth = 1000;
    const maxHeight = 1000;
    const imgWidth = currentLogoImg.width;
    const imgHeight = currentLogoImg.height;

    let drawWidth = imgWidth;
    let drawHeight = imgHeight;

    const widthRatio = maxWidth / imgWidth;
    const heightRatio = maxHeight / imgHeight;
    const scale = Math.min(widthRatio, heightRatio);

    drawWidth = imgWidth * scale;
    drawHeight = imgHeight * scale;

    const offsetX = (maxWidth - drawWidth) / 2;
    const offsetY = (maxHeight - drawHeight) / 2;

    ctx.drawImage(
      currentLogoImg,
      canvas.width / 5 + offsetX - 400,
      (canvas.height / 2) * -1 + canvas.height / 2 + offsetY,
      drawWidth,
      drawHeight
    );
    ctx.restore();
  }
}

window.addEventListener("resize", onWindowResize);
