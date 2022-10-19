import "./style.css";
import FirebaseCtrl from "./services/FirebaseCtrl";

const fireBaseCtrl = new FirebaseCtrl();

fireBaseCtrl.initApp();
fireBaseCtrl.onRecieveNotification((notification) => {
  document.title = notification.title;
  console.log(notification.body);
});
