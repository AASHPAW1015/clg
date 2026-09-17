-- CREATE TABLE outlets (
--     outlet_id INT AUTO_INCREMENT PRIMARY KEY,
--     outlet_address VARCHAR(200) NOT NULL
-- ) ENGINE=InnoDB;
--
-- CREATE TABLE users (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     email VARCHAR(200) NOT NULL UNIQUE,
--     phone VARCHAR(20) NOT NULL UNIQUE,
--     fname VARCHAR(200) NOT NULL
-- ) ENGINE=InnoDB;

-- CREATE TABLE orders (
--     order_id INT AUTO_INCREMENT PRIMARY KEY,
--     outlet_id INT NOT NULL,
--     order_amount DECIMAL(10,2) NOT NULL,
--     FOREIGN KEY (outlet_id) REFERENCES outlets(outlet_id)
-- ) ENGINE=InnoDB;


 INSERT INTO users (email, phone, fname) VALUES
 ('rahul@gmail.com', '9876543210', 'Rahul Sharma'),
 ('priya@gmail.com', '9876543211', 'Priya Patel'),
 ('amit@gmail.com',  '9876543212', 'Amit Shah'),
 ('neha@gmail.com',  '9876543213', 'Neha Mehta'),
 ('rohan@gmail.com', '9876543214', 'Rohan Verma');

 INSERT INTO outlets (outlet_address) VALUES
 ('Andheri West, Mumbai'),
 ('Bandra West, Mumbai'),
 ('Powai, Mumbai'),
 ('Vashi, Navi Mumbai'),
 ('Thane West');

 INSERT INTO orders (outlet_id, order_amount) VALUES
 (1, 450.00), (1, 720.50),
 (2, 350.00), (2, 1250.00),
 (3, 560.75), (3, 890.00),
 (4, 300.00), (4, 1500.00),
 (5, 675.25), (5, 950.00);

select * from users;

insert into users(email,phone,fname) values("sqluniqueentry@ahaha.com","1234234232","looooooooongs");



 -- DROP TABLE IF EXISTS orders, users, outlets;
