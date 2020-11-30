const modalContainer = document.querySelector('.modal-container');
const addBtn = document.getElementById('todo-button');
const addTodo = document.getElementById('addTodo')
const modalExit = document.querySelector('.fa-times-circle');
const input = document.getElementById('todo-input');
const todoDiv = document.querySelector('.todo-container');
const todoItem = document.querySelector('.todo-item');

addBtn.addEventListener('click', () => {

    modalContainer.style.display = 'block';

});

modalExit.addEventListener('click', () => {

    modalContainer.style.display = 'none';
});

/**
 * Adding todo
 */
addTodo.addEventListener('click', () => {

    //adding todo paragraph
    const paragraph = document.createElement('p');
    todoItem.appendChild(paragraph);
    paragraph.innerHTML = input.value;
    paragraph.classList.add('paragraph')

    //delete button
    const deleteTodo = document.createElement('i');
    todoItem.appendChild(deleteTodo);
    deleteTodo.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteTodo.classList.add('deleteBtn');
    //calling deletetodo function
    removeTodo(todoItem, deleteTodo);

    allTodos.push({
        activity: input.value,
        date: selectedDate.toString()
    });

    input.value = '';
    
    setMonthIndex(0); 
})

let allTodos = [];

//removes a todo from the date
function removeTodo(deleteBtn){

    deleteBtn.addEventListener('click', (event) => {

        let deletedTodo;

         for(let i = 0; i < allTodos.length; i++){

            deletedTodo = allTodos.filter(todoItem => allTodos[i].date === todoItem.date && allTodos[i].activity === todoItem.activity);
            //deletedTodo.remove();    
            
         }
 
        allTodos.splice(deletedTodo);
        setMonthIndex(0);
        console.log(event.target);
        console.log(selectedDate);
        
       
    })
}

