// controllers/todoCtrl.js

var ObjectID = require('mongodb').ObjectID;

var Todo = require('../models/todo');

// Emulazione Database con array in memoria
/*
var todos = [];

//Inizializzazione dati in emulazione
for(var i=1; i<11; i++) {
    todos.push(new Todo('Attività ' + i));
}
*/

module.exports = function(db) {
    var self = this;

    this.todos = db.collection('todos');

    // getAll
    this.getAll = function(page, query, cb) {
        var pageSize = 10;

        var filter = {};
        if(query.length>0)
            filter = { nome: { $regex: query, $options: 'i' } };

        
        self.todos.find(filter)
                  .limit(pageSize)
                  .skip(pageSize * (page - 1))
                  .toArray(cb);
    }

    // get
    this.get = function(id) {
        var items = todos.filter((elem) => elem.id == id);
        return items.length > 0 ? items[0] : {};
    }

    // post - creazione nuovo todo in array todos
    this.post = function(nome, cb) {
        var obj = new Todo(nome);
        
        self.todos.insert(obj, cb);
    }

    // put - modifica di una attività esistente
    this.put = function(id, item, cb) {
        var filter = { _id: new ObjectID(id) };

        var obj = {
            nome: item.nome,
            evasa: item.evasa
        };

        self.todos.update(filter, {$set: obj}, cb);
    }

    // delete - cancellazione elemento in base a id
    this.delete = function(id, cb) {
        var filter = { _id: new ObjectID(id) };

        self.todos.remove(filter, cb)       
    }
}


