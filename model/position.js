const Store = require('electron-store');

class positionStore extends Store{
    constructor(){
        super();
        this.x = parseInt(this.get('x'))||0;
        this.y = parseInt(this.get('y'))||0;
    }
    savePos(x,y){
        this.x = x;
        this.y = y;
        this.set('x',x);
        this.set('y',y);
    }
}

module.exports = positionStore;