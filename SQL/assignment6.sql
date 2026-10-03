-- ============================================================
-- SQL Assignment - Setup (table structure + seed data)
-- Works in MySQL and SQLite. For SQLite you can drop VARCHAR
-- lengths; they're ignored anyway.
-- ============================================================

CREATE database assignments;
-- ==================== PART 1: Campus Parking Survey ====================

CREATE TABLE cars (
    car_id     INTEGER PRIMARY KEY,
    color      VARCHAR(20),
    brand      VARCHAR(30),
    body_type  VARCHAR(20),   -- Sedan / SUV / Hatchback
    fuel_type  VARCHAR(20)    -- Petrol / Diesel / CNG / Electric
);

INSERT INTO cars (car_id, color, brand, body_type, fuel_type) VALUES
(1,  'White',  'Maruti',   'Hatchback', 'Petrol'),
(2,  'White',  'Hyundai',  'Sedan',     'Petrol'),
(3,  'White',  'Tata',     'SUV',       'Diesel'),
(4,  'White',  'Maruti',   'Hatchback', 'CNG'),
(5,  'White',  'Honda',    'Sedan',     'Petrol'),
(6,  'White',  'Toyota',   'SUV',       'Diesel'),
(7,  'White',  'Kia',      'SUV',       'Petrol'),
(8,  'White',  'Maruti',   'Sedan',     'CNG'),
(9,  'White',  'Hyundai',  'Hatchback', 'Petrol'),
(10, 'White',  'Mahindra', 'SUV',       'Diesel'),
(11, 'White',  'Tata',     'Hatchback', 'Electric'),
(12, 'White',  'Maruti',   'Hatchback', 'Petrol'),
(13, 'Black',  'Hyundai',  'Sedan',     'Diesel'),
(14, 'Black',  'Tata',     'SUV',       'Diesel'),
(15, 'Black',  'Honda',    'Sedan',     'Petrol'),
(16, 'Black',  'Toyota',   'Sedan',     'Petrol'),
(17, 'Black',  'Kia',      'SUV',       'Diesel'),
(18, 'Black',  'Mahindra', 'SUV',       'Diesel'),
(19, 'Black',  'Maruti',   'Hatchback', 'Petrol'),
(20, 'Black',  'Hyundai',  'SUV',       'Petrol'),
(21, 'Black',  'Tata',     'Sedan',     'Electric'),
(22, 'Black',  'BMW',      'Sedan',     'Petrol'),
(23, 'Silver', 'Maruti',   'Hatchback', 'Petrol'),
(24, 'Silver', 'Hyundai',  'Sedan',     'Petrol'),
(25, 'Silver', 'Tata',     'Hatchback', 'CNG'),
(26, 'Silver', 'Honda',    'Sedan',     'Diesel'),
(27, 'Silver', 'Toyota',   'SUV',       'Diesel'),
(28, 'Silver', 'Maruti',   'Sedan',     'Petrol'),
(29, 'Silver', 'Kia',      'SUV',       'Petrol'),
(30, 'Silver', 'Hyundai',  'Hatchback', 'CNG'),
(31, 'Grey',   'Tata',     'SUV',       'Diesel'),
(32, 'Grey',   'Maruti',   'Hatchback', 'Petrol'),
(33, 'Grey',   'Hyundai',  'SUV',       'Petrol'),
(34, 'Grey',   'Mahindra', 'SUV',       'Diesel'),
(35, 'Grey',   'Honda',    'Sedan',     'Petrol'),
(36, 'Grey',   'Kia',      'Sedan',     'Petrol'),
(37, 'Grey',   'Tata',     'SUV',       'Electric'),
(38, 'Red',    'Maruti',   'Hatchback', 'Petrol'),
(39, 'Red',    'Hyundai',  'Hatchback', 'Petrol'),
(40, 'Red',    'Tata',     'SUV',       'Diesel'),
(41, 'Red',    'Honda',    'Sedan',     'Petrol'),
(42, 'Red',    'Kia',      'SUV',       'Petrol'),
(43, 'Red',    'Maruti',   'Hatchback', 'CNG'),
(44, 'Blue',   'Tata',     'SUV',       'Electric'),
(45, 'Blue',   'Maruti',   'Hatchback', 'Petrol'),
(46, 'Blue',   'Hyundai',  'Sedan',     'Diesel'),
(47, 'Blue',   'Toyota',   'SUV',       'Diesel'),
(48, 'Maroon', 'Honda',    'Sedan',     'Petrol'),
(49, 'Maroon', 'Tata',     'Hatchback', 'Petrol'),
(50, 'Maroon', 'Mahindra', 'SUV',       'Diesel');

