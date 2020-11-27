

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

    const paragraph = document.createElement('p');
    todoItem.appendChild(paragraph);
    paragraph.innerHTML = input.value;
    paragraph.classList.add('paragraph')
    allTodos.push({
        activity: input.value,
        date: selectedDate
    });

    input.value = '';
    
    checkTodoCurrentDay(allTodos);
    setMonthIndex(0); 
    
    
})

const allTodos = [];

