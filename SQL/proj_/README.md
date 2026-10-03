# Radio Taxi — Driver Shift & Earnings Database

A PostgreSQL case study modelling a radio taxi fleet: drivers are assigned
vehicles per shift, every trip and its fare is recorded, and the driver's
share is settled after deductions at the close of each shift. The database
answers the fleet manager's end-of-shift reporting questions using window
functions, CTEs, and core SQL.

**Author:** Ashutosh Pawar
**Database:** PostgreSQL

---

## Files

| File | What it is |
|---|---|
| `taxi_er_chen.drawio` / `.png` | ER diagram in Chen's notation (editable + preview) |
| `schema.sql` | All six tables, keys and constraints |
| `seed.sql` | Realistic sample data — 8 drivers, 6 vehicles, 166 shifts, 1684 trips, 166 settlements |
| `queries.sql` | Every reporting query, with its output |
| `gen_seed.py` / `gen_er.py` | The generators used to produce the seed and the diagram (documents *how* the data was made) |
| `README.md` | This file |

The seed generator uses a fixed random seed, so `seed.sql` is reproducible —
re-running the generator produces the identical dataset.

---

## The data model

Six tables, deliberately split into two kinds:

**Lookup / entity tables** (slow-changing, rich in descriptive columns, pointed *at*):
`drivers`, `vehicles`, `shift_types`.

**Transaction / event tables** (grow over time, mostly foreign keys, do the *pointing*):
`shifts`, `trips`, `settlements`.

```
drivers ─┐
         ├─< shifts >─── trips
vehicles ┘      │
                └─── settlements
shift_types ────┘   (classifies shifts)
```

### The shift is the spine

Every reporting question in the brief is phrased around a shift — "running
total of trips *within a shift*", "each driver's *best shift*", "vehicles idle
for a *whole shift*". So `shifts` is the central table: one shift = one driver
+ one vehicle + one time-slot + one date. Trips hang off a shift; a settlement
closes a shift.

The driver and vehicle live on the **shift**, not on each trip. This means all
trips in a shift automatically inherit the same driver and car — we never
re-pick them per trip. It also means a driver can work two shifts in one day
(e.g. morning and late-night) and the model handles it for free: two shift
rows, same driver, different slots.

---

## Design decisions (and the alternatives rejected)

**1. Dropped a dedicated `customers` table.**
None of the five reporting questions involve customers — they are about
drivers, shifts, vehicles and money. A customer table would add joins and
foreign keys for zero analytical payoff. *Rejected alternative:* a full
customers table. We kept trips lean instead.

**2. No stored "daily earnings" total.**
A daily or monthly total is always recomputable from `trips` + `settlements`,
so storing it would risk the stored value drifting out of sync with the rows
that feed it. *Rejected alternative:* a `daily_gains` table caching totals. We
compute totals in queries instead ("don't store what you can compute").

**3. Kept `settlements` as a separate table — because it records a fact, not a
cache.**
At first glance a settlement looks like a recomputable total, which would make
it redundant. The difference: a settlement captures *what was actually agreed
and paid* on the day — including the commission rate and deductions that
applied *at that time*. Commission rates can change; a recomputed figure would
silently change historical pay. So the settlement stores a **frozen snapshot**
(`commission_rate_applied`) and is a genuine historical record, not a cache.
*Rejected alternative:* computing net pay live from the current rate every
time — which would corrupt past settlements the moment a rate changed.

**4. `shift_types` as a 4-row lookup doing double duty.**
Commission varies by time-of-day (late-night keeps the lowest commission, so
the driver takes home more — compensating for the harder shift). Rather than a
separate commission table *or* a rate copied onto every shift, the four slots
(morning / afternoon / evening / late-night) live in one small lookup that both
**classifies** each shift and **supplies its commission rate**. Keeping the
four rates in one place means changing a rate is a single edit, not a
thousand-row update.
*Rejected alternatives:* (a) commission keyed by *month* — rejected because it
breaks three of the five shift-based questions; (b) rate stored on each shift
or trip — rejected because it duplicates the rate across thousands of rows and
invites update anomalies.

