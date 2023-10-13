import "./style.scss";
import confetti from "canvas-confetti";
const mainContainer = document.querySelector(".main-container");

let battleMode = false;

mainContainer.addEventListener("pointerdown", (e) => {
  switch (e.target.tagName) {
    case "INPUT":
    case "TEXTAREA":
      enterModeBattle(e.target, e.currentTarget);
      break;
    default:
      leaveModeBattle();
      break;
  }
});

const enterModeBattle = (target, currentTarget) => {
  if (target.type === "submit") {
    return;
  }
  const inputMonster = target.closest(".input-monster");
  if (battleMode) {
    if (!inputMonster.classList.contains("active")) {
      leaveModeBattle();
    }
    return;
  }
  currentTarget.classList.add("battle-mode");
  battleMode = true;
  target
    .closest(".main-container")
    .querySelectorAll(".input-monster")
    .forEach((el) => {
      el.classList.remove("active");
    });
  const sizeContiner = currentTarget.getBoundingClientRect();
  const sizeInput = inputMonster.getBoundingClientRect();
  const posY = sizeContiner.height / 2 - sizeInput.y;
  if (!inputMonster.classList.contains("dead")) {
    inputMonster.style = `transform: 
    translateZ(0px)
    translateY(${posY}px)
    scale(1.2)
    rotateY(0deg);
  `;
  }
  inputMonster.classList.add("active");
};

const leaveModeBattle = () => {
  if (battleMode) {
    document.querySelector(".main-container").classList.remove("battle-mode");
    document.querySelectorAll(".input-monster").forEach((el) => {
      el.classList.remove("active");
      el.style = ``;
    });
    battleMode = false;
    return;
  }
};

const painEffect = (e) => {
  const _currentTarget = e.currentTarget;
  const inputMonster = _currentTarget.closest(".input-monster");
  if (!inputMonster.classList.contains("active")) {
    _currentTarget.value = "";
    e.preventDefault();
    return;
  }
  e.currentTarget.removeEventListener("input", painEffect);

  const prevStyleTransform = inputMonster.style.transform;
  const posY = /translateY\((.+)px\)/.exec(prevStyleTransform)[1];

  inputMonster.style.transform = `scale(1) translateY(${posY}px)`;

  const mouthTarget = inputMonster.querySelector(".mouth-contianer");
  const eyeTarget = inputMonster.querySelector(".eye-contianer");
  const lArmTarget = inputMonster.querySelector(".left-arm-container");
  const rArmTarget = inputMonster.querySelector(".right-arm-container");
  const lifeBar = inputMonster.querySelector(".inner-bar");

  lifeBar.dataset.life = lifeBar.dataset.life || 1;
  lifeBar.dataset.life = lifeBar.dataset.life - 0.05;
  lifeBar.dataset.life = lifeBar.dataset.life < 0 ? 0 : lifeBar.dataset.life;
  lifeBar.style.transform = `scaleX(${lifeBar.dataset.life})`;

  lArmTarget.classList.add("with-pain");
  rArmTarget.classList.add("with-pain");
  mouthTarget.classList.add("with-pain");
  eyeTarget.classList.add("with-pain");

  if (lifeBar.dataset.life <= 0) {
    inputMonster.style = ``;
    inputMonster.classList.add("dead");
    // leaveModeBattle();
    checkBattle();
    return;
  }

  window.setTimeout(() => {
    rArmTarget.classList.remove("with-pain");
    inputMonster.style.transform = prevStyleTransform;
    mouthTarget.classList.remove("with-pain");
    eyeTarget.classList.remove("with-pain");
    lArmTarget.classList.remove("with-pain");
    _currentTarget.addEventListener("input", painEffect);
  }, 150);
};

const checkBattle = () => {
  const monstersLifes = document.querySelectorAll(".inner-bar");
  for (let i = 0, j = monstersLifes.length; i < j; i++) {
    const lifeBar = monstersLifes[i].dataset.life;
    if (!lifeBar || Number(lifeBar) > 0) {
      return;
    }
  }
  const submitBtn = document.querySelector('input[type="submit"]');

  submitBtn.removeAttribute("disabled");
  submitBtn.closest("span").removeAttribute("data-tooltip");
  submitBtn.addEventListener("click", () => {
    console.log("SEND FORM");
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 1 },
      colors: ["FFFFFF", "04d9c4", "16103c"],
    });
  });
};

mainContainer.querySelectorAll("input, textarea").forEach((el) => {
  el.addEventListener("input", painEffect);
});
