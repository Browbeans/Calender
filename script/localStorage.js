function setLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(allTodos));
}

function getLocalStorage(){
    let todos = JSON.parse(localStorage.getItem("todos") || "[]");
    todos.forEach(function(todo) {
        allTodos.push(todo);
    }) 
}