DROP TABLE if exists Parcelas;
DROP TABLE if exists Pedidos;
DROP TABLE if exists Clientes;
CREATE TABLE Clientes(
       ID BIGINT NOT NULL AUTO_INCREMENT,
       TELEFONE VARCHAR(20) NULL,
       NOME VARCHAR(128) NOT NULL,
       EMAIL VARCHAR(128) NULL,
       PRIMARY KEY (ID)
);

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

INSERT INTO Clientes (nome, telefone, email) VALUES
('Evaldo Neto', '1234-5678', 'evaldoneto8@gmail.com'),
('Biga Bigode', '2341-5678', 'evaldoneto8@gmail.com'),
('Mopa', '9689-2898','mopa@mozo.com'),
('Shepard', '1231-1298', 'shepard@uol.com');

INSERT INTO Pedidos (id_cliente, data_pedido, endereco) VALUES
(1, '2018-02-25', 'Cracolandia'),
(4, '2018-02-25', 'Westeros'),
(2, '2018-02-25', 'Middle Earth'),
(3, '2018-02-25', 'Mordor'),
(1, '2018-03-25', 'The Shire'),
(1, '2018-03-25', 'Winterfell'),
(1, '2018-03-25', 'The Wall'),
(2, '2018-03-25', 'Lannisport');

INSERT INTO Parcelas (ID_Pedido, data_pgto, valor) VALUES
(1, '2018-02-02', 200),
(1, '2018-03-08', 300),
(1, '2018-04-25', 400),
(2, '2018-03-25', 200),
(2, '2018-04-09', 150),
(3, '2018-05-10', 100),
(3, '2018-02-15', 350),
(3, '2018-04-12', 420),
(4, '2018-12-18', 22230),
(5, '2018-12-23', 40000),
(6, '2018-03-01', 500),
(6, '2018-04-08', 5400),
(6, '2018-05-13', 5020),
(6, '2018-06-17', 3300),
(6, '2018-07-30', 2500),
(6, '2018-08-29', 7500),
(6, '2018-09-28', 1500),
(7, '2018-03-14', 700),
(7, '2018-05-13', 2500),
(7, '2018-04-11', 700),
(7, '2018-06-02', 600),
(7, '2018-07-05', 700),
(7, '2018-08-07', 500),
(7, '2018-09-08', 700),
(7, '2018-10-09', 300),
(8, '2018-03-19', 7040),
(8, '2018-04-13', 4400),
(8, '2018-05-23', 7040),
(8, '2018-06-18', 5000),
(8, '2018-07-16', 7040),
(8, '2018-08-04', 9000),
(8, '2018-09-23', 1040),
(8, '2018-10-17', 3000),
(1, '2017-02-02', 200),
(1, '2017-03-08', 300),
(1, '2017-04-25', 400),
(2, '2017-03-25', 200),
(2, '2017-04-09', 150),
(3, '2017-05-10', 100),
(3, '2017-02-15', 350),
(3, '2017-04-12', 420),
(4, '2017-12-18', 22230),
(5, '2017-12-23', 40000),
(6, '2017-03-01', 500),
(6, '2017-03-08', 5400),
(6, '2017-03-13', 5020),
(6, '2017-06-17', 3300),
(6, '2017-07-30', 2500),
(6, '2017-08-29', 7500),
(6, '2017-09-28', 1500),
(7, '2017-07-14', 700),
(7, '2017-05-13', 2500),
(7, '2017-09-11', 700),
(7, '2017-01-02', 600),
(7, '2017-01-05', 700),
(7, '2017-01-07', 500),
(7, '2017-09-08', 700),
(7, '2017-12-09', 300),
(8, '2017-03-19', 7040),
(8, '2017-05-13', 4400),
(8, '2017-12-23', 7040),
(8, '2017-09-18', 5000),
(8, '2017-11-16', 7040),
(8, '2017-09-04', 9000),
(8, '2017-12-23', 1040),
(8, '2017-12-17', 3000);
