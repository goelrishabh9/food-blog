var mongoose = require('mongoose');

//SCHEMA setup
var userSchema = new mongoose.Schema({
    loginid:String,
    password:String
});

module.exports = mongoose.model('user', userSchema);