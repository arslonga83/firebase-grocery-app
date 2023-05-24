import { initializeApp } from "firebase/app"
import { getDatabase, ref, set, push, onValue, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD-tqwCHzsEr7q2-C1fwk0_6qwarFYSj2c",
  authDomain: "realtime-database-64aea.firebaseapp.com",
  databaseURL: "https://realtime-database-64aea-default-rtdb.firebaseio.com",
  projectId: "realtime-database-64aea",
  storageBucket: "realtime-database-64aea.appspot.com",
  messagingSenderId: "1037921196424",
  appId: "1:1037921196424:web:616856c2e93ec7661f423d"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const addBtn = document.getElementById('add-button')
const categoryField = document.getElementById('category')
const inputField = document.getElementById('input-field')

onValue(shoppingListInDB, (snapshot) => {
  if (snapshot.exists()) {
    document.getElementById('list').innerHTML = ''
    const categoriesArray = Object.entries(snapshot.val())
    console.log(categoriesArray)
    for (let c of categoriesArray) {
      const category = c[0]
      const itemsArray = Object.entries(c[1])
      for (let item of itemsArray) {
        const food = item[1]
        const id = item[0] 
        const newEl = document.createElement('li')
        const dltbtn = document.createElement('button')
        dltbtn.id = `delete${id}`
        dltbtn.classList.add(`dlt-btn`)
        dltbtn.textContent = 'DELETE'
        dltbtn.addEventListener('click', (e) => {
          const itemLocation = ref(database, `shoppingList/${category}/${id}`)
          remove(itemLocation)  
        })
        newEl.addEventListener('click', (e) => {
          dltbtn.classList.toggle('show')
        })
        newEl.innerHTML = `${category} - ${food}`
        newEl.append(dltbtn)
        newEl.classList.add(category)
        newEl.id = id
       
      document.getElementById('list').append(newEl)
    }
  }
} else {
  document.getElementById('list').innerHTML = `<p>Empty List</  p>`
}
});

addBtn.addEventListener('click', (e) => {
  const item = inputField.value
  const category = categoryField.value
  inputField.value = ''
  push(ref(database, "shoppingList/" + category), item)
})

