import random, datetime as dt

random.seed(42)  # deterministic -> same seed.sql every run, so outputs are reproducible

# ---------------- lookup data ----------------
drivers = [
    ("Ramesh Pawar",    "9820011001", "MH0120180001", "2021-03-11"),
    ("Suresh Jadhav",   "9820011002", "MH0120180002", "2020-07-02"),
    ("Imran Shaikh",    "9820011003", "MH0120190003", "2022-01-19"),
    ("Deepak More",     "9820011004", "MH0120190004", "2019-11-23"),
    ("Anil Gaikwad",    "9820011005", "MH0120200005", "2023-02-05"),
    ("Vijay Kamble",    "9820011006", "MH0120200006", "2021-09-14"),
    ("Santosh Patil",   "9820011007", "MH0120210007", "2022-06-30"),
    ("Firoz Khan",      "9820011008", "MH0120210008", "2020-04-18"),
]

vehicles = [
    ("MH43AB1234", "Maruti",   "Dzire",    "sedan"),
    ("MH43AB5678", "Hyundai",  "Aura",     "sedan"),
    ("MH43CD9012", "Maruti",   "WagonR",   "hatchback"),
    ("MH43CD3456", "Toyota",   "Etios",    "sedan"),
    ("MH43EF7890", "Mahindra", "Marazzo",  "suv"),
    ("MH43EF2345", "Maruti",   "Ertiga",   "suv"),
]

# name, start, end, commission (fleet's cut). Late-night lowest -> driver keeps more.
shift_types = [
    ("morning",    "06:00", "12:00", 0.250),
    ("afternoon",  "12:00", "18:00", 0.250),
    ("evening",    "18:00", "23:00", 0.220),
    ("late-night", "23:00", "06:00", 0.180),
]
rate_by_type = {i+1: shift_types[i][3] for i in range(4)}

# ---------------- build shifts over Sept 2026 ----------------
start = dt.date(2026, 9, 1)
days  = 28
shifts = []          # (shift_id, driver_id, vehicle_id, shift_type_id, date)
sid = 0
for d in range(days):
    day = start + dt.timedelta(days=d)
    # each day: 5-7 shifts assigned across drivers/vehicles/slots
    n = random.randint(5, 7)
    used_driver_slot = set()
    used_vehicle_slot = set()
    attempts = 0
    made = 0
    while made < n and attempts < 40:
        attempts += 1
        drv = random.randint(1, len(drivers))
        veh = random.randint(1, len(vehicles))
        slot = random.randint(1, 4)
        if (drv, slot) in used_driver_slot:   continue
        if (veh, slot) in used_vehicle_slot:   continue
        used_driver_slot.add((drv, slot))
        used_vehicle_slot.add((veh, slot))
        sid += 1
        shifts.append([sid, drv, veh, slot, day])
        made += 1

# force a couple of multi-shift days for driver 1 (Ramesh): already possible,
# but guarantee at least one date where driver 1 works two different slots.
# (find a date where driver1 has one shift, add a second slot)
from collections import defaultdict
by_driver_date = defaultdict(list)
for s in shifts:
    by_driver_date[(s[1], s[4])].append(s)
for (drv, day), lst in list(by_driver_date.items()):
    if drv == 1 and len(lst) == 1:
        used_slot = lst[0][3]
        for slot in (1,2,3,4):
            if slot != used_slot:
                # pick a free vehicle for that slot/day
                taken_v = {s[2] for s in shifts if s[4]==day and s[3]==slot}
                free_v = [v for v in range(1,len(vehicles)+1) if v not in taken_v]
                if free_v:
                    sid += 1
                    shifts.append([sid, 1, free_v[0], slot, day])
                    break
        break

# ---------------- trips per shift ----------------
trips = []   # (trip_id, shift_id, started_at, distance, fare)
tid = 0
idle_shift_ids = set()
# deliberately leave 2 shifts with zero trips (idle vehicle for a whole shift)
idle_candidates = random.sample([s[0] for s in shifts], 2)
idle_shift_ids.update(idle_candidates)

slot_window = {1:(6,12), 2:(12,18), 3:(18,23), 4:(23,24)}  # hours
for s in shifts:
    sid_, drv, veh, slot, day = s
    if sid_ in idle_shift_ids:
        continue
    ntrips = random.randint(5, 16)
    h0, h1 = slot_window[slot]
    for _ in range(ntrips):
        tid += 1
        hour = random.randint(h0, max(h0, h1-1))
        minute = random.randint(0, 59)
        ts = dt.datetime.combine(day, dt.time(hour % 24, minute))
        dist = round(random.uniform(1.5, 22.0), 2)
        # fare roughly 40 base + 14/km, rounded to whole rupees, with noise
        fare = int(40 + dist*14 + random.randint(-15, 30))
        fare = max(60, fare)
        trips.append([tid, sid_, ts, dist, fare])

