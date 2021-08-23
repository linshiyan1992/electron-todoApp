'use strict'
const {attachDragEvent} = require('../controller/dragEvent');
const {attachDeleteEvent} = require('../controller/deleteEvent');
const {ipcRenderer} = require('electron');

const container = document.querySelector('.todo');

function createItem(todo){
    const item = document.createElement('div');
    const item_text = document.createElement('span');
    item_text.append(todo);
    const img = document.createElement('img');
    img.setAttribute('src','./src/task_black_24dp.svg');
    img.classList.add('todo__delete')
    item.append(item_text,img);
    item.classList.add('todo__item');
    item.setAttribute('draggable','true');
    return item;
}

function initTodoItems(event,todos){
    for(let todo of todos){
        const item = createItem(todo);
        container.append(item);
        attachDragEvent(item);
        attachDeleteEvent(item);
    }
}

const addBtn = document
        .querySelector('.btn-add')
        .addEventListener('click',function(event){
            ipcRenderer.send('addTodoWindow','addTodo');
        })
        
const minimizeBtn = document
        .querySelector('.icon-tab-minimize')
        .addEventListener('click',function(event){
            ipcRenderer.send('manageWindow','minimize');
        })

const closeBtn = document
        .querySelector('.icon-tab-close')
        .addEventListener('click',function(event){
            ipcRenderer.send('manageWindow','close');
        })



const fadeOut = flash=>{
    flash.classList.add('flash-close--active');
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve('success');
        }, 500);
    })
}


ipcRenderer.once('todos',initTodoItems);

ipcRenderer.on('todo-result',(event,message)=>{
    const flash = document.createElement('div');
    const msg = document.createElement('span');
    const done = document.createElement('img');
    msg.innerText = message;
    close.innerHTML = '&times;'
    done.setAttribute('src','./src/done_black_24dp.svg');
    flash.append(msg,done)
    // flash.append(msg);
    flash.classList.add('flash');
    document.querySelector('.todo').insertAdjacentElement('afterbegin',flash);
    // close.addEventListener('click',async function(){
    //     await fadeOut(flash);
    //     this.parentElement.remove();
    // })
    setTimeout(async() => {
        await fadeOut(flash);
        flash.remove();
    }, 1000);
})

ipcRenderer.on('newTodo',(event,todo)=>{
    const item = createItem(todo);
    container.append(item);
    attachDragEvent(item);
    attachDeleteEvent(item);
})