**5. Constraints that enforce business rules.**
- `settlements.shift_id` is `UNIQUE` → enforces the 1:1 "one settlement per
  shift" rule at the database level, not just in description.
- `shifts` has `UNIQUE(driver_id, shift_date, shift_type_id)` and
  `UNIQUE(vehicle_id, shift_date, shift_type_id)` → a driver can't be in two
  shifts of the same slot on one day, and a car can't be in two places at once.

---

## Relationships

| Relationship | Type | Why |
|---|---|---|
| drivers → shifts | 1 : N | a driver works many shifts; each shift has one driver |
| vehicles → shifts | 1 : N | a vehicle runs many shifts; each shift uses one vehicle |
| shift_types → shifts | 1 : N | one slot type classifies many shifts |
| shifts → trips | 1 : N | a shift contains many trips; each trip belongs to one shift |
| shifts → settlements | 1 : 1 | a shift is settled exactly once |

No many-to-many relationship arises — not every design needs one, and forcing
a junction table where none is needed would be over-engineering.

---

## The reporting queries — and the choices behind each

**Q1 — Rank drivers by earnings this month.**
Two levels: first collapse to one total per driver (`SUM(net_pay)` with
`GROUP BY driver_id`), then rank those totals. The ranking can't go in the same
flat query because it needs the totals to already exist, so the `GROUP BY` sits
in a CTE and the ranking reads from it.
*Choice — `DENSE_RANK` vs `RANK`:* I used `DENSE_RANK` so tied earners share a
rank without leaving a gap. This is a deliberate choice, not a default: `RANK`
answers "how many drivers actually out-earned me" (gaps after ties), while
`DENSE_RANK` answers "how many distinct earning levels are above me" (no gaps).
I chose the latter as the more natural reading of a leaderboard.
*Why a window and not just GROUP BY:* GROUP BY alone gives the totals but can't
attach a rank across the collapsed rows.

**Q2 — Running total of trips within a shift.**
`ROW_NUMBER() OVER (PARTITION BY shift_id ORDER BY started_at)`. The count
ticks up in time order and resets at each shift.
*Key choice — partition on `shift_id`, not `shift_type_id`:* `shift_type_id` is
the 4-value category (morning/afternoon/…), so partitioning on it would lump
every morning trip in the fleet into one pile. The reset must happen per
*actual work-period*, which is `shift_id` (the event), not the category. This
is the lookup-vs-transaction distinction showing up inside a query.
*Why a window and not GROUP BY:* GROUP BY would give one summary count per
shift; here every trip must stay visible with its own climbing counter.

**Q3 — Each driver's best shift.**
Rank each driver's shifts by `net_pay` descending *within that driver*
(`RANK() OVER (PARTITION BY driver_id ORDER BY net_pay DESC)`), then keep only
rank 1 — in a CTE, because a window function can't be filtered in `WHERE`.
*Why not `MAX()`:* `MAX(net_pay) ... GROUP BY driver_id` gives the best
*amount* but discards *which* shift earned it (GROUP BY collapses the detail
rows). The question asks for the shift, so the detail rows must survive — only
a window keeps them.
*Choice — `RANK` vs `ROW_NUMBER`:* I used `RANK`, so if a driver has two shifts
tied for their best, both are returned (they genuinely tied). `ROW_NUMBER`
would force exactly one row per driver by breaking ties arbitrarily — also
valid, but it hides real ties.

