// routes/index.js

var TodoCtrl = require('../controllers/todoCtrl');

module.exports = function(app) {
    var todoCtrl = new TodoCtrl();

    // Home Page
    app.get('/', function(req, res, next){
        console.log('Richiesta ricevuta: ' + req.url);
        res.send('Benvenuto ' + req.username +  ' in Home Page');
    });

    // About
    app.get('/about', function(req, res){
        console.log('Richiesta ricevuta: ' + req.url);
        res.send('Benvenuto nel nostro Team!');
    });    


    // Elenco todos
    app.get('/todos', function(req, res){
        var items = todoCtrl.getAll();
        res.send(items);
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
        var obj = todoCtrl.post(nome);
        res.status(201).send(obj);
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

