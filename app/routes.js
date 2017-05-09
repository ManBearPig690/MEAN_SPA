// app/routes.js

// grab the nerd model
var Nerd = require('./models/nerd');


module.exports = function(app){
    // server routes

    // login routes
    app.post('/login',
        passport.authenticate('local',{
            successRedirect: '/loginSuccess',
            failureRedirect: '/loginFailure'
        })
    );

    app.get('/loginFailure', function(req, res, next){
        res.send('Failed to authenticate');
    });

    app.get('/loginSuccess', function(req, res, next){
        res.send('Successfully authenticated');
    });

    // sample api route
    // Content-Type: application/x-www-form-urlencoded && application/json
    app.get('/api/nerds', function(req, res){
        console.log("GET called!");
        // use mongose to get all nerds in the database
        Nerd.find({}, function(err, nerds){
            
            // check for an error while retrieving
            if(err)
                res.send(err);

            res.json(nerds);
        });
    });

    app.post('/api/nerd', function(req, res){
        var nerd = new Nerd();
        nerd.name = req.body.name;
        console.log(nerd);
        nerd.save(function(err){
            if(err)
                res.send(err);

            res.json({message: 'Nerd Created!'});
        });
    });

    // rest of crud


    // frontend routes
    // route to handle all angular requests
    app.get('*', function(req, res){
        res.sendFile('/public/views/index.html', {root: './'}); // load our page
    });

};