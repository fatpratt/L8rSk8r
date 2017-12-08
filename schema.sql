CREATE TABLE parks (
	id INT PRIMARY KEY AUTO_INCREMENT,
	park VARCHAR(100) NOT NULL,
	location VARCHAR(100),
	rating INT,
	descript  VARCHAR(200)
);

select * from parks;

insert into parks (park, location, rating, descript) values('Sandy Skatepark', 'Lone Peak Park', 5, 'Best open flow park in Utah');

insert into parks (park, location, rating, descript) values('SoJo Skatepark', 'Behind fitness center', 3, 'Roll-in pool style cloverleaf with some street');

insert into parks (park, location, rating, descript) values('West Valley City', '5600 West', 4, 'Only park in Utah with a snake-run and doughnut hole.');

delete from parks where id = 9;