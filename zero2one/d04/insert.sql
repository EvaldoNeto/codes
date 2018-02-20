INSERT INTO Clientes (nome, telefone, email) VALUES
('Evaldo Neto', '1234-5678', 'evaldoneto8@gmail.com'),
('Biga Bigode', '2341-5678', 'evaldoneto8@gmail.com'),
('Mopa', '9689-2898','mopa@mozo.com'),
('Shepard', '1231-1298', 'shepard@uol.com');

INSERT INTO Pedidos (id_cliente, data_pgto, valor) VALUES
(1, '2018-02-25', 200),
(4, '2018-02-25', 400),
(2, '2018-02-25', 500),
(3, '2018-02-25', 300);

INSERT INTO Pedidos (id_cliente, data_pgto, valor) VALUES
(1, '2018-03-25', 200),
(1, '2018-03-25', 400),
(1, '2018-03-25', 500),
(2, '2018-03-25', 300);

-- Inserting data with invalid id_client key
-- INSERT INTO Pedidos (id_cliente, data_pgto, valor) VALUES(9, '2018-05-25', 500)
