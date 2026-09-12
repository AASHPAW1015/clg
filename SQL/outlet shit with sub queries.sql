-- -- 1. Seed users
-- INSERT INTO users (email, phone, fname)
-- VALUES
-- ('rahul@gmail.com', '9876543210', 'Rahul Sharma'),
-- ('priya@gmail.com', '9876543211', 'Priya Patel'),
-- ('amit@gmail.com', '9876543212', 'Amit Shah'),
-- ('neha@gmail.com', '9876543213', 'Neha Mehta'),
-- ('rohan@gmail.com', '9876543214', 'Rohan Verma');


-- -- 2. Seed outlets
-- INSERT INTO outlet (outlet_address)
-- VALUES
-- ('Andheri West, Mumbai'),
-- ('Bandra West, Mumbai'),
-- ('Powai, Mumbai'),
-- ('Vashi, Navi Mumbai'),
-- ('Thane West');


-- -- 3. Seed orders
-- INSERT INTO orders (outlet_id, amount)
-- VALUES
-- (1, 450.00),
-- (1, 720.50),
-- (2, 350.00),
-- (2, 1250.00),
-- (3, 560.75),
-- (3, 890.00),
-- (4, 300.00),
-- (4, 1500.00),
-- (5, 675.25),
-- (5, 950.00);



-- select distinct email from users;

-- select fname as first_name from users;

-- select fname as first_name from users as customers;

-- select * from users where email = 'rahul@gmail.com';

-- select * from users where email = 'rahul@gmail.com' and id = 2;

-- select * from users where email = 'rahul@gmail.com' or id = 8;

select * from outlet where outlet_address in ('powai','vashi');

select * 
from users;

select distinct (email) from users;

select fname as first_name from users as customers;

select * 
from users 
where email = 'rahul@gmail.com'

select * from users where email = 'rahul@gmail.com' and id=2

select * from users where email = 'rahul@gmail.com' or id=2

select * from outlets where outlet_address in ('Powai, Mumbai', 'Vashi, Navi Mumbai');

select * from outlets;

select count(order_id) as totalOrders from orders;

select sum(order_amount) as totalAmount from orders where order_amount > 500;

select avg(order_amount) as avgAmount from orders;

select min(order_amount) as lowestPrice from orders;

select max(order_amount) as highestPrice from orders;

select order_amount from orders order by order_amount desc;

-- joins
-- full join --> all data from both table also repeating, inner join, left join, right join.
-- left join = left - (right + inner join)

select ot.outlet_address, o.amount
from orders as o 
full join outlet as ot
on o.outlet_id = ot.outlet_id;

------------- 2nd sept ---------------

-- find outlets that have never recieved an order
select * from outlet;
select * from orders;

insert into outlet (outlet_address) values ('Ghansoli')

select ot.outlet_address 
from orders as o right join outlet as ot 
on o.outlet_id = ot.outlet_id
where o.outlet_id is null;

-- show each outlet and show lowest order amount

select ot.outlet_address, min(o.order_id) as lowest_order_amount
from orders as o right join outlet as ot 
on o.outlet_id = ot.outlet_id
group by ot.outlet_address;


--

-- show every outlet with its order count and total sales

select * from outlet


-- top 3 outlets based in total sales





--------------------------------------------------------


CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL
);

CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(100) NOT NULL,
    department_id INT,
    budget DECIMAL(12,2) NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);


INSERT INTO departments (department_name)
VALUES
('IT'),
('HR'),
('Finance'),
('Marketing'),
('Operations');

INSERT INTO employees (employee_name, salary, department_id)
VALUES
('Rahul', 65000, 1),
('Priya', 75000, 1),
('Amit', 50000, 2),
('Sneha', 55000, 2),
('Karan', 90000, 3),
('Neha', 85000, 3),
('Rohit', 45000, 4),
('Anjali', 60000, 4),
('Vikas', 70000, 1),
('Meera', 40000, 5);


INSERT INTO projects (project_name, department_id, budget)
VALUES
('Website Redesign', 1, 500000),
('Mobile App', 1, 800000),
('Recruitment Drive', 2, 200000),
('Financial Audit', 3, 350000),
('Marketing Campaign', 4, 450000),
('Operations Upgrade', 5, 300000);


select * from employees;

---------sub query-------------

select order_id, amount 
from orders where amount = (
select max(amount) from orders
);


-- find orders with the lowest amount
select order_id, amount 
from orders where amount = (
select min(amount) from orders
);

-- find orders whose amount is greater than the overall average

select order_id, amount 
from orders
where amount > (
select avg(amount) from orders
);


-- outlets that have recieved order greater than 2000/- (1000)

select o.order_id, o.amount, ot.outlet_address
from orders as o left join outlet as ot
on o.outlet_id = ot.outlet_id
where o.amount > 1000

--BUTTTTT
select ot.outlet_address from outlet as ot
where ot.outlet_id in (
select o.outlet_id
from orders as o 
where o.amount > 1000
)

-- outlets that have atleast one order

select outlet_address from outlet
where outlet_id in (
	select outlet_id
	from orders
	where amount >=1
)


-- outlets that have never recieved an order using exists (not in)


select outlet_address from outlet
where outlet_id not in (
	select outlet_id
	from orders
	where amount >=1
)


















