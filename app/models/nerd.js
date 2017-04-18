var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Nerd = new Schema({
    name : { type: String }
});

module.exports = mongoose.model('Nerd', Nerd);