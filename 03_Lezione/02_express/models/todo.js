// modello todo per attività

var iCount = 0;

module.exports = function(nome) {
    this.id = ++iCount;
    this.nome = nome || 'Nuova attività';
    this.evasa = false;
    this.dtInsert = Date.now();
}