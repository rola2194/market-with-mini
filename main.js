import {
  auth,
  signInAnonymously,
  googleProvider,
  signInWithPopup,
  signInWithRedirect,
} from "./initialization.js";
import { onAuthStateChanged } from "firebase/auth";

const loginButton = document.querySelector("button");
const googleLoginButton = document.getElementById("googleLogin");
const initialUI = document.querySelector(".initial-login");
const loggedInUI = document.querySelector(".loggedin");

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    window.user = user.uid;
    initialUI.style.display = "none";
    loggedInUI.style.display = "block";
    console.log("User is signed in:", window.user);
  } else {
    // User is signed out
    window.user = null;
    initialUI.style.display = "block";
    loggedInUI.style.display = "none";
    console.log("User is signed out");
  }
});

loginButton.addEventListener("click", async () => {
  try {
    await signInAnonymously(auth);
  } catch (error) {
    console.error("Error signing in:", error);
  }
});

// Add Google login functionality
googleLoginButton.addEventListener("click", () => {
  signInWithPopup(auth, googleProvider);
});
