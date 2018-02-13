const whatTodo = document.getElementById('whatTodo');
const newTodo = document.getElementById('newTodo');
const messageBox = document.getElementById('messageBox');

const todoList = document.getElementById('todos');
const doneList = document.getElementById('dones');
const deleteAll = document.getElementById('deleteAll');

const todoArray = [];
const doneArray = [];

/* --------------------------- */
/* ------- ADDA EN TODO ------ */
/* --------------------------- */

newTodo.addEventListener('submit', function(){
    addTodo(event);
})

function addTodo(){

    event.preventDefault();
    const todoValue = whatTodo.value;
    if(todoValue == ""){
        messageBox.innerHTML=`
            <p>DU MATADE INTE IN NÅGOT</p>
        `   
    } else {
        messageBox.innerHTML="";
        todoArray.push(todoValue);
    }
    
    viewTodo();

} 

///---------------------------///

/* ------------------------------ */
/* --------- UTFÖRD TODO -------- */
/* ------------------------------ */

function completeTodo(){
    this.parentElement.remove();
    
    const todoBox = this.parentElement
    const todoBoxParagraph = todoBox.getElementsByTagName('p')[0];
    const value = todoBoxParagraph.textContent;
    doneArray.push(value);
    
    var searchValue = todoArray.indexOf(value);
    if(searchValue == 1){
        todoArray.splice(searchValue, 1)
    }

    viewDones();
}
///------------------------------///

/* ------------------------------ */
/* -------- TA BORT TODO -------- */
/* ------------------------------ */
function remove(){
    this.parentElement.remove();
    
    const todoBox = this.parentElement
    const todoBoxParagraph = todoBox.getElementsByTagName('p')[0];
    const value = todoBoxParagraph.textContent;
    
    var searchValue = todoArray.indexOf(value);
    if(searchValue == 1){
        todoArray.splice(searchValue, 1)
    }
    
}
///------------------------------///

/* ------------------------------ */
/* - TA BORT ALLA TODOS & DONES - */
/* ------------------------------ */

deleteAll.innerHTML=`<p id="deleteTodos">DELETE ALL TODOS</p>
<p id="deleteDones">DELETE ALL DONES</p>`;

const deleteTodos = document.getElementById('deleteTodos');

const deleteDones = document.getElementById('deleteDones');


deleteTodos.addEventListener('click', function(){
    emptyTodos();
})

deleteDones.addEventListener('click', function(){
    emptyDones();
})

function emptyTodos(){

for(var i = todoArray.length; i > 0; i--){
 
 todoArray.pop();
 
} 
    
    viewTodo();
        
}

function emptyDones(){

    for(var i = doneArray.length; i > 0; i--){
 
        doneArray.pop();
 
    } 
    
    viewDones();
        
}
///------------------------------///

/* --------------------------- */
/* -------- VISA TODOS ------- */
/* --------------------------- */

function viewTodo(){

    let myTodos=""; 
    i = 0;

    for (const todos of todoArray){
        myTodos += `
            <div class="todoBox" id=${i++}>
                <p>${todos}</p>
                <button id="todoCompleteButton" class="completeButton">v</button>
                <button id="todoRemoveButton" class="removeButton">x</button>
            </div>
        ` 

    }

    todoList.innerHTML = myTodos;
    
    const completeButton = document.getElementsByClassName('completeButton');
    
    for(i = 0; i < completeButton.length; i++){
        completeButton[i].addEventListener('click', completeTodo)
    }
    
    
    const removeButton = document.getElementsByClassName('removeButton');
    
    for(i = 0; i < removeButton.length; i++){
        removeButton[i].addEventListener('click', remove)
    }
    



}
///---------------------------///

/* --------------------------- */
/* ----- VISA AVKLARADE ------ */
/* --------------------------- */

function viewDones(){
      let myDones=""; 
    i = 0;

    for (const dones of doneArray){
        myDones += `
            <div class="todoBox" id=${i++}>
                <p>${dones}</p>
                <button id="todoRemoveButton" class="removeButton">x</button>
            </div>
        ` 
    }  
    doneList.innerHTML = myDones;

    
    const removeButton = document.getElementsByClassName('removeButton');
    
    for(i = 0; i < removeButton.length; i++){
        removeButton[i].addEventListener('click', remove)
    }
    
}