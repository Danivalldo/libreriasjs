import SuperExpressive from "super-expressive";
import confetti from "canvas-confetti";
import "./SCSS/index.scss";

const form = document.querySelector(".main-form");

const userNameRegex = SuperExpressive()
  .startOfInput.between(3, 5)
  .anyOf.range("a", "z")
  .range("0", "9")
  .string("_")
  .string("-")
  .end()
  .endOfInput.toRegex();

//^(?:[A-Za-z0-9][\._]{0,1})+[A-Za-z0-9]@(?:[A-Za-z0-9])+(?:\.{0,1}[A-Za-z0-9]){2}\.[a-z]{2,3}$/
const emailRegex = SuperExpressive()
  .startOfInput.oneOrMore.group.anyOf.range("A", "Z")
  .range("a", "z")
  .range("0", "9")
  .end() //end anyOf
  .between(0, 1)
  .anyOf.string(".")
  .string("_")
  .end() //end anyOf
  .end() //end group
  .anyOf.range("A", "Z")
  .range("a", "z")
  .range("0", "9")
  .end()
  .string("@")
  .oneOrMore.group.anyOf.range("A", "Z")
  .range("a", "z")
  .range("0", "9")
  .end() // end anyOf
  .end() // end group
  .exactly(2)
  .group.between(0, 1)
  .string(".")
  .anyOf.range("A", "Z")
  .range("a", "z")
  .range("0", "9")
  .end()
  .end()
  .string(".")
  .between(2, 3)
  .range("a", "z")
  .endOfInput.toRegex();

//^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$
const paswordRegex = SuperExpressive()
  .startOfInput.assertAhead.zeroOrMore.anyChar.digit.end()
  .assertAhead.zeroOrMore.anyChar.range("a", "z")
  .end()
  .assertAhead.zeroOrMore.anyChar.range("A", "Z")
  .end()
  .assertAhead.zeroOrMore.anyChar.anyOf.range("a", "z")
  .range("A", "Z")
  .end()
  .end()
  .atLeast(8)
  .anyChar.endOfInput.toRegex();

const allRegex = {
  username: userNameRegex,
  email: emailRegex,
  password: paswordRegex,
};

const checkInputByName = (name, value) => {
  const errorContainet = document.querySelector(`.error-${name}`);
  errorContainet.classList.remove("show");
  const passed = allRegex[name].test(value);
  if (!passed) {
    errorContainet.classList.add("show");
  }
  return passed;
};

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("keyup", (e) => {
    const inputName = e.currentTarget.name;
    checkInputByName(inputName, e.currentTarget.value);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let passed = true;
  document.querySelectorAll("input").forEach((input) => {
    passed = checkInputByName(input.name, input.value) && passed;
  });
  if (!passed) {
    return;
  }
  confetti({
    colors: ["#7655cb", "#ec615a"],
    origin: { x: 0 },
    spread: 55,
    angle: 60,
  });
  confetti({
    colors: ["#7655cb", "#ec615a"],
    origin: { x: 1 },
    spread: 55,
    angle: 120,
  });
});
