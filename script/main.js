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
    setMonthIndex(0);
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

}

// REMOVE ACTIVE CLASS FROM CALENDAR DAY
function removeClassFromCalendarDate() {
    if(oldDate != null) oldDate.classList.remove('active-calendar-day');
    if(oldDate != null) oldDate.parentNode.classList.remove('active-calendar-day');
}

let selectedDate = null;

// GET DATE OF CLICKED CALENDAR DAY
function getSelectedDate(clickedDate){
    day = dates[0].toString().split(" ");
    selectedDate = new Date(day[3],setStringMonthToNum(day[1]),clickedDate,00,00,00);
    
}

function checkTodoCurrentDay(allTodos){

    let currentTodos = allTodos.filter(todo => todo.date === selectedDate);
    
}

function setTodosInCalenderDay(day, parent){  

    for(let i = 0; i < allTodos.length; i++){

        let getDate = getFullDate(day).toString();
        let todoDate = allTodos[i].date.toString();

        if(todoDate === getDate){
            let paragraph = createHTMLElement('p');
            parent.appendChild(paragraph);
            setHTMLContent(paragraph, countTodos(`todos: ${countTodos(todoDate)}`));
            console.log(todoDate);
        }
    }
}

let todoArrays = [];

function countTodos(todoDate){

    let todoContent = todoDate;
    todoArrays.push(todoContent);

    console.log(todoArrays.length);
    return todoArrays.length;
}


function getFullDate(day){

    const date = dates[0].toString().split(" ");
    return new Date(date[3],setStringMonthToNum(date[1]),day,00,00,00);


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

function setHTMLClass(element, classes){
    if (Array.isArray(classes)) element.classList.add(...classes)
    else element.classList.add(classes)
}
