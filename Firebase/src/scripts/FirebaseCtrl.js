// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

class FirebaseCtrl {
  constructor() {
    this.app = undefined;
    this.analytics = undefined;
    this.auth = undefined;
    this.googleAuthProvider = undefined;
    this.firebaseConfig = {
      apiKey: "AIzaSyBW775zwonhEGUOL6LOnAf90LVepyCkiUA",
      authDomain: "libreriasjs-firebase-demo.firebaseapp.com",
      projectId: "libreriasjs-firebase-demo",
      storageBucket: "libreriasjs-firebase-demo.appspot.com",
      messagingSenderId: "628146334298",
      appId: "1:628146334298:web:4b945e76fc27fd5e374663",
      measurementId: "G-MEEP74XKZJ",
    };
  }
  initApp() {
    this.app = initializeApp(this.firebaseConfig);
    this.analytics = getAnalytics(this.app);
    this.auth = getAuth(this.app);
    this.auth.useDeviceLanguage();
    this.googleAuthProvider = new GoogleAuthProvider();
    onAuthStateChanged(this.auth, this.onUserLoggedIn.bind(this));
  }
  async logInAnonymously() {
    try {
      await signInAnonymously(this.auth);
    } catch (error) {
      console.log("error", error);
    }
  }
  async logInWithGoogle() {
    try {
      const result = await signInWithPopup(this.auth, this.googleAuthProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // const user = result.user;
    } catch (error) {
      console.log(error);
    }
  }
  logOut() {
    this.auth.signOut();
  }
  onUserLoggedIn(user) {
    if (user) {
      console.log(user);
      return;
    }
    console.log("User is signed out");
  }
}

export default FirebaseCtrl;
