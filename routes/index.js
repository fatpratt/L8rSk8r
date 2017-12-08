var express = require('express');
var router = express.Router();
var mySql = require('mysql');

var connection = mySql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'sk8r'
});

connection.connect(function(err, conn) {
	if (err) {
		console.log('MySQL connection error: ', err);
	} else {
		console.log('Connection established');
	}
});

router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/api/parks/:id(\\d+)', function(req, res, next) {	// get specific park (http://localhost:3000/api/parks/3)
	connection.query('select * from parks where id=?', [req.params.id], function (error, results, fields) {
		if (error) throw error;
		res.end(JSON.stringify(results));	
	});	
});

router.get('/api/parks/', function(req, res) {
	if (req.query && req.query.park) {		// search by park name (http://localhost:3000/api/parks?park=skate)
		connection.query("select * from parks where park like ?", '%' + req.query.park + '%', function(error, results, fields) {
			if (error) throw error;
			res.end(JSON.stringify(results));
		});
	} else {								// get all (http://localhost:3000/api/parks/)
		connection.query('SELECT * from parks ', function(error, results, fields) {
			if (error) throw error;
			res.end(JSON.stringify(results));	
		});
	}		
});

router.post('/api/parks/', function(req, res, next) {  
	connection.query('insert into parks (park, location, rating, descript) values(?,?,?,?) ', 
			[req.body.park, req.body.location, req.body.rating, req.body.descript],  function (error, results, fields) {
		if (error) throw error;
		res.end(JSON.stringify(results));	
	});	
	res.status(201).send(req.body.park + ' ' + req.body.location + ' ' + req.body.rating + ' ' + req.body.descript);
});

router.put('/api/parks/:id', function(req, res, next) {  
	connection.query("update parks set park=?, location=?, rating=?, descript=? where Id=?", 
			[req.body.park, req.body.location, req.body.rating, req.body.descript, req.params.id],  function (error, results, fields) {
		if (error) throw error;
		res.end(JSON.stringify(results));	
	});  
	res.status(201).send(req.body.park + ' ' + req.body.location + ' ' + req.body.rating + ' ' + req.body.descript);
});

router.delete('/api/parks/:id', function(req, res, next) {  
	connection.query('delete from parks where id=?', [req.params.id], function (error, results, fields) {
		if (error) throw error;
		res.status(204).send();
	});	
});

module.exports = router;
