const{app,BrowserWindow, ipcMain} = require('electron');
const dataStore = require('./model/dataStore.js');
const positionStore = require('./model/position.js');

let todoWindow,addWindow;

const position = new positionStore();

function showTodo(){
    todoWindow = new BrowserWindow({
        width:600,
        height:900,
        frame:false,
        x:position.x,
        y:position.y,
        resizable:false,
        show:false,
        webPreferences:{
            contextIsolation:false,
            nodeIntegration:true
        }
    })
    todoWindow.webContents.loadFile('./view/todo.html');
}

function addTodo(){
    const pos = todoWindow.getPosition();
    addWindow = new BrowserWindow({
        width:450,
        height:300,
        x:pos[0]+75,
        y:pos[1]+300,
        frame:false,
        resizable:false,
        roundedCorners:true,
        webPreferences:{
            contextIsolation:false,
            nodeIntegration:true
        }
    })
    addWindow.webContents.loadFile('./view/add.html');
}

const todoStore = new dataStore();

app.whenReady()
    .then(async()=>{
        showTodo();
        todoWindow.webContents.once('did-finish-load',(event,message)=>{
            todoWindow.webContents.send('todos',todoStore.getTodo()); 
            todoWindow.show();
        })
        todoWindow.on('close',(event)=>{
            const pos = todoWindow.getPosition();
            console.log(pos);
            position.savePos(pos[0],pos[1]);
        })
    })



ipcMain.on('deleteTodo',(event,item)=>{
    todoStore.deleteTodo(item);
    todoWindow.webContents.send('todo-result',`${item} Complete!`);
})

ipcMain.on('addTodo',(event,todo)=>{
    todoStore.addTodo(todo);
    todoWindow.webContents.send('newTodo',todo);
})

ipcMain.on('addTodoWindow',(event,message)=>{
    addTodo();
})

ipcMain.on('manageWindow',(event,message)=>{
    if(message==='minimize'){
        todoWindow.minimize();
    }else if(message==='closeAdd'){
        addWindow.destroy();
        addWindow = null;
        todoWindow.webContents.send('todo-result','Adding complete');
    }
    else if(message==='close'){
        todoWindow.close();
    }
})
