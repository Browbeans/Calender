window.onload = main;

function main() {
    initClock();
    initSidebarDate();
    initCalendar();
    initCalendarDayClick();
}

function getToday(){
    let date = new Date();
    return date;
}

// INIT FUNCTIONS

function initClock(){
    updateDigitalClock();
    digitalClock();
}

function initSidebarDate(){
    setDay();
    fetchDate();
}

function initCalendar(){
    getDatesInMonth(getToday().getMonth(), getToday().getFullYear());
    getDaysInMonth();
    renderGrid(days, dates);
    getMonth();
    getLocalStorage();
    setMonthIndex(0);
    showAllTodos();
}

// CALENDAR LOGIC

function setMonthIndex(monthChange) {
    let date = dates[0];
    clearGrid();
    if(date.getMonth() - monthChange === 12){
        fetchMonthHolidays(date.getFullYear() + 1, 0 + 1);
        getDatesInMonth(0, date.getFullYear() + 1);
    } else if (date.getMonth() - monthChange === -1)  {
        fetchMonthHolidays(date.getFullYear() - 1, 11 + 1);
        getDatesInMonth(11, date.getFullYear() - 1);
    } else {
        fetchMonthHolidays(date.getFullYear(), (date.getMonth() - monthChange + 1));
        getDatesInMonth(date.getMonth() - monthChange, date.getFullYear());
    }
    
    getDaysInMonth();
    renderGrid(days, dates);
    getMonth();
    initCalendarDayClick();
    setLocalStorage();
    
}

function clearGrid(){
    const parent = document.getElementById("calendar-container");
    const calendarDays = document.querySelectorAll('.calender-day');

    for(let i = 0; i < calendarDays.length; i++){
        calendarDays[i].parentNode.removeChild(calendarDays[i]);
    }

    dates = [];
    days = [];
    holidays = [];
    redDates = [];
}

//  SET CLICK ON CALENDAR DAYS
let oldDate = null;
function initCalendarDayClick() {
    const calenderDay = document.querySelectorAll('.calender-day');
    for(let i = 0; i < calenderDay.length; i++){
    
        calenderDay[i].onclick = function(e){
            checkClickedElement(e.target);
            if (oldDate != null && e.target.textContent === oldDate.textContent) {
                oldDate = null;
            } else {
                oldDate = e.target;
            }
        }
    }
}

// CHECKS IF CLICKED ON CALENDAR DAY CONTAINER OR CHILD OF CONTAINER
function checkClickedElement(target) {
    
    if(target.classList.contains('calender-day')){ // container clicked
        getSelectedDate(target.childNodes[0].textContent);
        target.classList.add('active-calendar-day');
        removeClassFromCalendarDate(target);

    } else if(target.classList.contains('calender-date')){ // child clicked
        getSelectedDate(target.textContent);
        target.parentNode.classList.add('active-calendar-day');
        removeClassFromCalendarDate(target);
    }
    let elements = document.querySelectorAll(".calender-day");
    let hasActiveDay = false;
    for (let i = 0; i < elements.length; i++){
        if(elements[i].classList.contains('active-calendar-day')){
            hasActiveDay = true;
        }
    }
    if(!hasActiveDay){
        selectedDate = null;
        todoItemsContainer.innerHTML = ''
        showAllTodos();
    }

    addTodoClick(selectedDate)  
}

// REMOVE ACTIVE CLASS FROM CALENDAR DAY
function removeClassFromCalendarDate() {
    if(oldDate != null && oldDate.parentNode != null){
        oldDate.classList.remove('active-calendar-day');
        oldDate.parentNode.classList.remove('active-calendar-day');

    }
}

let selectedDate = null;

// GET DATE OF CLICKED CALENDAR DAY
function getSelectedDate(clickedDate){
    day = dates[0].toString().split(" ");
    selectedDate = new Date(day[3],setStringMonthToNum(day[1]),clickedDate,00,00,00);
    checkTodos(selectedDate);
}

