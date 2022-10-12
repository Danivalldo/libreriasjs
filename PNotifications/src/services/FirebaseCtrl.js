import firebaseConfig from "../firebaseConfig";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

class FirebaseCtrl {
  constructor() {
    this.app = undefined;
    this.messaging = undefined;
    this.token = undefined;
    this.onRecieveNotificationCb = undefined;
  }
  async initApp() {
    this.app = initializeApp(firebaseConfig);
    this.messaging = getMessaging(this.app);

    try {
      this.token = await getToken(this.messaging, {
        vapidKey: import.meta.env.VITE_PUSH_CERTIFICATES_KEY_PAIR,
      });
    } catch (err) {
      console.log("An error occurred while retrieving token. ", err);
    }

    console.log(this.token);

    if (!this.token) {
      // Send the token to your server and update the UI if necessary
      console.log(
        "No registration token available. Request permission to generate one."
      );
      return;
    }

    const messaging = getMessaging();
    onMessage(messaging, this.onRecieveNotification);

    navigator.serviceWorker.addEventListener("message", (event) => {
      console.log("event listener data", event.data);
      if (typeof this.onRecieveNotificationCb === "function") {
        this.onRecieveNotificationCb(event.data.notification);
      }
    });
  }
  onRecieveNotification(cb) {
    //console.log("Message received. ", payload);
    if (typeof cb === "function") {
      this.onRecieveNotificationCb = cb;
    }
  }
}

export default FirebaseCtrl;
