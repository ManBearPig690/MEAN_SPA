// app/routes.js

// grab the nerd model
var Nerd = require('./models/nerd');


module.exports = function(app){
    // server routes


    // sample api route
    app.get('/api/nerds', function(req, res){
        console.log("GET called!");
        // use mongose to get all nerds in the database
        Nerd.find(function(err, nreds){
            
            // check for an error while retrieving
            if(err)
                res.send(err);

            res.json(nerds);
        });
    });

    // rest of crud


    // frontend routes
    // route to handle all angular requests
    app.get('*', function(req, res){
        res.sendFile('/public/views/index.html', {root: './'}); // load our page
    });

};