window.onload = main;

function main() {
    getDaysInMonth(getToday().getMonth(), getToday().getFullYear());
}

function getToday(){
    let date = new Date();
    return date;
}
