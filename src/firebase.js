import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBJGsvuu78UWrn5N7Fth4DjsZj71zfqTYk",
  authDomain: "wish-maker-online.firebaseapp.com",
  projectId: "wish-maker-online",
  storageBucket: "wish-maker-online.appspot.com",
  messagingSenderId: "947777112578",
  appId: "1:947777112578:web:7e93156a87bcc5e82cb51b"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
