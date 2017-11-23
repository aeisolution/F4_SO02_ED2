// Script di gestione index.html

function caricaDati() {

    $('#tb_todos tbody').html('');

    // Connessione al server in modalità ajax
    $.ajax({
        url: '/todos',
        method: 'GET',
        success: function(data) {

            for(var i=0; i< data.length; i++) {
                $('#tb_todos tbody').append('<tr><td>' 
                    + data[i].id 
                    + '<input name="id" type="hidden" value="' + data[i].id +'" /></td><td>'
                    
                    + '<span>' + data[i].nome + '</span>'
                    + '<input name="nome" type="text" value="' + data[i].nome +'" /></td><td>'

                    + '<span>' + data[i].evasa + '</span>'
                    + '<input name="evasa" type="checkbox" ' + (data[i].evasa ? 'checked' : '') +'" /></td><td>'

            + '<div class="btn_update"><button class="btn btn-default setEdit">annulla</button>'
            + '<button class="btn btn-success btn_salva">salva</button>'
            + '</div>'        

            + '<div class="btn_view"><button class="btn btn-default setEdit">modifica</button>'
            + '<button class="btn btn-danger" onclick="cancella(' + data[i].id +  ')">cancella</button>'
            + '</div>'    
            + '</td></tr>');
            }

            $('.setEdit').on('click', function(event){
                $(this).closest('tr').toggleClass('edit');
            });
            
            $('.btn_salva').on('click', function(event){
                var tr = $(this).closest('tr');

                var nome    = tr.find("[name='nome']").val(),
                    id      = tr.find("[name='id']").val(),
                    evasa   = tr.find("[name='evasa']:checked").val() == 'on' ? true : false;

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
            $('#tb_todos tbody').append('<tr><td>' 
                                    + data.id + '</td><td>'
                                    + data.nome + '</td><td>' 
                                    + data.evasa + '</td><td>' 
            + '<button class="btn btn-danger" onclick="cancella(' + data.id +  ')">cancella</button>'
                                     + '</td></tr>');
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