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

tokenContainer.addEventListener("click", async (event) => {
  if (event.target.tagName.toLowerCase() !== "button") {
    return;
  }
  const permission = await Notification.requestPermission();
  console.log(permission);
  if (permission !== "granted") {
    console.log("No se ha aceptado el registro de notificaciones");
    return;
  }
  fireBaseCtrl.enableWebNotifications();
});
