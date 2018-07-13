var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    id:Number,
    username:String,
    password:String
})
module.exports = mongoose.model('user',schema)