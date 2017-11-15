// 06 import CSV

// Utilizzo Librerie
var fs = require('fs'),
    parse = require('csv-parse');

var import_fields = [
    'Sigla automobilistica',
    'Denominazione provincia',
    'Denominazione regione',
    'Ripartizione geografica'
];

var import_indexes = [];

// Array con import elenco CSV
var list = [];

// Configurare libreria CSV-parse
var parser = parse({delimiter: ";"});

// TODO: completare procedura di utilizzo csv-parse
var iCount = 0; 
parser.on('readable',function(){
    var item = parser.read();
    if(!item) return;

    // Verifica dati in testata (prima riga)
    if(iCount==0) {
        iCount++;
        import_fields.forEach(function(elem){
            var iPos = item.indexOf(elem); //iPos==-1 se elem non trovato
            import_indexes.push(iPos);
        });        
        console.log('Posizioni');
        console.log(import_indexes);
    } 
    // Dati successivi
    else {
        var record = {};
        import_indexes.forEach(function(pos, i){
            if(pos>=0)
                record[import_fields[i]] = item[pos];
                //record.push(item[pos]);
        });
        list.push(record);
    }
});

// Oggetto vuoto e creazione chiave con valore
var obj = {};
obj.nome = 'mario';
obj['nome'] = 'mario';




parser.on('error',function(err) {
    console.log("Errore: " + err.message);
});

parser.on('finish',function(){
    console.dir(list);

    /*
    var filtered = list.filter(function(value){
        return value[6].toUpperCase() == "ABRUZZO";
    });
    console.dir(filtered);
    */
});

fs.createReadStream( __dirname + '/data/istat_province.csv').pipe(parser);
