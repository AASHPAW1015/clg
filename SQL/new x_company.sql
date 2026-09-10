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
--
INSERT INTO departments (department_name)
VALUES
('IT'),
('HR'),
('Finance'),
('Marketing'),
('Operations');

INSERT INTO departments (department_name)
VALUES
('IT'),
('HR'),
('Finance'),
('Marketing'),
('Operations');

INSERT INTO projects (project_name, department_id, budget)
VALUES
('Website Redesign', 1, 500000),
('Mobile App', 1, 800000),
('Recruitment Drive', 2, 200000),
('Financial Audit', 3, 350000),
('Marketing Campaign', 4, 450000),
('Operations Upgrade', 5, 300000);

-- display every em0ployee with the department name

select * from employees

SELECT e.employee_name, d.department_name
FROM employees AS e LEFT JOIN departments AS d
ON e.department_id = d.department_id;

-- display every department name along with the number of employees including 0



-- average salary of employees in each department


-- departments having atleast two employeess

select d.department_name, count(e.employee_name) as numofempl
from departments as d 
left join employees as e
on d.department_id = e.department_id
group by d.department_name
having count(e.employee_name) >= 2;


-- each departments with name num of empl and total salary paid
select d.department_name, count(e.employee_name) as numofempl, sum(e.salary)
from departments as d 
left join employees as e
on d.department_id = e.department_id
group by d.department_name;


-- find departments where total salary is greater than 1,20,000
select d.department_name, sum(e.salary) as totalSalary
from departments as d 
left join employees as e
on d.department_id = e.department_id
group by d.department_name
having sum(e.salary) >= 120000;


-- each dept with total budget
select d.department_name, sum(p.budget) as totalBudget
from departments as d
left join projects as p
on d.department_id = p.department_id
group by d.department_name;


-- find depts atleast 2 emp and total salary is greater than 1,20,000

select d.department_name, count(e.employee_name) as numOfEmployees, sum(e.salary) as totalSalary
from departments as d 
left join employees as e
on d.department_id = e.department_id
group by d.department_name
having sum(e.salary) >= 120000 AND count(e.employee_name) >= 2;

















