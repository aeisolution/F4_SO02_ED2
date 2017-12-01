// routes/index.js

var ApiCtrl = require('../controllers/apiCtrl');

module.exports = function(app, db) {
    var apiCtrl = new ApiCtrl(db);

    var url = '/api';

    // Elenco 
    app.get(url + '/:coll', function(req, res){
        var coll = req.params.coll;

        var cerca = req.query.search || '';
        var page = req.query.page || 1; 
        
        apiCtrl.getAll(coll, page, cerca, function(err, data){
            if(err)
                return res.status(500).send(err);
            
            res.send(data);
        });
    });

    // Count todos
    app.get(url + '/:coll/count', function(req, res){
        var coll = req.params.coll;
        var cerca = req.query.search || '';

        apiCtrl.count(coll, cerca, function(err, data){
            if(err)
                return res.status(500).send(err);
            
            var obj = { count: data }; 

            res.send(obj);            
        })
    });


    // Nuova attività
    app.post(url + '/:coll', function(req, res){
        var coll = req.params.coll;
        var obj = req.body;
        apiCtrl.post(coll, obj, function(err, data){
            if(err)
                return res.status(500).send(err);

            res.status(201).send(data);
        });
        
    });

    // PUT aggiornamento dati
    app.put(url + '/:coll/:id', function(req, res){
        var coll = req.params.coll;
        var id = req.params.id;
        var obj = req.body;
        apiCtrl.put(coll, id, obj, function(err, data){
             if(err)
                return res.status(500).send(err);

            res.status(203).send(data);
        });
    });

    // Cancellazione attività
    app.delete(url + '/:coll/:id', function(req, res){
        var coll = req.params.coll;
        var id = req.params.id;
        
        apiCtrl.delete(coll, id, function(err, data){
            if(err)
                return res.status(500).send(err);

            res.status(203).send('Record ' + id +  ' cancellato');
        });        
    });

}

