DROP TABLE Pedidos;
DROP TABLE Clientes;

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
       data_pgto DATETIME NOT NULL,
       valor BIGINT,
       CONSTRAINT parcelasUnicas UNIQUE(ID_Cliente, data_pgto, valor),
       FOREIGN KEY (ID_Cliente) REFERENCES Clientes(ID)
);
