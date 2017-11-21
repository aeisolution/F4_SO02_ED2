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
}

