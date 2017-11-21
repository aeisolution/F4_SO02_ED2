// controllers/todoCtrl.js

var Todo = require('../models/todo');

// Emulazione Database con array in memoria
var todos = [];

//Inizializzazione dati in emulazione
for(var i=1; i<11; i++) {
    todos.push(new Todo('Attività ' + i));
}

module.exports = function() {
    var self = this;

    // getAll
    this.getAll = function() {
        return todos;
    }

    // get
    this.get = function(id) {
        var items = todos.filter((elem) => elem.id == id);
        return items.length > 0 ? items[0] : {};
    }
}