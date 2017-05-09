// server.js

/// MODULES
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride  = require('method-override');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

// INITIAL CONFIG

// config files
var db = require('./config/db'); // db config

// set our port
var port = process.env.PORT || 8080;

// connec to db => uncomment after config/db.js is created and configed.
mongoose.connect(db.url);

// read cookies needed for auth
app.use(cookieParser()); 


//intialize passport
app.use(session({secret: 'secret'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse applicatoin/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));



// CONFIGURE PASSPORT

require('./config/passport')(passport); // same as app.require('./app/passport.js')

// ROUTES
require('./app/routes')(app, passport); // configure the routes

//configure passport


// STATR APP
app.listen(port); // http://localhost:8080

// console out to the user
console.log('Magic happens on port: ', port);

// expose app
exports = module.exports = app;