import FirebaseCtrl from "./scripts/FirebaseCtrl";
import UiCtrl from "./scripts/UiCtrl";
import "./SCSS/index.scss";

const firebaseCtrl = new FirebaseCtrl();
const uiCtrl = new UiCtrl();

window.addEventListener("load", () => {
  firebaseCtrl.initApp();
  uiCtrl.init();
  firebaseCtrl.on("userloginstarted", () => {
    uiCtrl.showSpinner();
  });
  firebaseCtrl.on("userloginended", () => {
    uiCtrl.removeSpinner();
  });
  firebaseCtrl.on("userauthchanged", (user) => {
    if (user) {
      uiCtrl.removeLogin();
      uiCtrl.updateUserImage(user.photoURL || "imgs/space-invaders.svg");
      return;
    }
    uiCtrl.showLogin();
  });
  uiCtrl.on("anonymousLogInBtn", "click", () => {
    firebaseCtrl.logInAnonymously();
  });
  uiCtrl.on("googleLogInBtn", "click", () => {
    firebaseCtrl.logInWithGoogle();
  });
  uiCtrl.on("logOutBtn", "click", () => {
    firebaseCtrl.logOut();
  });
});
