import "./style.sass";
import FirebaseCtrl from "./services/FirebaseCtrl";
import createCard from "./services/createCard";

const fireBaseCtrl = new FirebaseCtrl();
const cardsContainer = document.querySelector(".content");

fireBaseCtrl.initApp();
fireBaseCtrl.onRecieveNotification((notificationData) => {
  console.log(notificationData);
  // document.title = notificationData.notification.title;
  const element = createCard(notificationData.data);
  cardsContainer.prepend(element);
  window.setTimeout(() => {
    element.classList.remove("appear");
  }, 500);
});
