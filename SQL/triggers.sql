create or replace function create_user_profile()
returns trigger 
language plpgsql 
as $$
BEGIN 
insert into profile(username) values (old.username);
end;
$$

create trigger create_profile 
after insert on users
for each row
execute function create_user_profile();


-- change in orders -> insert -> a row in another table that this action (order_placed) has happened 

create table order_logs (
log_id serial primary key,
log_type varchar(100) not null,
order_id int not null,
created_at timestamp default current_timestamp not null,
updated_at timestamp default current_timestamp not null
)

select * from order_logs;

create or replace function create_order_logs()
returns trigger 
language plpgsql 
as $$
BEGIN 
insert into order_logs(log_type,order_id) values ('order_created',new.order_id);
return new;
end;
$$

create trigger create_order_log_trig 
after insert on orders
for each row
execute function create_order_logs();

insert into orders(order_id, outlet_id,amount) values (11, 1,50);









