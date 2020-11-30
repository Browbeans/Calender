

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

    //adding delete button
    const deleteTodo = document.createElement('i');
    todoItem.appendChild(deleteTodo);
    deleteTodo.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteTodo.classList.add('deleteBtn');
    removeTodo(todoItem, deleteTodo);

    allTodos.push({
        activity: input.value,
        date: selectedDate.toString()
    });
    input.value = '';
    

    setMonthIndex(0); 
    
    
})



let allTodos = [];

//Removes todo
function removeTodo(todoItem, deleteBtn){

    deleteBtn.addEventListener('click', () => {

        todoItem.remove();    
        allTodos = [];
        setMonthIndex(0);
    })
}

