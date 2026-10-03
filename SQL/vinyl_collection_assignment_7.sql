-- ============================================================
--  Vinyl Record Collection - Relational Database
--  Single script: DDL + DML, in the order you'd run it.
--
--  Schema (4 related tables):
--    artists        -- the bands / musicians
--    records        -- each vinyl LP I own      (FK -> artists)
--    tracks         -- songs on each record     (FK -> records)
--    listening_log  -- every time I spun a record (FK -> records)
--
--  Assumptions:
--    - One record is by exactly one artist (compilations ignored).
--    - A track belongs to exactly one record.
--    - Prices are in INR. Years are 4-digit.
--
-- ============================================================


-- ---------- Clean slate (drop children before parents) ----------
DROP TABLE IF EXISTS listening_log;
DROP TABLE IF EXISTS tracks;
DROP TABLE IF EXISTS records;
DROP TABLE IF EXISTS artists;


-- ==================== DDL: CREATE TABLES ====================

CREATE TABLE artists (
    artist_id    INTEGER      PRIMARY KEY,
    name         VARCHAR(60)  NOT NULL UNIQUE,      -- no two artists with the same name
    country      VARCHAR(40),
    formed_year  INTEGER      CHECK (formed_year BETWEEN 1900 AND 2100)
);

CREATE TABLE records (
    record_id       INTEGER       PRIMARY KEY,
    title           VARCHAR(100)  NOT NULL,
    artist_id       INTEGER       NOT NULL,
    release_year    INTEGER       CHECK (release_year BETWEEN 1900 AND 2100),
    genre           VARCHAR(40),
    record_label    VARCHAR(50),
    media_condition VARCHAR(20)   CHECK (media_condition IN
                        ('Mint','Near Mint','Very Good','Good','Fair','Poor')),
    purchase_price  DECIMAL(8,2)  CHECK (purchase_price >= 0),
    FOREIGN KEY (artist_id) REFERENCES artists(artist_id)
);

CREATE TABLE tracks (
    track_id         INTEGER       PRIMARY KEY,
    record_id        INTEGER       NOT NULL,
    track_no         INTEGER       NOT NULL,
    title            VARCHAR(100)  NOT NULL,
    side             CHAR(1)       CHECK (side IN ('A','B','C','D')),
    duration_seconds INTEGER       CHECK (duration_seconds > 0),
    UNIQUE (record_id, track_no),                    -- no duplicate track numbers on one record
    FOREIGN KEY (record_id) REFERENCES records(record_id) ON DELETE CASCADE
);

CREATE TABLE listening_log (
    play_id    INTEGER  PRIMARY KEY,
    record_id  INTEGER  NOT NULL,
    play_date  DATE     NOT NULL,
    rating     INTEGER  CHECK (rating BETWEEN 1 AND 5),
    notes      VARCHAR(120),
    FOREIGN KEY (record_id) REFERENCES records(record_id) ON DELETE CASCADE
);


-- ==================== SCHEMA EVOLUTION ====================

-- DROP: a temporary staging table I used while cleaning imported data,
--       no longer needed once the real tables are built.
CREATE TABLE records_import_temp (
    raw_line VARCHAR(200)
);
DROP TABLE records_import_temp;

-- ALTER: months later I wanted to flag favourites, so I added a column.
ALTER TABLE records ADD COLUMN is_favorite INTEGER DEFAULT 0
    CHECK (is_favorite IN (0, 1));


-- ==================== DML: INSERT DATA ====================

INSERT INTO artists (artist_id, name, country, formed_year) VALUES
(1, 'Pink Floyd',    'UK',     1965),
(2, 'Miles Davis',   'USA',    1944),
(3, 'Fleetwood Mac', 'UK',     1967),
(4, 'The Beatles',   'UK',     1960),
(5, 'Daft Punk',     'France', 1993),
(6, 'Radiohead',     'UK',     1985);

-- Note: record 3 title is entered as 'Rumors' on purpose - fixed later with UPDATE.
INSERT INTO records
(record_id, title, artist_id, release_year, genre, record_label, media_condition, purchase_price) VALUES
(1, 'The Dark Side of the Moon', 1, 1973, 'Progressive Rock', 'Harvest',     'Near Mint', 2800.00),
(2, 'Kind of Blue',              2, 1959, 'Jazz',             'Columbia',    'Very Good', 3200.00),
(3, 'Rumors',                    3, 1977, 'Rock',             'Warner Bros', 'Good',      1900.00),
(4, 'Abbey Road',                4, 1969, 'Rock',             'Apple',       'Good',      3500.00),
(5, 'Random Access Memories',    5, 2013, 'Electronic',       'Columbia',    'Mint',      2400.00),
(6, 'OK Computer',               6, 1997, 'Alternative Rock', 'Parlophone',  'Very Good', 2600.00);

INSERT INTO tracks (track_id, record_id, track_no, title, side, duration_seconds) VALUES
(1,  1, 1, 'Speak to Me',        'A', 90),
(2,  1, 2, 'Breathe (In the Air)','A', 163),
(3,  1, 3, 'Time',               'A', 421),
(4,  2, 1, 'So What',            'A', 562),
(5,  2, 2, 'Freddie Freeloader', 'A', 586),
(6,  3, 1, 'Dreams',             'A', 257),
(7,  3, 2, 'Go Your Own Way',    'A', 218),
(8,  4, 1, 'Come Together',      'A', 259),
(9,  4, 2, 'Something',          'A', 182),
(10, 5, 1, 'Instant Crush',      'A', 337),
(11, 5, 2, 'Get Lucky',          'B', 369),
(12, 6, 1, 'Paranoid Android',   'A', 383),
(13, 6, 2, 'Karma Police',       'B', 264),
(14, 1, 4, 'The Great Gig in the Sky', 'A', 276);

-- play_id 7 is an accidental duplicate of 6 - removed later with DELETE.
INSERT INTO listening_log (play_id, record_id, play_date, rating, notes) VALUES
(1, 1, '2026-09-10', 5, 'Sunday morning spin'),
(2, 3, '2026-09-12', 4, NULL),
(3, 2, '2026-09-15', 5, 'Perfect for focus work'),
(4, 5, '2026-09-18', 4, 'Late-night listen'),
(5, 1, '2026-09-20', 5, NULL),
(6, 4, '2026-09-22', 4, 'First play after cleaning'),
(7, 4, '2026-09-22', 4, 'First play after cleaning');


-- ==================== DML: UPDATE (fixing / changing data) ====================

-- 1) Fix the typo: 'Rumors' -> 'Rumours'
UPDATE records
SET title = 'Rumours'
WHERE record_id = 3;

-- 2) Re-graded Abbey Road after cleaning it - condition improved.
UPDATE records
SET media_condition = 'Very Good'
WHERE record_id = 4;

-- 3) Mark Dark Side of the Moon as a favourite (uses the ALTER-added column).
UPDATE records
SET is_favorite = 1
WHERE record_id = 1;


-- ==================== DML: DELETE (real-world correction) ====================

-- Remove the accidental duplicate listening entry.
DELETE FROM listening_log
WHERE play_id = 7;


