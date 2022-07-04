// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  limit,
  orderBy,
  Timestamp,
  doc,
  deleteDoc,
} from "firebase/firestore";

class FirebaseCtrl {
  constructor() {
    this.app = undefined;
    this.analytics = undefined;
    this.auth = undefined;
    this.googleAuthProvider = undefined;
    this.listeners = {};
    this.firebaseConfig = firebaseConfig;
    this.db = undefined;
    this.userID = undefined;
  }
  initApp() {
    this.app = initializeApp(this.firebaseConfig);
    this.analytics = getAnalytics(this.app);
    this.auth = getAuth(this.app);
    this.auth.useDeviceLanguage();
    this.db = getFirestore(this.app);
    this.googleAuthProvider = new GoogleAuthProvider();
    onAuthStateChanged(this.auth, this.onUserLoggedIn.bind(this));
  }
  async logInAnonymously() {
    try {
      if (typeof this.listeners["userloginstarted"] === "function") {
        this.listeners["userloginstarted"]();
      }
      await signInAnonymously(this.auth);
    } catch (error) {
      console.log("error", error);
    } finally {
      if (typeof this.listeners["userloginended"] === "function") {
        this.listeners["userloginended"]();
      }
    }
  }
  async logInWithGoogle() {
    try {
      if (typeof this.listeners["userloginstarted"] === "function") {
        this.listeners["userloginstarted"]();
      }
      const result = await signInWithPopup(this.auth, this.googleAuthProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // const user = result.user;
    } catch (error) {
      console.log(error);
    } finally {
      if (typeof this.listeners["userloginended"] === "function") {
        this.listeners["userloginended"]();
      }
    }
  }
  logOut() {
    this.auth.signOut();
  }
  onUserLoggedIn(user) {
    if (user) {
      console.log(user);
      this.userID = user.uid;
      if (typeof this.listeners["userauthchanged"] === "function") {
        this.listeners["userauthchanged"](user);
      }
      return;
    }
    console.log("User is signed out");
    if (typeof this.listeners["userauthchanged"] === "function") {
      this.listeners["userauthchanged"](null);
    }
  }
  on(eventKey, cb) {
    this.listeners[eventKey] = cb;
  }
  async getNovel() {
    if (!this.db) {
      return;
    }
    // const q = query(collection(this.db, 'collaborative-novel'), where('date', '>=', ))
    const q = query(
      collection(this.db, "collaborative-novel"),
      orderBy("date"),
      limit(10)
    );
    const querySnapshot = await getDocs(q);
    const novel = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      novel.push({
        id: doc.id,
        data: {
          ...data,
          date: data.date.toDate().toLocaleString(),
        },
      });
    });
    return novel;
  }
  async addPartToNovel(pharagraph) {
    if (!this.db || !this.userID) {
      return;
    }
    try {
      const docRef = await addDoc(collection(this.db, "collaborative-novel"), {
        date: Timestamp.fromDate(new Date()),
        pharagraph,
        uid: this.userID,
      });
      return docRef.id;
    } catch (err) {}
  }

  async removeNovelPart(partId) {
    if (!this.db) {
      return;
    }
    await deleteDoc(doc(this.db, "collaborative-novel", partId));
  }
}

export default FirebaseCtrl;
