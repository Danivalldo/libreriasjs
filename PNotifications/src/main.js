import "./style.sass";
import FirebaseCtrl from "./services/FirebaseCtrl";
import createCard from "./services/createCard";

const fireBaseCtrl = new FirebaseCtrl();
const cardsContainer = document.querySelector(".content");
const tokenContainer = document.querySelector("#token-container");

fireBaseCtrl.initApp();

fireBaseCtrl.onError((errorMessage) => {
  tokenContainer.classList.remove("ready");
  tokenContainer.classList.add("active", "error");
  tokenContainer.innerHTML = errorMessage;
});

fireBaseCtrl.onGetToken((token) => {
  tokenContainer.classList.remove("error");
  tokenContainer.classList.add("active", "ready");
  tokenContainer.innerHTML = token;
});

fireBaseCtrl.onRecieveNotification((notificationData) => {
  console.log(notificationData);
  // document.title = notificationData.notification.title;
  const element = createCard(notificationData.data);
  cardsContainer.prepend(element);
  window.setTimeout(() => {
    element.classList.remove("appear");
  }, 500);
});

tokenContainer.addEventListener("click", (event) => {
  if (event.target.tagName.toLowerCase() === "button") {
    fireBaseCtrl.enableWebNotifications();
  }
});
