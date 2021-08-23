const Store = require('electron-store');

class dataStore extends Store{
    constructor(){
        super();
        this.todo = this.get('todo')||[];
    }
    saveTodo(){
        this.set('todo',this.todo);
        return this;
    }
    getTodo(){
        const items = this.get('todo')||[];
        return items;
    }
    addTodo(item){
        this.todo.push(item);
        return this.saveTodo();
    }
    deleteTodo(itemToDelete){
        this.todo = this.todo.filter(item=>item!==itemToDelete)
        return this.saveTodo();
    }
}

module.exports=dataStore;