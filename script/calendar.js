let dates = [];
let days = [];
let calendarContainer = document.getElementById("calendar-container");

function getDatesInMonth(month, year) {
  let date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
}

function getDaysInMonth() {
  for(let i = 0; i < dates.length; i++){
    separateDate(dates[i]);
  }
}

function separateDate(date) {
  day = date.toString().split(" ");
  days.push(day[2]);
}

function getFirstDay(date) {
  day = date.toString().split(" ");
  return day[0];
}

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

function renderEmptyDays(days, parentClasses) {
  for (let j = 0; j < days; j++){
    let emptyDiv = createHTMLElement('div');
    setHTMLClass(emptyDiv, parentClasses);
    calendarContainer.appendChild(emptyDiv);
  }
}

function setDayHTMLStructure(parent, date){
  calendarContainer.appendChild(parent);
  parent.appendChild(date);
}

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



