import FirebaseCtrl from "./scripts/FirebaseCtrl";
import "./SCSS/index.scss";

const firebaseCtrl = new FirebaseCtrl();

window.addEventListener("load", () => {
  firebaseCtrl.initApp();
  firebaseCtrl.on("userloginstarted", () => {
    document.body.classList.add("logging");
  });
  firebaseCtrl.on("userloginended", () => {
    document.body.classList.remove("logging");
  });
  firebaseCtrl.on("userauthchanged", (user) => {
    if (user) {
      document.body.classList.add("logged-in");
      console.log(user);
      return;
    }
    document.body.classList.remove("logged-in");
    document.body.classList.remove("logging");
  });
  document
    .querySelector(".anonymous-log-in-btn")
    .addEventListener("click", () => {
      firebaseCtrl.logInAnonymously();
    });
  document.querySelector(".google-log-in-btn").addEventListener("click", () => {
    firebaseCtrl.logInWithGoogle();
  });
  document.querySelector(".log-out").addEventListener("click", () => {
    firebaseCtrl.logOut();
  });
});
