import templateNovelPortion from "./templateNovelPortion";

class UiCtrl {
  constructor() {
    this.body = undefined;
  }
  init() {
    this.body = document.body;
    this.photoUser = document.querySelector(".photo-user");
    this.anonymousLogInBtn = document.querySelector(".anonymous-log-in-btn");
    this.googleLogInBtn = document.querySelector(".google-log-in-btn");
    this.logOutBtn = document.querySelector(".log-out-btn");
    this.novelContainer = document.querySelector(".novel-container");
    this.novelContainer.addEventListener("click", (e) => {
      if (!e.target.classList.contains("delete-btn")) {
        return;
      }
      console.log("delete part");
    });
    this.newNovelPartForm = document.querySelector(".new-novel-part-form");
  }
  showSpinner() {
    this.body.classList.add("logging");
  }
  removeSpinner() {
    this.body.classList.remove("logging");
  }
  showLogin() {
    this.body.classList.remove("logged-in");
    this.updateNovel([]);
    this.removeSpinner();
  }
  removeLogin() {
    this.body.classList.add("logged-in");
  }
  on(domProp, keyEvent, cb) {
    if (!this[domProp]) {
      return;
    }
    this[domProp].addEventListener(keyEvent, cb);
  }
  updateUserImage(image) {
    this.photoUser.setAttribute("src", image);
  }
  updateNovel(novelParts) {
    this.novelContainer.innerHTML = "";
    novelParts.forEach((novelPart) => {
      const div = document.createElement("div");
      div.innerHTML = templateNovelPortion(novelPart);
      this.novelContainer.appendChild(div);
    });
  }
  onClickNovelPartDeleteBtn(_cb) {}
}

export default UiCtrl;
