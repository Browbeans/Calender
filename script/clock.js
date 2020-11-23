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