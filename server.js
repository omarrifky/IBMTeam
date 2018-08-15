// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
 // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

// DATABASE SETUP
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myapp'); // connect to our database

// Handle the connection event
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("DB connection alive");
});

//Models lives here
//var Menu     = require('./app/Menu/menu');
var Items     = require('./app/Item/item');
var Resturants     = require('./app/Resturants/Resturant');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});


// // on routes that end in /Users
// ----------------------------------------------------
router.route('/resturant')
	// create a User (accessed at POST http://localhost:8080/resturants)
	.post(function(req, res) {
		
		var newresturant = new Resturants();		// create a new instance of the User model
		newresturant.name = req.body.name;  // set the Users name (comes from the request)
		newresturant.location = req.body.location; 
		newresturant.hotline = req.body.hotline;
		//newresturant.items = req.body.items;
		
		newresturant.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Resturant created!' });
		});
		 	})

// 	// get all the Users (accessed at GET http://localhost:8080/api/resturants)
	.get(function(req, res) {
		Resturants.find(function(err, Resturants) {
			if (err)
				res.send(err);

			res.json(Resturants);
		});
	});


// // on routes that end in /Users/:User_id
// // ----------------------------------------------------
router.route('/resturant/:resturant_id')

	.get(function(req, res) {
		Resturants.findById(req.params.resturant_id, function(err, Resturants) {
			if (err)
				res.send(err);
			res.json(Resturants);
		});
	})

	
// delete the User with this id
// delete the user with this id
.delete(function(req, res) {
	Resturants.remove({
		_id: req.params.resturant_id
	}, function(err, Resturants) {
		if (err)
			res.send(err);

		res.json({ message: 'Successfully deleted' });
	});
});

//-----------Itemmsss

router.route('/item/:resturant_id')
	// create a User (accessed at POST http://localhost:8080/item)
	.post(function(req, res) {
		var newitem = new Items();		// create a new instance of the User model
		newitem.name = req.body.name;
		newitem.price = req.body.price;
		newitem.resturantname = req.body.resturantname;
		newitem.resturantid = req.params.resturant_id;
		newitem.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Item created!' });
		});
		
	
		 	})
router.route('/item')
// 	// get all the Users (accessed at GET http://localhost:8080/api/item)
	.get(function(req, res) {
		Items.find(function(err, Items) {
			if (err)
				res.send(err);

			res.json(Items);
		});
	});


// // on routes that end in /Users/:User_id
// // ----------------------------------------------------
router.route('/item/:item_id')

	.get(function(req, res) {
		Items.findById(req.params.item_id, function(err, Items) {
			if (err)
				res.send(err);
			res.json(Items);
		});
	})

	router.route('/resturantitems/:resturant_id')
	.get(function(req, res) {
		Items.find({resturantid:req.params.resturant_id}, function(err, Items) {
			if (err)
				res.send(err);
			res.json(Items);
		});
	})
router.route('/item/:item_id')
.delete(function(req, res) {
	Items.remove({
		_id: req.params.item_id
	}, function(err, Items) {
		if (err)
			res.send(err);

		res.json({ message: 'Successfully deleted' });
	});
});
// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
