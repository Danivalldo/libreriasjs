import SuperExpressive from "super-expressive";
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

//^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$

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
//^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
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

console.log(paswordRegex);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputUserName = e.target.querySelector('[name="username"]');
  // console.log(userNameRegex.test(inputUserName.value));
  const inputEmail = e.target.querySelector('[name="email"]');
  // console.log(emailRegex.test(inputEmail.value));
});
