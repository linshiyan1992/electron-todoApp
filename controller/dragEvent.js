const {attachDeleteEvent} = require('./deleteEvent.js');

let dragSrcElement;

function handleDragStart(event){
    this.style.opacity='0.4';
    dragSrcElement = this;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html',this.innerHTML);
    return false;
}

function handleDragEnter(event){
    this.classList.add('over');
    return false;
}

function handleDragOver(event){
    if(event.preventDefault){
        event.preventDefault();
    }
    return false;
}

function handleDragLeave(event){
    this.classList.remove('over');
    return false;
}

function handleDragEnd(event){
    this.style.opacity = '';
    document.querySelectorAll('.todo__item').forEach(todo=>{
        todo.classList.remove('over');
    })
    return false;
}

function handleDrop(event){
    event.stopPropagation();
    event.preventDefault();
    if(dragSrcElement!==this){
        dragSrcElement.innerHTML = this.innerHTML;
        this.innerHTML = event.dataTransfer.getData('text/html');
        attachDeleteEvent(this);
        attachDeleteEvent(dragSrcElement);
    }
    return false;
}

function attachDragEvent(todo){
    todo.addEventListener('dragstart',handleDragStart);
    todo.addEventListener('dragenter',handleDragEnter)
    todo.addEventListener('dragover',handleDragOver);
    todo.addEventListener('dragleave',handleDragLeave);
    todo.addEventListener('drop',handleDrop);
    todo.addEventListener('dragend',handleDragEnd);
}

module.exports= {
    handleDragStart:handleDragStart,
    handleDragEnter:handleDragEnter,
    handleDragOver:handleDragOver,
    handleDragLeave:handleDragLeave,
    handleDragEnd:handleDragEnd,
    handleDrop:handleDrop,
    attachDragEvent:attachDragEvent
}


