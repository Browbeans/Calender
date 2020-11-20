let dates = [];
let days = [];
let calendarContainer = document.getElementById("calendar-container");

function getDatesInMonth(month, year) {
  let date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  console.log(dates);
}

function getDaysInMonth() {
  for(let i = 0; i < dates.length; i++){
    separateDate(dates[i]);
  }
  console.log(days);
}

function separateDate(date) {
  day = date.toString().split(" ");
  days.push(day[2]);
}


function renderDays(days){
  for (let i = 0; i < days.length; i++){
    let parent = createHTMLElement('div');
    let date = createHTMLElement('h3');

    setHTMLContent(parent, null);
    setHTMLContent(date, days[i]);

    parentClasses = ["calender-day", "flex"];
    setHTMLClass(parent, parentClasses);
    setHTMLClass(date, "calender-date");


    setDayHTMLStructure(parent, date);
  }
}

function setDayHTMLStructure(parent, date){
  calendarContainer.appendChild(parent);
  parent.appendChild(date);
}



