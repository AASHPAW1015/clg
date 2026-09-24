-- procedures, lowkey void functions

-- update orders using order id
create 
or
replace procedure getTotalAmount(p_order_id int, p_new_amount numeric) language sql as $$
update orders
set amount = amount + p_new_amount
where order_id = p_order_id $$;
call getTotalAmount(1,100);

select * from orders;

-- order id and deletes that

create 
or
replace procedure deleteShiz(p_order_id int) language sql as $$
delete from orders
where order_id = p_order_id $$;
call deleteShiz(2);

-- 

