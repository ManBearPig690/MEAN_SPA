//app/passport.js
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../app/models/user');

// expose this module to app
module.exports = function(app){

    // passport session set up
    // required for persistent login sessions
    // needs to be able to serialize and deserialize

    passport.serializeUser(function(user, done){
        done(null, user);
    });

    passport.deserializeUser(function(user, done){
        User.findById(id, function(err, user){
            done(err, user);
        })
    });


    // LOCAL SIGNUP
    passport.use('local-signup', new LocalStrategy({
        passReqToCallback: true
    },
    function(req, username, password, done){
        // asynchronous
        process.nextTick(function(){
            User.findOne({'local.username': username}, function(err, user){
                if(err){
                    return done(err);
                }
                if(user){
                    return done(null, false, req.flash('signupMessage', 'The Username is already in use.'))
                }
                else{
                    //set the user's local credentials

                    var newUser = new User();
                    newUser.local.username = username;
                    newUser.local.password = newUser.generateHash(password);

                    // save the user
                    newUser.save(function(err){
                        if(err)
                            throw err;

                        return done(null, newUser);
                    });

                }
            });
        });
    }));

    // LOCAL LOGIN
    passport.use('local-login', new LocalStrategy({
        passreqToCallback: true
    },function(req, usernam, passowrd, done){
        User.findOne({'local.username': username},function(err, user){
            if(err)
                return done(err);

            if(!user || !user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Invalid Username or Password.'));
            
            return done(null, user);
        });
    }));
    
};