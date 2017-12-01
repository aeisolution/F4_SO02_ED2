// Script di gestione index.html
var _page = 1;
var _count = 0;

function refreshLabel(page) {
    $('#labelPage').html(page);
}

function refreshBadge() {
    var cerca = $('#strCerca').val();

    $.ajax({
        url: '/todos/count?search=' + cerca,
        method: 'GET',
        success: function(data) {
            _count = data.count;
            pagination();
            $('#badgeDocuments').html(data.count);
        }
    });
}

function pagination() {
    // Recupero tag li per precedente e successivo
    var prev = $('.pagination li:first');
    var next = $('.pagination li:last');

    // Svuolto ul pagination
    $('.pagination').html('');

    // Aggiungo li precedente
    $('.pagination').append(prev);

    // Conteggio Pagine
    var countPage =  Math.floor(_count/10);
    if( _count % 10 > 0)
        countPage += 1; 

    // Inserimento li per singola pagina
    for(var i=1; i<=countPage; i++) {
        var obj = '<li><a href="#" onclick="searchDati(' + i + ')">' + i +'</a></li>';
        $('.pagination').append(obj);
    }

    // Aggiungo li successivo
    $('.pagination').append(next);
                    
    
}

function pageNext() {
    _page++;
    searchDati(_page);
}

function pagePrevious() {
    if(_page>1) {
        _page--;
        searchDati(_page);
    }
}

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
                searchDati();
            },
            failure: function(err) {
                alert('ERRORE: ' + err);
            }
        });
            
    });    
}



function searchDati(page) {

    $('#tb_todos tbody').html('');

    var cerca = $('#strCerca').val();

    _page = page;
    refreshLabel(page);   
    
    if(page==1) 
        refreshBadge();
    
    // Connessione al server in modalità ajax
    $.ajax({
        url: '/todos?search=' + cerca + '&page=' + page,
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
            searchDati(_page);
        },
        failure: function(data) {
            alert(data);
        }
    });
}