/*SELECT c.* FROM Clientes c
       JOIN Pedidos p
       	    ON p.ID_Cliente = c.ID;

SELECT p.* FROM Clientes c
       JOIN Pedidos p
       	    ON p.ID_Cliente = c.ID;

SELECT * FROM Clientes c
       JOIN Pedidos p
       	    ON p.ID_Cliente = c.ID;*/

SELECT c.nome, COUNT(p.ID) FROM Clientes c
       JOIN Pedidos p
       	    ON p.ID_Cliente = c.ID
	    WHERE c.NOME = 'Biga Bigode'
	       GROUP BY p.ID_Cliente;
