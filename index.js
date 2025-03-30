//#region initialization firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js';
import { getDatabase, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js';

const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  databaseURL: "https://weight-app-7974f-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
const weightDB = ref(database, "weight");

// elements names
const input = document.querySelector("#input");
const btn = document.querySelector("#submit");
const ul = document.querySelector("ul");
//#endregion ////////////////////////////////////////////////////////////////////////////////////

function addItemsToUI(inputValue) {
  const li = document.createElement("li");    
  li.innerText = inputValue;
  ul.appendChild(li);
  console.log(inputValue);
}
btn.addEventListener("click", () => {
    const inputValue = input.value;

    //(to the db) (val. of input)
    push(weightDB, inputValue);

    input.value = "";
});

onValue(weightDB,(data)=>{
  if (!data.val()){
    push(weightDB,'')
  }
  const arr = Object.values(data.val())
  ul.innerHTML = ''
  for(let x of arr){
    addItemsToUI(x)
    console.log(x)
  }
  console.log(arr)
})
