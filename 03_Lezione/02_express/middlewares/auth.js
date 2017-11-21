
app.use(function(req, res, next){
    if(req.query.key && req.query.key=='1234') {
        console.log('Autorizzato');
        req.username = 'mario.rossi';
        next();
    } else {
        console.log('NON Autorizzato');
        res.status(401).send('Utente non autorizzato');
    }
});