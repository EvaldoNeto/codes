-- Random name generator from https://thecodecave.com/generating-random-names-in-mysql/

DROP function if exists generate_fname;
DELIMITER $$
CREATE FUNCTION generate_fname () RETURNS varchar(255) -- generates a random first name
BEGIN
	RETURN ELT(FLOOR(1 + (RAND() * (100-1))), "James","Mary","John","Patricia","Robert","Linda","Michael","Barbara","William","Elizabeth","David","Jennifer","Richard","Maria","Charles","Susan","Joseph","Margaret","Thomas","Dorothy","Christopher","Lisa","Daniel","Nancy","Paul","Karen","Mark","Betty","Donald","Helen","George","Sandra","Kenneth","Donna","Steven","Carol","Edward","Ruth","Brian","Sharon","Ronald","Michelle","Anthony","Laura","Kevin","Sarah","Jason","Kimberly","Matthew","Deborah","Gary","Jessica","Timothy","Shirley","Jose","Cynthia","Larry","Angela","Jeffrey","Melissa","Frank","Brenda","Scott","Amy","Eric","Anna","Stephen","Rebecca","Andrew","Virginia","Raymond","Kathleen","Gregory","Pamela","Joshua","Martha","Jerry","Debra","Dennis","Amanda","Walter","Stephanie","Patrick","Carolyn","Peter","Christine","Harold","Marie","Douglas","Janet","Henry","Catherine","Carl","Frances","Arthur","Ann","Ryan","Joyce","Roger","Diane");
END$$

DELIMITER ;

DROP function if exists generate_lname;
DELIMITER $$
CREATE FUNCTION generate_lname () RETURNS varchar(255) -- generates a random last name
BEGIN
	RETURN ELT(FLOOR(1 + (RAND() * (100-1))), "Smith","Johnson","Williams","Jones","Brown","Davis","Miller","Wilson","Moore","Taylor","Anderson","Thomas","Jackson","White","Harris","Martin","Thompson","Garcia","Martinez","Robinson","Clark","Rodriguez","Lewis","Lee","Walker","Hall","Allen","Young","Hernandez","King","Wright","Lopez","Hill","Scott","Green","Adams","Baker","Gonzalez","Nelson","Carter","Mitchell","Perez","Roberts","Turner","Phillips","Campbell","Parker","Evans","Edwards","Collins","Stewart","Sanchez","Morris","Rogers","Reed","Cook","Morgan","Bell","Murphy","Bailey","Rivera","Cooper","Richardson","Cox","Howard","Ward","Torres","Peterson","Gray","Ramirez","James","Watson","Brooks","Kelly","Sanders","Price","Bennett","Wood","Barnes","Ross","Henderson","Coleman","Jenkins","Perry","Powell","Long","Patterson","Hughes","Flores","Washington","Butler","Simmons","Foster","Gonzales","Bryant","Alexander","Russell","Griffin","Diaz","Hayes");
END$$
DELIMITER ;

DROP function if exists generate_places;
DELIMITER $$
CREATE FUNCTION generate_places () RETURNS varchar(255) -- generates a random place
BEGIN
	RETURN ELT(FLOOR(1 + (RAND() * (26))), "Mordor", "The Shire", "Winterfell", "The Wall", "Caprica", "Atlantis", "Bikini Bottom", "Naboo", "Netherworld", "Tatooine", "Jupiter", "Netuno", "Valfenda", "Softville", "Crematoria", "Texas", "Vegas", "Pluto", "Kabuto", "Thra", "Kings Landing", "Hogwarts", "Haven", "Vault 81", "Earth", "21 Jump Street");
END$$

DELIMITER ;

DROP function if exists valor;

DELIMITER $$
CREATE FUNCTION valor() RETURNS INT -- generates a random numberbetween 1 and 10000;
BEGIN
	RETURN FLOOR(1 + (RAND() * (10000)));
END$$

-- Random dates, code From https://stackoverflow.com/questions/11906572/mysql-insert-random-datetime-in-a-given-datetime-range/28944156#28944156
DELIMITER ;

