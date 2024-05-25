const firebaseConfig = {
    apiKey: "AIzaSyAmRMLAih_Gtt_wTkQSCSx6vsQ6Pq2yf50",
    authDomain: "todoapp-3a893.firebaseapp.com",
    databaseURL: "https://todoapp-3a893-default-rtdb.firebaseio.com",
    projectId: "todoapp-3a893",
    storageBucket: "todoapp-3a893.appspot.com",
    messagingSenderId: "817422936766",
    appId: "1:817422936766:web:033d8736aca136fe4dccef"
  };

// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);
var todoList = document.getElementById("list")

firebase.database().ref('todos').on("child_added",function(data){
    todoList.innerHTML += `
     <li> ${data.val().todoVal}
        <button onclick="editItem(this)" id="${data.val().key}">edit</button>
        <button onclick="deleteItem(this)"  id="${data.val().key}">delete</button>
     </li>
    
    `
})

function addTodoItem(){
    var todoInput = document.getElementById("todoInput")
    var id = Date.now().toString(25)

    var todoObj = {
        todoVal : todoInput.value,
        key : id
    }
    
    if(todoInput.value != ""){
        firebase.database().ref("todos/" + todoObj.key).set(todoObj)    
    }

    todoInput.value = ""

}

function deleteAll(){
    firebase.database().ref("todos").remove()
    todoList.innerHTML = ""
}

function deleteItem(e){
    firebase.database().ref("todos/" + e.id).remove()
    e.parentNode.remove() 
}

function editItem(e){
    var newTodoItem = prompt("Enter new Todo item",e.parentNode.firstChild.nodeValue)

    var newTodoObj = {
        todoVal : newTodoItem,
        key : e.id
    }

    firebase.database().ref('todos/' + e.id).set(newTodoObj)

    e.parentNode.firstChild.nodeValue = newTodoItem
    

}