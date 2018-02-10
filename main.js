const whatTodo = document.getElementById('whatTodo');
const newTodo = document.getElementById('newTodo');

const todoList = document.getElementById('todos');
const doneList = document.getElementById('dones');

const todoArray = ["Pengar", "Framgång", "Magrutor", "Utbildning"];

const doneArray = ["Volvo", "Villa", "Fru", "Vovve"];

newTodo.addEventListener('submit', function(event){
    event.preventDefault();
    console.log(whatTodo.value);
    todoArray.push(whatTodo.value);
})

console.log(doneArray);

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