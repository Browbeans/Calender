let dates = [];
let days = [];
let holidays = [];
let redDates = [];
let calendarContainer = document.getElementById("calendar-container");
let previousMonthButton = document.getElementById("previous-month");
let nextMonthButton = document.getElementById("next-month");

previousMonthButton.addEventListener("click", () => {setMonthIndex(1)})
nextMonthButton.addEventListener("click", () => {setMonthIndex(-1)})

// GETS DATES IN ACTIVE MONTH
function getDatesInMonth(month, year) {
  let date = new Date(year, (month), 1);
  while (date.getMonth() === month) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
}

// SETS ACTIVE MONTH IN CALENDAR
function getMonth() {
  let year = dates[0].getFullYear();
  let month = dates[0].toLocaleString('default', {month: 'long'});
  let monthElement = document.getElementById('current-month');
  monthElement.innerHTML = month +  ' ' +  year;
}

// GET DAYS OF ACTIVE MONTH
function getDaysInMonth() {
  for(let i = 0; i < dates.length; i++){
    separateDate(dates[i]);
  }
}

// GENERIC FUNCTION TO SEPARATE DATE OBJECT TO STRINGS (WITH INDEX)
function separateDate(date) {
  day = date.toString().split(" ");
  days.push(day[2]);
}

// GET FIRST DAY OF MONTH
function getFirstDay(date) {
  day = date.toString().split(" ");
  return day[0];
}

// RENDERS GRID CONTENT
function renderGrid(days, dates){
  const firstDay = getFirstDay(dates);
  const parentClasses = ["calender-day", "flex"];
  const emptyParentClasses = ["calender-day", "flex", "empty-day"];
  const emptyCellsAmount = setEmptyCellsAmount(firstDay);
  const daysLeft = 42 - (days.length + emptyCellsAmount);

  renderEmptyDays(emptyCellsAmount, emptyParentClasses);
  renderDays(days, parentClasses);
  renderEmptyDays(daysLeft, emptyParentClasses);
}

// RENDERS EACH CELL WITH DATE (AND CONTENT) IN CALENDAR
function renderDays(days, parentClasses){
  for (let i = 0; i < days.length; i++){
    let parent = createHTMLElement('div');
    let date = createHTMLElement('h3');

    setHTMLContent(parent, null);
    setHTMLContent(date, days[i]);

    setHTMLClass(parent, parentClasses);
    setHTMLClass(date, "calender-date");

    setDayHTMLStructure(parent, date);
  }
}

// RENDERS EMPTY DAYS IN CALENDAR
function renderEmptyDays(days, parentClasses) {
  for (let j = 0; j < days; j++){
    let emptyDiv = createHTMLElement('div');
    setHTMLClass(emptyDiv, parentClasses);
    calendarContainer.appendChild(emptyDiv);
  }
}

// SETS HTML STRUCTURE OF CREATED HTML ELEMENT
function setDayHTMLStructure(parent, date){
  calendarContainer.appendChild(parent);
  parent.appendChild(date);
}

// SETS EMPTY CELLS AMOUNT DEPENDING ON STARTING DAY OF MONTH
function setEmptyCellsAmount(startingDay){
  switch(startingDay) {
    case 'Mon':
      return 0
    case 'Tue':
      return 1
    case 'Wed':
      return 2
    case 'Thu':
      return 3
    case 'Fri':
      return 4
    case 'Sat':
      return 5
    case 'Sun':
      return 6
  }
}

// GETS RED DAYS OF CURRENT MONTH FROM API
function getMonthRedDays(daysList){
  let output = daysList.filter(day => day["röd dag"] === "Ja");
  for (let i = 0; i < output.length; i++){
    let date = output[i].datum.toString().split("-")[2];
    redDates.push(date);
  }
  
  setRedDay();
}

// SETS RED DAYS OF CURRENT MONTH IN CALENDAR
function setRedDay(){
  const dateElements = document.querySelectorAll(".calender-date");
  for (let i = 0; i < redDates.length; i++){
    for (let j = 0; j < dateElements.length; j++){
      if(dateElements[j].textContent === redDates[i]) {
        dateElements[j].classList.add("red-holidays");
      }
    }
  }
}

function setHolidays() {
  const dateElements = document.querySelectorAll(".calender-day");
  for (let i = 0; i < holidays.length; i++){
    for (let j = 0; j < dateElements.length; j++){
      if(dateElements[j].textContent === holidays[i].date) {
       let holidayElement =  createHTMLElement('p');
        setHTMLContent(holidayElement, holidays[i].holiday)
        setRedDayStructure(dateElements[j], holidayElement)
        setHTMLClass(holidayElement, 'holiday')
      }
    }
  }
  
}

function setRedDayStructure(parent, child) {
  parent.appendChild(child);
}

function getHolidays(dayslist) {
  for(let i = 0; i < dayslist.length; i++){
    if ('helgdag' in dayslist[i]) {
      let date = dayslist[i].datum.toString().split("-")[2];
      holidays.push({holiday: dayslist[i]['helgdag'], date:date}) 
    }
  }
  setHolidays()
}

