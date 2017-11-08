// 03 Scope - Ambito di definizione delle variabili

var index = 0,
    nome = 'Mario';

// Stampa valori
console.log('i: ' + index + ' - nome: ' + nome);

// Definizione di funzione
function init() {
    console.log('i: ' + index + ' - nome: ' + nome);
}

init();

// Definizione di funzione con varibile locale
function init_locale() {
    var index = 5;
    console.log('i: ' + index + ' - nome: ' + nome);
}

init_locale();
console.log('i: ' + index + ' - nome: ' + nome);

// Definizione di funzione con parametro nome 
function init_param(nome) {
    index = 5;
    console.log('i: ' + index + ' - nome: ' + nome);
}

init_param('Filippo');
console.log('i: ' + index + ' - nome: ' + nome);


{
    let index = 7;
    console.log('i: ' + index + ' - nome: ' + nome);
}
console.log('i: ' + index + ' - nome: ' + nome);

