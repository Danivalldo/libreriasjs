import firebaseConfig from "../firebaseConfig";
import { Capacitor } from "@capacitor/core";
import { PushNotifications } from "@capacitor/push-notifications";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

class FirebaseCtrl {
  constructor() {
    this.token = undefined;
    this.onRecieveNotificationCb = undefined;
    this.onErrorCb = undefined;
    this.onGetTokenCb = undefined;
  }
  async initApp() {
    const savedToken = window.localStorage.getItem(
      "libreriasjs-notification-token"
    );
    if (savedToken) {
      if (Capacitor.isNativePlatform()) {
        return this.enableMobileNotifications();
      }
      this.enableWebNotifications();
    }
  }

  async enableWebNotifications() {
    const supported = await isSupported();

    if (!supported && typeof this.onErrorCb === "function") {
      this.onErrorCb(
        "This browser does not support the API's required to use the Firebase SDK"
      );
      return;
    }

    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);

    try {
      this.token = await getToken(messaging, {
        vapidKey:
          "BCXvt8U7Y4HBlhyFVA9WemdDEhatVQFJagusaEon-0ypK2FeJTXf2TVpOO5fbIUSB-fN2YeQEudUvPQ-fe16lI8",
      });
    } catch (err) {
      console.log("An error occurred while retrieving token. ", err);
      if (typeof this.onErrorCb === "function") {
        this.onErrorCb(err.message);
      }
      return;
    }

    if (!this.token) {
      const error =
        "No registration token available. Request permission to generate one.";
      console.log(error);
      if (typeof this.onErrorCb === "function") {
        this.onErrorCb(error);
      }
      return;
    }

    console.log(this.token);
    if (typeof this.onGetTokenCb === "function") {
      window.localStorage.setItem("libreriasjs-notification-token", this.token);
      this.onGetTokenCb(this.token);
    }

    // onMessage(messaging, (notification) => {
    //   console.log("FROM ON MESSAGE", notification);
    //   if (typeof this.onRecieveNotificationCb === "function") {
    //     this.onRecieveNotificationCb(notification);
    //   }
    // });

    navigator.serviceWorker.addEventListener("message", (event) => {
      console.log("FROM ON SERVICEWORKER MESSAGE", event);
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
      if (typeof this.onErrorCb === "function") {
        this.onErrorCb("an error ocurred");
      }
    }

    PushNotifications.addListener("registration", (token) => {
      // console.log("Push registration success, token: " + token.value);
      window.localStorage.setItem(
        "libreriasjs-notification-token",
        token.value
      );
      if (typeof this.onGetTokenCb === "function") {
        this.onGetTokenCb(token.value);
      }
    });

    PushNotifications.addListener("registrationError", (error) => {
      // console.log("Error on registration: ", error);
      if (typeof this.onErrorCb === "function") {
        this.onErrorCb(JSON.stringify(error));
      }
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
      (notificationAction) => {
        console.log("pushNotificationActionPerformed: ", notificationAction);
        if (typeof this.onRecieveNotificationCb === "function") {
          this.onRecieveNotificationCb(notificationAction.notification);
        }
      }
    );
  }

  onGetToken(cb) {
    if (typeof cb === "function") {
      this.onGetTokenCb = cb;
    }
  }

  onRecieveNotification(cb) {
    if (typeof cb === "function") {
      this.onRecieveNotificationCb = cb;
    }
  }

  onError(cb) {
    if (typeof cb === "function") {
      this.onErrorCb = (err) => {
        window.localStorage.removeItem("libreriasjs-notification-token");
        cb(err);
      };
    }
  }
}

export default FirebaseCtrl;
