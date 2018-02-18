const whatTodo = document.getElementById('whatTodo');
const newTodo = document.getElementById('newTodo');
const messageBox = document.getElementById('messageBox');

const todoList = document.getElementById('todos');
const doneList = document.getElementById('dones');

function todoArr(){
    var todoArray = new Array;
    var todos_str = localStorage.getItem('todo');
        todoArray = JSON.parse(todos_str); 
    

    return todoArray;

}

function doneArr(){
    var doneArray = new Array;
    var dones_str = localStorage.getItem('done');
        doneArray = JSON.parse(dones_str); 
    
    return doneArray;

}

const todoArray = todoArr();
const doneArray = doneArr();


if(todoArray.length < 1){
    messageBox.innerHTML=`<p>THERE IS NO TODOS, FEEL FREE TO ADD ONE!</p>`
} else {
     messageBox.innerHTML=`<p>SEE YOUR TODOS/DONES BELOW!</p>`   
}


/* --------------------------- */
/* ------- ADDA EN TODO ------ */
/* --------------------------- */


newTodo.addEventListener('submit', function(){
    addTodo(event);
})

function addTodo(){
    event.preventDefault();
    const todoValue = whatTodo.value;
    
    const searchValue = todoArray.indexOf(todoValue);


    
    if(todoValue == ""){
        messageBox.classList.remove('message')
        messageBox.classList.remove('success')
        messageBox.classList.add('wrong')
  
        messageBox.innerHTML=`
            <p>DU MATADE INTE IN NÅGOT</p>`
    } else if(searchValue !== -1){
        messageBox.classList.remove('success')
        messageBox.classList.add('wrong')
        messageBox.innerHTML=`
            <p>TODO FINNS REDAN</p>
        ` 
    } else {
        messageBox.classList.remove('wrong')
        messageBox.classList.add('success')
        messageBox.innerHTML=`
            <p>DU HAR LAGT TILL EN TODO!</p>
        `;
        todoArray.unshift(todoValue);
        localStorage.setItem('todo', JSON.stringify(todoArray));
        hello = true
        viewTodo(hello);
        setTimeout(function(){
            hello = false
        })
    }

} 

///---------------------------///

/* ------------------------------ */
/* --------- UTFÖRD TODO -------- */
/* ------------------------------ */

function completeTodo(){

    const todoBox = this.parentElement
    const todoBoxParagraph = todoBox.getElementsByTagName('p')[0];
    const value = todoBoxParagraph.textContent;
    const searchValue = todoArray.indexOf(value);
   
    todoBox.classList.add('hide');
    console.log(todoBox)
    setTimeout(function(){
    if(searchValue !== -1){ 
        todoArray.splice(searchValue, 1);
        localStorage.setItem('todo', JSON.stringify(todoArray));
        messageBox.classList.remove('success')
        messageBox.classList.remove('wrong')
        messageBox.classList.add('message')
        messageBox.innerHTML=`
            <p>YOU'VE COMPLETED A TODO</p>
        ` 
    }
        viewTodo()
    }, 500)
    

    doneArray.unshift(value);
    localStorage.setItem('done', JSON.stringify(doneArray));
    setTimeout(function(){
        hello = true
        viewDones(hello);
        setTimeout(function(){
            hello = false
        })
    },500)
  

    
}
///------------------------------///

/* ------------------------------ */
/* -------- TA BORT TODO -------- */
/* ------------------------------ */
function removeTodo(){

    
        const todoBox = this.parentElement
    const todoBoxParagraph = todoBox.getElementsByTagName('p')[0];
    const value = todoBoxParagraph.textContent;
    const searchValue = todoArray.indexOf(value);
   
    todoBox.classList.add('hide');
    console.log(todoBox)
    
    setTimeout(function(){
    if(searchValue !== -1){ 
        todoArray.splice(searchValue, 1);
        localStorage.setItem('todo', JSON.stringify(todoArray));
        messageBox.classList.remove('success')
        messageBox.classList.remove('wrong')
        messageBox.classList.add('message')
        messageBox.innerHTML=`
            <p>YOU'VE REMOVED A TODO</p>
        ` 
    }  
    viewTodo()
    }, 500)


}

