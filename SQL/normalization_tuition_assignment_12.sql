-- ============================================================
--  Normalization Assignment - Tuition / Coaching Center
--
--  This file is the DATA BACKBONE for the assignment. Your graded
--  deliverables are the hand-drawn 1NF->2NF->3NF pages and the final
--  3NF diagram - draw those straight off the tables and notes below.
--
--  Scenario: a coaching center keeps ONE messy spreadsheet of who is
--  enrolled in which course and who teaches it. It has:
--    - repeating groups (many courses jammed in one cell)
--    - redundancy (teacher phone repeated on every row)
--    - mixed information (student + course + teacher all in one table)
--
--  Works in MySQL 8+ and SQLite (SQLite: PRAGMA foreign_keys = ON;).
-- ============================================================


-- ============================================================
--  PART 1 - THE MESSY DATASET (before 1NF)
--  Non-atomic cells + redundancy, exactly what NOT to do.
-- ============================================================

DROP TABLE IF EXISTS tuition_raw;

CREATE TABLE tuition_raw (
    row_id         INTEGER PRIMARY KEY,
    student_name   VARCHAR(60),
    student_phone  VARCHAR(15),
    student_city   VARCHAR(40),
    courses_taken  VARCHAR(120),   -- REPEATING GROUP: 'Physics; Mathematics'
    teachers       VARCHAR(120),   -- 'Mr. Rao; Ms. Iyer'
    teacher_phones VARCHAR(120),   -- '9899900001; 9899900002'
    course_fees    VARCHAR(60)     -- '5000; 4500'
);

INSERT INTO tuition_raw VALUES
(1, 'Ravi Kumar',   '9820011111', 'Mumbai', 'Physics; Mathematics', 'Mr. Rao; Ms. Iyer',  '9899900001; 9899900002', '5000; 4500'),
(2, 'Sneha Patil',  '9820022222', 'Pune',   'Mathematics; Chemistry','Ms. Iyer; Mr. Rao', '9899900002; 9899900001', '4500; 4800'),
(3, 'Arjun Mehta',  '9820033333', 'Mumbai', 'Physics; Chemistry; Biology', 'Mr. Rao; Mr. Rao; Mr. Desai', '9899900001; 9899900001; 9899900003', '5000; 4800; 4700'),
(4, 'Fatima Sheikh','9820044444', 'Thane',  'Mathematics',          'Ms. Iyer',           '9899900002',             '4500'),
(5, 'Karan Shah',   '9820055555', 'Mumbai', 'Physics',              'Mr. Rao',            '9899900001',             '5000');

-- Notice: the "courses_taken" cells hold multiple values (not atomic),
-- and Mr. Rao's phone is written out again and again. That's the mess.


-- ============================================================
--  1NF - flatten repeating groups into atomic rows.
--  This wide flat table is the DELIBERATELY FLAWED design used to
--  demonstrate the anomalies in Part 3. It IS in 1NF, but not 2NF/3NF.
--  (One row per student-course; every fact repeated inline.)
-- ============================================================

DROP TABLE IF EXISTS flat_enrollments;

CREATE TABLE flat_enrollments (
    student_name    VARCHAR(60),
    student_phone   VARCHAR(15),
    student_city    VARCHAR(40),
    course_name     VARCHAR(40),
    course_fee      INTEGER,
    teacher_name    VARCHAR(40),
    teacher_phone   VARCHAR(15),
    enrollment_date DATE,
    PRIMARY KEY (student_name, course_name)   -- composite key
);

INSERT INTO flat_enrollments VALUES
('Ravi Kumar',   '9820011111','Mumbai','Physics',    5000,'Mr. Rao',  '9899900001','2026-06-10'),
('Ravi Kumar',   '9820011111','Mumbai','Mathematics',4500,'Ms. Iyer', '9899900002','2026-06-10'),
('Sneha Patil',  '9820022222','Pune',  'Mathematics',4500,'Ms. Iyer', '9899900002','2026-06-11'),
('Sneha Patil',  '9820022222','Pune',  'Chemistry',  4800,'Mr. Rao',  '9899900001','2026-06-11'),
('Arjun Mehta',  '9820033333','Mumbai','Physics',    5000,'Mr. Rao',  '9899900001','2026-06-12'),
('Arjun Mehta',  '9820033333','Mumbai','Chemistry',  4800,'Mr. Rao',  '9899900001','2026-06-12'),
('Arjun Mehta',  '9820033333','Mumbai','Biology',    4700,'Mr. Desai','9899900003','2026-06-12'),
('Fatima Sheikh','9820044444','Thane', 'Mathematics',4500,'Ms. Iyer', '9899900002','2026-06-13'),
('Karan Shah',   '9820055555','Mumbai','Physics',    5000,'Mr. Rao',  '9899900001','2026-06-14');