# ---------------- settlements (end of shift) ----------------
fares_by_shift = defaultdict(list)
for t in trips:
    fares_by_shift[t[1]].append(t[4])

settlements = []  # (shift_id, gross, rate, comm, deductions, net, settled_at)
for s in shifts:
    sid_, drv, veh, slot, day = s
    gross = sum(fares_by_shift.get(sid_, []))
    rate  = rate_by_type[slot]
    comm  = round(gross * rate, 2)
    ded   = random.choice([0, 0, 0, 50, 80])  # occasional fuel/float deduction
    net   = round(gross - comm - ded, 2)
    settled_at = dt.datetime.combine(day, dt.time(slot_window[slot][1] % 24, 30))
    settlements.append([sid_, gross, rate, comm, ded, net, settled_at])

# ---------------- note the NATURAL ties (no forcing) ----------------
# With whole-rupee fares and 160+ shifts, several shifts share the exact same
# gross total purely by chance. We use those real ties to show how RANK,
# DENSE_RANK and ROW_NUMBER behave differently -- nothing is engineered.
driver_of_shift = {s[0]: s[1] for s in shifts}
gross_by_shift = defaultdict(int)
for t in trips:
    gross_by_shift[t[1]] += t[4]
from collections import Counter
tie_vals = [g for g, c in Counter(gross_by_shift.values()).items() if c > 1]
tie_vals.sort()

# ---------------- emit seed.sql ----------------
out = []
out.append("-- seed.sql  (generated, deterministic: random.seed(42))")
out.append("-- Volume: %d drivers, %d vehicles, 4 shift types, %d shifts, %d trips, %d settlements"
           % (len(drivers), len(vehicles), len(shifts), len(trips), len(settlements)))
out.append("-- Properties the queries rely on:")
out.append("--   * %d gross-fare values are shared by 2+ shifts (NATURAL ties, e.g. %s)"
           % (len(tie_vals), ", ".join("Rs%d" % v for v in tie_vals[:4])))
out.append("--     -> use these to show RANK vs DENSE_RANK vs ROW_NUMBER differ")
out.append("--   * 2 shifts with ZERO trips (idle-vehicle query): shift_id %s"
           % ", ".join(map(str, sorted(idle_shift_ids))))
out.append("--   * driver 1 (Ramesh) works 2 slots on at least one date (multi-shift day)")
out.append("")
out.append("BEGIN;")
out.append("")

out.append("INSERT INTO drivers (full_name, phone, license_no, join_date) VALUES")
rows = ["  ('%s','%s','%s','%s')" % d for d in drivers]
out.append(",\n".join(rows) + ";\n")

out.append("INSERT INTO vehicles (registration_no, make, model, vehicle_type) VALUES")
rows = ["  ('%s','%s','%s','%s')" % v for v in vehicles]
out.append(",\n".join(rows) + ";\n")

out.append("INSERT INTO shift_types (name, start_time, end_time, commission_rate) VALUES")
rows = ["  ('%s','%s','%s',%.3f)" % s for s in shift_types]
out.append(",\n".join(rows) + ";\n")

out.append("INSERT INTO shifts (driver_id, vehicle_id, shift_type_id, shift_date) VALUES")
rows = ["  (%d,%d,%d,'%s')" % (s[1], s[2], s[3], s[4]) for s in shifts]
out.append(",\n".join(rows) + ";\n")

out.append("INSERT INTO trips (shift_id, started_at, distance_km, fare) VALUES")
rows = ["  (%d,'%s',%.2f,%d)" % (t[1], t[2].strftime("%Y-%m-%d %H:%M:%S"), t[3], t[4]) for t in trips]
out.append(",\n".join(rows) + ";\n")

out.append("INSERT INTO settlements (shift_id, gross_fare, commission_rate_applied, commission_amount, other_deductions, net_pay, settled_at) VALUES")
rows = ["  (%d,%.2f,%.3f,%.2f,%.2f,%.2f,'%s')"
        % (st[0], st[1], st[2], st[3], st[4], st[5], st[6].strftime("%Y-%m-%d %H:%M:%S"))
        for st in settlements]
out.append(",\n".join(rows) + ";\n")

out.append("COMMIT;")

with open("seed.sql", "w") as f:
    f.write("\n".join(out))

net_by_driver = defaultdict(float)
for st in settlements:
    net_by_driver[driver_of_shift[st[0]]] += st[5]
print("shifts:", len(shifts), "trips:", len(trips), "settlements:", len(settlements))
print("natural shift-gross ties:", len(tie_vals), "values ->", tie_vals[:6])
print("idle shift_ids:", sorted(idle_shift_ids))
print("monthly net per driver:")
for drv, net in sorted(net_by_driver.items(), key=lambda x:-x[1]):
    print("   %-16s %.2f" % (drivers[drv-1][0], net))