function removeDone(){
   
    const todoBox = this.parentElement
    const todoBoxParagraph = todoBox.getElementsByTagName('p')[0];
    const value = todoBoxParagraph.textContent;
    const searchValue = doneArray.indexOf(value);
   
    todoBox.classList.add('hide');
    todoBox.classList.remove('show')
    console.log(todoBox)
    
    setTimeout(function(){
    if(searchValue !== -1){ 
        doneArray.splice(searchValue, 1);
        localStorage.setItem('done', JSON.stringify(doneArray));
        messageBox.classList.remove('success')
        messageBox.classList.remove('wrong')
        messageBox.classList.add('message')
        messageBox.innerHTML=`
            <p>YOU'VE REMOVED A DONE</p>
        ` 
    }
    viewDones()
    }, 500)
}
///------------------------------///

/* ------------------------------ */
/* - TA BORT ALLA TODOS & DONES - */
/* ------------------------------ */

const deleteTodos = document.getElementById('deleteTodos');

const deleteAll = document.getElementById('deleteAll');

const deleteDones = document.getElementById('deleteDones');

function emptyTodos(){
todoList.classList.add('hide');
   
 setTimeout(function(){  
for(var i = todoArray.length; i > 0; i--){
     
 todoArray.pop();
 localStorage.setItem('todo', JSON.stringify(todoArray));
    
} 
    
todoList.classList.remove('hide');
viewTodo();    
 }, 500)   
        
}

function emptyDones(){
    
        doneList.classList.add('hide');
    
    setTimeout(function(){
     for(var i = doneArray.length; i > 0; i--){
    
         doneArray.pop();
        localStorage.setItem('done', JSON.stringify(doneArray));
    } 
         doneList.classList.remove('hide');
        viewDones();
    }, 500)
        
}

deleteTodos.addEventListener('click', function(){
    emptyTodos()})

deleteAll.addEventListener('click', function(){
    emptyTodos();
    emptyDones();
})

deleteDones.addEventListener('click', function(){
    emptyDones();
})

///------------------------------///

/* --------------------------- */
/* -------- VISA TODOS ------- */
/* --------------------------- */
var hello = false
function viewTodo(){
    let myTodos=""; 
    i = 0;
    for (const todos of todoArray){
        myTodos += `
            <div class="todoBox" id=${i++}>
                <p>${todos}</p>
                <button id="todoCompleteButton" class="completeButton">V</button>
                <button id="todoRemoveButton" class="removeButton">X</button>
            </div>
        ` 

    }

    todoList.innerHTML = myTodos;
 
    if(hello === true){
        const newTodoBox = document.getElementsByClassName('todoBox')[0]
        newTodoBox.classList.add('show');
        setTimeout(function(){
            newTodoBox.classList.remove('show');
        },500)
    }
 
    const completeButton = document.getElementsByClassName('completeButton');
    
    for(i = 0; i < completeButton.length; i++){
        completeButton[i].addEventListener('click', completeTodo)
    }
    
    
    const removeButton = document.getElementsByClassName('removeButton');
    
    for(i = 0; i < removeButton.length; i++){
        removeButton[i].addEventListener('click', removeTodo)
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
            <div class="doneBox" id=${i++}>
                <p>${dones}</p>
                <button id="todoRemoveButton" class="removeButton">X</button>
            </div>
        ` 
    }  
    doneList.innerHTML = myDones;
    
    if(hello === true){
        const newTodoBox = document.getElementsByClassName('doneBox')[0]
        newTodoBox.classList.add('show');
        setTimeout(function(){
            newTodoBox.classList.remove('show');    
        },500)
    }

    const removeButton = document.getElementsByClassName('removeButton');
    
    for(i = 0; i < removeButton.length; i++){
        removeButton[i].addEventListener('click', removeDone)
    }
    
}

viewTodo();
viewDones();