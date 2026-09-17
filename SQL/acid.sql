-- A from acid (atomacity)
begin;

update
orders
set amount = 500
where order_id = 1;

update
orders
set amount = 1500
where order_id = 2;

commit;

select * from orders order by order_id 

-- some shit

begin;

update
orders
set amount = 111500
where order_id = 1;

update
orders
set amount = amount + 'abc' --ERROR:  invalid input syntax for type numeric: "abc", executes begin and first update but stops at this transaction till this query and doesnt commit
where order_id = 2;

commit;

select * from orders order by order_id -- current transaction is aborted


rollback; --rollbacks to the poop before 




--

insert into orders (order_id,outlet_id,amount) values (31,7,500);

insert into outlet(outlet_id,outlet_address) values (7, 'abc');

select * from outlet

------- two diff files, acid 2

begin;

update 
orders
set amount = amount +500
where order_id = 1;

commit;

rollback;

----

begin transaction isolation level read uncommitted;

update orders 
set amount = amount + 500
where order_id = 1;

select * from orders order by order_id; -- shows unchanged (1000) in the other file





rollback







