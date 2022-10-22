import { initializeApp } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";
import admin from "firebase-admin";

class PushNotification {
  constructor() {
    this.credentials = {
      type: process.env.FIREBASE_ADMIN_TYPE,
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      privateKeyId: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n"),
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      clientId: process.env.FIREBASE_ADMIN_CLIENT_ID,
      authUri: process.env.FIREBASE_ADMIN_AUTH_URI,
      tokenUri: process.env.FIREBASE_ADMIN_TOKEN_URI,
      auth_provider_x509_cert_url:
        process.env.FIREBASE_ADMIN_AUTH_PROVIDER_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT_CERT_URL,
    };
    this.app = initializeApp({
      credential: admin.credential.cert(this.credentials),
    });
  }
  async sendMessage(registrationToken, message) {
    const cloudMessageData = {
      ...message,
      token: registrationToken,
    };
    try {
      const response = await getMessaging(this.app).send(cloudMessageData);
      console.log("Successfully sent message:", response);
      return {
        success: true,
        message: "ok",
      };
    } catch (error) {
      console.log("Error sending message:", error);
      return {
        success: false,
        message: error.message,
      };
    }
  }
}

export default PushNotification;
