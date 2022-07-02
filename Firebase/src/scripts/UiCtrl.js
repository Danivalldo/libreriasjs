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
  }
  showSpinner() {
    this.body.classList.add("logging");
  }
  removeSpinner() {
    this.body.classList.remove("logging");
  }
  showLogin() {
    this.body.classList.remove("logged-in");
    this.removeSpinner();
  }
  removeLogin() {
    this.body.classList.add("logged-in");
  }
  on(domProp, keyEvent, cb) {
    this[domProp].addEventListener(keyEvent, cb);
  }
  updateUserImage(image) {
    this.photoUser.setAttribute("src", image);
  }
}

export default UiCtrl;
