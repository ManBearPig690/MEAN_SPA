// app/routes.js

// grab the nerd model
var Nerd = require('./models/nerd');
var User = require('./models/user');

module.exports = function(app, passport){
    // server routes
    app.post('/api/signup', passport.authenticate('local-signup', {
        successredirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));
    
    app.post('/api/login', passport.authenticate('local-login',{
        successredirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    // sample api route
    // Content-Type: application/x-www-form-urlencoded && application/json
    app.get('/api/nerds', isAuthenticated, function(req, res){
        console.log("GET called!");
        // use mongose to get all nerds in the database
        Nerd.find({}, function(err, nerds){
            
            // check for an error while retrieving
            if(err)
                res.send(err);

            res.json(nerds);
        });
    });

    app.post('/api/nerd', isAuthenticated, function(req, res){
        var nerd = new Nerd();
        nerd.name = req.body.name;
        console.log(nerd);
        nerd.save(function(err){
            if(err)
                res.send(err);

            res.json({message: 'Nerd Created!'});
        });
    });

    app.get('/api/checkLogin', function(req, res){
        if(req.isAuthenticated){
            res.send(true);
        }
        else{
            res.send(false)
        }

    })
    
    // frontend routes
    // route to handle all angular requests
    app.get('/login', function(req, res){
        res.sendFile('/public/views/index.html', {root: './'});
    });

    app.get('/signup', function(req, res){
        res.sendFile('/public/views/index.html', {root: './'}); // load our page
    });

    app.get('/', isAuthenticated, function(req, res){
        res.sendFile('/public/views/index.html', {root: './'}); // load our page
    });

    app.get('/profile', isAuthenticated, function(req, res){
        res.sendFile('/public/views/index.html', {root: './'}); // load our page
    });

    app.get('/nerd', isAuthenticated, function(req, res){
        res.sendFile('/public/views/index.html', {root: './'}); // load our page
    });

    



    // route middleware to make sure user is logged in
    function isAuthenticated(req, res, next){
        // if user is authenticated in session, move along...
        if(req.isAuthenticated())
            return next();

        // if not...
        console.log("redirect to login");
        res.redirect('/login');
    }

};