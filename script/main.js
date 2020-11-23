window.onload = main;

function main() {
    getDatesInMonth(getToday().getMonth(), getToday().getFullYear());
    getDaysInMonth();
    renderGrid(days, dates);
    updateDigitalClock();
    digitalClock();
    setDay()
    fetchDate()
    calenderDayClicked();
}

let selectedDate = null;

function getToday(){
    let date = new Date();
    return date;
}

function calenderDayClicked() {

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

function getSelectedDate(clickedDate){

    day = dates[0].toString().split(" ");
    console.log(day);

    selectedDate = new Date(day[3],day[2],clickedDate,00,00,00);

    console.log(selectedDate);
}



// GENERATE CONTENT

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