**Q4 — How far each trip's fare is above/below that driver's average.**
`fare - AVG(fare) OVER (PARTITION BY driver_id)`. One query, no CTE, no
GROUP BY.
*Why this is the query GROUP BY cannot do:* you need the individual `fare` and
the driver's average in the **same row** to subtract them. GROUP BY would have
already crushed the individual fares into the average. Only a window function
keeps every trip *and* staples on the average.
*Choice — partition on `driver_id`:* the comparison is "vs the driver's own
average" (self-comparison). Using `OVER ()` instead would compare each trip to
the **whole fleet's** average — a different, also-useful question. The window
size is chosen to match "compared to what?".

**Q5 — Vehicles idle for a whole shift.**
`NOT EXISTS (SELECT 1 FROM trips WHERE trips.shift_id = shifts.shift_id)` — an
anti-join finding shifts with zero trips.
*Choice — `NOT EXISTS` over `NOT IN`:* `NOT IN` misbehaves when the subquery
can contain NULLs; `NOT EXISTS` is the safe habit. The same result can be
written as `LEFT JOIN trips ... WHERE trips.shift_id IS NULL`, which is a useful
equivalent to mention.

**Recursive CTE — the "if the data supports it" clause.**
A taxi fleet has no natural hierarchy (no driver-reports-to-driver tree), so I
did not force an artificial one. Instead I used a recursive CTE for its other
legitimate purpose — generating a **date series** for the month — to answer a
real fleet question: *which vehicles sat completely idle on which whole days?*
This extends Q5 from "idle for a shift" to "idle for a whole calendar day",
and genuinely needs the recursion to manufacture the calendar:

```sql
WITH RECURSIVE month_days(d) AS (
    SELECT DATE '2026-09-01'
    UNION ALL
    SELECT d + 1 FROM month_days WHERE d < DATE '2026-09-30'
)
SELECT v.registration_no, md.d AS idle_date
FROM month_days md
CROSS JOIN vehicles v
WHERE NOT EXISTS (
    SELECT 1 FROM shifts s
    WHERE s.vehicle_id = v.vehicle_id AND s.shift_date = md.d
)
ORDER BY v.registration_no, md.d;
```

---

## Focus deliverable — ranking with vs without a window function

Q1's driver ranking written **with** a window function is compact: collapse to
totals in a CTE, then `DENSE_RANK() OVER (ORDER BY total DESC)`.

Written **without** window functions, the same ranking needs a correlated
subquery that, for each driver, counts how many drivers earned more — which
re-scans the totals once per driver and is both slower and harder to read. The
comparison shows what the window function buys: the rank is computed in a single
pass over the result, instead of an N-times repeated count. (Full both-ways code
in `queries.sql`.)

---

## A note on testing dates

The seed data is all in **September 2026**. Queries that filter on "this month"
with `CURRENT_DATE` will return nothing when run later, so for testing those
queries use a fixed anchor, e.g. `date_trunc('month', DATE '2026-09-01')`, or
drop the date filter. Both `schema.sql` and `seed.sql` were loaded into a live
PostgreSQL instance and all reporting queries were run against it to confirm
they execute and return correct results.

---

## What I took away from building this

- **GROUP BY collapses rows; a window function (`OVER`) keeps them and adds a
  computed column.** This single distinction drives which tool each question
  needs — and Q4 is the clearest case of something only a window can do.
- **`PARTITION BY` divides the data into piles for the calculation; it does not
  filter anything.** The window size (`OVER ()` = whole set, `PARTITION BY x` =
  per-x) is chosen to match what the question compares against.
- **A CTE is a named, scoped part of one statement — not saved anywhere.** Its
  main jobs here: make a two-level query readable, and hold a window-function
  result so the outer query can filter on it (you can't filter a window function
  in `WHERE`). A *saved* reusable query would be a `VIEW` (`CREATE`, i.e. DDL).
- **Lookup tables vs transaction tables** have different characters — the
  distinction decided which column a rate belongs in and why partitioning on
  `shift_id` rather than `shift_type_id` matters.
- **Store facts, not re-computable caches** — the reasoning behind keeping
  settlements (with a frozen rate) and *not* keeping a daily-total table.
