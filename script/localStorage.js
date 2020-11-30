function setLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(allTodos));
}

function getLocalStorage(){
    let todos = JSON.parse(localStorage.getItem("todos") || "[]");
    todos.forEach(function(todo) {
        allTodos.push(todo);
    }) 
}

//removes from local storage
function removeFromLocalStorage(todoItem){

    const todoIndex = todoItem.children[0].innerText;
    let todos;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', stringify(todos));

}


