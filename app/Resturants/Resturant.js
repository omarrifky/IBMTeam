var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var ItemsSchema    = require('../Item/item');

// var ItemSchema = new Schema({
//     name : String,
// 	price : String
// });
var ResturantSchema = new Schema({

	name : String,
    location : String,
    hotline : String,
   // items : ItemSchema
});



module.exports =  mongoose.model('Resturant', ResturantSchema)