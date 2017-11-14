// 04 Prototype

var Alunno = function(nome, cognome) {
  this.nome = nome;
  this.cognome = cognome;
  this.comune = '';

  //a. Creazione proprietà nominativo (concatena nome e cognome)
  /*  
  this.nominativo = function() {
    return this.nome + ' ' + this.cognome;
  }
  */
}

//b. Utilizzo prototype per definizione metodo
Alunno.prototype.nominativo = function() {
  return this.nome + ' ' + this.cognome;
}


// creazione oggetto alunno1 di tipo Alunno
var alunno1 = new Alunno('Mario','Rossi');
var alunno2 = new Alunno('Pippo','Bianchi');


// Stampa oggetto alunno1
console.dir(alunno1);
console.dir(alunno2);

//Stampa nominativo
console.log('nominativo allievo1: ' + alunno1.nominativo());

alunno1.nome = 'Andrea';
console.log('nominativo allievo1: ' + alunno1.nominativo());


// Stampa eventuali metodi in prototype
console.dir(Alunno.prototype);