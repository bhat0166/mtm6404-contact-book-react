import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD_xIasDE7YRnm17YD_n20PkorA6DD0-Ys",
  authDomain: "contact-book-bd33f.firebaseapp.com",
  projectId: "contact-book-bd33f",
  storageBucket: "contact-book-bd33f.firebasestorage.app",
  messagingSenderId: "569649468961",
  appId: "1:569649468961:web:e253a83891b12d43cc3560",
  measurementId: "G-MQDB69GCMD",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
