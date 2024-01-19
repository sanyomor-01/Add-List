//initialize firebase
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL : "https://playground-84180-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const moviesInDB = ref(database,'movies')


const inputField = document.getElementById('input-el')
const addButton = document.getElementById('add-button')

addButton.addEventListener('click', () => {
    let inputValue = inputField.value
    push(moviesInDB, inputValue)
    console.log(`${inputValue} added to database`)
})