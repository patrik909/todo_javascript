const whatTodo = document.getElementById('whatTodo');
const newTodo = document.getElementById('newTodo');
const messageBox = document.getElementById('messageBox');
//Fetching the elements from the form, to send messages and recieve input-values.
const todoList = document.getElementById('todos');
const doneList = document.getElementById('dones');
//Fetching the todo/done div's, for displaying the values.
const deleteTodos = document.getElementById('deleteTodos');
const deleteAll = document.getElementById('deleteAll');
const deleteDones = document.getElementById('deleteDones');
//Fetching the buttons in the footer.


/* --------------------------- */
/* ----- TODO/DONE ARRAYS ---- */
/* --------------------------- */

function todoArr(){
    const todos = localStorage.getItem('todo');
    //Fetches the values stored in localstorage 'todo'
    const todoArray = JSON.parse(todos);
    //Using the JSON.parse to convert stored data in localstorage to an JSON object.
    if(todos == null){
    //To prevent javascript-error when array is empty.
        const todoArray = new Array;   
    }

    return todoArray;

}

function doneArr(){
    //Works the same way as todoArr
    const dones = localStorage.getItem('done');
    
    const doneArray = JSON.parse(dones);
    if(dones == null){
        const doneArray = new Array;   
    }

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

function addTodo(){
    
    event.preventDefault();
    const todoValue = whatTodo.value;
    const searchValue = todoArray.indexOf(todoValue);
    /* Matches the input-value with values in todoArray.
       The if statement will use the value below */
    
    if(todoValue == ""){
        //Message for empty input field
        messageBox.classList.remove('message');
        messageBox.classList.remove('success');
        messageBox.classList.add('wrong');
        messageBox.innerHTML=`
            <p>YOU LEFT THE TODO FIELD EMPTY</p>
        `;
    } else if(searchValue !== -1){
        //Message if input-value matches an existing value in todoArray.
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
        //Adds the value to first index in todoArray
        localStorage.setItem('todo', JSON.stringify(todoArray));
        //Adds the value to todoArray and converts the todoArray to string.
        
        hello = true
        viewTodo(hello);
        //Runs the viewTodos function
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
    // Matches the input-value with values in todoArray.
    
    todoBox.classList.add('hide');
    /* Triggers the animation when completing a TODO
       To make this smoother setTimeout is used to let the 'hide' animation finish.
      
       Then matching the value, with values in todoArray and then deletes the matching value. */
    setTimeout(function(){
    if(searchValue !== -1){
        //When the values matches a value in todoArray, the code below will run.
        todoArray.splice(searchValue, 1);
        localStorage.setItem('todo', JSON.stringify(todoArray));
        //Works the same way as in addTodo function
        messageBox.classList.remove('success')
        messageBox.classList.remove('wrong')
        messageBox.classList.add('message')
        messageBox.innerHTML=`
            <p>YOU'VE COMPLETED A TODO</p>
        ` 
    }
        viewTodo()
        //After adding the value to the array viewTodos function runs, to update the displaying values.
    }, 500)
    
    doneArray.unshift(value);
    localStorage.setItem('done', JSON.stringify(doneArray));
    //Adds the value to first index of doneArray, and converts the doneArray to string.
    
    setTimeout(function(){
        hello = true
        viewDones(hello);
        hello = false
        //Works the same way as in addTodo function
    },500)
   
}


/* ------------------------------ */
/* ---- REMOVE A TODO / DONE ---- */
/* ------------------------------ */

/* Works a lot like the completeTodo function.
   Besides they do not add anything */

function removeTodo(){

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
    //First triggering the animation 'hide' on todoList, then removes the values in the array, with the for loop below.
    setTimeout(function(){  
        for(var i = todoArray.length; i > 0; i--){

            todoArray.pop();
            localStorage.setItem('todo', JSON.stringify(todoArray));

        };
        todoList.classList.remove('hide');
        //Removing the 'hide' class, otherwise the animation wont run again then triggered.
        viewTodo();    
    }, 500);
        
};

function emptyDones(){
    //Works the same way as emptyTodo function.
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

/* --------------------------- */
/* ----- VIEW TODOS/DONES ---- */
/* --------------------------- */

let hello = false;
//Default value is false, will get true addTodo or completeTodo runs.

function viewTodo(){
    
    let myTodos=""; 
    i = 0;
    
    for (const todo of todoArray){
        myTodos += `
            <div class="todoBox" id=${i++}>
                <p>${todo}</p>
                <button id="todoCompleteButton" class="completeButton">V</button>
                <button id="todoRemoveButton" class="removeButton">X</button>
            </div>
        `; 
    };
    /* For loop that contains all HTML + values.
       The innerHTML below will be written everytime the function is triggered.
       Would I've used appendChild the loop rewrite the array over and over again when triggered, instead this will overwrite the previous HTML */
    todoList.innerHTML = myTodos;
    
    if(hello === true){
        /* This statement checks if animatonTrigger is true, if true, it will add the show class to the first box in the todoList, which is the box that hold the latest added(unshift'ed) value to the array. */
        const newTodoBox = document.getElementsByClassName('todoBox')[0];
        newTodoBox.classList.add('show');
        
        setTimeout(function(){
            newTodoBox.classList.remove('show');
            /* The 'show' class have to be removed, otherwise it wont be added next time the statement is triggered.
            It also needs some delay, to let the animation finish */
        },500)
    }
 
    const completeButton = document.getElementsByClassName('completeButton');
    
    for(i = 0; i < completeButton.length; i++){
        completeButton[i].addEventListener('click', completeTodo);
    };
    
    /* The loops above and below adds complete- and remove    buttons to each box.
    
    Which triggers the complete/removeTodo function */
    
    
    const removeButton = document.getElementsByClassName('removeButton');
    
    for(i = 0; i < removeButton.length; i++){
        removeButton[i].addEventListener('click', removeTodo);
    };

};

///---------------------------///

function viewDones(){
    //Work the same way as viewTodos
    let myDones=""; 
    i = 0;

    for (const done of doneArray){
        myDones += `
            <div class="doneBox" id=${i++}>
                <p>${done}</p>
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


/*-----------------------------*/
/*------- EVENTLISTNERS -------*/
/*-----------------------------*/

newTodo.addEventListener('submit', function(){
    addTodo(event);
});
//Triggers the addTodo function

deleteTodos.addEventListener('click', emptyTodos)
//Triggers the emptyTodos function, that clears todoArray

deleteAll.addEventListener('click', function(){
    emptyTodos();
    emptyDones();
});
////Triggers the emptyTodos/Dones function, that clears both arrays.

deleteDones.addEventListener('click', emptyDones)
//Triggers the emptyTodos function, that clears doneArray

viewTodo();
viewDones();
//Displays the arrays then arriving to the page.