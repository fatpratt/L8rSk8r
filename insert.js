var mySql = require('mysql');

var connection = mySql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'sk8r'
});

connection.connect(function(err, conn) {
    if (err) {
         console.log('MySQL connection error: ', err);
         process.exit(1);
    }
    console.log('Connection established');
});

var park = {
	park: 'SoJo',
	location: 'South Jordan',
	rating: 3,
	descript: 'Roll-in clover leaf with 11 feet deep bowl and some street.'
};

var park = {
	park: 'Lone Peak',
	location: 'Sandy',
	rating: 5,
	descript: 'Best open flow and largest park in the state.'
};

var query = connection.query('insert into parks set ?', park, function(err, result) {
	console.log(query.sql);
	if (err) {
		console.error(err);
		return;
	} 
	console.log(result);
});

connection.end(function(err) {
  
});



