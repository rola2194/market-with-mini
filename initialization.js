import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  push,
  onValue,
  set,
  remove,
} from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyBdeINfTJ0EVvrAmhZeeM_QrGDh3_ghr-I",
  authDomain: "weight-app-7974f.firebaseapp.com",
  databaseURL:
    "https://weight-app-7974f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "weight-app-7974f",
  storageBucket: "weight-app-7974f.firebasestorage.app",
  messagingSenderId: "198768261514",
  appId: "1:198768261514:web:a58c09d51296777654b073",
  measurementId: "G-D34SDD0M35",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const googleProvider = new GoogleAuthProvider();

export {
  ref,
  push,
  onValue,
  set,
  remove,
  database,
  app,
  auth,
  signInAnonymously,
  onAuthStateChanged,
  signOut,
  googleProvider,
  signInWithPopup,
};
