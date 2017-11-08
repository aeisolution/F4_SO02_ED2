// 01 Sintassi
/*
    Esercitazione per definizione ed utilizzo
    variabili base e array
*/

// Dichiarazione Varibiali
var numero = 23,
    numero2 = '23',
    nome = 'Mario Rossi';


// Stampa a video
console.log(numero + 5);
console.log(numero2 + 5);


//-----------------------------
// Definizione e utilizzo Array

var alunni = ['Fausto', 'Cristian', 
              'Leonardo', 'Ignazio', 
              'Emanuele', 'Danilo'];


// Stampa del contenuto dell'array
console.dir(alunni);


// Stampa array mediante ciclo for e forEach degli elementi
console.log('Stampa tramite ciclo for');
for(var i = 0; i < alunni.length; i++) {
    console.log(i + 1 + ' ' + alunni[i]);
}

console.log('Stampa tramite ciclo forEach');
var index = 0;
alunni.forEach(function(item){
    console.log(++index + ' ' + item);
});

// Aggiunta di Mario ad array alunni
alunni.push(nome);
console.dir(alunni);

// Calcolare la posizione di Ignazio
var index = alunni.indexOf('Ignazio');
console.log(index + ': ' + alunni[index]);