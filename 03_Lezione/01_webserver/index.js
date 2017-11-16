// WebServer con modulo http di nodejs

// Utilizzo moduli nodejs
const http = require('http');


// Creazione webserver
http.createServer(function(req, res){
    console.log('Richiesta ricevuta');
    res.write('Benvenuto nel nostro sito web');
    res.end();
}).listen(8080);

console.log('Web Server started on port 8080');