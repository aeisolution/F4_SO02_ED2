// Webserver con modulo express.js

// Utilizzo libreria Express
var express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    app = express();

var routes = require('./routes');

// Configurazione Express con middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// Gestione file statici
app.use(express.static(__dirname + '/static'));

// Middleware di autenticazione
// TODO: nuovo sistema di autenticazione


// Routes
routes(app);


// Middleware per pagina non trovata
app.use(function(req, res){
    console.log('404: file non trovato');
    res.status(404).send('File non trovato');
});


// Avvio Server
app.listen(8080);
console.log("WebServer started on port 8080");