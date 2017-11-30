// routes/index.js

var TodoCtrl = require('../controllers/todoCtrl');

module.exports = function(app, db) {
    var todoCtrl = new TodoCtrl(db);

    // Elenco todos
    app.get('/todos', function(req, res){
        var cerca = req.query.search || '';
        var page = req.query.page || 1; 
        
        todoCtrl.getAll(page, cerca, function(err, data){
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
        todoCtrl.put(id, obj, function(err, data){
             if(err)
                return res.status(500).send(err);

            res.status(203).send(data);
        });
    });

    // Cancellazione attività
    app.delete('/todos/:id', function(req, res){
        var id = req.params.id;
        
        todoCtrl.delete(id, function(err, data){
            if(err)
                return res.status(500).send(err);

            res.status(203).send('Record ' + id +  ' cancellato');
        });        
    });

}