SELECT * FROM cars;

-- QUERIES

-- Cars per color
SELECT color, COUNT(*) AS car_count
FROM cars GROUP BY color ORDER BY car_count DESC;

-- Cars per brand
SELECT brand, COUNT(*) AS car_count
FROM cars GROUP BY brand ORDER BY car_count DESC;

-- Cars per body type / fuel type
SELECT body_type, COUNT(*) AS car_count FROM cars GROUP BY body_type;
SELECT fuel_type, COUNT(*) AS car_count FROM cars GROUP BY fuel_type;

-- HAVING: only colors with more than 5 cars
SELECT color, COUNT(*) AS car_count
FROM cars GROUP BY color
HAVING COUNT(*) > 5 ORDER BY car_count DESC;

-- HAVING: brands with 5 or more cars
SELECT brand, COUNT(*) AS car_count
FROM cars GROUP BY brand HAVING COUNT(*) >= 5;


-- ==================== PART 2: Weekly Expense Tracker ====================

CREATE TABLE expenses (
    expense_id   INTEGER PRIMARY KEY,
    expense_date DATE,
    category     VARCHAR(30),   -- Food / Transport / Groceries / Entertainment / Utilities / Shopping
    item         VARCHAR(50),   -- optional description, handy for MAX/MIN "most expensive item"
    amount       DECIMAL(8,2)
);

INSERT INTO expenses (expense_id, expense_date, category, item, amount) VALUES
(1,  '2026-09-20', 'Food',          'Lunch',            220.00),
(2,  '2026-09-20', 'Transport',     'Bus fare',          60.00),
(3,  '2026-09-20', 'Groceries',     'Vegetables & milk',850.00),
(4,  '2026-09-21', 'Food',          'Breakfast',        150.00),
(5,  '2026-09-21', 'Entertainment', 'Movie ticket',     500.00),
(6,  '2026-09-21', 'Transport',     'Auto',              90.00),
(7,  '2026-09-22', 'Food',          'Dinner outside',   300.00),
(8,  '2026-09-22', 'Utilities',     'Electricity bill',1200.00),
(9,  '2026-09-22', 'Transport',     'Bus fare',          60.00),
(10, '2026-09-23', 'Food',          'Snacks',           120.00),
(11, '2026-09-23', 'Shopping',      'T-shirt',         1500.00),
(12, '2026-09-24', 'Food',          'Lunch',            250.00),
(13, '2026-09-24', 'Groceries',     'Fruits',           640.00),
(14, '2026-09-24', 'Transport',     'Auto',              75.00),
(15, '2026-09-25', 'Food',          'Dinner',           200.00),
(16, '2026-09-25', 'Entertainment', 'Games',            350.00),
(17, '2026-09-26', 'Food',          'Breakfast',        180.00),
(18, '2026-09-26', 'Transport',     'Bus fare',          60.00);

select * from expenses;

-- Total spend for the week
SELECT SUM(amount) AS total_spend FROM expenses;

-- Average spend per day (total ÷ number of days)
SELECT SUM(amount) / COUNT(DISTINCT expense_date) AS avg_per_day FROM expenses;

-- Most and least expensive item
SELECT item, amount FROM expenses ORDER BY amount DESC LIMIT 1;  -- most
SELECT item, amount FROM expenses ORDER BY amount ASC  LIMIT 1;  -- least

-- Everything grouped by category in one shot
SELECT category,
       COUNT(*)    AS num_transactions,
       SUM(amount) AS total,
       AVG(amount) AS average,
       MAX(amount) AS most_expensive,
       MIN(amount) AS least_expensive
FROM expenses
GROUP BY category
ORDER BY total DESC;






