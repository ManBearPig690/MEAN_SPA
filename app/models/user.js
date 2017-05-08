// app/models/account.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Account = new Schema({
    username: String,
    password: String,
    email: String
});

module.exports = mongoose.model('User', User);