window.onload = main;

function main() {
    getDatesInMonth(getToday().getMonth(), getToday().getFullYear());
    getDaysInMonth();
    renderGrid(days, dates);
    updateDigitalClock();
    digitalClock();
    setDay()
    fetchDate()
}

function getToday(){
    let date = new Date();
    return date;
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
