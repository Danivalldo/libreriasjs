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
  firebaseCtrl.on("userauthchanged", async (user) => {
    if (user) {
      uiCtrl.removeLogin();
      uiCtrl.updateUserImage(user.photoURL || "imgs/space-invaders.svg");
      uiCtrl.showSpinner();
      const novel = await firebaseCtrl.getNovel();
      uiCtrl.updateNovel(novel);
      uiCtrl.removeSpinner();
      return;
    }
    uiCtrl.showLogin();
  });
  uiCtrl.on("anonymousLogInBtn", "click", () => {
    firebaseCtrl.logIn(true);
  });
  uiCtrl.on("googleLogInBtn", "click", () => {
    firebaseCtrl.logIn();
  });
  uiCtrl.on("logOutBtn", "click", () => {
    firebaseCtrl.logOut();
  });
  uiCtrl.on("newNovelPartForm", "submit", async (e) => {
    e.preventDefault();
    const textArea = e.target.querySelector("textarea");
    const newParagraph = textArea.value.trim();
    if (!newParagraph) {
      return;
    }
    uiCtrl.showSpinner();
    const response = await firebaseCtrl.addPartToNovel(newParagraph);
    const novel = await firebaseCtrl.getNovel();
    uiCtrl.updateNovel(novel);
    textArea.value = "";
    uiCtrl.removeSpinner();
  });
  uiCtrl.onClickNovelPartDeleteBtn(async (idPart) => {
    uiCtrl.showSpinner();
    await firebaseCtrl.removeNovelPart(idPart);
    const novel = await firebaseCtrl.getNovel();
    uiCtrl.updateNovel(novel);
    uiCtrl.removeSpinner();
  });
});
