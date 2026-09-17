BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ; 

select * from orders
where order_id = 1;

