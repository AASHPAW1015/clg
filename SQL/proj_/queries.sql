-- radio taxi: reporting queries
-- all queries tested on postgresql against schema.sql + seed.sql (september 2026 data)


-- q1: how do drivers rank by earnings this month?
-- step 1 (cte): collapse to one net-pay total per driver with group by
-- step 2 (outer): rank those totals with dense_rank
-- dense_rank chosen so tied earners share a rank with no gap after them
with monthly as (
    select d.driver_id,
           d.full_name,
           sum(se.net_pay) as total_pay
    from settlements se
    join shifts sh on sh.shift_id = se.shift_id
    join drivers d on d.driver_id = sh.driver_id
    where sh.shift_date >= date '2026-09-01'
      and sh.shift_date <  date '2026-10-01'
    group by d.driver_id, d.full_name
)
select full_name,
       total_pay,
       dense_rank() over (order by total_pay desc) as rank
from monthly
order by rank;


-- q2: running total of trips within a shift
-- row_number keeps every trip row and numbers them 1,2,3... per shift
-- partition on shift_id (the actual work-period), not shift_type_id (the category)
-- order by started_at so the count climbs in time order, resetting each shift
select d.full_name,
       st.name as shift,
       t.started_at as trip_time,
       row_number() over (partition by t.shift_id
                          order by t.started_at) as running_count
from trips t
join shifts sh on sh.shift_id = t.shift_id
join drivers d on d.driver_id = sh.driver_id
join shift_types st on st.shift_type_id = sh.shift_type_id
order by t.shift_id, t.started_at;


-- q3: each driver's best shift
-- rank each driver's shifts by net_pay (highest first) within that driver
-- then keep only rank 1. the rank goes in a cte because a window function
-- cannot be filtered in a where clause.
-- rank (not row_number) so a driver with two shifts tied for best returns both.
with ranked as (
    select d.full_name,
           st.name as shift,
           sh.shift_date,
           se.net_pay,
           rank() over (partition by sh.driver_id
                        order by se.net_pay desc) as r
    from settlements se
    join shifts sh on sh.shift_id = se.shift_id
    join drivers d on d.driver_id = sh.driver_id
    join shift_types st on st.shift_type_id = sh.shift_type_id
)
select full_name, shift, shift_date, net_pay
from ranked
where r = 1
order by net_pay desc;


-- q4: how far is each trip's fare above or below that driver's average?
-- avg(fare) over (partition by driver) gives each row its driver's average
-- while keeping every trip visible. subtract to get the gap.
-- this is the query group by cannot do: it needs the individual fare and the
-- average in the same row.
select d.full_name,
       t.trip_id,
       t.fare,
       round(avg(t.fare) over (partition by sh.driver_id), 2) as driver_avg,
       round(t.fare - avg(t.fare) over (partition by sh.driver_id), 2) as diff
from trips t
join shifts sh on sh.shift_id = t.shift_id
join drivers d on d.driver_id = sh.driver_id
order by d.full_name, t.trip_id;


-- q5: which vehicles were idle for a whole shift?
-- anti-join: shifts that have no matching trip at all.
-- not exists is used instead of not in (not in misbehaves on nulls).
select s.shift_id,
       v.registration_no,
       st.name as slot,
       s.shift_date
from shifts s
join vehicles v on v.vehicle_id = s.vehicle_id
join shift_types st on st.shift_type_id = s.shift_type_id
where not exists (
    select 1 from trips t where t.shift_id = s.shift_id
)
order by s.shift_id;


-- q6 (recursive cte): which vehicles were idle for a whole calendar day?
-- the fleet has no natural hierarchy, so the recursive cte is used to build a
-- date series for the month. cross join with vehicles, then keep (vehicle, date)
-- pairs that have no shift.
with recursive month_days(d) as (
    select date '2026-09-01'
    union all
    select d + 1 from month_days where d < date '2026-09-30'
)
select v.registration_no,
       md.d as idle_date
from month_days md
cross join vehicles v
where not exists (
    select 1 from shifts s
    where s.vehicle_id = v.vehicle_id
      and s.shift_date = md.d
)
order by v.registration_no, md.d;


-- focus deliverable: the q1 ranking, with and without a window function

-- (a) with a window function: rank computed in one pass
with monthly as (
    select d.driver_id, d.full_name, sum(se.net_pay) as total_pay
    from settlements se
    join shifts sh on sh.shift_id = se.shift_id
    join drivers d on d.driver_id = sh.driver_id
    where sh.shift_date >= date '2026-09-01'
      and sh.shift_date <  date '2026-10-01'
    group by d.driver_id, d.full_name
)
select full_name,
       total_pay,
       dense_rank() over (order by total_pay desc) as rank
from monthly
order by rank;

-- (b) without a window function: a correlated subquery counts, for each driver,
-- how many distinct higher totals exist. this re-scans the totals once per
-- driver and is slower and harder to read -- which is the point of the comparison.
with monthly as (
    select d.driver_id, d.full_name, sum(se.net_pay) as total_pay
    from settlements se
    join shifts sh on sh.shift_id = se.shift_id
    join drivers d on d.driver_id = sh.driver_id
    where sh.shift_date >= date '2026-09-01'
      and sh.shift_date <  date '2026-10-01'
    group by d.driver_id, d.full_name
)
select m.full_name,
       m.total_pay,
       (select count(distinct m2.total_pay)
        from monthly m2
        where m2.total_pay > m.total_pay) + 1 as rank
from monthly m
order by rank;
