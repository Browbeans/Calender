const modalContainer = document.querySelector('.modal-container');
const addBtn = document.getElementById('todo-button');
const addTodo = document.getElementById('addTodo')
const modalExit = document.querySelector('.fa-times-circle');
const input = document.getElementById('todo-input');
const todoDiv = document.querySelector('.todo-container');
const todoItemsContainer = document.querySelector('.todo-item-container');
const deleteButton = document.querySelector('.deleteBtn');
const dateInput = document.getElementById('date-input');
const inputContainer = document.getElementById('input-container');


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
    let style = getComputedStyle(inputContainer);

    //adding todo paragraph
    const paragraph = document.createElement('p');
    const container = document.createElement('div');
    todoItemsContainer.appendChild(container);
    container.appendChild(paragraph);
    paragraph.innerHTML = input.value;
    paragraph.classList.add('paragraph');

    //delete button
    const deleteTodo = document.createElement('i');
    container.appendChild(deleteTodo);
    deleteTodo.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteTodo.classList.add('deleteBtn');

    removeTodo(deleteTodo);

    allTodos.push({
        activity: input.value,
        date: selectedDate.toString()
    });

    input.value = '';
    
    if (style.display === 'block'){
        setMonthIndex(0);
        if (todoItemsContainer != null) todoItemsContainer.innerHTML = '';
        showAllTodos();
    } else {
        setMonthIndex(0);
        keepActiveDay();
    }
})

let allTodos = [];

function removeTodo (deleteTodo) {
    deleteTodo.onclick = function(event){
        let activity = event.target.parentElement.parentElement.childNodes[0].textContent;
         for(let i = 0; i < allTodos.length; i++){

            if(allTodos[i].date.toString() === selectedDate.toString() && allTodos[i].activity === activity){
                allTodos.splice(i, 1);
            }
         }
         event.target.parentElement.parentElement.parentElement.removeChild(event.target.parentElement.parentElement);
        
        setMonthIndex(0);
    }
}

function keepActiveDay(){
    let elements = document.querySelectorAll('.calender-day');
    let date = selectedDate.toString().split(' ')[2];
    let el;
    for (let i = 0; i < elements.length; i++){
        if(elements[i].childNodes.length !== 0 && elements[i].childNodes[0].textContent === date) {
            elements[i].classList.add('active-calendar-day');
        }
    }
}

dateInput.addEventListener("change", () => {
    const date = dateInput.value.toString().split("-");
    selectedDate = new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2]), 00, 00, 00);
});

