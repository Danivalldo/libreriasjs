import FirebaseCtrl from "./scripts/FirebaseCtrl";
import "./SCSS/index.scss";

const firebaseCtrl = new FirebaseCtrl();

window.addEventListener("load", () => {
  firebaseCtrl.initApp();
  document
    .querySelector("#anonymous-log-in-btn")
    .addEventListener("click", () => {
      firebaseCtrl.logInAnonymously();
    });
  document.querySelector("#google-log-in-btn").addEventListener("click", () => {
    firebaseCtrl.logInWithGoogle();
  });
  document.querySelector("#log-out").addEventListener("click", () => {
    firebaseCtrl.logOut();
  });
});
