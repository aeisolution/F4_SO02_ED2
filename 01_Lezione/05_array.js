// 05 Array

// Creazione array Province - archiviare array in file data/province.js
var province = require('./data/province');

// ---------------------------------------------
// 1. Creare funzione logTop per stampa primi n elementi di un array
function logTop(arr=[], n=-1) {
    if(n===-1) n = arr.length;
    for(var i=0;i<n && i<arr.length;i++){
        console.dir(arr[i]);
    }
}


// Stampa primi 10 elementi di array province
console.log('\nStampa Province prima di ordinamento');
logTop(province, 5);

// ---------------------------------------------
// Ordinare array province per campo sigla crescente
province.sort(function(a, b){
    // Se a < b return -1
    if(a.sigla < b.sigla) 
        return -1;

    // Se a > b return 1
    if(a.sigla > b.sigla)
        return 1;

    // Se a = b return 0
    return 0;
});


// Stampa primi 10 elementi di array province
console.log('\nStampa Province dopo ordinamento');
logTop(province, 5);

// ---------------------------------------------
// Eseguire filtro per sole Province della Sicilia
var provSicilia = province.filter(function(item){
    return item.regione.toUpperCase() == 'SICILIA';
});

// Notazione con Arrow Function
var provSicilia = province.filter( (item) => item.regione.toUpperCase() == 'SICILIA' );

// Stampa tutti gli elementi dell'array filtrato
console.log('\nStampa Province della SICILIA');
logTop(provSicilia);

// ---------------------------------------------
// Conta il numero di province della LOMBARDIA
var countLombardia = province.reduce(function(sum, item){
    return item.regione.toUpperCase() == 'LOMBARDIA' ? sum + 1 : sum;
}, 0) ;


// Stampa numero province in Lombardia
console.log("N. " + countLombardia +  " Province in Lombardia");

// ---------------------------------------------
// Creare un array delle province con campo regione in Capital Letter
var provCapitalize = province.map(function(item){
    item.regione = item.regione.toLowerCase();
    item.regione = item.regione[0].toUpperCase() + item.regione.slice(1); 
    return item;
});


// Stampa prime 10 elementi dell'array provCapitalize
console.log('\nStampa Province Capitalize Regione');
logTop(provCapitalize, 10);
