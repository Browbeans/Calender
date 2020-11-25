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

function initCalendarDayClick() {
    const calenderDay = document.querySelectorAll('.calender-day');

    for(let i = 0; i < calenderDay.length; i++){
    
        calenderDay[i].onclick = function(e){
        
            if(e.target.classList.contains('calender-day')){
                getSelectedDate(e.target.childNodes[0].textContent);
            } else if(e.target.classList.contains('calender-date')){
                getSelectedDate(e.target.textContent);
            }
        }
    }
}


let selectedDate = null;

function getSelectedDate(clickedDate){

    day = dates[0].toString().split(" ");
    console.log(day);

    selectedDate = new Date(day[3],day[2],clickedDate,00,00,00);

    console.log(selectedDate);
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
