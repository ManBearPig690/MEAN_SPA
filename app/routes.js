// app/routes.js

// grab the nerd model
var Nerd = require('./models/nerd');
var User = require('./models/user.js');

module.exports = function(app, passport){
    // server routes

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