

const modalContainer = document.querySelector('.modal-container');
const addBtn = document.getElementById('todo-button');
const modalExit = document.querySelector('.fa-times-circle');


addBtn.addEventListener('click', () => {

    modalContainer.style.display = 'block';

});


modalContainer.addEventListener('click', () => {

    modalContainer.style.display = 'none';
});

modalExit.addEventListener('click', () => {

    modalContainer.style.display = 'none';
});