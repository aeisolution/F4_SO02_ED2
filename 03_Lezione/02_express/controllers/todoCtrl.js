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

    // post - creazione nuovo todo in array todos
    this.post = function(nome) {
        var obj = new Todo(nome);
        todos.push(obj);
        return obj;
    }

    // put - modifica di una attività esistente
    this.put = function(id, item) {
        var obj = {};
        // Metodo 1
        for(var i=0;i<todos.length; i++) {
            if(todos[i].id == id) 
                obj = todos[i];
        }

        //Modifica dati
        obj.nome = item.nome;
        obj.evasa = item.evasa;

        return obj;
    }

    // delete - cancellazione elemento in base a id
    this.delete = function(id) {
        var index = -1;

        for(var i=0; i<todos.length; i++) {
            if(todos[i].id == id)
                index = i;
        }

        console.log('index: ' + index);
        if(index>-1) {
            // Cancellare elemento da array (slice)
            todos.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }
}


