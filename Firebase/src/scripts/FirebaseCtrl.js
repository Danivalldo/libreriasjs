// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  serverTimestamp,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  limit,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import sanitizeHtml from "sanitize-html";

class FirebaseCtrl {
  constructor() {
    this.app = undefined;
    this.auth = undefined;
    this.googleAuthProvider = undefined;
    this.listeners = {};
    this.db = undefined;
    this.userID = undefined;
  }
  initApp() {
    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
    this.auth.useDeviceLanguage();
    this.db = getFirestore(this.app);
    this.googleAuthProvider = new GoogleAuthProvider();
    onAuthStateChanged(this.auth, this.onAuthChanged.bind(this));
  }

  async logIn(anonymously) {
    try {
      if (typeof this.listeners["userloginstarted"] === "function") {
        this.listeners["userloginstarted"]();
      }
      if (anonymously) {
        await signInAnonymously(this.auth);
      } else {
        await signInWithPopup(this.auth, this.googleAuthProvider);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      if (typeof this.listeners["userloginended"] === "function") {
        this.listeners["userloginended"]();
      }
    }
  }
  logOut() {
    this.auth.signOut();
  }
  onAuthChanged(user) {
    this.userID = user ? user.uid : undefined;
    if (typeof this.listeners["userauthchanged"] === "function") {
      this.listeners["userauthchanged"](user || null);
    }
  }
  on(eventKey, cb) {
    this.listeners[eventKey] = cb;
  }
  async getNovel() {
    if (!this.db) {
      return;
    }
    const q = query(
      collection(this.db, "collaborative-novel"),
      orderBy("date"),
      limit(500)
    );
    const querySnapshot = await getDocs(q);
    const novel = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      novel.push({
        id: doc.id,
        isOwner: data.uid === this.userID,
        canDelete: Date.now() - 1 * 60 * 60 * 1000 <= data.date.toMillis(),
        data: {
          ...data,
          pharagraph: sanitizeHtml(data.pharagraph, { allowedTags: [] }),
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
        date: serverTimestamp(),
        pharagraph: sanitizeHtml(pharagraph, { allowedTags: [] }),
        uid: this.userID,
      });
      return docRef.id;
    } catch (err) {}
  }
  async removeNovelPart(partId) {
    if (!this.db) {
      return;
    }
    try {
      await deleteDoc(doc(this.db, "collaborative-novel", partId));
    } catch (err) {
      console.log(err);
    }
  }
}

export default FirebaseCtrl;
