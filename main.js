const whatTodo = document.getElementById('whatTodo');
const newTodo = document.getElementById('newTodo');
const messageBox = document.getElementById('messageBox');

const todoList = document.getElementById('todos');
const doneList = document.getElementById('dones');

const deleteTodos = document.getElementById('deleteTodos');
const deleteAll = document.getElementById('deleteAll');
const deleteDones = document.getElementById('deleteDones');


/* --------------------------- */
/* ----- TODO/DONE ARRAYS ---- */
/* --------------------------- */

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
    // If statement that displays message whether or not there is any TODOS in the todoArray
    messageBox.innerHTML=`
        <p>THERE IS NO TODOS, FEEL FREE TO ADD ONE</p>
    `; 
} else {
    messageBox.innerHTML=`
        <p>SEE YOUR TODOS/DONES BELOW!</p>
    `;   
}


/* --------------------------- */
/* --------- ADD TODO -------- */
/* --------------------------- */

newTodo.addEventListener('submit', function(){
    addTodo(event);
});

function addTodo(){
    
    event.preventDefault();
    const todoValue = whatTodo.value;
    const searchValue = todoArray.indexOf(todoValue);
    // Matches the input-value with values in todoArray
    
    if(todoValue == ""){
        //Message for empty input field
        messageBox.classList.remove('message');
        messageBox.classList.remove('success');
        messageBox.classList.add('wrong');
        messageBox.innerHTML=`
            <p>YOU LEFT THE TODO FIELD EMPTY</p>
        `;
    } else if(searchValue !== -1){
        //Message if input-value matches an existing value in todoArray
        messageBox.classList.remove('success');
        messageBox.classList.add('wrong');
        messageBox.innerHTML=`
            <p>THIS TODO IS ALREADY EXISTING</p>
        `; 
    } else {
        //If not matching already existing value in todoArray, or input-field is left empty
        messageBox.classList.remove('wrong');
        messageBox.classList.add('success');
        messageBox.innerHTML=`
            <p>YOU HAVE ADDED A TODO!</p>
        `;
        todoArray.unshift(todoValue);
        localStorage.setItem('todo', JSON.stringify(todoArray));
        hello = true
        viewTodo(hello);
        hello = false
        /*Here using false to stop the if statement that triggers the animation in viewTodo and viewDones. 
        
        Else the animation for todo/doneBox[0] will keep running.*/
    }

}


/* ------------------------------ */
/* ------- COMPLETED TODO ------- */
/* ------------------------------ */

function completeTodo(){

    const todoBox = this.parentElement
    const todoBoxParagraph = todoBox.getElementsByTagName('p')[0];
    const value = todoBoxParagraph.textContent;
    const searchValue = todoArray.indexOf(value);
   
    todoBox.classList.add('hide');
    /* Triggers the animation when completing a TODO
       To make this smoother setTimeout is used to let the 'hide' animation finish.
      
       Then matching the value, with values in todoArray and then deleting it. */
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
        hello = false
    },500)
   
}


/* ------------------------------ */
/* ---- REMOVE A TODO / DONE ---- */
/* ------------------------------ */
function removeTodo(){

    // This works a lot like the completeTodo function, besides it doesn't add anything.
    const todoBox = this.parentElement
    const todoBoxParagraph = todoBox.getElementsByTagName('p')[0];
    const value = todoBoxParagraph.textContent;
    const searchValue = todoArray.indexOf(value);
   
    todoBox.classList.add('hide');
    

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

    
    setTimeout(function(){
        if(searchValue !== -1){ 
            doneArray.splice(searchValue, 1);
            localStorage.setItem('done', JSON.stringify(doneArray));
            messageBox.classList.remove('success');
            messageBox.classList.remove('wrong');
            messageBox.classList.add('message');
            messageBox.innerHTML=`
                <p>YOU'VE REMOVED A DONE</p>
            `; 
        };
        viewDones();
    }, 500);
};


/* ------------------------------ */
/* -------- CLEAR ARRAYS -------- */
/* ------------------------------ */

function emptyTodos(){
    
    todoList.classList.add('hide');
    //First triggering the animation on todoList, when removes the values in the array, with the for loop below.
    setTimeout(function(){  
        for(var i = todoArray.length; i > 0; i--){

            todoArray.pop();
            localStorage.setItem('todo', JSON.stringify(todoArray));

        };
        todoList.classList.remove('hide');
        //Removing the 'hide' animation to make it work when triggered again.
        viewTodo();    
    }, 500);
        
};

function emptyDones(){
    
    doneList.classList.add('hide');
    
    setTimeout(function(){
        for(var i = doneArray.length; i > 0; i--){
    
            doneArray.pop();
            localStorage.setItem('done', JSON.stringify(doneArray));
        };
        doneList.classList.remove('hide');
        viewDones();
    }, 500);
        
};

deleteTodos.addEventListener('click', function(){
    emptyTodos();
});

deleteAll.addEventListener('click', function(){
    emptyTodos();
    emptyDones();
});

deleteDones.addEventListener('click', function(){
    emptyDones();
});


/* --------------------------- */
/* ----- VIEW TODOS/DONES ---- */
/* --------------------------- */

var hello = false;

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
        `; 
    };

    todoList.innerHTML = myTodos;
 
    if(hello === true){
        const newTodoBox = document.getElementsByClassName('todoBox')[0];
        newTodoBox.classList.add('show');
        
        setTimeout(function(){
            newTodoBox.classList.remove('show');
        },500)
    }
 
    const completeButton = document.getElementsByClassName('completeButton');
    
    for(i = 0; i < completeButton.length; i++){
        completeButton[i].addEventListener('click', completeTodo);
    };
    
    
    const removeButton = document.getElementsByClassName('removeButton');
    
    for(i = 0; i < removeButton.length; i++){
        removeButton[i].addEventListener('click', removeTodo);
    };

};

///---------------------------///

function viewDones(){
    let myDones=""; 
    i = 0;

    for (const dones of doneArray){
        myDones += `
            <div class="doneBox" id=${i++}>
                <p>${dones}</p>
                <button id="todoRemoveButton" class="removeButton">X</button>
            </div>
        `; 
    };  
    
    doneList.innerHTML = myDones;
    
    if(hello === true){
        const newTodoBox = document.getElementsByClassName('doneBox')[0]
        newTodoBox.classList.add('show');
        setTimeout(function(){
            newTodoBox.classList.remove('show');    
        },500);
    };

    const removeButton = document.getElementsByClassName('removeButton');
    
    for(i = 0; i < removeButton.length; i++){
        removeButton[i].addEventListener('click', removeDone);
    };
    
};

viewTodo();
viewDones();