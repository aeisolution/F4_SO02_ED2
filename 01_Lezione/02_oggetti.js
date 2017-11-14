// 02 Oggetti

// Dichiarazione Oggetti
//var alunno = new Object();
var alunno1 = {
    nome: 'Mario',
    cognome: 'Rossi'
};

// Stampa oggetto
console.dir(alunno);

// Stampare contenuto oggetto alunno mediante ciclo
for(var key in alunno) {
    console.log(key + ': ' + alunno[key]);
}

// Stampare nome e cognome alunno con dot notation
console.log(alunno.nome);
console.log(alunno.cognome);

// Aggiunta comune ad oggetto alunno
alunno.comune = 'Palermo';
console.dir(alunno);