-- =====================================================================
--  Radio Taxi — Driver Shift & Earnings Database
--  schema.sql  (PostgreSQL)
--
--  Six tables, split into two kinds:
--    LOOKUP / ENTITY tables (slow-changing, pointed AT):
--        drivers, vehicles, shift_types
--    TRANSACTION / EVENT tables (grow over time, do the POINTING):
--        shifts, trips, settlements
--
--  Load order matters: a table must exist before another can reference it.
-- =====================================================================

DROP TABLE IF EXISTS settlements CASCADE;
DROP TABLE IF EXISTS trips       CASCADE;
DROP TABLE IF EXISTS shifts      CASCADE;
DROP TABLE IF EXISTS shift_types CASCADE;
DROP TABLE IF EXISTS vehicles    CASCADE;
DROP TABLE IF EXISTS drivers     CASCADE;

-- ---------------------------------------------------------------------
-- drivers : the people. Entity table, rich in descriptive columns.
-- ---------------------------------------------------------------------
CREATE TABLE drivers (
    driver_id   SERIAL       PRIMARY KEY,
    full_name   VARCHAR(80)  NOT NULL,
    phone       VARCHAR(15)  NOT NULL UNIQUE,
    license_no  VARCHAR(20)  NOT NULL UNIQUE,
    join_date   DATE         NOT NULL
);

-- ---------------------------------------------------------------------
-- vehicles : the cars. Entity table.
-- ---------------------------------------------------------------------
CREATE TABLE vehicles (
    vehicle_id      SERIAL      PRIMARY KEY,
    registration_no VARCHAR(15) NOT NULL UNIQUE,
    make            VARCHAR(30) NOT NULL,
    model           VARCHAR(30) NOT NULL,
    vehicle_type    VARCHAR(15) NOT NULL
                    CHECK (vehicle_type IN ('hatchback','sedan','suv')),
    in_service      BOOLEAN     NOT NULL DEFAULT TRUE
);

-- ---------------------------------------------------------------------
-- shift_types : the 4 fixed time-of-day slots + the fleet's commission.
--   This is the clever double-duty table:
--     (1) it CLASSIFIES each shift (morning/afternoon/evening/late-night)
--     (2) it is the COMMISSION LOOKUP (one rate per slot, edited in one place)
--   Late-night keeps the lowest commission -> driver takes home more.
-- ---------------------------------------------------------------------
CREATE TABLE shift_types (
    shift_type_id   SERIAL       PRIMARY KEY,
    name            VARCHAR(15)  NOT NULL UNIQUE,
    start_time      TIME         NOT NULL,
    end_time        TIME         NOT NULL,
    commission_rate NUMERIC(4,3) NOT NULL        -- 0.250 = fleet takes 25%
                    CHECK (commission_rate >= 0 AND commission_rate < 1)
);

-- ---------------------------------------------------------------------
-- shifts : THE SPINE. One work-period = one driver + one vehicle +
--          one slot + one date. Trips hang off it; a settlement closes it.
--   Driver & vehicle live HERE, so every trip inherits them for free.
-- ---------------------------------------------------------------------
CREATE TABLE shifts (
    shift_id      SERIAL PRIMARY KEY,
    driver_id     INT  NOT NULL REFERENCES drivers(driver_id),
    vehicle_id    INT  NOT NULL REFERENCES vehicles(vehicle_id),
    shift_type_id INT  NOT NULL REFERENCES shift_types(shift_type_id),
    shift_date    DATE NOT NULL,
    -- a driver can't be in two shifts of the same slot on the same day:
    UNIQUE (driver_id,  shift_date, shift_type_id),
    -- a car can't be in two places at once in the same slot/day:
    UNIQUE (vehicle_id, shift_date, shift_type_id)
);

-- ---------------------------------------------------------------------
-- trips : each ride. Event table — mostly a foreign key (shift_id)
--         plus the few facts that are truly its own (fare, distance, time).
-- ---------------------------------------------------------------------
CREATE TABLE trips (
    trip_id     SERIAL       PRIMARY KEY,
    shift_id    INT          NOT NULL REFERENCES shifts(shift_id),
    started_at  TIMESTAMP    NOT NULL,
    distance_km NUMERIC(5,2) NOT NULL CHECK (distance_km > 0),
    fare        NUMERIC(8,2) NOT NULL CHECK (fare >= 0)
);

-- ---------------------------------------------------------------------
-- settlements : the end-of-shift pay event. ONE per shift (1:1), enforced
--   by UNIQUE(shift_id) -> the relationship type becomes a guardrail.
--
--   commission_rate_applied is a FROZEN SNAPSHOT of the rate at settlement
--   time. shift_types.commission_rate may change next month; this column
--   preserves what was actually agreed on the day. That is why a settlement
--   is a RECORDED FACT, not a number we recompute.
-- ---------------------------------------------------------------------
CREATE TABLE settlements (
    settlement_id           SERIAL        PRIMARY KEY,
    shift_id                INT           NOT NULL UNIQUE
                                          REFERENCES shifts(shift_id),
    gross_fare              NUMERIC(10,2) NOT NULL,   -- SUM of the shift's fares
    commission_rate_applied NUMERIC(4,3)  NOT NULL,   -- frozen snapshot
    commission_amount       NUMERIC(10,2) NOT NULL,   -- gross * rate
    other_deductions        NUMERIC(10,2) NOT NULL DEFAULT 0,
    net_pay                 NUMERIC(10,2) NOT NULL,   -- gross - commission - deductions
    settled_at              TIMESTAMP     NOT NULL
);
