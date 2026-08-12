--CREATE TABLE customer (
--  customer_id serial PRIMARY KEY,
--  user_id int,
--  address varchar(100) not null,
--  FOREIGN KEY(user_id) REFERENCES users(user_id)
--)

CREATE TABLE outlet (
  outlet_id serial primary key,
  address varchar(200) not null
);

CREATE TABLE orders (
  orders_id serial primary key,
  outlet_id int not null,
  user_id int not null,
  FOREIGN KEY(outlet_id) REFERENCES outlet(outlet_id),
  FOREIGN KEY(user_id) REFERENCES users(user_id)
);
-- make outlet id into a forign key

alter table outlet add column outlet_name varchar(100) not null;


