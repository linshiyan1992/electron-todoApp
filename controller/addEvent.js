const {ipcRenderer} = require('electron');

const addForm = document
    .querySelector('.todo__add-form')
    .addEventListener('submit',function(event){
        event.preventDefault();
        const item = document.querySelector('.todo__add-input');
        ipcRenderer.send('addTodo',item.value);
        item.value = '';
    })

const closeBtn = document
    .querySelector('.icon-tab-close')
    .addEventListener('click',function(event){
        ipcRenderer.send('manageWindow','closeAdd');
    })