//#region initialization firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js';
import { getDatabase, ref, push, onValue, set, remove} from 'https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js';

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
const cat = document.querySelector('img')
//#endregion ////////////////////////////////////////////////////////////////////////////////////

function addItemsToUI(inputValue,key) {
  const li = document.createElement("li");
  li.innerText = inputValue;
  li.addEventListener('click',()=>{
    let itemInDB = ref(database, `weight/${key}`)
    remove(itemInDB)
  })
  ul.appendChild(li);
}
function registerItemToDBEvent(){
  const inputValue = input.value;

  //(to the db) (val. of input)
  push(weightDB, inputValue);

  input.value = "";
}
//#region events listeners
btn.addEventListener("click", registerItemToDBEvent);
input.addEventListener('keypress',(e)=>{
  if (e.key === 'Enter'){
    registerItemToDBEvent()
  }
})
cat.addEventListener('dblclick',()=>{
    set(weightDB,'')
})
//#endregion

onValue(weightDB,(data)=>{
  ul.innerHTML = ''
  if (data.val()){
    
    const arr = Object.entries(data.val())
    console.log(arr)
    for(let [key,value] of arr){
      addItemsToUI(value,key)
   
  }
  }

  
})