// SETS TODOS IN CALENDAR DAYS
function setTodosInCalenderDay(day, parent){

    for(let i = 0; i < allTodos.length; i++){
        let getDate = getFullDate(day).toString();
        let todoDate = allTodos[i].date.toString();
        let hasClass = false;
        
        for(let i = 0; i < parent.childNodes.length; i++){
            if(parent.childNodes[i].classList.contains('todo-content')){
                hasClass = true;
            }
        }
        
        if(todoDate === getDate) {

            if(!hasClass) {
                let paragraph = createHTMLElement('p');
                parent.appendChild(paragraph);
                setHTMLContent(paragraph, `todos: ${countTodos(getDate)}`);
                setHTMLClass(paragraph, 'todo-content')
            }

        }
    }    
}

// COUNT THE AMOUNT OF TODOS IN EACH DAY
function countTodos(getDate){
    let arr = allTodos.filter(todo => todo.date.toString() === getDate);
    return arr.length;
}


function getFullDate(day){

    const date = dates[0].toString().split(" ");
    return new Date(date[3],setStringMonthToNum(date[1]),day,00,00,00);

}

// CHECK TODOS FOR SPECIFIC DATE
function checkTodos(selectedDate) {
    if (todoItemsContainer != null) todoItemsContainer.innerHTML = '';
    let newArray = [];
    for(let i = 0; i < allTodos.length; i++){
    
    if(selectedDate.toString() == allTodos[i].date.toString()) {
        newArray.push(allTodos[i])    
    }   
    } 
    if(newArray.length > 0) {
        createTodoContent(newArray)
    }
    
}

// creates TODO LIST when clicked on calendar date
function createTodoContent(newArray) {
    for(let i = 0; i < newArray.length; i++) {

        const paragraph = document.createElement('p');
        const container = document.createElement('div');
        todoItemsContainer.appendChild(container);
        container.appendChild(paragraph);
        paragraph.classList.add('paragraph');
        setHTMLContent(paragraph, newArray[i].activity);

        //deleteTodo in calender
        const deleteTodo = document.createElement('i');
        container.appendChild(deleteTodo);
        deleteTodo.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteTodo.classList.add('deleteBtn');

        removeTodo(deleteTodo);

        const changeTodo = document.createElement('i');
        container.appendChild(changeTodo);
        changeTodo.innerHTML = '<i class="fas fa-pen"></i>';
        changeTodo.classList.add('changeTodo');
        container.classList.add('todoDiv');

        addChangeTodo(paragraph, changeTodo)
    }
    
}

// GET ALL UNIQUE DATES OF TODOS
function getUniqueDates(){
    return uniqueDates = [...new Set(allTodos.map(item => item.date))];
}

// CREATES ARRAYS OF TODOS BASED ON DATE
function createTodoArrays(){
    let dates = getUniqueDates();
    let datesArr = [];
    for (let i = 0; i < dates.length; i++){
        let o = allTodos.filter(d => d.date === dates[i]);
        datesArr.push(o);
    }
    return datesArr;
}

// IF NOT SELECTED DATE IN CALENDAR SHOW ALL DATES
function showAllTodos(){
    let datesArr = createTodoArrays(); 
    for(let i = 0; i < datesArr.length; i++) {

        let date = createHTMLElement('p');
        todoItemsContainer.appendChild(date);
        let d = datesArr[i][0].date.split(" ");
        let shortDate = `${d[0]} ${d[1]} ${d[2]} ${d[3]}`
        setHTMLContent(date, shortDate);
        setHTMLClass(date, 'todo-date-title');

        for (let j = 0; j < datesArr[i].length; j++){
            let paragraph = createHTMLElement('p')
            todoItemsContainer.appendChild(paragraph);
            setHTMLContent(paragraph, datesArr[i][j].activity);
        }
    }
}

// CONVERTS STRING MONTH TO NUMBER
function setStringMonthToNum(stringMonth){
    switch(stringMonth) {
        case 'Jan':
          return 0
        case 'Feb':
          return 1
        case 'Mar':
          return 2
        case 'Apr':
          return 3
        case 'May':
          return 4
        case 'Jun':
          return 5
        case 'Jul':
          return 6
        case 'Aug':
          return 7
        case 'Sep':
          return 8
        case 'Oct':
          return 9
        case 'Nov':
          return 10
        case 'Dec':
          return 11
      }
}

// GENERATE GENERIC HTML TAGS

function createHTMLElement(tag){
    let element = document.createElement(tag);
    return element
    
}

function setHTMLContent(element, content){
    element.innerHTML = content;
}

function setHTMLClass(element, classes) {
    if (Array.isArray(classes)) element.classList.add(...classes)
    else element.classList.add(classes)
}
