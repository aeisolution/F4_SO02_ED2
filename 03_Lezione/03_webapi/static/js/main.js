// Script di gestione index.html

function creaRiga(data) {
        $('#tb_todos tbody').append('<tr><td>' 
            + data._id 
            + '<input name="id" type="hidden" value="' + data._id +'" /></td><td>'
            
            + '<span>' + data.nome + '</span>'
            + '<input name="nome" type="text" value="' + data.nome +'" /></td><td>'

            + '<span>' + data.evasa + '</span>'
            + '<input name="evasa" type="checkbox" ' + (data.evasa=='true' ? 'checked' : '') +' /></td><td>'

    + '<div class="btn_update"><button class="btn btn-default setEdit">annulla</button>'
    + '<button class="btn btn-success btn_salva">salva</button>'
    + '</div>'        

    + '<div class="btn_view"><button class="btn btn-default setEdit">modifica</button>'
    + '<button class="btn btn-danger" onclick="cancella(\'' + data._id +  '\')">cancella</button>'
    + '</div>'    
    + '</td></tr>');
}

function initHandler() {
    $('.setEdit').on('click', function(event){
        $(this).closest('tr').toggleClass('edit');
    });

    $('.btn_salva').on('click', function(event){
        var tr = $(this).closest('tr');

        var nome    = tr.find("[name='nome']").val(),
            id      = tr.find("[name='id']").val(),
            evasa   = tr.find("[name='evasa']:checked").val() == 'on';

        $.ajax({
            url: '/todos/' + id,
            method: 'PUT',
            data: {
                id: id,
                nome: nome,
                evasa: evasa
            },
            success: function(data) {
                caricaDati();
            },
            failure: function(err) {
                alert('ERRORE: ' + err);
            }
        });
            
    });    
}


function caricaDati() {

    $('#tb_todos tbody').html('');

    // Connessione al server in modalità ajax
    $.ajax({
        url: '/todos',
        method: 'GET',
        success: function(data) {

            for(var i=0; i< data.length; i++) {
                creaRiga(data[i]);
            }

            initHandler();                    
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
            creaRiga(data.ops[0]);
            initHandler();
        }
    });

}


function cancella(id) {
    $.ajax({
        url: '/todos/' + id,
        method: 'DELETE',
        success: function(data) {
            caricaDati();
        },
        failure: function(data) {
            alert(data);
        }
    });
}