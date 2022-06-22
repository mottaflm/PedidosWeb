USE WebAppPedidos
INSERT INTO Pedidos 
(nome_produto, valor, data_vencimento)
VALUES 
('Pedido 01', 100, GETDATE() + 10),
('Pedido 02', 5000, GETDATE()),
('Pedido 03', 2, GETDATE() + 3),
('Pedido 04', 1000000, GETDATE() + 1),
('Pedido 05', 750, GETDATE() - 10);
