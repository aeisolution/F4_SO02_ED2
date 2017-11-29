// routes/index.js

var TodoCtrl = require('../controllers/todoCtrl');

module.exports = function(app, db) {
    var todoCtrl = new TodoCtrl(db);

    // Elenco todos
    app.get('/todos', function(req, res){
        todoCtrl.getAll(function(err, data){
            if(err)
                return res.status(500).send(err);

            res.send(data);
        });
    });

    // Singolo todo
    app.get('/todos/:id', function(req,res){
        var id = req.params.id || 0;
        var item = todoCtrl.get(id);
        res.send(item);
    });

    // Nuova attività
    app.post('/todos', function(req, res){
        var nome = req.body.nome;
        todoCtrl.post(nome, function(err, data){
            if(err)
                return res.status(500).send(err);

            res.status(201).send(data);
        });
        
    });

    // PUT aggiornamento dati
    app.put('/todos/:id', function(req, res){
        var id = req.params.id;
        var obj = req.body;
        var item = todoCtrl.put(id, obj);
        res.status(203).send(item);
    });

    // Cancellazione attività
    app.delete('/todos/:id', function(req, res){
        var id = req.params.id;
        var result = todoCtrl.delete(id);
        if(result) {
            res.status(202).send('Record ' + id +  ' cancellato');
        } else {
            res.status(404).send('Record ' + id +  ' non trovato');
        }
    });

}

