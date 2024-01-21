//initialize firebase
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push,onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL : "https://realtime-database-9c889-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database,'shoppingList')


const inputField = document.getElementById('input-el')
const addButton = document.getElementById('add-button')
const shoppingListEl = document.getElementById('shopping-list')

function addListItem(itemValue) {
     shoppingListEl.innerHTML += `<li>${itemValue}</li>`
}
function clearInputField() {
      inputField.value = ''
}
function clearSnapshot() {
    shoppingListEl.innerHTML =""
}
//Updates Item in real time
onValue(shoppingListInDB, function(snapshot) {
    clearSnapshot()
    let itemsArray = Object.values(snapshot.val())

    for(let i = 0; i<itemsArray.length; i++) { 
        addListItem(itemsArray[i])
    }
})


addButton.addEventListener('click', () => {
    let inputValue = inputField.value

    push(shoppingListInDB, inputValue) 

    clearInputField()
})