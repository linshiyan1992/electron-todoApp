const { ipcRenderer } = require("electron")

const fadeOut = item=>{
    item.classList.add('todo__item--close');
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve('success');
        }, 500);
    })
}

async function deleteitem(event){
    const item = this.previousSibling.innerText;
    await fadeOut(this.parentElement);
    this.parentElement.remove();
    ipcRenderer.send('deleteTodo',item);
}

function attachDeleteEvent(item){
    const button = item.childNodes[1];
    button.addEventListener('click',deleteitem);
}

module.exports = {
    deleteitem:deleteitem,
    attachDeleteEvent:attachDeleteEvent,
}
