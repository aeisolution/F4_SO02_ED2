// WebServer con modulo http di nodejs

// Utilizzo moduli nodejs
const http = require('http'),
      fs = require('fs');

var pagina_index = fs.readFileSync(__dirname + '/static/index.html')

// Creazione webserver
http.createServer(function(req, res){
    console.log('Richiesta ricevuta: ' + req.url);

    if(req.url=='/index.html') {
        res.write(pagina_index);
    } else if(req.url=='/about.html') {
        res.write('Siamo il Team del Corso BT');   
    } else {
        res.write('Errore 404: File non trovato!');
    }
    res.write('\nHai richiesto: ' + req.url);
    res.end();
}).listen(8080);

console.log('Web Server started on port 8080');