DROP function if exists randomDate;
DELIMITER $$
CREATE FUNCTION randomDate() RETURNS datetime -- generates a random date between 2013-1-1 and 2018-2-16
BEGIN
	RETURN from_unixtime(unix_timestamp('2013-1-1') + floor(rand() * (unix_timestamp('2018-2-16') - unix_timestamp('2013-1-1') + 1)));
END$$


DELIMITER ;
DROP function if exists nextDate; 
DELIMITER $$
CREATE FUNCTION nextDate(currentDate datetime, n INT) RETURNS datetime -- Skips n months from the currentDate
BEGIN
	RETURN from_unixtime(unix_timestamp(currentDate) + n*30*24*3600);
END$$

DELIMITER ;
-- Procedure to generate a clients table
DROP PROCEDURE if exists clientsGenerator;

DELIMITER $$
CREATE PROCEDURE clientsGenerator() -- generate and populate Clientes table
BEGIN
	CREATE TABLE Clientes(
	       	ID BIGINT NOT NULL AUTO_INCREMENT,
       		NOME VARCHAR(128) NOT NULL,
		EMAIL VARCHAR(128) NULL,
       		PRIMARY KEY (ID)
		);
	SET @x:=1;
	WHILE @x <= 10 DO -- change this number if you wish more clients, gotta also change line 106
	      set @Pnome = generate_fname();
	      set @Lnome = generate_lname();
	      INSERT INTO Clientes (NOME, EMAIL) VALUES (CONCAT(@Pnome, ' ', @LNome), CONCAT(@Pnome,'_', @LNome, '@gmail.com'));
	      SET @x = @x + 1;
	END WHILE;
END$$

-- Procedure to generate request table
DELIMITER ;

DROP PROCEDURE if exists requestGenerator;

DELIMITER $$
CREATE PROCEDURE requestGenerator() -- generate and populate Pedidos and Parcelas tables
BEGIN
	CREATE TABLE Pedidos(
	       	ID BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
		ID_Cliente BIGINT NOT NULL,
		data_pedido DATETIME NOT NULL,
       		endereco VARCHAR(128) NULL,
       		CONSTRAINT pedidosUnicos UNIQUE(ID_Cliente, data_pedido, endereco),
		FOREIGN KEY (ID_Cliente) REFERENCES Clientes(ID) ON DELETE CASCADE
		);
		
	CREATE TABLE Parcelas(
       	       ID BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
       	       ID_Pedido BIGINT NOT NULL,
       	       data_pgto DATETIME NOT NULL,
       	       valor BIGINT NOT NULL,
       	       CONSTRAINT parcelasUnicas UNIQUE(ID_Pedido, data_pgto, valor),
       	       FOREIGN KEY (ID_Pedido) REFERENCES Pedidos(ID) ON DELETE CASCADE
);

	SET @x:=1; -- x is the order number
	WHILE @x <= 100 DO -- change this number to modify the number of orders
	      SET @idCliente = FLOOR(1 + (RAND() * (10))); -- generate a random ID, a number between 1 and 10. If you changed the number of clients, gotta change 10 to that same number
	      SET @diaPedido = randomDate(); -- generate a random day
	      SET @endereco = generate_places(); -- generate a random place
	      INSERT INTO Pedidos (ID_Cliente, data_pedido, endereco) VALUES (@idCliente, @diaPedido, @endereco); 
	      
	      SET @y:=1;  
	      SET @np:= FLOOR(1 + (RAND() * (24))); -- np is the number of monthly payments, here a random number between 1 and 24
	      SET @v:= valor(); -- v is the monthly fee
	      WHILE @y <= @np DO 
	      	    SET @dataPgto:=nextDate(@diaPedido, @y);
		    INSERT INTO Parcelas(ID_Pedido, data_pgto, valor) VALUES(@x, @dataPgto, @v);
		    SET @y := @y + 1;
	      END WHILE;
	      
	      SET @x = @x + 1;
	END WHILE;
END$$

DROP TABLE if exists Parcelas;
DROP TABLE if exists Pedidos;
DROP TABLE if exists Clientes;

CALL clientsGenerator();
CALL requestGenerator();
