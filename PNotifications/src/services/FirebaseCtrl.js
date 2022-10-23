import firebaseConfig from "../firebaseConfig";
import { Capacitor } from "@capacitor/core";
import { PushNotifications } from "@capacitor/push-notifications";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

class FirebaseCtrl {
  constructor() {
    this.app = undefined;
    this.token = undefined;
    this.onRecieveNotificationCb = undefined;
  }
  async initApp() {
    if (Capacitor.isNativePlatform()) {
      return this.enableMobileNotifications();
    }
    this.enableWebNotifications();
  }

  async enableWebNotifications() {
    this.app = initializeApp(firebaseConfig);
    const messaging = getMessaging(this.app);

    try {
      this.token = await getToken(messaging, {
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

    // const messaging = getMessaging();
    onMessage(messaging, this.onRecieveNotification);

    navigator.serviceWorker.addEventListener("message", (event) => {
      // console.log("event listener data", event.data);
      if (typeof this.onRecieveNotificationCb === "function") {
        this.onRecieveNotificationCb(event.data);
      }
    });
  }

  async enableMobileNotifications() {
    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    const result = await PushNotifications.requestPermissions();
    if (result.receive === "granted") {
      // Register with Apple / Google to receive push via APNS/FCM
      PushNotifications.register();
    } else {
      // Show some error
      console.log("an error ocurred");
    }

    PushNotifications.addListener("registration", (token) => {
      console.log("Push registration success, token: " + token.value);
    });

    PushNotifications.addListener("registrationError", (error) => {
      console.log("Error on registration: ", error);
    });

    PushNotifications.addListener(
      "pushNotificationReceived",
      (notification) => {
        console.log("Push received: ", notification);
        if (typeof this.onRecieveNotificationCb === "function") {
          this.onRecieveNotificationCb(notification);
        }
      }
    );

    PushNotifications.addListener(
      "pushNotificationActionPerformed",
      (notification) => {
        if (typeof this.onRecieveNotificationCb === "function") {
          this.onRecieveNotificationCb(notification);
        }
      }
    );
  }

  onRecieveNotification(cb) {
    if (typeof cb === "function") {
      this.onRecieveNotificationCb = cb;
    }
  }
}

export default FirebaseCtrl;
