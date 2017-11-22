// Script di gestione index.html

function caricaDati() {
    var tb = document.getElementById('tb_todos');
    var tbody = tb.getElementsByTagName('tbody')[0];

    tbody.innerHTML = '';

    // Connessione al server in modalità ajax
    $.ajax({
        url: '/todos',
        method: 'GET',
        success: function(data) {
            for(var i=0; i< data.length; i++) {
                tbody.innerHTML += '<tr><td>' 
                                    + data[i].id + '</td><td>'
                                    + data[i].nome + '</td><td>' 
                                    + data[i].evasa + '</td><td>'
                + '<button onclick="cancella(' + data[i].id + ')">cancella</button>' 
                            + '</td></tr>';
            }
        }
    });
}


function inviaDati() {
    var nomeAttivita = document.getElementById('nomeAttivita').value;
    $.ajax({
        url: '/todos',
        method: 'POST',
        data: {
            nome: nomeAttivita
        },
        success: function(data) {
            var tb = document.getElementById('tb_todos');
            var tbody = tb.getElementsByTagName('tbody')[0];
            
            tbody.innerHTML += '<tr><td>' 
                                    + data.id + '</td><td>'
                                    + data.nome + '</td><td>' 
                                    + data.evasa + '</td></tr>';   
        }
    });

}


function cancella(id) {
    $.ajax({
        url: '/todos/' + id,
        method: 'DELETE',
        success: function(data) {
            alert('Record Cancellato');
        },
        failure: function(data) {
            alert('Record NON Cancellato');
        }
    });
}