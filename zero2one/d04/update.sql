/*UPDATE Clientes
       SET nome = 'Edvaldo Netto'
       WHERE ID = 6;*/

START TRANSACTION;
ALTER TABLE Pedidos
      DROP FOREIGN KEY Pedidos_ibfk_1;




