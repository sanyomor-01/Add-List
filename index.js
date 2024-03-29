//initialize firebase
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push,onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL : "https://realtime-database-9c889-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database,'shoppingList')


const inputField = document.getElementById('input-el')
const addButton = document.getElementById('add-button')
const shoppingListEl = document.getElementById('shopping-list')
const errorEl  = document.getElementById("error-message")

//adds item to the database
addButton.addEventListener('click', () => {
    let inputValue = inputField.value
    if (inputValue.trim() === ""){
       errorEl.textContent ="type something to add"
    }else{
            push(shoppingListInDB, inputValue) 

    clearInputField()
    }


})

//Updates Item in real time
onValue(shoppingListInDB, function(snapshot) {
    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())
        clearSnapshot()

        for(let i = 0; i<itemsArray.length; i++) { 

            let currentItem = itemsArray[i]
            let currentItemID =currentItem[0]
            let currentItemValue = currentItem[1]

            addListItem(currentItem)
        }
    }
     else{
        shoppingListEl.innerHTML = 'No item here...yet'
    }
})


function addListItem(items) {
    let itemID = items[0]
    let itemValue = items[1]

    let newEl = document.createElement('li')
    newEl.textContent= itemValue
    shoppingListEl.append(newEl)

    newEl.addEventListener('click', function() {
        let locationInDB = ref(database,`shoppingList/${itemID}`)
        remove(locationInDB)
    })
}



function clearInputField() {
      inputField.value = ''
}

function clearSnapshot() {
    shoppingListEl.innerHTML =""
}