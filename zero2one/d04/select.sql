-- SELECT * FROM Pedidos;

/*SELECT p.data_pgto, COUNT(p.ID) FROM Parcelas p
       GROUP BY p.data_pgto;*/

/*SELECT  SUM(p.valor)/COUNT(p.id), AVG(p.valor), MONTH(p.data_pgto), COUNT(p.ID) FROM Parcelas p
       GROUP BY
	     MONTH(p.data_pgto);	*/

SELECT mes, SUM(cnt), SUM(soma), SUM(soma)/SUM(cnt) AS media FROM (SELECT YEAR(p.data_pgto), MONTH(p.data_pgto) AS mes, SUM(p.valor) as soma, COUNT(MONTH(p.data_pgto))/COUNT(p.data_pgto) AS cnt FROM Parcelas p
       GROUP BY
       	     YEAR(p.data_pgto),	
	     MONTH(p.data_pgto)) base
	     GROUP BY
	     	   mes;

-- NINUVF
