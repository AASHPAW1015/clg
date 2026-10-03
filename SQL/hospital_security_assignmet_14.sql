-- ============================================================
--  Secure a Hospital Database - Roles, GRANT/REVOKE, Backup Plan
--  Dialect: PostgreSQL (psql)
--
--  Run order:
--    1. Schema + seed (so there's something to protect)
--    2. Part 1 RBAC matrix (comment block - your design)
--    3. Part 2 roles + GRANT/REVOKE + temporary elevation
--    4. Part 3 backup/restore + disaster-recovery plan (comment block)
--
--  Tip: create a throwaway database first so you can drop it after:
--    createdb hospital
--    psql -d hospital -f hospital_security.sql
-- ============================================================


-- ============================================================
--  SCHEMA + SEED  (the data we're securing)
-- ============================================================

DROP TABLE IF EXISTS prescriptions CASCADE;
DROP TABLE IF EXISTS billing CASCADE;
DROP TABLE IF EXISTS visits CASCADE;
DROP TABLE IF EXISTS patients CASCADE;
DROP TABLE IF EXISTS doctors CASCADE;

CREATE TABLE doctors (
    doctor_id   SERIAL PRIMARY KEY,
    name        VARCHAR(60) NOT NULL,
    specialty   VARCHAR(50),
    phone       VARCHAR(15)
);

CREATE TABLE patients (
    patient_id  SERIAL PRIMARY KEY,
    name        VARCHAR(60) NOT NULL,
    phone       VARCHAR(15),          -- receptionist may read this...
    address     VARCHAR(120),
    diagnosis   VARCHAR(200)          -- ...but NOT this (sensitive)
);

CREATE TABLE visits (
    visit_id    SERIAL PRIMARY KEY,
    patient_id  INTEGER NOT NULL REFERENCES patients(patient_id),
    doctor_id   INTEGER NOT NULL REFERENCES doctors(doctor_id),
    visit_date  DATE NOT NULL,
    notes       VARCHAR(200)
);

CREATE TABLE prescriptions (
    rx_id       SERIAL PRIMARY KEY,
    visit_id    INTEGER NOT NULL REFERENCES visits(visit_id),
    drug_name   VARCHAR(60) NOT NULL,
    dosage      VARCHAR(40),
    dispensed   BOOLEAN DEFAULT FALSE   -- pharmacist flips this
);

CREATE TABLE billing (
    bill_id     SERIAL PRIMARY KEY,
    patient_id  INTEGER NOT NULL REFERENCES patients(patient_id),
    amount      NUMERIC(10,2) CHECK (amount >= 0),
    paid        BOOLEAN DEFAULT FALSE,
    bill_date   DATE NOT NULL
);

INSERT INTO doctors (name, specialty, phone) VALUES
('Dr. Rao',    'Cardiology',  '9899900001'),
('Dr. Iyer',   'Neurology',   '9899900002'),
('Dr. Desai',  'Pediatrics',  '9899900003');

INSERT INTO patients (name, phone, address, diagnosis) VALUES
('Ravi Kumar',    '9820011111','Mumbai',  'Hypertension'),
('Sneha Patil',   '9820022222','Pune',    'Migraine'),
('Arjun Mehta',   '9820033333','Mumbai',  'Type 2 Diabetes'),
('Fatima Sheikh', '9820044444','Thane',   'Asthma');

INSERT INTO visits (patient_id, doctor_id, visit_date, notes) VALUES
(1, 1, '2026-09-10', 'Routine BP check'),
(2, 2, '2026-09-11', 'Recurring headaches'),
(3, 1, '2026-09-12', 'Blood sugar review');

INSERT INTO prescriptions (visit_id, drug_name, dosage, dispensed) VALUES
(1, 'Amlodipine', '5mg once daily',  TRUE),
(2, 'Sumatriptan','50mg as needed',  FALSE),
(3, 'Metformin',  '500mg twice daily',FALSE);

INSERT INTO billing (patient_id, amount, paid, bill_date) VALUES
(1, 1200.00, TRUE,  '2026-09-10'),
(2, 800.00,  FALSE, '2026-09-11'),
(3, 1500.00, FALSE, '2026-09-12');


-- ============================================================
--  PART 1 - RBAC ACCESS-CONTROL MATRIX  (design + justification)
--
--  Legend: S=SELECT  I=INSERT  U=UPDATE  D=DELETE  (-)=no access
--
--  Role          patients        visits    prescriptions  billing   doctors
--  ----------------------------------------------------------------------------
--  doctor        S,U(clinical)   S,I,U     S,I,U          -         S
--  nurse         S,U(clinical)   S,U       S,U            -         S
--  receptionist  S,I,U (contact  S,I       -              S,I       S
--                only - NOT diagnosis via a view)
--  billing_clerk S (contact)     S         -              S,I,U     -
--  pharmacist    S (name only)   S         S,U(dispensed) -         -
--  db_admin      ALL             ALL       ALL            ALL       ALL
--
--  Least-privilege justification:
--  - receptionist books patients and takes payments, so they need
--    contact fields and billing, but they have NO business seeing a
--    diagnosis - so diagnosis is exposed only through a restricted VIEW
--    (patients_contact) rather than the full patients table.
--  - billing_clerk touches money, not medicine: full billing rights,
--    read-only on who the patient is, nothing on clinical tables.
--  - pharmacist only needs to see what to dispense and mark it done,
--    so they get UPDATE on prescriptions.dispensed and read elsewhere.
--  - doctor/nurse handle clinical data but never touch billing.
--  - db_admin is the only superuser-like role, used sparingly.
-- ============================================================


-- ============================================================
--  PART 2 - IMPLEMENT WITH DCL (roles, GRANT, REVOKE)
-- ============================================================

-- ---------- Clean up any roles from a previous run ----------
DROP ROLE IF EXISTS doctor;
DROP ROLE IF EXISTS nurse;
DROP ROLE IF EXISTS receptionist;
DROP ROLE IF EXISTS billing_clerk;
DROP ROLE IF EXISTS pharmacist;
DROP ROLE IF EXISTS db_admin;
DROP VIEW IF EXISTS patients_contact;

-- ---------- Restricted view: contact info WITHOUT diagnosis ----------
CREATE VIEW patients_contact AS
SELECT patient_id, name, phone, address
FROM patients;

-- ---------- Create the roles (NOLOGIN = group roles) ----------
CREATE ROLE doctor        NOLOGIN;
CREATE ROLE nurse         NOLOGIN;
CREATE ROLE receptionist  NOLOGIN;
CREATE ROLE billing_clerk NOLOGIN;
CREATE ROLE pharmacist    NOLOGIN;
CREATE ROLE db_admin      NOLOGIN;

-- ---------- GRANT privileges per role (granular) ----------

-- doctor: full clinical access, read patients, no billing
GRANT SELECT, UPDATE ON patients      TO doctor;
GRANT SELECT, INSERT, UPDATE ON visits        TO doctor;
GRANT SELECT, INSERT, UPDATE ON prescriptions TO doctor;
GRANT SELECT ON doctors TO doctor;

-- nurse: like doctor but cannot open new visits/prescriptions
GRANT SELECT, UPDATE ON patients      TO nurse;
GRANT SELECT, UPDATE ON visits        TO nurse;
GRANT SELECT, UPDATE ON prescriptions TO nurse;
GRANT SELECT ON doctors TO nurse;

-- receptionist: contact + booking + billing, NO diagnosis, NO clinical
GRANT SELECT, INSERT, UPDATE ON patients_contact TO receptionist;  -- view only
GRANT SELECT, INSERT ON visits  TO receptionist;
GRANT SELECT, INSERT ON billing TO receptionist;
GRANT SELECT ON doctors TO receptionist;

-- billing_clerk: money only, read-only on who the patient is
GRANT SELECT ON patients_contact TO billing_clerk;
GRANT SELECT ON visits TO billing_clerk;
GRANT SELECT, INSERT, UPDATE ON billing TO billing_clerk;

-- pharmacist: see and dispense prescriptions
GRANT SELECT ON patients_contact TO pharmacist;
GRANT SELECT ON visits TO pharmacist;
GRANT SELECT, UPDATE ON prescriptions TO pharmacist;

-- db_admin: everything
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO db_admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO db_admin;

-- ---------- REVOKE: tighten something we over-granted ----------
-- On review, nurses should NOT be able to change patient records at all,
-- only read them. Take back the UPDATE we gave above.
REVOKE UPDATE ON patients FROM nurse;

-- ---------- Assign roles to actual login users (example) ----------
-- CREATE USER alice LOGIN PASSWORD 'set_in_real_life';   -- do not hardcode real passwords
-- GRANT doctor TO alice;


-- ============================================================
--  TEMPORARY PRIVILEGE ELEVATION (grant for a task, then revoke)
--
--  Scenario: month-end, a doctor must help clear a billing backlog,
--  just for today. We grant billing rights, they do the work, we take
--  it straight back so the elevation doesn't linger.
-- ============================================================

-- 1. Elevate
GRANT SELECT, UPDATE ON billing TO doctor;

-- 2. ... doctor performs the one-off task, e.g.:
--    UPDATE billing SET paid = TRUE WHERE bill_id = 2;

-- 3. Revoke immediately after - back to least privilege
REVOKE SELECT, UPDATE ON billing FROM doctor;


-- ============================================================
--  PART 3 - BACKUP & DISASTER RECOVERY

--
--  --- Full backup (run in a normal shell, NOT inside psql) ---
--    pg_dump -U postgres -d hospital -F c -f hospital_full.backup
--      -F c  = custom compressed format
--      This is your FULL backup.
--
--  --- Restore it (proving recovery works) ---
--    createdb hospital_restored
--    pg_restore -U postgres -d hospital_restored hospital_full.backup
--    -- then verify:  psql -d hospital_restored -c "SELECT COUNT(*) FROM patients;"
--
--  --- Plain-SQL alternative (easier to screenshot) ---
--    pg_dump -U postgres -d hospital -f hospital_full.sql
--    psql   -U postgres -d hospital_restored -f hospital_full.sql
--
--
--  DISASTER-RECOVERY PLAN
--  ----------------------
--  What can go wrong:
--    - Hardware failure: disk/server dies, database files lost.
--    - Accidental deletion: someone runs DELETE/DROP without a WHERE.
--    - Ransomware: files encrypted and held hostage.
--    - Corruption: bad shutdown or bug leaves data inconsistent.
--
--  Backup schedule / strategy:
--    - FULL backup nightly (pg_dump), kept 30 days.
--    - INCREMENTAL via WAL archiving (archive_mode=on) through the day,
--      so we can do point-in-time recovery to just before an incident.
--    - 3-2-1 rule: 3 copies, on 2 media types, 1 copy off-site/offline
--      (offline copy is the ransomware defence).
--    - Test a restore monthly - a backup you've never restored is a guess.
--
--  Step-by-step recovery procedure:
--    1. Stop application writes so no new bad data comes in.
--    2. Identify the incident and the last known-good backup.
--    3. Provision a clean database instance.
--    4. Restore the latest full backup (pg_restore).
--    5. Replay WAL up to the moment before the incident (PITR).
--    6. Verify row counts / key tables against expectations.
--    7. Point the application at the recovered database.
--    8. Write an incident note: cause, fix, what to change.
-- ============================================================