-- ============================================================
--  PART 3 - THE THREE ANOMALIES (shown on flat_enrollments)
--  Run/read these against the flawed table to see the problems.
-- ============================================================

-- 1) INSERTION ANOMALY --------------------------------------
--    A new course "Computer Science" (Mr. Nair) is opening, but nobody
--    has enrolled yet. There's no clean place to record it - every row
--    needs a student and a course together. You'd be forced to do this:
-- INSERT INTO flat_enrollments VALUES
-- (NULL, NULL, NULL, 'Computer Science', 5500, 'Mr. Nair', '9899900004', NULL);
--    ...which breaks the primary key (student_name is part of it) and
--    stores a course as a half-empty ghost row. You can't add a course
--    fact without unrelated student data.

-- 2) DELETION ANOMALY ---------------------------------------
--    Arjun is the ONLY student taking Biology. If he drops it:
-- DELETE FROM flat_enrollments
-- WHERE student_name = 'Arjun Mehta' AND course_name = 'Biology';
--    ...the Biology course, its fee, and Mr. Desai's phone number all
--    vanish from the database entirely. Deleting one enrollment destroys
--    unrelated facts about the course and the teacher.

-- 3) UPDATE ANOMALY -----------------------------------------
--    Mr. Rao changes his phone. His number sits on many rows
--    (every Physics and Chemistry enrollment):
-- UPDATE flat_enrollments SET teacher_phone = '9811100000'
-- WHERE teacher_name = 'Mr. Rao';
--    ...you must catch EVERY copy. Miss one row and the database now
--    disagrees with itself about Mr. Rao's number.


-- ============================================================
--  FINAL 3NF SCHEMA (the clean version - your final diagram)
--
--  Functional dependencies that drove the split:
--    student_id  -> name, phone, city          (student facts)
--    teacher_id  -> name, phone                 (teacher facts)
--    course_id   -> name, fee, teacher_id       (course facts)
--    (student_id, course_id) -> enrollment_date (the actual enrollment)
--
--  2NF: name/fee no longer depend on PART of a composite key
--       -> pulled students and courses out of the flat table.
--  3NF: teacher_phone depended on teacher, not on course (transitive)
--       -> pulled teachers out.
--  BCNF: every determinant above is a candidate key, so the schema
--        is already in BCNF - no further decomposition needed.
-- ============================================================

DROP TABLE IF EXISTS enrollments;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS teachers;
DROP TABLE IF EXISTS students;

CREATE TABLE students (
    student_id INTEGER      PRIMARY KEY,
    name       VARCHAR(60)  NOT NULL,
    phone      VARCHAR(15)  UNIQUE,
    city       VARCHAR(40)
);

CREATE TABLE teachers (
    teacher_id INTEGER      PRIMARY KEY,
    name       VARCHAR(40)  NOT NULL,
    phone      VARCHAR(15)  UNIQUE
);

CREATE TABLE courses (
    course_id  INTEGER      PRIMARY KEY,
    name       VARCHAR(40)  NOT NULL,
    fee        INTEGER      CHECK (fee >= 0),
    teacher_id INTEGER      NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id)
);

CREATE TABLE enrollments (
    student_id      INTEGER NOT NULL,
    course_id       INTEGER NOT NULL,
    enrollment_date DATE,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id)  REFERENCES courses(course_id)
);

-- ---------- Clean seed data ----------
INSERT INTO students VALUES
(1,'Ravi Kumar',   '9820011111','Mumbai'),
(2,'Sneha Patil',  '9820022222','Pune'),
(3,'Arjun Mehta',  '9820033333','Mumbai'),
(4,'Fatima Sheikh','9820044444','Thane'),
(5,'Karan Shah',   '9820055555','Mumbai');

INSERT INTO teachers VALUES
(1,'Mr. Rao',  '9899900001'),
(2,'Ms. Iyer', '9899900002'),
(3,'Mr. Desai','9899900003');

INSERT INTO courses VALUES
(1,'Physics',     5000, 1),
(2,'Mathematics', 4500, 2),
(3,'Chemistry',   4800, 1),
(4,'Biology',     4700, 3);

INSERT INTO enrollments VALUES
(1,1,'2026-06-10'),
(1,2,'2026-06-10'),
(2,2,'2026-06-11'),
(2,3,'2026-06-11'),
(3,1,'2026-06-12'),
(3,3,'2026-06-12'),
(3,4,'2026-06-12'),
(4,2,'2026-06-13'),
(5,1,'2026-06-14');

-- Now the same three problems are gone:
--   Insert a course with no students -> just INSERT into courses.
--   Drop Arjun's Biology enrollment  -> Biology + Mr. Desai still exist.
--   Change Mr. Rao's phone           -> ONE row in teachers.
