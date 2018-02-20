ALTER TABLE Pedidos
      DROP FOREIGN KEY Pedidos_ibfk_1;

ALTER TABLE Pedidos
      ADD FOREIGN KEY(ID_Cliente)
      REFERENCES Clientes(ID)
      ON DELETE CASCADE;
     
