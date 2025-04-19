//#region elements referents
const input = document.querySelector("#input");
const btn = document.querySelector("#submit");
const ul = document.querySelector("ul");
const cat = document.querySelector("img");
const signInBtn = document.querySelector("#signIn");
const logOutBtn = document.querySelector("#logOut");
//#endregion
import {
  database,
  ref,
  signOut,
  auth,
  onValue,
  remove,
  onAuthStateChanged,
  push,
} from "./initialization.js";
let listDB;

// Add logout functionality
logOutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out:", error);
  }
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user.uid);
    successfullAuth(user.uid);
  } else {
    console.log("No user is signed in.");
  }
});

function successfullAuth(uid) {
  listDB = ref(database, `list/${uid}`);
  console.log("User is signed in:", uid);
  onValue(listDB, (data) => {
    ul.innerHTML = "";
    if (data.val()) {
      const arr = Object.entries(data.val());
      console.log(arr);
      for (let [key, value] of arr) {
        addItemsToUI(value, key);
      }
    }
  });
}
function addItemToDB() {
  const inputValue = input.value;

  //(to the db) (val. of input)
  push(listDB, inputValue);

  input.value = "";
}

btn.addEventListener("click", addItemToDB);

function addItemsToUI(inputValue, key) {
  const li = document.createElement("li");
  li.innerText = inputValue;
  li.addEventListener("click", () => {
    let itemInDB = ref(database, `list/${auth.currentUser.uid}/${key}`);
    remove(itemInDB);
  });
  ul.appendChild(li);
}
