function digitalClock() {
    setInterval(updateDigitalClock, 1000);
}

function updateDigitalClock() {
    const getTime = new Date();

    updateDigitalTime(getTime);
}

function updateDigitalTime(getTime) {
    const getHours = getTime.getHours();
    const getMinutes = getTime.getMinutes();

    const clock = document.getElementById("time");
    clock.innerText = getHours + ":" + getMinutes;
}

function fetchDay() {
    let date = getToday()
    console.log(date.getDay())

    switch(date.getDay()){
        case 0: return 'Sunday'      
        case 1: return 'Monday'
        case 2: return'Tuesday'
        case 3: return 'Wednesday'
        case 4: return 'Thursday'
        case 5: return 'Friday'
        case 6: return 'Saturday'
    }
}

function setDay() {
    const weekday = document.getElementById('weekday')
    weekday.innerText = fetchDay()
}

function fetchDate() {
    let date = getToday();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    
    const todaysDate = document.getElementById('date');
    todaysDate.innerText = year + '-' + (month + 1) + '-' + day; 
}