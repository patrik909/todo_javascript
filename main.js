const whatTodo = document.getElementById('whatTodo');
const newTodo = document.getElementById('newTodo');

const todoList = document.getElementById('todos');
const doneList = document.getElementById('dones');

const todoArray = ["en sträng"];
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

function addTodo(event){
    event.preventDefault();
    todovalue = whatTodo.value;
    todoArray.push(todovalue);
    console.log(todoArray);

}

addTodo();

console.log(todoArray);

////----------------------------------////

//console.log(doneArray);

/* FOR LOOP FÖR ATT LOOPA UT TODOS + INNEHÅLL.. */
for (i = 0; i < todoArray.length; i++) {
    
    const todoItem = document.createTextNode(todoArray[i]);
    
    const todoParagraph = document.createElement('p');
    const todoCompleteButton = document.createElement('button');
    todoCompleteButton.setAttribute('class', 'completeButton');
    todoCompleteButton.innerText="v";
   
    const todoRemoveButton = document.createElement('button');
    todoRemoveButton.setAttribute('class', 'removeButton');
    todoRemoveButton.innerText="x";
   
    const todoBox = document.createElement('div');
    todoBox.setAttribute('class', 'todoBox');
    
    todoParagraph.appendChild(todoItem);
    todoBox.appendChild(todoParagraph);
    todoBox.appendChild(todoCompleteButton);
    todoBox.appendChild(todoRemoveButton);
    todoList.appendChild(todoBox);
    
    todoCompleteButton.addEventListener('click', function(){
        
       console.log(todoItem);
        
    })
    
     todoRemoveButton.addEventListener('click', function(){
        
        todoBox.remove(this);

    })
}
////----------------------------------////

/* KNAPP FÖR ATT TA BORT ALLA TODOS */
const removeAllButton = document.createElement('button');
removeAllButton.setAttribute('class', 'removeAllButton');
removeAllButton.innerText=" X RENSA TODOS X ";

todoList.appendChild(removeAllButton);

removeAllButton.addEventListener('click', function(){
    todoList.remove();
})
////----------------------------------////

//IF todoAyyay.contains(whatTodo.value)