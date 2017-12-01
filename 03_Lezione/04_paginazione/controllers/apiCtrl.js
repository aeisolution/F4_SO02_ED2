// controllers/todoCtrl.js

var ObjectID = require('mongodb').ObjectID;

module.exports = function(db) {
    var self = this;

    // getAll
    this.getAll = function(coll, page, query, cb) {
        var entity = db.collection(coll);
        var pageSize = 10;

        entity.find()
                  .limit(pageSize)
                  .skip(pageSize * (page - 1))
                  .toArray(cb);
    }

    // count
    this.count = function(coll, query, cb) {
        var entity = db.collection(coll);
        entity.count({}, cb);
    }

    
    // get
    this.get = function(coll, id) {
        var entity = db.collection(coll);
        var items = todos.filter((elem) => elem.id == id);
        return items.length > 0 ? items[0] : {};
    }

    // post - creazione nuovo todo in array todos
    this.post = function(coll, obj, cb) {
        var entity = db.collection(coll);        
        entity.insert(obj, cb);
    }

    // put - modifica di una attività esistente
    this.put = function(coll, id, obj, cb) {
        var entity = db.collection(coll);
        var filter = { _id: new ObjectID(id) };

        entity.update(filter, obj, cb);
    }

    // delete - cancellazione elemento in base a id
    this.delete = function(coll, id, cb) {
        var entity = db.collection(coll);
        var filter = { _id: new ObjectID(id) };

        entity.remove(filter, cb)       
    }
}


