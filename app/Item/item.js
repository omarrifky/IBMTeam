var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
	resturantid: String,
	name : String,
	price : String
});

module.exports =  mongoose.model('Item', ItemSchema)