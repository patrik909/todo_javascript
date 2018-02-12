const whatTodo = document.getElementById('whatTodo');
const newTodo = document.getElementById('newTodo');

const todoList = document.getElementById('todos');
const doneList = document.getElementById('dones');

const todoArray = [];
//const doneArray = ["Volvo", "Villa", "Fru", "Vovve"];

/* FÖR ATT KOLLA OM strängen finns
var exists = todoArray.includes('en sträng');

if(exists == true){
    console.log("YES")
} else {
    console.log("NO")
} */

/* --------------------------- */
/* ------- ADDA EN TODO ------ */
/* --------------------------- */

newTodo.addEventListener('submit', addTodo)
// antaingen göra en funktion som lägger till det senaste som lagts till i arrayen till loopen, just nu appendas allt om och om igen.
function addTodo(event){
    event.preventDefault();
    todovalue = whatTodo.value;
    todoArray.push(todovalue);
    console.log(todoArray);
    viewTodo();
}


/* --------------------------- */
/* -------- VISA TODOS ------- */
/* --------------------------- */

function viewTodo(){

    let myTodos="";

    for (const todos of todoArray){
        myTodos += `
            <div class="todoBox">
            <p>${todos}</p>
            <button id="todoCompleteButton" class="completeButton">v</button>
            <button id="todoRemoveButton" class="removeButton">x</button>
            </div>
        ` 
    }

    todoList.innerHTML = myTodos; 

}

viewTodo();

///---------------------------///

 /* KNAPP FÖR ATT TA BORT ALLA TODOS */

////----------------------------------////
